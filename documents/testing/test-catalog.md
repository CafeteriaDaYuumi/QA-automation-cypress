# Catálogo de testes automatizados

## 1. Objetivo

Este documento cataloga os casos E2E identificados nos arquivos de `cypress/e2e/`. Os IDs e títulos foram extraídos dos testes existentes; as descrições de resultado esperado resumem o objetivo declarado no título e devem ser interpretadas em conjunto com as assertions efetivamente implementadas.

O catálogo não declara que todos os casos estão aprovados nem que as assertions atuais comprovam integralmente cada resultado. O estado de execução deve ser consultado nos resultados do Cypress ou nos relatórios do fluxo.

## 2. Convenção de identificação

Os casos utilizam um prefixo associado à funcionalidade e um número sequencial, por exemplo `REGISTER001` e `TRANSFER001`. Os IDs são identificadores documentais; devem permanecer únicos e sincronizados com o título do teste no código.

## 3. Resumo do catálogo

| Funcionalidade | Arquivo E2E | Quantidade de casos |
|---|---|---:|
| Contas | `cypress/e2e/accounts/accounts.cy.js` | 4 |
| Pagamento de contas | `cypress/e2e/billpay/billpay.cy.js` | 4 |
| Empréstimos | `cypress/e2e/loan/loan.cy.js` | 10 |
| Login e logout | `cypress/e2e/login/login.cy.js` | 5 |
| Perfil | `cypress/e2e/profile/profile.cy.js` | 5 |
| Cadastro | `cypress/e2e/register/register.cy.js` | 5 |
| Transferências | `cypress/e2e/transfer/transfer.cy.js` | 6 |
| **Total identificado** | | **39** |

A contagem corresponde aos casos declarados nos sete arquivos E2E identificados no pacote analisado. Ela não representa cobertura total da aplicação.

## 4. Contas

Arquivo: `cypress/e2e/accounts/accounts.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `ACCOUNT001` | Consultar as contas disponíveis | A lista de contas do cliente é exibida. |
| `ACCOUNT002` | Consultar os detalhes de uma conta | Os detalhes da conta selecionada são exibidos. |
| `ACCOUNT003` | Consultar o histórico de transações | O histórico de transações da conta é apresentado. |
| `ACCOUNT004` | Consultar os detalhes de uma transação | Os detalhes da transação selecionada são exibidos. |

## 5. Pagamento de contas

Arquivo: `cypress/e2e/billpay/billpay.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `BILLPAY001` | Realizar pagamento com dados válidos | O pagamento é processado e o resultado é apresentado. |
| `BILLPAY002` | Validar campos obrigatórios | O formulário identifica os campos obrigatórios não preenchidos. |
| `BILLPAY003` | Validar valores inválidos | A aplicação rejeita ou valida os valores inválidos conforme o cenário implementado. |
| `BILLPAY004` | Validar dados divergentes | A aplicação apresenta o comportamento esperado para os dados divergentes enviados. |

## 6. Empréstimos

Arquivo: `cypress/e2e/loan/loan.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `LOAN001` | Solicitar empréstimo com dados válidos | A solicitação é processada e o resultado é apresentado. |
| `LOAN002` | Solicitar empréstimo com entrada (`Down Payment`) igual a zero | A aplicação apresenta o resultado esperado para uma entrada igual a zero. |
| `LOAN003` | Negar empréstimo com entrada acima do saldo disponível | A solicitação é rejeitada ou sinalizada conforme a regra implementada. |
| `LOAN004` | Negar empréstimo sem fundos suficientes | A aplicação informa que não há fundos suficientes para a operação. |
| `LOAN005` | Não informar a entrada (`Down Payment`) | A aplicação valida o campo de entrada ausente. |
| `LOAN006` | Não informar o valor do empréstimo (`Loan Amount`) | A aplicação valida o valor do empréstimo ausente. |
| `LOAN007` | Informar entrada inválida | A aplicação valida ou rejeita a entrada inválida. |
| `LOAN008` | Informar valor de empréstimo inválido | A aplicação valida ou rejeita o valor inválido. |
| `LOAN009` | Informar entrada negativa | A aplicação valida ou rejeita o valor negativo. |
| `LOAN010` | Informar valor de empréstimo negativo | A aplicação valida ou rejeita o valor negativo. |

## 7. Login e logout

Arquivo: `cypress/e2e/login/login.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `LOGIN001` | Login com usuário criado no próprio fluxo | O usuário criado consegue autenticar-se. |
| `LOGIN002` | Login com senha inválida | A autenticação é recusada. |
| `LOGIN003` | Login com usuário inexistente | A autenticação é recusada. |
| `LOGIN004` | Login sem preencher os campos obrigatórios | A aplicação apresenta a validação correspondente. |
| `LOGIN005` | Logout após login realizado | A sessão é encerrada e a aplicação retorna ao estado esperado de usuário não autenticado. |

