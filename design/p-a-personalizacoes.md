# P-A — Várias personalizações por artigo e preço por quantidade

Especificação de UX do Claude, 09/10/2026. **Revisão 3:** mercado de referência condicional. **Revisão 2:** incorpora os cinco ajustes de [codex-p-a-review.md](../colaboracao/codex-p-a-review.md). Complementa [design-system-m3d.md](design-system-m3d.md) e [midocean-arquitetura.md §10](../colaboracao/midocean-arquitetura.md).

Este documento não é implementação. O Codex escreve Liquid e JS no tema e o contrato do servidor. Os tokens usados aqui já existem em `assets/m3d-tokens.css`. Sem commit, push ou deploy.

## Decisões do utilizador que esta especificação assume

- Todas as técnicas que o fornecedor suporta para o artigo, e várias personalizações por artigo.
- Preço por unidade = (preço fornecedor + impressão) × fator × IVA. Os fatores dependem da quantidade:

  | Quantidade | Fator |
  | --- | --- |
  | 1–199 | 1,60 |
  | 200–499 | 1,50 |
  | 500–1999 | 1,40 |
  | 2000 ou mais | 1,35 |

- IVA acrescentado ao líquido: bruto = líquido × (1 + taxa). A loja está em modo de impostos incluídos (`taxesIncluded=true`, EUR). A taxa e a regra por operação estão em [midocean-iva.md](../colaboracao/midocean-iva.md); o rótulo segue o §3.3.
- SKU próprio M3D, formato opaco `M3D-{categoria}{sequência}-{cor}`.

## 1. Estrutura do bloco Personalização (PDP)

```
Personalização
Escolha uma ou mais técnicas. Cada personalização tem o seu logótipo.

┌──────────────────────────────────────────────────────────┐
│ 1  Serigrafia · Frente · 150 × 100 mm · 2 cores          │
│    [miniatura] logotipo-empresa.png     Editar  Remover  │
├──────────────────────────────────────────────────────────┤
│ 2  Bordado · Manga esquerda · 80 × 80 mm                 │
│    [miniatura] logotipo-empresa.png     Editar  Remover  │
└──────────────────────────────────────────────────────────┘
[ + Adicionar personalização ]
```

- **Estado inicial:** nenhum item. O texto é “Sem personalização. O artigo segue liso.” e o botão secundário “+ Adicionar personalização” tem contorno, altura de 48 px e largura total no mobile.
- **Item:** um cartão por personalização, com borda de 1 px e raio do token de cartão. O número em círculo usa a fonte numérica. Resumo numa linha: técnica · posição · dimensões · cores (quando a técnica as exige). Por baixo, miniatura de 40 × 40 px do logótipo (PDF e SVG mostram o ícone de documento) e o nome do ficheiro truncado ao meio.
- **Ações:** “Editar” e “Remover” como links de texto, cada um com área de toque de 44 × 44 px. “Remover” pede confirmação inline: o item mostra “Remover esta personalização? Sim · Não”. Não usar modal sobre modal.
- **Limite:** o número máximo de itens vem do servidor. Ao atingir o limite, o botão “Adicionar” fica desativado com a nota “Atingiu o número máximo de personalizações para este artigo.”
- **Conflito (revisto com o parecer do Codex, ponto 1):** o tema não deduz conflitos. Duas personalizações na mesma posição são permitidas, salvo quando a regra de compatibilidade do fornecedor, devolvida pelo servidor, o proíbe. Só nesse caso a posição aparece desativada, com o motivo do servidor (por exemplo “Incompatível com a personalização 1”). Sem regra, a posição é livre.

## 2. Modal “Personalizar o produto” (editor de um item)

O modal atual é reaproveitado e edita **um** item da lista, sem substituir os restantes. O título muda conforme o caso: “Nova personalização” ou “Editar personalização 2”.

Passos na mesma vista, em ordem vertical:

1. **Técnica:** pílulas de texto com todas as técnicas compatíveis com o artigo e a variante. Uma técnica sem condições comerciais validadas mostra o selo “Por orçamento” e continua selecionável; o item fica marcado como orçamento (§5).
2. **Posição:** cartões atuais (imagem 240 × 144 quando existe, nome PT, “Área máx. 60 × 40 mm”). As posições incompatíveis com a técnica não aparecem.
3. **Dimensões:** “Largura (máx. N mm)” e “Altura (máx. N mm)”, inteiros. O erro desaparece assim que os valores ficam válidos (já corrigido pelo Codex).
4. **Cores de impressão:** só quando a técnica as cobra. É um stepper − n + de 1 até ao máximo da posição, com a nota “Número de cores do logótipo”. Full colour e técnicas sem contagem não mostram este campo.
5. **Logótipo:** “Carregar logótipo” (PNG, JPG, PDF, SVG), com miniatura e nome. Pode-se “Usar o mesmo logótipo da personalização 1” quando já existe outro item com ficheiro; isto evita uploads repetidos.

