import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase';
import { cardsSchema, cardsSchemaType } from '../../schemas/card';
import useAuth from '../../stores/useAuth';
import useLanguage from '../../stores/useLanguage';

export default function useMyCards() {
    const [cards, setCards] = useState<cardsSchemaType>([])
    const [activeCard, setActiveCard] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { getItem } = useLanguage()
    const { user } = useAuth()

    const removeCard = (recId: string) =>
        setCards(cards => cards.filter((card) => card.recId !== recId))

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.uid) {
                    const docRef = doc(db, "payment-management", user.uid);
                    const docSnapshot = await getDoc(docRef);

                    if (docSnapshot.exists()) {
                        // Document found, you can access its data using paymentDocSnapshot.data()
                        const data = docSnapshot.data();
                        const parsedCards = cardsSchema.safeParse(data.cards)
                        if (parsedCards.success) {
                            setCards(parsedCards.data)
                            setActiveCard(data.selectedCardId)
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

    return { isLoading, activeCard, setActiveCard, cards, removeCard }
}
