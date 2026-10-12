# D2 — Jornadas B2C/B2B e arquitetura de informação

Data: 08/10/2026. Autor: sub-agent D2 (equipa de Design System do Claude, execução nativa do Claude Code, não é trabalhador Orca).
Estado: **proposta para revisão do Claude e do Codex**. Nada aqui foi implementado. Não alterei o tema, o Admin, o catálogo nem outros documentos.

Fontes lidas: `AGENTS.md`, `codexclaude.md`, `colaboracao/claude-review.md`, `colaboracao/codex-review.md`, `analises/2026-10-07/01-analise-visual-m3d.md`, `analises/2026-10-07/02-pesquisa-b2c-estrutura-conversao.md`, `arquitetura-mvp-2026.md`, `agente.md` (só para rotas e handles já registados). Código: `templates/index.json`, `templates/product.json`, `templates/page*.json`, `sections/m3d-home.liquid`, `sections/nav.liquid`, `sections/main-product.liquid`, `sections/main-collection.liquid`, `snippets/card-product.liquid`, `snippets/price.liquid`, `sections/footer.liquid`, `sections/footer-group.json`, `sections/header-group.json`, `sections/contact-form.liquid`, `assets/m3d-product.js`, `locales/en.default.json`.

Convenções:

- **[Obs]**: observado no código ou na inspeção de 07/10.
- **[Hip]**: hipótese de projeto derivada da pesquisa. Não está medida na M3D.
- **[Dep]**: depende de conteúdo ou de uma decisão comercial (ver §7).
- **Rota confirmada** quer dizer que existe no código do tema ou está registada em `agente.md`. Não verifiquei por HTTP nesta tarefa.

Decisões aceites que este documento respeita sem as reabrir:

- Não há seletor obrigatório particular/empresa.
- Hero estável.
- CTA primário roxo `#4436BC` com texto branco.
- "Sob consulta" coerente entre card e PDP, e o carrinho mantém os valores reais.
- Variante única e quantidade inline, sem modal.
- MyShop como ação terciária demonstrativa.
- Orçamento com `{% form 'contact' %}`.
- Navegação com 7 itens pela ordem atual.

---

## 0. Achados de código que condicionam as jornadas

| # | Achado [Obs] | Onde | Efeito na jornada |
| --- | --- | --- | --- |
| A1 | `templates/index.json` tem `"settings": {}`. Os 12 settings `url` da homepage estão vazios, por isso todos os `href` ficam vazios e resolvem para a raiz. | `m3d-home.liquid` + `index.json` | Confirma no código os 12 links mortos da análise 1 |
| A2 | Sem coleção configurada, "Novidades" mostra 4 placeholders "Produto personalizável", que não são links. O link "Ver novidades" fica oculto. | `m3d-home.liquid` | Não há nenhum produto real na homepage |
| A3 | Na navegação, `quote_url`, `inspiration_url` e `about_url` usam `routes.root_url` por defeito, e `header-group.json` não tem settings. **O item "Pedir orçamento" da navegação leva à raiz.** | `nav.liquid` l. 5–7 | O B2B não tem caminho pela navegação. A PDP, pelo contrário, já usa `pages['pedir-orcamento']` |
| A4 | O menu mobile mostra só 5 itens: falta Coleções e falta **Pedir orçamento**. | `nav.liquid` l. 130–136 | No mobile, a ação B2B desaparece da navegação. A regra dos 7 itens descreve a navegação desktop; compete ao líder decidir se também se aplica ao mobile |
| A5 | As 11 "categorias" do mega menu são **páginas** (`pages[handle]`), não coleções. O template `page.json` só renderiza `main-page` (título e conteúdo). | `nav.liquid` l. 16, 99–104 | Uma categoria pode abrir uma página de texto sem produtos. Ver §3 |
| A6 | Na PDP com preço 0, o CTA diz "Preço sob consulta", que é um estado e não uma ação. A ligação vai para `/pages/pedir-orcamento` sem contexto do produto. | `main-product.liquid` l. 16–19, 132 | A pessoa chega a uma página vazia sem saber o que acontece a seguir |
| A7 | O card usa o snippet `price`, que mostra `€0,00`. Com variantes mistas, mostra "Desde €0,00". O badge "Esgotado" aparece em produtos sob consulta com stock 0. | `card-product.liquid`, `price.liquid` | Incoerência entre card e PDP (D-07) |
| A8 | Há textos em inglês na loja: `add_to_cart: "Add to cart"`, `unavailable: "Unavailable"` e todo o `templates.contact.form.*` ("Name", "Send", "Thanks for contacting us…"). | `locales/en.default.json` | Os CTAs principais e o formulário aparecem em inglês. Os nomes dos campos `contact[...]` herdam esses rótulos |
| A9 | O modal de personalização da PDP tem upload de logótipo (`properties[Logótipo]`) para a linha do carrinho. | `main-product.liquid` | É válido no carrinho. **Não** se transfere para o orçamento (sem anexos, D-06) |
| A10 | O coração "Guardar" do card só alterna `aria-pressed`, sem persistência. As lojas do MyShop são fictícias ("Google Summer Event"…). | `card-product.liquid` | São affordances demonstrativas que precisam de ser assinaladas como tal (ver §6) |
| A11 | O rodapé não tem settings em `footer-group.json` e a lista "Quick links" usa por defeito o menu `footer`, cujo conteúdo não é visível no repositório. | `footer.liquid` | A ajuda pós-decisão (entregas, devoluções, contacto) não está garantida |

---

## 1. Personas mínimas e perguntas-chave

Ambas são **[Hip]**: assentam na análise 1 (observação heurística da loja) e na análise 2 (pesquisa externa). Nenhuma foi validada com clientes da M3D.

### P1 — Particular (PT/ES)

Compra 1 a poucas unidades, para oferecer (aniversário, Natal, agradecimento) ou para uso próprio. Pode querer o nome ou uma imagem na peça. Compara com lojas de presentes personalizados e espera preço visível, prazo e custo de envio antes de decidir. Usa sobretudo o mobile [Hip].

