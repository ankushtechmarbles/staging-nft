import { useState } from "react";
import { useAppContext } from "../Context/AppContext";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAppContext();

    const authenticate = (authType) => {
        switch (authType) {
            default:
                break;
        }
    };

    return { authenticate, loading };
}
