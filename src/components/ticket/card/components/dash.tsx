import { useWindowSize } from "usehooks-ts"

type TicketCardDashProps = {
    width?: number,
    timeDiff?: number
}

export const TicketCardDash = ({ timeDiff, width }: TicketCardDashProps) => {
    const { width: windowWidth } = useWindowSize()
    const styles: any = { width: "100%" }
    if (windowWidth > 640) {
        styles.width = width
    }
    return (
        <div className='relative flex flex-1 sm:flex-none h-7 overflow-x-clip' style={styles}>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5E7EB]' />
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E5E7EB]' />

            {timeDiff && (
                <div className='center relative z-[1]'>
                    <TimeDiff timeDiff={timeDiff} />
                </div>
            )}

            <div className="flex flex-1 overflow-x-clip gap-1.5 absolute top-1/2 -translate-y-1/2">
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
                <div className='min-w-1.5 h-[2px] bg-[#E5E7EB]' />
            </div>
        </div>
    )
}

export const TimeDiff = ({ timeDiff }: { timeDiff: number }) => {
    const minsDiff = String(Math.floor((timeDiff % 1) * 60)).padStart(2, "0")
    const hoursDiff = timeDiff - timeDiff % 1
    return (
        <div className='rounded-xl text-xs text-[#9CA3AF] py-[5px] px-2 whitespace-nowrap bg-white border-1 border-[#E5E7EB]'>
            {hoursDiff}h {minsDiff}m
        </div>
    )
}