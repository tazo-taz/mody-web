import { useEffect, useState } from 'react';
import { functions } from '../../firebase';
import { busDirectionType, getBusDirectionByCities } from '../../lib/ticket';

export type busDatesType = Record<string, string[]>[]

export default function useSearchTickets(from?: string, to?: string) {
    const [busDates, setBusDates] = useState<busDatesType>([])
    const [busDirection, setBusDirection] = useState<busDirectionType>(null)
    const [isLoading, setIsLoading] = useState(true)

    console.log(from, to, 22);


    useEffect(() => {
        const fetchData = async () => {
            if (!from || !to) return setIsLoading(false)
            const busDirection = getBusDirectionByCities(from, to)

            if (busDirection) {
                const res = await functions("getBusDates", { busDirectionId: busDirection.id })
                const dates = res.data?.data?.flights

                if (dates) {
                    setBusDirection(busDirection)
                    setBusDates(dates)
                }
            }
            setIsLoading(false)
        }
        fetchData()
    }, [from, to])

    return { isLoading, busDates, busDirection } as const
}
