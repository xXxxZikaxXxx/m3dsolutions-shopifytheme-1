# Texto da página Pedir orçamento (D4)

Autor: Claude, a desempenhar o D4 (conteúdo). Data: 08/10/2026.
Para: Codex, dono de `locales/en.default.json` e `locales/en.default.schema.json`.
Origem das chaves: `sections/m3d-quote.liquid`, versão de 08/10.

O texto está em português de Portugal, em sentence case e com verbos de ação. Não promete prazos, mínimos, preços, provas nem respostas que não existam. O botão diz “Enviar pedido” e a confirmação usa a mesma palavra (“Pedido enviado”).

## `locales/en.default.json` → `m3d_quote`

```json
"m3d_quote": {
  "heading": "Pedir orçamento",
  "intro": "Diga-nos o que quer personalizar e preparamos uma proposta.",
  "description": "Serve para encomendas de empresa e para peças únicas. Pode pedir um produto do catálogo ou descrever uma ideia.",
  "next_heading": "O que acontece a seguir",
  "next_description": "A equipa M3D lê o pedido e responde para o e-mail indicado com a proposta ou com as perguntas que faltarem.",
  "no_purchase": "Enviar este pedido não cria uma encomenda nem um pagamento.",
  "browse": "Ver todos os produtos",
  "success_heading": "Pedido enviado",
  "success_description": "Recebemos o seu pedido. Vamos responder para o e-mail que indicou.",
  "error_heading": "Não foi possível enviar o pedido",
  "error_description": "Corrija os campos abaixo e envie novamente.",
  "client_error": "Faltam dados obrigatórios. Corrija os campos assinalados.",
  "required_hint": "Os campos com * são obrigatórios.",
  "request_heading": "O seu pedido",
  "context_hint": "Preenchemos estes campos com o produto que estava a ver. Pode alterá-los.",
  "product": "Produto",
  "view_product": "Ver o produto",
  "variant": "Cor, tamanho ou modelo",
  "quantity": "Quantidade",
  "quantity_error": "Indique um número inteiro igual ou superior a 1.",
  "lines": "Várias opções ou quantidades",
  "lines_hint": "Uma linha por opção, por exemplo: Azul, M, 20 unidades.",
  "personalization": "Personalização",
  "personalization_hint": "Texto, nome ou logótipo a aplicar e onde. Se tiver um ficheiro, diga-o aqui e pedimos-lho por e-mail.",
  "message": "Mensagem",
  "message_hint": "Conte-nos para que é, a data em que precisa e qualquer outro detalhe útil.",
  "field_error": "Preencha este campo.",
  "contact_heading": "Os seus contactos",
  "name": "Nome",
  "email": "E-mail",
  "company": "Empresa (opcional)",
  "privacy_hint": "Usamos estes dados só para responder ao seu pedido.",
  "privacy": "Política de privacidade",
  "noscript": "Sem JavaScript, os campos não são preenchidos com o produto. Indique-o na mensagem.",
  "send": "Enviar pedido"
}
```

## Outras chaves

- `products.product.price.mixed_on_request` → `"Algumas opções sob consulta"`. O C1 propôs “Opções com preço e sob consulta”. Prefiro esta: é mais curta e, quando acompanha “Desde X €”, não repete a palavra “preço”.
- `locales/en.default.schema.json` → `sections.m3d_quote.name` → `"Pedir orçamento"`.

## Notas de conteúdo

- “Pedir orçamento” é o mesmo rótulo na navegação, na PDP (L-9) e no título da página: a ação mantém o nome ao longo do percurso.
- “Sob consulta” aparece só como valor de preço e nunca como botão.
- `privacy_hint` só faz sentido se a política existir. O link já depende de `shop.privacy_policy.url`; se não existir, a frase continua verdadeira por si.
- A mensagem de sucesso só aparece com `form.posted_successfully?`. “Recebemos” refere-se ao processamento pela Shopify. O texto não promete prazo de resposta.
