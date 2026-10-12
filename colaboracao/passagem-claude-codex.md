# Passagem Claude → Codex — estado para retomar

Escritor: Claude. Atualizar no fim de cada etapa. **Codex: ler isto primeiro ao voltar**, depois `midocean-api-guia.md`, `midocean-piloto-precos.md` e `codex-status.md` (§ Passagem ao Claude e § Execução do Claude durante a passagem).

## 1. Estado da passagem

- O Codex ficou sem contexto (10%) em 09/10/2026 e passou ao Claude a escrita exclusiva de `C:\Users\Administrator\m3-d-mid-ocean-connector\backend\**`, do `Dockerfile`, `package.json`/lock, ignores e docs de execução. A passagem **continua ativa**.
- **Retorno ao Codex:** registar em `tarefas.md` ("Passagem Claude → Codex") a lista de ficheiros devolvidos. O Claude confirma antes de o Codex escrever.
- O tema (`m3dsolutions-shopifytheme-1`) não foi alterado pelo Claude nesta etapa. Sem GitHub, sem `theme push`.

## 2. Autorizações do utilizador (09/10/2026)

| Tema | Decisão |
| --- | --- |
| Testes de leitura, backend e deploy do serviço Railway `midocean-connector` | Autorizado |
| R2 (buckets e chaves) | Feito pelo utilizador; `m3d-snapshots` EU verificado |
| Piloto | 6 refs: MO6660 NATA, MO9846 COTTONEL, MO6800 THAI, MO6971 AIRA (copo térmico, mantido), S01159 SPORTY WOMEN, S04442 PITCHER |
| Simulação de preços | Feita (§4) |
| Importação para a Shopify | Autorizada (rascunhos) |
| Publicar na Loja online e pôr nas coleções de categoria | Autorizado |
| Preço por escalão | Fatores M3D 1–199 / 200–499 / 500–1999 / 2000+ (1,60 / 1,50 / 1,40 / 1,35) |
| Impressão paga no site | Autorizado ao Claude implementar; **rever com o Codex antes de finalizar** |
| Regra de stock | Aceite a proposta do Claude (§6); implementação autorizada |
| Rodar chaves | Não é preciso (decisão do utilizador) |
| Commit e push GitHub | **Autorizados pelo utilizador a 12/10/2026**, confirmado diretamente ao Claude (substitui a proibição anterior; ver `plano-20261012.md` §1). Sem force push, segredos ou custos. Antes de qualquer push, verificar a integração GitHub→Shopify (o push para `master` de 10/09 publicou a vitrine) e usar uma branch sem ligação ao tema ativo |
| Continua proibido | Publicação do tema (`theme push`/`publish`, inclusive indireta via GitHub), encomendas reais na MidOcean |

## 3. Infraestrutura

- **Railway:** projeto `adaptable-reprieve` (`231a13a7-85e2-4950-8ca1-2b07789be063`), ambiente `production` (`9b255420-…`), serviço `midocean-connector` (`2299ada4-d5e5-40f8-87c9-50c03c97c703`), Amesterdão, healthcheck `/healthz`, ON_FAILURE 3, sem domínio público.
- **Variáveis:** seladas `MIDOCEAN_API_KEY`, `SHOPIFY_CLIENT_SECRET`, `R2_SECRET_ACCESS_KEY`. Normais: `SHOPIFY_CLIENT_ID`, `SHOPIFY_SHOP=uhqyjs-w5`, `R2_ENDPOINT` (EU), `R2_SNAPSHOT_BUCKET=m3d-snapshots`, `R2_ACCESS_KEY_ID`, `MIDOCEAN_TIMEOUT_MS=180000`.
- **Flags de arranque** (cada uma corre uma vez por arranque; deixar `false` depois): `READ_AUDIT_ENABLED`, `SNAPSHOT_REVIEW_ENABLED`, `MIDOCEAN_FIELD_PROBE`, `PILOT_SIMULATION_ENABLED`, `PILOT_IMPORT_ENABLED`.
- **Deploy:** `railway up . --path-as-root -p 231a13a7-85e2-4950-8ca1-2b07789be063 -e production -s midocean-connector --detach -m "…"` a partir da app. Confirmar SUCCESS e logs pelo ID. A imagem base é ECR público (o Docker Hub deu 429).
- **App Shopify:** `M3D MidOcean Connector`, client_id `1cc093c181b93829405c6c5bb43236b5`, mesma organização da loja (client credentials). Versões: `config-read-products-1` → `config-write-products-2` (aprovada) → **`config-pilot-3`** (produtos, publicações, descontos, inventário, locais; **aguarda aprovação do utilizador** no link de instalação).

## 4. Backend (C:\Users\Administrator\m3-d-mid-ocean-connector\backend)

| Ficheiro | Papel |
| --- | --- |
| `midocean.mjs` | Leitor dos feeds; `readFeedJSON`; redirect S3 com allowlist exata; `size_textile`; quarentena; sonda opt-in |
| `shopify.mjs` | Token por client credentials; `readProducts`; `setPilotProduct` (productSet por handle, DRAFT, recusa produtos sem a tag `midocean-piloto`) |
| `pilot.mjs` | Simulação: 4 feeds, aritmética em 1/10 000 €, fórmulas oficiais, regra ST, plano privado e resumo público, `personalization` por técnica |
| `import-pilot.mjs` | Títulos PT, opções Cor/Tamanho, SKU opaco `M3D-{código}-{cor}[-{tamanho}]`, metafield `custom.personalization_config` (price_included=false) |
| `storage.mjs` | R2 com prefixos `read-audits`, `pilot-plans` (custos, privado), `pilot-imports` (mapa SKU M3D ↔ fornecedor, privado) |
| `inspect-snapshot.mjs` | Inspeção do snapshot sem novas leituras |
| `server.mjs` | `/healthz` e encadeamento das flags |
| `pricing.mjs` | Núcleo original de preços (paridade testada) |

