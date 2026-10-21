# Installation

## 1. Objetivo

Este documento descreve os pré-requisitos, a instalação das dependências e a preparação do ambiente local para executar o projeto `QA-automation-cypress`.

O projeto utiliza Cypress para automatizar testes end-to-end (E2E) da aplicação ParaBank, com suporte a Page Objects, execução de fluxos automatizados, relatórios e evidências de execução.

A instalação deve preparar tanto as dependências do projeto quanto a aplicação que será utilizada como sistema sob teste.

## 2. Pré-requisitos

Antes de iniciar, verifique se as seguintes ferramentas estão disponíveis.

| Ferramenta | Finalidade |
|---|---|
| Git | Clonar o repositório e controlar as alterações locais. |
| Node.js | Executar o projeto e as ferramentas JavaScript. |
| npm | Instalar dependências e executar scripts definidos no `package.json`. |
| Cypress | Executar os testes E2E no navegador. |
| ParaBank | Aplicação utilizada como sistema sob teste. |
| Docker Desktop | Alternativa para executar o ParaBank em um contêiner, conforme a configuração utilizada no ambiente. |

As versões efetivamente compatíveis devem ser verificadas no `package.json`, no arquivo de lock do npm e na configuração do projeto. Evite atualizar versões principais das dependências sem validar o impacto sobre os testes.

## 3. Obter o projeto

Clone o repositório:

```bash
git clone https://github.com/CafeteriaDaYuumi/QA-automation-cypress.git
```

Entre na pasta do projeto:

```bash
cd QA-automation-cypress
```

Se o repositório já estiver disponível localmente, abra um terminal na raiz do projeto.

Confirme que a pasta contém, entre outros arquivos, o `package.json`, o `package-lock.json` e o `cypress.config.js`.

## 4. Instalar as dependências

Na raiz do projeto, execute:

```bash
npm ci
```

O comando instala as dependências registradas no arquivo de lock, proporcionando uma instalação reproduzível em ambientes compatíveis.

Se o projeto ainda não tiver um arquivo de lock válido, verifique o estado do repositório antes de optar por `npm install`. Não exclua o `package-lock.json` apenas para contornar um erro de instalação.

Após a instalação, verifique a versão do Node.js:

```bash
node --version
```

Verifique a versão do npm:

```bash
npm --version
```

Consulte a versão instalada do Cypress:

```bash
npx cypress version
```

Se o Cypress solicitar a instalação de seu binário, permita que o processo seja concluído e repita a verificação.

## 5. Preparar o ParaBank

O ParaBank é a aplicação sobre a qual os testes automatizados são executados. Antes de iniciar os testes, confirme que a aplicação está em execução e acessível pela URL configurada no projeto.

A configuração de referência do Cypress utiliza:

```text
http://localhost:8080/parabank
```

Essa URL deve ser confirmada em `cypress.config.js` antes da execução. Se o ambiente local utilizar outro endereço ou porta, ajuste a configuração de forma consciente e verifique se a aplicação está realmente disponível nesse endereço.

### 5.1. Executar o ParaBank com Docker

Se optar por executar a aplicação em um contêiner, verifique primeiro se o Docker Desktop está iniciado.

Consulte o estado do Docker:

```bash
docker version
```

Liste os contêineres em execução:

```bash
docker ps
```

Liste também os contêineres interrompidos:

```bash
docker ps -a
```

O projeto já foi utilizado com a imagem `parasoft/parabank:latest`. Se essa continuar sendo a imagem adotada no ambiente, confira a disponibilidade e as instruções atuais de execução antes de criar o contêiner.

Não reutilize automaticamente comandos antigos de inicialização sem conferir as portas, os mapeamentos e o estado do contêiner. Um contêiner existente pode estar parado ou pode ter falhado ao reservar uma porta no host.

### 5.2. Validar a aplicação

Depois de iniciar o ParaBank, abra a URL configurada no Cypress em um navegador.

Confirme que:

- A aplicação responde no endereço esperado.
- A página inicial do ParaBank é carregada.
- As páginas necessárias aos testes podem ser acessadas.
- Não há erro de conexão, indisponibilidade ou conflito de porta.

Se a aplicação não estiver disponível, resolva o problema do ambiente antes de interpretar falhas dos testes como defeitos funcionais.

## 6. Verificar a configuração do Cypress

O arquivo `cypress.config.js` centraliza a configuração utilizada na execução dos testes.

Antes de executar o projeto, confira:

- `baseUrl`: endereço-base da aplicação.
- `e2e.specPattern`: padrão utilizado para localizar os testes E2E.
- Configurações de vídeo e capturas de tela.
- Opções que influenciam a limpeza de artefatos de execução.
- Eventuais opções de ambiente necessárias aos testes.

