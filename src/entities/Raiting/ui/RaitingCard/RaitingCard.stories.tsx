import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RaitingCard } from './RaitingCard';

export default {
    title: 'entities/RaitingCard',
    component: RaitingCard,
} as ComponentMeta<typeof RaitingCard>;

const Template: ComponentStory<typeof RaitingCard> = (args) => <RaitingCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    rate: 4,
};

export const Empty = Template.bind({});
Empty.args = {};
