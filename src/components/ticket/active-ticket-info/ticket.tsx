import React from 'react'
import ActiveTicketInfo, { ActiveTicketInfoType } from '.'
import tbilisBatumiSrc from "../../../assets/images/maps/tbilisi-batumi.png";

export default function ActiveTicketInfoForTicket({ onContinue, outboundTicket, returnTicket }: ActiveTicketInfoType) {
    return (
        <div className='h-[655px] max-w-[500px] px-5 bg-[#F3F4F6] border-[#E5E7EB] border-1 md:flex hidden items-center justify-center sticky top-5'>
            <img src={tbilisBatumiSrc} alt='map' className='w-full' />
            <ActiveTicketInfo
                className='absolute top-5 left-1/2 -translate-x-1/2 z-[1] w-full max-w-[460px]'
                outboundTicket={outboundTicket}
                returnTicket={returnTicket}
                onContinue={onContinue}
            />
        </div>
    )
}
