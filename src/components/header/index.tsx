import { Link } from "react-router-dom";
import BurgerIcon from "../../assets/images/svgs/icons/burger";
import DollarIcon from "../../assets/images/svgs/icons/dollar-icon";
import LogOutIcon from "../../assets/images/svgs/icons/log-out";
import PaymentIcon from "../../assets/images/svgs/icons/payment";
import RedeemIcon from "../../assets/images/svgs/icons/redeem";
import SettingsIcon from "../../assets/images/svgs/icons/settings";
import TicketIcon from "../../assets/images/svgs/icons/ticket-icon";
import UserIcon from "../../assets/images/svgs/icons/user";
import UserPlusIcon from "../../assets/images/svgs/icons/user-plus";
import XIcon from "../../assets/images/svgs/icons/x";
import ModyLogoPurple from "../../assets/images/svgs/logo/mody-logo-purple";
import { signOut } from "../../lib/user";
import useHeaderMenuOpen from "../../stores/useHeaderMenuOpen";
import useLanguage from "../../stores/useLanguage";
import useModal from "../../stores/useModal";
import useUser from "../../stores/useUser";
import Button from "../fields/button";
import LanguageSwitch from "../language-switch";
import Menu from "../menu";
import MyLink from "../my-link";
import MobileMenu from "./mobile-menu/mobile-menu";
import TicketSelect from "./ticket-select";
import { useWindowSize } from "usehooks-ts";

export default function Header() {
    const { isOpen, toggle } = useHeaderMenuOpen()
    const modal = useModal()
    const { isLoading, user } = useUser()
    const { getItem } = useLanguage()
    const { width } = useWindowSize()

    let userButton = null

    if (!isLoading) {
        if (!user) userButton = (
            <Button onClick={() => modal.onOpen("auth")}>
                {getItem("Log_In")}
            </Button>
        )
        else userButton = (
            <>
                <MyLink className="hidden lg:block" href="/account/my-tickets" icon={<TicketIcon />}>
                    {getItem("My_tickets")}
                </MyLink>
                <Menu title={user.firstName} icon={<UserIcon />} items={[
                    {
                        icon: <SettingsIcon />,
                        title: getItem("Account_Settings"),
                        href: "/account/settings"
                    },
                    width < 1024 &&
                    {
                        icon: <TicketIcon />,
                        title: getItem("My_tickets"),
                        href: "/account/my-tickets"
                    },
                    {
                        icon: <PaymentIcon />,
                        title: getItem("Payment"),
                        href: "/account/payment"
                    },
                    {
                        icon: <RedeemIcon />,
                        title: getItem("Redeem_codes"),
                        href: "/account/redeem-codes"
                    },
                    {
                        icon: <UserPlusIcon />,
                        title: getItem("Invite_friends"),
                        href: "/account/invite-friends"
                    },
                    {
                        isSeparator: true
                    },
                    {
                        icon: <LogOutIcon />,
                        title: getItem("Log_out"),
                        onClick: signOut
                    },
                ]} />
            </>
        )
    }


    return (
        <div className="border-b-1 border-gray-200">
            <div className='container mx-auto py-[20px] flex items-center'>

                <Link to="/" className="flex">
                    <ModyLogoPurple />
                    <h1 className="ml-[10px] whitespace-pre font-bold mr-5 lg:mr-[50px] hidden md:block">{getItem("Find_Official_Tickets")}</h1>
                </Link>

                <div className="md:flex flex-1 hidden">
                    <TicketSelect />

                    <div className="ml-auto flex gap-[14px]">
                        {userButton}
                        <Button size="icon" variant="secondary">
                            <DollarIcon />
                        </Button>
                        <LanguageSwitch />
                    </div>
                </div>

                <div className="block md:hidden ml-auto">
                    <Button size="icon" variant="secondary" onClick={toggle}>
                        {isOpen ? <XIcon /> : <BurgerIcon />}
                    </Button>
                </div>

                {isOpen && (
                    <div className="block md:hidden">
                        <MobileMenu toggle={toggle} />
                    </div>
                )}
            </div>
        </div>
    )
}
