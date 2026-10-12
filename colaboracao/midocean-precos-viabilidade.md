# MidOcean — viabilidade dos preços por volume e personalização

09/10/2026. Autor: Codex `/root/review_scope`. Parecer P-B para o líder integrar na arquitetura. Escrita exclusiva deste documento; tema, documentos do líder, catálogo e configuração remota preservados. Sem mutations, instalação de apps, envio de faturas, commit, push ou deploy. Exemplos monetários fictícios, sem IVA, transporte ou taxas de pagamento; não são preços da M3D.

## Decisão recomendada

O motor de preços deve ficar na aplicação M3D no servidor, com todas as técnicas permitidas pelo fornecedor e uma lista de personalizações por configuração. Para o âmbito completo — custos variáveis por volume, técnicas/posições múltiplas e preparação — a opção operacional mais direta no plano atual é orçamento calculado no servidor e convertido em **draft order com preço por variante definido para esse orçamento**. Isto suporta compra através do checkout Shopify, mas é um percurso de orçamento/aceitação, diferente do carrinho normal.

Os descontos automáticos podem cobrir ofertas mais simples, com preço base e configurações fixas. Não garantem, por si só, o cálculo completo pedido. Uma compra imediata com personalização arbitrária no carrinho exige avaliar um app público que cumpra o contrato ou, como outra alternativa, Shopify Plus e Functions próprias. Nenhuma destas opções foi instalada ou implementada nesta tarefa.

### Piloto recomendado: dois percursos, sem Functions próprias

**Oferta fixa:** artigo sem impressão variável, ou configuração cujo preço final já esteja aprovado e publicado na Shopify. A compra normal usa esse preço e a variante física. Os limites e a apresentação de IVA foram confirmados; a ativação dos novos preços depende ainda de custos reais, preparação, agrupamentos, configuração fiscal e teste de cobrança. Não declarar que uma impressão extra está incluída no preço atual. O piloto pode simular o novo tarifário sem escrever preços reais.

**Oferta variável:** artigo com múltiplas técnicas/posições, custo por volume ou preparação. A PDP recolhe a configuração completa e solicita o cálculo ao servidor; o orçamento aprovado gera um draft com variante física e preço específico. A aceitação segue para o checkout desse draft. Alterar quantidade/arte/configuração obriga a recalcular a oferta; não tentar transportar um preço arbitrário pelo formulário `/cart/add`.

Neste percurso, a confiança vem do servidor que constrói a oferta, não de uma Function:

- **Preço:** o servidor lê custos privados autorizados e calcula a regra versionada; nunca aceita o custo/total do browser. Confere o cálculo Shopify e os preços persistidos, define a política de descontos e compara o pedido pago com a oferta. O override pertence ao draft, sem repricing global da variante.
- **Configuração:** valida técnica × posição × variante, cores, dimensões, quantidade mínima e arte para cada personalização; deduplica apenas trabalhos realmente equivalentes. O draft recebe a configuração aprovada como contexto. A Shopify não verifica compatibilidade técnica MidOcean por receber propriedades; essa validação continua na app/funcionário.
- **Stock:** cruza o snapshot vendável Shopify por variante/localização com a disponibilidade e validade do feed fornecedor antes da oferta e novamente antes da encomenda. Reserva Shopify, quando aplicável e aprovada, tem prazo; não reserva automaticamente stock MidOcean. Sem inventory tracking ou com política de continuar a vender, não presumir bloqueio automático de excesso pelo checkout. Uma oferta expirada ou stock/configuração alterados exige nova validação.

Executar primeiro simulação com dados autorizados e expurgados; depois testar os dois percursos num ambiente identificado e autorizado, incluindo preço final, reserva e alteração de configuração. Enquanto faltarem regras comerciais ou custos válidos, manter o orçamento pendente de revisão humana. Nenhum preço real, draft remoto ou stock foi alterado neste parecer.

## Plano confirmado e limites reais

`get_shop_info` confirmou o domínio da loja do projeto, EUR e o rótulo antigo `Shopify`. Após descoberta do schema e validação da query, `shop.plan` devolveu **publicDisplayName=Grow, shopifyPlus=false, partnerDevelopment=false**. Não foram lidos clientes, contactos ou pedidos para esta verificação.

