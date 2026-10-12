from pathlib import Path
from urllib.parse import urlsplit,parse_qs
import json
from playwright.sync_api import sync_playwright,TimeoutError
OUT=Path(__file__).resolve().parent;BASE='http://127.0.0.1:9292'
R={'pages':[],'controls':{},'failures':[],'blockedMutations':0}
def check(label,value):
 if not value:R['failures'].append(label)
def guard(route):
 if route.request.method in ['GET','HEAD','OPTIONS']:route.continue_()
 else:R['blockedMutations']+=1;route.abort()
def load(page,path):
 res=page.goto(BASE+path,wait_until='domcontentloaded',timeout=20000)
 try:page.wait_for_load_state('networkidle',timeout=2000)
 except TimeoutError:pass
 page.evaluate('document.fonts.ready');return res
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True)
 routes=[('search','/search?q=saco'),('search-empty','/search'),('collection','/collections/t-shirts'),('pdp','/products/m3d-pl001')]
 for width in [1440,1024,390,360]:
  ctx=b.new_context(viewport={'width':width,'height':960 if width>600 else 844});ctx.route('**/*',guard);p=ctx.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
  for label,path in routes:
   res=load(p,path)
   state=p.evaluate('''()=>{const visible=e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0;return {overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),liquidError:/Liquid error|translation missing|Failed to Upload Theme Files/.test(document.body.innerText),searchFields:[...document.querySelectorAll('input[name=q]')].filter(visible).length,missingIconAria:[...document.querySelectorAll('svg.m3d-icon')].filter(e=>e.getAttribute('aria-hidden')!=='true'||e.getAttribute('focusable')!=='false').length,unnamedIconButtons:[...document.querySelectorAll('button')].filter(e=>visible(e)&&e.querySelector('svg.m3d-icon')&&!e.innerText.trim()&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).length,cardNested:[...document.querySelectorAll('.collection-card a')].filter(e=>e.querySelector('button,a')).length,cardSKU:document.querySelectorAll('.collection-card__sku').length,swatches:document.querySelectorAll('.m3d-pdp__swatch').length,quoteCount:[...document.querySelectorAll('[data-quote-base]')].filter(visible).length,relatedTitle:document.querySelector('.related-products__title')?.innerText,relatedColumns:document.querySelector('.related-products .product-grid')?getComputedStyle(document.querySelector('.related-products .product-grid')).gridTemplateColumns:null}}''')
   item={'label':label,'width':width,'status':res.status,'state':state,'errors':list(errors)};R['pages'].append(item)
   check(f'{label}-{width}-layout',res.status==200 and state['overflow']==0 and not state['liquidError']);check(f'{label}-{width}-icons',state['missingIconAria']==0 and state['unnamedIconButtons']==0);check(f'{label}-{width}-single-search',state['searchFields']==1)
   if label=='pdp':check(f'pdp-{width}-swatches-quote',state['swatches']==10 and state['quoteCount']==1)
   p.screenshot(path=str(OUT/f'after-{label}-{width}.png'),full_page=True)
  if width in [1440,390]:
   for label,path in [('home','/'),('cart','/cart'),('quote','/pages/pedir-orcamento?view=m3d-quote')]:
    load(p,path);state=p.evaluate('''()=>({overflow:Math.max(0,document.documentElement.scrollWidth-innerWidth),liquidError:/Liquid error|translation missing/.test(document.body.innerText),iconAria:[...document.querySelectorAll('svg.m3d-icon')].every(e=>e.getAttribute('aria-hidden')==='true'&&e.getAttribute('focusable')==='false')})''');R['pages'].append({'label':label,'width':width,'state':state});check(f'{label}-{width}',not state['liquidError'] and state['overflow']==0 and state['iconAria']);p.screenshot(path=str(OUT/f'after-{label}-{width}.png'),full_page=True)
  ctx.close()
 # Pilot colours: real metafields on all six products.
 ctx=b.new_context(viewport={'width':390,'height':844});ctx.route('**/*',guard);p=ctx.new_page()
 R['controls']['pilots']=[]
 for handle in ['m3d-sc001','m3d-sc002','m3d-gr001','m3d-cp001','m3d-ts001','m3d-pl001']:
  load(p,'/products/'+handle);state=p.evaluate('''()=>({swatches:document.querySelectorAll('.m3d-pdp__swatch').length,colors:[...document.querySelectorAll('.m3d-pdp__choice--swatch')].map(e=>({name:e.title,color:getComputedStyle(e.querySelector('.m3d-pdp__swatch')).backgroundColor,width:e.getBoundingClientRect().width})),quoteCount:document.querySelectorAll('.m3d-product-gallery__quote').length})''');R['controls']['pilots'].append({'handle':handle,**state});check(handle+'-swatches',state['swatches']>0 and state['quoteCount']==1)
 load(p,'/products/m3d-pl001')
 first=p.locator('[data-m3d-option="0"]').first;first.focus();p.keyboard.press('ArrowRight');p.wait_for_timeout(150)
 color=p.locator('[data-m3d-option="0"]:checked').input_value();qty=p.locator('[data-m3d-inline-quantity]');qty.fill('7');qty.dispatch_event('change')
 quote=parse_qs(urlsplit(p.locator('.m3d-product-gallery__quote').get_attribute('href')).query);R['controls']['colourKeyboard']={'selected':color,'legend':p.locator('[data-m3d-option-label="0"]').inner_text(),'quote':quote};check('keyboard-colour-quote',color=='Army' and quote.get('quantity')==['7'] and 'Army' in quote.get('variant',[''])[0])
 myshop=p.locator('.m3d-product-gallery__actions [data-m3d-dialog-open]');myshop.focus();p.keyboard.press('Enter');p.wait_for_timeout(120);opened=p.locator('dialog[open]').count();p.keyboard.press('Escape');p.wait_for_function("document.querySelector('.m3d-product-gallery__actions [data-m3d-dialog-open]')===document.activeElement");R['controls']['myshop']={'opened':opened,'focusReturned':myshop.evaluate('e=>e===document.activeElement')};check('myshop-keyboard',opened==1 and R['controls']['myshop']['focusReturned'])
 p.evaluate("Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedLink=text}}})")
 p.locator('.share-button--icon button').click();p.wait_for_timeout(150);R['controls']['shareCopy']=p.evaluate("({link:window.copiedLink,message:document.querySelector('.share-button__message').textContent,visible:!document.querySelector('.share-button__message').hidden})");check('share-copy',R['controls']['shareCopy']['visible'] and 'variant=' in R['controls']['shareCopy']['link'])
 p.evaluate("let product=document.querySelector('m3d-product');product.variants=product.variants.map(v=>({...v,available:false}));product.updateVariant(product.variants[0],false)");R['controls']['unavailable']=p.evaluate("({aria:document.querySelector('[data-m3d-option]').getAttribute('aria-disabled'),slash:getComputedStyle(document.querySelector('.m3d-pdp__swatch'),'::after').backgroundImage})");check('unavailable-state',R['controls']['unavailable']['aria']=='true' and 'gradient' in R['controls']['unavailable']['slash'])
 p.emulate_media(reduced_motion='reduce');R['controls']['reducedMotion']=p.evaluate("({press:getComputedStyle(document.documentElement).getPropertyValue('--m3d-press-scale-icon').trim(),duration:getComputedStyle(document.querySelector('.m3d-product-gallery__quote')).transitionDuration})");check('reduced-motion',R['controls']['reducedMotion']['press']=='1' and R['controls']['reducedMotion']['duration']=='0s')
 # Empty-search mobile call to action focuses existing header field.
 load(p,'/search');p.locator('[data-focus-header-search]').click();R['controls']['headerFocus']=p.evaluate("document.activeElement.matches('[data-m3d-search-input]')");check('header-focus',R['controls']['headerFocus'])
 ctx.close()
 # Native ordering works with scripts disabled and retains filters.
 ctx=b.new_context(java_script_enabled=False,viewport={'width':390,'height':844});ctx.route('**/*',guard);p=ctx.new_page();load(p,'/search?q=saco&type=product&filter.v.availability=1')
 p.locator('select[name=sort_by]').select_option('price-ascending');p.locator('.search-plp__sort-apply').click();p.wait_for_load_state('domcontentloaded');query=parse_qs(urlsplit(p.url).query);R['controls']['noJSsort']=query;check('noJS-sort-preserves',query.get('sort_by')==['price-ascending'] and query.get('q')==['saco'] and query.get('filter.v.availability')==['1']);p.screenshot(path=str(OUT/'after-search-nojs-390.png'),full_page=True);ctx.close()
 # Pill hover/focus do not move it; click samples remain between endpoints.
 ctx=b.new_context(viewport={'width':1440,'height':960});ctx.route('**/*',guard);p=ctx.new_page();load(p,'/');p.wait_for_timeout(200)
 nav=p.locator('[data-m3d-slide-tabs]');tabs=nav.locator('[data-m3d-tab]');cursor=p.locator('[data-m3d-cursor]');initial=cursor.bounding_box();tabs.nth(1).hover();tabs.nth(1).focus();p.wait_for_timeout(150);still=cursor.bounding_box();check('pill-hover-focus-stable',abs(initial['x']-still['x'])<1)
 samples=p.evaluate('''async()=>{const nav=document.querySelector('[data-m3d-slide-tabs]'),tabs=nav.querySelectorAll('[data-m3d-tab]'),cursor=nav.querySelector('[data-m3d-cursor]');const samples=[];tabs[6].addEventListener('click',e=>e.preventDefault());tabs[6].click();const end=performance.now()+470;while(performance.now()<end){const r=cursor.getBoundingClientRect();samples.push({x:r.x,width:r.width});await new Promise(requestAnimationFrame)}return samples}''');target=tabs.nth(6).bounding_box();xs=[initial['x']]+[r['x'] for r in samples];ok=all(min(initial['x'],target['x'])-1<=x<=max(initial['x'],target['x'])+1 for x in xs) and all(xs[i+1]>=xs[i]-0.1 for i in range(len(xs)-1));R['controls']['pill']={'hoverFocusStable':abs(initial['x']-still['x'])<1,'monotonic':ok,'samples':samples};check('pill-monotonic',ok);ctx.close();b.close()
(OUT/'after.json').write_text(json.dumps(R,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'pages':len(R['pages']),'failures':R['failures'],'controls':list(R['controls'])}))
