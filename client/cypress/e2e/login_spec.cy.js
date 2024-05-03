describe('Login Account', () => {
    it('should log in user', () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        cy.login(username, password)
    })
})