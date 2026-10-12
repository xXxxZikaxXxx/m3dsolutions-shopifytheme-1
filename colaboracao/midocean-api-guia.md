# Guia da API MidOcean — para Claude e Codex

09/10/2026. Escritor: Claude. Para navegar na documentação oficial sem deixar passar regras que causam bugs. **Verificado** = confirmado em leitura autenticada real no serviço `midocean-connector`. **Documentado** = só na página oficial, por confirmar com dados reais antes de usar.

Antes de mexer num feed: ler a secção dele aqui, abrir a página oficial e confirmar com uma leitura real, usando sonda opt-in ou diagnóstico estrutural, sem custos nos logs.

## 1. Mapa da documentação oficial

Base: `https://midoceanbrands.atlassian.net/wiki/spaces/AIG/pages/<ID>`. As páginas são longas e a leitura anónima trunca-as. Quando faltar um detalhe, abrir a página filha específica.

| Tema | Página (ID) | Para quê |
| --- | --- | --- |
| Visão geral | 2809659394 | Integração e fluxo geral |
| Changelog | 2809659418 | **Ver antes de cada etapa**: mudanças de campos e versões |
| Como ligar | 2809659433 | Hosts de produção e de teste, frequência dos feeds, formatos |
| Ficheiros de informação | 2809659489 | Índice de stock, produtos e printdata |
| ↳ Stock 2.0 | 2809659506 | `/gateway/stock/2.0` |
| ↳ Produtos 2.0 | 2809659533 | `/gateway/products/2.0?language=pt` |
| ↳ Print Data 1.0 | 2809659555 | `/gateway/printdata/1.0` |
| Listas de preços | 2809659584 | Índice |
| ↳ Product Pricelist 2.0 | 2809659601 | `/gateway/pricelist/2.0` |
| ↳ Print Pricelist 2.0 | 2809659618 | `/gateway/printpricelist/2.0` |
| Encomendas | 2809659644 | Order Entry e Order Detail. **Fora do âmbito**: nunca testar em produção |
| A — Postman | 2809659805 | Exemplos de pedido, onde aparece o header |
| B — Coleção Postman | 2809659879 | Coleção oficial |
| C — Erros | 2809659992 | 503, não autorizado, 404/403, HTTP/1.1, redirects |
| D — Fluxo de encomenda impressa | 2809660007 | Futuro (encomendas) |
| E — Motivos de rejeição | 2809660029 | Futuro (provas e encomendas) |
| F — Cálculo do preço de impressão | 2809660044 | Componentes do custo de impressão |
| Exemplos de cálculo | 2809660059 | Fórmulas por `pricing_type` (§5.3) |
| FAQ | 3690790913 | Exceções conhecidas: ST em têxtil, códigos com 7 caracteres |

## 2. Regras transversais

- **Hosts:** produção `https://api.midocean.com`; teste `https://apitest.midocean.com`. O teste só funciona em horário de expediente europeu (503 à noite) e usa uma **chave própria**: a chave de produção não serve no teste.
- **Header da chave: `x-Gateway-APIKey`** (verificado). A documentação não lhe dá nome. Formato: `Accept: text/json` (verificado; também há `text/xml` e `text/csv`).
- **HTTP/1.1:** com outra versão, o `Accept` pode ser ignorado (Appendix C). O `fetch` do Node 22 usa HTTP/1.1.
- **Frequência:** stock de hora a hora; produtos, preços, impressão e printdata diariamente. Não ler mais do que isto e não tratar um feed diário como tempo real.
- **Só pull:** não há webhooks nem lista de encomendas; o estado de uma encomenda é consultado uma a uma.
- **Erros documentados:** 503 (indisponível, teste à noite); "Unauthorized Application Request" (chave, ambiente errado, ou API não subscrita em Webshop › Account › Customer API); 404/403 (URL errado). **Limites de pedidos não estão documentados**: ser conservador e não fazer polling apertado.
- **Encomendas:** a FAQ manda construir primeiro produtos, stock e preços em produção, pedir uma chave de teste e só depois enviar encomendas no ambiente de teste. Uma encomenda em produção é produzida, enviada e faturada.

## 3. Lições verificadas na integração real

