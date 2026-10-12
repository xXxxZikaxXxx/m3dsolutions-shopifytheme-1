# R2 do backend — preparação autorizada

09/10/2026. Criação dos buckets/chaves autorizada pelo utilizador. O conector atual consegue consultar R2, mas não expõe header de jurisdição UE e devolve erro9109 Unauthorized para gestão de tokens, tanto de conta como de utilizador. Nenhum token/bucket foi criado pelo Codex; não reduzir a garantia UE para contornar o limite do conector.

Passos no painel do utilizador, mantendo segredos fora do chat:

1. Cloudflare → R2 Object Storage. Criar ou confirmar `m3d-snapshots` e `m3d-artes`, privados, Standard, **Specify jurisdiction → European Union**. Location hint Europe sozinho não substitui a restrição UE.
2. R2 → Account Details → API Tokens → Manage → Create Account API token. Nome `m3d-connector-objects`. Permissão **Object Read & Write**, só nos dois buckets. Não conceder Admin ao token do backend.
3. Copiar Access Key ID e Secret Access Key diretamente para as variáveis do serviço Railway `midocean-connector`: `R2_ACCESS_KEY_ID` e `R2_SECRET_ACCESS_KEY`. Selar a Secret Access Key; não enviar valores a agentes/chat nem guardar .env.
4. Configurações não secretas: `R2_ENDPOINT=https://1ac0e630697829380a2eb40ac70c53fb.eu.r2.cloudflarestorage.com`, `R2_SNAPSHOT_BUCKET=m3d-snapshots`, `R2_ARTWORK_BUCKET=m3d-artes`. Conferir que o ID é da conta onde os buckets foram criados. Aplicar sem redeploy ou avisar para incluir no deploy autorizado do conector.
5. Confirmar apenas que os buckets UE e as variáveis estão prontos. O conector fará uma gravação/leitura de snapshot privado da auditoria; nenhuma arte real será enviada por este teste.

O Secret Access Key aparece uma única vez no painel. A URL específica `.eu` é necessária para buckets UE. Fontes: [localização](https://developers.cloudflare.com/r2/reference/data-location/), [tokens e permissões](https://developers.cloudflare.com/r2/api/tokens/).

Sem R2, a primeira auditoria pode confirmar leitura de produtos/printdata e produzir resumo seguro em logs, mas **não comprova persistência de snapshots**. O serviço não expõe publicamente feeds ou credenciais; só healthz. Integração de upload de artes e entrega ao fornecedor permanece etapa posterior, não ativada pela criação destes buckets.
