import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '../../../../types/ui';
import cls from './DropDown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

export interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

export const DropDown = (props: DropdownProps) => {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;

    const menuClasses = [
        mapDirectionClass[direction],
    ];

    return (
        <Menu
            as="div"
            className={classNames(cls.DropDown, {}, [className, popupCls.popup])}
        >
            <Menu.Button
                className={popupCls.trigger}
            >
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(cls.menu, {}, menuClasses)}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, { [popupCls.active]: active }, [])}
                            key={`dropdown-key-${index}`}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                disabled={item.disabled}
                                to={item.href}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            as={Fragment}
                            disabled={item.disabled}
                            key={`dropdown-key-${index}`}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
