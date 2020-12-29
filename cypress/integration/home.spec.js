describe('Home Page tests', () => {
    beforeEach(() => {
        cy.visit('/rolodex/');
        cy.injectAxe();
    });

    it('visits the app', () => {
        cy.title().should('eq', 'Rolodex. A simple contact list application.')
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });
});