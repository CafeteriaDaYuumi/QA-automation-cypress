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

  // --- BOTÕES E AÇÕES DO FORMULÁRIO ---

  get registerButton() {
    return cy.get('input[type="submit"][value="Register"]')
  }

  // --- PREENCHIMENTO DOS DADOS PESSOAIS ---

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

  // --- PREENCHIMENTO DOS DADOS DE IDENTIFICAÇÃO ---

  fillSsn(ssn) {
    this.ssn.type(ssn)
  }

  // --- PREENCHIMENTO DAS CREDENCIAIS ---

  fillUsername(username) {
    this.username.type(username)
  }

  fillPassword(password) {
    this.password.type(password)
  }

  fillConfirmPassword(password) {
    this.confirmPassword.type(password)
  }

  // --- ENVIO DO CADASTRO ---

  submit() {
    this.registerButton.click()
  }

  // --- FLUXOS DE CADASTRO ---

  // Cadastro com os dados fornecidos.
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

  // Envio do formulário sem preencher os campos.
  registerWithoutData() {
    this.submit()
  }
}

export default new RegisterPage()
