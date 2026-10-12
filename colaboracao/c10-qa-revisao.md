# C10 — revisão dirigida de 09/10/2026

Responsável: Codex / qa_local. Prévia: http://127.0.0.1:9292. Teste com Python Playwright / Chromium headless; skills webapp-testing e liquid-theme-a11y, contexto do projeto relido. Escrita restrita a este relatório e artifacts c10-* em .shopify/qa-20261009. Nenhum commit, push, deploy, alteração de tema ou catálogo por este agente.

Resultado final: páginas e comportamentos atribuídos aprovados após correções dirigidas do root. Limites desta ronda: carrinho cheio e política não foram testados; personalização configurada e compra são fixtures locais, não operações reais.

## Resultado das páginas

Rotas reais revistas em 1440×1000 e 390×844: /404-exemplo, /search, /search?q=saco, /pages/kits-de-boas-vindas, /pages/tecnologia, /pages/contact, /cart e /products/saco-natalicio-boneco-de-neve-com-cordao. Em360×844, as mesmas exceto a pesquisa preenchida. Rechecks dirigidos separados após correções de locale/campo desktop. /404-exemplo devolve404 esperado; restantes200. Todas as páginas concluídas: overflow horizontal0, um H1 visível com peso700, um main, footer até a base do documento (gap0px), sem Liquid error/translation missing.

| Achado | Evidência atual | Resultado |
| --- | --- | --- |
| V2 — 404 | Página não encontrada; explicação PT; campo arredondado999px; Pesquisar48px; Explorar produtos aponta /collections/all. Nome do campo via label e foco teclado outline2px. | Aprovado |
| V3 — páginas de apoio | Kits de boas-vindas e Tecnologia têm introdução, Pedir orçamento com view=m3d-quote e Explorar produtos /collections/all. Sem coleção inexistente ou promessa de stock. | Aprovado para catálogo atual sem coleção associada |
| V4 — pesquisa vazia | Inicial desktop mostrou Resultados da pesquisa; correção do root retestada. H1 final Pesquisar, foco inicial no campo SearchPage, ajuda e sugestões reais Produtos/Coleções. | Aprovado após correção |
| V5 — cores | Beige/Red têm nomes textuais uniformes e aria Cor: Beige/Cor: Red, sem amostra que inventa hex a partir do nome. | Aprovado |
| V6 — feedback | Sucesso e erro HTTP422 simulados exclusivamente no navegador, com região role=status aria-live=polite; detalhes abaixo. | Aprovado em fixtures |
| V7 — quantidade | Real1→2→1, − desativado no mínimo, href com quantity2. Fixture min2/increment2/max8:2→4→6→8, + desativado no8; − até2 e desativado. Alvos finais44×44px. | Aprovado após correção de altura |
| V8 — carrinho | Carrinho vazio real sem submissão, texto PT, CTA real, overflow0 e footer base. | Vazio aprovado; cheio/Atualizar/total não testados nesta tarefa |
| V9 — política | Fora das rotas e fixtures atribuídas. | Sem nova validação da política/admin nesta ronda |
| V10 — header pesquisa | Placeholder Pesquisar produtos. Desktop input214px/client214, úteis182px após padding, texto142,59px; Cancelar fechado0/min0. Aberto Cancelar81,81×44px. Mobile formulário ocupa largura menos16px de cada lado; input312px nos390, restante reservado ao ícone. | Aprovado após correção do root |
| V11 — contacto | H1 Contactos, quatro labels associados, font14px/700; Enviar mensagem48px. Tab do nome leva ao email com outline solid2px. Nenhum envio. | Aprovado |
| V12 — preço | Card real da pesquisa e PDP ambos €1,80 pelo moneyfilter. | Aprovado |
| V13 — rodapé/disclosures | Footer preto/logotipo negativo/slogan termina na base em todas as páginas. Chevrons de disclosures são SVG. Galeria também traduzida no recheck abaixo. | Aprovado |

