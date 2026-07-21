# Página de Cadastro (Register)

**Arquivo:** `register.md`

---

# Informações Gerais

| Campo | Valor |
|--------|-------|
| Página | Register |
| URL | `/register.htm` |
| Objetivo | Permitir o cadastro de novos usuários no sistema ParaBank. |
| Status | Em uso |
| Responsável | QA |

---

# Fluxos Disponíveis

- Cadastro de novo usuário.
- Retorno à página inicial.
- Login de usuário existente.
- Recuperação de senha.
- Navegação institucional.

---

# Estrutura da Página

## Topo

### Logo

| Item | Valor |
|------|-------|
| Tipo | Imagem |
| Classe | `.logo` |
| Ação | Retorna para Home |

---

### Menu Principal

| Nome | Tipo | Destino |
|------|------|----------|
| About Us | Link | about.htm |
| Services | Link | services.htm |
| Products | Link Externo | Parasoft |
| Locations | Link Externo | Parasoft |
| Admin Page | Link | admin.htm |

---

### Menu Superior

| Nome | Classe |
|------|---------|
| Home | `.home` |
| About | `.aboutus` |
| Contact | `.contact` |

---

# Painel de Login (Lateral)

## Formulário

| Campo | Tipo | Name |
|--------|------|------|
| Username | Input Text | username |
| Password | Password | password |
| Log In | Submit | - |

---

## Links

| Nome | Destino |
|-------|----------|
| Forgot login info? | lookup.htm |
| Register | register.htm |

---

# Formulário de Cadastro

## Informações Pessoais

| Campo | Tipo | ID | Name | Obrigatório |
|--------|------|----|------|-------------|
| First Name | Text | `customer.firstName` | `customer.firstName` | Sim |
| Last Name | Text | `customer.lastName` | `customer.lastName` | Sim |
| Address | Text | `customer.address.street` | `customer.address.street` | Sim |
| City | Text | `customer.address.city` | `customer.address.city` | Sim |
| State | Text | `customer.address.state` | `customer.address.state` | Sim |
| Zip Code | Text | `customer.address.zipCode` | `customer.address.zipCode` | Sim |
| Phone | Text | `customer.phoneNumber` | `customer.phoneNumber` | Sim |
| SSN | Text | `customer.ssn` | `customer.ssn` | Sim |

---

## Credenciais

| Campo | Tipo | ID | Obrigatório |
|--------|------|----|-------------|
| Username | Text | `customer.username` | Sim |
| Password | Password | `customer.password` | Sim |
| Confirm Password | Password | `repeatedPassword` | Sim |

---

## Botão

| Campo | Tipo | Valor |
|--------|------|-------|
| Register | Submit | Register |

---

# Estrutura do Formulário

| Item | Valor |
|------|-------|
| ID | `customerForm` |
| Método | POST |
| Action | `register.htm` |

---

# Elementos para Automação

## Seletores Recomendados

### Formulário

| Elemento | Seletor |
|-----------|----------|
| Formulário | `#customerForm` |

---

### Dados Pessoais

| Elemento | Seletor |
|-----------|----------|
| First Name | `#customer\\.firstName` |
| Last Name | `#customer\\.lastName` |
| Address | `#customer\\.address\\.street` |
| City | `#customer\\.address\\.city` |
| State | `#customer\\.address\\.state` |
| Zip Code | `#customer\\.address\\.zipCode` |
| Phone | `#customer\\.phoneNumber` |
| SSN | `#customer\\.ssn` |

> **Observação:** Como os IDs possuem ponto (`.`), no CSS é necessário escapá-los com `\\.`.

---

### Credenciais

| Elemento | Seletor |
|-----------|----------|
| Username | `#customer\\.username` |
| Password | `#customer\\.password` |
| Confirm Password | `#repeatedPassword` |

---

### Botão

| Elemento | Seletor |
|-----------|----------|
| Register | `input[value="Register"]` |

---

# Regras de Negócio

- Todos os campos são obrigatórios.
- Username deve ser único.
- Password e Confirm Password devem possuir o mesmo valor.
- O cadastro deve criar um novo usuário.
- Após cadastro válido o usuário deverá ser autenticado automaticamente.

---

# Validações

## Interface

- Página carregada corretamente.
- Título "Signing up is easy!" exibido.
- Formulário visível.
- Todos os campos presentes.
- Botão Register disponível.

---

## Funcionais

- Cadastro realizado com sucesso.
- Cadastro com usuário existente.
- Campos obrigatórios.
- Senhas diferentes.
- Campos vazios.
- Dados inválidos.
- Persistência dos dados após cadastro.

---

# Casos de Teste Relacionados

| ID | Descrição |
|----|-----------|
| CT-REG-001 | Cadastro com sucesso |
| CT-REG-002 | Campos obrigatórios |
| CT-REG-003 | Username já existente |
| CT-REG-004 | Senhas diferentes |
| CT-REG-005 | Campos vazios |
| CT-REG-006 | Validação dos dados pessoais |

---

# Dependências

- Página Home (`home.md`)
- Processo de Login
- Base de dados de usuários

---

# Observações

- Priorizar seletores por **ID**, pois são únicos e mais estáveis.
- Evitar seletores baseados na estrutura da tabela (`table > tr > td`), pois são mais suscetíveis a mudanças de layout.
- Recomenda-se criar um `RegisterPage.js` utilizando os IDs dos campos como elementos principais do Page Object.
- O painel de login lateral pertence ao componente da Home e pode ser reutilizado em um componente compartilhado (`LoginComponent`), evitando duplicação de código nos Page Objects.