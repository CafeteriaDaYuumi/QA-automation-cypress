# Automação de Testes Web com Cypress

Projeto de automação de testes End-to-End desenvolvido com **Cypress** e **JavaScript**, utilizando a aplicação bancária de demonstração **ParaBank** como ambiente de testes.

O objetivo do projeto é automatizar fluxos funcionais da aplicação, validar comportamentos esperados e manter uma estrutura de testes organizada e reutilizável.

---

## Sobre o projeto

A automação cobre atualmente os principais fluxos já implementados no projeto:

* Cadastro de usuário
* Login e logout
* Consulta de contas
* Consulta de detalhes da conta
* Consulta do histórico de transações
* Consulta de detalhes de uma transação
* Transferências entre contas

Além dos fluxos funcionais, o projeto utiliza **Page Object Model**, fixtures para massa de teste e screenshots como evidências de execução.

Novas funcionalidades ainda não implementadas são mantidas separadamente na documentação de planejamento.

---

## Aplicação testada

**ParaBank**

https://parabank.parasoft.com/parabank/index.htm

O ParaBank é uma aplicação bancária de demonstração utilizada para estudos e práticas de testes de software.

Os dados utilizados pela automação são destinados ao ambiente de testes e podem ser alterados ou removidos pela própria aplicação.

---

# Como o projeto funciona

A automação segue uma separação entre **cenário de teste, interação com a aplicação e dados de teste**.

De forma simplificada:

```text
Teste E2E
   │
   ├── utiliza dados das fixtures
   │
   ├── executa ações através dos Page Objects
   │
   └── valida o resultado através de Assertions
```

### Testes E2E

Os arquivos dentro de `cypress/e2e/` representam os cenários automatizados.

Eles são responsáveis por:

* preparar o cenário;
* utilizar a massa necessária;
* chamar os Page Objects;
* executar as ações;
* validar os resultados;
* registrar evidências quando necessário.

### Page Objects

Os Page Objects ficam em:

```text
cypress/pages/
```

Eles centralizam a interação com as páginas da aplicação.

Atualmente existem Page Objects para:

* página inicial;
* cadastro;
* login;
* contas;
* transferências.

Isso evita espalhar seletores e ações de interface diretamente pelos testes.

### fixtures

Os dados de teste ficam em:

```text
cypress/fixtures/
```

Além dos dados estáticos, alguns fluxos geram arquivos durante a execução.

Por exemplo:

```text
registration.json
        │
        ▼
Cadastro
        │
        ▼
createdUser.json
        │
        ├── Login
        ├── Contas
        └── Transferências
```

O username utilizado no cadastro é gerado dinamicamente para reduzir conflitos com usuários já existentes.

---

# Estrutura do projeto

```text
QA-automation-cypress/
│
├── .github/
│   └── workflows/
│
├── cypress/
│   ├── e2e/
│   │   ├── register/
│   │   ├── login/
│   │   ├── accounts/
│   │   ├── transfer/
│   │   └── billpaypage/
│   │
│   ├── fixtures/
│   │
│   ├── pages/
│   │
│   ├── screenshots/
│   │
│   ├── videos/
│   │
│   └── support/
│       ├── commands.js
│       └── e2e.js
│
├── documents/
│   ├── implemented/
│   ├── planning/
│   ├── architecture/
│   ├── BACKLOG.md
│   └── CHANGELOG.md
│
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

A estrutura pode evoluir conforme novas funcionalidades e necessidades técnicas forem implementadas.

---

# Onde encontrar cada informação

A pasta `documents/` foi dividida para evitar que a mesma informação precise ser mantida em vários documentos.

| Local            | O que contém                                       |
| ---------------- | -------------------------------------------------- |
| `implemented/` | Funcionalidades e testes que já existem no projeto |
| `planning/`    | Funcionalidades que ainda serão implementadas      |
| `architecture/`   | Padrões e decisões técnicas da automação           |
| `BACKLOG.md`     | Trabalho que ainda precisa ser realizado           |
| `CHANGELOG.md`   | Histórico das mudanças do projeto                  |

### Por onde começar

Se você quer entender **o que já foi automatizado**:

```text
documents/implemented/
```

Se quer saber **o que ainda falta implementar**:

```text
documents/planning/
documents/BACKLOG.md
```

Se quer entender **como a automação foi estruturada**:

```text
documents/architecture/
```

Se quer saber **o que mudou ao longo do projeto**:

```text
documents/CHANGELOG.md
```

---

# Funcionalidades implementadas

## Cadastro

Local dos testes:

```text
cypress/e2e/register/
```

Documentação:

```text
documents/implemented/register.md
```

O fluxo possui cenários de cadastro válido e validações de dados obrigatórios e inválidos.

---

## Login e Logout

Local dos testes:

```text
cypress/e2e/login/
```

Documentação:

```text
documents/implemented/Login.md
```

O fluxo utiliza o usuário criado pelo cadastro e também contempla cenários de credenciais inválidas e logout.

---

## Contas

Local dos testes:

```text
cypress/e2e/accounts/
```

Documentação:

```text
documents/implemented/accounts.md
```

São validados:

* consulta das contas;
* detalhes da conta;
* histórico de transações;
* detalhes de uma transação.

---

## Transferências

Local dos testes:

```text
cypress/e2e/transfer/
```

Documentação:

```text
documents/implemented/transfer.md
```

São contemplados cenários de:

* transferência válida;
* ausência de valor;
* valor zero;
* valor negativo;
* valor não numérico;
* transferência para a mesma conta.

---

# Arquitetura

O projeto utiliza **Page Object Model (POM)**.

A ideia principal é separar:

```text
Cenário de teste
       │
       ▼
