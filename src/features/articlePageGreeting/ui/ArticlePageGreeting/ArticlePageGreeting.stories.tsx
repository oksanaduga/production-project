import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlePageGreeting } from './ArticlePageGreeting';

export default {
    title: '/ArticlePageGreeting',
    component: ArticlePageGreeting,
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = (args) => (
    <ArticlePageGreeting {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
