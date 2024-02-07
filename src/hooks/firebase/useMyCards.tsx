import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase';
import useAuth from '../../stores/useAuth';
import useLanguage from '../../stores/useLanguage';

export type busDatesType = Record<string, string[]>[]

export default function useMyCards() {
    const [cards, setCards] = useState<busDatesType>([])
    const [isLoading, setIsLoading] = useState(true)
    const { getItem } = useLanguage()
    const { user } = useAuth()


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.uid) {
                    console.log(user.uid, "xx");

                    const paymentDocRef = doc(db, "payment-management", user.uid);
                    const paymentDocSnapshot = await getDoc(paymentDocRef);

                    if (paymentDocSnapshot.exists()) {
                        // Document found, you can access its data using paymentDocSnapshot.data()
                        const paymentData = paymentDocSnapshot.data();
                        console.log("Found payment document:", paymentData);
                    } else {
                        console.log("Document with ID", "not found.");
                    }
                }
            } catch (error) {
                toast.error(getItem('Something_went_wrong_please_try_again'))
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [user?.uid, getItem])

    return { isLoading, cards } as const
}
