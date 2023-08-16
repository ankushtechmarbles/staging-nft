import { U as GenIcon, X as useMediaQuery, j as jsxRuntimeExports, Q as usePainterStore, P as SVG_Icon, T as Text, F as Flex, B as Button, aw as Link } from "./index-0d430626.js";
import { C as CustomDrawer } from "./CustomDrawer-234721d4.js";
import { G as Grid, a as GridItem } from "./chunk-IWVFML3N-9ab5bf28.js";
function BsArrowUpRight(props) {
  return GenIcon({ "tag": "svg", "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "fillRule": "evenodd", "d": "M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" } }] })(props);
}
const IdeaLetter = ({ fileName, title, showText, onClose }) => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Grid,
    {
      templateColumns: "1fr",
      _hover: { cursor: "pointer" },
      onClick: () => {
        if (title === "Experiences")
          title = "EXP.NFT";
        usePainterStore.setState({ ideaView: title.toUpperCase() });
        if (!isLargerThan1000) {
          onClose();
        }
      },
      width: "100%",
      borderBottom: !isLargerThan1000 && "solid",
      borderBottomWidth: !isLargerThan1000 && "1px",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GridItem,
        {
          paddingLeft: !isLargerThan1000 && "2rem",
          display: "flex",
          alignSelf: "center",
          alignItems: !isLargerThan1000 ? "flex-end" : "center",
          paddingY: !isLargerThan1000 ? 10 : 5,
          width: "100%",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SVG_Icon,
              {
                height: !isLargerThan1000 ? "5rem" : "initial",
                fileName,
                marginRight: 5
              }
            ),
            showText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Text,
              {
                color: "rgba(112, 112, 112, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                fontSize: !isLargerThan1000 ? "2.5em" : "initial",
                children: [
                  title,
                  !isLargerThan1000 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    BsArrowUpRight,
                    {
                      color: "rgba(112, 112, 112, 1)",
                      display: "inline"
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
};
const IdeaView = ({ onClose }) => {
  const { ideaView } = usePainterStore();
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      flexDir: "column",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "100%",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { flexDir: "column", width: !isLargerThan1000 && "100%", children: [
          !isLargerThan1000 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Flex,
            {
              borderBottom: "solid",
              borderBottomWidth: "1px",
              borderBottomColor: "black",
              width: "100%",
              justifyContent: "flex-end",
              alignContent: "flex-start",
              height: "5rem",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  border: "solid",
                  padding: 0,
                  marginRight: "2rem",
                  borderWidth: "1px",
                  borderRadius: "50%",
                  position: "relative",
                  height: 8,
                  minWidth: 8,
                  onClick: () => {
                    onClose();
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SVG_Icon, { padding: 0, margin: 0, fileName: "closeButton.svg" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IdeaLetter,
            {
              fileName: "idea_I.svg",
              title: "Invisibly",
              showText: ideaView === "INVISIBLY" || !isLargerThan1000,
              onClose
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IdeaLetter,
            {
              fileName: "idea_D.svg",
              title: "Doap",
              showText: ideaView === "DOAP" || !isLargerThan1000,
              onClose
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IdeaLetter,
            {
              fileName: "idea_E.svg",
              title: "Experiences",
              showText: ideaView === "EXP.NFT" || !isLargerThan1000,
              onClose
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IdeaLetter,
            {
              fileName: "idea_A.svg",
              title: "Audio",
              showText: ideaView === "AUDIO" || !isLargerThan1000,
              onClose
            }
          )
        ] }),
        isLargerThan1000 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Flex,
          {
            flexDir: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "© IDEA NFTs 2023" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "https://www.idea.thecela.com/terms", children: "Terms of Use" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "https://idea-nfts.com/privacy-policy", children: "Privacy Policy" })
            ]
          }
        )
      ]
    }
  );
};
const MobileIdeaOptions = ({ isOpen, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CustomDrawer,
    {
      isOpen,
      size: "full",
      body: /* @__PURE__ */ jsxRuntimeExports.jsx(
        IdeaView,
        {
          onClose: () => {
            onClose();
          }
        }
      ),
      bodyStyles: {
        padding: 0
      }
    }
  );
};
export {
  MobileIdeaOptions as default
};
