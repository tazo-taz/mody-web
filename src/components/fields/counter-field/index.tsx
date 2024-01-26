import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import Counter from '../../counter';
import { cn } from '../../../lib/utils';

type CounterFieldProps = {
    placeholder: string,
    secondaryPlaceholder: string,
    icon?: React.ReactNode,
    onChange: (item: number) => void,
    value: number,
    sort?: number,
    minified?: boolean
    className?: string,
    min?: number
}

export default function CounterField({ placeholder, secondaryPlaceholder, className, icon, onChange, value, sort = 0, minified = false, min }: CounterFieldProps) {
    const [scope, animate] = useAnimate()

    const ownIcon = (
        <div className='w-[30px]'>
            {icon}
        </div>
    )

    useEffect(() => {
        animate("h2", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
        animate("h3", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
    }, [animate, scope, sort])


    return (
        <div className='relative'>
            <div className={cn('flex border-1 bg-gray-50 md:bg-gray-100 p-[14px] rounded-primary items-center h-full', minified && "pl-[14px] pr-2 py-0", className)}>
                {ownIcon}

                <div className='flex flex-col relative' ref={scope}>
                    <h2 className='text-gray-500 text-[13px] -translate-y-[10px]'>{placeholder}</h2>
                    <h3 className='absolute top-2 whitespace-nowrap'>{secondaryPlaceholder}</h3>
                </div>

                <Counter
                    value={value}
                    increase={onChange}
                    decrease={onChange}
                    minified={minified}
                    min={min}
                />
            </div>
        </div>
    )
}
