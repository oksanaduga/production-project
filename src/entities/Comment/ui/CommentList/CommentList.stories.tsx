import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'text',
            user: { id: '1', username: 'ivan' },
        },
        {
            id: '2',
            text: 'text2',
            user: { id: '2', username: 'ivan2' },
        },
    ],
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    comments: [],
    isLoading: true,
};