Rodapé: “Guardar personalização” (primário) e “Cancelar” (secundário). No desktop ficam lado a lado, com o primário à direita; no mobile ficam empilhados, com o primário em cima, como no modal atual. Fechar sem guardar descarta o rascunho e não altera a lista.

## 3. Preço visível ao cliente

### 3.1 Tabela de referência (artigo liso)

Por baixo do preço principal:

```
Preço por unidade, artigo sem personalização
Referência {{ mercado }} · IVA incluído
1–199      200–499    500–1999   2000+
€2,21      €2,07      €1,93      €1,86
```

- `{{ mercado }}` vem do servidor (mercado e origem fiscal efetivos da oferta base). “Portugal continental” nos exemplos é só ilustrativo e nunca fica fixo no tema.
- Os valores do exemplo são ilustrativos e nunca entram no catálogo. Os reais são a oferta base da variante para o mercado doméstico, publicada pelo servidor (sem custo privado).
- A coluna da quantidade escolhida fica destacada (fundo de superfície, peso 700). O destaque muda com o stepper, com `aria-live="polite"`: “A partir de 200 unidades: €2,07 por unidade.”
- A tabela é só referência. Não soma personalizações e não é a cotação.

### 3.2 Cotação da configuração (parecer do Codex, pontos 2 e 4)

Com pelo menos uma personalização, ou quando o destino fiscal é conhecido e difere da referência, o preço é uma **cotação do servidor** para essa configuração e destino:

```
O seu preço · 250 un. · 2 personalizações
Total €___,__ · IVA incluído          [Atualizar preço]
Válido para {{ destino }}. Mudar o destino recalcula o preço.
```

- O tema nunca calcula o total somando extras a valores estáticos. Mostra o que a cotação devolve: unitário, total e a indicação fiscal.
- Enquanto a cotação é pedida, aparece “A calcular o preço…” (skeleton na linha do total). Se a cotação falhar, aparece “Não foi possível calcular o preço. Pode pedir orçamento.” e o link de orçamento.
- Alterar quantidade, variante, personalizações ou destino invalida a cotação: o total volta a “Atualizar preço” e o CTA de compra fica desativado até haver nova cotação.

### 3.3 Indicação fiscal

- “IVA incluído” só aparece quando o total mostrado inclui IVA segundo a Shopify ou a cotação.
- Antes de se conhecer o destino, o preço diz “Referência {{ mercado }} · IVA incluído”, com o mercado devolvido pelo servidor. Sem mercado conhecido, a linha de referência não aparece.
- Operação isenta ou sem IVA: mostrar a indicação fiscal devolvida pela cotação (por exemplo “IVA não aplicável”), nunca “IVA incluído”.
- Não usar `compare_at_price` para mostrar escalões.

## 4. Carrinho

Cada linha mostra o produto, a variante e uma lista numerada:

```
Personalização 1: Serigrafia · Frente · 150 × 100 mm · 2 cores   [miniatura] Ver logótipo
Personalização 2: Bordado · Manga esquerda · 80 × 80 mm          [miniatura] Ver logótipo
```

- Propriedades com espaço depois dos dois pontos. O ID da configuração fica numa propriedade com prefixo `_` (oculta ao cliente). É só uma referência informativa para reconciliação, não autentica nada nem é segredo. A configuração comercial válida vive no servidor.
- Miniaturas: o upload atual da Shopify é público e pode ser mostrado diretamente. Artes guardadas pela app (R2 privado) usam um link de acesso controlado e temporário fornecido pela app; sem esse link aparece o ícone de ficheiro com o nome e sem pré-visualização.
- Duas linhas do mesmo SKU com artes diferentes nunca se fundem.
- A indicação fiscal segue o §3.3.

### 4.1 Percurso de compra (parecer do Codex, ponto 3)

Plano Grow sem Plus: uma propriedade no carrinho não torna um preço calculado cobrável.

| Caso | Percurso | CTA |
| --- | --- | --- |
| Artigo liso, quantidade em que o preço Shopify da variante é o preço correto | Carrinho nativo | “Adicionar ao carrinho” |
| Artigo liso numa faixa cujo preço difere do da variante, ou artigo com personalizações | Cotação do servidor → oferta validada (draft order) → checkout dessa oferta | Primeiro “Calcular preço”, depois “Finalizar com esta configuração” |
| Cotação indisponível ou técnica “Por orçamento” | Orçamento | “Pedir orçamento com esta configuração” |

