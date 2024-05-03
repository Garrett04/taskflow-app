describe('Register account', () => {
    it('should register a new account', () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        // Visits the page
        cy.visit('http://localhost:3001');
    
        // Click the login account button
        cy.get('a[href="/login"]').click();

        // URL should have /login included
        cy.url().should('include', '/login');
  
        // Click the register button
        cy.get('a[href="/register"]').click();

        // URL should have /register included
        cy.url().should('include', '/register');

        // Type username in input field
        cy.get('input[name="username"]').type(username);

        // Verify that the username has been entered
        cy.get('input[name="username"').should('have.value', username);

        // Type the password in input field
        cy.get('input[name="password"]').type(password);

        // Verify that the password has been entered
        cy.get('input[name="password"]').should('have.value', password);

        // Click on the register button
        cy.get('button').contains('Register').click();

        // URL should include the homepage "/"
        cy.url().should('eq', 'http://localhost:3001/');
    })
  
})