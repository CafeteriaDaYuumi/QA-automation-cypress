# Fixtures e Massa de Teste

## Objetivo

As fixtures fornecem dados controlados para os testes e permitem reutilizar informações entre diferentes fluxos.

## Fixtures atuais

```text
cypress/fixtures/
├── registration.json
├── login.json
├── createdUser.json
└── createdUser2.json
```

## Dados-base

### `registration.json`

Contém os dados-base utilizados no cadastro de usuários.

O username é sobrescrito/gerado dinamicamente durante os fluxos de cadastro para reduzir conflitos com usuários já existentes.

### `login.json`

Contém dados utilizados pelos cenários de autenticação que não dependem exclusivamente do usuário criado durante a execução.

### `createdUser.json`

É criado durante a execução do cadastro válido.

Esse arquivo armazena os dados do usuário criado e é reutilizado por outros testes.

### `createdUser2.json`

É criado pelo fluxo auxiliar de cadastro do segundo usuário e serve como massa adicional para outros fluxos.

## Fluxo da massa dinâmica

Atualmente existe uma cadeia semelhante a:

```text
registration.json
       ↓
REGISTER001
       ↓
createdUser.json
       ↓
LOGIN / ACCOUNTS / TRANSFER
```

Também existe:

```text
registration.json
       ↓
SecondaryAccount
       ↓
createdUser2.json
```

## Identificadores dinâmicos

Os usernames de novos usuários utilizam timestamp para reduzir colisões.

Exemplo conceitual:

```text
qa_<timestamp>
```

## Cuidados

- Não utilizar dados pessoais reais.
- Não armazenar credenciais reais.
- Manter dados-base pequenos e legíveis.
- Dados produzidos durante a execução devem ser tratados como massa temporária.
- Evitar dependências desnecessárias entre testes.

## Limitação atual

Alguns testes dependem de arquivos gerados por execuções anteriores, principalmente `createdUser.json`. Essa dependência existe na implementação atual e deve ser considerada quando os testes forem executados individualmente.
