class AccountsPage {

  // --- ACCOUNT001 - VISÃO GERAL DA CONTA ---

  get accountOverview() {
    return cy.get('#showOverview')
  }

  get accountLink() {
    return cy.get('#accountTable tbody tr a')
  }

  get accountColumn() {
    return cy.get('thead > tr > :nth-child(1)')
  }

  get accountFooter() {
    return cy.get('tfoot > tr > td')
  }

  // --- ACCOUNT002 - ATIVIDADE DA CONTA ---

  get accountDetailsTable() {
    return cy.get('#accountDetails > table')
  }

  get activityForm() {
    return cy.get('#activityForm')
  }

  get activityColumn() {
    return cy.get('thead > tr > :nth-child(2)')
  }

  get activityColumnLast() {
    return cy.get('thead > tr > :nth-child(4)')
  }

  // --- ACCOUNT003 - TRANSAÇÕES DA CONTA ---

  get accountActivityTitle() {
    return cy.get('#accountActivity > .title')
  }

  get transactionTable() {
    return cy.get('#transactionTable')
  }

  // --- ACCOUNT004 - DETALHES DA TRANSAÇÃO ---

  get accountDetailsTitle() {
    return cy.get('#accountDetails > .title')
  }

  get accountDetail() {
    return cy.get('#accountDetails > table > tbody > :nth-child(1) > [align="right"]')
  }

  get transactionDetail() {
    return cy.get(':nth-child(3) > [align="right"]')
  }

  get transactionAmount() {
    return cy.get('.form_activity > tbody > :nth-child(2) > [align="right"]')
  }

  // --- AÇÕES ---

  accessAccount() {
    this.accountLink
      .first()
      .click()
  }
}

export default new AccountsPage()