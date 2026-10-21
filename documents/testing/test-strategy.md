# Estratégia de testes

## 1. Objetivo

Este documento define a estratégia aplicada à suíte de testes automatizados do projeto `QA-automation-cypress`. Seu propósito é explicar o escopo da automação, a organização dos cenários, os princípios de preparação de dados e os critérios usados para avaliar os resultados.

A estratégia descreve o projeto como ele está organizado atualmente. Não representa uma certificação de cobertura completa, nem afirma que todos os cenários passam em todas as execuções. A estabilidade e os resultados reais devem ser demonstrados por execuções reproduzíveis.

## 2. Sistema sob teste

O sistema sob teste é o ParaBank, uma aplicação web bancária utilizada para exercitar fluxos de interface e regras funcionais relacionadas a clientes, contas e operações bancárias.

O Cypress interage com a interface web e valida os resultados observáveis da aplicação. A URL-base e o ambiente efetivamente utilizado são definidos pela configuração do projeto; antes da execução, confirme que a instância configurada está disponível e corresponde ao ambiente pretendido.

A suíte não deve ser interpretada como uma validação completa de um sistema bancário real. O foco é a automação de fluxos funcionais em uma aplicação de demonstração.

## 3. Objetivos da automação

A suíte busca:

- Verificar os principais fluxos funcionais implementados no projeto.
- Exercitar caminhos válidos e inválidos para identificar regressões visíveis pela interface.
- Padronizar a execução dos cenários e a identificação dos casos de teste.
- Registrar resultados e evidências para apoiar a análise de falhas.
- Permitir a execução individual de specs e a execução orquestrada pelo mecanismo de fluxo.
- Facilitar a manutenção e a expansão incremental da cobertura automatizada.

## 4. Escopo funcional

Os testes E2E estão organizados por funcionalidade:

| Área | Objetivo geral |
|---|---|
| Registro | Exercitar o cadastro de clientes e validações relacionadas aos dados de cadastro |
| Login | Verificar a autenticação e os comportamentos de entrada e saída implementados |
| Contas | Exercitar operações de conta disponíveis na interface |
| Pagamento de contas | Verificar o fluxo de pagamento de contas e suas validações |
| Empréstimos | Exercitar a solicitação de empréstimos e os resultados apresentados |
| Perfil | Verificar a consulta ou atualização de informações do cliente |
| Transferências | Exercitar transferências entre contas e a validação de entradas |

A existência de uma área de testes não significa que todas as regras de negócio possíveis daquela funcionalidade estejam cobertas. O escopo detalhado deve ser consultado no catálogo de testes e comparado com os arquivos E2E atuais.

## 5. Tipos de teste

A classificação deve acompanhar o que os testes realmente fazem:

- **E2E funcional:** interação com a interface do ParaBank para validar jornadas completas ou partes relevantes de uma jornada.
- **Regressão funcional:** reutilização dos cenários para verificar se comportamentos previamente implementados continuam funcionando após mudanças.
- **Validação negativa:** envio de dados inválidos ou condições não permitidas para verificar o comportamento de rejeição, quando esses cenários existem na suíte.
- **Exploratório:** não é executado automaticamente pela suíte apenas por haver testes automatizados; exige investigação manual ou uma atividade exploratória específica.

Não se deve afirmar que o projeto executa testes de segurança, carga, desempenho, acessibilidade ou integração de API apenas porque essas atividades poderiam complementar a suíte. Elas devem ser documentadas separadamente caso sejam implementadas e validadas.

## 6. Abordagem de desenho dos cenários

Os cenários são organizados por funcionalidade e identificados por convenções de ID, como `REGISTER001` e `TRANSFER001`.

Ao criar ou revisar um cenário, recomenda-se:

1. Definir um comportamento observável e um objetivo de teste.
2. Preparar os dados necessários de forma explícita.
3. Executar apenas as ações necessárias para alcançar a condição testada.
4. Verificar o resultado com assertions específicas.
5. Evitar depender de outro teste ter sido executado anteriormente.
6. Garantir que uma falha no preparo dos dados seja distinguível de uma falha na funcionalidade sob teste.

Os testes devem validar resultados de negócio, e não somente a presença de um elemento genérico na página. Por exemplo, após uma transferência, uma validação robusta deve confirmar a mensagem ou o resultado esperado e, quando viável, os dados da operação ou os saldos afetados.

Para cenários negativos, a assertion deve confirmar a rejeição esperada ou a mensagem de validação pertinente. A ausência de uma exceção no Cypress, por si só, não comprova que a aplicação se comportou corretamente.

## 7. Isolamento e preparação dos dados

A estratégia deve favorecer testes independentes, capazes de executar isoladamente e em qualquer ordem.

