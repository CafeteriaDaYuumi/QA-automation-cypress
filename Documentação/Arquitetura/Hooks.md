# Arquitetura - Hooks

## Objetivo

Hooks controlam a preparação e finalização dos testes.

São utilizados para evitar repetição de código.

---

# Hooks Utilizados

## before()

Executado uma única vez antes da suíte.

---

## beforeEach()

Executado antes de cada teste.

Utilizado para:

- acessar páginas
- limpar sessão
- carregar fixtures

---

## afterEach()

Executado após cada teste.

Utilizado para:

- capturar evidências
- limpeza

---

## after()

Executado ao final da suíte.

---

# Estrutura

```javascript
describe('', () => {

    before(() => {})

    beforeEach(() => {})

    afterEach(() => {})

    after(() => {})

})
```

---

# Regras

- Evitar lógica complexa.
- Não criar dependência entre testes.
- Cada teste deve ser independente.