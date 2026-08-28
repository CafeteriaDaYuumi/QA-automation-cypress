import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'

describe('Cadastro de Segundo Usuário', () => {
    let user

    beforeEach(() => {
        cy.fixture('registration').then((data) => {
            user = {
                ...data.validUser,
                username: `qa_${Date.now()}_2`
            }
        })

        HomePage.visit()
        HomePage.accessRegister()
    })

    // ASSISTANT001 - Cadastro do segundo usuário com dados válidos
    it('ASSISTANT001 - deve cadastrar um segundo usuário com dados válidos', () => {

        RegisterPage.register(user)

        cy.screenshot('Assistant/SecondaryAccount-before')

        cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
            .should('be.visible')

        cy.screenshot('Assistant/SecondaryAccount-result')

        cy.writeFile('cypress/fixtures/createdUser2.json', user)

        cy.readFile('cypress/fixtures/createdUser2.json')
            .should('deep.equal', user)
    })
})