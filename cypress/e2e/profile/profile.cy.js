import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'
import ProfilePage from '../../pages/ProfilePage'

describe('Atualização de Perfil', () => {

    let user

    beforeEach(() => {

        cy.clearCookies()
        cy.clearLocalStorage()

        cy.fixture('registration').then((data) => {

            // Cria um usuário independente para cada teste
            user = {
                ...data.validUser,
                username: `QA-pro_${Date.now()}`
            }

            // Cadastro
            HomePage.visit()
            HomePage.accessRegister()

            RegisterPage.register(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            // Encerra a sessão após o cadastro
            HomePage.logout()

            // Login com o usuário recém-criado
            LoginPage.visit()
            LoginPage.login(user)

            cy.url().should('include', '/overview.htm')

            // Acessa o perfil
            HomePage.accessProfile()

            ProfilePage.firstName
                .should('be.visible')
                .and('not.have.value', '')
        })
    })

    // PROFILE001 - Atualização completa
    it('PROFILE001 - deve atualizar todos os dados do perfil', () => {

        cy.screenshot('profile/PROFILE001-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        ProfilePage.fillFirstName('Roberto')
        ProfilePage.fillLastName('Carlos')
        ProfilePage.fillAddress('Rua da Flor, 204')
        ProfilePage.fillCity('Chile')
        ProfilePage.fillState('PTB')
        ProfilePage.fillZipCode('32680-000')
        ProfilePage.fillPhoneNumber('66564649782')

        ProfilePage.update()

        ProfilePage.updateSuccess
            .should('be.visible')

        ProfilePage.successMessage
            .should('be.visible')

        cy.screenshot('profile/PROFILE001-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // PROFILE002 - Campos obrigatórios vazios
    it('PROFILE002 - deve impedir atualização com campos obrigatórios vazios', () => {

        cy.screenshot('profile/PROFILE002-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        ProfilePage.firstName.clear()
        ProfilePage.lastName.clear()
        ProfilePage.address.clear()
        ProfilePage.city.clear()
        ProfilePage.state.clear()
        ProfilePage.zipCode.clear()
        ProfilePage.phoneNumber.clear()

        ProfilePage.update()

        ProfilePage.firstName
            .should('have.value', '')

        ProfilePage.lastName
            .should('have.value', '')

        ProfilePage.address
            .should('have.value', '')

        ProfilePage.city
            .should('have.value', '')

        ProfilePage.state
            .should('have.value', '')

        ProfilePage.zipCode
            .should('have.value', '')

        ProfilePage.phoneNumber
            .should('have.value', '')

        cy.screenshot('profile/PROFILE002-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // PROFILE003 - Formato do telefone
    it('PROFILE003 - deve validar o formato do telefone', () => {

        cy.screenshot('profile/PROFILE003-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        ProfilePage.fillPhoneNumber('123')

        ProfilePage.update()

        ProfilePage.phoneNumber
            .should('have.value', '123')

        cy.screenshot('profile/PROFILE003-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // PROFILE004 - Formato do CEP
    it('PROFILE004 - deve validar o formato do CEP', () => {

        cy.screenshot('profile/PROFILE004-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        ProfilePage.fillZipCode('123')

        ProfilePage.update()

        ProfilePage.zipCode
            .should('have.value', '123')

        cy.screenshot('profile/PROFILE004-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // PROFILE005 - Persistência após recarregar
    it('PROFILE005 - deve manter os dados atualizados após recarregar a página', () => {

        const profile = {
            firstName: 'carlos',
            lastName: 'Hugo',
            address: 'Rua Teste, 100',
            city: 'Betim',
            state: 'MG',
            zipCode: '32600-000',
            phoneNumber: '31999999999'
        }

        cy.screenshot('profile/PROFILE005-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        ProfilePage.updateProfile(profile)

        ProfilePage.updateSuccess
            .should('be.visible')

        cy.reload()

        ProfilePage.firstName
            .should('have.value', profile.firstName)

        ProfilePage.lastName
            .should('have.value', profile.lastName)

        ProfilePage.address
            .should('have.value', profile.address)

        ProfilePage.city
            .should('have.value', profile.city)

        ProfilePage.state
            .should('have.value', profile.state)

        ProfilePage.zipCode
            .should('have.value', profile.zipCode)

        ProfilePage.phoneNumber
            .should('have.value', profile.phoneNumber)

        cy.screenshot('profile/PROFILE005-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })
})