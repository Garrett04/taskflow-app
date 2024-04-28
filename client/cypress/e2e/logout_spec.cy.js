before(() => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.login(username, password);      
})

describe('Logout User', () => {
    it('should logout user', () => {
        cy.get('button[aria-label="logout-button"]').click();
    })
})