import React from 'react'
import Breadcrumbs from '../../../../components/breadcrumbs'
import { screenEnum } from '.'
import useLanguage from '../../../../stores/useLanguage'

type TicketDetailsScreenType = {
    setScreen: (screen: screenEnum) => void
}

export default function TicketDetailsScreen({ setScreen }: TicketDetailsScreenType) {
    const { getItem } = useLanguage()
    return (
        <>
            <div className='shadow-md z-[1] relative'>
                <Breadcrumbs
                    className='h-[90px] container mx-auto'
                    data={[
                        { id: screenEnum.SEARCH, title: getItem("Search") },
                        { id: screenEnum.DETAILS, title: getItem("Passenger_details") },
                        { id: screenEnum.PAY, title: getItem("Review_and_pay") },
                    ]}
                    active={screenEnum.DETAILS}
                    choose={(screen) => {
                        if (screen === screenEnum.PAY) { }
                        else setScreen(screen)
                    }}
                />
            </div>


        </>
    )
}
