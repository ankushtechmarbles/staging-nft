import { Button, Flex, Progress, useToast } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../../Context/AppContext";

const Footer = () => {
    const { creationProgress, dispatch, character } = useAppContext();
    const toast = useToast();

    const checkNextStep = () => {
        if (creationProgress === 40 && character.name.length <= 0) {
            return toast({
                title: "Please enter a name for your character",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            zIndex={10}
            overflow={"hidden"}
            flexDir={"column"}
            alignItems={"center"}
            gap={5}
            pointerEvents={"all"}
        >
            <Flex justifyContent={"space-between"} w={"full"} px={5}>
                <Button
                    visibility={creationProgress === 0 ? "hidden" : "initial"}
                    isDisabled={!character?.avatar_id}
                    textShadow={"0px 1px 10.8px rgba(255, 255, 255, 0.44)"}
                    color={"white"}
                    variant={"ghost"}
                    onClick={() => {
                        dispatch({ type: "DECREASE_CREATION_STEP" });
                    }}
                >
                    Back
                </Button>
                <Flex gap={"5"} alignItems={"center"}>
                    {creationProgress === 0 && (
                        <Button
                            isDisabled={!character?.avatar_id}
                            variant={"ghost"}
                            onClick={() => {
                                dispatch({ type: "INCREASE_CREATION_STEP" });
                            }}
                        >
                            Skip
                        </Button>
                    )}
                    <Button
                        isDisabled={!character?.avatar_id}
                        variant={"light"}
                        onClick={() => {
                            checkNextStep();
                            dispatch({ type: "INCREASE_CREATION_STEP" });
                        }}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <Progress
                zIndex={10}
                backgroundColor={"white"}
                __css={{
                    "> div ": {
                        backgroundColor: "#404040",
                    },
                }}
                transition={"all 1s ease-in-out"}
                sx={{
                    "& > div:first-child": {
                        transitionProperty: "width",
                    },
                }}
                boxShadow={"0px 0px 6.9px 2px rgba(0, 0, 0, 0.41)"}
                value={creationProgress}
                height={5}
                w={"full"}
            />
        </Flex>
    );
};

export default Footer;
