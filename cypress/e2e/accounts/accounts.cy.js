import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import AccountsPage from '../../pages/AccountsPage'

describe('Contas', () => {

    let user

    before(() => {

        cy.fixture('registration').then((data) => {

            user = {
                ...data.validUser,
                username: `QA-acc_${Date.now()}`
            }

            HomePage.visit()
            HomePage.accessRegister()

            RegisterPage.register(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            HomePage.logout()
        })
    })

    beforeEach(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        HomePage.visit()

        LoginPage.login(user)

        cy.url()
            .should('include', '/overview.htm')
    })

    it('ACCOUNT001 - deve consultar as contas disponíveis', () => {

        cy.screenshot('ACCOUNT001-start', {
            capture: 'viewport',
            timeout: 60000
        })

        AccountsPage.accountOverview
            .should('be.visible')

        AccountsPage.accountColumn
            .should('be.visible')

        AccountsPage.accountFooter
            .should('be.visible')

        AccountsPage.accountLink
            .should('exist')
            .and('have.length.greaterThan', 0)

        cy.screenshot('ACCOUNT001-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('ACCOUNT002 - deve consultar os detalhes de uma conta', () => {

        cy.screenshot('ACCOUNT002-start', {
            capture: 'viewport',
            timeout: 60000
        })

        // Acessa a primeira conta disponível
        AccountsPage.accessAccount()

        // Confirma que a página de atividade foi aberta
        cy.url()
            .should('include', '/activity.htm')

        // Confirma que os detalhes da conta estão visíveis
        AccountsPage.accountDetailsTitle
            .should('be.visible')

        AccountsPage.accountDetailsTable
            .should('be.visible')

        // Confirma que a área de atividade foi carregada
        AccountsPage.accountActivityTitle
            .should('be.visible')

        AccountsPage.activityForm
            .should('be.visible')

        cy.screenshot('ACCOUNT002-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('ACCOUNT003 - deve consultar o histórico de transações', () => {

        cy.screenshot('ACCOUNT003-start', {
            capture: 'viewport',
            timeout: 60000
        })

        AccountsPage.accessAccount()

        cy.url()
            .should('include', '/activity.htm')

        AccountsPage.accountActivityTitle
            .should('be.visible')

        cy.get('body').then(($body) => {

            const mensagemSemTransacoes = $body
                .text()
                .includes('No transactions found.')

            if (mensagemSemTransacoes) {
                cy.contains('No transactions found.')
                    .should('exist')
            } else {
                AccountsPage.transactionTable
                    .should('exist')
                    .find('tbody tr')
                    .should('have.length.greaterThan', 0)
            }

        })

        cy.screenshot('ACCOUNT003-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('ACCOUNT004 - deve consultar os detalhes de uma transação', () => {

        cy.screenshot('ACCOUNT004-start', {
            capture: 'viewport',
            timeout: 60000
        })

        AccountsPage.accessAccount()

        cy.url()
            .should('include', '/activity.htm')

        AccountsPage.accountActivityTitle
            .should('be.visible')

        AccountsPage.accountDetailsTitle
            .should('be.visible')

        AccountsPage.accountDetail
            .should('be.visible')

        AccountsPage.transactionDetail
            .should('be.visible')

        AccountsPage.transactionAmount
            .should('be.visible')

        cy.screenshot('ACCOUNT004-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

})
