class LoginPage {

    // --- CAMPOS DO FORMULÁRIO ---

    get username() {
        return cy.get('input[name="username"]')
    }

    get password() {
        return cy.get('input[name="password"]')
    }

    // --- BOTÃO ---

    get loginButton() {
        return cy.get('input[type="submit"][value="Log In"]')
    }

    // --- NAVEGAÇÃO ---

    visit() {
        cy.visit('/index.htm')
    }

    // --- PREENCHIMENTO ---

    fillUsername(username) {
        this.username
            .clear()
            .type(username)
    }

    fillPassword(password) {
        this.password
            .clear()
            .type(password)
    }

    // --- AÇÃO ---

    submit() {
        this.loginButton.click()
    }

    // --- FLUXO DE LOGIN ---

    login(user) {

        this.username
            .should('be.visible')

        this.fillUsername(user.username)
        this.fillPassword(user.password)

        this.submit()
    }
}

export default new LoginPage()

