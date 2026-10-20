class HomePage {

    // --- NAVEGAÇÃO ---

    get registerLink() {
        return cy.contains('Register');
    }

    get logoutLink() {
        return cy.get('#leftPanel > ul > :nth-child(8) > a');
    }

    get transferMenu() {
        return cy.get('#leftPanel > ul > :nth-child(3) > a');
    }

    get billpayMenu() {
        return cy.get('#leftPanel > ul > :nth-child(4) > a');
    }

    get loanMenu() {
        return cy.get('#leftPanel > ul > :nth-child(7) > a');
    }

    get ProfileMenu() {
        return cy.get('#leftPanel > ul > :nth-child(6) > a')
    }

    // --- ACESSO À APLICAÇÃO ---

    visit() {
        cy.visit('/index.htm');
    }

    // --- ACESSO AO CADASTRO ---

    accessRegister() {
        this.registerLink.click();
    }

    // --- ACESSO À TRANSFERÊNCIA ---

    accessTransfer() {
        this.transferMenu.click();
    }

    // --- ACESSO A EMPRÉSTIMOS ---

    accessLoan() {
        this.loanMenu.click();
    }

    // --- ACESSO AO PERFIL ---

    accessProfile() {
        this.ProfileMenu.click();
    }

    // --- SESSÃO ---

    logout() {
        this.logoutLink.click();
    }
}

export default new HomePage();
