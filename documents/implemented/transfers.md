# Transferências

## Status

**Implementado**

## Automação

Arquivo: `cypress/e2e/transfer/transfer.cy.js`

Page Objects:
- `cypress/pages/HomePage.js`
- `cypress/pages/LoginPage.js`
- `cypress/pages/TransferPage.js`

Fixture utilizada: `cypress/fixtures/createdUser.json`

## Cenários automatizados

| ID | Cenário | Validação |
|---|---|---|
| TRANSFER001 | Transferência entre contas diferentes | Preenche valor e contas de origem/destino e valida a área de resultado da transferência. |
| TRANSFER002 | Transferência sem informar valor | Seleciona as contas, envia sem valor e valida a área de erro. |
| TRANSFER003 | Transferência com valor zero | Envia valor `0` e valida a área de erro. |
| TRANSFER004 | Transferência com valor negativo | Envia valor `-100` e valida a área de erro. |
| TRANSFER005 | Transferência com valor não numérico | Envia `abc` e valida a área de erro. |
| TRANSFER006 | Transferência para a mesma conta | Utiliza a mesma conta na origem e destino e valida a área de erro. |

## Pré-condição

Antes de cada teste, o projeto:

1. Acessa a página inicial.
2. Lê `createdUser.json`.
3. Realiza login.
4. Confirma `/overview.htm`.
5. Acessa a funcionalidade de transferência.

## Dados

Os valores de transferência são definidos diretamente nos testes.

As contas de origem e destino também são informadas diretamente pelos testes, utilizando IDs fixos.

## Evidências

Todos os cenários geram screenshots antes e depois da operação.

## Observações

- A seleção de contas atualmente utiliza IDs fixos no teste, e não uma descoberta dinâmica das contas disponíveis para o usuário.
- Os cenários negativos validam a presença da área de erro (`transferError`), mas não necessariamente validam uma mensagem textual específica.
- A transferência válida valida a presença da área de resultado (`transferResult`), sem validar atualmente todos os detalhes da operação.
