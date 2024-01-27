import React from 'react';
import Dropdown, { dropdownItemType } from '../../dropdown';
import EmptyField from '../empty-field';

type EmptyFieldDropdownType = {
    icon?: React.ReactNode,
    placeholder: string,
    value: string,
    className?: string,
    itemsClassName?: string,
    items: dropdownItemType[],
    width?: number
}

const EmptyFieldDropdown = ({ icon, placeholder, value, className, itemsClassName, items, width }: EmptyFieldDropdownType) => {
    return (
        <Dropdown exact items={items} width={width} itemsClassName={itemsClassName}>
            <EmptyField
                icon={icon}
                placeholder={placeholder}
                value={value}
                className={className}

            />
        </Dropdown>
    );
}

export default EmptyFieldDropdown;
