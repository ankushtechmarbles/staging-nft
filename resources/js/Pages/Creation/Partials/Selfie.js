import {
    Heading,
    Stack,
    Button,
    Text,
    Input,
    Image,
    Box,
} from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import CircleSpinnerIcon from "../../../SVGs/CircleSpinnerIcon";
import { useAppContext } from "../../../Context/AppContext";
import PhotoModal from "../../../Components/PhotoModal";

const Selfie = () => {
    const { dispatch, imageUpload } = useAppContext();
    const inputRef = useRef();

    const userUploadImage = useCallback(
        (e) => {
            // convert image to base64 string
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                dispatch({ type: "SET_IMAGE_UPLOAD", payload: reader.result });
            };
        },
        [inputRef],
    );

    const clickInput = useCallback(() => {
        inputRef.current.click();
    }, [inputRef]);

    return (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            overflow={"hidden"}
            width={"full"}
            paddingLeft={"35rem"}
            pointerEvents={"none"}
        >
            <Heading
                color={"white"}
                textShadow={"0px 0px 5px #000"}
                fontWeight={"normal"}
            >
                Take a selfie for face accuracy
            </Heading>
            <Image
                width={imageUpload ? "321px" : "auto"}
                height={imageUpload ? "361px" : "auto"}
                borderRadius={imageUpload ? "361px" : "initial"}
                dropShadow={"0px 0px 5.3px #000"}
                src={
                    !imageUpload
                        ? "/image/idea-placeholder-avatar.png"
                        : imageUpload
                }
            />
            <PhotoModal />
            <Text color={"white"}>OR</Text>
            <Button
                pointerEvents={"all"}
                borderRadius={"9px"}
                boxShadow={"0px 0px 3.5px 2px rgba(0, 0, 0, 0.30)"}
                textTransform={"uppercase"}
                onClick={clickInput}
            >
                Choose existing photo
            </Button>
            <Input
                visibility={"hidden"}
                ref={inputRef}
                type={"file"}
                onChange={userUploadImage}
            />
        </Stack>
    );
};

export default Selfie;
