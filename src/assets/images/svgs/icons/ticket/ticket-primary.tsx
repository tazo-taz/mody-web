import * as React from "react"

const TicketPrimaryIcon = ({ color }: { color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
    >
        <path
            stroke={color || "#7D57FD"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M6.666 5.333v-.666m0 3.666v-.666m0 3.666v-.666m-3.2-8h9.067c.747 0 1.12 0 1.405.145.251.128.455.332.583.583.145.285.145.658.145 1.405v.867a2.333 2.333 0 0 0 0 4.666v.867c0 .747 0 1.12-.145 1.405-.128.251-.332.455-.583.583-.285.145-.658.145-1.405.145H3.466c-.746 0-1.12 0-1.405-.145a1.333 1.333 0 0 1-.583-.583c-.145-.285-.145-.658-.145-1.405v-.867a2.333 2.333 0 1 0 0-4.666V4.8c0-.747 0-1.12.145-1.405.128-.251.332-.455.583-.583.285-.145.659-.145 1.405-.145Z"
        />
    </svg>
)
export default TicketPrimaryIcon
