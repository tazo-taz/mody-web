import useLanguage from '../../stores/useLanguage'
import Tab from '../tab'


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

    return (
        <Tab
            nav={nav}
            className="mb-[35px]"
        />
    )
}
