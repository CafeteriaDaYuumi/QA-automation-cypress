import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'

describe('Cadastro de Usuário', () => {

    let user
    let existingUser

    beforeEach(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        cy.fixture('registration').then((data) => {

            user = {
                ...data.validUser,
                username: `QA-reg_${Date.now()}`
            }

            existingUser = {
                ...data.validUser,
                username: `QA-exi_${Date.now()}`
            }

            HomePage.visit()
            HomePage.accessRegister()
        })
    })

    // REGISTER001 - Cadastro válido
    it('REGISTER001 - deve cadastrar um novo usuário com dados válidos', () => {

        cy.screenshot('register/REGISTER001-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        RegisterPage.register(user)

        cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
            .should('be.visible')

        cy.screenshot('register/REGISTER001-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // REGISTER002 - Campos obrigatórios vazios
    it('REGISTER002 - deve exibir validações ao tentar cadastrar sem preencher os campos obrigatórios', () => {

        cy.screenshot('register/REGISTER002-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

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

        cy.screenshot('register/REGISTER002-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // REGISTER003 - Senhas diferentes
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
        RegisterPage.fillConfirmPassword('SenhaInvalida@123')

        cy.screenshot('register/REGISTER003-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        RegisterPage.submit()

        cy.screenshot('register/REGISTER003-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })


    // REGISTER004 - Username duplicado
    it('REGISTER004 - deve impedir cadastro com username já existente', () => {

        // Primeiro cadastro: cria o usuário
        RegisterPage.register(user)

        cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
            .should('be.visible')

        // Encerra a sessão
        HomePage.logout()

        // Acessa novamente o formulário de cadastro
        HomePage.visit()
        HomePage.accessRegister()

        // Screenshot antes da tentativa de duplicidade
        cy.screenshot('register/REGISTER004-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        // Tenta cadastrar novamente o mesmo usuário
        RegisterPage.register(user)

        // Screenshot após a tentativa
        cy.screenshot('register/REGISTER004-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })



    // REGISTER005 - Campo obrigatório específico
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

        cy.screenshot('register/REGISTER005-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        RegisterPage.submit()

        cy.contains('First name is required.')
            .should('be.visible')

        cy.screenshot('register/REGISTER005-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

})
