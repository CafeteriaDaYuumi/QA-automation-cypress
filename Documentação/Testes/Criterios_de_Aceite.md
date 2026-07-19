# Critérios de Aceite

## Projeto

**Automação de Testes Web com Cypress**

**Aplicação:** ParaBank
**Ferramenta:** Cypress
**Linguagem:** JavaScript
**Tipo de teste:** End-to-End — E2E

---

# Objetivo

Este documento define os critérios de aceite das funcionalidades contempladas pelo projeto de automação de testes da aplicação ParaBank.

Os critérios estabelecem as condições mínimas que devem ser atendidas para que uma funcionalidade seja considerada válida, concluída e apta para aprovação.

---

# Padrão Utilizado

Os critérios de aceite foram escritos utilizando uma estrutura inspirada em BDD:

* **Dado:** representa o contexto ou a pré-condição.
* **Quando:** representa a ação realizada pelo usuário.
* **Então:** representa o resultado esperado.
* **E:** complementa uma condição, ação ou resultado.

---

# Cadastro de Usuário

## CA-REGISTER-001 — Acesso ao formulário de cadastro

**Dado que** o visitante está na página inicial do ParaBank
**Quando** clicar na opção de cadastro
**Então** o sistema deverá direcioná-lo para a página de registro
**E** apresentar todos os campos necessários para criação da conta.

---

## CA-REGISTER-002 — Cadastro com dados válidos

**Dado que** o visitante está na página de cadastro
**E** informa todos os campos obrigatórios corretamente
**E** utiliza um nome de usuário ainda não cadastrado
**E** informa senhas correspondentes
**Quando** confirmar o cadastro
**Então** a conta deverá ser criada com sucesso
**E** o sistema deverá apresentar uma mensagem de confirmação ou boas-vindas
**E** o usuário deverá acessar a área autenticada.

---

## CA-REGISTER-003 — Validação dos campos obrigatórios

**Dado que** o visitante está na página de cadastro
**Quando** tentar concluir o cadastro sem preencher os campos obrigatórios
**Então** o sistema deverá impedir a criação da conta
**E** apresentar mensagens de validação nos campos obrigatórios
**E** não deverá criar nenhum usuário incompleto.

---

## CA-REGISTER-004 — Confirmação de senha divergente

**Dado que** o visitante preencheu o formulário de cadastro
**E** informou senhas diferentes nos campos de senha e confirmação
**Quando** tentar concluir o cadastro
**Então** o sistema deverá impedir a criação da conta
**E** informar que as senhas não correspondem.

---

## CA-REGISTER-005 — Nome de usuário já utilizado

**Dado que** existe um usuário previamente cadastrado
**Quando** outro visitante tentar utilizar o mesmo nome de usuário
**Então** o sistema deverá rejeitar o cadastro
**E** apresentar uma mensagem informando que o nome de usuário já existe
**E** não deverá sobrescrever os dados do usuário anterior.

---

# Login e Logout

## CA-LOGIN-001 — Login com credenciais válidas

**Dado que** existe um usuário cadastrado
**E** o usuário está na página inicial
**Quando** informar o nome de usuário e a senha corretos
**E** clicar no botão de login
**Então** o sistema deverá autenticar o usuário
**E** direcioná-lo para a visão geral das contas
**E** apresentar as funcionalidades da área autenticada.

---

## CA-LOGIN-002 — Login com senha incorreta

**Dado que** existe um usuário cadastrado
**Quando** informar o nome de usuário correto e uma senha incorreta
**Então** o sistema deverá impedir a autenticação
**E** apresentar uma mensagem de erro
**E** manter o usuário fora da área restrita.

---

## CA-LOGIN-003 — Login com usuário inexistente

**Dado que** o visitante está na página inicial
**Quando** informar um nome de usuário não cadastrado
**E** tentar realizar o login
**Então** o sistema deverá rejeitar a autenticação
**E** apresentar uma mensagem de erro
**E** não deverá criar uma sessão autenticada.

---

## CA-LOGIN-004 — Login com campos vazios

**Dado que** o visitante está na página inicial
**Quando** tentar realizar o login sem informar usuário e senha
**Então** o sistema deverá impedir o acesso
**E** apresentar uma validação relacionada aos campos obrigatórios.

---

## CA-LOGIN-005 — Encerramento da sessão

**Dado que** o usuário está autenticado
**Quando** clicar na opção de logout
**Então** a sessão deverá ser encerrada
**E** o usuário deverá retornar para a página inicial
**E** as funcionalidades restritas não deverão permanecer acessíveis sem nova autenticação.

