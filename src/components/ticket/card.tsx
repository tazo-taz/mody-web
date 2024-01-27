
import busImg from "../../assets/images/georgiabusapi.png"
import UserSmIcon from '../../assets/images/svgs/icons/user/user-sm'
import { timeFromTo } from '../../lib/date'
import { busDirectionType } from '../../lib/ticket'
import { cn } from '../../lib/utils'
import useLanguage from '../../stores/useLanguage'
import SuccessMessage from '../Messages/Success'

export type ticketChooseType = {
    id: string,
    date: string,
    cityFrom: string,
    cityTo: string,
    busDirection: busDirectionType,
}

type TicketCardProps = ticketChooseType & {
    onChoose: (data: ticketChooseType) => void,
    active: ticketChooseType | null
}

export default function TicketCard({ id, date, cityFrom, cityTo, busDirection, onChoose, active }: TicketCardProps) {
    const { getItem } = useLanguage()

    if (!busDirection) return null

    const { timeFrom, timeTo } = timeFromTo(date, busDirection.timeDiff)

    const timeClass = "font-medium text-lg whitespace-nowrap"
    const timeWidth = 80
    const timeDiffWidth = 220

    const minsDiff = String((busDirection.timeDiff % 1) * 60).padStart(2, "0")
    const hoursDiff = busDirection.timeDiff - busDirection.timeDiff % 1

    const isActive = active?.id === id

    return (
        <div
            className={cn(
                'flex flex-col gap-5 p-5 rounded-primary bg-white hover:bg-gray-50 transition cursor-pointer border-1',
                isActive ? "border-primary" : "border-[#E5E7EB]"
            )}
            onClick={() => onChoose({
                busDirection,
                cityFrom,
                cityTo,
                id,
                date
            })}
        >
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={busImg} alt='logo' className='h-10' />
                    <h6 className='text-[#6B7280] text-xs'>#{id}</h6>
                </div>
                <SuccessMessage text={getItem("CHEAPEST")} />
            </div>

            <div className='flex items-center gap-5'>
                <div className={timeClass} style={{ width: timeWidth }}>
                    {timeFrom}
                </div>
                <div className='relative flex gap-1.5' style={{ width: timeDiffWidth }}>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5E7EB]' />
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5E7EB]' />

                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-xs text-[#9CA3AF] py-[5px] px-2 whitespace-nowrap bg-white border-1 border-[#E5E7EB]'>
                        {hoursDiff}h {minsDiff}m
                    </div>

                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                    <div className='w-1.5 h-[2px] bg-[#E5E7EB]' />
                </div>

                <div className={timeClass} style={{ width: timeWidth, textAlign: "right" }}>
                    {timeTo}
                </div>
            </div>

            <div className='flex justify-between text-[#6B7280] -mt-5 text-sm' style={{
                width: timeWidth * 2 + timeDiffWidth + 40
            }}>
                <h3>{cityFrom}</h3>
                <h3>{cityTo}</h3>
            </div>

            <div className='flex items-center gap-1 justify-between'>
                <div className='flex items-center'>
                    <UserSmIcon />
                    <p className='text-[#6B7280] text-xs ml-1'>1, {getItem("One_way")}</p>
                </div>

                <h2 className='text-xl font-semibold'>{busDirection.price} ₾</h2>
            </div>
        </div>
    )
}
