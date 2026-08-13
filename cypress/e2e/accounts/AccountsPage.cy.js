import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import AccountsPage from '../../pages/AccountsPage'

describe('Contas', () => {

  beforeEach(() => {
    cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

      HomePage.visit()

      LoginPage.setSelectors()
      LoginPage.login(user)

      cy.url()
        .should('include', '/overview.htm')

      AccountsPage.setSelectors()
    })
  })

  it('ACCOUNT001 - deve consultar as contas disponíveis', () => {
    cy.screenshot('Accounts/ACCOUNT001-before')

    cy.get('@accountTable')
      .should('be.visible')

    cy.get('@accountLink')
      .should('exist')
      .and('have.length.greaterThan', 0)

    cy.screenshot('Accounts/ACCOUNT001-result')
  })

  it('ACCOUNT002 - deve consultar os detalhes de uma conta', () => {
    cy.screenshot('Accounts/ACCOUNT002-before')

    AccountsPage.accessAccount()

    cy.url()
      .should('include', '/activity.htm')

    cy.contains('Account Details')
      .should('be.visible')

    cy.screenshot('Accounts/ACCOUNT002-result')
  })

  it('ACCOUNT003 - deve consultar o histórico de transações', () => {
    cy.screenshot('Accounts/ACCOUNT003-before')

    AccountsPage.accessAccount()

    cy.url()
      .should('include', '/activity.htm')

    cy.get('#transactionTable')
      .should('be.visible')

    cy.screenshot('Accounts/ACCOUNT003-result')
  })

  it('ACCOUNT004 - deve consultar os detalhes de uma transação', () => {
  cy.screenshot('Accounts/ACCOUNT004-before')

  AccountsPage.accessAccount()

  cy.url()
    .should('include', '/activity.htm')

  cy.get('#transactionTable')
    .should('be.visible')

  cy.wait(2000)

  cy.get('#transactionTable')
    .invoke('html')
    .then((html) => {
      cy.log(html)
    })

  cy.screenshot('Accounts/ACCOUNT004-activity')
})
})