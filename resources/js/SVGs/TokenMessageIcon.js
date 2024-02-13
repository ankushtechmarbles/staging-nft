import React from "react";

const TokenMessageIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="386"
            height="235"
            viewBox="0 0 386 235"
            fill="none"
        >
            <g filter="url(#filter0_d_499_507)">
                <path
                    d="M16 108.364C16 100.079 22.7157 93.3636 31 93.3636H186.114C190.485 93.3636 194.639 91.4566 197.489 88.1415L259.5 16L251.149 87.7859C250.803 90.7562 253.125 93.3636 256.115 93.3636H355C363.284 93.3636 370 100.079 370 108.364V204.5C370 212.784 363.284 219.5 355 219.5H31C22.7157 219.5 16 212.784 16 204.5V108.364Z"
                    fill="#D9D9D9"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_499_507"
                    x="0.6"
                    y="0.6"
                    width="384.8"
                    height="234.3"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="7.7" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.37 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_499_507"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_499_507"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default TokenMessageIcon;
