import React from 'react'
import { cardSchemaType } from '../../schemas/card'
import MasterCardIcon from '../../assets/images/svgs/icons/mastercard'
import { FaRegTrashAlt } from "react-icons/fa";
import { cn, getCardName } from '../../lib/utils';
import { functions } from '../../firebase';
import { startLoading, stopLoading } from '../../references/loading';

type PaymentCardProps = cardSchemaType & {
    activeCard: string,
    onChooseCard?: (newCard: string) => void,
    onRemoveCard?: (newCard: string) => void
}

export default function PaymentCard({ activeCard, cardMask, onChooseCard, onRemoveCard, recId }: PaymentCardProps) {
    const chooseCard = async () => {
        try {
            startLoading()
            await functions("selectCard", { recId })
            onChooseCard?.(recId)
        } catch (error) {

        } finally {
            stopLoading()
        }
    }

    const removeCard = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        try {
            startLoading()
            e.stopPropagation()
            await functions("removeCard", { recId })
            onRemoveCard?.(recId)
        } catch (error) {
            console.log(error);
        } finally {
            stopLoading()
        }
    }

    return (
        <div
            className={cn('border-1 rounded-primary p-4 flex items-center cursor-pointer', activeCard === recId && "border-primary")}
            onClick={chooseCard}
        >
            <div className='w-[30px]'>
                <MasterCardIcon />
            </div>

            <p className='font-semibold text-sm ml-2'>{getCardName(cardMask)}</p>

            <FaRegTrashAlt
                onClick={removeCard}
                className='text-red-500 ml-auto'
            />
        </div>
    )
}
