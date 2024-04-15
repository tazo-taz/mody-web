import { formatTime, minifyDate, timeFromTo } from '../../lib/date'

type MinifyDateProps = {
    date: Date | string,
    className?: string
} & ({
    timeDiff: number
} | {
    timeFrom: string | Date,
    timeTo: string | Date,
})

export default function MinifyDate({ date, className, ...rest }: MinifyDateProps) {
    if ("timeDiff" in rest) {
        const { minifiedDate, timeFrom, timeTo } = timeFromTo(date, rest.timeDiff)
        return (
            <h3 className={className}>{minifiedDate} {timeFrom} - {timeTo}</h3>
        )
    }

    return <h3 className={className}>{minifyDate(date)} {formatTime(rest.timeFrom)} - {formatTime(rest.timeTo)}</h3>
}
