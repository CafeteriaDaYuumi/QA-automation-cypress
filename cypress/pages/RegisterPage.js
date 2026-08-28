class RegisterPage {

  // --- CAMPOS DO FORMULÁRIO ---

  get firstName() {
    return cy.get('[name="customer.firstName"]')
  }

  get lastName() {
    return cy.get('[name="customer.lastName"]')
  }

  get address() {
    return cy.get('[name="customer.address.street"]')
  }

  get city() {
    return cy.get('[name="customer.address.city"]')
  }

  get state() {
    return cy.get('[name="customer.address.state"]')
  }

  get zipCode() {
    return cy.get('[name="customer.address.zipCode"]')
  }

  get phone() {
    return cy.get('[name="customer.phoneNumber"]')
  }

  get ssn() {
    return cy.get('[name="customer.ssn"]')
  }

  get username() {
    return cy.get('[name="customer.username"]')
  }

  get password() {
    return cy.get('[name="customer.password"]')
  }

  get confirmPassword() {
    return cy.get('[name="repeatedPassword"]')
  }

  // --- BOTÃO ---

  get registerButton() {
    return cy.get('input[type="submit"][value="Register"]')
  }

   // --- AÇÕES ---

  fillFirstName(firstName) {
    this.firstName.type(firstName)
  }

  fillLastName(lastName) {
    this.lastName.type(lastName)
  }

  fillAddress(address) {
    this.address.type(address)
  }

  fillCity(city) {
    this.city.type(city)
  }

  fillState(state) {
    this.state.type(state)
  }

  fillZipCode(zipCode) {
    this.zipCode.type(zipCode)
  }

  fillPhone(phone) {
    this.phone.type(phone)
  }

  fillSsn(ssn) {
    this.ssn.type(ssn)
  }

  fillUsername(username) {
    this.username.type(username)
  }

  fillPassword(password) {
    this.password.type(password)
  }

  fillConfirmPassword(password) {
    this.confirmPassword.type(password)
  }

  // --- AÇÕES ---

  submit() {
    this.registerButton.click()
  }

  // --- FLUXOS DE CADASTRO ---

  // REGISTER001 - Cadastro de usuário com dados válidos
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

  // REGISTER002 - Tentativa de cadastro sem preencher os campos
  registerWithoutData() {
    this.submit()
  }

  // REGISTER003 - Cadastro com senhas diferentes
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