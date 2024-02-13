import { Canvas } from "@react-three/fiber";
import React from "react";
import { useAvatarContext } from "../Context/AvatarContext";

const BaseScene = ({ children }) => {
    const { resetCameraAngle, creationProgress } = useAvatarContext();

    return (
        <Canvas
            shadows
            onContextMenu={() => {
                // change cursor icon
                window.document.body.style.cursor = "all-scroll";
            }}
            onDoubleClickCapture={() => {
                resetCameraAngle("reset");
            }}
            style={{
                position: "absolute",
                backdropFilter:
                    creationProgress === 60 ? "brightness(0.5)" : "",
            }}
            className={"avatar-canvas"}
        >
            {children}
        </Canvas>
    );
};

export default BaseScene;
