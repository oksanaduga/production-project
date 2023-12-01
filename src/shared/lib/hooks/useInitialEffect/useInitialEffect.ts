import { useEffect, useLayoutEffect } from 'react';

export const useInitialEffect = (cb: () => void) => {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            cb();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const useInitialLayoutEffect = (cb: () => void) => {
    useLayoutEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            cb();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
