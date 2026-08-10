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

## Dados dinâmicos

As Fixtures devem armazenar a massa de teste base utilizada pelos cenários.

Quando uma funcionalidade exigir dados únicos, somente os campos que precisam
de unicidade devem ser gerados dinamicamente durante a execução.

No fluxo de cadastro, por exemplo, o `username` deve ser gerado
dinamicamente para evitar conflitos com usuários já existentes na aplicação.

Os demais dados podem permanecer definidos na Fixture quando não houver
necessidade de serem alterados entre as execuções.

### Dados criados durante a execução

Quando um teste criar um registro que será utilizado posteriormente dentro
do fluxo, os dados efetivamente utilizados devem ser armazenados após a
criação bem-sucedida.

No cadastro de usuário:

```text
Fixture
   ↓
Dados base
   ↓
Username dinâmico
   ↓
Cadastro
   ↓
Usuário criado
   ↓
Dados armazenados