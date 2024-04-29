// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {

  // Visit homepage
  cy.visit('/');

  // Click the login account button
  cy.get('a[href="/login"]').click();

  // Verify that url includes /login
  cy.url().should('include', '/login');

  // Type the username in the input field
  cy.get('input[name="username"]').type(username);

  // Verify that the username is typed
  cy.get('input[name="username"]').should('have.value', username);

  // Type the password in the input field
  cy.get('input[name="password"]').type(password);

  // Verify that the password is typed
  cy.get('input[name="password"]').should('have.value', password);

  // Click the Login button
  cy.get('button').contains('Login').click();
  
  // Verify that url is equal to homepage
  cy.url().should('eq', Cypress.config().baseUrl);
})


Cypress.Commands.add('createTask', (task) => {
  // Click add new task button
  cy.get('button[aria-label="Add new task"]').click();

      
  cy.get('[data-testid="task-modal"]')
    .within(() => {
      // Type the task title into the input field
      cy.get('input[name="task-title"]').type(task.title);

      // Verify that task title has been added
      cy.get('input[name="task-title"]').should('have.value', task.title);

      // Press enter key
      cy.get('input[name="task-title"]').type('{enter}');
    })
})

// adds subtasks when task modal is openeed
Cypress.Commands.add('addSubtasks', (subtasks, options) => {
  const { areChecked } = options ?? {};

  cy.get('[data-testid="task-modal"]')
    .within(() => {
    for (let i = 0; i < subtasks.length; i++) {
      cy.get('input[name="title"]').type(subtasks[i].title);
      cy.get('input[name="description"]').type(subtasks[i].description);
      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="subtask-title"]').contains(subtasks[i].title);
      cy.get('[data-testid="subtask-description"]').contains(subtasks[i].description);
    }


    if (areChecked) {
      cy.get('input[type="checkbox"]').click({ multiple: true });
    }
  })
})

Cypress.Commands.add('deleteTask', (task_title) => {
  // Delete task which contains the task title
  cy.get('[data-testid="task-card"]').contains(task_title)
  .get('button')
  .get('[data-testid="trash-button"]').click();
})

Cypress.Commands.add('closeModal', () => {
  // Click outside the task modal
  cy.get('div.MuiBackdrop-root').scrollIntoView().click({ force: true });
})

Cypress.Commands.add('checkTask', (task_title, subtasks, options) => {
  const { deadline_date } = options ?? {};

  cy.get('div.MuiPaper-root')
    .get('span.MuiTypography-root').contains(task_title);

    
  cy.get('[data-testid="subtask-container"]').each(($el, idx) => {
    cy.get($el).get('[data-testid="subtask-title"]').contains(subtasks[idx].title);
    cy.get($el).get('[data-testid="subtask-description"]').contains(subtasks[idx].description);
  })

  if (deadline_date) {
    cy.get('[data-testid="deadline-date"]').contains(deadline_date);
  }
})