Não altere configurações apenas para fazer um teste isolado passar. Mudanças globais podem afetar os demais módulos e o comportamento do Flow Engine.

O Cypress deve ser executado a partir da raiz do projeto para que os caminhos relativos e os scripts npm sejam resolvidos corretamente.

## 7. Conferir os scripts disponíveis

Para consultar os scripts definidos no `package.json`, execute:

```bash
npm run
```

Esse comando lista os scripts disponíveis no projeto. Utilize os nomes efetivamente apresentados pelo npm, pois a lista pode mudar conforme a versão do repositório.

O projeto possui uma execução orquestrada pelo Flow Engine, iniciada pelo script:

```bash
npm run flow
```

Essa execução deve ser utilizada quando o objetivo for executar o fluxo completo configurado no projeto.

Também existem scripts voltados a módulos específicos. Consulte o `package.json` antes de utilizá-los e diferencie a execução direta de uma especificação Cypress da execução orquestrada pelo Flow Engine.

Os comandos de execução e a estrutura de relatórios são detalhados em [`execution.md`](execution.md).

## 8. Estrutura relevante após a instalação

Os principais diretórios e arquivos relacionados à execução são:

```text
QA-automation-cypress/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── pages/
│   ├── flows/
│   ├── reports/
│   └── support/
├── cypress.config.js
├── package.json
└── package-lock.json
```

Essa representação é simplificada e serve para localizar as áreas principais do projeto. Consulte [`project-structure.md`](project-structure.md) para a descrição detalhada da estrutura existente.

## 9. Primeira execução

Depois de instalar as dependências e confirmar a disponibilidade do ParaBank:

1. Entre na raiz do projeto.
2. Verifique se o `baseUrl` corresponde ao ambiente em execução.
3. Consulte os scripts disponíveis com `npm run`.
4. Execute inicialmente um teste ou módulo específico.
5. Examine o resultado no terminal e as evidências produzidas.
6. Quando a execução individual estiver funcionando, execute o fluxo completo com `npm run flow`.

A execução inicial deve ser tratada como uma validação do ambiente. Caso ocorram falhas, verifique primeiro a disponibilidade da aplicação, as dependências, os dados necessários e as mensagens do Cypress.

## 10. Problemas comuns durante a instalação

### 10.1. Node.js ou npm não encontrados

Confirme se o Node.js foi instalado e se o diretório dos executáveis está disponível no `PATH`.

```bash
node --version
npm --version
```

Se os comandos não forem reconhecidos, corrija a instalação ou as variáveis de ambiente antes de continuar.

### 10.2. Falha no `npm ci`

Verifique se o `package-lock.json` corresponde ao `package.json`, se a conexão com o registro npm está funcionando e se a versão do Node.js é compatível com as dependências do projeto.

Evite apagar arquivos de configuração como primeira tentativa de correção. Identifique a causa específica no log de instalação.

### 10.3. Binário do Cypress indisponível

Execute:

```bash
npx cypress version
```

Se o binário não estiver instalado, consulte a mensagem apresentada pelo Cypress e permita a instalação necessária. Se o problema persistir, investigue permissões, cache e conectividade.

### 10.4. ParaBank indisponível

Confirme o estado do contêiner, os logs e o mapeamento das portas.

```bash
docker ps -a
```

Se houver um conflito de portas no Windows, investigue a porta indicada pelo erro e as reservas do sistema. Não presuma que uma porta está livre apenas porque nenhum contêiner aparece usando-a.

### 10.5. Cypress não encontra os testes

Confirme que o terminal está na raiz do projeto e que os arquivos E2E estão no padrão de caminhos configurado em `cypress.config.js`.

Consulte [`troubleshooting.md`](troubleshooting.md) para outros procedimentos de diagnóstico.

## 11. Boas práticas

- Utilize `npm ci` para instalações reproduzíveis quando houver um arquivo de lock válido.
- Preserve o `package-lock.json` no controle de versão.
- Evite atualizar dependências sem necessidade ou sem validar os testes.
- Mantenha a configuração do ambiente consistente entre execuções.
- Não armazene credenciais reais ou segredos nos arquivos versionados.
- Resolva problemas de disponibilidade do ParaBank antes de investigar falhas funcionais.
- Documente alterações relevantes nos requisitos de instalação.

## 12. Referências relacionadas

- [`README.md`](../README.md) — apresentação e entrada principal do projeto.
- [`project-structure.md`](project-structure.md) — organização dos diretórios e arquivos.
- [`execution.md`](execution.md) — comandos e procedimentos de execução.
- [`troubleshooting.md`](troubleshooting.md) — diagnóstico de problemas.
- [`contributing.md`](contributing.md) — diretrizes para contribuir com o projeto.

---

**Manutenção:** atualize este documento quando os pré-requisitos, as dependências, a configuração do Cypress ou o procedimento de inicialização do ParaBank forem alterados.