---

# Contas

## CA-ACCOUNT-001 — Exibição das contas disponíveis

**Dado que** o usuário está autenticado
**E** possui uma ou mais contas
**Quando** acessar a visão geral das contas
**Então** o sistema deverá apresentar todas as contas vinculadas ao usuário
**E** exibir o número de cada conta
**E** apresentar os respectivos saldos.

---

## CA-ACCOUNT-002 — Exibição dos detalhes da conta

**Dado que** o usuário está na visão geral das contas
**Quando** selecionar uma conta disponível
**Então** o sistema deverá apresentar os detalhes da conta selecionada
**E** exibir corretamente o número da conta
**E** exibir o tipo da conta
**E** apresentar o saldo disponível.

---

## CA-ACCOUNT-003 — Histórico de transações

**Dado que** o usuário acessou os detalhes de uma conta
**E** a conta possui transações registradas
**Quando** consultar o histórico
**Então** o sistema deverá apresentar as movimentações disponíveis
**E** cada transação deverá apresentar data, descrição e valor.

---

## CA-ACCOUNT-004 — Detalhes de uma transação

**Dado que** existe uma transação disponível no histórico
**Quando** o usuário selecionar essa transação
**Então** o sistema deverá apresentar seus detalhes
**E** os dados apresentados deverão corresponder à movimentação selecionada.

---

# Transferências

## CA-TRANSFER-001 — Transferência válida entre contas

**Dado que** o usuário está autenticado
**E** possui pelo menos duas contas
**Quando** informar um valor válido
**E** selecionar contas diferentes como origem e destino
**E** confirmar a transferência
**Então** o sistema deverá concluir a operação
**E** apresentar uma mensagem de confirmação
**E** exibir corretamente o valor transferido
**E** exibir as contas utilizadas na operação.

---

## CA-TRANSFER-002 — Transferência sem valor

**Dado que** o usuário está na página de transferências
**Quando** tentar confirmar a operação sem informar um valor
**Então** o sistema deverá impedir ou rejeitar a transferência
**E** apresentar uma validação adequada
**E** não deverá alterar os saldos das contas.

---

## CA-TRANSFER-003 — Transferência com valor igual a zero

**Dado que** o usuário está na página de transferências
**Quando** informar o valor igual a zero
**E** tentar concluir a operação
**Então** o sistema deverá impedir ou rejeitar a transferência
**E** não deverá movimentar valores entre as contas.

---

## CA-TRANSFER-004 — Transferência com valor negativo

**Dado que** o usuário está na página de transferências
**Quando** informar um valor negativo
**Então** o sistema deverá rejeitar a operação ou impedir a entrada inválida
**E** não deverá alterar os saldos das contas.

---

## CA-TRANSFER-005 — Transferência com valor não numérico

**Dado que** o usuário está na página de transferências
**Quando** informar letras ou caracteres inválidos no campo de valor
**Então** o sistema deverá impedir a entrada ou rejeitar a operação
**E** não deverá processar a transferência.

---

## CA-TRANSFER-006 — Transferência para a mesma conta

**Dado que** o usuário está na página de transferências
**Quando** selecionar a mesma conta como origem e destino
**Então** o sistema deverá impedir ou rejeitar a operação
**E** não deverá realizar movimentação indevida
**E** os saldos deverão permanecer inalterados.

---

# Pagamento de Contas

## CA-BILLPAY-001 — Pagamento com dados válidos

**Dado que** o usuário está autenticado
**E** possui uma conta disponível
**Quando** preencher corretamente os dados do beneficiário
**E** informar números de conta correspondentes
**E** informar um valor válido
**E** confirmar o pagamento
**Então** o sistema deverá processar a operação
**E** apresentar uma mensagem de confirmação
**E** exibir corretamente o beneficiário e o valor pago.

---

## CA-BILLPAY-002 — Campos obrigatórios não preenchidos

**Dado que** o usuário está na página de pagamento
**Quando** tentar concluir a operação sem preencher os campos obrigatórios
**Então** o sistema deverá impedir o pagamento
**E** apresentar mensagens de validação
**E** não deverá registrar nenhuma transação.

---

## CA-BILLPAY-003 — Números de conta divergentes

**Dado que** o usuário preencheu os dados do beneficiário
**Quando** informar números diferentes nos campos de conta e confirmação
**Então** o sistema deverá impedir o pagamento
**E** informar que os números não correspondem
**E** não deverá registrar a operação.

---

## CA-BILLPAY-004 — Pagamento com valor igual a zero

