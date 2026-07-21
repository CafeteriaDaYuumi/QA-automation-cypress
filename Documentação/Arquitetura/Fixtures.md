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