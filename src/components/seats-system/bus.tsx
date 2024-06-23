import CardContainer from '../card/container'
import useTab from '../tab/useTab'
import { ticketChooseType } from '../ticket/card/simple/type'
import useGetPlan from './hooks/use-get-plan'
import { SeatType } from './hooks/use-get-plan/types'
import SeatPassengers from './seat-passengers'
import AvailableSeatStatus from './seat-status-title/available'
import ReservedSeatStatus from './seat-status-title/reserved'
import SelectedSeatStatus from './seat-status-title/selected'
import VagonSeats from './vagon-seat'

type BusSeatsSystemType = {
  activeOutbound: ticketChooseType | null
  setActiveSeats: React.Dispatch<React.SetStateAction<string[]>>,
  activeSeats: string[]
}

export default function BusSeatsSystem({ activeOutbound, activeSeats, setActiveSeats }: BusSeatsSystemType) {
  let bustype_id = ""
  if (activeOutbound && "busSystem" in activeOutbound.metadata) {
    bustype_id = activeOutbound.metadata.bustype_id
  }

  const { floors, loading } = useGetPlan(bustype_id)
  const { Tab, index } = useTab({
    nav: floors.map((_, inx) => "I".repeat(inx + 1) + " floor")
  })
  const floor = floors[index]

  if (!activeOutbound || !("busSystem" in activeOutbound.metadata)) return null
  console.log(activeOutbound);

  const handleSeatClick = (seat: SeatType) => {
    if (!activeOutbound || !("busSystem" in activeOutbound.metadata) || typeof seat !== "string") return

    setActiveSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((item) => item !== seat)
      }
      return [...prev, seat]
    })
  }

  return (
    <CardContainer header={(<>
      <div className='grid grid-cols-2 flex-1'>
        <div className='max-w-[350px]'>
          {!loading && Tab()}
        </div>
        <div className='flex items-center justify-end gap-5'>
          <AvailableSeatStatus />
          <SelectedSeatStatus />
          <ReservedSeatStatus />
        </div>
      </div>
    </>)}>
      <div className='grid grid-cols-2 flex-1'>
        <VagonSeats
          floor={floor}
          loading={loading}
          freeSeats={activeOutbound.metadata.free_seats}
          setActiveSeats={setActiveSeats}
          activeSeats={activeSeats}
          handleClick={handleSeatClick}
        />
        <SeatPassengers
          activeOutbound={activeOutbound}
        />
      </div>
    </CardContainer>
  )
}
