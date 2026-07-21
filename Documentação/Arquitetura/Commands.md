# Arquitetura - Custom Commands

## Objetivo

Custom Commands são utilizados para encapsular ações repetitivas da aplicação.

Devem representar comportamentos reutilizáveis e não elementos específicos de uma página.

---

# Localização

```
cypress/
    support/
        commands.js
```

---

# Quando criar um Command

Criar Commands para:

- Login
- Logout
- Cadastro
- Reset da aplicação
- Criação de usuários
- Manipulação da API
- Ações reutilizadas por vários testes

---

# Quando NÃO criar

Não criar Commands para:

- Clicar em botão
- Digitar em campo
- Abrir página

Essas responsabilidades pertencem ao Page Object.

---

# Exemplo

```javascript
Cypress.Commands.add('login', (user) => {

})
```

---

# Regras

- Um Command deve executar apenas uma responsabilidade.
- Sempre retornar comandos do Cypress.
- Evitar dependências entre Commands.