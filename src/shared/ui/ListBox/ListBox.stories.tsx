import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox, ListBoxItem } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <div style={{ paddingTop: '200px' }}>
        <ListBox {...args} />
    </div>
);

const options: ListBoxItem[] = [
    { value: '1', content: 'one' },
    { value: '2', content: 'two' },
    { value: '3', content: 'three', disabled: true },
];

export const Normal = Template.bind({});
Normal.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    readonly: true,
};

export const DirectionTop = Template.bind({});
DirectionTop.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    direction: 'top',
};
