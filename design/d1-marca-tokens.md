# D1 — Marca e tokens M3D

Data: 08/10/2026. Autor: sub-agent D1 da equipa de Design System do Claude.
Estado: **proposta para revisão do líder.** Nenhum ficheiro do tema foi alterado.

Convenções deste documento:

- **MANUAL**: regra que está no manual de marca (`referencias/marca/LO_M3D_Institucional_ManualdeMarca_251023 (1).pdf`), com a página.
- **EXTENSÃO**: decisão do Design System. Não é regra do manual e tem uma linha de justificação.
- **Observado**: medido no PDF, nos ficheiros extraídos ou no código do tema.
- **Proposto**: recomendação do D1, a confirmar pelo líder.

Fontes lidas: `AGENTS.md`, `codexclaude.md` §5, `colaboracao/claude-review.md` §1, §4 e §10, `colaboracao/codex-review.md` §2, §3 e §8, `referencias/marca/extraidos/README.md`. Também foram inspecionadas as páginas 8, 9 e 11 do PDF e medida a geometria vetorial das páginas 8 e 9 com pymupdf. As imagens ficaram na pasta temporária da sessão, fora do projeto.

---

## 1. Fonte → regra → token

### 1.1 Regras do manual

| Fonte | Regra (resumo fiel) | Tipo | Token proposto |
| --- | --- | --- | --- |
| p. 10 | Preto `#000000` (CMYK 0/0/0/100) | MANUAL | `--m3d-black: #000000` |
| p. 10 | Branco `#FFFFFF` | MANUAL | `--m3d-white: #ffffff` |
| p. 10 | Rosa `#E31C79` (RGB 227/28/121, Pantone 213 C) | MANUAL | `--m3d-pink: #e31c79` |
| p. 10 | Roxo `#4436BC` (RGB 68/54/188, Pantone 2726 C) | MANUAL | `--m3d-purple: #4436bc` |
| p. 10 | Azul `#00B3E7` (RGB 0/179/231, Pantone 2995 C) | MANUAL | `--m3d-blue: #00b3e7` |
| p. 10 | “Em todos os materiais […] estas cores devem ser utilizadas.” | MANUAL | Nenhuma cor cromática fora destas cinco como cor de marca. Os tons claros de roxo e rosa (§1.2) são extensões de superfície, não novas cores de marca. |
| p. 11 | Gradiente rosa → roxo → azul, horizontal, da esquerda para a direita. Observado: o roxo fica a meio da faixa. | MANUAL (direção e paragens observadas) | `--m3d-gradient: linear-gradient(90deg, #e31c79 0%, #4436bc 50%, #00b3e7 100%)` |
| p. 11 | “No logo da marca usa-se um gradiente com os tons vistos acima.” | MANUAL | Não há token. O logótipo em gradiente usa só o PNG oficial `assets/m3dsolutionslogo.png`, nunca CSS sobre o vetor (§5). |
| p. 12 | A família é a Raleway “e suas variações”, com escolha livre das versões por material | MANUAL | `--m3d-font-family: "Raleway", <fallbacks>` (vem de `font_picker`) |
| p. 12 | Exemplos: Light, Regular, Bold, Heavy. As fontes embutidas no PDF são Light, Regular, Bold e Black: “Heavy” corresponde à Black (900). | MANUAL + observação | `--m3d-weight-light: 300`, `--m3d-weight-regular: 400`, `--m3d-weight-bold: 700`, `--m3d-weight-black: 900` |
| p. 5 | Logótipo principal, a assinatura geral | MANUAL | Asset, não token: `logo-m3d-positivo.svg` |
| p. 5 | Slogan “MAKE IT REAL.” (Regular, com “REAL.” em Bold Itálico) | MANUAL | Asset `slogan-make-it-real.svg`. Para recompor em texto: `--m3d-weight-regular` e `--m3d-weight-bold` itálico (`raleway_i7`). |
| p. 6 | Variações aceites: positivo, negativo e escala de cinza | MANUAL | `--m3d-logo-gray: #666666` (valor medido na p. 6, só para o logótipo cinza) |
| p. 7 | Não aplicar em contorno, não rodar, não distorcer, não aplicar sombra, não alterar cores, evitar fundos que prejudiquem a leitura | MANUAL | Regras de uso (§5). Proibido usar `--m3d-shadow-*`, `filter`, `transform: rotate`, `outline` ou recolorir com `fill` fora das três variações em qualquer elemento do logótipo. |
| p. 8 | Redução: “10 mm ou 45px”. Se a leitura do acompanhamento (SOLUTIONS) ficar prejudicada, usar a marca horizontal. | MANUAL | `--m3d-logo-h-min: 45px` (altura da horizontal, ver §5.3) |
| p. 9 | Área de proteção “x”, “equivalente à área da base ao número 3” | MANUAL | `--m3d-logo-clearspace-ratio: 0.38` (stacked) e `0.40` (horizontal, derivado); ver §5.2 |
| p. 13 | “Tanto a pincelada quanto os elementos fluidos devem ser utilizados em acompanhamento da comunicação” | MANUAL | Sem token de cor. Os assets são `pincelada-m.svg`, `pincelada-m-gradiente.png` e `forma-fluida-*.png`. |
| p. 14–17 | Aplicações (sem texto extraível): pincelada e formas em peças | MANUAL (exemplos visuais) | Sem token. A contenção (“um momento por página”) é orientação de projeto, não regra (codex-review §3, D-08). |
| p. 12 | O botão “DOWNLOAD DA FONTE” é uma pílula com gradiente e texto branco | Observado (exemplo, não regra) | Não vira token de CTA: branco sobre o extremo azul dá 2,44:1. A forma em pílula inspira `--m3d-radius-pill`. |

### 1.2 Extensões do sistema

