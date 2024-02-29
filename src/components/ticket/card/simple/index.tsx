
import { useWindowSize } from 'usehooks-ts'
import { timeFromTo } from '../../../../lib/date'
import { busDirectionType } from '../../../../lib/ticket'
import TicketCardContainer from "../components/container"
import { TicketCardDash } from '../components/dash'

export type ticketChooseType = {
    id: string,
    date: string | Date,
    cityFrom: string,
    cityTo: string,
    busDirection: busDirectionType,
}

type TicketCardProps = ticketChooseType & {
    onChoose?: (data: ticketChooseType) => void,
    active?: ticketChooseType | null
}



export default function TicketCard({ id, date, cityFrom, cityTo, busDirection, onChoose, active }: TicketCardProps) {
    const { width } = useWindowSize()
    if (!busDirection) return null

    const { timeFrom, timeTo } = timeFromTo(date, busDirection.timeDiff)

    const timeClass = "font-medium text-lg whitespace-nowrap"
    const timeWidth = 80
    const timeDiffWidth = 220



    return (
        <TicketCardContainer
            onChoose={() => onChoose?.({
                busDirection,
                cityFrom,
                cityTo,
                id,
                date
            })}
            bottomEnd={<h2 className='text-xl font-semibold'>{busDirection.price} ₾</h2>}
            active={active}
            id={id}
        >
            <div className='flex items-center gap-5'>
                <div className={timeClass} style={{ width: timeWidth }}>
                    {timeFrom}
                </div>

                <TicketCardDash
                    timeDiff={busDirection.timeDiff}
                    width={timeDiffWidth}
                />

                <div className={timeClass} style={{ width: timeWidth, textAlign: "right" }}>
                    {timeTo}
                </div>
            </div>

            <div className='flex justify-between text-[#6B7280] -mt-2 text-sm' style={{
                width: width < 670 ? "auto" : timeWidth * 2 + timeDiffWidth + 40
            }}>
                <h3>{cityFrom}</h3>
                <h3>{cityTo}</h3>
            </div>
        </TicketCardContainer>
    )
}
