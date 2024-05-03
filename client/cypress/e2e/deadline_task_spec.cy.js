import { addMinutes, addSeconds, format, minutesToMilliseconds, secondsToMilliseconds } from "date-fns";

describe('Task with deadline date', () => {
    it('should create new task, add subtasks, and add a deadline date and go to overdue page after the deadline date exceeds', () => {
        // cy.log(waitTime);
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        cy.login(username, password);

        cy.fixture('data.json').then(data => {
            cy.createTask(data.tasks[2]);

            cy.addSubtasks(data.tasks[2].subtasks);

            const deadline_date = addMinutes(new Date(), 1);
            const formattedDeadlineDate = format(deadline_date,  "MM-dd-yyyy'T'hh:mm a");

            // Add deadline date to task
            cy.get('label').contains('Deadline Date').click({ force: true })
                .type(formattedDeadlineDate);

            const waitTime = secondsToMilliseconds(45);

            cy.wait(waitTime);

            cy.closeModal();

            // Click the overdue tasks page button
            cy.get('div.MuiButtonBase-root [data-testid="HourglassDisabledIcon"]').first().click();

            cy.url().should('eq', Cypress.config().baseUrl + 'overdue-tasks');

            // 2024-04-29 12:45 PM
            cy.checkTask(data.tasks[2].title, data.tasks[2].subtasks, { deadline_date: format(deadline_date, "yyyy-MM-dd hh:mm a") });
        })
    })
})