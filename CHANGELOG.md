# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

O projeto segue os princípios do [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e utiliza Versionamento Semântico (SemVer).

## Formato de versão

`MAJOR.MINOR.PATCH`

- **MAJOR** — alterações incompatíveis ou grandes mudanças estruturais.
- **MINOR** — novas funcionalidades ou etapas relevantes do projeto.
- **PATCH** — correções e pequenos ajustes.

---

# [0.1.0] - 2026-07-21

## Sprint 0 — Fundação do Projeto

### Adicionado

#### Estrutura do projeto

- Criação do repositório do projeto.
- Estrutura inicial do Cypress.
- Organização inicial das pastas de documentação.
- Configuração inicial do `cypress.config.js`.
- Inclusão do `package.json` e `package-lock.json`.
- Estrutura inicial do suporte do Cypress.

#### Documentação de planejamento

- Criação do Backlog.
- Criação do Plano de Desenvolvimento.
- Definição das Sprints.
- Definição do fluxo de evolução do projeto.

#### Documentação de testes

- Criação do Plano de Testes.
- Criação dos Cenários de Teste.
- Criação dos Casos de Teste.
- Definição dos Critérios de Aceite.
- Definição da Massa de Teste.

#### Documentação de arquitetura

- Definição inicial do Page Object Model (POM).
- Definição das responsabilidades dos Page Objects.
- Definição da estratégia de Fixtures.
- Definição das regras para Custom Commands.
- Definição dos Hooks.
- Definição das convenções de nomenclatura e seletores.

#### Mapeamento da aplicação

- Mapeamento inicial da página inicial.
- Mapeamento inicial do fluxo de cadastro.

#### Gestão de defeitos

- Criação do modelo de Bug Report.
- Criação da estrutura para registro de defeitos.

#### Documentação do projeto

- Criação do README.
- Criação do CHANGELOG.
- Organização dos artefatos de documentação.

---

## Situação da Sprint 0

A Sprint 0 estabeleceu a base documental e estrutural do projeto.

A implementação da suíte de testes funcionais ainda não foi iniciada.

As seguintes etapas permanecem planejadas para as próximas Sprints:

- Implementação dos Page Objects.
- Implementação das Fixtures de cada funcionalidade.
- Automação dos casos de teste.
- Geração de dados dinâmicos.
- Registro de evidências.
- Execução da suíte de regressão.
- Integração contínua.

---

# [0.2.0] - Sprint 1 — Cadastro de Usuário

**Status:** Planejado

### Planejado

- Implementação do fluxo de cadastro.
- Criação do `RegisterPage`.
- Criação da fixture de cadastro.
- Automação do cadastro com dados válidos.
- Validação dos campos obrigatórios.
- Validação de usuário já existente.
- Validação de senhas diferentes.
- Validação das mensagens apresentadas pela aplicação.
- Geração de dados dinâmicos para cadastro.
- Registro das evidências.
- Atualização da documentação.

---

# [0.3.0] - Sprint 2 — Login

**Status:** Planejado

### Planejado

- Implementação do fluxo de login.
- Criação do `LoginPage`.
- Login com credenciais válidas.
- Login com credenciais inválidas.
- Validação dos campos obrigatórios.
- Implementação do logout.
- Atualização das Fixtures.
- Registro das evidências.

---

# [0.4.0] - Sprint 3 — Contas

**Status:** Planejado

### Planejado

- Consulta das contas.
- Consulta dos detalhes da conta.
- Consulta do histórico de transações.
- Consulta dos detalhes de uma transação.
- Criação do `AccountsPage`.
- Registro das evidências.

---

# [0.5.0] - Sprint 4 — Transferências

**Status:** Planejado

### Planejado

- Transferência válida.
- Transferência entre contas.
- Transferência com valores inválidos.
- Validação de campos obrigatórios.
- Validação das mensagens apresentadas pela aplicação.
- Criação do `TransferPage`.
- Registro das evidências.

---

# [0.6.0] - Sprint 5 — Pagamento de Contas

**Status:** Planejado

### Planejado

- Pagamento válido.
- Validação de campos obrigatórios.
- Validação de valores inválidos.
- Validação de dados divergentes.
- Criação do `BillPayPage`.
- Registro das evidências.

---

# [0.7.0] - Sprint 6 — Solicitação de Empréstimo

**Status:** Planejado

### Planejado

- Solicitação válida.
- Solicitação inválida.
- Validação das regras de negócio.
- Validação das mensagens.
- Criação do `LoanPage`.
- Registro das evidências.

---

# [0.8.0] - Sprint 7 — Atualização de Perfil

**Status:** Planejado

### Planejado

- Atualização dos dados do usuário.
- Validação dos campos.
- Validação da persistência das informações.
- Criação do `ProfilePage`.
- Registro das evidências.

---

# [0.9.0] - Sprint 8 — Regressão e Refatoração

**Status:** Planejado

### Planejado

- Execução da suíte completa.
- Identificação de falhas de regressão.
- Correção dos testes instáveis.
- Refatoração dos Page Objects.
- Refatoração das Fixtures.
- Revisão dos comandos customizados.
- Otimização da suíte.
- Revisão da documentação.

---

# [1.0.0] - Sprint 9 — Release Final

**Status:** Planejado

### Integração Contínua

- Implementação do pipeline no GitHub Actions.
- Execução automática da suíte.
- Execução em navegador configurado no pipeline.

### Evidências

- Captura de screenshots.
- Gravação de vídeos.
- Publicação dos artefatos de execução.

### Documentação

- Revisão final da documentação.
- Atualização do README.
- Atualização do CHANGELOG.
- Consolidação dos defeitos encontrados.
- Documentação dos resultados finais.

### Projeto

- Revisão geral da suíte.
- Validação da estabilidade.
- Publicação da Release `1.0.0`.
- Conclusão do projeto.

---

# Convenção de Versionamento

| Tipo | Exemplo | Utilização |
|---|---|---|
| MAJOR | `2.0.0` | Alterações incompatíveis ou grandes mudanças estruturais |
| MINOR | `1.1.0` | Nova funcionalidade ou etapa relevante |
| PATCH | `1.0.1` | Correção ou pequeno ajuste |

---

# Histórico de Versões

| Versão | Sprint | Status | Descrição |
|---|---|---|---|
| `0.1.0` | Sprint 0 | ✅ Concluída | Fundação, estrutura e documentação |
| `0.2.0` | Sprint 1 | ⏳ Planejada | Cadastro de usuário |
| `0.3.0` | Sprint 2 | ⏳ Planejada | Login e logout |
| `0.4.0` | Sprint 3 | ⏳ Planejada | Contas |
| `0.5.0` | Sprint 4 | ⏳ Planejada | Transferências |
| `0.6.0` | Sprint 5 | ⏳ Planejada | Pagamento de contas |
| `0.7.0` | Sprint 6 | ⏳ Planejada | Solicitação de empréstimo |
| `0.8.0` | Sprint 7 | ⏳ Planejada | Atualização de perfil |
| `0.9.0` | Sprint 8 | ⏳ Planejada | Regressão e refatoração |
| `1.0.0` | Sprint 9 | ⏳ Planejada | Release final |