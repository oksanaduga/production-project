import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { getRouteCreate } from '@/shared/const/router';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropDown } from '@/features/avatarDropDown';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onAuthModalDisable = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t('appName')}
                    className={cls.appName}
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={getRouteCreate()}
                    className={cls.createLink}
                >
                    {t('createArticle')}
                </AppLink>
                <HStack
                    gap="16"
                    className={cls.actions}
                >
                    <NotificationButton />
                    <AvatarDropDown
                        onAuthModalDisable={onAuthModalDisable}
                    />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
                theme={TextTheme.INVERTED}
                title={t('appName')}
                className={cls.appName}
            />
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('login')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
