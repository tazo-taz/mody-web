import { Link } from "react-router-dom";
import BurgerIcon from "../../assets/images/svgs/icons/burger";
import DollarIcon from "../../assets/images/svgs/icons/dollar-icon";
import EnglishFlagIcon from "../../assets/images/svgs/icons/flags/english";
import LogOutIcon from "../../assets/images/svgs/icons/log-out";
import PaymentIcon from "../../assets/images/svgs/icons/payment";
import RedeemIcon from "../../assets/images/svgs/icons/redeem";
import SettingsIcon from "../../assets/images/svgs/icons/settings";
import UserIcon from "../../assets/images/svgs/icons/user";
import UserPlusIcon from "../../assets/images/svgs/icons/user-plus";
import XIcon from "../../assets/images/svgs/icons/x";
import ModyLogoPurple from "../../assets/images/svgs/logo/mody-logo-purple";
import { getLanguageItem } from "../../assets/language";
import { signOut } from "../../lib/user";
import useHeaderMenuOpen from "../../stores/useHeaderMenuOpen";
import useModal from "../../stores/useModal";
import useUser from "../../stores/useUser";
import Button from "../fields/button";
import Menu from "../menu";
import MobileMenu from "./mobile-menu/mobile-menu";
import TicketSelect from "./ticket-select";

export default function Header() {
    const { isOpen, toggle } = useHeaderMenuOpen()
    const modal = useModal()
    const { isLoading, user } = useUser()

    let userButton = null

    if (!isLoading) {
        if (!user) userButton = (
            <Button onClick={() => modal.onOpen("auth")}>
                {getLanguageItem("Log_In")}
            </Button>
        )
        else userButton = (
            <>
                <Menu title={user.firstName} icon={<UserIcon />} items={[
                    {
                        icon: <SettingsIcon />,
                        title: getLanguageItem("Account_Settings"),
                        href: "/account/settings"
                    },
                    {
                        icon: <PaymentIcon />,
                        title: getLanguageItem("Payment"),
                        href: "/account/payment"
                    },
                    {
                        icon: <RedeemIcon />,
                        title: getLanguageItem("Redeem_codes"),
                        href: "/account/redeem-codes"
                    },
                    {
                        icon: <UserPlusIcon />,
                        title: getLanguageItem("Invite_friends"),
                        href: "/account/invite-friends"
                    },
                    {
                        isSeparator: true
                    },
                    {
                        icon: <LogOutIcon />,
                        title: getLanguageItem("Log_out"),
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
                    <h1 className="ml-[10px] whitespace-pre font-bold mr-[50px] hidden md:block">{getLanguageItem("Find_Official_Tickets")}</h1>
                </Link>

                <div className="md:flex flex-1 hidden">
                    <TicketSelect />

                    <div className="ml-auto flex gap-[14px]">
                        {userButton}
                        <Button size="icon" variant="secondary">
                            <DollarIcon />
                        </Button>
                        <Button size="icon" variant="secondary">
                            <EnglishFlagIcon />
                        </Button>
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
