# Plano de Testes

## Projeto

**Automação de Testes Web com Cypress**

**Aplicação:** ParaBank
**Ferramenta principal:** Cypress
**Linguagem:** JavaScript
**Tipo de aplicação:** Web
**Tipo de automação:** End-to-End — E2E

---

# 1. Introdução

Este documento apresenta o plano de testes do projeto de automação da aplicação ParaBank.

O plano define os objetivos, o escopo, a estratégia, os tipos de teste, os critérios de entrada e saída, os riscos, os ambientes, as ferramentas e os artefatos utilizados durante a execução do projeto.

A automação será desenvolvida utilizando Cypress e JavaScript, com execução local e integração contínua por meio do GitHub Actions.

---

# 2. Objetivo

## 2.1 Objetivo geral

Validar os principais fluxos funcionais da aplicação ParaBank por meio de testes automatizados End-to-End, garantindo que as funcionalidades críticas permaneçam operacionais e que alterações futuras não gerem regressões.

## 2.2 Objetivos específicos

* Automatizar os fluxos críticos da aplicação.
* Validar cenários positivos e negativos.
* Verificar campos obrigatórios e mensagens apresentadas pelo sistema.
* Validar regras de negócio.
* Identificar comportamentos inesperados.
* Registrar evidências de execução.
* Documentar defeitos encontrados.
* Criar uma suíte de regressão reutilizável.
* Integrar os testes ao GitHub Actions.
* Melhorar a confiabilidade e a manutenção dos testes.

---

# 3. Escopo dos Testes

## 3.1 Funcionalidades incluídas

Serão contempladas as seguintes funcionalidades:

* Cadastro de usuário.
* Login.
* Logout.
* Visualização das contas.
* Consulta dos detalhes de uma conta.
* Consulta do histórico de transações.
* Consulta dos detalhes de uma transação.
* Transferência entre contas.
* Pagamento de contas.
* Solicitação de empréstimo.
* Atualização de perfil.
* Navegação entre funcionalidades autenticadas.
* Controle de acesso a páginas restritas.
* Execução de regressão dos fluxos críticos.

## 3.2 Funcionalidades fora do escopo

Não fazem parte do escopo inicial:

* Testes de performance.
* Testes de carga.
* Testes de estresse.
* Testes de segurança aprofundados.
* Testes de invasão.
* Testes de acessibilidade.
* Testes em dispositivos móveis reais.
* Testes de compatibilidade com grande quantidade de navegadores.
* Validação direta do banco de dados.
* Automação de APIs.
* Validação de infraestrutura do ambiente.
* Testes de recuperação de desastres.

Esses itens poderão ser adicionados futuramente como extensão do projeto.

---

# 4. Estratégia de Testes

A estratégia será baseada em testes funcionais automatizados End-to-End, executados sobre a interface web da aplicação.

Cada fluxo será analisado considerando:

* Caminho principal.
* Caminhos alternativos.
* Cenários positivos.
* Cenários negativos.
* Campos obrigatórios.
* Dados inválidos.
* Dados de limite.
* Mensagens de sucesso.
* Mensagens de erro.
* Persistência de informações.
* Regras de negócio.
* Controle de sessão.
* Regressão.

Os testes serão desenvolvidos de forma incremental, seguindo as sprints definidas no projeto.

---

# 5. Tipos de Teste

## 5.1 Testes funcionais

Validarão se as funcionalidades executam corretamente as ações esperadas.

Exemplos:

* Realizar cadastro.
* Realizar login.
* Transferir valores.
* Efetuar pagamento.
* Solicitar empréstimo.

## 5.2 Testes positivos

Validarão o comportamento da aplicação com entradas válidas.

Exemplos:

* Cadastro com todos os dados corretos.
* Login com usuário e senha válidos.
* Pagamento com informações válidas.

## 5.3 Testes negativos

Validarão o comportamento diante de dados incorretos ou incompletos.

Exemplos:

* Login com senha inválida.
* Cadastro com senhas divergentes.
* Pagamento sem preenchimento dos campos obrigatórios.

## 5.4 Testes de validação de campos

Validarão:

