import HomePage from '../../pages/HomePage'
import TransferPage from '../../pages/TransferPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'

let user
let contaOrigem
let contaDestino

describe('Transferências', () => {

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.fixture('registration').then((data) => {
            user = {
                ...data.validUser,
                username: `QA-tra_${Date.now()}`
            }

            // Cadastro de usuário exclusivo para cada teste
            HomePage.visit()
            HomePage.accessRegister()
            RegisterPage.register(user)

            cy.contains(
                `Welcome ${user.firstName} ${user.lastName}`
            ).should('be.visible')

            // Login com o usuário recém-criado
            HomePage.logout()
            LoginPage.visit()
            LoginPage.login(user)

            cy.url().should('include', '/overview.htm')

            // Cria a conta de origem
            cy.get('#leftPanel > ul > :nth-child(1) > a').click()

            cy.get('#type')
                .should('be.visible')
                .select('SAVINGS')

            cy.get('#fromAccountId')
                .should('be.visible')
                .find('option')
                .first()
                .then(($option) => {
                    cy.get('#fromAccountId').select($option.val())
                })

            cy.get('input[type="button"][value="Open New Account"]')
                .should('be.visible')
                .click()

            cy.get('#newAccountId')
                .should('be.visible')
                .invoke('text')
                .then((accountId) => {
                    contaOrigem = accountId.trim()

                    expect(
                        contaOrigem,
                        'ID da conta de origem'
                    ).not.to.be.empty
                })

            // Cria a conta de destino
            cy.get('#leftPanel > ul > :nth-child(1) > a').click()

            cy.get('#type')
                .should('be.visible')
                .select('SAVINGS')

            cy.get('#fromAccountId')
                .should('be.visible')
                .find('option')
                .first()
                .then(($option) => {
                    cy.get('#fromAccountId').select($option.val())
                })

            cy.get('input[type="button"][value="Open New Account"]')
                .should('be.visible')
                .click()

            cy.get('#newAccountId')
                .should('be.visible')
                .invoke('text')
                .then((accountId) => {
                    contaDestino = accountId.trim()

                    expect(
                        contaDestino,
                        'ID da conta de destino'
                    ).not.to.be.empty

                    expect(
                        contaDestino,
                        'As contas devem ser diferentes'
                    ).not.to.equal(contaOrigem)
                })

            // Acessa a funcionalidade de transferência
            TransferPage.accessTransfer()
            TransferPage.title.should('be.visible')
        })
    })

    // TRANSFER001 - Transferência válida
    it('TRANSFER001 - deve realizar uma transferência entre contas diferentes', () => {
        TransferPage.fillAmount('100')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER001-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferResult.should('be.visible')

        cy.screenshot('Transfer/TRANSFER001-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // TRANSFER002 - Valor ausente
    it('TRANSFER002 - deve impedir transferência sem informar valor', () => {
        TransferPage.title.should('be.visible')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER002-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER002-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // TRANSFER003 - Valor zero
    it('TRANSFER003 - deve impedir transferência com valor igual a zero', () => {
        TransferPage.fillAmount('0')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER003-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER003-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // TRANSFER004 - Valor negativo
    it('TRANSFER004 - deve impedir transferência com valor negativo', () => {
        TransferPage.fillAmount('-100')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER004-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER004-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // TRANSFER005 - Valor não numérico
    it('TRANSFER005 - deve impedir transferência com valor não numérico', () => {
        TransferPage.fillAmount('abc')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaDestino)

        cy.screenshot('Transfer/TRANSFER005-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER005-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })

    // TRANSFER006 - Mesma conta de origem e destino
    it('TRANSFER006 - deve impedir transferência para a mesma conta', () => {
        TransferPage.fillAmount('100')
        TransferPage.selectFromAccount(contaOrigem)
        TransferPage.selectToAccount(contaOrigem)

        cy.screenshot('Transfer/TRANSFER006-before', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })

        TransferPage.submitTransfer()
        TransferPage.transferError.should('be.visible')

        cy.screenshot('Transfer/TRANSFER006-result', {
            capture: 'viewport',
            disableTimersAndAnimations: true,
            timeout: 60000
        })
    })
})
