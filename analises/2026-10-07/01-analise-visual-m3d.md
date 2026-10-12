# Análise 1 — experiência visual atual da M3D para um consumidor B2C

Data: 07/10/2026. Estado: análise e recomendações para discussão; nenhuma alteração de tema aprovada ou implementada nesta etapa.

## Opinião

A suspeita de uma orientação demasiado B2B é sustentada pelo que aparece na loja. A homepage fala repetidamente de marca, equipa, produção e orçamento. A ficha de produto pede configuração e consulta comercial. Um consumidor que quer comprar uma peça para si ou um presente tem de descobrir se a loja sequer atende essa necessidade.

Visualmente, encontro uma base organizada: alinhamentos consistentes, fotografias grandes, contraste forte e identidade reconhecível. Não considero a homepage inteiramente desagradável. Considero-a mais próxima de uma apresentação de serviços de merchandising empresarial do que de uma loja de compra individual. A página de produto é a parte mais fraca para B2C: transmite a organização de uma ficha de fornecedor, com pouca demonstração do produto e pouca informação para decidir a compra.

A inspiração B2B contribuiu para esta direção, mas não explica tudo. Conteúdo provisório, caminhos incompletos e dados comerciais ausentes também tornam a experiência insuficiente para um comprador empresarial. Uma mudança cosmética isolada não resolveria esses pontos.

## Base da avaliação e limites

Inspeção real da vitrine protegida, após acesso fornecido pelo proprietário, em navegador Edge: desktop 1440 × 1000 e mobile 390 × 844. Homepage percorrida até ao fim, incluindo carregamento das imagens tardias; ambos os banners observados. Fichas Carlsberg e Jeep consultadas; Carlsberg também revista em mobile e no modal de quantidades. Coleção Wrist Watches e destino Pedir orçamento verificados.

É uma avaliação heurística e visual feita por um avaliador. Não mede rejeição, satisfação nem conversão de consumidores reais. Os dois produtos pertencem à mesma coleção sob consulta; não representam uma ficha futura com preço, stock e personalização completos. Não se realizou compra nem envio de orçamento. A palavra-passe e a sessão de acesso não foram guardadas nos documentos.

