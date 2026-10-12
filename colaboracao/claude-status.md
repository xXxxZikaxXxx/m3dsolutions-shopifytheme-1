# Estado do Claude — líder do Design System

Atualizado: 08/10/2026.

## Agora

- Ordem de início recebida do utilizador.
- Resposta às contrapropostas D-04 a D-09 em `claude-review.md` §10: todas aceites.
- Onda 1 iniciada: D1 (marca/tokens) e D2 (jornadas) como sub-agents nativos, só com escrita em `design/`.

## Ficheiros do Claude

| Ficheiro | Estado |
| --- | --- |
| `design/visual-b2c-b2b.md` | Em preparação |
| `design/design-system-m3d.md` | Em preparação |
| `assets/m3d-tokens.css` | Por criar, reservado ao Claude (D-09) |
| `referencias/marca/extraidos/` | Concluído: SVG e PNG oficiais extraídos do manual |

## Bloqueios e pendências

- E-mail de destino dos orçamentos no Admin (`m3dbrindes@gmail.com`): não verificado nem alterado.
- Preços fictícios: autorizados pelo utilizador; execução com o Codex.

## Não feito

Nenhum commit, push ou deploy. Nenhum ficheiro do tema alterado até agora.

## Onda 1 — D2 concluído (08/10/2026)

`design/d2-jornadas.md` foi entregue pelo sub-agent nativo D2 e revisto pelo Claude.

**Achados para o Codex/C1.** As rotas vêm do código; não foram testadas por HTTP.

- Os 12 links do conteúdo principal levam à raiz porque `templates/index.json` não tem settings.
- O item Pedir orçamento da navegação também leva à raiz. Só a PDP usa `pages['pedir-orcamento']`.
- O menu mobile não tem Coleções nem Pedir orçamento, o que viola a regra dos 7 itens.
- As 11 categorias do mega menu são páginas, não coleções. O handle `vesturio-e-acessrios` está corrompido.
- Há textos em inglês: “Add to cart” e o formulário de contacto.
- Rotas confirmadas no código: `/collections/all`, `/collections`, `/collections/wrist-watches` e `/pages/pedir-orcamento`. As restantes estão listadas no §3 do documento.

**Propostas do Claude para revisão do Codex** (a partir do §7 do D2):

| ID | Proposta |
| --- | --- |
| L-1 | Repor Coleções e Pedir orçamento no menu mobile, pela ordem dos 7 itens |
| L-2 | Contexto do orçamento por template alternativo do produto, `/products/<handle>?variant=<id>&view=orcamento`. O produto vem do servidor (Liquid) e não da query. O C2 verifica que o redirect do `form 'contact'` preserva o `view`. A entrada genérica fica em `/pages/pedir-orcamento` |
| L-3 | Sem NIF no formulário do MVP |
| L-4 | Ocultar o coração do card, que não guarda nada. Fica só a ação MyShop com ícone e rótulo (D-05) |
| L-5 | Ocultar links sem destino em vez de os apontar à raiz |
| L-6 | Num produto esgotado com preço, “Pedir orçamento” é um link secundário e não um botão |
| L-7 | Um só CTA de orçamento na homepage (bloco empresas); o bloco de ajuda só entra com links reais |
| L-8 | Pesquisa visível no topo mobile, sem alterar os itens da navegação |
| L-9 | O rótulo “Preço sob consulta” do botão passa a “Pedir orçamento”. “Sob consulta” fica só como valor de preço |

## Onda 2 — Design System v1 (08/10/2026)

- O D1 terminou: `design/d1-marca-tokens.md` tem o inventário completo do tema, a confirmação de `raleway_n1…n9` / `i1…i9` no shopify.dev, as tabelas de contraste e a medição da área de proteção.
- O Claude criou `assets/m3d-tokens.css`, só com custom properties e sem seletores de componente. **O tema ainda não o carrega**: o ponto de integração é do Codex (`design-system-m3d.md` §4).
- O Claude criou `design/design-system-m3d.md` com as decisões fechadas, as especificações dos componentes e os pedidos de integração.
- Decisões que precisam do parecer do Codex por serem mudanças globais:
  - botões em pílula;
  - logótipo horizontal no cabeçalho (40/32 px);
  - foco global roxo;
  - cards sem sombra nem coração;
  - remoção do bege.

Os sub-agents D1 e D2 terminaram e não têm escrita pendente.

## Resposta ao `codex-status.md` (08/10/2026)

- **L-2:** aceito a contraproposta `page.m3d-quote` em `/pages/pedir-orcamento?view=m3d-quote`, com contexto declarado e editável. A L-2 original (`product.orcamento`) fica descartada nesta onda.
- **Copy do hero:** aceito “O seu nome, a sua marca, em objetos do dia a dia.” e o processo “escolher produto → descrever ideia → pedir proposta”, sem prova nem aprovação prometidas.
- **Pincelada:** aceito o SVG estático numa só utilização, sem animação até medir o desempenho. O SVG extraído tem 1,3 KB e um único caminho, pelo que o custo deverá ser baixo.
- **Ponto de integração dos tokens:** aceito, depois de `css-variables`. `m3d-tokens.css` não redefine `--font-body-family` nem `--font-heading-family`; `--m3d-font-family` só aponta para o primeiro.
- **Orca:** o runtime está **ativo** (`orca status`: `state: ready`). As mensagens do Claude chegam ao teu terminal por `orca terminal send`, que é o canal direto. Podes responder-me da mesma forma para o terminal `term_19a236d5-4845-4425-a716-30e27c9cd41d`.
- **Próximo passo do Claude:** revisão de fidelidade (só leitura) de `sections/m3d-quote.liquid`, `snippets/card-product.liquid` e `snippets/price.liquid` contra o D2 e o Design System. Os resultados ficam aqui; não edito ficheiros do Codex.

## Revisão de fidelidade — orçamento (C2), 08/10/2026

Lidos `sections/m3d-quote.liquid` e `assets/m3d-quote.css`, sem edições. A estrutura cumpre a D-06 e a D2 §5: campos declarativos e editáveis, sucesso só com `posted_successfully?`, erros ligados aos campos, `forced-colors`, 48 px por alvo, botão em pílula roxo e frase “não cria uma encomenda”.

**Corrigido pelo Claude no ficheiro de tokens:**

- **Espaçamento.** O C2 usou a convenção `--m3d-space-N = N × 4 px` (8 → 2rem, 12 → 3rem, 16 → 4rem). A minha escala v1 tinha `--m3d-space-8 = 64px` e `--m3d-space-10 = 128px`, e os espaços do orçamento dobrariam ao carregar os tokens. Mudei `m3d-tokens.css` para N × 4 px (1–6, 8, 10, 12, 16, 24, 32). Nenhum outro ficheiro usava a escala antiga.
- Acrescentei `--m3d-color-action-primary-hover: #362b96`, o valor usado pelo C2, com 10,5:1 sobre branco.

**Pedidos ao Codex/C2 em `m3d-quote.css`** (nomes que não existem nos tokens, hoje resolvidos pelos fallbacks):

| Usado | Token correto | Nota |
| --- | --- | --- |
| `--m3d-color-border` nos campos | `--m3d-color-border-control` (`#8a8a8a`) | **A11y:** `#d9d9d9`, ou o fallback `#d4d4da`, dá cerca de 1,4:1 e falha os 3:1 dos componentes |
| `--m3d-color-state-error` (`#9c1b38`) | `--m3d-color-error` (`#c90012`) | Unificar o vermelho de erro no tema |
| `--m3d-color-state-success` | `--m3d-color-success` | |
| `--m3d-color-focus` | `--m3d-focus-color` | |
| `--m3d-color-surface-subtle` (`#f2f2f4`) | `--m3d-color-surface-alt` (`#f5f5f7`) | |
| `--m3d-type-display/large/medium/body/small` | `--m3d-display-sm`, `--m3d-text-2xl`, `--m3d-text-xl`, `--m3d-text-md`, `--m3d-text-sm` | O lead de 25 px pode ficar `--m3d-text-2xl` (24 px) |
| `font-variant-numeric: lining-nums tabular-nums` | `var(--m3d-numeric)` | Opcional |

**Texto:** as chaves `m3d_quote.*` ainda não existem em `locales/en.default.json`, e a página mostraria “translation missing”. O texto completo em PT-PT está pronto em `design/d4-copy-orcamento.md`. Inclui `mixed_on_request` = “Algumas opções sob consulta” e o nome da secção no schema.

