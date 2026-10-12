# C1 — preço e consulta

Data: 08/10/2026. Executor: sub-agent nativo do Codex `review_scope`, função C1. Estado: implementação dos dois snippets concluída; integração e QA global pelo Codex.

## Escopo e decisões

Arquivos de tema alterados exclusivamente: `snippets/price.liquid` e `snippets/card-product.liquid`. Nenhum catálogo, preço Shopify, carrinho, PDP, locale ou configuração foi alterado por C1. Sem commit, push, deploy ou envio de formulário.

Aplicadas as skills locais `shopify-liquid-themes` e `liquid-theme-a11y`; fontes e instruções do projeto relidas. A ordem de início foi transmitida pelo líder Codex; os registros preparatórios antigos não substituem essa autorização.

O snippet `price` mantém o wrapper `.price`, as classes `.price__regular`, `.price__sale`, `.price__compare`, `.price__badge` e a classe recebida pelo chamador. Acrescenta `data-price-state` (`priced`, `on-request`, `mixed`) e classes de consulta, sem exigir CSS novo.

| Dados recebidos | Apresentação |
| --- | --- |
| Variante selecionada com preço real zero | Tradução existente `m3d_pdp.price_on_request`; sem preço numérico ou promoção |
| Produto agregado com preço máximo zero | Mesmo estado de consulta |
| Produto agregado com preço mínimo zero e máximo positivo | Rótulo explícito de opções com preço e sob consulta; nunca “desde €0” |
| Preço positivo fixo | Filtro `money` da Shopify e traduções existentes |
| Produto agregado com faixa totalmente positiva | Tradução de “a partir de”, recebendo o preço já formatado por `money` |
| Comparação válida de preço positivo fixo | Riscado, preço promocional e rótulos acessíveis preservados |

Corrigida a interpolação de “a partir de”: o filtro `money` é aplicado ao número antes da tradução, não à frase traduzida inteira. O preço de comparação de uma variante selecionada já não herda o máximo de comparação de outra variante. Comparações agregadas variáveis não são apresentadas como um desconto fixo. Badges nos dois contextos do card exigem preço mínimo positivo, eliminando promoção sobre consulta.

O limite do contrato é apresentação de produto/variante; linhas de carrinho com descontos e totais reais não devem ser passadas como se fossem produtos sob consulta. C1 não alterou nem comprovou bloqueio de checkout no servidor.

## Traduções a integrar pelo líder

Uma chave nova, comunicada ao Codex antes da entrega:

```text
products.product.price.mixed_on_request = Opções com preço e sob consulta
```

O snippet utiliza `t` sem fallback comercial hardcoded. A integração desta chave nos locales é responsabilidade da raiz; a amostra real local testada contém somente consulta e não exercita a chave mista.

## Validação realizada

- Parser oficial instalado `@shopify/liquid-html-parser`, `toLiquidHtmlAST` com `mode: strict`: os dois snippets aprovados após a última alteração.
- GET somente leitura em `http://127.0.0.1:9292/collections/wrist-watches`: HTTP 200, sem formulário de senha, 16 wrappers de preço em `on-request`, 16 rótulos “Preço sob consulta”, nenhum preço monetário zero nesses wrappers e nenhum badge de promoção neles. Sem tradução ausente na resposta.
- Inspeção das ramificações para preço positivo, faixa positiva, variante selecionada e faixa mista; essas condições ainda requerem fixtures locais de QA para evidência de renderização. Nenhuma mutação Shopify foi feita para produzir cenários artificiais.

Theme Check/validação integrada ficam centralizados no Codex após consolidação dos escritores. A leitura da coleção não mede conversão, não testa checkout e não demonstra que todo o catálogo está sob consulta.

## Complemento D2 L4/L7

Após instrução adicional do líder Codex, removido o botão de coração que só alterava aria-pressed sem persistência. Não havia handler inline neste snippet; scripts/CSS externos não foram alterados por C1. MyShop demonstrativo preservado com label existente e aria-describedby para aviso visível no diálogo, usando a tradução existente m3d_pdp.myshop_preview. Badges “Esgotado” dos dois contextos exigem agora preço positivo: preço sob consulta não afirma indisponibilidade de stock por inferência.

Parser strict novamente aprovado. O novo GET da coleção local retornou HTTP 500 durante edição concorrente de outras áreas; não valida renderização final do complemento. A resposta anterior HTTP 200 continua sendo evidência da primeira etapa. Não houve mutação de catálogo nem envio real.
