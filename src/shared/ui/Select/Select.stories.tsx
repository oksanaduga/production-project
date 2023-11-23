import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Some label',
    options: [
        { value: '123', content: 'first' },
        { value: '456', content: 'second' },
    ],
};
