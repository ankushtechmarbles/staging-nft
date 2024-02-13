import { BBAnchor, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Avatar = forwardRef((props, ref) => {
    const { character, loadingAvatar } = useAppContext();
    const [scene, setScene] = useState(null);
    const groupRef = useRef();
    const { animations: aniMale } = useGLTF("/male-idle-animation.glb");
    const { animations: aniFemale } = useGLTF("/female-idle-animation.glb");
    const {
        actions: maleActions,
        ref: animationsRefmale,
        names: maleNames,
        mixer: maleMixer,
    } = useAnimations(aniMale, scene);
    const {
        actions: femaleActions,
        ref: animationsRefFemale,
        mixer: femaleMixer,
        names: femaleNames,
    } = useAnimations(aniFemale, scene);

    const getCharacter = async () => {
        try {
            const loader = new GLTFLoader();
            if (ref.current) {
                ref.current.clear();
            }
            setScene(null);

            loader.load(character.glbFile, function (gltf) {
                setScene(gltf.scene);

                // traverse scene until you find the SkinnedMesh with the name "Wolf3d_Head"
                gltf.scene.traverse((child) => {
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

                if (character.gender === "female") {
                    animationsRefFemale.current = gltf.scene;
                    femaleMixer
                        .clipAction(
                            femaleActions[femaleNames[0]].getClip(),
                            gltf.scene,
                        )
                        .reset()
                        .play();
                } else {
                    animationsRefmale.current = gltf.scene;
                    animationsRefFemale.current = gltf.scene;
                    maleMixer
                        .clipAction(
                            maleActions[maleNames[0]].getClip(),
                            gltf.scene,
                        )
                        .reset()
                        .play();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!scene || !loadingAvatar) {
            getCharacter();
        }
    }, [character.glbFile, loadingAvatar]);

    if (scene) {
        return (
            <group dispose={null} {...props} ref={groupRef}>
                <BBAnchor anchor={[1, 3, 1]}>
                    <primitive
                        object={scene}
                        scale={2.75}
                        position-x={-1.5}
                        rotation-y={Math.PI / 0.25}
                        ref={ref}
                    />
                </BBAnchor>
            </group>
        );
    }

    return <></>;
});

export default Avatar;
