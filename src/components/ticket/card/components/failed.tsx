import { MdOutlinePending } from 'react-icons/md'
import useLanguage from '../../../../stores/useLanguage'

export default function Failed() {
    const { getItem } = useLanguage()
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#9f0e0e]">{getItem("Failed")}</span>
            <MdOutlinePending color="#9f0e0e" size={22} />
        </div>
    )
}
