# Skills do projeto

O Claude Code carrega automaticamente estas skills ao trabalhar neste repositório. Foram instaladas em 08/10/2026. Os textos foram lidos na íntegra; dos scripts minificados do `shopify`, foram verificados os destinos de rede.

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
| `use-railway` | Operação do Railway (serviços, variáveis, logs, deploy) para o backend MidOcean; adicionada em 09/10/2026 | [railwayapp/railway-skills](https://github.com/railwayapp/railway-skills) `dab1c2a`, plugin v1.6.1, MIT |

## Adaptações locais

- `web-design-guidelines`: as regras estão guardadas em `references/guidelines.md`, em vez de serem descarregadas a cada uso. O `SKILL.md` ganhou notas do projeto: equivalentes em Liquid, cópia em português de Portugal e prioridade das regras da pílula.
- `use-railway`: retirada a linha `allowed-tools` (o original aprovava `railway`, `curl` e `python3` sem perguntar) e acrescentadas notas do projeto no topo do `SKILL.md`: nada de `railway up`/deploy a partir do tema, mutações só com ordem explícita, MCP já ligado, segredos nunca lidos. Acrescentado o `LICENSE` MIT do repositório. O hook de aprovação automática do plugin, a CLI e o `railway setup agent` não foram instalados. `SKILL.md` e `railway-api.sh` foram lidos na íntegra; nos scripts Python foram verificados importações (só biblioteca padrão) e comandos executados (`railway`/`railway ssh`).
- As restantes skills estão sem alterações. No `shopify`, só foram acrescentados `LICENSE` e `.gitignore`.

## Prioridade

As regras de `AGENTS.md`, a identidade da M3D em `agente.md` e o design do Figma prevalecem sobre as recomendações genéricas destas skills. Por exemplo, a paleta e a navegação existentes não devem ser trocadas por sugestão do `frontend-design`.

## Shopify AI Toolkit (`shopify`)

- A instalação foi autorizada pelo utilizador em 08/10/2026, ciente da telemetria.
- Os scripts `search_docs.mjs`, `validate.mjs` e `log_skill_use.mjs` enviam a `https://shopify.dev/mcp/usage` as pesquisas, o código validado, o caminho do tema e, quando passado, o último prompt.
- O hook declarado no `SKILL.md` usa `$CLAUDE_PLUGIN_ROOT`. Fora do formato de plugin, essa variável não existe e o hook não faz nada.
- Para desativar a telemetria, crie o ficheiro vazio `%APPDATA%\shopify-ai-toolkit\opt-out`.
- As dependências dos validadores (`@shopify/theme-check-*`, `typescript`) estão em `shopify/node_modules`, ignorado pelo Git. Depois de clonar o repositório, corra `npm install` dentro de `.claude/skills/shopify`.

## Ambiente para `webapp-testing`

- Python 3.13.15, instalado com `winget` no utilizador, em `%LOCALAPPDATA%\Programs\Python\Python313`.
- Pacote `playwright` com Chromium, instalado com `python -m playwright install chromium`.
- Num terminal novo, use `py` ou `python`. Se `python` abrir a Microsoft Store, desative o alias em Definições > Aplicações > Aliases de execução de aplicações.

## Atualizar

Volte a clonar o repositório de origem, compare com `diff -r` e reveja as alterações antes de copiar.

## Fonte e espelho — acordo entre líderes, 08/10/2026

`.claude/skills/` é a fonte dos oito pacotes locais instalados; `.agents/skills/` é o espelho para descoberta pelo Codex. Atualizar a fonte somente após revisão e sincronizar os arquivos de skill/scripts/referências/assets/licenças com comparação de versões e hashes. Não copiar `node_modules`, junctions, caches ou logs. READMEs podem diferir por ambiente; preservar as notas próprias do Codex e as adaptações M3D. Não houve atualização dos pacotes nesta revisão.
