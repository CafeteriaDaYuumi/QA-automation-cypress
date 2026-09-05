import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import ProfilePage from '../../pages/ProfilePage';

describe('Atualização de Perfil', () => {


    let user;

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.fixture('createdUser').then((createdUser) => {
            user = createdUser;
        });
    });

    beforeEach(() => {
        LoginPage.visit();

        LoginPage.login(user);

        HomePage.accessProfile();

        ProfilePage.firstName
            .should('be.visible')
            .and('not.have.value', '');

    });

    it('PROFILE001 - deve atualizar todos os dados do perfil', () => {

        ProfilePage.fillFirstName('Roberto');
        ProfilePage.fillLastName('Carlos');
        ProfilePage.fillAddress('Rua da Flor, 204');
        ProfilePage.fillCity('Chile');
        ProfilePage.fillState('PTB');
        ProfilePage.fillZipCode('32680-000');
        ProfilePage.fillPhoneNumber('66564649782');

        cy.screenshot('profile/PROFILE001-before');

        ProfilePage.update();

        ProfilePage.updateSuccess
            .should('be.visible');

        ProfilePage.successMessage
            .should('be.visible');

        cy.screenshot('profile/PROFILE001-result');
    });

    it('PROFILE002 - deve impedir atualização com campos obrigatórios vazios', () => {

        ProfilePage.firstName
            .clear();

        ProfilePage.lastName
            .clear();

        ProfilePage.address
            .clear();

        ProfilePage.city
            .clear();

        ProfilePage.state
            .clear();

        ProfilePage.zipCode
            .clear();

        ProfilePage.phoneNumber
            .clear();

        cy.screenshot('profile/PROFILE002-before');

        ProfilePage.update();

        ProfilePage.firstName
            .should('have.value', '');

        ProfilePage.lastName
            .should('have.value', '');

        ProfilePage.address
            .should('have.value', '');

        ProfilePage.city
            .should('have.value', '');

        ProfilePage.state
            .should('have.value', '');

        ProfilePage.zipCode
            .should('have.value', '');

        ProfilePage.phoneNumber
            .should('have.value', '');

        cy.screenshot('profile/PROFILE002-result');
    });

    it('PROFILE003 - deve validar o formato do telefone', () => {

        ProfilePage.firstName
            .should('be.visible')
            .and('not.have.value', '');

        ProfilePage.fillPhoneNumber('123');

        cy.screenshot('profile/PROFILE003-before');

        ProfilePage.update();

        ProfilePage.phoneNumber
            .should('have.value', '123');

        cy.screenshot('profile/PROFILE003-result');
    });

    it('PROFILE004 - deve validar o formato do CEP', () => {

        ProfilePage.fillZipCode('123');

        cy.screenshot('profile/PROFILE004-before');

        ProfilePage.update();

        ProfilePage.zipCode
            .should('have.value', '123');

        cy.screenshot('profile/PROFILE004-result');
    });

    it('PROFILE005 - deve manter os dados atualizados após recarregar a página', () => {

        const profile = {
            firstName: 'carlos',
            lastName: 'Hugo',
            address: 'Rua Teste, 100',
            city: 'Betim',
            state: 'MG',
            zipCode: '32600-000',
            phoneNumber: '31999999999'
        };

        ProfilePage.updateProfile(profile);

        cy.screenshot('profile/PROFILE005-before');

        ProfilePage.updateSuccess
            .should('be.visible');

        cy.reload();

        ProfilePage.firstName
            .should('have.value', profile.firstName);

        ProfilePage.lastName
            .should('have.value', profile.lastName);

        ProfilePage.address
            .should('have.value', profile.address);

        ProfilePage.city
            .should('have.value', profile.city);

        ProfilePage.state
            .should('have.value', profile.state);

        ProfilePage.zipCode
            .should('have.value', profile.zipCode);

        ProfilePage.phoneNumber
            .should('have.value', profile.phoneNumber);

        cy.screenshot('profile/PROFILE005-result');
    });

});
