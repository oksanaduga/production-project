import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('approuter', () => {
    test('page rendering AboutPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const aboutPage = await screen.findByTestId('AboutPage');

        expect(aboutPage).toBeInTheDocument();
    });

    test('page rendering NotFoundPage', async () => {
        componentRender(<AppRouter />, {
            route: '/sdfsdf',
        });

        const notFoundPage = await screen.findByTestId('NotFoundPage');

        expect(notFoundPage).toBeInTheDocument();
    });

    test('page rendering not auth redirect to main', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const mainPage = await screen.findByTestId('MainPage');

        expect(mainPage).toBeInTheDocument();
    });

    test('access to close page for auth user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { _inited: true, authData: {} },
            },
        });

        const profilePage = await screen.findByTestId('ProfilePage');

        expect(profilePage).toBeInTheDocument();
    });

    test('forbidden (not access)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { _inited: true, authData: {} },
            },
        });

        const forbiddenPage = await screen.findByTestId('ForbiddenPage');

        expect(forbiddenPage).toBeInTheDocument();
    });

    test('admin access', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const adminPage = await screen.findByTestId('AdminPanelPage');

        expect(adminPage).toBeInTheDocument();
    });
});
