# Automação de Testes Web com Cypress

Projeto de automação de testes End-to-End desenvolvido com **Cypress** e **JavaScript** para validar os principais fluxos funcionais da aplicação bancária de demonstração **ParaBank**.

O projeto foi estruturado com foco em organização, reutilização de código, documentação, testes de regressão e integração contínua utilizando GitHub Actions.

---

## Aplicação testada

**ParaBank**

https://parabank.parasoft.com/parabank/index.htm

O ParaBank é uma aplicação bancária de demonstração utilizada para estudos e práticas de testes de software.

Todos os usuários, contas e dados utilizados neste projeto são fictícios.

---

## Objetivo

Desenvolver uma suíte de testes automatizados capaz de validar os principais fluxos da aplicação, incluindo cenários positivos, negativos, regras de negócio, campos obrigatórios e persistência de dados.

O projeto também tem como objetivo demonstrar conhecimentos em:

* Planejamento de testes
* Automação End-to-End
* Cypress
* JavaScript
* Page Object Model
* Testes funcionais
* Testes de regressão
* Criação de massa de teste
* Registro de defeitos
* Evidências de execução
* Git e GitHub
* Integração contínua

---

## Tecnologias utilizadas

* Cypress
* JavaScript
* Node.js
* npm
* Git
* GitHub
* GitHub Actions
* Markdown
* Visual Studio Code

---

## Funcionalidades contempladas

O projeto prevê a automação das seguintes funcionalidades:

* Cadastro de usuário
* Login
* Logout
* Visualização de contas
* Consulta de detalhes da conta
* Histórico de transações
* Transferência entre contas
* Pagamento de contas
* Solicitação de empréstimo
* Atualização de perfil
* Navegação em páginas autenticadas
* Controle de sessão
* Regressão dos principais fluxos

---

## Tipos de teste

A suíte contempla ou prevê os seguintes tipos de validação:

* Testes funcionais
* Testes End-to-End
* Testes positivos
* Testes negativos
* Testes de regressão
* Testes de navegação
* Testes de sessão
* Testes de persistência
* Validação de campos obrigatórios
* Validação de mensagens
* Validação de regras de negócio
* Testes com dados inválidos
* Testes com valores de limite

---

## Estrutura do projeto

```text
QA-automation-cypress/
│
├── .github/
│   └── workflows/
│       └── cypress.yml
│
├── cypress/
│   ├── e2e/
│   │   ├── register/
│   │   ├── login/
│   │   ├── accounts/
│   │   ├── transfer/
│   │   ├── bill-pay/
│   │   ├── loan/
│   │   ├── profile/
│   │   └── regression/
│   │
│   ├── fixtures/
│   │   ├── registration.json
│   │   ├── login.json
│   │   ├── transfer.json
│   │   ├── billPay.json
│   │   ├── loan.json
│   │   └── profile.json
│   │
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── RegisterPage.js
│   │   ├── LoginPage.js
│   │   ├── AccountsPage.js
│   │   ├── TransferPage.js
│   │   ├── BillPayPage.js
│   │   ├── LoanPage.js
│   │   └── ProfilePage.js
│   │
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   │
│   ├── screenshots/
│   └── videos/
│
├── Documentation/
│   ├── Planejamento/
│   │   ├── Backlog.md
│   │   ├── Plano_de_Desenvolvimento.md
│   │   └── Sprints.md
│   │
│   ├── Testes/
│   │   ├── Plano_de_Testes.md
│   │   ├── Cenarios_de_Teste.md
│   │   ├── Casos_de_Teste.md
│   │   ├── Criterios_de_Aceite.md
│   │   └── Massa_de_Teste.md
│   │
│   └── Defeitos/
│       ├── Registro_de_Defeitos.md
│       └── Bug_Report_Template.md
│
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

A estrutura poderá sofrer ajustes durante o desenvolvimento.

---

## Arquitetura

O projeto utiliza o padrão **Page Object Model — POM**.

Nesse padrão, os seletores e as ações realizadas nas páginas são mantidos em arquivos separados dos testes.

Exemplo:

```javascript
class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('input[value="Log In"]')
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username)
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password)
  }

  submitLogin() {
    this.elements.loginButton().click()
  }

  login(username, password) {
    this.fillUsername(username)
    this.fillPassword(password)
    this.submitLogin()
  }
}

export default new LoginPage()
```

Exemplo de utilização:

```javascript
import loginPage from '../../pages/LoginPage'

