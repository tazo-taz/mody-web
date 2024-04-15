import { MdOutlinePending } from 'react-icons/md'
import useLanguage from '../../../../stores/useLanguage'

export default function Pending() {
    const { getItem } = useLanguage()
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#9f9d0e]">{getItem("Pending")}</span>
            <MdOutlinePending color="#9f9d0e" size={22} />
        </div>
    )
}
