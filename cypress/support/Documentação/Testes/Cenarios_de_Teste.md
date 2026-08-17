# Cenários de Teste

## Projeto

**Automação de Testes Web com Cypress**

**Aplicação:** ParaBank
**Tipo de teste:** End-to-End — E2E
**Ferramenta:** Cypress
**Linguagem:** JavaScript

---

# Objetivo

Este documento apresenta os cenários de teste definidos para validar os principais fluxos funcionais da aplicação ParaBank.

Os cenários servirão como referência para a elaboração dos casos de teste detalhados e para o desenvolvimento da suíte de testes automatizados.

---

# Escopo dos Testes

A automação contemplará as seguintes funcionalidades:

* Cadastro de usuário
* Login e logout
* Consulta de contas
* Histórico de transações
* Transferência entre contas
* Pagamento de contas
* Solicitação de empréstimo
* Atualização de perfil

---

# Cadastro de Usuário

## CT-REGISTER-001 — Acessar a página de cadastro

**Dado que** o visitante está na página inicial do ParaBank
**Quando** clicar na opção de cadastro
**Então** o sistema deverá apresentar o formulário de criação de usuário.

---

## CT-REGISTER-002 — Cadastrar usuário com dados válidos

**Dado que** o visitante está na página de cadastro
**E** informa dados válidos e um nome de usuário único
**Quando** confirmar o cadastro
**Então** o sistema deverá criar a conta
**E** apresentar uma mensagem de boas-vindas.

---

## CT-REGISTER-003 — Cadastrar usuário sem preencher campos obrigatórios

**Dado que** o visitante está na página de cadastro
**Quando** tentar cadastrar sem preencher os campos obrigatórios
**Então** o sistema deverá impedir o cadastro
**E** apresentar mensagens de validação.

---

## CT-REGISTER-004 — Cadastrar usuário com senhas diferentes

**Dado que** o visitante preencheu os dados obrigatórios
**E** informou senhas diferentes nos campos de senha e confirmação
**Quando** confirmar o cadastro
**Então** o sistema deverá impedir a criação da conta
**E** informar que as senhas não correspondem.

---

## CT-REGISTER-005 — Cadastrar nome de usuário já existente

**Dado que** existe um usuário previamente cadastrado
**Quando** o visitante tentar cadastrar o mesmo nome de usuário
**Então** o sistema deverá impedir o cadastro
**E** informar que o nome de usuário já está sendo utilizado.

---

# Login e Logout

## CT-LOGIN-001 — Realizar login com credenciais válidas

**Dado que** existe um usuário cadastrado
**Quando** informar o nome de usuário e a senha corretos
**Então** o sistema deverá autenticar o usuário
**E** apresentar a área de serviços da conta.

---

## CT-LOGIN-002 — Realizar login com senha inválida

**Dado que** existe um usuário cadastrado
**Quando** informar o nome de usuário correto e uma senha incorreta
**Então** o sistema deverá impedir o acesso
**E** apresentar uma mensagem de erro.

---

## CT-LOGIN-003 — Realizar login com usuário inexistente

**Dado que** o visitante está na página inicial
**Quando** informar um nome de usuário não cadastrado
**Então** o sistema deverá impedir o acesso
**E** apresentar uma mensagem de erro.

---

## CT-LOGIN-004 — Realizar login com campos vazios

**Dado que** o visitante está na página inicial
**Quando** tentar acessar o sistema sem informar usuário e senha
**Então** o sistema deverá impedir o login
**E** apresentar a validação correspondente.

---

## CT-LOGIN-005 — Realizar logout

**Dado que** o usuário está autenticado
**Quando** selecionar a opção de logout
**Então** o sistema deverá encerrar a sessão
**E** redirecionar o usuário para a página inicial.

---

# Contas

## CT-ACCOUNT-001 — Visualizar contas disponíveis

**Dado que** o usuário está autenticado
**E** possui pelo menos uma conta
**Quando** acessar a visão geral das contas
**Então** o sistema deverá apresentar as contas vinculadas ao usuário
**E** seus respectivos saldos.

---

## CT-ACCOUNT-002 — Visualizar os detalhes de uma conta

**Dado que** o usuário está na visão geral das contas
**Quando** selecionar uma conta
**Então** o sistema deverá apresentar o número, o tipo e o saldo da conta selecionada.

---

## CT-ACCOUNT-003 — Visualizar o histórico de transações

**Dado que** o usuário acessou os detalhes de uma conta
**E** existem movimentações registradas
**Quando** consultar o histórico
**Então** o sistema deverá apresentar as transações da conta.

---

## CT-ACCOUNT-004 — Consultar detalhes de uma transação

**Dado que** existe uma transação no histórico da conta
**Quando** o usuário selecionar a transação
**Então** o sistema deverá apresentar seus detalhes
**Incluindo** data, descrição, tipo e valor.

---

# Transferências

