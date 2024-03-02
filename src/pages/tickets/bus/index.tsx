import React from 'react'
import TicketHero from '../../../components/ticket/hero'
import Title from '../../../components/title'
import useLanguage from '../../../stores/useLanguage'
import PopularDestinations from '../../../components/ticket/popular-destinations'

export default function BusTicketsPage() {
    const { getItem } = useLanguage()
    return (
        <div className='pt-[50px]'>
            <TicketHero />
            <div className='container mx-auto mt-5'>
                <Title>{getItem("Popular_Destinations")}</Title>
                <PopularDestinations />
            </div>
        </div>
    )
}
