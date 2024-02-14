import { AnimatePresence, motion } from 'framer-motion'
import useQuery from '../../hooks/useQuery'
import { calculateTicketsFullPrice, parseTicketQuery } from '../../lib/ticket'
import { cn } from '../../lib/utils'
import useLanguage from '../../stores/useLanguage'
import Button from '../fields/button'
import { ticketChooseType } from './card/simple'
import TicketMiniCard from './mini-card'
import TicketsFullPrice from './tickets-full-price'

type ActiveTicketInfoType = {
    className?: string,
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null
    onContinue: () => void,
    fullDetails?: boolean
}

export default function ActiveTicketInfo({ className, outboundTicket, returnTicket, onContinue, fullDetails }: ActiveTicketInfoType) {
    const { getItem } = useLanguage()
    const { child, passenger } = parseTicketQuery(useQuery())

    if (!outboundTicket && !returnTicket) return null

    const passengersCount = child + passenger
    const { totalPrice } = calculateTicketsFullPrice(passengersCount, outboundTicket?.busDirection?.price, returnTicket?.busDirection?.price, 0)

    return (
        <div className={cn(
            "p-5 bg-white rounded-primary flex flex-col shadow-md",
            className
        )}>
            {outboundTicket && (
                <>
                    <TicketMiniCard
                        {...outboundTicket}
                        type='outbound'
                        passengersCount={child + passenger}
                    />
                    <div className='border-b-1 my-4' />
                </>
            )}
            {returnTicket && (
                <>
                    <TicketMiniCard
                        {...returnTicket}
                        type='return'
                        passengersCount={child + passenger}
                    />
                    <div className='border-b-1 my-4' />
                </>
            )}

            <AnimatePresence>
                {fullDetails && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <TicketsFullPrice
                            outboundTicket={outboundTicket}
                            returnTicket={returnTicket}
                            className='mb-6'
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                className='justify-between'
                onClick={onContinue}
            >
                {getItem(fullDetails ? "Pay_now" : "Continue")}
                <span>{totalPrice} ₾</span>
            </Button>
        </div>
    )
}