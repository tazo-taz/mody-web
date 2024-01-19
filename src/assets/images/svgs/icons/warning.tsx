const WarningIcon = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke="#C27803"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 13.333V10m0-3.333h.008M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default WarningIcon