| # | Armadilha | O que fazer |
| --- | --- | --- |
| V1 | **Products devolve 303** para `midocean-prd-final-product-files-prd.s3.eu-west-1.amazonaws.com` (URL pré-assinada) | Seguir um único salto só para esse host exato, sem enviar `x-Gateway-APIKey` ao S3. Nunca registar a URL nem a query. Um host novo bloqueia e regista só o hostname. |
| V2 | O S3 pode responder `application/octet-stream` | Aceitar só se o corpo for JSON válido |
| V3 | **Os tamanhos têxteis estão em `variant.size_textile`**, não em `size` | Ler `size_textile ?? size`. As variantes são cor × tamanho (PITCHER: 65) |
| V4 | IDs de posição com espaços e barras (`FRONT TRANSFER`, `MUG 1 360`) | Aceitar `[A-Za-z0-9_. /-]`. Validações mais estritas rejeitam o feed inteiro |
| V5 | Registos atípicos (23 em printdata) | Pôr em quarentena e contar por registo; falhar só se o envelope for inválido ou não houver nenhum registo válido |
| V6 | Tamanho: products ~28 MB, printdata ~18 MB | Limite atual de 50 MB e timeout de 180 s. Ler os feeds em sequência e libertar o `raw` depois de projetar |
| V7 | O máximo do feed é 5 posições (721 produtos) | Não interpretar 5 como corte do código |
| V8 | A categoria por palavra-chave engana (AIRA "copo" foi classificado como caneca) | Confirmar a `short_description` antes de propor |
| V9 | Envelopes: products `{products:[…]}` ou array; printdata `{printing_technique_descriptions:[…], products:[…]}` | Adaptadores estreitos, sem procura recursiva |
| V10 | `printing_technique_descriptions[].name` é um array de `{<lang>: texto}` | Escolher o `pt`; os nomes PT vêm do próprio ficheiro |
| V11 | **Pricelist (verificado 09/10):** EUR, 1,36 MB, envelope `price[]`, ligação pelo `sku` da variante; nas 6 do piloto o preço é igual em todas as quantidades | Tratar `scale` como opcional; preço só de `price` é válido para 1 un. |
| V12 | **Print pricelist (verificado):** EUR, `pricelist_valid_until` 9999-12-31; 70 técnicas, 4 sem setup ou ranges (quarentena); 6 códigos em `print_manipulations` | `description` vem **em inglês**: na loja usar os nomes PT do printdata |
| V13 | Docker Hub respondeu 429 no build do Railway | Imagem base em `public.ecr.aws/docker/library/node:22-bookworm-slim` |

Campos extra vistos no vestuário: `gender`, `long_description`, `neck`, `sleeve`, `details_textile`, e dimensões e pesos de produto e de caixa. Os nomes de produto (`product_name`) são nomes comerciais em maiúsculas, não descrições PT. A descrição PT vem da `short_description`.

## 4. Contratos por feed

### 4.1 Products 2.0 (verificado)
`GET /gateway/products/2.0?language=pt` → 303 para S3 → JSON.
- Produto: `master_code`, `master_id`, `type_of_products`, `commodity_code`, `number_of_print_positions`, `country_of_origin`, `brand`, `product_name`, `category_code`, `product_class`, `dimensions`, medidas e pesos com unidade, cartões (`inner_carton_quantity`, `outer_carton_quantity`…), `timestamp`, `digital_assets`, `short_description`, `long_description`, `material`, `printable`, `green`, `polybag`; no têxtil também `gender`, `neck`, `sleeve`, `details_textile`.
- Variante: `variant_id`, `sku`, `release_date`, `product_proposition_category`, `category_level1..3`, `color_description`, `color_group`, `color_code`, `pms_color`, `plc_status`, `plc_status_description`, `gtin`, `size_textile`, `digital_assets` (imagens `url`/`url_highress`, subtipos `item_picture_front`/`back`…).
- **FAQ:** códigos como `MO1001a` (7 caracteres) não casam; usar a base de 6 (`MO1001`).
- `plc_status`: estado de ciclo de vida (ex.: 16 COLLECTION). Antes de importar, verificar se o artigo não está descontinuado.

### 4.2 Print Data 1.0 (verificado)
`GET /gateway/printdata/1.0`. Ligação N:1 a products por `master_code` (as variantes partilham a impressão).
- Produto: `master_code`, `master_id`, `item_color_numbers`, `print_manipulation` (A, B, C, D, E, Z ou null → código de manuseamento no print pricelist), `print_template` (PDF), `printing_positions[]`.
- Posição: `position_id`, `print_size_unit` (mm), `max_print_size_height`/`_width`, `rotation`, `print_position_type`, `points[]` (px: `distance_from_left`, `distance_from_top`, `sequence_no`), `printing_techniques[]` (`id`, `default` booleano, `max_colours`), imagens com e sem área.

