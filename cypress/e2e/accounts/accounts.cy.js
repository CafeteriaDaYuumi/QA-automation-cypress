import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import AccountsPage from '../../pages/AccountsPage'

describe('Contas', () => {

    beforeEach(() => {
        cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

            HomePage.visit()

            LoginPage.login(user)

            cy.url()
                .should('include', '/overview.htm')
        })
    })

    // ACCOUNT001 - Consultar as contas disponíveis
    it('ACCOUNT001 - deve consultar as contas disponíveis', () => {

        cy.screenshot('Accounts/ACCOUNT001-before')

        AccountsPage.accountOverview
            .should('be.visible')

        AccountsPage.accountColumn
            .should('be.visible')

        AccountsPage.accountFooter
            .should('be.visible')

        AccountsPage.accountLink
            .should('exist')
            .and('have.length.greaterThan', 0)

        cy.screenshot('Accounts/ACCOUNT001-result')
    })

    // ACCOUNT002 - Consultar os detalhes de uma conta
    it('ACCOUNT002 - deve consultar os detalhes de uma conta', () => {

        cy.screenshot('Accounts/ACCOUNT002-before')

        AccountsPage.accessAccount()

        cy.url()
            .should('include', '/activity.htm')

        AccountsPage.accountDetailsTable
            .should('be.visible')

        AccountsPage.activityForm
            .should('be.visible')

        AccountsPage.activityColumn
            .should('be.visible')

        AccountsPage.activityColumnLast
            .should('be.visible')

        cy.screenshot('Accounts/ACCOUNT002-result')
    })

    // ACCOUNT003 - Consultar o histórico de transações
    it('ACCOUNT003 - deve consultar o histórico de transações', () => {

        cy.screenshot('Accounts/ACCOUNT003-before')

        AccountsPage.accessAccount()

        cy.url()
            .should('include', '/activity.htm')

        AccountsPage.accountActivityTitle
            .should('be.visible')

        AccountsPage.transactionTable
            .should('be.visible')

        cy.screenshot('Accounts/ACCOUNT003-result')
    })

    // ACCOUNT004 - Consultar os detalhes de uma transação
    it('ACCOUNT004 - deve consultar os detalhes de uma transação', () => {

        cy.screenshot('Accounts/ACCOUNT004-before')

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

        cy.screenshot('Accounts/ACCOUNT004-result')
    })
})