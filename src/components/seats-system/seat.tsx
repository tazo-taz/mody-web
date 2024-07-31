import { PiTelevisionFill, PiToiletLight } from "react-icons/pi";
import { DoubleDoorSrc, SignleDoorSrc, SteeringWheelSrc, ToiletSrc } from '../../assets/images';
import { SeatType } from './hooks/use-get-plan/types';
import { cn } from "../../lib/utils";

type VagonSeatType = {
  seat: SeatType,
  nextSeat?: SeatType,
  nextNextSeat?: SeatType,
  prevSeat?: SeatType,
  isFirst?: boolean,
  reserved?: boolean,
  handleClick?: (seat: string) => void
  isActive?: boolean
}

const driverElement = <img src={SteeringWheelSrc} alt='steering-wheel' className='w-full' />
const doubleDoorElement = <div className='w-full col-span-2'> <img src={DoubleDoorSrc} alt='door-icon' className='w-full h-full' /> </div>
const signleDoorElement = <div className='w-full'> <img src={SignleDoorSrc} alt='door-icon' className='w-full h-full' /> </div>
const tvElement = <div className='w-full bg-[#F3F4F6] rounded-full flex items-center justify-center'> <PiTelevisionFill className='text-[#a2a5a8] lg:text-xl xl:text-2xl 2xl:text-5xl text-lg' /> </div>
const doubleToiletElement = <div className='w-full col-span-2'> <img src={ToiletSrc} alt='door-icon' className='w-full h-full' /> </div>
const singleElementToilet = <div className='w-full bg-[#F3F4F6] rounded-full flex items-center justify-center'> <PiToiletLight className='text-[#a2a5a8] lg:text-xl xl:text-2xl 2xl:text-5xl text-lg' /> </div>

export default function VagonSeat({
  seat,
  nextSeat,
  nextNextSeat,
  prevSeat,
  isFirst,
  reserved,
  handleClick,
  isActive
}: VagonSeatType) {
  if (isFirst) {
    return driverElement
  }

  if (typeof seat === "object") {
    if (seat['@attributes'].icon.endsWith("driver.png")) {
      if (!isFirst) return <div />
      return driverElement
    }

    else if (seat['@attributes'].icon.endsWith("dveri.png")) {
      if (typeof nextSeat === "object" && nextSeat['@attributes'].icon.endsWith("dveri.png")) {
        return doubleDoorElement
      }
      if (!(typeof prevSeat === "object" && prevSeat['@attributes'].icon.endsWith("dveri.png"))) {
        if (prevSeat === " " || prevSeat === "") {
          return doubleDoorElement
        }
        return signleDoorElement
      }
    }

    else if (seat['@attributes'].icon.endsWith("tv.png")) {
      return tvElement
    }

    else if (seat['@attributes'].icon.endsWith("toilets.png")) {
      if (typeof nextSeat === "object" && nextSeat['@attributes'].icon.endsWith("toilets.png")) {
        return doubleToiletElement
      }
      if (!(typeof prevSeat === "object" && prevSeat['@attributes'].icon.endsWith("toilets.png"))) {
        return singleElementToilet
      }
    }
  }

  if (typeof seat === "object" ||
    ((seat === "" || seat === " ") && typeof nextSeat === "object" && nextSeat['@attributes'].icon.endsWith("dveri.png") && !(typeof nextNextSeat === "object" && nextNextSeat['@attributes'].icon.endsWith("dveri.png")))
  ) {
    return null
  }

  else if (seat === "" || seat === " ") {
    return <div />
  }


  return (
    <div
      className={cn('w-full aspect-square relative group', reserved ? "" : "cursor-pointer ")}
      onClick={() => handleClick?.(seat)}
    >
      <div className={cn('absolute inset-0 rounded-[29px_29px_0px_0px] transition', !reserved && !isActive && "group-hover:!bg-primary")} style={{
        backgroundColor: reserved ? "#F3F4F6" : isActive ? "#F98080" : "#84E1BC",
      }} />
      <div className='absolute bottom-0 w-full h-[32%] rounded-[13px_13px_0_0] bg-white' />
      <div className='absolute bottom-0 w-full h-1/4 rounded-[70px_70px_30px_30px] bg-[#F3F4F6]' />
      <div className='absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
        {isActive && seat}
      </div>
    </div>
  )
}
