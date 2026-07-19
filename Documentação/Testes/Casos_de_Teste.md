# Casos de Teste

## Projeto

**Automação de Testes Web com Cypress**

**Aplicação:** ParaBank
**Tipo de teste:** End-to-End — E2E
**Ferramenta:** Cypress
**Linguagem:** JavaScript

---

# Objetivo

Este documento apresenta os casos de teste definidos para validar os principais fluxos funcionais da aplicação ParaBank.

Os casos serão utilizados como base para o desenvolvimento dos testes automatizados, cobrindo cenários positivos, negativos, validações de campos e regras de negócio.

---

# Padrão de Identificação

Os casos de teste serão identificados de acordo com a funcionalidade validada.

| Prefixo  | Funcionalidade            |
| -------- | ------------------------- |
| REGISTER | Cadastro                  |
| LOGIN    | Login e logout            |
| ACCOUNT  | Contas                    |
| TRANSFER | Transferências            |
| BILLPAY  | Pagamento de contas       |
| LOAN     | Solicitação de empréstimo |
| PROFILE  | Atualização de perfil     |

---

# Cadastro de Usuário

## REGISTER001 — Realizar cadastro com dados válidos

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve acessar a página inicial do ParaBank.
* O nome de usuário informado não deve estar cadastrado.

### Massa de teste

* Nome válido
* Sobrenome válido
* Endereço válido
* Cidade válida
* Estado válido
* CEP válido
* Telefone válido
* Número de identificação válido
* Nome de usuário único
* Senha válida
* Confirmação de senha correspondente

### Passos

1. Acessar a página inicial do ParaBank.
2. Clicar na opção de cadastro.
3. Preencher todos os campos obrigatórios com dados válidos.
4. Informar uma senha válida.
5. Confirmar a mesma senha.
6. Clicar no botão de cadastro.

### Resultado esperado

* O cadastro deve ser realizado com sucesso.
* O sistema deve apresentar uma mensagem de boas-vindas.
* O usuário deve permanecer autenticado na aplicação.

---

## REGISTER002 — Tentar realizar cadastro sem preencher os campos obrigatórios

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar na página de cadastro.

### Passos

1. Acessar a página de cadastro.
2. Não preencher os campos do formulário.
3. Clicar no botão de cadastro.

### Resultado esperado

* O cadastro não deve ser concluído.
* O sistema deve apresentar mensagens de validação nos campos obrigatórios.

---

## REGISTER003 — Tentar cadastrar senhas diferentes

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar na página de cadastro.

### Passos

1. Preencher os dados obrigatórios com informações válidas.
2. Informar uma senha.
3. Informar uma senha diferente no campo de confirmação.
4. Clicar no botão de cadastro.

### Resultado esperado

* O cadastro não deve ser concluído.
* O sistema deve informar que as senhas não correspondem.

---

## REGISTER004 — Tentar cadastrar um nome de usuário já existente

**Prioridade:** Média
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* Deve existir um usuário previamente cadastrado.

### Passos

1. Acessar a página de cadastro.
2. Preencher todos os campos obrigatórios.
3. Informar um nome de usuário já cadastrado.
4. Clicar no botão de cadastro.

### Resultado esperado

* O cadastro não deve ser concluído.
* O sistema deve informar que o nome de usuário já existe.

---

## REGISTER005 — Validar acesso à página de cadastro

**Prioridade:** Média
**Tipo:** Navegação
**Automação:** Planejada

### Pré-condições

* O usuário deve estar na página inicial.

### Passos

1. Localizar a opção de cadastro.
2. Clicar na opção de cadastro.

### Resultado esperado

* O usuário deve ser direcionado para a página de cadastro.
* O formulário deve ser apresentado corretamente.

---

# Login e Logout

## LOGIN001 — Realizar login com credenciais válidas

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* Deve existir um usuário cadastrado.
* O usuário não deve estar autenticado.

### Passos

1. Acessar a página inicial.
2. Informar um nome de usuário válido.
3. Informar a senha correspondente.
4. Clicar no botão de login.

### Resultado esperado

* O login deve ser realizado com sucesso.
* O usuário deve ser direcionado para a área autenticada.
* O menu de serviços da conta deve ser apresentado.

---

## LOGIN002 — Tentar realizar login com senha inválida

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* Deve existir um usuário cadastrado.

### Passos

1. Acessar a página inicial.
2. Informar um nome de usuário válido.
3. Informar uma senha incorreta.
4. Clicar no botão de login.

### Resultado esperado

* O usuário não deve ser autenticado.
* O sistema deve apresentar uma mensagem de erro.

---

## LOGIN003 — Tentar realizar login com usuário inexistente

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Passos

1. Acessar a página inicial.
2. Informar um nome de usuário não cadastrado.
3. Informar uma senha qualquer.
4. Clicar no botão de login.

### Resultado esperado

* O login não deve ser realizado.
* O sistema deve apresentar uma mensagem de erro.

---

