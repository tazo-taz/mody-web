import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';

type InputType = React.InputHTMLAttributes<HTMLInputElement> & {
    value?: string,
    icon?: React.ReactNode,
    onValueChange?: (newValue: string) => void,
}

const Input = forwardRef<HTMLInputElement, InputType>(({ value = "", icon, placeholder, onValueChange, ...rest }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onValueChange?.(newValue);
        rest.onChange?.(e);
    };

    return (
        <div className='border-1 rounded-primary flex p-[15px]'>
            {icon && (
                <div className='w-[30px]'>
                    {icon}
                </div>
            )}

            <div className='flex flex-col justify-center relative w-full flex-1'>
                <h4 className={cn('text-gray-500 absolute left-[1px] whitespace-nowrap transition duration-150', value.length && "text-[13px] -translate-y-3")}>{placeholder}</h4>
                <input
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    className={cn('focus-within:outline-none absolute bg-transparent z-[1] w-full h-5', value && "translate-y-2")}
                    {...rest}
                />
            </div>
        </div>
    );
});

export default Input;
