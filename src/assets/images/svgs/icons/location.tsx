const LocationIcon = (props: any) => (
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
            d="M11 11.917a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        />
        <path
            stroke="#111928"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 20.167c3.666-3.667 7.333-6.95 7.333-11a7.333 7.333 0 0 0-14.666 0c0 4.05 3.666 7.333 7.333 11Z"
        />
    </svg>
)
export default LocationIcon