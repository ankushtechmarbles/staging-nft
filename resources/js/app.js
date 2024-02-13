require("./bootstrap");
// const thirdweb = require('@thirdweb-dev/sdk');
// const { MetaMaskWallet, PaperWallet } = require("@thirdweb-dev/wallets");
// const html2canvas = require('html2canvas');
//
// window.html2canvas = html2canvas;
//
// window.thirdweb = thirdweb;
// const sdk = new window.thirdweb.ThirdwebSDK("mumbai", {
//     clientId: "44aa3ec3d8ffe49358a72c91c8e99e83",
// });
//
// sdk.getContract("0x247cebbf74CD0E62350538F1DE8333a3FC85Dbb7", 'edition-drop').then(contract => {
//    window.EditionContract = contract;
//     document.dispatchEvent(
//         new CustomEvent("contract:init", {
//         })
//     );
// });
//
// sdk.getContract("0xE09fEA852A6EDe7b202f2eE8f535A0921CC7D502", 'marketplace-v3').then(contract => {
//    window.MarketplaceContract = contract;
//    document.dispatchEvent(
//        new CustomEvent("marketplace-contract:init", {
//        })
//    )
// });
//
// window.ThirdWebSdk = sdk;
// window.MetaMask = new MetaMaskWallet({
//     clientId: '44aa3ec3d8ffe49358a72c91c8e99e83'
// });
// window.PaperWallet = new PaperWallet({
//     chain: 'mumbai',
//     paperClientId: '69029336-0647-469b-8348-7a947f8c1609'
// });

let currentPath = window.location.pathname;

if (currentPath === "/google/callback") {
    let searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get("code");

    if (code === null) {
        throw new Error(
            "code query param must be present when entering /callback path",
        );
    }

    console.log(code);
    useOauthProviderCode(code, "google");
}

if (currentPath === "/facebook/callback") {
    let searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get("code");

    if (code === null) {
        throw new Error(
            "code query param must be present when entering /callback path",
        );
    }

    console.log(code);
    useOauthProviderCode(code, "facebook");
}

async function useOauthProviderCode(code, callback) {
    try {
        const response = await fetch(
            `/api/auth/${callback}/callback?code=${code}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            },
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const token = data.token;
        localStorage.setItem("authToken", token);
        const user = data.user;
        localStorage.setItem("user", JSON.stringify(user));

        redirectToPath(`/react/creation?callback=${callback}`);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function redirectToPath(path) {
    window.location.href = path;
}

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./index");
