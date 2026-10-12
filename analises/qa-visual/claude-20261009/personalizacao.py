"""Teste Claude 09/10/2026: personalização com várias técnicas/posições, envio de logótipo, filtros e orçamento.
A configuração de técnicas é injetada só no DOM local (o catálogo não tem nenhuma configurada).
Única escrita: adicionar/remover uma linha de teste no carrinho desta sessão. Checkout bloqueado."""
from pathlib import Path
import json, struct, zlib
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent
BASE = 'http://127.0.0.1:9292'
PDP = '/products/saco-natalicio-boneco-de-neve-com-cordao'
log = {}

def png(path):
    w, h = 64, 64
    raw = b''.join(b'\x00' + bytes([67, 56, 202]) * w for _ in range(h))
    chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    path.write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(raw)) + chunk(b'IEND', b''))
    return path

CONFIG = {'techniques': [
    {'name': 'Serigrafia', 'price_included': True, 'positions': [
        {'name': 'Frente', 'max_width_mm': 200, 'max_height_mm': 250},
        {'name': 'Verso', 'max_width_mm': 200, 'max_height_mm': 250}]},
    {'name': 'Bordado', 'price_included': True, 'positions': [{'name': 'Frente', 'max_width_mm': 90, 'max_height_mm': 90}]},
    {'name': 'Transfer digital', 'price_included': True, 'positions': [
        {'name': 'Frente', 'max_width_mm': 180, 'max_height_mm': 180}, {'name': 'Lateral', 'max_width_mm': 60, 'max_height_mm': 40}]},
]}

INJECT = r'''(config) => {
  const el = document.querySelector('m3d-product');
  el.querySelector('[data-m3d-personalization]').textContent = JSON.stringify(config);
  const actions = el.querySelector('.m3d-pdp__actions');
  let group = actions.previousElementSibling && actions.previousElementSibling.querySelector && actions.previousElementSibling.matches('.m3d-pdp__group') ? actions.previousElementSibling : null;
  if (!group) { group = document.createElement('div'); group.className = 'm3d-pdp__group'; actions.before(group); }
  const id = el.querySelector('dialog[id^="M3dPersonalization-"]').id;
  group.innerHTML = '<h2>Personalização</h2><p class="m3d-pdp__note">FIXTURE LOCAL — técnicas de teste, não gravadas no catálogo.</p>'
    + '<button type="button" class="m3d-pdp__control" data-m3d-no-personalization aria-pressed="true"><span>Sem personalização</span></button>'
    + config.techniques.map(t => `<button type="button" class="m3d-pdp__control m3d-pdp__technique" data-m3d-technique="${t.name}" data-m3d-dialog-open="${id}" aria-pressed="false" aria-haspopup="dialog"><span>${t.name}</span><span class="m3d-pdp__control-icon" aria-hidden="true">+</span></button>`).join('');
  const parent = el.parentNode, next = el.nextSibling; parent.removeChild(el); parent.insertBefore(el, next);
  return group.querySelectorAll('[data-m3d-technique]').length;
}'''

