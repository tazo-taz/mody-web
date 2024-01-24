import React from 'react'
import { cn } from '../../../lib/utils'

type variantType = "primary" | "secondary"

type sizeType = "lg" | "sm" | "icon"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: variantType,
    size?: sizeType
}

export default function Button({ className, size = "lg", variant = "primary", disabled, ...props }: ButtonProps) {
    return (
        <button className={cn(
            "rounded-primary flex items-center justify-center transition",
            size === "icon" && "w-12 h-12",
            size === "lg" && "px-[18px] h-12 font-semibold",
            size === "sm" && "px-[18px] py-[11px] text-sm",
            variant === "primary" && "bg-primary text-white",
            variant === "secondary" && "bg-[#F3F4F6] text-[#111928]",
            !disabled && "active:scale-95 hover:opacity-90",
            disabled && "cursor-auto",
            className
        )} {...props}></button>
    )
}
