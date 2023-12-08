import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MemoryRouter, Route, reactRouterParameters } from 'react-router-dom';
import ArticleEditPage from './ArticleEditPage';

export default {
    title: 'pages/Article/ArticleEditPage',
    component: ArticleEditPage,
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
// Normal.parameters = {
//     reactRouter: reactRouterParameters({
//         location: {
//             pathParams: { userId: '42' },
//         },
//         routing: { path: '/users/:userId' },
//     }),
// };

// Normal.decorators = [
//     (Story) => (
//         <MemoryRouter initialEntries={['articles/7/edit']}>
//             <Route path="/articles/:myId/edit">
//                 <Story />
//             </Route>
//         </MemoryRouter>
//     )];
