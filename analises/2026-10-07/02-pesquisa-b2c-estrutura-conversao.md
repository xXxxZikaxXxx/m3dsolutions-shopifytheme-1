# Análise 2 — estrutura, conteúdo e conversão no comércio B2C

Pesquisa independente, consultada em 07/10/2026. Este documento não avalia a M3D nem propõe aplicar automaticamente os exemplos ao seu projeto.

## Tese e método

Uma loja B2C converte quando a pessoa encontra uma oferta relevante, consegue avaliá-la e conclui a compra com confiança e esforço aceitável. A imagem contribui para isso, mas preço, catálogo, reputação, disponibilidade, entrega, aquisição de tráfego e experiência anterior também influenciam o resultado.

Não encontrei uma base pública comparável que permita ordenar os sites pela conversão real e depois atribuir o resultado ao seu design. Foram escolhidos três negócios de grande dimensão com modelos diferentes: Amazon, Etsy e Decathlon. Os resultados financeiros comprovam escala; não isolam o efeito de um botão ou de uma composição de página.

Foram cruzados quatro tipos de evidência: resultados oficiais das empresas; páginas públicas e documentação das próprias lojas; investigação de usabilidade; estudos académicos e um caso de teste A/B. Recomendações de organização apresentadas mais adiante são síntese de projeto, não uma sequência universal cientificamente comprovada.

A homepage Amazon.es foi observada em navegador, em sessão sem login com região de entrega detetada como Brasil e interface em inglês. Parte do conteúdo dinâmico ainda estava a carregar na captura; a análise visual limita-se ao cabeçalho e campanhas visíveis. As páginas Decathlon.pt e Etsy foram consultadas por extração pública de conteúdo; a captura visual direta foi bloqueada ou não carregou. Não se apresenta essa extração como medição de layout em pixels. Não houve compra, login de cliente ou auditoria completa dos checkouts desses sites.

## Escala comercial: três referências, sem ranking artificial

| Referência | Dado oficial e período | O que o dado significa |
| --- | --- | --- |
| Amazon | US$82,988 mil milhões em Online stores no quarto trimestre de 2025 | Receita dessa categoria num trimestre. Não é GMV do marketplace nem receita total da Amazon, que inclui AWS e outros negócios |
| Etsy | US$10,4607 mil milhões de GMS do marketplace Etsy em 2025 | Valor bruto de mercadorias transacionadas no marketplace principal; não é a receita de comissões da empresa |
| Decathlon | €16,8 mil milhões de vendas líquidas em 2025; 20,2% de participação digital | Total do grupo. A categoria digital inclui e-commerce, encomendas conectadas nas lojas e marketplace externo |