**Dado que** os dados obrigatórios foram preenchidos
**Quando** o usuário informar o valor igual a zero
**Então** o sistema deverá rejeitar ou impedir o pagamento
**E** não deverá gerar uma transação.

---

## CA-BILLPAY-005 — Pagamento com valor negativo

**Dado que** o usuário está preenchendo o formulário de pagamento
**Quando** informar um valor negativo
**Então** o sistema deverá rejeitar a operação ou impedir a entrada
**E** não deverá alterar o saldo da conta.

---

## CA-BILLPAY-006 — Pagamento com valor não numérico

**Dado que** o usuário está preenchendo o formulário de pagamento
**Quando** informar letras ou caracteres inválidos no campo de valor
**Então** o sistema deverá impedir a entrada ou rejeitar o pagamento
**E** não deverá registrar a operação.

---

# Solicitação de Empréstimo

## CA-LOAN-001 — Solicitação com dados válidos

**Dado que** o usuário está autenticado
**E** possui uma conta disponível
**Quando** informar um valor de empréstimo válido
**E** informar um valor de entrada válido
**E** selecionar uma conta
**E** enviar a solicitação
**Então** o sistema deverá processar a análise
**E** apresentar o resultado da solicitação
**E** exibir os valores informados.

---

## CA-LOAN-002 — Entrada insuficiente

**Dado que** o usuário está na página de solicitação de empréstimo
**Quando** informar um valor de entrada inferior ao exigido
**E** enviar a solicitação
**Então** o sistema deverá rejeitar o empréstimo
**E** apresentar uma justificativa ou mensagem correspondente
**E** não deverá criar uma nova conta de empréstimo.

---

## CA-LOAN-003 — Campos de valor não preenchidos

**Dado que** o usuário está na página de empréstimos
**Quando** enviar a solicitação sem informar os valores obrigatórios
**Então** o sistema deverá impedir ou rejeitar a solicitação
**E** apresentar uma validação adequada.

---

## CA-LOAN-004 — Valores negativos

**Dado que** o usuário está na página de empréstimos
**Quando** informar valores negativos
**Então** o sistema deverá rejeitar a solicitação ou impedir a entrada inválida
**E** não deverá aprovar o empréstimo.

---

## CA-LOAN-005 — Valores não numéricos

**Dado que** o usuário está na página de empréstimos
**Quando** informar letras ou caracteres inválidos nos campos de valor
**Então** o sistema deverá impedir a entrada ou rejeitar a solicitação
**E** não deverá criar uma operação de empréstimo.

---

# Atualização de Perfil

## CA-PROFILE-001 — Atualização com dados válidos

**Dado que** o usuário está autenticado
**E** acessou a página de atualização de perfil
**Quando** modificar os campos permitidos utilizando dados válidos
**E** confirmar a atualização
**Então** o sistema deverá salvar as novas informações
**E** apresentar uma mensagem de confirmação
**E** manter os dados atualizados após recarregar a página.

---

## CA-PROFILE-002 — Remoção de campos obrigatórios

**Dado que** o usuário está na página de atualização de perfil
**Quando** apagar um ou mais campos obrigatórios
**E** tentar salvar as alterações
**Então** o sistema deverá impedir a atualização
**E** apresentar mensagens de validação
**E** preservar os dados válidos anteriormente cadastrados.

---

## CA-PROFILE-003 — Persistência dos dados atualizados

**Dado que** o usuário atualizou suas informações
**Quando** sair da página
**E** acessar novamente a atualização de perfil
**Então** os novos dados deverão permanecer salvos
**E** os valores anteriores não deverão ser restaurados indevidamente.

---

## CA-PROFILE-004 — Atualização com dados inválidos

**Dado que** o usuário está na página de atualização de perfil
**Quando** informar valores inválidos nos campos disponíveis
**E** tentar salvar as alterações
**Então** o sistema deverá rejeitar os dados ou apresentar validações adequadas
**E** não deverá persistir informações inválidas.

---

# Navegação e Controle de Sessão

## CA-NAVIGATION-001 — Navegação pela área autenticada

**Dado que** o usuário está autenticado
**Quando** selecionar uma funcionalidade disponível no menu
**Então** o sistema deverá direcioná-lo para a página correspondente
**E** apresentar corretamente o conteúdo da funcionalidade.

---

## CA-NAVIGATION-002 — Acesso não autenticado a páginas restritas

**Dado que** o usuário não está autenticado
**Quando** tentar acessar diretamente uma página restrita
**Então** o sistema deverá impedir o acesso
**E** direcionar o usuário para a autenticação ou apresentar uma mensagem de sessão inválida.

