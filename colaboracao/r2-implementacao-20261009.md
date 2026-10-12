# R2 — Card de produto e preço por unidade

09/10/2026. Executor: sub-agent nativo Codex /root/cards. Implementação terminada; propriedade dos ficheiros devolvida ao líder. QA final de fidelidade permanece com o Claude.

## Fontes e âmbito

Lidos estado-geral, ícones, revisão visual R2, Design System, referencia, histórico agente, acordo Codex/Claude, tarefas e skills Shopify Liquid, standards, a11y e webapp-testing. Escrita exclusiva após liberação do #1: snippets/card-product.liquid, snippets/price.liquid, stylesheet scoped no card e este relatório. Locales ficam sob escrita do líder. Sem alteração de tokens, dados do catálogo, preço da PDP/carrinho, checkout, backend, commit, push ou theme push.

## Implementação

- SKU retirado do card de coleção. O título permanece.
- Os dois modos de card passam display_card: true ao snippet price. Só este parâmetro autoriza o melhor escalão do piloto; a PDP e o carrinho continuam a usar valores Shopify.
- Tag midocean-piloto e mínimo positivo: price_min × 0.84375, round em cêntimos e money. Texto desde valor /un.; outros preços fixos não recebem desde. Consulta zero e intervalo misto conservam os estados existentes. O sufixo visual /un. é decorativo e por unidade fica acessível.
- Personalizar sempre visível, filled com os tokens Buttons v2, arrow M3D 18 px. Hover/foco deslocam a seta 3 px; active usa press-scale; movimento reduzido mantém a seta estática.
- Um único link principal engloba imagem, título, preço e cápsula. A cápsula é um span decorativo dentro desse link, cujo nome acessível é Personalizar + título do produto. Não há destino duplicado nem elemento interativo aninhado.
- MyShop mantém markup, rótulo, estilo e diálogo; o wrapper das ações passou a sibling do link para evitar button dentro de a. A posição absolute continua relativa ao article no mesmo canto superior da imagem.
- O default (home/featured) recebe os mesmos CTA e regras de preço. O modo collection permite a grelha de recomendações escolhida pelo líder.

## Verificação na prévia local

Playwright Python instalado, Chromium headless, GET localhost9292; sem POST ou alteração de estado remoto. Coleção bags verificada a 1440, 1024, 390 e 360 px: sem overflow; SKU ausente; um link por card; zero links/botões aninhados; CTA visível. A cápsula mede 40 px conforme token small; o alvo clicável é o link inteiro (>44 px nas duas dimensões). MyShop mede 44 px de altura, inset 12 px desktop e 8 px mobile.

Tab do link principal chega a MyShop; Enter abre o diálogo; Escape fecha. Hover da seta medido matrix translateX 3; sessão nova reduced-motion mediu transform none, duration 0.001s. PDP sc002 permaneceu €1,14 sem sufixo de card ou desconto. Home mostrou quatro cards Sob consulta com CTA e um link cada.

Capturas e métricas: analises/qa-visual/codex-20261009/r2/ (bags quatro larguras, home1440, checks.json). Theme Check integrado e suite final ficam com o líder; QA visual final é do Claude.

## Preços e arredondamento

GET público products/handle.js confirmou os mínimos abaixo, em cêntimos. Valores calculados em 09/10/2026, sem inferir custos privados.

| Produto | Mínimo | × 0.84375 exato | Card arredondado |
| --- | ---: | ---: | ---: |
| m3d-sc001 | 159 | 134.15625 | €1,34 |
| m3d-sc002 | 114 | 96.1875 | €0,96 |
| m3d-gr001 | 421 | 355.21875 | €3,55 |
| m3d-cp001 | 1582 | 1334.8125 | €13,35 |
| m3d-ts001 | 327 | 275.90625 | €2,76 |
| m3d-pl001 | 506 | 426.9375 | €4,27 |

O card é a aproximação ao cêntimo do preço por unidade no melhor escalão. Multiplicar o número mostrado pela quantidade pode diferir do total cobrado: sc002 96 ×2000 =192000 cêntimos (€1920,00), mas aplicar o fator ao total base resulta192375 (€1923,75). Shopify pode arredondar a allocation do desconto antes de subtrair, causando também ±1 cêntimo em relação ao arredondamento direto desse total. Não substituir final_line_price pelo card ×quantidade.

O líder realizará a confirmação do carrinho em sessão isolada: sc002 possui mínimo/fixo114 cêntimos, variante50598410256454. Nos produtos com preço variável, conferir a variante mínima: first variant da sc001 é277 (mínimo159), ts001358 (mínimo327), pl001518 (mínimo506). Nenhuma adição real ao carrinho foi feita por /root/cards.


## Adendo — carrinho real de 2000 unidades

