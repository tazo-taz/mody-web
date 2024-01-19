import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import Counter from '../../counter';

type CounterFieldProps = {
    placeholder: string,
    secondaryPlaceholder: string,
    icon?: React.ReactNode,
    onChange: (item: number) => void,
    value: number,
    sort?: number
}

export default function CounterField({ placeholder, secondaryPlaceholder, icon, onChange, value, sort = 0 }: CounterFieldProps) {
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
            <div className='flex bg-gray-50 md:bg-gray-100 p-[14px] rounded-primary items-center'>
                {ownIcon}

                <div className='flex flex-col relative' ref={scope}>
                    <h2 className='text-gray-500 text-[13px] -translate-y-[10px]'>{placeholder}</h2>
                    <h3 className='absolute top-2 whitespace-nowrap'>{secondaryPlaceholder}</h3>
                </div>

                <Counter value={value} increase={onChange} decrease={onChange} />
            </div>
        </div>
    )
}
