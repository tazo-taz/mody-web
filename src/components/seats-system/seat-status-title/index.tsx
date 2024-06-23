import React from 'react'

type SeatStatusTitleType = {
  title: string
  color: string
}

export default function SeatStatusTitle({ title, color }: SeatStatusTitleType) {
  return (
    <div className='flex justify-center items-center gap-2'>
      <span
        className='w-2 h-2 rounded-full'
        style={{
          backgroundColor: color,
        }}
      />
      <span className='text-[#6B7280] text-xs'>{title}</span>
    </div>
  )
}
