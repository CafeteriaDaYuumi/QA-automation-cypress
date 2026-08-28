import HomePage from '../../pages/HomePage'
import TransferPage from '../../pages/TransferPage'
import LoginPage from '../../pages/LoginPage'

describe('Transferências', () => {

    beforeEach(() => {
        HomePage.visit()

        cy.readFile('cypress/fixtures/createdUser.json').then((user) => {
            LoginPage.login(user)
        })

        cy.url()
            .should('include', '/overview.htm')

        TransferPage.accessTransfer()
    })


    // TRANSFER001 - Realizar transferência entre contas diferentes
    it('TRANSFER001 - deve realizar uma transferência entre contas diferentes', () => {

        TransferPage.fillAmount('100')
        TransferPage.selectFromAccount(81165)
        TransferPage.selectToAccount(12345)
        cy.screenshot('Transfer/TRANSFER001-before')

        TransferPage.submitTransfer()

        TransferPage.transferResult.should('be.visible')

        cy.screenshot('Transfer/TRANSFER001-result')
    })

    // TRANSFER002 - Realizar transferência sem informar valor
    it('TRANSFER002 - deve impedir transferência sem informar valor', () => {

        TransferPage.selectFromAccount(81165)
        TransferPage.selectToAccount(12345)

        cy.screenshot('Transfer/TRANSFER002-before')

        TransferPage.submitTransfer()

        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER002-result')
    })

    // TRANSFER003 - Realizar transferência com valor igual a zero
    it('TRANSFER003 - deve impedir transferência com valor igual a zero', () => {

        TransferPage.fillAmount('0')
        TransferPage.selectFromAccount(12345)
        TransferPage.selectToAccount(81165)

        cy.screenshot('Transfer/TRANSFER003-before')

        TransferPage.submitTransfer()

        
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER003-result')
    })

    // TRANSFER004 - Realizar transferência com valor negativo
    it('TRANSFER004 - deve impedir transferência com valor negativo', () => {

        TransferPage.fillAmount('-100')
        TransferPage.selectFromAccount(12345)
        TransferPage.selectToAccount(93819)

        cy.screenshot('Transfer/TRANSFER004-before')

        TransferPage.submitTransfer()

        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER004-result')
    })

    // TRANSFER005 - Realizar transferência com valor não numérico
    it('TRANSFER005 - deve impedir transferência com valor não numérico', () => {

        TransferPage.fillAmount('abc')
        TransferPage.selectFromAccount(93819)
        TransferPage.selectToAccount(12345)

        cy.screenshot('Transfer/TRANSFER005-before')

        TransferPage.submitTransfer()

        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER005-result')
    })

    // TRANSFER006 - Transferir para a mesma conta de origem
    it('TRANSFER006 - deve impedir transferência para a mesma conta', () => {

        TransferPage.fillAmount('100')
        TransferPage.selectFromAccount(13011)
        TransferPage.selectToAccount(13011)

        cy.screenshot('Transfer/TRANSFER006-before')

        TransferPage.submitTransfer()

        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER006-result')
    })
})

