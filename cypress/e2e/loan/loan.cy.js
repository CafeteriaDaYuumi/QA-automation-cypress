
import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'
import LoanPage from '../../pages/LoanPage'

describe('Solicitação de Empréstimo', () => {
    let user
    let account

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()

        // Cria um usuário independente para cada teste
        cy.fixture('registration').then((data) => {
            user = {
                ...data.validUser,
                username: `QA-loa_${Date.now()}`
            }

            // Cadastro
            HomePage.visit()
            HomePage.accessRegister()
            RegisterPage.register(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            // Encerra a sessão do usuário recém-cadastrado
            HomePage.logout()

            // Login com o usuário criado neste teste
            LoginPage.visit()
            LoginPage.login(user)

            cy.url().should('include', '/overview.htm')

            // Acessa empréstimos
            HomePage.accessLoan()

            // Obtém uma conta disponível para o empréstimo
            LoanPage.getAvailableAccounts().then((accounts) => {
                expect(
                    accounts,
                    'Deve existir pelo menos uma conta disponível'
                ).to.have.length.greaterThan(0)

                account = accounts[0]
            })
        })
    })

    it('LOAN001 - deve solicitar um empréstimo com dados válidos', () => {
        cy.screenshot('Loan/LOAN001-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('1000', '100', account)

        LoanPage.requestLoanResult.should('be.visible')
        LoanPage.loanStatus.should('have.text', 'Approved')
        LoanPage.loanApproved.should('be.visible')

        LoanPage.loanApprovedMessage.should(
            'have.text',
            'Congratulations, your loan has been approved.'
        )

        LoanPage.loanProvider
            .should('be.visible')
            .and('not.be.empty')

        LoanPage.responseDate
            .should('be.visible')
            .and('not.be.empty')

        LoanPage.newAccountId
            .should('be.visible')
            .and('not.be.empty')

        cy.screenshot('Loan/LOAN001-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN002 - deve solicitar um empréstimo com Down Payment igual a zero', () => {
        cy.screenshot('Loan/LOAN002-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('1000', '0', account)

        LoanPage.requestLoanResult.should('be.visible')
        LoanPage.loanStatus.should('have.text', 'Approved')
        LoanPage.loanApproved.should('be.visible')

        LoanPage.loanApprovedMessage.should(
            'have.text',
            'Congratulations, your loan has been approved.'
        )

        cy.screenshot('Loan/LOAN002-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN003 - deve negar empréstimo com Down Payment acima do saldo disponível', () => {
        cy.screenshot('Loan/LOAN003-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('1000', '999999999', account)

        LoanPage.requestLoanResult.should('be.visible')
        LoanPage.loanStatus.should('have.text', 'Denied')
        LoanPage.loanDenied.should('be.visible')

        LoanPage.loanDeniedMessage.should(
            'have.text',
            'You do not have sufficient funds for the given down payment.'
        )

        cy.screenshot('Loan/LOAN003-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN004 - deve negar empréstimo quando não houver fundos suficientes', () => {
        cy.screenshot('Loan/LOAN004-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('999999999', '100', account)

        LoanPage.requestLoanResult.should('be.visible')
        LoanPage.loanStatus.should('have.text', 'Denied')
        LoanPage.loanDenied.should('be.visible')

        LoanPage.loanDeniedMessage
            .should('be.visible')
            .and('not.be.empty')

        cy.screenshot('Loan/LOAN004-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN005 - deve apresentar erro ao não informar o Down Payment', () => {
        cy.screenshot('Loan/LOAN005-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.loanAmount.clear().type('1000')
        LoanPage.downPayment.clear()
        LoanPage.fromAccount.select(account)

        LoanPage.applyForLoan()

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            )

        cy.screenshot('Loan/LOAN005-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN006 - deve apresentar erro ao não informar o Loan Amount', () => {
        cy.screenshot('Loan/LOAN006-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.loanAmount.clear()
        LoanPage.downPayment.clear().type('100')
        LoanPage.fromAccount.select(account)

        LoanPage.applyForLoan()

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            )

        cy.screenshot('Loan/LOAN006-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN007 - deve apresentar erro ao informar Down Payment inválido', () => {
        cy.screenshot('Loan/LOAN007-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.loanAmount.clear().type('1000')
        LoanPage.downPayment.clear().type('abc')
        LoanPage.fromAccount.select(account)

        LoanPage.applyForLoan()

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            )

        cy.screenshot('Loan/LOAN007-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN008 - deve apresentar erro ao informar Loan Amount inválido', () => {
        cy.screenshot('Loan/LOAN008-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.loanAmount.clear().type('abc')
        LoanPage.downPayment.clear().type('100')
        LoanPage.fromAccount.select(account)

        LoanPage.applyForLoan()

        cy.get('#requestLoanError > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'An internal error has occurred and has been logged.'
            )

        cy.screenshot('Loan/LOAN008-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN009 - deve apresentar erro ao informar Down Payment negativo', () => {
        cy.screenshot('Loan/LOAN009-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('1000', '-100', account)

        cy.get('#loanRequestDenied > .error')
            .should('be.visible')

        cy.screenshot('Loan/LOAN009-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('LOAN010 - deve apresentar erro ao informar Loan Amount negativo', () => {
        cy.screenshot('Loan/LOAN010-start', {
            capture: 'viewport',
            timeout: 60000
        })

        LoanPage.requestLoan('-1000', '100', account)

        cy.get('#loanRequestDenied > .error')
            .should('be.visible')
            .and(
                'contain.text',
                'We cannot grant a loan in that amount with your available funds.'
            )

        cy.screenshot('Loan/LOAN010-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })
})