| Grupo | Token(s) | Tipo | Justificação |
| --- | --- | --- | --- |
| Cinzentos | `--m3d-gray-50 … --m3d-gray-700` (§6) | EXTENSÃO | O manual não tem neutros intermédios. O tema já usa cerca de 30 cinzentos. São precisos 5 para superfície, divisória, borda de controlo e texto secundário. |
| Tons claros de marca | `--m3d-purple-50: #f0edff`, `--m3d-pink-50: #f8d6e6` | EXTENSÃO | Já existem no tema para hover e destaque. Funcionam como superfície, nunca como texto. |
| Semântica | `--m3d-color-text`, `-text-muted`, `-surface`, `-action-primary`… | EXTENSÃO | Separa o papel da cor, permitindo trocar o valor sem procurar cada componente (claude-review §4). |
| Estados | `--m3d-color-error: #c90012`, `--m3d-color-success: #1a7f37` | EXTENSÃO | O manual não define estados. O verde atual `#1cb744` falha contraste (2,66:1). |
| Foco | `--m3d-focus-color`, `--m3d-focus-width: 2px`, `--m3d-focus-offset: 2px` | EXTENSÃO | WCAG 2.4.7/2.4.11. Hoje coexistem o roxo, o rosa (via `--color-accent` em `base.css:61`) e anéis a 14 % de opacidade. |
| Espaçamento | `--m3d-space-1 … -10` (base 4 px) | EXTENSÃO | O tema usa valores soltos. A escala 4/8 alinha-se com `spacing_sections: 64`. |
| Raios | `--m3d-radius-none/sm/md/lg/pill/round` | EXTENSÃO | Há 10 valores diferentes. A pílula vem do botão da p. 12 e da navegação. |
| Sombras | `--m3d-shadow-xs/sm/md/lg/xl` | EXTENSÃO | A p. 7 proíbe sombra só no logótipo, não nos componentes (codexclaude §5). |
| Tipografia (escala) | `--m3d-text-xs … -display-xl` | EXTENSÃO | O manual só fixa a família. A escala `--f0…--f8` é quase fixa (§2.5). |
| Números | `--m3d-numeric: lining-nums tabular-nums` | EXTENSÃO | A Raleway usa algarismos de estilo antigo por defeito, e preços e quantidades precisam de algarismos alinhados (§3). |
| Movimento | `--m3d-ease-out`, `--m3d-duration-*` | EXTENSÃO | Formaliza as curvas já usadas, sem ultrapassagem (`AGENTS.md`, regra da pílula). |
| Gradiente com legibilidade | `--m3d-scrim` | EXTENSÃO | Para texto sobre imagem ou gradiente, um véu escuro garante contraste em vez de texto branco sobre o azul. |

---

## 2. Inventário atual do tema (observado)

Método: script Python só de leitura (fora do projeto) sobre `sections/*.liquid`, `snippets/*.liquid`, `assets/*.css`, `layout/*.liquid`, `templates/*.liquid` e `config/settings_data.json`. Hex de 3 dígitos normalizados para 6. As contagens incluem duplicados de preset em `settings_data.json` (o bloco `current` mais o preset), por isso servem de indicador de dispersão, não de meta (codex-review §2).

### 2.1 Declarações globais existentes

- `snippets/css-variables.liquid`: `--m3d-pink`, `--m3d-purple` e `--m3d-blue`, mais `--color-*` derivadas das settings, aliases antigos (`--cor-*`, `--bold`, `--light`), a escala `--f0…--f8` e os raios `--buttons-radius`, `--inputs-radius` e `--media-radius`.
- `sections/m3d-home.liquid:163` volta a declarar `--m3d-pink`, `--m3d-purple` e `--m3d-blue` localmente.
- `config/settings_data.json`:
  - `color_background #ffffff`, `color_text #000000`, `color_background_contrast #f5f5f7`.
  - `color_accent #e31c79` com `color_accent_text #000000`, `color_sale #4436bc` e `color_border #c2c2c2`.
  - `type_header_font assistant_n7`, `type_body_font assistant_n4`.
  - `buttons_radius 10`, `inputs_radius 0`, `media_radius 0`.
- Uso de `var(--m3d-*)`: só 10 ocorrências (purple 7, pink 2, blue 1), contra 72 hex `#4436bc` escritos diretamente.

### 2.2 Cores (hex)

| Valor | N.º | Ficheiros principais | Mapeamento proposto |
| --- | --- | --- | --- |
| `#000000` | 104 | main-search, main-collection, nav, m3d-product.css | `--m3d-black` / `--m3d-color-text` |
| `#4436bc` | 72 | m3d-product.css (16), main-search, nav, main-collection | `--m3d-purple` / `--m3d-color-action-primary` / `--m3d-focus-color` |
| `#ffffff` | 68 | m3d-home, main-collection, main-search, nav | `--m3d-white` / `--m3d-color-surface` |
| `#e31c79` | 16 | main-collection, main-search, m3d-home, settings | `--m3d-pink` / `--m3d-color-accent` |
| `#606060` | 14 | m3d-product.css (8), m3d-auth.css (4), main-cart | `--m3d-gray-600` / `--m3d-color-text-muted` |
| `#d6d6d6` | 12 | m3d-product.css (7), m3d-auth.css | Se for borda de campo: fundir em `--m3d-gray-400`; se for divisória: em `--m3d-gray-200` |
| `#e5e5e5` | 11 | m3d-product.css, m3d-auth.css | `--m3d-gray-100` |
| `#c2c2c2` | 10 | base.css, main-article, settings, gift_card | `color_border` → `--m3d-gray-200` (decorativo) ou `--m3d-gray-400` (controlo) |
| `#f5f5f7` | 9 | m3d-home, nav, m3d-product.css, settings | `--m3d-gray-50` / `--m3d-color-surface-alt` |
| `#dedede` | 8 | main-collection, main-search | Fundir em `--m3d-gray-200` |
| `#f7f7f8` | 7 | m3d-product-gallery.css, m3d-auth.css | Fundir em `--m3d-gray-50` |
| `#ededed` | 6 | main-collection, main-search, nav | Fundir em `--m3d-gray-100` |
| `#f0edff` | 5 | nav (3), main-collection, main-search | `--m3d-purple-50` |
| `#d9d9d9` | 5 | nav | `--m3d-gray-200` |
| `#f2f3f8` | 4 | main-blog, main-list-collections, base.css, gift_card | Fundir em `--m3d-gray-50` |
| `#6b6b6b` | 4 | main-collection, main-search | Fundir em `--m3d-gray-600` |
| `#5f5f5f` | 4 | main-collection, main-search | Fundir em `--m3d-gray-600` |
| `#666666` | 3 | collection-banner, m3d-home, main-search | Em texto: `--m3d-gray-600`. Só o logótipo cinza usa `--m3d-logo-gray`. |
| `#00b3e7` | 3 | m3d-home (2), css-variables | `--m3d-blue` |
| `#f5f5f5`, `#f3f3f3`, `#f4f4f4`, `#f1f1f1`, `#f7f7f7` | 3+3+1+2+2 | main-collection, main-search, nav, m3d-auth.css, collection-banner | Fundir em `--m3d-gray-50` |
| `#e6e6e6`, `#e7e7e7`, `#e9e9ec` | 2+1+1 | main-collection, main-search, nav, m3d-product.css | Fundir em `--m3d-gray-100` |
| `#555555`, `#5c5c5c`, `#747474`, `#777777` | 2+1+2+2 | m3d-home, gallery, collection-banner, main-collection, m3d-auth.css | Fundir em `--m3d-gray-600`. `#747474` e `#777777` como texto passam a `#606060`, porque falham 4,5:1 sobre `#f5f5f7`. |
| `#bdbdbd` | 1 | m3d-product.css | `--m3d-gray-400` se for borda de controlo; senão `--m3d-gray-200` |
| `#242424`, `#121212` | 2+1 | main-collection, main-search, m3d-home | Eliminar → `--m3d-black` |
| `#f5f3ff`, `#eeecfa`, `#efedf9`, `#e8e4ff` | 2+1+1+1 | main-collection, main-search, m3d-auth.css, m3d-product.css, m3d-home | Fundir em `--m3d-purple-50` |
| `#f8d6e6` | 1 | m3d-home | `--m3d-pink-50` |
| `#f3efe8` (bege) | 1 | m3d-home | Eliminar. Não pertence à paleta. Se o papel for “superfície quente”, decide o líder. |
| `#c90012` | 1 | m3d-home | `--m3d-color-error` |
| `#d02e2e`, `#ff4757`, `#ff0033` | 2+1+2 | contact-form, gift_card, alerta, normalizar.css | Fundir em `--m3d-color-error` |
| `#1cb744`, `#20bf6b` | 2+1 | contact-form, base.css, alerta | Fundir em `--m3d-color-success` (`#1a7f37`). O verde atual falha 4,5:1. |

