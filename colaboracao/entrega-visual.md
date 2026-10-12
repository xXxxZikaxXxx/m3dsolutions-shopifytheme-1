# Entrega visual local — 08/10/2026

Codex coordenou a implementação e os sub-agents nativos C1–C6; Claude liderou o Design System, os seus sub-agents D1/D2 e as revisões de fidelidade. Comunicação pelos ficheiros de colaboração e pelo terminal real do Claude no Orca. Nenhum commit, push ou publicação foi realizado.

## Resultado

- Design System integrado após as variáveis dinâmicas: paleta oficial, Raleway 400/700/900, foco roxo, botões em pílula, campos com borda de controlo e assets vetoriais extraídos do manual. Exceção numérica documentada pelo Claude: fonte de sistema nos valores/quantidades, porque a Raleway carregada não demonstrou dígitos tabulares.
- Homepage com mensagem B2C, produto real e pincelada oficial estática; faixa empresarial preserva o percurso B2B. Categorias sem produtos públicos ficam ocultas até existir conteúdo válido. Sem preços, avaliações, prazos ou promoções comerciais inventados.
- PDP com quantidade, personalização e contexto de orçamento; preço zero apresenta Sob consulta e ação Pedir orçamento. Textos de compra ficam ocultos nesse estado. Galeria e cards com fundo uniforme; MyShop tem ícone, rótulo e acesso por teclado.
- Página de orçamento completa em /pages/pedir-orcamento?view=m3d-quote, com formulário nativo Shopify, campos editáveis, validação e contexto limitado/sanitizado. Sucesso só quando o Liquid informa posted_successfully?.
- Cabeçalho, pesquisa, coleção, rodapé e carrinho harmonizados. Os sete itens da navegação e a ordem foram preservados. A pílula move-se só por clique/ativação equivalente; hover/foco não a deslocam.
- Carrinho conserva preços, descontos e totais Shopify. Itens sob consulta recebem orientação para orçamento e bloqueio de checkout na interface. Trata-se de proteção da UI, sem bloqueio no backend.

## Prévia e evidências

[Prévia local](http://127.0.0.1:9292/) — tema de desenvolvimento 166780993606. Tema publicado 152494637126 preservado.

- [Design System](../design/design-system-m3d.md) e [revisões Claude](claude-status.md).
- [QA final C3](c3-qa-final.md): home/PDP/orçamento a 1440, 1024, 390 e 360 px, HTTP 200 e overflow horizontal zero; navegação por teclado, movimento monotónico e limitado da pílula; quantidade/contexto e entradas malformadas.
- [Preços e cards C1](c1-precos.md), [orçamento C2](c2-orcamento.md), [header/footer C4](c4-header-footer.md), [carrinho C5](c5-carrinho.md), [fixtures C6](c6-fixtures.md).
- Fixtures locais: 9 casos/19 verificações de produto, preço positivo/zero/misto, indisponibilidade e regras de quantidade; 7 grupos de carrinho em VM. IDs/preços fictícios apenas no navegador/fixtures, sem alteração do catálogo remoto. Estes testes não comprovam renderização Liquid real dos estados comerciais fictícios.
- Theme Check: 64 ficheiros, zero erros, dois avisos históricos OrphanedSnippet. JavaScript de produto, orçamento e carrinho passou na verificação sintática. git diff --check passou.
- QA bloqueou pedidos de escrita: nenhuma submissão real de contacto, carrinho, pedido ou checkout. Sem teste de entrega de e-mail nem de retorno real após envio. Capturas técnicas em .shopify/qa-redesign-20261008/; capturas do Claude em analises/qa-visual/claude-20261008/.

A verificação dirigida do último lote PDP/coleção/pesquisa passou em desktop/mobile. Claude aceitou a fidelidade visual da home, orçamento, PDP e coleção na ronda 4 (12 combinações limpas). As duas notas baixas foram corrigidas pelo Codex: paginação em PT-PT e marcador MyShop unificado. Carrinho, conta e pesquisa não receberam revisão visual do Claude; a pesquisa e o carrinho vazio passaram no QA técnico C3.

## Pendências antes de publicar e próxima fase

1. **Atualização 09/10: destinatário decidido.** Manter m3dsolutionsshopify@gmail.com, já observado na configuração Admin. A alteração para m3dbrindes@gmail.com foi descartada pelo utilizador; essa pendência está fechada. O teste real de receção continua pendente. Nenhuma configuração global foi alterada.
2. Testar submissão/retorno do formulário nativo e preservação do template alternativo em ambiente autorizado antes de publicar. A página remota não teve template_suffix alterado.
3. Rever os dados do catálogo: nomes de marcas, textos em inglês e imagens de fornecedor. Os dados reais foram preservados; as coleções escolhidas para a home ainda não têm produtos públicos válidos.
4. MyShop funcional continua para discussão própria; ainda é uma prévia sem listas persistentes. **MidOcean autorizado em 09/10:** preparação da arquitetura em [midocean-arquitetura.md](midocean-arquitetura.md), sem importação/publicação automática nesta entrega.
5. Commit, push e publicação continuam dependentes de pedido explícito do utilizador; não foram executados nesta operação.
