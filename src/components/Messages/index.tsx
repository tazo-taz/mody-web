import React from 'react'
import { cn } from '../../lib/utils'

export type MessageProps = {
  icon?: React.ReactNode,
  text: string,
  className?: string,
  textClassName?: string,
  size?: "md" | "sm"
}

export default function Message({ icon, text, className, textClassName, size = "md" }: MessageProps) {
  return (
    <div className={cn(
      'flex items-center',
      size === "md" && 'px-3 py-2 rounded-primary',
      size === "sm" && 'p-1.5 rounded-[4px]',
      className
    )}>
      {icon && (
        <div className={cn(
          size === "md" && 'w-[30px] text-xl',
          size === "sm" && 'w-[24px]',
        )}>
          {icon}
        </div>
      )}

      <h2 className={cn(
        size === "md" && 'text-xs md:text-[16px]',
        size === "sm" && "text-[11px]"
        , textClassName)}>{text}</h2>
    </div>
  )
}