### 2.3 Cores com transparência (rgba)

| Valor | N.º | Ficheiros | Mapeamento |
| --- | --- | --- | --- |
| `rgba(0,0,0,.28)` + `blur(7px)` | 1 | nav (overlay do menu) | `--m3d-overlay: rgba(0,0,0,.28)` |
| `rgba(0,0,0,.35/.48/.72/.74)` | 2+2+1+1 | image-banner, main-collection, main-search, m3d-home | Véus sobre imagem: `--m3d-scrim: rgba(0,0,0,.48)` e `--m3d-scrim-strong: rgba(0,0,0,.72)`. Fundir os restantes. |
| `rgba(255,255,255,.92/.94)` | 1+2 | m3d-home, main-collection, main-search | `--m3d-surface-glass: rgba(255,255,255,.94)` |
| `rgba(0,0,0,.12/.14/.15/.16/.2/.22/.24)` | vários | sombras | Ver §2.6 |
| `rgba(68,54,188,.12/.14/.8/0)` | 2+2+1+2 | main-collection, main-search, m3d-auth.css, m3d-home | Sombra roxa → `--m3d-shadow-sm`. Anel `.14` → `--m3d-focus-*`. `.8` → avaliar no componente. |
| `rgba(227,28,121,.06)` | 1 | m3d-product.css | Fundir em `--m3d-pink-50` |
| `rgba(255,255,255,.2/.3)`, `rgba(0,0,0,.2)` | 4+1+1 | alerta | Componente legado; rever com o alerta |

### 2.4 Pesos (font-weight)

| Valor | N.º | Ficheiros principais | Mapeamento (D-04 aceite) |
| --- | --- | --- | --- |
| 600 | 19 | m3d-product.css (8), m3d-auth.css (4), main-collection, main-search | `--m3d-weight-bold` (700) em rótulos, botões e preços de destaque; `--m3d-weight-regular` (400) em texto de apoio. Decidir caso a caso na integração. |
| 700 | 14 | m3d-home, nav, main-collection, main-search | `--m3d-weight-bold` |
| 800 | 6 | nav (4), main-collection, main-search | Abaixo de 16 px (rótulos em maiúsculas de 10–13 px): `--m3d-weight-bold`. A Black a 11 px fecha os olhos das letras. A partir de 24 px: `--m3d-weight-black`. |
| 650 | 2 | main-collection, main-search | `--m3d-weight-bold` |
| 500 | 3 | m3d-auth.css | `--m3d-weight-regular` |
| 400 / `normal` | 3+2 | m3d-auth.css, m3d-product.css, base.css, main-list-collections | `--m3d-weight-regular` |
| `bold` | 3+1 | alerta, main-list-collections, normalizar.css (`!important`) | `--m3d-weight-bold` |
| `var(--font-*-weight)` | 3 | css-variables, main-cart | Mantém-se, ligado à setting |

### 2.5 Tamanhos (font-size)

| Valor | N.º | Ficheiros principais | Mapeamento |
| --- | --- | --- | --- |
| 9 px, 10 px | 2+2 | main-collection, main-search, nav | Eliminar → `--m3d-text-xs` (12 px). Abaixo de 12 px não há texto informativo. |
| 11 px | 9 | nav, main-collection, main-search, m3d-home | `--m3d-text-xs` (12 px). É uma decisão do líder, porque altera ligeiramente a barra de benefícios e os rótulos em maiúsculas. |
| 12 px | 15 | m3d-product.css, m3d-home, main-collection | `--m3d-text-xs` |
| 13 px | 22 | main-search (7), main-collection (6), m3d-product.css | `--m3d-text-sm` (14 px). Rótulos em maiúsculas podem ir para `--m3d-text-xs`. |
| 14 px | 20 | m3d-product.css, main-collection, main-search, m3d-auth.css | `--m3d-text-sm` |
| 15 px, 16 px | 5+7 | m3d-product.css, m3d-auth.css, collection-banner | `--m3d-text-md` (16 px) |
| 17 px, 18 px | 2+8 | m3d-home, nav, main-collection, main-search | `--m3d-text-lg` (18 px) |
| 20 px, 22 px | 5+2 | main-collection, nav, m3d-auth.css, m3d-product.css | `--m3d-text-xl` (20 px). O 22 px funde-se no 24 px se for título. |
| 24 px, 26 px, 28 px | 9+2+8 | m3d-product.css, m3d-auth.css, main-search, main-cart | `--m3d-text-2xl` (24 px) e `--m3d-text-3xl` (28 px) |
| 32 px, 36 px, 38 px | 4+1+1 | m3d-home, m3d-product.css, m3d-auth.css | `--m3d-text-4xl` (32 px). 36/38 → `--m3d-display-sm`. |
| `clamp(28–30px, …, 42–48px)` | 4 | m3d-home, main-search, collection-banner | `--m3d-display-sm: clamp(1.875rem, 1.2rem + 2.2vw, 3rem)` |
| `clamp(36px, …, 58–64px)` | 2 | m3d-home | `--m3d-display-lg: clamp(2.25rem, 1.2rem + 3.6vw, 4rem)` |
| `clamp(4rem, 12vw, 8rem)` | 1 | main-404 | Mantém-se local (número decorativo do 404) |
| `var(--f0)…var(--f8)` | 84 | main-cart, base.css, main-article, footer, alerta… | Fundir na escala `--m3d-text-*` (tabela abaixo) |

