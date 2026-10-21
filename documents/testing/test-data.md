# Test Data

## 1. Objetivo

Este documento descreve a estratégia de gerenciamento de dados de teste do projeto `QA-automation-cypress`, incluindo fixtures, geração de dados dinâmicos, criação de usuários e contas bancárias, isolamento entre cenários e boas práticas de manutenção.

O objetivo é garantir que os testes E2E sejam reproduzíveis, independentes sempre que possível e capazes de validar o comportamento do ParaBank sem depender de dados residuais de execuções anteriores.

Os dados de teste devem ser tratados como parte da estratégia de automação. Sua preparação, utilização e limpeza precisam ser consideradas durante a implementação de novos cenários e a investigação de falhas.

## 2. Escopo

A estratégia de dados abrange os seguintes módulos funcionais:

| Módulo | Utilização dos dados |
|---|---|
| Register | Cadastro de clientes com informações válidas e inválidas. |
| Login | Autenticação com credenciais válidas e inválidas. |
| Accounts | Consulta e validação de contas bancárias. |
| Transfer | Preparação de clientes, contas de origem e contas de destino. |
| Bill Pay | Preenchimento de pagamentos de contas com dados válidos e inválidos. |
| Loan | Solicitação de empréstimos com diferentes valores e condições. |
| Profile | Consulta e atualização dos dados cadastrais do cliente. |

Os testes podem utilizar dados fixos, dados gerados durante a execução ou registros previamente existentes no ambiente. A escolha depende do comportamento que cada cenário precisa validar.

## 3. Organização dos dados

### 3.1. Fixture versionado

O arquivo `cypress/fixtures/registration.json` é utilizado como fixture para os dados relacionados ao cadastro.

Fixtures devem armazenar informações estáveis que façam sentido fora de uma execução específica, evitando a duplicação de valores comuns entre cenários quando a estrutura de dados puder ser reutilizada.

Exemplo conceitual de leitura de uma fixture no Cypress:

```javascript
cy.fixture('registration').then((registration) => {
  // Utilizar os dados retornados pela fixture
});
```

O exemplo demonstra a API do Cypress. A forma exata de consumo deve seguir a implementação existente no projeto e os campos efetivamente definidos em `registration.json`.

**Responsabilidades da fixture:**

- Centralizar os dados de cadastro que precisam ser mantidos em arquivo.
- Facilitar a manutenção de informações reutilizadas pelos testes.
- Evitar a repetição desnecessária de dados estáticos.
- Permitir que os cenários consumam os dados sem duplicar sua definição.

A fixture não deve ser usada como repositório de resultados de execução, histórico de usuários criados ou estado compartilhado entre testes.

### 3.2. Dados dinâmicos

Dados que precisam ser únicos ou que dependem do estado do sistema devem ser preparados durante a execução do teste, sempre que apropriado.

Exemplos incluem:

- Nome de usuário que ainda não esteja cadastrado.
- Cliente criado para um cenário específico.
- Contas bancárias utilizadas em uma transferência.
- Valores de entrada usados para validar diferentes regras de negócio.

A geração dinâmica é especialmente importante para cenários de cadastro, nos quais a reutilização de um nome de usuário já existente pode provocar falhas que não correspondem ao comportamento que se pretende testar.

Ao gerar dados, mantenha uma relação clara entre o valor produzido e o cenário que o utiliza. Isso facilita a investigação de falhas e a reprodução dos resultados.

### 3.3. Dados persistidos versus dados temporários

É importante distinguir três categorias:

| Categoria | Exemplos | Tratamento |
|---|---|---|
| Dados de entrada | Informações presentes em `registration.json` | Mantidos no repositório quando apropriado e sem segredos. |
| Dados criados durante o teste | Clientes e contas gerados para um cenário | Preparados conforme a necessidade do teste. |
| Resultados da execução | Capturas de tela, relatórios e evidências | Armazenados nos diretórios de saída correspondentes. |

Dados de entrada não devem ser confundidos com evidências ou resultados. Da mesma forma, os relatórios não devem ser utilizados como fonte de dados para preparar a próxima execução.

O projeto não deve depender do arquivo legado `createdAccounts.json` para compartilhar contas entre testes. A preparação de dados precisa ocorrer de acordo com as necessidades do cenário e a implementação atual.

## 4. Ciclo de vida dos dados

O ciclo de vida esperado para um teste que exige dados próprios pode ser representado pelas seguintes etapas:

1. **Preparação:** identificar os dados necessários e verificar as pré-condições do cenário.
2. **Criação:** cadastrar o cliente ou criar os registros necessários, quando aplicável.
3. **Utilização:** executar as ações funcionais que fazem parte do teste.
4. **Validação:** verificar os resultados esperados utilizando as informações produzidas durante a execução.
5. **Finalização:** avaliar se o cenário exige limpeza explícita ou se os registros podem permanecer no ambiente de teste.

