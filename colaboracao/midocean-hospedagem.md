# MidOcean — alojamento do backend M3D

Pesquisa de documentação primária em 09/10/2026. Recomendação de arquitetura; nenhum serviço, conta, credencial ou deploy criado. Complementa [midocean-arquitetura.md](midocean-arquitetura.md). O repositório atual contém o tema; o backend será um projeto separado.

## Recomendação concreta

Para o primeiro piloto, recomendo Node.js/TypeScript no Railway, PostgreSQL privado no mesmo projeto e Cloudflare R2 privado para snapshots e artes. Região proposta: Amsterdam, com aplicação e base juntas; é uma região efetivamente disponível. [Regiões Railway](https://docs.railway.com/deployments/regions).

O motivo é o tipo de trabalho: feeds completos potencialmente grandes, importações agendadas, seleção manual do catálogo, custo privado, reconciliação e futuras configurações com várias posições. Node permite começar com parsers comuns, streaming e disco temporário, e aumentar a memória do processo se as amostras exigirem. Esta é uma avaliação técnica do MVP, não um benchmark dos feeds: ainda não medimos tamanho, duração e memória com uma conta real MidOcean.

Começaria com um único operador responsável no piloto. Hobby tem mínimo de US$5/mês e esse valor inclui US$5 de consumo; não se somam US$5 por cima de toda a utilização. Para uma operação partilhada por equipa/produção, a Railway posiciona o Pro, com mínimo US$20/mês e colaboração. Propor Hobby para piloto não significa apresentar o plano como equivalente operacional ao Pro. [Planos e preços Railway](https://docs.railway.com/pricing/plans).

## Estrutura proposta

| Componente | Função |
| --- | --- |
| API Node autenticada | Seleção dos produtos, prévia das diferenças, aprovações, estados e cálculo privado; devolve um ID de tarefa para operações longas. |
| Runner Node agendado | Agenda lógica de stock horário e feeds diários, executa tarefas pendentes em lotes e termina. Usa o mesmo código da API, com processo e limites de recursos próprios. |
| PostgreSQL privado | IDs fornecedor/Shopify, lista selecionada, custos, versões, jobs, aprovações, reservas/reconciliação e auditoria. |
| R2 privado | Snapshots de origem e artes de clientes; retenção explícita e referências por chave. |
| Shopify Files | Media pública aprovada de produto/posição, conforme o contrato já acordado. |

Uma fila persistida em PostgreSQL pode atender o piloto; Redis não é necessário para iniciar. O runner obtém tarefas com lease/lock, guarda checkpoints e retoma após falha. Uma API de importação nunca deixa um processamento completo dependente da ligação do browser.

O cron Railway pode arrancar o runner a cada cinco minutos. O banco determina se cada feed está devido: stock uma vez por hora, catálogo/preços/impressão uma vez por dia. Isto também permite executar retentativas pendentes sem voltar a descarregar o fornecedor a cada cinco minutos. Frequências finais dependem do contrato de chamadas MidOcean; a cadência publicada dos feeds não autoriza polling ilimitado.

## Custo esperado do piloto

Orçamento inicial proposto: US$10–15/mês no piloto de um operador. Em Pro, reservar US$20–30/mês para um conjunto pequeno de serviços. Valores sem IVA, conversão cambial, domínio, Shopify ou custos do fornecedor. São estimativas de infraestrutura, não uma proposta contratual nem preço garantido.

Taxas verificadas: RAM US$10/GB-mês, CPU US$20/vCPU-mês, volume US$0,15/GB-mês e saída de rede US$0,05/GB. [Tabela Railway](https://docs.railway.com/pricing/plans).

Exemplo de consumo mensal hipotético, para tornar a estimativa verificável:

| Consumo médio agregado | Cálculo | Valor |
| --- | --- | --- |
| 0,75 GB de RAM entre serviços, incluindo DB | 0,75 × US$10 | US$7,50 |
| 0,05 vCPU médio agregado | 0,05 × US$20 | US$1,00 |
| 1 GB de volume persistente | 1 × US$0,15 | US$0,15 |
| 10 GB de saída de rede | 10 × US$0,05 | US$0,50 |
| Consumo ilustrativo | Soma | US$9,15 |

Com Hobby, o total desse exemplo é US$9,15, pois excede o mínimo incluído de US$5. Com Pro e uso abaixo do crédito do plano, o total fica no mínimo de US$20. [Fórmula de faturação Railway](https://docs.railway.com/pricing/understanding-your-bill). Os 0,75 GB e 0,05 vCPU são hipóteses nossas; a RAM média não é a memória máxima configurada. Um parser que mantenha todos os feeds em memória, ou um worker continuamente ocupado, muda a conta.

R2 Standard inclui 10 GB-mês, um milhão de operações A e dez milhões B por mês; além disso, armazenamento custa US$0,015/GB-mês. Saída do R2 é gratuita, mas a subida de ficheiros a partir da Railway conta na saída da Railway. Dentro das franquias, o R2 acrescenta US$0 ao exemplo. Não é necessário pagar Workers para usar R2 através da API S3. [Preço R2](https://developers.cloudflare.com/r2/pricing/), [acesso S3](https://developers.cloudflare.com/r2/api/s3/presigned-urls/).

Configurar alerta de consumo e limite de recursos. A Railway também tem limite financeiro rígido, mas ao atingir esse limite desliga os workloads: não escolher um teto baixo sem aceitar essa consequência para stock e orçamentos. [Controlo de custos](https://docs.railway.com/pricing/cost-control).

## Comparação das opções

| Opção | Custo inicial de planeamento | Adequação ao MVP |
| --- | --- | --- |
| Railway + PostgreSQL + R2 | US$10–15 piloto; Pro US$20–30 | Recomendação: Node completo e operação simples, com medição por uso. |
| Cloudflare Workers Paid + Queues + D1 + R2 + Cron | Aproximadamente US$5–10 com uso baixo | Menor custo base; exige streaming, lotes e checkpoints compatíveis com os limites de Workers. |
| Render Node + Postgres + cron + R2 | Aproximadamente US$15–25 em configuração pequena | Alternativa com compute de instância previsível e cron longo; confirmar preços de cada instância no momento de contratar. |

Para Render, o último exemplo oficial de pequena configuração encontrado refere cerca de US$13/mês para web Starter + Postgres Basic-256mb em julho de 2026. Cada serviço cron tem mínimo US$1/mês; dois crons acrescentam pelo menos US$2. A página atual de preços depende de conteúdo dinâmico que a ferramenta não expôs por completo; por isso a faixa Render é indicativa, não uma cotação exata atual. [Modelo de custos Render](https://render.com/articles/how-much-does-cloud-application-hosting-cost-for-small-businesses), [cron Render](https://render.com/docs/cronjobs), [preços para conferir](https://render.com/pricing).

Não usaria a base gratuita Render como persistência do piloto: expira após 30 dias. O web gratuito suspende após inatividade; é útil para experimentar, não para prometer execução e resposta permanente. [Limites gratuitos Render](https://render.com/articles/how-much-does-cloud-application-hosting-cost-for-small-businesses).

## Cloudflare: onde encaixa e limites relevantes

Workers Paid começa em US$5/mês, inclui dez milhões de pedidos e trinta milhões de milissegundos de CPU. O D1 pago inclui 5 GB de armazenamento, 25 mil milhões de linhas lidas e 50 milhões escritas por mês; Queues inclui um milhão de operações mensais. Por isso US$5 é possível com uso baixo, não um teto. [Workers/D1 preços](https://developers.cloudflare.com/workers/platform/pricing/), [Queues preços](https://developers.cloudflare.com/queues/platform/pricing/).

| Limite verificado | Consequência de desenho |
| --- | --- |
| 128 MB de memória por isolate | Não carregar feed completo com response.json() ou response.text() sem limite; parser em streaming. |
| HTTP pago: CPU padrão 30 s, configurável até 300 s | Cálculo/API curtos; processamento pesado separado. |
| Cron pago: CPU 30 s para intervalo menor que 1 h; até15 min com intervalo ≥1 h | Distinguir a frequência do scheduler e a duração do processamento. |
| Cron e consumidor Queue: wall time15 min | Checkpoints, lotes e retomada; não depender de uma importação monolítica. |

Nos pedidos HTTP recebidos, o limite de corpo usual das zonas Free/Pro é 100 MB e pertence ao plano da conta Cloudflare, não ao plano Workers. Esse limite não restringe diretamente o tamanho de um feed descarregado como resposta; memória e processamento continuam a exigir streaming. [Limites Workers](https://developers.cloudflare.com/workers/platform/limits/).

Queues permite mensagens de 128 KB, batches até 100 e consumidor com CPU até 5 min; guardar o feed no R2 e enviar referências, não o ficheiro dentro da mensagem. Uma entrega costuma consumir três operações; retentativas acrescentam leituras. A entrega é pelo menos uma vez: idempotência continua a ser nossa responsabilidade. Configurar retentativas limitadas e dead-letter queue. [Limites Queues](https://developers.cloudflare.com/queues/platform/limits/), [cobrança Queues](https://developers.cloudflare.com/queues/platform/pricing/), [garantias](https://developers.cloudflare.com/queues/reference/delivery-guarantees/).

D1 pago tem limite de 10 GB por base, linha até 2 MB e consulta até 30 s. Guardar metadados normalizados no D1; arquivos/snapshots no R2. É suficiente para um catálogo selecionado, mas não justifica inserir o feed bruto numa única linha. [Limites D1](https://developers.cloudflare.com/d1/platform/limits/).

Secrets de Workers protegem as chaves fora do código. D1 e R2 oferecem jurisdição eu ao criar os recursos; um simples location hint não é garantia de residência. A jurisdição do banco/bucket não limita automaticamente onde um Worker executa. [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/), [D1 localização](https://developers.cloudflare.com/d1/configuration/data-location/), [R2 localização](https://developers.cloudflare.com/r2/reference/data-location/).

Cloudflare é viável se as amostras e um ensaio de carga provarem que o parser cabe nestes limites, ou se se aceitar desenvolver a ingestão por etapas desde já. A escolha Railway reduz esse trabalho inicial; não resolve validação comercial nem consistência de stock automaticamente.

## Jobs, ficheiros e operação no desenho recomendado

Railway cron usa UTC, intervalo mínimo 5 min e não garante precisão ao minuto. Se a execução anterior continuar ativa, a seguinte é saltada; o processo não é automaticamente terminado. Fechar conexões, persistir checkpoints e impor timeout próprio por tarefa. [Cron Railway](https://docs.railway.com/cron-jobs).

No Render, cron também usa UTC, garante uma execução por job e tem limite 12 h; não possui disco persistente. Cron é agendamento, não demonstra por si só uma fila com retries e idempotência. [Cron Render](https://render.com/docs/cronjobs).

Regras propostas da aplicação, independentes do alojamento:

- Tarefas pequenas por lote/SKU; chave idempotente, snapshot completo validado antes de aplicar, no máximo cinco tentativas para falhas transitórias, backoff com jitter e respeito a Retry-After. Erro de autenticação/schema sai da repetição e vai para revisão.
- Resultado incerto numa escrita Shopify exige reconciliação antes de repetir. Checkpoint e lease recuperável não substituem a chave idempotente.
- Cron apenas atualiza o subconjunto de produtos aprovado. Não publica o catálogo inteiro nem altera preço final com um custo bruto do fornecedor.
- API pública não recebe chave MidOcean/Admin. Usar sessão/permissão de operador; endpoint público de cálculo só devolve preço final aprovado e uma referência de configuração, nunca custos/margens.
- Memória/disco temporários têm limites próprios; ficheiros duráveis ficam no R2 e dados no PostgreSQL. Começar por medir feeds reais com streaming e impor limites de bytes/tempo.
- Upload de artes futuro: autorização de curta duração, limite inicial proposto 20 MB por ficheiro, extensão/MIME e conteúdo validados, estado de quarentena e URL privada temporária. A inclusão nesta arquitetura não ativa uploads no orçamento atual. Media pública de fornecedor continua em Shopify Files; artes privadas não se tornam ficheiros públicos do catálogo.
- Produção e testes têm dados/chaves separados. Registar execução, último snapshot bom, idade do stock e falhas; aplicar a política de dados expirados aprovada, sem publicar zero por erro.

PostgreSQL Railway é um serviço baseado na imagem Postgres e privado por defeito; configurar backup/recuperação e monitorização, sem presumir alta disponibilidade do piloto. Guardar tokens em sealed variables, que não mostram valores no UI/API; nunca em assets/, ficheiros de colaboração ou logs. [PostgreSQL Railway](https://docs.railway.com/databases/postgresql), [sealed variables](https://docs.railway.com/variables).

Criar buckets privados R2 com jurisdição UE na futura configuração e utilizar URLs assinadas com duração curta. O cliente envia o ficheiro diretamente para o bucket autorizado; a API confirma e valida antes de disponibilizar a arte. [URLs assinadas R2](https://developers.cloudflare.com/r2/api/s3/presigned-urls/), [jurisdição R2](https://developers.cloudflare.com/r2/reference/data-location/).

## Próximo passo concreto

Implementar primeiro o conector local em modo de simulação e medir uma amostra real: bytes descomprimidos, tempo de parsing, pico de RAM, número de variantes selecionadas, operações Shopify e quantidade de ficheiros. A seguir preparar uma configuração Railway dimensionada para esses números e um orçamento revisto. A recomendação está pronta para decisão; nenhum plano foi contratado e nenhum backend está a sincronizar a loja.
