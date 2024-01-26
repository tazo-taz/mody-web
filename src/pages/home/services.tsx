
import BusLg from '../../assets/images/services/bus/bus-lg.svg'
import CarLg from '../../assets/images/services/car/car-lg.svg'
import MinibusLg from '../../assets/images/services/minibus/minibus-lg.svg'
import PlaneLg from '../../assets/images/services/plane/plane-lg.svg'
import TrainLg from '../../assets/images/services/train/train-lg.svg'

import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'
import BusMd from '../../assets/images/services/bus/bus-md.svg'
import CarMd from '../../assets/images/services/car/car-md.svg'
import MinibusMd from '../../assets/images/services/minibus/minibus-md.svg'
import PlaneMd from '../../assets/images/services/plane/plane-md.svg'
import TrainMd from '../../assets/images/services/train/train-md.svg'
import Badge from '../../components/badge'
import useLanguage from '../../stores/useLanguage'


const busses = [BusLg, BusMd]
const trains = [TrainLg, TrainMd]
const minibusses = [MinibusLg, MinibusMd]
const planes = [PlaneLg, PlaneMd]
const cars = [CarLg, CarMd]

export default function Services() {
    const { getItem } = useLanguage()
    const navigate = useNavigate()

    const { width } = useWindowSize()

    let index = 0

    if (width < 767) index = 1

    const services = [
        {
            title: getItem("Bus"),
            icon: <img src={busses[index]} alt='' />,
            href: "/tickets/bus"
        },
        {
            title: getItem("Train"),
            icon: <img src={trains[index]} alt='' />,
        },
        {
            title: getItem("Minibus"),
            icon: <img src={minibusses[index]} alt='' />,
        },
        {
            title: getItem("Fly"),
            icon: <img src={planes[index]} alt='' />,
        },
        {
            title: getItem("Car_Rent"),
            icon: <img src={cars[index]} alt='' />,
        },
    ]

    return (
        <div className='grid grid-cols-2 gap-8'>
            {services.map((service, inx) => (
                <div
                    key={inx}
                    className='bg-gray-100 rounded-primary flex items-center justify-center flex-col gap-x-2 gap-y-3.5 md:gap-5 cursor-pointer relative pb-5 transition active:scale-95'
                    onClick={() => service.href && navigate(service.href)}
                >
                    <div className='-mt-6'>
                        {service.icon}
                    </div>
                    <p className='text-xl font-semibold'>{service.title}</p>
                    {!service.href && (
                        <Badge className='absolute bottom-0 translate-y-1/2' size='sm' title={getItem("Soon")} />
                    )}
                </div>
            )
            )}
        </div>
    )
}
