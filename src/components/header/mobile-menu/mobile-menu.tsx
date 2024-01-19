import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeft from '../../../assets/images/svgs/icons/chevron/chevron-left'
import DollarIcon from '../../../assets/images/svgs/icons/dollar-icon'
import FilterIcon from '../../../assets/images/svgs/icons/filter'
import GlobeIcon from '../../../assets/images/svgs/icons/globe'
import XIcon from '../../../assets/images/svgs/icons/x'
import ModyLogoPurple from '../../../assets/images/svgs/logo/mody-logo-purple'
import { getLanguageItem } from '../../../assets/language'
import { cn, toggleHideScrollbar } from '../../../lib/utils'
import Badge from '../../badge'
import Button from '../../fields/button'
import TicketSelectContent from '../ticket-select/content'
import MobileMenuItem from './mobile-menu-item'

type mobileMenuProps = {
    toggle: () => void
}

export default function MobileMenu({ toggle }: mobileMenuProps) {
    const [currentItemId, setCurrentItemId] = useState<null | number>(null)

    useEffect(() => {
        toggleHideScrollbar()
        return toggleHideScrollbar
    }, [])

    const items = [
        {
            id: 1,
            icon: <FilterIcon />,
            title: getLanguageItem("Search_ticket"),
            content: <div className='flex flex-col gap-4 px-5 pb-5 pt-8 flex-1'><TicketSelectContent /></div>
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

    const currentItem = items.find((item) => item.id === currentItemId)

    if (currentItem) {
        return (
            <Container>
                <HeaderContainer className="relative">
                    <Button icon variant='secondary' onClick={() => setCurrentItemId(null)}>
                        <ChevronLeft />
                    </Button>

                    <h2 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>{currentItem.title}</h2>
                </HeaderContainer>

                {currentItem.content}
            </Container>
        )
    }

    return (
        <Container>
            <HeaderContainer>
                <Link to="/" className="flex">
                    <ModyLogoPurple />
                </Link>

                <Button icon={true} variant="secondary" className="ml-auto" onClick={toggle}>
                    <XIcon />
                </Button>
            </HeaderContainer>

            <div className='container mx-auto'>
                <div className='flex flex-col mt-4'>
                    {items.map((item) => (
                        <MobileMenuItem onClick={setCurrentItemId} {...item} key={item.id} />
                    ))}
                </div>

                <Button className='w-full mt-6'>Log in</Button>
            </div>
        </Container>
    )
}

const Container = ({ children }: { children: React.ReactNode }) => (
    <div className='fixed inset-0 bg-white z-10 pb-5 pt-0 flex flex-col'>
        {children}
    </div>
)

const HeaderContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className='border-b-1 border-gray-200 pr-2'>
        <div className='container mx-auto flex items-center'>
            <div className={cn('h-[88px] flex items-center w-full', className)}>
                {children}
            </div>
        </div>
    </div>
)