**Nota sobre `--f0…--f8` (observado):** `clamp(min, 1vw, max)` com `1vw` como valor preferido só sai do mínimo quando `1vw > min`. Por exemplo, `--f8` (3 rem) só sairia dos 48 px com 4800 px de largura. Na prática a escala é fixa no mínimo: `--f0` = 8 px, `--f1` = 11,2 px, `--f2` = 14,4 px, `--f3` = 17,6 px, `--f4` = 20,8 px, `--f5` = 24 px, `--f6` = 28,8 px, `--f7` = 35,2 px e `--f8` = 48 px. Mapeamento proposto:

| Antes | Depois |
| --- | --- |
| `--f0` | `--m3d-text-xs` (8 px é ilegível) |
| `--f1` | `--m3d-text-xs` |
| `--f2` | `--m3d-text-sm` |
| `--f3` | `--m3d-text-lg` |
| `--f4` | `--m3d-text-xl` |
| `--f5` | `--m3d-text-2xl` |
| `--f6` | `--m3d-text-3xl` |
| `--f7` | `--m3d-text-4xl` |
| `--f8` | `--m3d-display-sm` |

### 2.6 Raios (border-radius)

| Valor | N.º | Ficheiros principais | Mapeamento |
| --- | --- | --- | --- |
| 10 px | 23 | m3d-product.css (9), main-search, main-collection, gallery | `--m3d-radius-md` |
| `var(--buttons-radius, 10px)` / `(…, 4px)` | 4+2+1 | main-collection, main-search, base.css, m3d-motion.css | `--m3d-radius-control`. O fallback 4 px de `base.css` diverge do 10 px real. |
| 50 % | 12 | alerta, m3d-product.css, m3d-home | `--m3d-radius-round` |
| 16 px, 15 px, 20 px | 7+1+1 | m3d-auth.css, main-cart, main-collection, alerta, nav (badge) | `--m3d-radius-lg` (16 px); o badge de 20 px → `--m3d-radius-pill` |
| 999 px | 4 | nav (pílula e etiqueta), main-collection, main-search | `--m3d-radius-pill` |
| 4 px, 6 px | 4+2 | product-media-gallery, base.css, m3d-motion.css, gallery | `--m3d-radius-sm` (4 px); o 6 px funde-se aqui |
| 9 px | 2 | main-collection, main-search | Fundir em `--m3d-radius-md` |
| 0 / `--inputs-radius` (0) / `--media-radius` (0) | 2+8+9 | nav, m3d-home, base.css, main-cart… | `--m3d-radius-none`. Mantém-se a setting para o editor. |

### 2.7 Sombras (box-shadow)

| Valor | N.º | Ficheiros | Mapeamento |
| --- | --- | --- | --- |
| `0 1px 4px rgba(0,0,0,.24)` | 1 | m3d-home | `--m3d-shadow-xs` |
| `0 5px 14px rgba(0,0,0,.12)` e `rgba(68,54,188,.12)` | 2+2 | main-collection, main-search | `--m3d-shadow-sm` (versão neutra; a roxa funde-se) |
| `0 12px 26px rgba(0,0,0,.16)` | 1 | nav (hover do banner) | `--m3d-shadow-md` |
| `0 24px 48px rgba(0,0,0,.14/.16)`, `0 16px 48px rgba(0,0,0,.16)`, `0 10px 30px rgba(0,0,0,.2)` | 1+1+1+1 | nav (mega-menu, pesquisa), m3d-motion.css, alerta | `--m3d-shadow-lg` |
| `0 24px 80px rgba(0,0,0,.22)` | 2 | main-collection, main-search (modal) | `--m3d-shadow-xl` |
| `0 0 0 3px rgba(68,54,188,.14)` e o estado inicial a 0 | 2+2 | m3d-auth.css (foco de campo) | Substituir por `outline` com os tokens `--m3d-focus-*`. Um anel a 14 % tem cerca de 1,2:1 e não serve de indicador sozinho. |
| `inset 0 0 0 1px #4436bc`, `0 0 0 1px #4436bc` | 2+1 | m3d-product.css (opção selecionada) | `--m3d-ring-selected: 0 0 0 1px var(--m3d-purple)`. É estado, não elevação. |
| `inset 0 -2px #000` | 1 | nav (`focus-within` da pesquisa) | `--m3d-ring-underline: inset 0 -2px var(--m3d-black)` |
| `0 0 0 100px var(--cor-escuro-1) inset !important` | 1 | normalizar.css (autofill) | Manter. É técnica de autofill. `--cor-escuro-1` não está declarada em `css-variables` (a verificar). |
| `none`, `0 0 0 0 transparent` | 3+1 | nav, base.css, m3d-product.css | Manter |

### 2.8 Foco e movimento (observado)

- **Foco:**
  - Contorno roxo de 2 px com offset de 2–3 px em m3d-product.css (5), m3d-motion.css (2), main-collection e main-search.
  - Contorno branco na paginação do hero.
  - `base.css:61` usa `var(--color-accent)`, que é rosa: 4,46:1 sobre branco, o que passa 3:1 mas difere do resto.
  - Em `nav`, `.m3d-header__search input:focus-visible{outline:none}` depende do `inset 0 -2px #000` no `focus-within` do contentor. É válido.
- **Curvas:** `cubic-bezier(.22,.61,.36,1)` (23), `cubic-bezier(.22,1,.36,1)` (9) e `cubic-bezier(.25,.46,.45,.94)` (1). As três têm pontos de controlo com y ≤ 1, por isso não ultrapassam o destino (compatível com a regra da pílula em `AGENTS.md`).
- **Durações:** sobretudo 160/180/220/320/420–460 ms.

---

