import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'

describe('Login e Logout', () => {

  beforeEach(() => {
    HomePage.visit()
    LoginPage.setSelectors()
  })

  it('LOGIN001 - deve realizar login com o usuário criado no cadastro', () => {
    cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

      LoginPage.fillCredentials(user)

      cy.screenshot('Login/LOGIN001-before')

      LoginPage.submit()

      cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
        .should('be.visible')

      cy.screenshot('Login/LOGIN001-result')
    })
  })

  it('LOGIN002 - deve impedir login com senha inválida', () => {
    cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

      LoginPage.fillCredentials({
        username: user.username,
        password: 'SenhaInvalida@123'
      })

      cy.screenshot('Login/LOGIN002-before')

      LoginPage.submit()

      cy.contains('The username and password could not be verified.')
        .should('be.visible')

      cy.screenshot('Login/LOGIN002-result')
    })
  })

  it('LOGIN003 - deve impedir login com usuário inexistente', () => {
    const invalidUser = {
      username: `qa_invalid_${Date.now()}`,
      password: 'Cypress@123'
    }

    LoginPage.fillCredentials(invalidUser)

    cy.screenshot('Login/LOGIN003-before')

    LoginPage.submit()

    cy.contains('The username and password could not be verified.')
      .should('be.visible')

    cy.screenshot('Login/LOGIN003-result')
  })

  it('LOGIN004 - deve validar os campos obrigatórios no login', () => {

    cy.screenshot('Login/LOGIN004-before')

    LoginPage.submit()

    cy.contains('Please enter a username and password.')
      .should('be.visible')

    cy.screenshot('Login/LOGIN004-result')
  })

  it('LOGIN005 - deve realizar logout após login', () => {
    cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

      LoginPage.login(user)

      cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
        .should('be.visible')

      cy.screenshot('Login/LOGIN005-before')

      HomePage.setSelectors()
      HomePage.logout()

      cy.url()
        .should('include', '/index.htm')

      cy.screenshot('Login/LOGIN005-result')
    })
  })
})