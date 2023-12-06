import {
    Button,
    ModalOverlay,
    Modal,
    ModalContent,
    useDisclosure,
    Stack,
    Heading,
    Text,
    Box,
    Flex,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import Webcam from "react-webcam";
import { useAppContext } from "../Context/AppContext";

const videoConstraints = {
    width: 320,
    height: 360,
    facingMode: "user",
};

const PhotoModal = () => {
    const { onClose, isOpen, onOpen } = useDisclosure();
    const { dispatch, imageUpload } = useAppContext();
    const webcamRef = useRef();

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();

        dispatch({ type: "SET_IMAGE_UPLOAD", payload: imageSrc });

        setTimeout(() => {
            onClose();
        }, [1000]);
    }, [webcamRef]);

    return (
        <>
            <Button
                onClick={() => {
                    if (imageUpload) {
                        dispatch({ type: "SET_IMAGE_UPLOAD", payload: null });
                    }

                    onOpen();
                }}
                textTransform={"uppercase"}
            >
                {imageUpload ? "Take again" : "Take a photo"}
            </Button>
            <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    background={"rgba(0,0,0,0.85)"}
                    backdropFilter={"blur(9px)"}
                />
                <ModalContent bg={"transparent"} boxShadow={"none"}>
                    <Stack
                        w={"full"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        color={"white"}
                        spacing={5}
                    >
                        <Heading
                            fontWeight={"normal"}
                            w={"40rem"}
                            textAlign={"center"}
                        >
                            Place your face inside the frame
                        </Heading>
                        <Text textAlign={"center"}>
                            Don’t forget to allow your camera on your browser
                        </Text>

                        <Flex
                            className={"webcam"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            width={"321px"}
                            height={"361px"}
                            borderRadius={"361px"}
                            border={"1px solid #fff"}
                            background={"#333"}
                            backgroundImage={imageUpload ? imageUpload : null}
                        >
                            {!imageUpload && (
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    videoConstraints={videoConstraints}
                                    width={"320px"}
                                    height={"360px"}
                                    screenshotFormat="image/png"
                                    mirrored={true}
                                />
                            )}
                        </Flex>

                        <Button
                            onClick={capture}
                            _hover={{ bg: "transparent", opacity: 0.75 }}
                            variant={"ghost"}
                            height={"5rem"}
                            width={"5rem"}
                            padding={0}
                            margin={0}
                        >
                            <Flex
                                w={"full"}
                                h={"full"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                borderRadius={"50%"}
                                border={"1px solid white"}
                            >
                                <Box
                                    w={"90%"}
                                    h={"90%"}
                                    borderRadius={"50%"}
                                    bg={"white"}
                                ></Box>
                            </Flex>
                        </Button>
                    </Stack>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PhotoModal;
