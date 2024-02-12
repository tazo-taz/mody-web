import React from 'react'

type RadioProps<T> = {
    items: { icon: React.ReactNode, title: string, value: T }[],
    value: T,
    onChange: (value: T) => void
}

export default function Radio<T>({ items, onChange, value }: RadioProps<T>) {
    const isActive = (val: T) => val === value
    return (
        <div className='flex flex-col gap-4'>
            {items.map(({ icon, title, value }, inx) => (
                <div
                    className='py-4 px-6 border-1 rounded-primary flex items-center gap-1 cursor-pointer'
                    onClick={() => onChange(value)}
                    key={inx}
                >
                    <div className='w-[30px]'>{icon}</div>
                    <h3 className='font-medium'>{title}</h3>

                    {isActive(value) ?
                        <div className='w-[18px] aspect-square rounded-full border-2 border-primary ml-auto flex items-center justify-center'>
                            <div className='w-2 aspect-square bg-primary rounded-full'></div>
                        </div> :
                        <div className='w-[18px] aspect-square rounded-full border-2 border-[#E5E7EB] ml-auto'></div>
                    }
                </div>
            ))}
        </div>
    )
}
