import { Box } from "@chakra-ui/react";

const CircleSpinnerIcon = () => {
    return (
        <Box
            zIndex={100}
            background={"rgba(0,0,0,0.5)"}
            position={"fixed"}
            top={"50%"}
            left={"50%"}
            height={"100vh"}
            width={"100vw"}
            transform={"translate(-50%, -50%)"}
        >
            <Box
                position={"fixed"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 -10 64 64"
                    fill="none"
                    className={"rotate-clockwise"}
                >
                    <g filter="url(#filter0_d_499_202)">
                        <path
                            d="M53 24C53 26.7578 52.4568 29.4885 51.4015 32.0364C50.3461 34.5842 48.7993 36.8992 46.8492 38.8492C44.8992 40.7993 42.5842 42.3461 40.0364 43.4015C37.4885 44.4568 34.7578 45 32 45C29.2422 45 26.5115 44.4568 23.9636 43.4015C21.4158 42.3461 19.1008 40.7993 17.1508 38.8492C15.2007 36.8992 13.6539 34.5842 12.5985 32.0364C11.5432 29.4885 11 26.7578 11 24"
                            stroke="#2D2D2D"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </g>

                    <defs>
                        <filter
                            id="filter0_d_499_202"
                            x="0.8"
                            y="-7.2"
                            width="62.4"
                            height="62.4"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="3.6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_499_202"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_499_202"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 -10 64 64"
                    fill="none"
                    className={"rotate-counter-clockwise"}
                >
                    <g filter="url(#filter0_d_499_202)">
                        <path
                            d="M22 24C22 22.6868 22.2587 21.3864 22.7612 20.1732C23.2638 18.9599 24.0003 17.8575 24.9289 16.9289C25.8575 16.0003 26.9599 15.2638 28.1732 14.7612C29.3864 14.2587 30.6868 14 32 14C33.3132 14 34.6136 14.2587 35.8268 14.7612C37.0401 15.2638 38.1425 16.0003 39.0711 16.9289C39.9997 17.8575 40.7362 18.9599 41.2388 20.1732C41.7413 21.3864 42 22.6868 42 24"
                            stroke="#D9D9D9"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_499_202"
                            x="0.8"
                            y="-7.2"
                            width="62.4"
                            height="62.4"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="3.6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_499_202"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_499_202"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            </Box>
        </Box>
    );
};

export default CircleSpinnerIcon;
