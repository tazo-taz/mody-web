import React from 'react';
import { cn } from '../../../lib/utils';

type EmptyFieldType = {
    icon?: React.ReactNode,
    placeholder: string,
    value: string,
    className?: string
}

const EmptyField = ({ icon, placeholder, value, className }: EmptyFieldType) => {

    return (
        <div className={cn('border-1 rounded-primary flex p-[15px]', className)}>
            {icon && (
                <div className='w-[30px]'>
                    {icon}
                </div>
            )}

            <div className='flex flex-col justify-center relative w-full flex-1'>
                <h4 className={cn('text-gray-500 absolute left-[1px] whitespace-nowrap transition duration-150', value.length && "text-[13px] -translate-y-3")}>{placeholder}</h4>
                <label
                    className={cn('focus-within:outline-none absolute bg-transparent z-[1] w-full h-5', value && "translate-y-2")}
                >
                    {value}
                </label>
            </div>
        </div>
    );
}

export default EmptyField;
