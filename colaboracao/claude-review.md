# Revisão do Claude ao acordo `codexclaude.md`

Data: 08/10/2026. Autor: Claude (líder do Design System, sessão Claude Code, Opus 5.5).
Estado: **revisão preparatória entregue. Aguardo a ordem de início do utilizador.**

Esta revisão não implementa nada. Não alterei o tema, o Figma nem `agente.md`, e não iniciei sub-agents. Não houve commit, push, `theme push` nem deploy. O único ficheiro criado é este.

## 1. Fontes lidas e observações sobre o manual

Li na ordem pedida:

1. `AGENTS.md`, `agente.md` e `referencia.md`.
2. `codexclaude.md`.
3. O manual completo, com extração de texto e inspeção visual das 18 páginas.
4. `01-analise-visual-m3d.md` e a lista de evidências.
5. `02-pesquisa-b2c-estrutura-conversao.md`.
6. `arquitetura-mvp-2026.md`.
7. Os `SKILL.md` instalados em `.claude/skills/`.

Também conferi no tema as definições de fonte, as cores fixas, o asset do logótipo e os templates.

Para ler o PDF, instalei `pymupdf` e `pillow` no Python do utilizador. As imagens das páginas ficaram na pasta temporária da sessão, fora do projeto. Não abri as capturas de `evidencias/` uma a uma: usei as descrições e medidas registadas na análise 1.

### Concordo com o resumo do §5, com estes acrescentos

| Ponto | Observação | Consequência |
| --- | --- | --- |
| Logótipo (p. 5–6, 11) | As três variações aceites são monocromáticas: positiva, negativa e cinza. O texto da p. 11 diz que o logo usa gradiente. O asset do tema, `assets/m3dsolutionslogo.png`, é a versão em gradiente roxo/magenta e não aparece entre as variações da p. 6. | Discrepância a confirmar com quem detém a marca. Proponho a versão positiva preta no cabeçalho branco e a negativa em fundos escuros, mantendo a de gradiente só se for confirmada como oficial. |
| Asset do logótipo | O ficheiro tem 3375 × 4219 px e 1,17 MB. É servido com `asset_url`, sem redimensionamento, no cabeçalho e no modal do carrinho. | Pedir os originais em SVG (positivo, negativo e horizontal). Até lá, servir um tamanho reduzido. É também uma questão de desempenho, área do C4. |
| Versão horizontal (p. 8) | O exemplo de redução “10 mm ou 45px” usa uma assinatura horizontal (M3D + SOLUTIONS em linha) que não existe nos assets do tema. O manual manda usá-la quando a leitura fica prejudicada. | No mobile o logótipo fica pequeno, por isso o asset horizontal é necessário. Pendência de asset. |
| Pesos da Raleway (p. 12) | As fontes embutidas no PDF são Raleway, Light, Bold, Black e ThinItalic. A “Heavy” do manual corresponde à Black (900), não à ExtraBold (800). | Pesos de partida: 300, 400, 700 e 900. A confirmar na biblioteca de fontes da Shopify. |
| Slogan (p. 5) | “MAKE IT REAL.”: Regular com “REAL.” em Bold Itálico. | É uma regra da marca. A estilização de uma só palavra é obrigatória aqui, apesar de ser normalmente um vício de layout genérico. Usar só no slogan. |
| Maiúsculas | Os títulos do manual estão em maiúsculas Bold/Black. | Reservar maiúsculas para títulos de marca de grande escala. Texto corrido, botões e rótulos ficam em sentence case, porque legibilidade e acessibilidade pesam mais na interface. |
| Pincelada (p. 1, 13–17) | É um “M” em traço contínuo, preto ou branco, que atravessa a página. As formas fluidas são renders 3D em gradiente, matéria raster. | Nenhum dos dois se reproduz fielmente em CSS. São precisos ficheiros oficiais (SVG da pincelada; PNG/WebP das formas) e não devem ser fabricados. |
| Único elemento de UI no manual (p. 12) | O botão “DOWNLOAD DA FONTE” é uma pílula com gradiente rosa → azul e texto branco. | Não copiar para CTAs: o branco sobre o extremo azul tem contraste de 2,44:1. Ver §4. |
| Idioma | O manual está em português do Brasil (“camisetas”). | A copy da loja continua em português de Portugal, como no acordo. |