## 3. Raleway na biblioteca de fontes da Shopify

**Identificadores confirmados** na tabela “Available fonts” de [shopify.dev — Fonts](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts), consultada a 08/10/2026:

`raleway_n1 raleway_i1 raleway_n2 raleway_i2 raleway_n3 raleway_i3 raleway_n4 raleway_i4 raleway_n5 raleway_i5 raleway_n6 raleway_i6 raleway_n7 raleway_i7 raleway_n8 raleway_i8 raleway_n9 raleway_i9`

A página indica que estas fontes são gratuitas em todas as lojas e servidas em WOFF e WOFF2. Os 9 pesos, normais e itálicos, estão listados, incluindo `raleway_n9` (Black) e `raleway_i7` (Bold Itálico do slogan).

**Carregamento proposto** (a integração é do Codex, que tem a escrita de settings e de `css-variables.liquid`):

| Papel | ID | Carregar | Notas |
| --- | --- | --- | --- |
| Corpo, campos, preços | `raleway_n4` | Sempre | Setting `type_body_font` |
| Títulos, botões, rótulos | `raleway_n7` | Sempre | `type_header_font`, ou `font_modify: 'weight', 'bold'` sobre o corpo |
| Títulos de marca grandes | `raleway_n9` | Sim | `font_modify: 'weight', '900'`, com verificação de `nil` antes de `font_face` |
| Light grande (opcional) | `raleway_n3` | Só se for usado | 300, apenas em ≥ 24 px |
| Itálico | `raleway_i4`/`raleway_i7` | Não | O slogan entra como SVG; carregar itálico só se houver texto real em itálico |

Hoje `css-variables.liquid` carrega 4 `font_face` (cabeçalho, cabeçalho bold, corpo, corpo bold). Com Raleway n4 + n7, o “cabeçalho bold” e o “corpo bold” coincidem. O Codex deve eliminar o carregamento redundante (codex-review §2).

**Algarismos (`lnum`/`tnum`): a verificar na prévia.**

- A documentação da Shopify não refere features OpenType nem subsetting.
- Não consegui confirmar se os WOFF2 servidos por `fonts.shopifycdn.com` mantêm `lnum` e `tnum`: o URL só existe depois de o Liquid renderizar `font_url`, e não havia `fontTools` disponível para inspecionar o ficheiro.
- A Raleway original (Impallari, v4) inclui `lnum`, `onum`, `pnum` e `tnum`, mas um subset pode retirá-los.

**Teste na prévia** (duas formas):

1. No DevTools do Chrome, no separador Rendered Fonts, comparar `font-variant-numeric: lining-nums tabular-nums` num elemento com “€1.234,56”. Se o “1” e o “4” passarem a ter a altura das maiúsculas, a feature existe.
2. Descarregar o `font_url` renderizado e listar a tabela GSUB.

**Se não suportar** (por ordem de preferência):

1. Aceitar algarismos de estilo antigo em texto corrido e aplicar `--m3d-font-numeric` só a preços, quantidades, SKUs e totais, com uma pilha de sistema:
   ```css
   --m3d-font-numeric: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
   ```
   Assim os números ficam alinhados sem carregar outra fonte.
2. Não carregar a Raleway do Google Fonts em paralelo, por desempenho, duplicação e privacidade.
3. Não fabricar algarismos.

Token: `--m3d-numeric: lining-nums tabular-nums`, aplicado com `font-variant-numeric: var(--m3d-numeric)`. Se o suporte falhar, os componentes de preço passam também a `font-family: var(--m3d-font-numeric)`.

---

## 4. Contraste (WCAG 2.x, luminância sRGB)

Os valores da marca vêm de claude-review §4 e codex-review §8. Os cinzentos e os estados foram calculados agora com a mesma fórmula. Limiares:

- Texto normal: 4,5:1.
- Texto grande (≥ 24 px, ou ≥ 18,67 px em bold): 3:1.
- Ícones, bordas de controlo e foco: 3:1 (1.4.11).

### 4.1 Pares aprovados

| Primeiro plano / fundo | Rácio | Uso aprovado |
| --- | --- | --- |
| Preto / branco | 21,00 | Texto, ícones, bordas |
| Preto / `#f5f5f7` (gray-50) | 19,29 | Texto em superfície alternativa |
| Preto / `#f0edff` (purple-50) | 18,26 | Texto em hover/destaque roxo claro |
| Roxo / branco | 8,40 | CTA primário (fundo roxo, texto branco), links, foco, ícones ativos |
| Roxo / gray-50 | 7,72 | Links e foco sobre superfície |
| Roxo / purple-50 | 7,31 | Texto roxo em hover (nav) |
| Preto / azul | 8,60 | Texto preto sobre azul; foco azul sobre preto |
| Preto / rosa | 4,71 | Etiqueta rosa com texto preto (promoção), em qualquer tamanho |
| Branco / preto | 21,00 | Rodapé, barra de benefícios, pílula da nav; foco branco sobre preto |
| `#606060` (gray-600) / branco | 6,29 | Texto secundário |
| gray-600 / gray-50 | 5,78 | Texto secundário em superfície |
| gray-600 / purple-50 | 5,47 | Texto secundário em destaque roxo claro |
| `#8a8a8a` (gray-400) / branco | 3,45 | **Só** bordas de campos e controlos, nunca texto |
| gray-400 / gray-50 | 3,17 | Bordas de campo em superfície |
| Erro `#c90012` / branco | 6,01 | Mensagem de erro, borda de campo inválido |
| Erro / gray-50 | 5,52 | Erro em superfície |
| Sucesso `#1a7f37` / branco | 5,08 | Mensagem de sucesso |
| Sucesso / gray-50 | 4,66 | Sucesso em superfície |
| Rosa / branco | 4,46 | **Só** texto grande (≥ 24 px, ou ≥ 18,67 px bold), ícones decorativos ou foco (≥ 3:1) |

### 4.2 Pares proibidos

