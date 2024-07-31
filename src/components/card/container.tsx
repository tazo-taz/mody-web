import React from 'react'
import { cn } from '../../lib/utils'

type CardType = {
  header: React.ReactNode,
  children: React.ReactNode,
  contentClassName?: string
}

export default function CardContainer({ children, header, contentClassName }: CardType) {
  return (
    <div className='border-1 rounded-primary bg-white shadow-sm'>
      <div className='p-[25px] border-b-1 flex justify-between items-center'>
        {header}
      </div>

      <div className={cn('p-[25px]', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
