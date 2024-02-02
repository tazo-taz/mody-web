import React from 'react'

type CardType = {
    title: React.ReactNode,
    secondaryTitle?: React.ReactNode,
    endTitle?: React.ReactNode,
    children: React.ReactNode
}

export default function Card({ title, endTitle, children, secondaryTitle }: CardType) {
    return (
        <div className='border-1 rounded-primary bg-white shadow-sm'>
            <div className='p-[25px] border-b-1 flex justify-between items-center'>
                <div className='flex flex-col'>
                    <h2 className='font-semibold'>{title}</h2>
                    <h3 className='text-sm text-[#6B7280]'>{secondaryTitle}</h3>
                </div>
                <h5 className='text-xs text-[#6B7280]'>{endTitle}</h5>
            </div>

            <div className='p-[25px]'>
                {children}
            </div>
        </div>
    )
}
