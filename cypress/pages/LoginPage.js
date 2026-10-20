class LoginPage {

    // --- CAMPOS DO FORMULÁRIO ---

    get username() {
        return cy.get('input[name="username"]')
    }

    get password() {
        return cy.get('input[name="password"]')
    }

    // --- BOTÕES ---

    get loginButton() {
        return cy.get('input[type="submit"][value="Log In"]')
    }

    // --- NAVEGAÇÃO ---

    visit() {
        cy.visit('/index.htm')
    }

    // --- PREENCHIMENTO DOS CAMPOS ---

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

    // --- ENVIO DO FORMULÁRIO ---

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
