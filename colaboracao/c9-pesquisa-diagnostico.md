# C9 — diagnóstico da pesquisa (09/10/2026)

Executor: Codex `/root/review_scope`. Somente leitura do tema, GET/HEAD da vitrine e queries Admin autorizadas; único ficheiro escrito nesta tarefa é este relatório. Nenhuma alteração de catálogo/Admin, preço, tema, sessão de outro revisor, commit, push ou deploy. Aplicadas as skills `webapp-testing`, `shopify:shopify-admin` e `shopify:shopify-custom-data`; documentação técnica oficial consultada para interpretar o comportamento observado.

## Conclusão

V1 é reproduzível antes da execução do JavaScript do tema: o HTML da pesquisa e a resposta JSON nativa já devolvem produtos sem relação literal com o termo. Não encontrei uma transformação de `q` ou um preenchimento artificial da lista no tema. A pesquisa da vitrine pública está protegida; não é possível, nesta sessão, afirmar que o comportamento é exclusivo da prévia nem atribuí-lo a indexação corrompida.

Há um erro factual no enunciado original: `zzqxv` devolve **22 produtos, dos quais 17 relógios e cinco artigos natalícios**, não 22 relógios. A primeira página mostra 16 relógios; a segunda mostra Budweiser, MOUDURA NATALINA, PORTA-VINHOS PARA 6 VINHOS e três sacos. Todos os handles estão presentes no catálogo público obtido pela própria prévia. Não foi encontrada evidência de produtos fantasma/removidos nesse conjunto.

O estado sem resultados existe e funciona: consultas com sintaxe explícita ou termo entre aspas devolvem zero para `zzqxv` e mostram a mensagem vazia. Portanto, “nunca aparece” não descreve todos os tipos de consulta; descreve as consultas livres testadas na ronda do Claude.

## Método e limites

- Cliente Playwright `APIRequestContext`: GET direto, sem executar JavaScript, para HTML, `search/suggest.json`, `products.json`, produto `.js` e `.json`.
- Browser Chromium novo, viewport 390 × 844: pesquisa nativa enviada pelo campo do cabeçalho. Todas as requisições não GET/HEAD foram abortadas; os POST de pixels Shopify bloqueados não foram operações de carrinho ou catálogo.
- Comparação direta com `https://uhqyjs-w5.myshopify.com`, sem credenciais: HTML de pesquisa redireciona para `/password`; `search/suggest.json` retorna 401. Não foi submetida palavra-passe nem procurada autenticação.
- Código local e pacote público instalado Shopify CLI 4.9.0 inspecionados. Nenhum ficheiro de sessão, `.env`, cookie ou token foi lido/imprimido.
- Consultas Admin pela app Shopify: domínio confirmado por `get_shop_info`, schema consultado e operação validada antes da execução. Apenas produtos, variantes, SEO, metafields, publicação e formato de moeda; nenhuma mutation nem dados de clientes.
- A matriz de pesquisa corresponde à prévia `http://127.0.0.1:9292`. A leitura Admin cobre os 17 relógios afetados e o saco com preço positivo; não cobre todos os idiomas, imagens, apps ou configurações de relevância da loja.

## Resultados GET

Nas pesquisas HTML abaixo, `type=product`; resultados paginados por 16. Os totais são os que a Shopify entrega a `search.results_count`.

| Consulta | Resultado observado |
| --- | --- |
| `zzqxv`, `options[prefix]=last` | 22 produtos; 16 relógios na primeira página |
| `zzqxv`, `options[prefix]=none` | Os mesmos 22 produtos |
| `qzzqxv`, prefix `none` | 22 produtos |
| `saco`, prefix `last` ou `none` | 23 produtos; saco com stock primeiro, seguido de resultados adicionais |
| `garrafa`, prefix `none` | 22 produtos; primeira página só com relógios |
| `xylophonetenmillionneedle`, prefix `none` | 1 resultado: MOUDURA NATALINA |
| `title:zzqxv` | Zero; mensagem sem resultados |
| `title:saco` | Quatro sacos |
| `title:Jeep` | Um relógio Jeep |
| `vendor:zzqxv`, `tag:zzqxv`, `product_type:zzqxv` | Zero em cada consulta |
| `variants.sku:zzqxv` | Zero |
| `variants.sku:3S-0145` | Um produto Amazon |
| `"zzqxv"` | Zero; mensagem sem resultados |
| `"saco"` | Quatro sacos |
| `"garrafa"` | Dois sacos porta-garrafas |
| OR explícito de `zzqxv` em title/body/tag/vendor/product_type/variants.sku/variants.barcode/variants.title | Zero |

O campo qualificado de SKU correto para estes controlos é `variants.sku`. Uma tentativa exploratória com `sku:zzqxv` produziu resultados amplos; não foi usada como evidência de correspondência de SKU.

