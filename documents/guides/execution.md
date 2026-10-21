# Execution

## 1. Objetivo

Este documento descreve os procedimentos para executar os testes automatizados do projeto `QA-automation-cypress`, desde a execução de um único módulo até a execução completa pelo Flow Engine.

O projeto oferece duas formas principais de execução:

- **Execução direta pelo Cypress:** executa uma especificação E2E ou um conjunto de especificações, utilizando a configuração do Cypress.
- **Execução pelo Flow Engine:** utiliza a camada de orquestração do projeto para organizar as etapas de execução e consolidar os resultados nos relatórios do fluxo.

Essas modalidades têm finalidades diferentes e não devem ser tratadas como equivalentes. A execução direta é útil durante o desenvolvimento e a investigação de falhas; o Flow Engine é indicado para executar e acompanhar o fluxo configurado como um todo.

## 2. Pré-requisitos

Antes de executar os testes, confirme que:

- As dependências foram instaladas com `npm ci`.
- O ParaBank está em execução e acessível.
- O `baseUrl` em `cypress.config.js` corresponde ao endereço do ambiente.
- O terminal está aberto na raiz do repositório.
- Os dados necessários aos cenários podem ser preparados corretamente.

A configuração de referência do projeto utiliza:

```text
http://localhost:8080/parabank
```

Se a aplicação estiver indisponível, resolva o problema do ambiente antes de interpretar as falhas como defeitos funcionais.

Consulte [`installation.md`](installation.md) para obter as instruções de preparação do ambiente.

## 3. Comandos disponíveis

Para consultar os scripts efetivamente definidos no `package.json`, execute:

```bash
npm run
```

O projeto utiliza `npm run flow` como ponto de entrada para o fluxo completo.

```bash
npm run flow
```

Também existem scripts específicos para determinados módulos. Antes de executar um deles, confirme seu comando no `package.json`, pois os scripts são a fonte de verdade para a interface de execução do projeto.

A execução direta dos módulos permite investigar comportamentos sem precisar executar todas as etapas do fluxo completo.

## 4. Execução direta dos testes E2E

### 4.1. Executar todos os testes

Para executar todas as especificações reconhecidas pela configuração atual do Cypress:

```bash
npx cypress run
```

O Cypress executa os testes em modo headless por padrão nesse comando. O resultado é apresentado no terminal e os artefatos são produzidos conforme a configuração ativa. <Link url="https://docs.cypress.io/app/references/command-line" title="Documentação oficial da CLI do Cypress"/>.

### 4.2. Executar um módulo específico

Os testes estão organizados por funcionalidade em `cypress/e2e/`.

| Módulo | Arquivo |
|---|---|
| Accounts | `cypress/e2e/accounts/accounts.cy.js` |
| Bill Pay | `cypress/e2e/billpay/billpay.cy.js` |
| Loan | `cypress/e2e/loan/loan.cy.js` |
| Login | `cypress/e2e/login/login.cy.js` |
| Profile | `cypress/e2e/profile/profile.cy.js` |
| Register | `cypress/e2e/register/register.cy.js` |
| Transfer | `cypress/e2e/transfer/transfer.cy.js` |

Para executar apenas uma especificação, utilize `--spec`.

Exemplo para Transfer:

```bash
npx cypress run --spec "cypress/e2e/transfer/transfer.cy.js"
```

Exemplo para Profile:

```bash
npx cypress run --spec "cypress/e2e/profile/profile.cy.js"
```

Esse procedimento é útil para desenvolver um teste, investigar uma falha ou validar uma alteração localizada. O caminho informado deve corresponder a um arquivo incluído no padrão de especificações configurado no Cypress.

### 4.3. Executar com interface visível

Para acompanhar a execução em um navegador visível:

```bash
npx cypress run --headed --spec "cypress/e2e/transfer/transfer.cy.js"
```

Para abrir a interface interativa do Cypress:

```bash
npx cypress open
```

Na interface, selecione o tipo de teste E2E, o navegador e a especificação desejada.

A execução interativa é útil para depuração. Para validar o comportamento em uma execução automatizada reproduzível, prefira também executar o cenário por meio de `cypress run`.

### 4.4. Executar um módulo por meio de um script npm

Quando houver um script específico definido no `package.json`, utilize-o para manter a execução alinhada à interface prevista pelo projeto.

Por exemplo, se o script `flow:transfer` estiver presente:

```bash
npm run flow:transfer
```

**Importante:** o nome `flow:transfer` não significa necessariamente que o Flow Engine esteja sendo utilizado. No projeto, os scripts específicos de módulo podem executar o Cypress diretamente, enquanto `npm run flow` inicia o orquestrador. Confirme o comando associado a cada script no `package.json`.

## 5. Execução pelo Flow Engine

### 5.1. Executar o fluxo completo

