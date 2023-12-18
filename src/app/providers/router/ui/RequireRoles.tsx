import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { getUserRoles } from '@/entities/User/model/selectors/roleSelectors';
import { UserRole } from '@/entities/User/model/consts/consts';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export interface RequireRolesProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireRoles({ children, roles }: RequireRolesProps) {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