Em `search/suggest.json?q=zzqxv&resources[type]=product&resources[limit]=10`, a resposta contém dez relógios: Carlsberg, Jeep, Pepsi, JCB, Audi, Swiss Air, Bacardi, Budweiser, M&S e Marshal. São os primeiros resultados do limite solicitado, não um total de 22 informado pelo endpoint. Repetir com `resources[options][fields]=title`, `body` ou `variants.sku` não muda os resultados. `q=title:zzqxv` devolve lista vazia.

`products.json?limit=250` devolveu 23 produtos: 17 relógios e seis artigos natalícios. Os campos públicos desse JSON não contêm `zzqxv` nos títulos, descrições, tags, vendor/type ou SKUs. Amazon `.js`/`.json` confirma SKU `3S-0145`, tipo Wrist Watches, tags `catalogue-2026-27` e `wrist-watches`, descrição Specifications/Premium German Craft Box/Warranty: 12 months. A ausência literal nesse snapshot não exclui atributos de categoria, traduções, informação de imagem ou configuração externa não exposta.

## Tema e requisição efetiva

- `sections/nav.liquid:57–60`: formulário GET para `routes.search_url`, com `type=product`, `options[prefix]=last` e campo `q`.
- `sections/nav.liquid:348–353`: só impede uma pesquisa desktop vazia para abrir o painel. Não troca o termo nem faz predictive fetch.
- No browser, preencher `zzqxv` e pressionar Enter produziu exatamente `GET /search?type=product&options%5Bprefix%5D=last&q=zzqxv`. H1 preservou o termo e surgiram 16 cards. Não houve requisição de suggest.json pelo componente do tema.
- `sections/main-search.liquid:6–36`: compara termo completo com título/SKU dos resultados para redirecionar um match exato; não cria produtos adicionais.
- `sections/main-search.liquid:64–68,130–135`: pagina `search.results`, usa `search.results_count` e renderiza apenas os itens de tipo produto recebidos. O vazio é condicionado ao total zero da Shopify.
- `sections/main-search.liquid:291–297`: acrescenta tipo produto/prefix quando o tipo está ausente; não altera `q`. O diagnóstico já enviava `type=product`, pelo que este bloco não interferiu.
- `snippets/card-product.liquid` apresenta o produto recebido; não executa uma busca alternativa.

As linhas acima referem-se ao snapshot lido antes das correções V4 do líder; `main-search` e locales continuam sob propriedade do líder.

## Renderer/proxy de desenvolvimento

No código distribuído da CLI instalada (`AppData/Roaming/npm/node_modules/@shopify/cli/dist/chunk-NTVEJYKI.js`):

- O handler `Dt` separa pathname/query e passa `query: [...new URLSearchParams(r)]` ao renderer Shopify, junto do theme ID e templates locais. Não encontrei regra específica que apague/substitua `q`.
- O proxy constrói a URL a partir do caminho original, conserva a query e acrescenta `_fd=0`/`pb=0`. Não encontrei alteração do termo na via de JSON.
- A via HTML usa renderer; pedidos JSON usam proxy para Shopify. A reprodução nas duas vias reduz a hipótese de bug exclusivo no Liquid, mas não substitui uma comparação direta com sessão pública autorizada.

Não foi instrumentado o processo da CLI nem capturado tráfego autenticado de upstream. Assim, a análise de código mostra o comportamento implementado, não uma prova independente dos bytes enviados internamente naquela sessão.

## Interpretação com documentação oficial

