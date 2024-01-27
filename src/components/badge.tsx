import React from 'react'
import { cn } from '../lib/utils'

type variantType = "primary" | "secondary"
type sizeType = "lg" | "sm"

type badgeProps = {
    children: React.ReactNode,
    variant?: variantType,
    size?: sizeType,
    className?: string
}

export default function Badge({ children, variant = "primary", size = "lg", className }: badgeProps) {
    return (
        <div className={cn(
            'rounded-primary flex items-center justify-center gap-1',
            variant === "secondary" && "bg-gray-100",
            variant === "primary" && "bg-primary text-white",
            size === "lg" && "px-4 py-2",
            size === "sm" && "px-3 py-1.5 text-xs",
            className
        )}>{children}</div>
    )
}
