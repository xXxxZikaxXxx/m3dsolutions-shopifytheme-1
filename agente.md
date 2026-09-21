# M3D Solutions — contexto do projeto

Atualizado em 21/09/2026.

Estado atual em 16/09/2026: PDP alinhada ao Figma; produtos sem preço apresentam CTA ativo “Preço sob consulta” com estilo primário e encaminhamento para orçamento, mantendo a compra a zero bloqueada. A Login Page foi implementada localmente como gateway visual M3D para NEW_CUSTOMER_ACCOUNTS e encaminha o e-mail ao fluxo hospedado de código de verificação da Shopify. O carrinho mantém o modal M3D. Nenhum envio GitHub ou publicação nesta etapa.


## Pedido e sequência

Melhorar a index do e-commerce Shopify, usando os prints fornecidos como direção visual. Primeiro criar o design no Figma; depois trazer para o tema Liquid.

## Identidade confirmada pelo usuário

- Marca: M3D Solutions.
- Preto: #000000.
- Branco: #FFFFFF.
- Rosa: #E31C79.
- Roxo: #4436BC.
- Azul: #00B3E7.
- O verde dos prints foi substituído pela identidade acima.
- Logotipo oficial recebido em `m3dsolutionslogo.png` e adicionado aos assets do tema e ao Figma.

## Base encontrada

Tema Shopify Online Store 2.0 em Liquid, CSS e JavaScript nativo. A home atual contém `image-banner` e `featured-collection`. Configuração ainda genérica. Sem alterações preexistentes no Git em 08/09/2026.

## Figma

- Arquivo: M3D Solutions — E-commerce · Homepage.
- URL: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr
- File key: eCQl1vEjI0wVswV7j2QpUr.
- Escopo: home desktop, home mobile e navegação por categorias.
- Linguagem da proposta: português de Portugal, seguindo o contexto dos prints.

## Direção visual

Layout editorial de catálogo B2B: cabeçalho com pesquisa e conta, menu de coleções, banner principal, duas campanhas, novidades, faixa de personalização, banner de seleção especial, categorias e rodapé. Fundo branco, imagens de produtos em destaque, tipografia sem serifa, margens amplas. CTAs rosa, painéis roxos, detalhes azuis.

## Estado

Design V1 da homepage concluído e revisado no Figma. Em 08/09/2026, a homepage recebeu cinco assets de teste e o logotipo oficial enviados pelo usuário. A primeira implementação local em Liquid foi concluída; nenhuma publicação Shopify foi realizada.

Telas finais:

- `3:2` — Home desktop 1440 px.
- `3:3` — Home mobile 390 px.
- `3:4` — Mega menu desktop aberto.
- `44:180` — Menu mobile rolável.
- `48:186` — Capa e guia visual.

Interações do protótipo:

- Coleções desktop abre o mega menu e o botão Fechar retorna à home.
- Botão de menu mobile abre o menu rolável e o botão Fechar retorna à home mobile.

Revisões concluídas:

- Overflow da quinta categoria desktop corrigido.
- Menu mobile ganhou scroll vertical, links principais, categorias separadas e links de apoio com áreas clicáveis.
- Carrosséis mobile ganharam controlos anterior/seguinte de 44 px.
- Texto branco em botões rosa foi trocado por preto para contraste de 4,71:1.
- Eyebrows funcionais e textos pequenos foram ampliados quando necessário.
- Dados de catálogo copiados dos prints foram substituídos por conteúdo ilustrativo neutro.
- Alegação de sustentabilidade e imagem com símbolos de desconto foram removidas.
- Pesquisa, menu e carrinho receberam nomes descritivos no documento.
- Auditoria final não encontrou SKUs de referência, percentuais, nomes de clientes, emails, faturação ou dívida nas telas.
- O banner principal passou a usar `bannerprincipal.png` em toda a área fotográfica, com painel preto translúcido para manter a leitura.
- As campanhas de vestuário e brindes passaram a usar `vestuario.png` e `pequenosgestos.png` como banners de fundo com legendas adaptadas.
- Os cards “Negócios e escritório” e “Copos e garrafas” passaram a usar `negocioseescritorio.png` e `garrafasecopos.png`.
- O destaque do mega menu foi alinhado à campanha de vestuário.
- Textos definidos nesta revisão: “A sua marca. Em todos os momentos.”, “A sua marca. Veste o verão.” e “Pequenos gestos. Grande impacto.”
- A faixa de personalização foi uniformizada para português de Portugal: “Imagine. Nós produzimos.”. Produtos e MyShop permanecem como itens distintos da navegação.
- O banner mobile “Pequenos gestos” foi ampliado para 260 px de altura para eliminar o corte do CTA.
- O logotipo oficial substituiu a assinatura genérica nos cabeçalhos desktop, mobile, mega menu e menu mobile.
- MyShop deve permanecer como navegação independente. É o espaço futuro em que clientes poderão criar mini-lojas, selecionar produtos e guardar coleções para recompra. Essa funcionalidade ainda não foi implementada.

Validação estrutural final:

- Desktop: 1440 × 3369 px.
- Mobile: 390 × 3965 px.
- Overflow de categorias desktop: 0 px.
- Fonte das telas: Inter.
- Textos abaixo de 10 px: nenhum.
- Menu mobile: 640 px de viewport com overflow vertical.

O Figma não permitiu criar uma versão nomeada pela API disponível; o canvas permaneceu íntegro e todas as alterações já estão salvas no arquivo.

## Implementação Liquid

Primeira versão implementada em `sections/m3d-home.liquid`, com hero, campanhas, vitrine, faixa de personalização, destaque editorial, categorias e contacto. `sections/nav.liquid` contém o cabeçalho responsivo, mega menu, pesquisa, conta, carrinho e MyShop independente. `templates/index.json` já usa a nova homepage; tokens M3D foram aplicados em `config/settings_data.json` e `snippets/css-variables.liquid`.

Validação: Shopify Liquid validator aprovado e Shopify Theme Check concluído com 55 arquivos inspecionados e nenhuma ocorrência. A incompatibilidade de upload em `snippets/localization-form.liquid` foi corrigida compondo os IDs dos formulários de país e idioma em variáveis antes da tag `form`; o arquivo passou novamente no validador Liquid e no Theme Check.

Repositório confirmado: `xXxxZikaxXxx/m3dsolutions-shopifytheme-1`, branch `master`, remoto `origin` no GitHub. Loja confirmada: `uhqyjs-w5.myshopify.com`. A autenticação da conta Shopify foi concluída. Em 08/09/2026, o servidor `shopify theme dev` iniciou corretamente e sincronizou o tema de desenvolvimento `152535597126`. Prévia local: `http://127.0.0.1:9292`; prévia remota do tema: `https://uhqyjs-w5.myshopify.com/?preview_theme_id=152535597126`. A senha da vitrine não foi registrada nos arquivos. Nenhuma alteração foi enviada ao GitHub ou publicada como tema ativo na Shopify.

QA da prévia local: desktop a 1440 px e mobile a 390 px renderizados sem overflow horizontal; logotipo oficial, hero, campanhas, categorias e MyShop conferidos; imagens carregadas e console do navegador sem erros. O menu mobile abre corretamente e mantém Produtos, Vestuário, MyShop, Inspiração e Sobre a M3D como itens distintos.

