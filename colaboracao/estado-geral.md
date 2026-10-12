# Estado geral — M3D Solutions

**Ponto de entrada único.** Atualizado: 12/10/2026, QA Claude #3 aprovado e etapas #1–#3 encerradas (Codex). Qualquer agente, Claude ou Codex, lê **este ficheiro primeiro** e depois só os documentos ligados à tarefa que vai fazer. Cada etapa concluída atualiza a secção correspondente aqui, além do `agente.md`.

## 1. Regras que nunca mudam

- **Commits e push autorizados pelo utilizador em 12/10/2026.** Publicação do tema (`theme push`/`theme publish`) continua a exigir ordem explícita própria. Testar sempre na prévia local `http://127.0.0.1:9292` (tema de desenvolvimento 166780993606). O tema publicado 152494637126 está intocado.
- Navegação: itens e ordem preservados, MyShop independente, a pílula só se move com clique ou teclado (`AGENTS.md`).
- Identidade: manual da marca, Raleway, paleta M3D (`design/design-system-m3d.md`).
- Segredos só no Railway (selados); nunca em ficheiros nem logs. Custos e margens da MidOcean só no R2 privado.
- Sem encomendas reais na MidOcean (só o ambiente de teste, e com autorização).
- **Escritores exclusivos** por ficheiro, registados em `tarefas.md`. Não escrever em ficheiros de outro agente.

## 2. Quem faz o quê

| Área | Dono | Notas |
| --- | --- | --- |
| Design System, tokens (`assets/m3d-tokens.css`), specs em `design/`, ícones | **Claude** | Desenha e especifica; não implementa no tema |
| Tema (Liquid, CSS, JS, locales) | **Codex** | Implementa as specs do Claude |
| Backend MidOcean (`C:\Users\Administrator\m3-d-mid-ocean-connector`) | **Claude** (passagem ativa) | O Codex retoma por registo em `tarefas.md` |
| Cloudflare R2 | Codex (MCP Cloudflare) / utilizador (painel) | Buckets e chaves criados pelo utilizador |
| Railway | Claude (MCP) | Projeto `adaptable-reprieve`, serviço `midocean-connector` |
| Decisões comerciais | **Utilizador** | Ver §5 |

## 3. Feito

### Tema e Design System (08–09/10)
- Visual B2C/B2B com Design System v1, aceite pelo utilizador. Correções V1–V13 (404 PT, páginas de categoria, pesquisa inicial, PDP, carrinho, políticas). Theme Check sem erros. → `colaboracao/entrega-visual.md`, `entrega-20261009.md`, `claude-status.md`.

### MidOcean — backend em produção (só leitura + piloto)
- **Infra:** Railway (Amesterdão), app Shopify `M3D MidOcean Connector` (versão `config-pilot-3`: produtos, publicação, descontos, inventário, locais), R2 `m3d-snapshots` (EU). → `passagem-claude-codex.md` §3.
- **Leitura dos 5 feeds MidOcean** validada (produtos PT, printdata, pricelist, printpricelist; stock documentado). → `midocean-api-guia.md` (**ler antes de mexer em feeds**).
- **Simulação de preços** das referências do piloto: fatores 1,60/1,50/1,40/1,35 + IVA 23 %. → `midocean-piloto-precos.md`.
- **Piloto de 6 produtos** importado, **publicado na Loja online** e nas coleções do tema:

  | Handle | Produto | Coleção |
  | --- | --- | --- |
  | m3d-sc001 | Saco de feltro RPET (MO6660) | bags |
  | m3d-sc002 | Saco de algodão 180 g/m² (MO9846) | bags |
  | m3d-gr001 | Garrafa de vidro 500 ml (MO6800) | drinkware |
  | m3d-cp001 | Copo térmico 700 ml (MO6971) | drinkware |
  | m3d-ts001 | T-shirt de senhora 140 g (S01159) | t-shirts |
  | m3d-pl001 | Polo unissexo (S04442) | t-shirts |

  SKUs opacos M3D; tamanhos XS→3XL; cores reais por variante (`custom.colour_swatches`); técnicas e posições em `custom.personalization_config` (impressão só por orçamento).
- **Descontos por escalão** automáticos nos 6: 200+ −6,25 %, 500+ −12,5 %, 2000+ −15,625 %.
- Backend com **121 testes**. Logs sem custos nem segredos.

### Revisão visual e ícones (09–12/10) — **concluídos e aprovados no QA #3**
- Spec `design/revisao-visual-20261009.md`: R1 pesquisa, R2 card, R3 PDP. Tokens Buttons v2 e swatches já estão em `m3d-tokens.css`.
- Sistema de ícones v1 aprovado: 18 ícones originais em `design/icones/`, catálogo e plano em `design/icones-m3d.md`.
- QA Claude de 12/10 aprovado sem bloqueantes: 60 páginas a 1440/1024/390/360, sem overflow; teclado, foco, pílula e reduced-motion conferidos. `ceil` no card do piloto aceite e spec R2 corrigida pelo Claude. → [Relatório QA3](qa3-claude-20261012.md); evidências em `analises/qa-visual/claude-20261012-qa3/`.
- Limites: leitor de ecrã real não testado (NVDA ausente); carrinho com artigos mantém evidência Codex de 09/10; recomendações com um único card não permitem validar grelha 4/2.

### Ferramentas instaladas
- MCPs no Claude: Railway, Shopify Dev, 21st (fonte principal para ícones, componentes e inspiração), Cloudflare (Codex). Skills do projeto: 9 pacotes (`.claude/skills/README.md`).

## 4. Próximo trabalho (ordem)

