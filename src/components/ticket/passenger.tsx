import React from 'react'
import { passengerType } from '../../pages/tickets/bus/search'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import useLanguage from '../../stores/useLanguage'
import { cn } from '../../lib/utils'

type PassengerType = {
    isAdult?: boolean
    bottomBorder?: boolean
} & passengerType

export default function Passenger({ firstName, lastName, userId, isAdult, bottomBorder }: PassengerType) {
    const { getItem } = useLanguage()
    return (
        <div className={cn('flex gap-3 items-center', bottomBorder && "border-b-1 pb-4")}>
            <div className='bg-[#F3F4F6] rounded-full p-2'>
                <UserIcon />
            </div>

            <div className='flex flex-col'>
                <h2 className='font-medium'>{firstName} {lastName} ({userId})</h2>
                <p className='text-xs text-[#6B7280]'>{getItem("Bus_ticket")}</p>
            </div>

            <h4 className='ml-auto text-[#6B7280] text-xs'>{getItem(isAdult ? "Adult" : "Child")}</h4>
        </div>
    )
}
