import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CircleSpinnerIcon from "../../SVGs/CircleSpinnerIcon";
import ModalMessage from "../../Components/ModalMessage";
import AvatarConfigurator from "../../Components/AvatarConfigurator";
import BaseScene from "../../Components/BaseScene";
import { useReadyPlayerMe } from "../../Hooks/useReadyPlayerMe.hook";
import CharacterName from "./Partials/CharacterName";
import Checkout from "./Partials/Checkout";
import Creator from "./Partials/Creator";
import IdeaCreator from "./Partials/IdeaCreator";
import Selfie from "./Partials/Selfie";
import { useAppContext } from "../../Context/AppContext";
import TokenReward from "../../Components/TokenReward";
import CreationLayout from "../../Layouts/CreationLayout";

const Index = () => {
    const { creationProgress, loadingAvatar, character } = useAppContext();
    const { createAnonUser } = useReadyPlayerMe();

    useEffect(() => {
        createAnonUser();
    }, []);

    return (
        <CreationLayout>
            <TokenReward />
            {loadingAvatar && <CircleSpinnerIcon />}
            <BaseScene>
                <AvatarConfigurator />
            </BaseScene>
            <Box
                zIndex={creationProgress !== 60 && 1}
                pointerEvents={"none"}
                w={"full"}
            >
                {creationProgress === 0 && <Selfie />}
                {creationProgress === 20 && <Creator />}
                {creationProgress === 40 && <CharacterName />}
                {creationProgress === 60 && <IdeaCreator />}
                {creationProgress === 80 && <Checkout />}
            </Box>
            <ModalMessage />
        </CreationLayout>
    );
};

export default Index;
