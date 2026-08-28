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

    // --- AÇÕES ---

    submit() {
        this.loginButton.click()
    }

    // --- FLUXO DE LOGIN ---

    // LOGIN001 - Realizar login com usuário e senha válidos
    login(user) {
        this.fillUsername(user.username)
        this.fillPassword(user.password)
        this.submit()
    }
}

export default new LoginPage()