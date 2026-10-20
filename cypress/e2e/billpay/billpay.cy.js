
import HomePage from '../../pages/HomePage'
import RegisterPage from '../../pages/RegisterPage'
import LoginPage from '../../pages/LoginPage'
import BillPayPage from '../../pages/BillPayPage'

describe('Pagamento de Contas', () => {
    let user
    let contaOrigem

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.fixture('registration').then((data) => {
            user = {
                ...data.validUser,
                username: `QA-bil_${Date.now()}`
            }

            // Cria um usuário exclusivo para este teste
            HomePage.visit()
            HomePage.accessRegister()
            RegisterPage.register(user)

            cy.contains(`Welcome ${user.firstName} ${user.lastName}`)
                .should('be.visible')

            HomePage.logout()

            // Autentica o usuário recém-criado
            LoginPage.visit()
            LoginPage.login(user)

            cy.url().should('include', '/overview.htm')

            // Obtém uma conta do usuário autenticado
            cy.get('a[href*="activity.htm"]')
                .should('have.length.greaterThan', 0)
                .first()
                .invoke('text')
                .then((account) => {
                    contaOrigem = account.trim()

                    expect(contaOrigem).not.to.be.empty
                    cy.log(`Conta origem: ${contaOrigem}`)

                    BillPayPage.accessBillPay()
                })
        })
    })

    it('BILLPAY001 - deve realizar pagamento de conta com dados válidos', () => {
        cy.screenshot('BillPay/BILLPAY001-start', {
            capture: 'viewport',
            timeout: 60000
        })

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

        BillPayPage.submitPayment()

        BillPayPage.billPayResult.should('be.visible')

        cy.screenshot('BillPay/BILLPAY001-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('BILLPAY002 - deve validar campos obrigatórios', () => {
        cy.screenshot('BillPay/BILLPAY002-start', {
            capture: 'viewport',
            timeout: 60000
        })

        BillPayPage.submitPayment()

        BillPayPage.payeeNameError.should('be.visible')
        BillPayPage.addressError.should('be.visible')
        BillPayPage.cityError.should('be.visible')
        BillPayPage.stateError.should('be.visible')
        BillPayPage.zipCodeError.should('be.visible')
        BillPayPage.phoneError.should('be.visible')
        BillPayPage.accountEmptyError.should('be.visible')
        BillPayPage.verifyAccountEmptyError.should('be.visible')
        BillPayPage.amountEmptyError.should('be.visible')

        cy.screenshot('BillPay/BILLPAY002-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('BILLPAY003 - deve validar valores inválidos', () => {
        cy.screenshot('BillPay/BILLPAY003-start', {
            capture: 'viewport',
            timeout: 60000
        })

        BillPayPage.fillPayeeName('Empresa Teste')
        BillPayPage.fillAddress('Rua Teste, 100')
        BillPayPage.fillCity('Betim')
        BillPayPage.fillState('MG')
        BillPayPage.fillZipCode('32600-000')
        BillPayPage.fillPhone('31999999999')
        BillPayPage.fillAccountNumber(contaOrigem)
        BillPayPage.fillVerifyAccount(contaOrigem)
        BillPayPage.fillAmount('abc')
        BillPayPage.selectFromAccount(contaOrigem)

        BillPayPage.submitPayment()

        BillPayPage.amountInvalidError.should('be.visible')

        cy.screenshot('BillPay/BILLPAY003-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })

    it('BILLPAY004 - deve validar dados divergentes', () => {
        cy.screenshot('BillPay/BILLPAY004-start', {
            capture: 'viewport',
            timeout: 60000
        })

        BillPayPage.fillPayeeName('Empresa Teste')
        BillPayPage.fillAddress('Rua Teste, 100')
        BillPayPage.fillCity('Betim')
        BillPayPage.fillState('MG')
        BillPayPage.fillZipCode('32600-000')
        BillPayPage.fillPhone('31999999999')
        BillPayPage.fillAccountNumber(contaOrigem)
        BillPayPage.fillVerifyAccount('999999')
        BillPayPage.fillAmount('100')
        BillPayPage.selectFromAccount(contaOrigem)

        BillPayPage.submitPayment()

        BillPayPage.verifyAccountMismatchError.should('be.visible')

        cy.screenshot('BillPay/BILLPAY004-result', {
            capture: 'viewport',
            timeout: 60000
        })
    })
})
