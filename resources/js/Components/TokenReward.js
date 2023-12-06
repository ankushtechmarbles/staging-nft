import {
    ModalOverlay,
    Modal,
    ModalContent,
    useDisclosure,
    Stack,
    Heading,
    Text,
    Box,
    Button,
    Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import IdeaTokenShadow from "../SVGs/IdeaTokenShadow";

const TokenReward = () => {
    const { onClose, isOpen, onOpen } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    const claimTokens = () => {
        onClose();
    };

    return (
        <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                background={"rgba(0,0,0,0.65)"}
                backdropFilter={"blur(9px)"}
            />
            <ModalContent bg={"transparent"} boxShadow={"none"}>
                <Stack
                    w={"full"}
                    spacing={10}
                    textAlign={"center"}
                    textColor={"white"}
                    background={"transparent"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Heading variant={"illuminated"} w={"40rem"}>
                        NEW USER REWARDS!
                    </Heading>
                    <Flex
                        flexDir={"column"}
                        justifyItems={"center"}
                        alignItems={"center"}
                    >
                        <IdeaTokenShadow />
                        <Box
                            bg={"rgba(0,0,0,0.65)"}
                            boxShadow={
                                "0px 0px 29px 24px rgba(255, 255, 255, 0.25)"
                            }
                            backdropFilter={"blur(4px)"}
                            borderRadius={"10px"}
                            px={8}
                            py={3}
                        >
                            <Text textTransform={"uppercase"} color={"white"}>
                                IDEA TOKEN
                            </Text>
                        </Box>
                    </Flex>

                    <Button variant={"illuminated"} onClick={claimTokens}>
                        Claim
                    </Button>
                </Stack>
            </ModalContent>
        </Modal>
    );
};

export default TokenReward;
