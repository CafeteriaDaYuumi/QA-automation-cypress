# Bug Reports — ParaBank

> Fonte: relatório Cypress `flow-24-10-2026_14-46-40-909`, executado em 24/10/2026.
>
> **Observação:** os relatos abaixo descrevem falhas observadas nos testes automatizados. O relatório não comprova sozinho a causa-raiz; validar o comportamento esperado e reproduzir manualmente antes de confirmar os bugs.

## BUG-TRANSFER-001 — Valor zero não apresenta validação visível na transferência

- **Módulo:** Transferências
- **Caso de teste relacionado:** `TRANSFER003`
- **Severidade sugerida:** Média
- **Prioridade sugerida:** Alta
- **Status:** A investigar
- **Ambiente:** ParaBank — execução automatizada com Cypress
- **Evidência:** `cypress/evidence flow/flow-24-10-2026_14-46-40-909/transfer/photos/transfer.cy.js/Transferências -- TRANSFER003 - deve impedir transferência com valor igual a zero (failed).png`
- **Erro observado:** `#showError` permaneceu com `display: none`; o Cypress esperou até 15 segundos pela visibilidade do elemento.

### Descrição
Ao tentar realizar uma transferência com valor igual a zero, o teste esperava uma mensagem de erro visível no elemento `#showError`, mas esse elemento não ficou visível durante a execução.

### Cenário BDD

```gherkin
Funcionalidade: Validação do valor de transferência

  Cenário: Impedir transferência com valor igual a zero
    Dado que o usuário está autenticado no ParaBank
    E possui contas disponíveis para transferência
    Quando informa o valor "0" para a transferência
    E confirma a operação
    Então o sistema deve impedir a transferência
    E deve apresentar uma mensagem de validação compreensível
    E o saldo das contas não deve ser alterado
```

### Resultado observado
O teste automatizado falhou ao verificar a visibilidade de `#showError`. O relatório não confirma se a transferência foi efetivada ou se o saldo foi alterado.

### Resultado esperado
O sistema deve rejeitar o valor zero e informar claramente o motivo, sem efetuar movimentação financeira.

---

## BUG-TRANSFER-002 — Valor negativo não apresenta validação visível na transferência

- **Módulo:** Transferências
- **Caso de teste relacionado:** `TRANSFER004`
- **Severidade sugerida:** Alta
- **Prioridade sugerida:** Alta
- **Status:** A investigar
- **Ambiente:** ParaBank — execução automatizada com Cypress
- **Evidência:** O relatório associa a falha ao screenshot nomeado para `TRANSFER003`; confirmar/corrigir a evidência específica de `TRANSFER004`.
- **Erro observado:** `#showError` permaneceu com `display: none`; o Cypress esperou até 15 segundos pela visibilidade do elemento.

### Descrição
Ao tentar realizar uma transferência com valor negativo, o teste não encontrou a mensagem de erro esperada visível no elemento `#showError`.

### Cenário BDD

```gherkin
Funcionalidade: Validação do valor de transferência

  Cenário: Impedir transferência com valor negativo
    Dado que o usuário está autenticado no ParaBank
    E possui contas disponíveis para transferência
    Quando informa um valor negativo para a transferência
    E confirma a operação
    Então o sistema deve rejeitar a operação
    E deve apresentar uma mensagem de validação compreensível
    E o saldo das contas não deve ser alterado
```

### Resultado observado
A asserção de visibilidade de `#showError` falhou. O relatório não informa se houve alteração de saldo ou se a operação foi processada.

### Resultado esperado
O sistema deve impedir transferências com valores negativos e explicar a rejeição ao usuário.

---

## BUG-TRANSFER-003 — Transferência para a mesma conta não apresenta validação visível

- **Módulo:** Transferências
- **Caso de teste relacionado:** `TRANSFER006`
- **Severidade sugerida:** Média
- **Prioridade sugerida:** Média
- **Status:** A investigar
- **Ambiente:** ParaBank — execução automatizada com Cypress
- **Evidência:** O relatório associa a falha ao screenshot nomeado para `TRANSFER003`; confirmar/corrigir a evidência específica de `TRANSFER006`.
- **Erro observado:** `#showError` permaneceu com `display: none`; o Cypress esperou até 15 segundos pela visibilidade do elemento.

