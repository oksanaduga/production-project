import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('test sidebar', () => {
    test('test sidebar at the document', () => {
        componentRender(<Sidebar />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test sidebar toggle', () => {
        componentRender(<Sidebar />);

        const toggleButton = screen.getByTestId('sidebar-toggle');

        fireEvent.click(toggleButton);

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
