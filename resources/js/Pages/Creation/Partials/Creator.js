import { Flex, Stack } from "@chakra-ui/react";
import { useAvatarContext } from "../../../Context/AvatarContext";
import AssetsMenu from "../../../Components/AssetsMenu";
import { useAppContext } from "../../../Context/AppContext";
import { apperanceMenus, outfitMenus } from "../../../Utils/constants";
import List from "../../../Components/List";
import React from "react";

const Creator = () => {
    const { dispatch, avatarMenu } = useAppContext();
    const { fitToBox } = useAvatarContext();

    const menuClickHandler = (title) => {
        dispatch({ type: "SET_AVATAR_MENU", payload: title });
        fitToBox(title);
    };

    return (
        <Flex
            justifyContent={"space-between"}
            columns={3}
            w={"full"}
            height={"full"}
            px={10}
            pointerEvents={"none"}
        >
            <Stack py={4} px={10} spacing={3} pointerEvents={"all"}>
                <List
                    title={"Appearance"}
                    selected={avatarMenu}
                    array={apperanceMenus}
                    onClick={menuClickHandler}
                />
                <List
                    title={"Outfit"}
                    selected={avatarMenu}
                    array={outfitMenus}
                    onClick={menuClickHandler}
                />
            </Stack>
            <AssetsMenu />
        </Flex>
    );
};

export default Creator;
