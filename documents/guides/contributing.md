# Contributing

## 1. Objetivo

Este documento define as diretrizes para contribuir com o projeto `QA-automation-cypress`, incluindo a criação e manutenção de testes E2E, Page Objects, dados de teste, etapas do Flow Engine, relatórios e documentação.

O objetivo é manter a automação organizada, legível, confiável e fácil de evoluir, evitando duplicação de código, dependências desnecessárias entre testes e alterações que comprometam a rastreabilidade dos resultados.

Toda contribuição deve respeitar a arquitetura existente e ser validada antes de ser integrada à branch principal.

## 2. Princípios de contribuição

As contribuições devem seguir estes princípios:

- **Clareza:** o código deve expressar a intenção do cenário sem complexidade desnecessária.
- **Rastreabilidade:** cada caso deve possuir identificação consistente e objetivo verificável.
- **Reutilização:** interações compartilhadas devem utilizar as abstrações existentes quando apropriado.
- **Isolamento:** os testes devem evitar dependências desnecessárias de outros cenários.
- **Confiabilidade:** as asserções precisam validar resultados funcionais reais.
- **Manutenibilidade:** alterações devem respeitar a separação de responsabilidades.
- **Documentação:** mudanças relevantes na arquitetura ou no comportamento devem ser documentadas.
- **Evidências:** falhas e resultados precisam ser investigáveis por meio das informações disponíveis na execução.

## 3. Preparação do ambiente

Antes de contribuir, prepare o ambiente de desenvolvimento seguindo [`installation.md`](installation.md).

Na raiz do repositório, instale as dependências:

```bash
npm ci
```

Confirme que o ParaBank está acessível e que a configuração do Cypress aponta para o ambiente correto.

Consulte os scripts disponíveis:

```bash
npm run
```

Execute um teste relacionado à alteração antes de iniciar o desenvolvimento, quando isso for possível. Esse resultado inicial ajuda a distinguir problemas preexistentes de regressões introduzidas pela contribuição.

## 4. Organização da arquitetura

O projeto separa os testes funcionais, a interação com a interface, a preparação de dados e a orquestração de execução.

As áreas principais incluem:

| Área | Responsabilidade |
|---|---|
| `cypress/e2e/` | Especificações E2E organizadas por funcionalidade. |
| `cypress/pages/` | Page Objects responsáveis por encapsular interações com as páginas. |
| `cypress/fixtures/` | Dados estáticos de teste que precisam ser mantidos em arquivos. |
| `cypress/flows/` | Configuração, entrada e mecanismo de orquestração dos fluxos. |
| `cypress/support/` | Código de suporte e configurações compartilhadas do Cypress. |
| `cypress/reports/` | Relatórios gerados durante as execuções. |
| `cypress/evidence flow/` | Evidências organizadas por fluxo e etapa, quando produzidas pelo mecanismo. |

A estrutura detalhada deve ser consultada em [`project-structure.md`](project-structure.md).

Antes de criar novos arquivos ou abstrações, verifique se já existe uma implementação adequada. Não duplique Page Objects, helpers ou mecanismos de execução apenas para atender a um único cenário.

## 5. Criação de testes E2E

### 5.1. Escolher o módulo correto

Cada especificação deve ficar no diretório correspondente à funcionalidade testada.

Exemplos:

```text
cypress/e2e/
├── accounts/accounts.cy.js
├── billpay/billpay.cy.js
├── loan/loan.cy.js
├── login/login.cy.js
├── profile/profile.cy.js
├── register/register.cy.js
└── transfer/transfer.cy.js
```

Essa estrutura representa os módulos conhecidos do projeto. Se uma nova funcionalidade for adicionada, siga a convenção de organização existente.

### 5.2. Identificação dos casos

Os casos existentes utilizam identificadores funcionais, como `LOGIN001`, `REGISTER001`, `PROFILE001` e `TRANSFER001`.

Ao criar um novo caso:

1. Identifique o módulo correspondente.
2. Consulte o catálogo de testes para verificar os identificadores já utilizados.
3. Escolha um identificador que não entre em conflito com os existentes.
4. Mantenha a identificação consistente no teste e nos artefatos que a utilizam.
5. Atualize o catálogo quando o caso for adicionado, removido ou tiver seu objetivo alterado.

Não reutilize o identificador de um caso removido sem verificar o histórico e a necessidade de preservar a rastreabilidade.

### 5.3. Estrutura de um teste

Um teste deve deixar claras suas condições iniciais, ações e verificações.

Exemplo conceitual:

```javascript
describe('Transfer', () => {
  it('TRANSFER007 - valida o resultado de uma operação', () => {
    // Preparar os dados necessários.

    // Executar as ações do cenário.

    // Validar o resultado esperado.
  });
});
```

Esse exemplo é ilustrativo e não deve ser interpretado como um novo caso já implementado no projeto.

Na implementação real:

