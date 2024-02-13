import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk";
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {
    CHARACTER_CREATION,
    CHECKOUT,
    IDEA_CREATOR,
    apperanceMenus,
} from "../Utils/constants";

export const appContext = createContext({});

function appContextReducer(state, action) {
    switch (action.type) {
        case "INCREASE_CREATION_STEP":
            if (state.creationProgress === 100) return { ...state };

            if (state.creationProgress === 40) {
                if (state.character.name.length <= 0) {
                    return { ...state };
                }

                return {
                    ...state,
                    creationProgress: state.creationProgress + 20,
                    creationMenu: IDEA_CREATOR,
                };
            }

            if (state.creationProgress === 60) {
                return {
                    ...state,
                    creationProgress: state.creationProgress + 20,
                    creationMenu: CHECKOUT,
                };
            }

            if (state.creationProgress === 100) {
                return {
                    ...state,
                    creationProgress: state.creationProgress + 20,
                    purchasedNft: true,
                };
            }

            return { ...state, creationProgress: state.creationProgress + 20 };
        case "DECREASE_CREATION_STEP":
            if (state.creationProgress === 0) return { ...state };

            if (state.creationProgress === 40) {
                return {
                    ...state,
                    creationProgress: state.creationProgress - 20,
                    creationMenu: CHARACTER_CREATION,
                };
            }

            if (state.creationProgress === 60) {
                return {
                    ...state,
                    creationProgress: state.creationProgress - 20,
                    creationMenu: IDEA_CREATOR,
                };
            }

            return { ...state, creationProgress: state.creationProgress - 20 };
        case "SET_CREATION_MENU":
            return { ...state, creationMenu: action.payload };
        case "SET_AVATAR_MENU":
            return { ...state, avatarMenu: action.payload };
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_IMAGE_UPLOAD":
            return { ...state, imageUpload: action.payload };
        case "SET_CHARACTER_NAME":
            return {
                ...state,
                character: { ...state.character, name: action.payload },
            };
        case "SET_RPM_USER_DATA": {
            return {
                ...state,
                character: {
                    ...state.character,
                    ...action.payload,
                },
            };
        }
        case "SET_AVATAR_REF":
            return { ...state, avatarRef: action.payload };
        case "SET_CONTROLS_REF":
            return { ...state, controlsRef: action.payload };
        case "SET_CHARACTER":
            return { ...state, character: action.payload };
        case "SET_PURCHASED_NFT":
            return { ...state, purchasedNft: action.payload };
        default:
            return { ...state };
    }
}

const initialOptions = {
    user: null,
    imageUpload: null,
    character: {
        name: "",
    },
    creationProgress: 0,
    creationMenu: CHARACTER_CREATION,
    avatarMenu: apperanceMenus[1],
    avatarRef: null,
    controlsRef: null,
    purchasedNft: null,
};

export const AppContext = ({ children }) => {
    const paperWalletSdk = new PaperEmbeddedWalletSdk({
        clientId: "d9a15616-47b9-48f2-8ba0-4ebedf63c35d",
        chain: "Mumbai",
        advancedOptions: {},
    });

    const [state, dispatch] = useReducer(appContextReducer, initialOptions);
    const [loadingAvatar, setIsLoadingAvatar] = useState(false);
    const tools = {
        ...state,
        dispatch,
        loadingAvatar,
        setIsLoadingAvatar,
        paperWalletSdk,
    };

    useEffect(() => {
        // check if url contains google callback
        let searchParams = new URLSearchParams(window.location.search);
        let code = searchParams.get("callback");

        if (code === "google" || code === "facebook") {
            // get user from local storage
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("authToken");
            // set user details
            dispatch({
                type: "SET_USER",
                payload: {
                    name: user.name,
                    email: user.email,
                    token: token,
                },
            });

            // set RPM user details
            dispatch({
                type: "SET_RPM_USER_DATA",
                payload: {
                    user_id: user.rpm_user_id,
                    token: user.rpm_user_token,
                    avatar_id: user.rpm_avatar_id,
                    imageUrl: user.rpm_image_url,
                    assets: JSON.parse(user.rpm_assets),
                    bodyType: user.rpm_body_type,
                    glbFile: user.rpm_glb_file,
                },
            });
        }
    }, []);

    return (
        <appContext.Provider value={{ ...tools }}>
            {children}
        </appContext.Provider>
    );
};

export const useAppContext = () => {
    const { ...tools } = useContext(appContext);

    return { ...tools };
};
