import { passengerType } from '..'
import WarningMessage from '../../../../../components/Messages/Warning'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import PassengerForm from '../../../../../components/ticket/passenger-form'
import Title from '../../../../../components/title'
import useTicketUsers from '../../../../../hooks/firebase/useTicketUsers'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import { getActiveTicketsApiType, getDiscountsFromActive } from '../../../../../lib/ticket'
import { objChange } from '../../../../../lib/utils'
import useLanguage from '../../../../../stores/useLanguage'
import { TicketApiEnum } from '../../../../../types/ticket'

type TicketDetailsScreenType = {
    detailsToReviewScreen: () => boolean
    activeOutbound: ticketChooseType | null
    activeReturn: ticketChooseType | null,
    passengers: passengerType[],
    setPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
}

export default function TicketDetailsScreen({
    activeOutbound,
    activeReturn,
    detailsToReviewScreen,
    passengers,
    setPassengers,
}: TicketDetailsScreenType) {
    const { getItem } = useLanguage()
    const { users } = useTicketUsers()

    useGrayBg()
    useScrollTop()

    const ticketApiType = getActiveTicketsApiType(activeOutbound, activeReturn)
    const discounts = getDiscountsFromActive(activeOutbound, activeReturn)

    const onChange = (index: number) => {
        return (key: keyof passengerType, value: any) => {
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
                            {...passengers[0]}
                            onChange={onChange(0)}
                            type={ticketApiType}
                            discounts={discounts}
                        />
                        {passengers.slice(1).map((item, inx) => (
                            <PassengerForm
                                users={users}
                                title={getItem("Passenger") + " " + (inx + 1)}
                                {...item}
                                onChange={onChange(inx + 1)}
                                required={ticketApiType === TicketApiEnum.BUS_SYSTEM}
                                key={inx}
                                type={ticketApiType}
                                discounts={discounts}
                            />
                        ))}
                        {/* {childPassengers.map((item, inx) => (
                            <PassengerForm
                                users={users}
                                title={getItem("Passenger") + " " + (passengers.length + inx)}
                                {...item}
                                onChange={onChange(inx, "child")}
                                key={inx}
                            />
                        ))} */}
                    </div>
                </div>
                <ActiveTicketInfoForTicket
                    outboundTicket={activeOutbound}
                    returnTicket={activeReturn}
                    onContinue={detailsToReviewScreen}
                    passengers={passengers}
                />
            </div>
        </>
    )
}
