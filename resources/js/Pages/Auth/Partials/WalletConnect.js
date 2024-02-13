import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Text,
    Divider,
    Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppContext } from "../../../Context/AppContext";
import MetamaskIcon from "../../../SVGs/MetamaskIcon";
import PaperIcon from "../../../SVGs/PaperIcon";
import {
    metamaskWallet,
    useWallet,
    useEmbeddedWallet,
    useConnect,
} from "@thirdweb-dev/react";

const metamaskConfig = metamaskWallet();

const WalletConnect = () => {
    const {} = useAppContext();
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: false,
    });
    const wallet = useWallet();
    const connect = useConnect();
    const { connect: embedConnect } = useEmbeddedWallet();

    const handleConnect = async (config) => {
        try {
            let wallet;
            if (config !== "embedded") {
                wallet = await connect(config);
            } else {
                wallet = await embedConnect({
                    strategy: "iframe",
                });
            }

            onClose();
            console.log("connect to wallet", wallet);
        } catch (error) {
            console.log("failed to connect", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (!wallet) {
                onOpen();
            }
        }, 500);
    }, []);

    return (
        <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                borderRadius={"31px"}
                boxShadow={"0px 0px 7.8px 7px rgba(255, 255, 255, 0.25)"}
            >
                <ModalHeader textAlign={"center"}>Connect Wallet</ModalHeader>
                <ModalCloseButton />
                <Divider />
                <ModalBody>
                    <VStack py={5} spacing={5}>
                        <Text fontSize={"28px"} textAlign={"center"} px={5}>
                            Connect your wallet before Log in or Sign Up
                        </Text>
                        <Button
                            w={"65%"}
                            onClick={() => {
                                handleConnect(metamaskConfig);
                            }}
                            variant={"dark"}
                            py={8}
                            borderRadius={"20px"}
                            bg={"#3D3D3D"}
                            leftIcon={<MetamaskIcon />}
                        >
                            Metamask
                        </Button>
                        <Button
                            w={"65%"}
                            onClick={async () => {
                                try {
                                    handleConnect("embedded");
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                            variant={"dark"}
                            py={8}
                            borderRadius={"20px"}
                            bg={"#3D3D3D"}
                            leftIcon={<PaperIcon />}
                        >
                            Withpaper
                        </Button>
                        <Divider />
                        <Text>Haven't got a crypto wallet yet?</Text>
                        <Link>Learn how to connect</Link>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WalletConnect;
