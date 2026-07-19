# Massa de Teste

## Projeto

**Automação de Testes Web com Cypress**

**Aplicação:** ParaBank
**Ferramenta:** Cypress
**Linguagem:** JavaScript
**Tipo de teste:** End-to-End — E2E

---

# Objetivo

Este documento define as massas de teste que serão utilizadas na automação dos principais fluxos funcionais da aplicação ParaBank.

As massas foram organizadas para permitir a execução de cenários positivos, negativos, validações de campos obrigatórios e regras de negócio.

Os dados apresentados são fictícios e destinados exclusivamente ao ambiente de demonstração da aplicação.

---

# Diretrizes Gerais

* Não utilizar dados pessoais reais.
* Não utilizar documentos reais.
* Não utilizar senhas usadas em serviços pessoais.
* Gerar nomes de usuário únicos para cada execução de cadastro.
* Manter dados reutilizáveis na pasta `cypress/fixtures`.
* Utilizar dados dinâmicos quando houver risco de duplicidade.
* Separar massas válidas, inválidas e de limite.
* Não registrar credenciais sensíveis diretamente no repositório.
* Validar o comportamento real da aplicação antes de classificar divergências como defeitos.

---

# Organização das Massas

Estrutura sugerida:

```text
cypress/
└── fixtures/
    ├── users.json
    ├── registration.json
    ├── login.json
    ├── transfer.json
    ├── billPay.json
    ├── loan.json
    └── profile.json
```

---

# Usuário Base

Este usuário poderá ser utilizado em cenários que necessitam de autenticação, desde que esteja previamente cadastrado e disponível no ambiente.

| Campo                | Valor                   |
| -------------------- | ----------------------- |
| Nome                 | Victor                  |
| Sobrenome            | Teste                   |
| Endereço             | Rua das Automacoes, 100 |
| Cidade               | Betim                   |
| Estado               | MG                      |
| CEP                  | 32600-000               |
| Telefone             | 31999990000             |
| Identificação        | 987654321               |
| Nome de usuário      | Gerado dinamicamente    |
| Senha                | Teste@123               |
| Confirmação da senha | Teste@123               |

---

# Cadastro de Usuário

## Massa válida

| Campo                | Valor                        |
| -------------------- | ---------------------------- |
| Nome                 | Victor                       |
| Sobrenome            | Cypress                      |
| Endereço             | Rua dos Testes, 150          |
| Cidade               | Betim                        |
| Estado               | MG                           |
| CEP                  | 32600-100                    |
| Telefone             | 31988887777                  |
| Identificação        | 123456789                    |
| Nome de usuário      | `victor_cypress_<timestamp>` |
| Senha                | Cypress@123                  |
| Confirmação da senha | Cypress@123                  |

O nome de usuário deverá ser gerado dinamicamente para evitar conflito com cadastros anteriores.

Exemplo:

```javascript
const username = `victor_cypress_${Date.now()}`
```

---

## Cadastro com campos vazios

| Campo                | Valor |
| -------------------- | ----- |
| Nome                 | Vazio |
| Sobrenome            | Vazio |
| Endereço             | Vazio |
| Cidade               | Vazio |
| Estado               | Vazio |
| CEP                  | Vazio |
| Telefone             | Vazio |
| Identificação        | Vazio |
| Nome de usuário      | Vazio |
| Senha                | Vazio |
| Confirmação da senha | Vazio |

### Resultado esperado

* O cadastro não deverá ser concluído.
* Os campos obrigatórios deverão apresentar validação.

---

## Cadastro com senhas diferentes

| Campo                | Valor                       |
| -------------------- | --------------------------- |
| Nome de usuário      | `usuario_senha_<timestamp>` |
| Senha                | Cypress@123                 |
| Confirmação da senha | Cypress@456                 |

### Resultado esperado

* O cadastro deverá ser rejeitado.
* O sistema deverá informar que as senhas não correspondem.

---

## Cadastro com usuário já existente

| Campo                | Valor                          |
| -------------------- | ------------------------------ |
| Nome de usuário      | Usuário previamente cadastrado |
| Senha                | Cypress@123                    |
| Confirmação da senha | Cypress@123                    |

### Pré-condição

O nome de usuário deverá ter sido cadastrado anteriormente.

### Resultado esperado

