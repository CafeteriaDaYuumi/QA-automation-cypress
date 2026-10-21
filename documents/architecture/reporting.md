# Relatórios de execução

## 1. Objetivo

Este documento descreve os relatórios produzidos pelo mecanismo de execução de fluxos do projeto `QA-automation-cypress`, incluindo os formatos disponíveis, os dados registrados, os diretórios de saída e as limitações conhecidas.

A referência principal é `cypress/flows/engine/flow-engine.js`. O comportamento descrito aqui corresponde à implementação presente no projeto no momento da análise.

## 2. Visão geral

O mecanismo produz relatórios em dois formatos:

- **HTML (`report.html`)**: apresentação visual para consulta manual.
- **JSON (`report.json`)**: estrutura de dados para inspeção técnica ou processamento posterior.

Os arquivos são gravados tanto no histórico da execução quanto em caminhos fixos que representam a execução mais recente.

```text
cypress/
├── reports/
│   ├── latest-report.html
│   ├── latest-report.json
│   └── history/
│       └── <flow-id>/
│           ├── report.html
│           └── report.json
└── evidence flow/
    └── <flow-id>/
        └── <step-id>/
            ├── photos/
            └── videos/
```

Os diretórios `photos/` e `videos/` são configurados pelo motor ao executar cada etapa. A presença de arquivos dentro deles depende do resultado e do comportamento do Cypress; a configuração global atual desativa a gravação de vídeo (`video: false`).

## 3. Onde encontrar os relatórios

| Arquivo ou diretório | Finalidade |
|---|---|
| `cypress/reports/latest-report.html` | Relatório HTML da execução mais recente do fluxo |
| `cypress/reports/latest-report.json` | Dados JSON da execução mais recente do fluxo |
| `cypress/reports/history/<flow-id>/report.html` | Relatório HTML preservado para uma execução específica |
| `cypress/reports/history/<flow-id>/report.json` | Dados JSON preservados para uma execução específica |
| `cypress/evidence flow/<flow-id>/<step-id>/photos/` | Diretório configurado para screenshots da etapa |
| `cypress/evidence flow/<flow-id>/<step-id>/videos/` | Diretório configurado para vídeos da etapa |

O `flow-id` é criado no início do fluxo no formato `flow-DD-MM-AAAA_HH-MM-SS-mmm`, usando a data e hora locais do processo. O identificador é utilizado para separar o histórico e as evidências de diferentes execuções.

Os arquivos `latest-report.*` são sobrescritos a cada atualização do relatório. Para consultar uma execução anterior, utilize o diretório correspondente em `history/<flow-id>/`.

## 4. Quando os relatórios são gravados

O mecanismo chama a rotina de gravação:

1. No início do fluxo, com status inicial `running`.
2. Depois que cada etapa termina e seus resultados são adicionados ao relatório.
3. No encerramento do fluxo, para registrar o status final, o horário de término, a duração e a mensagem final.

Assim, se uma etapa reprovar, o relatório é atualizado com os resultados coletados até aquele ponto e a execução é interrompida. Se ocorrer um erro inesperado tratado pelo motor, ele registra a mensagem e tenta gravar o relatório final.

A gravação ocorre pelo próprio processo Node.js que executa `npm run flow`. Uma interrupção abrupta do processo ou da máquina pode impedir a última atualização; nesse caso, o relatório existente pode permanecer com status `running`.

## 5. Conteúdo do relatório HTML

O relatório HTML apresenta as seguintes áreas.

### 5.1. Resumo dos testes

O resumo apresenta os contadores:

- **Total**: quantidade de resultados de teste registrados no relatório.
- **Aprovados (`passed`)**: testes cujo estado reportado pelo Cypress é `passed`.
- **Reprovados (`failed`)**: testes cujo estado é `failed`.
- **Pendentes (`pending`)**: estados que não foram classificados como `passed`, `failed` ou `skipped`.
- **Ignorados (`skipped`)**: testes cujo estado é `skipped`.

Os contadores são calculados sobre os testes coletados pelo motor, e não representam uma medição independente de cobertura funcional.

### 5.2. Dados da execução

O relatório mostra:

- Identificador da execução (`flowId`).
- Nome do fluxo (`flowName`).
- Status geral.
- Data e hora de início e término.
- Duração total.
- Mensagem associada ao estado final ou à falha.

As datas são formatadas para exibição no padrão local `pt-BR`. A duração é apresentada em minutos e segundos.

### 5.3. Resultados por teste

Cada linha de teste pode apresentar:

| Campo | Significado |
|---|---|
| Status | Estado retornado pelo Cypress para o teste |
| Teste | Título do caso executado |
| Spec | Caminho relativo do arquivo de teste |
| Duração | Duração registrada para a última tentativa, quando disponível |
| Erro | Mensagem de erro da última tentativa ou erro exibido pelo Cypress |
| Screenshot | Caminho da screenshot associada pelo mecanismo, quando encontrada |

A mensagem de erro pode ficar vazia quando o teste não falhou ou quando o resultado não contém uma mensagem utilizável. A screenshot também pode não estar disponível para uma falha.

### 5.4. Etapas do fluxo

A tabela de etapas apresenta o nome, o arquivo spec, o status da etapa, o total de testes, a quantidade de aprovados e reprovados e a duração.

O status da etapa é diferente do status individual de cada teste. A decisão de aprovar ou reprovar uma etapa considera as condições configuradas para ela, além de erros de execução e da existência de resultados.

## 6. Estrutura do JSON

O objeto principal do relatório contém estes campos:

