import React from 'react'
import ChevronRight from '../../../assets/images/svgs/icons/chevron/chevron-right'

type mobileMenuItemType = {
    id: number,
    title: string,
    icon: React.ReactNode,
    endContent?: React.ReactNode,
    onClick: (id: number) => void
}

export default function MobileMenuItem({ title, icon, endContent, onClick, id }: mobileMenuItemType) {
    return (
        <div className='flex items-center py-[22px] border-b-1 cursor-pointer' onClick={() => onClick(id)}>
            <div className='w-[30px]'>
                {icon}
            </div>
            <h3 className='font-medium'>{title}</h3>

            <div className='ml-auto'>
                {endContent || <ChevronRight />}
            </div>
        </div>
    )
}
