import { Heading, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../../../Context/AppContext";

const CharacterName = () => {
    const { character, dispatch } = useAppContext();

    return (
        <Stack>
            <Heading fontWeight={"normal"}>Your Character's Name</Heading>
            <Input
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
    );
};

export default CharacterName;