Em 08/09/2026, a navegação desktop recebeu o efeito SlideTabs adaptado para Liquid, CSS e JavaScript nativo. Os sete itens existentes e a ordem foram preservados: Coleções, Produtos, Vestuário, MyShop, Inspiração, Sobre a M3D e Pedir orçamento. A pílula preta move-se somente quando um item é clicado; hover e foco de teclado não alteram a sua posição. A física de mola inicial foi substituída por interpolação monotónica com desaceleração `ease-out`, duração adaptada à distância entre 300 e 440 ms e limites exatos entre a origem e o destino. O movimento não usa escala elástica, não balança e não ultrapassa o item clicado. Links normais aguardam 520 ms antes da navegação para tornar o deslocamento visível, e o índice clicado fica guardado na sessão para restaurar a seleção após a mudança de página. Coleções mantém o chevron `>` com rotação de 90 graus, abertura e fechamento progressivos do mega menu e fundo escurecido com desfoque de 7 px. O mega menu continua em largura total e o menu mobile não foi alterado. Não foram adicionados React, Tailwind, TypeScript, Framer Motion ou novas dependências. O validador oficial Shopify aprovou `sections/nav.liquid` como artefacto `m3d-nav-monotonic-20260908`, revisão 1, usando o modo sem telemetria; o Shopify Theme Check aprovou 55 arquivos sem ocorrências. O percurso completo Coleções → Pedir orçamento e o caminho inverso foram medidos quadro a quadro na prévia local e permaneceram monotónicos, sem ultrapassagem. Nenhuma alteração foi enviada ao GitHub nem publicada na Shopify.

Em 10/09/2026, a navegação “POR CATEGORIA” passou a usar as 11 páginas publicadas criadas para categorias: Campanhas sazonais, Casa e bem-estar, Copos e garrafas, Escritório e escrita, Eventos e feiras, Ideias para o dia a dia, Kits de boas-vindas, Malas e viagens, Presentes para equipas, Tecnologia e Vestuário e acessórios. Início, Contato e Catálogo não aparecem nessa lista. Os mesmos atalhos alimentam o painel aberto pela pesquisa, sem inventar páginas ou promoções.

A pesquisa desktop ficou compacta, com 260 px e intervalo medido de aproximadamente 17 px antes de “A minha conta”. Ao clicar, cresce horizontalmente durante 420 ms, revela “Cancelar”, abre o painel de categorias e escurece/desfoca o conteúdo abaixo. O campo perdeu o contorno colorido: o foco usa apenas uma linha preta interna. Escape, clique em Cancelar e clique fora fecham a pesquisa; abrir Coleções fecha a pesquisa e vice-versa. O botão Cancelar fica fora da navegação por teclado quando o painel está fechado. A busca mobile permaneceu inalterada. A imagem de referência foi preservada em `referencias/imagens/busca-expandida-midocean.png` e catalogada em `referencia.md`.

Validação de 10/09/2026: `sections/nav.liquid` aprovado no validador oficial Shopify como artefacto `m3d-header-search-pages-20260910`, revisão 2. Na prévia local foram conferidos os 11 links, as três exclusões, abertura/fechamento, foco sem contorno rosa, expansão monotónica, alinhamento com a conta e ausência de erros JavaScript. O Shopify CLI `theme check` não iniciou nesta rodada porque o processo encontrou `uv_os_get_passwd returned ENOMEM`; o validador oficial e a execução no navegador local permaneceram aprovados.

Ainda em 10/09/2026, os atalhos de páginas no mega menu Coleções receberam hover com texto roxo e um único indicador vertical `|` em `#4436BC`. O indicador é reposicionado por `requestAnimationFrame`, cancela o movimento anterior quando o cursor muda rapidamente de item e desaparece ao sair da área; por existir uma única instância, não há acumulação de traços. O mesmo comportamento é oferecido por foco de teclado, sem interferir na pílula principal da navbar.

O painel expandido da pesquisa deixou de exibir “POR CATEGORIA”. A coluna esquerda agora apresenta “SAIBA MAIS SOBRE” e os atalhos Prazos de entrega, Personalizações & impressão, Catálogos e MyShop, todos com seta diagonal `↗`. Foram adicionados campos de URL no schema para os três primeiros; enquanto não forem configurados, Prazos e Personalizações usam a homepage, Catálogos usa a coleção geral e MyShop mantém a rota já existente.

À direita, a pesquisa reserva três banners temporários lado a lado, cada um com área visual medida de 241 × 300 px, mini CTA fictício e “Ir para produto” abaixo. Os placeholders usam somente a paleta M3D e apontam provisoriamente para a coleção geral até o recebimento das imagens e URLs oficiais. O painel mantém 32 px de respiro superior, 36 px inferior e espaçamento responsivo sem overflow horizontal. O mobile permanece inalterado.

Validação desta revisão: `sections/nav.liquid` aprovado pelo validador oficial Shopify como artefacto `m3d-search-banners-mega-hover-20260910`, revisão 1; `git diff --check` sem erros; prévia local HTTP 200; três áreas confirmadas em 241 × 300 px; indicador de Coleções confirmado como instância única, cor `rgb(68, 54, 188)`, entrada e saída progressivas; console sem erros JavaScript. A segunda tentativa do Shopify CLI `theme check` voltou a falhar antes da análise com `uv_os_get_passwd returned ENOMEM`, problema do processo da CLI já registrado. Nenhuma alteração foi enviada ao GitHub ou publicada na Shopify.

Os três placeholders da navbar da pesquisa foram substituídos pelos banners fornecidos pelo usuário, respeitando a ordem dos nomes originais: `1 (1).png` → mochila M03214, `2 (1).png` → camisola SG1036 e `3.png` → casaco SO4447. No tema, os arquivos receberam os nomes `navbar-search-banner-1-m03214.png`, `navbar-search-banner-2-sg1036.png` e `navbar-search-banner-3-so4447.png`; cópias também foram preservadas em `referencias/imagens/`. As imagens originais têm 753 × 938 px e são exibidas dentro das áreas de 241 × 300 px, mantendo os mini CTAs e “Ir para produto”. A busca local pelos três códigos ainda não encontrou produtos publicados, portanto os banners continuam apontando provisoriamente para a coleção geral até existirem URLs de produto confirmadas.

Validação dos banners: `sections/nav.liquid` aprovado pelo validador oficial Shopify como artefacto `m3d-search-banner-assets-20260910`, revisão 1; `git diff --check` sem erros; prévia local HTTP 200; os três arquivos carregaram completamente em ordem, com dimensões naturais de 753 × 938 px e áreas CSS de 241 × 300 px; console sem erros. Nenhum envio ou publicação foi realizado.

Em 10/09/2026, os três banners da pesquisa foram novamente substituídos pelas versões revisadas e mais centralizadas enviadas pelo usuário. A ordem e os nomes internos permaneceram iguais: mochila M03214 em `navbar-search-banner-1-m03214.png`, camisola SG1036 em `navbar-search-banner-2-sg1036.png` e casaco SO4447 em `navbar-search-banner-3-so4447.png`. As cópias em `referencias/imagens/` também foram atualizadas. Os hashes SHA-256 dos assets finais coincidem com os respectivos arquivos de origem; nenhum Liquid, CSS, CTA, link ou posicionamento foi alterado. A prévia local respondeu HTTP 200, mostrou as três imagens completas em 753 × 938 px dentro das áreas de 241 × 300 px e não registrou erros no console. Nenhum envio ao GitHub ou publicação na Shopify foi realizado.

