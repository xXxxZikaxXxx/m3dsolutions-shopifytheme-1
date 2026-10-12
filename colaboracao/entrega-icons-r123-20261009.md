# Ícones e revisão R1–R3 — entrega local, 09/10/2026

Implementação Codex concluída na prévia existente http://127.0.0.1:9292, tema de desenvolvimento 166780993606. **QA final e aceite visual: Claude, ainda pendentes.** Nenhum commit, push, theme push, publicação ou alteração do catálogo/descontos/backend.

## Resultado

- #1: 18 ícones M3D aprovados centralizados em snippets/icon.liquid; geometrias iguais às fontes em design/icones/. SVGs utilitários e setas tipográficas substituídos. Redes sociais oficiais preservadas. Tamanhos 16/20/24 e 18 px da seta R2. Ícones decorativos aria-hidden/focusable=false e controlos com nomes acessíveis. [Relatório #1](icons-implementacao-20261009.md).
- R1: pesquisa apenas no cabeçalho; título, contagem e select GET compacto; filtros ativos preservados; Aplicar funciona sem JS. Filtros sem valores positivos ocultos em pesquisa/coleção. Botão mobile foca o input existente. Relevância nativa e dados comerciais não alterados. [Relatório R1](r1-implementacao-20261009.md).
- R2: SKU retirado do card; preços PT por unidade e piloto por escalão; link único engloba imagem/título/preço/Personalizar (cápsula visual dentro do mesmo a). Um único tab stop para o destino produto, mais MyShop independente, sem botão aninhado no link. MyShop mantém apresentação/diálogo. Seta M3D 18 px e deslocamento de 3 px. [Relatório R2](r2-implementacao-20261009.md).
- R3: hex reais de custom.colour_swatches validados por valor e aplicados a rádios nativos; fallback pílula de texto se faltar hex; tamanho mantém ordem. Indisponibilidade tem diagonal/risco e aria-disabled; permite selecionar uma variante real esgotada para orçamento, sem permitir compra inválida. Combinações inexistentes bloqueiam compra e orçamento com mensagem.
- Uma fila depois das miniaturas/contador reúne orçamento tinted, MyShop e Partilhar circulares. Removidos duplicados na coluna de compra e link do modal de personalização, substituído por orientação ao único CTA. Quantidade/variante/contexto atualizam o link. Partilha usa Web Share ou copiar com sucesso/erro acessível; combinação inexistente limpa a variante anterior da URL.
- Recomendações em PT, contentor da página e grelha 4/2, cards R2 com MyShop funcional e retorno de foco. collection-list usa collection-list-card para não colidir com as classes dos cards de produto; isto eliminou três avisos novos de escopo CSS sem alterar o seu visual.
- Tokens e specs do Claude não editados. Strings novas seguem o locale default em PT já usado no tema, incluindo correção de From; não criada tradução espanhola nem locale incompleto.

## Correção necessária à fórmula R2 — confirmada no carrinho

A spec indica round(price_min × 0,84375). O teste real de 2000 unidades nos seis produtos mostrou que isso anuncia um cêntimo abaixo do valor cobrado nos dois sacos e na garrafa. A apresentação final usa **ceil(price_min × 0,84375)**, somente quando display_card e tag midocean-piloto: coincide com os seis final_price confirmados. PDP e carrinho continuam a mostrar os valores Shopify, sem redução artificial ou alteração dos descontos remotos.

| Handle | Base mínima | round da spec | Cobrado/mostrado final |
| --- | --- | --- | --- |
| m3d-sc001 | €1,59 | €1,34 | €1,35 |
| m3d-sc002 | €1,14 | €0,96 | €0,97 |
| m3d-gr001 | €4,21 | €3,55 | €3,56 |
| m3d-cp001 | €15,82 | €13,35 | €13,35 |
| m3d-ts001 | €3,27 | €2,76 | €2,76 |
| m3d-pl001 | €5,06 | €4,27 | €4,27 |

Evidência: analises/qa-visual/codex-20261009/r2/cart-2000-six-products.json. Carrinhos em contexto isolado, sem cookies do utilizador; adição e limpeza HTTP 200, seis carrinhos vazios no fim. Nenhum checkout, encomenda MidOcean ou envio de orçamento. As allocations públicas mostram value_type=percentage, value='15.63'; não se infere precisão interna nem se extrapola a correspondência para futuros produtos. **Claude: rever esta exceção técnica à spec durante QA.**

## Verificação Codex

- Theme Check final: **71 ficheiros, zero erros/avisos**; node --check PDP, partilha e recomendações; git diff --check passou (avisos habituais CRLF).
- Baseline: 14 capturas 1440/390, HTTP 200/zero overflow. Integração: 22 casos; pesquisa/coleção/PDP a 1440/1024/390/360 e home/carrinho/orçamento a 1440/390, sem overflow ou erros Liquid/tradução; ícones decorativos e botões com rótulos; nenhuma interação aninhada em card.
- Seis PDP do piloto renderizam hex reais. Teclado ArrowRight muda Cor/legenda; orçamento recebe variante/quantidade 7. Foco mobile abre campo existente. Ordenação sem JS mantém q/type/filtro e aplica sort_by.
- MyShop abre por Enter e devolve foco após animação de 160 ms. Primeiro teste tinha verificação aos 150 ms e falhou por antecipação; dirigido espera a condição real e passa (directed.json). Não apagar nem ocultar esse resultado bruto em after.json.
- Partilha copiar/sucesso/erro validada com clipboard stub, sem envio a terceiros; variante inexistente limpa URL. Estado indisponível e preço zero verificados em fixtures DOM, sem alterar catálogo.
- Fallback por valor sem hex verificado com lookup Aqua temporariamente vazio em Liquid local; Army permaneceu círculo. Código restaurado no finally; nenhum override ficou no tema. fallback-hex.json/captura identificam o fixture.
- Movimento reduzido: escala 1 e transições desativadas. Pílula desktop: hover/foco estáveis, percurso clicado monotónico e limitado entre os extremos, sem mudança no JS da navegação.
- Após correção de arredondamento, oito casos finais (três coleções e pesquisa a 1440/390) confirmam seis preços e seta de 18 px. Capturas final-* são o preço final; after-* anteriores documentam a execução antes da correção.
- Falhas de import dinâmico shop-js/CDN Shopify ocorreram nas sessões de leitura. Nenhuma atribuída ao JS do tema; não são descritas como console absolutamente limpo.

Evidências principais: analises/qa-visual/codex-20261009-icons-r123/ (before.json, after.json, directed.json, fallback-hex.json, final-price-cards.json e capturas). Evidências dirigidas dos subagentes em codex-20261009-r1/ e codex-20261009/r2/.

## Passagem para QA Claude

Conferir 1440/1024/390/360, teclado, leitura assistida real (não simulada nesta etapa), fidelidade dos ícones/formas, MyShop/Partilhar e dados dos seis artigos. Aprovar ou comentar o ajuste de arredondamento acima. QA visual final não atribuído ao Codex nem antecipado em nome do Claude.

Canal Orca tentado com orca-cli: runtime_unavailable; metadata em C:/Users/Administrator/AppData/Roaming/orca/orca-runtime.json indisponível. Não há recibo de mensagem ao Claude. Este registo é a passagem reviewável para a sua sessão; não lançado novo agente nem app GUI.
