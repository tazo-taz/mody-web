import React from 'react'
import { FiUser } from 'react-icons/fi'
import useLanguage from '../../../stores/useLanguage'
import { FaRegTrashAlt } from 'react-icons/fa'
import { cn } from '../../../lib/utils'

type SeatPassengerType = {
  seat?: string,
  index: number,
  firstAvaibleSeatIndex: number,
  handleDelete: () => void
}

export default function SeatPassenger({
  seat,
  index,
  firstAvaibleSeatIndex,
  handleDelete
}: SeatPassengerType) {
  const { getItem, language } = useLanguage()

  const isSeatChoosing = firstAvaibleSeatIndex === index
  if (seat === undefined) return (
    <div className='flex gap-4 items-center h-10'>
      <span className={cn('w-[38px] transition h-[38px] rounded-full border-1 bg-[#F3F4F6] flex items-center justify-center',
        isSeatChoosing ? "border-[#0E9F6E]" : "border-[#E5E7EB]"
      )}>
        <FiUser size={20} color={isSeatChoosing ? "#0E9F6E" : '#6B7280'} />
      </span>
      <div className='flex flex-col justify-center'>
        <span className={cn('text-sm font-medium', isSeatChoosing ? "text-[#0E9F6E]" : "text-[#6B7280]")}>
          {getItem("Select_seats_for")} {" "}
          {getItem("Passenger").toLowerCase()} {index + 1} {language === "ge" && " სთვის"}
        </span>
      </div>
    </div>
  )

  return (
    <div className='flex gap-4 items-center h-10'>
      <span className='w-[38px] h-[38px] rounded-full border-1 border-[#E5E7EB] bg-[#F3F4F6] flex items-center justify-center'>
        <FiUser size={20} color='black' />
      </span>
      <div className='flex flex-col gap-1 justify-center'>
        <span className='text-sm text-black font-medium'>
          {getItem("Passenger")} {index + 1}
        </span>
        <span className='text-xs text-[#6B7280]'>
          {getItem("Storey")} 1, {getItem("Seat")} {seat}
        </span>
      </div>
      <FaRegTrashAlt
        onClick={handleDelete}
        color="#E02424"
        className='ml-auto cursor-pointer'
        size={18}
      />
    </div>
  )
}
