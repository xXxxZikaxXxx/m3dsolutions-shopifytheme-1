
## Como usar

Pré-requisitos: [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) instalado
e acesso a uma loja Shopify (ou uma development store).

```bash
# 1. Clonar a base
git clone https://github.com/eduardolecdt/base-liquid-shopify.git minha-loja
cd minha-loja

# 2. Rodar localmente com hot reload (preview ao vivo)
shopify theme dev --store SUA-LOJA.myshopify.com

# 3. Subir para a loja (como tema não publicado / rascunho)
shopify theme push --store SUA-LOJA.myshopify.com --unpublished

# 4. Validar o código (lint oficial do Shopify)
shopify theme check
```

Depois de subir, customize tudo pelo **editor de tema** do Shopify
(`admin/themes` → *Customize*): logo, cores, fontes, menu, seções da home, etc.
Nada precisa ser editado no código para uma loja funcionar.

---

## Estrutura de pastas

Um tema Shopify é um conjunto de arquivos organizados por função. O Shopify
monta cada página combinando: um **layout** (a moldura HTML) + um **template**
(quais seções aparecem naquela página) + **sections** (blocos configuráveis) que
usam **snippets** (pedaços reutilizáveis) e **assets** (CSS/JS/imagens).

```
layout/      → moldura HTML de todas as páginas (theme.liquid)
templates/   → o que cada tipo de página renderiza (product, cart, collection…)
sections/    → blocos configuráveis pelo editor (cabeçalho, produto, rodapé…)
snippets/    → pedaços de código reutilizáveis (preço, card, ícones…)
assets/      → CSS, JavaScript e imagens
config/      → configurações globais do tema (settings do editor)
locales/     → textos traduzíveis (i18n)
```

### `layout/`
| Arquivo | O que faz |
|---|---|
| `theme.liquid` | Moldura HTML de **toda** página: `<head>` (SEO, Open Graph, JSON-LD, favicon, CSS), cabeçalho e rodapé (via section groups), e `content_for_layout` (onde o template da página é injetado). |

### `templates/`
Cada arquivo define **quais seções** aparecem num tipo de página. São JSON
(editáveis no editor) — exceto `gift_card.liquid`, que é uma página standalone.

| Arquivo | Página |
|---|---|
| `index.json` | Home |
| `product.json` | Página de produto |
| `collection.json` | Página de coleção (listagem de produtos) |
| `list-collections.json` | Lista de todas as coleções |
| `cart.json` | Carrinho |
| `search.json` | Resultados de busca |
| `blog.json` | Listagem de posts do blog |
| `article.json` | Post individual do blog |
| `page.json` | Página institucional genérica |
| `page.contact.json` | Página de contato (com formulário) |
| `password.json` | Página de senha (loja fechada/em breve) |
| `404.json` | Página de erro 404 |
| `gift_card.liquid` | Vale-presente (QR code, Apple Wallet) — arquivo Liquid standalone |

> **Políticas** (privacidade, reembolso, etc.) são servidas automaticamente pelo
> Shopify — não há template para elas (o Shopify **não** aceita `policy.json`).

### `sections/`
Blocos configuráveis pelo editor. As que começam com `main-` são o conteúdo
principal de cada template. `header-group.json` e `footer-group.json` agrupam
cabeçalho/rodapé (permitem reordenar no editor).

| Arquivo | Função |
|---|---|
| `header-group.json` / `footer-group.json` | Agrupadores de cabeçalho e rodapé |
| `nav.liquid` | Cabeçalho: logo, menu multinível, busca, carrinho, seletor de país/idioma |
| `footer.liquid` | Rodapé: blocos (marca, menu, texto, newsletter), redes, ícones de pagamento |
| `main-product.liquid` | Página de produto: galeria, variantes, add-to-cart nativo, blocos |
| `main-cart.liquid` | Carrinho: itens, quantidade, notas, checkout |
| `main-collection.liquid` | Grade de produtos: ordenação, filtros, paginação |
| `collection-banner.liquid` | Cabeçalho da coleção (título, descrição, imagem) |
| `main-search.liquid` | Resultados de busca (produtos, artigos, páginas) |
| `main-list-collections.liquid` | Grade de coleções |
| `main-blog.liquid` / `main-article.liquid` | Blog e post individual |
| `main-page.liquid` | Página institucional |
| `contact-form.liquid` | Formulário de contato nativo |
| `main-password.liquid` | Página de senha |
| `main-404.liquid` | Conteúdo do 404 |
| `image-banner.liquid` | Banner hero (imagem + texto + botões) — home |
| `featured-collection.liquid` | Coleção em destaque (grade de produtos) — home |
| `collection-list.liquid` | Lista de coleções em cards — home |
| `rich-text.liquid` | Bloco de texto rico centralizado — home |
| `related-products.liquid` | Produtos relacionados (API de recomendações) |

