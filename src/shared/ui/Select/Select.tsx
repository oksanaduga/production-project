import {
    ChangeEvent,
    useCallback, useMemo,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';
import { TestProps } from '@/shared/types/tests';

export interface SelectOption<T extends string> {
    value: T;
    content: T;
}

interface SelectProps<T extends string> extends TestProps {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}
export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
        'data-testid': dataTestId = 'Select',
    } = props;

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            value={opt.value}
            className={cls.option}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    }, [onChange]);

    const mods: Mods = {};

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                data-testid={dataTestId}
            >
                {optionList}
            </select>
        </div>
    );
};