Preparação de publicação em 10/09/2026: a revisão pública exclui todos os screenshots de referência e os mantém somente nesta cópia local. `.gitignore` protege `referencias/imagens/Screenshot*.png` e `referencias/imagens/WhatsApp Image*.jpeg`, e `referencia.md` deixou de catalogar esses arquivos. O commit seguro contém o tema Liquid, a homepage, navegação, assets M3D e documentação sem dados administrativos ou de clientes.

Publicação confirmada em 10/09/2026: o commit seguro `c8604eb` foi enviado para `master` em `xXxxZikaxXxx/m3dsolutions-shopifytheme-1`. A vitrine `https://uhqyjs-w5.myshopify.com/` recebeu a revisão pela integração GitHub e foi conferida após o acesso protegido: homepage, logo M3D, navegação e hero estão ativos. A Shopify CLI local continua indisponível por `uv_os_get_passwd returned ENOMEM`; nenhuma via alternativa de escrita direta na loja foi usada.

Planeamento de 11/09/2026, pendente de aprovação: o pedido de breadcrumb, filtros à esquerda e cards descreve uma página de listagem de produtos/coleção (PLP), que deve preceder a página individual do produto (PDP). Proposta: container alinhado à home, grelha desktop de 12 colunas com filtros em cerca de 280 px, divisor vertical discreto e três cards por linha; filtros em gaveta no mobile, sem divisor. Fundos brancos e cinzas claros, texto preto e cores M3D apenas para estados e CTAs. Os filtros devem usar storefront filtering da Shopify, sustentado por Cor como opção de variante e Material/Técnicas como metafields de produto padronizados, configurados no Search & Discovery. Não houve alteração de Liquid, CSS, JavaScript, catálogo ou Shopify nesta etapa.

Definição aprovada em 11/09/2026 para a página geral de produtos: todas as páginas de coleção utilizarão o mesmo padrão visual e técnico; somente os produtos e o último nível do breadcrumb variam. O painel de filtros desktop terá grupos expansíveis, cada qual com seta para baixo: Ordenar por (Preço ascendente e Preço descendente), Material, Técnica de impressão, Cor, Stock e Etiquetagem. As técnicas autorizadas para filtragem são Transfer serigráfico, Transfer refletivo, Transfer digital, Serigrafia, Bordado, Baixo-relevo e Transfer por sublimação. Esses dados ficam registrados para a futura configuração da Shopify e implementação em Liquid; nenhum filtro, produto, metafield ou asset foi criado nesta etapa.

Instruções registadas em 11/09/2026 para o futuro card de produto da listagem: o texto React anexado é referência visual e de interação, não código a introduzir. A implementação deve permanecer em Shopify Liquid, CSS e JavaScript nativo, sem React, Tailwind, shadcn ou dependências npm. Na imagem do card, desktop terá zoom suave no hover; o grupo de ações fica no canto superior esquerdo, com botão circular `+` acima do coração de guardar, e a etiqueta/badge no canto superior direito. O botão `+` abre primeiro um menu curto com `♡ Save` e `＋ MyShop`; ao selecionar `＋ MyShop`, abre modal pequeno “Add to a Shop”, com escolhas de lojas e `+ Create New Shop`. Conteúdo ilustrativo inicialmente autorizado: Google Summer Event, Employee Welcome Kit e Client Gifts 2027. A integração real de criar/guardar no MyShop só deve ser construída depois de a estrutura MyShop ser definida; até então, reproduzir apenas a interface e estados acessíveis, sem inventar persistência.

Implementação local concluída em 11/09/2026 para a página geral de produtos/coleções. `sections/collection-banner.liquid` agora apresenta o breadcrumb `Início / Produtos / [coleção]`, título alinhado à esquerda e espaçamento neutro. `sections/main-collection.liquid` usa painel lateral de 280 px, divisor vertical de 1 px e grade de três colunas no desktop; no mobile, a grade passa a duas colunas e os filtros abrem numa gaveta com movimento fluido e fundo desfocado. Os grupos permanecem na ordem aprovada e usam `collection.filters`; a ordenação expõe apenas preço ascendente e descendente. `snippets/collection-filter-group.liquid` mapeia Material, Técnica de impressão, Cor, Stock e Etiquetagem aos filtros configurados na Shopify e limita técnicas aos sete valores aprovados. Quando uma definição ainda não existe no Search & Discovery, o grupo permanece visível com mensagem de configuração pendente.

O card de coleção foi implementado como variante isolada em `snippets/card-product.liquid`, preservando a renderização anterior usada pela homepage. A nova variante inclui zoom suave da imagem no hover, botão circular `+` acima do coração à esquerda, badge à direita, menu rápido `Guardar / MyShop` e modal visual “Adicionar a uma loja” com as três opções ilustrativas e “Criar nova loja”. Esses controles mantêm somente estado visual nesta fase; não gravam favoritos, lojas ou dados de cliente.

Validação da página de coleção: artefacto `m3d-collection-listing-20260911`, revisão 4, aprovado pelo validador oficial Shopify nos cinco arquivos alterados. `git diff --check` e o JSON de tradução passaram. A prévia local `http://127.0.0.1:9292/collections/bags` respondeu HTTP 200, apresentou painel de 280 px, divisor de 1 px, gaveta mobile funcional em 390 px, nenhum overflow horizontal e nenhum erro no console. O Shopify CLI `theme check` continuou sem iniciar por `uv_os_get_passwd returned ENOMEM`. As coleções devolvem zero produtos no canal de prévia atual; por isso o card foi validado em Liquid e estrutura, mas a revisão visual com dados reais permanece pendente até haver produtos disponíveis no storefront. Nenhum commit, envio ao GitHub ou publicação Shopify foi realizado nesta etapa.

Publicação de `Wrist Watches` concluída em 11/09/2026 após autorização explícita do usuário. Os 17 produtos da coleção manual `gid://shopify/Collection/314017153094` foram alterados de `DRAFT` para `ACTIVE` e publicados exclusivamente no canal `Loja virtual`, publicação `gid://shopify/Publication/190831984710`; nenhuma alteração foi feita em preço, estoque, imagens, SKUs ou associação da coleção. A prévia local `http://127.0.0.1:9292/collections/wrist-watches` passou a apresentar 17 produtos, com 16 cards na primeira página e 1 na segunda. O card foi validado com dados reais: imagens e SKUs renderizam, o botão `+` abre `Guardar / MyShop`, o modal “Adicionar a uma loja” abre e fecha corretamente e o coração alterna o estado visual. Os produtos permanecem com preço `€0,00` e estoque zero porque esses são os dados atuais do catálogo; não foram inventados valores comerciais. Nenhum commit, envio ao GitHub ou publicação do código do tema foi realizado nesta etapa.

Em 14/09/2026, a PLP recebeu a revisão visual solicitada. O botão `+` do card passou a abrir diretamente o modal MyShop, sem apresentar a opção “Guardar”. O modal usa `dialog` nativo, fica centralizado, desfoca o fundo e apresenta entrada suave, opções ilustrativas de loja e botão arredondado para criar uma nova loja. O coração passou a usar o desenho enviado pelo usuário, com zoom no hover, estado pressionado rosa `#E31C79` e animação curta. Essas ações continuam apenas visuais e não gravam dados.

A regra visual para botões foi registrada no tema com raio padrão de 10 px em `config/settings_schema.json` e `config/settings_data.json`. Os controles específicos da PLP respeitam esse token; a paginação usa formato de pílula, hover com inversão para preto, escala suave, estado ativo e foco roxo.