O ponto de entrada da execução orquestrada é:

```bash
npm run flow
```

Esse comando inicia o script associado ao Flow Engine, responsável por coordenar a execução conforme a configuração do fluxo.

Os principais arquivos envolvidos são:

| Arquivo | Responsabilidade |
|---|---|
| `cypress/flows/complete/complete.flow.js` | Ponto de entrada do fluxo completo. |
| `cypress/flows/complete/complete.config.js` | Configuração do fluxo completo. |
| `cypress/flows/engine/flow-engine.js` | Implementação do mecanismo de orquestração. |

Os caminhos acima correspondem à organização conhecida do projeto. Consulte o repositório caso a estrutura tenha sido alterada.

### 5.2. Diferenças em relação à execução direta

| Característica | Cypress direto | Flow Engine |
|---|---|---|
| Unidade de execução | Uma ou mais especificações Cypress | Etapas definidas no fluxo |
| Ponto de entrada | `npx cypress run` ou script de módulo | `npm run flow` |
| Uso principal | Desenvolvimento e depuração localizada | Execução coordenada do fluxo |
| Relatórios | Resultado padrão do Cypress e artefatos configurados | Relatórios consolidados pelo mecanismo do projeto |
| Histórico por fluxo | Não é garantido pela execução direta | Organizado pelo identificador do fluxo |

Não presuma que executar todos os arquivos E2E diretamente produzirá o mesmo histórico ou os mesmos relatórios que executar o Flow Engine. Os mecanismos de execução e a organização dos resultados são distintos.

### 5.3. Identificador do fluxo

Cada execução orquestrada pode receber um identificador próprio, que permite associar relatórios e evidências à mesma execução.

Um exemplo de identificador observado no projeto segue o padrão:

```text
flow-16-10-2026_17-55-56-711
```

O identificador real depende da execução. Não o fixe manualmente nos procedimentos de uso.

Esse identificador permite localizar os resultados de uma execução específica sem depender exclusivamente dos arquivos mais recentes.

## 6. Relatórios

### 6.1. Relatórios do Flow Engine

O projeto organiza os resultados do fluxo em arquivos HTML e JSON.

Os caminhos de referência são:

```text
cypress/reports/
├── latest-report.html
├── latest-report.json
└── history/
    └── <flow-id>/
        ├── report.html
        └── report.json
```

- `latest-report.html`: relatório HTML da execução mais recente processada pelo mecanismo.
- `latest-report.json`: representação estruturada dos resultados dessa execução.
- `history/<flow-id>/report.html`: relatório HTML associado a um fluxo específico.
- `history/<flow-id>/report.json`: dados estruturados associados ao mesmo fluxo.

A existência e a atualização de cada arquivo dependem de a execução ter chegado à etapa correspondente de geração de relatórios.

O relatório mais recente é conveniente para consulta rápida. Para comparar execuções ou investigar uma falha anterior, prefira o histórico associado ao identificador do fluxo.

### 6.2. Relatório HTML

Abra `latest-report.html` em um navegador para consultar os resultados de forma visual.

Quando precisar investigar uma execução anterior, abra o relatório dentro do diretório `history/<flow-id>/`.

Utilize o relatório para identificar os resultados por etapa e localizar as informações disponíveis sobre os casos executados. Para detalhes específicos, consulte também o arquivo JSON correspondente.

### 6.3. Relatório JSON

O JSON é apropriado para leitura programática, comparação de execuções e processamento automatizado dos resultados.

Ao analisar esse arquivo, utilize os campos efetivamente presentes no relatório produzido pelo projeto. Não presuma que a estrutura JSON é igual à saída padrão do Cypress: o Flow Engine pode aplicar seu próprio modelo de dados.

Para compreender o formato dos relatórios, consulte [`reporting.md`](reporting.md).

## 7. Evidências de execução

O projeto organiza as evidências do Flow Engine por identificador de fluxo e etapa.

Estrutura de referência:

```text
cypress/evidence flow/
└── <flow-id>/
    └── <step-id>/
        ├── photos/
        └── videos/
```

- `photos/`: capturas de tela produzidas para a etapa.
- `videos/`: diretório destinado a evidências de vídeo, quando houver gravações produzidas pela implementação.

O nome exato dos diretórios depende da configuração de cada etapa e da implementação do mecanismo.

A configuração global conhecida do Cypress utiliza `video: false`. Portanto, não presuma que serão gerados vídeos automaticamente. A geração de vídeos depende da configuração ativa e do mecanismo que realiza a execução. <Link url="https://docs.cypress.io/app/guides/screenshots-and-videos" title="Documentação oficial sobre screenshots e vídeos"/>.

### 7.1. Localizar as evidências de uma falha

Para investigar um caso com falha:

