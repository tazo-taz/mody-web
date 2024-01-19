import React from 'react'

type badgeProps = {
    title: string
}

export default function Badge({ title }: badgeProps) {
    return (
        <div className='bg-gray-100 p-2 rounded-primary'>{title}</div>
    )
}
