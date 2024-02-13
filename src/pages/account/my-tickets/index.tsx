import AccountTitle from '../../../components/account/title';
import MyTicketCard from '../../../components/ticket/card/myCard';
import useMyTickets from '../../../hooks/firebase/useMyTickets';
import useGrayBg from '../../../hooks/useGrayBg';
import useLanguage from '../../../stores/useLanguage';
import ticketImg from "../../../assets/images/tickets.png"
import Button from '../../../components/fields/button';
import { Link } from 'react-router-dom';

export default function MyTicketsPage() {
    const { tickets, isLoading } = useMyTickets()
    const { getItem } = useLanguage()

    useGrayBg()

    const ticketsContent = isLoading ? null : tickets.length ? <div className='flex flex-col gap-5'>
        {tickets.map((ticket, inx) => (
            <MyTicketCard
                {...ticket}
                className='view-anim'
                style={{ "--delay": inx } as any}
                key={inx}
            />
        ))}
    </div> : (
        <div className='flex items-center justify-center flex-col gap-4 mt-[100px]'>
            <img src={ticketImg} alt='ticket' className='max-w-[149px] max-h-[144px] w-full h-full' />
            <p className='font-semibold'>{getItem("No_bookings_yet")}</p>
            <Link to={"/tickets/bus"}>
                <Button className='w-[270px]'>{getItem("Book_your_trip")}</Button>
            </Link>
        </div>
    )
    return (
        <>
            <AccountTitle className='mb-5'>{getItem("My_tickets")}</AccountTitle>
            {ticketsContent}
        </>
    )
}
