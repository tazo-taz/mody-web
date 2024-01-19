import React from 'react'
import { getLanguageItem } from '../../assets/language'

import BusLg from '../../assets/images/services/bus/bus-lg.svg'
import TrainLg from '../../assets/images/services/train/train-lg.svg'
import MinibusLg from '../../assets/images/services/minibus/minibus-lg.svg'
import PlaneLg from '../../assets/images/services/plane/plane-lg.svg'
import CarLg from '../../assets/images/services/car/car-lg.svg'

import BusMd from '../../assets/images/services/bus/bus-md.svg'
import TrainMd from '../../assets/images/services/train/train-md.svg'
import MinibusMd from '../../assets/images/services/minibus/minibus-md.svg'
import PlaneMd from '../../assets/images/services/plane/plane-md.svg'
import CarMd from '../../assets/images/services/car/car-md.svg'
import { useWindowSize } from 'usehooks-ts'


const busses = [BusLg, BusMd]
const trains = [TrainLg, TrainMd]
const minibusses = [MinibusLg, MinibusMd]
const planes = [PlaneLg, PlaneMd]
const cars = [CarLg, CarMd]

export default function Services() {

    const { width } = useWindowSize()

    let index = 0

    if (width < 767) index = 1

    const services = [
        {
            title: getLanguageItem("Bus"),
            icon: <img src={busses[index]} alt='' />
        },
        {
            title: getLanguageItem("Train"),
            icon: <img src={trains[index]} alt='' />
        },
        {
            title: getLanguageItem("Minibus"),
            icon: <img src={minibusses[index]} alt='' />
        },
        {
            title: getLanguageItem("Fly"),
            icon: <img src={planes[index]} alt='' />
        },
        {
            title: getLanguageItem("Car_Rent"),
            icon: <img src={cars[index]} alt='' />
        },
    ]

    return (
        <div className='grid grid-cols-2 gap-8'>
            {services.map((service, inx) => (
                <div key={inx} className='bg-gray-100 rounded-primary flex items-center justify-center flex-col gap-2 md:gap-5 cursor-pointer'>
                    <div className='-mt-6'>
                        {service.icon}
                    </div>
                    <p className='text-xl font-semibold'>{service.title}</p>
                </div>
            ))}
        </div>
    )
}
