import React from 'react'
import SuccessMessage from '../../../Messages/Success'
import useLanguage from '../../../../stores/useLanguage'
import WarningMessage from '../../../Messages/Warning'

type IsUpcomingProps = {
    date: Date | string | true
}
export default function IsUpcoming({ date }: IsUpcomingProps) {
    const { getItem } = useLanguage()

    const IsUpcomingDate = typeof date === "boolean" ? date : new Date().getTime() < new Date(date).getTime()

    if (!IsUpcomingDate)
        console.log(IsUpcomingDate, date);

    if (IsUpcomingDate) return (
        <SuccessMessage icon={null} text={getItem("UPCOMING")} size='sm' />
    )
    return (
        <WarningMessage icon={null} text={getItem("PAST")} size='sm' />
    )
}
