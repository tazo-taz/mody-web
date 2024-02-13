import React from 'react'
import { cn } from '../../lib/utils'

export default function AccountTitle({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h1 className={cn('text-2xl font-bold', className)}>{children}</h1>
    )
}
