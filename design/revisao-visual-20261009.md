# Revisão visual — pesquisa, card e página de produto

09/10/2026. Autor: Claude (Design System). **Implementação: Codex** no tema, na prévia local, sem `theme push`. Todas as alterações foram aprovadas pelo utilizador nesta data, com uma exceção: o botão MyShop do card **fica como está**.

Ler antes: `AGENTS.md` (pílula e navegação intactas), `design/design-system-m3d.md`, tokens novos em `assets/m3d-tokens.css` (bloco "Buttons v2" e "Colour swatches") e o sistema de ícones em `design/icones-m3d.md`. Capturas do estado anterior: `analises/qa-visual/claude-20261009/revisao-v2/` (pesquisa, coleção e PDP do polo, desktop e telemóvel).

## R1 — Pesquisa (`sections/main-search.liquid`)

1. **Uma só pesquisa.** Remover o formulário de pesquisa da página (campo + "Pesquisar"), com ou sem termo. A pesquisa do cabeçalho é a única.
   - Com termo: título "Resultados para "{termo}"" e, na mesma linha, a contagem ("23 produtos") e o seletor de ordenação.
   - Sem termo: título "Pesquisar", texto curto "Use a pesquisa no topo da página" e as sugestões atuais. No telemóvel, um botão tinted "Pesquisar produtos" que foca o campo do cabeçalho (`focus()` no input existente, sem novo campo).
2. **Ordenação compacta.** "Ordenar por" sai da barra lateral. Usar um `<select>` nativo estilizado "Ordenar: Relevância ▾" (Relevância, Preço ascendente, Preço descendente), alinhado à direita da contagem, com altura `--m3d-button-height-sm` e cápsula com borda `--m3d-color-border`. Ao mudar, submeter o GET atual com `sort_by`, sem JavaScript obrigatório (progressive enhancement: botão "Aplicar" escondido com JS ativo).
3. **Só filtros com valores.** Não mostrar grupos cujo `filter.values` está vazio ou só tem valores com `count == 0`. Isto remove Material, Técnica, Etiquetagem e similares enquanto não houver dados. Igual em `main-collection.liquid`.
4. **Telemóvel:** linha única com "Filtros" (botão tinted) à esquerda e "Ordenar ▾" à direita.

## R2 — Card de produto (`snippets/card-product.liquid`, `snippets/price.liquid`)

1. **Remover a linha do SKU** acima do título.
2. **Preço** (`m3d-color-price`, números tabulares):
   - Produtos com a tag `midocean-piloto` (com descontos por escalão): "desde **{{ price_min × 0,84375 }}** €/un.", porque 0,84375 = 1,35/1,60, o melhor escalão (2000+). Arredondar **para cima** ao cêntimo (`price_min | times: 0.84375 | ceil | money`). *Corrigido a 12/10/2026:* a versão anterior dizia `round`, mas a Shopify trunca o desconto por unidade ao cêntimo (159 − ⌊159 × 0,15625⌋ = 135), e para cêntimos inteiros p − ⌊p·d⌋ = ⌈p·(1−d)⌉; `round` anunciava 1 cêntimo abaixo do cobrado em 3 dos 6 artigos. Confirmado nos seis carrinhos de 2000 un. (`analises/qa-visual/codex-20261009/r2/cart-2000-six-products.json`).
   - Outros produtos com preço: "**{{ price_min | money }}** /un." (sem "desde" se `price_varies` for falso).
   - Preço zero: "Sob consulta" (como agora).
   - **Corrigir a tradução:** `products.product.price.from_price_html` aparece em inglês ("From"). O tema tem só `en.default.json`: acrescentar `locales/pt-PT.json` com as chaves usadas no card e na PDP, ou trocar a string por texto PT controlado no snippet, seguindo o que o resto do tema faz.
3. **Botão "Personalizar"**, abaixo do preço, alinhado à esquerda:
   - Cápsula filled `--m3d-color-action-primary`, texto branco, altura `--m3d-button-height-sm`, padding `--m3d-space-4`, peso `--m3d-button-weight`.
   - Ícone `m3d-arrow` (§ícones, **não usar seta genérica**) à direita, 18 px. No hover, a seta desliza 3 px para a direita em `--m3d-duration-fast` `--m3d-ease-out`. No `:active`, `scale(var(--m3d-press-scale))`.
   - É um link para o produto (`<a>`), não um `<button>`. Não duplicar o link da imagem para leitores de ecrã: o card mantém um só link de destino principal e o botão usa `aria-hidden="true"` com `tabindex="-1"`, **ou** o card deixa de ter link na imagem. Escolher uma solução e documentar; recomendação: a imagem e o título levam ao produto, e o botão é o mesmo link com texto "Personalizar {{ product.title }}" visualmente reduzido a "Personalizar".
   - Desktop e telemóvel: sempre visível.
