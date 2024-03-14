import { MdInfoOutline } from "react-icons/md";
import Message, { MessageProps } from '.';
import { cn } from '../../lib/utils';


export default function WarningMessage({ icon = <MdInfoOutline className="text-[#C27803]" />, className, ...props }: MessageProps) {
    return (
        <Message
            icon={icon}
            className={cn('bg-yellow-50', className)}
            textClassName='text-[#C27803]'
            {...props}
        />
    )
}
