# C6 — fixtures locais de produto

Data: 08/10/2026. Executor: sub-agent nativo do Codex `review_scope`, função C6. Estado: execução concluída, 19 verificações aprovadas.

Script reproduzível: `.shopify/qa-redesign-20261008/fixtures-product.py`.
Resultado: `.shopify/qa-redesign-20261008/fixtures-product-results.json`.
Capturas: `fixture-product-positive1250.png` e `fixture-product-mixed-quote.png`, na mesma pasta.

O script abre por GET a prévia `http://127.0.0.1:9292/products/3s-145-amazon`. O preço real recebido permanece zero. Depois injeta somente no navegador variantes e valores de teste, com aviso visível “FIXTURE LOCAL — preços fictícios; checkout e mutações bloqueados”. O preço fictício de 1250 cêntimos e as variantes 990000001/990000002 não foram gravados no catálogo, tema, configuração ou Shopify.

Todos os pedidos diferentes de GET/HEAD são abortados; endpoints de mutação do carrinho e navegação de checkout também são bloqueados. Hot reload foi desativado dentro da fixture para que edições concorrentes não substituam o DOM de teste. Nenhum botão de adicionar, checkout ou contacto foi clicado. A chamada ao método `submit` ocorreu somente com uma quantidade inválida, para verificar a guarda existente antes de qualquer fetch.

| Cenário | Resultado observado |
| --- | --- |
| Dados reais: preço zero | Compra oculta e desativada; orçamento disponível |
| Zero, quantidade 1 → 7 | Contexto do orçamento contém `quantity=7`; compra continua bloqueada |
| Metafields/configuração ausentes | Zero técnicas e zero botões de técnica; sem erro ao atualizar estado |
| Variante fictícia com 1250 | UI mostra “12,50 € (teste)”; ação adicionar visível/ativa; consulta principal oculta e secundária disponível |
| Positivo, quantidade 7 | Contexto de orçamento preserva quantidade 7 |
| Positivo indisponível | Ação adicionar permanece visível e desativada |
| Regra mínima 2, incremento 2, máximo 8, quantidade 7 | Validade nativa falsa; clique de orçamento prevenido; `submit` retorna mensagem de quantidade inválida antes de fetch |
| Duas variantes, selecionando zero/positivo | Método real de mudança alterna consulta versus ação de preço positivo |
| Compositor com 1 linha zero + 3 positivas | Aceita consulta apesar do stock desconhecido/zero na linha sob consulta; guarda duas linhas, total 4, contexto `lines`; adicionar oculto/desativado |
| Compositor, quantidade acima do máximo | Erro de quantidade; lote permanece vazio |
| Recarregar a página original | JSON de variantes servidor idêntico ao inicial; preço continua zero |

Auditoria final: **zero tentativas de mutação de carrinho ou navegação de checkout**. O artefato JSON contém o conjunto original e o recebido depois da recarga para comparação. Uma primeira classificação demasiadamente ampla confundia o GET de `/checkouts/internal/preloads.js` com checkout; foi corrigida para distinguir recursos estáticos de navegação, sem alterar o tema.

Estas fixtures exercitam os métodos JavaScript reais da PDP e a sua UI. Os preços HTML positivos foram fornecidos explicitamente pela fixture; **não comprovam a renderização Liquid/money da Shopify para catálogo positivo ou misto**. O markup do compositor também foi criado somente no DOM da fixture, pois o produto real tem uma variante. A seleção foi exercitada por evento `change` no controle local; isto não substitui teste de acessibilidade/renderização do compositor produzido pelo Liquid para um produto multivariante real.

Nenhum arquivo de tema foi editado nesta tarefa. Script, JSON e capturas ficam em `.shopify/`, pasta de artefatos ignorados. Sem alteração de catálogo, commit, push ou deploy. O desconto integral do carrinho é validado separadamente pelo C5.
