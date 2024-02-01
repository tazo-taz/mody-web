import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
    return (
        <div className='pt-10 mb-5'>
            <h2 className='text-xl font-bold'>{children}</h2>
        </div>
    )
}
