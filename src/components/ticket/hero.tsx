import BusImg from "../../assets/images/bus.png"
import useLanguage from '../../stores/useLanguage'
import TicketSelectContent from '../header/ticket-select/content'
import TicketSearchHorizontal from './ticket-search-horizontal'

export default function TicketHero() {
    const { getItem } = useLanguage()

    return (
        <>
            <div className='container mx-auto h-[300px] md:h-[520px] rounded-primary relative'>
                <img src={BusImg} alt='hero' className='w-full h-full object-cover absolute inset-0 rounded-primary' />

                <div className='absolute top-7 md:top-16 lg:top-[140px] left-1/2 -translate-x-1/2 flex flex-col gap-2.5 text-center'>
                    <h1 className='text-white text-2xl md:text-4xl lg:text-[40px] xl:text-[50px] font-bold whitespace-nowrap'>{getItem("Search_buses_Tickets")}</h1>
                    <p className='text-[#E5E7EB] text-sm md:text-[16px] xl:text-lg min-w-[320px]'>{getItem("One_app_for_every_step_of_your_journey_travel_planning_has_never_been_easier")}</p>
                </div>

                <div className="absolute lg:bottom-[140px] bottom-16 left-3 right-3">
                    <TicketSearchHorizontal />
                </div>

            </div>
            <div className='container mx-auto block md:hidden'>
                <div className='bg-white flex flex-col gap-4 px-5 pb-5 pt-8 flex-1 -mt-36 shadow-md rounded-primary relative'><TicketSelectContent modalBottom={320} /></div>
            </div>
        </>
    )
}
