import { Grid, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import AssetsMenu from "../../../Components/AssetsMenu";
import { useAppContext } from "../../../Context/AppContext";
import { apperanceMenus, outfitMenus } from "../../../Utils/constants";
import List from "../../../Components/List";
import AvatarConfigurator from "../../../Components/AvatarConfigurator";
import BaseScene from "../../../Components/BaseScene";
import React from "react";

const Creator = () => {
    const { dispatch, avatarMenu } = useAppContext();

    const menuClickHandler = (title) => {
        dispatch({ type: "SET_AVATAR_MENU", payload: title });
    };

    return (
        <SimpleGrid columns={3} w={"full"} height={"full"}>
            <Stack py={4} px={10} spacing={3}>
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
            <BaseScene>
                <AvatarConfigurator />
            </BaseScene>
            <AssetsMenu />
        </SimpleGrid>
    );
};

export default Creator;
