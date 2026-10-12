# C3 — QA local final · 08/10/2026

Responsável: sub-agent nativo Codex `qa_local`. Tema de desenvolvimento informado pelo líder: 166780993606; prévia `http://127.0.0.1:9292`. C3 não altera temas, catálogo ou configurações Shopify.

## Resultado da rodada

| Página |1440×1000|1024×1000|390×844|360×844|
| --- | --- | --- | --- | --- |
| Homepage |200 / overflow0|200 / overflow0|200 / overflow0|200 / overflow0|
| PDP Amazon |200 / overflow0|200 / overflow0|200 / overflow0|200 / overflow0|
| Orçamento, view=m3d-quote |200 / overflow0|200 / overflow0|200 / overflow0|200 / overflow0|

Nas 12 capturas: nenhum erro Liquid, tradução em falta, imagem quebrada ou resposta HTTP ≥400 observada; nenhum botão visível sem nome nem campo visível sem label/nome na coleta. Os controlos de formulário/botões examinados no main têm pelo menos44 × 44 px. A coleta não equivale a auditoria WCAG completa.

Raleway carregada: corpo/inputs400, H1 da home e orçamento900, H1 da PDP700. A PDP sem preço mostra **Sob consulta**, com Pedir orçamento primário; não exibe €0,00 nem ação de compra visível. Conteúdo comercial em inglês no produto pertence aos dados publicados, não foi inventado ou traduzido por C3.

O único erro JS repetido nas páginas 200 é módulo externo `cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js`. Console também registra recursos externos/bloqueios da prévia e dos pedidos automáticos interrompidos pelo teste; não houve erro JS apontando para arquivo do tema.

## Navegação

- Menu mobile390/360 conserva 7 itens, na ordem: Coleções, Produtos, Vestuário, MyShop, Inspiração, Sobre a M3D, Pedir orçamento. Cada item tem 48 px de altura. Inspiração e Sobre a M3D aparecem indisponíveis, sem link falso.
- Pílula desktop não se moveu por hover ou foco. Click medido em 31 quadros: x96→655,46875; largura105,890625→135,359375, movimento monotónico e limitado, sem overshoot.
- Teclado Enter em Coleções, repetido com 46 amostras após amostragem curta inicial: x655,46875→96, largura135,359375→105,890625; fim exato, monotonicidade e limites confirmados.
- Links da homepage revisada apontam a produtos/coleção/orçamento reais. A ligação Encomendas para empresas é âncora interna para a faixa B2B. Não há destino vazio ou retorno à raiz nos links de conteúdo. Breadcrumb Início e logo são acessos legítimos à homepage.

PesquisaGET/logo e fluxo do header/footer foram revistos separadamente por C4; ver seu relatório para evitar duplicar evidências.

## Continuidade PDP → orçamento

Passaram os testes sem submissão:

- Quantidade inline visível; alteração1 → 7 e blur atualiza href com quantity=7 imediatamente.
- Click real de Pedir orçamento navega porGET com view=m3d-quote e quantity=7. Formulário recebe produto Amazon e quantidade 7; link de produto conserva mesma origem.
- Editar o nome do produto limpa URL/id de variante de referência e esconde o link relacionado.
- Conteúdo `<img src=x onerror=...>` e `<script>...` permanece texto literal nos inputs; nenhum nó correspondente ou execução observada.
- URL javascript e URL externa rejeitadas; variante id não numérica não aceita; quantidade negativa não preenchida.
- `form.reportValidity()` apresenta erro associado com aria-invalid e mensagem visível. Nenhum botão Enviar foi clicado.

Todos os métodos diferentes de GET/HEAD/OPTIONS foram bloqueados pela automação (278 pedidos automáticos interceptados na rodada principal). Nenhum contacto, autenticação, carrinho, pedido ou checkout foi enviado.

## Ajustes encontrados e revalidados

C3 encontrou href com quantity=1 desatualizada em produto simples antes do click; o líder corrigiu o caminhochange, e a repetição confirmou href com quantidade 7.

A primeira captura 1440 continha heading de categorias sem cards e pincelada fragmentada; após revisãoClaude/líder, a secção sem configuração foi ocultada e a composição do M com prato circular tornou-se legível. Revalidação pontual1440/390/360 manteve overflow 0. A faixa B2B vem antes do processo, rodapé está em PT-PT. Não interpretar capturas antigas como estado aprovado.

## Numerais — resultado a considerar

Medição real no DOM, Raleway Regular 400 a 16 px, após document.fonts.ready/font.load:

| Texto | Normal | lining-nums tabular-nums |
| --- | ---: | ---: |
|111111|41,09375px|41,09375px|
|888888|56,9375px|56,9375px|

Os dígitos mantêm larguras diferentes; portanto **a fonte carregada não demonstrou suporte funcional a tabular-nums**. Não afirmar suporte apenas pela presença do token CSS. Na medição, os containers de preço/quantidade inline tinham font-variant-numeric:normal. Evidência enviada ao líder; qualquer ajuste permanece sua responsabilidade.

## Evidências

Diretório ignorado pelo Git: `.shopify/qa-redesign-20261008/`.

