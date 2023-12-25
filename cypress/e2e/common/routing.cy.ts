import { selectByTestId } from '../../helpers/selectByTestId';

describe('routing', () => {
    describe('User is not authorized', () => {
        it('Route on main page', () => {
            cy.visit('/');

            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Redirest on main page', () => {
            cy.visit('/profile/1');

            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Redirect at not found page', () => {
            cy.visit('/sdfhsjk');

            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
    describe('User is authorized', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Profile page', () => {
            cy.visit('/profile/1');

            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Articles page', () => {
            cy.visit('/articles');

            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
