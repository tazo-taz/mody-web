import ActiveTicketInfoModal, { ActiveTicketInfoModalProps } from './modal'

export default function ActiveTicketInfoModalContent({ outboundTicket, returnTicket,
    isActiveTicketInfoOpen, ...props }: ActiveTicketInfoModalProps) {
    let height = 250
    if (outboundTicket && returnTicket) {
        if (!isActiveTicketInfoOpen) height = 110
        else {
            height = 400
            if (props.fullDetails) height += 400
        }

    } else if (outboundTicket || returnTicket) {
        if (!isActiveTicketInfoOpen) height = 110
        else {
            height = 250
            if (props.fullDetails) height += 185
        }

    } else height = 0

    return (
        <>
            <div className="md:hidden transition" style={{
                height
            }} />

            <ActiveTicketInfoModal
                className="shadow-none"
                outboundTicket={outboundTicket}
                returnTicket={returnTicket}
                isActiveTicketInfoOpen={isActiveTicketInfoOpen}
                {...props}
            />
        </>
    )
}