| Combinação | Rácio | Motivo |
| --- | --- | --- |
| Branco / rosa ou rosa / branco em texto normal | 4,46 | Falha AA por pouco. Não arredondar. |
| Rosa / gray-50 em texto normal | 4,10 | Falha |
| Rosa / purple-50 | 3,88 | Falha em texto normal |
| Azul / branco (texto ou ícone informativo) | 2,44 | Falha até 3:1 |
| Azul / gray-50 | 2,24 | Falha |
| Branco sobre o gradiente (zona azul) | ≈ 2,44 | O botão da p. 12 não é modelo de CTA. Texto sobre gradiente só com `--m3d-scrim` ou em preto sobre as zonas rosa/azul, verificado no ponto mais fraco. |
| Roxo / preto (texto ou foco) | 2,50 | Usar branco ou azul sobre preto |
| `#747474` ou `#777777` / gray-50 em texto | 4,29 / ≈ 4,1 | Falha: fundir em gray-600 |
| `#6b6b6b` / purple-50 | 4,63 | Passa à justa; preferir gray-600 |
| `#1cb744` (verde atual) / branco | 2,66 | Falha: substituir por `#1a7f37` |
| `#d9d9d9`, `#d6d6d6`, `#c2c2c2` como única borda de campo | 1,41 / ≈ 1,45 / 1,78 | Falha 3:1 em limites de controlo: usar gray-400 |
| Anel `rgba(68,54,188,.14)` como único foco | ≈ 1,2 | Insuficiente |

### 4.3 Foco

| Contexto | Token | Rácio |
| --- | --- | --- |
| Fundo claro (branco, gray-50, purple-50) | `outline: var(--m3d-focus-width) solid var(--m3d-purple)`, offset 2 px | ≥ 7,3 |
| Fundo preto ou escuro | `--m3d-focus-color-inverse: var(--m3d-white)` (21:1). O azul também serve (8,6). | 21 |
| Sobre imagem ou gradiente | Contorno duplo: 2 px branco + 2 px preto (`box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000`) | ≥ 3 contra qualquer fundo |

---

## 5. Logótipo

### 5.1 Assets e geometria (observado)

| Ficheiro | Dimensões (viewBox) | Proporção |
| --- | --- | --- |
| `logo-m3d-positivo.svg` / `-negativo.svg` / `-cinza.svg` | 391,30 × 229,83 | 1,703 : 1 |
| `logo-m3d-horizontal-positivo.svg` / `-negativo.svg` | 145,19 × 32,83 | 4,42 : 1 |
| `assets/m3dsolutionslogo.png` (gradiente) | 3375 × 4219 px, retrato | O símbolo ocupa cerca de 65 % da largura e 30 % da altura. O resto é margem. |
| `slogan-make-it-real.svg` | 295,60 × 29,54 | 10 : 1 |

Observado no PNG em gradiente: o gradiente rosa → roxo → azul **recomeça em cada letra** (M, 3, D) e no arco, e não atravessa a marca uma só vez. É mais uma razão para não o recriar em CSS.

### 5.2 Área de proteção (p. 9)

- **Observado:** a cota “x” é **horizontal**, colocada sobre o “3” (de 239,6 a 292,5 pt: x = 52,9 pt). É a “área da base ao número 3”, ou seja, uma medida de largura, não de altura. Os quatro cantos da construção repetem 52,9 pt à volta da caixa do logótipo.
- **Medida:** a caixa do logótipo na p. 9 tem cerca de 238,5 × 142,5 pt (com ® e SOLUTIONS). Daí:
  - **x ≈ 0,22 × largura** do logótipo stacked;
  - **x ≈ 0,38 × altura** do logótipo stacked.
- **Horizontal (EXTENSÃO derivada):** o manual não desenha a proteção da versão horizontal. Na p. 8, o “3” horizontal tem cerca de 19,5 pt de largura, e no stacked x = 0,67 × largura do “3”. Aplicando a mesma razão: x ≈ 13 pt numa marca com 32,8 pt de altura, ou seja **x ≈ 0,40 × altura** da horizontal (≈ 0,09 × largura).

CSS proposto (`--m3d-logo-h` é a altura renderizada do logótipo):

```css
.m3d-logo           { --m3d-logo-clearspace: calc(var(--m3d-logo-h) * 0.38); padding: var(--m3d-logo-clearspace); }
.m3d-logo--horizontal { --m3d-logo-clearspace: calc(var(--m3d-logo-h) * 0.40); }
```

Ou, com margens, quando o espaço é partilhado com outros elementos. A área livre aplica-se a **outros elementos** (texto, ícones, linhas, bordas). A cor de fundo do contentor não conta como interferência.

### 5.3 Redução (p. 8)

- **Observado:** a cota vertical “10 mm ou 45px” mede a **altura** da assinatura horizontal (traço de 272,3 a 303,9 pt; marca de 270,7 a 303,5 pt). O texto fala de “marca impressa” e manda passar à horizontal quando a leitura de SOLUTIONS ficar prejudicada.
- **Leitura literal (proposta por defeito):** horizontal com **altura ≥ 45 px**, ou seja **largura ≥ cerca de 199 px**. Com a proteção (0,40 × 45 ≈ 18 px), ocupa cerca de 81 px de altura.
- **Conflito para o líder:** num mobile de 360 px (328 px úteis), 199 px de logótipo + 2 × 18 px de proteção + hambúrguer + carrinho (2 × 44 px) = 323 px, que cabe à justa. Com um terceiro ícone (pesquisa), já não cabe. Alternativa a decidir:
  - tratar 45 px como equivalência do mínimo impresso;
  - aceitar no ecrã uma altura mínima de **32 px** (SOLUTIONS fica com cerca de 10 px de altura de letra; medido: as letras têm 0,33 × a altura da marca).

  **Marcar como decisão do líder.**
- **Stacked:** o manual não dá mínimo. Observado: as letras de SOLUTIONS têm cerca de 0,09 × a altura do stacked. No cabeçalho atual (120 px de largura, cerca de 70 px de altura), SOLUTIONS fica com cerca de 6 px, uma leitura “prejudicada” na formulação da p. 8. **Proposta:** stacked só com altura ≥ 110 px (largura ≥ cerca de 190 px); abaixo disso, horizontal.

### 5.4 Regras por contexto (proposta)

