import { ComponentStory, ComponentMeta } from '@storybook/react';

import withMock from 'storybook-addon-mock';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from './NotificationList';
import type { Notification } from '../../model/types/notification';

const notification: Notification = {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
    userId: 1,
};

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
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

// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [StoreDecorator({})];
// Loading.parameters = {
//     mockData: [
//         {
//             url: `${__API__}/notifications`,
//             method: 'GET',
//             status: 200,
//         },
//     ],
// };
