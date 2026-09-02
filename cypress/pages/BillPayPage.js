class BillPayPage {

  // --- NAVEGAÇÃO ---

  get billPayLink() {
    return cy.get('a[href="billpay.htm"]')
  }

  // --- CAMPOS DO FORMULÁRIO ---

  get payeeName() {
    return cy.get('[name="payee.name"]')
  }

  get address() {
    return cy.get('[name="payee.address.street"]')
  }

  get city() {
    return cy.get('[name="payee.address.city"]')
  }

  get state() {
    return cy.get('[name="payee.address.state"]')
  }

  get zipCode() {
    return cy.get('[name="payee.address.zipCode"]')
  }

  get phone() {
    return cy.get('[name="payee.phoneNumber"]')
  }

  get accountNumber() {
    return cy.get('[name="payee.accountNumber"]')
  }

  get verifyAccount() {
    return cy.get('[name="verifyAccount"]')
  }

  get amount() {
    return cy.get('[name="amount"]')
  }

  get fromAccount() {
    return cy.get('[name="fromAccountId"]')
  }

  // --- BOTÃO ---

  get payButton() {
    return cy.get('input[type="button"][value="Send Payment"]')
  }

  // --- RESULTADOS ---

  get billPayForm() {
    return cy.get('#billpayForm')
  }

  get billPayResult() {
    return cy.get('#billpayResult')
  }

  get billPayResultPayeeName() {
    return cy.get('#payeeName')
  }

  get billPayResultAmount() {
    return cy.get('#amount')
  }

  get billPayResultFromAccount() {
    return cy.get('#fromAccountId')
  }

  get billPayError() {
    return cy.get('#billpayError')
  }

  // --- VALIDAÇÕES ---

  get payeeNameError() {
    return cy.get('#validationModel-name')
  }

  get addressError() {
    return cy.get('#validationModel-address')
  }

  get cityError() {
    return cy.get('#validationModel-city')
  }

  get stateError() {
    return cy.get('#validationModel-state')
  }

  get zipCodeError() {
    return cy.get('#validationModel-zipCode')
  }

  get phoneError() {
    return cy.get('#validationModel-phoneNumber')
  }

  get accountEmptyError() {
    return cy.get('#validationModel-account-empty')
  }

  get accountInvalidError() {
    return cy.get('#validationModel-account-invalid')
  }

  get verifyAccountEmptyError() {
    return cy.get('#validationModel-verifyAccount-empty')
  }

  get verifyAccountInvalidError() {
    return cy.get('#validationModel-verifyAccount-invalid')
  }

  get verifyAccountMismatchError() {
    return cy.get('#validationModel-verifyAccount-mismatch')
  }

  get amountEmptyError() {
    return cy.get('#validationModel-amount-empty')
  }

  get amountInvalidError() {
    return cy.get('#validationModel-amount-invalid')
  }

  // --- AÇÕES ---

  accessBillPay() {
    this.billPayLink.click()
  }

  fillPayeeName(payeeName) {
    this.payeeName.clear().type(payeeName)
  }

  fillAddress(address) {
    this.address.clear().type(address)
  }

  fillCity(city) {
    this.city.clear().type(city)
  }

  fillState(state) {
    this.state.clear().type(state)
  }

  fillZipCode(zipCode) {
    this.zipCode.clear().type(zipCode)
  }

  fillPhone(phone) {
    this.phone.clear().type(phone)
  }

  fillAccountNumber(accountNumber) {
    this.accountNumber.clear().type(accountNumber)
  }

  fillVerifyAccount(accountNumber) {
    this.verifyAccount.clear().type(accountNumber)
  }

  fillAmount(amount) {
    this.amount.clear().type(amount)
  }

  selectFromAccount(account) {
    this.fromAccount.select(account.toString())
  }

  submitPayment() {
    this.payButton.click()
  }

  // --- FLUXOS DE PAGAMENTO ---

  // BILLPAY001 - Pagamento de conta com dados válidos
  payBill(payee) {
    this.fillPayeeName(payee.name)
    this.fillAddress(payee.address)
    this.fillCity(payee.city)
    this.fillState(payee.state)
    this.fillZipCode(payee.zipCode)
    this.fillPhone(payee.phone)
    this.fillAccountNumber(payee.accountNumber)
    this.fillVerifyAccount(payee.accountNumber)
    this.fillAmount(payee.amount)
    this.selectFromAccount(payee.fromAccount)
    this.submitPayment()
  }

  // Preenche somente os campos informados.
  // Útil para cenários negativos e validações isoladas.
  fillPaymentData(data = {}) {
    if (data.name !== undefined) this.fillPayeeName(data.name)
    if (data.address !== undefined) this.fillAddress(data.address)
    if (data.city !== undefined) this.fillCity(data.city)
    if (data.state !== undefined) this.fillState(data.state)
    if (data.zipCode !== undefined) this.fillZipCode(data.zipCode)
    if (data.phone !== undefined) this.fillPhone(data.phone)
    if (data.accountNumber !== undefined) {
      this.fillAccountNumber(data.accountNumber)
    }
    if (data.verifyAccount !== undefined) {
      this.fillVerifyAccount(data.verifyAccount)
    }
    if (data.amount !== undefined) this.fillAmount(data.amount)
    if (data.fromAccount !== undefined) {
      this.selectFromAccount(data.fromAccount)
    }
  }

  submitWithoutData() {
    this.submitPayment()
  }

  // --- CONTAS DISPONÍVEIS ---

  getAvailableAccounts() {
    return this.fromAccount
      .find('option')
      .then(($options) => {
        return [...$options]
          .map((option) => option.value)
          .filter((value) => value)
      })
  }
}

export default new BillPayPage()