import AccountTitle from '../../../components/account/title';
import MyTicketCard from '../../../components/ticket/card/myCard';
import useMyTickets from '../../../hooks/firebase/useMyTickets';
import useGrayBg from '../../../hooks/useGrayBg';
import useLanguage from '../../../stores/useLanguage';

export default function MyTicketsPage() {
    const { tickets } = useMyTickets()
    const { getItem } = useLanguage()

    useGrayBg()

    return (
        <>
            <AccountTitle className='mb-5'>{getItem("My_tickets")}</AccountTitle>
            <div className='flex flex-col gap-5'>
                {tickets.map((ticket, inx) => (
                    <MyTicketCard
                        {...ticket}
                        className='view-anim'
                        style={{ "--delay": inx } as any}
                        key={inx}
                    />
                ))}
            </div>
        </>
    )
}
