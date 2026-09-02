import HomePage from '../../pages/HomePage'
import TransferPage from '../../pages/TransferPage'
import LoginPage from '../../pages/LoginPage'

let contaOrigem
let contaDestino

describe('Transferências', () => {


    before(() => {

        // Limpa qualquer sessão anterior
        cy.clearCookies()
        cy.clearLocalStorage()

        // Login
        LoginPage.visit()

        cy.readFile('cypress/fixtures/createdUser.json')
            .then((user) => {
                LoginPage.login(user)
            })

        cy.url()
            .should('include', '/overview.htm')

        // Cria as contas necessárias para os testes
        cy.createTestAccounts()

        // Lê as contas criadas
        cy.readFile('cypress/fixtures/createdAccounts.json')
            .then((data) => {

                contaOrigem = data.accounts.account1
                contaDestino = data.accounts.account2

                cy.log(`Conta origem: ${contaOrigem}`)
                cy.log(`Conta destino: ${contaDestino}`)
            })
    })

    beforeEach(() => {

        // Garante que cada teste comece sem sessão anterior
        cy.clearCookies()
        cy.clearLocalStorage()

        // Vai para a tela inicial/login
        LoginPage.visit()

        // Lê o usuário criado no cadastro
        cy.readFile('cypress/fixtures/createdUser.json')
            .then((user) => {

                LoginPage.login(user)

            })

        // Confirma que o login foi realizado
        cy.url()
            .should('include', '/overview.htm')

        // Acessa transferência
        TransferPage.accessTransfer()
    })

    it('TRANSFER001 - deve realizar uma transferência entre contas diferentes', () => {

        TransferPage.fillAmount('100')

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER001-before')

        TransferPage.submitTransfer()

        TransferPage.transferResult
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER001-result')
    })


    it('TRANSFER002 - deve impedir transferência sem informar valor', () => {

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER002-before')

        TransferPage.submitTransfer()

        TransferPage.transferError
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER002-result')
    })


    it('TRANSFER003 - deve impedir transferência com valor igual a zero', () => {

        TransferPage.fillAmount('0')

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER003-before')

        TransferPage.submitTransfer()

        TransferPage.transferError
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER003-result')
    })


    it('TRANSFER004 - deve impedir transferência com valor negativo', () => {

        TransferPage.fillAmount('-100')

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER004-before')

        TransferPage.submitTransfer()

        TransferPage.transferError
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER004-result')
    })


    it('TRANSFER005 - deve impedir transferência com valor não numérico', () => {

        TransferPage.fillAmount('abc')

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER005-before')

        TransferPage.submitTransfer()

        TransferPage.transferError
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER005-result')
    })


    it('TRANSFER006 - deve impedir transferência para a mesma conta', () => {

        TransferPage.fillAmount('100')

        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaOrigem)

        cy.screenshot('Transfer/TRANSFER006-before')

        TransferPage.submitTransfer()

        TransferPage.transferError
            .should('be.visible')

        cy.screenshot('Transfer/TRANSFER006-result')
    })

})