const XCircleIcon = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke="#9CA3AF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m12.5 7.5-5 5m0-5 5 5m5.834-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default XCircleIcon