### P2 — Comprador empresarial

Trabalha em marketing, RH, eventos ou na gestão do escritório de uma PME, ou associação. Procura merchandising com o logótipo para um evento, para kits de boas-vindas ou para oferecer a clientes. Compra em quantidade, aceita pedir orçamento e precisa de saber técnicas, mínimos e que tipo de resposta vai receber. Usa sobretudo o desktop durante o horário de trabalho [Hip].

Caso intermédio: um profissional independente ou um pequeno negócio que quer 10 a 30 unidades. Usa o percurso de P1 quando há preço e o de P2 quando não há. Por isso o desenho não separa as personas por seletor: separa-as **pelo estado comercial do produto** (preço ou orçamento).

### Perguntas por etapa

| Etapa | P1 — Particular | P2 — Empresa | Resposta que o tema deve dar |
| --- | --- | --- | --- |
| Entrada | "Isto é para mim ou só para empresas?" | "Fazem merchandising com a minha marca, nas quantidades de que preciso?" | O H1 e o texto do hero nomeiam os dois públicos. Há um CTA primário para explorar e um secundário para orçamento |
| Descoberta | "Que produtos há e quais posso personalizar?" | "Têm a categoria que procuro (garrafas, vestuário, tecnologia)?" | Categorias logo a seguir ao hero, uma seleção de produtos reais e pesquisa visível |
| Avaliação | "Quanto custa? Como fica? Quando chega?" | "Que técnicas, posições e áreas há? Há stock? Qual é o mínimo?" | A PDP mostra preço ou "Sob consulta", as opções reais e a personalização com limites. Prazos e mínimos só aparecem quando confirmados [Dep] |
| Ação | "Consigo comprar já?" | "Como peço um orçamento com o meu contexto?" | Botão "Adicionar ao carrinho" quando há preço. "Pedir orçamento", com o produto já indicado, quando não há |
| Pós-ação | "Ficou no carrinho? O que falta?" | "O pedido foi enviado? O que acontece agora?" | Confirmação visível no carrinho. No orçamento, a mensagem de sucesso só aparece com `posted_successfully?` e não indica prazo |

---

## 2. Arquitetura proposta da homepage

Ordem baseada na hierarquia do §9 do acordo e na tabela de blocos da análise 2 [Hip]. As categorias passam para cima, logo a seguir ao hero (hoje estão em y≈2555 px no desktop [Obs]). A primeira vitrine de produtos passa para antes das campanhas (hoje está em y≈1339 px [Obs]).

| # | Bloco | Objetivo | Conteúdo real disponível hoje | Conteúdo em falta | CTA |
| --- | --- | --- | --- | --- | --- |
| 0 | Barra de benefícios (já existe no `nav`) | Orientar sem prometer | 3 textos genéricos ("Personalização à sua medida", "Soluções para empresas", "Produtos para cada ocasião") | Uma condição real de envio, só se existir [Dep] | Nenhum |
| 1 | Cabeçalho (já existe) | Identidade, pesquisa, conta e carrinho, com os 7 itens | Completo no desktop | Rotas de Inspiração, Sobre a M3D e Pedir orçamento (A3). Itens em falta no mobile (A4) | Itens da navegação |
| 2 | **Hero estável** | Dizer o que se vende e a quem. Uma ação predominante | Imagem `bannerprincipal.png` (guarda-sol, conotação B2B). A copy atual fala de "a sua marca" | Uma imagem neutra para particulares e empresas, por exemplo um produto personalizado em uso pessoal [Dep]. Uma copy dirigida aos dois públicos | Primário: **Explorar produtos**. Secundário: **Pedir orçamento para empresas** |
| 3 | **Categorias** (sobe) | "Por onde começo?" | 5 cards com imagem: Negócios e escritório, Tecnologia e estilo de vida, Presentes sazonais, Vestuário personalizado, Copos e garrafas | Destinos com produtos (A5). Imagens otimizadas (C4) | Cada card abre a sua categoria. "Ver todas as categorias" abre `/collections` |
| 4 | **Produtos em destaque** (sobe) | "O que posso comprar ou pedir agora?" | Coleção `wrist-watches` (17 produtos, todos sob consulta [Obs], com a inconsistência Carlsberg/Jeep) | Uma seleção comercial real, com pelo menos alguns produtos com preço [Dep D-01]. Nomes e imagens corretos | Cada card abre a PDP. "Ver todos" abre a coleção escolhida |
| 5 | **Como funciona** (substitui "Imagine. Nós produzimos.") | Explicar a personalização em passos verdadeiros | Texto atual genérico | Técnicas reais por produto (há metafields para isso, mas não está confirmado que estejam preenchidos) | **Ver produtos personalizáveis** (rota a confirmar) ou **Pedir orçamento** |
| 6 | **Campanhas** (2 cards, mais baixos) | Inspiração ligada a destinos reais | Vestuário ("Veste o Inverno") e Pequenos gestos, com imagens | Destinos de coleção. A validade de "Veste o Inverno" é sazonal | **Explorar vestuário** / **Explorar brindes** |
| 6b | Campanha de Natal (o atual slide 2) | Promoção ao consumidor | A arte `banner-natal.webp` ("até 20%") | A validade da promoção e uma coleção de destino [Dep]. **Não deve aparecer** sem ambas | **Ver produtos em campanha** (rota a confirmar) |
| 7 | **Para empresas** | Um percurso B2B identificável sem um seletor | O texto do editorial atual ("Para o trabalho, para uma equipa…") pode servir de base | Informação real sobre quantidades, técnicas e forma de resposta [Dep]. Exemplos de trabalhos, só com autorização [Dep] | Primário dentro do bloco: **Pedir orçamento**. Terciário: **Conhecer o MyShop**, com ícone e a nota "em preparação" |
| 8 | Prova verificável | Confiança | **Nada verificável hoje.** As fotos com marcas (Kopke, Castrol, Depil) não comprovam uma relação comercial [Obs] | Trabalhos autorizados ou reviews reais [Dep] | Bloco **oculto** até haver conteúdo |
| 9 | **Ajuda e contacto** | Fechar dúvidas e dar uma saída B2B | A banda "Uma ideia em mente? Vamos dar-lhe forma." | Páginas de entregas, devoluções e pagamentos [Dep] | **Pedir orçamento**, mais links de ajuda quando existirem |
| 10 | Rodapé | Políticas, contacto e redes | Estrutura com blocos sem conteúdo | Menu `footer` real, contactos e políticas [Dep] | Links de ajuda |

