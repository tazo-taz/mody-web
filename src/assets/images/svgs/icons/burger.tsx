import * as React from "react"
const BurgerIcon = (props: any) => (
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
            d="M2.75 11h16.5M2.75 5.5h16.5m-16.5 11h16.5"
        />
    </svg>
)
export default BurgerIcon
