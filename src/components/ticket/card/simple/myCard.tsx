
import { getBusDirection, getCitiesByName } from '../../../../lib/ticket'
import { ticketSchemaType } from "../../../../schemas/ticket"
import MinifyDate from "../../minify-date"
import TicketCardContainer from "../components/container"
import { TicketCardDash } from "../components/dash"
import Successful from "../components/successful"

type MyTicketCardProps = ticketSchemaType & {
    onChoose?: (data: ticketSchemaType) => void,
    className?: string,
    style?: React.CSSProperties,

}

export default function MyTicketCard({ adult, child, item, onChoose, className, style }: MyTicketCardProps) {
    const { date, flightId, name } = item
    const { cityFrom, cityTo } = getCitiesByName(name)

    const busDirection = getBusDirection(item.busDirectionId)!

    return (
        <TicketCardContainer
            className={className}
            style={style}
            amount={adult + child}
            id={flightId}
            bottomEnd={<Successful />}
            active={null}
            onChoose={onChoose}
        >
            <div className="flex gap-5 items-center">
                <span className="font-semibold text-lg">{cityFrom}</span>
                <TicketCardDash width={124} />
                <span className="font-semibold text-lg">{cityTo}</span>
            </div>

            <MinifyDate
                date={date}
                timeDiff={busDirection?.timeDiff}
                className="text-[#6B7280] text-[13px]"
            />
        </TicketCardContainer>
    )

}
