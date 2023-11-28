require('./bootstrap');
const thirdweb = require('@thirdweb-dev/sdk');
const { MetaMaskWallet, PaperWallet } = require("@thirdweb-dev/wallets");
const html2canvas = require('html2canvas');

window.html2canvas = html2canvas;

window.thirdweb = thirdweb;
const sdk = new window.thirdweb.ThirdwebSDK("mumbai", {
    clientId: "44aa3ec3d8ffe49358a72c91c8e99e83",
});

sdk.getContract("0x247cebbf74CD0E62350538F1DE8333a3FC85Dbb7", 'edition-drop').then(contract => {
   window.EditionContract = contract;
    document.dispatchEvent(
        new CustomEvent("contract:init", {
        })
    );
});

sdk.getContract("0xE09fEA852A6EDe7b202f2eE8f535A0921CC7D502", 'marketplace-v3').then(contract => {
   window.MarketplaceContract = contract;
   document.dispatchEvent(
       new CustomEvent("marketplace-contract:init", {
       })
   )
});

window.ThirdWebSdk = sdk;
window.MetaMask = new MetaMaskWallet({
    clientId: '44aa3ec3d8ffe49358a72c91c8e99e83'
});
window.PaperWallet = new PaperWallet({
    chain: 'mumbai',
    paperClientId: '69029336-0647-469b-8348-7a947f8c1609'
});
