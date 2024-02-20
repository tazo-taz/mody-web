import { useParams } from 'react-router-dom'
import GoBack from '../../../../components/go-back'
import useMyTickets from '../../../../hooks/firebase/useMyTickets'
import useGrayBg from '../../../../hooks/useGrayBg'
import useLanguage from '../../../../stores/useLanguage'
import { getBusDirection, getCitiesByName } from '../../../../lib/ticket'
import MinifyDate from '../../../../components/ticket/minify-date'
import Successful from '../../../../components/ticket/card/components/successful'
import RealTicketsSection from '../../../../components/ticket/card/real/section'

export default function MyTicketPage() {
    const { getItem } = useLanguage()
    const { tickets, isLoading } = useMyTickets()
    const { id } = useParams()
    useGrayBg()


    if (!id) return (
        <div>
            not found
        </div>
    )

    const ticket = tickets.find((ticket) => ticket.uid === id)

    const goBack = <GoBack url="/account/my-tickets">
        {getItem("Back_to_my_tickets")}
    </GoBack>

    console.log(ticket);

    if (isLoading) {
        return goBack
    }

    if (!ticket) {
        return (
            <div>
                {goBack}

                <div>not found</div>
            </div>
        )
    }

    const { cityFrom, cityTo } = getCitiesByName(ticket.item.name)
    const busDirection = getBusDirection(ticket.item.busDirectionId)!


    return (
        <>
            {goBack}

            <div className='mt-6 flex justify-between border-b-1 pb-3'>
                <div>
                    <h2 className='font-bold text-xl'>{cityFrom} - {cityTo}</h2>
                    <MinifyDate className='text-[#6B7280] text-[13px] mt-2' date={ticket.item.date} timeDiff={busDirection.timeDiff} />
                </div>

                <Successful />
            </div>

            <RealTicketsSection
                ticket={ticket}
                className='mt-10'
            />
        </>
    )
}
