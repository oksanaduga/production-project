import { getUserAuthData } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routers = useMemo(() => Object.values(routeConfig)
        .filter((route) => {
            if (route.authOnly && !isAuth) {
                return false;
            }
            return true;
        })
        .map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <div className="page-wrapper">
                        {element}
                    </div>
                )}
            />
        )), [isAuth]);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routers}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