## Parecer do Codex sobre o DS v1 (recebido pelo Orca, 08/10/2026)

Aceites: DS v1, botões em pílula, logótipo horizontal, cards sem sombra nem coração, tokens após `css-variables`, Raleway n4/n9 sem duplicar o n7, hero estático e L-2 `page.m3d-quote`.

O MyShop mantém o acesso por teclado (sem `tabindex="-1"`), como pediu o Codex. Aceito: a ação é distinta do link do card e não o duplica. Corrijo `design-system-m3d.md` em conformidade.

Escritores: header/footer → C4; PDP e home → Codex principal. A revisão visual do Claude começa quando o Codex enviar a home integrada (prévia `localhost:9292`, tema de desenvolvimento 166780993606).

## Revisão visual da home integrada — 08/10/2026

**Método:** Playwright, só GET (POST bloqueado), em `localhost:9292` a 1440, 1024, 390 e 360 px, home e `/pages/pedir-orcamento?view=m3d-quote`. Capturas em `analises/qa-visual/claude-20261008/`.

**Métricas automáticas, aprovadas nas 8 combinações:**

- HTTP 200; H1 em Raleway 900 e corpo em Raleway; tokens carregados (`--m3d-color-action-primary = #4436bc`).
- Sem overflow horizontal, sem texto abaixo de 12 px, sem `€0,00` e sem “translation missing”.
- Sem setas nos botões e sem rótulos em maiúsculas.
- Os erros de consola são `ERR_FAILED` dos POST bloqueados pela própria revisão e um CORS do `origin_trials` da Shopify no localhost. Nenhum é atribuível ao tema.

**Página de orçamento:** aprovada visualmente a 1440 e 390. A hierarquia, os campos, os rótulos, o texto PT-PT e o botão em pílula correspondem à especificação.

**Problemas na home, por gravidade:**

| # | Gravidade | Problema | Correção pedida |
| --- | --- | --- | --- |
| H1 | **Alta** | A pincelada aparece em fragmentos (duas lascas e uma curva) a 1440, 390 e 360 px. A imagem do produto é JPG com fundo branco opaco, fica por cima e tapa o corpo do “M”. A pincelada também fica a 80 % de altura com `contain`, o que a encolhe. | Pôr o produto num **prato branco** deliberado (quadrado com `--m3d-radius-media`, ou círculo), com cerca de 55 % da largura, ancorado na parte inferior direita. Aumentar a pincelada para cerca de 130 % da largura do visual, deixando a perna esquerda do M e a cauda visíveis à volta do prato. Sem `mix-blend-mode` no hero, porque o produto escureceria sobre o preto. Critério: o M tem de se reconhecer a 1440 e a 390 |
| H2 | **Alta** | “O que procura?” mostra o título e “Todas as categorias” sem nenhuma categoria (1440 e 390). Nenhum bloco passa `products_count > 0`. | Contar primeiro as categorias válidas e não renderizar a secção, incluindo o título, quando forem zero. Confirmar os handles e o conteúdo das coleções drinkware/bags/t-shirts/notebooks/travel |
| H3 | Média | Os cards mostram faixas cinzentas por cima e por baixo da imagem: o quadrado branco do JPG fica visível sobre `--m3d-color-surface-alt`. | `mix-blend-mode: multiply` na `img` dos cards de produto (o branco funde com o cinzento). Em alternativa, fundo branco no contentor, sem raio cinzento à volta |
| H4 | Média | A faixa preta “Encomendas para empresas” e o rodapé preto ficam separados por uma tira branca estreita, que parece um erro. | Reordenar: produtos → faixa de empresas → “Da ideia ao pedido” → rodapé. A faixa fica rodeada de branco e o rodapé volta a ser o único preto no fim |
| H5 | Baixa | Por baixo do produto do hero aparece a legenda “Amazon”. O nome de catálogo não descreve o objeto (é uma questão de catálogo) e a legenda compete com o H1. | Retirar a legenda visível do hero e manter o `alt`. O link do produto mantém-se |
| H6 | Baixa (C4) | Rodapé: “© 2026 M3D Solutions. All rights reserved.” está em inglês. | “Todos os direitos reservados.” |
| H7 | Nota | Os nomes dos produtos (“Amazon”, “Audi”, “Bacardi”, “Bear & Bull”) são marcas, não descrições. | É uma questão de catálogo para a fase MidOcean, não de layout. Fica registado para o utilizador |

**Aprovado sem alterações:**

- Cabeçalho com o logótipo horizontal.
- Navegação com os 7 itens e a pílula.
- Pesquisa visível no mobile (L-8).
- H1 e copy do hero.
- CTA roxo e link “Encomendas para empresas”.
- “Sob consulta” nos cards.
- Processo em 3 passos: é uma sequência real, por isso a numeração é legítima.
- Faixa de empresas com o logótipo negativo e o botão inverso.
- Rodapé com o slogan oficial.

A pílula da navegação não foi testada por clique nesta ronda; fica para o QA do C3 ou para a minha próxima ronda.

## Revisão visual da home — ronda 2 (08/10/2026)

Capturas em `analises/qa-visual/claude-20261008/ronda2/`. Métricas: HTTP 200, Raleway 900/400, sem overflow, sem texto abaixo de 12 px e sem `€0,00` a 1440, 1024 e 390 px. A 360 px, a recolha falhou porque a página navegou a meio da avaliação; fica para repetir e não é conclusão sobre o tema.

**Resolvidos:**

- **H2:** a secção vazia não aparece.
- **H3:** cards limpos com `multiply`.
- **H4:** a faixa de empresas fica entre os produtos e o processo, sem tira branca.
- **H5:** sem legenda no hero.
- **H6:** rodapé em PT.
- **H1** no desktop: o M reconhece-se.

**Novos ou residuais:**

| # | Gravidade | Problema | Correção pedida |
| --- | --- | --- | --- |
| R1 | **Alta** | Aparecem dois textos “Translation missing: en.m3d_cart.add_error” e “en.m3d_cart.quote_required” no HTML da home (1440 e 1024; 2 em 390). Regressão desta ronda, provavelmente do C5. | Acrescentar as chaves aos locales. Sugestões: `add_error` = “Não foi possível adicionar ao carrinho. Tente novamente.”; `quote_required` = “Este produto é sob consulta. Peça um orçamento.” |
| R2 | Média | **Mobile (390):** o prato branco sobre o fundo branco é invisível. Tapa o meio da cauda da pincelada e a cauda parece partida (sobra um fragmento em “,” à direita). | Dar ao prato o mesmo tratamento dos cards: fundo `--m3d-color-surface-alt` e `mix-blend-mode: multiply` na imagem do produto. O prato fica visível e a pincelada lê-se como passando por trás dele. Aplicar também no desktop, por coerência com os cards |
| R3 | Média | **Desktop (1440):** a cauda da pincelada é cortada a direito na base do contentor visual (corte horizontal a meio do traço). Um corte na borda de um bloco interno parece acidental; o manual só corta a pincelada na borda da página. | Deixar a pincelada sair pela base do contentor (`overflow: visible` no visual, com `overflow-x: clip` na secção) ou reduzir a escala/posição para a cauda terminar dentro do visual. Cortes só nas bordas da janela |
| R4 | Baixa | Processo: os números 1, 2, 3 usam algarismos de estilo antigo da Raleway (o “3” desce abaixo da linha) e um peso fino. | `font-variant-numeric: var(--m3d-numeric)` e peso 700 nos números dos passos |

**Pendência operacional registada.** O e-mail do Admin é `m3dsolutionsshopify@gmail.com`, diferente do pedido pelo utilizador (`m3dbrindes@gmail.com`). Fica para o utilizador decidir antes de publicar, sem alteração agora. Concordo.

## Verificação final dirigida + PDP e coleção — ronda 3 (08/10/2026)

**Token:** `--m3d-font-numeric` foi acrescentado a `assets/m3d-tokens.css` e a exceção está registada em `design-system-m3d.md` §6.

**Home: aprovada pelo Claude.**

- 1440, 390 e 360 px: HTTP 200, sem overflow, sem texto abaixo de 12 px, sem `€0,00` e sem “translation missing”.
- O M lê-se atrás do prato visível, e a cauda só é cortada pela borda da janela.
- Processo com algarismos alinhados a 700.
- A 1024 px a recolha falhou (erro do meu script, `document.body` nulo durante a avaliação). Valem as capturas do C3 nesse tamanho.
- Nota não bloqueante: a 360 px o H1 parte em 4 linhas e deixa “dia.” sozinha; `text-wrap: balance` no H1 resolve.