Pesquisa q=saco mantém saco + relógios nos resultados públicos; esta ronda não atribui a causa ao Liquid nem certifica pertinência do motor. Estado zero real obtido com a sintaxe explícita q=title:zzqxv, sem modificar pesquisa normal: Nenhum produto encontrado para "title:zzqxv" e instrução PT, H1 conserva termo, overflow0 e footer base em1440/390.

## PDP e fixtures sem mutação

Produto real: SACO NATALÍCIO BONECO DE NEVE COM CORDÃO, €1,80,20 em stock; bloco/heading Personalização e acordeão de personalização ausentes porque o produto não tem configuração. Adicionar ao carrinho disponível. Dynamic checkout/payment_button/Buy now ausentes. Quantidade inline tem nome acessível Quantidade; botões Aumentar/Diminuir incluem título do produto. Orçamento conserva produto, product_url, variante/id e quantidade após stepper.

Para feedback de compra, /cart/add.js foi interceptado antes da rede e recebeu fixture200/422; /cart.js também foi simulado. Em1440/390: sucesso exibe Adicionado ao carrinho e link Ver carrinho /cart; nova tentativa erro422 exibe texto português de stock insuficiente com data-error e oculta Ver carrinho. Quatro POST de compra capturados e respondidos localmente, zero POST real à loja. Os demais métodos mutantes foram abortados, incluindo telemetria Shopify. Não se clicou em Ver carrinho para iniciar compra, nem em checkout/contacto/orçamento.

Fixture da resposta HTML da PDP, sem alterações remotas, adicionou config Serigrafia/Frente60×40mm, sem imagem, e o mesmo trigger data-m3d-dialog-open/classes da implementação. Verificados em1440/390:

- Posição textual Frente / Área máx.60×40mm, zero img/placeholder na posição;
- Labels Largura (máx.60mm) e Altura (máx.40mm), atributos min1/step1/max60/40;
- 61×40 rejeitado com mensagem PT, modal permanece aberto;60×40 confirmado e estado/propriedades guardados;
- Link Pedir orçamento no modal, após clique com preventDefault local, inclui Serigrafia, Frente,60×40mm, quantidade4, produto e variante corretos antes de confirmação;
- Foco inicial no H2 do diálogo, Tab a partir do último controlo permanece dentro, Escape fecha e devolve foco ao trigger, reabertura e confirmação funcionam;
- Batch semeado como estado de fixture é limpo pela edição inline: batchSize1→0, parâmetro lines desaparece, quantity atualiza;
- Variante Red da fixture com preço0 oculta Add e mantém contexto de orçamento; retorno Beige positivo restaura Add e regra2/2/8.

Para técnica não aprovada, foi inspecionada a condição Liquid: lista de sete técnicas aprovadas + price_included==true + posições não vazias para botão. A fixture sintética de saída do ramo não aprovado contém apenas acordeão Tampografia/Disponível por orçamento, sem trigger Tampografia. Esta fixture não comprova renderização Shopify de metafield real não aprovado. Produto real configurado, imagens de posição, técnica sem preço incluído e cálculo de preço de personalização continuam dependentes da configuração pelo funcionário.

## Evidências e limites

Dados de páginas: [.shopify/qa-20261009/c10-pages.json](../.shopify/qa-20261009/c10-pages.json). Correções finais: [c10-final-probes.json](../.shopify/qa-20261009/c10-final-probes.json). Estados interceptados: [c10-fixtures.json](../.shopify/qa-20261009/c10-fixtures.json). Labels/medidas: [c10-controls.json](../.shopify/qa-20261009/c10-controls.json).

Capturas principais: [404 mobile](../.shopify/qa-20261009/c10-404-390.png), [kits mobile](../.shopify/qa-20261009/c10-kits-390.png), [Tecnologia desktop](../.shopify/qa-20261009/c10-tecnologia-1440.png), [Contactos360](../.shopify/qa-20261009/c10-contact-360.png), [carrinho desktop final](../.shopify/qa-20261009/c10-final-cart-empty-1440.png), [PDP desktop final](../.shopify/qa-20261009/c10-final-pdp-1440.png), [pesquisa vazia final](../.shopify/qa-20261009/c10-final-search-empty-1440.png), [estado zero mobile](../.shopify/qa-20261009/c10-final-search-zero-390.png), [sucesso fixture mobile](../.shopify/qa-20261009/c10-add-success-390.png), [modal fixture mobile](../.shopify/qa-20261009/c10-personalization-390.png), [header pesquisa aberta](../.shopify/qa-20261009/c10-header-search-open-1440.png).

