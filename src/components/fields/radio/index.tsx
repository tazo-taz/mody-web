import React from 'react'
import { cn } from '../../../lib/utils'

type RadioProps<T> = {
    items: ({ icon: React.ReactNode, title: string, value: T } | null)[],
    value: T,
    onChange: (value: T) => void
}

export default function Radio<T>({ items, onChange, value }: RadioProps<T>) {
    const isActive = (val: T) => val === value
    return (
        <div className='flex flex-col gap-4'>
            {items.map((item, inx) => {
                if (!item) return null
                const { icon, title, value } = item
                return (
                    <div
                        className={cn('py-4 px-6 border-1 rounded-primary flex items-center gap-1 cursor-pointer', isActive(value) && "border-primary")}
                        onClick={() => onChange(value)}
                        key={inx}
                    >
                        <div className='w-[30px]'>{icon}</div>
                        <h3 className='font-medium'>{title}</h3>

                        {isActive(value) ?
                            <div className='w-[18px] aspect-square rounded-full border-2 border-primary ml-auto flex items-center justify-center'>
                                <div className='w-2 aspect-square bg-primary rounded-full' />
                            </div> :
                            <div className='w-[18px] aspect-square rounded-full border-2 border-[#E5E7EB] ml-auto'></div>
                        }
                    </div>
                )
            })}
        </div>
    )
}
