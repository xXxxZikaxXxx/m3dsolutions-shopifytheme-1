# Implementação #1 — ícones M3D

09/10/2026. Executor real: subagente nativo Codex /root/icons; integração e registos centrais: líder Codex.

## Implementado

- Biblioteca única em `snippets/icon.liquid`: 18 nomes `m3d-*`, geometrias copiadas exatamente de `design/icones/*.svg`; Instagram/Facebook/LinkedIn conservam as formas anteriores e passam a 20 px. Parâmetros `name`, `size` (16/20/24; 20 por defeito), `class`. SVGs decorativos com `aria-hidden="true"` e `focusable="false"`; nomes acessíveis permanecem no controlo.
- Usos legacy migrados para nomes M3D. Sem SVG utilitário inline fora do snippet; MyShop no card mantém UI e apenas troca geometria. Chevron de filtros e acordeões, steppers, setas de galeria/paginação e MyShop/nav, fechar modais, filtros e toast centralizados.
- Ícones Partilhar, upload, orçamento, remover do carrinho, criar MyShop, sucesso/erro dos formulários existentes. Nenhum canal de upload/formulário novo, envio real ou funcionalidade MyShop foi criado.
- CSS global em `assets/m3d-system.css`: escala proporcional 16/20/24, alinhamento; seta de botão com deslocação de 3 px e micro-pressão dos ícones sob `prefers-reduced-motion: no-preference`. Animação opcional de desenhar o traço omitida.
- Pesquisa e saco do cabeçalho a 24 px. Chevron Coleções conserva orientação fechada à direita e aberta para baixo. JS da pílula não foi alterado. Menu móvel conserva o símbolo de três linhas em CSS: não existe geometria menu no catálogo aprovado. SVGs de marcas/imagens e placeholders de produto não são ícones utilitários.

## Verificação desta subtarefa

- Integridade exata: 18/18 fontes M3D + 3/3 redes sociais. Todos os nomes literais usados pelo tema existem na biblioteca.
- Inventário Liquid/JS: zero `<svg` utilitário fora de icon.liquid, zero setas tipográficas ou × como botão.
- Prévia existente `http://127.0.0.1:9292/products/m3d-gr001`: HTTP 200, 21 SVGs decorativos M3D renderizados e marcador antigo ausente. Prévia não reiniciada.
- Theme Check e capturas integradas serão executados pelo líder após #2; QA visual final/fidelidade pertence ao Claude, conforme pedido do utilizador.
- Nenhum commit, push, theme push, publicação ou deploy. Tokens/design/backend intocados.

## Ficheiros devolvidos ao líder

- `assets/m3d-system.css`
- `sections/contact-form.liquid`
- `sections/m3d-quote.liquid`
- `sections/main-article.liquid`
- `sections/main-cart.liquid`
- `sections/main-collection.liquid`
- `sections/main-product.liquid`
- `sections/main-search.liquid`
- `sections/nav.liquid`
- `snippets/alerta.liquid`
- `snippets/card-product.liquid`
- `snippets/collection-filter-group.liquid`
- `snippets/icon.liquid`
- `snippets/m3d-cart-login.liquid`
- `snippets/m3d-product-gallery.liquid`
- `snippets/newsletter-form.liquid`
- `snippets/pagination.liquid`
- `snippets/share-button.liquid`

Escrita desta subtarefa concluída e **libertada explicitamente** para o líder em todos os ficheiros acima. `m3d-account` está disponível mesmo sem uso atual; estados de stock dinâmicos na PDP podem ser integrados em #2 com cuidado para não perder ícones quando o JS atualiza textContent.
