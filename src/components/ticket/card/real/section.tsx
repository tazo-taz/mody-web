import { cn } from "../../../../lib/utils"
import useLanguage from "../../../../stores/useLanguage"

type RealTicketsSectionProps = {
    className?: string,
    type?: "OUTBOUND" | "RETURN",
    // items
}

export default function RealTicketsSection({ className, type = "OUTBOUND" }: RealTicketsSectionProps) {
    const { getItem } = useLanguage()
    return (
        <div className={className}>
            <h2 className={cn(
                "text-lg font-semibold mb-6",
                type === "OUTBOUND" ? "text-[#0E9F6E]" : "text-[#C27803]"
            )}>{getItem(type)}</h2>


        </div>
    )
}
