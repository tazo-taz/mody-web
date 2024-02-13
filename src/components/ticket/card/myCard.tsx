
import { FaRegCheckCircle } from "react-icons/fa"
import { ticketNameToCities } from '../../../lib/ticket'
import { ticketSchemaType } from "../../../schemas/ticket"
import useLanguage from "../../../stores/useLanguage"
import MinifyDate from "../minify-date"
import TicketCardContainer from "./container"
import { TicketCardDash } from "./dash"

type MyTicketCardProps = ticketSchemaType & {
    onChoose?: (data: ticketSchemaType) => void,
    className?: string,
    style?: React.CSSProperties
}

export default function MyTicketCard({ adult, child, item, onChoose, className, style }: MyTicketCardProps) {
    const { date, flightId, name } = item

    const { cityFrom, cityTo } = ticketNameToCities(name)
    const { getItem } = useLanguage()

    return (
        <TicketCardContainer
            className={className}
            style={style}
            amount={adult + child}
            id={flightId}
            bottomEnd={(
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#0E9F6E]">{getItem("Successful")}</span>
                    <FaRegCheckCircle color="#0E9F6E" size={22} />
                </div>
            )}
            active={null}
        >
            <div className="flex gap-5 items-center">
                <span className="font-semibold text-lg">{cityFrom}</span>
                <TicketCardDash width={124} />
                <span className="font-semibold text-lg">{cityTo}</span>
            </div>

            <MinifyDate
                date={date}
                timeFrom={item.bus_arrival}
                timeTo={item.bus_departure}
                className="text-[#6B7280] text-[13px]"
            />
        </TicketCardContainer>
    )

}
