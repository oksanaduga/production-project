import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    item: {
        id: '1',
        title: 'Уведомление 1',
        description: 'Произошло какое-то событие',
        userId: 1,
    },
};

export const Link = Template.bind({});
Link.args = {
    item: {
        id: '1',
        title: 'Уведомление 1',
        description: 'Произошло какое-то событие',
        userId: 1,
        href: 'someHref',
    },
};
