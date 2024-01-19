import React, { useEffect, useState } from 'react'
import { toggleHideScrollbar } from '../../../lib/utils'
import FilterIcon from '../../../assets/images/svgs/icons/filter'
import { getLanguageItem } from '../../../assets/language'
import DollarIcon from '../../../assets/images/svgs/icons/dollar-icon'
import GlobeIcon from '../../../assets/images/svgs/icons/globe'
import Badge from '../../badge'
import MobileMenuItem from './mobile-menu-item'
import Button from '../../fields/button'
import { Link } from 'react-router-dom'
import ModyLogoPurple from '../../../assets/images/svgs/logo/mody-logo-purple'
import XIcon from '../../../assets/images/svgs/icons/x'
import BurgerIcon from '../../../assets/images/svgs/icons/burger'
import TicketSelect from '../ticket-select'

type mobileMenuProps = {
    toggle: () => void
}

export default function MobileMenu({ toggle }: mobileMenuProps) {
    const [currentItemId, setCurrentItemId] = useState<null | number>(null)

    useEffect(() => {
        toggleHideScrollbar()
        return toggleHideScrollbar
    }, [])

    const menus = [
        {
            id: 1,
            icon: <FilterIcon />,
            title: getLanguageItem("Search_ticket"),
            content: <TicketSelect />
        },
        {
            id: 2,
            icon: <DollarIcon />,
            title: getLanguageItem("Currency"),
            endContent: <Badge title={getLanguageItem("USD")} />
        },
        {
            id: 3,
            icon: <GlobeIcon />,
            title: getLanguageItem("Language"),
            endContent: <Badge title={getLanguageItem("ENG")} />
        },
    ]

    console.log(currentItemId);


    return (
        <div className='fixed inset-0 bg-white z-10 px-5 pb-5 pt-0'>
            <div className='h-[89px] border-b-1 border-gray-200 flex items-center'>
                <Link to="/" className="flex">
                    <ModyLogoPurple />
                </Link>

                <Button icon={true} variant="secondary" className="ml-auto" onClick={toggle}>
                    <XIcon />
                </Button>
            </div>
            <div className='flex flex-col'>
                {menus.map((item) => (
                    <MobileMenuItem onClick={setCurrentItemId} {...item} key={item.id} />
                ))}
            </div>

            <Button className='w-full mt-6'>Log in</Button>
        </div>
    )
}
