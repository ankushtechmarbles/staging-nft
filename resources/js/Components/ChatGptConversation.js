import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import RightArrowIcon from "../SVGs/RightArrowIcon";
import React, { useState } from "react";

const ChatGptConversation = ({ sendMessage, chatgptLoading }) => {
    const [question, setQuestion] = useState("");

    return (
        <InputGroup
            marginTop={"1rem"}
            height={"40px"}
            w={"65%"}
            borderRadius={"26px"}
            bg={"#fff"}
            boxShadow={"0px 0px 15.7px 0px rgba(255, 255, 255, 0.39)"}
        >
            <Input
                px={5}
                py={3}
                variant={"unstyled"}
                value={question}
                onKeyDown={(e) => {
                    // check for enter press
                    if (e.key === "Enter" && !chatgptLoading) {
                        setQuestion("");
                        sendMessage(question);
                    }
                }}
                onChange={(e) => {
                    setQuestion(e.target.value);
                }}
            />
            <InputRightElement
                p={2}
                opacity={chatgptLoading ? 0.5 : 1}
                _hover={{ cursor: chatgptLoading ? "not-allowed" : "pointer" }}
                onClick={() => {
                    if (!chatgptLoading) {
                        setQuestion("");
                        sendMessage(question);
                    }
                }}
            >
                <RightArrowIcon />
            </InputRightElement>
        </InputGroup>
    );
};

export default ChatGptConversation;
