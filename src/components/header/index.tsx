import { Link } from "react-router-dom";
import DollarIcon from "../../assets/images/svgs/icons/dollar-icon";
import EnglishFlagIcon from "../../assets/images/svgs/icons/english-flag-icon";
import ModyLogoPurple from "../../assets/images/svgs/logo/mody-logo-purple";
import { getLanguageItem } from "../../assets/language";
import Button from "../fields/button";
import TicketSelect from "./ticket-select";
import BurgerIcon from "../../assets/images/svgs/icons/burger";
import useOpen from "../../hooks/useOpen";
import XIcon from "../../assets/images/svgs/icons/x";
import MobileMenu from "./mobile-menu/mobile-menu";

export default function Header() {
    const { isOpen, toggle } = useOpen()
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
                        <Button>
                            Log In
                        </Button>
                        <Button icon variant="secondary">
                            <DollarIcon />
                        </Button>
                        <Button icon variant="secondary">
                            <EnglishFlagIcon />
                        </Button>
                    </div>
                </div>

                <div className="block md:hidden ml-auto">
                    <Button icon={true} variant="secondary" onClick={toggle}>
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
