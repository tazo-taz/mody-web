
import { useWindowSize } from 'usehooks-ts'
import { busSystemDatesType } from '../../../../hooks/firebase/useSearchTickets/types'
import { formatTime, timeDifference } from '../../../../lib/date'
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

type TicketCardProps = busSystemDatesType & {
  onChoose?: (data: ticketChooseType) => void,
  active?: ticketChooseType | null
}



export default function BusSystemTicketCard({ time_from, time_to, date_from, date_to, price_one_way, point_from, point_to, onChoose, active }: TicketCardProps) {
  const { width } = useWindowSize()

  const dateFrom = date_from + "T" + time_from
  const dateTo = date_to + "T" + time_to

  const timeFrom = formatTime(dateFrom)
  const timeTo = formatTime(dateTo)
  const [hoursDiff, minsDiff] = timeDifference(dateFrom, dateTo).split(":")

  const timeClass = "font-medium text-lg whitespace-nowrap"
  const timeWidth = 80
  const timeDiffWidth = 220

  return (
    <TicketCardContainer
      // onChoose={() => onChoose?.({
      //     busDirection,
      //     cityFrom,
      //     cityTo,
      //     id,
      //     date
      // })}
      bottomEnd={<h2 className='text-xl font-semibold'>{price_one_way} ₾</h2>}
      active={active}
      id={""}
      date={dateFrom}
    >
      <div className='flex items-center gap-5'>
        <div className={timeClass} style={{ width: timeWidth }}>
          {timeFrom}
        </div>

        <TicketCardDash
          timeDiff={+hoursDiff + +minsDiff / 60}
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
