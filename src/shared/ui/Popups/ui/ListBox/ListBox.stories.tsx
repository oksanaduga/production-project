import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox, ListBoxItem } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    decorators: [
        (Story) => <div style={{ padding: '100px' }}><Story /></div>,
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

const options: ListBoxItem[] = [
    { value: '1', content: 'oneoneoneoneone' },
    { value: '2', content: 'twotwotwotwotwo' },
    { value: '3', content: 'threethreethreethree', disabled: true },
];

export const Normal = Template.bind({});
Normal.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    readonly: false,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    readonly: true,
};

export const DirectionTopLeft = Template.bind({});
DirectionTopLeft.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    direction: 'top left',
    readonly: false,
};

export const DirectionTopRight = Template.bind({});
DirectionTopRight.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    direction: 'top right',
    readonly: false,
};

export const DirectionBottomLeft = Template.bind({});
DirectionBottomLeft.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    direction: 'bottom left',
    readonly: false,
};

export const DirectionBottomRight = Template.bind({});
DirectionBottomRight.args = {
    value: 'value',
    onChange: () => {},
    label: 'label',
    items: options,
    direction: 'bottom right',
    readonly: false,
};
