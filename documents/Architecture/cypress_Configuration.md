# Configuração do Cypress

## Arquivo

A configuração principal está em:

```text
cypress.config.js
```

## Configuração atual

O projeto utiliza:

```javascript
e2e: {
  baseUrl: 'https://parabank.parasoft.com/parabank',
  setupNodeEvents(on, config) {
    return config
  }
}
```

## Base URL

A aplicação de teste é acessada pela `baseUrl` configurada.

Os testes podem utilizar caminhos relativos, por exemplo:

```javascript
cy.visit('/index.htm')
```

## Evidências

A configuração possui:

```javascript
screenshotOnRunFailure: true
video: true
```

Isso habilita screenshot automático em falhas e gravação de vídeo conforme o modo de execução do Cypress.

## Support

O arquivo:

```text
cypress/support/e2e.js
```

é carregado automaticamente pelo Cypress e importa:

```javascript
import './commands'
```

O arquivo `cypress/support/commands.js` está atualmente sem Custom Commands próprios.

## Eventos Node

`setupNodeEvents` retorna a configuração sem adicionar listeners ou tarefas customizadas atualmente.

## Princípio

A configuração deve conter apenas opções realmente utilizadas pelo projeto. Funcionalidades futuras, como CI/CD ou geração de relatórios externos, devem ser documentadas como planejadas até serem implementadas.
