import React from 'react'
import { cn } from '../../lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowSize } from 'usehooks-ts'
import Button from '../fields/button'
import XIcon from '../../assets/images/svgs/icons/x'

type StaticModalProps = {
    width?: number | string,
    className?: string,
    children: React.ReactNode,
    title?: React.ReactNode,
    isOpen: boolean,
    onClose?: () => void,
    widthoutBg?: boolean
}

export default function StaticModal({ isOpen, children, onClose, className, width, title, widthoutBg = false }: StaticModalProps) {
    const { width: windowWidth } = useWindowSize()

    const modalTranslateYFrom = windowWidth > 767 ? "10%" : "100%"
    const modalTranslateYTo = windowWidth < 767 ? "0%" : "-100%"
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {!widthoutBg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black z-10' onClick={onClose} />
                    )}
                    <motion.div
                        initial={{ opacity: 0, translateY: modalTranslateYFrom, translateX: "-50%" }}
                        animate={{ opacity: 1, translateY: modalTranslateYTo, translateX: "-50%" }}
                        exit={{ opacity: 0, translateY: modalTranslateYFrom, translateX: "-50%" }}
                        className='fixed z-10 shadow-[black_0px_0px_10px_-5px] w-full top-auto bottom-0 md:bottom-auto md:top-1/2 left-1/2 bg-white rounded-t-primary'
                        style={{ maxWidth: width }}
                    >
                        {title && (
                            <div className='flex justify-between items-center px-6 py-4 border-b-1'>
                                <h2 className='text-lg font-bold'>{title}</h2>
                                <Button size="icon" variant='secondary' onClick={onClose}>
                                    <XIcon />
                                </Button>
                            </div>
                        )}

                        <div className={cn('p-6 flex flex-col', className)}>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