describe('Login', () => {
  it('deve realizar login com credenciais válidas', () => {
    cy.visit('/')

    loginPage.login(
      Cypress.env('username'),
      Cypress.env('password')
    )

    cy.contains('Accounts Overview').should('be.visible')
  })
})
```

---

## Pré-requisitos

Antes de executar o projeto, instale:

* Node.js
* npm
* Git
* Google Chrome ou outro navegador compatível

Para verificar as versões instaladas:

```bash
node --version
npm --version
git --version
```

---

## Clonando o repositório

```bash
git clone https://github.com/CafeteriaDaYuumi/QA-automation-cypress.git
```

Acesse a pasta do projeto:

```bash
cd QA-automation-cypress
```

---

## Instalando as dependências

```bash
npm install
```

Caso o projeto ainda não possua o Cypress instalado:

```bash
npm install cypress --save-dev
```

---

## Abrindo o Cypress

Para abrir a interface gráfica:

```bash
npx cypress open
```

Depois:

1. Selecione a opção de testes End-to-End.
2. Escolha o navegador.
3. Selecione o arquivo de teste desejado.

---

## Executando em modo headless

Para executar todos os testes sem abrir a interface:

```bash
npx cypress run
```

---

## Executando em um navegador específico

### Google Chrome

```bash
npx cypress run --browser chrome
```

### Electron

```bash
npx cypress run --browser electron
```

---

## Executando um único arquivo

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

---

## Scripts npm

Exemplo de configuração no `package.json`:

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:chrome": "cypress run --browser chrome",
    "test": "cypress run"
  }
}
```

Com essa configuração, os comandos poderão ser executados desta forma:

```bash
npm run cy:open
```

```bash
npm run cy:run
```

```bash
npm run cy:chrome
```

---

## Configuração da URL base

Exemplo de configuração no arquivo `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank',
    setupNodeEvents(on, config) {
      return config
    }
  },
  video: true,
  screenshotOnRunFailure: true
})
```

Com a URL base configurada, os testes poderão utilizar:

```javascript
cy.visit('/index.htm')
```

---

## Massa de teste

Os dados reutilizáveis deverão ser armazenados em arquivos da pasta:

```text
cypress/fixtures/
```

Exemplo:

```json
{
  "validUser": {
    "firstName": "Victor",
    "lastName": "Cypress",
    "address": "Rua dos Testes, 150",
    "city": "Betim",
    "state": "MG",
    "zipCode": "32600100",
    "phone": "31988887777",
    "ssn": "123456789",
    "password": "Cypress@123",
    "confirmPassword": "Cypress@123"
  }
}
```

O nome de usuário utilizado nos testes de cadastro deverá ser gerado dinamicamente para evitar duplicidade:

```javascript
const username = `qa_cypress_${Date.now()}`
```

---

## Variáveis de ambiente

Credenciais e informações que não devem permanecer diretamente no código poderão ser fornecidas por variáveis de ambiente.

Exemplo:

```javascript
Cypress.env('username')
Cypress.env('password')
```

Execução pelo terminal:

```bash
npx cypress run --env username=usuario_teste,password=SenhaTeste123
```

Também poderá ser utilizado um arquivo local `cypress.env.json`:

```json
{
  "username": "usuario_teste",
  "password": "SenhaTeste123"
}
```

Esse arquivo não deverá ser publicado caso contenha informações que não devam ficar no repositório.

Exemplo para o `.gitignore`:

```text
cypress.env.json
```

---

## Integração contínua

O projeto utilizará GitHub Actions para executar os testes automaticamente.

Exemplo de workflow:

```yaml
name: Cypress E2E Tests

on:
  push:
    branches:
      - main
      - develop

  pull_request:
    branches:
      - main

  workflow_dispatch:

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v4

      - name: Executar testes Cypress
        uses: cypress-io/github-action@v6
        with:
          browser: chrome

      - name: Publicar screenshots
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots
          if-no-files-found: ignore

      - name: Publicar vídeos
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-videos
          path: cypress/videos
          if-no-files-found: ignore
```

---

## Evidências

Durante as execuções, o Cypress poderá gerar:

* Screenshots de falhas
* Vídeos das execuções
* Logs no terminal
* Resultados no GitHub Actions
* Relatórios adicionais

Pastas padrão:

```text
cypress/screenshots/
cypress/videos/
```