**Página de orçamento:** aprovada na ronda 1.

**PDP (`/products/3s-145-amazon`) e coleção (`/collections/wrist-watches`):** HTTP 200, sem overflow, sem texto pequeno, sem `€0,00` e sem traduções em falta nos 4 tamanhos. Capturas em `analises/qa-visual/claude-20261008/ronda3/`.

| # | Gravidade | Problema | Correção pedida |
| --- | --- | --- | --- |
| P1 | Média | Galeria da PDP: o JPG branco fica visível como quadrado dentro do contentor cinzento, com faixas cinzentas à esquerda e à direita | Mesmo tratamento dos cards: `mix-blend-mode: multiply` na imagem da galeria |
| P2 | Média | “Quantidade” aparece duas vezes: título do grupo e rótulo do campo | Manter um só visível: legenda “Quantidade” e rótulo do campo visualmente oculto, ou o contrário |
| P3 | Média | No estado sob consulta, “Consulte o stock de cada opção antes de adicionar.” e “Configure as opções para preparar o seu pedido.” falam de adicionar ou configurar quando a ação é pedir orçamento | No estado sob consulta, ocultar as duas frases, ou trocar por “A quantidade e a personalização seguem com o pedido de orçamento.” |
| P4 | Baixa | O botão “Share” está em inglês | “Partilhar” |
| P5 | Baixa | No select de personalização aparece um “✓” fixo, que sugere uma escolha confirmada | Usar a seta normal do select |
| C1 | Média | Cards da coleção (e da pesquisa, que partilha o CSS) mostram o quadrado branco do JPG dentro do cinzento | `multiply` também em `main-collection` e `main-search`, não só na home |
| C2 | Média | Botão circular “+” só com ícone no canto de cada card: visualmente sugere adicionar ao carrinho | Se for o MyShop, usar o ícone e o rótulo do MyShop da PDP (D-05). Confirmar o `aria-label` |
| C3 | Baixa | A revisão encontrou um “→” num link da coleção | Se for a paginação, é aceitável; se for texto de CTA, retirar |
| N1 | Nota (catálogo) | “Wrist Watches”, “Specifications Premium German Craft Box…” e os nomes de marca estão em inglês ou sem descrição | Dados de catálogo para a fase MidOcean; não é layout. Fica para o utilizador |

Quando P1–P3 e C1–C2 estiverem resolvidos, aceito a fidelidade visual da PDP e da coleção com uma verificação dirigida. P4, P5 e C3 podem entrar no mesmo lote.

## Aceite de fidelidade visual do Claude — ronda 4 (08/10/2026)

**Verificação dirigida:** home, PDP `/products/3s-145-amazon` e coleção `/collections/wrist-watches`, a 1440, 1024, 390 e 360 px (12 combinações). Todas com HTTP 200, sem overflow, sem texto abaixo de 12 px, sem `€0,00` e sem traduções em falta. Capturas em `analises/qa-visual/claude-20261008/ronda4/`.

**Resolvidos:**

- **P1, C1:** `multiply` na galeria e nas listas; já não há quadrado branco.
- **P2:** um único “Quantidade” visível.
- **P3:** no estado sob consulta aparece “A quantidade e a personalização seguem com o pedido de orçamento.”
- **P4:** “Partilhar”.
- **P5:** sem “✓” fixo.
- **C2:** MyShop nos cards com marcador e rótulo visível.
- **C3:** o “→” é o link de página seguinte da paginação. É legítimo.

**Notas não bloqueantes (baixa):**

- O `aria-label` da paginação está em inglês (“Next page”). Deve ser “Página seguinte”, e a anterior “Página anterior”.
- A ação MyShop usa ícones diferentes: “+” na PDP e marcador nos cards. Unificar no marcador.

**Decisão:** o Claude **aceita a fidelidade visual** da home, da página de orçamento, da PDP e da coleção ao Design System v1 e ao manual: Raleway, paleta, logótipo horizontal e negativo, pincelada oficial numa só utilização, CTA roxo e “Sob consulta” coerente. As duas notas acima e os pontos de catálogo (N1) ficam registados como pendências.

**Fora da revisão do Claude:** carrinho (C5), conta/login, pesquisa e páginas de apoio. O QA técnico desses fica com o C3; a revisão visual do Claude pode ser feita a pedido. Sem commit, push ou deploy da parte do Claude.

## Encerramento da etapa visual (08/10/2026)

Li `colaboracao/entrega-visual.md`, que descreve corretamente o papel e as decisões do Claude. As notas baixas da ronda 4 foram corrigidas pelo Codex. Etapa visual encerrada; não há trabalho do Claude em curso nem sub-agents ativos.

**Ficheiros do Claude nesta etapa:**

- `assets/m3d-tokens.css`
- `design/visual-b2c-b2b.md`, `design/design-system-m3d.md`, `design/d1-marca-tokens.md` (D1), `design/d2-jornadas.md` (D2) e `design/d4-copy-orcamento.md`
- `referencias/marca/extraidos/`
- `analises/qa-visual/claude-20261008/`
- `colaboracao/claude-review.md` e este ficheiro

Sem commit, push ou publicação.

## Revisão visual em falta — 09/10/2026

**Âmbito:** carrinho vazio e com artigo, conta (`/account`, `/account/login`, `/account/register`, `/pages/login`), pesquisa (vazia, com resultados, sem resultados), páginas de apoio (`/pages/contact`, `/pages/kits-de-boas-vindas`, `/pages/tecnologia`), política de privacidade, `/collections/all`, 404 e PDP com stock real (`/products/saco-natalicio-boneco-de-neve-com-cordao`, €1,80, stock 20) a 1440, 1024, 390 e 360 px. Script e capturas em `analises/qa-visual/claude-20261009/` (`qa.py`, `qa.json`). Raleway em todas as páginas do tema, overflow 0, sem erros Liquid ou JS. O único botão sem nome detetado é o logótipo do rodapé, que tem `alt`, portanto é falso positivo. A sessão de QA adicionou 1 unidade do saco ao seu próprio carrinho; não houve checkout.

**Confirmado:** “Buy it now” já não aparece na PDP com stock (correção do Codex). Email do orçamento mantém-se m3dsolutionsshopify@gmail.com por decisão do utilizador.

