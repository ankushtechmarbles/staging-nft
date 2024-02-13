import { Flex } from "@chakra-ui/react";
import React from "react";
import useFlowiseHook from "../../../Hooks/useFlowise.hook";
import IdeaCanvas from "../../../Components/IdeaCanvas";
import ChatGptConversation from "../../../Components/ChatGptConversation";

const IdeaCreator = () => {
    const { sendMessage, chat, isLoading } = useFlowiseHook();

    return (
        <Flex
            px={32}
            py={5}
            pointerEvents={"all"}
            w={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"65vh"}
            flexDir={"column"}
            backdropFilter={"drop-shadow(2px 4px 6px black)"}
        >
            <IdeaCanvas chatData={chat} />
            <ChatGptConversation
                sendMessage={sendMessage}
                chatgptLoading={isLoading}
            />
        </Flex>
    );
};

export default IdeaCreator;
