import * as React from "react"
const ChevronRight = ({ color = "#6B7280" }: { color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6.75 13.5 4.5-4.5-4.5-4.5"
        />
    </svg>
)
export default ChevronRight