### Estado do tema, verificado no disco

- **Fonte:** a fonte efetiva é a Assistant (`type_header_font: assistant_n7`, `type_body_font: assistant_n4` em `config/settings_data.json`), não a Inter. O §4 do acordo menciona Inter porque o Figma a registava, mas o tema não a usa. A mudança é Assistant → Raleway.
- **Cores fixas:** há 70 ocorrências de `#4436bc` e 14 de `#e31c79` escritas diretamente no código, além de cerca de 15 cinzentos diferentes (`#606060`, `#6b6b6b`, `#5f5f5f`, `#d6d6d6`, `#d9d9d9`, `#dedede`…). Os tokens `--m3d-*` em `snippets/css-variables.liquid` voltam a ser declarados localmente em `sections/m3d-home.liquid`.
- **CSS duplicado:** o CSS do card de produto está repetido em `main-collection.liquid` e `main-search.liquid`. É candidato a componente único.
- **Orçamento:** `templates/page.json` só tem `main-page` e não existe template próprio de orçamento. O tema já tem `page.contact.json`.
- **Peso das imagens:** confirmo os ficheiros pesados registados no MVP. `vestuario.png` tem 8 MB, e `bannerprincipal.png`, `negocioseescritorio.png`, `garrafasecopos.png` e `tecnologia.png` ficam entre 1,6 e 2 MB.

## 2. Responsabilidades, equipa e limites de edição

**Concordo** com a divisão: Codex lidera a operação e a implementação; Claude lidera especificação, tokens e revisão de fidelidade. Concordo também com o proprietário único por ficheiro, com o Codex como único escritor de `agente.md` e com a decisão “aceite” só depois da confirmação dos dois líderes.

### Alterações que proponho

1. **Camada de tokens com proprietário Claude.** Proponho que o Codex me reserve só dois ficheiros: um novo `assets/m3d-tokens.css`, ou o bloco `--m3d-*` de `snippets/css-variables.liquid`, e as chaves de fonte em `config/settings_data.json`. Nesses ficheiros eu escrevo os tokens. A substituição das cores fixas nos componentes fica com o Codex, área a área. Assim a fonte de verdade fica com quem especifica, sem dois escritores no mesmo CSS.
2. **Equipa em ondas, não em paralelo total.** Na minha sessão, D1 e D2 bastam para a onda 1. D3 e D4 entram na onda 2. Juntaria D4 à minha própria revisão até haver copy suficiente para justificar um agente separado. Sub-agents só recebem ficheiros de leitura ou documentos em `design/`, nunca ficheiros do tema.
3. **Skills duplicadas.** O conteúdo de `.claude/skills/` está também em `.agents/skills/`, cópia feita para o Codex. Proponho declarar uma das duas como fonte e registar no README que a outra é espelho, para as versões não divergirem. O `.gitignore` da raiz cobre só `.agents/skills/shopify/node_modules`; a cópia em `.claude/` tem o seu próprio `.gitignore`. Não alterei nenhum dos dois.
4. **`AGENTS.md` desatualizado.** O ficheiro diz que “o design da homepage no Figma está concluído”, o que contradiz o redesenho autorizado agora. Depois da ordem de início, o Codex deve atualizar essa linha para os futuros agentes não travarem por isso.

## 3. Percurso B2C/B2B: concordâncias e propostas

**Concordo:**

- Sem seletor obrigatório “particular/empresa”.
- Hierarquia do §9: proposta → categorias e intenções → produtos reais → personalização → percurso empresarial → prova verificável → ajuda.
- Distinguir o que foi observado das hipóteses.
- Não inventar reviews, selos, preços ou stock.

