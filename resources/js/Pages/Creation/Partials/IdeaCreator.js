import { Flex } from "@chakra-ui/react";
import React from "react";
import IdeaCanvas from "../../../Components/IdeaCanvas";
import ChatGptConversation from "../../../Components/ChatGptConversation";

const IdeaCreator = () => {
    return (
        <Flex>
            <IdeaCanvas />
            <ChatGptConversation />
        </Flex>
    );
};

export default IdeaCreator;
