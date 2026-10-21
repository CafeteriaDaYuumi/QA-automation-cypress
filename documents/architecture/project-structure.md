# Estrutura do projeto

Este documento descreve a organização do repositório `QA-automation-cypress` com base nos arquivos presentes no pacote analisado. A documentação deve acompanhar a implementação: se um arquivo for movido, removido ou ganhar uma nova responsabilidade, este inventário deverá ser atualizado.

> **Escopo do inventário:** a árvore abaixo destaca os arquivos relevantes para desenvolvimento, execução e manutenção da automação. Diretórios internos de dependências (`node_modules/`), metadados do Git (`.git/`) e artefatos gerados durante a execução não são detalhados arquivo por arquivo.

## Visão geral

```text
QA-automation-cypress/
├── README.md
├── package.json
├── package-lock.json
├── cypress.config.js
├── cypress/
│   ├── e2e/
│   │   ├── accounts/
│   │   │   └── accounts.cy.js
│   │   ├── billpay/
│   │   │   └── billpay.cy.js
│   │   ├── loan/
│   │   │   └── loan.cy.js
│   │   ├── login/
│   │   │   └── login.cy.js
│   │   ├── profile/
│   │   │   └── profile.cy.js
│   │   ├── register/
│   │   │   └── register.cy.js
│   │   └── transfer/
│   │       └── transfer.cy.js
│   ├── fixtures/
│   │   └── registration.json
│   ├── pages/
│   │   ├── AccountsPage.js
│   │   ├── BillPayPage.js
│   │   ├── HomePage.js
│   │   ├── LoanPage.js
│   │   ├── LoginPage.js
│   │   ├── ProfilePage.js
│   │   ├── RegisterPage.js
│   │   └── TransferPage.js
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── flows/
│   │   ├── complete/
│   │   │   └── complete.flow.js
│   │   ├── config/
│   │   │   └── complete.config.js
│   │   └── engine/
│   │       └── flow-engine.js
│   ├── evidence flow/
│   ├── reports/
│   │   ├── history/
│   │   ├── latest-report.html
│   │   └── latest-report.json
│   ├── screenshots/
│   │   └── profile/
│   │       ├── PROFILE001-before.png
│   │       ├── PROFILE001-result.png
│   │       ├── PROFILE002-before.png
│   │       ├── PROFILE002-result.png
│   │       ├── PROFILE003-before.png
│   │       └── PROFILE003-result.png
│   └── videos/
└── documents/                 # documentação legada presente no pacote analisado
```

A pasta `documents/` aparece no ZIP recebido, mas será substituída pela nova estrutura de documentação definida para o projeto. Os arquivos listados nela não são tratados como fonte de verdade para este inventário.

## Arquivos da raiz

| Caminho | Responsabilidade |
|---|---|
| `README.md` | Apresentação principal do projeto e ponto de entrada para a documentação. Será mantido e atualizado após a consolidação dos documentos técnicos. |
| `package.json` | Metadados do pacote, dependências de desenvolvimento e scripts npm disponíveis. |
| `package-lock.json` | Registro das versões resolvidas das dependências npm para instalações reproduzíveis. |
| `cypress.config.js` | Configuração do Cypress, incluindo opções gerais e `baseUrl` da aplicação. |

## Testes E2E — `cypress/e2e/`

Cada subdiretório agrupa os testes automatizados por área funcional. Os arquivos `*.cy.js` contêm os cenários executados pelo Cypress.

| Diretório / arquivo | Área coberta |
|---|---|
| `accounts/accounts.cy.js` | Operações relacionadas a contas bancárias. |
| `billpay/billpay.cy.js` | Pagamento de contas. |
| `loan/loan.cy.js` | Solicitação e interação com empréstimos. |
| `login/login.cy.js` | Autenticação e cenários relacionados ao login. |
| `profile/profile.cy.js` | Consulta ou atualização de dados do perfil. |
| `register/register.cy.js` | Cadastro de usuários e validações relacionadas. |
| `transfer/transfer.cy.js` | Transferências entre contas e validações relacionadas. |

A existência de um arquivo nesta lista indica que a spec está presente no pacote; não significa, por si só, que todos os cenários estejam aprovados ou que a cobertura da funcionalidade seja completa. Os IDs, pré-condições e resultados esperados devem ser documentados no catálogo de testes após conferência de cada spec.

## Page Objects — `cypress/pages/`

As classes desta pasta encapsulam seletores e interações com páginas da aplicação, seguindo o padrão Page Object Model.

| Arquivo | Área principal |
|---|---|
| `HomePage.js` | Página inicial e navegação geral. |
| `LoginPage.js` | Interações com a página de login. |
| `RegisterPage.js` | Interações com o formulário de cadastro. |
| `AccountsPage.js` | Interações com páginas e operações de contas. |
| `TransferPage.js` | Interações com o formulário de transferência. |
| `BillPayPage.js` | Interações com o pagamento de contas. |
| `LoanPage.js` | Interações com a área de empréstimos. |
| `ProfilePage.js` | Interações com os dados do perfil. |

