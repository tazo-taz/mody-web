import React from 'react'
import ChevronDown from '../../assets/images/svgs/icons/chevron/chevron-down'
import useOpen from '../../hooks/useOpen'
import Item from './item'
import { AnimatePresence, motion } from 'framer-motion';

type separatorType = {
    isSeparator: true
}

export type itemType = {
    icon: React.ReactNode,
    title: string,
} & (
        { href: string } | { onClick: () => void }
    )

type MenuType = {
    icon: React.ReactNode,
    title: string,
    items: (itemType | separatorType | false)[]
}

export default function Menu({ icon, title, items }: MenuType) {
    const { isOpen, toggle } = useOpen()
    return (
        <>
            <div className='relative'>
                <div
                    className='bg-[#F3F4F6] py-1 pl-1 pr-3 flex gap-2.5 rounded-primary h-12 justify-between items-center cursor-pointer'
                    onClick={toggle}
                >
                    <div className='bg-white rounded-primary flex items-center justify-center w-10 h-10'>
                        {icon}
                    </div>
                    <h5>{title}</h5>
                    <ChevronDown />
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div className='z-10 fixed inset-0' onClick={toggle} />
                            <motion.div
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: 10 }}
                                className='bg-white rounded-primary flex flex-col w-[250px] absolute shadow-md right-0 top-[110%] z-10'>
                                {items.map((item, inx) => {
                                    if (!item) return null
                                    if ("isSeparator" in item) {
                                        return <div key={inx} className='h-[1px] bg-[#EAECF0]' />
                                    } else {
                                        return <Item {...item} key={inx} />
                                    }
                                })}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
