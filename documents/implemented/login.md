# Login e Logout

## Status

**Implementado**

## Automação

Arquivo: `cypress/e2e/login/login.cy.js`

Page Objects:
- `cypress/pages/LoginPage.js`
- `cypress/pages/HomePage.js`

Fixture utilizada: `cypress/fixtures/createdUser.json`

## Cenários automatizados

| ID | Cenário | Validação |
|---|---|---|
| LOGIN001 | Login com usuário criado no cadastro | Confirma a mensagem de boas-vindas. |
| LOGIN002 | Login com senha inválida | Valida `The username and password could not be verified.`. |
| LOGIN003 | Login com usuário inexistente | Gera username dinâmico e valida a mensagem de credenciais inválidas. |
| LOGIN004 | Login sem preencher os campos obrigatórios | Valida `Please enter a username and password.`. |
| LOGIN005 | Logout após login realizado | Confirma o login e valida o retorno para `/index.htm` após logout. |

## Dados

`LOGIN001`, `LOGIN002` e `LOGIN005` utilizam o usuário armazenado em `createdUser.json`.

`LOGIN003` utiliza um username inexistente gerado dinamicamente com `Date.now()`.

## Evidências

Os cenários de login geram screenshots de estado inicial e resultado. O logout também registra evidências após a operação.

## Observações

Os testes de login dependem da existência de `cypress/fixtures/createdUser.json`, que é produzido pelo fluxo de cadastro válido.
