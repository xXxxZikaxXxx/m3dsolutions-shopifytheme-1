# Elementos extraídos do manual de marca

Extraídos em 08/10/2026 de `../LO_M3D_Institucional_ManualdeMarca_251023 (1).pdf`, a pedido do utilizador. O original vetorial em `.ai` foi gravado sem conteúdo compatível com PDF e não pôde ser lido fora do Illustrator. São referências de marca, **ainda não são assets do tema**: a cópia para `assets/` segue as decisões do Design System, depois da ordem de início.

## Vetores (SVG)

São os caminhos originais do PDF, sem redesenho, com `viewBox` recortado ao elemento.

| Ficheiro | Origem | Notas |
| --- | --- | --- |
| `logo-m3d-positivo.svg` | p. 5, logótipo principal | Preto `#000000` |
| `logo-m3d-negativo.svg` | Mesma geometria | Branco, para fundos escuros |
| `logo-m3d-cinza.svg` | Mesma geometria | `#666666`, valor medido na p. 6 |
| `logo-m3d-horizontal-positivo.svg` / `-negativo.svg` | p. 8, versão de redução | Para tamanhos pequenos e cabeçalho mobile |
| `slogan-make-it-real.svg` | p. 5 | Texto em curvas: Regular + “REAL.” Bold Itálico |
| `pincelada-m.svg` | p. 1, a pincelada em “M” | Forma completa, maior do que a página original; recortar por CSS (`overflow: hidden`) |

A cor está no `<g fill>` de cada SVG. Para outra cor, troca-se só esse atributo, sem tocar nos caminhos.

## Imagens (PNG com transparência)

| Ficheiro | Origem | Resolução |
| --- | --- | --- |
| `forma-fluida-a.png` a `-e.png` | p. 8, 9 e 12 | 213 a 286 px de largura |
| `pincelada-m-gradiente.png` | p. 13 | 845 × 580 px |
| `fundo-formas-fluidas.png` | p. 4, fundo de apresentação | 843 × 598 px |

**Limite:** o PDF guarda estas imagens em baixa resolução. Servem para elementos decorativos pequenos, até cerca de 140 px de largura em ecrãs de alta densidade, e para referência. Não servem para fundos grandes ou heroes. Para isso são precisos os originais do designer; não devem ser ampliadas nem refeitas em CSS como se fossem oficiais.

Foram descartadas três formas que no manual aparecem cortadas pela borda da página.

## Versão em gradiente do logótipo

O utilizador confirmou que é oficial. O vetor dessa versão não existe no PDF e o `.ai` recebido não é legível. Continua disponível o PNG atual `assets/m3dsolutionslogo.png` (3375 × 4219 px, 1,17 MB). Não foi recriado um gradiente sobre o vetor, para não fabricar uma variante da marca.
