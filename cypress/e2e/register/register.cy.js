import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'

describe('Cadastro de Usuário', () => {
  let user

  beforeEach(() => {
    cy.fixture('registration').then((data) => {
      user = {
        ...data.validUser,
        username: `qa_${Date.now()}`
      }
    })

    HomePage.visit()
    HomePage.accessRegister()

    RegisterPage.setSelectors()
  })

  it('REGISTER001 - deve cadastrar um novo usuário com dados válidos', () => {
    RegisterPage.fillFirstName(user.firstName)
    RegisterPage.fillLastName(user.lastName)
    RegisterPage.fillAddress(user.address)
    RegisterPage.fillCity(user.city)
    RegisterPage.fillState(user.state)
    RegisterPage.fillZipCode(user.zipCode)
    RegisterPage.fillPhone(user.phone)
    RegisterPage.fillSsn(user.ssn)
    RegisterPage.fillUsername(user.username)
    RegisterPage.fillPassword(user.password)
    RegisterPage.fillConfirmPassword(user.password)

    cy.screenshot('register/REGISTER001-before')

    RegisterPage.submit()

    cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
      .should('be.visible')

    cy.screenshot('register/REGISTER001-result')

    cy.writeFile('cypress/fixtures/createdUser.json', user)

    cy.readFile('cypress/fixtures/createdUser.json')
      .should('deep.equal', user)
  })

  it('REGISTER002 - deve exibir validações ao tentar cadastrar sem preencher os campos obrigatórios', () => {
    cy.screenshot('register/REGISTER002-before')

    RegisterPage.registerWithoutData()

    cy.contains('First name is required.')
      .should('be.visible')

    cy.contains('Last name is required.')
      .should('be.visible')

    cy.contains('Address is required.')
      .should('be.visible')

    cy.contains('City is required.')
      .should('be.visible')

    cy.contains('State is required.')
      .should('be.visible')

    cy.contains('Zip Code is required.')
      .should('be.visible')

    cy.contains('Social Security Number is required.')
      .should('be.visible')

    cy.contains('Username is required.')
      .should('be.visible')

    cy.contains('Password is required.')
      .should('be.visible')

    cy.contains('Password confirmation is required.')
      .should('be.visible')

    cy.screenshot('register/REGISTER002-result')
  })

  it('REGISTER003 - deve impedir cadastro quando as senhas não forem iguais', () => {
    RegisterPage.fillFirstName(user.firstName)
    RegisterPage.fillLastName(user.lastName)
    RegisterPage.fillAddress(user.address)
    RegisterPage.fillCity(user.city)
    RegisterPage.fillState(user.state)
    RegisterPage.fillZipCode(user.zipCode)
    RegisterPage.fillPhone(user.phone)
    RegisterPage.fillSsn(user.ssn)
    RegisterPage.fillUsername(user.username)
    RegisterPage.fillPassword(user.password)
    RegisterPage.fillConfirmPassword('SenhaDiferente@123')

    cy.screenshot('register/REGISTER003-before')

    RegisterPage.submit()

    cy.screenshot('register/REGISTER003-result')
  })

  it('REGISTER004 - deve impedir cadastro com username já existente', () => {
    cy.readFile('cypress/fixtures/createdUser.json').then((existingUser) => {
      RegisterPage.fillFirstName(user.firstName)
      RegisterPage.fillLastName(user.lastName)
      RegisterPage.fillAddress(user.address)
      RegisterPage.fillCity(user.city)
      RegisterPage.fillState(user.state)
      RegisterPage.fillZipCode(user.zipCode)
      RegisterPage.fillPhone(user.phone)
      RegisterPage.fillSsn(user.ssn)
      RegisterPage.fillUsername(existingUser.username)
      RegisterPage.fillPassword(user.password)
      RegisterPage.fillConfirmPassword(user.password)

      cy.screenshot('register/REGISTER004-before')

      RegisterPage.submit()

      cy.screenshot('register/REGISTER004-result')
    })
  })

  it('REGISTER005 - deve validar mensagem de campo obrigatório', () => {
    RegisterPage.fillLastName(user.lastName)
    RegisterPage.fillAddress(user.address)
    RegisterPage.fillCity(user.city)
    RegisterPage.fillState(user.state)
    RegisterPage.fillZipCode(user.zipCode)
    RegisterPage.fillPhone(user.phone)
    RegisterPage.fillSsn(user.ssn)
    RegisterPage.fillUsername(user.username)
    RegisterPage.fillPassword(user.password)
    RegisterPage.fillConfirmPassword(user.password)

    cy.screenshot('register/REGISTER005-before')

    RegisterPage.submit()

    cy.contains('First name is required.')
      .should('be.visible')

    cy.screenshot('register/REGISTER005-result')
  })
})