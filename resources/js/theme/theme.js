import { extendTheme } from "@chakra-ui/react";
import "@fontsource/barlow";

const theme = extendTheme({
    config: {
        inititialColorMode: "light",
        useSystemColorMode: false,
    },
    colors: {
        idea: {
            gray: "#C1C1C1",
            lightGray: "#A8A8A8",
            mediumGray: "#b6b6b6",
            darkGray: "#5F5F5F",
        },
    },
    fonts: {
        heading: `"Barlow", sans-serif`,
        body: `"Barlow", sans-serif`,
    },
    components: {
        Heading: {
            variants: {
                illuminated: {
                    fontSize: "44px",
                    textShadow: "0px 0px 6.3px rgba(255, 255, 255, 0.53)",
                },
            },
        },
        Button: {
            variants: {
                light: {
                    borderRadius: "9px",
                    border: "2px solid #A8A8A8",
                    filter: "blur(0.30000001192092896px)",
                    color: "#393939",
                    background: "#fff",
                },
                dark: {
                    borderRadius: "9px",
                    border: "2px solid #A8A8A8",
                    filter: "blur(0.30000001192092896px)",
                    background: "#B6B6B6",
                    color: "#E4E4E4;",
                },
                illuminated: {
                    border: "2px solid #B6B6B6",
                    borderRadius: "12px",
                    bg: "#fff",
                    boxShadow: "0px 0px 5.3px 4px rgba(255, 255, 255, 0.39)",
                    color: "black",
                    w: "200px",
                    height: "50px",
                },
            },
        },
    },
});

export default theme;

export const scrollBarTheme = (width, trackHeight) => {
    return {
        "::-webkit-scrollbar": {
            background: "#D9D9D9",
            borderRadius: 10,
            width: width ? width : "initial",
        },
        "::-webkit-scrollbar-track": {
            height: trackHeight ? trackHeight : "initial",
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            background: "#222",
        },
    };
};
