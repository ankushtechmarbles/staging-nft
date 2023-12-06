import { createContext, useContext, useReducer } from "react";
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
    avatarMenu: apperanceMenus[0],
};

export const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(appContextReducer, initialOptions);
    const tools = { ...state, dispatch };

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