| ID | Gravidade | Página | Achado | Proposta |
| --- | --- | --- | --- | --- |
| V1 | Alta | Pesquisa | `q=zzqxv` devolve 22 relógios e `q=saco` devolve o saco mais os mesmos 22. A API `search/suggest.json` faz o mesmo, por isso é indexação do catálogo e não Liquid. O estado “sem resultados” nunca aparece. | Codex: investigar o campo pesquisável dos relógios 3S (tags, metafields pesquisáveis, SKU, vendor). Dados de catálogo; corrigir sem alterar preços. |
| V2 | Alta | 404 | Tudo em inglês: “Page not found”, “The page you are looking for does not exist.”, campo e botão “Search”. O campo é retangular e o botão é pílula. | PT-PT (“Página não encontrada”, “Pesquisar”), campo pílula igual ao do cabeçalho, CTA “Explorar produtos” como botão secundário. |
| V3 | Alta | Páginas de apoio | `/pages/kits-de-boas-vindas`, `/pages/tecnologia` e as restantes páginas do menu Coleções mostram só o H1, sem conteúdo nem saída. | Template de página com introdução, grelha de produtos de uma coleção associada (quando existir) e CTA “Pedir orçamento”. Sem conteúdo: link para `/collections/all`. |
| V4 | Média | Pesquisa vazia | `/search` sem termo mostra “Resultados para ""”. | Sem termo: H1 “Pesquisar”, campo grande com foco e sugestões (coleções). |
| V5 | Média | PDP | Seletor de cor misto: “Beige” é pílula de texto e a outra variante é um círculo vermelho sem rótulo visível. | Um só padrão: swatch circular com nome por baixo ou pílulas de texto para todas as cores. Nome da variante no `aria-label`. |
| V6 | Média | PDP | Adicionar ao carrinho só mostra o texto pequeno “Adicionado ao carrinho” entre “Pedir orçamento” e “Partilhar”. Não há gaveta nem link. | Abrir a gaveta do carrinho (já existe `snippets/carrinho.liquid`) ou toast com “Ver carrinho”, junto ao botão. |
| V7 | Média | PDP | A quantidade é um input simples de 136 px, sem passo, enquanto o carrinho usa − 1 +. O “+” do seletor de composição é minúsculo. O campo “Sem personalização” tem borda roxa permanente e parece estar sempre em foco. | Stepper − / + igual ao do carrinho e ícone “+” no mesmo tamanho do “−” (também no carrinho). A borda roxa fica reservada ao `:focus-visible` e ao estado selecionado. |
| V8 | Média | Carrinho | “Atualizar” e “Finalizar compra” são ambos primários roxos. Coluna Total estreita, encostada ao stepper. | “Atualizar” como secundário com contorno (ou oculto com JS e atualização automática). Coluna Total com largura mínima de 96 px e alinhamento à direita. |
| V9 | Média | Política de privacidade | Texto gerado pela Shopify em inglês. Títulos e parágrafos sem ritmo vertical. | Estilo `.rte` com tokens (h2 24/32, parágrafos com margem de 16 px e largura de 68ch). Tradução PT-PT no Admin, fora do tema. |
| V10 | Baixa | Cabeçalho | Placeholder da pesquisa truncado a 1440 (“O que procura pa”). A 390 o campo não ocupa a largura toda (16 px à esquerda, cerca de 60 px à direita). | Placeholder curto (“Pesquisar produtos”) ou campo mais largo no desktop. Mobile: largura total menos 2 × 16 px. |
| V11 | Baixa | Contacto | H1 “Contact” em inglês (título da página no Admin). Rótulos do formulário com menos de 12 px a 390. Peso 900 no H1 da pesquisa, do 404, das páginas e do contacto; o resto do tema usa 700. | Título PT “Contactos” no Admin. Rótulos de 14 px. H1 com o token de 700. |
| V12 | Baixa | Pesquisa | O cartão do saco mostra “€1.80” com ponto e a PDP mostra “€1,80”. | Mesmo filtro `money` e formato de moeda em todos os cartões. |
| V13 | Baixa | Geral | Páginas curtas deixam uma faixa branca por baixo do rodapé a 1440 (carrinho vazio, pesquisa vazia, kits). O acordeão “Especificações” usa a letra “v” como ícone. | `main` com `min-height` (flex na coluna do body) e chevron SVG igual ao dos filtros. |

**Conta:** `/account`, `/account/login` e `/account/register` redirecionam para as contas de cliente alojadas pela Shopify (`/75287035974/account`), que dão 404 ou 502 na prévia local. São páginas da Shopify e não do tema; a marca aplica-se no Admin (Definições → Contas de cliente → Marca). `/pages/login` (página M3D) está aprovada a 1440 e 390.

**Aprovados sem achados:** carrinho vazio, `/pages/login` e `/collections/all`.

Correções V2–V13 no tema: Codex é o escritor. Os tokens necessários (peso do H1, ritmo `.rte`) ficam do meu lado em `assets/m3d-tokens.css` se faltarem. Sem commit, push ou deploy.

## Revisão Claude — MidOcean §4 (PDP e personalização), 09/10/2026

Li `colaboracao/midocean-arquitetura.md` e conferi o contrato em `sections/main-product.liquid` (linhas 12–28 e 128–187) e `assets/m3d-product.js` (linhas 14 e 175–219). **Aceito a arquitetura** (servidor → Admin → tema, custos privados, impressão variável por orçamento). As respostas abaixo são de UX; os nomes de campos MidOcean ficam por confirmar com amostras reais do `printdata`.

**M1 — Nomes PT-PT das técnicas.** Lista atual aprovada em Liquid: Transfer serigráfico, Transfer refletivo, Transfer digital, Serigrafia, Bordado, Baixo-relevo e Transfer por sublimação. Mostrar sempre com maiúscula inicial; a comparação em minúsculas mantém-se. Técnicas habituais em catálogos de brindes e ausentes da lista: Tampografia, Gravação a laser, Impressão digital UV, Doming e Gravação a seco. Só entram na lista quando a M3D as oferecer comercialmente (decisão do utilizador). Até lá ficam fora do seletor e aparecem só no acordeão “Áreas de personalização” como “Disponível por orçamento”. A tabela ID MidOcean → nome M3D vive no servidor; o tema nunca mostra o código técnico.

**M2 — Posições.** Manter o cartão atual: imagem 240 × 144 mais nome. Regras:
- As imagens de posição do fornecedor são importadas para Shopify Files, sem hotlink ao CDN da MidOcean (estabilidade, LCP e consentimento).
- Os nomes das posições são traduzidos no servidor (Frente, Verso, Lateral, Tampa, Pega, Bolso…).
- Debaixo do nome: “Área máx. 60 × 40 mm”, com a fonte numérica já definida.
- Sem imagem: cartão só com texto, nunca com um placeholder genérico.

**M3 — Limites.**
- *Cabe no seletor atual:* uma técnica com `price_included = true`, uma posição e largura × altura inteiras ≤ máximo. Os campos devem mostrar o máximo no rótulo (“Largura (máx. 60 mm)”).
- *Vai para orçamento:* número de cores, várias posições, custo de preparação, escalões por quantidade, full colour e restrições por variante. Dentro do modal: “Precisa de mais cores ou posições? Pedir orçamento”, com o contexto já preenchido.
- *Novo contrato mais tarde:* `max_colors` e `variants[]` por posição, só para informação. Não criar um seletor de cores de impressão nesta fase.

**M4 — Estados sem dados.**
- Produto sem `printdata`: esconder o bloco Personalização e o acordeão. Não mostrar “Sem personalização” como campo.
- Com `printdata` mas nenhuma técnica com preço incluído: uma linha “Personalização disponível por orçamento” mais link (é o que `quote_personalization_hint` já faz; estender ao caso com preço > 0).
- Stock: “20 em stock” em vez de “Stock (20)”. Previsão do fornecedor (“Próxima entrada”) nunca aparece como disponível e só aparece se a política comercial aprovar.
- Feed expirado ou falha: o tema não muda nada. O estado comercial decide-se no servidor, como está no §5.

**M5 — Variantes de cor.** As cores da MidOcean chegam como nomes; não assumir hex. Seguir V5: um só padrão. Pílulas de texto por defeito; swatch circular com nome só quando houver hex aprovado. Cada variante com a sua imagem associada para a galeria trocar. Alt PT “{título} — {cor}”.

**M6 — Conteúdo.** A descrição `language=pt` passa por revisão editorial (o importador não sobrescreve). As especificações (material, dimensões, peso, embalagem) aparecem numa lista de definições no acordeão “Especificações e materiais”, não como blob HTML. Isto resolve também o “Specifications / Premium German Craft Box” em inglês (N1).

**M7 — Preço por quantidade.** A pricelist tem escalões. A PDP mostra um único preço Shopify; tabela de escalões ou “a partir de” só com política comercial aprovada. Até lá, quantidades acima do primeiro escalão seguem a nota de orçamento. Não usar `compare_at_price` para simular escalões.

**Piloto (§7.1):** proponho incluir pelo menos um saco (como o boneco de neve), uma garrafa ou caneca com várias posições e um têxtil com tamanhos, para exercitar M2–M5. Fixtures de UX: produto sem `printdata`, produto com técnica fora da lista e uma posição sem imagem.

Sem alterações a ficheiros do tema. Sem commit, push ou deploy.

## Testes de personalização, envio de imagem, filtros e novas decisões do utilizador — 09/10/2026

**Snippets:** `snippets/product-media-gallery.liquid` e `snippets/product-variant-selection.liquid` apagados por ordem do utilizador (Claude). Theme Check: 64 ficheiros, **zero ofensas**.

**Correção à V1:** são 17 relógios e 5 artigos natalícios, não 22 relógios (C9 tem razão).

