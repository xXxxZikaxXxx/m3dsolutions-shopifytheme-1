# C7 — retirada de compra rápida na PDP · 09/10/2026

Responsável: sub-agent nativo Codex `qa_local`. Skill aplicada: `webapp-testing`. Escopo: prévia local existente, leitura/GET e alterações de controlos no navegador, sem submissão. Nenhum servidor iniciado ou tema sincronizado por C7.

## Resultado

**Aprovada a retirada de Buy it now/checkout acelerado na PDP com preço positivo.**

Produto real resolvido por GET público `/products.json?limit=250`: [Saco natalício boneco de neve com cordão](http://127.0.0.1:9292/products/saco-natalicio-boneco-de-neve-com-cordao).

| Verificação | Desktop 1440×1000 | Mobile 390×844 |
| --- | --- | --- |
| PDP responde | HTTP 200 | HTTP 200 |
| Nós de checkout dinâmico/payment button | 0 | 0 |
| Texto Buy it now/Comprar agora nos controlos | Ausente | Ausente |
| Adicionar ao carrinho | Visível e ativo | Visível e ativo |
| Beige → Red | ID/seleção/preço/stock atualizados | ID/seleção/preço/stock atualizados |
| Quantidade inline 1 → 7 | Preservada no controlo e href | Preservada no controlo e href |
| Orçamento secundário | Visível, com Red/id/quantity=7 | Visível, com Red/id/quantity=7 |
| Overflow horizontal | 0 px | 0 px |
| Erro Liquid/tradução em falta/imagem quebrada | Nenhum observado | Nenhum observado |

Preço real publicado de ambas as variantes: €1,80. Stock exibido: Beige 20, Red 10. Variante inicial Beige `50591307497542`; após selecionar Red, `50594115387462`. Quantidade mínima/incremento são 1. O estado positivo conserva a ação principal Adicionar ao carrinho e orçamento como ação secundária; a ação primária de consulta fica oculta.

A inspeção local de `sections/main-product.liquid`, `assets/m3d-product.js` e `templates/product.json` não encontrou `payment_button`, `show_dynamic_checkout`, `updateAccelerated` ou `data-m3d-dynamic-checkout`. C7 não editou nenhum desses ficheiros.

## Consola e limite do teste

Não houve erro JavaScript identificado no código da PDP. Houve HTTP 403 em `shop.app/pay/hop`, serviço externo automático da Shopify.

A automação bloqueou métodos diferentes de GET/HEAD/OPTIONS e também os pedidos automáticos a `/cart.js`, para não consultar a sessão do carrinho. Na rodada principal foram bloqueados 43 pedidos automáticos mutantes e 2 pedidos GET/cart.js. Nesse cenário foi observado `Failed to fetch`. Diagnóstico separado confirmou stack em `shop_events_listener`, WPM e módulos externos `shop-js`, sem frame de `m3d-product.js`; o GET/cart.js também foi bloqueado nesse diagnóstico. Esse erro ocorre no cenário de pedidos bloqueados pela automação e não aponta para código da PDP; não é evidência de regressão da retirada de compra rápida.

Nenhum botão Adicionar ao carrinho, orçamento ou checkout foi clicado; nenhum POST real foi enviado. Apenas labels de variante e o campo de quantidade foram usados. Compra efetiva, carrinho cheio e checkout ficam fora desta evidência; Claude testará o carrinho na sua própria sessão conforme orientação do líder.

## Evidências

Artefactos em `.shopify/qa-20261009/`:

- `c7-dynamic-checkout.py` e `c7-dynamic-checkout.json` — estados inicial/Red/quantidade7 nos dois viewports.
- `c7-js-diagnostic.py` e `c7-js-diagnostic.json` — origem sanitizada do erro de fetch induzido, sem cookies ou queries de autenticação.
- `c7-pdp-desktop.png`, `c7-pdp-mobile.png`, `c7-pdp-desktop-red-qty7.png`, `c7-pdp-mobile-red-qty7.png`.

Desktop inicial e mobile com Red/quantidade7 foram inspecionados visualmente: ação Adicionar ao carrinho presente e Buy it now ausente, layout sem corte dos controlos. Capturas após troca de variante podem apanhar a transição da galeria em curso; esta tarefa valida o estado dos controlos, não reabre a suite de galeria.

Sem escrita no tema, catálogo, preços, stock, carrinho ou configuração Shopify por C7. Sem commit, push ou deploy. O líder é responsável por incorporar esta conclusão em `agente.md`, respeitando a propriedade exclusiva desse ficheiro.
