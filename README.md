# QA Automation Cypress

Projeto de automação de testes End-to-End (E2E) desenvolvido com **Cypress e JavaScript**, utilizando o ParaBank como aplicação de demonstração. O projeto busca validar os principais comportamentos funcionais da aplicação e demonstrar práticas de Quality Assurance, organização de testes, reutilização de componentes, execução automatizada e geração de relatórios.

O repositório reúne uma suíte de testes organizada por funcionalidade, uma camada de Page Objects e um **Flow Engine** para orquestrar execuções e consolidar resultados e evidências.

## Visão geral

A automação está organizada em sete módulos funcionais, com **39 casos de teste identificados**.

| Módulo | Identificadores | Casos |
|---|---|---:|
| Cadastro | `REGISTER001`–`REGISTER005` | 5 |
| Login | `LOGIN001`–`LOGIN005` | 5 |
| Contas | `ACCOUNT001`–`ACCOUNT004` | 4 |
| Pagamento de contas | `BILLPAY001`–`BILLPAY004` | 4 |
| Empréstimos | `LOAN001`–`LOAN010` | 10 |
| Perfil | `PROFILE001`–`PROFILE005` | 5 |
| Transferências | `TRANSFER001`–`TRANSFER006` | 6 |
| **Total** | | **39** |

A quantidade de casos identificados representa o escopo catalogado da suíte, não uma garantia de que todos estejam passando em todas as execuções. O resultado efetivo deve ser consultado nos relatórios gerados.

## Aplicação testada

**ParaBank — Parasoft**

Aplicação bancária de demonstração utilizada para praticar automação e validação de comportamentos funcionais.