| Contexto | Versão | Tamanho | Notas |
| --- | --- | --- | --- |
| Cabeçalho branco, desktop | Horizontal positiva (preta) **ou** gradiente stacked | Horizontal: altura 45 px, cerca de 199 px de largura. Proteção de 18 px cabe no `min-height: 82px` atual. | O stacked no cabeçalho só funciona com altura ≥ 110 px, o que pede um cabeçalho muito mais alto. Recomendo a horizontal. A escolha entre o preto e a imagem de marca em gradiente é do líder (D-10). |
| Cabeçalho mobile | Horizontal positiva | Altura 45 px (ou 32 px se o líder aceitar a alternativa de §5.3) | Hambúrguer e carrinho fora da área livre |
| Rodapé e fundos pretos ou escuros | Negativa (branca), stacked ou horizontal | Stacked ≥ 110 px de altura | Nunca a positiva sobre preto. Nunca o gradiente sobre preto: as zonas roxas ficam com 2,5:1. |
| Fundos de cor da marca (roxo, gradiente, fotografia) | Negativa | Idem | Sobre fotografia, só com véu (`--m3d-scrim`) ou zona calma, porque a p. 7 proíbe fundos que prejudiquem a leitura |
| Monocromático e documentos (fatura, e-mail transacional) | Cinza `#666666` ou positiva | Conforme o template | A cinza só sobre branco ou claro: 5,74:1 |
| Momentos de marca (hero, login, 404, página “Sobre”) | Gradiente stacked (PNG oficial) | Altura ≥ 110 px | Servir uma versão reduzida e recortada da margem, sem alterar o desenho (exportação otimizada, por exemplo WebP de 600 px de largura). O recorte e o redimensionamento são operação do Codex. |
| Favicon e ícone da app | Não definido no manual | — | Fora do âmbito D1. Não recortar o “3” nem o “M” sem os originais do designer. |

Proibições em CSS (p. 7):

- Sem `filter`, `drop-shadow`, `box-shadow`, `transform: rotate/skew` nem `mix-blend-mode` no logótipo.
- Sem `object-fit: fill` com proporção diferente da original, porque distorce.
- Sem `stroke`.
- Sem trocar `fill` por cores fora das três variações.

Nota: hoje o `nav` aplica `mix-blend-mode: difference` aos itens da navegação, não ao logótipo. Manter assim.

---

## 6. Tokens propostos (prontos para `assets/m3d-tokens.css`)

Prefixo `--m3d-`. M = MANUAL, E = EXTENSÃO.

### Marca

| Token | Valor | Papel | Tipo |
| --- | --- | --- | --- |
| `--m3d-black` | `#000000` | Preto institucional | M |
| `--m3d-white` | `#ffffff` | Branco institucional | M |
| `--m3d-pink` | `#e31c79` | Rosa institucional, acento e promoção | M |
| `--m3d-purple` | `#4436bc` | Roxo institucional, ação primária e foco | M |
| `--m3d-blue` | `#00b3e7` | Azul institucional, só em fundo ou acento com texto preto | M |
| `--m3d-gradient` | `linear-gradient(90deg, #e31c79 0%, #4436bc 50%, #00b3e7 100%)` | Gradiente institucional (momentos de marca) | M |
| `--m3d-logo-gray` | `#666666` | Só o logótipo em escala de cinza | M (medido) |
| `--m3d-purple-50` | `#f0edff` | Superfície de hover e destaque roxo | E |
| `--m3d-pink-50` | `#f8d6e6` | Superfície de destaque rosa | E |

### Neutros

| Token | Valor | Papel | Tipo |
| --- | --- | --- | --- |
| `--m3d-gray-50` | `#f5f5f7` | Superfície alternativa (= `color_background_contrast`) | E |
| `--m3d-gray-100` | `#e5e5e5` | Divisórias finas, fundo de skeleton | E |
| `--m3d-gray-200` | `#d9d9d9` | Bordas decorativas, linhas da navegação | E |
| `--m3d-gray-400` | `#8a8a8a` | Bordas de campos e controlos (≥ 3:1) | E |
| `--m3d-gray-600` | `#606060` | Texto secundário (6,29 sobre branco, 5,78 sobre gray-50) | E |

### Semântica

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-color-text` | `var(--m3d-black)` | Texto principal |
| `--m3d-color-text-muted` | `var(--m3d-gray-600)` | Texto secundário, ajudas |
| `--m3d-color-text-inverse` | `var(--m3d-white)` | Texto em fundo escuro |
| `--m3d-color-surface` | `var(--m3d-white)` | Fundo base |
| `--m3d-color-surface-alt` | `var(--m3d-gray-50)` | Secções e campos de pesquisa |
| `--m3d-color-surface-inverse` | `var(--m3d-black)` | Rodapé, barra de benefícios |
| `--m3d-color-border` | `var(--m3d-gray-200)` | Divisórias |
| `--m3d-color-border-control` | `var(--m3d-gray-400)` | Limites de campos |
| `--m3d-color-action-primary` | `var(--m3d-purple)` | CTA primário (D-03) |
| `--m3d-color-action-primary-text` | `var(--m3d-white)` | Texto do CTA primário |
| `--m3d-color-action-secondary` | `var(--m3d-black)` | Botão secundário (contorno preto) |
| `--m3d-color-accent` | `var(--m3d-pink)` | Promoção, acento |
| `--m3d-color-accent-text` | `var(--m3d-black)` | Texto sobre rosa |
| `--m3d-color-link` | `var(--m3d-purple)` | Links e hover |
| `--m3d-color-price` | `var(--m3d-black)` | Preço (o roxo fica para o preço de saldo, se o líder quiser) |
| `--m3d-color-error` | `#c90012` | Erros (6,01) |
| `--m3d-color-success` | `#1a7f37` | Sucesso (5,08) |
| `--m3d-overlay` | `rgba(0,0,0,.28)` | Fundo de menus e modais (com `backdrop-filter`) |
| `--m3d-scrim` | `rgba(0,0,0,.48)` | Véu de imagem para texto branco |
| `--m3d-scrim-strong` | `rgba(0,0,0,.72)` | Véu forte |
| `--m3d-surface-glass` | `rgba(255,255,255,.94)` | Barras flutuantes |

### Foco e estados

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-focus-color` | `var(--m3d-purple)` | Foco em fundos claros |
| `--m3d-focus-color-inverse` | `var(--m3d-white)` | Foco em fundos escuros |
| `--m3d-focus-width` | `2px` | Espessura |
| `--m3d-focus-offset` | `2px` | Afastamento |
| `--m3d-focus-ring-media` | `0 0 0 2px #fff, 0 0 0 4px #000` | Foco sobre imagem ou gradiente |
| `--m3d-ring-selected` | `0 0 0 1px var(--m3d-purple)` | Opção de produto selecionada |
| `--m3d-ring-underline` | `inset 0 -2px var(--m3d-black)` | Campo de pesquisa ativo |

