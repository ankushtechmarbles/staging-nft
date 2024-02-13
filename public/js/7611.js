"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7611],{4646:(t,i,n)=>{function s(t){return"string"==typeof t?Number.parseInt(t,"0x"===t.trim().substring(0,2)?16:10):"bigint"==typeof t?Number(t):t}n.d(i,{n:()=>s})},97611:(t,i,n)=>{n.d(i,{SignerConnector:()=>d});var s=n(42009),e=n(16074),a=n(27021),r=n(7860),h=n(4646),o=(n(54146),new WeakMap),c=new WeakMap;class d extends a.C{constructor(t){super(),(0,e._)(this,o,{writable:!0,value:void 0}),(0,e._)(this,c,{writable:!0,value:void 0}),(0,s._)(this,"onChainChanged",(t=>{const i=(0,h.n)(t),n=!this.options.chains.find((t=>t.chainId===i));this.emit("change",{chain:{id:i,unsupported:n}})})),this.options=t}async connect(t){t.chainId&&this.switchChain(t.chainId);const i=await this.getSigner();return await i.getAddress()}async disconnect(){(0,e.a)(this,o,void 0),(0,e.a)(this,c,void 0)}async getAddress(){const t=await this.getSigner();if(!t)throw new Error("No signer found");return await t.getAddress()}async isConnected(){try{return!!await this.getAddress()}catch{return!1}}async getProvider(){return(0,e.b)(this,o)||(0,e.a)(this,o,(0,r.b2)(this.options.chain,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,e.b)(this,o)}async getSigner(){if(!(0,e.b)(this,c)){const t=await this.getProvider();(0,e.a)(this,c,p(this.options.signer,t))}return(0,e.b)(this,c)}async switchChain(t){const i=this.options.chains.find((i=>i.chainId===t));if(!i)throw new Error(`Chain not found for chainId ${t}, please add it to the chains property when creating this wallet`);(0,e.a)(this,o,(0,r.b2)(i,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,e.a)(this,c,p(this.options.signer,(0,e.b)(this,o))),this.onChainChanged(t)}async setupListeners(){}updateChains(t){this.options.chains=t}}function p(t,i){return i?t.connect(i):t}}}]);
//# sourceMappingURL=7611.js.map