`sections/main-search.liquid` agora exibe somente produtos e reutiliza a arquitetura da PLP: breadcrumb, filtros laterais, divisor, três cards por linha, gaveta mobile e a mesma paginação. Os formulários de pesquisa desktop e mobile enviam `type=product` e `options[prefix]=last`. Pesquisas amplas permanecem nessa listagem; correspondência completa, sem diferença entre maiúsculas e minúsculas, com o título do produto ou SKU de uma variante redireciona ao PDP correspondente. Não há redirecionamento por correspondência parcial.

Validação de 14/09/2026: o validador oficial Shopify aprovou os oito arquivos da revisão como artefacto `m3d-plp-search-20260914`, revisão 2; `git diff --check` e os três arquivos JSON passaram. Após autorização adicional do usuário, a homepage recebeu uma diretiva específica para o limite intencional de settings e o gerador QR do gift card foi movido para `assets/gift-card.js`; o comportamento foi preservado e o `shopify theme check` final aprovou 56 arquivos sem ocorrências.

A prévia `http://127.0.0.1:9292` foi reiniciada no tema de desenvolvimento `152535597126`. QA automatizado no Edge/Playwright: `/collections/wrist-watches` apresentou 16 cards e 16 diálogos na primeira página, sem menu rápido antigo; o `+` abriu diretamente “Adicionar a uma loja” e o modal terminou a animação exatamente no centro da viewport; o coração alternou `aria-pressed` e terminou preenchido em `rgb(227, 28, 121)`. A busca ampla `3S` permaneceu na PLP com 16 cards, filtros laterais e três colunas. A busca exata `3S-0161` redirecionou ao PDP `/products/3s-161-carlsberg`. A paginação atingiu escala `1.06` no hover; a gaveta mobile abriu com backdrop, sem overflow horizontal em 390 px e sem erros JavaScript. Nenhuma alteração foi enviada ao GitHub ou publicada como tema ativo.

Antes de publicar, validar ou substituir os cinco assets atuais, marcados como testes pelo usuário. Conectar textos, URLs, coleções e dados reais da Shopify.

## Cuidados para continuidade

## PDP — design Figma em 15/09/2026

Criada a página `02 · PDP M3D` no arquivo existente, preservando a homepage. Desktop 1440 × 2160: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=144-187 . Mobile 390 × 2112: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=144-188 . Página: `144:186`; galeria/configuração: `145:189`; informações complementares: `147:195`; modal quantidade/stock: `147:236`; modal Bordado: `148:198`; regras: `153:213`; fonte visual de referência: `144:189`, hash `070c733165340681caf82bbf9298652915228fa7`.

Design neutro com destaques roxos, logo oficial, navegação existente na mesma ordem, MyShop independente, pesquisa compacta junto da conta e pílula preta em Produtos. Percurso: cor → quantidade/tamanhos → personalização → ação. Galeria usa recortes de frente/lateral/costas da referência visual; não representa catálogo real. Preço sob consulta e stock a consultar; não foram copiados valores comerciais. Técnicas Bordado/Serigrafia, posições Peito/Manga e variantes são exemplos, não declarações de compatibilidade real.

Regras futuras: cores/tamanhos e stock por variante Shopify; técnicas aceites, posições e limites por produto através de definições e valores de metafields. Com uma imagem ocultar miniaturas/contador/setas; com várias permitir navegação. Modais do protótipo ligados a Quantidades e Bordado; Confirmar/Cancelar apenas fecham, sem gravar dados. Galeria, seleção de cor e restante configuração são representações visuais nesta etapa.

QA: screenshots de desktop, mobile, cabeçalho, galeria/configuração e ambos os modais; fontes Inter consistentes com o Figma existente, mobile sem overflow horizontal. Cabeçalho refinado para o layout atual e botões arredondados. Nenhum arquivo do tema foi implementado/alterado nesta etapa; nenhum envio ao GitHub, alteração de catálogo ou publicação Shopify. Pendência: revisão do usuário e definição dos dados/regras comerciais antes de implementar a PDP em Liquid. Carrossel de homepage/inverno e Login Page aguardam conteúdos e orientação específicos.

Não transformar informações da midocean ou dados do Vendus em promessas da M3D. Fotografias dos prints são material de referência para esta proposta. Dados reais de catálogo, preços, descontos, estoque e prazos devem vir da loja quando integrarmos o Liquid. Não divulgar dados de clientes e faturação dos prints administrativos na vitrine ou no Figma.

## Login Page e modal no carrinho — design Figma em 15/09/2026

Etapa de design concluída na página `03 · Login e acesso no carrinho`, ID `157:186`, no arquivo existente. Login desktop 1440 × 1216: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=157-187 . Login mobile 390 × 1428: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=157-188 . Modal em contexto desktop: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=164-338 . Modal em contexto mobile: https://www.figma.com/design/eCQl1vEjI0wVswV7j2QpUr?node-id=164-339 .

O usuário escolheu explicitamente e-mail e palavra-passe, conforme a referência `Screenshot 2026-09-08 111652.png`. Layout preserva cabeçalho, logotipo oficial, navegação e rodapé existentes. Desktop tem formulário à esquerda, divisor vertical discreto e área de primeiro contacto à direita; mobile usa uma coluna. Identidade neutra com destaques roxos e botões arredondados. Não foram copiados dados de acesso ou benefícios comerciais da midocean. O subagent `login_flow_review` realizou somente revisão de arquitetura e fluxo, sem editar arquivos ou Figma.

Modal: largura de 480 px no desktop e 350 px no mobile, centralizado sobre carrinho ilustrativo desfocado. Campos essenciais, recuperação, botão Entrar e voltar ao carrinho, fechar e Voltar ao carrinho. A abertura depende de ação explícita; não foi definido login obrigatório para comprar. Fechar e autenticar com sucesso devem retornar ao carrinho, preservando itens, variantes, quantidades e personalizações; não finalizar checkout automaticamente.

Criados estados de recuperação/confirmacão em desktop e mobile, com percurso de retorno ao login. IDs: modais principais `157:191` e `157:192`; recuperação `164:340` e `164:341`; confirmação `164:342` e `164:343`; vistas de carrinho/recuperação `167:313`, `167:425`, `167:501` e `167:606`; quadro de erros/envio `168:389`; regras de implementação `174:361`. Quatro entradas de protótipo estão definidas. Os links de abrir, recuperar, enviar/confirmar e regressar estão ligados com dissolve de 200 ms. O botão Entrar no carrinho apenas simula o retorno visual; não autentica nem envia e-mail.

Componentes Button e Input Field reutilizados da biblioteca Simple Design System; Body Base reutilizado como estilo. Fonte Inter consistente com o Figma existente. Grelha desktop de 12 colunas, margens 96 px, gutter 24 px; mobile de 4 colunas, margens 20 px, gutter 16 px. Botões principais de 48 px, fechar e ações textuais de 44 px. Os inputs da biblioteca mantêm caixa visual de 40 px; na implementação, ampliar sua área de toque para pelo menos 44 px e associar labels ao foco. Prever foco contido no modal, Escape, devolução de foco e erros associados aos campos.

QA: screenshots do conteúdo desktop/mobile, modal em contexto, recuperação, confirmação e estados de erro; leitura de fonte, medidas e posições. Sem overflow horizontal no mobile, sem sobreposições entre frames no canvas, e todos os seis modais em contexto centrados com erro de posição zero. Botões principais medidos em 48 px. Ledger de continuidade com os 800 IDs e relatório compacto em `referencias/figma-login-state-20260915.json`.