* Campos obrigatórios.
* Formatos aceitos.
* Valores vazios.
* Valores negativos.
* Valores iguais a zero.
* Letras em campos numéricos.
* Caracteres especiais.
* Limites de tamanho.

## 5.5 Testes de regras de negócio

Validarão comportamentos específicos da aplicação.

Exemplos:

* Impedir cadastro com usuário duplicado.
* Impedir pagamento com contas divergentes.
* Validar solicitação de empréstimo.
* Impedir operações inválidas entre contas.

## 5.6 Testes de navegação

Validarão:

* Acesso às páginas do sistema.
* Funcionamento dos links.
* Redirecionamentos.
* Retorno à visão geral das contas.
* Navegação pelo menu autenticado.

## 5.7 Testes de sessão

Validarão:

* Autenticação.
* Logout.
* Bloqueio de acesso sem login.
* Encerramento da sessão.
* Acesso a páginas restritas.

## 5.8 Testes de persistência

Validarão se dados atualizados permanecem salvos após:

* Recarregar a página.
* Sair da funcionalidade.
* Acessar novamente a tela.
* Encerrar e iniciar nova navegação.

## 5.9 Testes de regressão

Validarão os principais fluxos após alterações no projeto ou na aplicação.

A regressão deverá incluir, no mínimo:

* Cadastro.
* Login.
* Consulta de contas.
* Transferência.
* Pagamento.
* Empréstimo.
* Atualização de perfil.
* Logout.

---

# 6. Abordagem de Automação

O projeto utilizará Cypress como ferramenta principal de automação.

A abordagem será baseada em:

* Page Object Model.
* Custom Commands.
* Fixtures.
* Hooks.
* Dados dinâmicos.
* Testes independentes.
* Seletores estáveis.
* Reutilização de código.
* Evidências automáticas.
* Execução em modo headless.
* Integração contínua.

---

# 7. Arquitetura Prevista

```text
cypress/
├── e2e/
│   ├── register/
│   ├── login/
│   ├── accounts/
│   ├── transfer/
│   ├── bill-pay/
│   ├── loan/
│   ├── profile/
│   └── regression/
│
├── fixtures/
│   ├── registration.json
│   ├── login.json
│   ├── transfer.json
│   ├── billPay.json
│   ├── loan.json
│   └── profile.json
│
├── pages/
│   ├── HomePage.js
│   ├── RegisterPage.js
│   ├── LoginPage.js
│   ├── AccountsPage.js
│   ├── TransferPage.js
│   ├── BillPayPage.js
│   ├── LoanPage.js
│   └── ProfilePage.js
│
├── support/
│   ├── commands.js
│   └── e2e.js
│
├── screenshots/
└── videos/

.github/
└── workflows/
    └── cypress.yml

Documentation/
├── Planejamento/
├── Testes/
└── Defeitos/
```

---

# 8. Ambiente de Teste

## 8.1 Aplicação

**Sistema:** ParaBank
**URL:** https://parabank.parasoft.com/parabank/index.htm

## 8.2 Ambiente local

A execução local deverá possuir:

* Node.js instalado.
* npm instalado.
* Cypress instalado.
* Navegador compatível.
* Conexão com a internet.
* Acesso disponível ao ParaBank.

## 8.3 Navegadores

A execução inicial será priorizada em:

* Electron.
* Google Chrome.

Outros navegadores poderão ser incluídos futuramente.

## 8.4 Ambiente de integração contínua

A execução automatizada será realizada no GitHub Actions.

O pipeline deverá:

* Baixar o código do repositório.
* Instalar as dependências.
* Executar o Cypress em modo headless.
* Apresentar o resultado da execução.
* Armazenar screenshots e vídeos quando configurados.
* Disponibilizar relatórios e evidências.

---

# 9. Ferramentas

| Ferramenta         | Finalidade                    |
| ------------------ | ----------------------------- |
| Cypress            | Automação dos testes web      |
| JavaScript         | Desenvolvimento dos testes    |
| Node.js            | Ambiente de execução          |
| npm                | Gerenciamento de dependências |
| Git                | Controle de versão            |
| GitHub             | Hospedagem do repositório     |
| GitHub Actions     | Integração contínua           |
| Visual Studio Code | Desenvolvimento               |
| Markdown           | Documentação                  |
| Chrome             | Execução dos testes           |
| Electron           | Execução padrão do Cypress    |

