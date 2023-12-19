import { ComponentStory, ComponentMeta } from '@storybook/react';

import withMock from 'storybook-addon-mock';
import { NotificationButton } from './NotificationButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import type { Notification } from '../../model/types/notification';

const notification: Notification = {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
    userId: 1,
};

export default {
    title: '/NotificationButton',
    component: NotificationButton,
    decorators: [
        (Story) => <div style={{ display: 'flex', marginLeft: '100%' }}><Story /></div>,
        withMock,
        StoreDecorator({}),
    ],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification },
                { ...notification, title: 'Уведомление 2', id: '2' },
            ],
        },
    ],
};
