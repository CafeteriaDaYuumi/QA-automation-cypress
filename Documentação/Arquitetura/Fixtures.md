# Arquitetura - Fixtures

## Objetivo

Fixtures armazenam dados utilizados durante os testes.

Elas evitam duplicação de informações e facilitam a manutenção.

---

# Estrutura

```
fixtures/

registration.json
login.json
accounts.json
users.json
```

---

# Organização

Cada arquivo representa um conjunto de dados.

Exemplo:

```
login.json
```

```json
{
    "validUser": {},
    "invalidUser": {}
}
```

---

# Regras

- Nunca armazenar informações sensíveis.
- Utilizar nomes descritivos.
- Separar massas por contexto.
- Evitar arquivos muito grandes.

---

# Convenções

✔ login.json

✔ registration.json

✔ transfer.json

❌ dados.json

❌ teste.json

---

# Benefícios

- Reutilização
- Organização
- Facilidade de manutenção

---

## Dados dinâmicos

Fixtures devem armazenar dados estáticos e reutilizáveis.

Dados que precisam ser únicos durante a execução, como usernames de cadastro,
devem ser gerados dinamicamente por uma função ou utilitário.

Exemplo:

```javascript
const username = `qa_cypress_${Date.now()}`