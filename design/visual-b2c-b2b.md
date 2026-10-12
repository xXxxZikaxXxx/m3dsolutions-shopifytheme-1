# Direção visual B2C/B2B — M3D Solutions

Autor: Claude, líder do Design System. Data: 08/10/2026. Estado: **proposta para revisão do Codex**. Jornadas e estados detalhados em `d2-jornadas.md`; tokens em `design-system-m3d.md`.

## 1. Assunto, público e tarefa

- **Assunto:** objetos do dia a dia que passam a ter um nome, um logótipo ou uma frase. A M3D transforma uma ideia num objeto físico; o slogan oficial diz exatamente isso: “Make it real.”
- **Público:** particulares que procuram um presente ou uma peça para si, e empresas que encomendam em quantidade.
- **Tarefa da página:** mostrar depressa o que se pode personalizar e levar a pessoa a um produto. A empresa encontra o seu caminho sem que o particular tenha de o atravessar.

## 2. Diagnóstico visual do estado atual

Captura `m3d-home-desktop-top.png` de 07/10:

- Hero com painel cinzento-escuro semitransparente sobre a fotografia, rótulo em maiúsculas espaçadas acima do título (“BRINDES QUE MARCAM PRESENÇA”) e botão rosa com “→”. Os blocos seguintes repetem o mesmo rótulo.
- Esses três recursos são precisamente os vícios de layout genérico que queremos retirar: rótulo-sobrancelha em todas as secções, seta colada ao texto do botão e painel escuro com um acento vivo.
- A marca está quase ausente: um logótipo pequeno, sem pincelada nem Raleway, e o rosa usado como cor de botão com contraste insuficiente para texto branco.

## 3. Plano

### Cor

| Nome | Hex | Papel |
| --- | --- | --- |
| Preto | `#000000` | Texto, pincelada, superfícies de marca. Preto verdadeiro, nunca `#111` |
| Branco | `#FFFFFF` | Fundo dominante |
| Roxo | `#4436BC` | Ação primária, foco, links ativos |
| Rosa | `#E31C79` | Acento de campanha e destaques gráficos; texto rosa só ≥ 24 px |
| Azul | `#00B3E7` | Só sobre preto, ou dentro do gradiente; nunca texto sobre branco |
| Névoa | `#F2F2F4` | Extensão: superfície de produto e campos (cinzento frio, não creme) |

O gradiente rosa → roxo → azul fica reservado à pincelada em gradiente e ao logótipo oficial em gradiente. Não é fundo de secção nem de botão.

### Tipo

- Só **Raleway**: 900 para títulos de exposição, 700 para títulos de secção e botões, 400 para leitura, preços e campos. O 300 fica opcional para números grandes.
- Títulos em sentence case. As maiúsculas ficam só no slogan, que é o SVG oficial. O manual deixa livre a escolha das versões da família (p. 12).
- Algarismos alinhados (`lining-nums tabular-nums`) em preço, quantidade e SKU.
- Escala modular 1,25 sobre 16 px: 16 · 20 · 25 · 31 · 39 · 49 · 61. Linhas até cerca de 66 caracteres.
- O título do hero usa entrelinha apertada (1,0) e tracking ligeiramente negativo no 900. O tipo é parte da composição, não só portador de texto.

### Layout

- Alinhamento à esquerda em todo o site. Centrado só em estados vazios e confirmações.
- Grelha de 12 colunas, largura máxima de 1240 px (mantém `page_width`) e margens laterais de 16 px no mobile.
- **Ritmo:** secções separadas por espaço, não por linhas nem caixas.

### Princípios

1. **O objeto é o protagonista.** As fotografias de catálogo de fornecedores como a MidOcean vêm sobre fundo branco. Em vez de esconder isso com fotografia de ambiente que não temos, o sistema assume o fundo branco: produtos recortados sobre branco ou névoa, com a marca à volta e não por cima.
2. **Uma única ousadia: a pincelada.** O “M” oficial, vetorial e em preto, atravessa o hero por trás do produto, como nas aplicações das p. 14–17 do manual. Não aparece em mais nenhum bloco da homepage. As formas fluidas, em baixa resolução, ficam só como detalhe pequeno em estados vazios ou de confirmação.
3. **Duas portas, uma hierarquia.** O particular recebe a ação principal (roxo). A empresa recebe um caminho secundário, sempre visível e nomeado em linguagem simples (“Encomendas para empresas”), sem seletor obrigatório.
4. **Informação de compra intocada pela marca.** Preço, variante, quantidade e CTA ficam sobre fundo branco sólido, sem gradiente, formas ou pincelada por trás.

## 4. Composição

### Hero, desktop 1440

