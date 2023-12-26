describe('User go to article list page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('/articles');
        });
    });
    it('articles success load', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem0').should('exist');
    });
    it('articles on stub (fixtures)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });

        // пример автоматизированной фикстуры
        // cy.intercept('GET', '**/articles?*', (req) => {
        //     req.method
        // });

        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem0').should('exist');
    });
    it('articles sort', () => {
        cy.getByTestId('ArticleSortSelector.views').select('views');

        let first;
        cy.getByTestId('ArticleListItem.views.Paragraph').first().invoke('text').then((text) => {
            first = Number(text);
        });

        cy.getByTestId('ArticleListItem.views.Paragraph').last().invoke('text').then((text) => {
            const last = Number(text);
            expect(last).to.be.greaterThan(first);
        });
    });
    it.skip('example skip test', () => {
        cy.get('asd').should('exist');
    });
});
