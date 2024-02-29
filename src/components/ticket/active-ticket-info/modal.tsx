import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useWindowSize } from 'usehooks-ts'
import ActiveTicketInfo, { ActiveTicketInfoType } from '.'
import StaticModal from '../../modal/static'

export type ActiveTicketInfoModalProps = ActiveTicketInfoType & {
    isActiveTicketInfoOpen: boolean
    toggleActiveTicketInfo: () => void
}


export default function ActiveTicketInfoModal({ outboundTicket, returnTicket, isActiveTicketInfoOpen, toggleActiveTicketInfo, ...props }: ActiveTicketInfoModalProps) {
    const { width } = useWindowSize()
    return (
        <StaticModal
            isOpen={(!!outboundTicket || !!returnTicket) && width < 768}
            widthoutBg
            className="p-0"
        >
            <div className='bg-slate-100 p-2 rounded-full absolute top-0 left-1/2 -translate-y-1/3 -translate-x-1/2 shadow-[black_0px_0px_10px_-6px] cursor-pointer' onClick={toggleActiveTicketInfo}>
                {isActiveTicketInfoOpen ?
                    <BiChevronDown size={20} />
                    : <BiChevronUp size={20} />
                }
            </div>
            <ActiveTicketInfo
                className="shadow-none"
                outboundTicket={outboundTicket}
                returnTicket={returnTicket}
                showTickets={isActiveTicketInfoOpen}
                {...props}
            />
        </StaticModal>
    )
}
