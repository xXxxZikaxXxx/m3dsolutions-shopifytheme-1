# C3 — baseline local · 08/10/2026

Responsável: sub-agent nativo Codex `qa_local`. Escopo: somente leitura do tema e navegador, evidências em `.shopify/qa-redesign-20261008/`.

## Resultado

A prévia `http://127.0.0.1:9292/` não estava disponível na inspeção inicial. Fetch falhou e o socket TCP retornou `10061` (conexão recusada). Nenhum servidor foi iniciado/reiniciado por C3.

Python 3.13 e Playwright importam corretamente. Chromium headless abre normalmente. O helper da skill `webapp-testing` foi consultado com `--help`.

Não há captura nem conclusão sobre UI, overflow, console do tema, navegação ou acessibilidade do estado atual, pois não houve página renderizada. Os relatos históricos em `agente.md` não substituem a validação atual.

## Preparado para a prévia disponível

Script: `.shopify/qa-redesign-20261008/baseline.py`. Captura desktop 1440×1000 e mobile 390×844, rotas públicas locais, H1, fontes, overflow, imagens quebradas, nomes acessíveis e categorias de erros de consola. Caminhos são derivados de HTML público quando disponível; queries de autenticação não são registradas.

Bloqueia todo método diferente de GET/HEAD/OPTIONS; não submete contacto, autenticação, adição ao carrinho, checkout ou mutações Shopify. Não guarda DOM integral, cookies, tokens ou valores dos campos. Capturas podem mostrar a senha como campo vazio; nenhum segredo é preenchido.

Evidência de indisponibilidade: `.shopify/qa-redesign-20261008/baseline.json`.

Para executar quando o líder confirmar a sessão de desenvolvimento:

```powershell
& 'C:/Users/Administrator/AppData/Local/Programs/Python/Python313/python.exe' '.shopify/qa-redesign-20261008/baseline.py'
```

## Pendências

- Liderança verificar/autorizar a prévia de desenvolvimento; C3 não altera a sessão.
- Executar baseline antes de integrar o redesenho, quando ainda possível.
- Após integração, validar visualmente navegação/pílula por clique e teclado, formulários sem envio, preços/consulta, contraste real, quantidade, galeria e movimento reduzido. A coleta acima é inicial e não prova conformidade WCAG.

Nenhum arquivo do tema, catálogo, contacto, pedido, preço, configuração Shopify ou Git foi alterado. Sem commit/push/deploy.

## Continuação após reinício da prévia

O líder reiniciou a prévia no tema development `166780993606` (live `152494637126` preservado). A homepage respondeu 200 em desktop1440 e mobile390, com um H1, fonte Assistant, zero overflow e nenhuma imagem quebrada ou input/botão sem nome na coleta inicial. Não houve envio real de POSTs; pedidos mutantes automáticos foram bloqueados.

A captura ampliada encontrou 200 em `/`, `/collections/all`, `/pages/pedir-orcamento`, `/pages/login`; depois surgiram500 em cart/produto/mobile. Causa isolada: **Failed to Upload Theme Files**, `templates/page.m3d-quote.json` refere tipo `m3d-quote` antes da secção existir na sincronização. Esta janela de construção impediu concluir a rodada; não é evidência de regressão própria das páginas500.

A coleção contém rotas reais `/products/3s-145-amazon` e `/products/3s-149-audi`. A navegação contém as11 páginas de categoria históricas; o handle publicado de vestuário continua `/pages/vesturio-e-acessrios`. `/pages/pedir-orcamento` mostrou somente título antes da integração do formulário.

A homepage capturada continua com hero/duas campanhas, quatro placeholders na vitrine e mensagens empresariais. Captura desktop: `.shopify/qa-redesign-20261008/home-desktop.png`. A última captura mobile foi sobrescrita pelo estado500 da rodada ampliada; repetir para manter evidência atual válida. `baseline.json` distingue cada HTTP/status e viewport.

Erro de módulo dinâmico foi observado repetidamente em páginas200; a origem ainda não está isolada, porque a segunda consulta já encontrou erro de upload. Erros de recurso nesta execução também incluem POSTs automáticos bloqueados pela política read-only; não classificá-los automaticamente como erros do tema.

Pendência imediata: finalizar/sincronizar secção orçamento e repetir PDP/carrinho/mobile, depois QA final de navegação, formulário e design aplicado.

## Descoberta de rotas após secção sincronizada

Prévia recuperada (HTTP200). A falha de módulo dinâmico foi isolada em recurso externo: `cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js`; não é arquivo JavaScript do tema.

GET público `/collections.json`, 24 coleções:

| Título publicado | Rota | Produtos publicados |
| --- | --- | ---: |
| Bags | `/collections/bags` | 63 |
| Caps | `/collections/caps` | 46 |
| Coasters | `/collections/coasters` | 16 |
| Combo | `/collections/combo` | 21 |
| Desk Managers | `/collections/desk-managers` | 4 |
| Drinkware | `/collections/drinkware` | 7 |
| Fridge Magnets | `/collections/fridge-magnets` | 12 |
| Jackets | `/collections/jackets` | 8 |
| Lifestyle Products | `/collections/lifestyle-products` | 4 |
| Mobile Stand | `/collections/mobile-stand` | 7 |
| Mouse Pad | `/collections/mouse-pad` | 3 |
| Notebooks | `/collections/notebooks` | 61 |
| OPERAÇÃO NATAL DA M3D | `/collections/operacao-natal-da-m3d` | 5 |
| Paper Weight | `/collections/paper-weight` | 16 |
| Pens | `/collections/pens` | 20 |
| Photo Frames | `/collections/photo-frames` | 28 |
| Promotional Key Chain | `/collections/promotional-key-chain` | 3 |
| Página inicial | `/collections/frontpage` | 1 |
| Shirts | `/collections/shirts` | 12 |
| T-Shirts | `/collections/t-shirts` | 54 |
| Table Clocks/Desk Organizer | `/collections/table-clocks-desk-organizer` | 63 |
| Travel Essentials | `/collections/travel-essentials` | 14 |
| Wall Clocks | `/collections/wall-clocks` | 65 |
| Wrist Watches | `/collections/wrist-watches` | 17 |

Páginas presentes no header/nav/footer (queries removidas):

- A minha conta — `/pages/login`
- Campanhas sazonais — `/pages/campanhas-sazonais`
- Casa e bem-estar — `/pages/casa-e-bem-estar`
- Copos e garrafas — `/pages/copos-e-garrafas`
- Escritório e escrita — `/pages/escritorio-e-escrita`
- Eventos e feiras — `/pages/eventos-e-feiras`
- Ideias para o dia a dia — `/pages/ideias-para-o-dia-a-dia`
- Kits de boas-vindas — `/pages/kits-de-boas-vindas`
- Malas e viagens — `/pages/malas-e-viagens`
- Presentes para equipas — `/pages/presentes-para-equipas`
- Tecnologia — `/pages/tecnologia`
- Vestuário e acessórios — `/pages/vesturio-e-acessrios`
- Pedir orçamento — `/pages/pedir-orcamento`
- Contactos — `/pages/contact`

Metadados estruturados: `.shopify/qa-redesign-20261008/public-routes.json`. Os números são `products_count` da resposta pública; não representam estoque disponível ou quantidades vendáveis.
