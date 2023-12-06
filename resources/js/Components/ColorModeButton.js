import { Stack, useColorMode } from "@chakra-ui/react";
import React from "react";

const ColorModeButton = () => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            alignItems={"center"}
            direction={"row"}
            ml={{ xs: 0, base: 6 }}
        >
            <input
                type="checkbox"
                className="toggle"
                onChange={(e) => {
                    toggleColorMode();
                }}
                checked={colorMode === "dark"}
            />
        </Stack>
    );
};

export default ColorModeButton;