- Utilize a sintaxe e os padrões existentes nos arquivos E2E.
- Prepare os dados necessários antes das ações funcionais.
- Mantenha as asserções relacionadas ao objetivo do cenário.
- Evite colocar vários comportamentos independentes em um único teste.
- Não dependa da ordem de execução de outros testes.
- Utilize os Page Objects existentes quando apropriado.

### 5.4. Qualidade das asserções

As asserções devem validar o comportamento que o caso pretende comprovar.

Evite testes que apenas confirmam que uma página abriu ou que uma ação foi executada sem verificar seu resultado funcional.

Para cenários negativos, valide a rejeição, a mensagem ou o estado esperado de acordo com a regra investigada. Para cenários positivos, confirme que a operação produziu o resultado esperado.

Não enfraqueça uma asserção apenas para fazer um teste passar.

## 6. Page Objects

A interação com a interface deve seguir o padrão de Page Object Model utilizado no projeto.

Consulte [`page-object-model.md`](page-object-model.md) antes de criar ou modificar classes de página.

### Diretrizes

- Centralize seletores e interações nas classes responsáveis pelas páginas.
- Reutilize métodos existentes quando eles já representarem a ação necessária.
- Evite duplicar seletores em diferentes especificações.
- Mantenha os métodos focados em uma responsabilidade clara.
- Preserve nomes que expressem a intenção da ação.
- Evite adicionar lógica específica de um cenário ao Page Object sem necessidade.
- Verifique se um método novo é realmente necessário antes de ampliar a API da classe.

Quando a alteração exigir um novo seletor, confirme sua correspondência com a interface atual do ParaBank.

Não altere indiscriminadamente métodos compartilhados: uma mudança pode afetar vários módulos e gerar regressões fora do cenário em desenvolvimento.

## 7. Dados de teste

Os dados devem seguir as convenções descritas em [`test-data.md`](test-data.md).

### 7.1. Fixtures

Utilize fixtures quando os dados estáticos precisarem ser centralizados e reutilizados.

O arquivo conhecido de dados de cadastro é:

```text
cypress/fixtures/registration.json
```

Antes de criar outra fixture, avalie se os dados realmente precisam ficar em arquivo ou se devem ser produzidos durante a execução.

### 7.2. Dados dinâmicos

Quando um cenário exigir um usuário exclusivo, gere dados que reduzam o risco de colisão com registros anteriores.

Para operações bancárias, utilize os identificadores reais obtidos durante a preparação do cenário.

Não dependa do arquivo legado `createdAccounts.json` como mecanismo de compartilhamento de estado entre testes.

### 7.3. Isolamento

Cada teste deve preparar os dados de que necessita, sempre que possível.

Se houver uma dependência compartilhada inevitável, documente-a e avalie seu impacto sobre a ordem de execução, a repetibilidade e a investigação de falhas.

Nunca inclua senhas reais, tokens ou outros segredos em fixtures ou arquivos versionados.

## 8. Seletores, sincronização e estabilidade

Ao criar ou alterar interações com a interface:

- Prefira seletores estáveis e relacionados ao elemento correto.
- Reutilize os padrões já adotados pelos Page Objects.
- Utilize as esperas e asserções do Cypress de forma apropriada.
- Evite esperas fixas quando houver uma condição observável que possa ser aguardada.
- Não utilize tentativas repetidas como substituto para investigar uma falha.
- Confirme que os elementos estão no estado esperado antes de interagir com eles.

Uma falha de seletor pode indicar uma mudança real na interface, um problema de sincronização ou uma preparação inadequada dos dados. Investigue a causa antes de modificar o código.

## 9. Integração com o Flow Engine

Quando uma contribuição afetar a execução orquestrada, consulte [`flow-engine.md`](flow-engine.md).

O ponto de entrada conhecido do fluxo completo é:

```text
cypress/flows/complete/complete.flow.js
```

A configuração do fluxo está em:

```text
cypress/flows/complete/complete.config.js
```

O mecanismo de orquestração está em:

```text
cypress/flows/engine/flow-engine.js
```

Antes de modificar esses arquivos:

1. Identifique a responsabilidade de cada componente.
2. Verifique como as etapas existentes são declaradas e executadas.
3. Preserve a compatibilidade com os módulos já integrados.
4. Considere os efeitos sobre relatórios e evidências.
5. Valide a execução isolada e o fluxo completo, conforme o alcance da mudança.

Não adicione uma etapa ao fluxo completo apenas porque um novo teste foi criado. Verifique se a alteração faz parte do escopo da contribuição e se a configuração realmente exige sua integração.

## 10. Relatórios e evidências

As mudanças que afetam a geração de resultados devem respeitar o formato e os caminhos documentados em [`reporting.md`](reporting.md).

O projeto utiliza relatórios HTML e JSON e organiza o histórico do Flow Engine por identificador de fluxo.

Ao alterar essa funcionalidade:

- Preserve a associação entre fluxo, etapa e resultados.
- Evite sobrescrever o histórico que deve ser preservado.
- Mantenha a consistência entre o relatório HTML e os dados JSON.
- Verifique o comportamento em caso de sucesso e falha.
- Confirme que os caminhos de saída correspondem à configuração real.
- Atualize a documentação se o formato dos artefatos mudar.