**Teste (script `analises/qa-visual/claude-20261009/personalizacao.py`, resultado `personalizacao.json`):** nenhum dos 23 produtos tem técnica configurada no catálogo, por isso a configuração (Serigrafia Frente/Verso, Bordado, Transfer digital Frente/Lateral) foi injetada só no DOM local do saco. A 1440 e 390 px:
- O modal funciona: área máxima, “Largura (máx. 200 mm)”, erro acima do máximo, link de orçamento, sem erros JS.
- **Envio de logótipo funciona de ponta a ponta:** PNG de teste guardado pela Shopify (`cdn.shopify.com/.../uploads/...png`) e associado à linha do carrinho como `Logótipo`, com Técnica, Posição, Largura e Altura. A linha de teste foi removida a seguir.
- **Só guarda uma personalização:** confirmar Bordado depois de Serigrafia substituiu a Serigrafia.
- Baixa: a mensagem de erro fica visível depois de corrigir as dimensões, até ao próximo “Confirmar”.
- Carrinho: propriedades sem espaço depois dos dois pontos (“Técnica:Bordado”). O logótipo aparece como link com o nome hash do ficheiro; proposta: miniatura de 40 px mais “Ver logótipo”.
- **Filtros:** só Stock funciona. Material, Técnica de impressão, Cor e Etiquetagem mostram “Opções disponíveis quando este filtro for configurado na Shopify”, porque não há filtros por metafield configurados (app Search & Discovery) nem dados. “Em stock” devolve 18 produtos, incluindo relógios sem stock (inventário não controlado). Nenhum produto tem dados de etiquetagem.
- **Orçamento:** sem campo de envio de ficheiro. O formulário de contacto da Shopify não aceita anexos; o upload só existe na PDP via carrinho.

**Decisões do utilizador (09/10):**
1. **Todas as técnicas**, e várias personalizações por artigo. Revoga a parte “uma técnica/uma posição” de M1/M3: era uma limitação do seletor atual e não uma regra comercial.
2. **Preço** = (preço fornecedor + impressão) × fator por quantidade: 1,60 até 200 un.; 1,50 de 200 a 500; 1,40 de 500 a 2000; 1,35 acima de 2000. Limites exatos a confirmar com o utilizador (200, 500 e 2000 aparecem em duas faixas). IVA incluído ou não também a confirmar.
3. Piloto aceite: saco, garrafa ou caneca com várias posições e têxtil com tamanhos.
4. O utilizador tem chave API MidOcean; vai para o servidor e nunca para ficheiros ou chat.
5. Seleção manual dos produtos a importar; não importar o catálogo inteiro.
6. SKU com a marca M3D em todos os produtos MidOcean importados.

**Proposta Claude (UX) para o Codex avaliar na arquitetura:**
- **P-A, várias personalizações:** lista no PDP (“+ Adicionar personalização”), cada uma com técnica, posição, dimensões, nº de cores quando a técnica o exige e logótipo próprio. Propriedades numeradas (`Personalização 1 — Técnica`…) e resumo no carrinho. O modal atual vira editor de um item da lista.
- **P-B, preço por escalão:** o preço de variante Shopify não muda com a quantidade. Hipótese: preço base = fator 1,60 e desconto automático por quantidade equivalente aos outros fatores (1,50/1,60 = −6,25 %; 1,40/1,60 = −12,5 %; 1,35/1,60 = −15,625 %). Impressão como linha adicional (produto “serviço de personalização” com variantes por técnica/cores) ou cálculo no servidor. O Codex verifica o plano da loja (Cart Transform e Functions em apps próprias exigem Plus) e a viabilidade dos descontos por linha.
- **P-C, SKU M3D:** guardar o SKU MidOcean só no servidor. Proposta de opção opaca `M3D-{categoria}{sequência}-{cor}`, igual ao padrão `M3D-SN002-VMBRPR` que já existe. Um simples prefixo (`M3D-MO8888-03`) deixa o código do fornecedor visível. Decisão do utilizador.
- **P-D, seleção de produtos:** fase 1 com lista de SKUs (folha de cálculo) → simulação → rascunhos. Fase 2 com página “Catálogo MidOcean” na app M3D (pesquisa, filtros, preço calculado, selecionar → importar como rascunho). Publicação continua manual no Admin.
- **P-E, filtros:** o importador preenche `custom.material`, `custom.printing_techniques`, cor (opção) e etiquetagem (definição a criar). Filtros configurados no Search & Discovery: é configuração Admin, com autorização do utilizador.
- **P-F, upload no orçamento:** fica para a app M3D (app proxy com armazenamento). Até lá, texto “Pode enviar o logótipo em resposta ao nosso e-mail”.

Sem commit, push ou deploy.

## Respostas do utilizador e spec P-A — 09/10/2026

- **Faixas confirmadas:** 1–199 → 1,60; 200–499 → 1,50; 500–1999 → 1,40; 2000+ → 1,35. Substitui a proposta 1–200/201–500/501–2000/2001+ do §10.
- **IVA:** ainda não estava na fórmula. Preço final = (fornecedor + impressão) × fator × IVA, apresentado ao cliente como “IVA incluído”. Taxa e regra por destino (PT continental, ilhas, empresas UE) a definir pelo Codex na arquitetura; confirmar que a loja tem “preços incluem impostos” ativo (o carrinho já diz “Impostos incluídos”).
- **SKU:** opção A, opaco `M3D-{categoria}{sequência}-{cor}`.
- **Servidor:** o utilizador delega a escolha. **O Claude concorda com Railway (Amsterdam) + PostgreSQL + R2 privado.** O utilizador autoriza criar conta. Posição do Claude: a conta e o pagamento devem ficar em nome e com o cartão do utilizador; os agentes não introduzem dados de pagamento nem criam identidade. O utilizador ofereceu-se para criar e pagar; aguarda instruções curtas do Codex (Railway Hobby para o piloto, Cloudflare para o R2).
- **Spec P-A entregue:** `design/p-a-personalizacoes.md` (lista, editar, remover, cores, logótipo reutilizável, tabela de preço por escalão com IVA incluído, estimativa, carrinho, estados, a11y e textos PT-PT).

Sem commit, push ou deploy.

## P-A revisão 2 — 09/10/2026

`design/p-a-personalizacoes.md` ajustada aos cinco pontos de `codex-p-a-review.md`, todos aceites:
1. **Conflito de posição:** só com regra do fornecedor devolvida pelo servidor. Texto “Incompatível com a personalização n”. Máximo vem do servidor.
2. **Preço:** tabela de quatro escalões só como referência do artigo liso (mercado doméstico). Com personalizações ou outro destino, é cotação do servidor (§3.2); o tema não soma extras.
3. **Percurso:** carrinho nativo só quando o preço da variante Shopify é o correto. Caso contrário, “Calcular preço” → cotação → “Finalizar com esta configuração” (oferta/draft order). Até a cobrança estar demonstrada, esse percurso usa orçamento (§4.1).
4. **Fiscal:** “IVA incluído” só quando o total o inclui. Antes do destino aparece “Referência Portugal continental · IVA incluído”; isenção usa a indicação da cotação (§3.3).
5. **Miniaturas e configuração:** artes privadas por link controlado da app; `_config_id` é só referência.

Novos estados e textos no §5 e §7. Sem commit, push ou deploy.

## P-A revisão 3 e conferência do núcleo de preços — 09/10/2026

- Spec: “Portugal continental” deixa de estar fixo. A referência usa `{{ mercado }}` e a cotação usa `{{ destino }}`, ambos vindos do servidor. Sem mercado conhecido, a linha de referência não aparece.
- `integracoes/midocean/pricing.test.mjs`: 20/20 testes aprovados (Node 22.19; correr o ficheiro, não a pasta).
- Conferência independente do Claude com 1,00 € de fornecedor + impressões de 0,25 € e 0,40 €, IVA 23 %: unitário bruto 3,25 / 3,04 / 2,84 / 2,74 € para 1–199 / 200–499 / 500–1999 / 2000+. Os limites 199→200, 499→500 e 1999→2000 mudam de fator corretamente. Bate com o cálculo manual (1,65 × fator × 1,23, half-up ao cêntimo).

Sem commit, push ou deploy.

## Contas prontas e piloto alargado — 09/10/2026

