import { Flex, Heading, Input, Stack } from "@chakra-ui/react";
import React from "react";
import ModalMessage from "../../../Components/ModalMessage";
import { useAppContext } from "../../../Context/AppContext";

const CharacterName = () => {
    const { character, dispatch } = useAppContext();

    return (
        <Flex
            justifyContent={"flex-end"}
            alignItems={"center"}
            paddingRight={"25rem"}
        >
            <Stack pointerEvents={"all"} spacing={5}>
                <Heading
                    fontSize={"4xl"}
                    color={"white"}
                    textTransform={"uppercase"}
                    fontWeight={"normal"}
                    textShadow={"0px 0px 5px #000"}
                >
                    Your Character's Name
                </Heading>
                <Input
                    color={"white"}
                    className={"form-control"}
                    boxShadow={"0px 0px 10.2px 3px rgba(255, 255, 255, 0.28)"}
                    placeholder={"Max 15 characters"}
                    value={character.name}
                    type={"text"}
                    max={15}
                    onChange={(e) => {
                        dispatch({
                            type: "SET_CHARACTER_NAME",
                            payload: e.target.value,
                        });
                    }}
                />
            </Stack>
        </Flex>
    );
};

export default CharacterName;
