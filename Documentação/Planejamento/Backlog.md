# Backlog do Projeto

## Projeto

**Automação de Testes Web com Cypress**

Automação de testes end-to-end da aplicação **ParaBank**, utilizando Cypress, JavaScript e GitHub Actions, seguindo a arquitetura **Page Object Model (POM)** e boas práticas de automação de testes.

---

# Objetivo

Desenvolver uma suíte de testes automatizados capaz de validar os principais fluxos de negócio da aplicação, garantindo maior confiabilidade durante alterações e futuras regressões.

---

# Product Backlog

| ID | História | Prioridade | Sprint | Status |
|----|----------|------------|--------|--------|
| US001 | Como visitante, desejo criar uma nova conta para acessar o sistema. | Alta | Sprint 1 | ⬜ Não iniciado |
| US002 | Como usuário, desejo realizar login com credenciais válidas. | Alta | Sprint 2 | ⬜ Não iniciado |
| US003 | Como usuário, desejo impedir login com credenciais inválidas. | Alta | Sprint 2 | ⬜ Não iniciado |
| US004 | Como usuário, desejo realizar logout do sistema. | Média | Sprint 2 | ⬜ Não iniciado |
| US005 | Como usuário, desejo visualizar minhas contas bancárias. | Alta | Sprint 3 | ⬜ Não iniciado |
| US006 | Como usuário, desejo visualizar detalhes da conta. | Média | Sprint 3 | ⬜ Não iniciado |
| US007 | Como usuário, desejo consultar o histórico de transações. | Média | Sprint 3 | ⬜ Não iniciado |
| US008 | Como usuário, desejo transferir dinheiro entre minhas contas. | Alta | Sprint 4 | ⬜ Não iniciado |
| US009 | Como usuário, desejo validar mensagens para transferências inválidas. | Alta | Sprint 4 | ⬜ Não iniciado |
| US010 | Como usuário, desejo pagar boletos utilizando minha conta. | Alta | Sprint 5 | ⬜ Não iniciado |
| US011 | Como usuário, desejo validar erros no pagamento de boletos. | Média | Sprint 5 | ⬜ Não iniciado |
| US012 | Como usuário, desejo solicitar um empréstimo. | Alta | Sprint 6 | ⬜ Não iniciado |
| US013 | Como usuário, desejo validar solicitações inválidas de empréstimo. | Média | Sprint 6 | ⬜ Não iniciado |
| US014 | Como usuário, desejo atualizar minhas informações pessoais. | Média | Sprint 7 | ⬜ Não iniciado |
| US015 | Como usuário, desejo validar campos obrigatórios da atualização cadastral. | Média | Sprint 7 | ⬜ Não iniciado |
| US016 | Executar regressão completa da aplicação. | Alta | Sprint 8 | ⬜ Não iniciado |
| US017 | Configurar execução automática no GitHub Actions. | Alta | Sprint 9 | ⬜ Não iniciado |
| US018 | Gerar relatórios automáticos de execução. | Média | Sprint 9 | ⬜ Não iniciado |
| US019 | Registrar evidências (Screenshots e Vídeos) em falhas. | Média | Sprint 9 | ⬜ Não iniciado |

---

# Backlog Técnico

## Estrutura Inicial

- Criar projeto Cypress
- Configurar ESLint
- Configurar Prettier
- Configurar Git
- Configurar GitHub
- Criar README
- Organizar estrutura do projeto

---

## Arquitetura

- Implementar Page Object Model
- Criar Commands personalizados
- Configurar Fixtures
- Configurar Hooks
- Criar classes utilitárias
- Organizar suporte aos testes

---

## Qualidade

- Padronizar nomenclatura
- Remover duplicação de código
- Melhorar reutilização dos componentes
- Documentar projeto
- Registrar bugs encontrados

---

## CI/CD

- Configurar GitHub Actions
- Execução Headless
- Upload de relatórios
- Upload de Screenshots
- Upload de Vídeos

---

# Definição de Pronto (Definition of Done)

Uma funcionalidade será considerada concluída quando:

- Os cenários automatizados forem implementados.
- Todos os testes forem aprovados.
- O código seguir o padrão definido pelo projeto.
- Não houver duplicação desnecessária.
- O Page Object estiver atualizado.
- As evidências forem geradas corretamente.
- A documentação estiver atualizada.
- O código estiver versionado no GitHub.

---

# Roadmap

## Sprint 1
- Cadastro de usuário

## Sprint 2
- Login e Logout

## Sprint 3
- Contas

## Sprint 4
- Transferências

## Sprint 5
- Pagamento de Contas

## Sprint 6
- Solicitação de Empréstimos

## Sprint 7
- Atualização de Perfil

## Sprint 8
- Testes de Regressão

## Sprint 9
- CI/CD, Relatórios e Evidências

---

# Tecnologias

- Cypress
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions

---

# Aplicação

**Sistema:** ParaBank

https://parabank.parasoft.com/parabank/index.htm