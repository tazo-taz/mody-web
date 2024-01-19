import React from 'react'

type mobileMenuItemType = {
    id: number,
    title: string,
    icon: React.ReactNode,
    endContent?: React.ReactNode,
    onClick: (id: number) => void
}

export default function MobileMenuItem({ title, icon, endContent, onClick, id }: mobileMenuItemType) {
    return (
        <div className='flex items-center py-[22px] border-b-1' onClick={() => onClick(id)}>
            <div className='w-[30px]'>
                {icon}
            </div>
            <h3 className='font-medium'>{title}</h3>

            <div className='ml-auto'>
                {endContent}
            </div>
        </div>
    )
}
