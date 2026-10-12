# C2 — estrutura de orçamento

Data: 08/10/2026. Executor: sub-agent nativo Codex `review_coordination`, função C2.
Estado: implementação local concluída; traduções/tokens integrados pela raiz, QA da prévia C3 e revisão visual Claude aprovados. Receção por e-mail e retorno após envio real permanecem não testados.

## Arquivos reservados

- `sections/m3d-quote.liquid`
- `assets/m3d-quote.css`
- `assets/m3d-quote.js`
- `templates/page.m3d-quote.json`
- Este relatório. Nenhum outro arquivo foi editado.

## Integração exata

A secção inclui os seus dois assets, sem edição de layout. O template contém somente `main` de tipo `m3d-quote`. Para prévia da página existente, abrir `/pages/pedir-orcamento?view=m3d-quote`; não foi alterado `template_suffix` na Shopify. A raiz integrou as traduções PT-PT e o QA visual foi executado. Futura atribuição do template da página é uma alteração da loja separada.

O CSS consome tokens do Design System, ainda com fallbacks isolados; não declara `:root`, fontes, variáveis globais ou cores de settings. Usa título/intro à esquerda e duas colunas no desktop, coluna única abaixo de 900 px; campos/ação acessíveis. Integrado o contrato de `assets/m3d-tokens.css` revisto pelo Claude: espaçamento N × 4 px, tipos semânticos, borda de controlo `#8a8a8a` (3,45:1 sobre branco), foco, estados e superfície alternativa. Sem redefinir qualquer token global.

## Formulário e limites

- Shopify `{% form 'contact' %}` nativo, sem submit interceptado, fetch, backend, upload ou armazenamento local de dados pessoais.
- Nome, email e mensagem obrigatórios; empresa, produto, variante, composição multiartigo, quantidade e personalização opcionais. Todos têm labels. Erros nativos têm resumo e vínculos aos campos existentes; required/type/min/max/maxlength funcionam sem JS.
- Sucesso aparece exclusivamente em `form.posted_successfully?`; não se deduz sucesso de query/hash ou clique. Confirmação visual não demonstra entrega na caixa de correio.
- Os campos adicionais e parâmetros são informação declarada pelo requerente; não validam identidade, preço, stock ou compra. O backend contact não impõe os limites específicos desta UI: não usar estes campos para automações confiáveis.
- Não houve envio real; o teste de receção deve ser autorizado e identificado fora deste QA.
- Verificar sender email/receção com o proprietário antes de disponibilizar o percurso. Sem prazo de resposta ou condições comerciais inventadas.
- Link de privacidade só aparece se `shop.privacy_policy.url` existir. Não se criou consentimento nem política comercial.

## Contrato PDP → orçamento

Query preferida: `product`, `variant`, `quantity`, `personalization`, `lines`, `product_url`, `variant_id`. Aliases legados: `produto`, `variante`, `quantidade`, `personalizacao`. Gerar com `URL`/`URLSearchParams`.

| Parâmetro | Limite e destino |
|---|---|
| product | 160 caracteres; `contact[product]`, editável |
| variant | 160; `contact[variant]`, editável |
| quantity | inteiro 1…999999; `contact[quantity]`, editável |
| personalization | 500; `contact[personalization]`, editável |
| lines | 2000; `contact[Composição]`, editável, preserva quebras de linha |
| product_url | 2048; só origin atual e caminho `/[idioma/]products/handle`; query/hash removidos; link e campo informativo |
| variant_id | até 20 dígitos positivos; `contact[variant_id]` informativo |

Search total acima de 32768 caracteres é ignorado. Controlos e marcadores de direção são removidos; textos são atribuídos por `.value`/`.textContent`, nunca `innerHTML`. Contexto truncado apresenta aviso para revisão. URL externa, credenciais e protocolo diverso são rejeitados. Ao editar o produto, URL/id informativos são apagados; ao editar variante, id é apagado. Sem lookup real e sem alegação de autenticidade.

Shopify pode não repopular todos os campos adicionais após erro de servidor; não foi implementada persistência própria. Valores nativos nome/email/mensagem escapados são preservados pelo objeto form; os adicionais usam valores fornecidos pelo form quando disponíveis, depois recebem query apenas se vazios.

## Manifesto utilizado na integração

A chave `m3d_quote` foi integrada em `locales/en.default.json`. O JSON abaixo guarda o manifesto original; a raiz consolidou copy D4 com ajustes de privacidade, erros e confirmação de processamento (os textos finais estão no locale):

