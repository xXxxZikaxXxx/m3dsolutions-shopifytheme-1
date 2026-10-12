"""Pílula desktop (AGENTS.md): hover/foco não a movem; clique move-a de forma monotónica, sem ultrapassar o destino.
O JS da nav anima até 440 ms e navega aos 520 ms; as amostras param aos 480 ms."""
import json
from playwright.sync_api import sync_playwright
B = 'http://127.0.0.1:9292'
X = "() => { const c = document.querySelector('[data-m3d-cursor]').getBoundingClientRect(); return [Math.round(c.left*10)/10, Math.round(c.width*10)/10]; }"
SAMPLE = """() => new Promise(res => { const c = document.querySelector('[data-m3d-cursor]'); const s = []; const t = performance.now();
  (function f(){ const r = c.getBoundingClientRect(); s.push([Math.round(performance.now()-t), r.left, r.width]); if (performance.now()-t < 480) requestAnimationFrame(f); else res(s); })(); })"""
out = {}
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(B + '/', wait_until='networkidle'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(300)
    tabs = pg.locator('[data-m3d-slide-tabs] [data-m3d-tab]:not([disabled])')
    out['tabs'] = [t.strip() for t in tabs.all_inner_texts()]
    target = pg.locator('[data-m3d-slide-tabs] a[data-m3d-tab]').last
    out['target'] = target.inner_text().strip()
    out['start'] = pg.evaluate(X)
    target.hover(); pg.wait_for_timeout(600); out['afterHover'] = pg.evaluate(X)
    pg.mouse.move(5, 5); target.focus(); pg.wait_for_timeout(600); out['afterFocus'] = pg.evaluate(X)
    tb = target.bounding_box(); out['targetBox'] = [round(tb['x'], 1), round(tb['width'], 1)]
    pg.evaluate("() => { window.__p = (" + SAMPLE + ")(); }")
    target.click(no_wait_after=True)
    s = pg.evaluate('window.__p')
    xs = [v[1] for v in s]; x0, x1 = xs[0], xs[-1]; sign = 1 if x1 >= x0 else -1
    out.update(samples=len(s), fromX=round(x0, 1), toX=round(x1, 1),
               monotonic=all(sign * (b2 - a) >= -0.5 for a, b2 in zip(xs, xs[1:])),
               withinBounds=all(min(x0, x1) - 0.5 <= v <= max(x0, x1) + 0.5 for v in xs),
               endsOnTarget=abs(x1 - tb['x']) < 2 and abs(s[-1][2] - tb['width']) < 2,
               settledMs=next((v[0] for v in s if abs(v[1] - x1) < 0.5), None))
    b.close()
out['hoverStable'] = out['afterHover'] == out['start']; out['focusStable'] = out['afterFocus'] == out['start']
print(json.dumps(out, ensure_ascii=False))
json.dump(out, open('pill.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
