"""Revisão visual Claude 09/10/2026: carrinho, conta, pesquisa, páginas de apoio e PDP com stock.
Só leitura, exceto adicionar o saco ao carrinho da sessão de teste (nunca checkout)."""
from pathlib import Path
import json, re, sys
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

OUT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:9292'
PDP = '/products/saco-natalicio-boneco-de-neve-com-cordao'
report = []

PROBE = r'''() => {
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
  const name = e => (e.getAttribute('aria-label') || e.textContent.trim() || [...(e.labels || [])].map(l => l.textContent.trim()).join(' ') || e.placeholder || '').replace(/\s+/g, ' ');
  const fam = e => e ? getComputedStyle(e).fontFamily.split(',')[0] : null;
  const main = document.querySelector('main') || document.body;
  const small = [...main.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && vis(e))
    .filter(e => parseFloat(getComputedStyle(e).fontSize) < 12).map(e => e.textContent.trim().slice(0, 40));
  return {
    title: document.title,
    h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim().replace(/\s+/g, ' ')),
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    fonts: { body: fam(document.body), h1: fam(document.querySelector('h1')), button: fam(main.querySelector('button')), input: fam(main.querySelector('input:not([type=hidden])')) },
    liquidError: /Liquid error|translation missing/i.test(document.body.innerText),
    english: (main.innerText.match(/\b(Buy it now|Add to cart|Sold out|Your cart|Continue shopping|Search|Log in|Sign in|Create account|Email|Password|Forgot|Subtotal|Checkout|Quantity|Remove|No results)\b/g) || []),
    brokenImages: [...document.images].filter(e => e.complete && !e.naturalWidth).length,
    unnamedButtons: [...document.querySelectorAll('button,a[href]')].filter(vis).filter(e => !name(e)).length,
    unlabelled: [...main.querySelectorAll('input:not([type=hidden]):not([type=submit]),textarea,select')].filter(vis).filter(e => !name(e) && !e.getAttribute('aria-labelledby')).map(e => e.name || e.type),
    smallControls: [...main.querySelectorAll('button,input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,a.button,[role=button]')].filter(vis).filter(e => !e.disabled)
      .map(e => ({ l: name(e).slice(0, 40), w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) })).filter(e => e.w < 44 || e.h < 44),
    smallText: [...new Set(small)].slice(0, 10),
    dynamicCheckout: !!document.querySelector('[data-m3d-dynamic-checkout], .shopify-payment-button'),
    zeroPrice: /€\s*0[,.]00|0[,.]00\s*€/.test(main.innerText),
    text: main.innerText.replace(/\s+/g, ' ').slice(0, 600),
  };
}'''


def shot(page, path, name, vp, prepare=None):
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)[:200]))
    res = {'name': name, 'path': path, 'viewport': vp}
    try:
        r = page.goto(BASE + path, wait_until='domcontentloaded', timeout=30000)
        res['status'] = r.status if r else None
        res['finalUrl'] = page.url.replace(BASE, '')
        try: page.wait_for_load_state('networkidle', timeout=10000)
        except PWTimeout: pass
        page.evaluate('document.fonts.ready')
        if prepare: prepare(page)
        res.update(page.evaluate(PROBE))
        page.screenshot(path=str(OUT / f'{name}-{vp}.png'), full_page=True)
    except Exception as e:
        res['error'] = f'{type(e).__name__}: {str(e)[:200]}'
    res['jsErrors'] = errors
    report.append(res)


def open_drawer(page):
    btn = page.locator('main form[action*="/cart/add"] button[type=submit]').first
    if btn.count() and btn.is_enabled():
        btn.click(); page.wait_for_timeout(1500)


PAGES = [
    ('/cart', 'cart-empty'),
    ('/account/login', 'account-login'),
    ('/account/register', 'account-register'),
    ('/account', 'account'),
    ('/pages/login', 'pages-login'),
    ('/search', 'search-empty'),
    ('/search?q=saco', 'search-results'),
    ('/search?q=zzqxv', 'search-none'),
    ('/pages/contact', 'pages-contact'),
    ('/pages/kits-de-boas-vindas', 'pages-kits'),
    ('/pages/tecnologia', 'pages-tecnologia'),
    ('/policies/privacy-policy', 'policy-privacy'),
    ('/collections/all', 'collections-all'),
    ('/pagina-inexistente', '404'),
    (PDP, 'pdp-saco'),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for w, h in [(1440, 1000), (390, 844)]:
        ctx = browser.new_context(viewport={'width': w, 'height': h}, locale='pt-PT')
        page = ctx.new_page()
        for path, name in PAGES:
            shot(page, path, name, w)
        # PDP extra larguras
        if w == 1440:
            for ew, eh in [(1024, 1000)]:
                c2 = browser.new_context(viewport={'width': ew, 'height': eh}, locale='pt-PT'); pg = c2.new_page()
                shot(pg, PDP, 'pdp-saco', ew); c2.close()
        # adicionar ao carrinho pela PDP e capturar gaveta/estado
        shot(page, PDP, 'pdp-saco-added', w, prepare=open_drawer)
        shot(page, '/cart', 'cart-filled', w)
        ctx.close()
    c3 = browser.new_context(viewport={'width': 360, 'height': 800}, locale='pt-PT'); pg = c3.new_page()
    shot(pg, PDP, 'pdp-saco', 360); shot(pg, PDP, 'pdp-saco-added', 360, prepare=open_drawer); shot(pg, '/cart', 'cart-filled', 360)
    c3.close(); browser.close()

(OUT / 'qa.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
for r in report:
    flags = {k: r.get(k) for k in ('status', 'finalUrl', 'overflow', 'liquidError', 'english', 'brokenImages', 'unnamedButtons', 'unlabelled', 'smallControls', 'smallText', 'dynamicCheckout', 'zeroPrice', 'jsErrors', 'error') if r.get(k)}
    print(r['name'], r['viewport'], r.get('fonts'), flags)
