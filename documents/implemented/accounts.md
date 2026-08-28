# Contas

## Status

**Implementado**

## Automação

Arquivo: `cypress/e2e/accounts/AccountsPage.cy.js`

Page Objects:
- `cypress/pages/HomePage.js`
- `cypress/pages/LoginPage.js`
- `cypress/pages/AccountsPage.js`

Fixture utilizada: `cypress/fixtures/createdUser.json`

## Cenários automatizados

| ID | Cenário | Validação |
|---|---|---|
| ACCOUNT001 | Consultar as contas disponíveis | Valida a área de contas, colunas, rodapé e existência de pelo menos uma conta. |
| ACCOUNT002 | Consultar os detalhes de uma conta | Acessa uma conta, valida `/activity.htm` e confirma os elementos de detalhes e atividade. |
| ACCOUNT003 | Consultar o histórico de transações | Acessa uma conta e valida o título e a tabela de transações. |
| ACCOUNT004 | Consultar os detalhes de uma transação | Valida título, detalhes da conta, detalhes da transação e valor da transação. |

## Pré-condição

Antes de cada teste, o projeto:

1. Acessa a página inicial.
2. Lê `createdUser.json`.
3. Realiza login.
4. Confirma a URL `/overview.htm`.

## Evidências

Cada cenário gera screenshots antes e depois da validação.

## Observações

Os testes utilizam o usuário armazenado em `createdUser.json`, portanto dependem da massa criada pelo cadastro.
