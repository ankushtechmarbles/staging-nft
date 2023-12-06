import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { useWallet } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    console.log(wallet);

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
            {!wallet && <WalletConnect />}
            <Heading
                fontSize={"4xl"}
                color={"white"}
                textTransform={"uppercase"}
            >
                Welcome to
            </Heading>
            <Heading
                fontSize={"7xl"}
                color={"white"}
                textTransform={"uppercase"}
            >
                idealabs
            </Heading>

            {form === LOGIN_FORM && <LoginForm switchForm={switchForm} />}
            {form === REGISTER_FORM && <RegisterForm switchForm={switchForm} />}

            <Link>Forgot Password?</Link>

            <Flex justifyContent={"center"} alignItems={"center"}>
                <Box border={"1px solid white"} width={12}></Box>
                <Text px={5}>or</Text>
                <Box border={"1px solid white"} width={12}></Box>
            </Flex>

            <HStack>
                <Button
                    onClick={() => {
                        authenticate("facebook");
                    }}
                >
                    <FacebookIcon />
                </Button>
                <Button
                    onClick={() => {
                        authenticate("google");
                    }}
                >
                    <GoogleIcon />
                </Button>
                <Button
                    onClick={() => {
                        authenticate("metamask");
                    }}
                >
                    <MetamaskIcon />
                </Button>
                <Button
                    onClick={() => {
                        authenticate("paper");
                    }}
                >
                    <PaperIcon />
                </Button>
            </HStack>

            <VStack justifySelf={"end"}>
                <Link>Privacy Policy</Link>
                <Link>End-User License Agreement</Link>
            </VStack>
        </Flex>
    );
};

export default WelcomePanel;
