import React from 'react'
import Button from '../fields/button'
import { Link } from 'react-router-dom'

type MyLinkType = {
    icon: React.ReactNode,
    children: React.ReactNode,
    href: string
    className?: string
}

export default function MyLink({ icon, children, href, className }: MyLinkType) {
    return (
        <Link to={href} className={className}>
            <Button icon={icon} variant='secondary' className='font-medium px-[18px]'>{children}</Button>
        </Link>
    )
}
