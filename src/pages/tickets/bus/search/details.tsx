import { passengerType, screenEnum } from '.'
import WarningMessage from '../../../../components/Messages/Warning'
import Breadcrumbs from '../../../../components/breadcrumbs'
import ActiveTicketInfo from '../../../../components/ticket/active-ticket-info'
import { ticketChooseType } from '../../../../components/ticket/card'
import PassengerForm from '../../../../components/ticket/passenger-form'
import Title from '../../../../components/title'
import useGrayBg from '../../../../hooks/useGrayBg'
import useLanguage from '../../../../stores/useLanguage'

type TicketDetailsScreenType = {
    setScreen: (screen: screenEnum) => void
    detailsToReviewScreen: () => void
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null,
    adultPassengers: passengerType[],
    childPassengers: passengerType[],
}

export default function TicketDetailsScreen({ setScreen, outboundTicket, returnTicket, detailsToReviewScreen, adultPassengers, childPassengers }: TicketDetailsScreenType) {
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
                    active={screenEnum.DETAILS}
                    choose={(screen) => {
                        if (screen === screenEnum.PAY) { }
                        else setScreen(screen)
                    }}
                />
            </div>

            <div className=''>
                <div className='container mx-auto flex gap-[120px]'>
                    <div className='flex-1'>
                        <Title>
                            {getItem("Passenger_details")}
                        </Title>

                        <div className='flex flex-col gap-[25px]'>
                            <WarningMessage text={getItem("You_must_present_valid_identification_national_ID_card_passport_or_BahnCard__during_the_ticket_inspection")} />
                            <PassengerForm
                                title={getItem("Main_Passanger")}
                                required
                                isAdult
                                {...adultPassengers[0]}
                                onChange={(key, value) => {

                                }}
                            />
                            {adultPassengers.slice(1).map((item, inx) => (
                                <PassengerForm
                                    title={getItem("Passenger") + " " + (inx + 1)}
                                    isAdult
                                    {...item}
                                    onChange={(key, value) => {

                                    }}
                                    key={inx}
                                />
                            ))}
                            {childPassengers.map((item, inx) => (
                                <PassengerForm
                                    title={getItem("Passenger") + " " + (adultPassengers.length + inx + 1)}
                                    {...item}
                                    onChange={(key, value) => {

                                    }}
                                    key={inx}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='max-w-[500px] w-full px-5 flex max-h-[600px] items-center justify-center sticky top-5'>
                        <ActiveTicketInfo
                            outboundTicket={outboundTicket}
                            returnTicket={returnTicket}
                            onContinue={detailsToReviewScreen}
                            className='absolute top-5 left-1/2 -translate-x-1/2 z-[1] w-full max-w-[460px]'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
