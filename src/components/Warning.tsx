import React from 'react'
import WarningIcon from '../assets/images/svgs/icons/warning'
import { cn } from '../lib/utils'

type warningProps = {
    icon?: React.ReactNode,
    text: string,
    className?: string,
}

export default function Warning({ icon = <WarningIcon />, text, className }: warningProps) {
    return (
        <div className={cn('pl-3 py-2 bg-yellow-50 flex items-center rounded-primary pr-8', className)}>
            <div className='w-[30px]'>
                {icon}
            </div>

            <h2 className='text-[#C27803] text-xs md:text-[16px]'>{text}</h2>
        </div>
    )
}
