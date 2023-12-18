import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AvatarDropDown } from './AvatarDropDown';

export default {
    title: 'features/AvatarDropDown',
    component: AvatarDropDown,
    decorators: [
        (Story) => <div style={{ marginLeft: '100%' }}><Story /></div>,
    ],
} as ComponentMeta<typeof AvatarDropDown>;

const Template: ComponentStory<typeof AvatarDropDown> = (args) => <AvatarDropDown {...args} />;

export const AuthUser = Template.bind({});
AuthUser.args = {};
AuthUser.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '1',
        },
    },
})];
