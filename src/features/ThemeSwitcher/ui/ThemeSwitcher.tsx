/* eslint-disable no-nested-ternary */
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import LightIcon from '@/shared/assets/icons/theme-light.svg?react';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg?react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme: Theme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={onToggleHandler}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.DARK ? (
                <DarkIcon />
            ) : theme === Theme.LIGHT ? (
                <LightIcon />
            ) : (
                <div style={{ color: 'red' }}>custom</div>
            )}
        </Button>
    );
});