---

# 10. Massa de Teste

A massa de teste será composta apenas por dados fictícios.

Serão utilizados:

* Usuários válidos.
* Usuários inexistentes.
* Usuários duplicados.
* Credenciais inválidas.
* Valores positivos.
* Valores negativos.
* Valores iguais a zero.
* Campos vazios.
* Dados não numéricos.
* Caracteres especiais.
* Dados de limite.
* Contas obtidas dinamicamente.

Os nomes de usuário utilizados no cadastro deverão ser gerados dinamicamente.

Exemplo:

```javascript
const username = `qa_cypress_${Date.now()}`
```

Os dados reutilizáveis deverão ser armazenados em arquivos dentro de `cypress/fixtures`.

---

# 11. Critérios de Entrada

A execução dos testes poderá ser iniciada quando:

* A aplicação estiver disponível.
* O ambiente local estiver configurado.
* As dependências estiverem instaladas.
* O Cypress estiver funcionando.
* A URL base estiver configurada.
* A documentação inicial estiver criada.
* Os casos de teste estiverem definidos.
* A massa de teste estiver disponível.
* As funcionalidades necessárias ao cenário estiverem acessíveis.
* Os Page Objects necessários estiverem implementados.

---

# 12. Critérios de Saída

Uma funcionalidade poderá ser considerada concluída quando:

* Os cenários planejados estiverem implementados.
* Os testes positivos forem aprovados.
* Os cenários negativos estiverem executados.
* As principais regras de negócio estiverem validadas.
* Não existirem falhas críticas abertas sem análise.
* Os defeitos encontrados estiverem documentados.
* O código estiver revisado.
* A documentação estiver atualizada.
* As evidências estiverem disponíveis.
* O código estiver publicado no GitHub.
* A suíte relacionada estiver estável.

O projeto poderá ser considerado concluído quando:

* Todas as sprints previstas forem encerradas.
* Os fluxos críticos estiverem automatizados.
* A regressão estiver funcional.
* O pipeline estiver executando.
* Os relatórios estiverem disponíveis.
* O README estiver atualizado.
* As evidências principais estiverem publicadas.

---

# 13. Critérios de Suspensão

Os testes poderão ser suspensos quando:

* A aplicação estiver indisponível.
* O ambiente estiver instável.
* O cadastro estiver impossibilitado.
* O login não estiver funcionando.
* Houver bloqueio de acesso.
* Uma dependência crítica apresentar falha.
* A interface sofrer alteração ampla durante a execução.
* A massa de teste necessária não puder ser criada.
* O ambiente apresentar lentidão excessiva.
* A execução gerar resultados inconsistentes de forma contínua.

---

# 14. Critérios de Retomada

Os testes poderão ser retomados quando:

* A aplicação voltar a ficar disponível.
* O ambiente estiver estável.
* O bloqueio crítico for corrigido.
* A massa de teste puder ser recriada.
* A automação for ajustada às alterações identificadas.
* A funcionalidade necessária voltar a operar.
* As causas da suspensão forem documentadas e analisadas.

---

# 15. Priorização dos Testes

## Prioridade alta

* Cadastro válido.
* Login válido.
* Login inválido.
* Logout.
* Visualização de contas.
* Transferência válida.
* Pagamento válido.
* Empréstimo.
* Campos obrigatórios.
* Regressão dos fluxos críticos.

## Prioridade média

* Histórico de transações.
* Atualização de perfil.
* Persistência dos dados.
* Valores inválidos.
* Navegação autenticada.
* Detalhes de transações.

## Prioridade baixa

* Validações complementares de interface.
* Dados de limite não críticos.
* Cenários alternativos com baixo impacto.
* Verificações visuais complementares.

---

# 16. Severidade dos Defeitos

## Crítica

Falha que impede o uso da aplicação ou bloqueia um fluxo essencial.

Exemplos:

* Aplicação indisponível.
* Login impossível para todos os usuários.
* Transferências alterando saldos incorretamente.
* Acesso indevido a contas de outros usuários.

