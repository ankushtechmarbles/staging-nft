import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import IdeaTokenIcon from "../SVGs/IdeaTokenIcon";

const UserTokens = () => {
    return (
        <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
            <IdeaTokenIcon />
            <Text color={"white"}>999999</Text>
        </Flex>
    );
};

export default UserTokens;