1. Identifique o fluxo no relatório.
2. Obtenha o identificador do fluxo.
3. Localize a etapa correspondente.
4. Consulte as capturas de tela disponíveis.
5. Compare a evidência com a mensagem de erro e o resultado registrado.
6. Reproduza o cenário isoladamente quando necessário.

Não associe evidências de execuções diferentes apenas porque seus nomes de arquivos são semelhantes. Utilize o identificador do fluxo e a etapa para manter a rastreabilidade.

## 8. Interpretar os resultados

### 8.1. Teste aprovado

Um teste aprovado indica que as asserções executadas foram satisfeitas. Isso não garante, isoladamente, que todos os comportamentos possíveis da funcionalidade estejam cobertos.

Consulte o catálogo de casos para entender o objetivo de cada teste.

### 8.2. Teste reprovado

Quando um teste falhar:

1. Leia a mensagem de erro no terminal ou no relatório.
2. Identifique o caso de teste e o arquivo E2E.
3. Verifique se o ambiente estava disponível.
4. Confirme se os dados necessários foram preparados corretamente.
5. Analise as evidências disponíveis.
6. Execute o cenário isoladamente para reproduzir o comportamento.

Uma falha pode decorrer de um defeito funcional, de uma condição inadequada do ambiente, de dados inválidos para a preparação ou de instabilidade temporal. A causa deve ser investigada antes de classificar o resultado.

### 8.3. Teste ignorado ou não executado

Diferencie um teste ignorado de um teste que sequer foi executado. A interpretação depende do estado registrado pelo Cypress ou pelo relatório do Flow Engine.

Não considere uma execução bem-sucedida apenas porque não houve erro no terminal: confirme se os arquivos e os cenários esperados foram realmente executados.

## 9. Repetição de testes e investigação de flakiness

Quando um cenário apresentar falhas intermitentes, execute-o isoladamente mais de uma vez, mantendo o ambiente e as condições tão consistentes quanto possível.

Exemplo de execução repetida manualmente:

```bash
npx cypress run --spec "cypress/e2e/transfer/transfer.cy.js"
```

Repita o comando e compare os resultados, as mensagens de erro, os tempos de execução e as evidências.

A repetição manual é útil para uma investigação inicial, mas não substitui um mecanismo de repetição automatizada com registro individual de cada tentativa. Se utilizar um script de execução repetida, preserve os resultados de cada rodada e não sobrescreva os dados necessários à análise.

Uma execução isolada bem-sucedida não elimina a possibilidade de flakiness. Investigue diferenças no estado dos dados, no ambiente, na sincronização da interface e nas condições de execução.

## 10. Limpeza e preservação de artefatos

O Cypress possui a opção `trashAssetsBeforeRuns`, que controla a limpeza de artefatos em diretórios configurados antes de uma execução. A configuração global do projeto utiliza `trashAssetsBeforeRuns: true`, enquanto o Flow Engine pode aplicar opções próprias às execuções por etapa.

Por isso:

- Não presuma que todos os artefatos anteriores serão preservados.
- Verifique a configuração efetiva da execução.
- Copie ou arquive as evidências importantes antes de executar novamente, quando necessário.
- Utilize o histórico do Flow Engine para consultar execuções anteriores que tenham sido preservadas.

Consulte a documentação oficial de <Link url="https://docs.cypress.io/app/references/configuration" title="configuração do Cypress"/> para entender o comportamento das opções de execução.

## 11. Checklist de execução

Antes de iniciar:

- [ ] O ParaBank está acessível.
- [ ] O `baseUrl` corresponde ao ambiente.
- [ ] As dependências estão instaladas.
- [ ] O comando selecionado corresponde ao objetivo da execução.
- [ ] Os dados necessários ao cenário podem ser preparados.

Depois da execução:

- [ ] O resultado do comando foi verificado.
- [ ] Os testes esperados foram executados.
- [ ] As falhas foram identificadas e classificadas.
- [ ] O relatório correspondente foi localizado.
- [ ] As evidências relevantes foram preservadas.
- [ ] A causa de falhas intermitentes foi investigada, quando aplicável.

## 12. Referências relacionadas

- [`installation.md`](installation.md) — instalação e preparação do ambiente.
- [`test-strategy.md`](test-strategy.md) — estratégia de testes.
- [`test-catalog.md`](test-catalog.md) — catálogo dos casos automatizados.
- [`test-data.md`](test-data.md) — fixtures e preparação dos dados.
- [`flow-engine.md`](flow-engine.md) — funcionamento do mecanismo de orquestração.
- [`reporting.md`](reporting.md) — estrutura e conteúdo dos relatórios.
- [`troubleshooting.md`](troubleshooting.md) — diagnóstico de falhas.

---

**Manutenção:** atualize este documento quando os scripts npm, a configuração de execução, o Flow Engine, os caminhos dos relatórios ou a organização das evidências forem alterados.