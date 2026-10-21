# Troubleshooting

## 1. Objetivo

Este documento reúne procedimentos para identificar, diagnosticar e resolver problemas encontrados durante a execução do projeto `QA-automation-cypress`.

O objetivo é reduzir o tempo de investigação e distinguir falhas de ambiente, problemas de preparação de dados, defeitos funcionais e instabilidade dos testes automatizados.

A investigação deve começar pela mensagem de erro e pelas condições em que a falha ocorreu. Evite alterar seletores, esperas ou asserções antes de identificar a causa provável do problema.

## 2. Processo de diagnóstico

Ao encontrar uma falha, siga esta sequência:

1. Identifique o comando executado e o módulo afetado.
2. Registre a mensagem de erro completa.
3. Verifique se o ParaBank está acessível.
4. Confirme se as dependências e a configuração estão corretas.
5. Verifique a preparação dos dados necessários ao cenário.
6. Consulte as capturas de tela e os relatórios disponíveis.
7. Execute somente a especificação afetada para tentar reproduzir o problema.
8. Compare os resultados de novas execuções antes de classificar a falha como intermitente.

Sempre que possível, preserve o relatório e as evidências da execução que apresentou o problema antes de iniciar novas tentativas.

## 3. Problemas de instalação e dependências

### 3.1. `node` ou `npm` não reconhecido

**Sintoma:** o terminal informa que `node` ou `npm` não é reconhecido como comando.

**Possíveis causas:**
- Node.js não instalado.
- Diretório dos executáveis ausente no `PATH`.
- Terminal aberto antes de uma alteração nas variáveis de ambiente.

**Diagnóstico:**

```bash
node --version
npm --version
```

**Solução:**

1. Confirme a instalação do Node.js.
2. Verifique se o diretório dos executáveis está no `PATH`.
3. Abra um novo terminal e repita os comandos.

### 3.2. Falha no `npm ci`

**Sintoma:** a instalação das dependências termina com erro.

**Possíveis causas:**
- Incompatibilidade entre `package.json`, `package-lock.json` e a versão do npm.
- Falha de conectividade com o registro npm.
- Dependência indisponível.
- Permissões ou problemas no cache local.

**Diagnóstico:**

```bash
node --version
npm --version
npm ci
```

Examine a primeira mensagem de erro relevante e o pacote indicado.

**Solução:**

- Confirme a compatibilidade das versões.
- Verifique a conectividade e a disponibilidade do registro npm.
- Investigue a dependência apontada pela mensagem.
- Preserve o arquivo `package-lock.json`; não o exclua como primeira tentativa de correção.

### 3.3. Binário do Cypress indisponível

**Sintoma:** o Cypress está listado entre as dependências, mas não consegue iniciar o binário.

**Diagnóstico:**

```bash
npx cypress version
```

**Solução:**

