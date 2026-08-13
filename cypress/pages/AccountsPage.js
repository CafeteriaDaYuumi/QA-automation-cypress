class AccountsPage {
  setSelectors() {
    cy.get('#accountTable tbody tr a').as('accountLink')
    cy.get('#accountTable').as('accountTable')
  }

  accessAccount() {
    cy.get('@accountLink').first().click()
  }

  accessTransaction() {
    cy.get('@transactionLink').first().click()
  }
}

export default new AccountsPage()