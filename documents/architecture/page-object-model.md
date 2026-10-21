# Page Object Model (POM)

## 1. Objetivo

Este documento descreve como o padrão **Page Object Model (POM)** está aplicado no projeto `QA-automation-cypress`. A referência para este documento são as classes existentes em `cypress/pages/`; a documentação anterior não é considerada fonte de verdade.

O POM concentra em módulos próprios os seletores e as interações com as páginas do ParaBank. Dessa forma, os testes E2E podem descrever os cenários usando métodos de intenção — por exemplo, preencher um formulário ou acessar uma funcionalidade — sem repetir em cada spec todos os detalhes de interação com a interface.

A implementação atual utiliza JavaScript com classes e exporta uma instância de cada classe, em vez de exportar a classe para que cada teste crie sua própria instância.

## 2. Localização e convenção de implementação

Os Page Objects estão localizados em `cypress/pages/`.

A estrutura observada segue, em geral, este formato:

```javascript
class ExamplePage {
  get field() {
    return cy.get('[name="field"]')
  }

  fillField(value) {
    this.field.clear().type(value)
  }
}

export default new ExamplePage()
```

Os getters retornam consultas Cypress, normalmente por meio de `cy.get()`. Como o Cypress trabalha com comandos enfileirados, os getters não armazenam elementos DOM: cada acesso executa a consulta correspondente quando o comando é processado.

As classes são exportadas como instâncias únicas com `export default new NomePage()`. Os testes importam essas instâncias e chamam seus getters e métodos.

## 3. Page Objects existentes

| Arquivo | Responsabilidade observada |
|---|---|
| `HomePage.js` | Acesso à página inicial, links do menu, navegação para funcionalidades e logout. |
| `RegisterPage.js` | Campos e ações do formulário de cadastro de cliente. |
| `LoginPage.js` | Campos de usuário e senha, acesso à página inicial e envio do login. |
| `AccountsPage.js` | Elementos da visão geral da conta, tabelas de atividade e detalhes de transações; acesso a uma conta. |
| `TransferPage.js` | Formulário de transferência, seleção de contas, envio, resultados, erros e leitura das contas disponíveis. |
| `BillPayPage.js` | Formulário de pagamento de contas, dados do beneficiário, conta de origem, resultados e mensagens de validação. |
| `LoanPage.js` | Formulário de solicitação de empréstimo, envio, resultado, status e contas disponíveis. |
| `ProfilePage.js` | Campos do perfil do cliente, preenchimento dos dados e atualização do perfil. |

A tabela descreve o papel indicado pelo código atual; não significa que cada elemento declarado seja utilizado por uma spec ou que todos os fluxos tenham validações completas.

## 4. Responsabilidades dos Page Objects

### 4.1. Seletores e getters

Os getters encapsulam os seletores CSS e retornam os elementos que os métodos ou testes precisam acessar. Isso reduz a duplicação de seletores e permite centralizar sua manutenção.

Exemplos encontrados no projeto incluem:

- Campos por atributo `name`, como os campos do cadastro e do pagamento de contas.
- Elementos identificados por `id`, como `#transferForm` e `#requestLoanResult`.
- Seletores estruturais, como seletores baseados na posição de um item dentro do menu.

Sempre que a aplicação permitir, prefira seletores estáveis e semanticamente claros, como IDs, atributos `name` ou atributos dedicados a testes. Seletores dependentes da posição dos elementos no DOM podem quebrar quando a estrutura ou a ordem da página muda, mesmo que a funcionalidade continue correta.

### 4.2. Métodos de interação

Os métodos executam ações da interface, como preencher campos, selecionar uma conta, enviar formulários e navegar entre páginas. Exemplos atuais:

- `RegisterPage.register(user)` preenche os dados do cadastro e envia o formulário.
- `LoginPage.login(user)` verifica a visibilidade do campo de usuário, preenche as credenciais e envia o login.
- `TransferPage.selectFromAccount(account)` e `selectToAccount(account)` selecionam as contas da transferência.
- `BillPayPage.payBill(payee)` preenche os dados de pagamento e envia a solicitação.
- `LoanPage.requestLoan(amount, downPayment, account)` preenche o formulário e solicita o empréstimo.
- `ProfilePage.updateProfile(profile)` preenche os dados do perfil e solicita a atualização.

Métodos de fluxo como esses são conveniências de interação. A existência de um método que envia um formulário não comprova, por si só, que a operação foi concluída com sucesso.

### 4.3. Assertions e responsabilidade dos testes

A regra recomendada para o projeto é manter nos testes E2E as assertions que comprovam o comportamento esperado, enquanto os Page Objects oferecem os seletores e as ações de interface necessárias para chegar ao estado que será verificado.

Por exemplo, o Page Object pode fornecer o getter `transferResult`, mas o teste deve afirmar explicitamente que o resultado está visível e validar os dados relevantes retornados pela aplicação. Não se deve interpretar a chamada a `submitTransfer()` como prova de que a transferência foi aceita.

