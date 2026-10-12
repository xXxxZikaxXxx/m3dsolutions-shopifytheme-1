# C5 — carrinho e política de consulta

Data: 08/10/2026. Executor: sub-agent nativo Codex `review_coordination`, função C5.
Estado: implementação local concluída; verificações isoladas, sintaxe JavaScript e Theme Check final aprovados. C3 verificou o carrinho vazio real a 1440 e 390 px; carrinho cheio e checkout real não foram exercitados.

## Ownership

Editados exclusivamente `sections/main-cart.liquid`, `snippets/carrinho.liquid`, `assets/carrinho.js` e este relatório. Sem tokens, globais ou locales editados.

## Descoberta do componente

O tema não tem drawer de produtos: `snippets/carrinho.liquid` era só `div#carrinho`; `assets/carrinho.js` adicionava via AJAX e atualizava o contador. O modal `m3d-cart-login` é login, não carrinho. Não foi construído drawer novo. O snippet agora fornece política inicial Liquid e textos ao helper, conservando o ID.

## D07 e integração

- Liquid usa exatamente `item.variant.price == 0 and item.original_price == 0` para consulta. Apenas esses itens deixam de mostrar preço numérico e recebem “Sob consulta”.
- Preço original/final, descontos por linha/carrinho, `final_line_price` e `cart.total_price` permanecem os valores Shopify, sem cálculo próprio. Um produto original positivo reduzido a zero por desconto integral continua preço monetário legítimo e checkout permitido.
- Carrinho com consulta desativa checkout nativo, não renderiza os checkouts adicionais e explica como pedir orçamento/remover itens. O total não é inventado: conserva a soma Shopify e explica que consulta não tem preço definido.
- Link de orçamento usa página real `pages['pedir-orcamento']` + `?view=m3d-quote`, se página existir. Nenhum template_suffix remoto alterado.
- JS guarda cliques/submits de checkout; refresh AJAX considera `original_price == 0`, nunca `final_price` ou total0. Se o JSON incluir variant.price, aplica também a condição variant.price0. No JSON oficial normal a variante não expõe price: original0 é candidato conservador da UI, limitação declarada.
- Guardas são **somente UI**: acesso direto ao checkout e outras apps podem contorná-las. Não foi construído bloqueio backend.
- GET falhado preserva política Liquid; não assume carrinho vazio. Reativação só remove disabled que o guard adicionou.
- Helper não intercepta o formulário dentro de `m3d-product`, cujo componente possui seu handler. URLs AJAX respeitam prefixo locale.
- Ao tocar no helper AJAX foi retirado o retry silencioso `form.submit()` após falha incerta: podia repetir uma adição já aceite no servidor. Agora atualiza contador por leitura e mostra erro orientando conferir carrinho. Fallback nativo sem JavaScript permanece; nenhum POST extra é emitido no catch.

## Visual e acessibilidade

Tokens de marca/família herdada, pesos700/400, números alinhados, botões pílula roxo/branco, campos com borda de controlo3:1, foco roxo e forced-colors. Fontes auxiliares antes em --f0 foram elevadas14px. Linhas do carrinho em mobile reorganizadas em grelha de duas colunas sem mudar controles/form. Quantidade e links remover têm alvos44px. Nota escapada e redimensionável.

## Manifesto de traduções integrado pela raiz

A raiz integrou as novas chaves em `locales/en.default.json` → `m3d_cart` e repôs `empty_description`, ausente na integração inicial. O manifesto abaixo documenta o pedido original; os textos finais estão no locale:

```json
{
  "quote_required": "Há artigos sob consulta no carrinho. Peça um orçamento ou remova-os para continuar a compra dos restantes.",
  "quote_action": "Pedir orçamento",
  "partial_total": "Este subtotal inclui apenas os artigos com preço. Os artigos sob consulta ainda não têm valor definido.",
  "price_on_request": "Sob consulta",
  "unit_price": "Preço unitário",
  "line_total": "Total do artigo",
  "add_error": "Não foi possível confirmar a adição. Verifique o seu carrinho antes de tentar novamente."
}
```

Também foram propostas traduções das chaves antigas do carrinho, sem mudança estrutural:

```json
{
  "products": {
    "product": {
      "quantity": {
        "label": "Quantidade",
        "input_label": "Quantidade de {{ product }}",
        "increase": "Aumentar quantidade de {{ product }}",
        "decrease": "Diminuir quantidade de {{ product }}"
      },
      "price": {
        "regular_price": "Preço normal",
        "sale_price": "Preço com desconto"
      }
    }
  }
}
```

## Validação

Aprovados parse JS do helper e do script inline, schema JSON e inventário de tokens (zero desconhecidos). Sete grupos de fixtures em VM com DOM/JSON/rede simulados passaram: desconto100%/total0 legítimo; original0 consulta bloqueia clique e submit; mistura de itens bloqueia mesmo com total positivo; JSON incompleto conserva guard Liquid; variante positiva quando exposta respeita condição dupla; remoção simulada libera o guard; erro AJAX emite só um POST simulado sem retry e usa URL locale. Asserções também confirmam presença dos quatro campos monetários Shopify e condição dos adicionais.

Nas fixtures VM não houve requests reais de carrinho/checkout. C3 depois fez leitura GET de `/cart`, no estado vazio real, a 1440×1000 e 390×844: HTTP 200, overflow horizontal 0 e sem adição de itens. Evidências e limites em [c3-qa-final.md](c3-qa-final.md), com capturas `.shopify/qa-redesign-20261008/final-cart-1440.png` e `final-cart-390.png`.

Após a correção de escopo abaixo, a raiz executou Theme Check final: 64 arquivos, 0 erros e os 2 avisos históricos `OrphanedSnippet`. A sintaxe JavaScript do conjunto também passou. Carrinho cheio, checkout/backend, descontos reais e botões adicionais com itens não foram exercitados em loja; a política desses estados foi verificada pelas fixtures, que não comprovam o backend. Guard permanece somente UI. Nenhum carrinho/pedido/contacto foi modificado por QA; nenhum commit/push/deploy.

### Correção de escopo Liquid na integração

O bloco inicial de `assign cart_has_quote` / `cart_quote_url` ficou dentro do comentário de documentação porque a inserção procurou a primeira ocorrência de `<style>`, que era uma menção textual no comentário. Theme Check detetou as duas variáveis indefinidas fora desse escopo. A raiz moveu o bloco para depois de `{%- endcomment -%}` e antes da tag `<style>` executável. As sete fixtures VM validavam o JavaScript e não o escopo de execução Liquid; por isso não detetaram esta falha. Futuras inserções devem localizar a tag executável após o fim do comentário e passar Theme Check. Nesta revisão final C5 alterou somente documentação; não voltou a editar o tema.

## Fontes

Contrato Shopify: [Cart AJAX API](https://shopify.dev/docs/api/ajax/reference/cart), [Liquid line_item](https://shopify.dev/docs/api/liquid/objects/line_item) e [descontos](https://shopify.dev/docs/storefronts/themes/pricing-payments/discounts). O endpoint retorna os valores monetários originais/finais; variantes completas pertencem ao contexto Liquid, não se inferem do total.
