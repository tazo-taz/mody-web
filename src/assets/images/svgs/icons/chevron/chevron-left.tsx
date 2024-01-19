import * as React from "react"
const ChevronLeft = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        fill="none"
        {...props}
    >
        <path
            stroke="#111928"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.75 16.5 8.25 11l5.5-5.5"
        />
    </svg>
)
export default ChevronLeft