* O sistema deverá rejeitar o cadastro.
* Uma mensagem sobre usuário já existente deverá ser apresentada.

---

## Dados inválidos para cadastro

| Campo           | Massa inválida                  |
| --------------- | ------------------------------- |
| Nome            | `123456`                        |
| Sobrenome       | `@#$%`                          |
| CEP             | `ABCDEF`                        |
| Telefone        | `telefone`                      |
| Identificação   | `documento`                     |
| Nome de usuário | Espaços ou caracteres especiais |
| Senha           | Vazio                           |
| Confirmação     | Diferente da senha              |

Esses dados deverão ser utilizados para avaliar as validações reais da aplicação.

Caso o sistema aceite informações claramente inválidas, o comportamento deverá ser analisado e poderá ser registrado como defeito.

---

# Login

## Login válido

| Campo           | Valor                          |
| --------------- | ------------------------------ |
| Nome de usuário | Usuário previamente cadastrado |
| Senha           | Senha correspondente           |

### Resultado esperado

* O usuário deverá ser autenticado.
* A área interna deverá ser apresentada.

---

## Login com senha inválida

| Campo           | Valor              |
| --------------- | ------------------ |
| Nome de usuário | Usuário válido     |
| Senha           | SenhaIncorreta@999 |

### Resultado esperado

* O login deverá ser rejeitado.
* O sistema deverá apresentar mensagem de erro.

---

## Login com usuário inexistente

| Campo           | Valor                             |
| --------------- | --------------------------------- |
| Nome de usuário | `usuario_inexistente_<timestamp>` |
| Senha           | Teste@123                         |

### Resultado esperado

* O login deverá ser rejeitado.
* Nenhuma sessão deverá ser criada.

---

## Login com campos vazios

| Campo           | Valor |
| --------------- | ----- |
| Nome de usuário | Vazio |
| Senha           | Vazio |

### Resultado esperado

* O login não deverá ser concluído.
* O sistema deverá apresentar validação.

---

## Combinações de login

| Cenário             | Usuário  | Senha    |
| ------------------- | -------- | -------- |
| Credenciais válidas | Válido   | Válida   |
| Senha incorreta     | Válido   | Inválida |
| Usuário inexistente | Inválido | Qualquer |
| Usuário vazio       | Vazio    | Válida   |
| Senha vazia         | Válido   | Vazio    |
| Ambos vazios        | Vazio    | Vazio    |

---

# Contas

As contas disponíveis serão obtidas dinamicamente após a autenticação.

## Massa necessária

| Dado             | Origem                 |
| ---------------- | ---------------------- |
| Número da conta  | Interface da aplicação |
| Tipo da conta    | Interface da aplicação |
| Saldo            | Interface da aplicação |
| Saldo disponível | Interface da aplicação |
| Transações       | Histórico da conta     |

### Orientação

Não utilizar números de conta fixos quando estes puderem variar entre usuários ou execuções.

Exemplo:

```javascript
cy.get('table tbody tr')
  .first()
  .find('a')
  .invoke('text')
  .then((accountNumber) => {
    cy.wrap(accountNumber.trim()).as('accountNumber')
  })
```

---

# Transferência entre Contas

## Transferência válida

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Valor            | 100.00                    |
| Conta de origem  | Primeira conta disponível |
| Conta de destino | Segunda conta disponível  |

### Pré-condição

O usuário deverá possuir pelo menos duas contas.

### Resultado esperado

* A transferência deverá ser concluída.
* O valor deverá ser exibido na confirmação.

---

## Valores válidos

| Tipo                |    Valor |
| ------------------- | -------: |
| Valor inteiro       |      100 |
| Valor decimal       |   150.50 |
| Valor baixo         |     1.00 |
| Valor intermediário |   500.00 |
| Valor elevado       | 10000.00 |

Valores elevados deverão ser utilizados apenas para observar o comportamento da aplicação, sem assumir antecipadamente que a operação será aceita.

---

## Valores inválidos

| Tipo                 | Valor    |
| -------------------- | -------- |
| Campo vazio          | `""`     |
| Zero                 | `0`      |
| Valor negativo       | `-100`   |
| Texto                | `teste`  |
| Caracteres especiais | `@#$%`   |
| Separador inválido   | `100,50` |
| Espaços              | `"   "`  |

### Resultado esperado

