describe('Profile Page tests', () => {
    beforeEach(() => {
        cy.visit('/rolodex/Abigail-Williams/');
        cy.injectAxe();
    });

    it('can directly view a profile', () => {
        cy.title().should('eq', 'Abigail Williams\'s Contact Details. Rolodex.');
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });
});