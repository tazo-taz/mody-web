import * as React from "react"
const IdNumberIcon = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <rect
            width={22}
            height={16}
            x={1}
            y={4}
            stroke="#111928"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.4}
            rx={3.5}
        />
        <path
            stroke="#111928"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M11 15.438c0-.611 0-.916-.075-1.165a1.75 1.75 0 0 0-1.167-1.166c-.248-.076-.554-.076-1.164-.076H6.406c-.61 0-.916 0-1.164.076a1.75 1.75 0 0 0-1.167 1.166C4 14.522 4 14.827 4 15.438M9.469 9.53a1.969 1.969 0 1 1-3.938 0 1.969 1.969 0 0 1 3.938 0Z"
        />
        <rect width={6} height={1} x={14} y={8} fill="#111928" rx={0.5} />
        <rect width={6} height={1} x={14} y={11} fill="#111928" rx={0.5} />
        <rect width={6} height={1} x={14} y={14} fill="#111928" rx={0.5} />
    </svg>
)
export default IdNumberIcon
