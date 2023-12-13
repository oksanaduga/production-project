import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from 'reselect';
import { UserRole } from '../types/user';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.ADMIN)));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(UserRole.MANAGER)));

// more common
export const isUserHaveRole = createSelector([getUserRoles,
    (_, role : UserRole) => role,
], (roles, role) => Boolean(roles?.includes(role)));
