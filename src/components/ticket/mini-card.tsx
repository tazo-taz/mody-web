import busImg from "../../assets/images/georgiabusapi.png"
import ChevronDown from "../../assets/images/svgs/icons/chevron/chevron-down"
import RouteIcon from "../../assets/images/svgs/icons/route"
import UserXsIcon from "../../assets/images/svgs/icons/user/user-xs"
import OutboundSvg from '../../assets/images/svgs/outbound'
import ReturnSvg from '../../assets/images/svgs/return'
import { timeFromTo } from '../../lib/date'
import { getStationByCity } from "../../lib/ticket"
import useLanguage from "../../stores/useLanguage"
import Badge from "../badge"
import { ticketChooseType } from './card'
import { IoChevronDownOutline } from "react-icons/io5";

type TicketMiniCardType = ticketChooseType & {
    type: "outbound" | "return"
}

export default function TicketMiniCard({ busDirection, cityFrom, cityTo, date, id, type }: TicketMiniCardType) {
    const typeSvg = type === "outbound" ? <OutboundSvg /> : <ReturnSvg />

    const { minifiedDate, timeFrom, timeTo } = timeFromTo(date, busDirection?.timeDiff)
    const stationFrom = getStationByCity(cityFrom)
    const stationTo = getStationByCity(cityTo)
    const { getItem } = useLanguage()

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-start'>
                {typeSvg}

                <div className='flex items-center gap-2'>
                    <img src={busImg} alt='logo' className="h-8" />
                    <h6 className='text-[#6B7280] text-xs w-11 whitespace-nowrap'>#{id}</h6>
                </div>
            </div>

            <div>
                <h3 className='text-sm font-semibold'>{minifiedDate} {timeFrom} - {timeTo}</h3>
                <p className="text-[#6B7280] text-xs mt-1">{stationFrom} - {stationTo}</p>
            </div>

            <div className="flex gap-3.5 mt-3.5">
                <Badge variant="secondary" size="sm" className="">
                    <UserXsIcon />
                    1
                </Badge>
                <Badge variant="secondary" size="sm" className="">
                    <RouteIcon />
                    {getItem("One_way")}
                </Badge>
                <Badge variant="secondary" size="sm" className="">
                    {getItem("Details")}
                    <IoChevronDownOutline className="h-4 w-4" />
                </Badge>
            </div>
        </div>
    )
}
