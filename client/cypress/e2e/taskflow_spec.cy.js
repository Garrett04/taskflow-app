let accessToken;

describe('TaskFlow App', () => {
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

            // cy.closeModal();

            // cy.deleteTask(tasks[0].title);
        });
    })

    it('should create new task, add subtasks, and check off the subtasks', () => {
        cy.fixture('data.json').then(data => {
            cy.createTask(data.tasks[1]);

            cy.addSubtasks(data.tasks[1].subtasks, { areChecked: true });

            // cy.closeModal();

            // cy.deleteTask(tasks[1].title);
        })
    })
})