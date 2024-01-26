import React from 'react';
import { cn } from '../../../lib/utils';
import Dropdown, { dropdownItemType } from '../../dropdown';
import EmptyField from '../empty-field';

type EmptyFieldDropdownType = {
    icon?: React.ReactNode,
    placeholder: string,
    value: string,
    className?: string,
    items: dropdownItemType[],
    width?: number
}

const EmptyFieldDropdown = ({ icon, placeholder, value, className, items, width }: EmptyFieldDropdownType) => {
    return (
        <Dropdown exact items={items} width={width}>
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
