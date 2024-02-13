import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { scrollBarTheme } from "../theme/theme";

const IdeaCanvas = ({ chatData }) => {
    const chatBoxRef = useRef();

    useEffect(() => {
        if (chatBoxRef.current === null) return;
        // scroll to bottom of chat box
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [chatData]);

    return (
        <Stack
            ref={chatBoxRef}
            h={"100%"}
            flexDirection={"column"}
            style={{ direction: "rtl" }}
            overflowY={"scroll"}
            sx={scrollBarTheme()}
            w={"75%"}
            px={5}
            paddingBottom={10}
        >
            {chatData &&
                chatData.map((chat, index) => (
                    <ConversationBox
                        key={index}
                        username={chat.name}
                        message={chat.message}
                        iconColor={chat.isBot ? "blue" : "cyan"}
                    />
                ))}
        </Stack>
    );
};

const ConversationBox = ({ username, message, iconColor }) => {
    return (
        <Stack w={"100%"} flexDirection={"column"} style={{ direction: "ltr" }}>
            <Flex
                justifyContent={
                    iconColor === "blue" ? "flex-start" : "flex-end"
                }
                alignSelf={iconColor === "blue" ? "flex-start" : "self-end"}
                width={iconColor === "blue" ? "100%" : "min-content"}
                flexDirection={iconColor === "blue" ? "row" : "row-reverse"}
                alignItems={"center"}
                gap={5}
            >
                <Box
                    bg={iconColor}
                    borderRadius={"50%"}
                    h={"16px"}
                    width={"16px"}
                ></Box>
                <Heading
                    fontSize={"md"}
                    color={"white"}
                    textTransform={"uppercase"}
                >
                    {username}
                </Heading>
            </Flex>

            <Text
                color={"white"}
                textAlign={iconColor === "blue" ? "left" : "right"}
            >
                {message}
            </Text>
        </Stack>
    );
};

export default IdeaCanvas;
