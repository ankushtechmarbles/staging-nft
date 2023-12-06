import { Button } from "@chakra-ui/react";
import React from "react";

const ListItem = ({ onClick, selected, children }) => {
    return (
        <Button
            _hover={{
                background: "transparent",
                fontWeight: "bold",
            }}
            variant={"ghost"}
            onClick={() => {
                onClick(children);
            }}
            fontSize={"24px"}
            color={"white"}
            textShadow={"0px 0px 3.5px rgba(0, 0, 0, 0.80)"}
            fontWeight={selected === children ? "bold" : "normal"}
            textDecor={selected === children ? "underline" : "none"}
        >
            {children}
        </Button>
    );
};

export default ListItem;