- O tema nunca ativa o “Adicionar” nativo só porque mostrou uma estimativa diferente do preço Shopify.
- O texto do CTA corresponde ao percurso real. “Finalizar com esta configuração” abre o checkout da oferta, e o cliente vê lá o mesmo total da cotação.
- Até a cobrança por oferta estar demonstrada, o segundo caso usa o terceiro percurso (orçamento).

## 5. Estados

| Estado | Comportamento |
| --- | --- |
| Artigo sem `printdata` | O bloco não aparece (M4). |
| Artigo liso com preço Shopify correto para a quantidade | “Adicionar ao carrinho” nativo (§4.1). |
| Personalizações todas cotáveis | “Calcular preço”, depois a cotação (§3.2) e “Finalizar com esta configuração”. |
| Cotação desatualizada | O total volta a “Atualizar preço” e o CTA de compra fica desativado. |
| Pelo menos uma “Por orçamento” ou cotação indisponível | A ação principal passa a “Pedir orçamento com esta configuração”, que leva a lista inteira, a quantidade e os IDs de upload. Não há compra direta com preço incompleto. |
| Upload a decorrer | O item mostra “A carregar…” e “Guardar” fica desativado. |
| Upload falhou | “Não foi possível carregar o ficheiro. Tente novamente ou use PNG, JPG, PDF ou SVG.” O resto da lista mantém-se. |
| Variante muda | Itens incompatíveis com a nova variante ficam marcados “Indisponível nesta cor”, com “Editar” e “Remover”. Não são apagados em silêncio. |

## 6. Acessibilidade

- A lista é `<ol>` com `aria-label="Personalizações"`. Cada item tem um nome acessível com o resumo completo.
- Depois de guardar, o foco volta ao item criado ou editado. Depois de remover, vai para o item seguinte ou, se não houver, para “+ Adicionar personalização”.
- As pílulas de técnica são `aria-pressed` num `role="group"` com nome “Técnica”. As posições desativadas usam `aria-disabled` e mostram o motivo em texto.
- As mensagens de erro e de upload vão para `role="status"` dentro do modal.

## 7. Textos (PT-PT)

| Chave sugerida | Texto |
| --- | --- |
| `m3d_pdp.personalization_intro` | Escolha uma ou mais técnicas. Cada personalização tem o seu logótipo. |
| `m3d_pdp.personalization_empty` | Sem personalização. O artigo segue liso. |
| `m3d_pdp.add_personalization` | Adicionar personalização |
| `m3d_pdp.edit` / `m3d_pdp.remove` | Editar / Remover |
| `m3d_pdp.remove_confirm` | Remover esta personalização? |
| `m3d_pdp.new_personalization` | Nova personalização |
| `m3d_pdp.edit_personalization` | Editar personalização {{ n }} |
| `m3d_pdp.save_personalization` | Guardar personalização |
| `m3d_pdp.print_colors` | Número de cores do logótipo |
| `m3d_pdp.reuse_logo` | Usar o mesmo logótipo da personalização {{ n }} |
| `m3d_pdp.position_incompatible` | Incompatível com a personalização {{ n }} |
| `m3d_pdp.by_quote` | Por orçamento |
| `m3d_pdp.price_tiers_title` | Preço por unidade, artigo sem personalização |
| `m3d_pdp.price_reference` | Referência {{ market }} · IVA incluído |
| `m3d_pdp.tier_from` | A partir de {{ qty }} unidades: {{ unit }} por unidade. |
| `m3d_pdp.calculate_price` | Calcular preço |
| `m3d_pdp.update_price` | Atualizar preço |
| `m3d_pdp.calculating` | A calcular o preço… |
| `m3d_pdp.quote_failed` | Não foi possível calcular o preço. Pode pedir orçamento. |
| `m3d_pdp.quote_destination` | Válido para {{ destination }}. Mudar o destino recalcula o preço. |
| `m3d_pdp.checkout_configuration` | Finalizar com esta configuração |
| `m3d_pdp.quote_with_configuration` | Pedir orçamento com esta configuração |
| `m3d_pdp.max_personalizations` | Atingiu o número máximo de personalizações para este artigo. |

## 8. Fora deste documento

O cálculo e a cobrança do preço variável (draft orders ou outro mecanismo num plano Grow sem Plus), as regras de IVA por destino ou para clientes empresariais da UE, a validação no servidor e o encaminhamento das artes ao fornecedor pertencem à arquitetura do Codex.