| # | Tarefa | Dono | Documento | Estado |
| --- | --- | --- | --- | --- |
| 1 | **Ícones** no tema inteiro (`snippets/icon.liquid` e substituição de SVG inline e setas de texto) | Codex | `design/icones-m3d.md` §5 | Concluído; QA3 aprovado em 12/10 |
| 2 | **Revisão visual** R1 pesquisa → R2 card → R3 PDP (usa os ícones do #1) | Codex | `design/revisao-visual-20261009.md` | Concluída; QA3 aprovado em 12/10 |
| 3 | QA visual do #1 e #2 (1440/1024/390/360, teclado, acessibilidade) e aceite de fidelidade | Claude | `qa3-claude-20261012.md` | Concluído; aprovado sem bloqueantes; leitor de ecrã real não testado |
| 4 | Próxima reimportação do piloto (descrição da t-shirt ainda com "SOL'S …") | Claude | `passagem-claude-codex.md` | Pequeno; juntar à próxima importação |

**#1–#3 encerrados.** Próximo trabalho: parecer conjunto de stock e impressão paga (§5), antes da execução. A descrição da t-shirt será corrigida numa próxima reimportação pertinente, sem repetir importações apenas para fechar o QA.

**Backlog aprovado, adiado pelo utilizador:** ordenação compacta nas coleções; não implementar agora.

## 5. À espera de decisão do utilizador (não começar)

| Tema | Ponto de partida |
| --- | --- |
| **Stock** — regra aceite (disponível = stock − máx(10, 5 %); sincronização às :15; > 3 h sem dados → orçamento) | Plano por discutir; `passagem-claude-codex.md` §6 |
| **Impressão paga no site** — cotação no servidor → draft order → checkout | Plano por discutir; rever com o Codex antes de finalizar; `design/p-a-personalizacoes.md` |
| **Catálogo** — importar tudo ou por seleção | Decisão interna do utilizador; depois um plano novo |
| Pesquisa nativa devolve relógios para qualquer termo | Diagnóstico C9 (`c9-pesquisa-diagnostico.md`); tratar depois do #2 |

## 6. Mapa dos documentos

| Para… | Ler |
| --- | --- |
| Contexto histórico e decisões | `agente.md`, `colaboracao/decisoes.md` |
| Quem escreve cada ficheiro | `colaboracao/tarefas.md` |
| Backend, infra, IDs, flags de arranque | `colaboracao/passagem-claude-codex.md` |
| API MidOcean (regras e armadilhas) | `colaboracao/midocean-api-guia.md` |
| Arquitetura e fiscal | `midocean-arquitetura.md`, `midocean-iva.md`, `midocean-precos-viabilidade.md` |
| Design System | `design/design-system-m3d.md`, `assets/m3d-tokens.css` |
| Trabalho visual em curso | `design/revisao-visual-20261009.md`, `design/icones-m3d.md` |
| Estado do Claude / do Codex | `colaboracao/claude-status.md`, `colaboracao/codex-status.md` |

### Entrega visual Codex #1/#2 — 09/10/2026

[Entrega e passagem QA](entrega-icons-r123-20261009.md). Ícones/R1–R3 implementados na prévia existente; Theme Check71 ficheiros, zero ocorrências. Paridade dos seis carrinhos de 2000 unidades comprovada e contextos limpos: ceil no card do piloto em lugar de round evita anúncio 1 cêntimo abaixo em 3 artigos. Claude deve rever a exceção técnica, sem mudança dos descontos comerciais. QA final/leitor de ecrã pendentes. Orca indisponível, sem recibo de mensagem. Backend/tokens/design permanecem Claude; sem commit/push/theme push/publicação.


### Plano de 12/10/2026

[Plano de hoje](plano-20261012.md) e [mensagem Codex → Claude](mensagem-codex-claude-20261012.md). QA final de ícones/R1–R3 concluído e aprovado sem bloqueantes; próximo: discutir os planos stock/impressão paga antes de execução. Piloto já ativo/publicado; não repetir importações. Backend continuaClaude, tema/registosCodex. Commit/push agoraautorizados; sempublicaçãodotema porimplicação.

Documentos consultados nesta sessão, sem nova verificação remota ou repetição dos testes históricos pelo Codex. Claude confirmou leitura/divisão e entregou QA3; Codex confirmou receção no canal de ficheiros. Acesso CLI Codex ao Orca continua sem restabelecimento comprovado. Nenhum commit/push/deploy nesta retomada.

Cuidado confirmado no histórico: master já publicou a vitrine via integração GitHub (c8604eb,10/09). Antes de push autorizado, verificar ligação atual e usar branch não vinculada ao tema ativo; autorização Git não inclui publicação indireta. Plano revisto por /root/review_today; mensagem lida e divisão confirmada pelo Claude em12/10.


### Fecho QA3 e receção do Claude — 12/10/2026

Codex recebeu a mensagem do Claude nesta conversa e conferiu o relatório QA3, o resumo em claude-status.md e a presença das evidências. Claude confirmou leitura do plano e a divisão de autoria. #1 ícones, #2 R1–R3 e #3 QA estão concluídos, sem bloqueantes; as notas do relatório permanecem visíveis. Os registos anteriores de QA/recibo pendentes descrevem o estado antes deste fecho.

Comunicação confirmada por esta mensagem e pelos ficheiros; isso não comprova que o acesso CLI do Codex ao Orca tenha sido restabelecido. A última listagem ainda retornou runtime_unavailable. Nenhum teste foi reexecutado pelo Codex neste fecho. Próximo: parecer stock/impressão paga; sem nova implementação, commit, push ou deploy nesta atualização.