---

## Documentação

A documentação do projeto está organizada na pasta:

```text
Documentation/
```

### Planejamento

* Backlog
* Plano de desenvolvimento
* Organização das sprints

### Testes

* Plano de testes
* Cenários de teste
* Casos de teste
* Critérios de aceite
* Massa de teste

### Defeitos

* Registro de defeitos
* Modelo de bug report
* Evidências relacionadas

---

## Organização das sprints

| Sprint   | Escopo                         |
| -------- | ------------------------------ |
| Sprint 0 | Configuração do ambiente       |
| Sprint 1 | Cadastro                       |
| Sprint 2 | Login e logout                 |
| Sprint 3 | Contas e transações            |
| Sprint 4 | Transferências                 |
| Sprint 5 | Pagamento de contas            |
| Sprint 6 | Solicitação de empréstimo      |
| Sprint 7 | Atualização de perfil          |
| Sprint 8 | Regressão e refatoração        |
| Sprint 9 | CI/CD, relatórios e evidências |

---

## Status do projeto

| Etapa                   | Status             |
| ----------------------- | ------------------ |
| Planejamento            | Concluído          |
| Documentação inicial    | Concluída          |
| Configuração do Cypress | Em desenvolvimento |
| Cadastro                | Não iniciado       |
| Login e logout          | Não iniciado       |
| Contas                  | Não iniciado       |
| Transferências          | Não iniciado       |
| Pagamentos              | Não iniciado       |
| Empréstimos             | Não iniciado       |
| Atualização de perfil   | Não iniciado       |
| Regressão               | Não iniciado       |
| GitHub Actions          | Não iniciado       |

Os status deverão ser atualizados conforme a evolução do projeto.

---

## Critérios para conclusão

Uma funcionalidade será considerada concluída quando:

* Os casos de teste estiverem documentados.
* A massa de teste estiver definida.
* Os cenários estiverem automatizados.
* Os testes estiverem executando de forma estável.
* Os Page Objects estiverem atualizados.
* As falhas encontradas estiverem analisadas.
* Os defeitos estiverem registrados.
* As evidências estiverem disponíveis.
* A documentação estiver atualizada.
* O código estiver versionado no GitHub.

---

## Boas práticas adotadas

* Page Object Model
* Separação entre teste e interação com páginas
* Uso de fixtures
* Geração de dados dinâmicos
* Testes independentes sempre que possível
* Seletores centralizados
* Evitar esperas fixas
* Evidências em caso de falha
* Versionamento com Git
* Documentação em Markdown
* Execução automatizada em CI/CD

---

## Registro de defeitos

Os defeitos identificados durante os testes deverão conter:

* Identificador
* Título
* Descrição
* Ambiente
* Pré-condições
* Passos para reprodução
* Resultado esperado
* Resultado obtido
* Severidade
* Prioridade
* Status
* Evidências

Os registros poderão ser mantidos na documentação ou em Issues do GitHub.

---

## Possíveis melhorias futuras

* Relatórios com Mochawesome
* Relatórios com Allure
* Testes orientados a dados
* Uso de interceptações com `cy.intercept()`
* Validações de API durante os fluxos E2E
* Execução em múltiplos navegadores
* Execução paralela
* Testes de acessibilidade
* Testes de responsividade
* Configuração de lint
* Configuração de Prettier
* Cobertura de novos fluxos
* Integração com ferramentas de gerenciamento de testes

---

## Limitações

* O ParaBank é um ambiente público de demonstração.
* A aplicação poderá apresentar lentidão ou indisponibilidade.
* Usuários cadastrados podem permanecer salvos no ambiente.
* Contas e dados podem variar entre usuários.
* Algumas regras de validação podem não estar implementadas.
* Falhas do ambiente não devem ser classificadas automaticamente como defeitos funcionais.
* Números de conta devem ser obtidos dinamicamente sempre que possível.

---

## Repositório

https://github.com/CafeteriaDaYuumi/QA-automation-cypress

---

## Autor

**Victor Hugo**

Estudante de Análise e Desenvolvimento de Sistemas e profissional com experiência em testes de software, automação, validação de APIs, documentação de testes e suporte de TI.

---

## Licença

Este projeto foi desenvolvido para fins de estudo, prática e demonstração de conhecimentos em Quality Assurance e automação de testes.

A aplicação ParaBank pertence aos seus respectivos responsáveis.
