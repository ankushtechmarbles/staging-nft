"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9498],{4646:(t,i,s)=>{function n(t){return"string"==typeof t?Number.parseInt(t,"0x"===t.trim().substring(0,2)?16:10):"bigint"==typeof t?Number(t):t}s.d(i,{n:()=>n})},89498:(t,i,s)=>{s.d(i,{LocalWalletConnector:()=>d});var n=s(16074),e=s(42009),a=s(27021),h=s(7860),o=s(4646),r=(s(54146),new WeakMap),c=new WeakMap;class d extends a.C{constructor(t){super(),(0,e._)(this,"id","local_wallet"),(0,e._)(this,"name","Local Wallet"),(0,n._)(this,r,{writable:!0,value:void 0}),(0,n._)(this,c,{writable:!0,value:void 0}),(0,e._)(this,"shimDisconnectKey","localWallet.shimDisconnect"),(0,e._)(this,"onChainChanged",(t=>{const i=(0,o.n)(t),s=!this.options.chains.find((t=>t.chainId===i));this.emit("change",{chain:{id:i,unsupported:s}})})),this.options=t}async connect(t){t.chainId&&this.switchChain(t.chainId);const i=await this.getSigner();return await i.getAddress()}async disconnect(){(0,n.a)(this,r,void 0),(0,n.a)(this,c,void 0)}async getAddress(){const t=await this.getSigner();if(!t)throw new Error("No signer found");return await t.getAddress()}async isConnected(){try{return!!await this.getAddress()}catch{return!1}}async getProvider(){return(0,n.b)(this,r)||(0,n.a)(this,r,(0,h.b2)(this.options.chain,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,n.b)(this,r)}async getSigner(){if(!(0,n.b)(this,c)){const t=await this.getProvider();(0,n.a)(this,c,l(this.options.ethersWallet,t))}return(0,n.b)(this,c)}async switchChain(t){const i=this.options.chains.find((i=>i.chainId===t));if(!i)throw new Error(`Chain not found for chainId ${t}, please add it to the chains property when creating this wallet`);(0,n.a)(this,r,(0,h.b2)(i,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,n.a)(this,c,l(this.options.ethersWallet,(0,n.b)(this,r))),this.onChainChanged(t)}async setupListeners(){}updateChains(t){this.options.chains=t}}function l(t,i){return i?t.connect(i):t}}}]);
//# sourceMappingURL=9498.js.map