import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'

describe('Login e Logout', () => {

    beforeEach(() => {
        HomePage.visit()
    })

    // LOGIN001 - Login com usuário criado no cadastro
    it('LOGIN001 - deve realizar login com o usuário criado no cadastro', () => {
        cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

            LoginPage.fillUsername(user.username)
            LoginPage.fillPassword(user.password)

            cy.screenshot('Login/LOGIN001-before')

            LoginPage.submit()

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            cy.screenshot('Login/LOGIN001-result')
        })
    })

    // LOGIN002 - Login com senha inválida
    it('LOGIN002 - deve impedir login com senha inválida', () => {
        cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

            LoginPage.fillUsername(user.username)
            LoginPage.fillPassword('SenhaInvalida@123')

            cy.screenshot('Login/LOGIN002-before')

            LoginPage.submit()

            cy.contains('The username and password could not be verified.')
                .should('be.visible')

            cy.screenshot('Login/LOGIN002-result')
        })
    })

    // LOGIN003 - Login com usuário inexistente
    it('LOGIN003 - deve impedir login com usuário inexistente', () => {
        const invalidUser = {
            username: `qa_invalid_${Date.now()}`,
            password: 'Cypress@123'
        }

        LoginPage.fillUsername(invalidUser.username)
        LoginPage.fillPassword(invalidUser.password)

        cy.screenshot('Login/LOGIN003-before')

        LoginPage.submit()

        cy.contains('The username and password could not be verified.')
            .should('be.visible')

        cy.screenshot('Login/LOGIN003-result')
    })

    // LOGIN004 - Login sem preencher os campos obrigatórios
    it('LOGIN004 - deve validar os campos obrigatórios no login', () => {

        cy.screenshot('Login/LOGIN004-before')

        LoginPage.submit()

        cy.contains('Please enter a username and password.')
            .should('be.visible')

        cy.screenshot('Login/LOGIN004-result')
    })

    // LOGIN005 - Logout após login realizado
    it('LOGIN005 - deve realizar logout após login', () => {
        cy.readFile('cypress/fixtures/createdUser.json').then((user) => {

            LoginPage.login(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            cy.screenshot('Login/LOGIN005-before')

            HomePage.logout()

            cy.url()
                .should('include', '/index.htm')

            cy.screenshot('Login/LOGIN005-result')
        })
    })
})