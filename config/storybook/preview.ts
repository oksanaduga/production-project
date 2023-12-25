import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src/shared/const/theme';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    themes: {
        default: 'light',
        list: [
            { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
            { name: 'dark', class: Theme.DARK, color: '#000000' },
            { name: 'orange', class: Theme.ORANGE, color: '#9f6fb2' },
        ],
    },
};

export default {
    decorators: [
        StyleDecorator,
        TranslationDecorator,
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator,
        SuspenseDecorator,
    ],
};

// addDecorator(StyleDecorator);
// addDecorator(TranslationDecorator);
// addDecorator(ThemeDecorator(Theme.LIGHT));
// addDecorator(RouterDecorator);
// addDecorator(SuspenseDecorator);
