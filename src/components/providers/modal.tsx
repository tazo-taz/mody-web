import AuthModal from '../modals/auth'
import CalendarModal from '../modals/calendar'
import PurchasedTicketModal from '../modals/purchased-ticket'
import UpdatePhone from '../modals/update-phone'

export default function ModalProviders() {
    return (
        <>
            <AuthModal />
            <PurchasedTicketModal />
            <CalendarModal />
            <UpdatePhone />
        </>
    )
}