Nem todos os testes precisam executar todas as etapas. Um teste de login com credenciais inválidas, por exemplo, pode utilizar um usuário inexistente sem criar qualquer registro. Já um cenário de transferência depende de um cliente autenticado e de contas adequadas para a operação.

A preparação dos dados não deve mascarar falhas funcionais. Se o objetivo é testar o cadastro, uma falha ao criar o usuário faz parte do comportamento que precisa ser avaliado; não deve ser contornada silenciosamente pela utilização de um usuário previamente cadastrado.

## 5. Isolamento entre testes

### 5.1. Princípio de independência

Sempre que possível, cada teste deve preparar os próprios dados e não depender do resultado de outro teste.

Essa abordagem reduz problemas como:

- Falhas causadas por nomes de usuário já utilizados.
- Dependência da ordem de execução dos cenários.
- Alterações de perfil que afetam testes posteriores.
- Transferências que dependem de saldos ou contas modificados por outros cenários.
- Resultados diferentes entre uma execução isolada e uma execução completa.

A independência não significa que todo cenário precisa criar um cliente novo. Significa que qualquer dependência de dados compartilhados deve ser explícita, controlada e compatível com o objetivo do teste.

### 5.2. Criação de usuários por cenário

Para testes que exigem um cliente novo, prefira gerar um nome de usuário exclusivo para a execução, respeitando as regras de cadastro do ParaBank.

Os prefixos podem identificar a finalidade dos dados e ajudar no diagnóstico, por exemplo:

| Prefixo | Finalidade ilustrativa |
|---|---|
| `qa_` | Dados gerais de automação. |
| `QA-acc_` | Dados associados a testes de contas. |
| `QA-bil_` | Dados associados a testes de pagamento de contas. |
| `QA-loa_` | Dados associados a testes de empréstimos. |
| `QA-log_` | Dados associados a testes de autenticação. |
| `QA-pro_` | Dados associados a testes de perfil. |
| `QA-tra_` | Dados associados a testes de transferência. |

Esses prefixos são convenções de identificação, não garantias de exclusividade. A implementação deve respeitar os caracteres aceitos pelo sistema e adicionar um componente realmente diferenciador quando necessário.

Antes de adotar ou modificar uma convenção, verifique os prefixos e mecanismos de geração já utilizados nos testes e nos helpers do projeto.

### 5.3. Contas bancárias

Testes que realizam transferências precisam distinguir claramente a conta de origem da conta de destino e garantir que ambas pertençam ao contexto correto do cliente.

A preparação deve assegurar que:

- O cliente utilizado esteja autenticado.
- As contas necessárias existam antes da operação.
- Os identificadores das contas sejam obtidos a partir dos resultados reais da preparação.
- A operação utilize as contas corretas.
- As asserções validem o resultado esperado, e não apenas a conclusão da navegação.

Não presuma que identificadores de contas permanecem constantes entre clientes ou execuções. Quando forem produzidos pelo sistema, utilize os valores efetivamente retornados durante a preparação do cenário.

## 6. Estratégia por módulo

### 6.1. Register

Os testes de cadastro precisam diferenciar os dados usados para criar um cliente dos dados destinados a provocar rejeições ou mensagens de validação.

Para os cenários positivos, utilize informações compatíveis com os campos obrigatórios e as regras de cadastro do ParaBank.

Para os cenários negativos, altere apenas os campos relevantes à condição investigada sempre que possível. Isso ajuda a garantir que a falha observada esteja relacionada à regra que o teste pretende validar.

O cenário de usuário duplicado requer atenção especial: a condição de duplicidade deve ser preparada de forma controlada, e a asserção deve verificar o comportamento esperado para esse caso.

### 6.2. Login

Os testes de autenticação devem distinguir credenciais válidas, credenciais inválidas e situações em que os dados necessários não foram fornecidos.

Os dados positivos precisam corresponder a um usuário existente e válido no ambiente. Para os negativos, utilize combinações adequadas ao comportamento investigado, evitando que uma falha de preparação seja interpretada como uma validação funcional bem-sucedida.

Quando um teste depender de um usuário criado anteriormente, documente essa dependência ou prepare o usuário dentro do próprio fluxo de teste.

### 6.3. Accounts

Os testes de contas devem partir de um cliente em condições adequadas para acessar as informações bancárias.

Sempre que o cenário depender de uma conta específica, utilize o identificador obtido durante a preparação ou a navegação correspondente. Evite valores fixos de identificadores que possam variar conforme o estado do ambiente.

### 6.4. Transfer

O módulo de transferência é particularmente sensível ao estado dos dados bancários.

A preparação deve garantir a existência de um cliente e das contas exigidas pelo cenário. Em seguida, o teste deve executar a operação utilizando os identificadores e valores preparados para aquela execução.

