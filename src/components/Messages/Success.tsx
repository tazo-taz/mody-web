import React from 'react'
import WarningIcon from '../../assets/images/svgs/icons/warning'
import { cn } from '../../lib/utils'

type warningProps = {
    icon?: React.ReactNode,
    text: string,
    className?: string,
}

export default function SuccessMessage({ icon = <WarningIcon />, text, className }: warningProps) {
    return (
        <div className={cn('p-2 bg-[#F3FAF7] flex items-center rounded-[4px]', className)}>
            <h2 className='text-[#0E9F6E] text-xs'>{text}</h2>
        </div>
    )
}
