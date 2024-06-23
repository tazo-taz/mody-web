import React from 'react'
import { ticketChooseType } from '../../ticket/card/simple/type'

type ActiveOutboundType = {
  activeOutbound: ticketChooseType | null
}

export default function SeatPassengers({ activeOutbound }: ActiveOutboundType) {
  if (!activeOutbound || !("busSystem" in activeOutbound.metadata)) return null

  return (
    <div>SeatPassengers</div>
  )
}
