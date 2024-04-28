// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// beforeEach(() => {
//     const username = Cypress.env('username');
//     const password = Cypress.env('password');

//     // Visit homepage
//     cy.visit(url);

//     // Click the login account button
//     cy.get('a[href="/login"]').click();

//     // Verify that url includes /login
//     cy.url().should('include', '/login');

//     // Type the username in the input field
//     cy.get('input[name="username"]').type(username);

//     // Verify that the username is typed
//     cy.get('input[name="username"]').should('have.value', username);

//     // Type the password in the input field
//     cy.get('input[name="password"]').type(password);

//     // Verify that the password is typed
//     cy.get('input[name="password"]').should('have.value', password);

//     // Click the Login button
//     cy.get('button').contains('Login').click();

//     // Verify that url is equal to homepage
//     cy.url().should('eq', url);
// })