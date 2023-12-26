let currentArticleId = '';

describe('User go to article details page', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`/articles/${currentArticleId}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });
    it('and see article details', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });
    it('and see recommendation list', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('and send comment', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('and put rating', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleRecommendationsList').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