Page Object
       │
       ▼
Interface da aplicação
```

Os testes descrevem **o que está sendo validado**, enquanto os Page Objects concentram **como a aplicação é utilizada**.

Os detalhes da arquitetura estão em:

```text
documents/architecture/
```

Principais documentos:

* `structure.md`
* `Page_Object_Model.md`
* `fixtures.md`
* `evidence.md`
* `cypress_Configuration.md`

---

# Pré-requisitos

Para executar o projeto localmente, é necessário ter:

* Node.js
* npm
* Git
* um navegador compatível com Cypress

Verifique as versões instaladas:

```bash
node --version
npm --version
git --version
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/CafeteriaDaYuumi/QA-automation-cypress.git
```

Entre na pasta:

```bash
cd QA-automation-cypress
```

Instale as dependências:

```bash
npm install
```

---

# Executando os testes

## Interface do Cypress

Para abrir o Cypress:

```bash
npx cypress open
```

Depois:

1. selecione **E2E Testing**;
2. escolha o navegador;
3. selecione o teste que deseja executar.

---

## Execução em modo headless

Para executar a suíte sem abrir a interface:

```bash
npx cypress run
```

---

## Executando no Chrome

```bash
npx cypress run --browser chrome
```

---

## Executando um único teste

Exemplo:

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

Substitua o caminho pelo spec que deseja executar.

---

# Evidências

Durante a execução, os testes podem gerar screenshots e vídeos.

Os arquivos ficam nas pastas:

```text
cypress/screenshots/
cypress/videos/
```

Os testes também utilizam `cy.screenshot()` para registrar estados importantes dos fluxos.

Além disso, o Cypress está configurado para gerar screenshot em caso de falha.

As regras e detalhes sobre evidências estão documentados em:

```text
documents/architecture/evidence.md
```

---

# Massa de teste

Os dados reutilizáveis ficam em:

```text
cypress/fixtures/
```

Entre os arquivos utilizados atualmente estão:

```text
registration.json
login.json
createdUser.json
createdUser2.json
```

Os arquivos `createdUser.json` e `createdUser2.json` são utilizados para armazenar usuários criados durante os fluxos de teste.

A estratégia de fixtures está detalhada em:

```text
documents/architecture/fixtures.md
```

---

# Configuração

A configuração principal do Cypress está em:

```text
cypress.config.js
```

A aplicação ParaBank é definida como `baseUrl`, permitindo utilizar caminhos relativos nos testes.

Exemplo:

```javascript
cy.visit('/index.htm')
```

As demais configurações técnicas estão documentadas em:

```text
documents/architecture/Configuracao_Cypress.md
```

---

# Tecnologias

* **Cypress** — automação End-to-End
* **JavaScript** — linguagem utilizada nos testes
* **Node.js / npm** — execução e gerenciamento de dependências
* **Git / GitHub** — versionamento
* **Markdown** — documentação

---

# Estado atual do projeto

Atualmente, a automação possui os seguintes fluxos implementados:

```text
Cadastro
   │
   ▼
Login / Logout
   │
   ▼
Contas
   │
   ├── Detalhes da conta
   ├── Histórico
   └── Detalhes da transação
   │
   ▼
Transferências
```

Funcionalidades ainda não implementadas permanecem fora de `implemented/` e são controladas através de:

```text
documents/planning/
documents/BACKLOG.md
```

---

# Próximos passos

O que será desenvolvido posteriormente não é definido neste README.

Para consultar o trabalho pendente, consulte:

```text
documents/BACKLOG.md
```

Para consultar a descrição das funcionalidades futuras:

```text
documents/planning/
```

Isso mantém o README como **ponto de entrada do projeto**, sem transformá-lo em uma segunda versão do backlog ou da documentação de testes.

---

# Histórico

As principais alterações do projeto são registradas em:

```text
documents/CHANGELOG.md
```

O CHANGELOG mantém o histórico das versões e das funcionalidades implementadas.

---

# Repositório

https://github.com/CafeteriaDaYuumi/QA-automation-cypress

---

## Finalidade

Este projeto foi desenvolvido para estudo e demonstração de práticas de **Quality Assurance**, automação de testes End-to-End, organização de código, Page Object Model, massa de teste e documentação de testes.

A aplicação ParaBank é utilizada exclusivamente como ambiente de demonstração para a automação.
