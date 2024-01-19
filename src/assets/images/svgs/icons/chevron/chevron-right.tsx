import * as React from "react"
const ChevronRight = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        {...props}
    >
        <path
            stroke="#6B7280"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6.75 13.5 4.5-4.5-4.5-4.5"
        />
    </svg>
)
export default ChevronRight
