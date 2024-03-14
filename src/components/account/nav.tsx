import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import useLanguage from '../../stores/useLanguage'


export default function AccountNav() {
    const { getItem } = useLanguage()
    const nav = [
        {
            title: getItem("Account_Settings"),
            href: "/account"
        },
        {
            title: getItem("My_tickets"),
            href: "/account/my-tickets"
        },
        {
            title: getItem("Payment_methods"),
            href: "/account/payments"
        },
        {
            title: getItem("Redeem_codes"),
            href: "/account/redeem-codes"
        },
        {
            title: getItem("Invite_friends"),
            href: "/account/invite-friends"
        },
    ]

    const location = useLocation()
    const _activeIndex = nav.findIndex((item) => item.href === location.pathname || item.href + "/" === location.pathname)
    const activeIndex = _activeIndex === -1 ? 0 : _activeIndex

    return (
        <div className='bg-[#F3F4F6] border-1 border-[#E5E7EB] rounded-lg p-1 hidden md:block mb-[35px]'>
            <div className='relative grid grid-cols-5'>
                <div
                    className="absolute top-0 bottom-0 transition-[left] w-1/5 bg-white shadow-md rounded-md"
                    style={{
                        left: activeIndex * 100 / nav.length + "%"
                    }}
                />
                {nav.map((item, inx) => (
                    <Link
                        to={item.href}
                        key={inx}
                        className={cn('py-2 text-center text-[#6B7280] rounded-md relative z-[1] whitespace-nowrap',
                            activeIndex === inx && "text-secondary font-semibold"
                        )}
                    >{item.title}</Link>
                ))}
            </div>
        </div>
    )
}