Consulte a mensagem apresentada pelo Cypress e verifique a instalação do binário, as permissões e o cache. Se necessário, utilize os comandos oficiais de instalação e verificação descritos na [documentação do Cypress](https://docs.cypress.io/app/references/command-line).

## 4. ParaBank indisponível

### 4.1. Erro de conexão ou timeout ao abrir a aplicação

**Sintoma:** o Cypress não consegue visitar a página inicial ou os testes falham antes de interagir com a aplicação.

**Possíveis causas:**
- ParaBank parado.
- Porta incorreta.
- `baseUrl` divergente do endereço real.
- Contêiner interrompido.
- Aplicação ainda inicializando.

**Diagnóstico:**

Confirme o endereço configurado em `cypress.config.js`. A URL de referência conhecida é:

```text
http://localhost:8080/parabank
```

Verifique também o estado do Docker, se a aplicação estiver em um contêiner:

```bash
docker ps
docker ps -a
```

Abra a URL em um navegador para determinar se o problema também ocorre fora do Cypress.

**Solução:**

1. Inicie ou recupere o serviço do ParaBank.
2. Verifique a porta publicada e o caminho da aplicação.
3. Confirme que o `baseUrl` aponta para o endereço correto.
4. Aguarde a aplicação estar disponível antes de executar os testes.

Não altere as asserções funcionais para contornar uma aplicação indisponível.

### 4.2. Contêiner do ParaBank encerra inesperadamente

**Sintoma:** o contêiner aparece como `Exited` no resultado de `docker ps -a`.

**Diagnóstico:**

```bash
docker ps -a
docker logs Parabank
```

O nome `Parabank` é um exemplo baseado no ambiente conhecido; substitua-o pelo nome real do contêiner caso seja diferente.

**Solução:**

Examine os logs e o código de saída para identificar a causa. Verifique também se houve conflito de porta ou falha de inicialização.

Não remova o contêiner antes de consultar os logs se precisar preservar informações para a investigação.

### 4.3. Erro de porta indisponível no Windows

**Sintoma:** o Docker informa que não conseguiu publicar uma porta porque ela já está em uso ou está em uma faixa excluída pelo Windows.

**Possíveis causas:**
- Outro processo utilizando a porta.
- Reserva ou exclusão de porta pelo sistema operacional.
- Configuração de rede do Docker Desktop.
- Conflito com serviços ou mapeamentos anteriores.

**Diagnóstico:**

Consulte os mapeamentos dos contêineres:

```bash
docker ps -a
```

No PowerShell, verifique as conexões que utilizam a porta relevante:

```powershell
Get-NetTCPConnection -LocalPort 62042 -ErrorAction SilentlyContinue
```

Para consultar faixas de portas TCP excluídas:

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

Substitua `62042` pela porta indicada no erro quando necessário.

**Solução:**

Identifique se a porta está sendo utilizada por um processo ou se pertence a uma faixa excluída. Não tente remover reservas de portas do Windows sem entender sua origem e seu impacto. Em ambientes gerenciados, alterações na configuração de rede devem ser feitas com cuidado.

## 5. Testes E2E falhando

### 5.1. O Cypress não encontra uma especificação

**Sintoma:** a execução termina informando que nenhum arquivo de teste foi encontrado ou que o caminho informado é inválido.

**Diagnóstico:**

```bash
npm run
```

Confirme o caminho do arquivo E2E e o padrão configurado em `cypress.config.js`.

Os arquivos de teste estão organizados por funcionalidade em `cypress/e2e/`, incluindo `accounts`, `billpay`, `loan`, `login`, `profile`, `register` e `transfer`.

**Solução:**

- Execute o comando a partir da raiz do repositório.
- Confira o nome e a extensão do arquivo.
- Utilize o caminho correto no argumento `--spec`.
- Confirme se a especificação corresponde ao padrão configurado.

### 5.2. Elemento não encontrado ou timeout de seletor

**Sintoma:** o teste falha ao procurar um botão, campo, mensagem ou outro elemento da interface.

**Possíveis causas:**
- Seletor desatualizado.
- Página ainda não carregada.
- Estado funcional inesperado.
- Dados de entrada inválidos.
- Elemento condicionado a uma ação anterior.
- Mudança na estrutura da página.

**Diagnóstico:**

1. Leia o seletor mencionado no erro.
2. Consulte a captura de tela da falha, quando disponível.
3. Verifique se a página esperada foi carregada.
4. Confirme se as ações anteriores foram concluídas.
5. Compare o seletor utilizado no teste com o Page Object correspondente.

**Solução:**

Corrija o seletor ou a sequência de ações somente quando houver evidência de que estão incorretos. Prefira seletores consistentes com a aplicação e centralizados nos Page Objects quando esse for o padrão do projeto.

Não aumente timeouts indiscriminadamente: isso pode esconder problemas de sincronização sem resolver a causa.

### 5.3. Asserção falha apesar de a página carregar

**Sintoma:** a navegação é concluída, mas o resultado esperado não é encontrado ou o valor retornado é diferente.

**Possíveis causas:**
- Regra de negócio diferente da esperada.
- Dados de entrada inadequados.
- Estado anterior do sistema.
- Asserção incorreta ou insuficiente.
- Comportamento real da aplicação divergente do esperado.

**Solução:**

Compare o resultado observado com o requisito do caso de teste. Confirme os dados utilizados, examine a mensagem ou o estado efetivamente retornado e verifique se a asserção está validando o comportamento correto.

Uma página carregar com sucesso não significa que a operação funcional foi concluída corretamente.

## 6. Problemas com dados de teste

### 6.1. Cadastro falha por usuário já existente

**Sintoma:** o cenário de cadastro não consegue criar um usuário ou não encontra a mensagem esperada para duplicidade.

**Possível causa:** o nome de usuário já existe no ParaBank por causa de uma execução anterior ou de outro teste.

**Solução:**

- Verifique se o cenário exige um usuário novo.
- Utilize uma estratégia de geração de identificadores exclusivos.
- Para um teste de duplicidade, prepare explicitamente o usuário existente e valide o comportamento esperado.
- Não dependa de um registro criado incidentalmente por outro teste.

O fixture `cypress/fixtures/registration.json` pode fornecer dados de cadastro, mas não deve ser tratado como garantia de que um nome de usuário continua disponível.

### 6.2. Fixture não encontrada

**Sintoma:** o Cypress informa que não encontrou a fixture solicitada.

**Diagnóstico:**

Confirme o caminho e o nome do arquivo em `cypress/fixtures/`. Para a fixture de cadastro conhecida, o caminho é:

```text
cypress/fixtures/registration.json
```

A chamada `cy.fixture('registration')` é uma forma usual de acessar essa fixture, desde que corresponda à implementação do teste.

**Solução:**

- Verifique a existência do arquivo.
- Confira a grafia do nome e o caminho relativo.
- Confirme que o teste utiliza o nome correto da fixture.
- Não recrie arquivos de dados antigos apenas para contornar uma referência desatualizada.

O projeto não deve depender do arquivo legado `createdAccounts.json` como repositório compartilhado de contas.

### 6.3. Conta bancária não encontrada

**Sintoma:** um teste de transferência ou consulta de contas falha ao utilizar um identificador de conta.

**Possíveis causas:**
- A preparação do cliente não foi concluída.
- A conta não foi criada ou não pertence ao cliente utilizado.
- O teste reutiliza um identificador fixo.
- A conta foi obtida de um estado anterior do ambiente.

**Solução:**

Confirme que a preparação foi concluída e que os identificadores utilizados pertencem ao contexto correto. Quando a aplicação fornece os identificadores durante a execução, utilize os valores retornados em vez de presumir que eles serão constantes.

### 6.4. Perfil ou saldo alterado entre execuções

**Sintoma:** um teste apresenta resultados diferentes após outra execução ou após a alteração de dados.

**Possível causa:** o ParaBank mantém estado entre cenários, e uma operação anterior modificou os dados usados pelo teste atual.

**Solução:**

- Verifique quais registros são alterados pelo cenário.
- Evite depender de valores que podem mudar entre execuções.
- Prepare os dados necessários de forma controlada.
- Confirme se o teste realmente verifica o resultado da operação que executou.

## 7. Problemas específicos por módulo

| Módulo | Pontos para investigar |
|---|---|
| Register | Unicidade do usuário, fixture, campos obrigatórios e mensagens de validação. |
| Login | Credenciais, existência do cliente e estado da sessão. |
| Accounts | Cliente autenticado, carregamento da lista e identificadores de conta. |
| Transfer | Contas de origem e destino, valor, preparação e resultado da operação. |
| Bill Pay | Campos do beneficiário, dados do pagamento e validações. |
| Loan | Valores de entrada, condições da solicitação e resultado apresentado. |
| Profile | Sessão, valores anteriores, campos alterados e persistência das mudanças. |

Esses pontos são orientações de investigação, não afirmações de que cada módulo possui necessariamente um defeito conhecido.

## 8. Falhas no Flow Engine

### 8.1. `npm run flow` falha antes de iniciar os testes

**Sintoma:** o comando falha antes de executar as etapas E2E.

**Diagnóstico:**

Verifique a mensagem do terminal e confirme a existência dos arquivos de entrada do fluxo:

```text
cypress/flows/complete/complete.flow.js
cypress/flows/complete/complete.config.js
cypress/flows/engine/flow-engine.js
```

**Solução:**

- Confirme que o terminal está na raiz do projeto.
- Verifique se os arquivos e os módulos importados existem.
- Confira os scripts no `package.json`.
- Examine a primeira exceção registrada antes de alterar a configuração.

### 8.2. Uma etapa do fluxo falha

**Sintoma:** o fluxo começa, mas uma etapa não conclui com o resultado esperado.

**Solução:**

1. Identifique o fluxo e a etapa no relatório.
2. Localize o teste ou comando executado pela etapa.
3. Consulte o erro original do Cypress.
4. Reproduza a especificação diretamente quando possível.
5. Verifique se a etapa depende de algum estado criado por uma etapa anterior.

Não modifique o mecanismo de orquestração para contornar uma falha que pertence ao teste ou à aplicação sem antes localizar sua origem.

### 8.3. Resultados divergentes entre execução direta e execução orquestrada

**Sintoma:** um teste passa quando executado isoladamente, mas falha pelo Flow Engine, ou vice-versa.

**Possíveis causas:**
- Diferença de configuração entre as execuções.
- Estado persistido no ParaBank.
- Dados preparados em momentos diferentes.
- Ordem das etapas.
- Limpeza de artefatos ou configuração específica de cada etapa.

**Solução:**

Compare os comandos e as configurações efetivamente utilizados, confirme o estado inicial dos dados e verifique a ordem de execução. Reproduza o cenário sob condições semelhantes antes de concluir que existe um defeito no Flow Engine.

## 9. Relatórios e evidências ausentes

### 9.1. `latest-report.html` não existe ou não foi atualizado

**Possíveis causas:**
- A execução não chegou à etapa de geração do relatório.
- O processo foi interrompido.
- A execução ocorreu diretamente pelo Cypress.
- A geração do relatório falhou.

**Solução:**

Confirme se foi executado `npm run flow` ou um comando direto do Cypress. Verifique o terminal e procure os arquivos de saída configurados para a modalidade utilizada.

O relatório `latest-report.html` é associado à execução mais recente processada pelo mecanismo que o produz; não deve ser presumido como resultado de qualquer execução Cypress.

### 9.2. Relatório JSON ausente ou incompleto

Verifique se o processo de geração foi concluído e se o arquivo corresponde ao identificador correto do fluxo.

Ao investigar uma falha, compare o HTML e o JSON da mesma execução. Não presuma que a estrutura JSON do Flow Engine corresponde à saída padrão do Cypress.

### 9.3. Capturas de tela não encontradas

O projeto organiza evidências do Flow Engine em uma estrutura semelhante a:

```text
cypress/evidence flow/<flow-id>/<step-id>/photos/
```

Confirme o identificador do fluxo, a etapa e a configuração da captura. Nem toda execução ou etapa necessariamente produz uma captura de tela.

### 9.4. Vídeos não gerados

A configuração global conhecida do Cypress utiliza `video: false`. Portanto, a ausência de vídeos pode ser esperada.

Antes de alterar a configuração, confirme se o mecanismo que executou os testes oferece gravação de vídeo e se essa funcionalidade está habilitada. Consulte a [documentação oficial do Cypress sobre screenshots e vídeos](https://docs.cypress.io/app/guides/screenshots-and-videos).

### 9.5. Evidências antigas desapareceram

A configuração `trashAssetsBeforeRuns` pode limpar artefatos antes de uma nova execução. O projeto utiliza `trashAssetsBeforeRuns: true` globalmente, e o Flow Engine pode aplicar configurações específicas às etapas.

Confirme a configuração efetiva antes de concluir que houve perda inesperada de arquivos. Se precisar preservar evidências para comparação, arquive-as antes de executar novamente.

## 10. Testes instáveis (flaky tests)

Um teste é considerado instável quando apresenta resultados diferentes em condições aparentemente equivalentes.

Não classifique automaticamente toda falha isolada como flakiness. Primeiro, verifique se o ambiente e os dados estavam em condições adequadas.

### Procedimento de investigação

1. Execute a especificação isoladamente.
2. Repita a execução mantendo as condições consistentes.
3. Compare mensagens de erro, tempos e capturas de tela.
4. Verifique dependências de estado, ordem de execução e dados compartilhados.
5. Examine seletores, sincronização e transições de página.
6. Registre as tentativas e a evidência que sustenta a conclusão.

Evite resolver instabilidade com esperas fixas indiscriminadas, repetição automática sem diagnóstico ou asserções mais fracas. Essas mudanças podem ocultar o problema original.

Se for utilizado um processo automatizado de repetição, cada tentativa deve ter seu resultado registrado para que a taxa de falhas possa ser avaliada corretamente.

## 11. Informações para registrar ao abrir um problema

Ao documentar uma falha, inclua:

- Identificador do caso de teste, quando disponível.
- Módulo e arquivo E2E.
- Comando executado.
- Resultado esperado e resultado observado.
- Mensagem de erro completa.
- Estado de disponibilidade do ParaBank.
- Informações relevantes sobre os dados preparados.
- Captura de tela ou trecho do relatório, quando disponível.
- Identificador do fluxo, se a execução foi orquestrada.
- Frequência da falha e resultado das tentativas de reprodução.

Não inclua senhas reais, tokens, dados pessoais desnecessários ou outras informações sensíveis nos registros.

## 12. Checklist de diagnóstico

- [ ] O erro original foi registrado.
- [ ] A disponibilidade do ParaBank foi verificada.
- [ ] O comando e a modalidade de execução foram identificados.
- [ ] Os dados de preparação foram validados.
- [ ] O teste foi reproduzido isoladamente, quando possível.
- [ ] As evidências correspondem à execução investigada.
- [ ] A causa foi classificada com base em evidências.
- [ ] A correção proposta não enfraquece as validações.
- [ ] Os resultados foram registrados para comparação futura.

## 13. Referências relacionadas

- [`installation.md`](installation.md) — instalação e preparação do ambiente.
- [`execution.md`](execution.md) — comandos e procedimentos de execução.
- [`test-data.md`](test-data.md) — preparação e ciclo de vida dos dados.
- [`test-strategy.md`](test-strategy.md) — estratégia de validação.
- [`test-catalog.md`](test-catalog.md) — catálogo dos cenários automatizados.
- [`flow-engine.md`](flow-engine.md) — arquitetura do mecanismo de orquestração.
- [`reporting.md`](reporting.md) — relatórios e evidências.
- [Documentação oficial do Cypress](https://docs.cypress.io/).

---

**Manutenção:** atualize este documento quando a estrutura dos testes, os scripts de execução, as configurações do ambiente ou os mecanismos de geração de relatórios e evidências forem alterados.