### 4.3 Product Pricelist 2.0 (verificado; **custos privados**)
`GET /gateway/pricelist/2.0`. Lista **específica do cliente**.
```
{ currency: "EUR", date, price: [ { sku, variant_id, price: "4,22", valid_until, scale: [ { minimum_quantity: "1000", price: "3,77" }, … ] } ] }
```
- **Números com vírgula decimal, em string** ("4,22"). Converter para cêntimos exatos; nunca usar `parseFloat` direto.
- `scale` pode não existir, conforme a conta e a região. Escolher o maior `minimum_quantity` ≤ quantidade.
- `valid_until` por artigo: um preço expirado vai para revisão, não para cálculo.
- Chave de ligação: `sku` da variante (≠ `master_code`).

### 4.4 Print Pricelist 2.0 (verificado; **custos privados**)
`GET /gateway/printpricelist/2.0`.
```
{ currency, pricelist_valid_from, pricelist_valid_until,
  print_manipulations: [ … código A–Z → price … ],
  print_techniques: [ { id, description, pricing_type, setup: "60,00", setup_repeat, next_colour_cost_indicator,
      var_costs: [ { range_id, area_from, area_to, scales: [ { minimum_quantity, price, next_price } ] } ] } ] }
```
- `next_colour_cost_indicator`: o exemplo mostra "false", mas o texto fala de 'X' ou vazio. Aceitar as duas formas e confirmar com dados reais.
- `print_manipulations`: estrutura não documentada. Confirmar com uma sonda antes de usar.

### 4.5 Stock 2.0 (documentado)
`GET /gateway/stock/2.0`, de hora a hora. `{ modified_at, stock: [ { sku, qty, first_arrival_date, first_arrival_qty, next_arrival_date, next_arrival_qty } ] }`. `qty` é a soma de todos os armazéns. As chegadas são previsões e **não são stock disponível**.

## 5. Preço de impressão (Appendix F + exemplos)

**Total = setup + impressão + manuseamento**, com escala escolhida pela quantidade de artigos.
- **Setup:** `setup` (ou `setup_repeat` numa repetição) × nº de cores ou de posições, conforme o tipo.
- **Manuseamento:** preço do código `print_manipulation` do produto × quantidade.
- **Impressão por `pricing_type`:**
  - `NumberOfColours`: `price` × qtd + `next_price` × (cores − 1) × qtd. Exemplo S2, 250 un., 4 cores: 27,5×4 + (0,53×250 + 0,37×3×250) + 0,18×250 = **565**.
  - `ColourAreaRange`: escolher o `var_costs` cuja área (cm²) cai em `area_from..area_to`; depois como em NumberOfColours. Exemplo T1 range B, 8 cores: **1185**.
  - `AreaRange`: escolher o range; `price` × qtd; setup único. Exemplo E range F: **540**.
  - `NumberOfPositions`: setup × posições + `price` × qtd × posições. Exemplo L3, 3 posições: **352,5**.
- **O preço do range é usado tal como está, sem multiplicar pela área.**
- **Exceção ST em têxtil (FAQ):** em variantes não brancas, a impressão cobra uma cor a mais; o setup fica com o nº pedido. Os códigos de cor "brancos" são AS, WW, WD, WH, NB, NW e RH.
- No exemplo NumberOfColours, "2 cores pedidas → o cálculo usa 3" refere-se ao caso ST. Confirmar caso a caso com o simulador do site MidOcean antes de confiar.

## 6. Regras M3D sobre os custos

- Custos e margens **nunca** vão para logs, tema, metafields públicos nem para o chat. Ficam em snapshot privado (R2) e na memória.
- Preço M3D = (fornecedor + impressão) × fator (1–199: 1,60 · 200–499: 1,50 · 500–1999: 1,40 · 2000+: 1,35) × (1 + IVA 23 %), apresentado com IVA incluído (`taxesIncluded=true`). Núcleo: `backend/pricing.mjs`.
- Só os preços finais de venda são públicos.
- O SKU MidOcean fica só no servidor; o SKU Shopify é opaco (opção A).

## 7. Lista de verificação antes de cada alteração

1. Changelog oficial sem mudanças ao feed?
2. Nome e formato do campo confirmados com dados reais (sonda opt-in), não só com o exemplo truncado?
3. Números com vírgula convertidos sem perda de precisão; moeda verificada (`EUR`)?
4. Quarentena por registo em vez de falha global; contagens nos logs?
5. Nada de custo, chave, URL assinada ou resposta bruta nos logs?
6. Redirect só para hosts observados, sem a chave?
7. Testes com fixtures que reproduzem o formato real, incluindo os casos V1–V10?
8. Leituras desligadas depois (`READ_AUDIT_ENABLED=false`), para um restart não repetir downloads?
9. Encomendas só no teste e com autorização explícita?