O código atual contém algumas verificações dentro dos Page Objects — por exemplo, `LoginPage.login()` verifica se o campo de usuário está visível. Isso não impede a manutenção do padrão, mas a suíte deve manter as assertions de negócio nos cenários para que a intenção e os critérios de aprovação fiquem claros.

## 5. Particularidades da implementação atual

### 5.1. Métodos de fluxo não uniformes

Os Page Objects não seguem ainda uma interface de métodos completamente uniforme. Alguns possuem métodos de alto nível para executar uma jornada (`register`, `login`, `payBill`, `requestLoan` e `updateProfile`), enquanto outros oferecem principalmente ações menores (`accessAccount`, `accessTransfer`, `submitTransfer` e seleções de conta).

Isso não é necessariamente um problema: o nível de abstração deve refletir a complexidade da funcionalidade. Entretanto, ao adicionar métodos, mantenha nomes claros e consistentes e evite que métodos de alto nível escondam validações importantes do cenário.

### 5.2. Navegação distribuída

`HomePage.js` reúne parte da navegação pelo menu, enquanto `TransferPage.js` e `BillPayPage.js` também declaram links de acesso às suas funcionalidades. A navegação usada por cada spec deve ser conferida antes de alterar ou remover métodos, evitando duplicação sem presumir que um método não é usado.

### 5.3. Seletores dependentes da estrutura

`HomePage.js` utiliza seletores posicionais para alguns itens do menu, como `#leftPanel > ul > :nth-child(...) > a`. Em `AccountsPage.js`, há seletores com `nth-child` para elementos de tabelas. Esses seletores podem ser sensíveis a mudanças de layout e merecem revisão quando a aplicação mudar ou quando ocorrerem falhas de localização de elementos.

### 5.4. Campos que precisam de limpeza

Os métodos de preenchimento não são uniformes quanto à limpeza prévia dos campos. Por exemplo, vários métodos em `RegisterPage.js` usam `.type()` diretamente, enquanto os métodos de preenchimento de `ProfilePage.js` usam `.clear().type()`.

Ao criar ou modificar métodos, considere o estado inicial do campo e se o método pode ser chamado mais de uma vez. Use `.clear().type(value)` quando o comportamento esperado for substituir o conteúdo existente; não altere essa estratégia sem verificar os cenários que dependem dela.

### 5.5. Formatos dos argumentos

Os métodos recebem objetos ou parâmetros posicionais, dependendo do Page Object. Por exemplo, `register(user)` e `updateProfile(profile)` recebem objetos, enquanto `requestLoan(amount, downPayment, account)` recebe parâmetros posicionais. Ao ampliar o projeto, prefira uma convenção consistente por tipo de operação e mantenha os nomes dos campos alinhados aos dados utilizados pelos testes.

## 6. Como adicionar ou alterar um Page Object

1. Identifique a funcionalidade e confira se já existe um Page Object responsável por ela.
2. Localize os seletores diretamente na aplicação e escolha seletores estáveis sempre que possível.
3. Adicione getters para os elementos que precisam ser acessados por mais de uma ação ou cenário.
4. Crie métodos com nomes orientados à ação, mantendo a lógica de interação dentro do Page Object.
5. Deixe as assertions que definem o resultado esperado no teste E2E, salvo verificações técnicas necessárias para a própria interação.
6. Atualize ou crie testes que cubram o comportamento alterado.
7. Execute o teste isoladamente e depois os fluxos relevantes para detectar regressões.
8. Atualize este documento se a organização, as convenções ou as responsabilidades mudarem.

## 7. Convenções recomendadas

- Usar nomes de classes em `PascalCase`, com o sufixo `Page`, como nas classes existentes.
- Usar nomes de métodos em `camelCase`, começando por verbos que expressem a ação (`fill`, `select`, `submit`, `access`, `update`).
- Manter os seletores encapsulados nos Page Objects, evitando repeti-los nas specs quando fizer sentido centralizá-los.
- Evitar métodos genéricos que ocultem várias ações não relacionadas.
- Não colocar dados de usuário específicos ou credenciais fixas dentro dos Page Objects; receber os dados por parâmetros ou obtê-los por meio da estratégia de massa de teste do projeto.
- Não confundir ações da interface com validações do resultado de negócio.
- Remover métodos somente após confirmar que não são utilizados por specs, comandos ou outros módulos.

## 8. Limites deste documento

Este documento descreve a implementação encontrada em `cypress/pages/` no momento da análise do pacote. Não afirma que todos os métodos estão em uso, que todos os seletores são estáveis ou que a suíte está integralmente validada. O uso efetivo de cada método deve ser confirmado por busca de referências no código, e a qualidade dos seletores deve ser avaliada junto aos testes e ao comportamento da aplicação.

Ao modificar os Page Objects, mantenha este documento alinhado ao código versionado e registre aqui mudanças de convenção ou de responsabilidade, não cada alteração trivial de implementação.
