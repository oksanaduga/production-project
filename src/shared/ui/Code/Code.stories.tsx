import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (arg) => <Code {...arg} />;

export const Normal = Template.bind({});
Normal.args = {
    text: 'import { ComponentStory, ComponentMeta } from "@storybook/react";\n'
    + 'import { Code } from "./Code";\n'
    + 'const Template: ComponentStory<typeof Code> = (arg) => <Code {...arg} />;',
};
