# Arquitetura - Page Object Model (POM)

## Objetivo

Este projeto utiliza o padrão **Page Object Model (POM)** para organizar a automação de testes.

O objetivo é separar:

- Elementos da interface
- Seletores
- Métodos de interação
- Casos de teste

Essa abordagem reduz a duplicação de código e facilita a manutenção da suíte de testes.

---

# Estrutura

```text
cypress/

pages/
    HomePage.js
    LoginPage.js
    RegisterPage.js
    AccountsPage.js
```

Cada arquivo representa uma página ou contexto funcional da aplicação.

---

# Organização

Os Page Objects são responsáveis por centralizar os elementos utilizados durante a interação com a aplicação.

Os testes devem utilizar os métodos disponibilizados pelos Page Objects sempre que possível.

A estrutura padrão utiliza:

```text
Page Object
    ↓
setSelectors()
    ↓
Aliases com .as()
    ↓
Métodos de interação
    ↓
Teste
```

---

# Seletores

Os seletores devem permanecer centralizados dentro dos Page Objects.

O projeto utiliza aliases do Cypress através do `.as()` para armazenar os elementos utilizados durante o teste.

Exemplo:

```javascript
setSelectors() {
  cy.get('input[name="username"]').as('username')
  cy.get('input[name="password"]').as('password')
  cy.get('input[type="submit"][value="Log In"]').as('loginButton')
}
```

Os métodos utilizam os aliases definidos:

```javascript
login(user) {
  cy.get('@username').clear().type(user.username)
  cy.get('@password').clear().type(user.password)
  cy.get('@loginButton').click()
}
```

---

# Page Objects

## HomePage

Responsável pelas interações relacionadas à página inicial.

### Responsabilidades

- Acessar a página inicial.
- Acessar a página de cadastro.
- Realizar logout.

Exemplo:

```javascript
class HomePage {

  visit() {
    cy.visit('/index.htm')
  }

  accessRegister() {
    cy.contains('Register').click()
  }

  setSelectors() {
    cy.get('a[href="logout.htm"]').as('logout')
  }

  logout() {
    cy.get('@logout').click()
  }

}

export default new HomePage()
```

---

## LoginPage

Responsável pelas interações relacionadas ao login.

### Responsabilidades

- Centralizar o campo de usuário.
- Centralizar o campo de senha.
- Centralizar o botão de login.
- Preencher as credenciais.
- Realizar o login.
- Submeter o formulário.

Exemplo:

```javascript
class LoginPage {

  setSelectors() {
    cy.get('input[name="username"]').as('username')
    cy.get('input[name="password"]').as('password')
    cy.get('input[type="submit"][value="Log In"]').as('loginButton')
  }

  login(user) {
    cy.get('@username').clear().type(user.username)
    cy.get('@password').clear().type(user.password)
    cy.get('@loginButton').click()
  }

  submit() {
    cy.get('@loginButton').click()
  }

}

export default new LoginPage()
```

---

## RegisterPage

Responsável pelas interações relacionadas ao cadastro de usuário.

### Responsabilidades

- Centralizar os campos do cadastro.
- Centralizar o botão de registro.
- Preencher os dados do usuário.
- Realizar o cadastro.

Exemplo:

```javascript
class RegisterPage {

  setSelectors() {
    cy.get('#customer.firstName').as('firstName')
    cy.get('#customer.lastName').as('lastName')
    cy.get('#customer.address.street').as('address')
    cy.get('#customer.address.city').as('city')
    cy.get('#customer.address.state').as('state')
    cy.get('#customer.address.zipCode').as('zipCode')
    cy.get('#customer.phoneNumber').as('phone')
    cy.get('#customer.ssn').as('ssn')
    cy.get('#customer.username').as('username')
    cy.get('#customer.password').as('password')
    cy.get('#repeatedPassword').as('confirmPassword')
    cy.get('input[type="submit"][value="Register"]').as('registerButton')
  }

  register(user) {
    cy.get('@firstName').clear().type(user.firstName)
    cy.get('@lastName').clear().type(user.lastName)
    cy.get('@address').clear().type(user.address)
    cy.get('@city').clear().type(user.city)
    cy.get('@state').clear().type(user.state)
    cy.get('@zipCode').clear().type(user.zipCode)
    cy.get('@phone').clear().type(user.phone)
    cy.get('@ssn').clear().type(user.ssn)
    cy.get('@username').clear().type(user.username)
    cy.get('@password').clear().type(user.password)
    cy.get('@confirmPassword').clear().type(user.password)
    cy.get('@registerButton').click()
  }

}

export default new RegisterPage()
```

---

## AccountsPage

Responsável pelas interações relacionadas às contas do usuário.

### Responsabilidades

- Centralizar a tabela de contas.
- Centralizar os links das contas.
- Acessar uma conta.
- Acessar uma transação.

Exemplo:

```javascript
class AccountsPage {

  setSelectors() {
    cy.get('#accountTable tbody tr a').as('accountLink')
    cy.get('#accountTable').as('accountTable')
  }

  accessAccount() {
    cy.get('@accountLink').first().click()
  }

  accessTransaction() {
    cy.get('@transactionLink').first().click()
  }

}

export default new AccountsPage()
```

---

# Uso dos Page Objects

Os testes devem utilizar os Page Objects para executar as ações da interface.

Exemplo:

```javascript
HomePage.visit()

LoginPage.setSelectors()

LoginPage.login(user)

AccountsPage.setSelectors()

AccountsPage.accessAccount()
```

O teste deve concentrar-se no **cenário e nas validações**, enquanto os Page Objects concentram as interações com a interface.

---

# Regras

- Interações com elementos da interface devem ser realizadas através dos Page Objects.
- Seletores devem permanecer centralizados nos Page Objects.
- Utilizar `.as()` para criar aliases dos elementos reutilizados.
- Os testes não devem duplicar seletores já definidos nos Page Objects.
- Assertions relacionadas ao comportamento esperado podem permanecer nos testes.
- Métodos dos Page Objects devem representar ações da aplicação.
- Evitar lógica de negócio dentro dos Page Objects.
- Evitar seletores excessivamente específicos quando existir uma alternativa mais estável.
- Cada Page Object deve possuir responsabilidade relacionada a uma página ou contexto funcional.
- Não criar métodos ou seletores que não sejam utilizados pela automação.
- Não utilizar seletores diretamente nos testes quando o elemento já estiver centralizado em um Page Object.

---

# Organização das responsabilidades

A divisão de responsabilidades deve seguir:

```text
Teste
│
├── Cenário
├── Dados
├── Assertions
└── Evidências
        │
        ↓
Page Object
│
├── Seletores
├── Aliases
└── Métodos de interação
        │
        ↓
Aplicação
```

---

# Benefícios

- Reutilização de código.
- Menor duplicação de seletores.
- Seletores centralizados.
- Manutenção simplificada.
- Maior legibilidade dos testes.
- Menor acoplamento entre testes e interface.
- Organização da automação por contexto funcional.
- Facilidade para alterar seletores sem modificar todos os testes.