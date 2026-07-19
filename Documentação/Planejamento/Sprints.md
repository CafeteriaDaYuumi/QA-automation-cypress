# Sprints do Projeto

## Projeto

**Automação de Testes Web com Cypress**

Aplicação: **ParaBank**

---

# Objetivo

Organizar o desenvolvimento da automação em entregas incrementais, permitindo evolução contínua do projeto e validação das funcionalidades ao longo do desenvolvimento.

---

# Sprint 0 — Preparação do Ambiente

## Objetivo

Preparar toda a infraestrutura necessária para o desenvolvimento.

### Atividades

- Criar repositório GitHub
- Configurar projeto Cypress
- Instalar dependências
- Configurar estrutura de pastas
- Configurar ESLint
- Configurar Prettier
- Configurar Git
- Criar README
- Criar documentação inicial
- Configurar GitHub Actions (estrutura inicial)

### Entregáveis

- Projeto funcional
- Estrutura organizada
- Repositório configurado

---

# Sprint 1 — Cadastro de Usuário

## Objetivo

Automatizar o fluxo completo de cadastro.

### Funcionalidades

- Cadastro válido
- Campos obrigatórios
- Usuário existente
- Validação das mensagens

### Page Objects

- HomePage
- RegisterPage

### Casos previstos

- REGISTER001
- REGISTER002
- REGISTER003
- REGISTER004
- REGISTER005

### Entregáveis

- Cadastro automatizado
- Evidências
- Documentação

---

# Sprint 2 — Login

## Objetivo

Automatizar autenticação dos usuários.

### Funcionalidades

- Login válido
- Login inválido
- Campos vazios
- Logout

### Page Objects

- LoginPage
- HomePage

### Casos previstos

- LOGIN001
- LOGIN002
- LOGIN003
- LOGIN004
- LOGIN005

### Entregáveis

- Login automatizado
- Logout automatizado

---

# Sprint 3 — Contas

## Objetivo

Validar as funcionalidades relacionadas às contas bancárias.

### Funcionalidades

- Listagem de contas
- Visualização do saldo
- Histórico de transações

### Page Objects

- AccountsPage

### Casos previstos

- ACCOUNT001
- ACCOUNT002
- ACCOUNT003

### Entregáveis

- Navegação entre contas
- Validação das informações

---

# Sprint 4 — Transferências

## Objetivo

Automatizar transferências entre contas.

### Funcionalidades

- Transferência válida
- Valor inválido
- Conta inválida
- Mensagens de erro

### Page Objects

- TransferPage

### Casos previstos

- TRANSFER001
- TRANSFER002
- TRANSFER003
- TRANSFER004

### Entregáveis

- Fluxo completo automatizado

---

# Sprint 5 — Pagamento de Contas

## Objetivo

Automatizar o pagamento de boletos.

### Funcionalidades

- Pagamento válido
- Campos obrigatórios
- Valores inválidos
- Mensagens de confirmação

### Page Objects

- BillPayPage

### Casos previstos

- BILLPAY001
- BILLPAY002
- BILLPAY003
- BILLPAY004

### Entregáveis

- Fluxo automatizado

---

# Sprint 6 — Solicitação de Empréstimos

## Objetivo

Automatizar solicitações de empréstimo.

### Funcionalidades

- Solicitação válida
- Solicitação inválida
- Regras de negócio

### Page Objects

- LoanPage

### Casos previstos

- LOAN001
- LOAN002
- LOAN003

### Entregáveis

- Fluxo automatizado

---

# Sprint 7 — Atualização de Perfil

## Objetivo

Automatizar a atualização dos dados cadastrais.

### Funcionalidades

- Alteração de endereço
- Alteração de telefone
- Atualização de senha
- Validação dos campos

### Page Objects

- ProfilePage

### Casos previstos

- PROFILE001
- PROFILE002
- PROFILE003

### Entregáveis

- Perfil automatizado

---

# Sprint 8 — Regressão

## Objetivo

Executar toda a suíte de testes.

### Atividades

- Execução completa
- Correção de falhas
- Refatoração
- Otimização

### Entregáveis

- Suíte estável
- Código revisado

---

# Sprint 9 — CI/CD

## Objetivo

Automatizar a execução dos testes.

### Atividades

- Configuração do GitHub Actions
- Execução Headless
- Geração de relatórios
- Upload de screenshots
- Upload de vídeos

### Entregáveis

- Pipeline funcional
- Relatórios automáticos

---

# Critérios para Encerramento de uma Sprint

Cada sprint será considerada concluída quando:

- Todos os cenários previstos estiverem automatizados.
- Os testes executarem com sucesso.
- Os Page Objects estiverem atualizados.
- O código estiver revisado.
- A documentação estiver atualizada.
- As evidências forem geradas corretamente.
- O código estiver publicado no GitHub.

---

# Cronograma de Evolução

| Sprint | Funcionalidade | Status |
|---------|----------------|--------|
| 0 | Preparação do Ambiente | ⬜ Não iniciado |
| 1 | Cadastro | ⬜ Não iniciado |
| 2 | Login | ⬜ Não iniciado |
| 3 | Contas | ⬜ Não iniciado |
| 4 | Transferências | ⬜ Não iniciado |
| 5 | Pagamento de Contas | ⬜ Não iniciado |
| 6 | Empréstimos | ⬜ Não iniciado |
| 7 | Atualização de Perfil | ⬜ Não iniciado |
| 8 | Regressão | ⬜ Não iniciado |
| 9 | CI/CD | ⬜ Não iniciado |