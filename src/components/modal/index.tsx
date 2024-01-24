import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import XIcon from '../../assets/images/svgs/icons/x'
import { hideScrollbar, showScrollbar } from '../../lib/utils'
import useModal, { modalStore } from '../../stores/useModal'
import Button from '../fields/button'
import { useWindowSize } from 'usehooks-ts'

type ModalType = {
    children: React.ReactNode,
    title: string,
    modalType: modalStore["modalType"],
    onClose?: () => void
}

export default function Modal({ children, title, modalType, onClose: onCloseCb }: ModalType) {
    const modal = useModal()
    const { width } = useWindowSize()

    useEffect(() => {
        if (modal.modalType === modalType) {
            hideScrollbar()
            return showScrollbar
        }
    }, [modalType, modal.modalType])

    const modalTranslateYFrom = width > 767 ? "10%" : "100%"
    const modalTranslateYTo = width < 767 ? "0%" : "-50%"

    const onClose = () => {
        modal.onClose()
        onCloseCb?.()
    }

    return (
        <AnimatePresence>
            {modal.modalType === modalType && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black z-10' onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, translateY: modalTranslateYFrom, translateX: "-50%" }}
                        animate={{ opacity: 1, translateY: modalTranslateYTo, translateX: "-50%" }}
                        exit={{ opacity: 0, translateY: modalTranslateYFrom, translateX: "-50%" }}
                        className='fixed z-10 top-auto bottom-0 md:bottom-auto md:top-1/2 left-1/2 w-[430px] bg-white rounded-primary'>
                        <div className='flex justify-between items-center px-6 py-4 border-b-1'>
                            <h2 className='text-lg font-bold'>{title}</h2>
                            <Button size="icon" variant='secondary' onClick={onClose}>
                                <XIcon />
                            </Button>
                        </div>

                        <div className='p-6 flex flex-col'>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
