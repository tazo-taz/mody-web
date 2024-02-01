import React from 'react'
import ChevronDown from '../../assets/images/svgs/icons/chevron/chevron-down'
import useOpen from '../../hooks/useOpen'
import Item from './item'
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export type separatorType = {
    isSeparator: true
}

export type defaultDropdownItemType = ({
    icon: React.ReactNode,
    title: string,
} & (
        { href: string } | { onClick: () => void }
    ))

export type dropdownItemType = defaultDropdownItemType | separatorType | false | { custom: true, element: React.ReactNode }

type DropdownType = {
    items: (dropdownItemType)[],
    children: React.ReactNode,
    exact?: boolean,
    width?: number,
    itemsClassName?: string
}

export default function Dropdown({ children, items, exact = false, width = 250, itemsClassName }: DropdownType) {
    const { isOpen, toggle } = useOpen()

    let frontElement: React.ReactNode = (
        <div
            className='bg-[#F3F4F6] py-1 pl-1 pr-3 flex gap-2.5 rounded-primary h-12 justify-between items-center cursor-pointer'
            onClick={e => {
                e.stopPropagation()
                toggle()
            }}
        >
            {children}
            <ChevronDown />
        </div>
    )

    if (exact) frontElement = children

    return (
        <>
            <div className='relative'>
                <div onClick={toggle}>
                    {frontElement}
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <div className='z-10 fixed inset-0' onClick={toggle} />
                            <motion.div
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: 10 }}
                                className={cn('bg-white rounded-primary flex flex-col absolute shadow-md right-0 top-[110%] z-10', itemsClassName)}
                                style={{ width }}
                            >
                                {items.map((item, inx) => {
                                    if (!item) return null
                                    if ("isSeparator" in item) {
                                        return <div key={inx} className='h-[1px] bg-[#EAECF0]' />
                                    } else if ("custom" in item) {
                                        return <div key={inx}>{item.element}</div>
                                    }
                                    return <Item toggle={toggle} {...item} key={inx} />
                                })}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
