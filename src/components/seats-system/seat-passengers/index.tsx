import { IoIosInformationCircleOutline } from "react-icons/io";
import Button from '../../fields/button';
import { ticketChooseType } from '../../ticket/card/simple/type';
import TicketHeaderTitle from '../../ticket/ticket-header-title';
import SeatPassenger from './seat-passenger';

type ActiveOutboundType = {
  activeTicketType: ticketChooseType | null,
  passengerAmount: number
  activeSeats: (string | undefined)[],
  handleDeleteSeat: (index: number) => void
}

export default function SeatPassengers({ activeTicketType, passengerAmount, activeSeats, handleDeleteSeat }: ActiveOutboundType) {
  if (!activeTicketType || !("busSystem" in activeTicketType.metadata)) return null

  const firstAvaibleSeatIndex = activeSeats.findIndex(seat => seat === undefined)

  const activeDate = new Date(activeTicketType?.date)
  return (
    <div className='px-4 lg:border-l-1 pt-6'>
      <div className='flex justify-between items-center border-b-1 pb-6 px-2'>
        <div>
          <TicketHeaderTitle
            departureDate={activeDate}
            className='items-baseline'
          />
        </div>

        <Button variant='secondary' size='icon'>
          <IoIosInformationCircleOutline size={25} />
        </Button>
      </div>

      <div className='flex flex-col gap-6 px-2 pt-6'>
        {[...new Array(passengerAmount)].map((_, index) => {
          return (
            <SeatPassenger
              key={index}
              seat={activeSeats[index]}
              index={index}
              firstAvaibleSeatIndex={firstAvaibleSeatIndex}
              handleDelete={() => handleDeleteSeat(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
