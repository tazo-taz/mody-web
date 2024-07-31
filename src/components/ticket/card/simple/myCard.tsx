
import { getBusDirection, getCitiesByTicketTitle } from '../../../../lib/ticket'
import { MyTicketSchemaType } from '../../../../schemas/my-ticket'
import MinifyDate from "../../minify-date"
import TicketCardContainer from "../components/container"
import { TicketCardDash } from "../components/dash"
import Failed from '../components/failed'
import Pending from '../components/pending'
import Successful from "../components/successful"

type MyTicketCardProps = MyTicketSchemaType & {
    onChoose?: (data: MyTicketSchemaType) => void,
    className?: string,
    style?: React.CSSProperties,

}

export default function MyTicketCard({ uid, onChoose, className, style, status, created_at, tickets, passengers }: MyTicketCardProps) {
    const [cityFrom, cityTo] = getCitiesByTicketTitle(tickets[0].title)

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
            amount={passengers.length}
            id={uid}
            bottomEnd={bottomEnd}
            active={null}
            onChoose={onChoose}
            date={tickets[0].dateTimeFrom}
        >
            <div className="flex gap-5 items-center">
                <span className="font-semibold text-lg">{cityFrom}</span>
                <TicketCardDash width={124} />
                <span className="font-semibold text-lg">{cityTo}</span>
            </div>

            <MinifyDate
                date={tickets[0].dateTimeFrom}
                timeFrom={tickets[0].dateTimeFrom}
                timeTo={tickets[0].dateTimeTo}
                className="text-[#6B7280] text-[13px]"
            />
        </TicketCardContainer>
    )

}
