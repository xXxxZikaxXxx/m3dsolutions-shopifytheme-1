# M3D Solutions — contexto do projeto

Atualizado em 10/09/2026.

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

Antes de publicar, validar ou substituir os cinco assets atuais, marcados como testes pelo usuário. Conectar textos, URLs, coleções e dados reais da Shopify.

## Cuidados para continuidade

Não transformar informações da midocean ou dados do Vendus em promessas da M3D. Fotografias dos prints são material de referência para esta proposta. Dados reais de catálogo, preços, descontos, estoque e prazos devem vir da loja quando integrarmos o Liquid. Não divulgar dados de clientes e faturação dos prints administrativos na vitrine ou no Figma.
