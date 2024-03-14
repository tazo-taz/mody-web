import React from 'react'
import useMyCards from '../../hooks/firebase/useMyCards'
import Button from '../fields/button';
import useLanguage from '../../stores/useLanguage';
import { IoMdAdd } from 'react-icons/io';
import { cn } from '../../lib/utils';
import { functions } from '../../firebase';
import { startLoading, stopLoading } from '../../references/loading';
import PaymentCard from './card';

type CardsFormProps = {
    className?: string
}

export default function CardsForm({ className }: CardsFormProps) {
    const { cards, activeCard, setActiveCard, removeCard } = useMyCards()
    const { getItem } = useLanguage()

    const addCard = async () => {
        try {
            startLoading()
            const res = await functions("InitiateVerification", { returnurl: `${window.location.origin}/account/payments` })
            if (res.data.result) {
                window.location.href = res.data.uri
            }
        } catch (error) {
            console.log(error);
        } finally {
            stopLoading()
        }

    }

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {cards.map((card) => (
                    <PaymentCard
                        activeCard={activeCard}
                        onChooseCard={setActiveCard}
                        onRemoveCard={removeCard}
                        {...card}
                        key={card.recId}
                    />
                ))}
            </div>

            <div>
                <Button
                    onClick={addCard}
                    fullrounded
                    variant='secondary'
                    icon={<IoMdAdd className='w-6 h-6 ' />}
                >
                    {getItem("Add_payment_method")}
                </Button>
            </div>
        </div>
    )
}