Os cenários negativos podem envolver valor ausente, zero, valor negativo, entrada não numérica ou seleção da mesma conta como origem e destino.

Para cada cenário, mantenha separados os dados de preparação e os valores de entrada usados para validar a regra de negócio. Uma falha ao preparar as contas não deve ser classificada como uma validação bem-sucedida de uma transferência inválida.

### 6.5. Bill Pay

Os testes de pagamento de contas devem utilizar dados de beneficiário e pagamento compatíveis com os campos e as regras aceitos pela aplicação.

Quando o objetivo for testar uma validação negativa, identifique qual campo ou condição deve provocar o comportamento esperado. Evite alterar vários campos simultaneamente, a menos que o cenário tenha sido projetado para avaliar essa combinação.

### 6.6. Loan

Os testes de empréstimo devem distinguir os dados de entrada da solicitação dos resultados produzidos pela aplicação.

Valores como montante solicitado e entrada inicial devem ser preparados de acordo com a condição de negócio investigada. Não assuma que qualquer combinação de valores produzirá aprovação ou rejeição sem considerar as regras do ambiente.

As asserções precisam verificar o resultado funcional esperado para o cenário, sem depender de dados residuais de outras solicitações.

### 6.7. Profile

Os testes de perfil devem partir de um cliente autenticado e considerar os valores existentes antes de realizar alterações.

Ao validar uma atualização, diferencie os valores originais dos valores enviados. Isso permite confirmar que a operação realmente alterou os campos pretendidos.

Como atualizações podem persistir no ambiente, evite pressupor que o perfil manterá os mesmos valores após execuções anteriores.

## 7. Falhas na preparação de dados

Uma falha na preparação deve ser investigada separadamente de uma falha funcional.

Exemplos de falhas de preparação:

- Não foi possível cadastrar o usuário necessário.
- As credenciais utilizadas não correspondem a um cliente existente.
- As contas exigidas pelo cenário não foram criadas ou localizadas.
- A preparação retornou dados incompletos.
- O ambiente não estava disponível durante a criação dos registros.

Exemplos de falhas funcionais:

- A aplicação aceitou uma entrada que deveria rejeitar.
- A transferência não apresentou o resultado esperado.
- A atualização do perfil não persistiu os valores enviados.
- A mensagem exibida não correspondeu à regra validada.

Ao investigar uma falha, verifique primeiro se os pré-requisitos foram satisfeitos. Caso contrário, registre a falha de preparação e evite atribuir ao comportamento funcional uma conclusão que o teste não conseguiu validar.

## 8. Manutenção e boas práticas

Ao criar ou modificar dados de teste:

1. Prefira dados exclusivos quando houver risco de colisão entre execuções.
2. Evite valores fixos para registros que são gerados dinamicamente pelo sistema.
3. Utilize fixtures para dados estáveis que realmente se beneficiam de centralização.
4. Não compartilhe estado mutável entre testes sem uma justificativa clara.
5. Não dependa da ordem de execução dos arquivos E2E.
6. Evite duplicar informações de preparação em vários testes quando existir uma abstração apropriada no projeto.
7. Mantenha os dados negativos direcionados à regra que está sendo testada.
8. Não armazene senhas reais, tokens ou outros segredos no repositório.
9. Não introduza novamente arquivos legados como `createdAccounts.json` como mecanismo de compartilhamento de estado.
10. Atualize este documento quando a estratégia de preparação, as fixtures ou o ciclo de vida dos dados mudar.

## 9. Checklist para novos testes

Antes de concluir um novo cenário, confirme:

- [ ] Os dados necessários foram identificados.
- [ ] As pré-condições funcionais estão claras.
- [ ] Os dados são compatíveis com as regras do ParaBank.
- [ ] O teste não depende desnecessariamente de outro cenário.
- [ ] Registros únicos são gerados quando necessário.
- [ ] Os identificadores retornados pela aplicação são utilizados corretamente.
- [ ] As asserções diferenciam falhas de preparação de falhas funcionais.
- [ ] Alterações persistentes no ambiente foram consideradas.
- [ ] Nenhum segredo ou dado pessoal real foi adicionado ao repositório.
- [ ] A documentação foi atualizada se a estratégia de dados foi modificada.

## 10. Referências relacionadas

- [`test-strategy.md`](test-strategy.md) — estratégia geral de testes e critérios de validação.
- [`test-catalog.md`](test-catalog.md) — catálogo dos casos de teste automatizados.
- [`page-object-model.md`](page-object-model.md) — organização da interação com as páginas.
- [`execution.md`](execution.md) — procedimentos para executar os testes e investigar resultados.
- [`troubleshooting.md`](troubleshooting.md) — diagnóstico de problemas relacionados ao ambiente e à execução.

---

**Manutenção:** atualize este documento sempre que a organização das fixtures, a geração de dados dinâmicos ou as dependências de preparação dos testes forem alteradas.