import { passengerType, screenEnum } from '..'
import WarningMessage from '../../../../../components/Messages/Warning'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import PassengerForm from '../../../../../components/ticket/passenger-form'
import Title from '../../../../../components/title'
import useTicketUsers from '../../../../../hooks/firebase/useTicketUsers'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import { objChange } from '../../../../../lib/utils'
import useLanguage from '../../../../../stores/useLanguage'

type TicketDetailsScreenType = {
    setScreen: (screen: screenEnum) => void
    detailsToReviewScreen: () => boolean
    activeOutbound: ticketChooseType | null
    activeReturn: ticketChooseType | null,
    adultPassengers: passengerType[],
    childPassengers: passengerType[],
    setChildPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
    setAdultPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
}

export default function TicketDetailsScreen({
    setScreen,
    activeOutbound,
    activeReturn,
    detailsToReviewScreen,
    adultPassengers,
    childPassengers,
    setAdultPassengers,
    setChildPassengers
}: TicketDetailsScreenType) {
    const { getItem } = useLanguage()
    const { users } = useTicketUsers()

    useGrayBg()
    useScrollTop()

    const onChange = (index: number, type: "child" | "adult") => {
        return (key: keyof passengerType, value: any) => {
            const setPassengers = type === "adult" ? setAdultPassengers : setChildPassengers
            setPassengers(passengers => {
                const newArr = structuredClone(passengers)
                newArr[index] = objChange(newArr[index], key, value)
                return newArr
            })
        }
    }

    return (
        <>
            <div className='container mx-auto flex gap-7 lg:gap-[60px] xl:gap-[120px]'>
                <div className='flex-1'>
                    <Title>
                        {getItem("Passenger_details")}
                    </Title>

                    <div className='flex flex-col gap-[25px]'>
                        <WarningMessage text={getItem("You_must_present_valid_identification_national_ID_card_passport_or_BahnCard__during_the_ticket_inspection")} />
                        <PassengerForm
                            users={users}
                            title={getItem("Main_Passanger")}
                            required
                            isAdult
                            {...adultPassengers[0]}
                            onChange={onChange(0, "adult")}
                        />
                        {adultPassengers.slice(1).map((item, inx) => (
                            <PassengerForm
                                users={users}
                                title={getItem("Passenger") + " " + (inx + 1)}
                                isAdult
                                {...item}
                                onChange={onChange(inx + 1, "adult")}
                                key={inx}
                            />
                        ))}
                        {childPassengers.map((item, inx) => (
                            <PassengerForm
                                users={users}
                                title={getItem("Passenger") + " " + (adultPassengers.length + inx)}
                                {...item}
                                onChange={onChange(inx, "child")}
                                key={inx}
                            />
                        ))}
                    </div>
                </div>
                <ActiveTicketInfoForTicket
                    outboundTicket={activeOutbound}
                    returnTicket={activeReturn}
                    onContinue={detailsToReviewScreen}
                />
            </div>
        </>
    )
}
