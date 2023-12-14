import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropDown } from './DropDown';
import { Button } from '../../../Button/Button';

export default {
    title: 'shared/DropDown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => <DropDown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        { content: 'first' },
        { content: 'second' },
        { content: 'third' },
    ],
};
