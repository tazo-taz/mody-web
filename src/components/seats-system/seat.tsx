import { PiTelevisionFill, PiToiletLight } from "react-icons/pi";
import { DoorSrc, SteeringWheelSrc, ToiletSrc } from '../../assets/images';
import { SeatType } from './hooks/use-get-plan/types';
import { cn } from "../../lib/utils";

type VagonSeatType = {
  seat: SeatType,
  nextSeat?: SeatType,
  prevSeat?: SeatType,
  isFirst?: boolean,
  reserved?: boolean,
  handleClick?: (seat: string) => void
  isActive?: boolean
}

export default function VagonSeat({
  seat,
  nextSeat,
  prevSeat,
  isFirst,
  reserved,
  handleClick,
  isActive
}: VagonSeatType) {
  if (typeof seat === "object" || isFirst) {
    if ((typeof seat === "object" && seat['@attributes'].icon.endsWith("driver.png")) || isFirst) {
      return (
        <img src={SteeringWheelSrc} alt='steering-wheel' className='w-full' />
      )
    } else if ((typeof seat === "object" && seat['@attributes'].icon.endsWith("dveri.png"))) {
      return (
        <div className='w-full col-span-2'>
          <img src={DoorSrc} alt='door-icon' className='w-full h-full' />
        </div>
      )
    } else if (typeof seat === "object" && seat['@attributes'].icon.endsWith("tv.png")) {
      return (
        <div className='w-full bg-[#F3F4F6] rounded-full flex items-center justify-center'>
          <PiTelevisionFill className='text-[#a2a5a8] lg:text-xl xl:text-2xl 2xl:text-5xl text-lg' />
        </div>
      )
    } else if (typeof seat === "object" && seat['@attributes'].icon.endsWith("toilets.png")) {
      if (typeof nextSeat === "object" && nextSeat['@attributes'].icon.endsWith("toilets.png")) {
        return (
          <div className='w-full col-span-2'>
            <img src={ToiletSrc} alt='door-icon' className='w-full h-full' />
          </div>
        )
      }
      if (!(typeof prevSeat === "object" && prevSeat['@attributes'].icon.endsWith("toilets.png"))) {
        return (
          <div className='w-full bg-[#F3F4F6] rounded-full flex items-center justify-center'>
            <PiToiletLight className='text-[#a2a5a8] lg:text-xl xl:text-2xl 2xl:text-5xl text-lg' />
          </div>
        )
      }
    }
  } else if (seat === "" || seat === " ") {
    if (typeof nextSeat === "object" && nextSeat['@attributes'].icon.endsWith("dveri.png")) {
      return null
    }
    return <div />
  }

  if (typeof seat === "object") return null

  return (
    <div
      className={cn('w-full aspect-square relative group', reserved ? "" : "cursor-pointer ")}
      onClick={() => handleClick?.(seat)}
    >
      <div className='absolute inset-0 rounded-[29px_29px_0px_0px] transition' style={{
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
