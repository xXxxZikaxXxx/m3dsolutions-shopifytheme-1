# MidOcean — shortlist do piloto

09/10/2026. Escritor: Claude. Fonte: auditoria só de leitura do deployment `65a93b37-8f73-41a9-be7f-4377a3153db8` (Railway `midocean-connector`), feed `products/2.0?language=pt` e `printdata/1.0`. Sugestões automáticas; nenhuma referência foi escolhida, importada ou tem preço. **A escolha é do utilizador.**

## Leitura

| Indicador | Valor |
| --- | --- |
| Produtos PT válidos | 2573 (0 rejeitados) |
| Produtos com printdata | 2510 (23 registos rejeitados) |
| Produtos com ambos | 2477 |
| Tamanho lido | products 28,2 MB · printdata 18,4 MB (abaixo do limite de 50 MB) |
| Shopify | 5 produtos lidos, amostra; token por client credentials ok |
| Snapshot R2 | guardado e verificado (SHA-256) em `m3d-snapshots` |

## Candidatos sugeridos

Critério: printdata ligado, ≥2 posições ou técnicas, ordenado por posições e técnicas. Limite de 2 por categoria e 4 em vestuário.

| Categoria | Ref. | Nome | Posições | Técnicas |
| --- | --- | --- | --- | --- |
| Saco | MO6660 | NATA | 5 | 6 |
| Saco | MO9861 | FOLDPET | 5 | 6 |
| Garrafa | MO6800 | THAI | 5 | 11 |
| Garrafa | MO6545 | UTAH LARGE | 5 | 10 |
| Caneca | MO6971 | AIRA | 5 | 7 |
| Caneca | MO3207 | AGRADABLE | 5 | 6 |
| Vestuário | S01159 | SPORTY WOMEN | 5 | 6 |
| Vestuário | S01166 | SPORTY KIDS | 5 | 6 |
| Vestuário | S02995 | SPRINT | 5 | 6 |
| Vestuário | S04442 | PITCHER | 5 | 6 |

## Leitura crítica (Claude, UX/P-A)

- **Todos os candidatos têm exatamente 5 posições.** O código não tem corte em 5, mas o empate é suspeito. Pode ser o máximo real do feed ou um empate natural, e a ordenação depois desempata por técnicas e por código. Confirmar no snapshot a distribuição de posições antes de concluir que são os mais ricos.
- **Garrafas:** THAI (11 técnicas) e UTAH LARGE (10) são os que melhor exercitam a P-A, com várias personalizações e técnicas diferentes por posição.
- **Vestuário:** a lista pede uma t-shirt com tamanhos e um polo ou sweat com bordado. SPORTY WOMEN/KIDS e SPRINT parecem t-shirts técnicas; PITCHER pode ser polo. É preciso confirmar no snapshot os tamanhos e se o bordado está entre as técnicas. SPORTY KIDS só faz sentido se houver público infantil.
- **Saco:** o MO9846 (Cottonel Colour ++), proposto antes, não entrou porque o corte fica nos 2 com mais posições e técnicas. Continua elegível se o utilizador o preferir.
- **Nomes:** os títulos são o nome de modelo MidOcean, não descrições PT. A PDP vai precisar do `short_description` PT e do SKU opaco M3D (opção A).

## Seleção do piloto — aprovada pelo utilizador em 09/10/2026

O utilizador autorizou as 5 referências recomendadas abaixo, depois de as verificar: **MO6660 NATA, MO6800 THAI, MO6971 AIRA, S01159 SPORTY WOMEN, S04442 PITCHER**. A aprovação não autoriza importação, preços nem escrita no catálogo; a inspeção do snapshot continua a confirmar tamanhos, bordado e descrições PT.

## Recomendação de 5 (Claude, UX)

| Papel no piloto | Ref. | Porquê |
| --- | --- | --- |
| Saco | MO6660 NATA | 5 posições, 6 técnicas. Alternativa: MO9861 FOLDPET, ou MO9846 se o utilizador preferir o algodão clássico (não foi escolhido pelo ranking). |
| Garrafa | MO6800 THAI | 11 técnicas: o caso mais exigente para a lista de várias personalizações da P-A. |
| Caneca | MO6971 AIRA | 7 técnicas, mais do que AGRADABLE. |
| Vestuário 1 | S01159 SPORTY WOMEN | Provável t-shirt com tamanhos; testa a matriz de tamanho e cor. |
| Vestuário 2 | S04442 PITCHER | Provável polo; testa o bordado, se a técnica constar. |

Ressalvas:
- **SPORTY KIDS fica de fora** salvo se houver público infantil.
- Os nomes são nomes comerciais MidOcean, não PT. Indicam o artigo, mas a PDP vai precisar da descrição PT.
- As duas peças de vestuário dependem de confirmar tamanhos e bordado no snapshot. Se PITCHER não tiver bordado, trocar por SPRINT ou procurar um polo ou sweat com bordado fora desta lista.

## Próximo passo

1. O Codex confirma no snapshot a distribuição de posições, tamanhos e técnicas por candidato, sem custos.
2. O utilizador escolhe 5 referências (saco, garrafa, caneca e duas peças de vestuário).
3. Simulação de preço com custos reais, só no servidor, antes de qualquer rascunho na Shopify. A escrita no catálogo continua sem autorização.

## Inspeção do snapshot — 09/10/2026 (deployment `13577bf9`)

Fonte: snapshot privado já guardado no R2, sem novas leituras à MidOcean nem à Shopify. Sem custos.

