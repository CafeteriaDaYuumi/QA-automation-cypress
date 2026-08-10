import LoginPage from '../../pages/LoginPage'

describe('Login de Usuário', () => {
  it('deve realizar login com o usuário criado no cadastro', () => {
    cy.readFile('cypress/fixtures/createdUser.json').then((user) => {
      cy.visit('/index.htm')

      LoginPage.setSelectors()
      LoginPage.login(user)

      cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
        .should('be.visible')
    })
  })
})