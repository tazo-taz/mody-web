import { useEffect } from 'react';
import { functions } from '../firebase';

export default function useSearchTickets() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await functions("getBusDates", { busDirectionId: "2" })

            console.log(res.data);



        }

        fetchData()
    }, [])
}
