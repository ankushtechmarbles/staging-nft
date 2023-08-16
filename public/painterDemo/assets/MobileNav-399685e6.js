import { j as jsxRuntimeExports, P as SVG_Icon, af as userUserInfoStore, ae as useCookies, az as useNavigate, r as reactExports, ag as useAddress, ah as useMetamask, ai as useWalletConnect, aj as useCoinbaseWallet, al as useDisconnect, a0 as useCreateToast, aw as Link, Q as usePainterStore, B as Button, aA as F, aB as AiOutlineTwitter, a2 as FaDiscord, V as axios } from "./index-0d430626.js";
import { C as CustomDrawer } from "./CustomDrawer-234721d4.js";
import { M as ModalCloseButton, B as Box } from "./chunk-XY72533R-563ee611.js";
const Body = ({ onClose }) => {
  const { user, Paper } = userUserInfoStore();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [paperUserDetails, setPaperUserDetails] = reactExports.useState();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbase = useCoinbaseWallet();
  const disconnect = useDisconnect();
  const createToast = useCreateToast();
  const logout = async () => {
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
    removeCookie("token");
    localStorage.removeItem("user");
    forceUpdate();
    window.location.reload();
  };
  reactExports.useEffect(() => {
    if (address) {
      createToast("EVM Wallet Connected", "success");
    }
  }, [address]);
  reactExports.useEffect(() => {
    const getPaperUserStatus = async () => {
      const userStatus = await Paper.getUserStatus();
      if (userStatus) {
        setPaperUserDetails(userStatus);
      }
    };
    getPaperUserStatus();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        onClick: () => {
          usePainterStore.setState({
            currentPage: "PAINTER",
            optionsView: "OPTIONS"
          });
          navigate("/");
          onClose();
        },
        children: "Play"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/about", children: "About" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/leaderboard", marginRight: 10, children: "Leaderboard" }),
    !user && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        fontWeight: "hairline",
        fontSize: "1em",
        padding: 0,
        background: "transparent",
        marginRight: 10,
        onClick: () => {
          navigate("/auth/login");
          onClose();
        },
        children: "Login|Signup"
      }
    ),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          background: "transparent",
          fontWeight: "hairline",
          fontSize: "1em",
          padding: 0,
          marginRight: 10,
          onClick: () => {
            navigate("/user");
            onClose();
          },
          children: "Profile"
        }
      ),
      !address && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            background: "transparent",
            fontWeight: "hairline",
            fontSize: "1em",
            padding: 0,
            marginRight: 10,
            onClick: connectWithMetamask,
            children: "Connect Metamask"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            background: "transparent",
            fontWeight: "hairline",
            fontSize: "1em",
            padding: 0,
            marginRight: 10,
            onClick: connectWithMetamask,
            children: "Metamask"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            background: "transparent",
            fontWeight: "hairline",
            fontSize: "1em",
            padding: 0,
            marginRight: 10,
            onClick: connectWithWalletConnect,
            children: "Wallet Connect"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            background: "transparent",
            fontWeight: "hairline",
            fontSize: "1em",
            padding: 0,
            marginRight: 10,
            onClick: connectWithCoinbase,
            children: "Coinbase"
          }
        )
      ] }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          background: "transparent",
          fontWeight: "hairline",
          fontSize: "1em",
          padding: 0,
          marginRight: 10,
          onClick: async () => {
            await disconnect();
            createToast("EVM Wallet Disconnected", "warning");
            onClose();
            navigate("/");
          },
          children: "Disconnect Wallet"
        }
      ),
      paperUserDetails?.status === F.LOGGED_IN_NEW_DEVICE && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          background: "transparent",
          fontWeight: "hairline",
          fontSize: "1em",
          padding: 0,
          marginRight: 10,
          onClick: async () => {
            onClose();
            await Paper.initializeUser();
            const userStatus = await Paper.getUserStatus();
            setPaperUserDetails(userStatus);
          },
          children: "initialize Wallet"
        }
      ),
      (paperUserDetails?.status === F.LOGGED_IN_WALLET_INITIALIZED || paperUserDetails?.status === F.LOGGED_IN_NEW_DEVICE) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          background: "transparent",
          fontWeight: "hairline",
          fontSize: "1em",
          padding: 0,
          marginRight: 10,
          onClick: async () => {
            onClose();
            await Paper.auth.logout();
            const userStatus = await Paper.getUserStatus();
            setPaperUserDetails(userStatus);
          },
          children: "Disconnect Wallet"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          background: "transparent",
          fontWeight: "hairline",
          fontSize: "1em",
          padding: 0,
          marginRight: 10,
          onClick: logout,
          children: "Logout"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          _hover: { background: "#1DA1F2" },
          variant: "roundOutline",
          width: 10,
          height: 10,
          onClick: () => {
            window.open(
              "https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw",
              "_blank"
            ).focus();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AiOutlineTwitter, { fontSize: "1.5em" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("script", { async: true, src: "https://platform.twitter.com/widgets.js" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          _hover: { background: "#7289DA" },
          variant: "roundOutline",
          marginX: 8,
          width: 10,
          height: 10,
          onClick: () => window.open("https://discord.gg/TtGm2vWw", "_blank").focus(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDiscord, { fontSize: "1.5em" })
        }
      )
    ] })
  ] });
};
const MobileNav = ({ onClose, isOpen }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CustomDrawer,
    {
      body: /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { onClose }),
      bodyStyles: {
        display: "flex",
        flexDir: "column",
        py: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
        fontSize: "40px",
        fontWeight: "thin"
      },
      headerStyles: {
        p: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "solid",
        borderWidth: "1px"
      },
      header: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SVG_Icon, { fileName: "logoV2.svg", maxHeight: 7 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModalCloseButton,
          {
            display: "block",
            pos: "inherit",
            border: "solid",
            borderWidth: "1px",
            borderRadius: "50%"
          }
        )
      ] }),
      onClose,
      isOpen,
      size: "full"
    }
  );
};
export {
  MobileNav as default
};
