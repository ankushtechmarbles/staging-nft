require('./bootstrap');
const thirdweb = require('@thirdweb-dev/sdk');
const { MetaMaskWallet, PaperWallet } = require("@thirdweb-dev/wallets");

window.thirdweb = thirdweb;
window.MetaMask = new MetaMaskWallet({
    clientId: '44aa3ec3d8ffe49358a72c91c8e99e83'
});
window.PaperWallet = new PaperWallet({
    chain: 'mumbai',
    paperClientId: '69029336-0647-469b-8348-7a947f8c1609'
});
