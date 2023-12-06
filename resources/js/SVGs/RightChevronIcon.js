import React from "react";

const RightChevronIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
        >
            <g filter="url(#filter0_d_499_680)">
                <path
                    d="M20 16.7321C21.3333 15.9623 21.3333 14.0377 20 13.2679L11 8.0718C9.66667 7.302 8 8.26425 8 9.80385L8 20.1962C8 21.7358 9.66667 22.698 11 21.9282L20 16.7321Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_499_680"
                    x="0.3"
                    y="0.100781"
                    width="28.4"
                    height="29.7984"
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
                    <feGaussianBlur stdDeviation="3.85" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.63 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_499_680"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_499_680"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default RightChevronIcon;
