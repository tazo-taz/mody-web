import React from 'react'

type VerificationInputType = {
    count: number,
    value: string,
    setValue: (value: string) => void
}

export default function VerificationInput({ count, value, setValue }: VerificationInputType) {
    return (
        <div className='flex gap-3 flex-wrap relative'>
            <input value={value} onChange={e => {
                const { value } = e.target
                value.length <= count && setValue(value)
            }} className='absolute inset-0 focus-within:outline-none z-[1] bg-transparent opacity-0' />
            {[...new Array(count)].map((item, inx) => (
                <div key={inx} className='w-[45px] aspect-square bg-gray-100 rounded-primary relative flex items-center justify-center text-black'>{value[inx]}</div>
            ))}
        </div>
    )
}