## LOGIN004 — Tentar realizar login com os campos vazios

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Passos

1. Acessar a página inicial.
2. Não preencher o nome de usuário.
3. Não preencher a senha.
4. Clicar no botão de login.

### Resultado esperado

* O login não deve ser realizado.
* O sistema deve informar que o nome de usuário e a senha são obrigatórios.

---

## LOGIN005 — Realizar logout

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.

### Passos

1. Acessar a área autenticada.
2. Clicar na opção de logout.

### Resultado esperado

* A sessão deve ser encerrada.
* O usuário deve ser direcionado para a página inicial.
* As funcionalidades restritas não devem permanecer acessíveis.

---

# Contas

## ACCOUNT001 — Visualizar as contas disponíveis

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* O usuário deve possuir pelo menos uma conta.

### Passos

1. Acessar a visão geral das contas.
2. Localizar a tabela de contas.

### Resultado esperado

* O sistema deve apresentar as contas vinculadas ao usuário.
* O número da conta deve ser exibido.
* O saldo disponível deve ser exibido.

---

## ACCOUNT002 — Visualizar os detalhes de uma conta

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* Deve existir uma conta disponível.

### Passos

1. Acessar a visão geral das contas.
2. Clicar no número de uma conta.

### Resultado esperado

* O sistema deve apresentar os detalhes da conta selecionada.
* O número da conta deve ser exibido.
* O tipo da conta deve ser exibido.
* O saldo deve ser apresentado.

---

## ACCOUNT003 — Consultar o histórico de transações

**Prioridade:** Média
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* A conta selecionada deve possuir movimentações.

### Passos

1. Acessar os detalhes de uma conta.
2. Localizar a seção de transações.
3. Consultar as movimentações disponíveis.

### Resultado esperado

* O sistema deve apresentar as transações da conta.
* Cada movimentação deve apresentar informações como data, descrição e valor.

---

# Transferências

## TRANSFER001 — Realizar transferência entre contas

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* O usuário deve possuir pelo menos duas contas disponíveis.

### Passos

1. Acessar a funcionalidade de transferência.
2. Informar um valor válido.
3. Selecionar a conta de origem.
4. Selecionar uma conta de destino diferente.
5. Confirmar a transferência.

### Resultado esperado

* A transferência deve ser processada.
* O sistema deve apresentar uma mensagem de confirmação.
* O valor e as contas utilizadas devem ser apresentados corretamente.

---

## TRANSFER002 — Tentar transferir sem informar o valor

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.

### Passos

1. Acessar a funcionalidade de transferência.
2. Não preencher o campo de valor.
3. Selecionar as contas de origem e destino.
4. Confirmar a transferência.

### Resultado esperado

* A transferência não deve ser concluída corretamente.
* O sistema deve validar a ausência do valor.

---

## TRANSFER003 — Tentar transferir um valor inválido

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Dados possíveis

* Valor negativo
* Valor igual a zero
* Texto
* Caracteres especiais

### Passos

1. Acessar a funcionalidade de transferência.
2. Informar um valor inválido.
3. Selecionar as contas.
4. Confirmar a transferência.

### Resultado esperado

* A transferência não deve ser concluída.
* O sistema deve apresentar uma validação adequada.

---

## TRANSFER004 — Tentar transferir para a mesma conta de origem

**Prioridade:** Média
**Tipo:** Regra de negócio
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.

### Passos

1. Acessar a funcionalidade de transferência.
2. Informar um valor válido.
3. Selecionar a mesma conta como origem e destino.
4. Confirmar a transferência.

### Resultado esperado

* O sistema deve impedir a operação ou apresentar uma validação.
* Nenhum saldo deve ser alterado indevidamente.

---

# Pagamento de Contas

## BILLPAY001 — Realizar pagamento com dados válidos

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* Deve existir uma conta disponível para pagamento.

### Passos

1. Acessar a funcionalidade de pagamento.
2. Informar o nome do beneficiário.
3. Informar o endereço.
4. Informar a cidade.
5. Informar o estado.
6. Informar o CEP.
7. Informar o telefone.
8. Informar o número da conta.
9. Confirmar o número da conta.
10. Informar um valor válido.
11. Selecionar a conta de origem.
12. Confirmar o pagamento.

### Resultado esperado

* O pagamento deve ser realizado.
* O sistema deve apresentar uma confirmação.
* O beneficiário e o valor devem ser exibidos corretamente.

---

## BILLPAY002 — Tentar realizar pagamento sem preencher os campos obrigatórios

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Passos

1. Acessar a funcionalidade de pagamento.
2. Não preencher os campos do formulário.
3. Clicar no botão de pagamento.

### Resultado esperado

* O pagamento não deve ser concluído.
* O sistema deve apresentar mensagens nos campos obrigatórios.

---

## BILLPAY003 — Informar números de conta diferentes

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Passos

1. Preencher os dados do beneficiário.
2. Informar um número de conta.
3. Informar um número diferente no campo de confirmação.
4. Preencher o valor.
5. Confirmar o pagamento.

