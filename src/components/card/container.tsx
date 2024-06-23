import React from 'react'

type CardType = {
  header: React.ReactNode,
  children: React.ReactNode
}

export default function CardContainer({ children, header }: CardType) {
  return (
    <div className='border-1 rounded-primary bg-white shadow-sm'>
      <div className='p-[25px] border-b-1 flex justify-between items-center'>
        {header}
      </div>

      <div className='p-[25px]'>
        {children}
      </div>
    </div>
  )
}
