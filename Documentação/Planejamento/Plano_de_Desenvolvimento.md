# Plano de Desenvolvimento

# Projeto

**Automação de Testes Web com Cypress**

---

# Visão Geral

Este projeto tem como objetivo desenvolver uma suíte de testes automatizados End-to-End (E2E) para a aplicação **ParaBank**, utilizando o framework **Cypress**.

A automação seguirá boas práticas de desenvolvimento, visando criar um projeto escalável, reutilizável e de fácil manutenção, simulando a estrutura utilizada em projetos reais de QA.

---

# Objetivos

## Objetivo Geral

Automatizar os principais fluxos de negócio da aplicação, garantindo maior confiabilidade durante alterações e prevenindo regressões.

## Objetivos Específicos

- Automatizar cenários críticos da aplicação.
- Validar regras de negócio.
- Garantir cobertura dos principais fluxos do sistema.
- Reduzir esforço manual em testes repetitivos.
- Gerar evidências automáticas.
- Integrar os testes ao GitHub Actions.

---

# Escopo

Serão automatizadas as seguintes funcionalidades:

- Cadastro de usuário
- Login
- Logout
- Visualização de contas
- Histórico de transações
- Transferência entre contas
- Pagamento de contas
- Solicitação de empréstimos
- Atualização de perfil
- Fluxos de regressão

---

# Fora do Escopo

Não fazem parte deste projeto:

- Testes de Performance
- Testes de Segurança
- Testes Mobile
- Testes de Acessibilidade
- Testes de Carga
- Testes de APIs (projeto separado)

---

# Arquitetura do Projeto

O projeto seguirá o padrão **Page Object Model (POM)**, separando a lógica dos testes da interação com a interface.

Estrutura prevista:

```text
cypress/

e2e/
pages/
fixtures/
support/
screenshots/
videos/

.github/
workflows/

Documentation/
```

---

# Estratégia de Desenvolvimento

O desenvolvimento ocorrerá de forma incremental, organizado em sprints.

Cada sprint contemplará:

- Planejamento
- Desenvolvimento
- Execução dos testes
- Correções
- Documentação
- Revisão

---

# Sprints

## Sprint 1

Cadastro de Usuário

Objetivos

- Automatizar cadastro.
- Validar campos obrigatórios.
- Validar mensagens de erro.

---

## Sprint 2

Login

Objetivos

- Login válido
- Login inválido
- Logout
- Campos obrigatórios

---

## Sprint 3

Contas

Objetivos

- Visualizar contas
- Visualizar saldo
- Histórico de transações

---

## Sprint 4

Transferências

Objetivos

- Transferência válida
- Transferência inválida
- Validação de mensagens

---

## Sprint 5

Pagamento de Contas

Objetivos

- Pagamento válido
- Campos obrigatórios
- Validação de erros

---

## Sprint 6

Solicitação de Empréstimos

Objetivos

- Solicitação válida
- Solicitação inválida

---

## Sprint 7

Atualização de Perfil

Objetivos

- Alteração de informações
- Validação dos campos

---

## Sprint 8

Regressão

Objetivos

- Execução completa da suíte
- Correção de falhas
- Refatoração

---

## Sprint 9

CI/CD

Objetivos

- GitHub Actions
- Relatórios
- Evidências
- Execução automática

---

# Estratégia de Automação

Cada funcionalidade será composta por:

- Cenários Positivos
- Cenários Negativos
- Validação de mensagens
- Validação de regras de negócio
- Validação de campos obrigatórios

Os testes serão independentes entre si, permitindo execução individual ou em conjunto.

---

# Organização do Código

O projeto seguirá os princípios de:

- Reutilização de código
- Baixo acoplamento
- Alta coesão
- Legibilidade
- Facilidade de manutenção

Serão utilizados:

- Page Objects
- Custom Commands
- Fixtures
- Hooks
- Utilitários

---

# Controle de Versão

O desenvolvimento será versionado utilizando Git.

Cada funcionalidade será desenvolvida em sua própria branch e posteriormente integrada à branch principal após validação.

Exemplo:

- feature/register
- feature/login
- feature/accounts
- feature/transfer
- feature/billpay
- feature/loan
- feature/profile

---

# Integração Contínua

Será utilizado o GitHub Actions para:

- Instalação das dependências
- Execução automática dos testes
- Geração de relatórios
- Armazenamento das evidências

---

# Critérios de Qualidade

Antes da conclusão de cada sprint será verificado:

- Todos os testes executando com sucesso.
- Ausência de falhas críticas.
- Código revisado.
- Page Objects atualizados.
- Documentação atualizada.
- Evidências geradas corretamente.

---

# Ferramentas

- Cypress
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions
- Visual Studio Code

---

# Aplicação Utilizada

**Sistema:** ParaBank

https://parabank.parasoft.com/parabank/index.htm

---

# Resultado Esperado

Ao final do projeto será entregue uma suíte de testes automatizados capaz de validar os principais fluxos da aplicação, organizada segundo boas práticas de automação de testes, integrada ao GitHub Actions e acompanhada de documentação técnica completa, evidências de execução e registro dos defeitos identificados.