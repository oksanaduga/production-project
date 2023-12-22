import { CSSProperties, useMemo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import AvatarImg from '@/shared/assets/icons/avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
        fallbackInverted,
    } = props;
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);

    const fallback = (
        <Skeleton
            width={size}
            height={size}
            border="50%"
        />
    );

    const errorFallback = (
        <Icon
            Svg={AvatarImg}
            width={size}
            height={size}
            inverted={fallbackInverted}
        />
    );

    return (
        <AppImage
            errorFallback={errorFallback}
            fallback={fallback}
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
