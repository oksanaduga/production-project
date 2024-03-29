import {
    ImgHTMLAttributes, memo, useLayoutEffect, useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    className?: string;
    fallback?: JSX.Element;
    errorFallback?: JSX.Element;
}
export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setIsError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (isError && errorFallback) {
        return errorFallback;
    }

    return (
        <img
            className={className}
            alt={alt}
            src={src}
            {...otherProps}
        />
    );
});
