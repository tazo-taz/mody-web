import React from 'react'
import { getLanguageItem } from '../../assets/language'
import BusLg from '../../assets/images/services/bus/bus-lg.svg'
import TrainLg from '../../assets/images/services/train/train-lg.svg'
import MinibusLg from '../../assets/images/services/minibus/minibus-lg.svg'
import PlaneLg from '../../assets/images/services/plane/plane-lg.svg'
import CarLg from '../../assets/images/services/car/car-lg.svg'

const services = [
    {
        title: getLanguageItem("Bus"),
        icon: <img src={BusLg} alt='' />
    },
    {
        title: getLanguageItem("Train"),
        icon: <img src={TrainLg} alt='' />
    },
    {
        title: getLanguageItem("Minibus"),
        icon: <img src={MinibusLg} alt='' />
    },
    {
        title: getLanguageItem("Fly"),
        icon: <img src={PlaneLg} alt='' />
    },
    {
        title: getLanguageItem("Car_Rent"),
        icon: <img src={CarLg} alt='' />
    },
]

export default function Services() {
    return (
        <div className='grid grid-cols-2 gap-8'>
            {services.map((service, inx) => (
                <div key={inx} className='bg-gray-100 rounded-primary flex items-center justify-center flex-col gap-5 cursor-pointer'>
                    <div className='-mt-6'>
                        {service.icon}
                    </div>
                    <p className='text-xl font-semibold'>{service.title}</p>
                </div>
            ))}
        </div>
    )
}
