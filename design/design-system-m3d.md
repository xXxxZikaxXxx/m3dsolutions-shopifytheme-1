# Design System M3D

Autor: Claude, líder do Design System. Data: 08/10/2026. Estado: **v1 para revisão do Codex**.

## Fontes

- Tokens: [`assets/m3d-tokens.css`](../assets/m3d-tokens.css), proprietário Claude (D-09).
- Origem de cada token: [`d1-marca-tokens.md`](d1-marca-tokens.md).
- Direção visual: [`visual-b2c-b2b.md`](visual-b2c-b2b.md).
- Jornadas e estados: [`d2-jornadas.md`](d2-jornadas.md).
- Assets oficiais: `referencias/marca/extraidos/`.

## 1. Decisões fechadas pelo Claude

São decisões do D1 dentro da autoridade do líder do Design System. Mudanças globais de componente continuam a precisar do parecer do Codex.

| Assunto | Decisão | Fundamento |
| --- | --- | --- |
| Logótipo no cabeçalho | Horizontal positiva preta: 40 px de altura no desktop, 32 px no mobile | No empilhado, “SOLUTIONS” ficaria com cerca de 6 px. O manual manda usar a horizontal quando a leitura fica prejudicada (p. 8). O utilizador delegou a escolha (D-10) |
| Mínimo de 45 px | Aplicado à marca impressa, como diz a p. 8 (“aplicação da marca impressa”). No ecrã, 32 px de altura garantem “SOLUTIONS” legível com cerca de 9 px de altura de letra | A 45 px, num ecrã de 360 px, só cabem dois ícones no cabeçalho |
| Logótipo em gradiente | PNG oficial, só em momentos de marca sobre branco (login, página Sobre, confirmação de orçamento), servido redimensionado | Oficial (D-10), mas sem vetor disponível |
| Logótipo negativo | Rodapé e faixa de empresas | p. 6 |
| Raio dos controlos | Pílula | Coerente com a pílula da navegação e com o único botão do manual (p. 12) |
| Texto mínimo | 12 px | Substitui 9/10/11 px |
| Pesos | 400, 700 e 900; o 300 é opcional e só ≥ 24 px. Os 600/650/800 atuais passam a 700 (títulos, botões, rótulos) ou a 400 (resto) | D-04 |
| Bege `#f3efe8` | Eliminado | Fora da paleta, e é um tom típico de layout genérico |
| Borda de campo | `#8a8a8a` (3,45:1) | WCAG 1.4.11, componentes ≥ 3:1 |
| Maiúsculas | Nenhum rótulo em maiúsculas espaçadas. Só o slogan (SVG oficial) | Ver `visual-b2c-b2b.md` §6 |
| Sombras | Só em camadas flutuantes (pesquisa, mega menu, modal) | Cards sem sombra |

## 2. Componentes

As classes são indicativas e seguem BEM (`liquid-theme-standards`). O Codex decide os nomes finais na integração.

### Botão — `.m3d-button`

| Variante | Fundo | Texto | Borda | Uso |
| --- | --- | --- | --- | --- |
| `--primary` | `--m3d-color-action-primary` | branco, 700 | — | Uma ação principal por vista: adicionar ao carrinho, ver produtos, enviar pedido |
| `--secondary` | transparente | preto, 700 | 2 px preto | Ação alternativa ao lado da principal |
| `--inverse` | branco | preto, 700 | — | Sobre preto (faixa de empresas, rodapé) |
| `--link` | — | roxo, 700, sublinhado | — | Ações terciárias (“Encomendas para empresas”) |

- **Medidas:** altura mínima de 48 px (alvo ≥ 44 px), padding horizontal de 24 px, raio `--m3d-radius-control`, `--m3d-text-md`.
- **Estados:**
  - hover: roxo 8 % mais escuro via `color-mix`, com `#3a2ea3` como alternativa;
  - foco: anel de 2 px `--m3d-focus-color` com afastamento de 2 px;
  - desativado: opacidade 0,45 e `cursor: not-allowed`, com motivo visível junto do botão;
  - a enviar: rótulo “A enviar…”, `aria-busy="true"` e largura fixa.
- Sem setas ou ícones decorativos no rótulo. Um ícone só entra quando substitui informação (carrinho, pesquisa).

### Campo — `.m3d-field`

- Rótulo visível acima, em 700 e `--m3d-text-sm`. Placeholder só como exemplo, terminado em “…”.
- Caixa com 48 px de altura, borda de 1 px `--m3d-color-border-control`, raio `--m3d-radius-field`, `--m3d-text-md` (evita o zoom no iOS).
- **Erro:** borda e mensagem em `--m3d-color-error`, mensagem por baixo, `aria-invalid` e `aria-describedby`.
- **Ajuda:** `--m3d-color-text-muted`, `--m3d-text-sm`.

### Preço — `.m3d-price`

- Peso 400, `font-variant-numeric: var(--m3d-numeric)`, cor `--m3d-color-price`.
- **Estados:** valor; “Sob consulta”; “Desde X €” calculado só sobre as variantes com preço, mais “Algumas opções sob consulta”; preço riscado com `aria-hidden` e rótulo acessível.
- Nunca “€0,00”. O carrinho mantém os valores reais da Shopify (D-07).

### Card de produto — `.m3d-card`

- Imagem `aspect-ratio: 1`, fundo `--m3d-color-surface-alt`, raio `--m3d-radius-media`, `object-fit: contain` com 8 % de respiro. As fotografias de fornecedor vêm sobre branco.
- Nome em 700 `--m3d-text-md` até 2 linhas, preço por baixo. Um único link (o card inteiro) e um único tab stop.
- Ação MyShop: ícone de 20 px com rótulo acessível “Guardar no MyShop”, acessível por teclado: é uma ação distinta do link do card. Sem coração (L-4).
- Sem sombra nem borda. No hover, apenas o zoom da imagem (`scale(1.04)`, `--m3d-duration-base`) e só em `@media (hover: hover)`.

