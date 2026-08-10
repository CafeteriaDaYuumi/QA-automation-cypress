class HomePage {
  visit() {
    cy.visit('/index.htm')
  }

  accessRegister() {
    cy.contains('Register').click()
  }
}

export default new HomePage()