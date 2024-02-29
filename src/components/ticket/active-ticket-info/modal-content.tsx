import ActiveTicketInfoModal, { ActiveTicketInfoModalProps } from './modal'

export default function ActiveTicketInfoModalContent({ onContinue, outboundTicket, returnTicket, toggleActiveTicketInfo,
    isActiveTicketInfoOpen, buttonTitle }: ActiveTicketInfoModalProps) {
    return (
        <>
            <div className="md:hidden transition" style={{
                height: (outboundTicket && returnTicket) ? !isActiveTicketInfoOpen ? 110 : 400 : (outboundTicket || returnTicket) ? !isActiveTicketInfoOpen ? 110 : 250 : 0
            }} />

            <ActiveTicketInfoModal
                buttonTitle={buttonTitle}
                className="shadow-none"
                outboundTicket={outboundTicket}
                returnTicket={returnTicket}
                onContinue={onContinue}
                toggleActiveTicketInfo={toggleActiveTicketInfo}
                isActiveTicketInfoOpen={isActiveTicketInfoOpen}
            />
        </>
    )
}
