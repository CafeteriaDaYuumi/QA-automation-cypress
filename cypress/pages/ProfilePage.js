class ProfilePage {

// --- CAMPOS DO FORMULÁRIO ---

get firstName() {
return cy.get('#customer\\.firstName');
 }

get lastName() {
return cy.get('#customer\\.lastName');

}
get address() {
return cy.get('#customer\\.address\\.street');
}

get city() {
return cy.get('#customer\\.address\\.city');
}

get state() {
 return cy.get('#customer\\.address\\.state');
}

 get zipCode() {
return cy.get('#customer\\.address\\.zipCode');
 }

get phoneNumber() {
 return cy.get('#customer\\.phoneNumber');
}

// --- BOTÃO ---

 get updateButton() {
return cy.get('[colspan="2"] > .button');
 }

// --- RESULTADO ---

 get updateSuccess() {
 return cy.get('#updateProfileResult > .title');
}

 get successMessage() {
return cy.get('#updateProfileResult > p');
}

// --- NAVEGAÇÃO ---

visit() {
cy.visit('/updateprofile.htm');
}

// --- PREENCHIMENTO ---

fillFirstName(firstName) {
this.firstName
.clear()
.type(firstName);
}

fillLastName(lastName) {
this.lastName
.clear()
.type(lastName);
}

fillAddress(address) {
this.address
.clear()
.type(address);
}

fillCity(city) {
this.city
.clear()
.type(city);
}

fillState(state) {
this.state
.clear()
.type(state);
}

fillZipCode(zipCode) {
 this.zipCode
 .clear()
 .type(zipCode);
}

 fillPhoneNumber(phoneNumber) {
this.phoneNumber
 .clear()
 .type(phoneNumber);
}

// --- AÇÃO ---

update() {
 this.updateButton.click();
}

// --- FLUXO DE ATUALIZAÇÃO ---

updateProfile(profile) {
this.fillFirstName(profile.firstName);
this.fillLastName(profile.lastName);
this.fillAddress(profile.address);
this.fillCity(profile.city);
this.fillState(profile.state);
this.fillZipCode(profile.zipCode);
this.fillPhoneNumber(profile.phoneNumber);
this.update();
 }
}

export default new ProfilePage();