Proposta de copy para o hero, em PT-PT [Hip], a validar pelo D4. Não promete prazo, preço nem mínimo.

- Antetítulo: `Merchandising personalizado`
- H1: `Peças com o seu nome ou a sua marca`
- Texto: `Escolha o produto, diga-nos como o quer personalizar e encomende online ou peça um orçamento para a sua empresa.`
  - A expressão "encomende online" só é verdadeira se existirem produtos com preço. Se D-01 não estiver resolvido, usar `Escolha o produto e diga-nos como o quer personalizar. Para quantidades ou projetos de empresa, peça um orçamento.`
- CTA primário: `Explorar produtos`. CTA secundário: `Pedir orçamento para empresas`.

### Wireframe desktop (1440, conteúdo até 1288)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Personalização à sua medida · Soluções para empresas · Produtos p/ ocasião   │ barra 30px
├──────────────────────────────────────────────────────────────────────────────┤
│ [LOGO]                         [ Pesquisar produtos…      🔍]  [A minha conta] 🛒│
├──────────────────────────────────────────────────────────────────────────────┤
│ (Coleções ›) Produtos  Vestuário  MyShop  Inspiração  Sobre a M3D  Pedir orçamento →│
╞══════════════════════════════════════════════════════════════════════════════╡
│ ┌───────────────────────────────┬──────────────────────────────────────────┐ │
│ │ MERCHANDISING PERSONALIZADO   │                                          │ │
│ │ Peças com o seu nome          │        [ imagem estável: produto         │ │ hero
│ │ ou a sua marca                │          personalizado em uso ]          │ │ ~560px
│ │ Escolha o produto, diga-nos…  │                                          │ │ (sem dots,
│ │ [■ Explorar produtos →]       │                                          │ │  sem autoplay)
│ │ [□ Pedir orçamento p/ empresas]│                                          │ │
│ └───────────────────────────────┴──────────────────────────────────────────┘ │
│                                                                              │
│ Encontre a sua próxima ideia                         Ver todas as categorias →│
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                       │
│ │ img    │ │ img    │ │ img    │ │ img    │ │ img    │  5 cards ≈ 240×280    │
│ │Negócios│ │Tecnolog│ │Presente│ │Vestuár.│ │Copos e │                       │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘                       │
│                                                                              │
│ Em destaque                                                     Ver todos → │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                          │
│ │  foto    │ │  foto    │ │  foto    │ │  foto    │                          │
│ │ Nome     │ │ Nome     │ │ Nome     │ │ Nome     │                          │
│ │ 12,90 €  │ │ Sob cons.│ │ Desde 8 €│ │ Sob cons.│                          │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                          │
│                                                                              │
│ Como funciona a personalização                                               │
│ ① Escolha o produto   ② Indique a personalização   ③ Compre ou peça orçamento│
│                                            [Ver produtos personalizáveis →] │
│                                                                              │
│ ┌──────────────────────────────────┐ ┌──────────────────────────────────┐    │
│ │ VESTUÁRIO E TÊXTEIS   img        │ │ BRINDES COM IDENTIDADE  img      │ ~260px
│ │ Veste o Inverno.                 │ │ Pequenos gestos.                 │    │
│ │ [Explorar vestuário →]           │ │ [Explorar brindes →]             │    │
│ └──────────────────────────────────┘ └──────────────────────────────────┘    │
│                                                                              │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ PARA EMPRESAS                      │  img editorial (mochila/garrafa)    │ │
│ │ Merchandising para equipas,        │                                     │ │
│ │ eventos e clientes                 │                                     │ │
│ │ Diga-nos o produto, a quantidade e │                                     │ │
│ │ a personalização. Respondemos por  │                                     │ │
│ │ e-mail com uma proposta.           │                                     │ │
│ │ [■ Pedir orçamento →]  ◇ Conhecer o MyShop (em preparação)               │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ [ bloco de prova: OCULTO até haver conteúdo verificável ]                    │
│                                                                              │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Uma ideia em mente? Vamos dar-lhe forma.            [■ Pedir orçamento →]│ │
│ │ Ajuda: Entregas · Devoluções · Contacto  (só links que existam)          │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ RODAPÉ: marca · ajuda · políticas · redes · pagamentos                       │
└──────────────────────────────────────────────────────────────────────────────┘
■ = primário roxo/branco   □ = secundário contorno   ◇ = terciário com ícone e rótulo
```

### Wireframe mobile (390, gutter 16–20)

```
┌──────────────────────────────┐
│ Personalização à sua medida  │ barra 26px
├──────────────────────────────┤
│ ☰        [LOGO]           🛒 │
│ [ Pesquisar produtos…   🔍 ] │ ← pesquisa exposta (hoje só no menu) [Hip]
╞══════════════════════════════╡
│ MERCHANDISING PERSONALIZADO  │
│ Peças com o seu nome         │ H1 ≤ 3 linhas
│ ou a sua marca               │
│ Escolha o produto…           │
│ [■ Explorar produtos    →]   │ largura total, 48px
│ [□ Pedir orçamento p/ empr.] │
│ ┌──────────────────────────┐ │
│ │ imagem 16:9              │ │ imagem depois do texto: CTA na 1.ª janela
│ └──────────────────────────┘ │
│ Encontre a sua próxima ideia │
│ ┌──────┐┌──────┐┌──          │ faixa horizontal, 72% + espreitar
│ │Negóc.││Tecno.││Pre         │
│ └──────┘└──────┘└──          │
│ Ver todas as categorias →    │
│ Em destaque                  │
│ ┌──────────┐┌──────────┐     │ grelha 2 col. (em vez de faixa) [Hip]
│ │ foto     ││ foto     │     │
│ │ Nome     ││ Nome     │     │
│ │ 12,90 €  ││ Sob cons.│     │
│ └──────────┘└──────────┘     │
│ (+2)          Ver todos →    │
│ Como funciona                │
│ ① Escolha o produto          │
│ ② Indique a personalização   │
│ ③ Compre ou peça orçamento   │
│ ┌──────────────────────────┐ │
│ │ Veste o Inverno.   img   │ │ campanhas empilhadas, ~220px
│ │ [Explorar vestuário →]   │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Pequenos gestos.   img   │ │
│ │ [Explorar brindes →]     │ │
│ └──────────────────────────┘ │
│ PARA EMPRESAS                │
│ Merchandising para equipas…  │
│ [■ Pedir orçamento      →]   │
│ ◇ Conhecer o MyShop          │
│ Uma ideia em mente?          │
│ [■ Pedir orçamento      →]   │ (se repetir, considerar só link de ajuda)
├──────────────────────────────┤
│ Rodapé                       │
└──────────────────────────────┘
Menu ☰: Coleções · Produtos · Vestuário · MyShop · Inspiração · Sobre a M3D · Pedir orçamento
(proposta: repor Coleções e Pedir orçamento, A4 — decisão do líder)
```

---

## 3. Mapa de CTAs e links da homepage

**Estado atual:** os 12 settings `url` estão vazios (A1). A coluna "Destino atual" mostra, por isso, `""` → raiz para todos.

Rotas confirmadas, sem verificação HTTP:

- `routes.all_products_collection_url` (`/collections/all`) e `routes.collections_url` (`/collections`, template `list-collections.json`).
- `/pages/pedir-orcamento` (página criada, registada em `agente.md`) e `/pages/contact`.
- `/collections/wrist-watches` (17 produtos) e `/collections/bags` (registada na prévia, com 0 produtos no canal na altura).
- As 11 páginas de categoria do `nav`: `campanhas-sazonais`, `casa-e-bem-estar`, `copos-e-garrafas`, `escritorio-e-escrita`, `eventos-e-feiras`, `ideias-para-o-dia-a-dia`, `kits-de-boas-vindas`, `malas-e-viagens`, `presentes-para-equipas`, `tecnologia`, `vesturio-e-acessrios`. O último handle tem a grafia corrompida; está assim no código.

Regra de destino proposta:

- Se existir uma **coleção** equivalente, o link vai para a coleção, porque mostra produtos.
- Se não existir, vai para a página de categoria, mas só se essa página tiver conteúdo útil.
- Se nenhuma servir, o C1 regista "a confirmar" e **o bloco não mostra o link**, em vez de cair na raiz.

| # | Setting | Rótulo atual | Destino atual | Promessa (o que a pessoa espera) | Destino proposto | Rótulo proposto | Ação seguinte esperada |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `hero_link` | Descobrir soluções | `""` → raiz | Ver o que a M3D vende | `/collections/all` (confirmada) | Explorar produtos | Filtrar e abrir uma PDP |
| 1b | *(novo)* | — | — | Pedir um orçamento empresarial | `/pages/pedir-orcamento` (confirmada) | Pedir orçamento para empresas | Preencher o formulário genérico |
| 2 | `vestuario_link` | Explorar vestuário | `""` → raiz | Ver vestuário personalizável | Coleção de vestuário: **rota a confirmar pelo Codex/C1**. Alternativa: `/pages/vesturio-e-acessrios` (confirmada no código; conteúdo desconhecido) | Explorar vestuário | Abrir uma PDP de vestuário |
| 3 | `gestos_link` | Explorar brindes | `""` → raiz | Ver brindes pequenos e ofertas | **Rota a confirmar pelo Codex/C1**. Páginas candidatas: `ideias-para-o-dia-a-dia`, `presentes-para-equipas` | Explorar brindes | Abrir uma PDP |
| 4 | `products_link_label` (usa `collection.url`) | Ver novidades | Oculto (sem coleção) | Ver a seleção completa | URL da coleção escolhida. Hoje a única com produtos confirmados é `/collections/wrist-watches` [Dep: seleção comercial] | Ver todos | Abrir uma PDP |
| 5 | `custom_link` | Começar o meu projeto | `""` → raiz | Começar uma personalização | `/pages/pedir-orcamento` (confirmada). Uma página "Personalização e impressão" seria melhor, mas não existe (`personalization_url` também está vazio) → **rota a confirmar** | Ver produtos personalizáveis, ou Pedir orçamento enquanto não houver coleção | Escolher um produto ou preencher o pedido |
| 6 | `editorial_link` | Descobrir a seleção | `""` → raiz | Ver a seleção "para o trabalho e equipas" | **Rota a confirmar pelo Codex/C1**. Páginas candidatas: `escritorio-e-escrita`, `kits-de-boas-vindas`. Na proposta, o bloco passa a "Para empresas" e o CTA passa a `/pages/pedir-orcamento` | Pedir orçamento | Preencher o pedido |
| 7 | `categories_link` | Todas as categorias | `""` → raiz | Ver a lista de categorias | `/collections` (confirmada, `list-collections`) | Ver todas as categorias | Escolher uma coleção |
| 8 | `business_link` | Negócios e escritório | `""` → raiz | Produtos de escritório | Coleção: **a confirmar**. Alternativa: `/pages/escritorio-e-escrita` | (mantém) | Abrir uma PDP |
| 9 | `technology_link` | Tecnologia e estilo de vida | `""` → raiz | Produtos de tecnologia | Coleção: **a confirmar**. Alternativa: `/pages/tecnologia` | (mantém; rever a imagem do cubo luminoso) | Abrir uma PDP |
| 10 | `gifts_link` | Presentes sazonais | `""` → raiz | Presentes para uma ocasião | Coleção: **a confirmar**. Alternativa: `/pages/campanhas-sazonais` | Presentes sazonais | Abrir uma PDP |
| 11 | `wear_link` | Vestuário personalizado | `""` → raiz | Vestuário | O mesmo destino do #2 (**a confirmar**) | (mantém) | Abrir uma PDP |
| 12 | `bottles_link` | Copos e garrafas | `""` → raiz | Copos e garrafas | Coleção: **a confirmar**. Alternativa: `/pages/copos-e-garrafas` | (mantém) | Abrir uma PDP |
| 13 | `contact_link` | Pedir orçamento | `""` → raiz | Contactar a M3D com um pedido | `/pages/pedir-orcamento` (confirmada) | Pedir orçamento | Preencher o formulário genérico |
| — | Slide 2 (Natal) | *(sem link)* | — | "Até 20% em produtos selecionados" | Fora do hero. Só volta com validade e coleção confirmadas [Dep] | Ver produtos em campanha | Abrir uma PDP com desconto real |

Links do cabeçalho com o mesmo problema. Estão fora do conteúdo principal, mas afetam as jornadas.

| Item | Destino atual | Destino proposto |
| --- | --- | --- |
| Pedir orçamento (navegação) | `routes.root_url` (A3) | `/pages/pedir-orcamento` (confirmada) |
| Inspiração | raiz | **a confirmar** (blog ou página inexistente) |
| Sobre a M3D | raiz | **a confirmar** (página "Sobre" não identificada) |
| Prazos de entrega (painel de pesquisa) | raiz | **a confirmar** [Dep: conteúdo de entregas] |
| Personalizações & impressão (painel) | raiz | **a confirmar** |
| Produtos / Vestuário / Catálogos | `/collections/all` | Produtos mantém. Vestuário passa para a coleção (#2), **a confirmar** |
| MyShop | `routes.account_url` | Mantém (demonstrativo) |

Nota de implementação para o C1: os links vazios devem ficar **ocultos**, em vez de cair silenciosamente na raiz (`{% if section.settings.x_link != blank %}`). Assim, um setting em falta é visível no QA e não engana a pessoa.

---

## 4. PDP

### Ordem dos blocos

Desktop: a galeria e a decisão ficam lado a lado, e a decisão é sticky até ao fim da galeria [Hip].

Mobile: identidade curta → galeria → preço → opções → quantidade → CTA. O objetivo é ter o CTA dentro da primeira janela quando o produto não tem opções [Hip]. Na inspeção, o CTA estava a y≈1160 px numa janela de 844 px [Obs].

Mudanças face a `templates/product.json`:

- O SKU desce da posição por baixo do H1 para "Especificações" e para uma linha discreta "Ref.".
- O resumo da descrição sobe para logo a seguir ao preço, com 1 a 2 linhas.
- "Quantidade e tamanhos" deixa de abrir um modal por defeito (D-05).
- MyShop passa a ação terciária.
- Aparece um bloco "Antes de decidir" com links de ajuda, só se existirem [Dep].

```
DESKTOP 1440
┌──────────────────────────────────────────────────────────────────────────────┐
│ Início / Produtos / Wrist Watches / Relógio de pulso …                        │ breadcrumb
├──────────────────────────────────────┬───────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │ RELÓGIOS  (product.type, se em PT)    │
│ │                                  │ │ H1 Nome descritivo do produto         │
│ │        foto principal            │ │ Ref. 3S-0161 (discreto)               │
│ │        (galeria existente)       │ │ ───────────────────────────────────── │
│ │                                  │ │ 24,90 €   ou   Sob consulta           │ preço
│ └──────────────────────────────────┘ │ IVA incl.? [Dep]  · Em stock / A cons.│
│ [mini][mini][mini][mini]             │ Resumo 1–2 linhas                     │
│                                      │ Cor · Preto                           │
│                                      │ (●)(○)(○)                             │
│                                      │ Tamanho · M                           │
│                                      │ [S][M][L][XL]  Guia de tamanhos [Dep] │
│                                      │ Quantidade  [−][ 1 ][+]               │ inline
│                                      │  Comprar vários tamanhos? Compor lista│ link → modal
│                                      │ Personalização                        │
│                                      │ (•) Sem personalização                │
│                                      │ ( ) Serigrafia  +  (só se configurada)│
│                                      │ ───────────────────────────────────── │
│                                      │ [■■■ Adicionar ao carrinho ■■■■■■■■]  │ CTA
│                                      │ [ Comprar agora (dinâmico) ]          │ só se elegível
│                                      │ ◇ Guardar no MyShop                   │ terciário
│                                      │ status aria-live                      │
│                                      │ Antes de decidir: Entregas · Devoluç. │ só se existir
├──────────────────────────────────────┴───────────────────────────────────────┤
│ Tudo sobre este produto                                                       │
│ ▾ Descrição  ▸ Especificações e materiais  ▸ Personalização  ▸ Documentação   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Produtos relacionados (related-products)                                      │
└──────────────────────────────────────────────────────────────────────────────┘

