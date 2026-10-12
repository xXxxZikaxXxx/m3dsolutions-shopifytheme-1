# R1 — pesquisa e filtros, 09/10/2026

Executor: Codex subagente nativo /root/search. Começo da escrita autorizado pelo líder só após devolução do tema pelo executor de #1. Propriedade devolvida ao líder ao concluir esta nota.

## Implementado

- main-search: eliminado formulário/campo da página. Pesquisa única no cabeçalho existente. Sem termo mantém sugestões, ajuda curta e botão mobile que foca data-m3d-search-input.
- Com termo: h1, contagem e select nativo (Relevância/Preço ascendente/Preço descendente). Ordenação sai da sidebar; mobile apresenta Filtros e Ordenar na mesma fila, com contagem abaixo.
- Form GET da ordenação conserva q, search.types e todos os filtros ativos (incluindo price_range). Mudança chama requestSubmit; sem JS Aplicar continua visível e funcional. Filtros conservam ordenação atual. Options de URL conservados pelo enhancement quando presentes. Nenhum campo page é transportado, reiniciando paginação ao ordenar.
- collection-filter-group: detalhes só quando há valor com count > 0. Grupos não configurados/vazios deixam de aparecer, tanto na pesquisa como na coleção. Valores ativos de grupos sem escolhas ficam em hidden para não desaparecerem no GET; Remover tudo continua a limpar. O guard do tipo price_range exige range_max > 0; não foi acrescentada uma UI de preço inexistente.
- main-collection: action GET explícita para collection.url; sorting existente conservado (R1 exige aí apenas filtros com valores).
- Mobile da pesquisa: sidebar inline acessível sem JS; com JS recebe inert ao fechar, role dialog/aria-modal ao abrir, Tab em ciclo e Escape/retorno de foco. Tokens Buttons v2 usados nos novos controlos, incluindo rótulo visível de ordenação.

## Ficheiros

- sections/main-search.liquid
- sections/main-collection.liquid
- snippets/collection-filter-group.liquid
- Este relatório. Nenhum asset novo do tema necessário. Traduções escritas pelo líder em locales/en.default.json.

## Validação local executada

- Prévia 127.0.0.1:9292: pesquisa inicial e resultados em 1440, 1024, 390 e 360 px. Oito casos: overflow horizontal 0; um único campo search visível, zero no corpo; nenhum placeholder de filtro vazio.
- Foco do botão Pesquisar produtos chega ao input do cabeçalho em 390 e 360 px.
- GET JS (price-descending) e sem JS (Aplicar/price-ascending) em 390: preservam q=saco, type=product e filter.v.availability=1. Sem JS sidebar visível; com JS fechada e drawer funcional.
- Scripts Playwright Python de leitura em .shopify/qa-r1-20261009/. Pedidos diferentes de GET/HEAD abortados. Sem pedido real de carrinho, orçamento ou checkout.
- Sintaxe JS extraída de main-search: node --check aprovado.
- git diff --check sem erro (avisos CRLF de working copy apenas).
- Theme Check do conjunto atual: 0 erros, 3 avisos ValidScopedCSSClass em sections/collection-list.liquid (collection-card/media/title), fora R1 e enviados ao líder. Resultado global pode mudar com a implementação R2/R3 ainda em paralelo.
- Capturas atuais: analises/qa-visual/codex-20261009-r1/search-{start,results}-{1440,1024,390,360}.png. Inspeção visual das capturas 1440/360 efetuada. Capturas antes existentes em analises/qa-visual/claude-20261009/revisao-v2/.

## Limites e próxima etapa

A relevância nativa Shopify continua com a pendência C9; não se filtraram resultados no cliente nem se alterou catálogo. Não houve modificação de nav, tokens, CSS global, backend, MyShop, commit, push, theme push ou deploy. QA integrado do líder e aceite visual do Claude ainda por fazer; este relatório não os declara concluídos.

Referências técnicas consultadas: [search.types](https://shopify.dev/docs/api/liquid/objects/search) e [filter.values/range_max](https://shopify.dev/docs/api/liquid/objects/filter).
