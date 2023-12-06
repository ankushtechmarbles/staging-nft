import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        inititialColorMode: "light",
        useSystemColorMode: false,
    },
    colors: {
        idea: {
            lightGray: "#A8A8A8",
            mediumGray: "#b6b6b6",
            darkGray: "#5F5F5F",
        },
    },
    fonts: {},
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
            base: {
                borderRadius: "9px",
                border: "2px solid #A8A8A8",
                opacity: 0.94,
                filter: "blur(0.30000001192092896px)",
                color: "#393939",
            },
            variants: {
                light: {
                    background: "#fff",
                },
                dark: {
                    background: "idea.mediumGray",
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