4. **MyShop do card: sem alterações** (decisão do utilizador).

## R3 — Página de produto (`sections/main-product.liquid`, `snippets/m3d-product-gallery.liquid`, `assets/m3d-product*.css|js`)

### Cores em círculo
- Dados: metafield de produto **`custom.colour_swatches`** (JSON `{ "<valor da opção Cor>": "#RRGGBB" }`), preenchido pelo importador do backend.
- Render: cada valor de "Cor" com hex → `<input type="radio">` acessível + `<label>` com círculo `--m3d-swatch-size` dentro de área `--m3d-swatch-hit`. O `title` e o `aria-label` são o nome da cor.
- Selecionado: `box-shadow: var(--m3d-swatch-ring)`. Branco e cores muito claras: borda 1px `--m3d-swatch-border`, sempre.
- Indisponível: diagonal cinza sobre o círculo e `aria-disabled`, sem esconder o nome.
- Legenda mantém-se: "Cor · Aqua" (atualiza ao mudar).
- Sem hex para um valor: esse valor usa a pílula de texto atual (fallback por valor, não pela opção inteira).
- Tamanhos: a ordem XS → 3XL já vem dos dados; manter pílulas de texto.

### Ações por baixo da galeria
Uma fila **por baixo das miniaturas** (`m3d-product-gallery`, depois do contador "1 / 10"), alinhada à grelha da galeria:
1. **"Pedir orçamento"**: cápsula tinted (`--m3d-color-action-tinted`, texto `--m3d-color-action-tinted-text`, hover `--m3d-color-action-tinted-hover`), altura `--m3d-button-height`, com o link atual (produto, variante e quantidade).
2. **MyShop**: botão circular `--m3d-icon-button-size`, fundo `--m3d-icon-button-bg`, ícone `m3d-bookmark`, abre o diálogo atual. `aria-label="Adicionar ao MyShop"` e tooltip.
3. **Partilhar**: igual, ícone `m3d-share`, comportamento atual de `share-button` (Web Share API com fallback copiar link). `aria-label="Partilhar"`.

Remover os elementos antigos da coluna de compra: link "Adicionar ao MyShop", segundo "Pedir orçamento" e botão "Partilhar". No bloco "Personalização" fica só o texto "Personalização disponível por orçamento", sem link duplicado (a fila da galeria é o único "Pedir orçamento").

Telemóvel: a fila fica logo abaixo das imagens e acima do título. Desktop: por baixo das miniaturas, na coluna da galeria.

"Adicionar ao carrinho" continua a ser **a única ação filled** da página (`--m3d-button-height`, cápsula roxa).

### Botões — estilo comum (inspiração Apple, sem copiar)
- Hierarquia: filled (1 por vista) › tinted › icon circle › link.
- Transições `background-color`, `transform`, `box-shadow` em `--m3d-duration-fast` `--m3d-ease-out`. `:active` com `scale(var(--m3d-press-scale))` (ícone: `--m3d-press-scale-icon`). `:focus-visible` com `box-shadow: var(--m3d-focus-ring-action)`. Sem sombras de elevação.
- Alvo mínimo 44×44 px. Texto Raleway `--m3d-button-weight`, sem maiúsculas forçadas.
- `prefers-reduced-motion` já anula a escala (tokens).

### Recomendações
"You may also like" → **"Também pode gostar"**. Usar o contentor da página (`--m3d-page-width` + gutter) e a grelha de cards da coleção (4 colunas no desktop, 2 no telemóvel), com o card R2.

### Descrição
O importador já remove o modelo do fornecedor no início ("SOL'S PITCHER UNISEX POLO, …" → "Pólo desportivo, …"). No tema não é preciso fazer nada.

## Critérios de aceitação (QA)
- 1440, 1024, 390 e 360 px sem overflow; teclado (Tab/Shift+Tab/Enter/Espaço/setas no grupo de cores); leitor de ecrã anuncia "Cor, Aqua, selecionado".
- Uma única pesquisa visível em qualquer página; ordenação funciona sem JS.
- Card: sem SKU; preço PT; botão com a seta M3D; MyShop igual ao atual.
- PDP: círculos com hex reais nos 6 produtos do piloto; fallback de texto testado com um valor sem hex; uma única ação "Pedir orçamento"; MyShop e Partilhar funcionais.
- Pílula da navegação desktop intacta (regras do `AGENTS.md`).
- Theme Check sem erros; capturas antes/depois em `analises/qa-visual/`.
