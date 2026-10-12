# Skills do projeto

As oito skills deste projeto foram copiadas para `.agents/skills/` em 08/10/2026, a partir dos pacotes já descarregados e revistos pelo Claude em `.claude/skills/`. A pasta `.agents/skills/` permite a descoberta pelo Codex no próximo turno. Todos os 172 ficheiros copiados foram comparados byte a byte com os originais, preservando versões e adaptações. Os metadados `name` e `description` dos oito `SKILL.md` foram conferidos.

| Skill | Para que serve | Origem (commit) |
|---|---|---|
| `shopify-liquid-themes` | Liquid, schema de secções e blocos, objetos, filtros, tags, LiquidDoc e traduções | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills) `ae3e4cc` |
| `liquid-theme-standards` | Padrões de CSS (BEM, tokens, CSS defensivo) e JavaScript nativo com Web Components | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills) `ae3e4cc` |
| `liquid-theme-a11y` | Acessibilidade WCAG 2.2 em componentes de e-commerce: cartões, carrinho, modais, filtros, preços | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills) `ae3e4cc` |
| `frontend-design` | Direção visual com identidade própria, evitando a estética genérica de IA | [anthropics/skills](https://github.com/anthropics/skills) `683bc88` |
| `web-design-guidelines` | Revisão de UI em `ficheiro:linha` (acessibilidade, foco, formulários, animação, tipografia) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `063bee9` + [web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) `434b7f9` |
| `web-perf` | Auditoria de Core Web Vitals e desempenho de carregamento | [cloudflare/skills](https://github.com/cloudflare/skills) (cópia de `~/.agents/skills`) |
| `shopify` | Shopify AI Toolkit oficial: pesquisa na documentação shopify.dev e validação de Liquid e GraphQL | [Shopify/shopify-ai-toolkit](https://github.com/Shopify/shopify-ai-toolkit) `26d0623`, v1.17.1 |
| `webapp-testing` | Testes da prévia local com Playwright: cliques, capturas de ecrã e logs da consola | [anthropics/skills](https://github.com/anthropics/skills) `683bc88` |

## Adaptações locais

- `web-design-guidelines`: as regras estão guardadas em `references/guidelines.md`, em vez de serem descarregadas a cada uso. O `SKILL.md` ganhou notas do projeto: equivalentes em Liquid, cópia em português de Portugal e prioridade das regras da pílula.
- As cópias preservam integralmente os pacotes locais do Claude. No pacote original `shopify`, foram acrescentados `LICENSE` e `.gitignore`.

## Prioridade

As regras de `AGENTS.md`, a identidade da M3D em `agente.md` e o design do Figma prevalecem sobre as recomendações genéricas destas skills. Por exemplo, a paleta e a navegação existentes não devem ser trocadas por sugestão do `frontend-design`.

## Shopify AI Toolkit (`shopify`)

- A instalação foi autorizada pelo utilizador em 08/10/2026, ciente da telemetria.
- Os scripts `search_docs.mjs`, `validate.mjs` e `log_skill_use.mjs` enviam a `https://shopify.dev/mcp/usage` as pesquisas, o código validado, o caminho do tema e, quando passado, o último prompt.
- O hook declarado no `SKILL.md` usa `$CLAUDE_PLUGIN_ROOT`. Fora do formato de plugin, essa variável não existe e o hook não faz nada.
- Para desativar a telemetria, crie o ficheiro vazio `%APPDATA%\shopify-ai-toolkit\opt-out`.
- As dependências dos validadores (`@shopify/theme-check-*`, `typescript`) estão em `shopify/node_modules`, ignorado pelo Git. Nesta instalação, `.agents/skills/shopify/node_modules` é uma junction para `.claude/skills/shopify/node_modules`, reutilizando as dependências existentes. Depois de clonar o repositório, corra `npm install` dentro de `.agents/skills/shopify`.

## Ambiente para `webapp-testing`

- Python 3.13.15, instalado com `winget` no utilizador, em `%LOCALAPPDATA%\Programs\Python\Python313`.
- Pacote `playwright` com Chromium, instalado com `python -m playwright install chromium`.
- Num terminal novo, use `py` ou `python`. Se `python` abrir a Microsoft Store, desative o alias em Definições > Aplicações > Aliases de execução de aplicações.

## Atualizar

Volte a clonar o repositório de origem, compare com `diff -r` e reveja as alterações antes de copiar.

## Âmbito

Manter `.agents/**` e `.claude/**` fora de `theme push`. A instalação não modifica o tema nem autoriza publicação. O hook específico do Claude não é executado automaticamente pelo Codex; usar os scripts conforme o `SKILL.md` quando a tarefa o exigir.

## `use-railway` — 09/10/2026

Copiada pelo Claude de `.claude/skills/use-railway/` (fonte), origem [railwayapp/railway-skills](https://github.com/railwayapp/railway-skills) `dab1c2a`, plugin v1.6.1, MIT. 27 ficheiros, `diff -r` sem diferenças. Adaptações locais (sem `allowed-tools`, notas M3D contra deploy a partir do tema) descritas em `.claude/skills/README.md`. Hook, CLI e `railway setup agent` não instalados; o MCP do Railway já estava ligado.
