# Contas do servidor — passos para o utilizador

Escolha aceite: Railway Amsterdam + PostgreSQL + Cloudflare R2. Contas, faturação e pagamento ficam sob controlo do utilizador/M3D. Nesta etapa preparar contas, sem ligar GitHub nem iniciar deploy.

1. Entre ou crie a sua conta em [Railway](https://railway.com/), com e-mail controlado por si/M3D. Ative autenticação de dois fatores e preencha os dados de faturação em seu nome/empresa.
2. Escolha Hobby para o piloto de um operador: mínimo US$5/mês, incluído no consumo. Reserve US$10–15/mês como estimativa inicial; não é limite garantido. Para membros/produção partilhada, considerar Pro (mínimo US$20). [Preços](https://docs.railway.com/pricing/plans). Projeto pode ficar vazio; região Amsterdam será definida quando criarmos API/runner/PostgreSQL na etapa autorizada.
3. Entre ou crie conta em [Cloudflare](https://dash.cloudflare.com/), ative R2 e preencha pagamento/faturação no seu próprio painel. R2 Standard tem franquia mensal, com cobrança por uso excedente. [Preços R2](https://developers.cloudflare.com/r2/pricing/).
4. Crie dois buckets privados, m3d-snapshots e m3d-artes, com jurisdição UE. Mantê-los privados é a configuração deste projeto; media pública aprovada vai para Shopify Files. [Jurisdição R2](https://developers.cloudflare.com/r2/reference/data-location/).
5. Depois, informe apenas que as contas estão prontas. Na preparação do backend, a chave MidOcean será configurada como sealed variable no Railway e o acesso R2 como secret restrito aos buckets. Valores de chave/token/cartão/password ficam nos painéis, não no chat ou nos ficheiros. [Variáveis protegidas Railway](https://docs.railway.com/variables).

Nenhuma conta, pagamento, bucket ou serviço foi criado pelo Codex. Não foi conectado repositório nem executado deploy.

## Atualização: contas prontas — 09/10/2026

Utilizador confirmou Railway e Cloudflare R2 configurados em seu nome. Não repetir a criação das contas. Esta confirmação não informa IDs do projeto/serviço, jurisdição dos buckets ou acesso dos agentes; não foram consultados segredos. Próximos passos em [credenciais e execução](midocean-acessos.md).