A primeira captura desktop /cart sofreu navegação/hot reload e interrompeu a PDP seguinte; ambas foram substituídas por rechecks GET em contextos novos após sincronização. Fixtures completas concluídas sem reload. A primeira versão do harness de fixture tinha atributo de trigger incorreto, corrigido para o atributo nativo e reexecutado; falha do harness, não do tema.

Erros JS observados Failed to fetch têm stacks Shop externo/WPM exportMetrics/exportLogs, esperados sob abort de métodos mutantes/telemetria. Nenhum stack de m3d-product.js ou outro script M3D nos rechecks finais. Isto não certifica integrações externas/analytics em produção. Não houve envio real, alteração de carrinho real, pagamento, upload de ficheiro, teste de conta, motor de pesquisa ou auditoria completa de leitor de ecrã. Sem repetir a suíte de navegação/pílula validada ontem. Root deve atualizar agente.md como escritor exclusivo após encerrar a etapa.

## Recheck final concluído

Achados comunicados e corrigidos pelo root, confirmados por novos GET apenas na PDP1440/390 e pesquisa saco390:

- Botões inline −/+ passaram de44×20 para44×44px; composição48px, Add48px e setas da galeria44×44px.
- Galeria agora anuncia Mostrar imagem1/2 na galeria e Imagem anterior/seguinte. Filtros exibem Em stock/Sem stock; nenhuma mutação de tradução do catálogo/admin.
- Header aberto conserva Cancelar81,81×44px, focando o campo; card e PDP conservam €1,80.

Dados: [c10-last-controls.json](../.shopify/qa-20261009/c10-last-controls.json). Capturas finais: [PDP1440](../.shopify/qa-20261009/c10-last-1440-pdp.png), [PDP390](../.shopify/qa-20261009/c10-last-390-pdp.png), [pesquisa390](../.shopify/qa-20261009/c10-last-390-search.png). Não houve nova suíte completa nem repetição dos testes interceptados após estas correções de CSS/locale.

## Adendo C13 — pequenas correções finais

Nova fixture curta em390×844, somente GET e eventos locais, sem repetir a suíte. Configuração Serigrafia/Frente com limite60×40mm. Após tentar Confirmar em61×40, surgiu erro. Alterar a largura para60 apagou imediatamente texto e data-error pelo evento input, antes de Confirmar; modal continuou aberto e personalization permaneceu null. Controle adicional:61×39 ainda inválido manteve o erro. Corrigir para60 permitiu confirmar normalmente.

GET real /pages/pedir-orcamento?view=m3d-quote retornou200 e exibiu “Pode enviar o logótipo em resposta ao nosso e-mail.”, sem overflow horizontal. Nenhum formulário foi enviado.

Carrinho cheio: revisão somente do código Liquid/CSS, sem alegar QA de renderização real. Confirmados espaço explícito :&nbsp; entre nome/valor de propriedade; origem exata https://cdn.shopify.com/ nos primeiros24caracteres e caminho /uploads/ exigidos para links de upload; ramo Logótipo com extensões png/jpg/jpeg/webp/gif gera miniatura40×40 e alt traduzido, enquanto outras extensões não geram img. Links abrem com rel=noopener e URL/valores recebem escape; origem diferente cai no texto escapado. Não foram enviados ficheiros nem criado um carrinho cheio.

Evidência: [c10-c13-results.json](../.shopify/qa-20261009/c10-c13-results.json), [erro apagado antes de confirmar](../.shopify/qa-20261009/c10-c13-dimensions-390.png), [texto de logótipo no orçamento](../.shopify/qa-20261009/c10-c13-quote-logo-followup-390.png). Zero mutações reais;37requisições mutantes de integrações/telemetria abortadas nesta execução. C13 aprovado no escopo observado, com carrinho preenchido ainda limitado à inspeção de fonte.
