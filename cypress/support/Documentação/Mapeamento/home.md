# Página Inicial (Home)

**Arquivo:** `home.md`

---

# Informações Gerais

| Campo | Valor |
|--------|-------|
| Página | Home |
| URL | `/index.htm` |
| Objetivo | Página inicial do sistema ParaBank, responsável por apresentar informações institucionais e permitir autenticação ou cadastro de novos usuários. |
| Status | Em uso |
| Responsável | QA |

---

# Fluxos Disponíveis

- Login de usuário
- Cadastro de novo usuário
- Recuperação de senha
- Navegação institucional
- Acesso à página administrativa
- Consulta de serviços
- Consulta de notícias

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
| Products | Link externo | Parasoft |
| Locations | Link externo | Parasoft |
| Admin Page | Link | admin.htm |

---

### Menu Superior

| Nome | Classe |
|------|---------|
| Home | `.home` |
| About | `.aboutus` |
| Contact | `.contact` |

---

# Painel de Login

## Formulário

| Campo | Tipo | Name | Obrigatório |
|--------|------|------|-------------|
| Username | Input Text | username | Sim |
| Password | Password | password | Sim |
| Log In | Submit | - | Sim |

### Form

| Item | Valor |
|------|-------|
| Nome | login |
| Método | POST |
| Action | login.htm |

---

## Links

| Nome | Destino |
|-------|----------|
| Forgot login info? | lookup.htm |
| Register | register.htm |

---

# Painel de Serviços

## ATM Services

- Withdraw Funds
- Transfer Funds
- Check Balances
- Make Deposits

---

## Online Services

- Bill Pay
- Account History
- Transfer Funds

---

# Notícias

## Latest News

Contém:

- Data da publicação
- Lista de notícias
- Link Read More

---

# Rodapé

## Links

- Home
- About Us
- Services
- Products
- Locations
- Forum
- Site Map
- Contact Us

---

# Elementos para Automação

## Seletores recomendados

### Login

| Elemento | Seletor |
|-----------|----------|
| Campo usuário | `input[name="username"]` |
| Campo senha | `input[name="password"]` |
| Botão Login | `input[value="Log In"]` |
| Form Login | `form[name="login"]` |

### Navegação

| Elemento | Seletor |
|-----------|----------|
| Logo | `.logo` |
| Menu esquerdo | `.leftmenu` |
| Menu superior | `.button` |

### Links

| Elemento | Seletor |
|-----------|----------|
| Register | `a[href*="register"]` |
| Forgot Password | `a[href*="lookup"]` |

---

# Validações

## Interface

- Página abre corretamente.
- Logo é exibida.
- Menus são carregados.
- Rodapé é exibido.
- Notícias são carregadas.

## Login

- Campo Username visível.
- Campo Password visível.
- Botão Login habilitado.
- Login com sucesso.
- Login inválido.
- Campos obrigatórios.

## Navegação

- Link Register abre página de cadastro.
- Link Forgot Login abre recuperação.
- Links institucionais funcionam corretamente.

---

# Casos de Teste Relacionados

| ID |
|----|
| CT-HOME-001 |
| CT-HOME-002 |
| CT-LOGIN-001 |
| CT-LOGIN-002 |
| CT-REGISTER-001 |

---

# Observações

- O foco inicial da automação será o painel de Login.
- Os demais menus institucionais serão automatizados em sprints futuras.
- Sempre priorizar seletores por atributos (`name`, `id` ou `data-testid`). Caso não existam, utilizar seletores CSS estáveis.