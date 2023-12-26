import { createSelector } from 'reselect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/consts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);

// more common
export const isUserHaveRole = createSelector(
    [getUserRoles, (_, role: UserRole) => role],
    (roles, role) => Boolean(roles?.includes(role)),
);