Pendências: revisão do usuário; verificar a configuração de contas Shopify antes de implementar autenticação por palavra-passe. O tema usa `routes.account_url` e ainda não possui template próprio de login. Criar conta é somente ação secundária visual; página de registo não foi desenvolvida. Esta etapa alterou apenas o Figma e documentação de contexto; nenhuma alteração no código do tema, catálogo, GitHub ou publicação Shopify. Homepage e PDP anteriores preservadas. Carrossel da homepage/inverno continua a aguardar os conteúdos e orientação específicos.

## PDP, login e acesso no carrinho — inspeção de efeitos em 15/09/2026

Pedido atual autoriza apenas inspeção e recomendação. A implementação dos designs e efeitos em Liquid depende de nova autorização explícita do usuário. Não implementar nem alterar o protótipo para simular aprovação.

Inspecionados os controles, textos, dimensões e reações das páginas Figma PDP `144:186` e login/carrinho `157:186`, com screenshots da galeria/configuração `145:189`, conteúdo de login `161:192` e modais em contexto desktop/mobile `164:338`/`164:339`. Os modais já têm dissolve de 200 ms; alguns botões importados ainda usam mudança de variante no hover sem transição definida. Screenshots mostram o estado estático; esta revisão leu as reações, sem exportar ou testar animação em execução. O subagent `motion_review` fez revisão consultiva de fluxo, acessibilidade e desempenho, somente leitura.

Proposta de efeitos, ainda não aprovada:

| Controle ou área | Gatilho e comportamento | Duração |
| --- | --- | --- |
| Galeria PDP | Clique/teclado nas setas ou miniaturas: fade com deslocamento de até 16 px na direção escolhida; miniatura ativa com contorno roxo. Manter a caixa da imagem estável e usar somente mídias existentes. | Troca 220 ms; contorno 140 ms |
| Cor | Seleção imediata por clique/teclado; contorno roxo com transição. Se houver imagem associada à variante, crossfade dessa imagem. Contorno não altera medidas do controle. | Contorno 140 ms; imagem 180 ms |
| Técnicas e posições de personalização | Hover discreto de contorno/texto roxo; seleção confirmada por clique/teclado, com estado selecionado persistente. Não animar stock ou dimensões como contadores. | 160 ms |
| Modais de quantidade, personalização e login no carrinho | Entrada com opacidade e deslocamento vertical de 8 para 0 px; saída inversa. Posição final centralizada, sem mola, escala de entrada ou ultrapassagem. | Abrir 240 ms; fechar 160 ms |
| Fundo dos modais | Escurecimento gradual até preto com opacidade de 20%, conforme o design do login. Desfoque fixo de 5 px; animar somente a opacidade da camada. | 200 ms |
| Informações expansíveis da PDP | Clique/teclado gira seta 180 graus e expande/recolhe o conteúdo com altura controlada. Uma nova ação retoma a partir da posição atual. | 220 ms |
| Botões principais: Adicionar ao carrinho, Confirmar, Entrar e Finalizar compra | Hover preto para roxo M3D, mantendo texto branco; ao pressionar, escala até 0,98 e retorno até 1 sem balanço. Estado ocupado usa a mesma caixa e texto apropriado, sem pausa artificial. | Hover 180 ms; pressão/retorno 120 ms; troca de texto 120 ms |
| Botões secundários: MyShop, Criar conta, Carregar logótipo e Cancelar | Contorno e texto passam suavemente para roxo, preservando o fundo neutro e os ícones existentes; pressão discreta. | Cor 160 ms; pressão 120 ms |
| Campos e links do login | Foco visível com contorno roxo sem alterar tamanho; links de recuperação/retorno com sublinhado que aparece suavemente. Não animar labels nem encadear a entrada dos campos. | 140 ms |
| Login, recuperação e confirmação no modal | Crossfade entre conteúdos no mesmo modal, mantendo fundo, largura e alinhamento; altura adapta-se ao conteúdo/teclado sem reabrir o overlay. | 200 ms |
| Erros e confirmação de ações | Mensagens com fade curto, junto do controle ou dentro do botão existente. Sem tremor, apagar valores ou deslocar a página inesperadamente. Sucesso somente após resposta real. | 120 ms |

Regras futuras: CSS e JavaScript nativo; curva monotónica `cubic-bezier(.22,.61,.36,1)`, sem springs, bounce ou overshoot. Priorizar transform/opacity; não usar animação contínua, partículas, parallax ou cascatas que atrasem leitura. Interações rápidas substituem a transição vigente e não criam filas/modais sobrepostos. Hover somente em dispositivos que o suportem; clique e teclado determinam seleção. A pílula da navegação mantém rigorosamente o comportamento aprovado e não faz parte desta revisão.

Preservar respiros, dimensões reservadas das imagens, botões principais de 48 px e raio de 10 px; áreas de toque com pelo menos 44 px. Em `prefers-reduced-motion`, remover deslocamentos e escala, mantendo os estados de forma imediata. Modal contém foco, aceita Escape, impede interação com o fundo, permite rolagem interna em telas baixas/teclado aberto e devolve foco ao controle de origem. Fechar deve preservar configuração do produto e carrinho; autenticar retorna ao carrinho sem iniciar checkout automaticamente.

Limites técnicos confirmados: a PDP atual usa formulário nativo e mídias empilhadas; a galeria proposta acompanha a implementação do design já solicitado. O carrinho atual recarrega depois de alterar quantidades; esta proposta não autoriza reestruturar esse fluxo para atualização AJAX. Verificar modo de contas Shopify antes da autenticação por palavra-passe. MyShop permanece interface visual até seu backend ser definido; não mostrar confirmação de gravação inexistente. Não criar recursos, CTAs, itens de navegação ou página de registo adicionais.

Nesta etapa foi atualizado somente este documento. Sem alteração de tema, catálogo, Figma, GitHub ou publicação Shopify. Pendência: apresentar especificação ao usuário e aguardar autorização; depois implementar e validar primeiro na prévia local, incluindo cliques rápidos, teclado, movimento reduzido, mobile e erros reais.

## Implementação PDP e acesso ao carrinho — 15/09/2026

O utilizador autorizou implementar o design e os efeitos especificados, verificar o modo de contas e tratar preços zero como preço sob consulta. Após a verificação confirmar NEW_CUSTOMER_ACCOUNTS / OPTIONAL / loginRequiredAtCheckout=false, escolheu finalmente manter código de verificação por e-mail. Não foi feita qualquer mudança de autenticação no Admin. Não reativar palavra-passe ou contas clássicas com base na autorização anterior.

PDP: `sections/main-product.liquid`, `assets/m3d-product.css` e `assets/m3d-product.js`. Container externo de 1288 px, conteúdo de 1248 px alinhado ao header em x96 no desktop de 1440 px; mobile com margem de 20 px. Breadcrumb conserva contexto de coleção quando presente. Esquema de blocos e `templates/product.json` preservados, incluindo apps, partilha e relacionados. Layout neutro, controlos arredondados, variantes reais, quantidade por variante, descrição e especificações expansíveis. Ações Adicionar ao carrinho e MyShop seguem o design; MyShop continua interface ilustrativa sem persistência.

Galeria: `snippets/m3d-product-gallery.liquid`, `assets/m3d-product-gallery.css` e `.js`. Imagens, vídeos e modelos existentes; nenhuma mídia inventada. Uma imagem esconde setas/contador/miniaturas. Caixa estável, primeira imagem prioritária e restantes lazy; troca por clique/teclado com fade e deslocamento limitado de 16 px, seleção de mídia associada à variante e cancelamento de cliques anteriores enquanto a imagem carrega.

