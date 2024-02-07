import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeft from '../../../assets/images/svgs/icons/chevron/chevron-left'
import DollarIcon from '../../../assets/images/svgs/icons/dollar-icon'
import FilterIcon from '../../../assets/images/svgs/icons/filter'
import GlobeIcon from '../../../assets/images/svgs/icons/globe'
import LogOutIcon from '../../../assets/images/svgs/icons/log-out'
import PaymentIcon from '../../../assets/images/svgs/icons/payment'
import RedeemIcon from '../../../assets/images/svgs/icons/redeem'
import SettingsIcon from '../../../assets/images/svgs/icons/settings'
import TicketIcon from '../../../assets/images/svgs/icons/ticket/ticket-icon'
import UserPlusIcon from '../../../assets/images/svgs/icons/user-plus'
import XIcon from '../../../assets/images/svgs/icons/x'
import ModyLogoPurple from '../../../assets/images/svgs/logo/mody-logo-purple'
import { signOut } from '../../../lib/user'
import { cn, hideScrollbar, showScrollbar } from '../../../lib/utils'
import useLanguage from '../../../stores/useLanguage'
import useModal from '../../../stores/useModal'
import useAuth from '../../../stores/useAuth'
import Badge from '../../badge'
import Button from '../../fields/button'
import TicketSelectContent from '../ticket-select/content'
import MobileMenuItem from './mobile-menu-item'
import { switchLanguage } from '../../../lib/language'

type mobileMenuProps = {
    toggle: () => void
}

export default function MobileMenu({ toggle }: mobileMenuProps) {
    const [currentItemId, setCurrentItemId] = useState<null | number>(null)
    const { getItem, setLanguage, language } = useLanguage()

    const modal = useModal()
    const { isLoading, user } = useAuth()

    useEffect(() => {
        hideScrollbar()
        return showScrollbar
    }, [])

    let languageBadgeTitle = getItem("ENG")
    if (language === "ge") languageBadgeTitle = getItem("GEO")

    const items = [
        {
            id: 1,
            icon: <FilterIcon />,
            title: getItem("Search_ticket"),
            content: <div className='flex flex-col gap-4 px-5 pb-5 pt-8 flex-1'><TicketSelectContent /></div>
        },
        {
            id: 2,
            icon: <DollarIcon />,
            title: getItem("Currency"),
            endContent: (
                <Badge variant='secondary'>
                    {getItem("USD")}
                </Badge>
            )
        },
        {
            id: 3,
            icon: <GlobeIcon />,
            title: getItem("Language"),
            endContent: (
                <Badge variant='secondary'>
                    {languageBadgeTitle}
                </Badge>
            ),
            onClick: () => switchLanguage(language, setLanguage)
        },
    ]

    const userItems = [
        {
            id: 4,
            icon: <TicketIcon />,
            title: getItem("My_tickets"),
        },
        {
            id: 5,
            icon: <SettingsIcon />,
            title: getItem("Account_Settings"),
        },
        {
            id: 6,
            icon: <PaymentIcon />,
            title: getItem("Payment"),
        },
        {
            id: 7,
            icon: <RedeemIcon />,
            title: getItem("Redeem_codes"),
        },
        {
            id: 8,
            icon: <UserPlusIcon />,
            title: getItem("Invite_friends"),
        },
        {
            id: 9,
            icon: <LogOutIcon />,
            title: getItem("Log_out"),
            onClick: signOut
        },
    ]

    const currentItem = items.find((item) => item.id === currentItemId)

    if (currentItem) {
        return (
            <Container>
                <HeaderContainer className="relative">
                    <Button size='icon' variant='secondary' onClick={() => setCurrentItemId(null)}>
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

                <Button size='icon' variant="secondary" className="ml-auto" onClick={toggle}>
                    <XIcon />
                </Button>
            </HeaderContainer>

            <div className='container mx-auto overflow-y-auto'>
                <div className='flex flex-col mt-4'>
                    {(user ? [...items, ...userItems] : items).map((item) => (
                        <MobileMenuItem onClick={"onClick" in item && item.onClick ? item.onClick : setCurrentItemId} {...item} key={item.id} />
                    ))}
                </div>

                {!user && !isLoading && (
                    <Button className='w-full mt-6' onClick={() => modal.onOpen("auth")}>Log in</Button>
                )}
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
    <div className='border-b-1 border-gray-200'>
        <div className='container mx-auto flex items-center'>
            <div className={cn('h-[88px] flex items-center w-full', className)}>
                {children}
            </div>
        </div>
    </div>
)