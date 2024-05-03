describe('Completed Task', () => {
    it('should create new task, add subtasks, and check off the subtasks, and go to completed tasks page', () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        
        cy.login(username, password);
        
        cy.fixture('data.json').then(data => {
            cy.createTask(data.tasks[1]);

            cy.addSubtasks(data.tasks[1].subtasks, { areChecked: true });

            cy.closeModal();

            // cy.deleteTask(tasks[1].title);

            // Click the completed tasks page button
            cy.get('div.MuiButtonBase-root [data-testid="TaskIcon"]').first().click();

            // Verify url equal to /completed-tasks
            cy.url().should('eq', Cypress.config().baseUrl + 'completed-tasks');

            // Check task
            cy.checkTask(data.tasks[1].title, data.tasks[1].subtasks);
        })
    })
})