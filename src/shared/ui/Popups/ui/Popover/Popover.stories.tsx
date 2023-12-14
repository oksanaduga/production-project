import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popover } from './Popover';

export default {
    title: 'shared/Popover',
    component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger: <div>click</div>,
    children: (
        <div>
            <div>one</div>
            <div>two</div>
            <div>three</div>
        </div>
    ),
};