```json
{
  "m3d_quote": {
    "heading": "Pedir orçamento",
    "intro": "Uma ideia para si. Uma encomenda para a sua empresa.",
    "description": "Diga-nos o que procura e deixe os seus contactos para preparar o pedido.",
    "request_heading": "O seu pedido",
    "contact_heading": "Os seus contactos",
    "product": "Produto ou referência (opcional)",
    "variant": "Cor, tamanho ou variante (opcional)",
    "quantity": "Quantidade pretendida (opcional)",
    "personalization": "Personalização (opcional)",
    "personalization_hint": "Indique o nome, a frase ou o tipo de personalização que procura.",
    "message": "Conte-nos o que precisa",
    "message_hint": "Pode indicar vários artigos e quantidades, ou explicar uma ideia que ainda não tenha produto definido.",
    "name": "Nome",
    "email": "E-mail",
    "company": "Empresa (opcional)",
    "required_hint": "Os campos assinalados com * são obrigatórios.",
    "context_hint": "Confira os dados do produto e altere o que for necessário.",
    "view_product": "Ver o produto indicado",
    "send": "Enviar pedido de orçamento",
    "next_heading": "O que acontece a seguir",
    "next_description": "A M3D recebe os detalhes do pedido e os seus contactos para analisar as opções.",
    "no_purchase": "Enviar um pedido de orçamento não conclui uma compra.",
    "browse": "Continuar a explorar os produtos",
    "privacy": "Política de privacidade",
    "privacy_hint": "Os seus dados de contacto acompanham este pedido.",
    "success_heading": "Pedido enviado",
    "success_description": "O seu pedido de orçamento foi enviado à M3D.",
    "error_heading": "Não foi possível enviar o pedido",
    "error_description": "Verifique os campos indicados e tente novamente.",
    "client_error": "Verifique este campo antes de enviar.",
    "field_error": "Verifique este campo.",
    "quantity_error": "Indique uma quantidade inteira entre 1 e 999999.",
    "noscript": "Pode preencher e enviar este formulário. Se veio de um produto, indique o seu nome ou referência no pedido.",
    "lines": "Composição do pedido (opcional)",
    "lines_hint": "Confira as variantes e a quantidade de cada artigo incluído no pedido.",
    "context_limited": "Alguns detalhes foram abreviados. Confira e complete o pedido antes de enviar."
  }
}
```

Mesclar em `locales/en.default.schema.json`:

```json
{
  "sections": {
    "m3d_quote": {
      "name": "Orçamento M3D"
    }
  }
}
```

## Verificação

Aprovados: parse JavaScript por `node:vm.Script`, JSON do schema da secção e do template, inventário de tokens (zero desconhecidos) e nove grupos de checks comportamentais em VM com DOM simulado e sem rede: contexto/composição multilinha; limites e aviso; texto malicioso literal/remoção de controlos; rejeição de URLs externas/javascript/credenciais/caminhos fora de produto; aliases; search enorme ignorada; prefixo de idioma; aria-invalid após correção; valores restaurados divergentes não reassociam metadados. Não equivalem a QA real do navegador.

QA real da prévia executado por C3 em 1440×1000, 1024×1000, 390×844 e 360×844: HTTP 200 e overflow horizontal 0; sem erro Liquid, tradução em falta, botão sem nome ou campo sem label na coleta. Claude aprovou a composição visual do orçamento na sua ronda 1. C3 também confirmou o percurso PDP→orçamento por GET com quantidade7, limpeza dos metadados ao editar produto, texto malicioso literal, rejeição de URLs externas/javascript e `reportValidity()` com aria-invalid/mensagem. Não clicou em Enviar e bloqueou todos os métodos mutantes. Ver [c3-qa-final.md](c3-qa-final.md), capturas `.shopify/qa-redesign-20261008/final-quote-{width}.png` e [claude-status.md](claude-status.md).

Theme Check final do conjunto, informado pela raiz: 64 arquivos, 0 erros e 2 avisos históricos `OrphanedSnippet`; sintaxe JavaScript aprovada. Sem teste de receção por e-mail, sem confirmação de entrega e sem teste do retorno após POST real. A consulta Admin somente leitura registrada em `codex-status.md` encontrou email/contactEmail `m3dsolutionsshopify@gmail.com`, diferente do destinatário pedido `m3dbrindes@gmail.com`; nenhuma configuração foi alterada. O watcher apresentou uma rejeição transitória de upload do JSON enquanto a nova secção era sincronizada, apesar da gravação local sequencial secção→JSON; o JSON foi regravado depois dos assets/section. A causa observada foi upload/sincronização, não uma resposta do servidor do formulário. Nenhum commit, push, deploy, alteração de catálogo ou envio de formulário.
