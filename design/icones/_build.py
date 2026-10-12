# Gera os SVG do sistema de ícones M3D e a folha de prova (preview.html).
import os
S = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'
F = 'fill="currentColor"'
icons = {
 # Ações (com pincelada afinada)
 'm3d-arrow': f'<path {F} d="M3.2 13.4c4.9-1.3 9.7-1.7 14.4-1.2l.1 1.3c-4.6-.3-9.3.1-14.1 1.1z"/><path {S} d="M13.8 7.6 19 12.1l-5.2 4.5"/>',
 'm3d-arrow-left': f'<g transform="matrix(-1 0 0 1 24 0)"><path {F} d="M3.2 13.4c4.9-1.3 9.7-1.7 14.4-1.2l.1 1.3c-4.6-.3-9.3.1-14.1 1.1z"/><path {S} d="M13.8 7.6 19 12.1l-5.2 4.5"/></g>',
 'm3d-external': f'<path {F} d="M5.2 19.6c3.2-4.1 6.6-7.5 10.3-10.4l.9.9c-3.5 3-6.8 6.4-10 10.4z"/><path {S} d="M10 5.5h8.5V14"/>',
 'm3d-cart': f'<path {S} d="M5.5 8.5h13l-1 10.9c-.1.9-.8 1.6-1.7 1.6H8.2c-.9 0-1.6-.7-1.7-1.6z"/><path {S} d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/><path {F} d="M9.3 14.6c1.9-.4 3.7-.5 5.6-.3l-.1 1.1c-1.8-.2-3.6-.1-5.3.3z"/>',
 'm3d-bookmark': f'<path {S} d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/><path {F} d="M9.1 8.3c2-.5 3.9-.6 5.9-.3l-.1 1.1c-1.9-.2-3.7-.1-5.6.3z"/>',
 'm3d-share': f'<path {S} d="M8.5 10H7a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17 10h-1.5"/><path {F} d="M11.3 15.6 11.6 5h.8l.3 10.6c0 .4-.3.7-.7.7s-.7-.3-.7-.7z"/><path {S} d="M8.6 7.4 12 4l3.4 3.4"/>',
 'm3d-upload': f'<path {S} d="M4.5 15v3A2 2 0 0 0 6.5 20h11a2 2 0 0 0 2-2v-3"/><path {F} d="M11.3 15.1 11.6 5h.8l.3 10.1c0 .4-.3.7-.7.7s-.7-.3-.7-.7z"/><path {S} d="M8.6 7.4 12 4l3.4 3.4"/>',
 'm3d-quote': f'<path {S} d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5z"/><path {S} d="M14 3.5V7a.5.5 0 0 0 .5.5H18"/><path {F} d="M8.7 12.2c2.1-.4 4.3-.5 6.6-.3l-.1 1.1c-2.2-.2-4.3-.1-6.4.3z"/><path {F} d="M8.7 15.7c1.4-.3 2.9-.4 4.4-.3l-.1 1.1c-1.4-.1-2.8 0-4.2.3z"/>',
 # Utilitários (neutros)
 'm3d-search': f'<circle {S} cx="10.5" cy="10.5" r="6"/><path {F} d="M14.7 15.8l1.1-1.1 4.5 4.4c.4.4.4 1 0 1.3-.4.4-.9.4-1.3 0z"/>',
 'm3d-account': f'<circle {S} cx="12" cy="8.5" r="3.5"/><path {S} d="M5 19.5c1.2-3.2 3.9-5 7-5s5.8 1.8 7 5"/>',
 'm3d-chevron': f'<path {S} d="M6.5 9.5 12 15l5.5-5.5"/>',
 'm3d-close': f'<path {S} d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
 'm3d-plus': f'<path {S} d="M12 5.5v13M5.5 12h13"/>',
 'm3d-minus': f'<path {S} d="M5.5 12h13"/>',
 'm3d-trash': f'<path {S} d="M4.5 7h15M9.5 7V5.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7M6.5 7l.8 11.6A1.5 1.5 0 0 0 8.8 20h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7"/>',
 'm3d-check': f'<path {S} d="M5.5 12.5l4 4 9-9.5"/>',
 'm3d-alert': f'<circle {S} cx="12" cy="12" r="8.5"/><path {S} d="M12 7.8v5"/><circle {F} cx="12" cy="16.3" r="1"/>',
 'm3d-filter': f'<path {S} d="M4.5 7h9M17.5 7h2M4.5 12h3M11.5 12h8M4.5 17h7M15.5 17h4"/><circle {S} cx="15.5" cy="7" r="1.6"/><circle {S} cx="9.5" cy="12" r="1.6"/><circle {S} cx="13.5" cy="17" r="1.6"/>',
}
for name, body in icons.items():
    with open(f'{name}.svg', 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{body}</svg>\n')
cells = ''.join(f'<figure><div class="row">' + ''.join(f'<span style="width:{s}px;height:{s}px">{open(n+".svg",encoding="utf-8").read()}</span>' for s in (16,20,24,48)) + f'</div><div class="row dark">' + ''.join(f'<span style="width:{s}px;height:{s}px">{open(n+".svg",encoding="utf-8").read()}</span>' for s in (20,48)) + f'<button class="tint"><span style="width:20px;height:20px">{open(n+".svg",encoding="utf-8").read()}</span></button></div><figcaption>{n}</figcaption></figure>' for n in icons)
html = f'''<!doctype html><html lang="pt-PT"><meta charset="utf-8"><title>Ícones M3D — prova</title>
<style>body{{font-family:Raleway,system-ui,sans-serif;margin:32px;color:#000;background:#fff}}h1{{font-size:20px}}
main{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}}figure{{margin:0;border:1px solid #e5e5e5;border-radius:16px;padding:16px}}
.row{{display:flex;align-items:center;gap:16px;padding:8px 0}}.row span{{display:inline-flex}}.row svg{{width:100%;height:100%}}
.dark{{background:#000;color:#fff;border-radius:12px;padding:8px 12px}}.tint{{width:44px;height:44px;border-radius:50%;border:0;background:#f0edff;color:#4436bc;display:inline-flex;align-items:center;justify-content:center}}
figcaption{{font-size:12px;color:#606060;margin-top:8px}}</style>
<h1>Sistema de ícones M3D — v1 (16 · 20 · 24 · 48 px; fundo escuro; botão tinted)</h1><main>{cells}</main></html>'''
open('preview.html','w',encoding='utf-8',newline='\n').write(html)
print(len(icons), 'ícones')
