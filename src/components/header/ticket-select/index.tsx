import { AnimatePresence, motion } from 'framer-motion'
import ChevronDown from '../../../assets/images/svgs/icons/chevron/chevron-down'
import TicketIcon from '../../../assets/images/svgs/icons/ticket-icon'
import useOpen from '../../../hooks/useOpen'
import { hideScrollbar, scrollToTop, showScrollbar } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'
import TicketSelectContent from './content'

export default function TicketSelect() {
    const { isOpen, open, close } = useOpen(false)
    const { getItem } = useLanguage()

    const handleOpen = () => {
        open()
        scrollToTop()
        hideScrollbar()
    }

    const handleClose = () => {
        close()
        showScrollbar()
    }

    return (
        <>
            <div className='relative z-[2]'>
                {isOpen && (
                    <>
                        <div onClick={handleClose} className='inset-0 fixed z-10' />
                        <div className='inset-0 top-[95px] fixed bg-black opacity-50' />
                    </>
                )}
                <div onClick={handleOpen} className='px-[15px] py-[14px] rounded-primary flex items-center gap-[10px] border-secondary border-1 bg-[#1119280D]'>
                    <TicketIcon />
                    <h5 className='font-[500] whitespace-nowrap'>{getItem("Search_ticket")}</h5>

                    <ChevronDown className="ml-[36px]" />
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className='flex flex-col gap-4 absolute top-[130%] z-10 right-[-40px] shadow-[black_0px_0px_10px_-6px] w-[395px] p-5 bg-white rounded-primary'>
                            <TicketSelectContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
