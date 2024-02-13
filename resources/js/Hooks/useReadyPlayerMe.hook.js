import axios from "axios";
import { useState } from "react";
import { assetEntities, assetTypes } from "../Utils/constants";
import { useAppContext } from "../Context/AppContext";

const url = "https://api.readyplayer.me/v1";
const urlV2 = "https://api.readyplayer.me/v2";
const applicationId = "6537f534847b5115f7699600";

export function useReadyPlayerMe() {
    const { dispatch, character, setIsLoadingAvatar } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const getAvatarTemplates = async (token) => {
        try {
            const {
                data: { data },
            } = await axios.get(
                "https://api.readyplayer.me/v2/avatars/templates",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            // get total templates
            const totalTemplates = data.length;

            return data[Math.floor(Math.random() * totalTemplates)];
        } catch (error) {
            console.log(error);
        }
    };

    const createAvatarDraft = async (templateId, token) => {
        try {
            const {
                data: {
                    data: { assets, bodyType, gender, id, partner },
                },
            } = await axios.post(
                `https://api.readyplayer.me/v2/avatars/templates/${templateId}`,
                {
                    data: {
                        partner: "idea-test",
                        bodyType: "fullbody",
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return {
                assets,
                bodyType,
                gender,
                id,
                partner,
            };
        } catch (error) {
            console.log(error);
        }
    };

    // sends back glb file
    const saveAvatarDraft = async (avatarId, token) => {
        try {
            const {
                data: {
                    data: { id, partner, gender, bodyType, assets, favorite },
                },
            } = await axios.put(
                `https://api.readyplayer.me/v2/avatars/${avatarId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return {
                id,
                partner,
                gender,
                bodyType,
                assets,
                favorite,
            };
        } catch (error) {
            console.log(error);
        }
    };

    // step 1: create RPM user
    const createAnonUser = async () => {
        try {
            setIsLoading(true);

            // check local storage for user
            const user = JSON.parse(localStorage.getItem("user"));

            // check if character already exists
            if (character?.user_id || user?.rpm_user_id) {
                setIsLoading(false);

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
                return dispatch({
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
            //https://IDEA-Test.readyplayer.me/api/users
            // create user
            const {
                data: {
                    data: { id, token },
                },
            } = await axios.post(`https://IDEA-Test.readyplayer.me/api/users`);

            // get random template
            const { id: templateId, imageUrl } =
                await getAvatarTemplates(token);

            // create avatar draft
            const { id: avatar_id } = await createAvatarDraft(
                templateId,
                token,
            );

            // save avatar draft
            const {
                id: newAvatarId,
                partner,
                gender,
                bodyType,
                assets,
                favorite,
            } = await saveAvatarDraft(avatar_id, token);

            // save character data to state
            dispatch({
                type: "SET_RPM_USER_DATA",
                payload: {
                    user_id: id,
                    token,
                    gender,
                    imageUrl,
                    assets,
                    bodyType,
                    avatar_id: newAvatarId,
                    partner,
                    favorite,
                    glbFile: `https://api.readyplayer.me/v2/avatars/${newAvatarId}.glb?morphTargets=mouthSmile`,
                },
            });
            setIsLoading(false);

            return {
                user_id: id,
                token,
                avatar_id: newAvatarId,
                imageUrl,
                assets,
                bodyType,
                glbFile: `https://api.readyplayer.me/v2/avatars/${newAvatarId}.glb?morphTargets=mouthSmile`,
            };
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    // step 2: get assets for customization
    const getAllAssets = async () => {
        try {
            const { data } = await axios.get(
                `${url}/assets?filter=usable-by-user-and-app&filterApplicationId=${applicationId}&filterUserId=${character.user_id}`,
                {
                    headers: {
                        "X-APP-ID": applicationId,
                        Authorization: `Bearer ${character.token}`,
                    },
                },
            );

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const queryAssets = async (limit, page, type, gender = "neutral") => {
        try {
            setIsLoading(true);

            let typed = assetEntities[type];

            const { data } = await axios.get(
                `https://api.readyplayer.me/v1/assets?order=name&limit=${limit}&applicationIds=${applicationId}&page=${page}&gender=female&gender=neutral&gender=male&type=${typed}`,
                {
                    headers: {
                        "X-APP-ID": applicationId,
                        Authorization: `Bearer ${character.token}`,
                    },
                },
            );
            setIsLoading(false);
            return data;
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };

    const equipAssetToCharacter = async (avatarMenu, assetId) => {
        try {
            setIsLoadingAvatar(true);
            setIsLoading(true);

            const type = assetEntities[avatarMenu];
            const asset = assetTypes[type];

            // equip new asset
            const {
                data: { data },
            } = await axios.patch(
                `${urlV2}/avatars/${character.avatar_id}`,
                {
                    data: {
                        assets: {
                            [asset]: assetId,
                            outfit: "",
                        },
                    },
                },
                {
                    headers: {
                        "X-APP-ID": applicationId,
                        Authorization: `Bearer ${character.token}`,
                    },
                },
            );

            await axios.put(
                `${urlV2}/avatars/${character.avatar_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${character.token}`,
                    },
                },
            );

            dispatch({
                type: "SET_RPM_USER_DATA",
                payload: {
                    ...data,
                    glbFile: `https://api.readyplayer.me/v2/avatars/${character.avatar_id}.glb?morphTargets=mouthSmile`,
                },
            });

            setIsLoading(false);
            setIsLoadingAvatar(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsLoadingAvatar(false);
        }
    };

    const saveAvatar = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.put(
                `${urlV2}/avatars/${character.avatar_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${character.token}`,
                    },
                },
            );

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const fetchAvatar = async () => {
        try {
            setIsLoading(true);
            const { data } = axios.get(
                `https://models.readyplayer.me/${character.avatar_id}.glb?morphTargets=mouthSmile`,
            );

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return {
        createAnonUser,
        getAllAssets,
        queryAssets,
        equipAssetToCharacter,
        fetchAvatar,
        saveAvatar,
        isLoading,
    };
}