A pedido do líder, executado o teste exigido pelo R2 numa nova sessão Playwright sem cookies do utilizador. Route guard bloqueou mutações exceto POST localhost/cart/add.js e /cart/clear.js. Produto e carrinho lidos por GET. Não houve checkout, encomenda, formulário, Admin, catálogo ou alteração do tema.

Resultado observado: sc002 variante50598410256454, base114 cêntimos, quantidade2000 adicionada HTTP200. Desconto real anunciado pela Shopify: M3D escalão2000+ (−15,625%). final_price **97 cêntimos**, final_line_price **194000 cêntimos (€1940,00)**, total_discount **34000 cêntimos (€340,00)**.

**A fórmula aprovada para o card não coincide com o preço unitário efetivo deste carrinho.** Card round(114 ×0.84375)=96 cêntimos. A Shopify aplicou aqui um desconto efetivo de17 cêntimos por unidade, em vez dos17.8125 não arredondados. Isto é equivalente a arredondar para baixo o desconto unitário neste exemplo; o teste único não estabelece a regra geral para todos os preços.

| Comparação | Total de2000 unidades |
| --- | ---: |
| Card96 cêntimos ×2000 | €1920,00 |
| Fator matemático sobre total base | €1923,75 |
| Valor final efetivo Shopify | €1940,00 |

Divergência para o anúncio96 cêntimos: **+1 cêntimo/unidade e +€20,00 no total**. Divergência para o fator aplicado ao total: +€16,25. A afirmação anterior de uma eventual diferença de ±1 cêntimo por allocation é insuficiente para este resultado; o arredondamento da unidade explica uma diferença maior na linha. Não alterar preços/descontos remotos nem substituir valores reais do carrinho. O líder foi avisado e deve alinhar a fórmula de apresentação com o resultado real antes de considerar R2 aprovado.

Limpeza concluída apenas na sessão isolada: POST/cart/clear.js HTTP200; GET/cart.js confirmou item_count0 e total_price0. Artefacto mínimo, sem token/cookies/customer: analises/qa-visual/codex-20261009/r2/cart-2000.json. Ficheiros devolvidos ao líder; nenhum código editado neste adendo.


## Adendo — regra conferida nos seis mínimos do piloto

O líder autorizou alargar a confirmação aos seis produtos, sempre com2000 unidades e a variante de preço mínimo. Executado cada produto numa nova sessão isolada; POST permitido apenas em/cart/add.js e/cart/clear.js, demais mutações bloqueadas. As seis adições devolveram200, as seis limpezas devolveram200 e os seis GET/cart.js posteriores confirmaram item_count0 e total_price0.

| Handle | Variante mínima | Base (cêntimos) | round(base ×0.84375) | final_price real | final_line_price real (cêntimos) |
| --- | ---: | ---: | ---: | ---: | ---: |
| m3d-sc001 | 50598409928774 | 159 | 134 | 135 | 270000 |
| m3d-sc002 | 50598410256454 | 114 | 96 | 97 | 194000 |
| m3d-gr001 | 50598411403334 | 421 | 355 | 356 | 712000 |
| m3d-cp001 | 50598411599942 | 1582 | 1335 | 1335 | 2670000 |
| m3d-ts001 | 50598415040582 | 327 | 276 | 276 | 552000 |
| m3d-pl001 | 50598417596486 | 506 | 427 | 427 | 854000 |

**Conclusão para o piloto atual:** a regra base − floor(base ×0.15625), equivalente a ceil(base ×0.84375), coincide com os seis final_price. A regra round pedida originalmente diverge em três dos seis. Proposta enviada ao líder: conservar o fator aprovado e usar ceil em vez de round no card para apresentar os valores efetivamente cobráveis hoje. Alteração do tema cabe ao líder; este subagente só executou testes e registou a evidência.

Metadata da allocation recebido por GET/cart.js: value_type percentage, value string15.63, title M3D escalão2000+ (−15,625%). Não se consultou Admin nem alterou o desconto. A percentagem numérica representada no cart e o título têm precisão distinta; os seis resultados também coincidem com base−floor(base×0.1563), por isso esta amostra não permite estabelecer qual precisão é usada internamente para qualquer outro preço futuro. Revalidar após alteração dos preços/descontos ou expansão do catálogo.

Artefacto expurgado: analises/qa-visual/codex-20261009/r2/cart-2000-six-products.json, com quantity, preços, allocations, títulos e resultado de limpeza; sem tokens/cookies/customer. Uma primeira tentativa conjunta excedeu o timeout30s do node_repl antes de produzir o artefacto, sem resultados contabilizados. A execução completa subsequente gravou cada resultado só depois de confirmar o clear. Sem checkout, encomenda, formulário, catálogo, Admin ou mudança de código neste teste. Propriedade do relatório devolvida ao líder.