**Proponho:**

1. **Antes do visual, corrigir os 12 links que levam à raiz e o €0,00.** São interrupções reais da jornada, prioridade 1 da análise 1. Não dependem do Design System e podem avançar na onda 1 em paralelo.
2. **Duas portas sem seletor.** Uma ação predominante para particulares, do tipo “Ver presentes personalizados” (a confirmar contra o catálogo real). Ao lado, um caminho secundário claro: “Encomendas para empresas” → Pedir orçamento. O item “Pedir orçamento” da navegação continua onde está.
3. **Hero estável em vez de carrossel automático.** A NN/g, citada na análise 2, sustenta a hipótese, e o histórico de flash preto aumenta o risco técnico. É uma decisão conjunta (D-02). Se mantivermos o carrossel, o autoplay deve ter pausa e o segundo slide deve ter link.
4. **€0,00 → “Sob consulta” nos cards**, com a mesma lógica da PDP e o mesmo componente de preço nos três sítios: card, PDP e carrinho.
5. **PDP:** H1 descritivo, galeria e decisão lado a lado no desktop, CTA dentro da primeira janela mobile sempre que os dados o permitirem. A ação MyShop passa a ação terciária (ícone com rótulo, não botão largo). O modal de quantidades só aparece para produtos com várias variantes.
6. **Orçamento sobre o formulário de contacto nativo da Shopify** (`{% form 'contact' %}`), que é o mecanismo de receção já suportado: envia para o e-mail da loja sem app nem credenciais.
   - O contexto do produto entra em campos ocultos. O produto é revalidado a partir do handle, não aceite tal como vem da URL.
   - O formulário nativo não aceita anexos, por isso o upload não é mostrado.
   - **Risco de QA:** submeter o formulário envia um e-mail real. O QA deve parar antes do envio, salvo autorização expressa para um teste identificado.
7. **Risco central de produto: hoje não há um único artigo B2C comprável com preço.** A amostra observada está toda sob consulta. Um visual B2C sobre um catálogo só de consulta promete o que a loja não entrega. O desenho deve funcionar com o catálogo real, e a decisão de catálogo B2C (D-01) é do utilizador.

## 4. Raleway, paleta e elementos num sistema utilizável

### Contraste medido (WCAG 2.x)

| Combinação | Rácio | Leitura |
| --- | --- | --- |
| Roxo `#4436BC` / branco | 8,40 | Texto e CTA em qualquer tamanho |
| Rosa `#E31C79` / branco (nos dois sentidos) | **4,46** | **Falha AA para texto normal** por pouco; passa só em texto grande (≥ 24 px, ou ≥ 18,66 px em bold) |
| Preto / rosa | 4,71 | Passa AA |
| Azul `#00B3E7` / branco | **2,44** | Nunca para texto ou ícones informativos sobre branco |
| Preto / azul | 8,60 | Passa |
| Roxo / preto | **2,50** | Não usar roxo como texto ou foco sobre preto |
| Cinzento `#606060` / branco | 6,29 | Passa |

### Proposta de sistema

| Camada | Conteúdo | Origem |
| --- | --- | --- |
| Marca | 5 cores e gradiente rosa → roxo → azul | Manual p. 10–11 |
| Semântica | `text`, `text-muted`, `surface`, `surface-inverse`, `action-primary`, `action-secondary`, `focus`, `price`, `state-error`, `state-success` | Extensão do Claude, a justificar |
| Componente | botão, campo, card, preço, badge, modal, pílula de navegação | Extensão do Claude |

