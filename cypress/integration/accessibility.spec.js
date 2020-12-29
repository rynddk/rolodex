describe('Accessibility Tests', () => {
    beforeEach(() => {
        cy.visit('/rolodex/');
        cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y();
    });
});