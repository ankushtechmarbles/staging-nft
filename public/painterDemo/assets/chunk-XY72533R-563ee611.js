import { d as chakra, f as forwardRef, j as jsxRuntimeExports, c as cx, aC as CloseButton, i as callAllHandlers } from "./index-0d430626.js";
import { u as useModalContext, b as useModalStyles } from "./CustomDrawer-234721d4.js";
var Box = chakra("div");
Box.displayName = "Box";
var Square = forwardRef(function Square2(props, ref) {
  const { size, centerContent = true, ...rest } = props;
  const styles = centerContent ? { display: "flex", alignItems: "center", justifyContent: "center" } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      boxSize: size,
      __css: {
        ...styles,
        flexShrink: 0,
        flexGrow: 0
      },
      ...rest
    }
  );
});
Square.displayName = "Square";
var Circle = forwardRef(function Circle2(props, ref) {
  const { size, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size, ref, borderRadius: "9999px", ...rest });
});
Circle.displayName = "Circle";
var ModalCloseButton = forwardRef(
  (props, ref) => {
    const { onClick, className, ...rest } = props;
    const { onClose } = useModalContext();
    const _className = cx("chakra-modal__close-btn", className);
    const styles = useModalStyles();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CloseButton,
      {
        ref,
        __css: styles.closeButton,
        className: _className,
        onClick: callAllHandlers(onClick, (event) => {
          event.stopPropagation();
          onClose();
        }),
        ...rest
      }
    );
  }
);
ModalCloseButton.displayName = "ModalCloseButton";
export {
  Box as B,
  ModalCloseButton as M
};
