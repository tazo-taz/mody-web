import { IoReload } from 'react-icons/io5'
import { VagonHeaderSrc } from '../../../assets/images'
import { SeatType, VagonFloor } from '../hooks/use-get-plan/types'
import VagonSeat from '../seat'
import { isReserved } from '../../../lib/ticket'

type VagonSeatsType = {
  floor: VagonFloor,
  loading: boolean,
  freeSeats: number[],
  activeSeats: (string | undefined)[]
  handleClick: (seat: SeatType) => void
}

export default function VagonSeats({ floor, loading, freeSeats, activeSeats, handleClick }: VagonSeatsType) {
  return (
    <div className='pr-6 pt-6'>
      <div className='w-full border-1 border-gray-200 rounded-[20px] overflow-hidden'>
        <img src={VagonHeaderSrc} alt='vagon-header' className='relative -left-2 min-w-[calc(100%+16px)] top-0 mb-4' />
        {loading ? (
          <div className='h-[240px] rounded-primary mr-[4px] flex items-center justify-center'>
            <IoReload className='animate-spin' size={30} />
          </div>
        ) : (
          <div className='grid grid-cols-5 gap-x-3 gap-y-5 px-5 pb-5'>
            {floor.rows.row.map((row, rowInx) =>
              row.seat.map((seat, index) => (
                <VagonSeat
                  key={index}
                  seat={seat}
                  nextSeat={row.seat[index + 1]}
                  nextNextSeat={row.seat[index + 2]}
                  prevSeat={row.seat[index - 1]}
                  isFirst={index === 0 && rowInx === 0}
                  reserved={typeof seat === "string" ? isReserved(seat, freeSeats) : true}
                  isActive={typeof seat === "string" ? activeSeats.includes(seat) : false}
                  handleClick={handleClick}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
