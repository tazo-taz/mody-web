import { AnimatePresence, motion } from 'framer-motion'
import useQuery from '../../../hooks/useQuery'
import { calculateTicketsFullPrice, parseTicketQuery } from '../../../lib/ticket'
import { cn } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'
import Button from '../../fields/button'
import { ticketChooseType } from '../card/simple'
import TicketMiniCard from '../card/simple/mini'
import TicketsFullPrice from '../tickets-full-price'
import { languageData } from '../../../assets/language'

export type ActiveTicketInfoType = {
    className?: string,
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null
    onContinue: () => void,
    fullDetails?: boolean
    showTickets?: boolean,
    buttonTitle?: keyof typeof languageData,
}

export default function ActiveTicketInfo({ className, outboundTicket, returnTicket, onContinue, fullDetails, showTickets = true, buttonTitle = "Continue" }: ActiveTicketInfoType) {
    const { getItem } = useLanguage()
    const { child, passenger } = parseTicketQuery(useQuery())

    if (!outboundTicket && !returnTicket) return null

    const passengersCount = child + passenger
    const { totalPrice } = calculateTicketsFullPrice(passengersCount, outboundTicket?.busDirection?.price, returnTicket?.busDirection?.price, fullDetails)

    return (
        <div className={cn(
            "p-5 bg-white rounded-primary flex flex-col shadow-md",
            className
        )}>
            <AnimatePresence>
                {showTickets && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
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
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {fullDetails && showTickets && (
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
                {getItem(buttonTitle)}
                <span>{totalPrice} ₾</span>
            </Button>
        </div>
    )
}