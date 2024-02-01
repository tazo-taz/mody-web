import { useState } from 'react';
import { ticketChooseType } from '../../../../components/ticket/card';
import TicketsSearchScreen from './search';
import toast from 'react-hot-toast';
import useLanguage from '../../../../stores/useLanguage';
import TicketDetailsScreen from './details';

export enum screenEnum {
    SEARCH,
    DETAILS,
    PAY
}

export default function BusTicketsSearchPage() {
    const [screen, setScreen] = useState<screenEnum>(screenEnum.SEARCH)

    const { getItem } = useLanguage()

    const [activeOutbound, setActiveOutbound] = useState<ticketChooseType | null>(null)
    const [activeReturn, setActiveReturn] = useState<ticketChooseType | null>(null)

    const searchToDetailsScreen = () => {

        if (activeOutbound && activeReturn) {
            setScreen(screenEnum.DETAILS)
        } else {
            toast.error(getItem("Choose_tickets"))
        }
    }


    if (screen === screenEnum.SEARCH) {
        return (
            <TicketsSearchScreen
                activeOutbound={activeOutbound}
                activeReturn={activeReturn}
                setActiveOutbound={setActiveOutbound}
                setActiveReturn={setActiveReturn}
                onContinue={searchToDetailsScreen}
            />
        )
    } else if (screen === screenEnum.DETAILS) {
        return (
            <TicketDetailsScreen
                setScreen={setScreen}
            />
        )
    }

    return null
}