Arquivos gerados durante a execução não devem ser adicionados ao controle de versão indiscriminadamente. Antes de incluí-los, verifique se são resultados temporários ou arquivos de referência mantidos intencionalmente pelo projeto.

## 11. Execução e validação das alterações

A validação deve ser proporcional ao alcance da mudança.

### 11.1. Alteração localizada

Quando uma alteração afeta apenas uma especificação, execute o teste correspondente:

```bash
npx cypress run --spec "cypress/e2e/transfer/transfer.cy.js"
```

Substitua o caminho pelo arquivo realmente alterado.

### 11.2. Alteração compartilhada

Quando a mudança afetar Page Objects, helpers ou configurações utilizados por vários módulos, execute os testes diretamente relacionados e amplie a validação para os módulos potencialmente afetados.

### 11.3. Alteração no Flow Engine

Quando a mudança afetar a orquestração, execute o fluxo completo:

```bash
npm run flow
```

Verifique o resultado no terminal, os relatórios e as evidências disponíveis.

### 11.4. Registro de falhas

Se um teste falhar durante a validação:

- Determine se a falha foi introduzida pela alteração.
- Investigue problemas de ambiente ou de preparação de dados.
- Preserve as evidências relevantes.
- Não declare a alteração validada apenas porque uma execução posterior passou sem explicação.

Os procedimentos detalhados estão em [`execution.md`](execution.md) e [`troubleshooting.md`](troubleshooting.md).

## 12. Documentação

Atualize a documentação quando uma contribuição alterar:

- A organização de diretórios ou arquivos.
- A arquitetura dos Page Objects.
- O comportamento do Flow Engine.
- Os comandos de execução.
- A geração de relatórios e evidências.
- A estratégia de dados de teste.
- Os identificadores ou a cobertura do catálogo de testes.
- Os pré-requisitos de instalação.

Os documentos devem refletir o comportamento real do código. Não descreva funcionalidades futuras como se já estivessem implementadas.

Quando um comportamento não puder ser confirmado no código, registre a limitação em vez de apresentar uma suposição como fato.

## 13. Commits

Utilize mensagens de commit que indiquem claramente a natureza da alteração.

O projeto já utiliza mensagens com convenções como `feat:` para novas funcionalidades. Mantenha consistência com o histórico existente.

Exemplos:

```text
feat: adiciona novos cenários de transferência
fix: corrige seletor da página de perfil
refactor: centraliza interação com contas
test: amplia cobertura de validação de cadastro
docs: atualiza documentação de execução
```

Esses exemplos são sugestões de nomenclatura; adapte o texto ao conteúdo real do commit.

Boas práticas:

- Faça commits com escopo claro.
- Evite misturar alterações funcionais independentes.
- Não inclua arquivos temporários ou artefatos locais sem necessidade.
- Não declare testes aprovados se eles não foram executados.
- Registre limitações conhecidas quando forem relevantes.

## 14. Checklist de contribuição

Antes de considerar uma contribuição concluída, confirme:

- [ ] A alteração respeita a arquitetura existente.
- [ ] Os testes foram colocados no módulo correto.
- [ ] Os identificadores dos casos são únicos e rastreáveis.
- [ ] Os Page Objects foram reutilizados ou modificados de forma consistente.
- [ ] Os dados de teste não criam dependências desnecessárias.
- [ ] As asserções verificam o comportamento esperado.
- [ ] A execução direta foi validada quando aplicável.
- [ ] O Flow Engine foi validado quando a alteração o afeta.
- [ ] Relatórios e evidências foram conferidos quando relevantes.
- [ ] A documentação foi atualizada quando necessária.
- [ ] Não foram incluídos segredos, dados pessoais desnecessários ou artefatos temporários.
- [ ] A mensagem de commit descreve corretamente a alteração.

## 15. Referências relacionadas

- [`README.md`](../README.md) — apresentação geral do projeto.
- [`project-structure.md`](project-structure.md) — organização dos diretórios.
- [`page-object-model.md`](page-object-model.md) — responsabilidades dos Page Objects.
- [`flow-engine.md`](flow-engine.md) — funcionamento do mecanismo de orquestração.
- [`test-strategy.md`](test-strategy.md) — estratégia de testes.
- [`test-catalog.md`](test-catalog.md) — catálogo de casos automatizados.
- [`test-data.md`](test-data.md) — fixtures e preparação dos dados.
- [`installation.md`](installation.md) — instalação do ambiente.
- [`execution.md`](execution.md) — comandos e procedimentos de execução.
- [`reporting.md`](reporting.md) — relatórios e evidências.
- [`troubleshooting.md`](troubleshooting.md) — investigação de falhas.

---

**Manutenção:** atualize este documento quando os padrões de contribuição, a arquitetura, os procedimentos de validação ou as convenções do repositório forem alterados.