A preparação dos dados varia de acordo com a funcionalidade. O projeto contém uma fixture `registration.json` para dados-base de registro, enquanto alguns fluxos criam usuários ou contas durante a execução. Os dados gerados devem ser tratados como dados de execução, e os testes não devem depender de arquivos compartilhados ou de identificadores persistentes sem que essa dependência esteja explicitamente definida.

Princípios recomendados:

- Usar a fixture apenas para os dados estáticos para os quais ela foi criada.
- Gerar identificadores únicos quando o sistema exigir unicidade.
- Não presumir que os IDs de contas serão iguais entre execuções.
- Evitar compartilhar estado mutável entre specs.
- Documentar qualquer pré-condição do ambiente que não possa ser preparada pelo próprio teste.
- Tornar falhas de preparação identificáveis no resultado da execução.

A independência deve ser verificada por execução individual e por execução da suíte completa. O uso de `beforeEach()` pode ajudar no isolamento, mas não garante, por si só, que o teste seja independente de estado externo.

## 8. Assertions e critérios de qualidade

Cada caso deve conter assertions que comprovem o resultado esperado. A revisão dos testes deve verificar:

- A assertion falha quando o comportamento esperado não ocorre.
- A validação está ligada ao objetivo do cenário.
- Mensagens de sucesso ou erro são verificadas com especificidade suficiente.
- Operações com efeitos persistentes são verificadas quando isso é relevante e viável.
- As assertions não dependem apenas de tempos fixos de espera quando uma condição observável pode ser aguardada.
- A preparação do cenário não mascara falhas da funcionalidade testada.

A quantidade de testes aprovados não substitui a avaliação da qualidade das assertions. Um teste que passa sem comprovar a regra esperada não fornece evidência suficiente de conformidade.

## 9. Execução e interpretação dos resultados

Os cenários podem ser executados diretamente pelo Cypress, por spec ou por meio do mecanismo personalizado de fluxo.

Na execução direta, os resultados são os reportados pelo Cypress para a spec. Na execução orquestrada, o `flow-engine` agrega os resultados das etapas e aplica as condições definidas na configuração do fluxo.

É importante distinguir:

- **Resultado do teste:** estado individual do cenário reportado pelo Cypress.
- **Resultado da etapa:** resultado calculado pelo motor a partir das condições configuradas, dos testes coletados e de erros de execução.
- **Resultado do fluxo:** estado final da execução orquestrada.

Uma etapa ou fluxo aprovado não deve ser interpretado automaticamente como aprovação de todos os testes individuais. A avaliação deve incluir o resumo e os resultados por teste, além das regras configuradas para as etapas.

## 10. Estabilidade e flakiness

Um teste é considerado intermitente quando, sob condições comparáveis, alterna entre aprovação e reprovação sem uma mudança correspondente no código ou nos dados que explique a diferença.

A investigação de instabilidade deve considerar:

- Disponibilidade e estado da aplicação.
- Dados criados e persistidos entre execuções.
- Dependências de ordem entre cenários.
- Seletores frágeis.
- Sincronização com operações assíncronas.
- Diferenças entre execução local e execução automatizada.
- Erros de infraestrutura e de preparação.

A classificação de flakiness utilizada em campanhas específicas deve ser descrita no procedimento de execução correspondente. Não se deve classificar a suíte como estável sem uma amostra de execuções repetidas e resultados registrados.

## 11. Limites do escopo

A suíte é focada na automação funcional da interface web. Não comprova, isoladamente:

- A correção de todas as regras de negócio do ParaBank.
- A cobertura integral do sistema.
- A segurança da aplicação.
- A capacidade de carga ou o desempenho sob volume.
- O comportamento em todos os navegadores, sistemas operacionais ou configurações.
- A ausência de defeitos fora dos cenários implementados.

Essas dimensões exigiriam estratégias, ferramentas e evidências próprias.

## 12. Critérios recomendados para considerar um cenário pronto

Antes de incorporar ou modificar um caso de teste, verificar:

- [ ] O cenário possui ID único e objetivo claro.
- [ ] O resultado esperado é observável e documentado.
- [ ] As assertions comprovam o resultado esperado.
- [ ] Os dados necessários são preparados de forma explícita.
- [ ] O teste pode executar isoladamente.
- [ ] O teste não depende da ordem de execução de outras specs.
- [ ] A falha pode ser investigada com mensagem e evidência suficientes.
- [ ] O catálogo de testes está atualizado.
- [ ] A execução foi validada no ambiente documentado.

## 13. Manutenção desta estratégia

Atualize este documento quando houver mudança no escopo funcional, na abordagem de preparação de dados, nos critérios de aprovação ou na forma de execução e avaliação dos testes.

A documentação deve continuar distinguindo a estratégia adotada das melhorias recomendadas. Novas práticas só devem ser descritas como implementadas depois de serem incorporadas ao código e verificadas por execução.