**Distribuição de posições** (2510 produtos com printdata): 1 → 245 · 2 → 640 · 3 → 347 · 4 → 557 · **5 → 721**. Cinco é o máximo do feed. O empate dos candidatos é natural, não um corte.

| Ref. | Descrição PT | Material | Posições | Bordado | Notas |
| --- | --- | --- | --- | --- | --- |
| **MO6660 NATA** | Saco de feltro RPET, 38×42 cm | RPET | 5: frente, costas, transfer, gravação a quente, sublimação | não | 6 técnicas |
| MO9861 FOLDPET | Saco de compras dobrável RPET | RPET | 5 | não | |
| MO9846 COTTONEL COLOUR++ | Saco de algodão 180 g/m², 38×42 cm | Algodão | 5 | **sim** (posição EMBROIDERY 180×180 mm) | |
| **MO6800 THAI** | Garrafa de vidro 500 ml, com bolsa | Vidro | 5: serigrafia redonda, bolsa, frente, pega, tampa | não | 11 técnicas, incluindo laser, tampografia e doming |
| MO6545 UTAH LARGE | Garrafa de vidro com bolsa, 750 ml | Vidro | 5 | não | 10 técnicas |
| **MO6971 AIRA** | **Copo de parede dupla 700 ml** | Inox | 5: manga, 360°, serigrafia redonda, frente, costas | não | ⚠ É um copo térmico, não uma caneca |
| MO3207 AGRADABLE | Conjunto: manta de lã + 2 canecas | PET | 5 | não | ⚠ É um conjunto, não uma caneca |
| **S01159 SPORTY WOMEN** | T-shirt desportiva senhora 140 g | PET | 5: frente, costas, peito, braço direito e esquerdo | **sim** (peito e braços) | 6 técnicas |
| S01166 SPORTY KIDS | T-shirt desportiva criança 140 g | PET | 5 | sim | Público infantil |
| S02995 SPRINT | T-shirt unissexo 130 g | PET | 5 | sim (peito e braços) | |
| **S04442 PITCHER** | **Polo unissexo** | PE | 5 | **sim, em todas as posições** | Confirmado como polo |

**Tamanhos:** a projeção devolveu `sizeCount: 0` em todos os artigos, incluindo o vestuário. Não significa que não haja tamanhos: o campo `variant.size` lido pelo `midocean.mjs` não é onde o feed products 2.0 guarda os tamanhos têxteis. É preciso identificar o campo real numa leitura de estrutura antes da importação.

**Implicações para o piloto aprovado:**
- **A "caneca" MO6971 AIRA é um copo térmico de inox.** Nenhum dos dois candidatos "caneca" é uma caneca simples; a classificação apanhou "copo" e "canecas" do conjunto. O utilizador decide: manter AIRA como artigo de bebida (bom teste: 360° digital e laser), ou procurar uma caneca cerâmica real com outra leitura do snapshot.
- PITCHER e SPORTY WOMEN confirmam bordado, por isso cobrem o caso têxtil da P-A.
- O MO9846 é o único saco com bordado, uma alternativa ao NATA se se quiser testar bordado num saco.

## Piloto final — decisão do utilizador, 09/10/2026

O utilizador **mantém o MO6971 AIRA** (copo térmico de inox, artigo de bebida) e **acrescenta o MO9846 COTTONEL COLOUR++** ao lado do NATA. O piloto passa a **6 referências**:

| Papel | Ref. | Nome | Bordado |
| --- | --- | --- | --- |
| Saco | MO6660 | NATA (feltro RPET) | não |
| Saco | MO9846 | COTTONEL COLOUR++ (algodão 180 g/m²) | sim |
| Garrafa | MO6800 | THAI (vidro 500 ml) | não |
| Bebida | MO6971 | AIRA (copo térmico inox 700 ml) | não |
| Vestuário | S01159 | SPORTY WOMEN (t-shirt senhora) | sim |
| Vestuário | S04442 | PITCHER (polo unissexo) | sim |

Sem importação, preços nem escrita no catálogo. Antes da importação falta identificar o campo real dos tamanhos têxteis.

## Tamanhos — corrigido em 09/10/2026 (deployments `0be13456` e `c543e31d`)

Uma sonda opt-in (`MIDOCEAN_FIELD_PROBE`, só nomes de campos e valores de campos com "size") mostrou que o feed products 2.0 guarda os tamanhos em **`variant.size_textile`**, e não em `variant.size`. O vestuário traz ainda, ao nível do produto, `gender`, `long_description` e, no polo, `neck`, `sleeve` e `details_textile`. O `midocean.mjs` passou a ler `size_textile` (com `size` como alternativa); o inspector ordena os tamanhos XXS → 5XL. Foi feita uma leitura nova: o snapshot mais recente já tem os tamanhos.

| Ref. | Tamanhos | Variantes |
| --- | --- | --- |
| **S01159 SPORTY WOMEN** | XS · S · M · L · XL · XXL | 96 |
| **S04442 PITCHER** | XS · S · M · L · XL · XXL · 3XL | 65 |
| S02995 SPRINT | XXS · XS · S · M · L · XL · XXL · 3XL | 104 |
| S01166 SPORTY KIDS | XL · XXL · 3XL · 4XL (rótulos estranhos para criança; fora do piloto) | — |

As variantes são combinações de cor × tamanho (ex.: PITCHER, 65). Na importação, cada variante Shopify = cor + tamanho; o SKU opaco M3D (opção A) inclui as duas.
