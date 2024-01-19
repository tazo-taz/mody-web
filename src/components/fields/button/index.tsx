import React from 'react'
import { cn } from '../../../lib/utils'

type variantType = "primary" | "secondary"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: boolean,
    variant?: variantType
}

export default function Button({ className, icon, variant = "primary", ...props }: ButtonProps) {
    return (
        <button className={cn(
            "h-12 rounded-primary flex items-center justify-center transition active:scale-95 hover:opacity-90",
            icon ? "w-12" : "px-[18px]",
            variant === "primary" && "bg-primary text-white",
            variant === "secondary" && "bg-gray-100 text-primary",
            className
        )} {...props}></button>
    )
}
