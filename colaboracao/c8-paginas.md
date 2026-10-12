# C8 — Páginas de apoio · V2/V3/V9/V11

09/10/2026 · Executor: sub-agent Codex /root/review_coordination. Sem commit, push, deploy nem mutação do Admin.

## Entrega e integração

Ficheiros exclusivos: sections/main-404.liquid, sections/main-page.liquid, sections/contact-form.liquid e assets/m3d-content.css. A secção real do contacto chama-se contact-form; não existe main-contact.

A raiz deve ligar assets/m3d-content.css globalmente depois de index.css e m3d-system.css, por exemplo com asset_url | stylesheet_tag. A ligação global é necessária para as políticas, cuja marcação é produzida pela Shopify. Nenhum layout nem locale foi alterado pelo executor.

- V2: 404 com pesquisa GET nativa, campo pílula, botão Pesquisar e saída secundária para routes.all_products_collection_url. PT-PT depende da integração das chaves abaixo.
- V3: conteúdo real de page.content continua prioritário e intacto. Para os 11 handles reais das páginas de categoria da navegação, se o conteúdo estiver vazio, mostra introdução neutra, orçamento e Explorar produtos. O CTA de orçamento só aparece se a página real pedir-orcamento existir; usa ?view=m3d-quote.
- Coleções: aceita a coleção escolhida no editor ou uma coleção com handle exatamente igual ao da página. Não adivinha relações entre categorias e os handles ingleses do catálogo. A grelha de até oito cards reais só aparece quando o objeto de coleção é válido e collection.products.size > 0 no contexto da loja. Coleções sem produtos acessíveis não geram grelha nem placeholders comerciais. Produtos indisponíveis continuam produtos reais e usam os estados existentes do card/price.
- O seletor de coleção pertence ao template, não a cada página. Para atribuir coleções diferentes no editor é necessário um template dedicado por associação. Não foi alterado template_suffix de página no Admin e nenhum template adicional foi criado neste escopo.
- V9: largura de leitura 68ch, H2 24px/31,2px (~32px), espaçamento de parágrafos 16px, listas, links e títulos com tokens nas páginas e nas políticas. Não traduz nem altera o texto legal do Admin.
- V11: H1 das três páginas em peso700, labels do contacto14px, inputs16px com alvo48px/borda de controlo e textarea com resize vertical. Mantém form contact nativo e sucesso apenas sob form.posted_successfully?. Valores reexibidos e mensagens de erro escapados; e-mail inválido ligado ao seu erro, links de resumo apenas para campos reais.

## Manifesto de traduções para a raiz

Valores PT-PT propostos (fundir nas locales publicadas e no fallback en.default, traduzindo o fallback conforme política do projeto):

| Chave | PT-PT |
| --- | --- |
| general.404.title | Página não encontrada |
| general.404.subtext | Não encontrámos esta página. Pesquise um produto ou explore o catálogo. |
| m3d_content.search_label | Pesquisar produtos |
| m3d_content.search_placeholder | Pesquisar produtos… |
| m3d_content.search_submit | Pesquisar |
| m3d_content.explore_products | Explorar produtos |
| m3d_content.empty_intro | Explore o catálogo ou conte-nos o que procura para pedir um orçamento. |
| m3d_content.quote_action | Pedir orçamento |
| m3d_content.view_collection | Ver coleção |

Schema (locales *.schema.json):

| Chave | PT-PT |
| --- | --- |
| sections.main_page.settings.collection.label | Coleção associada |
| sections.main_page.settings.collection.info | Mostrada apenas em páginas sem conteúdo. Esta associação é partilhada pelas páginas que usam este template. |

As chaves templates.contact.form.* existentes são mantidas. A raiz deve confirmar a cobertura PT-PT atual; não se adicionaram novas mensagens fictícias de sucesso/erro.

## Título Contact — origem e limite

A revisão do Claude classificou o título como dado do Admin. Na árvore local, templates/page.contact.json também contém settings.heading = Contact, e o default do schema é Contact. Este executor preservou ambos os valores existentes (não tem ownership do template). A substituição por Contactos no template local e/ou no editor é decisão da raiz; não houve escrita remota.

## Verificação e limites

Schemas JSON das três secções analisados sem erros; todas as custom properties m3d usadas existem no ficheiro de tokens de Claude. Estilos retirados das três secções e colocados no asset dedicado; nenhum assign executável foi inserido em comentários Liquid. Revisão pelas guidelines locais verificou labels, foco herdado, semântica GET/contact, hierarquia H1/H2/H3 na grelha, estados vazios, alvo de toque e contenção de texto longo.

A raiz/C3 ainda deve executar Theme Check e QA em prévia após ligar CSS e traduções: 404, as 11 páginas, contacto e política em desktop/mobile; GET da pesquisa; teclado; ausência de overflow; conteúdo real preservado; coleção escolhida/sem produtos. Nenhum formulário foi submetido nesta revisão e não se confirmou receção de e-mail. Não foi criado carrinho, checkout nem alteração comercial para testar estas páginas.
