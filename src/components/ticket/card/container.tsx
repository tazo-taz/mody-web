
import busImg from "../../../assets/images/georgiabusapi.png"
import UserSmIcon from '../../../assets/images/svgs/icons/user/user-sm'
import { cn } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'
import SuccessMessage from '../../Messages/Success'


type TicketCardContainerProps = {
    id: string
    onChoose?: (data: any) => void,
    active?: { id: string } | null,
    bottomEnd: React.ReactNode,
    children: React.ReactNode,
    amount?: number,
    className?: string
    style?: React.CSSProperties
}

export default function TicketCardContainer({ id, onChoose, active, bottomEnd, children, amount = 1, className, style }: TicketCardContainerProps) {
    const { getItem } = useLanguage()

    const isActive = active?.id === id

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
                <SuccessMessage text={getItem("CHEAPEST")} />
            </div>

            {children}

            <div className='flex items-center gap-1 justify-between'>
                <div className='flex items-center'>
                    <UserSmIcon />
                    <p className='text-[#6B7280] text-xs ml-1'>{amount}, {getItem("One_way")}</p>
                </div>

                {bottomEnd}
            </div>
        </div>
    )
}
