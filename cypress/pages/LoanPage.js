class LoanPage {

    // --- FORMULÁRIO ---

    get loanAmount() {
        return cy.get('#amount');
    }

    get downPayment() {
        return cy.get('#downPayment');
    }

    get fromAccount() {
        return cy.get('#fromAccountId');
    }

    get applyButton() {
        return cy.get('input[type="button"][value="Apply Now"]');
    }

    // --- RESULTADO ---

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
    
    // --- ERRO --- 

    get loanError() {
        return cy.get('#requestLoanError');
    }
    get loanErrorMessage() {
        return cy.get('#requestLoanError > .error');
    }

    // --- AÇÕES ---

    fillLoanForm(amount, downPayment, account) {
        this.loanAmount
            .clear()
            .type(amount);

        this.downPayment
            .clear()
            .type(downPayment);

        this.fromAccount.select(account);
    }

    applyForLoan() {
        this.applyButton.click();
    }

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