* A operação deverá ser impedida ou rejeitada.
* Nenhum saldo deverá ser alterado indevidamente.

---

## Transferência para a mesma conta

| Campo            | Valor   |
| ---------------- | ------- |
| Valor            | 100.00  |
| Conta de origem  | Conta A |
| Conta de destino | Conta A |

### Resultado esperado

* A transferência deverá ser impedida ou rejeitada.
* O saldo deverá permanecer inalterado.

---

# Pagamento de Contas

## Dados válidos do beneficiário

| Campo                | Valor                     |
| -------------------- | ------------------------- |
| Nome do beneficiário | Empresa Teste Ltda        |
| Endereço             | Avenida Central, 500      |
| Cidade               | Belo Horizonte            |
| Estado               | MG                        |
| CEP                  | 30100-000                 |
| Telefone             | 3133334444                |
| Número da conta      | 123456                    |
| Confirmação da conta | 123456                    |
| Valor                | 250.00                    |
| Conta de origem      | Primeira conta disponível |

---

## Pagamento com campos vazios

| Campo                | Valor |
| -------------------- | ----- |
| Nome do beneficiário | Vazio |
| Endereço             | Vazio |
| Cidade               | Vazio |
| Estado               | Vazio |
| CEP                  | Vazio |
| Telefone             | Vazio |
| Número da conta      | Vazio |
| Confirmação da conta | Vazio |
| Valor                | Vazio |

### Resultado esperado

* O pagamento não deverá ser processado.
* Os campos obrigatórios deverão apresentar validação.

---

## Números de conta divergentes

| Campo                | Valor  |
| -------------------- | ------ |
| Número da conta      | 123456 |
| Confirmação da conta | 654321 |

### Resultado esperado

* O pagamento deverá ser rejeitado.
* O sistema deverá informar que as contas não correspondem.

---

## Valores de pagamento inválidos

| Tipo                 | Valor       |
| -------------------- | ----------- |
| Campo vazio          | `""`        |
| Zero                 | `0`         |
| Negativo             | `-50`       |
| Texto                | `pagamento` |
| Caracteres especiais | `@#%`       |
| Apenas espaços       | `"   "`     |

---

## Dados inválidos do beneficiário

| Campo    | Valor inválido |
| -------- | -------------- |
| Nome     | `123456`       |
| Endereço | `@#$%`         |
| Cidade   | `99999`        |
| Estado   | `123`          |
| CEP      | `CEP`          |
| Telefone | `telefone`     |
| Conta    | `conta`        |

Esses valores deverão ser usados para identificar ausência ou presença de validações.

---

# Solicitação de Empréstimo

## Solicitação válida

| Campo            |                     Valor |
| ---------------- | ------------------------: |
| Valor solicitado |                   1000.00 |
| Entrada          |                    200.00 |
| Conta de origem  | Primeira conta disponível |

### Resultado esperado

* O sistema deverá processar a solicitação.
* O resultado da análise deverá ser apresentado.

A aprovação não deverá ser considerada obrigatória, pois depende das regras internas do ambiente.

---

## Entrada insuficiente

| Campo            |                     Valor |
| ---------------- | ------------------------: |
| Valor solicitado |                  10000.00 |
| Entrada          |                      1.00 |
| Conta de origem  | Primeira conta disponível |

### Resultado esperado

* O sistema poderá rejeitar a solicitação.
* O motivo deverá ser apresentado quando disponível.

---

## Valores inválidos de empréstimo

| Tipo                      | Valor solicitado | Entrada |
| ------------------------- | ---------------: | ------: |
| Campos vazios             |            Vazio |   Vazio |
| Valor zero                |                0 |       0 |
| Valor solicitado negativo |            -1000 |     200 |
| Entrada negativa          |             1000 |    -200 |
| Ambos negativos           |            -1000 |    -200 |
| Texto                     |            teste | entrada |
| Caracteres especiais      |              @#$ |     %&* |

### Resultado esperado

* A solicitação deverá ser impedida ou rejeitada.
* Nenhuma operação de empréstimo deverá ser criada indevidamente.

---

## Combinações para análise

