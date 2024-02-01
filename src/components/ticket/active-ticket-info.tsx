import React from 'react'
import { cn } from '../../lib/utils'
import { ticketChooseType } from './card'
import TicketMiniCard from './mini-card'
import Button from '../fields/button'
import useLanguage from '../../stores/useLanguage'

type ActiveTicketInfoType = {
    className?: string,
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null
    onContinue: () => void
}

export default function ActiveTicketInfo({ className, outboundTicket, returnTicket, onContinue }: ActiveTicketInfoType) {
    const { getItem } = useLanguage()

    if (!outboundTicket && !returnTicket) return null

    return (
        <div className={cn(
            "p-5 bg-white rounded-primary flex flex-col",
            className
        )}>
            {outboundTicket && (
                <>
                    <TicketMiniCard
                        {...outboundTicket}
                        type='outbound'
                    />
                    <div className='border-b-1 my-4' />
                </>
            )}
            {returnTicket && (
                <>
                    <TicketMiniCard
                        {...returnTicket}
                        type='return'
                    />
                    <div className='border-b-1 my-4' />
                </>
            )}

            <Button
                className='justify-between'
                onClick={onContinue}
            >
                {getItem("Continue")}
                <span>55.00 ₾</span>
            </Button>
        </div>
    )
}