Testes: **111/111** (`node --test backend/*.test.mjs`). As mutations GraphQL foram validadas com o Shopify AI Toolkit em 2026-10.

## 5. Resultados

- Leitura: 2573 produtos PT, 2510 printdata, 189/189 SKUs do piloto com preço, print pricelist com 70 técnicas.
- Preços de venda em `midocean-piloto-precos.md`. Plano privado `pilot-plans/bd109214-…json`.
- Importação dos 6 rascunhos: ver §8 (registo da execução).

## 6. Regra de stock aceite (a implementar)

- Local Shopify dedicado "MidOcean"; inventário controlado nos produtos do piloto.
- **Disponível = qty MidOcean − reserva**, com reserva = máx(10 un., 5%), arredondada para cima, mínimo 0.
- `inventoryPolicy: DENY`. Acima do disponível → percurso de orçamento.
- Chegadas futuras não contam: vão para um metafield de próxima chegada, mostrado na PDP.
- Sincronização a cada hora, aos :15, só dos SKUs alterados (diferença calculada sobre o último snapshot).
- Feed com mais de 3 h sem sincronizar → o artigo passa a "por orçamento" (flag/metafield) até voltar. Nunca pôr zero por defeito nem vender com dados velhos.

## 7. Próximos trabalhos (ordem)

1. Aprovação de `config-pilot-3` pelo utilizador → publicar os 6 na Loja online e adicioná-los às coleções de categoria.
2. Descontos automáticos por escalão, por produto: 200+ −6,25 %, 500+ −12,5 %, 2000+ −15,625 %. A quantidade conta todas as variantes do produto; diferenças de 1 cêntimo possíveis.
3. Stock (§6): cron horário no Railway, local "MidOcean", inventário controlado.
4. Impressão paga (P-A, `design/p-a-personalizacoes.md`): cotação no servidor → oferta/draft order → checkout. **Revisão conjunta Claude + Codex antes de finalizar.**
5. Postgres no Railway quando houver estado transacional (cotações, artes, sincronização).

## 8. Registo da execução

(atualizado pelo Claude a cada passo)
- **Importação** (deployment `0dad41f2`, SUCCESS, 21:33 UTC): 6 rascunhos criados, 0 erros. IDs: `m3d-sc001` 10247592706118 (3 variantes) · `m3d-sc002` 10247593001030 (23) · `m3d-gr001` 10247593427014 (1) · `m3d-cp001` 10247593623622 (1) · `m3d-ts001` 10247593984070 (96) · `m3d-pl001` 10247594410054 (65). Mapa privado `pilot-imports/83538ffd-…json`. Flags de simulação e importação desligadas depois.
- **App:** versão `config-pilot-3` lançada pelo Claude (com aprovação do utilizador no terminal). Aguarda a aprovação das novas permissões na loja.
- **Permissões `config-pilot-3`** aprovadas pelo utilizador na loja.
- **Publicação** (deployments `6326edd1` e `d100fd66`, SUCCESS): os 6 estão ACTIVE, publicados na Loja online e nas coleções manuais `bags` (SC001, SC002), `drinkware` (GR001, CP001) e `t-shirts` (TS001, PL001), sem erros. 1.ª execução: o canal não foi encontrado pelo título do catálogo; a correção procura pelo `Publication.name` (depreciado, mas estável) e regista os nomes dos canais quando falha. `backend/publish-pilot.mjs`, 114 testes. `PILOT_PUBLISH_ENABLED=false` depois.
- **Decisões do utilizador:** os planos de stock e de impressão paga serão discutidos depois. A importação de todo o catálogo ou por seleção será decidida internamente pelo utilizador antes de um novo plano. Por fazer, autorizado: descontos por escalão (§7.2).
- **Descontos por escalão** (deployment `a6114f38`, SUCCESS): 3 descontos automáticos criados para os 6 produtos — "M3D escalão 200+ (−6,25%)", "500+ (−12,5%)", "2000+ (−15,625%)" (IDs 1616551116870 / …149638 / …182406). Um por escalão por causa do limite de 25 descontos automáticos; a quantidade soma os artigos do piloto no carrinho. `backend/discounts-pilot.mjs`, idempotente pelo título; 116 testes. `PILOT_DISCOUNTS_ENABLED=false` depois.
- Stock, impressão paga e catálogo completo: em espera por decisão do utilizador. Revisão visual pedida pelo utilizador (pesquisa, cards, PDP), sem implementar antes da resposta dele.
- **Reimportação** (deployment `df9d0160`, SUCCESS): 6 atualizados, 0 erros, estado ACTIVE mantido. Tamanhos XS→3XL, metafield `custom.colour_swatches` (tabela M3D em `backend/colours.mjs`, 37 cores) e descrição sem o modelo do fornecedor. Corrigido depois: primeira frase com a marca do fornecedor ("SOL'S …", t-shirt). Testes 121/121; **entra na próxima importação** (flags `PILOT_SIMULATION_ENABLED` + `PILOT_IMPORT_ENABLED`).
- **Revisão visual aprovada** → spec para o Codex em `design/revisao-visual-20261009.md` (R1 pesquisa, R2 card, R3 PDP), tokens novos em `assets/m3d-tokens.css`, sistema de ícones em `design/icones-m3d.md` (o Claude desenha; o Codex implementa quando estiver "pronto"). Capturas do estado anterior em `analises/qa-visual/claude-20261009/revisao-v2/`. Registo em `tarefas.md`.
