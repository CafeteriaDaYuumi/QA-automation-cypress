class HomePage {
  visit() {
    cy.visit('/index.htm')
  }

  accessRegister() {
    cy.contains('Register').click()
  }

  setSelectors() {
    cy.get('#leftPanel > ul > :nth-child(8) > a').as('logout')
  }

  logout() {
    cy.get('@logout').click()
  }
}

export default new HomePage()