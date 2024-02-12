import React from 'react'
import useMyTickets from '../../../hooks/firebase/useMyTickets'
import useLanguage from '../../../stores/useLanguage';
import TicketCard from '../../../components/ticket/card/card';
import MyTicketCard from '../../../components/ticket/card/myCard';

export default function MyTicketsPage() {
    const { tickets, isLoading } = useMyTickets()
    const { getItem } = useLanguage()

    if (isLoading) {
        return null
    }

    return (
        <div>
            {tickets.map((ticket, inx) => (
                <MyTicketCard
                    {...ticket}
                    key={inx}
                />
            ))}
        </div>
    )
}
