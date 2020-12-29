describe('Cypress', () => {
    it('is working', () => {
        expect(true).to.equal(true);
    });

    it('visits the app', () => {
        cy.visit('/rolodex/');
        cy.title().should('eq', 'Rolodex. A simple contact list application.')
    });
});