## CT-TRANSFER-001 — Realizar transferência entre contas diferentes

**Dado que** o usuário está autenticado
**E** possui pelo menos duas contas
**Quando** informar um valor válido
**E** selecionar contas diferentes como origem e destino
**Então** o sistema deverá processar a transferência
**E** apresentar uma mensagem de confirmação.

---

## CT-TRANSFER-002 — Realizar transferência sem informar valor

**Dado que** o usuário está na página de transferências
**Quando** tentar confirmar a operação sem informar o valor
**Então** o sistema deverá impedir ou rejeitar a transferência
**E** apresentar uma validação adequada.

---

## CT-TRANSFER-003 — Realizar transferência com valor igual a zero

**Dado que** o usuário está na página de transferências
**Quando** informar o valor igual a zero
**Então** o sistema deverá impedir a transferência
**E** informar que o valor é inválido.

---

## CT-TRANSFER-004 — Realizar transferência com valor negativo

**Dado que** o usuário está na página de transferências
**Quando** informar um valor negativo
**Então** o sistema deverá impedir a transferência
**E** apresentar uma mensagem de validação.

---

## CT-TRANSFER-005 — Realizar transferência com valor não numérico

**Dado que** o usuário está na página de transferências
**Quando** informar texto ou caracteres inválidos no campo de valor
**Então** o sistema deverá rejeitar a entrada ou impedir a operação.

---

## CT-TRANSFER-006 — Transferir para a mesma conta de origem

**Dado que** o usuário está na página de transferências
**Quando** selecionar a mesma conta como origem e destino
**Então** o sistema deverá impedir ou rejeitar a operação
**E** nenhum saldo deverá ser alterado indevidamente.

---

# Pagamento de Contas

## CT-BILLPAY-001 — Realizar pagamento com dados válidos

**Dado que** o usuário está autenticado
**E** possui uma conta disponível
**Quando** preencher os dados do beneficiário e informar um valor válido
**Então** o sistema deverá processar o pagamento
**E** apresentar uma mensagem de confirmação.

---

## CT-BILLPAY-002 — Realizar pagamento sem preencher campos obrigatórios

**Dado que** o usuário está na página de pagamento
**Quando** tentar confirmar o pagamento sem preencher os campos obrigatórios
**Então** o sistema deverá impedir a operação
**E** apresentar mensagens de validação.

---

## CT-BILLPAY-003 — Informar contas de beneficiário diferentes

**Dado que** o usuário está preenchendo o pagamento
**Quando** informar números diferentes nos campos de conta e confirmação
**Então** o sistema deverá impedir a operação
**E** informar que os números não correspondem.

---

## CT-BILLPAY-004 — Realizar pagamento com valor igual a zero

**Dado que** os dados do beneficiário foram preenchidos
**Quando** o usuário informar o valor igual a zero
**Então** o sistema deverá impedir o pagamento
**E** apresentar uma validação adequada.

---

## CT-BILLPAY-005 — Realizar pagamento com valor negativo

**Dado que** os dados do beneficiário foram preenchidos
**Quando** o usuário informar um valor negativo
**Então** o sistema deverá impedir o pagamento
**E** apresentar uma mensagem de validação.

---

## CT-BILLPAY-006 — Realizar pagamento com valor não numérico

**Dado que** o usuário está preenchendo o pagamento
**Quando** informar texto ou caracteres inválidos no campo de valor
**Então** o sistema deverá rejeitar a entrada ou impedir a operação.

---

# Solicitação de Empréstimo

## CT-LOAN-001 — Solicitar empréstimo com dados válidos

**Dado que** o usuário está autenticado
**E** possui uma conta disponível
**Quando** informar valores válidos para o empréstimo e entrada
**Então** o sistema deverá processar a solicitação
**E** apresentar o resultado da análise.

---

## CT-LOAN-002 — Solicitar empréstimo com entrada insuficiente

**Dado que** o usuário está na página de empréstimos
**Quando** informar um valor de entrada inferior ao exigido
**Então** o sistema deverá rejeitar a solicitação
**E** apresentar o motivo da rejeição.

---

## CT-LOAN-003 — Solicitar empréstimo sem preencher os valores

**Dado que** o usuário está na página de empréstimos
**Quando** tentar enviar a solicitação sem informar os valores
**Então** o sistema deverá impedir ou rejeitar a solicitação
**E** apresentar uma validação adequada.

---

## CT-LOAN-004 — Solicitar empréstimo com valores negativos

**Dado que** o usuário está na página de empréstimos
**Quando** informar valores negativos
**Então** o sistema deverá impedir a solicitação
**E** apresentar uma mensagem de validação.

---

## CT-LOAN-005 — Solicitar empréstimo com valores não numéricos

**Dado que** o usuário está na página de empréstimos
**Quando** informar texto ou caracteres inválidos nos campos de valor
**Então** o sistema deverá rejeitar a entrada ou impedir a solicitação.

