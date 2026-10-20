import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'

describe('Login e Logout', () => {

    let user

    before(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        cy.fixture('registration').then((data) => {

            user = {
                ...data.validUser,
                username: `QA-log_${Date.now()}`
            }

            HomePage.visit()
            HomePage.accessRegister()

            RegisterPage.register(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            HomePage.logout()
        })
    })

    beforeEach(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        HomePage.visit()
    })

    // LOGIN001 - Login com usuário criado no próprio fluxo
    it('LOGIN001 - deve realizar login com o usuário criado no fluxo', () => {

        cy.screenshot('Login/LOGIN001-before', {
            capture: 'viewport',
            timeout: 60000
        })

        LoginPage.fillUsername(user.username)
        LoginPage.fillPassword(user.password)
        LoginPage.submit()

        cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
            .should('be.visible')

        cy.screenshot('Login/LOGIN001-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    // LOGIN002 - Login com senha inválida
    it('LOGIN002 - deve impedir login com senha inválida', () => {

        cy.screenshot('Login/LOGIN002-before', {
            capture: 'viewport',
            timeout: 60000
        })

        LoginPage.fillUsername(user.username)
        LoginPage.fillPassword('SenhaInvalida@123')
        LoginPage.submit()

        cy.contains(
            'The username and password could not be verified.'
        )
            .should('be.visible')

        cy.screenshot('Login/LOGIN002-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    // LOGIN003 - Login com usuário inexistente
    it('LOGIN003 - deve impedir login com usuário inexistente', () => {

        const invalidUser = {
            username: `QA-invalid_${Date.now()}`,
            password: 'Cypress@123'
        }

        cy.screenshot('Login/LOGIN003-before', {
            capture: 'viewport',
            timeout: 60000
        })

        LoginPage.fillUsername(invalidUser.username)
        LoginPage.fillPassword(invalidUser.password)
        LoginPage.submit()

        cy.contains(
            'The username and password could not be verified.'
        )
            .should('be.visible')

        cy.screenshot('Login/LOGIN003-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    // LOGIN004 - Login sem preencher os campos obrigatórios
    it('LOGIN004 - deve validar os campos obrigatórios no login', () => {

        cy.screenshot('Login/LOGIN004-before', {
            capture: 'viewport',
            timeout: 60000
        })

        LoginPage.submit()

        cy.contains(
            'Please enter a username and password.'
        )
            .should('be.visible')

        cy.screenshot('Login/LOGIN004-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    // LOGIN005 - Logout após login realizado
    it('LOGIN005 - deve realizar logout após login', () => {

        LoginPage.login(user)

        cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
            .should('be.visible')

        cy.screenshot('Login/LOGIN005-before', {
            capture: 'viewport',
            timeout: 60000
        })

        HomePage.logout()

        cy.url()
            .should('include', '/index.htm')

        cy.screenshot('Login/LOGIN005-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })
})
