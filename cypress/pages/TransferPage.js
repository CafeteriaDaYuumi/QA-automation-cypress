class TransferPage {

    // --- NAVEGAÇÃO ---

    get transferLink() {
        return cy.get('a[href="transfer.htm"]')
    }

    // --- FORMULÁRIO ---

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

    get transferButton() {
        return cy.get('#transferForm input[type="submit"]')
    }

    // --- RESULTADOS ---

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

    // --- VALIDAÇÕES ---

    get emptyAmountError() {
        return cy.get('#amount\\.errors').eq(0)
    }

    get invalidAmountError() {
        return cy.get('#amount\\.errors').eq(1)
    }

    // --- AÇÕES ---

    accessTransfer() {
        this.transferLink.click()
    }

    fillAmount(amount) {
        this.transferAmount
            .clear()
            .type(amount)
    }

    selectFromAccount(account) {
        this.fromAccount.select(account.toString())
    }

    selectToAccount(account) {
        this.toAccount.select(account.toString())
    }

    submitTransfer() {
        this.transferButton.click()
    }

    // --- CONTAS ---

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