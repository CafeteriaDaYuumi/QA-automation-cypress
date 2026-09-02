Cypress.Commands.add('createTestAccounts', () => {

    // =========================
    // CONTA 1
    // =========================

    cy.get('#leftPanel > ul > :nth-child(1) > a')
        .click()

    cy.get('#type')
        .should('be.visible')
        .should('not.be.disabled')
        .select('SAVINGS')

    cy.get('#fromAccountId')
        .should('be.visible')
        .should('not.be.disabled')
        .find('option')
        .first()
        .then(($option) => {
            cy.get('#fromAccountId')
                .select($option.val())
        })

    cy.get('input[type="button"][value="Open New Account"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()

    cy.get('#newAccountId')
        .should('be.visible')
        .invoke('text')
        .then((accountId) => {

            cy.readFile('cypress/fixtures/createdAccounts.json')
                .then((data) => {

                    data.accounts.account1 = accountId.trim()

                    return cy.writeFile(
                        'cypress/fixtures/createdAccounts.json',
                        data
                    )
                })
        })


    // =========================
    // CONTA 2
    // =========================

    cy.get('#leftPanel > ul > :nth-child(1) > a')
        .click()

    // IMPORTANTE:
    // aguarda o ParaBank terminar de carregar as contas
    cy.get('#type')
        .should('be.visible')
        .should('not.be.disabled')
        .select('SAVINGS')

    cy.get('#fromAccountId')
        .should('be.visible')
        .should('not.be.disabled')
        .find('option')
        .first()
        .then(($option) => {
            cy.get('#fromAccountId')
                .select($option.val())
        })

    cy.get('input[type="button"][value="Open New Account"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()

    cy.get('#newAccountId')
        .should('be.visible')
        .invoke('text')
        .then((accountId) => {

            cy.readFile('cypress/fixtures/createdAccounts.json')
                .then((data) => {

                    data.accounts.account2 = accountId.trim()

                    return cy.writeFile(
                        'cypress/fixtures/createdAccounts.json',
                        data
                    )
                })
        })
})