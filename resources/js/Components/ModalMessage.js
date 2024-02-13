import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Button,
    Stack,
    Box,
    Text,
    Heading,
    Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import TokenMessageIcon from "../SVGs/TokenMessageIcon";
import Header from "../Layouts/Partials/Header";
import { useAppContext } from "../Context/AppContext";

let viewedTokenMessage = false;

const ModalMessage = () => {
    const { creationProgress, character } = useAppContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (creationProgress === 20 && !viewedTokenMessage) {
            setTimeout(() => {
                viewedTokenMessage = true;
                onOpen();
            }, 750);
        }

        if (creationProgress === 60) {
            setTimeout(() => {
                onOpen();
            }, 750);
        }

        if (creationProgress === 100) {
            setTimeout(() => {
                onOpen();
            }, 750);
        }
    }, [creationProgress]);

    return (
        <>
            <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    background={"rgba(0,0,0,0.85)"}
                    backdropFilter={"blur(9px)"}
                />
                <ModalContent background={"transparent"} boxShadow={"none"}>
                    <ModalBody>
                        {creationProgress === 20 && (
                            <>
                                <Box
                                    position={"fixed"}
                                    top={0}
                                    left={0}
                                    width={"100vw"}
                                >
                                    <Header />
                                </Box>
                                <Box
                                    position={"absolute"}
                                    bottom={"140px"}
                                    left={"647px"}
                                >
                                    <TokenMessageIcon />
                                    <Flex
                                        position={"absolute"}
                                        top={"7rem"}
                                        width={"18rem"}
                                        left={"3rem"}
                                        flexDir={"column"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        gap={0.5}
                                        textAlign={"center"}
                                    >
                                        <Text>
                                            You can purchase IDEA items or
                                            concert tickets with your Token
                                        </Text>
                                        <Button onClick={onClose}>OK</Button>
                                    </Flex>
                                </Box>
                            </>
                        )}

                        {creationProgress === 60 && (
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                            >
                                <Box color={"white"}>
                                    <Heading
                                        fontWeight={"normal"}
                                        width={"50vw"}
                                        textAlign={"center"}
                                    >
                                        Great! Congrats on your new character,{" "}
                                        {character.name}!
                                    </Heading>
                                    <Heading
                                        fontWeight={"normal"}
                                        width={"50vw"}
                                        textAlign={"center"}
                                    >
                                        Now let's dive into your startup IDEA!
                                    </Heading>
                                </Box>
                                <Button
                                    px={10}
                                    py={5}
                                    bg={"white"}
                                    fontWeight={"normal"}
                                    borderRadius={"15px"}
                                    textTransform={"uppercase"}
                                    onClick={onClose}
                                >
                                    Let's go
                                </Button>
                            </Stack>
                        )}

                        {creationProgress === 100 && (
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                                spacing={5}
                            >
                                <Box color={"white"}>
                                    <Heading
                                        fontWeight={"normal"}
                                        width={"50vw"}
                                        textAlign={"center"}
                                    >
                                        Your payment is confirmed! Now let’s
                                        dive into your IDEA World and realize
                                        your IDEA!
                                    </Heading>
                                </Box>
                                <Button
                                    px={10}
                                    py={5}
                                    bg={"white"}
                                    fontWeight={"normal"}
                                    borderRadius={"15px"}
                                    textTransform={"uppercase"}
                                    onClick={onClose}
                                >
                                    Let's go
                                </Button>
                            </Stack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalMessage;
