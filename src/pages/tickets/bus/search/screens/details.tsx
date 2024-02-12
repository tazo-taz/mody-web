import { passengerType, screenEnum } from '..'
import WarningMessage from '../../../../../components/Messages/Warning'
import Breadcrumbs from '../../../../../components/breadcrumbs'
import ActiveTicketInfo from '../../../../../components/ticket/active-ticket-info'
import { ticketChooseType } from '../../../../../components/ticket/card/card'
import PassengerForm from '../../../../../components/ticket/passenger-form'
import Title from '../../../../../components/title'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import { objChange } from '../../../../../lib/utils'
import useLanguage from '../../../../../stores/useLanguage'

type TicketDetailsScreenType = {
    setScreen: (screen: screenEnum) => void
    detailsToReviewScreen: () => boolean
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null,
    adultPassengers: passengerType[],
    childPassengers: passengerType[],
    setChildPassengers: (arr: passengerType[]) => void,
    setAdultPassengers: (arr: passengerType[]) => void,
}

export default function TicketDetailsScreen({
    setScreen,
    outboundTicket,
    returnTicket,
    detailsToReviewScreen,
    adultPassengers,
    childPassengers,
    setAdultPassengers,
    setChildPassengers
}: TicketDetailsScreenType) {
    const { getItem } = useLanguage()

    useGrayBg()
    useScrollTop()

    const onChange = (index: number, type: "child" | "adult") => {
        return (key: keyof passengerType, value: any) => {
            const passengers = type === "adult" ? adultPassengers : childPassengers
            const setPassengers = type === "adult" ? setAdultPassengers : setChildPassengers
            const newArr = structuredClone(passengers)
            newArr[index] = objChange(newArr[index], key, value)
            setPassengers(newArr)
        }
    }

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
                        if (screen === screenEnum.PAY) {
                            if (detailsToReviewScreen()) setScreen(screen)
                        }
                        else setScreen(screen)
                    }}
                />
            </div>

            <>
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
                                onChange={onChange(0, "adult")}
                            />
                            {adultPassengers.slice(1).map((item, inx) => (
                                <PassengerForm
                                    title={getItem("Passenger") + " " + (inx + 1)}
                                    isAdult
                                    {...item}
                                    onChange={onChange(inx + 1, "adult")}
                                    key={inx}
                                />
                            ))}
                            {childPassengers.map((item, inx) => (
                                <PassengerForm
                                    title={getItem("Passenger") + " " + (adultPassengers.length + inx)}
                                    {...item}
                                    onChange={onChange(inx, "child")}
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
            </>
        </>
    )
}
