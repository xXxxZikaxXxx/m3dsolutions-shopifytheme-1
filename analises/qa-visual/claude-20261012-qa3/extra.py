"""Complemento do plano 12/10 §4: carrinho vazio e orçamento a 4 larguras; reduced-motion no card, na PDP e na pílula.
Só leitura: nenhum formulário enviado, nada adicionado ao carrinho."""
import json
from playwright.sync_api import sync_playwright
B = 'http://127.0.0.1:9292'
VPS = {1440: 900, 1024: 768, 390: 844, 360: 740}
PROBE = """() => ({ overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
  liquid: /Liquid error|translation missing/i.test(document.body.innerText),
  h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
  unnamed: [...document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height; })
    .filter(e => !(e.getAttribute('aria-label') || e.textContent.trim() || (e.labels && e.labels.length) || e.getAttribute('aria-labelledby') || e.querySelector('img[alt]:not([alt=\"\"])'))).map(e => e.outerHTML.slice(0, 100)) })"""
out = {'pages': [], 'reducedMotion': {}}
with sync_playwright() as p:
    b = p.chromium.launch()
    for vp, h in VPS.items():
        pg = b.new_page(viewport={'width': vp, 'height': h})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
        for path, name in [('/cart', 'cart-empty'), ('/pages/pedir-orcamento?view=m3d-quote&product=Polo+unissexo&product_url=%2Fproducts%2Fm3d-pl001&variant=Aqua+%2F+XS&quantity=1', 'orcamento')]:
            r = pg.goto(B + path, wait_until='networkidle'); pg.evaluate('document.fonts.ready')
            res = {'name': name, 'vp': vp, 'status': r.status, **pg.evaluate(PROBE)}
            if name == 'orcamento':
                res['prefill'] = pg.evaluate("() => [...document.querySelectorAll('main input, main textarea')].filter(e => e.value && e.type !== 'hidden').map(e => (e.name || e.id) + '=' + e.value.slice(0, 40))")
            pg.screenshot(path=f'{name}-{vp}.png', full_page=True); out['pages'].append(res)
        out['pages'][-1]['jsErrors'] = errs; pg.close()
    ctx = b.new_context(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce'); pg = ctx.new_page()
    pg.goto(B + '/collections/bags', wait_until='networkidle')
    btn = pg.locator('.collection-card__personalize').first; link = pg.locator('.card-product__link, .collection-card__product-link').first
    link.hover(); pg.mouse.down(); pg.wait_for_timeout(200)
    out['reducedMotion']['cardButton'] = pg.evaluate("() => { const s = getComputedStyle(document.querySelector('.collection-card__personalize')); const a = document.querySelector('.collection-card__personalize svg'); return { transform: s.transform, transition: s.transitionDuration, arrowTransform: getComputedStyle(a).transform, arrowTransition: getComputedStyle(a).transitionDuration }; }")
    pg.mouse.up()
    pg.goto(B + '/products/m3d-pl001', wait_until='networkidle')
    q = pg.locator('.m3d-product-gallery__quote'); q.hover(); pg.mouse.down(); pg.wait_for_timeout(200)
    out['reducedMotion']['pdpQuote'] = pg.evaluate("() => { const s = getComputedStyle(document.querySelector('.m3d-product-gallery__quote')); return { transform: s.transform, transition: s.transitionDuration }; }")
    pg.mouse.up(); ctx.close(); b.close()
print(json.dumps(out, ensure_ascii=False, indent=1))
json.dump(out, open('extra.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
