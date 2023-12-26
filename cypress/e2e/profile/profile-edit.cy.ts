let profileId = '';
describe('user go to the profile page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${profileId}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('and successfuly load profile page', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });
    it('and edit profile page', () => {
        const newName = 'new';
        const newLastName = 'newlastname';

        cy.updateProfile(newName, newLastName);

        cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastName);
    });
});
