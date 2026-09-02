module.exports = {

    complete: {

        name: 'Fluxo Completo',

        steps: [

            // ==========================================
            // REGISTER
            // ==========================================

            {
                id: 'register',
                name: 'Criação de usuário',
                spec: 'cypress/e2e/register/register.cy.js',

                conditions: [
                    {
                        test: 'REGISTER001 - deve cadastrar um novo usuário com dados válidos',
                        expected: 'passed'
                    }
                ]
            },


            // ==========================================
            // LOGIN
            // ==========================================

            {
                id: 'login',
                name: 'Login',
                spec: 'cypress/e2e/login/login.cy.js',

                conditions: [
                    {
                        test: 'LOGIN001 - deve realizar login com o usuário criado no cadastro',
                        expected: 'passed'
                    }
                ]
            },


            // ==========================================
            // ACCOUNTS
            // ==========================================

            {
                id: 'accounts',
                name: 'Contas',
                spec: 'cypress/e2e/accounts/accounts.cy.js',

                conditions: [
                    {
                        test: 'ACCOUNT002 - deve consultar os detalhes de uma conta',
                        expected: 'passed'
                    }
                ]
            },


            // ==========================================
            // TRANSFER
            // ==========================================

            {
                id: 'transfer',
                name: 'Transferências',
                spec: 'cypress/e2e/transfer/transfer.cy.js',

                conditions: [
                    {
                        test: 'TRANSFER001 - deve realizar uma transferência entre contas diferentes',
                        expected: 'passed'
                    }
                ]
            }

        ]
    }
}

