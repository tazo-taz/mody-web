import React from 'react'
import MinusCircle from '../assets/images/svgs/icons/minus-circle'
import PlusCircle from '../assets/images/svgs/icons/plus-circle'

type counterProps = {
    decrease: (value: number) => void,
    increase: (value: number) => void,
    value: number,
}

export default function Counter({ decrease, increase, value }: counterProps) {
    return (
        <div className='ml-auto flex gap-2 items-center'>
            <div className='cursor-pointer' onClick={() => value > 0 && decrease(value - 1)}>
                <MinusCircle />
            </div>
            <h2 className='w-5 text-center'>
                {value}
            </h2>
            <div className='cursor-pointer' onClick={() => increase(value + 1)}>
                <PlusCircle />
            </div>
        </div>
    )
}
