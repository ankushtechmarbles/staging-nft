import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import ListItem from "../Components/ListItem";

const List = ({ title, array, selected, onClick }) => {
    return (
        <Stack w={"full"} justifyContent={"start"}>
            <Heading
                color={"white"}
                background={"rgba(0,0,0,0.75)"}
                fontWeight={"bold"}
                px={6}
                py={2}
                fontSize={"24px"}
                backdropFilter={"0px 0px 3.5px rgba(0, 0, 0, 0.80)"}
                w={title === "Appearance" ? "336px" : "273px"}
                borderRadius={"10px"}
            >
                {title}
            </Heading>
            {array.map((item) => {
                return (
                    <ListItem key={item} selected={selected} onClick={onClick}>
                        {item}
                    </ListItem>
                );
            })}
        </Stack>
    );
};

export default List;
