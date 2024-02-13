import {
    CameraControls,
    Environment,
    Stage,
    useAnimations,
    useGLTF,
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import BaseScene from "../../../Components/BaseScene";
import * as THREE from "three";

const { DEG2RAD } = THREE.MathUtils;

const RpmAvatar = () => {
    return (
        <BaseScene>
            <Avatar />
        </BaseScene>
    );
};

const Avatar = () => {
    const { scene } = useGLTF(
        "https://api.readyplayer.me/v2/avatars/65711411869b42cd90a16ac5.glb",
    );
    const { animations: aniMale } = useGLTF("/male-idle-animation.glb");
    const {
        actions: maleActions,
        ref: animationsRefmale,
        names: maleNames,
        mixer: maleMixer,
    } = useAnimations(aniMale, scene);

    const avatarRef = useRef();
    const controlsRef = useRef();

    useEffect(() => {
        if (scene && avatarRef.current) {
            const vector3 = new THREE.Vector3();
            avatarRef.current.getWorldPosition(vector3);

            scene.traverse((child) => {
                // check if child is a mesh
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }

                if (child instanceof THREE.SkinnedMesh) {
                    if (child.name === "Wolf3D_Head") {
                        child.morphTargetInfluences[0] = 0.5;
                    }
                }
            });

            animationsRefmale.current = scene;
            maleMixer
                .clipAction(maleActions[maleNames[0]].getClip(), scene)
                .reset()
                .play();

            controlsRef.current.setOrbitPoint(vector3.x, 0.5, vector3.z);
            controlsRef.current.truck(0, -1.5, true);
            controlsRef.current.rotate(-30 * DEG2RAD, 0, true);
            controlsRef.current.rotate(0, -15 * DEG2RAD, 0, true);
        }
    }, [avatarRef]);

    const sceneEnv = new THREE.Scene({ enviroment: null });

    return (
        <>
            <CameraControls ref={controlsRef} />
            <Stage adjustCamera={false} contactShadow={false} shadows={false}>
                <Environment
                    scene={sceneEnv}
                    background={false} // can be true, false or "only" (which only sets the background) (default: false)
                    blur={1} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                    files={"/image/hdr/shutterstock_2257281257.hdr"}
                    preset={null}
                    resolution={256}
                    ground={{ height: 35, radius: 100, scale: 200 }}
                />
                <directionalLight
                    position={[5, 5, 2]}
                    intensity={1}
                    castShadow
                />
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[100, 100, 100]}
                    position-y={-1.5}
                    receiveShadow={true}
                >
                    <planeGeometry />
                    <shadowMaterial transparent={true} opacity={0.4} />
                </mesh>
                <primitive
                    object={scene}
                    position-z={-0.5}
                    position-y={-1.5}
                    position-x={-3.25}
                    scale={2.75}
                    rotation-y={Math.PI / 0.25}
                    ref={avatarRef}
                />
            </Stage>
        </>
    );
};

export default RpmAvatar;