O parâmetro predictive `resources[options][fields]` é **ignorado para produtos** na documentação atual; só restringe outros recursos. O facto de `fields=title` não mudar os relógios não demonstra defeito do proxy. A API também documenta motores diferentes para predictive e storefront search. [Predictive Search API](https://shopify.dev/docs/api/ajax/reference/predictive-search).

A pesquisa nativa documenta tolerância a erros, relaxamento e entendimento semântico, e informa que não existe uma configuração geral que determine a amplitude do matching. Sintaxe de pesquisa desativa comportamentos como tolerância e entendimento semântico. Isso é consistente com os controlos explícitos/entre aspas mais restritos observados, mas não identifica o mecanismo exato desta loja. [Comportamento da pesquisa](https://help.shopify.com/en/manual/online-store/storefront-search/search-behavior).

Não é correto atribuir ambos os endpoints apenas à pesquisa semântica: a documentação afirma que essa capacidade não se aplica à predictive search. `get_shop_info` devolveu a denominação de plano `Shopify`, que não basta para confirmar a elegibilidade/ativação da capacidade na loja. Boosts e configurações do Search & Discovery não foram auditados. [Modificação da pesquisa](https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-modify-search).

## Verificação Admin autorizada

`get_shop_info` confirmou `uhqyjs-w5.myshopify.com`, moeda EUR e país Portugal. A operação somente leitura foi validada contra o schema Admin antes de duas execuções: uma amostra Amazon/Jeep/Carlsberg + SACO NATALÍCIO BONECO DE NEVE COM CORDÃO e todos os 17 produtos `product_type:"Wrist Watches"`. As conexões de variantes/metafields dos 17 relógios não tinham página seguinte.

- Os 17 relógios estão `ACTIVE`, com duas publicações marcadas `isPublished=true`, categoria `Sem categoria`, uma variante cada e preço `0.00`. Não houve escrita de preços.
- Títulos, descrição, vendor/type, tags, SKU/barcode, SEO e valores de metafields lidos não contêm `zzqxv`. Os únicos metafields devolvidos para os relógios são `global.title_tag` e `global.description_tag`, com os títulos e a descrição comercial já expostos. Não existe `seo.hidden` nesse conjunto. Isto elimina uma correspondência literal nesses campos, sem provar o estado completo do índice ou a relevância nativa.
- `products(first:5, query:"zzqxv")` no Admin devolve zero. O motor de procura de produtos no Admin não é uma referência equivalente à busca da vitrine: essa diferença não prova corrupção do índice storefront.
- `onlineStoreUrl` veio `null`, inclusive para o saco cuja PDP funciona na prévia. A publicação foi verificada apenas por ID/estado; não foi atribuída a um canal específico. Assim, `null` não foi convertido em conclusão de que estes produtos estão removidos ou ocultos na vitrine.
- O saco positivo tem variantes Beige e Red a `1.80`, ambas sem outra página de variantes; possui metafields de categoria Shopify por referências a metaobjects. Não foram resolvidas essas referências nem extraídas traduções/imagens; continuam fora da cobertura desta auditoria.

A confirmação de campos públicos e Admin reforça que o tema não introduz os resultados, mas não identifica qual comportamento nativo produz correspondência tão ampla. Não há fundamento para alterar catálogo ou marcar os relógios como produtos fantasma.

## V12 — separador decimal dos preços

A diferença `€1.80` no card versus `€1,80` na PDP **não foi reproduzida no estado atual**. Nova leitura direta, sem JavaScript, de `/search?q=saco&type=product&options[prefix]=last` devolveu `€1,80` para o saco positivo. A PDP `/products/saco-natalicio-boneco-de-neve-com-cordao` devolveu `€1,80` no HTML inicial e nos dois fragmentos `price_html` das variantes. O browser Chromium 390 px confirmou o mesmo texto no DOM depois de executar o tema; os pedidos não GET/HEAD permaneceram bloqueados.

A leitura Admin devolveu `currencyFormats.moneyFormat = €{{amount_with_comma_separator}}` e `moneyWithCurrencyFormat = €{{amount_with_comma_separator}} EUR`. O preço numérico Admin é `1.80`; no JSON do tema é `180` cêntimos. Esses valores numéricos não são o texto formatado exibido.

Fonte atual da apresentação:

- `snippets/price.liquid:37,59,61,65`: `money_price` e preço comparado passam pelo filtro nativo `money`.
- `snippets/card-product.liquid:65,128`: os dois contextos de card usam o mesmo snippet de preço, com o produto.
- `sections/main-product.liquid:62,203`: HTML inicial usa a variante selecionada; JSON captura HTML pelo mesmo snippet para cada variante.
- `assets/m3d-product.js:59–60`: a mudança de variante reutiliza `variant.price_html` entregue pelo Liquid, sem um formatter de moeda próprio.

Não há evidência, nestas respostas atuais, para corrigir locale/formatação do tema. A observação anterior pode ser conservada como ocorrência histórica, mas a causa não foi demonstrada; nenhum cache, sessão ou ficheiro anterior foi comparado. Se voltar a ocorrer, guardar URL completa, resposta HTML e `price_html` da mesma sessão antes de atribuir a diferença ao JavaScript ou à configuração de moeda. Não foi adicionado um formatter JS para mascarar o sintoma.

## Correção e próxima verificação

**Nenhuma correção de geração de resultados foi identificada no tema para V1.** Não filtrar os resultados no cliente nem trocar a contagem da Shopify para esconder o sintoma; isso quebraria paginação, facetas e expectativas. Não alterar tags/SKUs/preços sem evidência de qual campo é responsável.

1. Concluir V4 separadamente: estado inicial da pesquisa sem termo, sem mudar a semântica da busca. É uma melhoria de tema autorizada ao líder.
2. Repetir a matriz em sessão pública de leitura autorizada quando disponível. Se o comportamento coincidir, encaminhar à Shopify evidências do termo, endpoint, IDs e resultado esperado para verificar relevância e campos/configuração. Se divergir, isolar a sessão/renderer de desenvolvimento e preparar reprodução da CLI.
3. Para demonstrar o vazio no QA real atual, usar `q="zzqxv"` ou `q=title:zzqxv`, identificando a sintaxe no relatório. Isso testa uma resposta zero real do servidor, sem fixture ou filtro artificial.
4. Caso a M3D queira oferecer pesquisa literal, há uma alternativa técnica testada: consulta com sintaxe explícita ao servidor. Deve ser um modo claramente identificado, com escape do texto, manutenção em filtros/paginação e testes de SKU/acentos/frases. Não é recomendada uma troca silenciosa global: ela muda matching e perde capacidades documentadas. Nenhuma implementação desse modo foi feita nesta tarefa.

V1 permanece uma pendência de relevância nativa a confirmar operacionalmente. O diagnóstico não autoriza mutações de catálogo nem garante aumento de conversão.