- `final.py` / `final.json`: rodada de 12 páginas, contexto adversarial e navegação.
- `targeted.py` / `targeted.json`: revisão pontual da homepage, href com quantidade 7, endpoint da pílula por teclado e numerais.
- **Visual atual:** `reviewed-home-1440.png`, `reviewed-home-390.png`, `reviewed-home-360.png`, `reviewed-pdp-1440.png`.
- PDP/orçamento nos 4 viewports: `final-pdp-{width}.png` / `final-quote-{width}.png`.
- Menu aberto: `final-menu-390.png`, `final-menu-360.png`.

Capturas examinadas visualmente por C3: home 1440 atual, home 360 atual, home 390 da rodada, PDP 1440 e orçamento 1440/360. Sem corte de textos/ações ou overflow observado. Outros viewports têm inspeção DOM e screenshots para revisão do líder.

Sem commit, push, deploy ou escrita em arquivos do tema por C3. O líder tratou a limitação dos numerais com fallback funcional (ver complemento abaixo). Entrega real de e-mail/sucesso nativo não foi testada por envolver envio.

## Complemento final — fallback numérico e páginas complementares

Repetição pontual após integração do fallback em `m3d-system.css`, sem refazer a rodada inteira:

- Raleway 400/16px, com `font-feature-settings:normal` explícito, mantém 111111 = 41,09375px e 888888 = 56,9375px com `lining-nums tabular-nums`. O resultado não é causado por feature-setting herdado nessa prova.
- Fallback numérico real da quantidade/preço: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif`, peso 400, numerais lining/tabular, features normal. 111111 e 888888 mediram ambos **51,75px**. Alinhamento dos dígitos confirmado. Corpo continua Raleway; labels Sob consulta dos cards preservam Raleway.

| Rota | Desktop 1440 | Mobile 390 | Observação |
| --- | --- | --- | --- |
| `/cart` |200 / overflow0|200 / overflow0|Estado vazio real, CTA Explorar produtos, sem itens adicionados|
| `/collections/wrist-watches` |200 / overflow0|200 / overflow0|16 cards desta página sob consulta; nenhum €0,00|
| `/search?type=product&q=garrafa` |200 / overflow0|200 / overflow0|16 cards desta página sob consulta; nenhum €0,00|

Nessas seis capturas não houve 404, erro Liquid, botão sem nome ou imagem quebrada. Mesmo erro de módulo externo Shopify presente. Nenhuma mutação real; 83 pedidos automáticos mutantes bloqueados nesta repetição. O número de resultados, idioma/título de coleções e pertinência dos artigos à pesquisa são dados publicados e não foram alterados por C3.

Observação de consistência a tratar pelo líder: controlos dos filtros em coleção/pesquisa ainda têm 42 px (Filtros e ordenar/Aplicar) e botão Fechar 40 × 40 px. Os botões dos cards têm 44 × 44 px. Parte dos controlos do offcanvas é registrada por dimensão mesmo fechada; o toggle Filtros e ordenar é visível no mobile. Aumentar controlos dos filtros para o padrão local 44/48 px requer somente rechecagem pontual.

Evidências: `final-probe.py` e `final-probe.json`; screenshots `final-cart-1440.png` / `final-cart-390.png`, `final-collection-1440.png` / `final-collection-390.png`, `final-search-1440.png` / `final-search-390.png`. C3 inspecionou visualmente carrinho 1440, coleção 390 e pesquisa 1440; layout legível e coerente, sem cortes.

## Último lote visual — verificação dirigida aprovada

Executados somente PDP, coleção e pesquisa em 1440/390, mais homepage 360 para a quebra do H1. Todas as 7 capturas responderam 200, sem overflow, resposta de recurso≥400 ou erro Liquid. Mesmo módulo externo Shopify identificado anteriormente. Nenhum POST real; 73 pedidos automáticos mutantes bloqueados.

PDP:

- Galeria com `mix-blend-mode:multiply`, inspecionada no DOM e visualmente.
- Um único heading Quantidade visível; label do input continua acessível como Quantidade, com texto visualmente oculto.
- As duas instruções de compra (consultar stock antes de adicionar/configurar opções) ficam escondidas sob consulta. A linha factual **Stock a consultar** permanece visível por decisão expressa do líder; não é a instrução de compra P3.
- Novo contexto **A quantidade e a personalização seguem com o pedido de orçamento.** aparece junto da ação.
- **Partilhar** substitui Share. Check fixo removido do controlo Sem personalização.

Cards de coleção/pesquisa: imagens multiply; bookmark identificado, rótulo visível MyShop e nome acessível **Abrir prévia do MyShop**. Botões 98,453125×44 px nos dois viewports.

Filtros mobile reais abertos apenas na UI: toggle e Aplicar com 48 px; botão Fechar 44×44 px. A pendência anterior de40–42px está resolvida. Sem aplicação de filtros/submissão.

Homepage 360: `text-wrap:balance` confirmado; H1 largura 328 px, texto íntegro e overflow 0. Inspeção visual mostra quebra equilibrada sem cortes.

Evidências novas: `batch-final.py` / `batch-final.json`, `batch-pdp-1440.png` / `batch-pdp-390.png`, `batch-collection-{width}.png`, `batch-search-{width}.png`, `batch-collection-filters-390.png`, `batch-search-filters-390.png` e `batch-home-360.png`. C3 inspecionou visualmente PDP 1440, filtros coleção 390 e home 360.

Esta rodada substitui as capturas anteriores somente nos itens do último lote. Sem mudança de código ou estado comercial por C3; QA dirigida concluída, sem necessidade de repetir a suite completa.