| Valor solicitado | Entrada | Finalidade           |
| ---------------: | ------: | -------------------- |
|          1000.00 |  200.00 | Cenário positivo     |
|          5000.00 | 1000.00 | Valor intermediário  |
|         10000.00 |    1.00 | Entrada insuficiente |
|                0 |       0 | Valores zerados      |
|         -1000.00 | -100.00 | Valores negativos    |

---

# Atualização de Perfil

## Dados válidos para atualização

| Campo    | Valor atual         | Novo valor           |
| -------- | ------------------- | -------------------- |
| Endereço | Rua dos Testes, 150 | Avenida Cypress, 250 |
| Cidade   | Betim               | Belo Horizonte       |
| Estado   | MG                  | MG                   |
| CEP      | 32600-100           | 30100-000            |
| Telefone | 31988887777         | 31977776666          |

### Resultado esperado

* Os dados deverão ser atualizados.
* Os novos valores deverão permanecer após recarregar a página.

---

## Campos obrigatórios vazios

| Campo    | Valor |
| -------- | ----- |
| Endereço | Vazio |
| Cidade   | Vazio |
| Estado   | Vazio |
| CEP      | Vazio |
| Telefone | Vazio |

Os campos deverão ser testados individualmente e, quando necessário, em conjunto.

---

## Dados inválidos para perfil

| Campo    | Valor inválido |
| -------- | -------------- |
| Endereço | `@#$%`         |
| Cidade   | `123456`       |
| Estado   | `999`          |
| CEP      | `cep-invalido` |
| Telefone | `telefone`     |

### Resultado esperado

* O sistema deverá rejeitar os dados ou apresentar uma validação adequada.
* Informações inválidas não deverão substituir dados válidos.

---

# Dados de Limite

Os dados de limite serão utilizados para observar restrições de tamanho e comportamento da aplicação.

## Texto

| Categoria            | Valor                             |
| -------------------- | --------------------------------- |
| Um caractere         | `A`                               |
| Texto curto          | `Teste`                           |
| Texto médio          | `Automacao de testes com Cypress` |
| Texto longo          | String com 100 caracteres         |
| Texto muito longo    | String com 255 caracteres         |
| Espaços              | `"   "`                           |
| Caracteres especiais | `!@#$%¨&*()`                      |
| Acentuação           | `Automação São José`              |

---

## Valores numéricos

| Categoria       |       Valor |
| --------------- | ----------: |
| Negativo        |          -1 |
| Zero            |           0 |
| Mínimo positivo |        0.01 |
| Inteiro         |         100 |
| Decimal         |      100.50 |
| Elevado         | 99999999.99 |

---

# Dados Dinâmicos

## Nome de usuário único

```javascript
const timestamp = Date.now()
const username = `qa_cypress_${timestamp}`
```

---

## Identificação dinâmica

```javascript
const customerId = `${Date.now()}`.slice(-9)
```

---

## Telefone dinâmico

```javascript
const phone = `31${Date.now().toString().slice(-9)}`
```

---

## Dados completos dinâmicos

```javascript
const timestamp = Date.now()

const user = {
  firstName: 'Victor',
  lastName: 'Cypress',
  address: 'Rua dos Testes, 150',
  city: 'Betim',
  state: 'MG',
  zipCode: '32600100',
  phone: `31${timestamp.toString().slice(-9)}`,
  ssn: timestamp.toString().slice(-9),
  username: `qa_cypress_${timestamp}`,
  password: 'Cypress@123',
  confirmPassword: 'Cypress@123'
}
```

---

# Exemplo de Fixture de Cadastro

Arquivo sugerido:

```text
cypress/fixtures/registration.json
```

```json
{
  "validUser": {
    "firstName": "Victor",
    "lastName": "Cypress",
    "address": "Rua dos Testes, 150",
    "city": "Betim",
    "state": "MG",
    "zipCode": "32600100",
    "phone": "31988887777",
    "ssn": "123456789",
    "password": "Cypress@123",
    "confirmPassword": "Cypress@123"
  },
  "differentPasswords": {
    "password": "Cypress@123",
    "confirmPassword": "Cypress@456"
  },
  "invalidUser": {
    "firstName": "123456",
    "lastName": "@#$%",
    "zipCode": "ABCDEF",
    "phone": "telefone",
    "ssn": "documento"
  }
}
```

---

# Exemplo de Fixture de Login

Arquivo sugerido:

```text
cypress/fixtures/login.json
```

