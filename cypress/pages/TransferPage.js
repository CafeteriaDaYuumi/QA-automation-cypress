class TransferPage {

    // --- NAVEGAÇÃO ---

    get transferLink() {
        return cy.get('a[href="transfer.htm"]')
    }

    // --- CAMPOS DO FORMULÁRIO ---

    get transferForm() {
        return cy.get('#transferForm')
    }

    get transferAmount() {
        return cy.get('#amount')
    }

    get fromAccount() {
        return cy.get('#fromAccountId')
    }

    get toAccount() {
        return cy.get('#toAccountId')
    }

    // --- BOTÕES E AÇÕES DO FORMULÁRIO ---

    get transferButton() {
        return cy.get('#transferForm input[type="submit"]')
    }

    // --- RESULTADOS DA TRANSFERÊNCIA ---

    get transferResult() {
        return cy.get('#showResult')
    }

    get transferAmountResult() {
        return cy.get('#amountResult')
    }

    get transferFromAccountResult() {
        return cy.get('#fromAccountIdResult')
    }

    get transferToAccountResult() {
        return cy.get('#toAccountIdResult')
    }

    get transferError() {
        return cy.get('#showError')
    }

    // --- VALIDAÇÕES DO FORMULÁRIO ---

    get title(){
        return cy.get('#showForm > .title')
    }

    get emptyAmountError() {
        return cy.get('#amount\\\\.errors').eq(0)
    }

    get invalidAmountError() {
        return cy.get('#amount\\\\.errors').eq(1)
    }

    // --- ACESSO À TRANSFERÊNCIA ---

    accessTransfer() {
        this.transferLink.click()
    }

    // --- PREENCHIMENTO DO VALOR ---

    fillAmount(amount) {
        this.transferAmount
            .clear()
            .type(amount)
    }

    // --- SELEÇÃO DAS CONTAS ---

    selectFromAccount(account) {
        this.fromAccount.select(account.toString())
    }

    selectToAccount(account) {
        this.toAccount.select(account.toString())
    }

    // --- ENVIO DA TRANSFERÊNCIA ---

    submitTransfer() {
        this.transferButton.click()
    }

    // --- CONTAS DISPONÍVEIS ---

    getAvailableAccounts() {
        return this.fromAccount
            .find('option')
            .then(($options) => {
                return [...$options]
                    .map((option) => option.value)
                    .filter((value) => value)
            })
    }
}

export default new TransferPage()