MOBILE 390
┌──────────────────────────────┐
│ ‹ Wrist Watches              │ breadcrumb curto (só pai)
│ H1 Nome descritivo           │
│ ┌──────────────────────────┐ │
│ │ foto 1:1 (swipe, 1/4)    │ │ ~358px
│ └──────────────────────────┘ │
│ 24,90 €  · Em stock          │ preço junto do H1/foto
│ Cor · Preto  (●)(○)(○)       │
│ Quantidade [−][ 1 ][+]       │
│ [■ Adicionar ao carrinho   ] │ ← alvo: dentro de ~844px sem opções
│ ◇ Guardar no MyShop          │
│ Resumo / Personalização      │
│ ▸ Descrição                  │
│ ▸ Especificações             │
│ Relacionados                 │
└──────────────────────────────┘
CTA fixo mobile: NÃO por defeito. Só se repetir o rótulo e o estado
exatos e nunca saltar escolhas obrigatórias (rola até ao 1.º campo em falta).
```

### Estados da PDP

O texto em `código` é a copy proposta em PT-PT, a validar pelo D4.

| Estado | Condição de dados | Preço exibido | CTA principal | Ajuda contextual | Ação secundária |
| --- | --- | --- | --- | --- | --- |
| **Compra disponível** | Variante selecionada com `price > 0` e `available` | Preço da variante (`money`). Com `compare_at_price > price > 0`, preço riscado e badge `Promoção` | `Adicionar ao carrinho` (roxo, ativo) | Stock, se `inventory_management` existir: `Em stock`. Se não: nada | `Comprar agora` (checkout dinâmico, só sem personalização e com uma linha). ◇ `Guardar no MyShop` |
| **Sob consulta** | Variante selecionada com `price == 0` | `Sob consulta` (nunca `€0,00`) | `Pedir orçamento` (roxo). Leva o contexto para a página de orçamento (§5) | `Este produto é vendido por orçamento. Indique a quantidade e a personalização e enviamos-lhe uma proposta por e-mail.` (não indica prazo) | ◇ `Guardar no MyShop`. Sem `Comprar agora` |
| **Variante não selecionada** | Há opções e a combinação está incompleta, ou nenhuma está pré-selecionada | O preço do produto: se as variantes tiverem o mesmo preço, esse preço. Se variar, `Desde X €`. Se for misto, ver abaixo | `Escolha {opção}`, por exemplo `Escolha o tamanho`. Fica desativado por `aria-disabled` e, ao ativar, leva o foco ao grupo | Grupo em falta com a mensagem `Selecione um tamanho para continuar.` | Nenhuma |
| **Indisponível** | Variante com `price > 0` e `available == false`, ou combinação inexistente | Preço da variante (combinação existente) ou nenhum (combinação inexistente) | `Esgotado`, desativado. Combinação inexistente: `Combinação indisponível`, desativado | `Esta opção está esgotada. Escolha outra cor ou tamanho.` Opções esgotadas riscadas, mas focáveis | `Pedir orçamento` como link secundário, para quantidades futuras [Hip; decisão do líder]. ◇ MyShop |
| **Configuração incompleta** | Técnica escolhida sem posição ou dimensões; quantidade abaixo de `quantity_rule.min` ou fora do incremento | O preço da variante, sem prometer o custo da personalização se `price_included` não estiver confirmado | O mesmo rótulo do estado de base (`Adicionar ao carrinho` / `Pedir orçamento`). Ao ativar, foca o primeiro campo em falta e **não** submete | `Indique a posição e as dimensões da personalização.` / `A quantidade mínima é {min}.` (só se a regra existir na Shopify) | `Remover personalização` (volta a "Sem personalização") |
| **Variantes mistas** | Algumas variantes com preço, outras a 0 | Sem seleção: `Desde X €` (o mínimo **das variantes com preço**), mais a linha `Algumas opções sob consulta`. Com seleção: o estado da variante escolhida | Segue a variante selecionada: `Adicionar ao carrinho` ou `Pedir orçamento`. Muda em conjunto com o preço e a ajuda | Ao mudar para uma variante a 0: `Esta opção é vendida por orçamento.` (aria-live polite) | Composição de várias linhas (modal): **bloquear a mistura** de variantes com preço e a 0 na mesma adição, com `Adicione separadamente as opções sob consulta através de "Pedir orçamento".` |
| *A adicionar* | Pedido AJAX em curso | Inalterado | `A adicionar…`, desativado, `aria-busy` | — | — |
| *Adicionado* | Resposta 200 | Inalterado | Volta a `Adicionar ao carrinho` | `Adicionado ao carrinho.` com o link `Ver carrinho` (aria-live) | Atualizar a contagem do carrinho |
| *Erro ao adicionar* | Resposta 4xx/5xx | Inalterado | Volta ao estado anterior | `Não foi possível adicionar. Verifique o carrinho e tente novamente.` (a string já existe) | `Ver carrinho` |

Notas:

- Os rótulos `Add to cart` e `Unavailable` (A8) passam a `Adicionar ao carrinho` e `Indisponível`. O `Preço sob consulta` como **rótulo de botão** desaparece: fica só como valor de preço `Sob consulta` (A6).
- MyShop: ícone e rótulo `Guardar no MyShop`. O diálogo mantém `Prévia do MyShop. As lojas e a criação ainda são ilustrativas.` Os nomes fictícios ("Google Summer Event"…) devem ser trocados por exemplos neutros marcados como demonstração (decisão do Claude/D4).
- O upload de logótipo no modal de personalização só existe para o carrinho. No percurso "Pedir orçamento", a ajuda diz `Poderá enviar o seu logótipo em resposta ao nosso e-mail.` Isto é honesto, porque o formulário não aceita anexos. A frase depende de a M3D confirmar que é assim que trabalha [Dep].

---

## 5. Página "Pedir orçamento"

### Mecanismo de transporte do contexto (proposta para C1/C2)

O Liquid de uma página não lê a query string. Por isso o contexto do produto não pode ser renderizado no servidor em `/pages/pedir-orcamento?...`. Há duas opções.

- **Opção A (recomendada para avaliação):** a PDP envia para a própria página do produto com template alternativo, `/products/<handle>?variant=<id>&view=orcamento`.
  - O Liquid tem `product` e `product.selected_variant`, que são dados reais da loja revalidados pelo servidor, e renderiza o resumo e os campos ocultos com `escape`.
  - A quantidade e a personalização chegam por JS, a partir do estado da PDP (por exemplo `sessionStorage`), e são escritas com `textContent` em campos editáveis.
  - Sem JS, a pessoa escreve-as à mão.
  - **A verificar pelo C2:** se o redirect do `form 'contact'` preserva `view=orcamento` para mostrar `posted_successfully?` no mesmo template.
- **Opção B:** `/pages/pedir-orcamento?produto=<handle>&variante=<id>&quantidade=<n>`.
  - O JS lê os parâmetros, revalida com `fetch('/products/<handle>.js')`, confirma que a variante pertence ao produto e preenche o resumo com `textContent`.
  - Se falhar, cai na entrada genérica sem mostrar os parâmetros.

Em ambas as opções, o contexto é **declarado pelo solicitante** e a M3D confirma-o antes de responder (contrato do §7 do parecer do Codex).

### Campos (nomes `contact[...]` em PT-PT, estáveis)

| Campo | Tipo | Obrigatório | Nota |
| --- | --- | --- | --- |
| Nome | `contact[Nome]` text, `autocomplete=name` | Sim | — |
| E-mail | `contact[email]` email | Sim | Obrigatório na Shopify |
| Telefone | `contact[Telefone]` tel | Não | `Opcional. Útil se preferir que lhe liguemos.` (não promete chamada) |
| Empresa | `contact[Empresa]` text, `autocomplete=organization` | Não | `Opcional` |
| NIF | — | **Não incluir no MVP** (proposta) | Não é necessário para responder a um orçamento. Recolher menos dados pessoais reduz o risco RGPD. Pede-se na encomenda ou na fatura. **Decisão do líder ou do utilizador** |
| Produto | `contact[Produto]` | Pré-preenchido, editável | Só na entrada a partir de produto. Inclui o URL do produto |
| Variante | `contact[Variante]` | Pré-preenchido, editável | Por exemplo `Preto / M` |
| Quantidade | `contact[Quantidade]` number, `min=1` | Sim, na entrada a partir de produto | Sem mínimo comercial inventado |
| Personalização | `contact[Personalização]` | Pré-preenchido ou `Sem personalização` | Técnica, posição e dimensões, se escolhidas |
| Mensagem | `contact[body]` textarea | Sim na entrada genérica; opcional na de produto | Ajuda: `Diga-nos o que procura: produto, quantidade, personalização e data em que precisa.` (a pessoa indica a data; a M3D não promete nada) |
| Origem | `contact[Origem]` hidden | — | `produto` / `genérico`. Serve só para triagem; não é um destinatário |

Abaixo do botão: `Ao enviar, aceita que a M3D use estes dados para responder ao seu pedido.` com o link `Política de privacidade` → `/policies/privacy-policy` (**rota a confirmar**: depende de a política estar configurada no Admin [Dep]).

### Estados

| Estado | Condição | O que se vê |
| --- | --- | --- |
| Inicial genérico | Sem contexto | H1 `Pedir orçamento` e o texto `Conte-nos o que precisa. Respondemos por e-mail com uma proposta.` Campos vazios |
| Inicial a partir de produto | Contexto válido | Cartão-resumo (miniatura, nome, variante) com a ligação `Alterar produto` (volta à PDP). Campos pré-preenchidos e editáveis |
| Contexto inválido | Handle ou variante não encontrados | Entrada genérica, com o aviso discreto `Não foi possível carregar o produto. Descreva-o na mensagem.` |
| Incompleto | Validação no cliente ao submeter | O foco vai para o resumo de erros. Cada campo tem uma mensagem associada por `aria-describedby`: `Indique o seu nome.`, `Indique um e-mail válido.`, `Indique a quantidade.`, `Escreva uma mensagem.` |
| Erro do servidor | `form.errors` | Resumo `role="alert"` `Verifique os campos assinalados:` com âncoras para os campos. Os valores introduzidos ficam preservados |
| A enviar | Submit nativo | Botão `A enviar…` desativado, para evitar duplo envio. Não há spinner que sugira uma resposta assíncrona |
| Sucesso | **Só** com `form.posted_successfully?` | Painel `role="status"` com foco: **`Recebemos o seu pedido`** e `Vamos analisá-lo e responder para {e-mail}. Se precisar de acrescentar algo, responda a esse e-mail.` Sem prazo. A frase "responda a esse e-mail" depende de confirmação da M3D [Dep]. Ações: `Continuar a explorar` → `/collections/all`; `Voltar ao produto` (se houver contexto) |

O CTA do formulário é `Enviar pedido de orçamento` (roxo).

Os textos `templates.contact.form.*`, hoje em inglês (A8), têm de passar a PT-PT. Isso também afeta o `/pages/contact`.

```
DESKTOP — entrada a partir de produto
┌──────────────────────────────────────────────────────────────────────────────┐
│ Início / Pedir orçamento                                                      │
│ H1 Pedir orçamento                                                            │
│ Conte-nos o que precisa. Respondemos por e-mail com uma proposta.             │
├───────────────────────────────────────────────┬──────────────────────────────┤
│ O SEU PEDIDO                                  │ ┌──────────────────────────┐ │
│ Produto      [Relógio de pulso … (pré)     ]  │ │ [img] Relógio de pulso … │ │ resumo
│ Variante     [Preto / M (pré)              ]  │ │ Preto / M                │ │ sticky
│ Quantidade   [  50  ]                         │ │ Sob consulta             │ │
│ Personaliz.  [Serigrafia · Frente · 40×40 mm] │ │ Alterar produto          │ │
│ Mensagem     [                             ]  │ └──────────────────────────┘ │
│              [                             ]  │                              │
│ OS SEUS DADOS                                 │ O que acontece a seguir      │
│ Nome *       [                ]               │ 1. Recebemos o pedido        │
│ E-mail *     [                ]               │ 2. Confirmamos produto,      │
│ Telefone     [                ] Opcional      │    quantidade e preço        │
│ Empresa      [                ] Opcional      │ 3. Enviamos a proposta por   │
│                                               │    e-mail                    │
│ Ao enviar, aceita… Política de privacidade    │ (sem prazos)                 │
│ [■■ Enviar pedido de orçamento ■■]            │                              │
└───────────────────────────────────────────────┴──────────────────────────────┘

