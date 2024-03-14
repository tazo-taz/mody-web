import { IoCheckmarkOutline } from "react-icons/io5";
import Message, { MessageProps } from '.';
import { cn } from '../../lib/utils';

export default function SuccessMessage({ icon = <IoCheckmarkOutline className='text-[#0E9F6E]' />, className, ...props }: MessageProps) {
    return (
        <Message
            className={cn("bg-[#F3FAF7]", className)}
            textClassName='text-[#0E9F6E]'
            icon={icon}
            {...props}
        />
    )
}
