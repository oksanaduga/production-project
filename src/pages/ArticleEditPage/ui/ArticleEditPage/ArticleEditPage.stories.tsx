import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleEditPage from './ArticleEditPage';

export default {
    title: 'pages/Article/ArticleEditPage',
    component: ArticleEditPage,
} as ComponentMeta<typeof ArticleEditPage>;

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const EditArticle = Template.bind({});
EditArticle.args = {};
EditArticle.decorators = [StoreDecorator({})];
// EditArticle.decorators = [RouterDecorator('/article/7')];
// EditArticle.parameters = {
//     reactRouter: reactRouterParameters({
//       location: {
//         pathParams: { userId: '42' },
//       },
//       routing: { path: '/users/:userId' },
//     }),

// addDecorator(RouterDecorator);

// Normal.parameters = {
//     reactRouter: reactRouterParameters({
//         location: {
//             pathParams: { userId: '42' },
//         },
//         routing: { path: '/users/:userId' },
//     }),
// };
