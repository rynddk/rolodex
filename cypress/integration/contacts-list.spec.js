describe('Contacts List tests', () => {
    beforeEach(() => {
        cy.visit('/rolodex?page=2');
        cy.injectAxe();
    });

    it('can directly load a page of the contacts list', () => {
        cy.title().should('eq', 'Rolodex. A simple contact list application.')
        cy
            .get('#contact-list li:first-child a')
            .should('have.attr', 'aria-label', 'View contact information for Charlie Li');
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });
});