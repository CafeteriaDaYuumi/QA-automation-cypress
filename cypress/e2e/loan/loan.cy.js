import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import LoanPage from '../../pages/LoanPage';

describe('Solicitação de Empréstimo', () => {

    let user;
    let account;

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.fixture('createdUser').then((createdUser) => {
            user = createdUser;
        });
    });

    beforeEach(() => {
        LoginPage.visit();

        LoginPage.login(user);

        HomePage.accessLoan();

        LoanPage.getAvailableAccounts().then((accounts) => {
            expect(
                accounts,
                'Deve existir pelo menos uma conta disponível'
            ).to.have.length.greaterThan(0);

            account = accounts[0];
        });
    });

    it('LOAN001 - deve solicitar um empréstimo com dados válidos', () => {

        LoanPage.requestLoan('1000', '100', account);

        cy.screenshot('Loan/LOAN001-before');

        LoanPage.requestLoanResult
            .should('be.visible');

        LoanPage.loanStatus
            .should('have.text', 'Approved');

        LoanPage.loanApproved
            .should('be.visible');

        LoanPage.loanApprovedMessage
            .should(
                'have.text',
                'Congratulations, your loan has been approved.'
            );

        LoanPage.loanProvider
            .should('be.visible')
            .and('not.be.empty');

        LoanPage.responseDate
            .should('be.visible')
            .and('not.be.empty');

        LoanPage.newAccountId
            .should('be.visible')
            .and('not.be.empty');

        cy.screenshot('Loan/LOAN001-result');
    });

    it('LOAN002 - deve solicitar um empréstimo com Down Payment igual a zero', () => {

        LoanPage.requestLoan('1000', '0', account);

        cy.screenshot('Loan/LOAN002-before');

        LoanPage.requestLoanResult
            .should('be.visible');

        LoanPage.loanStatus
            .should('have.text', 'Approved');

        LoanPage.loanApproved
            .should('be.visible');

        LoanPage.loanApprovedMessage
            .should(
                'have.text',
                'Congratulations, your loan has been approved.'
            );

        cy.screenshot('Loan/LOAN002-result');
    });

    it('LOAN003 - deve negar empréstimo com Down Payment acima do saldo disponível', () => {

        LoanPage.requestLoan('1000', '999999999', account);

        cy.screenshot('Loan/LOAN003-before');

        LoanPage.requestLoanResult
            .should('be.visible');

        LoanPage.loanStatus
            .should('have.text', 'Denied');

        LoanPage.loanDenied
            .should('be.visible');

        LoanPage.loanDeniedMessage
            .should(
                'have.text',
                'You do not have sufficient funds for the given down payment.'
            );

        cy.screenshot('Loan/LOAN003-result');
    });

    it('LOAN004 - deve negar empréstimo quando não houver fundos suficientes', () => {

        LoanPage.requestLoan('999999999', '100', account);

        cy.screenshot('Loan/LOAN004-before');

        LoanPage.requestLoanResult
            .should('be.visible');

        LoanPage.loanStatus
            .should('have.text', 'Denied');

        LoanPage.loanDenied
            .should('be.visible');

        LoanPage.loanDeniedMessage
            .should('be.visible')
            .and('not.be.empty');

        cy.screenshot('Loan/LOAN004-result');
    });

    it('LOAN005 - deve apresentar erro ao não informar o Down Payment', () => {

        LoanPage.loanAmount
            .clear()
            .type('1000');

        LoanPage.downPayment
            .clear();

        LoanPage.fromAccount
            .select(account);

        cy.screenshot('Loan/LOAN005-before');

        LoanPage.applyForLoan();

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            );

        cy.screenshot('Loan/LOAN005-result');
    });

    it('LOAN006 - deve apresentar erro ao não informar o Loan Amount', () => {

        LoanPage.loanAmount
            .clear();

        LoanPage.downPayment
            .clear()
            .type('100');

        LoanPage.fromAccount
            .select(account);

        cy.screenshot('Loan/LOAN006-before');

        LoanPage.applyForLoan();

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            );

        cy.screenshot('Loan/LOAN006-result');
    });

    it('LOAN007 - deve apresentar erro ao informar Down Payment inválido', () => {

        LoanPage.loanAmount
            .clear()
            .type('1000');

        LoanPage.downPayment
            .clear()
            .type('abc');

        LoanPage.fromAccount
            .select(account);

        cy.screenshot('Loan/LOAN007-before');

        LoanPage.applyForLoan();

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            );

        cy.screenshot('Loan/LOAN007-result');
    });

    it('LOAN008 - deve apresentar erro ao informar Loan Amount inválido', () => {

        LoanPage.loanAmount
            .clear()
            .type('abc');

        LoanPage.downPayment
            .clear()
            .type('100');

        LoanPage.fromAccount
            .select(account);

        cy.screenshot('Loan/LOAN008-before');

        LoanPage.applyForLoan();

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            );

        cy.screenshot('Loan/LOAN008-result');
    });

    it('LOAN009 - deve apresentar erro ao informar Down Payment negativo', () => {

        LoanPage.requestLoan('1000', '-100', account);

        cy.screenshot('Loan/LOAN009-before');

        cy.get('#loanRequestDenied > .error')
            .should('be.visible');

        /*
         * DEVIDO AO BUG ATUAL NÃO SEI A MENSAGEM QUE DEVERIA APARECER
         */

        cy.screenshot('Loan/LOAN009-result');
    });

    it('LOAN010 - deve apresentar erro ao informar Loan Amount negativo', () => {

        LoanPage.requestLoan('-1000', '100', account);

        cy.screenshot('Loan/LOAN010-before');

        cy.get('#loanRequestDenied > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'We cannot grant a loan in that amount with your available funds.'
            );

        cy.screenshot('Loan/LOAN010-result');
    });

});

