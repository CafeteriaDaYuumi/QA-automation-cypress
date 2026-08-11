class LoginPage {
  setSelectors() {
    cy.get('input[name="username"]').as('username')
    cy.get('input[name="password"]').as('password')
    cy.get('input[type="submit"][value="Log In"]').as('loginButton')
  }

  fillCredentials(user) {
    cy.get('@username').clear().type(user.username)
    cy.get('@password').clear().type(user.password)
  }

  submit() {
    cy.get('@loginButton').click()
  }

  login(user) {
    this.fillCredentials(user)
    this.submit()
  }
}

export default new LoginPage()