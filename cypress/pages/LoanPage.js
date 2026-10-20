class LoanPage {

    // --- CAMPOS DO FORMULÁRIO ---

    get loanAmount() {
        return cy.get('#amount');
    }

    get downPayment() {
        return cy.get('#downPayment');
    }

    get fromAccount() {
        return cy.get('#fromAccountId');
    }

    // --- BOTÕES E AÇÕES DO FORMULÁRIO ---

    get applyButton() {
        return cy.get('input[type="button"][value="Apply Now"]');
    }

    // --- RESULTADO DA SOLICITAÇÃO ---

    get requestLoanResult() {
        return cy.get('#requestLoanResult');
    }

    get loanProvider() {
        return cy.get('#loanProviderName');
    }

    get responseDate() {
        return cy.get('#responseDate');
    }

    get loanStatus() {
        return cy.get('#loanStatus');
    }

    // --- EMPRÉSTIMO APROVADO ---

    get loanApproved() {
        return cy.get('#loanRequestApproved');
    }

    get loanApprovedMessage() {
        return cy.get('#loanRequestApproved > :nth-child(1)');
    }

    get newAccountId() {
        return cy.get('#newAccountId');
    }

    // --- EMPRÉSTIMO NEGADO ---

    get loanDenied() {
        return cy.get('#loanRequestDenied');
    }

    get loanDeniedMessage() {
        return cy.get('#loanRequestDenied p.error');
    }

    // --- ERROS DA SOLICITAÇÃO ---

    get loanError() {
        return cy.get('#requestLoanError');
    }

    get loanErrorMessage() {
        return cy.get('#requestLoanError > .error');
    }

    // --- PREENCHIMENTO DO FORMULÁRIO ---

    fillLoanForm(amount, downPayment, account) {
        this.loanAmount
            .clear()
            .type(amount);

        this.downPayment
            .clear()
            .type(downPayment);

        this.fromAccount.select(account);
    }

    // --- ENVIO DA SOLICITAÇÃO ---

    applyForLoan() {
        this.applyButton.click();
    }

    // --- FLUXO DE SOLICITAÇÃO DE EMPRÉSTIMO ---

    requestLoan(amount, downPayment, account) {
        this.fillLoanForm(amount, downPayment, account);
        this.applyForLoan();
    }

    // --- CONTAS DISPONÍVEIS ---

    getAvailableAccounts() {
        return this.fromAccount
            .find('option')
            .then(($options) =>
                [...$options].map((option) => option.value)
            );
    }
}

export default new LoanPage();
