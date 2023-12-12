import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
    title: 'pages/Article/ArticleDetailsComments',
    component: ArticleDetailsComments,
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({
    articleDetailsPage: {
        comments: {
            isLoading: false,
            error: undefined,
            ids: [1, 2],
            entities: {
                1: {
                    id: '1',
                    text: 'text',
                    user: { id: '1', username: 'ivan' },
                },
                2: {
                    id: '2',
                    text: 'text2',
                    user: { id: '2', username: 'ivan2' },
                },
            },
        },
    },
})];

export const IsLoading = Template.bind({});
IsLoading.decorators = [StoreDecorator({
    articleDetailsPage: {
        comments: {
            isLoading: true,
            ids: [],
            entities: {},
        },
    },
})];

export const EmptyComments = Template.bind({});
EmptyComments.decorators = [StoreDecorator({
    articleDetailsPage: {
        comments: {
            isLoading: false,
            ids: [],
            entities: {},
        },
    },
})];