Rotas observadas: [homepage](https://uhqyjs-w5.myshopify.com/), [Carlsberg](https://uhqyjs-w5.myshopify.com/products/3s-161-carlsberg), [Jeep](https://uhqyjs-w5.myshopify.com/products/3s-160-jeep), [coleção](https://uhqyjs-w5.myshopify.com/collections/wrist-watches) e [orçamento](https://uhqyjs-w5.myshopify.com/pages/pedir-orcamento).

Esta análise utiliza somente evidência da M3D e julgamento sobre a experiência observada. A pesquisa externa B2C está num documento independente e não é usada aqui como benchmark ou justificação de redesenho.

## Homepage: o que vejo e o que isso comunica

| Elemento observado | Leitura pela perspetiva B2C | Melhoria a discutir |
| --- | --- | --- |
| Faixa com referência a empresas; H1 centrado na marca do comprador | Pressupõe que o visitante representa um negócio. Falta uma resposta imediata à compra para uso pessoal | Definir explicitamente o público e o tipo de compra na mensagem de entrada |
| Hero de 702 px de altura no desktop observado, com guarda-sol e logótipo empresarial | Imagem com presença, mas não esclarece o produto comprável, quantidade mínima ou preço | Apresentar uma oferta concreta e o percurso que ela abre |
| Painel escuro grande, títulos fortes e vários blocos de campanha seguidos | Aparência institucional e densa em mensagens promocionais; o produto fica em segundo plano | Rever o ritmo entre campanha, descoberta e oferta concreta |
| Primeira secção de novidades começa perto de y=1339 px no desktop | A pessoa passa por hero e duas campanhas antes da primeira vitrine de produtos | Testar acesso mais cedo a produtos e categorias úteis |
| Quatro desenhos com o mesmo nome genérico de produto, sem preço | Revela conteúdo demonstrativo; não dá matéria para comparar ou desejar um artigo específico | Substituir a demonstração por uma seleção comercial real, quando definida |
| Fotografias com Kopke, Castrol e Depil Concept | Reforçam a leitura de brindes corporativos ou trabalhos para marcas. Não comprovam, por si, relações comerciais da M3D | Distinguir exemplos de personalização de produtos efetivamente disponíveis |
| Categoria Tecnologia ilustrada por um cubo luminoso; Presentes sazonais por um saco junto à piscina | Imagens atraentes, mas a abrangência da categoria não é imediatamente evidente | Rever a correspondência entre nome, fotografia e produtos de destino |
| Categorias visuais surgem perto de y=2555 px no desktop, após vários blocos editoriais | Um caminho útil de descoberta chega tarde | Testar maior proximidade entre oferta inicial e navegação por categoria |
| Rodapé quase vazio, com grande área preta e crédito do tema | A página termina sem apoiar dúvidas de entrega, trocas, contacto ou confiança | Construir um rodapé útil com informação real e verificável |

As posições são coordenadas verticais aproximadas da página na sessão observada, não tempos de leitura nem dados de comportamento.

O segundo banner muda bastante a direção visual: vermelho, dourado, colagem de produtos, pessoa e grande desconto. Tem uma linguagem mais próxima de promoção ao consumidor, mas a mudança face ao primeiro é brusca. A arte promete até 20% em produtos selecionados; o slide não contém qualquer link. Falta um percurso entre interesse e seleção da promoção. Esta inspeção não verificou a configuração ou validade comercial desse desconto.

No mobile, o primeiro hero coloca um grande bloco preto com texto antes da fotografia. Os banners seguintes voltam a ocupar bastante altura. As novidades e categorias usam faixas horizontais: há pista visual de continuação, mas parte das opções exige um gesto adicional. A página tem legibilidade razoável, porém conduz por uma sequência longa de mensagens empresariais antes de oferecer uma escolha concreta de compra. No topo mobile observado, a pesquisa não aparece como campo exposto.

### Caminhos incompletos encontrados

Os 12 links do conteúdo principal da homepage observados no DOM resolvem para a própria raiz da loja. Incluem os botões do primeiro hero, campanhas, personalização, seleção editorial, todas as categorias, cinco cards de categoria e o CTA final de orçamento. Esta constatação refere-se ao conteúdo principal, não a todos os links do cabeçalho.

Assim, a pessoa pode encontrar uma imagem interessante e clicar sem avançar para os produtos correspondentes. Este problema tem prioridade superior a pequenos ajustes de cor, animação ou arredondamento.

## Página de produto: a sensação de catálogo de fornecedor

| Elemento observado | Consequência provável para a compreensão | Melhoria a discutir |
| --- | --- | --- |
| H1 apenas Carlsberg; categoria em inglês; SKU em destaque secundário | O título não descreve o objeto nem o seu benefício; pode parecer um catálogo interno | Nome comercial descritivo e consistente com o produto |
| Foto da ficha Carlsberg mostra Jeep no mostrador; ficha Jeep também mostra esse relógio | Inconsistência entre nome e imagem dificulta saber o que se recebe | Rever associação de fotografias e dados de catálogo |
| Uma imagem, produto relativamente pequeno dentro de uma área grande e branca | Há espaço visual, mas pouca informação de escala, acabamento, verso ou utilização | Fotografias reais que respondam a dúvidas e melhor ocupação da área útil |
| Preço e stock sob consulta nas duas fichas | A compra imediata não está disponível; falta base para comparar opções | Separar claramente a expectativa de consulta da de compra direta |
| Texto curto em inglês sobre caixa e garantia | Explica pouco sobre o relógio, características e conteúdo entregue | Descrição em português, com benefício e dados confirmados |
| Quantidade e tamanhos abre um modal, embora a ficha observada tenha uma opção genérica | Acrescenta trabalho e linguagem de pedido em lote à seleção simples | Adequar a complexidade do seletor às variantes reais de cada produto |
| Personalização exibe apenas a opção sem personalização | O formulário ocupa atenção sem demonstrar a proposta central da loja | Expor opções somente quando existirem e explicar como funcionam |
| CTA principal com o rótulo Preço sob consulta | Comunica um estado comercial, mas a ação e o resultado esperado ficam pouco explícitos | Explicar o pedido que será feito e o que acontece depois |
| MyShop ocupa um segundo botão largo | Introduz um conceito desconhecido durante a decisão de um visitante novo | Clarificar o benefício e rever o peso da ação secundária |
| Ausência de informação visível sobre entrega, custos e condições perto da decisão | Permanecem dúvidas práticas mesmo que a pessoa goste do produto | Disponibilizar respostas reais junto do percurso comercial |

Em mobile, o título da ficha Carlsberg começa perto de y=578 px e a ação principal fica aproximadamente em y=1160 px, abaixo da primeira janela de 844 px. A fotografia vem antes de toda a informação comercial; depois aparecem descrição, consulta, seletores e só então o CTA. Isso não prova abandono, mas demonstra a distância entre reconhecer o produto e agir.

O modal confirma que o produto ainda não pode ser comprado online. A regra sob consulta é uma decisão comercial conhecida para estes artigos; não recomendo inventar preço nem transformá-los em compra direta sem essa decisão. O problema é tornar esse percurso compreensível e completo.

Na coleção, 16 cards da primeira página exibem €0,00, enquanto as fichas dizem preço sob consulta. Há uma inconsistência objetiva entre listagem e detalhe. O utilizador pode interpretar o primeiro valor como preço real ou erro.

O destino do CTA da ficha, Pedir orçamento, contém apenas o título e o rodapé. Sem formulário ou orientação de contacto, o percurso comercial termina sem uma ação de continuidade disponível nessa página.

## O que preservaria e prioridades

Preservaria a identidade M3D, a clareza tipográfica, os alinhamentos, a base responsiva e as fotografias que efetivamente expliquem a oferta. Não há evidência nesta análise que justifique deitar fora todo o tema.

| Prioridade | Assunto | Razão |
| --- | --- | --- |
| 1 | Destinos dos CTAs, percurso de orçamento e preço coerente entre listagem e detalhe | São interrupções concretas da jornada atual |
| 2 | Oferta e público: o que um particular pode comprar, personalizar e receber | Essa definição deve orientar as mensagens e o catálogo |
| 3 | Dados e fotografia dos produtos | Permitem compreender e avaliar o objeto que será entregue |
| 4 | Hierarquia da homepage e simplicidade da ficha | Aproximam descoberta, decisão e ação |
| 5 | Coerência das campanhas, dimensões, espaçamento e acabamentos visuais | Refinam uma jornada comercial já compreensível |

São recomendações para revisão, não uma lista de implementação autorizada. A definição de quantidades mínimas, catálogo B2C e condições de entrega permanece comercial; não foi alterada aqui. A navegação existente também permanece intacta.

## Evidência visual

[Homepage desktop completa](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-home-desktop-full.png) · [Homepage mobile](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-home-mobile-full.png) · [Categorias carregadas](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-categorias-desktop.png) · [Segundo banner](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-home-banner2-desktop.png)

[Produto desktop](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-produto-desktop-full.png) · [Produto mobile](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-produto-mobile-full.png) · [Modal de quantidades](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-produto-quantidades.png) · [Página de orçamento](C:/Users/Administrator/m3dsolutions-shopifytheme-1/analises/2026-10-07/evidencias/m3d-orcamento-desktop-full.png)
