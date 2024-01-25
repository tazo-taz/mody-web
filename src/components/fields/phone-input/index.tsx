import React, { forwardRef } from 'react'
import GeorgianFlagIcon from '../../../assets/images/svgs/icons/flags/georgian'
import { cn } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'

type phoneInputType = React.InputHTMLAttributes<HTMLInputElement> & {
    value: string,
    onValueChange?: (newValue: string) => void
}

const PhoneInput = forwardRef<HTMLInputElement, phoneInputType>(({ value, onValueChange, onChange, ...rest }, ref) => {
    const { getItem } = useLanguage()
    return (
        <div className='border-1 rounded-primary flex'>
            <div className='flex p-3.5 gap-2.5 border-r-1'>
                <GeorgianFlagIcon />
                <h5>+995</h5>
            </div>

            <div className='flex flex-col justify-center pl-4 relative'>
                <h4 className={cn('text-gray-500 absolute left-4 whitespace-nowrap transition duration-150', value.length && "text-[13px] -translate-y-3")}>{getItem("Phone_number")}</h4>
                <input ref={ref} type="number" value={value} onChange={e => {
                    onChange?.(e)
                    onValueChange?.(e.target.value)
                }} className={cn('focus-within:outline-none absolute z-[1] bg-transparent', value && "translate-y-2")} {...rest} />
            </div>
        </div>
    )
})

export default PhoneInput