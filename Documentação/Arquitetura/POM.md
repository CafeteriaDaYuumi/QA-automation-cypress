# Arquitetura - Page Object Model (POM)

## Objetivo

Este projeto utiliza o padrão **Page Object Model (POM)** para organizar a automação de testes.

O objetivo é separar:

- Elementos da interface
- Métodos de interação
- Casos de teste

Essa abordagem reduz duplicação de código e facilita a manutenção da suíte.

---

# Estrutura

```
cypress/

pages/
    HomePage.js
    LoginPage.js
    RegisterPage.js
```

Cada página representa uma tela do sistema.

---

# Estrutura de uma Page

Cada Page Object deve possuir:

- URL da página
- Seletores
- Métodos

Exemplo:

```javascript
class LoginPage {

    elements = {
        username: 'input[name="username"]',
        password: 'input[name="password"]',
        loginButton: 'input[value="Log In"]'
    }

    visit() {
        cy.visit('/')
    }

    login(username, password){
        ...
    }

}
```

---

# Regras

- Nunca utilizar comandos do Cypress diretamente nos testes.
- Toda interação com a interface deve ocorrer através dos métodos da Page.
- Seletores devem permanecer exclusivamente na Page.
- Evitar lógica de negócio dentro da Page.

---

# Benefícios

- Reutilização
- Manutenção simplificada
- Menor acoplamento
- Maior legibilidade