import React from "react";

const LeftChevronIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
        >
            <g filter="url(#filter0_d_499_679)">
                <path
                    d="M9 16.7321C7.66667 15.9623 7.66667 14.0377 9 13.2679L18 8.0718C19.3333 7.302 21 8.26425 21 9.80385L21 20.1962C21 21.7358 19.3333 22.698 18 21.9282L9 16.7321Z"
                    fill="white"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_499_679"
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
                        result="effect1_dropShadow_499_679"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_499_679"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default LeftChevronIcon;
