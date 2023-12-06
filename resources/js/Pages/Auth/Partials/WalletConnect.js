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
import MetamaskIcon from "../../../SVGs/MetamaskIcon";
import PaperIcon from "../../../SVGs/PaperIcon";
import {
    metamaskWallet,
    embeddedWallet,
    useConnect,
    useWallet,
} from "@thirdweb-dev/react";

const metamaskConfig = metamaskWallet();
const paperConfig = embeddedWallet();

const WalletConnect = () => {
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: false,
    });
    const connect = useConnect();
    const wallet = useWallet();

    const handleConnect = async (config) => {
        try {
            const wallet = await connect(config);

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Connect Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Text>
                            Connect your wallet before Log in or Sign Up
                        </Text>
                        <Button
                            onClick={() => {
                                handleConnect(metamaskConfig);
                            }}
                            variant={"dark"}
                            leftIcon={<MetamaskIcon />}
                        >
                            Metamask
                        </Button>
                        <Button
                            onClick={() => {
                                handleConnect(paperConfig);
                            }}
                            variant={"dark"}
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