MOBILE 390 — genérico
┌──────────────────────────────┐
│ H1 Pedir orçamento           │
│ Conte-nos o que precisa…     │
│ ▸ O que acontece a seguir    │ (details, fechado)
│ Mensagem *                   │
│ [                          ] │
│ Nome *        [            ] │
│ E-mail *      [            ] │
│ Telefone (opcional) [      ] │
│ Empresa (opcional)  [      ] │
│ Ao enviar, aceita… Política  │
│ [■ Enviar pedido de orçam. ] │ largura total, 48px
└──────────────────────────────┘

SUCESSO (ambos)
┌──────────────────────────────────────────────┐
│ ✓ Recebemos o seu pedido                     │
│ Vamos analisá-lo e responder para            │
│ nome@exemplo.pt.                             │
│ [□ Continuar a explorar]  Voltar ao produto  │
└──────────────────────────────────────────────┘
```

O QA não submete o formulário: o envio gera um e-mail real (D-06). Os estados de erro e de sucesso testam-se com fixtures ou com marcação simulada.

---

## 6. Coleção e cards

Informação mínima do card:

1. Imagem (`featured_media`) com `alt` descritivo.
2. Nome do produto (H3 com link). O nome deve descrever o objeto [Dep: dados de catálogo].
3. Linha de preço (regras abaixo).
4. Badge de estado, no máximo um: `Promoção` ou `Esgotado`.
5. Referência (SKU) em texto pequeno, **por baixo** do nome e não por cima. Serve o comprador B2B sem dominar o card [Hip].
6. Um atributo útil, se existir nos dados (por exemplo `4 cores`, a partir de `options_with_values`). Não se inventa técnica nem mínimo.

As ações do card são o "+" (MyShop) e o coração ("Guardar"):

- O "+" passa a ter o rótulo acessível `Guardar no MyShop`.
- O coração não tem persistência (A10). Proposta: ocultá-lo até existir função real, ou fundi-lo com o MyShop. **Decisão do líder.**

### Regras de preço do card

São partilhadas com a PDP (D-07). O HTML é próprio de cada contexto.

| Dados do produto | Texto do card | Badge |
| --- | --- | --- |
| Todas as variantes com `price == 0` | `Sob consulta` | Nenhum. Não mostrar `Esgotado`, mesmo com stock 0, porque a disponibilidade é tratada no orçamento |
| Uma variante, ou todas com o mesmo preço > 0 | `24,90 €` | `Esgotado` se `available == false` |
| Todas > 0 e preços diferentes | `Desde 8,90 €` | Como acima |
| **Mistas** (algumas > 0, algumas 0) | `Desde 8,90 €` (o mínimo **das variantes com preço**; exige um ciclo Liquid, porque `price_min` dá 0), mais a linha secundária `Algumas opções sob consulta` | Nenhum de promoção, se o desconto não se aplicar às variantes com preço |
| `compare_at_price > price > 0` | Preço riscado e preço final | `Promoção` |
| `compare_at_price > 0` e `price == 0` | `Sob consulta` (não mostrar o riscado) | Nenhum |

O carrinho não usa estas regras: mostra os valores reais da linha e do total. Um desconto de 100% aparece como `0,00 €` com o desconto identificado, não como "Sob consulta".

Na listagem, os filtros e a ordenação mantêm-se. A ordenação por preço com produtos a 0 põe os "Sob consulta" primeiro no ascendente. É um efeito a assinalar ao C1; não proponho alterar a ordenação nativa.

---

## 7. Dependências de conteúdo e comerciais (para o utilizador)

Estão separadas das decisões de design. Não bloqueiam o layout, mas sem elas o texto respetivo fica oculto ou genérico.

| # | Dependência | Bloqueia | Quem |
| --- | --- | --- | --- |
| C-1 | Seleção de produtos para "Em destaque", idealmente com alguns preços reais (D-01). Hoje só `wrist-watches`, toda sob consulta | Bloco 4 da homepage; a copy "encomende online" | Utilizador / M3D |
| C-2 | Coleções reais por categoria (vestuário, brindes, escritório, tecnologia, presentes, copos e garrafas) ou conteúdo útil nas 11 páginas de categoria | Links #2, #3, #6, #8–#12 | Utilizador / C1 |
| C-3 | Validade e coleção da campanha de Natal "até 20%" | Bloco 6b | Utilizador |
| C-4 | Imagem de hero que represente particulares e empresas | Hero | Utilizador / Claude |
| C-5 | Informação sobre entregas, custos de envio, devoluções e pagamentos (PT/ES) | Links "Antes de decidir", rodapé, `Prazos de entrega` | Utilizador / M3D |
| C-6 | Se a M3D aceita receber o logótipo por resposta ao e-mail do orçamento | Ajuda do orçamento | Utilizador |
| C-7 | O e-mail de destino no Admin (`m3dbrindes@gmail.com`, ainda por configurar e verificar) | Receção real dos orçamentos | Utilizador |
| C-8 | Política de privacidade configurada no Admin | Link do formulário | Utilizador |
| C-9 | Páginas Inspiração e Sobre a M3D | Itens da navegação (A3) | Utilizador |
| C-10 | Correção da associação nome/imagem (Carlsberg/Jeep) e nomes descritivos em PT | Cards e PDP | Utilizador / catálogo |
| C-11 | Técnicas de personalização reais por produto (metafields `printing_techniques` e `personalization_config`) | Bloco "Como funciona" e personalização na PDP | Utilizador / MidOcean (fase posterior) |
| C-12 | Quantidades mínimas e prazos, se existirem | Ajuda na PDP e no orçamento. Até lá, **não são mostrados** | Utilizador |
| C-13 | Exemplos de trabalhos autorizados ou reviews reais | Bloco 8 (prova) | Utilizador |

### Decisões de design para os líderes

| # | Decisão | Proposta do D2 |
| --- | --- | --- |
| L-1 | Os 7 itens também no menu mobile? (A4) | Sim: repor Coleções e Pedir orçamento, pela mesma ordem |
| L-2 | Transporte de contexto do orçamento: Opção A (`?view=orcamento`) ou Opção B (página + JS) | A, depois de o C2 verificar o comportamento do redirect |
| L-3 | Incluir o NIF no formulário? | Não no MVP |
| L-4 | Coração sem persistência | Ocultar ou fundir com o MyShop |
| L-5 | Links vazios: ocultar em vez de apontar à raiz | Sim |
| L-6 | "Pedir orçamento" como ação secundária num produto esgotado com preço | Sim, como link e não como botão |
| L-7 | Dois CTAs "Pedir orçamento" na homepage (blocos 7 e 9) | Manter o do bloco 7. No bloco 9, só se a ajuda tiver links reais; caso contrário, fundir os blocos |
| L-8 | Pesquisa exposta no topo mobile | Sim [Hip], respeitando a navegação existente |
