# MidOcean — núcleo local de simulação

Primeiro módulo de cálculo isolado do tema. Não é app Shopify, servidor publicado ou cliente autenticado MidOcean. Não faz chamadas de rede nem altera catálogo, preço ou stock. A pasta está excluída do envio de tema em `.shopifyignore`.

`pricing.mjs` calcula uma configuração com os quatro fatores confirmados, custos unitários normalizados e uma taxa fiscal explícita. Somar impressão de cada personalização; preparação, transporte e custos em escalões precisam de normalização comprovada antes de chamar o módulo. A função não interpreta feeds nem adivinha custos em falta. Valores das fixtures são exemplos locais.

O fator aplica-se às unidades de uma configuração no protótipo. Agrupar cores/tamanhos, aplicar fator a todas as unidades ou de forma progressiva e arredondar por unidade/linha são regras que ainda devem ser reconciliadas antes de cobrança. A simulação usa fator único da quantidade informada e arredondamento half-up por unidade; essa escolha não constitui aprovação comercial adicional.

A entrada e a saída completa são privadas: o cálculo pode expor bases de custo/racionais para auditoria local. A futura API pública projeta só preços finais, indicação fiscal, validade e resumo da cotação, excluindo custos do fornecedor/impressão e margens. [Contrato normalizado proposto](../../colaboracao/midocean-contrato-v2.md).

Limite deste primeiro módulo: custos de entrada em cêntimos inteiros (number seguro ou bigint), declarados como EUR/minor_per_unit; IVA em basis points. Não arredondar um custo real com fração de cêntimo para o adaptar ao módulo. Se os feeds usarem mais casas ou a preparação repartida produzir frações, ampliar o contrato para escala/racionais exatos antes de integração. Preservar os decimais originais no normalizador; arredondar apenas o preço final segundo a política reconciliada.

Executar com Node.js 22 ou superior:

```powershell
node --test integracoes/midocean/pricing.test.mjs
```

Próximo módulo: contrato real e normalização dos cinco feeds com fixtures expurgadas, seleção manual e relatório de diferenças. Só depois: adaptadores autenticados, importação de rascunhos e cobrança reconciliada na Shopify. Não colocar chaves nesta pasta.

Fontes e limites: [arquitetura](../../colaboracao/midocean-arquitetura.md), [viabilidade de cobrança](../../colaboracao/midocean-precos-viabilidade.md), [IVA](../../colaboracao/midocean-iva.md), [contas](../../colaboracao/midocean-contas.md).
