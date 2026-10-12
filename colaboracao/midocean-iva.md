# IVA e preços MidOcean — 09/10/2026

## Verificação da loja

Consulta Admin somente em leitura, validada no schema 2026-07: loja `uhqyjs-w5.myshopify.com`, moeda EUR, `taxesIncluded=true`, `taxShipping=false`. Está confirmado o modo de preços com impostos incluídos. Nenhuma configuração fiscal foi alterada. Registos fiscais, Markets, preços dinâmicos, overrides, classificação dos artigos e localização de expedição ainda não foram auditados.

## Cálculo e passagem à Shopify

Decisão do utilizador: líquido por unidade = (custo fornecedor + impressão) × fator; bruto = líquido × (1 + taxa IVA). Faixas: 1–199 ×1,60; 200–499 ×1,50; 500–1999 ×1,40; 2000+ ×1,35. Um líquido de €10 com taxa de 23% resulta em €12,30; não multiplicar por 0,23 nem acrescentar IVA novamente ao bruto.

Custos, preparação, quantidades e fator são calculados no servidor. A taxa é um contexto fiscal validado, não um valor escolhido pelo cliente. O protótipo local recebe uma taxa explícita e não determina jurisdição. O arredondamento unitário proposto no protótipo precisa de comparação com a cotação real da Shopify antes de cobrança.

Para uma oferta fixa de mercado doméstico, publicar o preço no modo de impostos incluídos já configurado. Para a configuração variável, calcular primeiro a base líquida e reconciliar preço/imposto/total com `draftOrderCalculate` e a oferta final; o significado do preço enviado deve corresponder ao modo fiscal efetivo do draft. Não assumir que `priceOverride` recebe automaticamente preço líquido. A integração deve provar que não há duplicação de IVA nem nova alteração do preço ao chegar ao checkout.

A Shopify pode retirar imposto doméstico e aplicar o do mercado de destino quando a funcionalidade e os registos estão configurados. O endereço da loja influencia a base doméstica; preços fixos por mercado e overrides têm regras próprias. `taxesIncluded=true` sozinho não comprova essa configuração. [Shopify: preços dinâmicos com impostos](https://help.shopify.com/en/manual/international/pricing/dynamic-tax-inclusive-pricing).

## Taxa e regra por operação

Para artigos sujeitos à taxa normal, Portugal continental tem 23%; não aplicar a taxa normal indiscriminadamente a produtos com classificação reduzida ou intermédia. [CIVA, artigo 18.º](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx).

Taxas normais regionais: Madeira 22%, Açores 16%. A taxa segue a localização fiscal da operação. Não implementar uma simples tabela que escolhe 22% ou 16% pelo código postal do destinatário: a legislação regional remete para o artigo 6.º, que para transmissões comuns de bens considera o local de início da expedição, com exceções conforme a operação. Cadeias de fornecimento e envio direto MidOcean exigem o enquadramento da operação efetiva. [Taxas atuais AT](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/instrucoes_administrativas/Documents/Oficio_circulado_25045_2024.pdf), [localização regional](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/decreto-lei_347-85_de_23_de_agosto-193-serie_i.pdf), [CIVA, artigo 6.º](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva6.aspx).

B2C para outro Estado da UE: pode aplicar-se o imposto do destino segundo o regime de vendas à distância/OSS. Existe exceção com limiar agregado de €10.000 e condições próprias; não presumir que a M3D está abaixo do limiar nem registada no OSS. B2B intracomunitário exige condições da operação e validação fiscal; inserir um NIF não autoriza isenção automática. Exportações têm enquadramento e documentação próprios. [UE: IVA transfronteiriço](https://europa.eu/youreurope/business/finance-and-tax/vat/cross-border-vat/index_en.htm), [Shopify: configuração UE](https://help.shopify.com/en/manual/taxes/eu/eu-tax-setup).

## Critérios antes de vender

Conferir localização de expedição/estabelecimento, registos e mercados de venda, classificação dos três artigos piloto e eventuais isenções; comparar cotações por destino com a configuração Shopify e o enquadramento fiscal da M3D. Sem esse contexto, uma simulação não vira oferta de checkout.

Mostrar “IVA incluído” quando corresponde ao total calculado. Para operação isenta ou sem IVA aplicável, usar a indicação fiscal correspondente, sem afirmar que cobrou IVA. Antes de conhecer o destino, identificar o preço como referência do mercado selecionado; confirmar o total na cotação/checkout. Alteração de destino invalida a cotação anterior.

Pendências que permanecem: agrupamento de quantidades por configuração/cor/tamanho, tratamento de preparação e transporte, arredondamento final com Shopify e regras de stock/reserva. Faixas, multiplicadores, adição do IVA, modo de impostos incluídos e SKU opaco já estão decididos ou verificados.