- Aplicação: [ParaBank](https://parabank.parasoft.com/parabank/index.htm)
- Endereço local configurado: `http://localhost:8080/parabank`

A configuração atual utiliza o endereço local como `baseUrl`. Portanto, antes de executar os testes, é necessário garantir que a aplicação esteja disponível no ambiente esperado.

## Arquitetura do projeto

O projeto separa a definição dos cenários, a interação com a interface, a preparação dos dados e a coordenação das execuções.

```text
Cenários E2E
    │
    ├── Preparação e validação dos cenários
    │
    ├── Page Objects
    │       └── Interação com a interface
    │
    ├── Dados de teste
    │       └── Fixtures e dados dinâmicos
    │
    └── Assertions
            └── Validação dos resultados

Flow Engine
    └── Orquestração das etapas
            ├── Execução dos testes
            ├── Coleta de resultados
            └── Relatórios e evidências
```

### Tecnologias e práticas

- **Cypress:** execução de testes End-to-End.
- **JavaScript:** implementação dos testes e da lógica de execução.
- **Node.js e npm:** ambiente de execução e gerenciamento de dependências.
- **Page Object Model (POM):** centralização de interações e seletores da interface.
- **Flow Engine:** coordenação de execuções compostas e organização dos resultados.
- **HTML e JSON:** formatos de relatórios de execução.
- **Git e GitHub:** versionamento e distribuição do projeto.

## Estrutura de diretórios

```text
QA-automation-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── accounts/
│   │   ├── billpay/
│   │   ├── loan/
│   │   ├── login/
│   │   ├── profile/
│   │   ├── register/
│   │   └── transfer/
│   │
│   ├── fixtures/
│   │   └── registration.json
│   │
│   ├── pages/
│   ├── flows/
│   │   ├── engine/
│   │   └── complete/
│   │
│   ├── reports/
│   └── support/
│
├── docs/
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

A estrutura acima apresenta os diretórios centrais do projeto; arquivos auxiliares e subdiretórios podem existir dentro deles. Os relatórios, as evidências e outros artefatos de execução são gerados conforme a configuração e o fluxo executado.

## Como funciona a suíte de testes

### Testes E2E

Os arquivos em `cypress/e2e/` agrupam os cenários por funcionalidade. Cada módulo possui seus próprios casos, com identificadores que permitem relacionar o teste ao catálogo e aos resultados de execução.

Os testes são responsáveis por preparar o cenário necessário, executar as ações, verificar os resultados esperados e registrar evidências quando aplicável.

### Page Object Model

Os componentes de página ficam em `cypress/pages/`. Essa camada concentra as interações com os elementos da aplicação, evitando que seletores e operações de interface precisem ser repetidos diretamente em todos os cenários.

A separação facilita a manutenção dos testes quando a interface muda e ajuda a manter os cenários focados no comportamento que está sendo validado.

### Dados de teste

Os dados estáticos reutilizáveis ficam em `cypress/fixtures/`, com `registration.json` como fixture de referência para o cadastro. Outros cenários podem preparar usuários, contas e demais dados dinamicamente durante a execução.

A estratégia atual não depende de `createdAccounts.json` para compartilhar contas entre os testes. Sempre que possível, cada cenário deve preparar os próprios dados e evitar dependência da ordem de execução ou de resultados deixados por testes anteriores.

### Flow Engine

O Flow Engine está organizado em `cypress/flows/engine/` e `cypress/flows/complete/`.

Ele coordena a execução de etapas, organiza os resultados e integra a geração de relatórios e evidências. O fluxo completo é definido por `complete.flow.js`, com suas configurações em `complete.config.js`.

É importante distinguir as duas formas de execução:

- **Execução direta do Cypress:** executa um ou mais arquivos de teste sem depender da orquestração do fluxo completo.
- **Execução pelo Flow Engine:** utiliza a camada de orquestração para coordenar as etapas e consolidar os artefatos da execução.

## Pré-requisitos

Antes de começar, instale:

- Node.js em uma versão compatível com as dependências do projeto;
- npm;
- Git;
- uma instância do ParaBank acessível pelo endereço configurado;
- um navegador compatível, caso utilize a interface do Cypress ou especifique um navegador na execução.

Verifique as ferramentas instaladas:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/CafeteriaDaYuumi/QA-automation-cypress.git
```

Entre na pasta do projeto:

```bash
cd QA-automation-cypress
```

Instale as dependências utilizando o arquivo de lock:

```bash
npm ci
```

Antes de executar os testes, confirme que a aplicação ParaBank está disponível em:

```text
http://localhost:8080/parabank
```

A configuração principal do Cypress está em `cypress.config.js`.

## Executando os testes

### Abrir a interface do Cypress

```bash
npx cypress open
```

Na interface, selecione **E2E Testing**, escolha um navegador e abra o arquivo de teste desejado.

### Executar a suíte diretamente

```bash
npx cypress run
```

Essa opção executa os testes em modo headless, sem abrir a interface gráfica do Cypress.

### Executar um módulo específico

Por exemplo, para executar os testes de login:

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

Para executar outro módulo, substitua o caminho pelo arquivo correspondente em `cypress/e2e/`.

### Executar o fluxo completo

```bash
npm run flow
```

Esse comando inicia o Flow Engine por meio de `cypress/flows/complete/complete.flow.js`. Diferentemente da execução direta de um spec, o fluxo completo coordena as etapas definidas em sua configuração e organiza os resultados e artefatos correspondentes.

Consulte `docs/execution.md` para obter os comandos de execução e as diferenças entre os modos disponíveis.

## Relatórios e evidências

O projeto possui uma camada de reporting para organizar os resultados e facilitar a análise das execuções.

Os relatórios mais recentes são disponibilizados em:

```text
cypress/reports/
├── latest-report.html
└── latest-report.json
```

O histórico de execuções do Flow Engine é organizado por identificador de fluxo:

```text
cypress/reports/history/<flow-id>/
├── report.html
└── report.json
```

As evidências do fluxo são organizadas por execução e etapa, no diretório:

```text
cypress/evidence flow/<flow-id>/
```

Conforme a execução e a configuração, esse diretório pode conter screenshots e vídeos associados às etapas.

O relatório HTML facilita a leitura dos resultados; o JSON permite consultar os dados de forma estruturada. Os artefatos devem ser analisados em conjunto quando for necessário investigar falhas, comparar execuções ou identificar comportamentos instáveis.

Os caminhos e formatos descritos correspondem à organização esperada do sistema de relatórios. A presença de cada artefato depende de a execução ter sido concluída e de a respectiva funcionalidade ter sido acionada.

## Documentação

A documentação complementar fica em `docs/`. Cada arquivo possui uma responsabilidade específica, evitando transformar o README em uma cópia da documentação técnica.

| Documento | Conteúdo |
|---|---|
| `overview.md` | Visão geral, objetivos e escopo do projeto |
| `project-structure.md` | Organização dos diretórios e componentes |
| `page-object-model.md` | Padrões e responsabilidades dos Page Objects |
| `flow-engine.md` | Arquitetura e funcionamento do Flow Engine |
| `reporting.md` | Relatórios, histórico e evidências |
| `test-strategy.md` | Abordagem e critérios da estratégia de testes |
| `test-catalog.md` | Catálogo dos casos e identificadores |
| `test-data.md` | Fixtures, dados dinâmicos e isolamento |
| `installation.md` | Preparação do ambiente |
| `execution.md` | Comandos e modos de execução |
| `troubleshooting.md` | Diagnóstico de problemas comuns |
| `contributing.md` | Orientações para contribuir com o projeto |
| `Backlog.md` | Itens planejados e trabalho pendente |

Consulte os documentos conforme sua necessidade: comece por `overview.md` para entender o projeto, use `execution.md` para executar os testes e consulte os documentos de arquitetura para compreender a implementação.

## Estado e evolução do projeto

O escopo automatizado está organizado por módulos funcionais e seus respectivos casos de teste. A manutenção da suíte envolve tanto a evolução dos cenários quanto a confiabilidade das execuções, a qualidade dos dados, a organização das evidências e a precisão da documentação.

O backlog registra tarefas propostas e trabalho pendente. A presença de uma tarefa no backlog não significa que ela tenha sido implementada, assim como a existência de um caso de teste não garante que ele esteja passando atualmente.

Para acompanhar o trabalho planejado, consulte `docs/Backlog.md`. Para compreender os critérios e a organização dos casos existentes, consulte `docs/test-catalog.md` e `docs/test-strategy.md`.

## Contribuição

Ao adicionar ou modificar testes, mantenha a organização por funcionalidade, utilize os identificadores de caso de teste de forma consistente e prefira reutilizar ou ampliar os Page Objects existentes quando isso fizer sentido.

Os cenários devem ser tão independentes quanto possível, preparar os próprios dados quando necessário e validar resultados observáveis da aplicação. Alterações no Flow Engine ou no sistema de relatórios também devem preservar a rastreabilidade entre a execução, os casos executados e as evidências geradas.

Antes de propor uma alteração, execute os testes afetados e verifique se a documentação correspondente continua refletindo o comportamento real do código.

Consulte `docs/contributing.md` para as orientações de contribuição.

## Repositório

[GitHub — CafeteriaDaYuumi/QA-automation-cypress](https://github.com/CafeteriaDaYuumi/QA-automation-cypress)

---

Este projeto tem finalidade educacional e de demonstração de práticas de Quality Assurance, automação End-to-End, organização de código, preparação de dados, orquestração de execuções e geração de relatórios. O ParaBank é utilizado como ambiente de testes de demonstração.
