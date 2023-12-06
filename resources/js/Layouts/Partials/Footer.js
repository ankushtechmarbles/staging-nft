import { Button, Flex, Progress } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../../Context/AppContext";

const Footer = () => {
    const { creationProgress, dispatch } = useAppContext();

    return (
        <Flex flexDir={"column"} alignItems={"center"} gap={5} w={"100vw"}>
            <Flex justifyContent={"space-between"} w={"full"} px={5}>
                <Button
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
                            variant={"ghost"}
                            onClick={() => {
                                dispatch({ type: "INCREASE_CREATION_STEP" });
                            }}
                        >
                            Skip
                        </Button>
                    )}
                    <Button
                        variant={"light"}
                        onClick={() => {
                            dispatch({ type: "INCREASE_CREATION_STEP" });
                        }}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
            <Progress value={creationProgress} height={5} w={"full"} />
        </Flex>
    );
};

export default Footer;