---

# Atualização de Perfil

## CT-PROFILE-001 — Atualizar perfil com dados válidos

**Dado que** o usuário está autenticado
**Quando** alterar os dados permitidos utilizando informações válidas
**Então** o sistema deverá salvar as alterações
**E** apresentar uma mensagem de confirmação.

---

## CT-PROFILE-002 — Atualizar perfil removendo campos obrigatórios

**Dado que** o usuário está na página de atualização de perfil
**Quando** remover o conteúdo de campos obrigatórios
**E** tentar salvar
**Então** o sistema deverá impedir a atualização
**E** apresentar mensagens de validação.

---

## CT-PROFILE-003 — Validar persistência dos dados atualizados

**Dado que** o usuário atualizou os dados do perfil
**Quando** sair da página e acessá-la novamente
**Então** as informações atualizadas deverão permanecer salvas.

---

## CT-PROFILE-004 — Atualizar perfil com dados inválidos

**Dado que** o usuário está na página de atualização de perfil
**Quando** informar valores inválidos nos campos disponíveis
**Então** o sistema deverá impedir a atualização ou apresentar validações adequadas.

---

# Navegação e Sessão

## CT-NAVIGATION-001 — Navegar pelas funcionalidades autenticadas

**Dado que** o usuário está autenticado
**Quando** acessar as opções disponíveis no menu lateral
**Então** o sistema deverá direcioná-lo para a funcionalidade selecionada.

---

## CT-NAVIGATION-002 — Tentar acessar uma funcionalidade restrita sem autenticação

**Dado que** o usuário não está autenticado
**Quando** tentar acessar diretamente uma página restrita
**Então** o sistema deverá impedir o acesso
**E** solicitar autenticação.

---

## CT-NAVIGATION-003 — Utilizar o link de retorno à visão geral

**Dado que** o usuário está em uma funcionalidade interna
**Quando** selecionar a opção de visão geral das contas
**Então** o sistema deverá apresentar a página principal da área autenticada.

---

# Regressão

## CT-REGRESSION-001 — Executar fluxo principal do usuário

**Dado que** a aplicação está disponível
**Quando** a suíte de regressão for executada
**Então** deverão ser validados os fluxos de:

* Cadastro
* Login
* Consulta de contas
* Transferência
* Pagamento de contas
* Solicitação de empréstimo
* Atualização de perfil
* Logout

---

## CT-REGRESSION-002 — Validar estabilidade dos fluxos críticos

**Dado que** alterações foram realizadas no projeto ou na aplicação
**Quando** os testes críticos forem executados
**Então** os principais fluxos deverão continuar funcionando sem regressões.

---

# Resumo dos Cenários

| Funcionalidade        | Quantidade |
| --------------------- | ---------: |
| Cadastro              |          5 |
| Login e logout        |          5 |
| Contas                |          4 |
| Transferências        |          6 |
| Pagamento de contas   |          6 |
| Empréstimos           |          5 |
| Atualização de perfil |          4 |
| Navegação e sessão    |          3 |
| Regressão             |          2 |
| **Total**             |     **40** |

---

# Priorização

## Prioridade Alta

* Cadastro válido
* Login válido
* Login inválido
* Logout
* Visualização de contas
* Transferência válida
* Pagamento válido
* Solicitação de empréstimo
* Validação de campos obrigatórios
* Regressão dos fluxos críticos

## Prioridade Média

* Histórico de transações
* Atualização de perfil
* Persistência de dados
* Validações de valores inválidos
* Navegação entre funcionalidades

## Prioridade Baixa

* Validações complementares de interface
* Comportamentos não críticos
* Cenários alternativos que não bloqueiam o fluxo principal

---

# Critérios Gerais de Aceitação

* Os fluxos positivos devem ser concluídos com sucesso.
* Os fluxos negativos não devem gerar operações indevidas.
* Mensagens de confirmação devem ser apresentadas após operações concluídas.
* Mensagens de erro devem ser apresentadas quando houver dados inválidos.
* Os dados exibidos devem corresponder às informações utilizadas durante o teste.
* Os testes devem ser independentes sempre que possível.
* Falhas identificadas devem gerar evidências.
* Comportamentos divergentes devem ser registrados como defeitos ou pontos de análise.

---

# Observações

* Os comportamentos reais da aplicação deverão ser confirmados durante a implementação.
* Cenários que revelarem ausência de validação poderão gerar registros de defeito.
* Alguns fluxos dependem de usuários e contas criados dinamicamente.
* Nomes de usuário deverão ser únicos para evitar conflitos entre execuções.
* A massa de teste deverá ser mantida na pasta `cypress/fixtures`.
* Dados sensíveis ou reais não deverão ser utilizados.
* Screenshots e vídeos poderão ser gerados automaticamente pelo Cypress em caso de falha.
* Os cenários poderão ser atualizados conforme novos comportamentos forem identificados.
