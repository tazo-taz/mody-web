import React from 'react'
import Slider from './slider'

export default function HomePage() {
    return (
        <div className='flex container mx-auto mt-[50px]'>
            <div className='flex flex-col flex-1 gap-6 pr-14 border-r-1 border-gray-200'>
                <Slider />
            </div>
            <div className='flex-1 pl-14'>
                hello
            </div>
        </div>
    )
}