- **CTA primário:** roxo com texto branco (8,4:1). O rosa fica como acento de marca e promoção, em texto grande ou com texto preto. É a decisão D-03. Como alternativa, rosa com texto branco em tamanho grande.
- **Foco:** roxo de 2 px sobre fundos claros; azul ou branco sobre o preto.
- **Neutros:** os cerca de 15 cinzentos reduzem-se a 4–5 tokens. São extensão do sistema, não regra do manual.
- **Raleway:** carregada pelo `font_picker` da Shopify (`raleway_n3/n4/n7/n9`, a confirmar), com `font_face` e `font-display: swap`. Limitar a 3–4 pesos por desempenho.
  - **Atenção:** a Raleway usa algarismos de estilo antigo por defeito. Preços, quantidades e SKUs precisam de `font-variant-numeric: lining-nums tabular-nums`.
- **Escala tipográfica:** uma só família, em contraste de peso: Black/Bold para títulos de marca e Regular/Light para corpo. Linhas com menos de 80 caracteres.
- **Elementos:**
  - A pincelada é o elemento memorável, usado num único momento por página (por exemplo, no hero ou na transição para o bloco de marca).
  - As formas fluidas ficam em campanhas e editorial, nunca atrás de produto, preço ou formulário.
  - O gradiente fica para momentos de marca, não para botões por defeito.
- **Forma:** a pílula já existe na navegação e no botão do manual. Proponho raio de pílula para ações e raio moderado para cards e campos, para evitar o “mesmo raio em tudo”.
- **Sombras:** as dos componentes são extensão permitida. Nunca no logótipo.

## 5. Decisões principais e dependências

| ID | Assunto | Quem decide |
| --- | --- | --- |
| D-01 | Catálogo B2C comprável: que produtos, com preço, mínimos e personalização | **Utilizador** |
| D-02 | Hero estável ou carrossel | Dois líderes |
| D-03 | Cor do CTA primário (roxo ou rosa) | Dois líderes |
| D-04 | Pesos da Raleway, política de maiúsculas e escala | Dois líderes |
| D-05 | Composição da PDP e peso do MyShop | Dois líderes |
| D-06 | Orçamento sobre o formulário nativo, e-mail de destino e ausência de anexos | Dois líderes + **utilizador** (destino) |
| D-07 | “Sob consulta” unificado em card, PDP e carrinho | Dois líderes |
| D-08 | Uso da pincelada e das formas fluidas, dependente dos assets | Dois líderes |
| D-09 | Propriedade da camada de tokens (§2.1) | Dois líderes |
| D-10 | Logótipo: gradiente ou positivo/negativo | **Utilizador**, ou quem detém a marca |

**Dependências comerciais e de assets a pedir ao utilizador:**

- Catálogo B2C com preços.
- Condições de entrega, devoluções e pagamentos para o rodapé e a PDP.
- E-mail que recebe os orçamentos.
- Validade da promoção “até 20%” do segundo banner.
- Assets oficiais: logótipo em SVG (positivo, negativo e horizontal), pincelada em SVG e formas fluidas em alta resolução.
- Fotografias reais de produto.
- Correção da imagem Carlsberg/Jeep, que é um problema de catálogo e não de layout.

## 6. Limites do runtime e das skills

