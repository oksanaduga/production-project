import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: '1',
        text: 'text',
        user: { id: '1', username: 'ivan' },
    },
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    comment: {
        id: '1',
        text: 'text',
        user: { id: '1', username: 'ivan' },
    },
    isLoading: true,
};
