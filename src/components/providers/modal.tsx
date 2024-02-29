import AuthModal from '../modals/auth'
import CalendarModal from '../modals/calendar'
import PurchasedTicketModal from '../modals/purchased-ticket'

export default function ModalProviders() {
    return (
        <>
            <AuthModal />
            <PurchasedTicketModal />
            <CalendarModal />
        </>
    )
}
