# Evidências de Execução

## Objetivo

A automação utiliza screenshots e vídeos para facilitar a análise dos resultados dos testes.

## Screenshots

Os testes utilizam:

```javascript
cy.screenshot()
```

para registrar estados importantes do fluxo.

Os nomes das screenshots seguem o contexto do teste e indicam momentos como:

- `before`
- `after`
- resultado da operação

## Screenshots automáticos de falha

O Cypress está configurado com:

```javascript
screenshotOnRunFailure: true
```

Portanto, uma falha durante a execução pode gerar screenshot automaticamente.

## Vídeos

A configuração atual possui:

```javascript
video: true
```

Assim, a execução pode produzir vídeo dos testes executados em modo apropriado.

## Objetivo das evidências

As evidências devem permitir:

1. identificar o cenário executado;
2. visualizar o estado da aplicação;
3. auxiliar na investigação de falhas;
4. apoiar a análise durante desenvolvimento e regressão.

## Regra

Evidência não substitui assertion.

Um screenshot mostrando uma mensagem não comprova sozinho que o teste validou aquela mensagem. Quando o comportamento for requisito do cenário, deve existir uma assertion correspondente.
