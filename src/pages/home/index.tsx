import { getLanguageItem } from '../../assets/language'
import AppStore from '../../components/app-store'
import GooglePlay from '../../components/google-play'
import Services from './services'
import Slider from './slider'

export default function HomePage() {

    const [firstWord, ...rest] = getLanguageItem("Travel_That_Moves_You").split(" ")

    return (
        <div className='flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 container mx-auto'>
                <div className='flex flex-col gap-3 md:pr-14 border-t-1 md:border-t-0 md:border-r-1 border-gray-200 pb-[60px] pt-[50px] order-2 md:order-1'>
                    <Slider />

                    <h1 className='md:text-5xl text-3xl font-semibold mt-6'><span className='text-primary'>{firstWord}</span> {rest.join(" ")}</h1>
                    <p className='md:text-lg text-gray-500 max-w-[530px]'>{getLanguageItem("One_app_for_every_step_of_your_journey_travel_planning_has_never_been_easier")}</p>

                    <div className='flex gap-5 mt-2'>
                        <GooglePlay />
                        <AppStore />
                    </div>
                </div>
                <div className='md:pl-14 pb-[60px] pt-[50px] order-1 md:order-2'>
                    <h2 className='text-2xl font-bold mb-8'>{getLanguageItem("Our_Services")}</h2>

                    <Services />
                </div>
            </div>
            <div className='h-[1px] w-full bg-gray-200 mb-12' />
        </div>
    )
}
