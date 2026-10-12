# Contrato normalizado v2 — proposta local

09/10/2026. Contrato interno da app M3D; não descreve nomes de campos/headers dos feeds MidOcean. Adaptadores só serão definidos com documentação e amostras reais da conta. Sem ligação autenticada, importação ou checkout criado.

## Seleção e catálogo privado

Uma lista manual identifica referências do fornecedor selecionadas para o piloto. A app mantém identidade externa, variante, SKU opaco M3D, IDs Shopify, versão de snapshot e autoria dos campos. SKU mantém-se estável; não derivar sequências da posição no feed nem renumerar ao mudar título. Só referências selecionadas geram plano de importação. Artigo em falta, snapshot incompleto ou preço ausente entra em revisão, não em exclusão/zero automático.

Cada custo declara moeda, unidade (unitário, lote, por cor, por posição ou preparação), escalão de quantidade e validade. Custos unitários normalizados só entram no cálculo depois de demonstrar como totais/preparação/mínimos do fornecedor foram tratados. Não adivinhar EUR ou converter um preço de lote em preço unitário sem unidade comprovada.

## Configuração enviada à app

Campos propostos: variant_id Shopify, quantity, destino necessário à cotação e personalizations[]. Cada item tem ID estável, technique_id, position_id, width_mm, height_mm, contagem/códigos de cores quando exigidos e upload_id. Uma referência de arte pode ser reutilizada em vários itens sem duplicar armazenamento. O browser nunca envia custo autoritativo, taxa fiscal autoritativa ou preço cobrável.

Validação no servidor: produto selecionado e publicado no âmbito correto, variante/quantidade/múltiplos disponíveis, técnica aplicável, posição/dimensões/cores, compatibilidade entre itens, máximo de itens e pertença/estado de cada arte. Conflitos vêm de regras comprovadas do fornecedor, não de uma proibição genérica de repetir posição. Estado sem regras suficientes é revisão/orçamento, não aprovação de produção.

## Arte e cotação

upload_id identifica objeto privado e seu proprietário/sessão; validar tamanho, tipo real e estado antes de utilizar. Nome de ficheiro/MIME/URL enviados pelo cliente não bastam. Pré-visualização usa URL controlada temporária. _config_id no carrinho é referência, não segredo nem autenticação. Arte pública atual no CDN Shopify não estabelece o contrato de segurança dos novos uploads privados.

Cotação privada associa configuração canónica, snapshot de custos, política, contexto fiscal, preços, stock observado e validade. Alterar quantidade, variante, arte, técnica, posição ou destino invalida a oferta. Revalidar no servidor antes de criar checkout; a confirmação de pagamento deve corresponder à configuração e total aprovados. Não enviar automaticamente ordem de compra MidOcean nesta fase.

Projeção pública contém apenas quote_id, validade, resumo da configuração, preços unitário/total finais, moeda, indicação fiscal e disponibilidade/percurso. Excluir referências do fornecedor, chave API, custo de compra, custo de impressão, margens e bases/racionais privados do módulo de cálculo. A projeção pública não é a saída completa de pricing.mjs.

## Cobrança e próximas provas

Oferta de preço fixo igual ao valor Shopify pode continuar no carrinho nativo. Preço variável exige oferta/draft cotado no servidor e checkout correspondente; até existir prova, encaminhar para orçamento com toda a configuração. Nunca alterar preço global da variante temporariamente por sessão nem cobrar um valor vindo de line item properties.

Provas pendentes: normalização dos cinco feeds reais, preparação/quantidades agrupadas, arredondamento com Shopify, tributação da operação, stock/reserva, uploads privados e oferta de checkout no Grow. Exemplos sintéticos do cálculo são testes de algoritmo; não comprovam preço fornecedor, integração ou disponibilidade comercial.

Referências: [arquitetura §10](midocean-arquitetura.md), [P-A revisão2](../design/p-a-personalizacoes.md), [parecer técnico](codex-p-a-review.md), [IVA](midocean-iva.md), [viabilidade](midocean-precos-viabilidade.md).