```json
{
  "validUser": {
    "username": "",
    "password": ""
  },
  "invalidPassword": {
    "username": "",
    "password": "SenhaIncorreta@999"
  },
  "nonexistentUser": {
    "username": "usuario_inexistente",
    "password": "Teste@123"
  },
  "emptyCredentials": {
    "username": "",
    "password": ""
  }
}
```

As credenciais válidas poderão ser preenchidas após o cadastro do usuário de teste ou fornecidas por variáveis de ambiente.

---

# Exemplo de Fixture de Transferência

Arquivo sugerido:

```text
cypress/fixtures/transfer.json
```

```json
{
  "validValues": [
    "1.00",
    "100.00",
    "150.50",
    "500.00"
  ],
  "invalidValues": [
    "",
    "0",
    "-100",
    "teste",
    "@#$%"
  ]
}
```

---

# Exemplo de Fixture de Pagamento

Arquivo sugerido:

```text
cypress/fixtures/billPay.json
```

```json
{
  "validPayee": {
    "name": "Empresa Teste Ltda",
    "address": "Avenida Central, 500",
    "city": "Belo Horizonte",
    "state": "MG",
    "zipCode": "30100000",
    "phone": "3133334444",
    "account": "123456",
    "verifyAccount": "123456",
    "amount": "250.00"
  },
  "differentAccounts": {
    "account": "123456",
    "verifyAccount": "654321"
  },
  "invalidAmounts": [
    "",
    "0",
    "-50",
    "pagamento",
    "@#%"
  ]
}
```

---

# Exemplo de Fixture de Empréstimo

Arquivo sugerido:

```text
cypress/fixtures/loan.json
```

```json
{
  "validLoan": {
    "amount": "1000.00",
    "downPayment": "200.00"
  },
  "insufficientDownPayment": {
    "amount": "10000.00",
    "downPayment": "1.00"
  },
  "invalidLoans": [
    {
      "amount": "",
      "downPayment": ""
    },
    {
      "amount": "0",
      "downPayment": "0"
    },
    {
      "amount": "-1000",
      "downPayment": "-200"
    },
    {
      "amount": "teste",
      "downPayment": "entrada"
    }
  ]
}
```

---

# Tratamento de Credenciais

Credenciais fixas não deverão ser publicadas diretamente no repositório quando forem consideradas sensíveis.

Poderão ser utilizadas variáveis de ambiente:

```javascript
Cypress.env('username')
Cypress.env('password')
```

Exemplo de execução:

```bash
npx cypress run --env username=usuario_teste,password=SenhaTeste123
```

No GitHub Actions, os dados poderão ser armazenados utilizando GitHub Secrets.

---

# Rastreabilidade

| Massa                      | Funcionalidades relacionadas                    |
| -------------------------- | ----------------------------------------------- |
| Usuário válido             | Cadastro, login, contas e logout                |
| Usuário inexistente        | Login negativo                                  |
| Usuário duplicado          | Cadastro negativo                               |
| Contas disponíveis         | Consulta, transferência, pagamento e empréstimo |
| Valores monetários válidos | Transferência, pagamento e empréstimo           |
| Valores inválidos          | Transferência, pagamento e empréstimo           |
| Dados de beneficiário      | Pagamento                                       |
| Dados de perfil            | Atualização de perfil                           |
| Dados dinâmicos            | Cadastro e execuções independentes              |

---

# Critérios para Validação da Massa

Uma massa será considerada adequada quando:

* Permitir a execução completa do cenário.
* Não utilizar dados reais.
* Produzir resultados reproduzíveis.
* Não gerar conflitos desnecessários entre execuções.
* Estiver alinhada ao caso de teste correspondente.
* For armazenada de forma organizada.
* Não expuser informações sensíveis.
* Permitir execução local e em CI/CD.

---

# Observações

* Usuários cadastrados no ParaBank podem permanecer registrados no ambiente por tempo indeterminado.
* O nome de usuário deverá ser dinâmico nos testes de cadastro.
* Números de conta deverão ser obtidos da interface sempre que possível.
* O comportamento do sistema diante de valores inválidos deverá ser documentado.
* Dados aceitos indevidamente poderão gerar registros de defeito.
* Massas poderão ser ajustadas após testes exploratórios.
* O documento deverá ser atualizado conforme novas funcionalidades forem adicionadas.
