class AccountsPage {

  setOverviewSelectors() {
    // ACCOUNT001
    cy.get('#showOverview')
      .as('accountOverview')

    cy.get('#accountTable tbody tr a')
      .as('accountLink')

    cy.get('thead > tr > :nth-child(1)')
      .as('accountColumn')

    cy.get('tfoot > tr > td')
      .as('accountFooter')
  }

  setActivitySelectors() {
    // ACCOUNT002
    cy.get('#accountDetails > table')
      .as('accountDetailsTable')

    cy.get('#activityForm')
      .as('activityForm')

    cy.get('thead > tr > :nth-child(2)')
      .as('activityColumn')

    cy.get('thead > tr > :nth-child(4)')
      .as('activityColumnLast')

    // ACCOUNT003
    cy.get('#accountActivity > .title')
      .as('accountActivityTitle')

    cy.get('#transactionTable')
      .as('transactionTable')

    // ACCOUNT004
    cy.get('#accountDetails > .title')
      .as('accountDetailsTitle')

    cy.get('#accountDetails > table > tbody > :nth-child(1) > [align="right"]')
      .as('accountDetail')

    cy.get(':nth-child(3) > [align="right"]')
      .as('transactionDetail')

    cy.get('.form_activity > tbody > :nth-child(2) > [align="right"]')
      .as('transactionAmount')
  }

  accessAccount() {
    cy.get('@accountLink')
      .first()
      .click()
  }

}

export default new AccountsPage()