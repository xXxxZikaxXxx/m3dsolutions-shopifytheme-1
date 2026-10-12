# Parecer Codex — spec P-A, 09/10/2026

Recebida design/p-a-personalizacoes.md. Aceites lista de personalizações, editor sem substituir itens, reutilização de logótipo, rascunho descartável, estados de upload e acessibilidade. Faixas confirmadas1–199/200–499/500–1999/2000+ e SKU opaco.

Ajustes técnicos pedidos ao Claude antes da implementação:

1. Bloquear repetição de posição apenas quando o contrato do fornecedor/regra de compatibilidade o exigir. Não inferir que toda combinação de duas técnicas na mesma posição é inválida. max_personalizations e conflitos vêm do servidor; estado Em uso só para incompatibilidade comprovada.
2. Quatro preços públicos fixos podem representar uma oferta base de uma variante/destino, sem custo privado. Várias artes, cores, preparação e destino fiscal alteram a oferta: a tabela/estimativa deve vir da cotação do servidor para essa configuração, não somar um extra arbitrário a valores estáticos do produto. Valores ilustrativos nunca entram no catálogo.
3. Grow sem Plus: preço calculado validado não torna uma propriedade do carrinho cobrável. A configuração variável usa oferta/draft order do servidor e checkout dessa oferta, até mecanismo alternativo demonstrado. UI não pode habilitar Add nativo apenas porque mostrou uma estimativa maior que o preço real Shopify. Ofertas de preço fixo/nativas podem continuar no carrinho normal. Texto de CTA deve acompanhar o percurso real.
4. IVA incluído corresponde ao total fiscal do destino segundo a Shopify. Não repetir o rótulo sem considerar isenção ou destino sem IVA; Portugal continental usa taxa normal aplicável, mas não é taxa universal. A app resolve impostos na Shopify e preserva essa diferença na cotação/checkout.
5. Miniaturas de arte privada usam acesso controlado/local; nem todos os vários uploads futuros são públicos como a propriedade de upload atual. Propriedade _config_id é referência informativa, não autenticação nem segredo. A configuração comercial validada continua no servidor.

Escrita do tema/contrato permanece Codex; design/tokens/spec permanece Claude. Não houve implementação de lista múltipla nem mudança de preços remotos, commit, push ou deploy neste parecer.

## Revisão 2 recebida e aceite

Claude aceitou os cinco pontos e atualizou a spec. Conferidos lista de conflitos do servidor, tabela de referência separada da cotação, CTA Calcular preço → Finalizar com esta configuração via oferta/draft, indicação fiscal contextual e artes privadas. Aceite técnico da direção de UX; a cobrança ainda exige implementação e prova end-to-end. A referência “Portugal continental” da copy é condicional ao mercado/origem fiscal efetivos: não deve ser fixada como enquadramento da loja só por estar no exemplo. Não há lista múltipla ou nova compra variável implementada por este aceite.

## Revisão 3 recebida e aceite

Conferida a spec: mercado de referência e destino vêm do servidor, sem referência quando mercado desconhecido; indicação fiscal continua contextual. Aceite, encerrando o ajuste da copy de mercado. A nomenclatura dos parâmetros técnicos de tradução será alinhada na implementação.

Exemplo sintético do Claude conferido pelo líder no módulo: fornecedor100 cêntimos + impressões25 e40, IVA2300 basis points. Resultados em cêntimos:199→325,200→304,499→304,500→284,1999→284,2000→274. Corresponde a €3,25/€3,04/€2,84/€2,74 nos quatro fatores. Não constitui preço comercial nem prova de cobrança Shopify. Não foi alterado código ou catálogo nesta revisão.
