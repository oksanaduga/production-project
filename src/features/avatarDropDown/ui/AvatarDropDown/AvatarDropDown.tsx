import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

interface AvatarDropDownProps {
    className?: string;
    onAuthModalDisable?: () => void;
}
export const AvatarDropDown = memo((props: AvatarDropDownProps) => {
    const { className, onAuthModalDisable } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
        onAuthModalDisable?.();
        dispatch(userActions.logout());
    }, [dispatch, onAuthModalDisable]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (
        <DropDown
            className={classNames('', {}, [className])}
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('admin'),
                    href: getRouteAdminPanel(),
                }] : []),
                {
                    content: t('userProfile'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('logout'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
            direction="bottom left"
        />
    );
});
