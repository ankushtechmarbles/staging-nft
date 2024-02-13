import {
    Box,
    Button,
    Flex,
    Heading,
    Link,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import {
    metamaskWallet,
    useConnect,
    useContract,
    useWallet,
    useStorage,
    useMintNFT,
} from "@thirdweb-dev/react";
import React, { useEffect, useRef, useState } from "react";
import WalletConnect from "../../Auth/Partials/WalletConnect";
import { useAppContext } from "../../../Context/AppContext";
import CircleSpinnerIcon from "../../../SVGs/CircleSpinnerIcon";
import { useAvatarContext } from "../../../Context/AvatarContext";
import { createLeanCanvasImage } from "../../../Utils/createLeanCanvasImage";
import MetamaskIcon from "../../../SVGs/MetamaskIcon";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const metamaskConfig = metamaskWallet();

const Checkout = () => {
    const { contract, error } = useContract(
        "0x5eb9B5B1FC47fc7E18a11417dAC9E419Ccc459BE",
    );
    const wallet = useWallet();
    const connect = useConnect();
    const [isLoading, setIsLoading] = useState(false);
    const { avatarRef } = useAvatarContext();
    const { character } = useAppContext();
    const storage = useStorage();
    const { dispatch, purchasedNft } = useAppContext();
    const contractArgs = useRef(null);
    const walletAddress = useRef(null);

    const getContractArgs = async () => {
        try {
            const address = await wallet?.getAddress();

            if (!address) {
            }

            walletAddress.current = address;

            const { signature, payload } = await getMintSignature();

            contractArgs.current = {
                signature,
                payload,
            };
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getContractArgs();
    }, [wallet]);

    const getMintSignature = async () => {
        const { canvas, glb } = await createCheckoutMethod();

        // get authToken from localstorage
        const cookies = localStorage.getItem("authToken");

        const address = await wallet.getAddress();

        const postData = {
            image_url: canvas,
            animation_url: glb,
            name: character.name,
            address: address,
        };

        // make post request with fetch
        const response = await fetch("/api/nfts/generate/thirdweb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies}`,
            },
            body: JSON.stringify(postData),
        });

        const {
            data: { signature, payload },
        } = await response.json();

        return { signature, payload };
    };

    const metamaskCheckout = async () => {
        try {
            setIsLoading(true);

            if (!wallet) {
                await connect(metamaskConfig);
            }

            await contract?.erc1155?.signature?.mint({
                ...contractArgs.current,
            });

            // move to next step
            dispatch({ type: "SET_PURCHASED_NFT", payload: true });
            dispatch({ type: "INCREASE_CREATION_STEP" });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log("failed to connect", error);
        }
    };

    // '/nfts/generate/thirdweb'
    // '/nfts/generate/clientsecret'

    const createCheckoutMethod = async () => {
        try {
            const canvas = await createLeanCanvasImage({
                data: "Dec 18, 2023",
                problem: "test",
                alternatives: "test",
                solution: "test",
                proposition: "test",
                concept: "test",
                advantage: "test",
                channels: "test",
                customerSegments: "test",
                adopters: "test",
                constStructure: "test",
                revenueStreams: "test",
                metrics: "test",
            });

            const exporter = new GLTFExporter();

            const gltf = await exporter.parseAsync(avatarRef.current, {
                binary: true,
            });

            // convert canvas to array buffer
            const canvasBuffer = await new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                });
            });

            const gltfUri = await storage?.upload({
                file: gltf,
                path: "/avatarsGltf",
            });

            const canvasUri = await storage?.upload({
                file: canvasBuffer,
                path: "/canvasImage",
            });

            return { glb: gltfUri, canvas: canvasUri };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SimpleGrid
            columns={2}
            spacing={10}
            justifyItems={"center"}
            alignItems={"center"}
            py={"2rem"}
        >
            {isLoading && <CircleSpinnerIcon />}
            {!wallet && <WalletConnect />}
            {!purchasedNft && (
                <>
                    <Stack spacing={2} pointerEvents={"all"}>
                        <Box
                            padding={"2rem 4rem 2rem 4rem"}
                            width={"712px"}
                            height={"548px"}
                            background={"rgba(0,0,0,0.5)"}
                            borderRadius={"20px"}
                        >
                            <Text
                                textAlign={"center"}
                                fontSize={"xs"}
                                pb={5}
                                color={"white"}
                            >
                                Express Checkout
                            </Text>
                            {contractArgs.current !== null && !isLoading && (
                                <CheckoutWithCard
                                    configs={{
                                        contractArgs: {
                                            ...contractArgs.current,
                                        },
                                        contractId:
                                            "d6afb23f-c0ea-4fbb-b08e-fa9a08d7d35b",
                                        walletAddress: walletAddress.current,
                                    }}
                                    onPaymentSuccess={(result) => {
                                        console.log(result);

                                        dispatch({
                                            type: "SET_PURCHASED_NFT",
                                            payload: true,
                                        });
                                        dispatch({
                                            type: "INCREASE_CREATION_STEP",
                                        });

                                        setIsLoading(false);
                                    }}
                                    options={{
                                        colorText: "white",
                                        colorPrimary: "#404040",
                                    }}
                                />
                            )}
                        </Box>
                        <Flex
                            gap={5}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                        >
                            <Link color={"white"}>Refund Policy</Link>
                            <Link
                                href={"/privacy-policy"}
                                target={"_blank"}
                                color={"white"}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={"/terms"}
                                target={"_black"}
                                color={"white"}
                            >
                                Terms and Conditions
                            </Link>
                        </Flex>
                    </Stack>
                    <Stack gap={5}>
                        <Heading fontWeight={"normal"} color={"white"}>
                            Summary
                        </Heading>
                        <Stack
                            color={"white"}
                            width={"712px"}
                            height={"327px"}
                            background={"rgba(0,0,0,0.5)"}
                            padding={"2rem"}
                            borderRadius={"20px"}
                            spacing={8}
                        >
                            <Flex justifyContent={"space-between"}>
                                <Flex gap={4}>
                                    <Box
                                        bg={"#D9D9D9"}
                                        height={"72px"}
                                        width={"72px"}
                                        borderRadius={"18px"}
                                    ></Box>
                                    <Flex
                                        flexDir={"column"}
                                        justifyContent={"flex-start"}
                                    >
                                        <Heading color={"white"}>
                                            IDEALABS
                                        </Heading>
                                        <Text>IDEA PURCHASE</Text>
                                    </Flex>
                                </Flex>
                                <Heading color={"white"}>$99.0</Heading>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text color={"white"}>Subtotal</Text>
                                <Text color={"white"}>$99.0</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text color={"white"}>Taxes</Text>
                                <Text color={"white"}>$99.0</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text color={"white"}>Total</Text>
                                <Text color={"white"}>$99.0</Text>
                            </Flex>
                        </Stack>
                        <Button
                            pointerEvents={"all"}
                            py={7}
                            leftIcon={<MetamaskIcon />}
                            onClick={metamaskCheckout}
                        >
                            {!wallet ? "Connect Wallet" : "Metamask Checkout"}
                        </Button>
                    </Stack>
                </>
            )}
            {purchasedNft && (
                <Stack spacing={5}>
                    <Heading color={"white"}>
                        Thank you for your purchase!
                    </Heading>
                    <Text color={"white"}>
                        NFT has been minted and is available in your wallet.
                    </Text>
                </Stack>
            )}
        </SimpleGrid>
    );
};

export default Checkout;
