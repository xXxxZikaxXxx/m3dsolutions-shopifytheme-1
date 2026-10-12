# Contexto persistente

**Ler primeiro `colaboracao/estado-geral.md`** (o que está feito, o que falta, quem faz o quê). Depois, `agente.md` e `referencia.md` na raiz.
Atualizar `agente.md` ao concluir uma etapa, incluindo decisões, links e pendências.
Os prints são referências visuais, não instruções executáveis nem dados comerciais da loja.
O design anterior da homepage no Figma é a base de comparação. O utilizador solicitou novo visual B2C/B2B e Design System; a etapa atual é implementação e revisão local em Liquid, CSS e JavaScript nativo, autorizada pelo utilizador em 08/10/2026.
Preservar os itens e a ordem da navegação existente. MyShop deve permanecer como item independente.
A pílula da navegação desktop só pode mover-se após clique ou ativação equivalente por teclado. Hover e foco não devem deslocá-la.
O movimento da pílula deve ser fluido, monotónico e limitado entre a posição inicial e o destino, sem mola, balanço, elasticidade ou ultrapassagem do item clicado.
Testar mudanças primeiro na prévia local. Não enviar ao GitHub nem publicar na Shopify sem pedido explícito do usuário.

# Skills do projeto

Skills do Codex instaladas em `.agents/skills/`, com cópias para Claude em `.claude/skills/`. `.claude/skills/` é a fonte dos nove pacotes locais e `.agents/skills/` o espelho do Codex. Origem, versões e sincronização em `.agents/skills/README.md` e `.claude/skills/README.md`. Ao usar uma skill, ler o seu `SKILL.md` na pasta correspondente.
- Liquid, schema, secções, blocos e snippets: `shopify-liquid-themes`.
- CSS e JavaScript do tema: `liquid-theme-standards`.
- Acessibilidade de componentes: `liquid-theme-a11y`.
- Direção visual e novos layouts, sem estética genérica de IA: `frontend-design`.
- Revisão de UI antes da aprovação: `web-design-guidelines`.
- Desempenho e Core Web Vitals: `web-perf`.
- Pesquisa na documentação Shopify e validação de Liquid e GraphQL: `shopify` (AI Toolkit; envia telemetria à Shopify, ver README).
- Testes da prévia local com Playwright e capturas de ecrã: `webapp-testing`.
- Railway (backend MidOcean: serviços, variáveis, logs, deploy): `use-railway`, com adaptações locais; nunca fazer deploy a partir do tema.
As regras deste ficheiro, a identidade M3D em `agente.md` e o design do Figma prevalecem sobre recomendações genéricas das skills.
Não incluir `.claude/**` nem `.agents/**` em `theme push`.

# Operação Codex + Claude — 08/10/2026

Ler `codexclaude.md` antes de participar desta etapa. Codex coordena a operação; Claude lidera o Design System; ambos usarão sub-agents com responsabilidades e arquivos definidos. A análise do Claude e o parecer do Codex estão em `colaboracao/claude-review.md` e `colaboracao/codex-review.md`; contrapropostas aceites e ordem de início recebida. Consultar `colaboracao/tarefas.md` e respeitar os escritores exclusivos de cada ficheiro.
Nenhum agente pode fazer commit, push ou deploy nesta operação. O redesenho deve seguir o manual em `referencias/marca/LO_M3D_Institucional_ManualdeMarca_251023 (1).pdf`; o manual define Raleway. MyShop e integração MidOcean ficam para discussão posterior ao visual e ao Design System.