### Descrição
Ao selecionar a mesma conta como origem e destino, o teste esperava uma mensagem de erro visível, mas o elemento `#showError` permaneceu oculto.

### Cenário BDD

```gherkin
Funcionalidade: Validação das contas de transferência

  Cenário: Impedir transferência entre a mesma conta
    Dado que o usuário está autenticado no ParaBank
    E possui uma conta disponível
    Quando seleciona essa mesma conta como origem e destino
    E informa um valor válido
    E confirma a operação
    Então o sistema deve rejeitar a transferência
    E deve informar que as contas de origem e destino precisam ser diferentes
    E o saldo da conta não deve ser alterado
```

### Resultado observado
O teste falhou ao verificar a visibilidade de `#showError`. O relatório não comprova se a operação foi concluída ou se houve alteração de saldo.

### Resultado esperado
O sistema deve impedir a transferência para a mesma conta e exibir uma orientação clara.

---

## BUG-LOAN-001 — Entrada negativa em Down Payment não apresenta erro visível

- **Módulo:** Solicitação de empréstimo
- **Caso de teste relacionado:** `LOAN009`
- **Severidade sugerida:** Alta
- **Prioridade sugerida:** Alta
- **Status:** A investigar
- **Ambiente:** ParaBank — execução automatizada com Cypress
- **Evidência:** `cypress/evidence flow/flow-24-10-2026_14-46-40-909/loan/photos/loan.cy.js/Solicitação de Empréstimo -- LOAN009 - deve apresentar erro ao informar Down Payment negativo (failed).png`
- **Erro observado:** o elemento `p.error` não ficou visível porque o elemento pai `#loanRequestDenied` permaneceu com `display: none`; timeout de 15 segundos.

### Descrição
Ao informar um valor negativo no campo Down Payment, o teste esperava encontrar uma mensagem de erro visível dentro da área `#loanRequestDenied`, mas essa área permaneceu oculta durante a execução.

### Cenário BDD

```gherkin
Funcionalidade: Validação dos dados da solicitação de empréstimo

  Cenário: Rejeitar Down Payment negativo
    Dado que o usuário está autenticado no ParaBank
    E acessa a funcionalidade de solicitação de empréstimo
    Quando informa um valor negativo no campo Down Payment
    E preenche os demais campos necessários
    E envia a solicitação
    Então o sistema deve rejeitar os dados inválidos
    E deve apresentar uma mensagem de validação compreensível
    E não deve aprovar nem efetivar o empréstimo
```

### Resultado observado
A asserção falhou porque `p.error` estava dentro de `#loanRequestDenied`, que estava oculto. O relatório não confirma se a solicitação foi aprovada ou se ocorreu qualquer movimentação.

### Resultado esperado
O sistema deve validar o Down Payment negativo, impedir o processamento indevido e informar claramente o erro.

---

## Resumo das falhas

| ID | Caso | Problema observado | Prioridade sugerida |
|---|---|---|---|
| BUG-TRANSFER-001 | `TRANSFER003` | Valor zero: mensagem esperada não ficou visível | Alta |
| BUG-TRANSFER-002 | `TRANSFER004` | Valor negativo: mensagem esperada não ficou visível | Alta |
| BUG-TRANSFER-003 | `TRANSFER006` | Mesma conta: mensagem esperada não ficou visível | Média |
| BUG-LOAN-001 | `LOAN009` | Down Payment negativo: mensagem esperada não ficou visível | Alta |

## Notas para triagem

1. As prioridades e severidades são sugestões iniciais, não valores medidos pelo relatório.
2. Antes de registrar como defeito confirmado, reproduzir os cenários na aplicação e verificar se o comportamento esperado faz parte dos requisitos do ParaBank.
3. Verificar se o seletor/estado esperado pelo teste está correto e se a aplicação apresenta a validação em outro elemento.
4. O relatório mostra uma inconsistência de evidência: as falhas `TRANSFER004` e `TRANSFER006` apontam para um screenshot cujo nome contém `TRANSFER003`.
5. A execução geral aparece como `passed`, apesar de registrar 4 testes reprovados. Revisar a lógica de status agregado do fluxo/relatório.
