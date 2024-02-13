import { CameraControls, Environment, Stage } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { HDR_ENVIRONMENT } from "../Utils/constants";
import { useAvatarContext } from "../Context/AvatarContext";
import { useAppContext } from "../Context/AppContext";
import Avatar from "../Components/Avatar";
import * as THREE from "three";

const degrees_to_radians = (degrees) => {
    const pi = Math.PI;
    return degrees * (pi / 180);
};

const { DEG2RAD } = THREE.MathUtils;

const AvatarConfigurator = () => {
    const { creationProgress, character } = useAppContext();
    const { dispatch, fitToBox, cameraControlsRef } = useAvatarContext();
    const controlsRef = useRef();
    const avatarRef = useRef(null);
    const directionalRef = useRef();
    const scene = new THREE.Scene({ enviroment: null });

    useEffect(() => {
        const canvas = document.querySelector(".avatar-canvas");

        switch (creationProgress) {
            case 0:
                controlsRef.current.reset(true);

                setTimeout(() => {
                    controlsRef.current.setOrbitPoint(-1.5, 2.5, 0);
                }, 500);
                break;
            case 20:
                fitToBox("Hair");
                break;
            case 40:
                controlsRef.current.enabled = true;

                controlsRef.current.reset(true);
                fitToBox("reset");
                controlsRef.current.truck(1.5, 0, true);
                controlsRef.current.dolly(-1, true);
                controlsRef.current.moveTo(0, 3, 0, true);
                controlsRef.current.rotate(-15 * DEG2RAD, 0, true);

                // remove brightness(0.5) to style
                canvas.style = "backdrop-filter: brightness(0.5);";

                setTimeout(() => {
                    controlsRef.current.setOrbitPoint(-2.5, 0, 0);
                }, 500);
                break;
            case 60:
                controlsRef.current.enabled = true;
                fitToBox("reset");
                controlsRef.current.truck(-3.5, -1.5, true);
                controlsRef.current.rotate(35 * DEG2RAD, 0, true);

                // add brightness(0.5) to style
                canvas.style = "backdrop-filter: brightness(0.5);";

                setTimeout(() => {
                    const vec3 = new THREE.Vector3();

                    avatarRef.current.getWorldPosition(vec3);

                    controlsRef.current.setOrbitPoint(vec3.x, vec3.y, vec3.z);
                    avatarRef.current.visible = true;
                    controlsRef.current.enabled = false;
                }, 500);
                break;
            case 80:
                // remove brightness(0.5) to style
                canvas.style = "backdrop-filter: brightness(0.5);";

                avatarRef.current.visible = false;
                break;
            default:
                break;
        }
    }, [creationProgress]);

    useEffect(() => {
        if (!character.glbFile) {
            avatarRef.current = null;
        }
    }, [character?.glbFile]);

    useEffect(() => {
        if (controlsRef.current && !cameraControlsRef?.current) {
            controlsRef.current.setOrbitPoint(-1.5, 0, 0);
            controlsRef.current.moveTo(0, 3, 0, true);
            controlsRef.current.rotate(-30 * DEG2RAD, 0, true);
            controlsRef.current.saveState();

            dispatch({
                type: "SET_THREEJS_REFS",
                payload: {
                    cameraControlsRef: controlsRef,
                    avatarRef: avatarRef,
                },
            });
        }
    }, [controlsRef.current]);

    return (
        <>
            <CameraControls
                maxZoom={2}
                minDistance={2}
                maxDistance={10}
                ref={controlsRef}
                maxPolarAngle={degrees_to_radians(80)}
            />

            <Stage adjustCamera={false} contactShadow={false} shadows={false}>
                {creationProgress !== 60 && (
                    <Environment
                        scene={scene}
                        background={true} // can be true, false or "only" (which only sets the background) (default: false)
                        blur={1} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                        files={HDR_ENVIRONMENT}
                        preset={null}
                        resolution={256}
                        ground={{ height: 35, radius: 100, scale: 200 }}
                    />
                )}

                {creationProgress === 60 && <ambientLight />}
                <directionalLight
                    ref={directionalRef}
                    position={[5, 5, 2]}
                    intensity={1}
                    castShadow
                />
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[100, 100, 100]}
                    receiveShadow={true}
                >
                    <planeGeometry />
                    <shadowMaterial transparent={true} opacity={0.4} />
                </mesh>
                {character?.glbFile && <Avatar ref={avatarRef} />}
            </Stage>
        </>
    );
};

export default AvatarConfigurator;
