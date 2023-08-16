import { E as buffer, aW as __vitePreload } from "./index-0d430626.js";
const t = Symbol();
const s = Object.getPrototypeOf, c$2 = /* @__PURE__ */ new WeakMap(), l$1 = (e) => e && (c$2.has(e) ? c$2.get(e) : s(e) === Object.prototype || s(e) === Array.prototype), y$1 = (e) => l$1(e) && e[t] || null, h = (e, t2 = true) => {
  c$2.set(e, t2);
};
const isObject = (x2) => typeof x2 === "object" && x2 !== null;
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x2) => isObject(x2) && !refSet.has(x2) && (Array.isArray(x2) || !(Symbol.iterator in x2)) && !(x2 instanceof WeakMap) && !(x2 instanceof WeakSet) && !(x2 instanceof Error) && !(x2 instanceof Number) && !(x2 instanceof Date) && !(x2 instanceof String) && !(x2 instanceof RegExp) && !(x2 instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const desc = {
      value,
      enumerable: true,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return snap;
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (({ "VITE_ASSETS_PATH": "/creator/", "VITE_CHAIN_ID": "Mumbai", "VITE_PAINTER_CONTRACT": "0xFE6Ef6E969Cc39B72B22F9A126b798C7d51c5b6c", "VITE_AI_CONTRACT": "0x82F30530571Ed6f99399F5a10aE934Cc5f6f68b9", "VITE_MARKETPLACE_CONTRACT": "0xf647Ae7b9d70C49504120e2ED03Ec30054e72fEf", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } && "production") !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (({ "VITE_ASSETS_PATH": "/creator/", "VITE_CHAIN_ID": "Mumbai", "VITE_PAINTER_CONTRACT": "0xFE6Ef6E969Cc39B72B22F9A126b798C7d51c5b6c", "VITE_AI_CONTRACT": "0x82F30530571Ed6f99399F5a10aE934Cc5f6f68b9", "VITE_MARKETPLACE_CONTRACT": "0xf647Ae7b9d70C49504120e2ED03Ec30054e72fEf", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } && "production") !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y$1(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e) => {
          value.status = "rejected";
          value.reason = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
const [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (({ "VITE_ASSETS_PATH": "/creator/", "VITE_CHAIN_ID": "Mumbai", "VITE_PAINTER_CONTRACT": "0xFE6Ef6E969Cc39B72B22F9A126b798C7d51c5b6c", "VITE_AI_CONTRACT": "0x82F30530571Ed6f99399F5a10aE934Cc5f6f68b9", "VITE_MARKETPLACE_CONTRACT": "0xf647Ae7b9d70C49504120e2ED03Ec30054e72fEf", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } && "production") !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (({ "VITE_ASSETS_PATH": "/creator/", "VITE_CHAIN_ID": "Mumbai", "VITE_PAINTER_CONTRACT": "0xFE6Ef6E969Cc39B72B22F9A126b798C7d51c5b6c", "VITE_AI_CONTRACT": "0x82F30530571Ed6f99399F5a10aE934Cc5f6f68b9", "VITE_MARKETPLACE_CONTRACT": "0xf647Ae7b9d70C49504120e2ED03Ec30054e72fEf", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } && "production") !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
let N;
const C = { ethereumClient: void 0, setEthereumClient(e) {
  N = e;
}, client() {
  if (N)
    return N;
  throw new Error("ClientCtrl has no client set");
} }, i$1 = proxy({ history: ["ConnectWallet"], view: "ConnectWallet", data: void 0 }), b$1 = { state: i$1, subscribe(e) {
  return subscribe(i$1, () => e(i$1));
}, push(e, t2) {
  e !== i$1.view && (i$1.view = e, t2 && (i$1.data = t2), i$1.history.push(e));
}, reset(e) {
  i$1.view = e, i$1.history = [e];
}, replace(e) {
  i$1.history.length > 1 && (i$1.history[i$1.history.length - 1] = e, i$1.view = e);
}, goBack() {
  if (i$1.history.length > 1) {
    i$1.history.pop();
    const [e] = i$1.history.slice(-1);
    i$1.view = e;
  }
}, setData(e) {
  i$1.data = e;
} }, c$1 = { WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE", W3M_VERSION: "W3M_VERSION", W3M_PREFER_INJECTED_URL_FLAG: "w3mPreferInjected", RECOMMENDED_WALLET_AMOUNT: 9, isMobile() {
  return typeof window < "u" ? !!(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : false;
}, isAndroid() {
  return c$1.isMobile() && navigator.userAgent.toLowerCase().includes("android");
}, isIos() {
  const e = navigator.userAgent.toLowerCase();
  return c$1.isMobile() && (e.includes("iphone") || e.includes("ipad"));
}, isHttpUrl(e) {
  return e.startsWith("http://") || e.startsWith("https://");
}, isArray(e) {
  return Array.isArray(e) && e.length > 0;
}, formatNativeUrl(e, t2, n) {
  if (c$1.isHttpUrl(e))
    return this.formatUniversalUrl(e, t2, n);
  let s2 = e;
  s2.includes("://") || (s2 = e.replaceAll("/", "").replaceAll(":", ""), s2 = `${s2}://`), this.setWalletConnectDeepLink(s2, n);
  const a2 = encodeURIComponent(t2);
  return `${s2}wc?uri=${a2}`;
}, formatUniversalUrl(e, t2, n) {
  if (!c$1.isHttpUrl(e))
    return this.formatNativeUrl(e, t2, n);
  let s2 = e;
  e.endsWith("/") && (s2 = e.slice(0, -1)), this.setWalletConnectDeepLink(s2, n);
  const a2 = encodeURIComponent(t2);
  return `${s2}/wc?uri=${a2}`;
}, async wait(e) {
  return new Promise((t2) => {
    setTimeout(t2, e);
  });
}, openHref(e, t2) {
  window.open(e, t2, "noreferrer noopener");
}, setWalletConnectDeepLink(e, t2) {
  localStorage.setItem(c$1.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t2 }));
}, setWalletConnectAndroidDeepLink(e) {
  const [t2] = e.split("?");
  localStorage.setItem(c$1.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: t2, name: "Android" }));
}, removeWalletConnectDeepLink() {
  localStorage.removeItem(c$1.WALLETCONNECT_DEEPLINK_CHOICE);
}, setWeb3ModalVersionInStorage() {
  typeof localStorage < "u" && localStorage.setItem(c$1.W3M_VERSION, "2.4.2");
}, getWalletRouterData() {
  var e;
  const t2 = (e = b$1.state.data) == null ? void 0 : e.Wallet;
  if (!t2)
    throw new Error('Missing "Wallet" view data');
  return t2;
}, getSwitchNetworkRouterData() {
  var e;
  const t2 = (e = b$1.state.data) == null ? void 0 : e.SwitchNetwork;
  if (!t2)
    throw new Error('Missing "SwitchNetwork" view data');
  return t2;
}, isPreferInjectedFlag() {
  return typeof location < "u" ? new URLSearchParams(location.search).has(c$1.W3M_PREFER_INJECTED_URL_FLAG) : false;
} }, B = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https")), u = proxy({ enabled: B, userSessionId: "", events: [], connectedWalletId: void 0 }), H = { state: u, subscribe(e) {
  return subscribe(u.events, () => e(snapshot(u.events[u.events.length - 1])));
}, initialize() {
  u.enabled && typeof crypto < "u" && (u.userSessionId = crypto.randomUUID());
}, setConnectedWalletId(e) {
  u.connectedWalletId = e;
}, click(e) {
  if (u.enabled) {
    const t2 = { type: "CLICK", name: e.name, userSessionId: u.userSessionId, timestamp: Date.now(), data: e };
    u.events.push(t2);
  }
}, track(e) {
  if (u.enabled) {
    const t2 = { type: "TRACK", name: e.name, userSessionId: u.userSessionId, timestamp: Date.now(), data: e };
    u.events.push(t2);
  }
}, view(e) {
  if (u.enabled) {
    const t2 = { type: "VIEW", name: e.name, userSessionId: u.userSessionId, timestamp: Date.now(), data: e };
    u.events.push(t2);
  }
} }, l = proxy({ selectedChain: void 0, chains: void 0, standaloneChains: void 0, standaloneUri: void 0, isStandalone: false, isAuth: false, isCustomDesktop: false, isCustomMobile: false, isDataLoaded: false, isUiLoaded: false, isPreferInjected: false, walletConnectVersion: 1 }), d$1 = { state: l, subscribe(e) {
  return subscribe(l, () => e(l));
}, setChains(e) {
  l.chains = e;
}, setStandaloneChains(e) {
  l.standaloneChains = e;
}, setStandaloneUri(e) {
  l.standaloneUri = e;
}, getSelectedChain() {
  const e = C.client().getNetwork().chain;
  return e && (l.selectedChain = e), l.selectedChain;
}, setSelectedChain(e) {
  l.selectedChain = e;
}, setIsStandalone(e) {
  l.isStandalone = e;
}, setIsCustomDesktop(e) {
  l.isCustomDesktop = e;
}, setIsCustomMobile(e) {
  l.isCustomMobile = e;
}, setIsDataLoaded(e) {
  l.isDataLoaded = e;
}, setIsUiLoaded(e) {
  l.isUiLoaded = e;
}, setWalletConnectVersion(e) {
  l.walletConnectVersion = e;
}, setIsPreferInjected(e) {
  l.isPreferInjected = e;
}, setIsAuth(e) {
  l.isAuth = e;
} }, O = proxy({ projectId: "", mobileWallets: void 0, desktopWallets: void 0, walletImages: void 0, chainImages: void 0, tokenImages: void 0, tokenContracts: void 0, standaloneChains: void 0, enableStandaloneMode: false, enableAuthMode: false, enableNetworkView: false, enableAccountView: true, enableExplorer: true, defaultChain: void 0, explorerExcludedWalletIds: void 0, explorerRecommendedWalletIds: void 0, termsOfServiceUrl: void 0, privacyPolicyUrl: void 0 }), y = { state: O, subscribe(e) {
  return subscribe(O, () => e(O));
}, setConfig(e) {
  var t2, n, s2, a2;
  H.initialize(), d$1.setStandaloneChains(e.standaloneChains), d$1.setIsStandalone(!!((t2 = e.standaloneChains) != null && t2.length) || !!e.enableStandaloneMode), d$1.setIsAuth(!!e.enableAuthMode), d$1.setIsCustomMobile(!!((n = e.mobileWallets) != null && n.length)), d$1.setIsCustomDesktop(!!((s2 = e.desktopWallets) != null && s2.length)), d$1.setWalletConnectVersion((a2 = e.walletConnectVersion) != null ? a2 : 1), d$1.state.isStandalone || (d$1.setChains(C.client().chains), d$1.setIsPreferInjected(C.client().isInjectedProviderInstalled() && c$1.isPreferInjectedFlag())), e.defaultChain && d$1.setSelectedChain(e.defaultChain), c$1.setWeb3ModalVersionInStorage(), Object.assign(O, e);
} }, o = proxy({ address: void 0, profileName: void 0, profileAvatar: void 0, profileLoading: false, balanceLoading: false, balance: void 0, isConnected: false }), K = { state: o, subscribe(e) {
  return subscribe(o, () => e(o));
}, getAccount() {
  const e = C.client().getAccount();
  o.address = e.address, o.isConnected = e.isConnected;
}, async fetchProfile(e, t2) {
  var n;
  try {
    o.profileLoading = true;
    const s2 = t2 ?? o.address, a2 = (n = d$1.state.chains) == null ? void 0 : n.find((r) => r.id === 1);
    if (s2 && a2) {
      const r = await C.client().fetchEnsName({ address: s2, chainId: 1 });
      if (r) {
        const p = await C.client().fetchEnsAvatar({ name: r, chainId: 1 });
        p && await e(p), o.profileAvatar = p;
      }
      o.profileName = r;
    }
  } finally {
    o.profileLoading = false;
  }
}, async fetchBalance(e) {
  try {
    const { chain: t2 } = C.client().getNetwork(), { tokenContracts: n } = y.state;
    let s2;
    t2 && n && (s2 = n[t2.id]), o.balanceLoading = true;
    const a2 = e ?? o.address;
    if (a2) {
      const r = await C.client().fetchBalance({ address: a2, token: s2 });
      o.balance = { amount: r.formatted, symbol: r.symbol };
    }
  } finally {
    o.balanceLoading = false;
  }
}, setAddress(e) {
  o.address = e;
}, setIsConnected(e) {
  o.isConnected = e;
}, resetBalance() {
  o.balance = void 0;
}, resetAccount() {
  o.address = void 0, o.isConnected = false, o.profileName = void 0, o.profileAvatar = void 0, o.balance = void 0;
} }, M = "https://explorer-api.walletconnect.com";
async function U(e, t2) {
  const n = new URL(e, M);
  return n.searchParams.append("projectId", y.state.projectId), Object.entries(t2).forEach(([s2, a2]) => {
    a2 && n.searchParams.append(s2, String(a2));
  }), (await fetch(n)).json();
}
const I = { async getDesktopListings(e) {
  return U("/w3m/v1/getDesktopListings", e);
}, async getMobileListings(e) {
  return U("/w3m/v1/getMobileListings", e);
}, async getInjectedListings(e) {
  return U("/w3m/v1/getInjectedListings", e);
}, async getAllListings(e) {
  return U("/w3m/v1/getAllListings", e);
}, getWalletImageUrl(e) {
  return `${M}/w3m/v1/getWalletImage/${e}?projectId=${y.state.projectId}`;
}, getAssetImageUrl(e) {
  return `${M}/w3m/v1/getAssetImage/${e}?projectId=${y.state.projectId}`;
} };
var F = Object.defineProperty, D = Object.getOwnPropertySymbols, J = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable, k = (e, t2, n) => t2 in e ? F(e, t2, { enumerable: true, configurable: true, writable: true, value: n }) : e[t2] = n, G = (e, t2) => {
  for (var n in t2 || (t2 = {}))
    J.call(t2, n) && k(e, n, t2[n]);
  if (D)
    for (var n of D(t2))
      z.call(t2, n) && k(e, n, t2[n]);
  return e;
};
const P = c$1.isMobile(), g = proxy({ wallets: { listings: [], total: 0, page: 1 }, injectedWallets: [], search: { listings: [], total: 0, page: 1 }, recomendedWallets: [] }), ne = { state: g, async getRecomendedWallets() {
  const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t2 } = y.state;
  if (e === "NONE" || t2 === "ALL" && !e)
    return g.recomendedWallets;
  if (c$1.isArray(e)) {
    const n = { recommendedIds: e.join(",") }, { listings: s2 } = await I.getAllListings(n), a2 = Object.values(s2);
    a2.sort((r, p) => {
      const h2 = e.indexOf(r.id), v = e.indexOf(p.id);
      return h2 - v;
    }), g.recomendedWallets = a2;
  } else {
    const { standaloneChains: n, walletConnectVersion: s2, isAuth: a2 } = d$1.state, r = n?.join(","), p = c$1.isArray(t2), h2 = { page: 1, sdks: a2 ? "auth_v1" : void 0, entries: c$1.RECOMMENDED_WALLET_AMOUNT, chains: r, version: s2, excludedIds: p ? t2.join(",") : void 0 }, { listings: v } = P ? await I.getMobileListings(h2) : await I.getDesktopListings(h2);
    g.recomendedWallets = Object.values(v);
  }
  return g.recomendedWallets;
}, async getWallets(e) {
  const t2 = G({}, e), { explorerRecommendedWalletIds: n, explorerExcludedWalletIds: s2 } = y.state, { recomendedWallets: a2 } = g;
  if (s2 === "ALL")
    return g.wallets;
  t2.search || (a2.length ? t2.excludedIds = a2.map((W) => W.id).join(",") : c$1.isArray(n) && (t2.excludedIds = n.join(","))), c$1.isArray(s2) && (t2.excludedIds = [t2.excludedIds, s2].filter(Boolean).join(",")), d$1.state.isAuth && (t2.sdks = "auth_v1");
  const { page: r, search: p } = e, { listings: h2, total: v } = P ? await I.getMobileListings(t2) : await I.getDesktopListings(t2), j = Object.values(h2), L = p ? "search" : "wallets";
  return g[L] = { listings: [...g[L].listings, ...j], total: v, page: r ?? 1 }, { listings: j, total: v };
}, async getInjectedWallets() {
  const { listings: e } = await I.getInjectedListings({}), t2 = Object.values(e);
  return g.injectedWallets = t2, g.injectedWallets;
}, getWalletImageUrl(e) {
  return I.getWalletImageUrl(e);
}, getAssetImageUrl(e) {
  return I.getAssetImageUrl(e);
}, resetSearch() {
  g.search = { listings: [], total: 0, page: 1 };
} }, A = proxy({ pairingUri: "", pairingError: false }), _ = { state: A, subscribe(e) {
  return subscribe(A, () => e(A));
}, setPairingUri(e) {
  A.pairingUri = e;
}, setPairingError(e) {
  A.pairingError = e;
} }, E = proxy({ open: false }), se = { state: E, subscribe(e) {
  return subscribe(E, () => e(E));
}, async open(e) {
  return new Promise((t2) => {
    const { isStandalone: n, isUiLoaded: s2, isDataLoaded: a2, isPreferInjected: r, selectedChain: p } = d$1.state, { isConnected: h2 } = K.state, { enableNetworkView: v } = y.state;
    if (n)
      d$1.setStandaloneUri(e?.uri), d$1.setStandaloneChains(e?.standaloneChains), b$1.reset("ConnectWallet");
    else if (e != null && e.route)
      b$1.reset(e.route);
    else if (h2)
      b$1.reset("Account");
    else if (v)
      b$1.reset("SelectNetwork");
    else if (r) {
      C.client().connectConnector("injected", p?.id).catch((L) => console.error(L)), t2();
      return;
    } else
      b$1.reset("ConnectWallet");
    const { pairingUri: j } = _.state;
    if (s2 && a2 && (n || j || h2))
      E.open = true, t2();
    else {
      const L = setInterval(() => {
        const W = d$1.state, T = _.state;
        W.isUiLoaded && W.isDataLoaded && (W.isStandalone || T.pairingUri || h2) && (clearInterval(L), E.open = true, t2());
      }, 200);
    }
  });
}, close() {
  E.open = false;
} };
var q = Object.defineProperty, x = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable, R = (e, t2, n) => t2 in e ? q(e, t2, { enumerable: true, configurable: true, writable: true, value: n }) : e[t2] = n, Y = (e, t2) => {
  for (var n in t2 || (t2 = {}))
    Q.call(t2, n) && R(e, n, t2[n]);
  if (x)
    for (var n of x(t2))
      X.call(t2, n) && R(e, n, t2[n]);
  return e;
};
function Z() {
  return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
const S = proxy({ themeMode: Z() ? "dark" : "light" }), ae = { state: S, subscribe(e) {
  return subscribe(S, () => e(S));
}, setThemeConfig(e) {
  const { themeMode: t2, themeVariables: n } = e;
  t2 && (S.themeMode = t2), n && (S.themeVariables = Y({}, n));
} }, w = proxy({ open: false, message: "", variant: "success" }), oe$1 = { state: w, subscribe(e) {
  return subscribe(w, () => e(w));
}, openToast(e, t2) {
  w.open = true, w.message = e, w.variant = t2;
}, closeToast() {
  w.open = false;
} };
typeof window < "u" && (window.Buffer || (window.Buffer = buffer.Buffer), window.global || (window.global = window), window.process || (window.process = { env: {} }));
var c = Object.defineProperty, i = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable, a = (o2, e, t2) => e in o2 ? c(o2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : o2[e] = t2, m = (o2, e) => {
  for (var t2 in e || (e = {}))
    d.call(e, t2) && a(o2, t2, e[t2]);
  if (i)
    for (var t2 of i(e))
      b.call(e, t2) && a(o2, t2, e[t2]);
  return o2;
};
class f {
  constructor(e) {
    this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ae.setThemeConfig, ae.setThemeConfig(e), y.setConfig(m({ enableStandaloneMode: true }, e)), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await __vitePreload(() => import("./index.es-b6033ba8.js"), true ? ["creator/assets/index.es-b6033ba8.js","creator/assets/lit-element-6ea6fe70.js","creator/assets/browser-39805471.js","creator/assets/index-0d430626.js","creator/assets/index-f717afc5.css"] : void 0);
      const e = document.createElement("w3m-modal");
      document.body.insertAdjacentElement("beforeend", e), d$1.setIsUiLoaded(true);
    }
  }
}
const index_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Web3Modal: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  C,
  H,
  K,
  _,
  ae as a,
  b$1 as b,
  c$1 as c,
  d$1 as d,
  index_es as i,
  ne as n,
  oe$1 as o,
  se as s,
  y
};
