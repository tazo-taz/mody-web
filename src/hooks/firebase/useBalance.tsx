import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { db } from '../../firebase';
import useAuth from '../../stores/useAuth';
import useLanguage from '../../stores/useLanguage';

export default function useBalance() {
    const [balance, setBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { getItem } = useLanguage()
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.uid) {
                    const docRef = doc(db, "client-balance", user.uid);
                    const docSnapshot = await getDoc(docRef);

                    if (docSnapshot.exists()) {
                        // Document found, you can access its data using paymentDocSnapshot.data()
                        const data = docSnapshot.data();
                        const parsedBalance = z.object({ balance: z.coerce.number() }).safeParse(data)

                        if (parsedBalance.success) {
                            setBalance(parsedBalance.data.balance)
                        }
                    } else {
                    }
                }
            } catch (error) {
                toast.error(getItem('Something_went_wrong_please_try_again_or_contact_us'))
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [user?.uid, getItem])

    return { isLoading, balance }
}
