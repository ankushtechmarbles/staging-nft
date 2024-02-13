import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    HStack,
    Link,
    VStack,
} from "@chakra-ui/react";
import { useWallet } from "@thirdweb-dev/react";
import React, { useState } from "react";
import CircleSpinnerIcon from "../../../SVGs/CircleSpinnerIcon";
import WalletConnect from "./WalletConnect";
import FacebookIcon from "../../../SVGs/FacebookIcon";
import GoogleIcon from "../../../SVGs/GoogleIcon";
import MetamaskIcon from "../../../SVGs/MetamaskIcon";
import PaperIcon from "../../../SVGs/PaperIcon";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { LOGIN_FORM, REGISTER_FORM } from "../../../Utils/constants";
import { useAuth } from "../../../Hooks/useAuth.hook";

const WelcomePanel = () => {
    const { authenticate, loading } = useAuth();
    const wallet = useWallet();

    const [form, setForm] = useState(LOGIN_FORM);

    const switchForm = () => {
        if (form === LOGIN_FORM) setForm(REGISTER_FORM);
        if (form === REGISTER_FORM) setForm(LOGIN_FORM);
    };

    return (
        <Flex
            width={"60%"}
            height={"100vh"}
            flexDir={"column"}
            justifyContent={"center"}
            gap={5}
            alignItems={"center"}
            background={"rgba(0,0,0,0.7)"}
            backdropBlur={9.6}
        >
            {loading && <CircleSpinnerIcon />}
            {!wallet && <WalletConnect />}
            <Heading
                fontSize={"3xl"}
                color={"white"}
                textTransform={"uppercase"}
            >
                Welcome to
            </Heading>
            <Heading
                fontSize={"52px"}
                color={"white"}
                textTransform={"uppercase"}
                mb={10}
            >
                idealabs
            </Heading>

            {form === LOGIN_FORM && <LoginForm switchForm={switchForm} />}
            {form === REGISTER_FORM && <RegisterForm switchForm={switchForm} />}

            <Link
                href={"/reset-password"}
                fontFamily={"Barlow"}
                color={"#c1c1c1"}
                textDecor={"underline"}
                my={2}
            >
                Forgot Password?
            </Link>

            <Flex justifyContent={"center"} my={5} alignItems={"center"}>
                <Box borderBottom={"1px solid white"} width={24}></Box>
                <Text px={5} color={"white"}>
                    or
                </Text>
                <Box borderBottom={"1px solid white"} width={24}></Box>
            </Flex>

            <HStack>
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        authenticate("facebook");
                    }}
                >
                    <FacebookIcon />
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        authenticate("google");
                    }}
                >
                    <GoogleIcon />
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        authenticate("metamask");
                    }}
                >
                    <MetamaskIcon />
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        authenticate("paper");
                    }}
                >
                    <PaperIcon />
                </Button>
            </HStack>

            <VStack
                position={"absolute"}
                bottom={"3rem"}
                spacing={5}
                justifySelf={"end"}
                color={"idea.gray"}
            >
                <Link
                    href={"/privacy-policy"}
                    fontFamily={"Barlow"}
                    color={"#C1c1c1"}
                    textDecor={"underline"}
                >
                    Privacy Policy
                </Link>
                <Link
                    href={"/terms"}
                    fontFamily={"Barlow"}
                    color={"#C1c1c1"}
                    textDecor={"underline"}
                >
                    End-User License Agreement
                </Link>
            </VStack>
        </Flex>
    );
};

export default WelcomePanel;