with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in [(1440, 1000), (390, 844)]:
        ctx = b.new_context(viewport={'width': w, 'height': h}, locale='pt-PT')
        ctx.route('**/checkouts/**', lambda r: r.abort() if r.request.resource_type == 'document' else r.continue_())
        pg = ctx.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
        pg.goto(BASE + PDP); pg.wait_for_load_state('networkidle')
        before = pg.evaluate("fetch('/cart.js').then(r=>r.json()).then(c=>c.items.map(i=>i.key))")
        r = log.setdefault(str(w), {})
        r['techniqueButtons'] = pg.evaluate(INJECT, CONFIG)
        pg.screenshot(path=str(OUT / f'pers-1-tecnicas-{w}.png'), full_page=True)
        pg.click('[data-m3d-technique="Serigrafia"]'); pg.wait_for_timeout(600)
        pg.click('[data-m3d-position="1"]')
        pg.fill('[data-m3d-width]', '300'); pg.fill('[data-m3d-height]', '100')
        pg.click('[data-m3d-confirm-personalization]'); pg.wait_for_timeout(300)
        r['overMaxError'] = pg.inner_text('[data-m3d-personalization-error]')
        r['areaLimit'] = pg.inner_text('[data-m3d-area-limit]')
        r['widthLabel'] = pg.inner_text('[data-m3d-width-label]')
        pg.fill('[data-m3d-width]', '150')
        r['logoDisabledBefore'] = pg.is_disabled('[data-m3d-logo]')
        pg.set_input_files('[data-m3d-logo]', str(png(OUT / 'logo-teste-m3d.png')))
        r['fileName'] = pg.inner_text('[data-m3d-file-name]')
        pg.screenshot(path=str(OUT / f'pers-2-modal-{w}.png'), full_page=False)
        pg.click('[data-m3d-confirm-personalization]'); pg.wait_for_timeout(600)
        r['afterConfirmError'] = pg.inner_text('[data-m3d-personalization-error]')
        r['pressed'] = pg.eval_on_selector_all('[data-m3d-technique],[data-m3d-no-personalization]', 'els=>els.map(e=>e.textContent.trim()+":"+e.getAttribute("aria-pressed"))')
        # segunda técnica: verifica se acumula ou substitui
        pg.click('[data-m3d-technique="Bordado"]'); pg.wait_for_timeout(600)
        pg.fill('[data-m3d-width]', '80'); pg.fill('[data-m3d-height]', '80')
        r['logoStillAttached'] = pg.inner_text('[data-m3d-file-name]')
        pg.click('[data-m3d-confirm-personalization]'); pg.wait_for_timeout(600)
        r['pressedAfterSecond'] = pg.eval_on_selector_all('[data-m3d-technique],[data-m3d-no-personalization]', 'els=>els.map(e=>e.textContent.trim()+":"+e.getAttribute("aria-pressed"))')
        r['summary'] = pg.inner_text('[data-m3d-configuration-summary]')
        pg.screenshot(path=str(OUT / f'pers-3-pdp-configurada-{w}.png'), full_page=True)
        if w == 1440:
            pg.click('[data-m3d-add]'); pg.wait_for_timeout(2500)
            r['addStatus'] = pg.inner_text('[data-m3d-add-status]')
            cart = pg.evaluate("fetch('/cart.js').then(r=>r.json())")
            new = [i for i in cart['items'] if i['key'] not in before]
            r['newLine'] = [{'title': i['product_title'], 'qty': i['quantity'], 'properties': i['properties']} for i in new]
            pg.goto(BASE + '/cart'); pg.wait_for_load_state('networkidle')
            pg.screenshot(path=str(OUT / 'pers-4-carrinho-1440.png'), full_page=True)
            for i in new:
                pg.evaluate("k=>fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:k,quantity:0})})", i['key'])
            r['cleanedUp'] = len(new)
        r['jsErrors'] = errs
        ctx.close()

    # filtros e orçamento
    ctx = b.new_context(viewport={'width': 1440, 'height': 1000}, locale='pt-PT'); pg = ctx.new_page()
    pg.goto(BASE + '/collections/all'); pg.wait_for_load_state('networkidle')
    groups = pg.eval_on_selector_all('[data-filter-group]', 'els=>els.map(e=>({g:e.dataset.filterGroup,empty:!!e.querySelector(".collection__filter-empty"),inputs:e.querySelectorAll("input").length}))')
    total = pg.inner_text('.collection__desktop-count')
    pg.goto(BASE + '/collections/all?filter.v.availability=1'); pg.wait_for_load_state('networkidle')
    log['filters'] = {'groups': groups, 'total': total, 'inStock': pg.inner_text('.collection__desktop-count'),
                      'inStockTitles': pg.eval_on_selector_all('.collection-card h3, .collection-card [class*=title]', 'els=>[...new Set(els.map(e=>e.textContent.trim()))].slice(0,10)')}
    pg.screenshot(path=str(OUT / 'filtros-stock-1440.png'), full_page=True)
    pg.goto(BASE + '/pages/pedir-orcamento?view=m3d-quote&product=Saco'); pg.wait_for_load_state('networkidle')
    log['quote'] = {'fileInputs': pg.locator('input[type=file]').count(), 'fields': pg.eval_on_selector_all('main input:not([type=hidden]),main textarea,main select', 'els=>els.map(e=>e.name)')}
    pg.screenshot(path=str(OUT / 'orcamento-1440.png'), full_page=True)
    b.close()

(OUT / 'personalizacao.json').write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding='utf8')
print(json.dumps(log, ensure_ascii=False, indent=1))
