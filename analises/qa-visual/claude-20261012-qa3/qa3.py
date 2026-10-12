"""QA Claude #3 (12/10/2026): ícones #1 e revisão R1-R3 na prévia local.
Só leitura: sem carrinho, checkout, orçamento enviado nem alterações ao catálogo."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

OUT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:9292'
VPS = {1440: 900, 1024: 768, 390: 844, 360: 740}
PILOT = ['m3d-sc001', 'm3d-sc002', 'm3d-gr001', 'm3d-cp001', 'm3d-ts001', 'm3d-pl001']
report = {'pages': [], 'pdp': [], 'keyboard': [], 'nav': None, 'nojs_sort': None}

COMMON = r'''() => {
  const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const name = e => (e.getAttribute('aria-label') || e.textContent.trim() || '').replace(/\s+/g, ' ');
  const main = document.querySelector('main') || document.body;
  const cards = [...main.querySelectorAll('.card-product, .collection-card')].filter(vis);
  return {
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    liquidError: /Liquid error|translation missing/i.test(document.body.innerText),
    english: main.innerText.match(/\b(From|You may also like|Sort by|Search|Sold out|Add to cart)\b/g) || [],
    searchInputs: [...document.querySelectorAll('input[type=search], input[name=q]')].filter(vis).length,
    searchInputsInMain: [...main.querySelectorAll('input[type=search], input[name=q]')].filter(vis).length,
    sortSelect: (() => { const s = main.querySelector('select[name=sort_by]'); return s && vis(s) ? { h: Math.round(s.getBoundingClientRect().height), text: s.selectedOptions[0]?.textContent.trim(), options: [...s.options].map(o => o.textContent.trim()) } : null; })(),
    filterGroups: [...main.querySelectorAll('details, fieldset')].filter(vis).map(e => (e.querySelector('summary, legend')?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)).filter(Boolean),
    cards: cards.slice(0, 8).map(c => {
      const links = [...c.querySelectorAll('a[href], button')].filter(vis);
      const tab = links.filter(e => e.tabIndex >= 0);
      const nested = [...c.querySelectorAll('a a, a button, button a, a [tabindex="0"]')].length;
      const btn = c.querySelector('.collection-card__personalize');
      const icon = btn?.querySelector('svg');
      return {
        title: (c.querySelector('[class*=__title]')?.textContent || '').trim().slice(0, 50),
        price: (c.querySelector('[class*=price]')?.textContent || '').trim().replace(/\s+/g, ' '),
        sku: /\bM3D-[A-Z]{2}\d{3}\b|\bSKU\b/i.test(c.innerText),
        tabStops: tab.map(e => name(e).slice(0, 50)),
        nested,
        personalize: btn ? { text: btn.textContent.trim().replace(/\s+/g, ' '), iconClass: icon?.getAttribute('class'), iconW: icon ? Math.round(icon.getBoundingClientRect().width) : null, bg: getComputedStyle(btn).backgroundColor, h: Math.round(btn.getBoundingClientRect().height) } : null,
      };
    }),
    cardCount: cards.length,
    iconsNoAria: [...document.querySelectorAll('svg.m3d-icon')].filter(s => s.getAttribute('aria-hidden') !== 'true' && !s.getAttribute('aria-label') && !s.querySelector('title')).length,
    unnamedControls: [...document.querySelectorAll('button, a[href]')].filter(vis).filter(e => !name(e) && !e.querySelector('img[alt]:not([alt=""])')).map(e => e.outerHTML.slice(0, 120)),
    textArrows: (main.innerText.match(/[→←›‹»«]/g) || []).length,
  };
}'''

PDP_PROBE = r'''() => {
  const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const main = document.querySelector('main');
  const sw = [...main.querySelectorAll('.m3d-pdp__choice--swatch')];
  const swatchInfo = sw.map(l => { const s = l.querySelector('.m3d-pdp__swatch'); const i = l.querySelector('input'); return { name: l.title, bg: s ? getComputedStyle(s).backgroundColor : null, checked: i?.checked, disabled: i?.getAttribute('aria-disabled') }; });
  const colourGroup = main.querySelector('fieldset[data-m3d-option-name="Cor"]');
  const pills = colourGroup ? [...colourGroup.querySelectorAll('.m3d-pdp__choice:not(.m3d-pdp__choice--swatch)')].length : 0;
  const quoteLinks = [...main.querySelectorAll('a, button')].filter(vis).filter(e => /pedir orçamento/i.test(e.textContent));
  const actions = main.querySelector('.m3d-product-gallery__actions');
  const ab = actions ? [...actions.querySelectorAll('a, button')].filter(vis).map(e => ({ label: e.getAttribute('aria-label') || e.textContent.trim().replace(/\s+/g, ' '), w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height), bg: getComputedStyle(e).backgroundColor })) : [];
  const purple = [...main.querySelectorAll('a, button')].filter(vis).filter(e => getComputedStyle(e).backgroundColor === getComputedStyle(document.documentElement).getPropertyValue('--m3d-color-action-primary').trim() || /rgb\(\s*(9[0-9]|1[0-2][0-9]),\s*\d+,\s*(1[5-9][0-9]|2\d\d)\)/.test(getComputedStyle(e).backgroundColor)).map(e => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 30));
  const h1 = main.querySelector('h1');
  const gal = main.querySelector('.m3d-product-gallery');
  const rec = [...document.querySelectorAll('h2')].find(h => /também pode gostar|you may also like/i.test(h.textContent));
  const recCards = rec ? [...(rec.closest('section, div')?.parentElement || document).querySelectorAll('.card-product, .collection-card')].filter(vis) : [];
  return {
    legend: colourGroup?.querySelector('legend')?.textContent.trim().replace(/\s+/g, ' '),
    swatches: swatchInfo, colourPills: pills,
    quoteCount: quoteLinks.length, quoteHref: quoteLinks[0]?.getAttribute('href'),
    actions: ab,
    actionsBelowGallery: actions && gal ? actions.getBoundingClientRect().top >= gal.querySelector('img')?.getBoundingClientRect().bottom - 1 : null,
    actionsAboveTitle: actions && h1 ? actions.getBoundingClientRect().bottom <= h1.getBoundingClientRect().top + 1 : null,
    filledLikeButtons: purple,
    recommendations: rec ? { heading: rec.textContent.trim(), cards: recCards.length, cols: recCards.length ? new Set(recCards.slice(0, 8).map(c => Math.round(c.getBoundingClientRect().top))).size && recCards.filter(c => Math.round(c.getBoundingClientRect().top) === Math.round(recCards[0].getBoundingClientRect().top)).length : 0 } : null,
    description: (main.querySelector('[id^=M3dDetails]')?.parentElement?.innerText || '').slice(0, 160).replace(/\s+/g, ' '),
  };
}'''


def visit(page, path, label, vp, extra=None):
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)[:200]))
    res = {'name': label, 'path': path, 'vp': vp}
    try:
        r = page.goto(BASE + path, wait_until='domcontentloaded', timeout=45000)
        res['status'] = r.status if r else None
        try: page.wait_for_load_state('networkidle', timeout=10000)
        except PWTimeout: pass
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(300)
        res.update(page.evaluate(COMMON))
        if extra: res['pdp'] = page.evaluate(extra)
        page.screenshot(path=str(OUT / f'{label}-{vp}.png'), full_page=True)
    except Exception as e:
        res['error'] = f'{type(e).__name__}: {str(e)[:200]}'
    res['jsErrors'] = errors
    return res


PAGES = [('/search', 'search-empty'), ('/search?q=saco', 'search-saco'), ('/search?q=polo', 'search-polo'),
         ('/collections/t-shirts', 'col-tshirts'), ('/collections/bags', 'col-bags'), ('/collections/drinkware', 'col-drinkware'),
         ('/', 'home')]

with sync_playwright() as p:
    b = p.chromium.launch()
    for vp, h in VPS.items():
        ctx = b.new_context(viewport={'width': vp, 'height': h}, locale='pt-PT')
        page = ctx.new_page()
        for path, label in PAGES:
            report['pages'].append(visit(page, path, label, vp))
        for hd in PILOT:
            report['pdp'].append(visit(page, f'/products/{hd}', f'pdp-{hd}', vp, PDP_PROBE))
        ctx.close()

    # Teclado + árvore de acessibilidade no grupo Cor (polo)
    ctx = b.new_context(viewport={'width': 1440, 'height': 900}, locale='pt-PT')
    page = ctx.new_page()
    page.goto(BASE + '/products/m3d-pl001', wait_until='networkidle')
    first = page.locator('fieldset[data-m3d-option-name="Cor"] input[type=radio]:checked').first
    first.focus()
    before = page.evaluate("() => ({legend: document.querySelector('fieldset[data-m3d-option-name=Cor] legend').textContent.trim(), url: location.search, quote: document.querySelector('.m3d-product-gallery__quote')?.getAttribute('href')})")
    page.keyboard.press('ArrowRight'); page.wait_for_timeout(400)
    after = page.evaluate("() => ({legend: document.querySelector('fieldset[data-m3d-option-name=Cor] legend').textContent.trim(), focused: document.activeElement.closest('label')?.title, checked: document.activeElement.checked, url: location.search, quote: document.querySelector('.m3d-product-gallery__quote')?.getAttribute('href')})")
    aria = page.locator('fieldset[data-m3d-option-name="Cor"]').aria_snapshot()
    report['keyboard'].append({'before': before, 'after': after, 'ariaSnapshot': aria[:1500]})
    # Tab pela fila de ações
    page.locator('.m3d-product-gallery__quote').focus()
    seq = []
    for _ in range(3):
        seq.append(page.evaluate("() => { const e = document.activeElement; return (e.getAttribute('aria-label') || e.textContent.trim()).replace(/\\s+/g,' ').slice(0,40) + ' | ring=' + (getComputedStyle(e).boxShadow !== 'none' || getComputedStyle(e).outlineStyle !== 'none') }"))
        page.keyboard.press('Tab')
    report['keyboard'].append({'actionsTabOrder': seq})
    # MyShop abre com Enter e devolve o foco
    page.locator('.m3d-pdp__myshop').focus(); page.keyboard.press('Enter'); page.wait_for_timeout(400)
    dlg = page.evaluate("() => { const d = [...document.querySelectorAll('dialog')].find(d => d.open); return d ? {open: true, focus: document.activeElement.textContent.trim().slice(0,40)} : {open: false} }")
    page.screenshot(path=str(OUT / 'pdp-myshop-dialog-1440.png'))
    page.keyboard.press('Escape'); page.wait_for_timeout(500)
    dlg['returnFocus'] = page.evaluate("() => document.activeElement.className")
    report['keyboard'].append({'myshop': dlg})
    page.locator('.m3d-product-gallery__actions').screenshot(path=str(OUT / 'pdp-actions-1440.png'))
    page.locator('fieldset[data-m3d-option-name="Cor"]').screenshot(path=str(OUT / 'pdp-swatches-1440.png'))
    ctx.close()

    # Ordenação sem JS
    ctx = b.new_context(viewport={'width': 1440, 'height': 900}, java_script_enabled=False)
    page = ctx.new_page()
    page.goto(BASE + '/search?q=saco&type=product', wait_until='domcontentloaded')
    sel = page.locator('main select[name=sort_by]')
    if sel.count():
        sel.select_option(index=1)
        btn = page.locator('main form:has(select[name=sort_by]) button[type=submit]')
        visible = btn.count() and btn.first.is_visible()
        if visible: btn.first.click(); page.wait_for_load_state('domcontentloaded')
        report['nojs_sort'] = {'applyVisible': bool(visible), 'url': page.url.replace(BASE, '')}
    ctx.close()

    # Pílula da navegação: hover/foco estáveis; clique monotónico
    ctx = b.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    page.goto(BASE + '/', wait_until='networkidle')
    pill_js = "() => { const p = document.querySelector('[class*=nav] [class*=pill], [class*=indicator]'); if (!p) return null; const r = p.getBoundingClientRect(); return Math.round(r.left * 10) / 10; }"
    x0 = page.evaluate(pill_js)
    links = page.locator('header nav a')
    nav = {'start': x0}
    if x0 is not None and links.count() > 2:
        links.nth(2).hover(); page.wait_for_timeout(400); nav['afterHover'] = page.evaluate(pill_js)
        links.nth(2).focus(); page.wait_for_timeout(400); nav['afterFocus'] = page.evaluate(pill_js)
    report['nav'] = nav
    ctx.close()
    b.close()

(OUT / 'qa3.json').write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding='utf-8')
print('ok', len(report['pages']), len(report['pdp']))
