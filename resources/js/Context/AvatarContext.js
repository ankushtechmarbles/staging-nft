import { createContext, useContext, useReducer } from "react";
import * as THREE from "three";
import { AVATAR_NODES_FROM_ASSET_TYPE } from "../Utils/constants";
export const avatarContext = createContext({});

function avatarContextReducer(state, action) {
    switch (action.type) {
        case "SET_CAMERA_CONTROLS_REF":
            return { ...state, cameraControlsRef: action.payload };
        case "SET_AVATAR_REF":
            return { ...state, avatarRef: action.payload };
        case "SET_IS_ANIMATION_PLAYING":
            return { ...state, isAnimationPlaying: action.payload };
        case "SET_THREEJS_REFS":
            return { ...state, ...action.payload };
        default:
            return { ...state };
    }
}

const initialOptions = {
    cameraControlsRef: null,
    avatarRef: null,
    isAnimationPlaying: false,
};

export const AvatarContext = ({ children }) => {
    const [state, dispatch] = useReducer(avatarContextReducer, initialOptions);
    const tools = { ...state, dispatch };

    return (
        <avatarContext.Provider value={{ ...tools }}>
            {children}
        </avatarContext.Provider>
    );
};

export const useAvatarContext = () => {
    const { ...tools } = useContext(avatarContext);

    const fitToBox = (type) => {
        try {
            const meshName = AVATAR_NODES_FROM_ASSET_TYPE[type];

            const mesh = tools.avatarRef.current.getObjectByName(meshName);

            let padding = meshName.includes("Head") ? 0.5 : 1.25;

            tools.cameraControlsRef.current.fitToBox(mesh, true, {
                paddingTop: padding,
                paddingBottom: padding,
                paddingLeft: padding,
                paddingRight: padding,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const resetCameraAngle = () => {
        try {
            tools.cameraControlsRef.current.setOrbitPoint(0, 0, 0);
            tools.cameraControlsRef.current.reset(true);
            fitToBox("reset");
        } catch (e) {
            console.log(e);
        }
    };

    return { ...tools, fitToBox, resetCameraAngle };
};