Fontes: [Amazon — resultados Q4 2025](https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Fourth-Quarter-Results/default.aspx), [Etsy — resultados 2025, nota 1](https://investors.etsy.com/news-events/press-releases/detail/218/etsy-inc-reports-fourth-quarter-and-full-year-2025-results), [Decathlon — resultados 2025](https://www.decathlon-united.media/pressfiles/2025results).

As métricas, moedas, períodos e canais diferem. Servem para justificar a seleção dos casos; não devem ser somadas ou comparadas como se fossem faturação online equivalente.

## Como as referências organizam a compra

| Referência e evidência | Organização observada | Interpretação de projeto e limite |
| --- | --- | --- |
| [Amazon.es](https://www.amazon.es/) — cabeçalho e campanhas em navegador | Pesquisa muito ampla no topo; destino, conta, pedidos e carrinho próximos; navegação comercial e campanhas promocionais imediatamente abaixo | Prioriza acesso rápido a um catálogo vasto e continuidade operacional. A densidade faz sentido no contexto de marca conhecida; esta inspeção não prova que essa densidade ajude uma loja nova |
| [Etsy](https://www.etsy.com/) — conteúdo público da homepage | Pesquisa; entradas por presentes e interesses; curadoria sazonal; seleções por ocasião/destinatário; categorias; artigos com preços; editorial | Ajuda quem sabe para quem ou para que ocasião compra, mas ainda não sabe o nome do produto. A ordem é a da extração consultada e pode variar por sessão |
| [Decathlon Portugal](https://www.decathlon.pt/) — conteúdo público da homepage | Campanha ligada a produtos; seleções por atividade e necessidade; cards com preço e avaliações; outras campanhas; serviços e clube | Alterna inspiração com informação que permite comparar e escolher. Os números de avaliações são os apresentados pela loja, não verificados individualmente |

Na [ficha Jogflow da Decathlon](https://www.decathlon.pt/p/sapatilhas-de-corrida-homem-kalenji-jogflow-100-1-cinzento-laranja/337693/c169c50m8733470), o conteúdo reúne título descritivo, avaliações, benefício, cor, tamanhos e guia, preço e ação de carrinho. Em seguida aparecem condições de troca/garantia, entrega, fotografias, características e detalhes. Uma observação crítica: o texto consultado contém recomendações de tamanho e valores de drop aparentemente divergentes em secções diferentes. Mesmo grandes lojas precisam de coerência de informação.

O [guia oficial de fichas da Etsy](https://www.etsy.com/ca/seller-handbook/article/1347574487014) enfatiza imagens, título, preço, estimativa de entrega, políticas, descrição e avaliações. A [documentação de personalização](https://help.etsy.com/hc/en-us/articles/360000344528-How-to-Offer-Personalized-Listings) orienta a pedir detalhes específicos, mostrar exemplos de resultado e indicar limites. A lição transferível é traduzir a personalização em decisões que o comprador entende.

O denominador comum é a ligação entre intenção, produto e decisão. As aparências diferem: uma experiência pode apoiar pesquisa objetiva; outra pode apoiar descoberta emocional; outra pode explicar adequação técnica. Não há uma estética B2C única.

## Dados que ajudam a priorizar

| Evidência | Resultado publicado | Interpretação permitida |
| --- | --- | --- |
| Baymard, compilação de 50 estudos | Abandono médio de carrinho de 70,22% | Referência agregada com estudos de épocas e metodologias diferentes; não é meta de desempenho de uma loja |
| Baymard, razões declaradas por compradores dos EUA, excluindo o motivo de apenas explorar | 40% custos adicionais; 20% entrega lenta; 18% exigência de conta; 17% checkout longo/complexo | Motivos declarados, não percentagens exclusivas de todas as sessões; não somar nem aplicar diretamente a Portugal/Espanha |
| Baymard, navegação 2025 | 67% dos sites mobile avaliados tinham resultado medíocre ou fraco | Popularidade comercial não garante boa usabilidade |
| Baymard, produto 2026 | 62% dos sites mobile avaliados tinham resultado medíocre ou pior | A página de produto continua a ser uma área relevante de melhoria |
| Medill Spiegel, investigação sobre reviews publicada em 2017 | Probabilidade de compra 270% superior para produtos com cinco reviews face a produtos sem reviews, nos dados estudados | Efeito relativo e contextual, não aumento de 270 pontos percentuais nem previsão para qualquer loja |
| Vodafone, teste A/B publicado em 2021 | Melhoria de 31% no LCP acompanhada de mais 8% de vendas | Evidência experimental naquele contexto; não permite prometer ganho igual noutro negócio |

Fontes: [Baymard — abandono e motivos](https://baymard.com/lists/cart-abandonment-rate), [navegação 2025](https://baymard.com/research-articles/ecommerce-navigation-best-practice), [produto 2026](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux), [Medill Spiegel — reviews](https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/), [Vodafone — método e resultado do A/B](https://web.dev/case-studies/vodafone).

Os artigos do mesmo fornecedor podem exibir versões diferentes das estatísticas. Aqui, os motivos de abandono foram retirados juntos da página principal consultada, que identifica esses motivos como dados de 2026; não foram combinados percentuais de edições anteriores. A compilação histórica de 50 estudos indica atualização em setembro de 2025.

## Onde colocar os blocos de uma homepage

A sequência abaixo é uma hipótese inicial para uma loja B2C de catálogo pequeno ou médio, com visitas novas e recorrentes. Deve mudar com a intenção e o modelo comercial. Quem chega por anúncio ou Google diretamente ao produto pode nunca passar pela homepage.

| Ordem sugerida | Bloco e conteúdo | Pergunta que resolve | Ação e medida útil |
| --- | --- | --- | --- |
| 1 | Cabeçalho compacto: identidade, categorias compreensíveis, pesquisa e carrinho | Estou no lugar certo? Como encontro o que procuro? | Uso da pesquisa e sucesso em encontrar produto |
| 2 | Proposta principal com imagem relevante, H1 claro, explicação curta e uma ação predominante | O que se vende e por que me interessa? | Clique para uma seleção coerente com a promessa |
| 3 | Entradas visuais por produto, utilização ou ocasião | Por onde começo? | Seleção de categoria seguida de visita a produto |
| 4 | Pequena seleção real de produtos: fotografia, nome, preço e atributos de comparação | O que posso comprar agora? | Visitas qualificadas ao produto e adições ao carrinho |
| 5 | Benefícios específicos ou demonstração de utilização/personalização | Por que escolher esta oferta? Como funciona? | Avanço para produto/configuração sem aumento de dúvidas |
| 6 | Avaliações autênticas, exemplos de clientes ou demonstrações verificáveis | O resultado corresponde ao prometido? | Interação com prova e conclusão de compra, sem atribuição causal automática |
| 7 | Seleção complementar ou conteúdo editorial ligado a uma intenção | Há uma alternativa mais adequada? | Descoberta de outro produto, preservando margem |
| 8 | Ajuda e rodapé: contacto, entrega, devolução, pagamentos, políticas | Consigo resolver um problema e compreender as condições? | Menos dúvidas não resolvidas e melhor conclusão do percurso |

Confiança não precisa de ficar confinada ao bloco 6. Uma condição relevante de entrega pode aparecer junto da primeira oferta e voltar a aparecer junto do preço. Informação operacional deve estar perto da decisão que afeta.

Uma marca de compra recorrente pode pôr pesquisa e recompra antes de um grande hero. Uma marca nova pode precisar de explicar a diferença do produto mais cedo. Presentes beneficiam de entradas por destinatário/ocasião. Produtos caros podem exigir demonstração e comparação mais extensas. Estas são hipóteses de organização, não regras de número de secções.

Carrosséis automáticos exigem cuidado: a investigação da [Nielsen Norman Group](https://www.nngroup.com/articles/auto-forwarding/) relata mensagens ignoradas e dificuldade de interação quando o conteúdo muda sozinho. Uma oferta principal estável é uma alternativa a testar; o estudo não estabelece uma percentagem universal de perda para todo carrossel.

## Onde acontece a conversão na página de produto

A compra é construída em várias decisões. O CTA é a ação final de uma etapa; não compensa uma oferta que a pessoa não compreende. Uma composição de partida para desktop coloca galeria e informação de compra lado a lado. No mobile, a ordem deve manter identidade do produto, fotografia e informação decisiva próximas, com seletores e ação alcançáveis sem conteúdo irrelevante no caminho.

| Zona | Conteúdo recomendado | Função |
| --- | --- | --- |
| Identificação | Breadcrumb discreto, H1 descritivo, avaliação/resumo verificável quando existir | Confirmar o produto e permitir regressar à categoria |
| Demonstração | Foto principal, outros ângulos, detalhe, escala e utilização; resultado personalizado quando aplicável | Reduzir incerteza sobre o objeto real |
| Decisão | Preço e o que inclui, disponibilidade, variantes, quantidade, data/estimativa de entrega e custos conhecidos | Permitir avaliar adequação e compromisso financeiro |
| Personalização | Campos com exemplos, limites, custo incremental e prévia quando for fiel ao resultado | Permitir configurar sem exigir conhecimento do processo industrial |
| Ação | Botão claro, estado de envio, confirmação e carrinho atualizado | Transformar a intenção numa ação concluída |
| Segurança da decisão | Resumo de condições e links para entrega, trocas e apoio | Responder às objeções no momento em que surgem |
| Aprofundamento | Benefícios, especificações, medidas, manutenção, dúvidas e reviews | Sustentar a avaliação de quem precisa de mais informação |
| Continuidade | Complementares ou alternativas relevantes | Ajudar sem desviar prematuramente do produto principal |

Esta organização é uma síntese, apoiada na importância de informação suficiente indicada pela [Nielsen Norman Group](https://www.nngroup.com/reports/ecommerce-ux-product-pages-including-reviews/). Detalhes concretos devem refletir cada categoria: roupa exige medidas; um dispositivo exige compatibilidade; um artigo personalizado exige clareza sobre o resultado e a produção.

Se uma escolha obrigatória ainda falta, o botão deve orientar para essa escolha. Um CTA fixo no mobile só é útil quando não cobre informação, não cria a ilusão de configuração concluída e mantém o preço consistente. Adicionar ao carrinho deve produzir confirmação visível; comprar agora inicia um compromisso diferente e deve ser explicado pelo fluxo.

No carrinho e checkout, as prioridades são rever itens/variantes, mostrar custos e entrega, permitir correção, apresentar métodos adequados e concluir com o mínimo necessário de dados. Upsells e criação de conta devem ser avaliados pelo efeito na compra concluída, não só pelo número de cliques.

## H1, títulos e palavras-chave

O H1 identifica o assunto principal da página. Recomendo um título principal visível e descritivo por página como convenção editorial clara. A posição exata não é uma fórmula de conversão. O Google explica que não existe uma quantidade mágica de headings e que a ordem semântica é útil para leitores de ecrã. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

| Tipo de página | H1 e posição de partida | Exemplo genérico |
| --- | --- | --- |
| Homepage | Proposta principal perto do início do conteúdo | Presentes personalizados para momentos especiais |
| Categoria | Antes da seleção/filtros e lista de artigos | Garrafas térmicas personalizadas |
| Produto | Nome específico junto da área de decisão; fácil de encontrar no mobile | Garrafa térmica personalizada de 500 ml — modelo Aurora |
| Guia | Pergunta ou tarefa informativa realmente respondida | Como escolher o tamanho de uma t-shirt |

H2 organiza secções como características, medidas ou avaliações; H3 subdivide quando necessário. O título do separador e do resultado de pesquisa, definido em title, tem função diferente do H1. O Google pode usar o título principal entre os sinais para gerar o link de título na pesquisa. [Documentação de title links](https://developers.google.com/search/docs/appearance/title-link).

Palavras-chave devem refletir intenção, idioma e oferta. Exemplos abaixo são hipóteses sem volume de pesquisa validado; não são recomendações baseadas em Keyword Planner ou Search Console.

| Intenção | Exemplos de consulta | Destino adequado |
| --- | --- | --- |
| Produto específico | garrafa térmica 500 ml; t-shirt bordada | Categoria ou produto relevante |
| Personalização | caneca com fotografia; mochila com nome | Categoria/folha que demonstre essa opção |
| Presente/ocasião | presente personalizado aniversário; presente para professora | Seleção editorial comprável e realmente adequada |
| Comparação | garrafa de vidro ou inox | Guia de comparação com links para produtos |
| Operacional | prazo de entrega; como enviar fotografia | Ajuda clara e acessível durante a compra |
| Espanha | regalos personalizados; botella personalizada con nombre | Conteúdo nativo em espanhol, ajustado à intenção local |

A pesquisa necessária antes de escolher prioridades: separar Portugal e Espanha; recolher consultas reais e termos usados por clientes; verificar resultados de pesquisa e intenção; comparar procura, sazonalidade, concorrência e capacidade de entrega; atribuir cada intenção a uma página útil. Não criar páginas quase iguais apenas para repetir variantes de palavras.

Aplicar os termos naturalmente ao title, H1, nomes, descrição, links e texto alternativo pertinente. O texto alternativo descreve a imagem para acessibilidade. Categorias e produtos devem ser alcançáveis por links de navegação: o Google não depende de preencher a pesquisa interna para descobrir o catálogo. [Estrutura de e-commerce no Google](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure).

Para microcopy, usar verbos que antecipem a ação: ver modelos, escolher tamanho, personalizar com nome, adicionar ao carrinho. Condições como entrega numa determinada data, preço com personalização ou quantidade mínima só ajudam quando são específicas e verdadeiras. Não há uma palavra isolada capaz de garantir vendas.

## O que existe de psicológico e como usar com rigor

| Mecanismo | Aplicação razoável | Limite da interpretação |
| --- | --- | --- |
| Reconhecimento e orientação | Nomes familiares, categorias visuais e pistas sobre o destino de cada link | Reduzir a necessidade de adivinhar; não significa que todos usam a mesma navegação. [NN/g — reconhecimento](https://www.nngroup.com/articles/recognition-and-recall/) e [pistas de informação](https://www.nngroup.com/articles/information-scent/) |
| Redução de incerteza | Tornar visíveis custo, prazo, características e condições | É uma resposta a dúvidas reais, não uma garantia de compra |
| Identificação com o uso | Mostrar escala, contexto e resultado final | A imagem deve representar o artigo; imaginar utilização é uma hipótese explicativa, não um ganho de conversão quantificado nesta pesquisa |
| Prova social | Reviews autênticas, conteúdo específico e origem identificável | A evidência da Medill é contextual; avaliações inventadas ou só perfeitas não substituem confiança |
| Esforço de decisão | Organizar opções por atributos úteis, permitir comparação e revelar complexidade progressivamente | Menos opções não é sempre melhor: importa a qualidade da organização e a intenção |
| Referência de preço | Explicar o que está incluído e comparar opções equivalentes | Descontos ou preços de referência não sustentados confundem a avaliação |
| Progresso e controlo | Mostrar seleção, validação e resultado de cada ação | Não forçar passos supérfluos só para obter compromisso |

Uma meta-análise de 50 experiências, com 5.036 participantes, encontrou efeito médio praticamente nulo de excesso de escolha, com variação importante entre estudos. Portanto, a regra de que reduzir opções sempre aumenta vendas não é defensável. [Scheibehenne, Greifeneder e Todd, 2010](https://doi.org/10.1086/651235).

As fontes consultadas também não sustentam uma cor universal de botão ou uma ordem fixa de blocos que converta melhor em qualquer site. A decisão depende do contexto, contraste, familiaridade e oferta. Urgência pode informar uma condição real; contadores reiniciados, stock fictício e testemunhos inventados não são uma estratégia de confiança.

## Transformar estas hipóteses em decisões mensuráveis

| Etapa | Sinal a medir | Pergunta de diagnóstico |
| --- | --- | --- |
| Entrada | Origem, dispositivo, país e página de entrada | A promessa que trouxe a pessoa corresponde à página? |
| Descoberta | Pesquisa sem resultados, seleção de lista, chegada a produto | É possível encontrar um artigo adequado? |
| Avaliação | Escolha de variante, erros, início/conclusão de personalização | As escolhas são compreensíveis e completáveis? |
| Carrinho | Adição confirmada e início de checkout | A oferta é suficientemente clara para avançar? |
| Pagamento | Compra paga, falha, abandono entre passos | Que dúvida ou impedimento interrompe a conclusão? |
| Resultado comercial | Receita líquida/margem por visita, devoluções e contactos de apoio | O aumento de encomendas gera um negócio melhor? |

Definir antes do teste os denominadores: taxa de compra por sessão não é a mesma coisa que compra por utilizador ou checkout concluído. Contabilizar pagamentos de forma consistente, evitar duplicados e segmentar por origem/dispositivo/mercado. Uma taxa global pode mudar apenas porque mudou o tráfego.

Ordem proposta para experimentação: primeiro corrigir caminhos e estados quebrados; depois validar oferta e informação; em seguida testar hierarquia e conteúdo; por fim testar acabamentos. Antes de um A/B, observar pessoas do público-alvo a encontrar, escolher e compreender uma compra. Poucas sessões qualitativas ajudam a descobrir problemas, mas não estimam taxas populacionais.

Um A/B deve definir uma hipótese, métrica principal, efeito mínimo relevante, duração e tamanho amostral; evitar encerrar ao primeiro resultado favorável. Não escolher amostra sem conhecer tráfego e taxa de base. Com pouco tráfego, privilegiar evidência qualitativa e correções claras, reconhecendo a incerteza de comparações antes/depois.

Exemplos independentes de testes: categorias mais cedo versus posição atual; título funcional versus genérico; explicação de entrega junto ao preço versus apenas em ajuda; imagem de escala versus galeria sem escala. Medir compra e qualidade do pedido, além do clique intermediário. Descontos exigem acompanhar margem e não só volume.

Desempenho entra nesta avaliação como experiência do comprador: os limites de boa experiência dos Core Web Vitals são LCP até 2,5 s, INP até 200 ms e CLS até 0,1, avaliados no percentil 75 das visitas. Um ensaio de laboratório isolado não equivale a esses dados reais. [Web Vitals](https://web.dev/articles/vitals).

## Decisões que esta pesquisa permite — e as que ainda exigem dados

A evidência justifica priorizar clareza, informação de decisão, navegação compreensível, demonstração de produto e compra sem fricção desnecessária. Justifica testar hierarquia e conteúdo antes de atribuir resultados a estilo visual.

Não permite prometer uma percentagem de crescimento, declarar um layout vencedor para qualquer negócio, escolher keywords por volume ainda não medido ou concluir que grandes lojas vendem por causa de um padrão isolado. Para avançar a um projeto específico, faltam público, catálogo comprável, margem, proposta de valor, logística e dados do percurso desse negócio. Este estudo permanece separado de qualquer diagnóstico da M3D.