### Tipografia

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-font-family` | `var(--font-body-family)` (Raleway via `font_picker`) | Família única (M) |
| `--m3d-font-numeric` | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` | Só se `lnum` falhar (§3) |
| `--m3d-numeric` | `lining-nums tabular-nums` | `font-variant-numeric` para preços e quantidades |
| `--m3d-weight-light` | `300` | Opcional, ≥ 24 px |
| `--m3d-weight-regular` | `400` | Corpo, campos, preços |
| `--m3d-weight-bold` | `700` | Títulos, botões, rótulos |
| `--m3d-weight-black` | `900` | Títulos de marca ≥ 24 px |
| `--m3d-text-xs` | `0.75rem` (12 px) | Legendas, rótulos em maiúsculas |
| `--m3d-text-sm` | `0.875rem` (14 px) | Navegação, texto auxiliar |
| `--m3d-text-md` | `1rem` (16 px) | Corpo, campos (evita zoom no iOS) |
| `--m3d-text-lg` | `1.125rem` (18 px) | Corpo de destaque |
| `--m3d-text-xl` | `1.25rem` (20 px) | Subtítulos |
| `--m3d-text-2xl` | `1.5rem` (24 px) | Títulos de bloco; limiar de “texto grande” |
| `--m3d-text-3xl` | `1.75rem` (28 px) | H1 de página interna e PDP |
| `--m3d-text-4xl` | `2rem` (32 px) | Títulos de secção |
| `--m3d-display-sm` | `clamp(1.875rem, 1.2rem + 2.2vw, 3rem)` | Títulos editoriais (30–48 px) |
| `--m3d-display-lg` | `clamp(2.25rem, 1.2rem + 3.6vw, 4rem)` | Hero (36–64 px) |
| `--m3d-leading-tight` | `1.1` | Display |
| `--m3d-leading-snug` | `1.3` | Títulos |
| `--m3d-leading-body` | `1.55` | Corpo |
| `--m3d-tracking-caps` | `0.08em` | Rótulos em maiúsculas (valor observado .08–.09em) |

### Espaçamento (E, base 4 px)

| Token | Valor |
| --- | --- |
| `--m3d-space-1` | `4px` |
| `--m3d-space-2` | `8px` |
| `--m3d-space-3` | `12px` |
| `--m3d-space-4` | `16px` (margem lateral mobile) |
| `--m3d-space-5` | `24px` |
| `--m3d-space-6` | `32px` |
| `--m3d-space-7` | `48px` |
| `--m3d-space-8` | `64px` (= `spacing_sections`) |
| `--m3d-space-9` | `96px` |
| `--m3d-space-10` | `128px` |

### Raios (E)

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-radius-none` | `0` | Media e campos atuais (settings a 0) |
| `--m3d-radius-sm` | `4px` | Etiquetas pequenas, foco de links |
| `--m3d-radius-md` | `10px` | Cards e botões atuais (= `buttons_radius`) |
| `--m3d-radius-lg` | `16px` | Modais, painéis, cartões de login |
| `--m3d-radius-pill` | `999px` | Pílula da navegação, badges, CTA se o líder optar por pílula |
| `--m3d-radius-round` | `50%` | Pontos, avatares, botões circulares |
| `--m3d-radius-control` | `var(--m3d-radius-md)` | Alias para botões. Decisão do líder: `md` (atual) ou `pill` (como na p. 12). |

### Sombras (E; nunca no logótipo)

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-shadow-xs` | `0 1px 4px rgba(0,0,0,.16)` | Pontos e controlos sobre imagem (antes .24) |
| `--m3d-shadow-sm` | `0 4px 14px rgba(0,0,0,.12)` | Hover de card |
| `--m3d-shadow-md` | `0 12px 26px rgba(0,0,0,.16)` | Cartão elevado em hover |
| `--m3d-shadow-lg` | `0 24px 48px rgba(0,0,0,.16)` | Mega-menu, painel de pesquisa, dropdowns, alerta |
| `--m3d-shadow-xl` | `0 24px 80px rgba(0,0,0,.22)` | Modais |

### Movimento (E)

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-ease-out` | `cubic-bezier(.22,.61,.36,1)` | Transições gerais, sem ultrapassagem |
| `--m3d-ease-emphasis` | `cubic-bezier(.22,1,.36,1)` | Painéis e pílula. Monotónica (y ≤ 1). |
| `--m3d-duration-fast` | `180ms` | Cor e hover |
| `--m3d-duration-base` | `320ms` | Overlays |
| `--m3d-duration-slow` | `440ms` | Painéis e mega-menu |

Nota: dentro de `@media (prefers-reduced-motion: reduce)`, as durações passam a `1ms` ou a transições de opacidade.

### Logótipo (E derivada do M)

| Token | Valor | Papel |
| --- | --- | --- |
| `--m3d-logo-h-min` | `45px` | Altura mínima da horizontal (p. 8; ver a alternativa de 32 px em §5.3) |
| `--m3d-logo-stacked-h-min` | `110px` | Abaixo disto, usar a horizontal (proposta D1) |
| `--m3d-logo-clearspace-ratio` | `0.38` | x / altura no stacked (p. 9, medido) |
| `--m3d-logo-h-clearspace-ratio` | `0.40` | x / altura na horizontal (derivado) |

---

## 7. Decisões para o líder e valores por verificar

**Decisões para o líder:**

1. **Mínimo da horizontal:** 45 px literal ou 32 px no ecrã (§5.3).
2. **Cabeçalho:** horizontal preta ou gradiente stacked. A geometria favorece a horizontal (§5.4, D-10).
3. **Raio dos botões:** `md` (10 px, atual) ou `pill` (p. 12).
4. **Texto mínimo de 12 px:** substitui 9/10/11 px na barra de benefícios e nos rótulos.
5. **Peso 600:** passa a 700 ou a 400, componente a componente.
6. **Bege `#f3efe8` na home:** eliminar ou justificar.
7. **Borda de campo:** `#8a8a8a`, mais escura do que os atuais `#d6d6d6`/`#c2c2c2`, por exigência de 3:1.

**Valores por verificar:**

- `lnum`/`tnum` nos WOFF2 da Shopify: a verificar na prévia (§3).
- `font_modify: 'weight', '900'` a devolver `raleway_n9` na prévia. O ID está documentado.
- `--cor-escuro-1` em `normalizar.css` não aparece declarada em `css-variables.liquid`.
- As razões de proteção (0,38 e 0,40) foram medidas no PDF com tolerância de cerca de ±2 %. A da horizontal é derivada, não desenhada no manual.
