import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase';
import { ticketUsersSchema, ticketUsersSchemaType, } from '../../schemas/ticket/user';
import useAuth from '../../stores/useAuth';
import useLanguage from '../../stores/useLanguage';

export default function useTicketUsers() {
    const [users, setUsers] = useState<ticketUsersSchemaType>([])
    const [isLoading, setIsLoading] = useState(true)
    const { getItem } = useLanguage()
    const { user } = useAuth()


    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (user?.uid) {
                    const docRef = doc(db, "client-bus-tickets-users", user.uid);
                    const docSnapshot = await getDoc(docRef);

                    if (isMounted && docSnapshot.exists()) {
                        const data = docSnapshot.data();
                        const parsedData = ticketUsersSchema.parse(data?.items);
                        setUsers(parsedData)
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


    return { isLoading, users } as const
}
