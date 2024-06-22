
import busImg from "../../../../assets/images/georgiabusapi.png"
import { cn } from '../../../../lib/utils'
import IsUpcoming from "./is-upcoming"
import OneWay from "./one-way"


type TicketCardContainerProps = {
    id: string
    onChoose?: (data: any) => void,
    active?: { id: string, date: Date | string } | null,
    bottomEnd: React.ReactNode,
    children: React.ReactNode,
    amount?: number,
    className?: string
    style?: React.CSSProperties,
    date?: Date | string,
    isActive?: boolean
}

export default function TicketCardContainer({ id, onChoose, isActive: _isActive, active, bottomEnd, children, amount = 1, className, style, date }: TicketCardContainerProps) {
    const isActiveId = active?.id === id
    const isActiveDate = active?.date && date && new Date(date).getTime() === new Date(active?.date).getTime()
    const isActive = (isActiveId && isActiveDate) || _isActive

    return (
        <div
            className={cn(
                'flex flex-col gap-2 p-3.5 rounded-primary bg-white hover:bg-gray-50 transition cursor-pointer border-1',
                className,
                isActive ? "border-primary" : "border-[#E5E7EB]"
            )}
            onClick={() => onChoose?.({ id })}
            style={style}
        >
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={busImg} alt='logo' className='h-10' />
                    <h6 className='text-[#6B7280] text-xs'>#{id}</h6>
                </div>
                {date && (
                    <IsUpcoming date={date} />
                )}
            </div>

            {children}

            <div className='flex items-center gap-1 justify-between'>
                <OneWay amount={amount} />

                {bottomEnd}
            </div>
        </div>
    )
}
