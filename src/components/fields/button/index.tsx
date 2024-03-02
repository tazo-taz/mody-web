import React from 'react'
import { cn } from '../../../lib/utils'

type variantType = "primary" | "secondary" | "outline" | "dark" | "danger"

type sizeType = "lg" | "sm" | "icon"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: variantType,
    size?: sizeType,
    icon?: React.ReactNode,
    fullrounded?: boolean
}

export default function Button({ fullrounded, className, size = "lg", variant = "primary", disabled, icon, children, ...props }: ButtonProps) {
    return (
        <button className={cn(
            "flex items-center justify-center transition",
            size === "icon" && "w-12 h-12",
            size === "lg" && "px-[18px] h-12 font-semibold",
            size === "sm" && "px-[18px] py-[11px] text-sm",
            variant === "primary" && "bg-primary text-white",
            variant === "secondary" && "bg-[#F3F4F6] rounded-full text-[#111928]",
            variant === "outline" && "bg-white border-1 border-[#111928] text-[#111928] hover:bg-[#111928] hover:text-white",
            variant === "dark" && "bg-[#111928] text-white",
            variant === "danger" && "bg-red-700 text-white",
            !disabled && "active:scale-95 hover:opacity-90",
            disabled && "cursor-auto",
            fullrounded ? "rounded-full" : "rounded-primary",
            className
        )} {...props}>
            {icon && (
                <div className='w-[30px]'>{icon}</div>
            )}
            {children}
        </button>
    )
}
