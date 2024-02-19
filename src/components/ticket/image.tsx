import React from 'react'
import ticketImg from "../../assets/images/tickets.png"
import { FaCheck } from 'react-icons/fa'

type TicketImageProps = {
    type?: "success"
}

export default function TicketImage({ type }: TicketImageProps) {
    const checkElement = (
        <div className='p-2 bg-[#0E9F6E] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3'>
            <FaCheck size={20} color='white' />
        </div>
    )
    return (
        <div>
            <div className='relative inline-block'>
                <div className='w-[90%] aspect-square bg-slate-100/85 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                <img src={ticketImg} alt='ticket' className='max-w-[149px] max-h-[144px] w-full h-full relative' />

                {type === "success" && checkElement}

                {/* left */}
                <div className='w-1.5 aspect-square bg-slate-100/85 absolute top-9 -left-3 rounded-full' />
                <div className='w-3 aspect-square bg-slate-100/85 absolute bottom-5 -left-2 rounded-full' />

                {/* right */}
                <div className='w-1.5 aspect-square bg-slate-100/85 absolute top-3 -right-2 rounded-full' />
                <div className='w-3 aspect-square bg-slate-100/85 absolute top-9 -right-1.5 rounded-full' />
            </div>
        </div>
    )
}
