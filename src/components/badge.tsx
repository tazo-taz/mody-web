import React from 'react'
import { cn } from '../lib/utils'

type variantType = "primary" | "secondary"
type sizeType = "lg" | "sm"

type badgeProps = {
    title: string,
    variant?: variantType,
    size?: sizeType,
    className?: string
}

export default function Badge({ title, variant = "primary", size = "lg", className }: badgeProps) {
    return (
        <div className={cn(
            'rounded-primary',
            variant === "secondary" && "bg-gray-100",
            variant === "primary" && "bg-primary text-white",
            size === "lg" && "px-3 py-2",
            size === "sm" && "px-2.5 py-1 text-sm",
            className
        )}>{title}</div>
    )
}
