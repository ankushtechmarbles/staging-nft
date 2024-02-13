import { Flex, Box, HStack, Divider, Heading } from "@chakra-ui/react";
import React from "react";
import StackIcon from "../../SVGs/StackIcon";
import CheckoutIcon from "../../SVGs/CheckoutIcon";
import ProfileIcon from "../../SVGs/ProfileIcon";
import UserTokens from "../../Components/UserTokens";
import ColorModeButton from "../../Components/ColorModeButton";
import { useAppContext } from "../../Context/AppContext";

const headerMenus = {
    CHARACTER_CREATION: {
        icon: ProfileIcon,
        alt: "Avatar Creation",
        header: "Character Creation",
    },
    IDEA_CREATOR: {
        icon: StackIcon,
        alt: "Idea Creator",
        header: "Idea Creator",
    },
    CHECKOUT: {
        icon: CheckoutIcon,
        alt: "Checkout",
        header: "Checkout",
    },
};

const getHeaderMenus = (menu) => {
    const header = headerMenus[menu];

    return (
        <HStack>
            <header.icon />
            <Heading
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={"white"}
            >
                {header.header}
            </Heading>
        </HStack>
    );
};

const Header = () => {
    const { creationMenu } = useAppContext();

    return (
        <Flex
            zIndex={20}
            paddingTop={"2rem"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
        >
            <Box
                background={"rgba(0,0,0,0.59)"}
                borderRadius={"0 20px 20px 0"}
                px={24}
                py={5}
                backdropFilter={
                    "drop-shadow(0px 0px 7.5px rgba(0, 0, 0, 0.44))"
                }
            >
                {getHeaderMenus(creationMenu)}
            </Box>
            <HStack
                spacing={2}
                marginRight={10}
                background={"rgba(0,0,0,0.59)"}
                backdropFilter={
                    "drop-shadow(0px 0px 7.5px rgba(0, 0, 0, 0.44))"
                }
                borderRadius={8}
                px={7}
                py={2}
            >
                <ColorModeButton />
                <Divider
                    h={10}
                    color={"white"}
                    bg={"white"}
                    borderColor={"white"}
                    orientation={"vertical"}
                />
                <UserTokens />
            </HStack>
        </Flex>
    );
};

export default Header;