Apps públicos distribuídos pela Shopify App Store podem conter Functions e funcionar em qualquer plano; Functions numa app de distribuição personalizada exigem Plus. Esta restrição é sobre Functions, não uma proibição geral de desenvolver uma aplicação de servidor que use Admin API. Não considerar uma Function desenvolvida só para esta loja como disponível no Grow. [Disponibilidade de Shopify Functions](https://shopify.dev/docs/apps/build/functions).

Cart Transform `lineUpdate`, que substitui preço/título/imagem de uma linha, é restrito a lojas Plus ou development, inclusive quando fornecido por um app público. `lineExpand`/`linesMerge` têm mecanismos próprios de preço para bundles; a restrição de `lineUpdate` não permite concluir que todos os bundles ou todos os ajustes de preço exigem Plus. Um app público que use componentes pode ser uma alternativa, mas precisa de teste real do preço, stock, setup e configuração múltipla da M3D. [Cart Transform e preços dos componentes](https://shopify.dev/docs/api/functions/latest/cart-transform).

Não projetar uma consulta direta à MidOcean dentro da execução normal da Function. O alvo `run` recebe os dados de entrada; acesso de rede é uma capacidade separada, limitada e dependente de ativação Shopify. A documentação geral de rede aponta disponibilidade empresarial e o documento específico de Discount indica Plus/Enterprise com aprovação. Nenhuma destas páginas estabelece disponibilidade para Grow. Usar tabelas/preços aprovados sincronizados e funcionamento definido quando o feed estiver expirado. [Acesso de rede](https://shopify.dev/docs/apps/build/functions/network-access), [restrições do Discount Function](https://shopify.dev/docs/api/functions/latest/discount).

Há uma alternativa B2B nativa que não deve ser descartada por informação antiga: **Grow suporta B2B, regras de quantidade e price breaks**. Catálogos B2B nos planos não Plus exigem new Shopify Markets e permitem até três catálogos ativos nos mercados B2B; atribuição direta a empresas/localizações continua Plus. A configuração efetiva de Markets/B2B desta loja não foi auditada. Isto não estende automaticamente o mesmo tarifário ao consumidor B2C. [B2B por plano](https://help.shopify.com/en/manual/b2b/getting-started/plan-features).

## Regra de cálculo confirmada e decisões comerciais pendentes

Regra confirmada pelo utilizador: `(custo fornecedor + custo impressão) × fator`, com as fronteiras exatas da tabela abaixo. O cálculo é líquido; o IVA é acrescentado e o preço ao comprador é mostrado com IVA incluído. Taxas, territorialidade, isenções e coerência com `Shop.taxesIncluded` são matéria da verificação fiscal separada do líder/QA. Não assumir que basta multiplicar o preço por uma taxa e manter qualquer configuração fiscal existente.

Para avaliar a matemática, a tabela aplica o fator a todas as unidades do grupo. Ainda é necessário fechar o agrupamento Q e confirmar o modelo integral/progressivo:

| Quantidade Q | Fator f(Q) | Desconto sobre uma base 1,60 × C, se C for constante | Exemplo C=€10 por unidade |
| --- | --- | --- | --- |
| 1–199 | 1,60 | 0% | €16,00 |
| 200–499 | 1,50 | 6,25% | €15,00 |
| 500–1999 | 1,40 | 12,5% | €14,00 |
| 2000+ | 1,35 | 15,625% | €13,50 |

O desconto correto nesse caso é `d(Q) = 1 − f(Q)/1,60`. Não usar descontos de 10%, 20% ou 25% por simples diferença entre fatores. Estes fatores são acréscimos sobre custo; 1,60 corresponde a 60% de acréscimo e a 37,5% de margem bruta sobre a venda antes de outros custos, não a 60% de margem sobre a receita.

Para múltiplas impressões, definir `C(Q,v,k) = B(Q,v) + soma Ij(Q,v,kj)`: B é custo unitário do artigo/variante e cada Ij é a impressão unitária numa combinação técnica/posição/cores/dimensões. O custo total de preparação é `S(k)`, cobrado por grupos de trabalho reais, não repetido automaticamente por unidade ou por linha Shopify.

A fórmula recebida não diz se preparação tem margem, se está incluída no preço de impressão ou se é uma cobrança separada. Duas políticas possíveis, ainda não aprovadas:

- Preparação incluída na mesma base: `T = f(Q) × [Q × C(Q,v,k) + S(k)]`.
- Preparação separada: `T = Q × f(Q) × C(Q,v,k) + S_venda(k)`, sendo S_venda determinado pela política M3D.

Nunca somar S novamente se o feed já o incluiu no custo de impressão. Nunca escolher uma destas políticas silenciosamente. Com vários SKUs, o cálculo precisa de quantidades por linha/grupo e a soma dos custos reais; a forma acima é o caso de um grupo homogéneo.

Também falta decidir se o escalão se aplica a todas as unidades ou progressivamente apenas às unidades adicionais. Na hipótese da tabela, C=€10 dá €3184 para 199 unidades e €3000 para 200: comprar uma unidade adicional reduz o total em €184. Este salto não é um erro de conta; é uma consequência da política de escalão integral e precisa de confirmação antes da publicação.

## Por que um fator base constante não resolve o feed variável

Se P0=1,60 × C0 for o preço publicado, mas o custo correto no volume for C(Q), então o desconto necessário é `d(Q)=1 − [f(Q) × C(Q)]/P0`, antes de preparação e arredondamento. A tabela percentual anterior só vale quando C(Q)=C0 para a mesma configuração.

Exemplo fictício: custo inicial €10 → base €16. A 500 unidades, o fornecedor reduz artigo/impressão para €8. A venda correta é €8 × 1,40 = €11,20. Descontar 12,5% da base €16 produziria €14,00, ou seja, €2,80 a mais por unidade. O desconto correto sobre essa base seria 30%.

No sentido inverso, uma impressão adicional pode levar C a €14 a 201 unidades: a venda alvo seria €21,00. Um desconto sobre o artigo de €16 não acrescenta os €5 necessários. A configuração precisa já ter preço cobrável ou usar um mecanismo que defina o preço final; uma propriedade de carrinho com o texto da técnica não cria essa cobrança.

Não atualizar o preço global da variante a cada orçamento para contornar isto. Esse preço é partilhado por compradores e canais; dois clientes com configurações diferentes causariam interferência. O preço por orçamento pertence à oferta daquele pedido.

## Quantidade: quatro agrupamentos diferentes

1. **Margem M3D:** Q pode significar unidades do mesmo produto, da mesma variante, de uma configuração ou de todo o pedido. O utilizador deve escolher; não contar uma caneca e um relógio como volume conjunto por pressuposto.
2. **Custo fornecedor:** o escalão de compra pode agrupar por SKU/variante ou artigo. Seguir o contrato real da MidOcean; não reutilizar automaticamente o Q da margem.
3. **Impressão:** agrupar só trabalhos compatíveis, por exemplo técnica, posição, arte, dimensões e cores. Duas artes ou duas posições podem exigir preparações distintas, mesmo no mesmo artigo.
4. **Stock:** permanece por variante física/localização; não partilhar stock entre cores/tamanhos porque a impressão foi agrupada.

O mesmo variant_id pode aparecer em várias linhas Shopify quando as propriedades diferem. Line IDs/keys não são uma chave comercial estável: propriedades/descontos podem alterar a key. Recalcular o agrupamento a partir da configuração normalizada e dos identificadores físicos, não do número de linhas nem de uma key persistida. Propriedades com prefixo `_` são ocultação de interface, não um cofre para custos nem prova de autenticidade. [Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart).

Teste necessário: 120 unidades com arte A + 100 com arte B na mesma variante. Dependendo da política aprovada, podem somar 220 para margem/custo do artigo, mas continuar dois grupos de impressão/setup. Se forem cores/variantes diferentes, as condições de compra podem também ser diferentes. Um único contador global não representa estas regras.

## Viabilidade por mecanismo Shopify

| Mecanismo | O que pode cobrir | Limite para o pedido atual |
| --- | --- | --- |
| Descontos automáticos nativos | Base comercial fixa e desconto por quantidade elegível | Não calcula sozinho feed de compra, impressão/configuração e setup; contagem é dos itens elegíveis, não uma fórmula arbitrária por configuração. |
| App público com Discount Function | Desconto calculado por linha e agregação implementada pelo app | Disponível no Grow em princípio; produto real deve suportar as regras, integração e valores exatos. Não se presume que qualquer app de volume faça tudo. |
| App público com Cart Transform/bundles | Composição de artigo e serviços e preços de componentes | Avaliar compatibilidade, stock, cobranças removíveis e conflitos; não usar lineUpdate no Grow. |
| B2B nativo com price breaks | Tabela fixa por variante para comprador B2B | Quantidade exigida por variante; não soma cores/tamanhos nem calcula array livre de impressões/setup. |
| Functions próprias em custom app | Lógica completa projetada para descontos/transformações | Não disponível no Grow atual; Plus é condição de disponibilidade, não implementação pronta. |
| Servidor M3D + draft order | Preço calculado por oferta, variante física e serviços/setup | Viável como percurso de orçamento/aceitação; exige app/contrato/autorizações futuras e teste de impostos, stock e checkout. |

Os descontos automáticos nativos aplicam-se no carrinho/checkout quando as condições forem cumpridas; existe limite de 25 descontos automáticos ativos, incluindo apps. Três descontos por produto consomem o limite rapidamente — 24 regras já cobrem apenas oito produtos — e uma regra para toda uma coleção agrega itens elegíveis, podendo satisfazer o volume com produtos diferentes. [Descontos automáticos](https://help.shopify.com/en/manual/discounts/discount-methods/automatic-discounts), [itens elegíveis e quantidade mínima](https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount).

Não empilhar os três percentuais da tabela: são alternativas de escalão. Também é preciso decidir se cupões/promoções acumulam com este tarifário, pois podem reduzir a margem além da regra comercial. A Shopify aplica regras de combinação e seleciona o melhor desconto quando estes não podem combinar; isso não substitui testar quais linhas são elegíveis e qual escalão venceu. [Combinação de descontos](https://help.shopify.com/en/manual/discounts/discount-combinations).

Na Discount Function, o desconto pode visar cartLine com quantidade e ser percentual ou valor fixo por item/linha. O app pode somar linhas por produto/variante/grupo e distribuir o desconto, desde que tenha dados autorizados. Para custos variáveis, um desconto monetário calculado pode aproximar o preço alvo quando este não excede a base cobrável. Não é uma operação genérica para aumentar preço ou cobrar um serviço inexistente. Evitar aplicar desconto percentual ao setup quando a política disser que o setup fica fora do escalão. [Discount Function API](https://shopify.dev/docs/api/functions/latest/discount).

B2B price breaks são preços fixos e dependem da quantidade de cada variante; até dez quebras por produto são suportadas. O ajuste geral do catálogo deixa de se aplicar quando esse preço é fixado. Podem receber preços finais previamente calculados para ofertas estáveis, mas não equivalem a combinar 120 azuis + 100 vermelhos para obter automaticamente um escalão de 220. [Quantidade e volume B2B](https://help.shopify.com/en/manual/b2b/catalogs/quantity-pricing).

## Draft order para o âmbito completo

Recomenda-se manter a variante física ligada ao pedido e usar `priceOverride` para o preço calculado daquela oferta. `originalUnitPriceWithCurrency` serve para linhas customizadas e é ignorado quando existe variantId; não usar esse campo para tentar substituir o preço de uma variante. Preço override não é suportado em componentes de bundle e pode ser removido se a linha passar por uma transformação para bundle. [DraftOrderLineItemInput](https://shopify.dev/docs/api/admin-graphql/latest/input-objects/DraftOrderLineItemInput).

Fluxo operacional proposto, a executar apenas na futura etapa autorizada:

1. Receber produto/variantes, quantidades e lista de impressões; normalizar e validar contra os dados técnicos reais. O browser envia escolhas, nunca custo/total como autoridade.
2. Ler o snapshot contratual de custos e stock no servidor. Calcular os agrupamentos, preparação, fator e preço final. Guardar versão de regras/feed e prazo de validade da oferta.
3. Mostrar o orçamento detalhado ao comprador/funcionário; validar novamente quando quantidades, técnicas ou artes mudarem. Manter todas as técnicas suportadas no contrato, com revisão manual quando os dados não forem suficientes para cobrar corretamente.
4. Preparar cálculo Shopify com as variantes e, quando apropriado, linhas de serviço para impressão/setup. `draftOrderCalculate` permite conferir preço, descontos, transporte e impostos antes de criar o draft persistente. Nenhuma chamada dessa operação foi feita agora. [Pré-cálculo de draft order](https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftOrderCalculate).
5. Criar a oferta persistente apenas após validação; obter e apresentar o checkout/fatura do draft. Confirmar stock, configuração aprovada e cobrança no pedido pago antes de qualquer encomenda MidOcean. Não emitir uma encomenda a partir de parâmetros do carrinho.

Para impedir um desconto inesperado sobre um orçamento já calculado, definir explicitamente a política de `acceptAutomaticDiscounts`, `allowDiscountCodesInCheckout` e descontos aplicados. A proposta inicial é não adicionar descontos ao draft sem política aprovada; o servidor deve reler e conferir o total final. Estas opções estão no contrato Admin, não são flags de confiança recebidas do browser. [DraftOrderInput](https://shopify.dev/docs/api/admin-graphql/latest/input-objects/DraftOrderInput).

Impressão/setup podem ser linhas de serviço sem stock físico, mas o artigo deve manter a sua variante para não perder o vínculo de inventário/logística. Regras fiscais e de transporte das linhas precisam de decisão e teste; o simples uso de uma linha customizada não determina o IVA correto. Drafts não reservam automaticamente inventário para sempre: a oferta exige validade/revalidação e eventual reserva explicitamente definida. [Criar drafts e reservar stock](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft).

## Arredondamento e validação antes de cobrança

Usar decimal exato no servidor; não efetuar dinheiro com float binário nem arredondar o custo fornecedor antes de aplicar a política. Escolher explicitamente se se arredonda preço unitário ou total e a regra de desempate. A exibição, o cálculo e a cobrança têm de corresponder à mesma política.

Exemplo fictício: C=€2,97, fator 1,35, Q=2500. Unidade exata €4,0095. Arredondar a unidade para €4,01 dá €10025,00; arredondar o total exato dá €10023,75. A diferença é €1,25. Uma linha de quantidade 2500 com unidade a dois decimais não representa automaticamente o segundo total. Definir a política e conferir o resultado Shopify; não inserir um desconto/serviço de acerto sem decisão explícita.

O valor 15,625% também precisa de suporte real da UI/API do app escolhido e teste dos totais. Um campo/API aceitar Float ou Decimal no schema não certifica que Admin, UI ou aplicação preservem três casas decimais. Arredondá-lo para 15,63% antes de multiplicar pode alterar a cobrança. Não prometer igualdade de cada cêntimo entre descontos percentuais e preço final calculado sem verificar alocação/arredondamento do checkout.

Matriz mínima: Q=1/199/200/201/499/500/501/1999/2000/2001; uma e várias variantes; linhas da mesma variante divididas por arte; duas técnicas/posições; preparação única e repetida; custos que descem e sobem; mudança do feed; preço alvo maior que base; promoções concorrentes; stock insuficiente; PT/ES e tratamento de IVA aprovado; totais de PDP, orçamento, carrinho/draft, checkout e pedido. Testar remoção de serviços e alteração de propriedades no mecanismo escolhido. Dados fictícios ficam em ambiente isolado, nunca no catálogo partilhado da prévia como se fossem preço real.

## Pendências para fechar P-B

- Fronteiras fechadas: 1–199 / 200–499 / 500–1999 / 2000+. Confirmar escalão integral/progressivo e Q para margem, fornecedor e impressão.
- Decidir preparação: já incluída ou adicional, incidência do fator, frequência e repetição por arte/técnica/posição.
- IVA fechado quanto ao princípio: acrescentar ao líquido e exibir incluído. Validar aplicação fiscal/configuração Shopify na revisão separada; definir arredondamento, transporte e exclusões/descontos acumuláveis.
- Receber tabelas/amostras reais autorizadas de preço e impressão, incluindo mínimos, validade, variantes e restrições por técnica.
- Escolher percurso inicial: draft order para configuração completa; ou compra imediata apenas depois de demonstrar um mecanismo público compatível; B2B nativo pode cobrir ofertas fixas em paralelo.
- Conferir new Markets/B2B e permissões da futura app; confirmar custos/condições do eventual app público. Nenhuma recomendação de compra de um app específico foi feita.

Identificadores comerciais: o utilizador escolheu SKU próprio opaco (opção A); manter o mapping fornecedor ↔ SKU M3D no servidor, sem usar custos ou regras de preço dentro do SKU visível. Railway foi delegado e aceite como hospedagem; este parecer não realizou deploy nem depende de um serviço já operacional.

Validação desta tarefa: documentação primária atual consultada, páginas API identificadas como 2026-10; ShopPlan descoberto/validado/lido; input exploratório mínimo de Discount Function com linha/quantidade/preço/variantId/productId validado em 2026-10, sem criar extensão ou executar Function; cálculos conferidos com Decimal. Não foram chamadas APIs MidOcean autenticadas nem mutations Shopify.
