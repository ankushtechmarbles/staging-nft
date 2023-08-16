import { r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, c as cx, aD as createMedium, aE as createSidecarMedium, as as _extends, aF as useMergeRefs, Z as React, aG as isFocusable, e as mergeRefs, i as callAllHandlers, aH as hideOthers, a as createContext, b as useMultiStyleConfig, aI as Portal, aJ as fullWidthClassName, aK as zeroRightClassName, aL as styleSingleton, aM as RemoveScrollBar, aN as exportSidecar, aO as usePresence, n as useTheme, d as chakra, f as forwardRef } from "./index-0d430626.js";
var TRANSITION_EASINGS = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};
var TRANSITION_VARIANTS = {
  scale: {
    enter: { scale: 1 },
    exit: { scale: 0.95 }
  },
  fade: {
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  pushLeft: {
    enter: { x: "100%" },
    exit: { x: "-30%" }
  },
  pushRight: {
    enter: { x: "-100%" },
    exit: { x: "30%" }
  },
  pushUp: {
    enter: { y: "100%" },
    exit: { y: "-30%" }
  },
  pushDown: {
    enter: { y: "-100%" },
    exit: { y: "30%" }
  },
  slideLeft: {
    position: { left: 0, top: 0, bottom: 0, width: "100%" },
    enter: { x: 0, y: 0 },
    exit: { x: "-100%", y: 0 }
  },
  slideRight: {
    position: { right: 0, top: 0, bottom: 0, width: "100%" },
    enter: { x: 0, y: 0 },
    exit: { x: "100%", y: 0 }
  },
  slideUp: {
    position: { top: 0, left: 0, right: 0, maxWidth: "100vw" },
    enter: { x: 0, y: 0 },
    exit: { x: 0, y: "-100%" }
  },
  slideDown: {
    position: { bottom: 0, left: 0, right: 0, maxWidth: "100vw" },
    enter: { x: 0, y: 0 },
    exit: { x: 0, y: "100%" }
  }
};
function getSlideTransition(options) {
  var _a2;
  const side = (_a2 = options == null ? void 0 : options.direction) != null ? _a2 : "right";
  switch (side) {
    case "right":
      return TRANSITION_VARIANTS.slideRight;
    case "left":
      return TRANSITION_VARIANTS.slideLeft;
    case "bottom":
      return TRANSITION_VARIANTS.slideDown;
    case "top":
      return TRANSITION_VARIANTS.slideUp;
    default:
      return TRANSITION_VARIANTS.slideRight;
  }
}
var TRANSITION_DEFAULTS = {
  enter: {
    duration: 0.2,
    ease: TRANSITION_EASINGS.easeOut
  },
  exit: {
    duration: 0.1,
    ease: TRANSITION_EASINGS.easeIn
  }
};
var withDelay = {
  enter: (transition, delay) => ({
    ...transition,
    delay: typeof delay === "number" ? delay : delay == null ? void 0 : delay["enter"]
  }),
  exit: (transition, delay) => ({
    ...transition,
    delay: typeof delay === "number" ? delay : delay == null ? void 0 : delay["exit"]
  })
};
var variants$1 = {
  enter: ({ transition, transitionEnd, delay } = {}) => {
    var _a2;
    return {
      opacity: 1,
      transition: (_a2 = transition == null ? void 0 : transition.enter) != null ? _a2 : withDelay.enter(TRANSITION_DEFAULTS.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    };
  },
  exit: ({ transition, transitionEnd, delay } = {}) => {
    var _a2;
    return {
      opacity: 0,
      transition: (_a2 = transition == null ? void 0 : transition.exit) != null ? _a2 : withDelay.exit(TRANSITION_DEFAULTS.exit, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    };
  }
};
var fadeConfig = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants$1
};
var Fade = reactExports.forwardRef(function Fade2(props, ref) {
  const {
    unmountOnExit,
    in: isOpen,
    className,
    transition,
    transitionEnd,
    delay,
    ...rest
  } = props;
  const animate = isOpen || unmountOnExit ? "enter" : "exit";
  const show = unmountOnExit ? isOpen && unmountOnExit : true;
  const custom = { transition, transitionEnd, delay };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { custom, children: show && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      className: cx("chakra-fade", className),
      custom,
      ...fadeConfig,
      animate,
      ...rest
    }
  ) });
});
Fade.displayName = "Fade";
var defaultTransition = {
  exit: {
    duration: 0.15,
    ease: TRANSITION_EASINGS.easeInOut
  },
  enter: {
    type: "spring",
    damping: 25,
    stiffness: 180
  }
};
var variants = {
  exit: ({ direction, transition, transitionEnd, delay }) => {
    var _a2;
    const { exit: exitStyles } = getSlideTransition({ direction });
    return {
      ...exitStyles,
      transition: (_a2 = transition == null ? void 0 : transition.exit) != null ? _a2 : withDelay.exit(defaultTransition.exit, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    };
  },
  enter: ({ direction, transitionEnd, transition, delay }) => {
    var _a2;
    const { enter: enterStyles } = getSlideTransition({ direction });
    return {
      ...enterStyles,
      transition: (_a2 = transition == null ? void 0 : transition.enter) != null ? _a2 : withDelay.enter(defaultTransition.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    };
  }
};
var Slide = reactExports.forwardRef(function Slide2(props, ref) {
  const {
    direction = "right",
    style,
    unmountOnExit,
    in: isOpen,
    className,
    transition,
    transitionEnd,
    delay,
    motionProps,
    ...rest
  } = props;
  const transitionStyles = getSlideTransition({ direction });
  const computedStyle = Object.assign(
    { position: "fixed" },
    transitionStyles.position,
    style
  );
  const show = unmountOnExit ? isOpen && unmountOnExit : true;
  const animate = isOpen || unmountOnExit ? "enter" : "exit";
  const custom = { transitionEnd, transition, direction, delay };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { custom, children: show && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ...rest,
      ref,
      initial: "exit",
      className: cx("chakra-slide", className),
      animate,
      exit: "exit",
      custom,
      variants,
      style: computedStyle,
      ...motionProps
    }
  ) });
});
Slide.displayName = "Slide";
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var FOCUS_GROUP = "data-focus-lock";
var FOCUS_DISABLED = "data-focus-lock-disabled";
var FOCUS_ALLOW = "data-no-focus-lock";
var FOCUS_AUTO = "data-autofocus-inside";
var FOCUS_NO_AUTOFOCUS = "data-no-autofocus";
var hiddenGuard = {
  width: "1px",
  height: "0px",
  padding: 0,
  overflow: "hidden",
  position: "fixed",
  top: "1px",
  left: "1px"
};
var mediumFocus = createMedium({}, function(_ref2) {
  var target = _ref2.target, currentTarget = _ref2.currentTarget;
  return {
    target,
    currentTarget
  };
});
var mediumBlur = createMedium();
var mediumEffect = createMedium();
var mediumSidecar = createSidecarMedium({
  async: true
  // focus-lock sidecar is not required on the server
  // however, it might be required for JSDOM tests
  // ssr: true,
});
var emptyArray = [];
var FocusLock$2 = /* @__PURE__ */ reactExports.forwardRef(function FocusLockUI(props, parentRef) {
  var _extends2;
  var _React$useState = reactExports.useState(), realObserved = _React$useState[0], setObserved = _React$useState[1];
  var observed = reactExports.useRef();
  var isActive = reactExports.useRef(false);
  var originalFocusedElement = reactExports.useRef(null);
  var children = props.children, disabled = props.disabled, noFocusGuards = props.noFocusGuards, persistentFocus = props.persistentFocus, crossFrame = props.crossFrame, autoFocus = props.autoFocus;
  props.allowTextSelection;
  var group = props.group, className = props.className, whiteList = props.whiteList, hasPositiveIndices = props.hasPositiveIndices, _props$shards = props.shards, shards = _props$shards === void 0 ? emptyArray : _props$shards, _props$as = props.as, Container = _props$as === void 0 ? "div" : _props$as, _props$lockProps = props.lockProps, containerProps = _props$lockProps === void 0 ? {} : _props$lockProps, SideCar2 = props.sideCar, shouldReturnFocus = props.returnFocus, focusOptions = props.focusOptions, onActivationCallback = props.onActivation, onDeactivationCallback = props.onDeactivation;
  var _React$useState2 = reactExports.useState({}), id = _React$useState2[0];
  var onActivation = reactExports.useCallback(function() {
    originalFocusedElement.current = originalFocusedElement.current || document && document.activeElement;
    if (observed.current && onActivationCallback) {
      onActivationCallback(observed.current);
    }
    isActive.current = true;
  }, [onActivationCallback]);
  var onDeactivation = reactExports.useCallback(function() {
    isActive.current = false;
    if (onDeactivationCallback) {
      onDeactivationCallback(observed.current);
    }
  }, [onDeactivationCallback]);
  reactExports.useEffect(function() {
    if (!disabled) {
      originalFocusedElement.current = null;
    }
  }, []);
  var returnFocus = reactExports.useCallback(function(allowDefer) {
    var returnFocusTo = originalFocusedElement.current;
    if (returnFocusTo && returnFocusTo.focus) {
      var howToReturnFocus = typeof shouldReturnFocus === "function" ? shouldReturnFocus(returnFocusTo) : shouldReturnFocus;
      if (howToReturnFocus) {
        var returnFocusOptions = typeof howToReturnFocus === "object" ? howToReturnFocus : void 0;
        originalFocusedElement.current = null;
        if (allowDefer) {
          Promise.resolve().then(function() {
            return returnFocusTo.focus(returnFocusOptions);
          });
        } else {
          returnFocusTo.focus(returnFocusOptions);
        }
      }
    }
  }, [shouldReturnFocus]);
  var onFocus3 = reactExports.useCallback(function(event) {
    if (isActive.current) {
      mediumFocus.useMedium(event);
    }
  }, []);
  var onBlur3 = mediumBlur.useMedium;
  var setObserveNode = reactExports.useCallback(function(newObserved) {
    if (observed.current !== newObserved) {
      observed.current = newObserved;
      setObserved(newObserved);
    }
  }, []);
  var lockProps = _extends((_extends2 = {}, _extends2[FOCUS_DISABLED] = disabled && "disabled", _extends2[FOCUS_GROUP] = group, _extends2), containerProps);
  var hasLeadingGuards = noFocusGuards !== true;
  var hasTailingGuards = hasLeadingGuards && noFocusGuards !== "tail";
  var mergedRef = useMergeRefs([parentRef, setObserveNode]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, hasLeadingGuards && [
    // nearest focus guard
    /* @__PURE__ */ reactExports.createElement("div", {
      key: "guard-first",
      "data-focus-guard": true,
      tabIndex: disabled ? -1 : 0,
      style: hiddenGuard
    }),
    // first tabbed element guard
    hasPositiveIndices ? /* @__PURE__ */ reactExports.createElement("div", {
      key: "guard-nearest",
      "data-focus-guard": true,
      tabIndex: disabled ? -1 : 1,
      style: hiddenGuard
    }) : null
  ], !disabled && /* @__PURE__ */ reactExports.createElement(SideCar2, {
    id,
    sideCar: mediumSidecar,
    observed: realObserved,
    disabled,
    persistentFocus,
    crossFrame,
    autoFocus,
    whiteList,
    shards,
    onActivation,
    onDeactivation,
    returnFocus,
    focusOptions
  }), /* @__PURE__ */ reactExports.createElement(Container, _extends({
    ref: mergedRef
  }, lockProps, {
    className,
    onBlur: onBlur3,
    onFocus: onFocus3
  }), children), hasTailingGuards && /* @__PURE__ */ reactExports.createElement("div", {
    "data-focus-guard": true,
    tabIndex: disabled ? -1 : 0,
    style: hiddenGuard
  }));
});
FocusLock$2.propTypes = {};
FocusLock$2.defaultProps = {
  children: void 0,
  disabled: false,
  returnFocus: false,
  focusOptions: void 0,
  noFocusGuards: false,
  autoFocus: true,
  persistentFocus: false,
  crossFrame: true,
  hasPositiveIndices: void 0,
  allowTextSelection: void 0,
  group: void 0,
  className: void 0,
  whiteList: void 0,
  shards: void 0,
  as: "div",
  lockProps: {},
  onActivation: void 0,
  onDeactivation: void 0
};
const FocusLockUI2 = FocusLock$2;
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function withSideEffect(reducePropsToState2, handleStateChangeOnClient2) {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }
  return function wrap(WrappedComponent) {
    var mountedInstances = [];
    var state;
    function emitChange() {
      state = reducePropsToState2(mountedInstances.map(function(instance) {
        return instance.props;
      }));
      handleStateChangeOnClient2(state);
    }
    var SideEffect = /* @__PURE__ */ function(_PureComponent) {
      _inheritsLoose(SideEffect2, _PureComponent);
      function SideEffect2() {
        return _PureComponent.apply(this, arguments) || this;
      }
      SideEffect2.peek = function peek() {
        return state;
      };
      var _proto = SideEffect2.prototype;
      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.push(this);
        emitChange();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };
      _proto.render = function render() {
        return /* @__PURE__ */ React.createElement(WrappedComponent, this.props);
      };
      return SideEffect2;
    }(reactExports.PureComponent);
    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
    return SideEffect;
  };
}
var toArray = function(a) {
  var ret = Array(a.length);
  for (var i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};
var asArray = function(a) {
  return Array.isArray(a) ? a : [a];
};
var getFirst = function(a) {
  return Array.isArray(a) ? a[0] : a;
};
var isElementHidden = function(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  var computedStyle = window.getComputedStyle(node, null);
  if (!computedStyle || !computedStyle.getPropertyValue) {
    return false;
  }
  return computedStyle.getPropertyValue("display") === "none" || computedStyle.getPropertyValue("visibility") === "hidden";
};
var getParentNode = function(node) {
  return node.parentNode && node.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node.parentNode.host
  ) : node.parentNode;
};
var isTopNode = function(node) {
  return node === document || node && node.nodeType === Node.DOCUMENT_NODE;
};
var isVisibleUncached = function(node, checkParent) {
  return !node || isTopNode(node) || !isElementHidden(node) && checkParent(getParentNode(node));
};
var isVisibleCached = function(visibilityCache, node) {
  var cached = visibilityCache.get(node);
  if (cached !== void 0) {
    return cached;
  }
  var result = isVisibleUncached(node, isVisibleCached.bind(void 0, visibilityCache));
  visibilityCache.set(node, result);
  return result;
};
var isAutoFocusAllowedUncached = function(node, checkParent) {
  return node && !isTopNode(node) ? isAutoFocusAllowed(node) ? checkParent(getParentNode(node)) : false : true;
};
var isAutoFocusAllowedCached = function(cache, node) {
  var cached = cache.get(node);
  if (cached !== void 0) {
    return cached;
  }
  var result = isAutoFocusAllowedUncached(node, isAutoFocusAllowedCached.bind(void 0, cache));
  cache.set(node, result);
  return result;
};
var getDataset = function(node) {
  return node.dataset;
};
var isHTMLButtonElement = function(node) {
  return node.tagName === "BUTTON";
};
var isHTMLInputElement = function(node) {
  return node.tagName === "INPUT";
};
var isRadioElement = function(node) {
  return isHTMLInputElement(node) && node.type === "radio";
};
var notHiddenInput = function(node) {
  return !((isHTMLInputElement(node) || isHTMLButtonElement(node)) && (node.type === "hidden" || node.disabled));
};
var isAutoFocusAllowed = function(node) {
  var attribute = node.getAttribute(FOCUS_NO_AUTOFOCUS);
  return ![true, "true", ""].includes(attribute);
};
var isGuard = function(node) {
  var _a2;
  return Boolean(node && ((_a2 = getDataset(node)) === null || _a2 === void 0 ? void 0 : _a2.focusGuard));
};
var isNotAGuard = function(node) {
  return !isGuard(node);
};
var isDefined = function(x) {
  return Boolean(x);
};
var tabSort = function(a, b) {
  var tabDiff = a.tabIndex - b.tabIndex;
  var indexDiff = a.index - b.index;
  if (tabDiff) {
    if (!a.tabIndex) {
      return 1;
    }
    if (!b.tabIndex) {
      return -1;
    }
  }
  return tabDiff || indexDiff;
};
var orderByTabIndex = function(nodes, filterNegative, keepGuards) {
  return toArray(nodes).map(function(node, index) {
    return {
      node,
      index,
      tabIndex: keepGuards && node.tabIndex === -1 ? (node.dataset || {}).focusGuard ? 0 : -1 : node.tabIndex
    };
  }).filter(function(data) {
    return !filterNegative || data.tabIndex >= 0;
  }).sort(tabSort);
};
var tabbables = [
  "button:enabled",
  "select:enabled",
  "textarea:enabled",
  "input:enabled",
  // elements with explicit roles will also use explicit tabindex
  // '[role="button"]',
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "[tabindex]",
  "[contenteditable]",
  "[autofocus]"
];
var queryTabbables = tabbables.join(",");
var queryGuardTabbables = "".concat(queryTabbables, ", [data-focus-guard]");
var getFocusablesWithShadowDom = function(parent, withGuards) {
  return toArray((parent.shadowRoot || parent).children).reduce(function(acc, child) {
    return acc.concat(child.matches(withGuards ? queryGuardTabbables : queryTabbables) ? [child] : [], getFocusablesWithShadowDom(child));
  }, []);
};
var getFocusablesWithIFrame = function(parent, withGuards) {
  var _a2;
  if (parent instanceof HTMLIFrameElement && ((_a2 = parent.contentDocument) === null || _a2 === void 0 ? void 0 : _a2.body)) {
    return getFocusables([parent.contentDocument.body], withGuards);
  }
  return [parent];
};
var getFocusables = function(parents, withGuards) {
  return parents.reduce(function(acc, parent) {
    var _a2;
    var focusableWithShadowDom = getFocusablesWithShadowDom(parent, withGuards);
    var focusableWithIframes = (_a2 = []).concat.apply(_a2, focusableWithShadowDom.map(function(node) {
      return getFocusablesWithIFrame(node, withGuards);
    }));
    return acc.concat(
      // add all tabbables inside and within shadow DOMs in DOM order
      focusableWithIframes,
      // add if node is tabbable itself
      parent.parentNode ? toArray(parent.parentNode.querySelectorAll(queryTabbables)).filter(function(node) {
        return node === parent;
      }) : []
    );
  }, []);
};
var getParentAutofocusables = function(parent) {
  var parentFocus = parent.querySelectorAll("[".concat(FOCUS_AUTO, "]"));
  return toArray(parentFocus).map(function(node) {
    return getFocusables([node]);
  }).reduce(function(acc, nodes) {
    return acc.concat(nodes);
  }, []);
};
var filterFocusable = function(nodes, visibilityCache) {
  return toArray(nodes).filter(function(node) {
    return isVisibleCached(visibilityCache, node);
  }).filter(function(node) {
    return notHiddenInput(node);
  });
};
var filterAutoFocusable = function(nodes, cache) {
  if (cache === void 0) {
    cache = /* @__PURE__ */ new Map();
  }
  return toArray(nodes).filter(function(node) {
    return isAutoFocusAllowedCached(cache, node);
  });
};
var getTabbableNodes = function(topNodes, visibilityCache, withGuards) {
  return orderByTabIndex(filterFocusable(getFocusables(topNodes, withGuards), visibilityCache), true, withGuards);
};
var getAllTabbableNodes = function(topNodes, visibilityCache) {
  return orderByTabIndex(filterFocusable(getFocusables(topNodes), visibilityCache), false);
};
var parentAutofocusables = function(topNode, visibilityCache) {
  return filterFocusable(getParentAutofocusables(topNode), visibilityCache);
};
var contains = function(scope, element) {
  if (scope.shadowRoot) {
    return contains(scope.shadowRoot, element);
  } else {
    if (Object.getPrototypeOf(scope).contains !== void 0 && Object.getPrototypeOf(scope).contains.call(scope, element)) {
      return true;
    }
    return toArray(scope.children).some(function(child) {
      var _a2;
      if (child instanceof HTMLIFrameElement) {
        var iframeBody = (_a2 = child.contentDocument) === null || _a2 === void 0 ? void 0 : _a2.body;
        if (iframeBody) {
          return contains(iframeBody, element);
        }
        return false;
      }
      return contains(child, element);
    });
  }
};
var filterNested = function(nodes) {
  var contained = /* @__PURE__ */ new Set();
  var l = nodes.length;
  for (var i = 0; i < l; i += 1) {
    for (var j = i + 1; j < l; j += 1) {
      var position = nodes[i].compareDocumentPosition(nodes[j]);
      if ((position & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0) {
        contained.add(j);
      }
      if ((position & Node.DOCUMENT_POSITION_CONTAINS) > 0) {
        contained.add(i);
      }
    }
  }
  return nodes.filter(function(_, index) {
    return !contained.has(index);
  });
};
var getTopParent = function(node) {
  return node.parentNode ? getTopParent(node.parentNode) : node;
};
var getAllAffectedNodes = function(node) {
  var nodes = asArray(node);
  return nodes.filter(Boolean).reduce(function(acc, currentNode) {
    var group = currentNode.getAttribute(FOCUS_GROUP);
    acc.push.apply(acc, group ? filterNested(toArray(getTopParent(currentNode).querySelectorAll("[".concat(FOCUS_GROUP, '="').concat(group, '"]:not([').concat(FOCUS_DISABLED, '="disabled"])')))) : [currentNode]);
    return acc;
  }, []);
};
var safeProbe = function(cb) {
  try {
    return cb();
  } catch (e) {
    return void 0;
  }
};
var getActiveElement = function(inDocument) {
  if (inDocument === void 0) {
    inDocument = document;
  }
  if (!inDocument || !inDocument.activeElement) {
    return void 0;
  }
  var activeElement = inDocument.activeElement;
  return activeElement.shadowRoot ? getActiveElement(activeElement.shadowRoot) : activeElement instanceof HTMLIFrameElement && safeProbe(function() {
    return activeElement.contentWindow.document;
  }) ? getActiveElement(activeElement.contentWindow.document) : activeElement;
};
var focusInFrame = function(frame, activeElement) {
  return frame === activeElement;
};
var focusInsideIframe = function(topNode, activeElement) {
  return Boolean(toArray(topNode.querySelectorAll("iframe")).some(function(node) {
    return focusInFrame(node, activeElement);
  }));
};
var focusInside = function(topNode, activeElement) {
  if (activeElement === void 0) {
    activeElement = getActiveElement(getFirst(topNode).ownerDocument);
  }
  if (!activeElement || activeElement.dataset && activeElement.dataset.focusGuard) {
    return false;
  }
  return getAllAffectedNodes(topNode).some(function(node) {
    return contains(node, activeElement) || focusInsideIframe(node, activeElement);
  });
};
var focusIsHidden = function(inDocument) {
  if (inDocument === void 0) {
    inDocument = document;
  }
  var activeElement = getActiveElement(inDocument);
  if (!activeElement) {
    return false;
  }
  return toArray(inDocument.querySelectorAll("[".concat(FOCUS_ALLOW, "]"))).some(function(node) {
    return contains(node, activeElement);
  });
};
var findSelectedRadio = function(node, nodes) {
  return nodes.filter(isRadioElement).filter(function(el) {
    return el.name === node.name;
  }).filter(function(el) {
    return el.checked;
  })[0] || node;
};
var correctNode = function(node, nodes) {
  if (isRadioElement(node) && node.name) {
    return findSelectedRadio(node, nodes);
  }
  return node;
};
var correctNodes = function(nodes) {
  var resultSet = /* @__PURE__ */ new Set();
  nodes.forEach(function(node) {
    return resultSet.add(correctNode(node, nodes));
  });
  return nodes.filter(function(node) {
    return resultSet.has(node);
  });
};
var pickFirstFocus = function(nodes) {
  if (nodes[0] && nodes.length > 1) {
    return correctNode(nodes[0], nodes);
  }
  return nodes[0];
};
var pickFocusable = function(nodes, index) {
  if (nodes.length > 1) {
    return nodes.indexOf(correctNode(nodes[index], nodes));
  }
  return index;
};
var NEW_FOCUS = "NEW_FOCUS";
var newFocus = function(innerNodes, outerNodes, activeElement, lastNode) {
  var cnt = innerNodes.length;
  var firstFocus = innerNodes[0];
  var lastFocus = innerNodes[cnt - 1];
  var isOnGuard = isGuard(activeElement);
  if (activeElement && innerNodes.indexOf(activeElement) >= 0) {
    return void 0;
  }
  var activeIndex = activeElement !== void 0 ? outerNodes.indexOf(activeElement) : -1;
  var lastIndex = lastNode ? outerNodes.indexOf(lastNode) : activeIndex;
  var lastNodeInside = lastNode ? innerNodes.indexOf(lastNode) : -1;
  var indexDiff = activeIndex - lastIndex;
  var firstNodeIndex = outerNodes.indexOf(firstFocus);
  var lastNodeIndex = outerNodes.indexOf(lastFocus);
  var correctedNodes = correctNodes(outerNodes);
  var correctedIndex = activeElement !== void 0 ? correctedNodes.indexOf(activeElement) : -1;
  var correctedIndexDiff = correctedIndex - (lastNode ? correctedNodes.indexOf(lastNode) : activeIndex);
  var returnFirstNode = pickFocusable(innerNodes, 0);
  var returnLastNode = pickFocusable(innerNodes, cnt - 1);
  if (activeIndex === -1 || lastNodeInside === -1) {
    return NEW_FOCUS;
  }
  if (!indexDiff && lastNodeInside >= 0) {
    return lastNodeInside;
  }
  if (activeIndex <= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnLastNode;
  }
  if (activeIndex >= lastNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnFirstNode;
  }
  if (indexDiff && Math.abs(correctedIndexDiff) > 1) {
    return lastNodeInside;
  }
  if (activeIndex <= firstNodeIndex) {
    return returnLastNode;
  }
  if (activeIndex > lastNodeIndex) {
    return returnFirstNode;
  }
  if (indexDiff) {
    if (Math.abs(indexDiff) > 1) {
      return lastNodeInside;
    }
    return (cnt + lastNodeInside + indexDiff) % cnt;
  }
  return void 0;
};
var findAutoFocused = function(autoFocusables) {
  return function(node) {
    var _a2;
    var autofocus = (_a2 = getDataset(node)) === null || _a2 === void 0 ? void 0 : _a2.autofocus;
    return (
      // @ts-expect-error
      node.autofocus || //
      autofocus !== void 0 && autofocus !== "false" || //
      autoFocusables.indexOf(node) >= 0
    );
  };
};
var pickAutofocus = function(nodesIndexes, orderedNodes, groups) {
  var nodes = nodesIndexes.map(function(_a2) {
    var node = _a2.node;
    return node;
  });
  var autoFocusable = filterAutoFocusable(nodes.filter(findAutoFocused(groups)));
  if (autoFocusable && autoFocusable.length) {
    return pickFirstFocus(autoFocusable);
  }
  return pickFirstFocus(filterAutoFocusable(orderedNodes));
};
var getParents = function(node, parents) {
  if (parents === void 0) {
    parents = [];
  }
  parents.push(node);
  if (node.parentNode) {
    getParents(node.parentNode.host || node.parentNode, parents);
  }
  return parents;
};
var getCommonParent = function(nodeA, nodeB) {
  var parentsA = getParents(nodeA);
  var parentsB = getParents(nodeB);
  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};
var getTopCommonParent = function(baseActiveElement, leftEntry, rightEntries) {
  var activeElements = asArray(baseActiveElement);
  var leftEntries = asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = false;
  leftEntries.filter(Boolean).forEach(function(entry) {
    topCommon = getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function(subEntry) {
      var common = getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || contains(common, topCommon)) {
          topCommon = common;
        } else {
          topCommon = getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};
var allParentAutofocusables = function(entries, visibilityCache) {
  return entries.reduce(function(acc, node) {
    return acc.concat(parentAutofocusables(node, visibilityCache));
  }, []);
};
var reorderNodes = function(srcNodes, dstNodes) {
  var remap = /* @__PURE__ */ new Map();
  dstNodes.forEach(function(entity) {
    return remap.set(entity.node, entity);
  });
  return srcNodes.map(function(node) {
    return remap.get(node);
  }).filter(isDefined);
};
var getFocusMerge = function(topNode, lastNode) {
  var activeElement = getActiveElement(asArray(topNode).length > 0 ? document : getFirst(topNode).ownerDocument);
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(activeElement || topNode, topNode, entries);
  var visibilityCache = /* @__PURE__ */ new Map();
  var anyFocusable = getAllTabbableNodes(entries, visibilityCache);
  var innerElements = getTabbableNodes(entries, visibilityCache).filter(function(_a2) {
    var node = _a2.node;
    return isNotAGuard(node);
  });
  if (!innerElements[0]) {
    innerElements = anyFocusable;
    if (!innerElements[0]) {
      return void 0;
    }
  }
  var outerNodes = getAllTabbableNodes([commonParent], visibilityCache).map(function(_a2) {
    var node = _a2.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function(_a2) {
    var node = _a2.node;
    return node;
  });
  var newId = newFocus(innerNodes, outerNodes, activeElement, lastNode);
  if (newId === NEW_FOCUS) {
    var focusNode = pickAutofocus(anyFocusable, innerNodes, allParentAutofocusables(entries, visibilityCache));
    if (focusNode) {
      return { node: focusNode };
    } else {
      console.warn("focus-lock: cannot find any node to move focus into");
      return void 0;
    }
  }
  if (newId === void 0) {
    return newId;
  }
  return orderedInnerElements[newId];
};
var getFocusabledIn = function(topNode) {
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(topNode, topNode, entries);
  var visibilityCache = /* @__PURE__ */ new Map();
  var outerNodes = getTabbableNodes([commonParent], visibilityCache, true);
  var innerElements = getTabbableNodes(entries, visibilityCache).filter(function(_a2) {
    var node = _a2.node;
    return isNotAGuard(node);
  }).map(function(_a2) {
    var node = _a2.node;
    return node;
  });
  return outerNodes.map(function(_a2) {
    var node = _a2.node, index = _a2.index;
    return {
      node,
      index,
      lockItem: innerElements.indexOf(node) >= 0,
      guard: isGuard(node)
    };
  });
};
var focusOn = function(target, focusOptions) {
  if ("focus" in target) {
    target.focus(focusOptions);
  }
  if ("contentWindow" in target && target.contentWindow) {
    target.contentWindow.focus();
  }
};
var guardCount = 0;
var lockDisabled = false;
var setFocus = function(topNode, lastNode, options) {
  if (options === void 0) {
    options = {};
  }
  var focusable = getFocusMerge(topNode, lastNode);
  if (lockDisabled) {
    return;
  }
  if (focusable) {
    if (guardCount > 2) {
      console.error("FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting");
      lockDisabled = true;
      setTimeout(function() {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node, options.focusOptions);
    guardCount--;
  }
};
function deferAction(action) {
  var _window = window, setImmediate = _window.setImmediate;
  if (typeof setImmediate !== "undefined") {
    setImmediate(action);
  } else {
    setTimeout(action, 1);
  }
}
var focusOnBody = function focusOnBody2() {
  return document && document.activeElement === document.body;
};
var isFreeFocus = function isFreeFocus2() {
  return focusOnBody() || focusIsHidden();
};
var lastActiveTrap = null;
var lastActiveFocus = null;
var lastPortaledElement = null;
var focusWasOutsideWindow = false;
var defaultWhitelist = function defaultWhitelist2() {
  return true;
};
var focusWhitelisted = function focusWhitelisted2(activeElement) {
  return (lastActiveTrap.whiteList || defaultWhitelist)(activeElement);
};
var recordPortal = function recordPortal2(observerNode, portaledElement) {
  lastPortaledElement = {
    observerNode,
    portaledElement
  };
};
var focusIsPortaledPair = function focusIsPortaledPair2(element) {
  return lastPortaledElement && lastPortaledElement.portaledElement === element;
};
function autoGuard(startIndex, end, step, allNodes) {
  var lastGuard = null;
  var i = startIndex;
  do {
    var item = allNodes[i];
    if (item.guard) {
      if (item.node.dataset.focusAutoGuard) {
        lastGuard = item;
      }
    } else if (item.lockItem) {
      if (i !== startIndex) {
        return;
      }
      lastGuard = null;
    } else {
      break;
    }
  } while ((i += step) !== end);
  if (lastGuard) {
    lastGuard.node.tabIndex = 0;
  }
}
var extractRef$1 = function extractRef(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var focusWasOutside = function focusWasOutside2(crossFrameOption) {
  if (crossFrameOption) {
    return Boolean(focusWasOutsideWindow);
  }
  return focusWasOutsideWindow === "meanwhile";
};
var checkInHost = function checkInHost2(check, el, boundary) {
  return el && // find host equal to active element and check nested active element
  (el.host === check && (!el.activeElement || boundary.contains(el.activeElement)) || el.parentNode && checkInHost2(check, el.parentNode, boundary));
};
var withinHost = function withinHost2(activeElement, workingArea) {
  return workingArea.some(function(area) {
    return checkInHost(activeElement, area, area);
  });
};
var activateTrap = function activateTrap2() {
  var result = false;
  if (lastActiveTrap) {
    var _lastActiveTrap = lastActiveTrap, observed = _lastActiveTrap.observed, persistentFocus = _lastActiveTrap.persistentFocus, autoFocus = _lastActiveTrap.autoFocus, shards = _lastActiveTrap.shards, crossFrame = _lastActiveTrap.crossFrame, focusOptions = _lastActiveTrap.focusOptions;
    var workingNode = observed || lastPortaledElement && lastPortaledElement.portaledElement;
    var activeElement = document && document.activeElement;
    if (workingNode) {
      var workingArea = [workingNode].concat(shards.map(extractRef$1).filter(Boolean));
      if (!activeElement || focusWhitelisted(activeElement)) {
        if (persistentFocus || focusWasOutside(crossFrame) || !isFreeFocus() || !lastActiveFocus && autoFocus) {
          if (workingNode && !// active element is "inside" working area
          (focusInside(workingArea) || // check for shadow-dom contained elements
          activeElement && withinHost(activeElement, workingArea) || focusIsPortaledPair(activeElement))) {
            if (document && !lastActiveFocus && activeElement && !autoFocus) {
              if (activeElement.blur) {
                activeElement.blur();
              }
              document.body.focus();
            } else {
              result = setFocus(workingArea, lastActiveFocus, {
                focusOptions
              });
              lastPortaledElement = {};
            }
          }
          focusWasOutsideWindow = false;
          lastActiveFocus = document && document.activeElement;
        }
      }
      if (document) {
        var newActiveElement = document && document.activeElement;
        var allNodes = getFocusabledIn(workingArea);
        var focusedIndex = allNodes.map(function(_ref2) {
          var node = _ref2.node;
          return node;
        }).indexOf(newActiveElement);
        if (focusedIndex > -1) {
          allNodes.filter(function(_ref2) {
            var guard = _ref2.guard, node = _ref2.node;
            return guard && node.dataset.focusAutoGuard;
          }).forEach(function(_ref3) {
            var node = _ref3.node;
            return node.removeAttribute("tabIndex");
          });
          autoGuard(focusedIndex, allNodes.length, 1, allNodes);
          autoGuard(focusedIndex, -1, -1, allNodes);
        }
      }
    }
  }
  return result;
};
var onTrap = function onTrap2(event) {
  if (activateTrap() && event) {
    event.stopPropagation();
    event.preventDefault();
  }
};
var onBlur = function onBlur2() {
  return deferAction(activateTrap);
};
var onFocus = function onFocus2(event) {
  var source = event.target;
  var currentNode = event.currentTarget;
  if (!currentNode.contains(source)) {
    recordPortal(currentNode, source);
  }
};
var FocusWatcher = function FocusWatcher2() {
  return null;
};
var onWindowBlur = function onWindowBlur2() {
  focusWasOutsideWindow = "just";
  setTimeout(function() {
    focusWasOutsideWindow = "meanwhile";
  }, 0);
};
var attachHandler = function attachHandler2() {
  document.addEventListener("focusin", onTrap);
  document.addEventListener("focusout", onBlur);
  window.addEventListener("blur", onWindowBlur);
};
var detachHandler = function detachHandler2() {
  document.removeEventListener("focusin", onTrap);
  document.removeEventListener("focusout", onBlur);
  window.removeEventListener("blur", onWindowBlur);
};
function reducePropsToState(propsList) {
  return propsList.filter(function(_ref5) {
    var disabled = _ref5.disabled;
    return !disabled;
  });
}
function handleStateChangeOnClient(traps) {
  var trap = traps.slice(-1)[0];
  if (trap && !lastActiveTrap) {
    attachHandler();
  }
  var lastTrap = lastActiveTrap;
  var sameTrap = lastTrap && trap && trap.id === lastTrap.id;
  lastActiveTrap = trap;
  if (lastTrap && !sameTrap) {
    lastTrap.onDeactivation();
    if (!traps.filter(function(_ref6) {
      var id = _ref6.id;
      return id === lastTrap.id;
    }).length) {
      lastTrap.returnFocus(!trap);
    }
  }
  if (trap) {
    lastActiveFocus = null;
    if (!sameTrap || lastTrap.observed !== trap.observed) {
      trap.onActivation();
    }
    activateTrap();
    deferAction(activateTrap);
  } else {
    detachHandler();
    lastActiveFocus = null;
  }
}
mediumFocus.assignSyncMedium(onFocus);
mediumBlur.assignMedium(onBlur);
mediumEffect.assignMedium(function(cb) {
  return cb({
    moveFocusInside: setFocus,
    focusInside
  });
});
const FocusTrap$1 = withSideEffect(reducePropsToState, handleStateChangeOnClient)(FocusWatcher);
var FocusLockCombination = /* @__PURE__ */ reactExports.forwardRef(function FocusLockUICombination(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(FocusLockUI2, _extends({
    sideCar: FocusTrap$1,
    ref
  }, props));
});
var _ref = FocusLockUI2.propTypes || {};
_ref.sideCar;
_objectWithoutPropertiesLoose(_ref, ["sideCar"]);
FocusLockCombination.propTypes = {};
const FocusLock$1 = FocusLockCombination;
var focusableElList = [
  "input:not(:disabled):not([disabled])",
  "select:not(:disabled):not([disabled])",
  "textarea:not(:disabled):not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not(:disabled):not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]"
];
var focusableElSelector = focusableElList.join();
var isVisible = (el) => el.offsetWidth > 0 && el.offsetHeight > 0;
function getAllFocusable(container) {
  const focusableEls = Array.from(
    container.querySelectorAll(focusableElSelector)
  );
  focusableEls.unshift(container);
  return focusableEls.filter((el) => isFocusable(el) && isVisible(el));
}
var _a;
var FocusTrap = (_a = FocusLock$1.default) != null ? _a : FocusLock$1;
var FocusLock = (props) => {
  const {
    initialFocusRef,
    finalFocusRef,
    contentRef,
    restoreFocus,
    children,
    isDisabled,
    autoFocus,
    persistentFocus,
    lockFocusAcrossFrames
  } = props;
  const onActivation = reactExports.useCallback(() => {
    if (initialFocusRef == null ? void 0 : initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (contentRef == null ? void 0 : contentRef.current) {
      const focusables = getAllFocusable(contentRef.current);
      if (focusables.length === 0) {
        requestAnimationFrame(() => {
          var _a2;
          (_a2 = contentRef.current) == null ? void 0 : _a2.focus();
        });
      }
    }
  }, [initialFocusRef, contentRef]);
  const onDeactivation = reactExports.useCallback(() => {
    var _a2;
    (_a2 = finalFocusRef == null ? void 0 : finalFocusRef.current) == null ? void 0 : _a2.focus();
  }, [finalFocusRef]);
  const returnFocus = restoreFocus && !finalFocusRef;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FocusTrap,
    {
      crossFrame: lockFocusAcrossFrames,
      persistentFocus,
      autoFocus,
      disabled: isDisabled,
      onActivation,
      onDeactivation,
      returnFocus,
      children
    }
  );
};
FocusLock.displayName = "FocusLock";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var ModalManager = class {
  constructor() {
    __publicField(this, "modals");
    this.modals = /* @__PURE__ */ new Map();
  }
  add(modal) {
    this.modals.set(modal, this.modals.size + 1);
    return this.modals.size;
  }
  remove(modal) {
    this.modals.delete(modal);
  }
  isTopModal(modal) {
    if (!modal)
      return false;
    return this.modals.get(modal) === this.modals.size;
  }
};
var modalManager = new ModalManager();
function useModalManager(ref, isOpen) {
  const [index, setIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (!node)
      return;
    if (isOpen) {
      const index2 = modalManager.add(node);
      setIndex(index2);
    }
    return () => {
      modalManager.remove(node);
      setIndex(0);
    };
  }, [isOpen, ref]);
  return index;
}
function useModal(props) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    useInert = true,
    onOverlayClick: onOverlayClickProp,
    onEsc
  } = props;
  const dialogRef = reactExports.useRef(null);
  const overlayRef = reactExports.useRef(null);
  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-modal`,
    `chakra-modal--header`,
    `chakra-modal--body`
  );
  useAriaHidden(dialogRef, isOpen && useInert);
  const index = useModalManager(dialogRef, isOpen);
  const mouseDownTarget = reactExports.useRef(null);
  const onMouseDown = reactExports.useCallback((event) => {
    mouseDownTarget.current = event.target;
  }, []);
  const onKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        if (closeOnEsc) {
          onClose == null ? void 0 : onClose();
        }
        onEsc == null ? void 0 : onEsc();
      }
    },
    [closeOnEsc, onClose, onEsc]
  );
  const [headerMounted, setHeaderMounted] = reactExports.useState(false);
  const [bodyMounted, setBodyMounted] = reactExports.useState(false);
  const getDialogProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      role: "dialog",
      ...props2,
      ref: mergeRefs(ref, dialogRef),
      id: dialogId,
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : void 0,
      "aria-describedby": bodyMounted ? bodyId : void 0,
      onClick: callAllHandlers(
        props2.onClick,
        (event) => event.stopPropagation()
      )
    }),
    [bodyId, bodyMounted, dialogId, headerId, headerMounted]
  );
  const onOverlayClick = reactExports.useCallback(
    (event) => {
      event.stopPropagation();
      if (mouseDownTarget.current !== event.target)
        return;
      if (!modalManager.isTopModal(dialogRef.current))
        return;
      if (closeOnOverlayClick) {
        onClose == null ? void 0 : onClose();
      }
      onOverlayClickProp == null ? void 0 : onOverlayClickProp();
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp]
  );
  const getDialogContainerProps = reactExports.useCallback(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(ref, overlayRef),
      onClick: callAllHandlers(props2.onClick, onOverlayClick),
      onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
      onMouseDown: callAllHandlers(props2.onMouseDown, onMouseDown)
    }),
    [onKeyDown, onMouseDown, onOverlayClick]
  );
  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    dialogRef,
    overlayRef,
    getDialogProps,
    getDialogContainerProps,
    index
  };
}
function useAriaHidden(ref, shouldHide) {
  const currentElement = ref.current;
  reactExports.useEffect(() => {
    if (!ref.current || !shouldHide)
      return void 0;
    return hideOthers(ref.current);
  }, [shouldHide, ref, currentElement]);
}
function useIds(idProp, ...prefixes) {
  const reactId = reactExports.useId();
  const id = idProp || reactId;
  return reactExports.useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`);
  }, [id, prefixes]);
}
var [ModalStylesProvider, useModalStyles] = createContext({
  name: `ModalStylesContext`,
  errorMessage: `useModalStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Modal />" `
});
var [ModalContextProvider, useModalContext] = createContext({
  strict: true,
  name: "ModalContext",
  errorMessage: "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`"
});
var Modal = (props) => {
  const modalProps = {
    scrollBehavior: "outside",
    autoFocus: true,
    trapFocus: true,
    returnFocusOnClose: true,
    blockScrollOnMount: true,
    allowPinchZoom: false,
    motionPreset: "scale",
    lockFocusAcrossFrames: true,
    ...props
  };
  const {
    portalProps,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
    onCloseComplete
  } = modalProps;
  const styles = useMultiStyleConfig("Modal", modalProps);
  const modal = useModal(modalProps);
  const context = {
    ...modal,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalContextProvider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModalStylesProvider, { value: styles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { onExitComplete: onCloseComplete, children: context.isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...portalProps, children }) }) }) });
};
Modal.displayName = "Modal";
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll$1 = reactExports.forwardRef(function(props, parentRef) {
  var ref = reactExports.useRef(null);
  var _a2 = reactExports.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a2[0], setCallbacks = _a2[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    enabled && reactExports.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : reactExports.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll$1.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll$1.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a2 = getScrollVariables(axis, current), s = _a2[1], d = _a2[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a2) {
  var scrollTop = _a2.scrollTop, scrollHeight = _a2.scrollHeight, clientHeight = _a2.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a2) {
  var scrollLeft = _a2.scrollLeft, scrollWidth = _a2.scrollWidth, clientWidth = _a2.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a2 = getScrollVariables(axis, target), position = _a2[0], scroll_1 = _a2[1], capacity = _a2[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (noOverscroll && availableScroll === 0 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && availableScrollTop === 0 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef2 = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = reactExports.useRef([]);
  var touchStartRef = reactExports.useRef([0, 0]);
  var activeAxis = reactExports.useRef();
  var id = reactExports.useState(idCounter++)[0];
  var Style = reactExports.useState(styleSingleton)[0];
  var lastProps = reactExports.useRef(props);
  reactExports.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  reactExports.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef2), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = reactExports.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && e.target === event.target && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef2).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = reactExports.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  reactExports.useEffect(function() {
    lockStack.push(Style);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    inert ? reactExports.createElement(Style, { styles: generateStyle(id) }) : null,
    removeScrollBar ? reactExports.createElement(RemoveScrollBar, { gapMode: props.gapMode }) : null
  );
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
  return reactExports.createElement(RemoveScroll$1, __assign({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll$1.classNames;
const RemoveScroll = ReactRemoveScroll;
function ModalFocusScope(props) {
  const {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
    lockFocusAcrossFrames,
    isOpen
  } = useModalContext();
  const [isPresent, safeToRemove] = usePresence();
  reactExports.useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove);
    }
  }, [isPresent, safeToRemove]);
  const index = useModalManager(dialogRef, isOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FocusLock,
    {
      autoFocus,
      isDisabled: !trapFocus,
      initialFocusRef,
      finalFocusRef,
      restoreFocus: returnFocusOnClose,
      contentRef: dialogRef,
      lockFocusAcrossFrames,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RemoveScroll,
        {
          removeScrollBar: !preserveScrollBarGap,
          allowPinchZoom,
          enabled: index === 1 && blockScrollOnMount,
          forwardProps: true,
          children: props.children
        }
      )
    }
  );
}
var [DrawerContextProvider, useDrawerContext] = createContext();
var placementMap = {
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" }
};
function getDrawerPlacement(placement, dir) {
  var _a2, _b;
  if (!placement)
    return;
  return (_b = (_a2 = placementMap[placement]) == null ? void 0 : _a2[dir]) != null ? _b : placement;
}
function Drawer(props) {
  var _a2;
  const {
    isOpen,
    onClose,
    placement: placementProp = "right",
    children,
    ...rest
  } = props;
  const theme = useTheme();
  const drawerStyleConfig = (_a2 = theme.components) == null ? void 0 : _a2.Drawer;
  const placement = getDrawerPlacement(placementProp, theme.direction);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContextProvider, { value: { placement }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      isOpen,
      onClose,
      styleConfig: drawerStyleConfig,
      ...rest,
      children
    }
  ) });
}
var MotionDiv$1 = chakra(Slide);
var DrawerContent = forwardRef(
  (props, ref) => {
    const {
      className,
      children,
      motionProps,
      containerProps: rootProps,
      ...rest
    } = props;
    const { getDialogProps, getDialogContainerProps, isOpen } = useModalContext();
    const dialogProps = getDialogProps(rest, ref);
    const containerProps = getDialogContainerProps(rootProps);
    const _className = cx("chakra-modal__content", className);
    const styles = useModalStyles();
    const dialogStyles = {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog
    };
    const dialogContainerStyles = {
      display: "flex",
      width: "100vw",
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer
    };
    const { placement } = useDrawerContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFocusScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.div,
      {
        ...containerProps,
        className: "chakra-modal__content-container",
        __css: dialogContainerStyles,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MotionDiv$1,
          {
            motionProps,
            direction: placement,
            in: isOpen,
            className: _className,
            ...dialogProps,
            __css: dialogStyles,
            children
          }
        )
      }
    ) });
  }
);
DrawerContent.displayName = "DrawerContent";
var ModalFooter = forwardRef(
  (props, ref) => {
    const { className, ...rest } = props;
    const _className = cx("chakra-modal__footer", className);
    const styles = useModalStyles();
    const footerStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      ...styles.footer
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.footer,
      {
        ref,
        ...rest,
        __css: footerStyles,
        className: _className
      }
    );
  }
);
ModalFooter.displayName = "ModalFooter";
var ModalHeader = forwardRef(
  (props, ref) => {
    const { className, ...rest } = props;
    const { headerId, setHeaderMounted } = useModalContext();
    reactExports.useEffect(() => {
      setHeaderMounted(true);
      return () => setHeaderMounted(false);
    }, [setHeaderMounted]);
    const _className = cx("chakra-modal__header", className);
    const styles = useModalStyles();
    const headerStyles = {
      flex: 0,
      ...styles.header
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      chakra.header,
      {
        ref,
        className: _className,
        id: headerId,
        ...rest,
        __css: headerStyles
      }
    );
  }
);
ModalHeader.displayName = "ModalHeader";
var MotionDiv = chakra(motion.div);
var ModalOverlay = forwardRef(
  (props, ref) => {
    const { className, transition, motionProps: _motionProps, ...rest } = props;
    const _className = cx("chakra-modal__overlay", className);
    const styles = useModalStyles();
    const overlayStyle = {
      pos: "fixed",
      left: "0",
      top: "0",
      w: "100vw",
      h: "100vh",
      ...styles.overlay
    };
    const { motionPreset } = useModalContext();
    const defaultMotionProps = motionPreset === "none" ? {} : fadeConfig;
    const motionProps = _motionProps || defaultMotionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MotionDiv,
      {
        ...motionProps,
        __css: overlayStyle,
        ref,
        className: _className,
        ...rest
      }
    );
  }
);
ModalOverlay.displayName = "ModalOverlay";
var ModalBody = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const { bodyId, setBodyMounted } = useModalContext();
  reactExports.useEffect(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);
  const _className = cx("chakra-modal__body", className);
  const styles = useModalStyles();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    chakra.div,
    {
      ref,
      className: _className,
      id: bodyId,
      ...rest,
      __css: styles.body
    }
  );
});
ModalBody.displayName = "ModalBody";
const CustomDrawer = ({
  body,
  footer,
  isOpen,
  placement,
  onClose,
  size,
  header,
  headerStyles,
  bodyStyles
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { size, isOpen, placement, onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalHeader, { ...headerStyles, children: header }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ModalBody,
        {
          ...bodyStyles,
          sx: {
            "&::-webkit-scrollbar": {
              display: "none"
            },
            "&::-webkit-scrollbar-track": {
              display: "none"
            },
            "&::-webkit-scrollbar-thumb": {
              display: "none"
            }
          },
          children: body
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModalFooter, { marginBottom: 5, justifyContent: "center", children: footer })
    ] })
  ] });
};
export {
  CustomDrawer as C,
  Fade as F,
  ModalFocusScope as M,
  TRANSITION_EASINGS as T,
  TRANSITION_DEFAULTS as a,
  useModalStyles as b,
  Modal as c,
  ModalOverlay as d,
  ModalBody as e,
  ModalFooter as f,
  ModalHeader as g,
  useModalContext as u,
  withDelay as w
};
