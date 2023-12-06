import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import ListItem from "../Components/ListItem";

const List = ({ title, array, selected, onClick }) => {
    return (
        <Stack w={"full"} justifyContent={"start"}>
            <Heading
                color={"white"}
                textAlign={"left"}
                w={"full"}
                background={"black"}
                fontWeight={"bold"}
                px={2}
                py={1}
                fontSize={"24px"}
                backdropFilter={"0px 0px 3.5px rgba(0, 0, 0, 0.80)"}
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
