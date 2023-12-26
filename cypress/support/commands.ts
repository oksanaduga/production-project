import * as commonCommands from './commads/common';
import * as profileCommands from './commads/profile';
import * as articleCommands from './commads/article';
import * as commentsCommands from './commads/comments';
import * as ratingCommands from './commads/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// Cypress.Commands.overwrite('intercept', () => {
//     const { FIXTURE_MODE } = process.env;
//     const fixtureName = req.METHOD + req.url + hash(req.body);

//     if (FIXTURE_MODE === 'READ') {
//         readFixture()
//     }

//     if (FIXTURE_MODE === 'WRITE') {
//         createFixture(fixtureName, req.body);
//     }
// });

export {};
