# C4 — cabeçalho e rodapé

Data: 08/10/2026. Executor: sub-agent nativo do Codex `review_scope`, função C4. Estado: implementação e verificações direcionadas concluídas; capturas e QA conjunto com C3/Codex.

## Escopo e aplicação do sistema

Arquivos de tema alterados exclusivamente: `sections/nav.liquid` e `sections/footer.liquid`. Assets oficiais, tokens, configurações, fontes e traduções são integrados pela raiz. Aplicados `design/design-system-m3d.md`, tokens v1 e skills locais Liquid, standards, a11y, frontend-design e webapp-testing. Nenhum catálogo ou serviço foi alterado; sem commit, push ou deploy.

Cabeçalho: fallback oficial horizontal positivo; `settings.logo` configurado permanece suportado. Alturas de 40 px desktop e 32 px mobile, proteção por padding proporcional ao token. Pesquisa visível também com menu mobile fechado, controlos de 44/48 px, pesos 400/700 conforme função, texto mínimo 12 px e cores semânticas. Não foram redeclarados tokens de marca.

A navegação mobile recupera os sete itens: Coleções, Produtos, Vestuário, MyShop, Inspiração, Sobre a M3D, Pedir orçamento. Coleções é um disclosure nativo com as páginas de categoria disponíveis. A grafia real `vesturio-e-acessrios` foi preservada. Orçamento usa a página existente com `?view=m3d-quote`.

Inspiração/Sobre sem destino configurado tentam somente páginas existentes via Liquid. Se não houver página, o item fica visível e indisponível, preservando a ordem, sem apontar à homepage. Links auxiliares sem destino configurado, ou com destino raiz, são ocultados. Banners de pesquisa dirigidos ao catálogo foram renomeados “Ver produtos”; não prometem levar a um produto específico nem afirmam novidade sem dado comercial.

Rodapé: identidade negativa, slogan oficial branco, colunas de exploração e ajuda com páginas e políticas existentes, sem crédito do tema. Políticas só aparecem quando há conteúdo real em `shop.*_policy.body`. Blocks configurados, pagamentos habilitados, localização e redes configuradas foram preservados. Links vazios, `#` e raiz em menus auxiliares são filtrados. Alvos de toque e foco branco no fundo preto foram ajustados.

## Preservação da pílula

O script original de animação, seleção, cliques, teclado nativo, tempo de navegação, resize e restauração da sessão foi preservado. Comparação byte a byte do script inteiro: idêntico após descontar **apenas duas guardas** adicionadas ao fluxo de pesquisa, para que mobile submeta pesquisa normalmente e não abra o painel desktop invisível.

Não há mudança nos listeners de hover/foco da pílula, nem na interpolação monotónica original. A linha de hover das categorias do mega menu continua sendo um componente separado.

## Validação direcionada

- Parser oficial `@shopify/liquid-html-parser`, modo strict: nav e footer aprovados.
- Parser JavaScript TypeScript instalado: script inline com zero `parseDiagnostics`.
- GET home local: HTTP 200, logo positivo/negativo e slogan presentes, sem `Translation missing`.
- Playwright Chromium headless, 1440/390/360 px: overflow horizontal 0; logo de cabeçalho 40/32/32 px; logo de rodapé 40/32/32 px; imagens carregadas; campo de pesquisa visível nos três viewports.
- Menu mobile aberto em 390/360: os sete itens completos na ordem requerida.
- Desktop: hover e foco em Vestuário não mudaram `transform` da pílula.
- Mobile, botão da pesquisa com “garrafa”: requisição real **GET** para `http://127.0.0.1:9292/search?type=product&options%5Bprefix%5D=last&q=garrafa`; destino ficou em resultados de pesquisa. “jeep” levou à ficha Jeep pela lógica de resultado único existente, sem endpoint simulado.
- Console: falha externa recorrente de importação dinâmica Shopify `cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js`; não houve erro próprio de navegação observado. Não foi corrigida por C4 nem classificada como erro novo do tema.

C3 foi solicitado para capturar cabeçalho, menu e rodapé, evitando duplicação de capturas. Theme Check e validação integrada permanecem centralizados na raiz. Não foram submetidos pedidos, contacto, carrinho ou checkout durante estes testes.

## Integração de traduções

Manifesto recebido pela raiz: `m3d_navigation.unavailable`; `m3d_footer.explore`, `help`, `contact`, `privacy`, `refunds`, `shipping`, `terms`. Textos e traduções são de propriedade da raiz, não deste worker.
