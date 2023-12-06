import {
    Button,
    ButtonGroup,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import LeftChevronIcon from "../SVGs/LeftChevronIcon";
import RightChevronIcon from "../SVGs/RightChevronIcon";
import { usePagination } from "../Hooks/usePagination.hook";
import { useAppContext } from "../Context/AppContext";

const AssetsMenu = () => {
    const { avatarMenu } = useAppContext();
    const {
        nextPage,
        prevPage,
        currentItems,
        currentPage,
        maxPage,
        changePage,
    } = usePagination([], 20);

    const handleClick = () => {};

    return (
        <Stack>
            <Heading
                textShadow={"0px 0px 7.7px rgba(0, 0, 0, 0.63)"}
                color={"white"}
            >
                {avatarMenu}
            </Heading>
            <SimpleGrid></SimpleGrid>
            <ButtonGroup>
                <Button variant={"ghost"} onClick={prevPage}>
                    <LeftChevronIcon />
                </Button>
                <Text color={"white"} fontWeight={"bold"}>
                    {currentPage} / {maxPage}
                </Text>
                <Button variant={"ghost"} onClick={nextPage}>
                    <RightChevronIcon />
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default AssetsMenu;
