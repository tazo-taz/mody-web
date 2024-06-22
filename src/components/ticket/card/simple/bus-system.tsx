
import { useWindowSize } from 'usehooks-ts'
import { busSystemDatesType } from '../../../../hooks/firebase/useSearchTickets/types'
import { extractTimesFromBusSystemRoute } from '../../../../lib/date'
import TicketCardContainer from "../components/container"
import { TicketCardDash } from '../components/dash'
import { ticketChooseType } from './type'

type TicketCardProps = busSystemDatesType & {
  onChoose?: (data: ticketChooseType) => void,
  active?: ticketChooseType | null
}



export default function BusSystemTicketCard({
  onChoose, active, ...ticketData
}: TicketCardProps) {
  const { width } = useWindowSize()
  const { route_id, price_one_way, point_from, point_to } = ticketData;

  const { dateFrom, timeFrom, timeTo, timeDiff } = extractTimesFromBusSystemRoute(ticketData)

  const timeClass = "font-medium text-lg whitespace-nowrap"
  const timeWidth = 80
  const timeDiffWidth = 220

  return (
    <TicketCardContainer
      onChoose={() => onChoose?.({
        cityFrom: point_from,
        cityTo: point_to,
        id: route_id,
        date: dateFrom,
        metadata: {
          ...ticketData,
          busSystem: true
        }
      })}
      bottomEnd={<h2 className='text-xl font-semibold'>{price_one_way} €</h2>}
      active={active}
      isActive={active?.id === route_id}
      id={""}
      date={dateFrom}
    >
      <div className='flex items-center gap-5'>
        <div className={timeClass} style={{ width: timeWidth }}>
          {timeFrom}
        </div>

        <TicketCardDash
          timeDiff={timeDiff}
          width={timeDiffWidth}
        />

        <div className={timeClass} style={{ width: timeWidth, textAlign: "right" }}>
          {timeTo}
        </div>
      </div>

      <div className='flex justify-between text-[#6B7280] -mt-2 text-sm' style={{
        width: width < 640 ? "auto" : timeWidth * 2 + timeDiffWidth + 40
      }}>
        <h3>{point_from}</h3>
        <h3>{point_to}</h3>
      </div>
    </TicketCardContainer>
  )
}
