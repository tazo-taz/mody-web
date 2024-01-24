import React from 'react'
import { itemType } from '.'
import { Link } from 'react-router-dom'

export default function Item({ icon, title, ...item }: itemType) {
    const content = (
        <>
            <div className='w-[30px]'>
                {icon}
            </div>
            <h2 className='text-sm'>{title}</h2>
        </>
    )

    let container = null
    const containerClassnames = 'flex px-3.5 py-3 items-center cursor-pointer hover:bg-gray-50 transition rounded-primary'

    if ("href" in item) {
        container = (
            <Link to={item.href} className={containerClassnames}>{content}</Link>
        )
    } else {
        container = (
            <div onClick={item.onClick} className={containerClassnames}>{content}</div>
        )
    }

    return container
}
