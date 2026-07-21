# Convenções do Projeto

## Objetivo

Padronizar toda a estrutura do framework de automação.

---

# Estrutura de Pastas

```
cypress/

e2e/
pages/
fixtures/
support/
utils/
```

---

# Nome dos Arquivos

Pages

```
LoginPage.js
RegisterPage.js
HomePage.js
```

Testes

```
login.cy.js
register.cy.js
home.cy.js
```

Fixtures

```
login.json
registration.json
users.json
```

---

# Nome das Classes

Sempre utilizar PascalCase.

Exemplo:

```
LoginPage
RegisterPage
```

---

# Nome dos Métodos

Sempre utilizar camelCase.

Exemplo:

```
login()

register()

fillForm()

validatePage()
```

---

# Nome das Variáveis

Sempre utilizar camelCase.

```
firstName

userData

accountNumber
```

---

# Seletores

Prioridade:

1. id
2. data-testid
3. name
4. CSS
5. XPath (evitar)

---

# Estrutura dos Testes

Cada teste deve seguir o padrão:

```
Arrange

Act

Assert
```

---

# Versionamento

Seguir Semantic Versioning.

```
MAJOR.MINOR.PATCH
```

Exemplo:

```
0.1.0
0.2.0
1.0.0
```

---

# Commits

Seguir Conventional Commits.

Exemplos:

```
feat:

fix:

docs:

refactor:

test:

chore:
```

---

# Pull Requests

Todo Pull Request deve conter:

- Objetivo
- Alterações
- Evidências
- Checklist
- Issue relacionada

---

# Princípios

- Código limpo
- Reutilização
- Baixo acoplamento
- Alta legibilidade
- Facilidade de manutenção
- Independência entre testes