---

## CA-NAVIGATION-003 — Retorno à visão geral das contas

**Dado que** o usuário está em uma funcionalidade interna
**Quando** clicar na opção de visão geral das contas
**Então** o sistema deverá retornar à página principal da área autenticada
**E** apresentar as contas vinculadas ao usuário.

---

# Critérios de Aceite da Automação

## CA-AUTOMATION-001 — Execução dos testes

**Dado que** o ambiente de testes está disponível
**Quando** a suíte Cypress for executada
**Então** os testes deverão iniciar sem erros de configuração
**E** cada cenário deverá apresentar seu resultado de execução.

---

## CA-AUTOMATION-002 — Independência dos testes

**Dado que** existem diferentes cenários automatizados
**Quando** um teste for executado individualmente
**Então** ele não deverá depender da execução prévia de outro teste
**Exceto quando** a dependência estiver documentada e for necessária ao fluxo.

---

## CA-AUTOMATION-003 — Massa de teste

**Dado que** um cenário necessita de dados específicos
**Quando** o teste for executado
**Então** deverá utilizar massa controlada
**E** não deverá utilizar informações pessoais ou dados bancários reais
**E** usuários dinâmicos deverão utilizar identificadores únicos.

---

## CA-AUTOMATION-004 — Evidências de falha

**Dado que** um teste automatizado foi reprovado
**Quando** a execução for concluída
**Então** o projeto deverá gerar evidências compatíveis com a configuração
**Como** screenshots, vídeos ou relatórios
**E** a falha deverá ser identificável para análise.

---

## CA-AUTOMATION-005 — Page Object Model

**Dado que** os testes interagem com diferentes páginas
**Quando** novos cenários forem implementados
**Então** os seletores e ações reutilizáveis deverão ser mantidos nos Page Objects
**E** os arquivos de teste deverão concentrar-se na validação dos cenários.

---

## CA-AUTOMATION-006 — Pipeline de integração contínua

**Dado que** o pipeline do GitHub Actions está configurado
**Quando** ocorrer uma execução manual, push ou pull request conforme a configuração
**Então** as dependências deverão ser instaladas
**E** os testes deverão ser executados em modo headless
**E** o resultado da execução deverá ficar disponível no GitHub Actions.

---

## CA-AUTOMATION-007 — Regressão

**Dado que** uma nova funcionalidade foi implementada ou alterada
**Quando** a suíte de regressão for executada
**Então** os fluxos críticos existentes deverão continuar funcionando
**E** qualquer falha identificada deverá ser analisada antes da conclusão da sprint.

---

# Critérios Gerais para Aprovação

Uma funcionalidade será considerada aprovada quando:

* Os critérios de aceite relacionados forem atendidos.
* O fluxo principal funcionar conforme o esperado.
* Os cenários negativos não gerarem operações indevidas.
* Os dados apresentados corresponderem às ações realizadas.
* Não houver falhas críticas bloqueando a funcionalidade.
* Os testes automatizados relacionados estiverem implementados.
* Os testes executarem com sucesso no ambiente definido.
* As evidências forem geradas quando necessário.
* A documentação estiver atualizada.
* O código estiver versionado no repositório.

---

# Critérios para Reprovação

Uma funcionalidade será considerada reprovada quando:

* O fluxo principal não puder ser concluído.
* Uma operação for processada com dados inválidos.
* Os resultados apresentados forem inconsistentes.
* Houver alteração incorreta de saldos ou dados do usuário.
* O sistema permitir acesso indevido a páginas restritas.
* O teste apresentar falha reproduzível.
* Os resultados divergirem dos critérios de aceite definidos.

---

# Critérios para Bloqueio

Um cenário será considerado bloqueado quando:

* A aplicação estiver indisponível.
* O ambiente não permitir cadastro ou autenticação.
* Uma funcionalidade anterior necessária estiver com falha.
* A massa de teste não puder ser criada.
* O sistema apresentar instabilidade que impeça a execução.
* Houver mudanças na interface que impossibilitem temporariamente a automação.

---

# Observações

* Os critérios deverão ser comparados com o comportamento real da aplicação durante a implementação.
* Um comportamento diferente do esperado não deverá ser classificado automaticamente como defeito sem análise.
* Ausências de validação poderão ser registradas como defeitos ou riscos, conforme o impacto.
* Critérios poderão ser atualizados após novas descobertas durante os testes exploratórios.
* Falhas encontradas deverão ser registradas no documento de defeitos.
* Os critérios de aceite deverão permanecer alinhados ao backlog, aos cenários e aos casos de teste.
