class HomePage {

  // --- NAVEGAÇÃO ---

  get registerLink() {
    return cy.contains('Register')
  }

  get logoutLink() {
    return cy.get('#leftPanel > ul > :nth-child(8) > a')
  }
  
  get transferMenu(){
    cy.get('#leftPanel > ul > :nth-child(3) > a')
  }

  // --- AÇÕES ---

  visit() {
    cy.visit('/index.htm')
  }

  accessRegister() {
    this.registerLink.click()
  }

  logout() {
    this.logoutLink.click()
  }
}

export default new HomePage()