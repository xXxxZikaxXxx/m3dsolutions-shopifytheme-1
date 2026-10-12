# Sistema de ícones M3D

09/10/2026. Dono: Claude (Design System). **Implementação: Codex**, depois de este documento passar a "pronto" (§6). Pedido do utilizador: trocar os ícones do site inteiro para não parecerem genéricos. A fonte principal de pesquisa será o **MCP do 21st** (ícones, componentes, inspiração), quando estiver instalado nos dois agentes.

## 1. Inventário atual

| Origem | Ícones | Uso |
| --- | --- | --- |
| `snippets/icon.liquid` | search, account, cart, close, chevron, plus, minus, trash, instagram, facebook, linkedin (+ caso `nome`) | Cabeçalho, carrinho, steppers, acordeões, rodapé |
| SVG inline | marcador (MyShop) em `card-product` e `main-product`; chevron de filtro em `main-collection`, `main-search`, `collection-filter-group` | Card, PDP, filtros |
| Caracteres de texto | `↗` (MyShop na nav), `←` `→` (galeria), `&larr;` `&rarr;` (paginação), seta de "Coleções" na nav | Navegação |
| Sem ícone | Partilhar (texto), estados de stock, upload, pedir orçamento | PDP, orçamento |

Problemas: traço e cantos misturados (1.5 vs outros), chevrons repetidos em quatro sítios, setas tipográficas que mudam com a fonte, e nenhum ícone com identidade M3D.

## 2. Direção

- **Linguagem:** linha de 1,75 px a 24 px (escala proporcional), terminações e junções arredondadas, cantos com raio 2. Geometria simples, mas com **um detalhe de marca**: nos ícones de ação (seta, partilhar, adicionar) o traço principal afina numa ponta, a ecoar a pincelada do manual (p. 13–17). Ícones utilitários (fechar, chevron, mais/menos) ficam neutros, sem afinamento, para não fazer ruído.
- **Grelha:** 24×24, área ativa 20×20, 2 px de margem. Exportar com `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"` (formas afinadas em `fill="currentColor"`).
- **Cor:** sempre `currentColor`; nada de cores fixas, exceto redes sociais monocromáticas.
- **Tamanhos:** 16 (inline em texto), 20 (`--m3d-icon-size`, padrão), 24 (cabeçalho).
- **Acessibilidade:** decorativo → `aria-hidden="true"` e `focusable="false"`; ícone-botão → `aria-label` no botão, nunca no SVG.
- **Fonte:** primeiro o 21st (inspiração e bases de licença aberta); a seguir, ajuste à mão para a linguagem acima. Registar a licença de cada base na tabela §4. Não usar conjuntos inteiros sem os adaptar, porque o objetivo é não parecerem genéricos.

## 3. Conjunto v1 — desenhado (09/10/2026)

Os ficheiros finais estão em **`design/icones/*.svg`** (fonte de verdade). São gerados por `design/icones/_build.py`; para alterar um ícone, editar o script e voltar a gerar. Folha de prova: `design/icones/preview.html` (16/20/24/48 px, fundo escuro, botão tinted), captura em `analises/qa-visual/claude-20261009/icones-m3d-v1.png`.

Regras de construção: 24×24, traço 1,75 com pontas e junções redondas; a **pincelada** é uma forma preenchida que afina para uma ponta (eco da pincelada do manual), usada só em ícones de ação.

## 4. Catálogo

| Nome | Substitui / uso | Pincelada | Estado |
| --- | --- | --- | --- |
| m3d-arrow | botão "Personalizar" (card), "seguinte" (galeria, paginação) | sim (haste) | pronto |
| m3d-arrow-left | "anterior" (galeria, paginação) | sim | pronto |
| m3d-external | `↗` do MyShop na navegação | sim (diagonal) | pronto |
| m3d-cart | cart (cabeçalho, carrinho) — saco tote em vez de carrinho de supermercado | sim (traço interior) | pronto |
| m3d-bookmark | marcador MyShop (card, PDP) | sim | pronto |
| m3d-share | texto "Partilhar" (PDP) | sim (haste) | pronto |
| m3d-upload | envio do logótipo (personalização, orçamento) | sim (haste) | pronto |
| m3d-quote | "Pedir orçamento" | sim (linhas de texto) | pronto |
| m3d-search | search (cabeçalho) | sim (cabo) | pronto |
| m3d-account | account | não | pronto |
| m3d-chevron | chevron + 4 SVG inline dos filtros e acordeões | não | pronto |
| m3d-close | close | não | pronto |
| m3d-plus / m3d-minus | steppers, acordeões | não | pronto |
| m3d-trash | trash (carrinho) | não | pronto |
| m3d-check | sucesso (formulários, "adicionado") | não | pronto |
| m3d-alert | erros e avisos | não | pronto |
| m3d-filter | botão "Filtros" (pesquisa/coleção, telemóvel) | não | pronto |
| instagram / facebook / linkedin | rodapé | — | manter formas oficiais; só uniformizar tamanho 20 px |

**Original M3D:** nenhum ícone foi copiado de bibliotecas. O 21st serviu de inspiração de **interação**, não de geometria.

### Interação (inspirada no 21st, adaptada)
- **Seta em botões** (ref. 21st "Morphing Arrow Button" #3179 e "Interactive Animated Arrow Icon" #2193): no hover/focus do botão, `m3d-arrow` faz `translateX(3px)` em `--m3d-duration-fast` `--m3d-ease-out`.
- **Pincelada que se desenha** (ref. 21st "Line Draw SVG" #18352 e "Animated Signature" #16799): opcional, só no **hover de ícones de ação em botões circulares** (MyShop, Partilhar). A parte com traço desenha-se (`stroke-dasharray`/`stroke-dashoffset` de 100% a 0 em `--m3d-duration-base`) e a pincelada aparece com `opacity` 0→1 no fim. Nada em ícones utilitários.
- **Micro-pressão** (ref. 21st "Animated Icon Buttons" #28541): `:active` com `--m3d-press-scale-icon`.
- Sempre condicionadas a `prefers-reduced-motion: no-preference` (os tokens já anulam a duração).

## 5. Plano de implementação (para o Codex)

1. Um único `snippets/icon.liquid` com todos os nomes `m3d-*` (parâmetros `name`, `size` opcional, `class` opcional). Sem SVG inline fora do snippet.
2. Substituir todos os usos do §1, incluindo os caracteres de seta (`m3d-product-gallery`, `pagination`, `nav`).
3. CSS: `.m3d-icon { width: var(--m3d-icon-size); height: var(--m3d-icon-size); flex: none; }` e as variantes de tamanho. O stroke escala com o viewBox.
4. QA: capturas de todas as páginas a 1440 e 390 px; Theme Check; nenhum ícone sem `aria-hidden` ou sem rótulo no botão.

## 6. Estado

**v1 aprovado pelo utilizador em 09/10/2026 — pronto para implementação.** O Codex implementa o §5, copiando o conteúdo de cada `design/icones/<nome>.svg` para o caso correspondente em `snippets/icon.liquid`. Qualquer ajuste de forma é feito pelo Claude no `_build.py`, nunca diretamente no tema.
