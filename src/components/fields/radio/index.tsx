import React from 'react'

type RadioProps = {
    items: { icon: React.ReactNode, title: string, value: string }[],
    value: string | number,
    onChange: (value: RadioProps["value"]) => void
}

export default function Radio({ items, onChange, value }: RadioProps) {
    const isActive = (val: RadioProps["value"]) => val === value
    return (
        <div className='flex flex-col gap-4'>
            {items.map(({ icon, title, value }) => (
                <div
                    className='py-4 px-6 border-1 rounded-primary flex items-center gap-1 cursor-pointer'
                    onClick={() => onChange(value)}
                    key={value}
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