- **Sessão:** Claude Code (Opus 5.5) no Windows, com ferramenta nativa de sub-agents. Nenhum sub-agent foi usado nesta revisão.
- **Orca:** o binário existe em `%LOCALAPPDATA%\Programs\orca\`, mas não o executei. As skills `orchestration` e `orca-cli` estão em `~/.agents/skills/`, caminho que o Claude Code não carrega. Para coordenar pelo Orca terei de as ler como ficheiros e confirmar o runtime. Até lá, a comunicação passa pelo utilizador e por estes ficheiros.
- **Skills disponíveis nesta sessão:** `shopify-liquid-themes`, `liquid-theme-standards`, `liquid-theme-a11y`, `frontend-design`, `web-design-guidelines`, `web-perf`, `shopify` (AI Toolkit, com telemetria aceite pelo utilizador) e `webapp-testing`.
  - O `web-perf` não mede no navegador porque o Chrome DevTools MCP não está configurado.
  - Python 3.13 com Playwright e Chromium está instalado e testado, por isso as capturas desktop/mobile da prévia são possíveis.
- **Prévia local:** não verifiquei se o `shopify theme dev` está a correr e não a iniciei.
- **Figma:** não o abri nesta revisão.

## 7. Declaração

Aguardo a ordem de início do utilizador. Não fiz commit, push, PR, deploy, `theme push` nem `theme publish`, e não alterei o tema, o Figma ou o tema ativo. Não registei a concordância do Codex: o seu parecer sobre estas propostas fica em aberto até ele as rever.

## 8. Respostas do utilizador antes da ordem de início — 08/10/2026

**D-01, catálogo e preços.** Os produtos sob consulta são do fornecedor MidOcean, cujos preços chegarão pela API na fase posterior. O utilizador autoriza preços fictícios nesses produtos, apenas para testes. Cuidados que proponho:

- Atribuir os preços na Shopify é uma alteração de dados da loja, não do tema. A vitrine em produção usa estes produtos e está protegida por palavra-passe. Antes de alterar, registar a lista de produtos e variantes com o preço original (€0), para reverter.
- Usar valores claramente de teste e não ativar checkout real com eles. Confirmar com o utilizador quem faz a alteração (Admin, CLI `shopify store execute` ou Codex) e quando a reverter.
- Testar os dois estados com produtos diferentes: com preço (compra) e a €0 (consulta). Manter pelo menos um produto a €0 para validar o percurso de orçamento.

**D-10, logótipo.** A versão em gradiente é oficial, e a escolha visual fica com o Claude. Proposta preliminar, a fixar na onda 2:

- Positivo preto no cabeçalho branco, por legibilidade e coerência com as variações da p. 6.
- Negativo branco nos fundos escuros e no rodapé.
- Gradiente reservado a momentos de marca em fundo claro e neutro (hero, página Sobre, login), nunca sobre fotografia.

**Original vetorial.** Recebido `C:/Users/Administrator/Downloads/Prancheta 1 (1).ai` (Illustrator 30.7, 02/10/2026, prancheta 1500 × 1500 pt). Não foi copiado para o projeto. O ficheiro foi gravado **sem conteúdo compatível com PDF**: a camada legível tem só o aviso do Illustrator e não há vetores acessíveis fora do Illustrator. Pedido ao utilizador:

- Voltar a gravá-lo com a opção “Criar ficheiro compatível com PDF”, ou exportar SVG.
- Idealmente, um SVG por versão: gradiente, positivo, negativo e, se existir, horizontal.

**Ainda em aberto:**

- D-06: e-mail de destino dos orçamentos.
- Assets da pincelada e das formas fluidas.
- Ordem de início.

## 9. Segunda resposta do utilizador — 08/10/2026

**D-06, destino dos orçamentos:** `m3dbrindes@gmail.com`. O formulário de contacto nativo envia para o e-mail configurado no Admin da Shopify, não para um valor definido no tema. Antes de usar o formulário, confirmar ou ajustar esse e-mail no Admin. É uma alteração de configuração da loja, a fazer pelo utilizador ou com a sua autorização. O QA continua sem submeter pedidos reais.

**Assets da marca:** o utilizador não tem os originais e autorizou a extração a partir do PDF. A extração foi feita localmente com PyMuPDF; o Canva não foi necessário. O resultado está em `referencias/marca/extraidos/` e o README dessa pasta tem os detalhes.

- Vetores originais em SVG: logótipo positivo, negativo e cinza; horizontal positivo e negativo; slogan; pincelada “M”.
- PNG com transparência, em baixa resolução: cinco formas fluidas, o “M” em gradiente e o fundo da p. 4.
- A versão em gradiente do logótipo não existe em vetor no PDF. Mantém-se o PNG atual, sem recriação.
- Nada foi copiado para `assets/` do tema.

Com isto, a decisão D-08 fica viável: a pincelada vetorial pode ser o elemento memorável em qualquer tamanho, e as formas fluidas ficam restritas a usos pequenos.

**Ainda em aberto:**

- Quem altera os preços fictícios e quando os reverte (§8).
- Ordem de início.

## 10. Resposta ao parecer do Codex e ordem de início — 08/10/2026

O utilizador deu a ordem de início aos dois líderes e pediu comunicação direta entre nós, sem o interromper. Li `codex-review.md` na íntegra.

**Correções factuais aceites:**

- Assistant → Raleway no tema; Inter → Raleway na base do Figma anterior.
- O logótipo integral é servido só no fallback de `asset_url`.
- Os tokens precisam de limpeza da cascata, não só de um ficheiro novo.
- Retiro a afirmação categórica sobre o catálogo inteiro. Vale para a amostra observada.

| ID | Resposta do Claude | Estado |
| --- | --- | --- |
| D-04 | Confirmo: 400 em corpo, campos, ajuda e preços; 700/900 para hierarquia; 300 opcional e só em tamanhos grandes. Os componentes com 600/650/800 passam para 400/700/900. Números com `lining-nums tabular-nums` onde a fonte servida o suportar. | **Aceite** (Claude + Codex) |
| D-05 | Confirmo a contraproposta: uma variante e quantidade simples inline, sem modal; modal só para compor várias linhas. MyShop com ícone e rótulo. | **Aceite** |
| D-06 | Confirmo: destino é o e-mail configurado no Admin, contexto declarado pelo solicitante, sucesso só com `form.posted_successfully?`, sem envio real no QA, template de prévia sem mexer em `template_suffix`. | **Aceite**, com a pendência abaixo |
| D-07 | Confirmo o contrato do §6: regras partilhadas e HTML próprio de cada contexto; carrinho preserva valores reais; desconto integral não é “sob consulta”; resumo de variantes mistas sem “desde €0”. | **Aceite** |
| D-09 | Confirmo: escrevo só `assets/m3d-tokens.css` e `design/`. O Codex tem a escrita exclusiva de settings, `css-variables.liquid`, `theme.liquid` e componentes. | **Aceite** |

**Preços fictícios.** O utilizador escreveu agora: “Vocês podem adicionar os preços fictícios”. A autorização cobre a alteração de preços no catálogo, não só fixtures. Proposta para o Codex, como dono da operação e da integração:

- Começar pelas fixtures locais.
- Quando o QA precisar de renderização Liquid real, aplicar preços de teste a um subconjunto pequeno e nomeado, com o estado original registado e a lista de reversão.
- Manter pelo menos um produto a €0 e não concluir checkout.
- Lembrar que, com o catálogo partilhado, os preços aparecem também na vitrine ativa protegida por palavra-passe.

A execução e o momento ficam com o Codex.

**Pendência D-06.** O utilizador indicou `m3dbrindes@gmail.com` como destino. O e-mail atual da loja não foi verificado. Trocá-lo é uma configuração da loja e fica registado para o utilizador ou para uma autorização específica; não bloqueia o layout.

**Plano do Claude para as ondas 1 e 2:**

1. **D1, marca e tokens** (sub-agent nativo; escreve só `design/`): mapa fonte → regra → token, com páginas do manual, uso dos assets de `referencias/marca/extraidos/` e verificação dos identificadores Raleway na biblioteca Shopify.
2. **D2, jornadas B2C/B2B** (sub-agent nativo; escreve só `design/`): síntese das análises, arquitetura da homepage, mapa de CTAs (promessa → destino → ação seguinte), estados da PDP e do orçamento.
3. **Claude:** direção visual em `design/visual-b2c-b2b.md`; especificação e primeira versão de `assets/m3d-tokens.css` em `design/design-system-m3d.md`. O ficheiro de tokens só entra no tema depois de o Codex indicar o ponto de integração.

Os sub-agents nativos do Claude ficam registados como execução nativa, não como trabalhadores do Orca. Comunicação: estes ficheiros e mensagens curtas ao terminal do Codex pelo Orca a cada marco.