## Alta

Falha grave em funcionalidade importante, sem alternativa aceitável.

Exemplos:

* Cadastro válido não funciona.
* Pagamento não pode ser concluído.
* Logout não encerra a sessão.
* Operação inválida é processada.

## Média

Falha que afeta parcialmente uma funcionalidade, mas possui alternativa ou não bloqueia o fluxo principal.

Exemplos:

* Mensagem incorreta.
* Campo com validação incompleta.
* Dados atualizados apenas após recarregar.

## Baixa

Falha de baixo impacto funcional.

Exemplos:

* Texto desalinhado.
* Mensagem com erro de escrita.
* Pequena inconsistência visual.
* Elemento sem impacto no fluxo.

---

# 17. Prioridade dos Defeitos

## Alta

Defeito que deverá ser analisado antes da continuidade da funcionalidade ou da conclusão da sprint.

## Média

Defeito importante, mas que não impede a continuação completa do projeto.

## Baixa

Defeito que poderá ser corrigido em momento posterior, sem impedir a entrega principal.

---

# 18. Gerenciamento de Defeitos

Cada defeito deverá conter:

* Identificador.
* Título.
* Descrição.
* Ambiente.
* Pré-condições.
* Passos para reprodução.
* Resultado esperado.
* Resultado obtido.
* Severidade.
* Prioridade.
* Status.
* Evidências.
* Data de identificação.
* Funcionalidade relacionada.

Os defeitos deverão ser registrados no documento de defeitos ou nas Issues do GitHub.

---

# 19. Evidências

As evidências poderão incluir:

* Screenshots.
* Vídeos.
* Logs de execução.
* Resultado do Cypress.
* Relatórios.
* Histórico do GitHub Actions.
* Imagens comparando resultado esperado e obtido.
* Dados utilizados durante a execução.

As evidências deverão ser geradas principalmente em caso de falha.

---

# 20. Relatórios

O projeto poderá utilizar relatórios nativos ou ferramentas adicionais, como:

* Mochawesome.
* Allure Report.
* Relatórios do GitHub Actions.
* Logs do Cypress.

O relatório deverá apresentar, quando possível:

* Total de testes executados.
* Testes aprovados.
* Testes reprovados.
* Testes ignorados.
* Tempo de execução.
* Cenários com falha.
* Evidências associadas.

---

# 21. Riscos

## Risco 1 — Instabilidade do ambiente

**Descrição:** O ParaBank pode apresentar indisponibilidade ou lentidão.

**Impacto:** Falhas falsas ou bloqueio das execuções.

**Mitigação:**

* Confirmar disponibilidade antes de registrar defeito.
* Reexecutar o cenário.
* Registrar o horário da falha.
* Diferenciar falha do ambiente de falha funcional.

---

## Risco 2 — Dados persistentes no ambiente

**Descrição:** Usuários criados podem permanecer cadastrados.

**Impacto:** Conflitos de nomes de usuário.

**Mitigação:**

* Gerar usuários dinamicamente.
* Utilizar timestamp.
* Não depender de usuários fixos para cadastro.

---

## Risco 3 — Alterações na interface

**Descrição:** Mudanças no HTML ou nos seletores podem quebrar os testes.

**Impacto:** Falhas de automação sem defeito funcional.

**Mitigação:**

* Centralizar seletores nos Page Objects.
* Priorizar seletores estáveis.
* Evitar seletores excessivamente frágeis.
* Revisar o DOM antes de registrar defeito.

---

## Risco 4 — Dependência entre cenários

**Descrição:** Um teste pode depender de dados criados por outro.

**Impacto:** Falhas em cascata.

**Mitigação:**

* Criar testes independentes.
* Preparar dados dentro do próprio cenário.
* Documentar dependências inevitáveis.
* Utilizar hooks apenas quando necessário.

---

## Risco 5 — Falhas de rede

**Descrição:** Oscilações de internet podem causar timeout.

**Impacto:** Resultados inconsistentes.

**Mitigação:**

* Utilizar esperas baseadas em estado.
* Evitar esperas fixas desnecessárias.
* Reexecutar testes quando houver evidência de falha externa.

