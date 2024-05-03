describe('Task with idle status', () => {
    beforeEach(() => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');
    
        cy.login(username, password);
    })

    // task modal 
    it('should create a new task, and add subtasks', () => {
        cy.fixture('data.json').then(data => {
            cy.createTask(data.tasks[0]);

            cy.addSubtasks(data.tasks[0].subtasks);

            cy.closeModal();

            // cy.deleteTask(tasks[0].title);
        });
    })
})