```
┌──────────────────────────────────────────────────────────────────────┐
│ cabeçalho: logótipo positivo · pesquisa · conta · carrinho            │
│ navegação: 7 itens (pílula)                                           │
├──────────────────────────────────────────────────────────────────────┤
│  Presentes com o nome                ╭────────╮                       │
│  de quem os recebe.                 ╱ PRODUTO  ╲   ← recorte sobre     │
│                                     │ recortado │     a pincelada M    │
│  Garrafas, sacos e vestuário        ╲          ╱      preta, que entra │
│  personalizados a partir de 1 un.*   ╰────────╯       pela esquerda e  │
│                                   ~~~~~~~~~~~~~~~~~~  sai pela direita │
│  [ Ver produtos personalizáveis ]  (roxo, pílula)                     │
│  Encomendas para empresas  (link sublinhado)                          │
└──────────────────────────────────────────────────────────────────────┘
* Só com confirmação comercial. Sem confirmação, a linha não aparece.
```

### Hero, mobile 390

```
┌──────────────────────────┐
│ logótipo horizontal · ☰ 🔍 🛒 │
├──────────────────────────┤
│ Presentes com o nome     │
│ de quem os recebe.       │
│ [ Ver produtos … ]       │
│ Encomendas para empresas │
│ ╭──────╮  pincelada      │
│ │PRODUTO│ cortada pela   │
│ ╰──────╯  margem direita │
└──────────────────────────┘
```

O título e a ação ficam na primeira janela de 844 px; a imagem vem depois. Hoje o mobile mostra um bloco preto com texto antes da fotografia.

Os textos do hero são uma proposta de tom e dependem da confirmação comercial (D-01). Alternativa sem prometer quantidade: “O seu nome, a sua marca, em objetos que se usam todos os dias.”

### Restantes blocos

A ordem e o conteúdo ficam com o D2, em `d2-jornadas.md`. Regras visuais:

- **Categorias:** fotografia com o nome por baixo, em texto preto 700. Sem caixa, sombra ou rótulo por cima da imagem. O zoom da imagem no hover, pedido antes pelo utilizador, mantém-se.
- **Produtos:** imagem sobre névoa com raio de 12 px, nome com até 2 linhas, preço ou “Sob consulta” em 400 com algarismos alinhados. A ação do MyShop é um ícone com rótulo acessível, e não um cartão dentro do cartão.
- **Personalização:** três passos reais (escolher o produto → enviar o logótipo ou o nome → aprovar a prova), só se o processo comercial o confirmar. Numerar só porque é de facto uma sequência.
- **Empresas:** faixa preta de largura total com o logótipo negativo e o texto “Encomendas para empresas”. Uma ação “Pedir orçamento” em branco sobre preto (21:1) e uma frase sobre o que acontece a seguir. É o único bloco escuro da página, o que o torna fácil de encontrar.
- **Rodapé:** preto, logótipo negativo, slogan oficial e as colunas de ajuda com as páginas existentes. Sem crédito do tema.

## 5. Forma e movimento

- **Raios:** pílula (999 px) para ações e para a navegação, que já tem pílula; 12 px para imagens de produto; 8 px para campos; 0 nas faixas de largura total. A hierarquia fica assim visível, em vez de um único raio em tudo.
- **Sombras:** só em camadas flutuantes (modal, painel de pesquisa, dropdown), uma única elevação. Nada de sombra em cartões nem no logótipo.
- **Bordas:** 1 px `#D4D4DA` em campos e separadores de lista, com significado (agrupamento), não decorativas.
- **Movimento:**
  - Um único momento orquestrado: a pincelada do hero desenha-se uma vez ao carregar (revelação por `clip-path` em cerca de 700 ms, curva de desaceleração). Com `prefers-reduced-motion`, aparece estática.
  - O resto do movimento responde a ações: pílula da navegação conforme o `AGENTS.md`, abertura de modais, confirmação de adição.
  - Sem entradas de secção ao fazer scroll.

## 6. Revisão do plano contra o briefing

| Parte do plano | Seria o padrão genérico? | Ajuste |
| --- | --- | --- |
| Hero com painel escuro e acento rosa | Sim, é o traço 2 dos padrões de IA e é o estado atual | Trocado por fundo branco, produto recortado e pincelada oficial |
| Rótulo em maiúsculas acima de cada título | Sim, traço 5 | Removido; o título diz o que é |
| “→” nos botões | Sim, traço 5 | Removido; o rótulo descreve a ação |
| Cartões iguais com sombra e gradiente | Sim, traço 4 | Imagem sem chrome, raios por hierarquia, gradiente só em elementos oficiais |
| Gradiente como fundo de secções | Tentação forte, porque o manual mostra fundos em gradiente | Recusado na loja: compete com o produto e falha o contraste do texto branco no azul. Fica nas peças de marca |
| Pincelada | Não; é o elemento próprio da M3D, retirado do manual | Mantido como a única ousadia |
| Raleway 900 sentence case | Específico desta marca | Mantido |

Primeira versão: usei o gradiente como fundo da faixa de empresas. Retirei-o, porque esse bloco precisa de ler-se como sério e operacional, e o gradiente com texto branco falharia no extremo azul (2,44:1). A faixa ficou preta.

## 7. Dependências

- **Imagens de produto recortadas:** confirmar se as imagens dos produtos de teste servem, ou usar uma fotografia de produto atual de `referencias/imagens/`.
- **Promessas comerciais do hero** (quantidade mínima, prazos): D-01, com o utilizador.
- **Integração da pincelada:** o Codex decide se entra como snippet SVG inline ou como asset.
