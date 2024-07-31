import { AnimatePresence, motion } from "framer-motion"
import { IoBusOutline, IoChevronDownOutline } from "react-icons/io5"
import busImg from "../../../../../assets/images/georgiabusapi.png"
import RouteIcon from "../../../../../assets/images/svgs/icons/route"
import UserXsIcon from "../../../../../assets/images/svgs/icons/user/user-xs"
import OutboundSvg from '../../../../../assets/images/svgs/outbound'
import ReturnSvg from '../../../../../assets/images/svgs/return'
import useOpen from "../../../../../hooks/useOpen"
import { extractTimesFromBusSystemRoute, timeFromTo } from '../../../../../lib/date'
import { getStationByCity } from "../../../../../lib/ticket"
import useLanguage from "../../../../../stores/useLanguage"
import Badge from "../../../../badge"
import { TimeDiff } from "../../components/dash"
import MinifyDate from "../../../minify-date"
import { ticketChooseType } from "../type"

type TicketMiniCardType = ticketChooseType & {
    type: "outbound" | "return",
    passengersCount: number
}

export default function TicketMiniCardPurchased({ metadata, cityFrom, cityTo, date, id, type, passengersCount }: TicketMiniCardType) {
    const { isOpen, toggle } = useOpen()

    const typeSvg = type === "outbound" ? <OutboundSvg /> : <ReturnSvg />

    let timeFrom: string = "";
    let timeTo: string = "";
    let timeDiff: number = 0;
    let stationFrom: null | string = ""
    let stationTo: null | string = ""

    if ("busSystem" in metadata) {
        const { timeDiff: _timeDiff, timeFrom: _timeFrom, timeTo: _timeTo } = extractTimesFromBusSystemRoute(metadata)
        timeFrom = _timeFrom
        timeTo = _timeTo
        timeDiff = _timeDiff
        stationFrom = `${metadata.point_from}, ${metadata.station_from}`
        stationTo = `${metadata.point_to}, ${metadata.station_to}`
    } else if ("georgianbus" in metadata && metadata.busDirection) {
        const { timeFrom: _timeFrom, timeTo: _timeTo } = timeFromTo(date, metadata.busDirection?.timeDiff)
        timeFrom = _timeFrom
        timeTo = _timeTo
        timeDiff = metadata.busDirection?.timeDiff
        stationFrom = getStationByCity(cityFrom)
        stationTo = getStationByCity(cityTo)
    }

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
                <MinifyDate date={date} timeDiff={timeDiff} className='text-sm font-semibold' />
                <p className="text-[#6B7280] text-xs mt-1">{stationFrom} - {stationTo}</p>
            </div>
            <div className="flex gap-3.5 mt-3.5">
                <Badge variant="secondary" size="sm">
                    <UserXsIcon />
                    {passengersCount}
                </Badge>
                <Badge variant="secondary" size="sm">
                    <RouteIcon />
                    {getItem("One_way")}
                </Badge>
                <Badge variant="secondary" size="sm" onClick={() => toggle()}>
                    {getItem("Details")}
                    <IoChevronDownOutline className="h-4 w-4" />
                </Badge>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col"
                    >
                        <div className="flex gap-3.5 items-center pt-4">
                            <div className="bg-[#F9FAFB] p-2.5 rounded-full">
                                <IoBusOutline className="w-5 h-5" />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="text-[13px] font-semibold">{stationFrom}</h3>
                                <h5 className="text-[11px] text-[#6B7280]">{timeFrom}</h5>
                            </div>

                            <div className="ml-auto">
                                <TimeDiff timeDiff={timeDiff} />
                            </div>
                        </div>

                        <div className="my-1">
                            <div className="flex flex-col w-10 items-center justify-center gap-1.5">
                                <div className='w-[2px] h-1.5 bg-[#E5E7EB]' />
                                <div className='w-[2px] h-1.5 bg-[#E5E7EB]' />
                                <div className='w-[2px] h-1.5 bg-[#E5E7EB]' />
                            </div>
                        </div>

                        <div className="flex gap-3.5 items-center">
                            <div className="bg-[#F9FAFB] p-2.5 rounded-full">
                                <IoBusOutline className="w-5 h-5" />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="text-[13px] font-semibold">{stationTo}</h3>
                                <h5 className="text-[11px] text-[#6B7280]">{timeTo}</h5>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