Efeitos partilhados: `assets/m3d-motion.css` e `.js`, carregados em produto e carrinho através de `layout/theme.liquid`. Entrada do modal 240 ms / saída 160 ms, deslocamento de 8 px, fundo preto 20% e blur fixo 5 px. Foco contido, Escape, devolução de foco, scroll interno e movimento reduzido. Reaberturas interrompem animações; evento nativo de close antigo é ignorado se o dialog já reabriu. Accordions usam altura medida em 220 ms; botões principais 48 px, preto→roxo no hover e pressão até 0,98. Nenhuma mola, balanço ou mudança na pílula da navegação.

Compra: preço zero desativa a ação e checkout acelerado, incluindo mudança de variante e seletor sem JavaScript. Stock não controlado é “Stock a consultar”; stock zero não significa esgotado quando inventory_management é vazio. Quantidades respeitam mínimo/incremento/máximo e stock controlado. Uma adição usa FormData; várias variantes usam `items` JSON. Logótipo binário suportado numa opção por adição; múltiplas opções com ficheiro apresentam limite explícito. Em erro 422 ou resposta incerta, atualizar carrinho real sem repetição automática ou fallback de POST. Nenhum valor comercial do catálogo foi alterado.

Personalização depende de configuração REAL na Shopify. A consulta encontrou zero definições de metafields de produto, sem técnicas/posições configuradas. Não apresentar opções de referência como capacidades comerciais. Contrato futuro, ainda não criado: `custom.material`, `custom.printing_techniques` (lista de textos, sete técnicas aprovadas), `custom.personalization_config` (JSON com techniques/name/positions/name/max_width_mm/max_height_mm/image opcional) e `custom.product_document` (file_reference opcional). Técnicas selecionáveis exigem posições e `price_included: true` explícito; não atribuir um custo fictício ou cobrar personalização como gratuita por omissão. Preços adicionais exigem um modelo comercial separado aprovado pelo utilizador. As propriedades de linha conservam técnica, posição e dimensões; ficheiro confirmado mantém-se ao cancelar a edição.

Login final: `snippets/m3d-cart-login.liquid` e `assets/m3d-auth.css`, gatilho em `sections/main-cart.liquid`. Modal central de 480 px desktop / 350 px mobile, logótipo oficial, descrição e CTA “Entrar com e-mail”. Usa `routes.storefront_login_url` integral, que devolve à página de origem após autenticação; na prévia, URL gerada inclui return_to para /cart com parâmetros dev. A verificação de e-mail e código é feita pela Shopify. Sem formulário de palavra-passe, envio simulado, iframe ou armazenamento de credenciais. Header e comportamento nativo de checkout/atualização de quantidades preservados. O gatilho de login está junto do checkout quando o carrinho tem artigos.

Limite da Login Page: novas contas são hospedadas pela Shopify, fora dos templates Liquid. O layout Figma com palavra-passe permanece histórico; não foi imposto ao fluxo atual. Foram removidos apenas arquivos clássicos novos desta etapa (`sections/m3d-login.liquid`, `snippets/m3d-auth-form.liquid`, `templates/customers/login.json`, `assets/m3d-auth.js`), checkbox clássico e template temporário de QA. Nenhuma nova página intermediária de login ou item de navegação foi criado.

Delegação utilizada: auth_implementation (fluxo de login/cartmodal, teclado, layout e QA); pdp_gallery (galeria, concorrência e revisão real desktop/mobile); pdp_data_review (dados, compra, stock e revisão estática). Agentes concluíram seus escopos; não deixar tarefas sem limites ativos.

Validação final: validador oficial local sem telemetria aprovado nos 15 arquivos atuais, artefacto `m3d-pdp-auth-20260915`, revisão 3. O auto-review inicialmente bloqueou a execução por suspeita de exportação de código; a leitura integral confirmou themeCheckRun local e retorno antecipado de reportValidation quando OPT_OUT_INSTRUMENTATION=true, e a execução com essa variável definida e confirmada foi aprovada. Theme Check completo: zero erros, dois avisos OrphanedSnippet em `product-media-gallery.liquid` e `product-variant-selection.liquid`, preservados como arquivos anteriores. JSON, sintaxe JS e git diff --check aprovados.

QA real: produto Carlsberg nas rotas direta e contextual Wrist Watches, desktop1440/mobile390, uma imagem carregada, JSON válido, Default Title oculto, preço sob consulta, sem overflow ou erros JavaScript do tema. Há bloqueios CSP/403 de Shop.app e CORS de origin_trials na prévia, externos ao código novo. Modais testados para cliques rápidos, reabertura, teclado/foco, movimento reduzido e áreas de toque >=44 px. Compra testada em fixture isolada no navegador com cinco POSTs interceptados: mínimo5/incremento2, múltiplos itens, 422, falha de rede, dimensões e ficheiro real preservado após cancelamento. Nenhum POST de autenticação, recuperação, compra ou alteração de catálogo foi enviado à loja nos testes. Artefactos de QA ficam em TEMP e `.shopify/qa-auth-20260915/` (histórico clássico) / `.shopify/qa-auth-new-20260915/` (fluxo final por código), ignorados pelo Git. QA final NEW passou em /cart real com modal Liquid, URL nativa preservada, desktop480/mobile350, CTA48px, cliques rápidos, foco/Escape e movimento reduzido; validador complementar `m3d-auth-new-20260915`, revisão 1, aprovado. A navegação para autenticação foi interceptada antes de sair do navegador; zero e-mails ou POSTs reais.

Prévia local em execução: http://127.0.0.1:9292 ; PDP: http://127.0.0.1:9292/collections/wrist-watches/products/3s-161-carlsberg ; carrinho http://127.0.0.1:9292/cart . Tema de desenvolvimento 152535597126, reiniciado para resolver upload incompleto causado pela interrupção de limites. Sem commit, push, publicação de tema ativo ou mudança de modo de contas.

Pendências comerciais: cadastrar dados/posições/técnicas e definir preços reais para exercitar opções completas do catálogo. Autenticação end-to-end por código deve ser testada pelo próprio cliente; QA não enviou e-mails. Carrossel do banner principal e troca verão→inverno continuam aguardando conteúdo/orientação; não fazem parte desta implementação. Para retomar, ler este estado final antes dos planos históricos.

Documentação do fluxo final: https://shopify.dev/docs/storefronts/themes/sign-in — routes.storefront_login_url retorna à página de origem; não concatenar parâmetros fictícios à URL gerada.
## Revisão PDP e Login Page — 16/09/2026

Pedido concluído localmente: manter a PDP fiel aos nós Figma 145:198 e 144:187, tornar o share neutro, transformar “Preço sob consulta” em ação comercial e implementar a Login Page de 161:192 / mobile 157:188, adaptada ao login por código por e-mail.

PDP: sections/main-product.liquid, assets/m3d-product.js e assets/m3d-product.css foram ajustados. O botão de compra continua indisponível para variantes a preço zero, mas é substituído visual e funcionalmente por um link “Preço sob consulta” com o mesmo estilo primário preto, 48 px e hover roxo usado por “Adicionar ao carrinho”. A troca de variante e seleções em lote alternam os dois controlos sem permitir POST de preço zero. O share recebeu fundo neutro #F5F5F7, texto preto, borda cinza e raio de 10 px; o hover permanece neutro.

