import MinusCircle from '../assets/images/svgs/icons/minus-circle'
import PlusCircle from '../assets/images/svgs/icons/plus-circle'
import { cn } from '../lib/utils'

type counterProps = {
    decrease: (value: number) => void,
    increase: (value: number) => void,
    value: number,
    minified?: boolean
    min?: number
}

export default function Counter({ decrease, increase, value, min = 0, minified = false }: counterProps) {

    const handleIncreaase = () => {
        increase(value + 1)
    }

    const handleDicrease = () => {
        value > min && decrease(value - 1)
    }

    let content = (
        <>
            <div className='flex flex-col'>
                <div className='cursor-pointer' onClick={handleIncreaase}>
                    <PlusCircle />
                </div>
                <div className='cursor-pointer' onClick={handleDicrease}>
                    <MinusCircle />
                </div>
            </div>
            <h2 className='w-5 text-center'>
                {value}
            </h2>
        </>
    )

    if (!minified) {
        content = (
            <>
                <div className='cursor-pointer' onClick={handleDicrease}>
                    <MinusCircle />
                </div>
                <h2 className='w-5 text-center'>
                    {value}
                </h2>
                <div className='cursor-pointer' onClick={handleIncreaase}>
                    <PlusCircle />
                </div>
            </>
        )
    }

    return (
        <div className={cn('ml-auto flex items-center', minified ? "gap-1" : "gap-2")}>
            {content}
        </div>
    )
}
