# Fluxos Auxiliares

## Status

**Implementado**

## Objetivo

Manter fluxos auxiliares necessários para preparar massa de teste utilizada por outros cenários.

## Automação

Arquivo: `cypress/e2e/Auxiliares/SecondaryAccount.cy.js`

Page Objects:
- `cypress/pages/HomePage.js`
- `cypress/pages/RegisterPage.js`

Fixture utilizada: `cypress/fixtures/registration.json`

Fixture gerada: `cypress/fixtures/createdUser2.json`

## Cenário automatizado

| ID | Cenário | Validação |
|---|---|---|
| ASSISTANT001 | Cadastro de segundo usuário com dados válidos | Confirma a mensagem de boas-vindas e valida o conteúdo gravado em `createdUser2.json`. |

## Dados

O username é gerado dinamicamente com o padrão:

`qa_<timestamp>_2`

Os demais dados são derivados de `registration.json`.

## Evidências

O fluxo gera screenshots antes e depois do cadastro.

## Observações

Este fluxo é auxiliar e não representa uma funcionalidade de negócio independente. Seu objetivo atual é preparar massa adicional para a automação.
