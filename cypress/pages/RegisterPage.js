class RegisterPage {
  setSelectors() {
    cy.get('[name="customer.firstName"]').as('firstName')
    cy.get('[name="customer.lastName"]').as('lastName')
    cy.get('[name="customer.address.street"]').as('address')
    cy.get('[name="customer.address.city"]').as('city')
    cy.get('[name="customer.address.state"]').as('state')
    cy.get('[name="customer.address.zipCode"]').as('zipCode')
    cy.get('[name="customer.phoneNumber"]').as('phone')
    cy.get('[name="customer.ssn"]').as('ssn')
    cy.get('[name="customer.username"]').as('username')
    cy.get('[name="customer.password"]').as('password')
    cy.get('[name="repeatedPassword"]').as('confirmPassword')
    cy.get('input[type="submit"][value="Register"]').as('registerButton')
  }

  fillFirstName(firstName) {
    cy.get('@firstName').type(firstName)
  }

  fillLastName(lastName) {
    cy.get('@lastName').type(lastName)
  }

  fillAddress(address) {
    cy.get('@address').type(address)
  }

  fillCity(city) {
    cy.get('@city').type(city)
  }

  fillState(state) {
    cy.get('@state').type(state)
  }

  fillZipCode(zipCode) {
    cy.get('@zipCode').type(zipCode)
  }

  fillPhone(phone) {
    cy.get('@phone').type(phone)
  }

  fillSsn(ssn) {
    cy.get('@ssn').type(ssn)
  }

  fillUsername(username) {
    cy.get('@username').type(username)
  }

  fillPassword(password) {
    cy.get('@password').type(password)
  }

  fillConfirmPassword(password) {
    cy.get('@confirmPassword').type(password)
  }

  submit() {
    cy.get('@registerButton').click()
  }

  register(user) {
    this.fillFirstName(user.firstName)
    this.fillLastName(user.lastName)
    this.fillAddress(user.address)
    this.fillCity(user.city)
    this.fillState(user.state)
    this.fillZipCode(user.zipCode)
    this.fillPhone(user.phone)
    this.fillSsn(user.ssn)
    this.fillUsername(user.username)
    this.fillPassword(user.password)
    this.fillConfirmPassword(user.password)

    this.submit()
  }

  registerWithoutData() {
    this.submit()
  }

  registerWithPasswordMismatch(user) {
    this.fillFirstName(user.firstName)
    this.fillLastName(user.lastName)
    this.fillAddress(user.address)
    this.fillCity(user.city)
    this.fillState(user.state)
    this.fillZipCode(user.zipCode)
    this.fillPhone(user.phone)
    this.fillSsn(user.ssn)
    this.fillUsername(user.username)
    this.fillPassword(user.password)
    this.fillConfirmPassword('SenhaDiferente@123')

    this.submit()
  }
}

export default new RegisterPage()