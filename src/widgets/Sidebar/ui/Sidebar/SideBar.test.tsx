import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from 'widgets/Sidebar';

describe('test sidebar', () => {
    test('test sidebar', () => {
        renderWithTranslation(<Sidebar />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test sidebar toggle', () => {
        renderWithTranslation(<Sidebar />);

        const toggleButton = screen.getByTestId('sidebar-toggle');

        fireEvent.click(toggleButton);

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
