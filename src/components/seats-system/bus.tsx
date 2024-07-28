import useQuery from '../../hooks/useQuery'
import { isReserved, parseTicketQuery } from '../../lib/ticket'
import { passengerType } from '../../pages/tickets/bus/search'
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
  activeReturn: ticketChooseType | null
  seatsIndex: number,
  passengers: passengerType[]
  setPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
}

export default function BusSeatsSystem({ activeOutbound, activeReturn, passengers, setPassengers, seatsIndex }: BusSeatsSystemType) {

  const activeTicketType = seatsIndex === 0 ? activeOutbound : activeReturn
  const activeSeats = passengers.map(passenger => passenger.seat[seatsIndex])
  const setActiveSeats = (seats: (string | undefined)[]) => {
    const newPassengers = [...passengers]
    newPassengers.forEach((passenger, inx) => {
      passenger.seat[seatsIndex] = seats[inx]
    })
    setPassengers(newPassengers)
  }

  let bustype_id = ""
  if (activeTicketType && "busSystem" in activeTicketType.metadata) {
    bustype_id = activeTicketType.metadata.bustype_id
  }

  const { floors, loading } = useGetPlan(bustype_id)
  const query = useQuery()
  const { child, passenger } = parseTicketQuery(query)

  const { Tab: floorTab, index: floorIndex } = useTab({
    nav: floors.map((_, inx) => "I".repeat(inx + 1) + " floor")
  })

  const floor = floors[floorIndex]

  if (!activeTicketType || !("busSystem" in activeTicketType.metadata)) return null
  const passengerAmount = child + passenger

  const handleSeatClick = (seat: SeatType) => {
    if (!activeTicketType || !("busSystem" in activeTicketType.metadata) || typeof seat !== "string" || isReserved(seat, activeTicketType.metadata.free_seats)) return

    let seatIndex = -1
    let firstAvaibleSeat = -1

    activeSeats.forEach((_seat, inx) => {
      if (_seat === seat) seatIndex = inx
      if (firstAvaibleSeat === -1 && _seat === undefined) firstAvaibleSeat = inx
    })

    if (seatIndex !== -1) {
      let _activeSeats = [...activeSeats]
      _activeSeats[seatIndex] = undefined
      setActiveSeats(_activeSeats)
    } else if (firstAvaibleSeat !== -1) {
      let _activeSeats = [...activeSeats]
      _activeSeats[firstAvaibleSeat] = seat
      setActiveSeats(_activeSeats)
    }
  }

  const handleDeleteSeat = (index: number) => {
    let _activeSeats = [...activeSeats]
    _activeSeats[index] = undefined
    setActiveSeats(_activeSeats)
  }

  return (
    <CardContainer
      header={(
        <>
          <div className='grid grid-cols-1 lg:grid-cols-2 flex-1 gap-4 lg:gap-0'>
            <div className='max-w-[350px]'>
              {!loading && floorTab()}
            </div>
            <div className='flex items-center justify-center lg:justify-end gap-5'>
              <AvailableSeatStatus />
              <SelectedSeatStatus />
              <ReservedSeatStatus />
            </div>
          </div>
        </>
      )}
      contentClassName='pt-0'
    >
      <div className='lg:grid lg:grid-cols-2 flex flex-col-reverse flex-1'>
        <VagonSeats
          floor={floor}
          loading={loading}
          freeSeats={activeTicketType.metadata.free_seats}
          activeSeats={activeSeats}
          handleClick={handleSeatClick}
        />
        <SeatPassengers
          activeTicketType={activeTicketType}
          passengerAmount={passengerAmount}
          activeSeats={activeSeats}
          handleDeleteSeat={handleDeleteSeat}
        />
      </div>
    </CardContainer>
  )
}
