import React from 'react'
import { contactInfoType, passengerType, screenEnum, typePaymentType } from '..'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import TicketContactInfo from '../../../../../components/ticket/contact-info'
import PassengerDetails from '../../../../../components/ticket/passenger-details'
import PaymentMethod from '../../../../../components/ticket/payment-method'
import UseaDiscount from '../../../../../components/ticket/use-a-discount'
import Title from '../../../../../components/title'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useLanguage from '../../../../../stores/useLanguage'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'

type TicketPayScreenType = {
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null,
    handlePay: () => void,
    passengers: passengerType[]
    contactInfo: contactInfoType,
    setContactInfo: React.Dispatch<React.SetStateAction<contactInfoType>>,
    paymentType: typePaymentType,
    setPaymentType: (value: TicketPayScreenType["paymentType"]) => void
}

export default function TicketPayScreen({
    outboundTicket, returnTicket, handlePay, passengers, contactInfo, setContactInfo, paymentType, setPaymentType
}: TicketPayScreenType) {
    const { getItem } = useLanguage()

    useGrayBg()
    useScrollTop()

    return (
        <>
            <div className='container mx-auto flex gap-7 lg:gap-[60px] xl:gap-[120px]'>
                <div className='flex-1'>
                    <Title>
                        {getItem("Review")}
                    </Title>

                    <div className='flex flex-col gap-5'>
                        <PassengerDetails
                            passengers={passengers}
                        />

                        <TicketContactInfo
                            value={contactInfo}
                            onChange={setContactInfo}
                        />

                        <PaymentMethod
                            value={paymentType}
                            onChange={setPaymentType}
                        />

                        <UseaDiscount />
                    </div>
                </div>

                <ActiveTicketInfoForTicket
                    onContinue={handlePay}
                    returnTicket={returnTicket}
                    outboundTicket={outboundTicket}
                    fullDetails
                    buttonTitle="Pay_now"
                    passengers={passengers}
                />

            </div>
        </>
    )
}
