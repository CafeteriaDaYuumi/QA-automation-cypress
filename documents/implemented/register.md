# Cadastro de Usuário

## Status

**Implementado**

## Automação

Arquivo: `cypress/e2e/register/register.cy.js`

Page Object: `cypress/pages/RegisterPage.js`

Fixture principal: `cypress/fixtures/registration.json`

Fixture gerada durante a execução: `cypress/fixtures/createdUser.json`

## Cenários automatizados

| ID | Cenário | Validação atual |
|---|---|---|
| REGISTER001 | Cadastro de novo usuário com dados válidos | Confirma mensagem de boas-vindas e valida o usuário gravado em `createdUser.json`. |
| REGISTER002 | Cadastro sem preencher os campos obrigatórios | Valida as mensagens de obrigatoriedade dos campos do cadastro. |
| REGISTER003 | Cadastro com senhas diferentes | Executa o cadastro com senhas divergentes e registra evidências; não há assertion específica da mensagem de erro atualmente. |
| REGISTER004 | Cadastro com username já existente | Utiliza o username salvo em `createdUser.json` e executa a tentativa; não há assertion específica da mensagem de usuário existente atualmente. |
| REGISTER005 | Cadastro com campo obrigatório não preenchido | Deixa `First name` vazio e valida `First name is required.`. |

## Dados

Os dados-base são carregados de `registration.json`. O username é gerado dinamicamente com `Date.now()` para evitar colisões.

Quando o cadastro válido é concluído, os dados utilizados são gravados em `createdUser.json`. Esse arquivo é posteriormente utilizado pelos testes de login, contas e transferência.

## Evidências

Os testes geram screenshots de estado inicial e resultado usando `cy.screenshot()`.

## Observações

- `REGISTER003` e `REGISTER004` ainda precisam de assertions específicas para comprovar a mensagem/comportamento esperado.
- `createdUser.json` cria uma dependência entre o cadastro válido e os testes que reutilizam esse usuário.
