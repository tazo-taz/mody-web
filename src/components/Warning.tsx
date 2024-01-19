import React from 'react'

type warningProps = {
    icon: React.ReactNode,
    text: string
}

export default function Warning({ icon, text }: warningProps) {
    return (
        <div className='p-[10px] bg-yellow-50 flex items-center rounded-primary'>
            <div className='w-[30px]'>
                {icon}
            </div>

            <h2 className='text-[#C27803]'>{text}</h2>
        </div>
    )
}
