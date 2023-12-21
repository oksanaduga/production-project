import {
    Suspense, memo, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    routeConfig,
} from '../../router/config/routeConfig';
import { PageLoader } from '@/shared/ui/PageLoader';
import { RequireAuth } from './RequireAuth';
import { RequireRoles } from './RequireRoles';
import { getRouteForbidden } from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        const renderElement = () => {
            if (route.roles) {
                return (<RequireRoles roles={route.roles}>{element}</RequireRoles>);
            }
            if (route.authOnly) {
                return (<RequireAuth>{element}</RequireAuth>);
            }
            if (route.path === getRouteForbidden()) {
                return (<RequireAuth>{element}</RequireAuth>);
            }
            return element;
        };

        return (
            <Route
                key={route.path}
                path={route.path}
                element={renderElement()}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