### `snippets/`
Pedaços reutilizáveis chamados via `{% render 'nome' %}`.

| Arquivo | Função |
|---|---|
| `css-variables.liquid` | Converte as settings do tema (cores/fontes/layout) em CSS variables e carrega as fontes |
| `meta-tags.liquid` | Meta tags de SEO e redes sociais (Open Graph, Twitter) |
| `structured-data-product.liquid` | JSON-LD do produto (rich snippet do Google) |
| `structured-data-website.liquid` | JSON-LD do site/organização |
| `price.liquid` | Renderiza preço (com preço "de/por" quando em promoção) |
| `card-product.liquid` | Card de produto reutilizável (grades) |
| `icon.liquid` | Ícones SVG inline (busca, carrinho, conta, redes…) |
| `pagination.liquid` | Paginação acessível |
| `localization-form.liquid` | Seletores nativos de país/moeda e idioma |
| `newsletter-form.liquid` | Formulário de inscrição em newsletter |
| `share-button.liquid` | Botão de compartilhar (Web Share API) |
| `product-variant-selection.liquid` | JS que atualiza preço/disponibilidade ao trocar variante |
| `product-media-gallery.liquid` | Estilos da galeria de mídia do produto |
| `carrinho.liquid` | Placeholder do drawer de carrinho |
| `alerta.liquid` | Toast de notificação (ex: "adicionado ao carrinho") |

### `assets/`
| Arquivo | Função |
|---|---|
| `index.css` | Ponto de entrada do CSS (importa os demais) |
| `normalizar.css` | Reset/normalização de estilos do navegador |
| `base.css` | Estilos base compartilhados (grid, botões, inputs, acessibilidade) |
| `fontes.css` | Placeholder para fontes próprias (por padrão usa fontes do Shopify) |
| `carrinho.js` | Add-to-cart via AJAX + atualização do contador (com fallback nativo) |
| `site.webmanifest` | Manifesto PWA |

### `config/`
| Arquivo | Função |
|---|---|
| `settings_schema.json` | Define as opções globais do editor (cores, fontes, logo, layout…) |
| `settings_data.json` | Valores atuais dessas opções + presets |

### `locales/`
| Arquivo | Função |
|---|---|
| `en.default.json` | Textos traduzíveis exibidos na loja (idioma padrão: inglês) |
| `en.default.schema.json` | Rótulos traduzíveis do editor de tema |

---

## Conceitos-chave

- **Online Store 2.0**: todas as páginas usam templates JSON com seções que o
  lojista adiciona/reordena/configura no editor, sem tocar em código.
- **Settings → CSS variables**: cores, fontes e espaçamentos definidos no editor
  viram CSS variables em `snippets/css-variables.liquid`. Para mudar a aparência,
  mexa nas settings — não no CSS.
- **i18n**: todo texto visível usa chaves de tradução (`{{ 'chave' | t }}`).
  Para adicionar outro idioma, crie `locales/pt-BR.json` (e `pt-BR.schema.json`).
- **Formulários nativos**: carrinho, contato, busca e newsletter usam as tags
  `{% form %}` do Shopify — funcionam mesmo sem JavaScript.

---

## Customizações comuns

| Quero… | Onde mexer |
|---|---|
| Trocar cores/fontes/logo | Editor de tema → **Theme settings** (ou `config/settings_*`) |
| Editar a home | Editor de tema → seções da home (ou `templates/index.json`) |
| Adicionar um idioma | Criar `locales/<código>.json` e `<código>.schema.json` |
| Criar uma seção nova | Adicionar arquivo em `sections/` com bloco `{% schema %}` |
| Mudar o menu | Admin → **Navigation** (o tema usa `main-menu` e `footer`) |

---

## Validação

Sempre rode antes de subir:

```bash
shopify theme check        # lint oficial (0 offenses = ok)
shopify theme push --store SUA-LOJA.myshopify.com --unpublished
```

> `theme check` pega erros de sintaxe e boas práticas, mas **não** garante que o
> tema sobe: alguns erros só aparecem no `push` real (ex: objeto Liquid usado em
> contexto inválido). Sempre teste com um `push` de rascunho.

---

## Licença

Uso livre pela [Team Lecdt](https://lecdt.com) e por quem clonar esta base.
Adapte à vontade para os seus projetos.

---

<sub>
Palavras-chave: shopify theme, tema shopify, shopify liquid, online store 2.0,
starter theme, boilerplate, scaffold, ecommerce, e-commerce, loja virtual,
theme sections, theme app blocks, shopify cli, liquid template, base de tema,
shopify boilerplate, shopify starter, dawn alternative.
</sub>
