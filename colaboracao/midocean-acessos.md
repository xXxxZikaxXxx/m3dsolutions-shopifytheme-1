# MidOcean — credenciais e próxima execução

09/10/2026. Contas Railway/Cloudflare R2 prontas por confirmação do utilizador. Piloto: saco, garrafa, caneca e duas peças de vestuário. Referências ainda por escolher. Nenhum segredo, app, repositório ou deployment foi criado pelo Codex nesta etapa.

## 1. Guardar a chave MidOcean

1. No Railway, abra o projeto M3D e o serviço destinado ao conector. Se ainda não existir, prepare um serviço vazio, sem GitHub ou imagem ligados; não ligar a chave a um serviço desconhecido já em execução.
2. Entre em Variables → New Variable. Nome: `MIDOCEAN_API_KEY`. Cole a chave diretamente no campo Value e guarde.
3. No menu ⋯ dessa variável, escolha Seal. O valor continua disponível ao processo do serviço, mas deixa de ser legível no painel/API. Pode ser substituído; não pode ser desselado.
4. Abra Details e confira que o changeset contém só a preparação pretendida. Para persistir sem redeploy, a documentação prevê manter Alt premido ao clicar Deploy. Esse gesto guarda configuração Railway, não faz commit Git nem inicia redeploy. Se a opção não estiver clara, deixe staged; não clicar Deploy normal. Novos valores só chegam a um processo já ativo numa execução posterior. [Guardar configuração sem redeploy](https://docs.railway.com/deployments/staged-changes).

Seal também impede recuperar o valor por `railway variables`/`railway run`; a chave no Railway não está automaticamente disponível ao Codex local. O primeiro runner terá de executar no ambiente autorizado. [Railway: variáveis e Seal](https://docs.railway.com/variables).

`MIDOCEAN_API_KEY` é o nome interno proposto; header, host, autorização e limites do fornecedor serão conferidos no contrato real da conta. Não enviar a chave no chat, screenshots ou ficheiros do tema.

## 2. Preparar acesso Admin Shopify

O feed MidOcean e a seleção de candidatos não dependem da Shopify. O acesso Admin só é necessário para comparar dados com a loja e, numa fase autorizada separada, importar.

1. Abra [Dev Dashboard](https://dev.shopify.com/dashboard), na organização que contém a loja M3D. Apps → Create app → Start from Dev Dashboard; nome proposto `M3D MidOcean Connector`. Se já existir app para este conector, confirmar a sua identidade antes de criar outra.
2. Crie versão com `read_products` para a primeira comparação. API-only, sem interface embedded: a Shopify permite App URL `https://shopify.dev/apps/default-app-home`. No painel do utilizador, Release ativa esta configuração de acesso; não publica código backend nem o tema.
3. Installs → Install app → selecionar `uhqyjs-w5.myshopify.com` → aprovar apenas leitura de produtos. Para auditoria de níveis de inventário/publicações, acrescentar posteriormente `read_inventory`/`read_publications` conforme as operações. Não declarar `read_locations` obrigatório sem conferir o schema da versão: Location também aceita read_inventory na referência atual. Não pedir `write_*`, clientes, pedidos, temas ou acesso a todas as áreas nesta primeira fase.
4. Em Settings da app, obtenha Client ID e Client secret. No serviço Railway destinado ao conector, prepare `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET` e `SHOPIFY_SHOP=uhqyjs-w5`. Sele o secret; o ID/subdomínio são configuração. Guarde/aplique segundo o mesmo limite de deploy da secção anterior.

Os passos descrevem a preparação de acesso pedida para o utilizador executar no painel. Release é configuração da app e Install concede os scopes revistos; não são deploy do tema/servidor. Nenhum agente executou essas ações nesta entrega. [Shopify: criação/versionamento/instalação](https://shopify.dev/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard), [scopes](https://shopify.dev/docs/api/usage/access-scopes).

Se app e loja estiverem na mesma organização, o servidor troca client ID/secret por access token via client credentials; token expira em cerca de 24h e será renovado pelo backend. Não é preciso copiar um token permanente para o chat/Railway diariamente. Fora da mesma organização, o fluxo é distribuição customizada + OAuth adequado; possuir a loja ou instalar a app não comprova essa condição. Client secret não é access token Admin. A associação organizacional ainda não foi verificada. [Shopify: client credentials](https://shopify.dev/docs/apps/build/authentication-authorization/client-credentials-grant).

## 3. Repositório e autorização de execução

**Não é obrigatório ter um repositório GitHub próprio para executar um backend no Railway. Recomendo um repositório privado separado chamado `m3dsolutions-backend`, em conta/organização controlada pelo utilizador.** Separa código servidor, workers, configuração e dependências do tema. O núcleo local atual continua em integracoes/midocean/ até a migração ser autorizada e revista; nada será apagado ou movido silenciosamente.

Âmbito proposto para uma futura autorização, em ações separadas:

- Criar repositório privado `m3dsolutions-backend` no proprietário indicado; criação vazia não autoriza commit/push.
- Migrar/adaptar código local, rever diff e autorizar o primeiro commit/push separadamente.
- Ligar o serviço Railway e executar um runner de consulta com Products PT + printdata, duração/limites definidos, sem mutations Shopify ou encomendas MidOcean. É execução/deploy de backend, exige ordem explícita; não significa publicar o tema ou autorizar sync.
- Configurar/instalar a app de leitura pelos passos acima para comparação Shopify; é independente da shortlist de fornecedor e não implica execução do backend.

Não ligar GitHub automaticamente: pode disparar build/deploy. A regra atual continua sem commit/push/deploy; contas prontas e chave guardada não revogam essa regra. Não foi pedida nem inferida autorização destas ações.

## 4. Shortlist e prova antes de importar

Aceite a proposta do Claude: obter produtos `language=pt`, cruzar com printdata e apresentar candidatos ao utilizador para escolher cinco. Confirmar referências/variantes reais, PT, posições/técnicas suportadas, limites, imagens e tamanhos; múltiplas técnicas/posições são critério de cobertura do piloto, não motivo para inventar suporte. Não usar custo/margem privados na lista pública. Preços e stock precisam dos seus próprios feeds antes de aprovar uma oferta.

MO9846 Cottonel Colour ++ é candidato público referido pelo Claude, não artigo selecionado nem importado. A primeira leitura ainda não ocorreu. Contrato real deve preceder o adapter: autenticação, idioma, paginação/volume, limites e resposta printdata. Obter documentação/amostras expurgadas sem credenciais; só depois simular diferenças com seleção manual.

Para dar seguimento, bastam informações não secretas: nome/ID do projeto e serviço Railway, se a app já existe e em qual organização, e proprietário pretendido para o eventual repositório. Valores de API key/client secret/password continuam nos painéis.

Revisão independente por review_coordination concluída, só leitura: confirmou Seal/Alt, App URL oficial API-only, release de configuração, condição organizacional/token24h e scopes de consulta. Nenhum segredo consultado. Ao implementar GraphQL, fixar versão suportada e validar schema; exemplos de autenticação podem conter versões antigas e não devem definir a versão do conector.
