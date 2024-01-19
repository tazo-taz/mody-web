import { Link } from "react-router-dom";
import DollarIcon from "../../assets/images/svgs/icons/dollar-icon";
import EnglishFlagIcon from "../../assets/images/svgs/icons/english-flag-icon";
import ModyLogoPurple from "../../assets/images/svgs/mody-logo-purple";
import { getLanguageItem } from "../../assets/language";
import Button from "../fields/button";
import TicketSelect from "./ticket-select";

export default function Header() {
    return (
        <div className="border-b-1 border-gray-200">
            <div className='container mx-auto py-[20px] flex items-center'>

                <Link to="/" className="flex">
                    <ModyLogoPurple />
                    <h1 className="ml-[10px] whitespace-pre font-bold mr-[50px]">{getLanguageItem("Find_Official_Tickets")}</h1>
                </Link>

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
        </div>
    )
}
