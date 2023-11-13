import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

describe('test button', () => {
    test('test default button', () => {
        render(<Button>TEST</Button>);

        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('test button theme CLEAR', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);

        expect(screen.getByText('TEST')).toHaveClass('clear');

        screen.debug();
    });
});
