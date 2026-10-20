Cypress.Commands.add('createTestAccounts', () => {

    // Armazena os IDs gerados durante a execução, sem depender de fixtures
    const accounts = {}

    // =========================
    // CRIAÇÃO DA CONTA DE ORIGEM
    // =========================

    // Acessa a funcionalidade de abertura de contas
    cy.get('#leftPanel > ul > :nth-child(1) > a').click()

    // Define o tipo da conta e seleciona uma conta existente para o depósito inicial
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
            cy.get('#fromAccountId').select($option.val())
        })

    // Solicita a abertura da conta e captura o identificador gerado pelo ParaBank
    cy.get('input[type="button"][value="Open New Account"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()

    cy.get('#newAccountId')
        .should('be.visible')
        .invoke('text')
        .then((accountId) => {

            // Armazena o ID limpo e interrompe o teste se nenhum identificador for retornado
            accounts.account1 = accountId.trim()
            expect(accounts.account1, 'ID da conta de origem').not.to.be.empty
        })

    // =========================
    // CRIAÇÃO DA CONTA DE DESTINO
    // =========================

    // Repete o processo para obter uma segunda conta independente da primeira
    cy.get('#leftPanel > ul > :nth-child(1) > a').click()

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
            cy.get('#fromAccountId').select($option.val())
        })

    // Abre a segunda conta e registra seu ID para utilização nos testes
    cy.get('input[type="button"][value="Open New Account"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click()

    cy.get('#newAccountId')
        .should('be.visible')
        .invoke('text')
        .then((accountId) => {

            // Mantém o identificador disponível para a etapa de transferência
            accounts.account2 = accountId.trim()
            expect(accounts.account2, 'ID da conta de destino').not.to.be.empty
        })

    // Garante que cada papel de conta recebeu um identificador diferente
    return cy.wrap(accounts).then((createdAccounts) => {
        expect(
            createdAccounts.account1,
            'As contas de origem e destino devem ser diferentes'
        ).not.to.equal(createdAccounts.account2)

        // Entrega os IDs ao teste chamador, sem gravar dados em arquivos
        return createdAccounts
    })
})
