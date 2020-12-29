describe('Cypress', () => {
    it('is working', () => {
        expect(true).to.equal(true);
    });

    it('visits the app', () => {
        cy.visit('/rolodex/');
        cy.title().should('eq', 'Rolodex. A simple contact list application.')
    });

    it('can directly load a page of the contacts list', () => {
        cy.visit('/rolodex?page=2');
        cy.title().should('eq', 'Rolodex. A simple contact list application.')
        cy
            .get('#contact-list li:first-child a')
            .should('have.attr', 'aria-label', 'View contact information for Charlie Li');
    })

    it('can directly view a profile', () => {
        cy.visit('/rolodex/Abigail-Williams/');
        cy.title().should('eq', 'Abigail Williams\'s Contact Details. Rolodex.');
    })
});