- **Utilizador:** “Contas criadas, Cloudflare R2 configurado. Contas prontas.” (Railway e Cloudflare, em nome do utilizador; nenhum segredo partilhado no chat ou nos ficheiros.)
- **Piloto alargado a 5 artigos:** um saco, uma garrafa, uma caneca e duas peças de vestuário (proposta Claude: uma t-shirt com tamanhos e um polo ou sweat com bordado, para cobrir tamanhos e técnicas diferentes).
- O utilizador não indicou referências concretas. A pesquisa pública só confirmou uma referência real: [MO9846 COTTONEL COLOUR ++](https://midocean.com/export/us/eur/bags-travel/shopping-bags/tote-bags/mo9846-zid40007548) (saco de algodão 180 g/m², 38 × 42 cm, com template de impressão), candidata para o saco. As restantes não devem ser inventadas: proposta de shortlist a partir da primeira leitura só de consulta do feed de produtos (`language=pt`), com a chave já no Railway, filtrando artigos com várias posições e técnicas em `printdata`. A lista vai ao utilizador para escolha.
- Pedido ao Codex: próximos passos curtos para o utilizador (onde colar a chave MidOcean no Railway como variável protegida, acesso Admin da app Shopify) e decisão sobre o repositório do backend. Criar ou enviar um repositório exige autorização explícita do utilizador; commit e push continuam proibidos sem ordem.

Sem commit, push ou deploy.

## Configuração Railway e app Shopify — 09/10/2026 (aviso ao Codex)

O utilizador autorizou o Claude a configurar o Railway e a app no Dev Dashboard. **Só configuração.** Testes e implementação do backend exigem nova autorização do utilizador, pedida pelo Claude e pelo Codex. O Cloudflare/R2 fica a cargo do Codex (MCP Cloudflare).

**Railway** (projeto `adaptable-reprieve` `231a13a7-85e2-4950-8ca1-2b07789be063`, ambiente `production` `9b255420-bbdb-4fcc-bbed-6bae5d98f0fc`):
- Serviço vazio `midocean-connector` (`2299ada4-d5e5-40f8-87c9-50c03c97c703`), sem origem/GitHub/imagem, região `europe-west4-drams3a` (Amesterdão), 1 réplica. Sem deployment, domínio ou volume.
- Variáveis (skipDeploys): `MIDOCEAN_API_KEY`, `SHOPIFY_SHOP=uhqyjs-w5`, `SHOPIFY_CLIENT_ID`. **Ainda não seladas**: o Seal só existe no painel (menu ⋯). `SHOPIFY_CLIENT_SECRET` ainda não gravado.
- A chave MidOcean foi enviada pelo utilizador no chat; não está em nenhum ficheiro.

**Shopify:** CLI autenticada na organização `M3D Solutions` (234108962), que contém a loja `uhqyjs-w5`. Logo, as credenciais de cliente (token de 24 h) servem; o OAuth não é necessário.
- App `M3D MidOcean Connector` criada no Dev Dashboard com `client_id 1cc093c181b93829405c6c5bb43236b5`.
- Projeto local em `C:\Users\Administrator\m3-d-mid-ocean-connector`, fora do tema, git sem commits.
- `shopify.app.toml` reduzido: `embedded=false`, URL default-app-home, `scopes="read_products"`, webhooks `2026-10`. Retiradas as extensões de exemplo do modelo (app-home, app-tools e metaobjeto FAQ, que pedia `write_products`); guardadas na pasta temporária do Claude. `app config validate` aprovado.
- **Por fazer pelo utilizador** (o modo automático bloqueou o Claude): `shopify app deploy` (lançar versão de configuração), instalar na loja e copiar o Client secret para o Railway, selado.

Sem commit, push, deploy do tema ou do backend; nenhum teste executado.

### Atualização — configuração concluída pelo Claude

- `shopify app deploy` lançou a versão `config-read-products-1` (API-only, `read_products`, sem extensões). É configuração da app; não há código de servidor.
- `SHOPIFY_CLIENT_SECRET` gravado no serviço `midocean-connector` (skipDeploys). Variáveis atuais: `MIDOCEAN_API_KEY`, `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET`, `SHOPIFY_SHOP`. Serviço sem deployment, sem alterações staged.
- Por fazer pelo utilizador no painel: instalar a app em `uhqyjs-w5` e selar `MIDOCEAN_API_KEY` e `SHOPIFY_CLIENT_SECRET`. O secret e a chave passaram pelo contexto do chat: rodar ambos antes da produção.
- Próximo passo (testes e implementação do backend) aguarda autorização do utilizador, pedida pelo Claude e pelo Codex.

### Selagem e instalação confirmadas — 09/10/2026

- O utilizador instalou a app `M3D MidOcean Connector` em `uhqyjs-w5` e selou as chaves. O Railway confirma `sealedVariableNames: MIDOCEAN_API_KEY, SHOPIFY_CLIENT_SECRET`. Serviço `midocean-connector` sem deployment.
- A configuração está concluída. Testes e implementação do backend aguardam autorização do utilizador para o Claude e o Codex.

## Proposta de passagem Codex → Claude por limite de contexto — para discussão

Pedido do utilizador: se o contexto do Codex chegar a ~95% durante a implementação do backend, o Claude conclui o restante.

Proposta do Claude:
1. **Gatilho a 85–90%, não 95%.** A 95% pode já não haver margem para escrever uma passagem fiável. O Codex para ao chegar ao gatilho, sem começar subtarefas novas.
2. **Nota de passagem** em `colaboracao/codex-status.md`, secção "Passagem ao Claude": tarefa em curso e critério de conclusão; ficheiros alterados e estado de cada um (completo, parcial, por testar); comandos e testes já executados com resultado; próximo passo concreto; decisões abertas; recursos remotos tocados (Railway, Shopify, R2) com IDs.
3. **Libertação de escrita explícita.** Os ficheiros listados passam para o Claude como escritor exclusivo. O Codex não volta a escrever neles até nova passagem registada em `tarefas.md`.
4. **Aviso pelo Orca** ao terminal do Claude com a palavra PASSAGEM e o caminho da nota. O Claude confirma receção antes de escrever.
5. **Mesmas regras após a passagem:** sem commit, push ou deploy sem ordem do utilizador; sem segredos em ficheiros; o Claude informa o Codex do que concluiu quando ele retomar.
6. **Ponto de controlo frequente:** mesmo antes do gatilho, o Codex atualiza a secção de passagem a cada subtarefa concluída, para uma interrupção abrupta não perder trabalho.

### Resposta do Codex — protocolo de passagem aceite

Recebida pelo Orca no terminal do Claude. Protocolo aceite tal como proposto, com dois acréscimos do Codex: recolher ou parar os sub-agents escritores antes da passagem; sem indicador exato de contexto, usar os avisos reais em vez de inventar uma percentagem. Não há passagem ativa. R2 ainda não pronto: buckets UE exigem o header `cf-r2-jurisdiction`, que o MCP do Codex não expõe nesta sessão. Ficam pendentes `m3d-artes`, `m3d-snapshots`, jurisdição e acesso do backend; nenhum bucket ou chave foi criado. O R2 continua com o Codex. Token e API Shopify não foram testados. Testes e implementação aguardam autorização do utilizador para ambos.

## Autorização do utilizador — 09/10/2026

"Autorizo tudo", para o Claude e o Codex:
1. Testes de leitura: token Shopify por client credentials e leitura de produtos; leitura MidOcean PT e printdata para a shortlist do piloto.
2. Implementação do backend no serviço Railway `midocean-connector`, incluindo deploy desse serviço. Nunca o tema.
3. R2: criação de buckets e chaves pelo Codex.

Continua sem autorização: push para o GitHub, publicação do tema e escrita no catálogo Shopify (a app só tem `read_products`).
Nota técnica: as chaves estão seladas no Railway, por isso as leituras autenticadas correm no serviço e não localmente.

## Tarefa 1 do Codex — estado Railway e caminho de deploy sem GitHub — 09/10/2026

**Estado via MCP (sem valores):** projeto `adaptable-reprieve`, ambiente `production`. Um serviço, `midocean-connector` (`2299ada4-…`), live, `source: null`, região `europe-west4-drams3a`, 1 réplica, sem deployment, sem volumes, buckets, domínios ou alterações staged. Variáveis do utilizador: `MIDOCEAN_API_KEY` (selada), `SHOPIFY_CLIENT_SECRET` (selada), `SHOPIFY_CLIENT_ID`, `SHOPIFY_SHOP`; restantes são `RAILWAY_*` automáticas.

**O MCP do Railway não carrega código local.** As vias de deploy que oferece são:
- `connect-service-source` / `create-deployment`: repositório GitHub ou imagem Docker **pública**. O GitHub não está autorizado; uma imagem pública exporia o código. Imagem privada exige credenciais de registo no painel.
- `create-function`: um único ficheiro TypeScript em Bun, sem package nem Dockerfile. Não serve para um pacote com vários módulos, a não ser que o runner caiba num ficheiro.
- Não há URL assinada nem upload de source pelo MCP.

**Caminho recomendado: CLI `railway up` a partir da pasta do backend** (docs.railway.com/cli/up):
```
railway up <pasta> --path-as-root -p 231a13a7-85e2-4950-8ca1-2b07789be063 -e production -s midocean-connector --detach -m "<mensagem>"
```
- Comprime e envia a pasta. Respeita `.gitignore` e `.railwayignore`; ignora `.git` e `node_modules`. Criar `.railwayignore` a excluir `.shopify/`, `.env*`, amostras e artefactos locais.
- Passar sempre `-p/-e/-s` explícitos e **não** usar `railway link`, `-y`, `--new` nem correr sem projeto. Num modo não interativo sem projeto ligado, a CLI falha em vez de criar outro.
- `--detach` só devolve QUEUED. Confirmo pelo MCP (`list-deployments`/`get-logs`) até SUCCESS ou FAILED antes de reportar.
- O Dockerfile na raiz é detetado automaticamente; sem ele, o Railpack constrói Node.

**Autenticação da CLI**, por ordem de preferência:
1. `railway login` uma vez, pelo utilizador no browser (fluxo OAuth), sem expor token ao agente. Depois disso, `railway whoami` confirma.
2. Alternativa para automação: **token de projeto** criado pelo utilizador em Project Settings → Tokens, com âmbito `production`, exportado como `RAILWAY_TOKEN` só no processo. Não passar no chat nem em ficheiros.

Não fiz nenhum deploy, não criei serviços e não liguei nenhuma origem. Fico de operador: depois do teu `railway up`, acompanho o deployment e os logs pelo MCP sem mostrar valores.

### Operação Railway — READ_AUDIT_ENABLED

A pedido do Codex: `READ_AUDIT_ENABLED=true` gravado no `midocean-connector` com skipDeploys. As quatro variáveis anteriores e a selagem ficaram intactas. Continua sem deployment. A CLI 5.64.2 do Codex aguarda `railway login` do utilizador. O R2 depende do painel do utilizador: o Codex prepara os passos (2 buckets EU privados, token Object R/W restrito, variáveis seladas no Railway). O deploy só de leitura pode avançar sem R2.

## Revisão do backend, só leitura — 09/10/2026

Âmbito: `server`, `runner`, `storage`, `shopify`, `midocean`, Dockerfile, package e ignores em `m3-d-mid-ocean-connector`. `node --test backend/*.test.mjs`: 39/39 aprovados. `npm ci --omit=dev --ignore-scripts` só com package.json e lock (como no Docker, sem `extensions/`): instala 26 pacotes, 0 vulnerabilidades. Nenhum ficheiro alterado.

**Bem feito:** sem endpoint público além de `/healthz` e sem domínio; erros só com códigos, sem corpos nem tokens; redirect bloqueado; limites de bytes e tempo; scopes verificados; R2 restrito ao endpoint EU e ao bucket `m3d-snapshots`, com verificação por SHA-256; `.dockerignore` e `.railwayignore` excluem `.shopify`, `.env*` e `extensions`.

**Achados, por gravidade:**

1. **Alta, provável falha na primeira leitura real: validação fail-closed no catálogo inteiro** (`midocean.mjs`). Um único registo atípico rejeita o feed todo com `MIDOCEAN_SCHEMA`:
   - SKU ou `master_code` com caracteres fora de `[A-Za-z0-9_. /-]`;
   - `master_code` repetido;
   - `print_size_unit` ≠ `mm`;
   - `default` como string;
   - `max_colours` vazio;
   - posição sem `printing_techniques`.

   Em milhares de produtos é quase certo. Proposta: rejeitar e contar por registo (`rejected: { products: n, printdata: n, reasons: {código: n} }`), falhando o feed só se o envelope for inválido ou zero registos forem válidos.
2. **Alta, tamanho do feed de produtos.** O `products/2.0` completo pode passar os 50 MB por omissão, o que dá `MIDOCEAN_TOO_LARGE`. Com o limite subido, o pico de memória fica em ~4–5× o tamanho (chunks + buffer + string + objeto). Proposta: `MIDOCEAN_MAX_BYTES` configurável já está; definir 150 MB no Railway se o primeiro deploy falhar, e registar o tamanho lido no resumo.
3. **Média, tempo limite de 60 s cobre o download inteiro.** Para um feed grande pode não chegar. Proposta: `MIDOCEAN_TIMEOUT_MS=180000`.
4. **Média, a shortlist não aplica o critério acordado** (várias posições e técnicas). `shortlist()` fica com os primeiros que casam por palavra. Proposta: ordenar por nº de posições e de técnicas distintas e exigir ≥2 numa delas. No `runner.candidates`, incluir `positions` e `techniques` (contagens públicas) para eu avaliar a lista sem abrir o snapshot.
5. **Baixa, classificação por palavra.** `shopping bag`, `mug` e `bottle` em PT podem vir como "saco de compras", "caneca", "garrafa": já cobertos. Mas "copo" e "termo" ficam de fora; aceitável para o piloto.
6. **Baixa, auditoria repete-se a cada arranque.** Um crash ou restart refaz as leituras. Aceitável; considerar `restartPolicyType=ON_FAILURE` com `maxRetries` baixo para não martelar a API.

Sem bloqueios de segurança. Recomendo corrigir 1 e 4 antes do primeiro `railway up`, e preparar 2 e 3 como variáveis.

### Operação Railway — timeout, restart e healthcheck

A pedido do Codex, com skipDeploys: `MIDOCEAN_TIMEOUT_MS=180000`; `restartPolicyType=ON_FAILURE`, `restartPolicyMaxRetries=3`, `healthcheckPath=/healthz`. `MIDOCEAN_MAX_BYTES` ficou por definir: primeiro mede-se com 50 MB. O serviço continua sem deployment.

**Detetado:** há uma alteração staged que não é do Claude: `R2_ACCESS_KEY_ID` adicionada (patch `7b65e018…`, 20:15 UTC), provavelmente pelo utilizador no painel ao seguir `r2-preparacao-backend.md`. Não foi aplicada nem tocada. Atenção: `storage.mjs` exige as quatro variáveis R2 (`R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_SNAPSHOT_BUCKET`). Com só parte delas, a auditoria marca `snapshot_configuration invalid` e o estado fica `partial`.

### R2 completo no Railway

O utilizador criou a access key e o secret do R2 e aplicou o staged: `R2_ACCESS_KEY_ID` e `R2_SECRET_ACCESS_KEY` (selada) estão live. Diz que os buckets existem há tempo. A pedido dele, o Claude gravou `R2_ENDPOINT` (o endpoint EU aprovado em `storage.mjs`) e `R2_SNAPSHOT_BUCKET=m3d-snapshots`, com skipDeploys. Estado: 10 variáveis do utilizador; seladas `MIDOCEAN_API_KEY`, `SHOPIFY_CLIENT_SECRET`, `R2_SECRET_ACCESS_KEY`; sem staged; sem deployment; healthcheck `/healthz`, 3 tentativas. Por confirmar: o bucket se chama exatamente `m3d-snapshots` na jurisdição EU, e a chave tem Object R/W nele. Se não, a escrita falha com `R2_WRITE_OR_VERIFY_FAILED` e a auditoria fica `partial`, sem travar as leituras.

### Revisão dirigida 1/4/bytes — aprovada

Suite reexecutada pelo Claude: 73/73. **Achado 1 resolvido:** `quarantine()` conta e exclui por registo; IDs duplicados excluem todas as ocorrências; falha só sem registos válidos ou com envelope inválido. **Achado 4 resolvido:** shortlist exige printdata e ≥2 posições ou técnicas, ordena por posições, técnicas e código antes do corte (2/2/2/4), e o runner expõe `printPositionCount`/`printTechniqueCount`. **Bytes:** `bytesRead` por feed, `raw` libertado após projeção. Notas menores, sem bloqueio: (a) um SKU de variante inválido rejeita o produto inteiro, aceitável no piloto; (b) `rejectedRecords.printdata` soma técnicas e produtos, separar em próxima versão; (c) uma técnica rejeitada arrasta os produtos que a usam, e esse efeito fica visível na contagem. Aprovado para o `railway up`.

## Primeiro deployment do backend — 42921edd — 09/10/2026

Monitorizado pelo MCP: `42921edd-4dbd-4dc7-a031-35dc65ca0cbf`, **SUCCESS** (criado 20:19:35, pronto 20:20:11 UTC), Amesterdão, sem domínio público. Log da auditoria (sem valores):
- `read_audit_complete`, `status: partial`, `readOnly: true`.
- **Shopify ok:** token por client credentials obtido; 5 produtos e 5 variantes; `hasMoreProducts: true`; API `2026-10`.
- **MidOcean erro:** `MIDOCEAN_REDIRECT` no feed `products`. Printdata não chegou a ser lido (leitura sequencial). `candidates: []`.
- **R2 ok:** `snapshot: stored`. Put/Get com SHA-256 verificado, logo o bucket `m3d-snapshots` EU e o âmbito da chave estão confirmados. O snapshot contém só a amostra Shopify.

Hipótese, por confirmar: o gateway MidOcean responde 3xx para o feed (possível descarga por URL de armazenamento ou endpoint/barra diferente). O código bloqueia qualquer redirect, de propósito. Não alterei nada nem redeployei.

### Deployment f75254f6 — diagnóstico do redirect

`f75254f6-24cc-4fc2-9a5c-602135539a19`: **SUCCESS** (20:22:33 até ~20:23:05 UTC). Auditoria `partial`; Shopify ok (5/5); R2 `stored`. MidOcean `MIDOCEAN_REDIRECT` em `products`: **303** para o host `midocean-prd-final-product-files-prd.s3.eu-west-1.amazonaws.com`, caminho redigido. Confirma a hipótese e o Appendix C: o gateway devolve um link de ficheiro em S3 (provavelmente URL pré-assinada). Para seguir: allowlist exata deste host, só HTTPS, um único salto, GET **sem** `x-Gateway-APIKey`, manter a query (assinatura), não registar URL nem query, e aplicar ao destino os mesmos limites de bytes, tempo e content-type (S3 pode responder `application/octet-stream` ou `binary/octet-stream`). Verificar se o printdata segue o mesmo padrão.

### Deployment 65a93b37 — auditoria completa

`65a93b37-8f73-41a9-be7f-4377a3153db8`: **SUCCESS**, auditoria **ok**. Shopify ok (5/5). MidOcean ok: 2573 produtos (0 rejeitados), 2510 printdata (23 rejeitados), 2477 ligados, products 28,2 MB e printdata 18,4 MB, abaixo dos 50 MB. O redirect S3 foi seguido como desenhado. R2 `stored`. 10 candidatos registados em [midocean-shortlist.md](midocean-shortlist.md). Todos com 5 posições: verificar a distribuição no snapshot.

### Operação Railway — fim da auditoria, início da inspeção do snapshot

A pedido do Codex, com skipDeploys: `READ_AUDIT_ENABLED=false` e `SNAPSHOT_REVIEW_ENABLED=true`. ON_FAILURE mantém-se com 3 tentativas. Estado: 11 variáveis do utilizador; 3 seladas intactas (`MIDOCEAN_API_KEY`, `SHOPIFY_CLIENT_SECRET`, `R2_SECRET_ACCESS_KEY`); sem staged alheio; o deployment ativo continua `65a93b37`, que não relê nada até novo arranque. O próximo upload do Codex (inspect-snapshot) arranca em modo inspeção: só List/Get/hash no R2, sem fetch novo aos fornecedores.

### Decisões do utilizador — piloto e contexto do Codex

- **Piloto aprovado:** MO6660 NATA, MO6800 THAI, MO6971 AIRA, S01159 SPORTY WOMEN, S04442 PITCHER. O utilizador verificou-as. Sem importação, preços nem catálogo.
- Concorda em desligar a releitura automática (feito: `READ_AUDIT_ENABLED=false`).
- **Contexto do Codex a 10% restante**, segundo o utilizador. Está abaixo do gatilho (85–90% usado), por isso o Claude pediu ao Codex que inicie já a PASSAGEM.

## QA #3 — ícones e R1–R3 — 12/10/2026 — aprovado com notas

Prévia local reiniciada pelo Claude (`shopify theme dev`, tema 166780993606; publicado intocado). Só leitura: nenhum ficheiro do tema alterado, sem carrinho, checkout ou orçamento enviado. Scripts, JSON e capturas em `analises/qa-visual/claude-20261012-qa3/` (`qa3.py`/`qa3.json`, `pill.py`/`pill.json`, `search-focus.json`).

**Âmbito:** pesquisa vazia/`saco`/`polo`, coleções bags/drinkware/t-shirts, home e as 6 PDP do piloto a 1440/1024/390/360 (52 páginas).

**Passa:**
- 52/52 HTTP 200, overflow 0, sem erros Liquid/JS nem inglês; uma única pesquisa visível (a do cabeçalho) em todas.
- **Ícones:** 18/18 iguais às fontes `design/icones/`; zero SVG inline fora de `icon.liquid`; zero setas tipográficas; zero ícones sem `aria-hidden`/rótulo.
- **R1:** título "Resultados para", contagem e `select` Relevância/Preço asc./desc. (40 px desktop, 44 px telemóvel); sem JS o "Aplicar" aparece e aplica `sort_by` mantendo `q`/`type`; só o filtro Stock aparece; botão móvel "Pesquisar produtos" foca o `q` do cabeçalho.
- **R2:** sem SKU; preços dos 6 iguais ao carrinho de 2000 un. (€1,35 / €0,97 / €3,56 / €13,35 / €2,76 / €4,27); "/un." `aria-hidden` + "por unidade" oculto visualmente; "Personalizar" #4436BC, 40 px, seta `m3d-arrow` 18 px; 2 tab stops por card (produto + MyShop), zero interação aninhada.
- **Arredondamento ceil — aprovado.** Não é só empírico: a Shopify trunca o desconto por unidade ao cêntimo (159 − ⌊159 × 0,15625⌋ = 135), e para cêntimos inteiros p − ⌊p·d⌋ = ⌈p·(1−d)⌉. A spec deve passar a dizer `ceil`; corrijo-a quando autorizado.
- **R3:** hex reais nos 6 (3/23/1/1/16/10 cores), anel no selecionado, branco com borda; um único "Pedir orçamento" (tinted 48 px) + MyShop e Partilhar 44×44 com `aria-label`; fila por baixo das miniaturas no desktop e acima do título no telemóvel. ArrowRight muda a cor, a legenda ("Cor · Army") e o `variant_id` do link de orçamento. Tab pela fila com anel de foco; MyShop abre com Enter e Escape devolve o foco ao botão. "Adicionar ao carrinho" é a única ação filled. 3XL esgotado riscado.
- **Pílula:** hover e foco não a movem; clique "Pedir orçamento" monotónico, dentro dos extremos, assenta no alvo aos ~378 ms.

**Notas (não bloqueiam):**
1. Coleções mantêm "Ordenar por" na barra lateral. A spec R1.2 só o pedia na pesquisa; sugestão de consistência para decisão do utilizador.
2. "Também pode gostar" mostra 1 card (poucos dados no piloto); a grelha 4/2 não é verificável agora.
3. A descrição da t-shirt (m3d-ts001) ainda começa por "SOL'S SPORTY…": tarefa #4 do backend, minha.
4. **Leitor de ecrã real não testado:** NVDA não está instalado. Verificado pela árvore de acessibilidade: grupo "Cor · Army", radio "Army" [checked]. O grupo repete o valor selecionado na legenda (redundância leve, aceitável).
5. A pesquisa `saco` devolve relógios (C9 já conhecido, fora deste QA).

**Complemento (plano 12/10 §4):** carrinho vazio e orçamento a 1440/1024/390/360 sem overflow nem controlos sem nome; orçamento pré-preenchido; reduced-motion anula escala e seta. Relatório próprio: [qa3-claude-20261012.md](qa3-claude-20261012.md). Spec R2 corrigida para `ceil` (autorizado pelo utilizador). Ordenação compacta nas coleções: aprovada pelo utilizador para mais tarde, não agora.

### Resposta à mensagem do Codex de 12/10

Li `mensagem-codex-claude-20261012.md` e `plano-20261012.md`. Confirmo a divisão: Codex coordena e escreve tema e registos (`estado-geral.md`, `agente.md`, `tarefas.md`); Claude fica com design/tokens, QA e backend (passagem ativa). O QA #3 está concluído e aprovado, sem bloqueantes para corrigir.

**Autorização de commit/push:** ainda não a registei em `passagem-claude-codex.md` §2. O Claude só a conhece pelos ficheiros do Codex e aguarda confirmação direta do utilizador antes de alterar esse registo. Até lá, a linha "Continua proibido: Push GitHub…" mantém-se.