A Shopify Admin API confirmou que não existe página publicada com o título/handle “Pedir orçamento”. Para não criar conteúdo nem publicar sem autorização, o CTA usa primeiro pages['pedir-orcamento'] caso ela exista e, enquanto não existe, encaminha para a página Contacto publicada (/pages/contact), que respondeu HTTP 200 na prévia.

Login Page: novos arquivos sections/m3d-login.liquid, templates/page.m3d-login.json e assets/m3d-auth-page.js; assets/m3d-auth.css, sections/nav.liquid e locales/en.default.json foram ampliados somente para esse fluxo. Desktop mantém conteúdo de 1248 px dentro do container de 1288 px, grelha 560 / 1 / 559, intervalo de 64 px, formulário de 480 px, divisor de 390 px e painel #F7F7F8. Mobile usa 390/350 px, uma coluna, divisor horizontal e conteúdo “Primeira vez na M3D?”. Inputs e botões têm 48 px e raio 10 px.

A loja permanece em NEW_CUSTOMER_ACCOUNTS. O formulário solicita somente o e-mail e preserva integralmente routes.storefront_login_url; JavaScript acrescenta login_hint por URL.searchParams, mantendo return_to, locale, região e parâmetros de prévia. A verificação e o envio de código continuam hospedados pela Shopify. Não há palavra-passe, recuperação fictícia, armazenamento de credenciais nem pedido de autenticação efetuado pelos testes. O CTA secundário move o foco para o e-mail; movimento reduzido é respeitado. A navegação “A minha conta” passa a usar a página login apenas quando ela existir e o cliente não estiver autenticado; até lá mantém routes.account_url.

A Shopify Admin API listou 12 páginas publicadas e nenhuma página login. Assim, o template foi testado sem alteração de conteúdo da loja por /pages/contact?view=m3d-login. Para o percurso definitivo /pages/login, ainda é necessário criar a página Login e atribuir o template m3d-login, ação externa não realizada nesta etapa.

Efeitos confirmados: já estavam implementados antes desta revisão — botões com hover roxo e compressão a 0.98, modais com abertura 240 ms/fecho 160 ms, fundo desfocado, galeria com transição e accordions de 220 ms. Esta etapa reutilizou esses efeitos na PDP e no login, acrescentando foco progressivo no campo e scroll suave com fallback para prefers-reduced-motion.

Validação: git diff --check, JSON, node --check e Shopify Theme Check passaram. Theme Check inspecionou 61 arquivos com zero erros e apenas os dois avisos históricos de snippets órfãos (product-media-gallery.liquid e product-variant-selection.liquid). QA Playwright/Chrome em 1440 × 1000 e 390 × 844 confirmou: CTA de orçamento preto/branco com 48 px; share rgb(245,245,247), preto e raio 10 px; login desktop 560px 1px 559px; campo de 48 px; ausência de palavra-passe; foco secundário funcional; login_hint corretamente codificado; zero overflow horizontal. A navegação de autenticação foi interceptada antes da rede, sem envio de código ou e-mail. Os erros de consola observados são os mesmos bloqueios externos da prévia Shopify (Shop.app/CSP, origin_trials/CORS e 403), não originados pelo tema.

O validador remoto complementar da skill Shopify foi bloqueado pela revisão automática por possível envio de conteúdo do tema a serviço externo, apesar de OPT_OUT_INSTRUMENTATION=true. Nenhum contorno foi tentado; Theme Check local e QA no navegador foram usados como validação segura. A prévia local foi reiniciada e permanece em http://127.0.0.1:9292/. Nenhum commit, push ou publicação Shopify foi realizado.

## Ativação das páginas Login e Pedir orçamento — 16/09/2026

O utilizador autorizou criar as duas páginas na loja e ligar os endereços já preparados no tema. Antes da escrita, a Admin API confirmou que não existiam páginas com os handles `login` ou `pedir-orcamento`, evitando duplicação.

Foram criadas e publicadas as páginas Shopify `Login` (`gid://shopify/Page/130302312518`, handle `login`) e `Pedir orçamento` (`gid://shopify/Page/130302345286`, handle `pedir-orcamento`). A página Login recebeu o template suffix `m3d-login`; Pedir orçamento usa por enquanto o template padrão e conteúdo vazio, pois o seu design/conteúdo ainda não foi solicitado.

Integração validada na prévia local: `/pages/login` respondeu HTTP 200 e renderizou `m3d-login`; o link `A minha conta` passou a apontar para `/pages/login`; a PDP respondeu HTTP 200 e o CTA de preço zero passou a apontar para `/pages/pedir-orcamento`, deixando de usar o fallback `/pages/contact`.

As operações GraphQL de consulta e criação foram validadas antes da execução e concluídas sem `userErrors`. Nenhum ficheiro do tema foi publicado, enviado ao GitHub ou alterado nesta etapa além deste registo de contexto. A prévia local continua em http://127.0.0.1:9292/.

## Detalhes responsivos da Login Page — 16/09/2026

A pedido do utilizador, o frame Figma `161:192` foi relido e comparado com `/pages/login`. O desktop já correspondia ao desenho: grelha `560px / 1px / 559px`, divisor vertical `#E5E5E5` com 390 px e painel de primeira visita `#F7F7F8`, raio 16 px e padding 24/32/32 px.

Foi corrigida apenas a regra mobile em `assets/m3d-auth.css`: ao empilhar os percursos, o divisor continua horizontal com 1 px e o bloco “Primeira vez na M3D?” mantém agora o fundo `#F7F7F8`, raio 16 px e padding 24 px, em vez de perder o destaque sobre fundo branco. Fluxo, autenticação por código, textos, navegação e layout desktop permaneceram inalterados.

QA local em `/pages/login`: desktop 1440 × 1000 confirmou divisor 1 × 390 px e painel 559 px; mobile 390 × 844 confirmou divisor 350 × 1 px e painel 350 px. Ambos sem overflow horizontal e com `A minha conta` ligado a `/pages/login`. O validador oficial local Shopify aprovou `assets/m3d-auth.css`. Nenhum push ou publicação de tema foi realizado.

## Etapa — Carrinho, estado vazio e autenticação por código (17/09/2026)

- Confirmado em navegador real que o ícone do carrinho no header possui rota `/cart` e navega corretamente; a área interativa foi reforçada para 44 x 44 px e recebeu estado visual consistente.
- Aplicado aos botões `A minha conta` e carrinho o hover/foco padrão do projeto: fundo lilás neutro, contorno/texto roxo `#4436BC`, transição de 180 ms e retorno suave.
- O carrinho vazio agora apresenta um painel central neutro com o título `O seu carrinho está vazio`, texto de orientação e CTA `Explorar produtos` para `/collections/all`, mantendo responsividade e ausência de overflow.
- O modal de autenticação aberto pelo carrinho foi adaptado ao método atual da loja: apenas e-mail, envio de código de verificação e retorno preservado para `/cart`; não há campo de palavra-passe nem recuperação de palavra-passe.
- QA local desktop e mobile concluído: carrinho vazio, carrinho com produto temporário de sessão, abertura/fecho do modal, dimensões, ausência de overflow, hover do header e URL de autenticação com `login_hint` e `return_to` validados.
- Limitação da prévia local: ao entregar o fluxo ao login hospedado da Shopify, a prévia respondeu 401. Nenhum código foi solicitado ou enviado durante o teste. O teste completo de receção do código deve ser feito numa prévia hospedada ou na loja.
- Validação específica da Shopify aprovada nos 5 arquivos alterados. `shopify theme check` completo: zero erros e apenas dois avisos históricos de snippets órfãos (`product-media-gallery.liquid` e `product-variant-selection.liquid`). `node --check` e `git diff --check` aprovados.
- Alterações mantidas somente no ambiente local; nenhum envio ao GitHub ou publicação na Shopify foi realizado.