Esta tabela indica a responsabilidade principal sugerida pelos nomes das classes. O detalhe dos métodos, seletores e convenções pertence a `page-object-model.md` e deve ser conferido diretamente nos arquivos de implementação.

## Fixtures — `cypress/fixtures/`

- **`registration.json`**: arquivo de dados estáticos utilizado como fixture para informações relacionadas ao cadastro.

A pasta contém essa fixture no pacote analisado. Dados gerados dinamicamente durante os testes não devem ser descritos como fixtures versionadas, a menos que um arquivo correspondente exista no repositório. A estratégia completa de criação, isolamento e ciclo de vida dos dados será descrita em `test-data.md`.

## Suporte do Cypress — `cypress/support/`

| Arquivo | Responsabilidade |
|---|---|
| `e2e.js` | Arquivo de suporte carregado pelo Cypress para a configuração comum do contexto E2E. |
| `commands.js` | Registro de comandos personalizados do Cypress, quando definidos pelo projeto. |

Os comandos disponíveis e suas regras de uso devem ser documentados a partir das implementações reais em `commands.js` e da configuração em `e2e.js`.

## Execução de fluxos — `cypress/flows/`

Esta área contém os componentes usados para executar e coordenar um fluxo de testes composto por etapas.

| Caminho | Responsabilidade |
|---|---|
| `complete/complete.flow.js` | Ponto de entrada do fluxo completo, acionado pelo script npm `flow`. |
| `config/complete.config.js` | Configuração das etapas e opções do fluxo completo. |
| `engine/flow-engine.js` | Implementação do mecanismo que coordena a execução e consolida os resultados do fluxo. |

O fluxo completo não deve ser confundido com a execução de uma única spec. A sequência de etapas, as condições de continuidade, os critérios de status e o tratamento de erros devem ser detalhados em `flow-engine.md` e `reporting.md`.

## Relatórios, screenshots e evidências

Esses diretórios armazenam artefatos relacionados às execuções. O conteúdo pode variar conforme os testes executados e as configurações do Cypress e do motor de fluxo.

| Caminho | Finalidade |
|---|---|
| `cypress/reports/latest-report.html` | Relatório HTML mais recente presente no pacote. |
| `cypress/reports/latest-report.json` | Dados estruturados associados ao relatório mais recente presente no pacote. |
| `cypress/reports/history/` | Diretório destinado ao histórico de relatórios de execuções. |
| `cypress/screenshots/` | Screenshots organizadas por área ou spec; o pacote contém evidências de cenários de perfil. |
| `cypress/videos/` | Diretório de vídeos de execução do Cypress; pode estar vazio dependendo da execução e da configuração. |
| `cypress/evidence flow/` | Diretório destinado às evidências organizadas pelo fluxo. O nome contém um espaço e deve ser usado exatamente assim nos caminhos atuais. |

Os artefatos encontrados no ZIP representam o estado incluído naquele pacote, não necessariamente todos os arquivos que serão gerados em uma nova execução. As regras de geração, associação entre caso e evidência, retenção e histórico devem ser documentadas separadamente.

## Scripts npm identificados

Os seguintes scripts estão declarados no `package.json` analisado:

| Comando | Ação declarada |
|---|---|
| `npm run cy:open` | Abre a interface do Cypress. |
| `npm run cy:run` | Executa o Cypress em modo de linha de comando. |
| `npm run cy:chrome` | Executa o Cypress usando o navegador Chrome. |
| `npm test` | Executa `cypress run`. |
| `npm run flow` | Inicia `cypress/flows/complete/complete.flow.js` com Node.js. |
| `npm run flow:register` | Executa somente a spec de cadastro. |
| `npm run flow:login` | Executa somente a spec de login. |
| `npm run flow:accounts` | Executa somente a spec de contas. |
| `npm run flow:transfer` | Executa somente a spec de transferências. |

Apesar do prefixo `flow:` nos quatro últimos scripts, o comando declarado para cada um é uma execução direta do Cypress com `--spec`; eles não iniciam, por si só, o motor de fluxo completo.

## Arquivos e diretórios fora do escopo detalhado

- **`.git/`**: metadados internos do controle de versão. Não faz parte da arquitetura funcional da automação.
- **`node_modules/`**: dependências instaladas pelo npm. É conteúdo gerado a partir do manifesto e do lockfile, não código-fonte do projeto.
- **Artefatos de execução**: relatórios, screenshots, vídeos e evidências podem ser recriados ou substituídos conforme a configuração e os testes executados.

## Manutenção deste documento

Atualize este arquivo sempre que houver alteração estrutural, incluindo:

1. Criação, remoção ou renomeação de specs, Page Objects, fixtures ou módulos de fluxo.
2. Mudança de responsabilidade entre diretórios.
3. Inclusão ou remoção de scripts no `package.json`.
4. Alteração dos caminhos usados para relatórios, screenshots, vídeos ou evidências.
5. Mudança no processo de inicialização ou configuração do Cypress.

Quando uma mudança afetar o comportamento de um componente, atualize também o documento específico da área. Este arquivo deve permanecer como inventário estrutural, não como substituto da documentação detalhada de arquitetura, testes ou operação.
