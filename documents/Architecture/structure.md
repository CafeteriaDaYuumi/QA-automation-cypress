# Estrutura do Projeto

## Visão geral

A automação utiliza Cypress para validar os principais fluxos da aplicação ParaBank.

A estrutura atual é organizada por responsabilidade:

```text
cypress/
├── e2e/
│   ├── register/
│   ├── login/
│   ├── accounts/
│   ├── transfer/
│   └── Auxiliares/
│
├── fixtures/
├── pages/
└── support/
```

## E2E

Os testes end-to-end ficam organizados por contexto funcional.

| Diretório | Responsabilidade |
|---|---|
| `register/` | Cadastro de usuários |
| `login/` | Login e logout |
| `accounts/` | Consulta de contas e transações |
| `transfer/` | Transferências |
| `Auxiliares/` | Fluxos de preparação de massa de teste |

## Pages

A pasta `cypress/pages/` concentra os Page Objects utilizados pelos testes.

## Fixtures

A pasta `cypress/fixtures/` contém dados-base e arquivos gerados durante a execução.

## Support

`cypress/support/e2e.js` é carregado automaticamente pelo Cypress e importa `commands.js`.

Atualmente, `cypress/support/commands.js` não possui Custom Commands próprios.

## Regra de organização

Os testes devem ser organizados pelo contexto funcional e as interações repetitivas com a interface devem ficar nos Page Objects.
