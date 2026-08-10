class LoginPage {
  setSelectors() {
    cy.get('input[name="username"]').as('username')
    cy.get('input[name="password"]').as('password')
    cy.get('input[type="submit"][value="Log In"]').as('loginButton')
  }

  fillUsername(username) {
    cy.get('@username').type(username)
  }

  fillPassword(password) {
    cy.get('@password').type(password)
  }

  submit() {
    cy.get('@loginButton').click()
  }

  login(user) {
    this.fillUsername(user.username)
    this.fillPassword(user.password)
    this.submit()
  }
}

export default new LoginPage()