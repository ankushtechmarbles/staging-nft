import React from "react";
import CharacterName from "./Partials/CharacterName";
import Checkout from "./Partials/Checkout";
import Creator from "./Partials/Creator";
import IdeaCreator from "./Partials/IdeaCreator";
import Selfie from "./Partials/Selfie";
import { useAppContext } from "../../Context/AppContext";
import TokenReward from "../../Components/TokenReward";
import CreationLayout from "../../Layouts/CreationLayout";

const Index = () => {
    const { creationProgress } = useAppContext();

    return (
        <CreationLayout>
            <TokenReward />
            {creationProgress === 0 && <Selfie />}
            {creationProgress === 20 && <Creator />}
            {creationProgress === 40 && <CharacterName />}
            {creationProgress === 60 && <IdeaCreator />}
            {creationProgress === 80 && <Checkout />}
        </CreationLayout>
    );
};

export default Index;
