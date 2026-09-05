import BillPayPage from '../../pages/BillPayPage'
import LoginPage from '../../pages/LoginPage'

let contaOrigem

describe('Pagamento de Contas', () => {

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

        // Lê as contas criadas na Sprint anterior
        cy.readFile('cypress/fixtures/createdAccounts.json')
            .then((data) => {

                contaOrigem = data.accounts.account1

                cy.log(`Conta origem: ${contaOrigem}`)
            })
    })

    beforeEach(() => {

        // Garante que cada teste comece sem sessão anterior
        cy.clearCookies()
        cy.clearLocalStorage()

        // Login
        LoginPage.visit()

        cy.readFile('cypress/fixtures/createdUser.json')
            .then((user) => {

                LoginPage.login(user)

            })

        // Confirma que o login foi realizado
        cy.url()
            .should('include', '/overview.htm')

        // Acessa pagamento de contas
        BillPayPage.accessBillPay()
    })


    it('BILLPAY001 - deve realizar pagamento de conta com dados válidos', () => {

        BillPayPage.fillPayeeName('Empresa Teste')
        BillPayPage.fillAddress('Rua Teste, 100')
        BillPayPage.fillCity('Betim')
        BillPayPage.fillState('MG')
        BillPayPage.fillZipCode('32600-000')
        BillPayPage.fillPhone('31999999999')
        BillPayPage.fillAccountNumber(contaOrigem)
        BillPayPage.fillVerifyAccount(contaOrigem)
        BillPayPage.fillAmount('100')
        BillPayPage.selectFromAccount(contaOrigem)

        cy.screenshot('BillPay/BILLPAY001-before')

        BillPayPage.submitPayment()

        BillPayPage.billPayResult
            .should('be.visible')

        cy.screenshot('BillPay/BILLPAY001-result')
    })


    it('BILLPAY002 - deve validar campos obrigatórios', () => {

        cy.screenshot('BillPay/BILLPAY002-before')

        BillPayPage.submitPayment()

        BillPayPage.payeeNameError
            .should('be.visible')

        BillPayPage.addressError
            .should('be.visible')

        BillPayPage.cityError
            .should('be.visible')

        BillPayPage.stateError
            .should('be.visible')

        BillPayPage.zipCodeError
            .should('be.visible')

        BillPayPage.phoneError
            .should('be.visible')

        BillPayPage.accountEmptyError
            .should('be.visible')

        BillPayPage.verifyAccountEmptyError
            .should('be.visible')

        BillPayPage.amountEmptyError
            .should('be.visible')

        cy.screenshot('BillPay/BILLPAY002-result')
    })


    it('BILLPAY003 - deve validar valores inválidos', () => {

        BillPayPage.fillPayeeName('Empresa Teste')
        BillPayPage.fillAddress('Rua Teste, 100')
        BillPayPage.fillCity('Betim')
        BillPayPage.fillState('MG')
        BillPayPage.fillZipCode('32600-000')
        BillPayPage.fillPhone('31999999999')
        BillPayPage.fillAccountNumber(contaOrigem)
        BillPayPage.fillVerifyAccount(contaOrigem)

        // Valor inválido
        BillPayPage.fillAmount('abc')
        BillPayPage.selectFromAccount(contaOrigem)

        cy.screenshot('BillPay/BILLPAY003-before')

        BillPayPage.submitPayment()

        BillPayPage.amountInvalidError
            .should('be.visible')

        cy.screenshot('BillPay/BILLPAY003-result')
    })


    it('BILLPAY004 - deve validar dados divergentes', () => {

        BillPayPage.fillPayeeName('Empresa Teste')
        BillPayPage.fillAddress('Rua Teste, 100')
        BillPayPage.fillCity('Betim')
        BillPayPage.fillState('MG')
        BillPayPage.fillZipCode('32600-000')
        BillPayPage.fillPhone('31999999999')

        // Contas divergentes
        BillPayPage.fillAccountNumber(contaOrigem)
        BillPayPage.fillVerifyAccount('999999')

        BillPayPage.fillAmount('100')
        BillPayPage.selectFromAccount(contaOrigem)

        cy.screenshot('BillPay/BILLPAY004-before')

        BillPayPage.submitPayment()

        BillPayPage.verifyAccountMismatchError
            .should('be.visible')

        cy.screenshot('BillPay/BILLPAY004-result')
    })

})