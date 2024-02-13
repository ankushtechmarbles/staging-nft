import {
    metamaskWallet,
    useConnect,
    useLogin,
    useWallet,
} from "@thirdweb-dev/react";
import { useState } from "react";
import { useAppContext } from "../Context/AppContext";

const metamaskConfig = metamaskWallet({
    domain: "localhost:8000",
});

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const { login } = useLogin();
    const connect = useConnect();
    const wallet = useWallet();

    const authenticate = async (authType) => {
        try {
            setLoading(true);
            switch (authType) {
                case "google":
                    window.location.href = "/auth/google/login";
                    break;
                case "facebook":
                    window.location.href = "/auth/facebook/login";
                    break;
                case "metamask":
                    try {
                        if (!wallet) {
                            await connect(metamaskConfig);
                        }

                        const data = await login();

                        console.log(data);
                    } catch (e) {
                        console.log(e);
                    }
                    break;
                case "paper":
                    break;
                default:
                    break;
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    return { authenticate, loading };
}