### Etiqueta — `.m3d-badge`

- Pílula, `--m3d-text-xs`, 700, sentence case.
- **Variantes:** promoção (rosa com texto preto); novidade (preto com texto branco); esgotado (`--m3d-gray-100` com texto preto).
- Só com dado real (`compare_at_price`, tag, disponibilidade).

### Modal e painel

- Fundo branco, raio `--m3d-radius-panel`, `--m3d-shadow-modal`, véu `--m3d-overlay`.
- Usar `<dialog>`, com foco no primeiro elemento e retorno ao gatilho (`liquid-theme-a11y`).

### Pincelada — `.m3d-brushstroke`

- SVG inline a partir de `referencias/marca/extraidos/pincelada-m.svg`, com `fill="currentColor"` e `aria-hidden="true"`.
- Só no hero da homepage, por trás do produto e cortada pelo contentor (`overflow: hidden`). Nunca por trás de texto, preço ou formulário.
- **Revelação:** `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` em `--m3d-duration-signature` com `--m3d-ease-out`, uma vez. Com movimento reduzido, aparece estática.

### Logótipo — `.m3d-logo`

- Contém sempre o espaço de proteção: padding = altura × `--m3d-logo-h-clearspace-ratio` na horizontal.
- `alt` com o nome da loja. Sem sombra, contorno, rotação ou recoloração fora das variantes oficiais (p. 7).

### Faixa de empresas — `.m3d-business-band`

- Fundo preto, texto branco, logótipo negativo à esquerda.
- Título 900 `--m3d-display-sm`, uma frase em `--m3d-text-lg` e um botão `--inverse` “Pedir orçamento”. É o único bloco escuro da homepage.

### Navegação

- Não muda. A pílula segue o `AGENTS.md`: move-se só por clique ou ativação equivalente, com movimento monotónico e sem ultrapassagem.
- A curva `--m3d-ease-emphasis` é monotónica e pode substituir a atual só se o comportamento ficar idêntico.

## 3. Tipografia aplicada

| Papel | Tamanho | Peso | Entrelinha | Notas |
| --- | --- | --- | --- | --- |
| Hero H1 | `--m3d-display-lg` | 900 | 1,0 | tracking −0,02em, máx. 12 ch por linha |
| Título de secção (H2) | `--m3d-display-sm` | 900 | 1,1 | |
| H1 de página interna e PDP | `--m3d-text-3xl` | 700 | 1,3 | |
| Subtítulo / H3 | `--m3d-text-xl` | 700 | 1,3 | |
| Corpo | `--m3d-text-md` | 400 | 1,55 | Linha até `--m3d-measure` |
| Auxiliar | `--m3d-text-sm` | 400 | 1,5 | |
| Legenda | `--m3d-text-xs` | 400 | 1,4 | Mínimo absoluto |

## 4. Pedidos ao Codex para a integração

1. **Carregamento:** `{{ 'm3d-tokens.css' | asset_url | stylesheet_tag }}` em `layout/theme.liquid`, antes dos CSS de componentes.
2. **Fontes:** `font_picker` para `raleway_n4` no corpo e `raleway_n9` nos títulos, com `font_modify` para 700. Verificar na prévia `lnum`/`tnum` e o peso 900.
3. **Cascata:**
   - Retirar a redeclaração local de `--m3d-*` em `sections/m3d-home.liquid`.
   - Mapear `snippets/css-variables.liquid` para estes tokens sem duplicar valores.
   - Declarar ou eliminar `--cor-escuro-1`.
4. **Foco global** de `base.css`: de rosa para `--m3d-focus-color`.
5. **Substituição gradual** das cores fixas por tokens, área a área, conforme o mapa do §2 de `d1-marca-tokens.md`.
6. **Assets:** criar `logo-m3d-horizontal-positivo.svg` e `-negativo.svg` em `assets/` a partir de `referencias/marca/extraidos/`, e uma versão redimensionada do PNG em gradiente.

## 5. QA de aceitação do sistema

- Contraste: todos os pares de texto ≥ 4,5:1 e os componentes ≥ 3:1, conforme a tabela do D1 §4.
- Teclado: foco visível em todos os controlos, nos dois fundos.
- 1440, 1024, 768, 390 e 360 px sem overflow horizontal.
- `prefers-reduced-motion`: pincelada estática; pílula conforme o `AGENTS.md`.
- Nenhum texto abaixo de 12 px. Nenhum `€0,00` em card ou PDP.

## 6. Alterações à v1

- **08/10/2026:** a escala de espaçamento passou a `--m3d-space-N = N × 4 px` (1–6, 8, 10, 12, 16, 24, 32), para coincidir com o código já escrito pelo C2. A tabela de espaçamento do D1 §6 fica substituída por esta convenção. Acrescentado `--m3d-color-action-primary-hover: #362b96`.
- **08/10/2026:** exceção medida pelo C3: a Raleway servida pela Shopify ignora `lnum`/`tnum` (larguras diferentes entre “111111” e “888888” em 400/16 px). Acrescentado `--m3d-font-numeric` (pilha do sistema), aplicado só a preços, quantidades, SKU, contadores e números de passos. Corpo e títulos continuam em Raleway. Para repor a Raleway nos números, a alternativa é servir uma WOFF2 da Raleway (OFL) com `lnum` como asset próprio, avaliando o peso. Fica para depois.
