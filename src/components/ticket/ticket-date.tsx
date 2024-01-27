import moment from 'moment'
import TicketPrimaryIcon from '../../assets/images/svgs/icons/ticket/ticket-primary'
import { cn } from '../../lib/utils'

type TicketDateType = {
    date: Date,
    count: number,
    active?: Date,
    onChange: (newDate: Date) => void
}

export default function TicketDate({ date, count, active, onChange }: TicketDateType) {
    const noTickets = count === 0
    return (
        <div
            className={cn(
                'py-2 px-5 flex items-center justify-center flex-col gap-[2px] border-1 rounded-primary hover:bg-gray-100 transition',
                active?.getTime() === date.getTime() && "border-primary",
                noTickets ? " cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={() => !noTickets && onChange(date)}
        >
            <h6 className='text-[11px]'>{moment(date).format("ddd D")}</h6>
            <div className={cn('flex items-center gap-[5px] font-medium justify-between', count > 0 ? "text-primary" : "text-[#9CA3AF]")}>
                <TicketPrimaryIcon color={noTickets ? "#9CA3AF" : "#7D57FD"} />
                <h6 className='text-[12px]'>{count}</h6>
            </div>
        </div>
    )
}
