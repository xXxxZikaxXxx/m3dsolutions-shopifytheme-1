# Piloto MidOcean — simulação de preços

09/10/2026. Escritor: Claude (durante a passagem). Deployment `731cc806` (SUCCESS). Fonte: os quatro feeds reais (products PT, printdata, pricelist, printpricelist), lidos uma vez. O plano completo, com custos, está **só** no R2 privado: `m3d-snapshots/pilot-plans/bd109214-9ecc-40d6-b10f-333fce84cd33.json` (212 KB, SHA-256 verificado). Aqui estão só preços de venda.

## Leitura dos feeds

| Feed | Resultado |
| --- | --- |
| Pricelist | EUR, data 2026-10-09; **189/189** SKUs do piloto com preço; 0 rejeitados; 1,36 MB |
| Print pricelist | EUR, válido de 2026-10-09 até 9999-12-31; 70 técnicas, 6 códigos de manuseamento, 4 técnicas rejeitadas (sem setup ou ranges); 94 KB |
| Products / printdata | como na auditoria (28 MB / 18 MB) |

Regra: preço = (fornecedor [+ impressão]) × fator (1,60 / 1,50 / 1,40 / 1,35) × 1,23, arredondado ao cêntimo no fim (half-up). Aritmética inteira em 1/10 000 €. Paridade com `pricing.mjs` testada; os 4 exemplos oficiais da MidOcean (565 / 1185 / 540 / 352,5 €) são reproduzidos nos testes.

## Preço unitário de venda, IVA incluído (€)

**Liso** (sem impressão). Intervalo entre variantes (cores e tamanhos):

| Ref. | Artigo | Variantes | 1 un. | 200 un. | 500 un. | 2000 un. |
| --- | --- | --- | --- | --- | --- | --- |
| MO6660 | Saco de feltro RPET | 3 cores | 1,59–2,77 | 1,49–2,60 | 1,39–2,43 | 1,35–2,34 |
| MO9846 | Saco de algodão 180 g/m² | 23 cores | 1,14 | 1,07 | 1,00 | 0,96 |
| MO6800 | Garrafa de vidro 500 ml | 1 | 4,21 | 3,95 | 3,69 | 3,55 |
| MO6971 | Copo térmico 700 ml | 1 | 15,82 | 14,83 | 13,84 | 13,35 |
| S01159 | T-shirt senhora 140 g | 16 cores × 6 tam. = 96 | 3,27–3,58 | 3,06–3,36 | 2,86–3,13 | 2,76–3,02 |
| S04442 | Polo unissexo | 10 cores × 7 tam. = 65 | 5,06–5,90 | 4,74–5,54 | 4,43–5,17 | 4,27–4,98 |

**Com impressão (exemplo):** um logótipo, 1 cor, 1 posição, área até 50 cm², técnica por omissão da 1.ª posição. Inclui setup amortizado e manuseamento.

| Ref. | Exemplo | 100 un. | 200 un. | 500 un. | 2000 un. |
| --- | --- | --- | --- | --- | --- |
| MO6660 | Frente · Serigrafia (S3) | 3,23–4,41 | 2,75–3,86 | 2,10–3,13 | 1,95–2,95 |
| MO9846 | Frente · Serigrafia (S1) | 2,60 | 2,16 | 1,60 | 1,47 |
| MO6800 | Serigrafia redonda (RS6), manuseamento B | 5,59 | 4,92 | 4,24 | 4,00 |
| MO6971 | Manga · Gravação laser (L3), manuseamento B | 17,04 | 15,79 | 14,45 | 13,88 |
| S01159 | Frente · Serigrafia têxtil (ST1) | 4,35–4,92 | 3,89–4,43 | 3,32–3,79 | 3,15–3,60 |
| S04442 | Frente · Serigrafia têxtil (ST1) | 6,14–7,24 | 5,57–6,61 | 4,89–5,82 | 4,67–5,56 |

Notas:
- **ST em têxtil:** nas variantes não brancas cobra-se uma cor de impressão a mais (FAQ MidOcean), daí os intervalos mais largos.
- Nos artigos lisos os escalões seguem só o fator M3D: a pricelist desta conta não tem escalas de quantidade nestas referências (preço fornecedor constante).
- **Pressupostos ainda a validar:** o setup é amortizado no preço unitário da quantidade (política proposta, não aprovada); manuseamento `null` = 0; área de exemplo de 50 cm². A descrição das técnicas na print pricelist vem em inglês; na loja usam-se os nomes PT do printdata.
- Antes de vender, comparar 2–3 casos com o simulador do site MidOcean (FAQ: "preços de impressão não batem com o site").

## Importação (preparada, à espera de permissão)

O código importa os 6 como **rascunho**: handle `m3d-sc001`…`m3d-pl001`, SKU opaco `M3D-{código}-{cor}[-{tamanho}]`, títulos PT, opções Cor/Tamanho, imagens do CDN MidOcean e preço base = preço de 1 un. (fator 1,60, IVA incluído). O inventário não é controlado. Nenhum código MidOcean vai para a Shopify: o mapa SKU M3D ↔ SKU fornecedor fica em `m3d-snapshots/pilot-imports/`. O código recusa produtos sem a tag `midocean-piloto` e handles fora do padrão, e nunca muda o estado de um produto do piloto que já exista. 109 testes.
