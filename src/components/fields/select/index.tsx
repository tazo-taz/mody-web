import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import XCircleIcon from '../../../assets/images/svgs/icons/x-circle';
import useOpen from '../../../hooks/useOpen';
import { cn } from '../../../lib/utils';

type SelectProps = {
    placeholder: string,
    icon?: React.ReactNode,
    items: { value: string, title: string }[],
    onChange: (item?: string) => void,
    value?: string,
    sort?: number
}

export default function Select({ placeholder, icon, items, onChange, value, sort = 1 }: SelectProps) {
    const { isOpen, open, close } = useOpen(false)
    const [scope, animate] = useAnimate()

    const ownIcon = (
        <div className='w-[30px]'>
            {icon}
        </div>
    )

    const ownOnChange = (item: string) => {
        onChange(item)
        animate("h2", { y: -10, x: -3.5, scale: 0.8 })
        close()
    }

    const cancel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        onChange()
        animate("h2", { y: 0, x: 0, scale: 1 })
    }

    const valueText = items.find((item) => item.value === value)?.title

    useEffect(() => {
        animate("h2", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
        if (value) {
            animate("h2", { y: -10, x: -3.5, scale: 0.8 })
            animate("h1", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
        }

    }, [animate, scope, sort, value])

    return (
        <div className='relative'>
            <div className='flex border-1 bg-gray-50 md:bg-gray-100 p-[14px] rounded-primary items-center' onClick={open}>
                {ownIcon}

                <div ref={scope} className='flex flex-col relative'>
                    <h2 className='text-gray-500'>{placeholder}</h2>
                    <h1 className='absolute top-2 left-0'>{valueText}</h1>
                </div>

                {value && (
                    <div className='ml-auto cursor-pointer' onClick={cancel}>
                        <XCircleIcon />
                    </div>
                )}
            </div>

            {isOpen && (
                <>
                    <div className='fixed inset-0 z-10' onClick={close} />

                    <div className='flex flex-col rounded-primary border-1 absolute top-[110%] left-0 w-full bg-white overflow-hidden z-10 shadow-md'>
                        {items.map((item, inx) => (
                            <div
                                key={item.value}
                                className={cn('flex items-center p-[14px] hover:bg-gray-100 transition cursor-pointer', inx + 1 !== items.length && "border-b-1")}
                                onClick={() => ownOnChange(item.value)}
                            >{ownIcon} {item.title}</div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
