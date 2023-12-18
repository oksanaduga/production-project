import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

export default {
    title: 'pages/Article/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const CanEdit = Template.bind({});
CanEdit.args = {};

CanEdit.decorators = [StoreDecorator({
    articleDetails: {
        data: {
            user: {
                id: '1',
            },
        },
    },
    user: {
        authData: {
            id: '1',
        },
    },
})];

export const DeniedEdit = Template.bind({});
DeniedEdit.args = {};

DeniedEdit.decorators = [StoreDecorator({
    articleDetails: {
        data: {
            user: {
                id: '1',
            },
        },
    },
    user: {
        authData: {
            id: '2',
        },
    },
})];