---

## Risco 6 — Ausência de validações no sistema

**Descrição:** O ParaBank pode aceitar dados inválidos.

**Impacto:** Comportamentos divergentes do esperado.

**Mitigação:**

* Registrar o comportamento real.
* Comparar com os critérios definidos.
* Avaliar impacto antes de classificar como defeito.
* Documentar limitações do ambiente de demonstração.

---

# 22. Responsabilidades

Como este é um projeto individual, as responsabilidades serão concentradas no responsável pelo projeto.

## Responsável por QA

* Planejar os testes.
* Criar cenários.
* Criar casos de teste.
* Preparar massa de teste.
* Desenvolver automações.
* Executar testes.
* Analisar falhas.
* Registrar defeitos.
* Gerar evidências.
* Atualizar a documentação.
* Manter o pipeline.

---

# 23. Entregáveis

Os principais entregáveis serão:

* Backlog.
* Plano de desenvolvimento.
* Documento de sprints.
* Plano de testes.
* Cenários de teste.
* Casos de teste.
* Critérios de aceite.
* Massa de teste.
* Registro de defeitos.
* Código de automação.
* Page Objects.
* Fixtures.
* Pipeline do GitHub Actions.
* Relatórios.
* Screenshots e vídeos.
* README.
* Repositório GitHub atualizado.

---

# 24. Métricas

Poderão ser acompanhadas as seguintes métricas:

* Quantidade de cenários planejados.
* Quantidade de cenários automatizados.
* Quantidade de testes aprovados.
* Quantidade de testes reprovados.
* Quantidade de testes bloqueados.
* Taxa de aprovação.
* Quantidade de defeitos encontrados.
* Defeitos por severidade.
* Tempo total de execução.
* Cobertura funcional.
* Evolução por sprint.

## Fórmula de taxa de aprovação

```text
Taxa de aprovação =
Testes aprovados ÷ Testes executados × 100
```

---

# 25. Cronograma

| Sprint   | Escopo                         |
| -------- | ------------------------------ |
| Sprint 0 | Configuração do ambiente       |
| Sprint 1 | Cadastro                       |
| Sprint 2 | Login e logout                 |
| Sprint 3 | Contas e transações            |
| Sprint 4 | Transferências                 |
| Sprint 5 | Pagamento de contas            |
| Sprint 6 | Empréstimos                    |
| Sprint 7 | Atualização de perfil          |
| Sprint 8 | Regressão e refatoração        |
| Sprint 9 | CI/CD, relatórios e evidências |

---

# 26. Definition of Done

Uma entrega será considerada pronta quando:

* O cenário estiver documentado.
* O caso de teste estiver definido.
* A massa de teste estiver preparada.
* O teste automatizado estiver implementado.
* A execução estiver estável.
* O código estiver organizado.
* O Page Object estiver atualizado.
* As evidências estiverem disponíveis.
* Os defeitos encontrados estiverem registrados.
* A documentação estiver atualizada.
* O código estiver versionado no GitHub.
* O pipeline relacionado estiver funcionando, quando aplicável.

---

# 27. Resultado Esperado

Ao final do projeto, deverá existir uma suíte de testes automatizados organizada, documentada e integrada ao GitHub Actions, capaz de validar os principais fluxos da aplicação ParaBank.

O projeto deverá demonstrar conhecimentos em:

* Planejamento de testes.
* Automação End-to-End.
* Cypress.
* JavaScript.
* Page Object Model.
* Testes funcionais.
* Testes de regressão.
* Testes positivos e negativos.
* Gerenciamento de massa de teste.
* Registro de defeitos.
* Evidências.
* Git.
* GitHub.
* Integração contínua.

---

# 28. Observações Finais

* O plano poderá ser atualizado durante a evolução do projeto.
* Novos cenários poderão ser adicionados após testes exploratórios.
* O comportamento real da aplicação deverá prevalecer durante a análise.
* Divergências deverão ser investigadas antes de serem classificadas como defeitos.
* Dependências e limitações do ambiente deverão ser documentadas.
* A suíte deverá priorizar estabilidade, legibilidade e facilidade de manutenção.
