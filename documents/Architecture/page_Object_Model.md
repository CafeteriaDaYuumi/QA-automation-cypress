# Page Object Model

## Objetivo

O projeto utiliza Page Object Model (POM) para separar as interações com a interface dos cenários de teste.

A responsabilidade é dividida entre:

```text
Teste
  ↓
Page Object
  ↓
Aplicação
```

O teste deve concentrar:

- preparação do cenário;
- dados;
- assertions;
- evidências.

O Page Object deve concentrar:

- seletores;
- elementos;
- ações;
- fluxos reutilizáveis de interação.

## Page Objects atuais

| Page Object | Responsabilidade |
|---|---|
| `HomePage.js` | Página inicial, acesso ao cadastro e logout |
| `RegisterPage.js` | Campos e ações de cadastro |
| `LoginPage.js` | Campos e ações de login |
| `AccountsPage.js` | Contas e histórico |
| `TransferPage.js` | Formulário e resultado de transferências |

## Padrão utilizado

Os Page Objects atuais utilizam **getters** para retornar elementos Cypress.

Exemplo conceitual:

```javascript
get username() {
  return cy.get('[name="customer.username"]')
}
```

As ações são implementadas utilizando esses elementos:

```javascript
fillUsername(username) {
  this.username.type(username)
}
```

## Responsabilidades

### Page Object

Pode conter:

- seletores;
- getters;
- métodos de interação;
- fluxos de interação reutilizáveis.

### Teste

Deve conter:

- descrição do cenário;
- massa utilizada;
- execução das ações;
- assertions;
- screenshots/evidências.

## Regra importante

Não documentar uma arquitetura diferente da utilizada no código.

O projeto atual **não utiliza `setSelectors()` com aliases `.as()` como padrão**. O padrão atual é baseado em getters.

## Manutenção

Quando um seletor mudar, a alteração deve ser feita no Page Object correspondente sempre que o elemento já estiver centralizado nele.
