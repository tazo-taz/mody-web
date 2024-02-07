import React from 'react'
import Breadcrumbs from '../../../../../components/breadcrumbs'
import { contactInfoType, passengerType, screenEnum } from '..'
import useLanguage from '../../../../../stores/useLanguage'
import useGrayBg from '../../../../../hooks/useGrayBg'
import Title from '../../../../../components/title'
import ActiveTicketInfo from '../../../../../components/ticket/active-ticket-info'
import { ticketChooseType } from '../../../../../components/ticket/card'
import PassengerDetails from '../../../../../components/ticket/passenger-details'
import TicketContactInfo from '../../../../../components/ticket/contact-info'

type TicketPayScreenType = {
    setScreen: (newScreen: screenEnum) => void,
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null,
    handlePay: () => void,
    adultPassengers: passengerType[]
    childPassengers: passengerType[],
    contactInfo: contactInfoType,
    setContactInfo: React.Dispatch<React.SetStateAction<contactInfoType>>
}

export default function TicketPayScreen({
    setScreen, outboundTicket, returnTicket, handlePay, adultPassengers, childPassengers, contactInfo, setContactInfo
}: TicketPayScreenType) {
    const { getItem } = useLanguage()

    useGrayBg()
    return (
        <>
            <div className='shadow-md z-[1] relative bg-white'>
                <Breadcrumbs
                    className='h-[90px] container mx-auto'
                    data={[
                        { id: screenEnum.SEARCH, title: getItem("Search") },
                        { id: screenEnum.DETAILS, title: getItem("Passenger_details") },
                        { id: screenEnum.PAY, title: getItem("Review_and_pay") },
                    ]}
                    active={screenEnum.PAY}
                    choose={(screen) => {
                        if (screen === screenEnum.PAY) { }
                        else setScreen(screen)
                    }}
                />
            </div>

            <div className='container mx-auto flex gap-[120px]'>
                <div className='flex-1'>
                    <Title>
                        {getItem("Review")}
                    </Title>

                    <div className='flex flex-col gap-5'>
                        <PassengerDetails
                            adultPassengers={adultPassengers}
                            childPassengers={childPassengers}
                        />

                        <TicketContactInfo
                            value={contactInfo}
                            onChange={setContactInfo}
                        />
                    </div>
                </div>

                <div className='max-w-[500px] w-full px-5 flex max-h-[600px] items-center justify-center sticky top-5'>
                    <ActiveTicketInfo
                        outboundTicket={outboundTicket}
                        returnTicket={returnTicket}
                        onContinue={handlePay}
                        className='absolute top-5 left-1/2 -translate-x-1/2 z-[1] w-full max-w-[460px]'
                    />
                </div>

            </div>
        </>
    )
}
