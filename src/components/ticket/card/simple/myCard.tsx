
import { getBusDirection, getCitiesByName } from '../../../../lib/ticket'
import { ticketSchemaType } from "../../../../schemas/ticket"
import MinifyDate from "../../minify-date"
import TicketCardContainer from "../components/container"
import { TicketCardDash } from "../components/dash"
import Failed from '../components/failed'
import Pending from '../components/pending'
import Successful from "../components/successful"

type MyTicketCardProps = ticketSchemaType & {
    onChoose?: (data: ticketSchemaType) => void,
    className?: string,
    style?: React.CSSProperties,

}

export default function MyTicketCard({ item, onChoose, className, style, adult, child, status, created_at }: MyTicketCardProps) {
    const { date, flightId, orderItem: { name }, } = item
    const { cityFrom, cityTo } = getCitiesByName(name)

    const busDirection = getBusDirection(item.busDirectionId)!

    let bottomEnd = null
    if (status === "succeed") {
        bottomEnd = <Successful />
    } else if ((new Date().getTime() - new Date(created_at).getTime()) / 1000 > 60 * 10) {
        bottomEnd = <Failed />
    } else if (status === "pending") {
        bottomEnd = <Pending />
    }

    return (
        <TicketCardContainer
            className={className}
            style={style}
            amount={adult + child}
            id={flightId}
            bottomEnd={bottomEnd}
            active={null}
            onChoose={onChoose}
            date={date}
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
