import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import RightArrowIcon from "../SVGs/RightArrowIcon";
import React, { useState } from "react";

const ChatGptConversation = () => {
    const [question, setQuestion] = useState("");

    const askQuestion = () => {
        setQuestion("");
        console.log(question);
        // todo: axios call to backend
    };

    return (
        <InputGroup
            w={"75vw"}
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
                    if (e.key === "Enter") {
                        askQuestion();
                    }
                }}
                onChange={(e) => {
                    setQuestion(e.target.value);
                }}
            />
            <InputRightElement
                p={2}
                _hover={{ cursor: "pointer" }}
                onClick={askQuestion}
            >
                <RightArrowIcon />
            </InputRightElement>
        </InputGroup>
    );
};

export default ChatGptConversation;
