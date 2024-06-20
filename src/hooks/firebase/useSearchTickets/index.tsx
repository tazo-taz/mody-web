import { useLayoutEffect, useState } from 'react';
import { functions } from '../../../firebase';
import { busDirectionType, getBusDirectionByCities, getBysSystemCityValueByName, getCityValueByName } from '../../../lib/ticket';
import { busDatesType, busSystemDatesType } from './types';

export default function useSearchTickets(from?: string, to?: string, fullDate?: string | Date) {
    const [busDates, setBusDates] = useState<busDatesType>([])
    const [busSystemDates, setBusSystemDates] = useState<busSystemDatesType[]>([])
    const [busDirection, setBusDirection] = useState<busDirectionType>(null)
    const [isBusDatesLoading, setIsBusDatesLoading] = useState(true)
    const [isBusSystemDatesLoading, setIsBusSystemDatesLoading] = useState(true)

    const fromValue = getCityValueByName(from)
    const toValue = getCityValueByName(to)

    useLayoutEffect(() => {
        const fetchData = async () => {
            if (!fromValue || !toValue) return setIsBusDatesLoading(false)
            const busDirection = getBusDirectionByCities(fromValue, toValue)

            if (busDirection) {
                const res = await functions("getBusDates", { busDirectionId: busDirection.id })

                const dates = res.data?.data?.flights

                if (dates) {
                    setBusDirection(busDirection)
                    setBusDates(dates)
                }
            }
            setIsBusDatesLoading(false)
        }

        setIsBusDatesLoading(true)
        fetchData()
    }, [fromValue, toValue])

    const date = fullDate instanceof Date ? fullDate.toISOString().split('T')[0] : fullDate

    useLayoutEffect(() => {
        const fetchData = async () => {
            if (!fromValue || !toValue || !date) return setIsBusSystemDatesLoading(false)
            const idFrom = getBysSystemCityValueByName(fromValue);
            const idTo = getBysSystemCityValueByName(toValue);

            const res = await functions("searchTripsBusSystem", {
                idFrom,
                idTo,
                date
            })

            setBusSystemDates(res.data.result ? res.data.data : [])
            setIsBusSystemDatesLoading(false)
        }

        setIsBusSystemDatesLoading(true)
        fetchData()
    }, [fromValue, toValue, date])

    return { isLoading: isBusDatesLoading || isBusSystemDatesLoading, busDates, busDirection, busSystemDates } as const
}