### Resultado esperado

* O pagamento não deve ser concluído.
* O sistema deve informar que os números das contas não correspondem.

---

## BILLPAY004 — Tentar realizar pagamento com valor inválido

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Dados possíveis

* Valor negativo
* Valor igual a zero
* Texto
* Campo vazio

### Passos

1. Preencher os dados obrigatórios.
2. Informar um valor inválido.
3. Confirmar o pagamento.

### Resultado esperado

* O pagamento não deve ser concluído.
* O sistema deve apresentar uma validação adequada.

---

# Solicitação de Empréstimo

## LOAN001 — Solicitar empréstimo com dados válidos

**Prioridade:** Alta
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.
* Deve existir uma conta disponível.

### Passos

1. Acessar a funcionalidade de empréstimo.
2. Informar um valor de empréstimo válido.
3. Informar um valor de entrada válido.
4. Selecionar uma conta.
5. Enviar a solicitação.

### Resultado esperado

* A solicitação deve ser processada.
* O sistema deve apresentar o resultado da análise.
* Os valores informados devem ser apresentados corretamente.

---

## LOAN002 — Solicitar empréstimo com valor de entrada insuficiente

**Prioridade:** Média
**Tipo:** Regra de negócio
**Automação:** Planejada

### Passos

1. Acessar a funcionalidade de empréstimo.
2. Informar um valor de empréstimo.
3. Informar um valor de entrada insuficiente.
4. Selecionar uma conta.
5. Enviar a solicitação.

### Resultado esperado

* A solicitação deve ser rejeitada.
* O sistema deve apresentar o motivo da rejeição.

---

## LOAN003 — Tentar solicitar empréstimo com campos vazios

**Prioridade:** Alta
**Tipo:** Negativo
**Automação:** Planejada

### Passos

1. Acessar a funcionalidade de empréstimo.
2. Não informar o valor solicitado.
3. Não informar o valor da entrada.
4. Enviar a solicitação.

### Resultado esperado

* A solicitação não deve ser concluída.
* O sistema deve validar os campos obrigatórios.

---

# Atualização de Perfil

## PROFILE001 — Atualizar os dados pessoais com informações válidas

**Prioridade:** Média
**Tipo:** Positivo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.

### Passos

1. Acessar a funcionalidade de atualização de perfil.
2. Alterar os dados permitidos.
3. Clicar no botão de atualização.

### Resultado esperado

* Os dados devem ser atualizados.
* O sistema deve apresentar uma mensagem de confirmação.
* As novas informações devem permanecer salvas.

---

## PROFILE002 — Tentar atualizar o perfil removendo campos obrigatórios

**Prioridade:** Média
**Tipo:** Negativo
**Automação:** Planejada

### Pré-condições

* O usuário deve estar autenticado.

### Passos

1. Acessar a atualização de perfil.
2. Apagar o conteúdo de um ou mais campos obrigatórios.
3. Clicar no botão de atualização.

### Resultado esperado

* A atualização não deve ser concluída.
* O sistema deve apresentar mensagens de validação.

---

## PROFILE003 — Validar persistência dos dados atualizados

**Prioridade:** Média
**Tipo:** Persistência
**Automação:** Planejada

### Pré-condições

* O usuário deve ter atualizado o perfil anteriormente.

### Passos

1. Atualizar um dado do perfil.
2. Sair da página.
3. Acessar novamente a atualização de perfil.

### Resultado esperado

* O dado atualizado deve continuar sendo apresentado.
* O sistema não deve restaurar indevidamente o valor anterior.

---

# Resumo dos Casos de Teste

| Funcionalidade        | Quantidade |
| --------------------- | ---------: |
| Cadastro              |          5 |
| Login e logout        |          5 |
| Contas                |          3 |
| Transferências        |          4 |
| Pagamento de contas   |          4 |
| Empréstimos           |          3 |
| Atualização de perfil |          3 |
| **Total**             |     **27** |

---

# Status

| Status             | Significado                            |
| ------------------ | -------------------------------------- |
| Não iniciado       | O teste ainda não foi desenvolvido     |
| Em desenvolvimento | A automação está sendo implementada    |
| Automatizado       | O teste foi implementado               |
| Aprovado           | O teste executou com sucesso           |
| Reprovado          | O teste identificou uma falha          |
| Bloqueado          | O teste não pôde ser executado         |
| Em análise         | O comportamento está sendo investigado |

---

# Observações

* Usuários utilizados na automação deverão possuir nomes únicos para evitar conflitos de cadastro.
* A massa de teste deverá ser armazenada em arquivos localizados na pasta `cypress/fixtures`.
* Dados dinâmicos poderão ser gerados durante a execução.
* Screenshots e vídeos deverão ser utilizados como evidências das falhas.
* Comportamentos inesperados deverão ser registrados no documento de defeitos.
* Os resultados observados durante a implementação poderão gerar ajustes nos casos de teste.
