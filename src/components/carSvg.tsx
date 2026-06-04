interface CarSvgProps {
    color: string;
    size?: number;
}

export const CarSvg = ({color, size = 60}: CarSvgProps) => {
    return (
    <svg
        width={size}
        viewBox="0 0 100 40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        >
        <rect x="5" y="15" width="90" height="20" rx="4" fill={color} />

        <rect x="20" y="8" width="55" height="15" rx="4" fill={color} />

        <rect x="24" y="10" width="20" height="10" rx="2" fill="rgba(0,0,0,0.4)" />
        <rect x="48" y="10" width="20" height="10" rx="2" fill="rgba(0,0,0,0.4)" />

        <circle cx="25" cy="35" r="6" fill="#222" />
        <circle cx="25" cy="35" r="3" fill="#555" />
        <circle cx="75" cy="35" r="6" fill="#222" />
        <circle cx="75" cy="35" r="3" fill="#555" />
    </svg>
    )
};