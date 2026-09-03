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

    get loanMenu() {
        return cy.get('#leftPanel > ul > :nth-child(7) > a');
    }

    // --- AÇÕES ---

    visit() {
        cy.visit('/index.htm');
    }

    accessRegister() {
        this.registerLink.click();
    }

    accessTransfer() {
        this.transferMenu.click();
    }

    accessLoan() {
        this.loanMenu.click();
    }

    logout() {
        this.logoutLink.click();
    }
}

export default new HomePage();
