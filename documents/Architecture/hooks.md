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

## Regra de utilização

Hooks devem ser utilizados somente quando houver uma necessidade
real de preparação ou limpeza compartilhada.

Não utilizar hooks apenas para reduzir algumas linhas de um teste.

Preferir:
- before() para preparação única da suíte;
- beforeEach() para preparação necessária a cada teste;
- afterEach() para limpeza ou evidências;
- after() para finalização da suíte.

---

# Regras

- Evitar lógica complexa.
- Não criar dependência entre testes.
- Cada teste deve ser independente.