## Carrossel principal, campanha de inverno e limpeza do carrinho — 17/09/2026

O utilizador forneceu dois novos criativos e autorizou somente a implementação e teste local. A homepage passou a apresentar dois banners principais no mesmo espaço 1248 × 702: o banner original permanece como primeiro slide com todo o conteúdo existente, e a campanha de Natal M3D entra como segundo slide, sem textos adicionais sobre a arte.

O carrossel foi implementado em `sections/m3d-home.liquid` e `assets/m3d-home-carousel.js`. A troca automática ocorre a cada 6,5 segundos e usa crossfade com deslocamento horizontal limitado a 24 px, duração de 520 ms e curva monotónica `cubic-bezier(.22,.61,.36,1)`, sem mola, balanço ou overshoot. Dois indicadores circulares exibem a quantidade e permitem selecionar diretamente cada banner. O autoplay pausa durante hover/foco e quando a aba fica oculta. Cliques rápidos substituem o estado atual sem duplicar slides ativos. Teclado, foco visível, `aria-current`, `aria-hidden`, rótulos do carousel e `prefers-reduced-motion` foram incluídos.

O arquivo original de Natal tinha 3900 × 2194 e cerca de 10,7 MB. A cópia usada pelo tema foi redimensionada para 2496 × 1404 e convertida em `assets/banner-natal.webp` com 481 KB, preservando o original em Downloads. O segundo banner menor de vestuário passou a usar `assets/vestuario-inverno.png` (1919 × 938). O antetítulo `Vestuário e têxteis` e restantes elementos foram mantidos; o título exibido passou para `A sua marca. Veste o Inverno.`. Foram adicionadas configurações do editor para substituir futuramente a imagem e o texto alternativo do segundo banner principal.

No carrinho vazio, `sections/main-cart.liquid` deixou de renderizar o título geral e o antetítulo repetido. A única ocorrência é agora o H1 `O seu carrinho está vazio`; descrição e CTA `Explorar produtos` foram mantidos. Quando houver produtos, o título normal `O seu carrinho` continua visível.

QA Playwright desktop 1440 × 1000 e mobile 390 × 844: dois slides/dois indicadores; somente um slide e um indicador ativos; transição intermediária contínua; seleção manual e cliques rápidos aprovados; autoplay mudou do índice 0 para 1; banner otimizado carregou em 2496 × 1404; banner de inverno e texto corretos; nenhum overflow horizontal. No carrinho vazio, a expressão `O seu carrinho` aparece uma vez, sem `.cart__title` nem kicker. Erros de consola observados continuam limitados aos bloqueios externos conhecidos da prévia Shopify (origin_trials/CORS, Shop.app/CSP, 403/404), sem erros JavaScript do tema.

Validador oficial Shopify em modo de tema completo aprovou os cinco arquivos desta etapa, artefacto `m3d-carousel-cart-theme-20260917`, revisão 1. `node --check`, `git diff --check` e Theme Check completo passaram; o Theme Check manteve somente os dois avisos históricos `OrphanedSnippet` em `product-media-gallery.liquid` e `product-variant-selection.liquid`. Nenhum commit, push ou publicação Shopify foi realizado. Prévia local: http://127.0.0.1:9292/ e carrinho: http://127.0.0.1:9292/cart .

## Correção do flash preto no carrossel principal — 18/09/2026

Corrigido localmente o aparecimento intermitente do fundo preto antes da troca de banner. A causa era uma condição de corrida: o segundo banner usava carregamento tardio e a transição podia começar antes de a imagem terminar de carregar e decodificar.

Em `sections/m3d-home.liquid`, somente o segundo banner principal passou de `loading="lazy"` para `loading="eager"`. Em `assets/m3d-home-carousel.js`, cada slide agora registra a prontidão das suas imagens e a troca só começa depois de `load` e `decode`; enquanto a próxima imagem não está pronta, o slide atual permanece ativo. Pedidos rápidos de troca continuam substituindo pedidos anteriores por meio de um identificador monotónico. Tempos, curva, deslocamento, autoplay, pausa, indicadores, textos e layout não foram alterados.

QA headless local em 1440 × 1000 e 390 × 844 atrasou artificialmente apenas `banner-natal.webp`: durante o bloqueio, o primeiro slide permaneceu ativo com opacidade 1 e o segundo com opacidade 0; após a liberação, o segundo banner carregou em 2496 × 1404 e tornou-se ativo. A transição de retorno manteve soma mínima de opacidades igual a 1 e exatamente um slide ativo, sem quadro vazio ou preto.

`node --check`, `git diff --check` e o validador Shopify passaram nos dois arquivos, artefacto `m3d-carousel-black-flash-20260918`, revisão 1. Theme Check completo inspecionou 61 arquivos sem erros e manteve apenas os dois avisos históricos `OrphanedSnippet`. Nenhum commit, push ou publicação Shopify foi realizado; a alteração permanece somente na prévia local `http://127.0.0.1:9292/`.

## Correção adicional do escurecimento e imagens dos cards — 21/09/2026

O utilizador informou que o flash preto ainda ocorria. A correção de 18/09 garantia o carregamento da imagem, mas não tratava a composição visual: os dois slides animavam a opacidade sobre o fundo preto e o slide de saída deslocava-se 24 px, podendo expor o fundo. Em `sections/m3d-home.liquid`, as duas regras de saída `.is-leaving-next` e `.is-leaving-previous` foram ajustadas para manter o slide anterior opaco e estacionário sob a entrada até o fim da transição; `transition:none` evita que a camada inferior fique parcialmente transparente em inversões rápidas. A entrada mantém 24 px, 520 ms e a curva existente. O JavaScript e os tempos de autoplay não foram alterados nesta revisão.

Na secção “Encontre a sua próxima ideia”, os arquivos fornecidos foram copiados sem alteração dos originais: `tecnologia.png` → card Tecnologia e estilo de vida, `presentes-sazonais.png` → Presentes sazonais e `vestuario-card.png` → Vestuário personalizado. Os três têm 1376 × 768 px e os hashes das cópias coincidem com os arquivos em Downloads. Os outros dois cards, os textos e os links foram preservados. O pedido de “header com zoom” foi esclarecido pelo utilizador como ampliar a imagem no hover; os cinco cards receberam zoom de imagem `scale(1.055)` em 360 ms somente em dispositivos com hover, com rótulo e caixa imóveis e respeito a movimento reduzido. Nenhum novo cabeçalho foi criado.

QA na prévia local `http://127.0.0.1:9292/`: desktop 1440 × 1000 e mobile 390 × 844, amostras de oito quadros de transição por viewport sem borda preta, 20 cliques alternados por viewport sem estado sem banner visível, autoplay de 6,5 s, imagem de Natal artificialmente atrasada e `prefers-reduced-motion` aprovados. Os cinco cards carregam no mobile, sem overflow horizontal; hover atingiu a escala esperada no desktop sem mover rótulo. Prévia HTTP 200. `node --check`, `git diff --check`, validador Shopify `m3d-home-carousel-cards-20260921` revisão 1 e Theme Check completo aprovados; este último manteve somente os dois avisos históricos de snippets órfãos. Nenhum commit, push ou publicação na Shopify foi realizado. Pendência: aprovação visual do utilizador antes de qualquer envio.