| Campo | Descrição |
|---|---|
| `reportVersion` | Versão declarada do formato do relatório |
| `flowId` | Identificador único da execução |
| `flowName` | Nome configurado para o fluxo |
| `status` | Estado geral, inicialmente `running` e finalizado como `passed` ou `failed` |
| `startedAt` | Data/hora de início em ISO 8601 |
| `endedAt` | Data/hora de término em ISO 8601; permanece `null` enquanto não finalizado |
| `durationMs` | Duração total em milissegundos |
| `summary` | Contadores dos estados dos testes |
| `steps` | Resultados das etapas executadas |
| `tests` | Resultados individuais coletados |
| `message` | Mensagem de andamento, conclusão ou erro |

Cada item de `steps` registra o identificador e o nome da etapa, o caminho do spec, o status, os horários de início e fim, a duração, o resumo de testes e a mensagem de erro, quando houver.

Cada item de `tests` registra a etapa relacionada, o identificador da etapa, o spec, o título do teste, o estado, a duração em milissegundos, o erro e o caminho de screenshot, quando localizado.

O JSON é gravado com indentação para facilitar a leitura manual. O formato é uma saída da implementação atual, não um contrato de API versionado externamente; alterações em seus campos devem ser refletidas neste documento.

## 7. Como interpretar o resultado geral

### Fluxo aprovado

O fluxo termina com status `passed` quando todas as etapas executadas retornam aprovação de acordo com as regras do motor.

### Fluxo reprovado ou interrompido

O fluxo termina com status `failed` quando uma etapa falha, ocorre erro de execução ou uma condição obrigatória não é satisfeita. As etapas seguintes não são executadas após a primeira etapa reprovada.

### Atenção: etapa aprovada não significa todos os testes aprovados

No arquivo `cypress/flows/config/complete.config.js`, cada etapa define uma ou mais condições obrigatórias, normalmente associadas a um teste principal do fluxo. O motor verifica se esses testes existem e se possuem o estado esperado.

Falhas em outros testes da mesma spec são registradas no relatório, mas não reprovam necessariamente a etapa se todas as condições configuradas forem satisfeitas, não houver erro de execução e houver pelo menos um teste coletado.

Por isso, ao avaliar uma execução, consulte tanto o **status da etapa e do fluxo** quanto os **estados individuais dos testes** e os contadores do resumo. Não interprete `passed` do fluxo como prova de que todos os cenários da spec passaram.

## 8. Screenshots e rastreabilidade

Durante cada etapa, o motor define os diretórios de screenshots e vídeos com base no identificador do fluxo e no identificador da etapa. O Cypress também está configurado para tirar screenshot quando um teste falha.

Ao montar o relatório, o motor tenta associar uma screenshot aos testes reprovados usando os metadados disponíveis no resultado do Cypress e comparando títulos com nomes ou caminhos de screenshots.

**Limitação conhecida:** essa associação é heurística. A implementação procura uma screenshot marcada como falha ou cujo nome/caminho contenha parte do título do teste. Em uma execução com várias falhas, esse método pode não garantir que a screenshot selecionada pertença exatamente ao teste exibido. Quando a rastreabilidade da evidência for importante, confira o caminho no relatório com os arquivos presentes no diretório de evidências.

O relatório apresenta o caminho da screenshot, não uma imagem incorporada. A visualização depende de abrir o arquivo correspondente no ambiente onde a execução foi realizada.

## 9. Execução e acesso

Para iniciar o fluxo completo e gerar/atualizar os relatórios:

```bash
npm run flow
```

Após a execução, abra `cypress/reports/latest-report.html` para consultar o resultado mais recente. Para comparar execuções anteriores, consulte as pastas dentro de `cypress/reports/history/`.

Os scripts `flow:register`, `flow:login`, `flow:accounts` e `flow:transfer` executam specs diretamente pelo Cypress, conforme o `package.json`. Eles não passam pela rotina `executeFlow()` do motor e, portanto, não devem ser presumidos como geradores dos relatórios consolidados `latest-report.*` e `history/<flow-id>/report.*`.

## 10. Limitações e pontos de atenção

- O histórico não possui uma política automática de retenção ou limpeza implementada nesta rotina; o diretório pode crescer com o tempo.
- Os arquivos `latest-report.html` e `latest-report.json` representam apenas a última atualização e são sobrescritos.
- O status da etapa é determinado por condições configuradas, não exclusivamente pela quantidade de testes reprovados.
- A associação de screenshots não é garantida em cenários com múltiplas falhas.
- A configuração global contém `trashAssetsBeforeRuns: true`, enquanto a chamada do motor configura `trashAssetsBeforeRuns: false` para as execuções de etapa. O comportamento deve ser considerado ao investigar retenção e limpeza de artefatos.
- A configuração atual define `video: false`; embora o motor informe um diretório de vídeos por etapa, não se deve presumir que arquivos de vídeo serão gerados.
- Os relatórios consolidados são produzidos pelo fluxo personalizado. Uma execução direta de uma spec pode produzir artefatos próprios do Cypress, mas não segue automaticamente o mesmo mecanismo de consolidação.

## 11. Checklist de manutenção

Ao alterar o mecanismo de relatórios, confirme:

- [ ] Os campos do JSON correspondem aos dados coletados.
- [ ] Os contadores refletem corretamente os estados dos testes.
- [ ] O status final diferencia aprovação, reprovação e execução interrompida.
- [ ] O relatório continua sendo atualizado após cada etapa e ao final.
- [ ] Os arquivos do histórico não sobrescrevem execuções anteriores.
- [ ] `latest-report.*` aponta para a execução mais recente.
- [ ] Os caminhos de screenshots correspondem às evidências existentes.
- [ ] O HTML escapa os valores dinâmicos apresentados.
- [ ] Os comandos documentados foram verificados no `package.json`.
- [ ] Este documento foi atualizado junto com qualquer mudança de formato ou comportamento.
