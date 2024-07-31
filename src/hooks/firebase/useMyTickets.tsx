import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyTickets } from '../../lib/ticket';
import useAuth from '../../stores/useAuth';
import useLanguage from '../../stores/useLanguage';
import { MyTicketSchemaType } from '../../schemas/my-ticket';

export default function useMyTickets() {
    const [tickets, setTickets] = useState<MyTicketSchemaType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { getItem } = useLanguage()
    const { user } = useAuth()


    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (user?.uid) {
                    const docSnapshot = await getMyTickets() as any

                    if (isMounted && docSnapshot) {
                        setTickets(docSnapshot)
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error(getItem('Something_went_wrong_please_try_again_or_contact_us'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [user?.uid, getItem]);


    return { isLoading, tickets } as const
}
