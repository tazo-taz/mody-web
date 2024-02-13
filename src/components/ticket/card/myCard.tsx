
import busImg from "../../assets/images/georgiabusapi.png"
import UserSmIcon from '../../../assets/images/svgs/icons/user/user-sm'
import { timeFromTo } from '../../../lib/date'
import { busDirectionType, getBusDirection, getBusDirectionByCities, ticketNameToCities } from '../../../lib/ticket'
import { cn } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'
import SuccessMessage from '../../Messages/Success'
import { ticketSchemaType } from "../../../schemas/ticket"
import TicketCard from "."

type MyTicketCardProps = ticketSchemaType & {
    onChoose?: (data: ticketSchemaType) => void,
}

export const TimeDiff = ({ timeDiff }: { timeDiff: number }) => {
    const minsDiff = String((timeDiff % 1) * 60).padStart(2, "0")
    const hoursDiff = timeDiff - timeDiff % 1
    return (
        <div className='rounded-xl text-xs text-[#9CA3AF] py-[5px] px-2 whitespace-nowrap bg-white border-1 border-[#E5E7EB]'>
            {hoursDiff}h {minsDiff}m
        </div>
    )
}

export default function MyTicketCard({ adult, child, created_at, item, onChoose, qrCodeLink, requestId, returnItem, transactionId }: MyTicketCardProps) {
    const { getItem } = useLanguage()

    const { amount, busDirectionId, bus_arrival, bus_departure, date, flightId, name, price_adult, price_child } = item

    const { cityFrom, cityTo } = ticketNameToCities(name)

    return (
        <TicketCard
            id={flightId}
            busDirection={getBusDirection(busDirectionId)}
            cityFrom={cityFrom}
            cityTo={cityTo}
            date={date}
        />
    )

}
