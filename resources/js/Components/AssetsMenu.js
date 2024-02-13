import {
    Button,
    ButtonGroup,
    Heading,
    Image,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import ValueNoneIcon from "../SVGs/ValueNoneIcon";
import { useReadyPlayerMe } from "../Hooks/useReadyPlayerMe.hook";
import LeftChevronIcon from "../SVGs/LeftChevronIcon";
import RightChevronIcon from "../SVGs/RightChevronIcon";
import { usePagination } from "../Hooks/usePagination.hook";
import { useAppContext } from "../Context/AppContext";

const AssetsMenu = () => {
    const { avatarMenu, character } = useAppContext();
    const { equipAssetToCharacter } = useReadyPlayerMe();
    const { nextPage, prevPage, pagination, array, isLoading } = usePagination(
        avatarMenu,
        character?.gender,
        19,
    );

    return (
        <Stack>
            <Heading
                textShadow={"0px 0px 7.7px rgba(0, 0, 0, 0.63)"}
                color={"white"}
            >
                {avatarMenu}
            </Heading>
            <Skeleton
                isLoaded={!isLoading}
                borderRadius={"10px"}
                height={"min-content"}
                w={"100%"}
            >
                <SimpleGrid columns={5} pointerEvents={"all"}>
                    {array.map((item) => {
                        return (
                            <Button
                                padding={0}
                                margin={0}
                                variant={"ghost"}
                                width={24}
                                height={24}
                                key={item.id + item.name}
                                onClick={() => {
                                    equipAssetToCharacter(avatarMenu, item.id);
                                }}
                            >
                                <Image
                                    src={item.iconUrl}
                                    alt={item.name}
                                    width={"100%"}
                                />
                            </Button>
                        );
                    })}
                </SimpleGrid>
            </Skeleton>
            <ButtonGroup pointerEvents={"all"}>
                <Button variant={"ghost"} onClick={prevPage}>
                    <LeftChevronIcon />
                </Button>
                <Text color={"white"} fontWeight={"bold"}>
                    {pagination?.page || 1} / {pagination?.totalPages || 1}
                </Text>
                <Button variant={"ghost"} onClick={nextPage}>
                    <RightChevronIcon />
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default AssetsMenu;
