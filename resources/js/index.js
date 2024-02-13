import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "../css/app.css";
import { AvatarContext } from "./Context/AvatarContext";
import { AppContext } from "./Context/AppContext";
import { default as AuthIndex } from "./Pages/Auth/Index";
import { default as CreationIndex } from "./Pages/Creation/Index";
import {
    ThirdwebProvider,
    metamaskWallet,
    walletConnect,
    embeddedWallet,
    localWallet,
} from "@thirdweb-dev/react";
import theme from "./theme/theme";

const App = () => {
    localStorage.setItem("chakra-ui-color-mode", "light");

    return (
        <BrowserRouter basename={"/react"}>
            <Routes>
                <Route path="/auth/" element={<AuthIndex />} />
                <Route path={"/creation"} element={<CreationIndex />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const container = document.getElementById("index");
const root = ReactDOM.createRoot(container);

if (root) {
    root.render(
        <ThirdwebProvider
            activeChain="mumbai"
            clientId="bf69d74a5e5a7011d62e0b5bf7f5606c"
            authConfig={{
                domain: "http://localhost:8000",
                authUrl: "/api/auth",
            }}
            autoConnect={false}
            supportedWallets={[metamaskWallet(), embeddedWallet()]}
        >
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={"light"} />
                <AppContext>
                    <AvatarContext>
                        <App />
                    </AvatarContext>
                </AppContext>
            </ChakraProvider>
        </ThirdwebProvider>,
    );
}