## 8. Perfil

Arquivo: `cypress/e2e/profile/profile.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `PROFILE001` | Atualizar todos os dados do perfil | Os dados submetidos são atualizados e o resultado é apresentado. |
| `PROFILE002` | Tentar atualizar com campos obrigatórios vazios | A aplicação impede ou valida a atualização incompleta. |
| `PROFILE003` | Validar formato do telefone | A aplicação apresenta o comportamento esperado para o formato de telefone testado. |
| `PROFILE004` | Validar formato do CEP | A aplicação apresenta o comportamento esperado para o formato de CEP testado. |
| `PROFILE005` | Verificar persistência após recarregar | Os dados atualizados permanecem após recarregar a página. |

## 9. Cadastro

Arquivo: `cypress/e2e/register/register.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `REGISTER001` | Cadastrar usuário com dados válidos | Um novo usuário é cadastrado com sucesso. |
| `REGISTER002` | Tentar cadastrar sem preencher campos obrigatórios | A aplicação apresenta validações para os campos obrigatórios. |
| `REGISTER003` | Tentar cadastrar com senhas diferentes | O cadastro é impedido quando as senhas não coincidem. |
| `REGISTER004` | Tentar cadastrar com username já existente | O cadastro duplicado é impedido e o usuário recebe o retorno correspondente. |
| `REGISTER005` | Validar mensagem de um campo obrigatório específico | A mensagem de validação esperada para o campo é apresentada. |

## 10. Transferências

Arquivo: `cypress/e2e/transfer/transfer.cy.js`

| ID | Cenário | Resultado esperado |
|---|---|---|
| `TRANSFER001` | Realizar transferência entre contas diferentes | A transferência é processada e o resultado é apresentado. |
| `TRANSFER002` | Tentar transferir sem informar valor | A aplicação impede a transferência sem valor informado. |
| `TRANSFER003` | Tentar transferir valor igual a zero | A aplicação rejeita ou valida o valor zero. |
| `TRANSFER004` | Tentar transferir valor negativo | A aplicação rejeita ou valida o valor negativo. |
| `TRANSFER005` | Tentar transferir valor não numérico | A aplicação rejeita ou valida o valor não numérico. |
| `TRANSFER006` | Tentar transferir para a mesma conta de origem | A aplicação impede a transferência para a mesma conta. |

## 11. Como interpretar este catálogo

Os títulos refletem os nomes dos casos no código. A coluna de resultado esperado é uma síntese documental, não uma substituição das assertions.

Para considerar um caso efetivamente validado, confira no teste:

1. Se a preparação dos dados foi concluída.
2. Se as ações executadas correspondem ao cenário descrito.
3. Se há assertions específicas que comprovam o resultado esperado.
4. Se a execução termina com o estado esperado.
5. Se uma execução repetida ou isolada produz resultado consistente, quando a estabilidade for relevante.

Se o título descreve uma regra, mas o teste não possui assertion que a comprove, o catálogo deve permanecer fiel ao objetivo do cenário e o teste deve ser registrado como candidato a melhoria. Não se deve afirmar que a regra foi validada apenas porque o teste existe.

## 12. Manutenção

Ao adicionar, remover ou renomear um caso:

- Atualize o ID e o título no código e neste catálogo.
- Preserve a unicidade dos IDs.
- Ajuste a contagem total.
- Descreva o comportamento esperado de forma objetiva.
- Verifique se as assertions realmente comprovam esse comportamento.
- Atualize a documentação da estratégia se a alteração mudar o escopo ou a abordagem de teste.
