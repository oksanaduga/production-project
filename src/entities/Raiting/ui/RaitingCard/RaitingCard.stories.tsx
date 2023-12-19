import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RaitingCard } from './RaitingCard';

export default {
    title: '/RaitingCard',
    component: RaitingCard,
} as ComponentMeta<typeof RaitingCard>;

const Template: ComponentStory<typeof RaitingCard> = (args) => <RaitingCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
