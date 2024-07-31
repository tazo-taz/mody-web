import React from 'react'
import ChevronRight from '../../assets/images/svgs/icons/chevron/chevron-right'
import useQuery from '../../hooks/useQuery'
import { getCityNameByValue, parseTicketQuery } from '../../lib/ticket'
import { minifyDate } from '../../lib/date'
import useLanguage from '../../stores/useLanguage'
import { cn } from '../../lib/utils'

type TicketHeaderTitleProps = {
  departureDate?: Date,
  className?: string
}

export default function TicketHeaderTitle({ departureDate, className }: TicketHeaderTitleProps) {
  const query = useQuery()
  const { getItem } = useLanguage()
  let { cityFrom, cityTo, passenger, child } = parseTicketQuery(query)
  const passengerAmount = child + passenger


  const cityFromName = getCityNameByValue(cityFrom)
  const cityToName = getCityNameByValue(cityTo)
  return (
    <div className={cn('flex-col gap-1 flex items-center justify-center', className)}>
      <div className='font-semibold gap-1 whitespace-nowrap flex justify-center items-center'>
        <div>{cityFromName}</div>
        <div>
          <ChevronRight />
        </div>
        <div>{cityToName}</div>
      </div>
      <span className='text-xs text-[#6B7280]'>{minifyDate(departureDate)}, {passengerAmount} {getItem(passengerAmount > 1 ? "Passengers" : "Passenger")}</span>
    </div>
  )
}
