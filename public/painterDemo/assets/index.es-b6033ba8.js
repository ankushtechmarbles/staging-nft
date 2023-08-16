import { n, T, i as i$1, s as s$1, b, x } from "./lit-element-6ea6fe70.js";
import { a as ae$1, H, s as se$1, K, C, d, b as b$1, n as ne$1, c, o as oe$1, y, _ } from "./index.es-25aecc6c.js";
import { b as browser } from "./browser-39805471.js";
import "./index-0d430626.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = (e2) => (n2) => "function" == typeof n2 ? ((e3, n3) => (customElements.define(e3, n3), n3))(e2, n2) : ((e3, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e3, n4);
  } };
})(e2, n2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$1(t2) {
  return n({ ...t2, state: true });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = e(class extends i {
  constructor(t$12) {
    var i2;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || (null === (i2 = t$12.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s2]) {
    var r, o2;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i2.strings && (this.nt = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s2)
        s2[t2] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t2)) && this.it.add(t2);
      return this.render(s2);
    }
    const e2 = i2.element.classList;
    this.it.forEach((t2) => {
      t2 in s2 || (e2.remove(t2), this.it.delete(t2));
    });
    for (const t2 in s2) {
      const i3 = !!s2[t2];
      i3 === this.it.has(t2) || (null === (o2 = this.nt) || void 0 === o2 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.it.add(t2)) : (e2.remove(t2), this.it.delete(t2)));
    }
    return T;
  }
});
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);
const defaults = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
};
const isNumber = (value) => typeof value === "number";
const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i2) {
  return isEasingList(easing) ? easing[wrap(0, easing.length, i2)] : easing;
}
const mix = (min, max, progress2) => -progress2 * min + progress2 * max + min;
const noop = () => {
};
const noopReturn = (v) => v;
const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i2 = 1; i2 <= remaining; i2++) {
    const offsetProgress = progress(0, remaining, i2);
    offset.push(mix(min, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset = [0];
  fillOffset(offset, length - 1);
  return offset;
}
function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
  const length = output.length;
  const remainder = length - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t2) => {
    let i2 = 0;
    for (; i2 < length - 2; i2++) {
      if (t2 < input[i2 + 1])
        break;
    }
    let progressInRange = clamp(0, 1, progress(input[i2], input[i2 + 1], t2));
    const segmentEasing = getEasingForSegment(easing, i2);
    progressInRange = segmentEasing(progressInRange);
    return mix(output[i2], output[i2 + 1], progressInRange);
  };
}
const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);
const isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);
const isFunction = (value) => typeof value === "function";
const isString = (value) => typeof value === "string";
const time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};
const calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x2, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x2;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}
const steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
const namedEasings = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier(0, 0, 0.58, 1)
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
  if (isFunction(definition))
    return definition;
  if (isCubicBezier(definition))
    return cubicBezier(...definition);
  if (namedEasings[definition])
    return namedEasings[definition];
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return steps(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return noopReturn;
}
class Animation {
  constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal" } = {}) {
    this.startTime = null;
    this.rate = 1;
    this.t = 0;
    this.cancelTimestamp = null;
    this.easing = noopReturn;
    this.duration = 0;
    this.totalDuration = 0;
    this.repeat = 0;
    this.playState = "idle";
    this.finished = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    easing = easing || defaults.easing;
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      initialDuration = custom.duration || initialDuration;
    }
    this.repeat = repeat;
    this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
    this.updateDuration(initialDuration);
    const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
    this.tick = (timestamp) => {
      var _a2;
      delay = delay;
      let t2 = 0;
      if (this.pauseTime !== void 0) {
        t2 = this.pauseTime;
      } else {
        t2 = (timestamp - this.startTime) * this.rate;
      }
      this.t = t2;
      t2 /= 1e3;
      t2 = Math.max(t2 - delay, 0);
      if (this.playState === "finished" && this.pauseTime === void 0) {
        t2 = this.totalDuration;
      }
      const progress2 = t2 / this.duration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      const iterationIsOdd = currentIteration % 2;
      if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
        iterationProgress = 1 - iterationProgress;
      }
      const p = t2 >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
      const latest = interpolate$1(this.easing(p));
      output(latest);
      const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t2 >= this.totalDuration + endDelay);
      if (isAnimationFinished) {
        this.playState = "finished";
        (_a2 = this.resolve) === null || _a2 === void 0 ? void 0 : _a2.call(this, latest);
      } else if (this.playState !== "idle") {
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
    };
    this.play();
  }
  play() {
    const now = performance.now();
    this.playState = "running";
    if (this.pauseTime !== void 0) {
      this.startTime = now - this.pauseTime;
    } else if (!this.startTime) {
      this.startTime = now;
    }
    this.cancelTimestamp = this.startTime;
    this.pauseTime = void 0;
    this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused";
    this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished";
    this.tick(0);
  }
  stop() {
    var _a2;
    this.playState = "idle";
    if (this.frameRequestId !== void 0) {
      cancelAnimationFrame(this.frameRequestId);
    }
    (_a2 = this.reject) === null || _a2 === void 0 ? void 0 : _a2.call(this, false);
  }
  cancel() {
    this.stop();
    this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(duration) {
    this.duration = duration;
    this.totalDuration = duration * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t2) {
    if (this.pauseTime !== void 0 || this.rate === 0) {
      this.pauseTime = t2;
    } else {
      this.startTime = performance.now() - t2 / this.rate;
    }
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(rate) {
    this.rate = rate;
  }
}
class MotionValue {
  setAnimation(animation) {
    this.animation = animation;
    animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const data = /* @__PURE__ */ new WeakMap();
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: /* @__PURE__ */ new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue());
  }
  return motionValues.get(name);
}
const axes = ["", "X", "Y", "Z"];
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
const rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => v + "deg"
};
const baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
const transformDefinitions = /* @__PURE__ */ new Map();
const asTransformCssVar = (name) => `--motion-${name}`;
const transforms = ["x", "y", "z"];
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
const compareTransformOrder = (a, b2) => transforms.indexOf(a) - transforms.indexOf(b2);
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const addTransformToElement = (element, name) => {
  if (transformAlias[name])
    name = transformAlias[name];
  const { transforms: transforms2 } = getAnimationData(element);
  addUniqueItem(transforms2, name);
  element.style.transform = buildTransformTemplate(transforms2);
};
const buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
const isCssVar = (name) => name.startsWith("--");
const registeredProperties = /* @__PURE__ */ new Set();
function registerCssVariable(name) {
  if (registeredProperties.has(name))
    return;
  registeredProperties.add(name);
  try {
    const { syntax, initialValue } = transformDefinitions.has(name) ? transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e2) {
  }
}
const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e2) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e2) {
      return false;
    }
    return true;
  }
};
const results = {};
const supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
  let points = "";
  const numPoints = Math.round(duration / resolution);
  for (let i2 = 0; i2 < numPoints; i2++) {
    points += easing(progress(0, numPoints - 1, i2)) + ", ";
  }
  return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
  if (isFunction(easing)) {
    return supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : defaults.easing;
  } else {
    return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
  }
};
const cubicBezierAsString = ([a, b2, c2, d2]) => `cubic-bezier(${a}, ${b2}, ${c2}, ${d2})`;
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i2 = 0; i2 < keyframes.length; i2++) {
    if (keyframes[i2] === null) {
      keyframes[i2] = i2 ? keyframes[i2 - 1] : readInitialValue();
    }
  }
  return keyframes;
}
const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
function getStyleName(key) {
  if (transformAlias[key])
    key = transformAlias[key];
  return isTransform(key) ? asTransformCssVar(key) : key;
}
const style = {
  get: (element, name) => {
    name = getStyleName(name);
    let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name);
      if (definition)
        value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    name = getStyleName(name);
    if (isCssVar(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished")
    return;
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e2) {
  }
}
function getUnitConverter(keyframes, definition) {
  var _a2;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if (isString(finalKeyframe)) {
    const unit = ((_a2 = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a2 === void 0 ? void 0 : _a2[2]) || "";
    if (unit)
      toUnit = (value) => value + unit;
  }
  return toUnit;
}
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false } = options;
  const data2 = getAnimationData(element);
  const valueIsTransform = isTransform(key);
  let canAnimateNatively = supports.waapi();
  valueIsTransform && addTransformToElement(element, key);
  const name = getStyleName(key);
  const motionValue = getMotionValue(data2.values, name);
  const definition = transformDefinitions.get(name);
  stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
  return () => {
    const readInitialValue = () => {
      var _a2, _b;
      return (_b = (_a2 = style.get(element, name)) !== null && _a2 !== void 0 ? _a2 : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
    };
    let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
    const toUnit = getUnitConverter(keyframes, definition);
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    if (isCssVar(name)) {
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name);
      } else {
        canAnimateNatively = false;
      }
    }
    if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
      canAnimateNatively = false;
    }
    if (canAnimateNatively) {
      if (definition) {
        keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
      }
      if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: time.ms(delay),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing, duration) : void 0,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? easing.map((thisEasing) => convertEasing(thisEasing, duration)) : void 0
      }, animationOptions);
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist)
          return;
        style.set(element, name, target);
        animation.cancel();
      }).catch(noop);
      if (!allowWebkitAcceleration)
        animation.playbackRate = 1.000001;
    } else if (AnimationPolyfill && valueIsTransform) {
      keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill((latest) => {
        style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      style.set(element, name, definition && isNumber(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay,
        easing,
        repeat,
        offset
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}
const getOptions = (options, key) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options)
);
function resolveElements(elements, selectorCache) {
  var _a2;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a2 = selectorCache[elements]) !== null && _a2 !== void 0 ? _a2 : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}
const createAnimation = (factory) => factory();
const withControls = (animationFactory, options, duration = defaults.duration) => {
  return new Proxy({
    animations: animationFactory.map(createAnimation).filter(Boolean),
    duration,
    options
  }, controls);
};
const getActiveAnimation = (state) => state.animations[0];
const controls = {
  get: (target, key) => {
    const activeAnimation = getActiveAnimation(target);
    switch (key) {
      case "duration":
        return target.duration;
      case "currentTime":
        return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
      case "playbackRate":
      case "playState":
        return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
        }
        return target.finished;
      case "stop":
        return () => {
          target.animations.forEach((animation) => stopAnimation(animation));
        };
      case "forEachNative":
        return (callback) => {
          target.animations.forEach((animation) => callback(animation, target));
        };
      default:
        return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? void 0 : () => target.animations.forEach((animation) => animation[key]());
    }
  },
  set: (target, key, value) => {
    switch (key) {
      case "currentTime":
        value = time.ms(value);
      case "currentTime":
      case "playbackRate":
        for (let i2 = 0; i2 < target.animations.length; i2++) {
          target.animations[i2][key] = value;
        }
        return true;
    }
    return false;
  }
};
const selectFinished = (animation) => animation.finished;
function resolveOption(option, i2, total) {
  return isFunction(option) ? option(i2, total) : option;
}
function createAnimate(AnimatePolyfill) {
  return function animate2(elements, keyframes, options = {}) {
    elements = resolveElements(elements);
    const numElements = elements.length;
    const animationFactories = [];
    for (let i2 = 0; i2 < numElements; i2++) {
      const element = elements[i2];
      for (const key in keyframes) {
        const valueOptions = getOptions(options, key);
        valueOptions.delay = resolveOption(valueOptions.delay, i2, numElements);
        const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
        animationFactories.push(animation);
      }
    }
    return withControls(
      animationFactories,
      options,
      /**
       * TODO:
       * If easing is set to spring or glide, duration will be dynamically
       * generated. Ideally we would dynamically generate this from
       * animation.effect.getComputedTiming().duration but this isn't
       * supported in iOS13 or our number polyfill. Perhaps it's possible
       * to Proxy animations returned from animateStyle that has duration
       * as a getter.
       */
      options.duration
    );
  };
}
const animate$1 = createAnimate(Animation);
function animateProgress(target, options = {}) {
  return withControls([
    () => {
      const animation = new Animation(target, [0, 1], options);
      animation.finished.catch(() => {
      });
      return animation;
    }
  ], options, options.duration);
}
function animate(target, keyframesOrOptions, options) {
  const factory = isFunction(target) ? animateProgress : animate$1;
  return factory(target, keyframesOrOptions, options);
}
var Fe = Object.defineProperty, $e = Object.getOwnPropertySymbols, qe = Object.prototype.hasOwnProperty, Ke = Object.prototype.propertyIsEnumerable, ke = (t2, e2, a) => e2 in t2 ? Fe(t2, e2, { enumerable: true, configurable: true, writable: true, value: a }) : t2[e2] = a, jt = (t2, e2) => {
  for (var a in e2 || (e2 = {}))
    qe.call(e2, a) && ke(t2, a, e2[a]);
  if ($e)
    for (var a of $e(e2))
      Ke.call(e2, a) && ke(t2, a, e2[a]);
  return t2;
};
function Ye() {
  var t2;
  const e2 = (t2 = ae$1.state.themeMode) != null ? t2 : "dark", a = { light: { foreground: { 1: "rgb(20,20,20)", 2: "rgb(121,134,134)", 3: "rgb(158,169,169)" }, background: { 1: "rgb(255,255,255)", 2: "rgb(241,243,243)", 3: "rgb(228,231,231)" }, overlay: "rgba(0,0,0,0.1)" }, dark: { foreground: { 1: "rgb(228,231,231)", 2: "rgb(148,158,158)", 3: "rgb(110,119,119)" }, background: { 1: "rgb(20,20,20)", 2: "rgb(39,42,42)", 3: "rgb(59,64,64)" }, overlay: "rgba(255,255,255,0.1)" } }[e2];
  return { "--w3m-color-fg-1": a.foreground[1], "--w3m-color-fg-2": a.foreground[2], "--w3m-color-fg-3": a.foreground[3], "--w3m-color-bg-1": a.background[1], "--w3m-color-bg-2": a.background[2], "--w3m-color-bg-3": a.background[3], "--w3m-color-overlay": a.overlay };
}
function Oe() {
  return { "--w3m-accent-color": "#3396FF", "--w3m-accent-fill-color": "#FFFFFF", "--w3m-z-index": "89", "--w3m-background-color": "#3396FF", "--w3m-background-border-radius": "8px", "--w3m-container-border-radius": "30px", "--w3m-wallet-icon-border-radius": "15px", "--w3m-wallet-icon-large-border-radius": "30px", "--w3m-wallet-icon-small-border-radius": "7px", "--w3m-input-border-radius": "28px", "--w3m-button-border-radius": "10px", "--w3m-notification-border-radius": "36px", "--w3m-secondary-button-border-radius": "28px", "--w3m-icon-button-border-radius": "50%", "--w3m-button-hover-highlight-border-radius": "10px", "--w3m-text-big-bold-size": "20px", "--w3m-text-big-bold-weight": "600", "--w3m-text-big-bold-line-height": "24px", "--w3m-text-big-bold-letter-spacing": "-0.03em", "--w3m-text-big-bold-text-transform": "none", "--w3m-text-xsmall-bold-size": "10px", "--w3m-text-xsmall-bold-weight": "700", "--w3m-text-xsmall-bold-line-height": "12px", "--w3m-text-xsmall-bold-letter-spacing": "0.02em", "--w3m-text-xsmall-bold-text-transform": "uppercase", "--w3m-text-xsmall-regular-size": "12px", "--w3m-text-xsmall-regular-weight": "600", "--w3m-text-xsmall-regular-line-height": "14px", "--w3m-text-xsmall-regular-letter-spacing": "-0.03em", "--w3m-text-xsmall-regular-text-transform": "none", "--w3m-text-small-thin-size": "14px", "--w3m-text-small-thin-weight": "500", "--w3m-text-small-thin-line-height": "16px", "--w3m-text-small-thin-letter-spacing": "-0.03em", "--w3m-text-small-thin-text-transform": "none", "--w3m-text-small-regular-size": "14px", "--w3m-text-small-regular-weight": "600", "--w3m-text-small-regular-line-height": "16px", "--w3m-text-small-regular-letter-spacing": "-0.03em", "--w3m-text-small-regular-text-transform": "none", "--w3m-text-medium-regular-size": "16px", "--w3m-text-medium-regular-weight": "600", "--w3m-text-medium-regular-line-height": "20px", "--w3m-text-medium-regular-letter-spacing": "-0.03em", "--w3m-text-medium-regular-text-transform": "none", "--w3m-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif", "--w3m-success-color": "rgb(38,181,98)", "--w3m-error-color": "rgb(242, 90, 103)" };
}
function Qe() {
  const { themeVariables: t2 } = ae$1.state;
  return { "--w3m-background-image-url": t2 != null && t2["--w3m-background-image-url"] ? `url(${t2["--w3m-background-image-url"]})` : "none" };
}
const w = { getPreset(t2) {
  return Oe()[t2];
}, setTheme() {
  const t2 = document.querySelector(":root"), { themeVariables: e2 } = ae$1.state;
  if (t2) {
    const a = jt(jt(jt(jt({}, Ye()), Oe()), e2), Qe());
    Object.entries(a).forEach(([r, o2]) => t2.style.setProperty(r, o2));
  }
}, globalCss: i$1`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button w3m-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--w3m-accent-fill-color);background:var(--w3m-accent-color)}` }, Xe = i$1`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{display:flex;justify-content:center;align-items:center;width:32px;height:32px;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-accent-color);border-radius:var(--w3m-icon-button-border-radius);margin-bottom:4px}button path{fill:var(--w3m-accent-fill-color)}`;
var Je = Object.defineProperty, to = Object.getOwnPropertyDescriptor, Mt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? to(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Je(e2, a, o2), o2;
};
let it = class extends s$1 {
  constructor() {
    super(...arguments), this.icon = void 0, this.label = "", this.onClick = () => null;
  }
  render() {
    return x`<button @click="${this.onClick}"><div>${this.icon}</div><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
it.styles = [w.globalCss, Xe], Mt([n()], it.prototype, "icon", 2), Mt([n()], it.prototype, "label", 2), Mt([n()], it.prototype, "onClick", 2), it = Mt([e$1("w3m-box-button")], it);
const eo = i$1`button{border-radius:var(--w3m-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--w3m-accent-color)}button path{fill:var(--w3m-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--w3m-color-overlay)}button:disabled::after{background-color:transparent}.w3m-icon-left svg{margin-right:5px}.w3m-icon-right svg{margin-left:5px}button:active::after{background-color:var(--w3m-color-overlay)}.w3m-ghost,.w3m-ghost:active::after,.w3m-outline{background-color:transparent}.w3m-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}.w3m-ghost:hover::after{background-color:transparent}.w3m-ghost:hover{opacity:.5}}button:disabled{background-color:var(--w3m-color-bg-3);pointer-events:none}.w3m-ghost::after{border-color:transparent}.w3m-ghost path{fill:var(--w3m-color-fg-2)}.w3m-outline path{fill:var(--w3m-accent-color)}.w3m-outline:disabled{background-color:transparent;opacity:.5}`;
var oo = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, nt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ao(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && oo(e2, a, o2), o2;
};
let z = class extends s$1 {
  constructor() {
    super(...arguments), this.disabled = false, this.iconLeft = void 0, this.iconRight = void 0, this.onClick = () => null, this.variant = "default";
  }
  render() {
    const t2 = { "w3m-icon-left": this.iconLeft !== void 0, "w3m-icon-right": this.iconRight !== void 0, "w3m-ghost": this.variant === "ghost", "w3m-outline": this.variant === "outline" };
    let e2 = "inverse";
    return this.variant === "ghost" && (e2 = "secondary"), this.variant === "outline" && (e2 = "accent"), x`<button class="${o(t2)}" ?disabled="${this.disabled}" @click="${this.onClick}">${this.iconLeft}<w3m-text variant="small-regular" color="${e2}"><slot></slot></w3m-text>${this.iconRight}</button>`;
  }
};
z.styles = [w.globalCss, eo], nt([n()], z.prototype, "disabled", 2), nt([n()], z.prototype, "iconLeft", 2), nt([n()], z.prototype, "iconRight", 2), nt([n()], z.prototype, "onClick", 2), nt([n()], z.prototype, "variant", 2), z = nt([e$1("w3m-button")], z);
const ro = i$1`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--w3m-button-border-radius);color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:active::after{background-color:var(--w3m-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--w3m-color-bg-3);color:var(--w3m-color-fg-3)}.w3m-secondary{color:var(--w3m-accent-color);background-color:transparent}.w3m-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--w3m-color-overlay)}}`;
var lo = Object.defineProperty, io = Object.getOwnPropertyDescriptor, qt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? io(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && lo(e2, a, o2), o2;
};
let vt = class extends s$1 {
  constructor() {
    super(...arguments), this.disabled = false, this.variant = "primary";
  }
  render() {
    const t2 = { "w3m-secondary": this.variant === "secondary" };
    return x`<button ?disabled="${this.disabled}" class="${o(t2)}"><slot></slot></button>`;
  }
};
vt.styles = [w.globalCss, ro], qt([n()], vt.prototype, "disabled", 2), qt([n()], vt.prototype, "variant", 2), vt = qt([e$1("w3m-button-big")], vt);
const no = i$1`:host{background-color:var(--w3m-color-bg-2);border-top:1px solid var(--w3m-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
var so = Object.defineProperty, co = Object.getOwnPropertyDescriptor, mo = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? co(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && so(e2, a, o2), o2;
};
let Kt = class extends s$1 {
  render() {
    return x`<div><slot></slot></div>`;
  }
};
Kt.styles = [w.globalCss, no], Kt = mo([e$1("w3m-info-footer")], Kt);
const h = { CROSS_ICON: b`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`, WALLET_CONNECT_LOGO: b`<svg width="178" height="29" viewBox="0 0 178 29" id="w3m-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`, WALLET_CONNECT_ICON: b`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`, WALLET_CONNECT_ICON_COLORED: b`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`, BACK_ICON: b`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`, COPY_ICON: b`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`, RETRY_ICON: b`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`, DESKTOP_ICON: b`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, MOBILE_ICON: b`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`, ARROW_DOWN_ICON: b`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`, ARROW_UP_RIGHT_ICON: b`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, ARROW_RIGHT_ICON: b`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`, QRCODE_ICON: b`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`, SCAN_ICON: b`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`, CHECKMARK_ICON: b`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`, HELP_ETH_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#j)"><rect width="60" height="60" rx="30" fill="#987DE8"/><path fill-rule="evenodd" clip-rule="evenodd" d="m15.48 28.367 11.966-19.3c1.174-1.892 3.927-1.892 5.1 0l11.97 19.306a6 6 0 0 1 .9 3.142v.028a6 6 0 0 1-1.154 3.56L33.227 50.208c-1.599 2.188-4.864 2.188-6.461 0L15.733 35.095a6 6 0 0 1-1.154-3.538v-.029a6 6 0 0 1 .9-3.161Z" fill="#fff"/><path d="M30.84 10.112a.992.992 0 0 0-.844-.464V24.5l12.598 5.53c.081-.466-.001-.963-.27-1.398L30.84 10.112Z" fill="#643CDD"/><path d="M29.996 9.648a.991.991 0 0 0-.845.465l-11.489 18.53a1.991 1.991 0 0 0-.264 1.387l12.598-5.53V9.648Z" fill="#BDADEB"/><path d="M29.996 50.544a.994.994 0 0 0 .808-.41l11.235-15.38c.307-.434-.193-.988-.658-.72L31.49 39.71a2.998 2.998 0 0 1-1.494.398v10.437Z" fill="#643CDD"/><path d="M17.966 34.762 29.19 50.134c.2.274.503.41.807.41V40.108a2.998 2.998 0 0 1-1.493-.398l-9.884-5.676c-.468-.27-.971.292-.653.728Z" fill="#BDADEB"/><path d="M42.594 30.03 29.996 24.5v13.138a3 3 0 0 0 1.495-.399l10.149-5.83c.525-.31.856-.823.954-1.38Z" fill="#401AB3"/><path d="M29.996 37.638V24.462l-12.598 5.566c.098.564.437 1.083.974 1.392l10.13 5.82c.462.265.978.398 1.494.398Z" fill="#7C5AE2"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="29.5"/><defs><clipPath id="j"><rect width="60" height="60" rx="30" fill="#fff"/></clipPath></defs></svg>`, HELP_PAINTING_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#k)"><rect width="60" height="60" rx="3" fill="#C653C6"/><path d="M52.094 47.344c0-4.246-1.436-9.557-5.885-12.4a2.876 2.876 0 0 0-1.615-3.891v-.819a4.037 4.037 0 0 0-1.34-3.007 4.75 4.75 0 0 0-2.41-6.252v-5.506c0-6.248-5.065-11.313-11.313-11.313-6.247 0-11.312 5.065-11.312 11.313v2.152a3.343 3.343 0 0 0-1.18 5.045 4.738 4.738 0 0 0-1.633 3.584 4.73 4.73 0 0 0 .956 2.858 5.218 5.218 0 0 0-2.358 6.815c-3.06 4.129-6.098 8.298-6.098 15.64 0 2.668.364 4.856.731 6.385.184.765.368 1.366.509 1.78a12.721 12.721 0 0 0 .225.611l.015.037.005.011.001.004v.002h.001l.92-.393-.92.394.26.606h38.26l.291-.49-.86-.51.86.51v-.001l.002-.002.002-.005.01-.017.035-.06.127-.225c.108-.195.26-.477.441-.835.363-.714.845-1.732 1.328-2.953.959-2.427 1.945-5.725 1.945-9.068Z" fill="#E87DE8" stroke="#fff" stroke-width="2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 29.5c-3-.5-5.5-3-5.503-7l.002-7c0-.466 0-.698.026-.893a3 3 0 0 1 2.582-2.582c.195-.026.428-.026.893-.026 2 0 2.5-2.5 2.5-2.5s0 2.5 2.5 2.5c1.398 0 2.097 0 2.648.229a3 3 0 0 1 1.624 1.623c.228.552.228 1.25.228 2.649v6c0 4-3 7-6.5 7 1.35.23 4 0 6.5-2v9.53C34 38.5 31.495 40 28 40s-6-1.5-6-2.97L24 34l2.5 1.5v-6ZM26 47h4.5c2.5 0 3 4 3 5.5h-3l-1-1.5H26v-4Zm-6.25 5.5H24V57h-8c0-1 1-4.5 3.75-4.5Z" fill="#fff"/></g><rect class="help-img-highlight" x=".5" y=".5" width="59" height="59" rx="2.5"/><defs><clipPath id="k"><rect width="60" height="60" rx="3" fill="#fff"/></clipPath></defs></svg>`, HELP_CHART_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#l)"><path d="M0 25.01C0 15.76 0 11.133 1.97 7.678a15 15 0 0 1 5.598-5.597C11.023.11 15.648.11 24.9.11h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.597C60 11.133 60 15.758 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a15 15 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a14.999 14.999 0 0 1-5.597-5.598C0 49.087 0 44.462 0 35.21v-10.2Z" fill="#1DC956"/><path d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z" stroke="#fff" stroke-opacity=".1"/><path d="M16.109 60c-3.833-.179-6.41-.645-8.541-1.86a15 15 0 0 1-5.598-5.598C.553 50.057.155 46.967.043 41.985l4.146-1.382a4 4 0 0 0 2.48-2.39l4.654-12.409a2 2 0 0 1 2.505-1.195l2.526.842a2 2 0 0 0 2.422-1.003l2.968-5.938c.81-1.62 3.185-1.415 3.705.32l3.774 12.581a2 2 0 0 0 3.025 1.09l3.342-2.228c.27-.18.49-.422.646-.706l5.297-9.712a2 2 0 0 1 1.428-1.016l4.134-.689a2 2 0 0 1 1.61.437l3.892 3.243a2 2 0 0 0 2.694-.122l4.633-4.632C60 19.28 60 21.88 60 25.01v10.2c0 9.252 0 13.877-1.97 17.332a14.998 14.998 0 0 1-5.598 5.598c-2.131 1.215-4.708 1.681-8.54 1.86H16.108Z" fill="#2BEE6C"/><path d="M.072 43.03a112.37 112.37 0 0 1-.048-2.093l3.85-1.283a3 3 0 0 0 1.86-1.793l4.653-12.408a3 3 0 0 1 3.758-1.793l2.526.842a1 1 0 0 0 1.21-.501l2.97-5.938c1.214-2.43 4.775-2.123 5.556.48l3.774 12.58a1 1 0 0 0 1.513.545l3.341-2.227a1 1 0 0 0 .323-.353l5.298-9.712a3 3 0 0 1 2.14-1.523l4.135-.69a3 3 0 0 1 2.414.655l3.892 3.244a1 1 0 0 0 1.347-.061l5.28-5.28c.046.845.077 1.752.097 2.732l-3.962 3.962a3 3 0 0 1-4.042.183l-3.893-3.243a1 1 0 0 0-.804-.218l-4.135.689a1 1 0 0 0-.714.507l-5.297 9.712c-.233.427-.565.79-.97 1.06l-3.34 2.228a3 3 0 0 1-4.538-1.635l-3.775-12.58c-.26-.868-1.447-.97-1.852-.16l-2.969 5.937a3 3 0 0 1-3.632 1.505l-2.526-.842a1 1 0 0 0-1.252.597L7.606 38.564a5 5 0 0 1-3.1 2.988L.072 43.029Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.5 19a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" fill="#2BEE6C"/><path d="M47.5 19a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" fill="#fff"/><path d="M45 .283v59.654c-.63.042-1.294.074-2 .098V.185c.706.025 1.37.056 2 .098Z" fill="#fff"/><path class="help-img-highlight" d="M.5 25.01c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.289a14.5 14.5 0 0 1 5.412-5.41c1.639-.936 3.579-1.418 6.289-1.661C16.822.61 20.265.61 24.9.61h10.2c4.635 0 8.078 0 10.795.245 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.579 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.795-.244 2.71-.726 4.65-1.66 6.29a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.412C1.47 50.655.988 48.716.745 46.005.5 43.288.5 39.845.5 35.21v-10.2Z"/></g><defs><clipPath id="l"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, HELP_KEY_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#m)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M39.192 29.192c5.077-5.077 5.077-13.308 0-18.385-5.076-5.077-13.308-5.077-18.384 0-5.077 5.077-5.077 13.308 0 18.385l1.287 1.291c1.137 1.142 1.706 1.712 2.097 2.387.267.462.472.957.608 1.473.2.755.2 1.56.2 3.171V48.75c0 1.077 0 1.615.134 2.119a4 4 0 0 0 .407.984c.262.45.643.831 1.404 1.592l.294.295c.654.654.982.981 1.365 1.086.26.07.533.07.792 0 .383-.105.71-.432 1.365-1.086l3.478-3.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.478-.479c-.655-.654-.982-.981-1.087-1.365a1.5 1.5 0 0 1 0-.791c.105-.384.432-.711 1.087-1.365l.478-.479c.655-.654.982-.981 1.087-1.365a1.5 1.5 0 0 0 0-.791c-.105-.384-.432-.711-1.087-1.365l-.492-.493c-.65-.65-.974-.974-1.08-1.355a1.5 1.5 0 0 1-.003-.788c.102-.382.425-.71 1.069-1.364l5.46-5.547Z"/><circle cx="30" cy="17" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="m"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, HELP_USER_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#n)"><rect width="60" height="60" fill="#00ACE6" rx="30"/><path fill="#1AC6FF" stroke="#fff" stroke-width="2" d="M59 73c0 16.016-12.984 29-29 29S1 89.016 1 73c0-16.017 11-29 29-29s29 12.983 29 29ZM18.69 19.902a11 11 0 0 1 9.281-8.692 14.842 14.842 0 0 1 4.058 0 11 11 0 0 1 9.28 8.692c.178.866.322 1.75.44 2.625.132.977.132 1.968 0 2.945a39.467 39.467 0 0 1-.44 2.625 11 11 0 0 1-9.28 8.692 14.862 14.862 0 0 1-4.058 0 11 11 0 0 1-9.28-8.692 39.467 39.467 0 0 1-.44-2.625 11.004 11.004 0 0 1 0-2.945c.118-.876.262-1.759.44-2.625Z"/><circle cx="24.5" cy="23.5" r="1.5" fill="#fff"/><circle cx="35.5" cy="23.5" r="1.5" fill="#fff"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m31 20-3 8h4"/></g><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/><defs><clipPath id="n"><rect width="60" height="60" fill="#fff" rx="30"/></clipPath></defs></svg>`, HELP_LOCK_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#C653C6" rx="3"/><path fill="#fff" d="M20.034 15.216C20 15.607 20 16.07 20 17v2.808c0 1.13 0 1.696-.2 2.11a1.78 1.78 0 0 1-.584.714c-.366.28-1.051.42-2.423.7a7.076 7.076 0 0 0-1.597.511 9.001 9.001 0 0 0-4.353 4.353C10 30.005 10 32.336 10 37c0 4.663 0 6.995.843 8.804a9.001 9.001 0 0 0 4.353 4.353C17.005 51 19.336 51 24 51h12c4.663 0 6.995 0 8.804-.843a9.001 9.001 0 0 0 4.353-4.353C50 43.995 50 41.664 50 37c0-4.663 0-6.995-.843-8.804a9.001 9.001 0 0 0-4.353-4.353 7.076 7.076 0 0 0-1.597-.511c-1.372-.28-2.057-.42-2.423-.7a1.78 1.78 0 0 1-.583-.715C40 21.505 40 20.94 40 19.809V17c0-.929 0-1.393-.034-1.784a9 9 0 0 0-8.182-8.182C31.393 7 30.93 7 30 7s-1.393 0-1.784.034a9 9 0 0 0-8.182 8.182Z"/><path fill="#E87DE8" d="M22 17c0-.929 0-1.393.044-1.784a7 7 0 0 1 6.172-6.172C28.606 9 29.071 9 30 9s1.393 0 1.784.044a7 7 0 0 1 6.172 6.172c.044.39.044.855.044 1.784v4.5a1.5 1.5 0 0 1-3 0V17c0-.93 0-1.394-.077-1.78a4 4 0 0 0-3.143-3.143C31.394 12 30.93 12 30 12s-1.394 0-1.78.077a4 4 0 0 0-3.143 3.143C25 15.606 25 16.07 25 17v4.5a1.5 1.5 0 0 1-3 0V17Z"/><path fill="#E87DE8" fill-rule="evenodd" d="M12 36.62c0-4.317 0-6.476.92-8.088a7 7 0 0 1 2.612-2.612c1.612-.92 3.77-.92 8.088-.92h6.855c.469 0 .703 0 .906.017 2.73.222 4.364 2.438 4.619 4.983.27-2.698 2.111-5 5.015-5A6.985 6.985 0 0 1 48 31.985v5.395c0 4.317 0 6.476-.92 8.088a7 7 0 0 1-2.612 2.612c-1.612.92-3.77.92-8.088.92h-5.855c-.469 0-.703 0-.906-.017-2.73-.222-4.364-2.438-4.619-4.983-.258 2.583-1.943 4.818-4.714 4.99-.155.01-.335.01-.694.01-.55 0-.825 0-1.057-.015a7 7 0 0 1-6.52-6.52C12 42.233 12 41.958 12 41.408V36.62Zm21.24-.273a4 4 0 1 0-6.478 0c.985 1.36 1.479 2.039 1.564 2.229.178.398.176.818.174 1.247V42.5a1.5 1.5 0 0 0 3 0v-2.677c-.002-.429-.004-.85.174-1.247.085-.19.579-.87 1.565-2.229Z" clip-rule="evenodd"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`, HELP_COMPAS_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#1DC956" rx="30"/><circle cx="30" cy="29.999" r="3" fill="#fff"/><path fill="#2BEE6C" stroke="#fff" stroke-width="2" d="m45.316 17.9-.88-.425.88.424a7.9 7.9 0 0 1 .026-.053c.093-.192.21-.432.26-.687l-.819-.162.819.162a2 2 0 0 0-.239-1.405c-.132-.224-.32-.412-.472-.562a8.415 8.415 0 0 1-.042-.042l-.042-.042c-.15-.151-.338-.34-.562-.472l-.508.862.508-.862a2 2 0 0 0-1.405-.239c-.255.05-.495.167-.687.26l-.053.026-15.05 7.246-.108.052c-1.131.545-1.843.887-2.456 1.374a6.994 6.994 0 0 0-1.13 1.13c-.487.613-.83 1.325-1.375 2.457l-.051.108-7.247 15.05-.025.053c-.094.192-.21.431-.26.686a2 2 0 0 0 .239 1.406l.855-.505-.856.505c.133.224.321.411.473.562l.042.042.041.042c.15.151.338.34.563.472a2 2 0 0 0 1.405.239l-.195-.981.195.98c.255-.05.494-.166.686-.26l.054-.025-.419-.87.419.87 15.05-7.247.107-.051c1.132-.545 1.844-.888 2.457-1.374a7.002 7.002 0 0 0 1.13-1.13c.487-.614.83-1.325 1.374-2.457l.052-.108 7.246-15.05Z"/><path fill="#1DC956" d="m33.376 32.723-2.669-3.43-14.85 14.849.206.205a1 1 0 0 0 1.141.194l15.105-7.273a3 3 0 0 0 1.067-4.545Z"/><path fill="#86F999" d="m26.624 27.276 2.669 3.43 14.85-14.849-.206-.205a1 1 0 0 0-1.141-.194L27.69 22.731a3 3 0 0 0-1.067 4.545Z"/><circle cx="30" cy="30" r="3" fill="#fff" transform="rotate(45 30 30)"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="29.5"/></svg>`, HELP_NOUN_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><rect width="60" height="60" fill="#794CFF" rx="3"/><path fill="#987DE8" stroke="#fff" stroke-width="2" d="M33 22.5v-1H16v5H8.5V36H13v-5h3v7.5h17V31h1v7.5h17v-17H34v5h-1v-4Z"/><path fill="#fff" d="M37.5 25h10v10h-10z"/><path fill="#4019B2" d="M42.5 25h5v10h-5z"/><path fill="#fff" d="M19.5 25h10v10h-10z"/><path fill="#4019B2" d="M24.5 25h5v10h-5z"/><path fill="#fff" d="M12 30.5h4V37h-4v-6.5Z"/><rect class="help-img-highlight" width="59" height="59" x=".5" y=".5" rx="2.5"/></svg>`, HELP_DAO_IMG: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#o)"><path fill="#EB8B47" d="M0 24.9c0-9.252 0-13.878 1.97-17.332A15 15 0 0 1 7.569 1.97C11.023 0 15.648 0 24.9 0h10.2c9.251 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.022 60 15.648 60 24.899v10.2c0 9.252 0 13.878-1.97 17.332a15.001 15.001 0 0 1-5.598 5.598c-3.455 1.97-8.08 1.97-17.332 1.97H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.351 0 35.1V24.9Z"/><path class="help-img-highlight" d="M.5 24.9c0-4.635 0-8.078.244-10.795.244-2.71.726-4.65 1.66-6.29a14.5 14.5 0 0 1 5.412-5.41C9.455 1.468 11.395.986 14.105.743 16.822.5 20.265.5 24.9.5h10.2c4.635 0 8.078 0 10.795.244 2.71.243 4.65.725 6.29 1.66a14.5 14.5 0 0 1 5.41 5.411c.935 1.64 1.417 3.58 1.66 6.29.244 2.717.245 6.16.245 10.794v10.2c0 4.635 0 8.078-.244 10.796-.244 2.71-.726 4.65-1.66 6.289a14.5 14.5 0 0 1-5.412 5.41c-1.639.936-3.579 1.418-6.289 1.661-2.717.244-6.16.244-10.795.244H24.9c-4.635 0-8.078 0-10.795-.244-2.71-.243-4.65-.725-6.29-1.66a14.5 14.5 0 0 1-5.41-5.411c-.935-1.64-1.417-3.58-1.66-6.29C.5 43.178.5 39.734.5 35.1V24.9Z"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M19 52c5.523 0 10-4.477 10-10s-4.477-10-10-10S9 36.477 9 42s4.477 10 10 10Z"/><path fill="#fff" fill-rule="evenodd" d="M42.844 8.326a1 1 0 0 0-1.687 0L28.978 27.463A1 1 0 0 0 29.822 29h24.357a1 1 0 0 0 .843-1.537L42.844 8.326Z" clip-rule="evenodd"/><path fill="#FF974C" fill-rule="evenodd" d="M42.335 11.646c.324.115.571.504 1.066 1.28l7.332 11.523c.562.883.843 1.325.792 1.69a1 1 0 0 1-.342.623c-.28.238-.803.238-1.85.238H34.667c-1.047 0-1.57 0-1.85-.238a1 1 0 0 1-.342-.623c-.051-.365.23-.806.792-1.69l7.332-11.523c.495-.776.742-1.165 1.066-1.28a1 1 0 0 1 .67 0ZM35 27a7 7 0 0 0 7-7 7 7 0 0 0 7 7H35Z" clip-rule="evenodd"/><path fill="#FF974C" stroke="#fff" stroke-width="2" d="M10.106 9.357c-.109.32-.107.682-.106.975V25.668c-.001.293-.003.654.106.975a2 2 0 0 0 1.251 1.25c.32.11.682.108.975.107H19c5.523 0 10-4.477 10-10S24.523 8 19 8h-6.668c-.293-.001-.654-.003-.975.106a2 2 0 0 0-1.25 1.251Z"/><circle cx="19" cy="18" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/><circle cx="19" cy="41.999" r="4" fill="#EB8B47" stroke="#fff" stroke-width="2"/></g><defs><clipPath id="o"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, SEARCH_ICON: b`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`, HELP_ICON: b`<svg width="11" height="17" viewBox="0 0 11 17"><path fill="#fff" d="M5.22 2.97c-1.07 0-2.25.843-2.25 2.25a.75.75 0 0 1-1.5 0c0-2.393 2.019-3.75 3.75-3.75 1.73 0 3.75 1.357 3.75 3.75 0 1.64-1.038 2.466-1.785 3.057-.802.635-1.215.984-1.215 1.693a.75.75 0 1 1-1.5 0c0-1.466.985-2.24 1.681-2.788l.103-.081C7.007 6.504 7.47 6.08 7.47 5.22c0-1.407-1.181-2.25-2.25-2.25ZM5.22 14.97a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>`, WALLET_ICON: b`<svg width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#fff" fill-rule="evenodd" d="M.64 9.2v-3h.001c.009-1.857.07-2.886.525-3.682a4 4 0 0 1 1.492-1.493C3.58.5 4.813.5 7.28.5h3.735c.58 0 .871 0 1.114.04A3 3 0 0 1 14.6 3.011c.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041h-.777c.178.307.302.648.362 1.011.04.243.04.533.04 1.114 0 .58 0 .871-.04 1.114a3 3 0 0 1-2.471 2.47c-.243.041-.533.041-1.114.041H4.507A3.867 3.867 0 0 1 .64 9.633V9.2ZM7.28 2h3.735c.64 0 .779.005.87.02a1.5 1.5 0 0 1 1.235 1.236c.015.09.02.229.02.869s-.005.779-.02.87a1.5 1.5 0 0 1-1.236 1.235c-.09.015-.229.02-.869.02H4.023c-.697 0-1.345.21-1.883.572V6.25h.001c.004-.791.015-1.383.059-1.867.056-.629.157-.926.269-1.122a2.5 2.5 0 0 1 .932-.933c.197-.111.494-.212 1.123-.268C5.173 2 6.019 2 7.28 2Zm-.265 5.75H4.023c-1.04 0-1.883.843-1.883 1.883A2.367 2.367 0 0 0 4.507 12h2.508c.64 0 .779-.005.87-.02a1.5 1.5 0 0 0 1.235-1.236c.015-.09.02-.229.02-.869s-.005-.779-.02-.87A1.5 1.5 0 0 0 7.884 7.77c-.09-.015-.228-.02-.869-.02Z" clip-rule="evenodd"/></svg>`, NETWORK_PLACEHOLDER: b`<svg width="28" height="28" fill="none" viewBox="0 0 28 28"><mask id="p" width="26" height="28" x="1" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#D9D9D9" d="M12 1.172a4 4 0 0 1 4 0l8.124 4.69a4 4 0 0 1 2 3.465v9.381a4 4 0 0 1-2 3.464L16 26.862a4 4 0 0 1-4 0l-8.124-4.69a4 4 0 0 1-2-3.464V9.327a4 4 0 0 1 2-3.464L12 1.173Z"/></mask><g mask="url(#p)"><path id="network-placeholder-fill" fill="#fff" d="M0 0h28v28H0z"/><path id="network-placeholder-dash" stroke="#000" stroke-dasharray="2 2" d="m8.953 2.931 2.032-1.173.25.433 1.015-.586c.269-.155.553-.271.844-.35l-.13-.483a4.003 4.003 0 0 1 2.071 0l-.13.483c.293.079.576.195.845.35l1.016.586.25-.433 2.03 1.173-.25.433 2.032 1.173.25-.433 2.03 1.172-.25.433 1.016.587c.269.155.512.342.725.556l.354-.354a4.003 4.003 0 0 1 1.035 1.794l-.483.129c.078.292.12.596.12.906v1.172h.5v2.346h-.5v2.345h.5v2.345h-.5v1.173c0 .31-.042.614-.12.906l.483.13a4.003 4.003 0 0 1-1.035 1.793l-.354-.354a3.498 3.498 0 0 1-.725.556l-1.015.586.25.434-2.031 1.172-.25-.433-2.031 1.173.25.433-2.031 1.172-.25-.433-1.016.587a3.494 3.494 0 0 1-.844.35l.13.482a4.003 4.003 0 0 1-2.071 0l.13-.483a3.496 3.496 0 0 1-.845-.35l-1.015-.586-.25.433-2.032-1.172.25-.433-2.03-1.173-.25.433L4.89 22.76l.25-.434-1.015-.586a3.498 3.498 0 0 1-.725-.556l-.354.354a4.003 4.003 0 0 1-1.035-1.794l.483-.13a3.497 3.497 0 0 1-.12-.905v-1.173h-.5V15.19h.5v-2.345h-.5v-2.346h.5V9.327c0-.31.042-.614.12-.906l-.483-.13a4.003 4.003 0 0 1 1.035-1.793l.354.354c.213-.214.456-.401.725-.556l1.015-.587-.25-.433 2.031-1.172.25.433 2.031-1.173-.25-.433Z"/><path fill="#798686" stroke="#fff" d="M14.243 13.563 14 13.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.538.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.538-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#9EA9A9" stroke="#fff" d="M14.243 8.563 14 8.428l-.243.135-6.388 3.549-.024.013c-.432.24-.79.44-1.053.622-.266.184-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.316.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722l-.468-.177.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.316-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-6.388-3.55Z"/><path fill="#C9CFCF" stroke="#fff" d="m22.344 9.53-.468-.176.468.177a1.5 1.5 0 0 0 0-1.062l-.468.177.468-.177c-.12-.317-.37-.537-.636-.722-.263-.183-.62-.382-1.053-.622l-.024-.013-3.163-1.758-.09-.05c-1.163-.645-1.856-1.03-2.606-1.161a4.5 4.5 0 0 0-1.544 0c-.75.13-1.443.516-2.607 1.162l-.088.05-3.164 1.757-.024.013c-.432.24-.79.44-1.053.622-.266.185-.516.405-.636.722a1.5 1.5 0 0 0 0 1.062c.12.317.37.537.636.722.263.183.62.382 1.053.622l.024.013 3.164 1.758.088.049c1.164.646 1.857 1.032 2.607 1.162.51.09 1.033.09 1.544 0 .75-.13 1.443-.516 2.606-1.162l.09-.05 3.163-1.757.024-.013c.432-.24.79-.44 1.053-.622.266-.184.516-.405.636-.722Z"/></g></svg>`, WALLET_PLACEHOLDER: b`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, TOKEN_PLACEHOLDER: b`<svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect id="token-placeholder-fill" width="58" height="58" x="1" y="1" fill="#fff" rx="29"/><path fill="#3B4040" stroke="#fff" stroke-width="2" d="M32 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5.566c0 .357.192.685.495.875a16.001 16.001 0 0 1 4.256 3.894c.667.88.33 2.113-.627 2.665l-2.494 1.44c-.956.552-2.166.204-2.913-.609a9.12 9.12 0 1 0 .064 12.267c.739-.82 1.945-1.181 2.907-.64l2.509 1.415c.962.542 1.312 1.77.654 2.658a16 16 0 0 1-4.356 4.028c-.303.19-.495.518-.495.875V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.992c0-.602-.528-1.065-1.13-1.032-.579.032-1.16.032-1.74 0-.602-.032-1.13.43-1.13 1.032V50a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5.566c0-.357-.192-.685-.495-.875a16 16 0 0 1 0-27.118c.303-.19.495-.517.495-.875V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.992c0 .601.528 1.064 1.13 1.032.58-.032 1.161-.032 1.74 0 .602.033 1.13-.43 1.13-1.032V10Z"/><rect id="token-placeholder-dash" width="58" height="58" x="1" y="1" stroke="#000" stroke-dasharray="6 6" stroke-width="2" rx="29"/></svg>`, ACCOUNT_COPY: b`<svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path fill="#fff" fill-rule="evenodd" d="M4.003 4.005c.012-1.225.074-1.936.391-2.491a3 3 0 0 1 1.12-1.12C6.204 0 7.136 0 9 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C14 2.204 14 3.136 14 5s0 2.795-.394 3.486a3 3 0 0 1-1.12 1.12c-.555.317-1.266.379-2.491.391l.002.003c-.012 1.222-.075 1.932-.391 2.486a3 3 0 0 1-1.12 1.12C7.796 14 6.864 14 5 14s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C0 11.796 0 10.864 0 9s0-2.795.394-3.486a3 3 0 0 1 1.12-1.12c.554-.316 1.264-.379 2.486-.391l.003.002ZM9 8.5c-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.045-.08-.113-.243-.154-.693C5.501 6.58 5.5 5.959 5.5 5c0-.959.001-1.58.043-2.05.04-.45.109-.613.154-.693a1.5 1.5 0 0 1 .56-.56c.08-.045.243-.113.693-.154C7.42 1.501 8.041 1.5 9 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.045.08.113.243.154.693.042.47.043 1.091.043 2.05 0 .959-.001 1.58-.043 2.05-.04.45-.109.613-.154.693a1.5 1.5 0 0 1-.56.56c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043ZM4 5.503a13.77 13.77 0 0 0-1.05.04c-.45.04-.613.109-.693.154a1.5 1.5 0 0 0-.56.56c-.045.08-.113.243-.154.693C1.501 7.42 1.5 8.041 1.5 9c0 .959.001 1.58.043 2.05.04.45.109.613.154.693a1.5 1.5 0 0 0 .56.56c.08.045.243.113.693.154.47.042 1.091.043 2.05.043.959 0 1.58-.001 2.05-.043.45-.04.613-.109.693-.154a1.5 1.5 0 0 0 .56-.56c.045-.08.113-.242.154-.693.025-.283.035-.619.04-1.05-1.534-.003-2.358-.037-2.983-.394a3 3 0 0 1-1.12-1.12c-.357-.625-.39-1.449-.394-2.983Z" clip-rule="evenodd"/></svg>`, ACCOUNT_DISCONNECT: b`<svg width="16" height="14" fill="none" viewBox="0 0 16 14"><path fill="#fff" d="M9.677 1.5h-2.61c-1.261 0-2.107.001-2.757.06-.629.056-.926.157-1.122.268a2.5 2.5 0 0 0-.933.933c-.112.196-.212.493-.269 1.122-.058.65-.06 1.496-.06 2.757v.72c0 1.26.002 2.107.06 2.756.057.63.157.927.27 1.123a2.5 2.5 0 0 0 .932.933c.196.111.493.212 1.122.268.65.059 1.496.06 2.757.06h2.61a.75.75 0 1 1 0 1.5h-2.61c-2.467 0-3.7 0-4.622-.525a4 4 0 0 1-1.493-1.493C.427 11.06.427 9.827.427 7.36v-.72c0-2.467 0-3.7.525-4.622A4 4 0 0 1 2.445.525C3.366 0 4.6 0 7.067 0h2.61a.75.75 0 1 1 0 1.5Z"/><path fill="#fff" d="M10.896 11.03a.75.75 0 0 1 0-1.06l1.793-1.793a.25.25 0 0 0-.176-.427H8.177a.75.75 0 0 1 0-1.5h4.336a.25.25 0 0 0 .176-.427L10.896 4.03a.75.75 0 0 1 1.061-1.06l3.323 3.323a1 1 0 0 1 0 1.414l-3.323 3.323a.75.75 0 0 1-1.06 0Z"/></svg>`, GLOBE_ICON: b`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>` }, ho = i$1`.w3m-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--w3m-background-border-radius) * .9);background-color:var(--w3m-background-color);background-image:var(--w3m-background-image-url);background-position:center;background-size:cover}.w3m-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.w3m-toolbar img,.w3m-toolbar svg{height:28px;object-position:left center;object-fit:contain}#w3m-wc-logo path{fill:var(--w3m-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--w3m-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--w3m-color-bg-1);box-shadow:0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--w3m-color-fg-1)}.w3m-toolbar div{display:flex}.w3m-toolbar div button:first-child{margin-right:16px}.w3m-help-active button:first-child{background-color:var(--w3m-color-fg-1)}.w3m-help-active button:first-child path{fill:var(--w3m-color-bg-1)}@media(hover:hover){button:hover{background-color:var(--w3m-color-bg-2)}}`;
var po = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Ie = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? wo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && po(e2, a, o2), o2;
};
let Pt = class extends s$1 {
  constructor() {
    super(), this.isHelp = false, this.unsubscribeRouter = void 0, this.unsubscribeRouter = b$1.subscribe((t2) => {
      this.isHelp = t2.view === "Help";
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeRouter) == null || t2.call(this);
  }
  onHelp() {
    b$1.push("Help");
  }
  logoTemplate() {
    var t2;
    const e2 = (t2 = ae$1.state.themeVariables) == null ? void 0 : t2["--w3m-logo-image-url"];
    return e2 ? x`<img src="${e2}">` : h.WALLET_CONNECT_LOGO;
  }
  render() {
    const t2 = { "w3m-help-active": this.isHelp };
    return x`<div class="w3m-toolbar-placeholder"></div><div class="w3m-toolbar">${this.logoTemplate()}<div class="${o(t2)}"><button @click="${this.onHelp}">${h.HELP_ICON}</button> <button @click="${se$1.close}">${h.CROSS_ICON}</button></div></div>`;
  }
};
Pt.styles = [w.globalCss, ho], Ie([t$1()], Pt.prototype, "isHelp", 2), Pt = Ie([e$1("w3m-modal-backcard")], Pt);
const go = i$1`main{padding:20px;padding-top:0;width:100%}`;
var uo = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, bo = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? vo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && uo(e2, a, o2), o2;
};
let Yt = class extends s$1 {
  render() {
    return x`<main><slot></slot></main>`;
  }
};
Yt.styles = [w.globalCss, go], Yt = bo([e$1("w3m-modal-content")], Yt);
const fo = i$1`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--w3m-color-bg-2)}`;
var xo = Object.defineProperty, yo = Object.getOwnPropertyDescriptor, Co = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? yo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && xo(e2, a, o2), o2;
};
let Qt = class extends s$1 {
  render() {
    return x`<footer><slot></slot></footer>`;
  }
};
Qt.styles = [w.globalCss, fo], Qt = Co([e$1("w3m-modal-footer")], Qt);
const $o = i$1`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.w3m-border{border-bottom:1px solid var(--w3m-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.w3m-back-btn{position:absolute;left:0}.w3m-action-btn{position:absolute;right:0}path{fill:var(--w3m-accent-color)}`;
var ko = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, bt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Oo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ko(e2, a, o2), o2;
};
let Y = class extends s$1 {
  constructor() {
    super(...arguments), this.title = "", this.onAction = void 0, this.actionIcon = void 0, this.border = false;
  }
  backBtnTemplate() {
    return x`<button class="w3m-back-btn" @click="${b$1.goBack}">${h.BACK_ICON}</button>`;
  }
  actionBtnTemplate() {
    return x`<button class="w3m-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
  }
  render() {
    const t2 = { "w3m-border": this.border }, e2 = b$1.state.history.length > 1, a = this.title ? x`<w3m-text variant="big-bold">${this.title}</w3m-text>` : x`<slot></slot>`;
    return x`<header class="${o(t2)}">${e2 ? this.backBtnTemplate() : null} ${a} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
  }
};
Y.styles = [w.globalCss, $o], bt([n()], Y.prototype, "title", 2), bt([n()], Y.prototype, "onAction", 2), bt([n()], Y.prototype, "actionIcon", 2), bt([n()], Y.prototype, "border", 2), Y = bt([e$1("w3m-modal-header")], Y);
const Io = { 1: "692ed6ba-e569-459a-556a-776476829e00", 42161: "600a9a04-c1b9-42ca-6785-9b4b6ff85200", 43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00", 56: "93564157-2e8e-4ce7-81df-b264dbee9b00", 250: "06b26297-fe0c-4733-5d6b-ffa5498aac00", 10: "ab9c186a-c52f-464b-2906-ca59d760a400", 137: "41d04d42-da3b-4453-8506-668cc0727900", 100: "02b53f6a-e3d4-479e-1cb4-21178987d100", 9001: "f926ff41-260d-4028-635e-91913fc28e00", 324: "b310f07f-4ef7-49f3-7073-2a0a39685800", 314: "5a73b3dd-af74-424e-cae0-0de859ee9400", 4689: "34e68754-e536-40da-c153-6ef2e7188a00", 1088: "3897a66d-40b9-4833-162f-a2c90531c900", 1284: "161038da-44ae-4ec7-1208-0ea569454b00", 1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00" }, Eo = { ETH: { icon: "692ed6ba-e569-459a-556a-776476829e00" }, WETH: { icon: "692ed6ba-e569-459a-556a-776476829e00" }, AVAX: { icon: "30c46e53-e989-45fb-4549-be3bd4eb3b00" }, FTM: { icon: "06b26297-fe0c-4733-5d6b-ffa5498aac00" }, BNB: { icon: "93564157-2e8e-4ce7-81df-b264dbee9b00" }, MATIC: { icon: "41d04d42-da3b-4453-8506-668cc0727900" }, OP: { icon: "ab9c186a-c52f-464b-2906-ca59d760a400" }, xDAI: { icon: "02b53f6a-e3d4-479e-1cb4-21178987d100" }, EVMOS: { icon: "f926ff41-260d-4028-635e-91913fc28e00" }, METIS: { icon: "3897a66d-40b9-4833-162f-a2c90531c900" }, IOTX: { icon: "34e68754-e536-40da-c153-6ef2e7188a00" } }, Z = { externalWallets() {
  const { isStandalone: t2 } = d.state;
  if (t2)
    return [];
  let e2 = C.client().getConnectors();
  return e2 = e2.filter((a) => a.id !== "injected"), e2;
}, manualWallets() {
  var t2, e2;
  const { mobileWallets: a, desktopWallets: r } = y.state, o2 = (t2 = Z.recentWallet()) == null ? void 0 : t2.id, l = c.isMobile() ? a : r, i2 = l?.filter((p) => o2 !== p.id);
  return (e2 = c.isMobile() ? i2?.map(({ id: p, name: g, links: f }) => ({ id: p, name: g, mobile: f, links: f })) : i2?.map(({ id: p, name: g, links: f }) => ({ id: p, name: g, desktop: f, links: f }))) != null ? e2 : [];
}, installedInjectedWallets() {
  const { isStandalone: t2 } = d.state;
  if (t2)
    return [];
  if (!C.client().isInjectedProviderInstalled())
    return [];
  const { namespace: e2 } = C.client(), { injectedWallets: a } = ne$1.state;
  let r = a.filter(({ injected: o2 }) => !!o2.some((l) => C.client().safeCheckInjectedProvider(l.injected_id) && l.namespace === e2));
  return r.length > 1 && (r = r.filter(({ injected: o2 }) => !!o2.map(({ injected_id: l }) => l).every((l) => l !== "isMetaMask"))), r.length ? r : [{ name: "Browser", id: "browser", image_id: void 0 }];
}, injectedWallets() {
  const { isStandalone: t2 } = d.state, { explorerExcludedWalletIds: e2, explorerRecommendedWalletIds: a } = y.state, r = c.isMobile();
  if (t2 || e2 === "ALL" || r)
    return [];
  const { namespace: o2 } = C.client(), { injectedWallets: l } = ne$1.state;
  return l.filter(({ id: i2, injected: p }) => {
    const g = c.isArray(e2) ? e2 : [], f = c.isArray(a) ? a : [];
    return !!p.some((j) => j.namespace === o2 && !g.includes(i2) && !f.includes(i2));
  });
}, recentWallet() {
  return s.getRecentWallet();
}, recomendedWallets(t2 = false) {
  var e2;
  const a = Z.installedInjectedWallets().map(({ id: i2 }) => i2), r = t2 || (e2 = Z.recentWallet()) == null ? void 0 : e2.id, o2 = [...a, r], { recomendedWallets: l } = ne$1.state;
  return l.filter((i2) => !o2.includes(i2.id));
} }, s = { MOBILE_BREAKPOINT: 600, W3M_RECENT_WALLET_DATA: "W3M_RECENT_WALLET_DATA", EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet", rejectStandaloneButtonComponent() {
  const { isStandalone: t2 } = d.state;
  if (t2)
    throw new Error("Web3Modal button components are not available in standalone mode.");
}, getShadowRootElement(t2, e2) {
  const a = t2.renderRoot.querySelector(e2);
  if (!a)
    throw new Error(`${e2} not found`);
  return a;
}, getWalletIcon({ id: t2, image_id: e2 }) {
  const { walletImages: a } = y.state;
  return a != null && a[t2] ? a[t2] : e2 ? ne$1.getWalletImageUrl(e2) : "";
}, getWalletName(t2, e2 = false) {
  return e2 ? t2.split(" ")[0] : t2;
}, getChainIcon(t2) {
  var e2;
  const a = Io[t2], { projectId: r, chainImages: o2 } = y.state;
  return (e2 = o2?.[t2]) != null ? e2 : r && a ? ne$1.getAssetImageUrl(a) : "";
}, getTokenIcon(t2) {
  var e2, a;
  const r = (e2 = Eo[t2]) == null ? void 0 : e2.icon, { projectId: o2, tokenImages: l } = y.state;
  return (a = l?.[t2]) != null ? a : o2 && r ? ne$1.getAssetImageUrl(r) : "";
}, isMobileAnimation() {
  return window.innerWidth <= s.MOBILE_BREAKPOINT;
}, async preloadImage(t2) {
  const e2 = new Promise((a, r) => {
    const o2 = new Image();
    o2.onload = a, o2.onerror = r, o2.src = t2;
  });
  return Promise.race([e2, c.wait(3e3)]);
}, getErrorMessage(t2) {
  return t2 instanceof Error ? t2.message : "Unknown Error";
}, debounce(t2, e2 = 500) {
  let a;
  return (...r) => {
    function o2() {
      t2(...r);
    }
    a && clearTimeout(a), a = setTimeout(o2, e2);
  };
}, handleMobileLinking(t2) {
  const { standaloneUri: e2 } = d.state, { pairingUri: a } = _.state, { mobile: r, name: o2 } = t2, l = r?.native, i2 = r?.universal;
  s.setRecentWallet(t2);
  function p(g) {
    let f = "";
    l ? f = c.formatUniversalUrl(l, g, o2) : i2 && (f = c.formatNativeUrl(i2, g, o2)), c.openHref(f, "_self");
  }
  p(e2 || a);
}, handleAndroidLinking() {
  const { standaloneUri: t2 } = d.state, { pairingUri: e2 } = _.state;
  t2 ? (c.setWalletConnectAndroidDeepLink(t2), c.openHref(t2, "_self")) : (c.setWalletConnectAndroidDeepLink(e2), c.openHref(e2, "_self"));
}, async handleUriCopy() {
  const { standaloneUri: t2 } = d.state, { pairingUri: e2 } = _.state;
  t2 ? await navigator.clipboard.writeText(t2) : await navigator.clipboard.writeText(e2), oe$1.openToast("Link copied", "success");
}, async handleConnectorConnection(t2, e2) {
  try {
    const { selectedChain: a } = d.state;
    await C.client().connectConnector(t2, a?.id), se$1.close();
  } catch (a) {
    console.error(a), e2 ? e2() : oe$1.openToast(s.getErrorMessage(a), "error");
  }
}, getCustomImageUrls() {
  const { chainImages: t2, walletImages: e2 } = y.state, a = Object.values(t2 ?? {}), r = Object.values(e2 ?? {});
  return Object.values([...a, ...r]);
}, truncate(t2, e2 = 8) {
  return t2.length <= e2 ? t2 : `${t2.substring(0, 4)}...${t2.substring(t2.length - 4)}`;
}, generateAvatarColors(t2) {
  var e2;
  const a = (e2 = t2.match(/.{1,7}/g)) == null ? void 0 : e2.splice(0, 5), r = [];
  a?.forEach((l) => {
    let i2 = 0;
    for (let g = 0; g < l.length; g += 1)
      i2 = l.charCodeAt(g) + ((i2 << 5) - i2), i2 = i2 & i2;
    const p = [0, 0, 0];
    for (let g = 0; g < 3; g += 1) {
      const f = i2 >> g * 8 & 255;
      p[g] = f;
    }
    r.push(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
  });
  const o2 = document.querySelector(":root");
  if (o2) {
    const l = { "--w3m-color-av-1": r[0], "--w3m-color-av-2": r[1], "--w3m-color-av-3": r[2], "--w3m-color-av-4": r[3], "--w3m-color-av-5": r[4] };
    Object.entries(l).forEach(([i2, p]) => o2.style.setProperty(i2, p));
  }
}, setRecentWallet(t2) {
  const { walletConnectVersion: e2 } = d.state;
  localStorage.setItem(s.W3M_RECENT_WALLET_DATA, JSON.stringify({ [e2]: t2 }));
}, getRecentWallet() {
  const t2 = localStorage.getItem(s.W3M_RECENT_WALLET_DATA);
  if (t2) {
    const { walletConnectVersion: e2 } = d.state, a = JSON.parse(t2);
    if (a[e2])
      return a[e2];
  }
}, caseSafeIncludes(t2, e2) {
  return t2.toUpperCase().includes(e2.toUpperCase());
}, openWalletExplorerUrl() {
  c.openHref(s.EXPLORER_WALLET_URL, "_blank");
}, getCachedRouterWalletPlatforms() {
  const { id: t2, desktop: e2, mobile: a, injected: r } = c.getWalletRouterData(), o2 = Z.installedInjectedWallets(), l = !!(r != null && r.length), i2 = o2.some((j) => j.id === t2), p = !!(e2 != null && e2.native), g = !!(e2 != null && e2.universal), f = !!(a != null && a.native) || !!(a != null && a.universal);
  return { isInjectedInstalled: i2, isInjected: l, isDesktop: p, isMobile: f, isWeb: g };
}, goToConnectingView(t2) {
  b$1.setData({ Wallet: t2 });
  const e2 = c.isMobile(), { isDesktop: a, isWeb: r, isMobile: o2, isInjectedInstalled: l } = s.getCachedRouterWalletPlatforms();
  e2 ? l ? b$1.push("InjectedConnecting") : o2 ? b$1.push("MobileConnecting") : r ? b$1.push("WebConnecting") : b$1.push("InstallWallet") : l ? b$1.push("InjectedConnecting") : a ? b$1.push("DesktopConnecting") : r ? b$1.push("WebConnecting") : o2 ? b$1.push("MobileQrcodeConnecting") : b$1.push("InstallWallet");
} }, Wo = i$1`.w3m-router{overflow:hidden;will-change:transform}.w3m-content{display:flex;flex-direction:column}`;
var Ao = Object.defineProperty, jo = Object.getOwnPropertyDescriptor, Xt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? jo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ao(e2, a, o2), o2;
};
let ft = class extends s$1 {
  constructor() {
    super(), this.view = b$1.state.view, this.prevView = b$1.state.view, this.unsubscribe = void 0, this.oldHeight = "0px", this.resizeObserver = void 0, this.unsubscribe = b$1.subscribe((t2) => {
      this.view !== t2.view && this.onChangeRoute();
    });
  }
  firstUpdated() {
    this.resizeObserver = new ResizeObserver(([t2]) => {
      const e2 = `${t2.contentRect.height}px`;
      this.oldHeight !== "0px" && animate(this.routerEl, { height: [this.oldHeight, e2] }, { duration: 0.2 }), this.oldHeight = e2;
    }), this.resizeObserver.observe(this.contentEl);
  }
  disconnectedCallback() {
    var t2, e2;
    (t2 = this.unsubscribe) == null || t2.call(this), (e2 = this.resizeObserver) == null || e2.disconnect();
  }
  get routerEl() {
    return s.getShadowRootElement(this, ".w3m-router");
  }
  get contentEl() {
    return s.getShadowRootElement(this, ".w3m-content");
  }
  viewTemplate() {
    switch (this.view) {
      case "ConnectWallet":
        return x`<w3m-connect-wallet-view></w3m-connect-wallet-view>`;
      case "SelectNetwork":
        return x`<w3m-select-network-view></w3m-select-network-view>`;
      case "InjectedConnecting":
        return x`<w3m-injected-connecting-view></w3m-injected-connecting-view>`;
      case "DesktopConnecting":
        return x`<w3m-desktop-connecting-view></w3m-desktop-connecting-view>`;
      case "MobileConnecting":
        return x`<w3m-mobile-connecting-view></w3m-mobile-connecting-view>`;
      case "WebConnecting":
        return x`<w3m-web-connecting-view></w3m-web-connecting-view>`;
      case "MobileQrcodeConnecting":
        return x`<w3m-mobile-qr-connecting-view></w3m-mobile-qr-connecting-view>`;
      case "GetWallet":
        return x`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "WalletExplorer":
        return x`<w3m-wallet-explorer-view></w3m-wallet-explorer-view>`;
      case "Qrcode":
        return x`<w3m-qrcode-view></w3m-qrcode-view>`;
      case "Help":
        return x`<w3m-help-view></w3m-help-view>`;
      case "Account":
        return x`<w3m-account-view></w3m-account-view>`;
      case "SwitchNetwork":
        return x`<w3m-switch-network-view></w3m-switch-network-view>`;
      case "InstallWallet":
        return x`<w3m-install-wallet-view></w3m-install-wallet-view>`;
      default:
        return x`<div>Not Found</div>`;
    }
  }
  async onChangeRoute() {
    await animate(this.routerEl, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.15, delay: 0.1 }).finished, this.view = b$1.state.view, animate(this.routerEl, { opacity: [0, 1], scale: [0.99, 1] }, { duration: 0.37, delay: 0.05 });
  }
  render() {
    return x`<div class="w3m-router"><div class="w3m-content">${this.viewTemplate()}</div></div>`;
  }
};
ft.styles = [w.globalCss, Wo], Xt([t$1()], ft.prototype, "view", 2), Xt([t$1()], ft.prototype, "prevView", 2), ft = Xt([e$1("w3m-modal-router")], ft);
const Mo = i$1`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--w3m-notification-border-radius);border:1px solid var(--w3m-color-overlay);background-color:var(--w3m-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--w3m-color-bg-3)}}.w3m-success path{fill:var(--w3m-accent-color)}.w3m-error path{fill:var(--w3m-error-color)}`;
var Po = Object.defineProperty, To = Object.getOwnPropertyDescriptor, Ee = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? To(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Po(e2, a, o2), o2;
};
let Tt = class extends s$1 {
  constructor() {
    super(), this.open = false, this.unsubscribe = void 0, this.timeout = void 0, this.unsubscribe = oe$1.subscribe((t2) => {
      t2.open ? (this.open = true, this.timeout = setTimeout(() => oe$1.closeToast(), 2200)) : (this.open = false, clearTimeout(this.timeout));
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribe) == null || t2.call(this), clearTimeout(this.timeout), oe$1.closeToast();
  }
  render() {
    const { message: t2, variant: e2 } = oe$1.state, a = { "w3m-success": e2 === "success", "w3m-error": e2 === "error" };
    return this.open ? x`<div class="${o(a)}">${e2 === "success" ? h.CHECKMARK_ICON : null} ${e2 === "error" ? h.CROSS_ICON : null}<w3m-text variant="small-regular">${t2}</w3m-text></div>` : null;
  }
};
Tt.styles = [w.globalCss, Mo], Ee([t$1()], Tt.prototype, "open", 2), Tt = Ee([e$1("w3m-modal-toast")], Tt);
const Lo = i$1`button{padding:5px;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;flex-direction:column;align-items:center;justify-content:center;width:80px;height:90px;position:relative}w3m-network-image{width:54px;height:59px}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;margin-top:5px}button:active{background-color:var(--w3m-color-overlay)}.w3m-unsupported{opacity:.3}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}`;
var _o = Object.defineProperty, No = Object.getOwnPropertyDescriptor, xt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? No(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && _o(e2, a, o2), o2;
};
let Q = class extends s$1 {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.chainId = "", this.unsupported = false;
  }
  render() {
    const t2 = { "w3m-unsupported": this.unsupported };
    return x`<button @click="${this.onClick}" class="${o(t2)}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular">${this.name}</w3m-text></button>`;
  }
};
Q.styles = [w.globalCss, Lo], xt([n()], Q.prototype, "onClick", 2), xt([n()], Q.prototype, "name", 2), xt([n()], Q.prototype, "chainId", 2), xt([n()], Q.prototype, "unsupported", 2), Q = xt([e$1("w3m-network-button")], Q);
const Ro = i$1`@keyframes loading{to{stroke-dashoffset:0}}:host{width:inherit;height:inherit;position:relative}path{stroke:var(--w3m-color-overlay)}svg{width:100%;height:100%;margin:0}#network-placeholder-fill{fill:var(--w3m-color-bg-3)}#network-placeholder-dash{stroke:var(--w3m-color-overlay)}image{clip-path:path('M17.033 4.964c3.852-2.262 5.778-3.393 7.84-3.77a11.807 11.807 0 0 1 4.254 0c2.062.377 3.988 1.508 7.84 3.77l6.066 3.562c3.852 2.263 5.777 3.394 7.13 5.022a12.268 12.268 0 0 1 2.127 3.747c.71 2.006.71 4.268.71 8.793v7.124c0 4.525 0 6.787-.71 8.793a12.268 12.268 0 0 1-2.126 3.747c-1.354 1.628-3.28 2.76-7.131 5.022l-6.066 3.562c-3.852 2.262-5.778 3.393-7.84 3.771a11.814 11.814 0 0 1-4.254 0c-2.062-.378-3.988-1.509-7.84-3.77l-6.066-3.563c-3.852-2.263-5.778-3.394-7.13-5.022a12.268 12.268 0 0 1-2.127-3.747C1 40 1 37.737 1 33.212v-7.124c0-4.525 0-6.787.71-8.793a12.268 12.268 0 0 1 2.127-3.747c1.352-1.628 3.278-2.76 7.13-5.022l6.066-3.562Z')}`;
var Do = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, We = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Zo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Do(e2, a, o2), o2;
};
let Lt = class extends s$1 {
  constructor() {
    super(...arguments), this.chainId = "";
  }
  render() {
    const t2 = s.getChainIcon(this.chainId);
    return t2 ? x`<svg width="54" height="59" viewBox="0 0 54 59" fill="none"><image href="${t2}"/><image href="${t2}" width="54" height="59"/><path d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/></svg>` : x`${h.NETWORK_PLACEHOLDER}`;
  }
};
Lt.styles = [w.globalCss, Ro], We([n()], Lt.prototype, "chainId", 2), Lt = We([e$1("w3m-network-image")], Lt);
const Ho = 0.1, Ae = 2.5, U = 7;
function Jt(t2, e2, a) {
  return t2 === e2 ? false : (t2 - e2 < 0 ? e2 - t2 : t2 - e2) <= a + Ho;
}
function So(t2, e2) {
  const a = Array.prototype.slice.call(browser.create(t2, { errorCorrectionLevel: e2 }).modules.data, 0), r = Math.sqrt(a.length);
  return a.reduce((o2, l, i2) => (i2 % r === 0 ? o2.push([l]) : o2[o2.length - 1].push(l)) && o2, []);
}
const Bo = { generate(t2, e2, a, r) {
  const o2 = r === "light" ? "#141414" : "#fff", l = r === "light" ? "#fff" : "#141414", i2 = [], p = So(t2, "Q"), g = e2 / p.length, f = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
  f.forEach(({ x: W, y: k }) => {
    const N = (p.length - U) * g * W, I = (p.length - U) * g * k, D = 0.32;
    for (let S = 0; S < f.length; S += 1) {
      const lt = g * (U - S * 2);
      i2.push(b`<rect fill="${S % 2 === 0 ? o2 : l}" height="${lt}" rx="${lt * D}" ry="${lt * D}" width="${lt}" x="${N + g * S}" y="${I + g * S}">`);
    }
  });
  const j = Math.floor((a + 25) / g), $ = p.length / 2 - j / 2, _2 = p.length / 2 + j / 2 - 1, Ce = [];
  p.forEach((W, k) => {
    W.forEach((N, I) => {
      if (p[k][I] && !(k < U && I < U || k > p.length - (U + 1) && I < U || k < U && I > p.length - (U + 1)) && !(k > $ && k < _2 && I > $ && I < _2)) {
        const D = k * g + g / 2, S = I * g + g / 2;
        Ce.push([D, S]);
      }
    });
  });
  const ut = {};
  return Ce.forEach(([W, k]) => {
    ut[W] ? ut[W].push(k) : ut[W] = [k];
  }), Object.entries(ut).map(([W, k]) => {
    const N = k.filter((I) => k.every((D) => !Jt(I, D, g)));
    return [Number(W), N];
  }).forEach(([W, k]) => {
    k.forEach((N) => {
      i2.push(b`<circle cx="${W}" cy="${N}" fill="${o2}" r="${g / Ae}">`);
    });
  }), Object.entries(ut).filter(([W, k]) => k.length > 1).map(([W, k]) => {
    const N = k.filter((I) => k.some((D) => Jt(I, D, g)));
    return [Number(W), N];
  }).map(([W, k]) => {
    k.sort((I, D) => I < D ? -1 : 1);
    const N = [];
    for (const I of k) {
      const D = N.find((S) => S.some((lt) => Jt(I, lt, g)));
      D ? D.push(I) : N.push([I]);
    }
    return [W, N.map((I) => [I[0], I[I.length - 1]])];
  }).forEach(([W, k]) => {
    k.forEach(([N, I]) => {
      i2.push(b`<line x1="${W}" x2="${W}" y1="${N}" y2="${I}" stroke="${o2}" stroke-width="${g / (Ae / 2)}" stroke-linecap="round">`);
    });
  }), i2;
} }, Uo = i$1`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;width:100%;aspect-ratio:1/1;animation:fadeIn ease .2s}svg:first-child,w3m-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{transform:translateY(-50%) translateX(-50%)}w3m-wallet-image{width:25%;height:25%;border-radius:var(--w3m-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--w3m-accent-color)}svg:first-child path:last-child{stroke:var(--w3m-color-overlay)}`;
var Vo = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, st = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? zo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Vo(e2, a, o2), o2;
};
let G = class extends s$1 {
  constructor() {
    super(...arguments), this.uri = "", this.size = 0, this.imageId = void 0, this.walletId = void 0, this.imageUrl = void 0;
  }
  svgTemplate() {
    var t2;
    const e2 = (t2 = ae$1.state.themeMode) != null ? t2 : "light";
    return b`<svg height="${this.size}" width="${this.size}">${Bo.generate(this.uri, this.size, this.size / 4, e2)}</svg>`;
  }
  render() {
    return x`<div>${this.walletId || this.imageUrl ? x`<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}" imageUrl="${this.imageUrl}"></w3m-wallet-image>` : h.WALLET_CONNECT_ICON_COLORED} ${this.svgTemplate()}<w3m-theme-context></w3m-theme-context></div>`;
  }
};
G.styles = [w.globalCss, Uo], st([n()], G.prototype, "uri", 2), st([n({ type: Number })], G.prototype, "size", 2), st([n()], G.prototype, "imageId", 2), st([n()], G.prototype, "walletId", 2), st([n()], G.prototype, "imageUrl", 2), G = st([e$1("w3m-qrcode")], G);
const Go = i$1`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--w3m-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:var(--w3m-color-fg-1);background-color:var(--w3m-color-bg-3);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);caret-color:var(--w3m-accent-color)}input::placeholder{color:var(--w3m-color-fg-2)}svg{left:10px;top:4px;pointer-events:none;position:absolute;width:20px;height:20px}input:focus-within{box-shadow:inset 0 0 0 1px var(--w3m-accent-color)}path{fill:var(--w3m-color-fg-2)}`;
var Fo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, je = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? qo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Fo(e2, a, o2), o2;
};
let _t = class extends s$1 {
  constructor() {
    super(...arguments), this.onChange = () => null;
  }
  render() {
    return x`<input type="text" @input="${this.onChange}" placeholder="Search wallets"> ${h.SEARCH_ICON}`;
  }
};
_t.styles = [w.globalCss, Go], je([n()], _t.prototype, "onChange", 2), _t = je([e$1("w3m-search-input")], _t);
const Ko = i$1`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--w3m-accent-color)}`;
var Yo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, Xo = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Qo(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Yo(e2, a, o2), o2;
};
let te = class extends s$1 {
  render() {
    return x`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
  }
};
te.styles = [w.globalCss, Ko], te = Xo([e$1("w3m-spinner")], te);
const Jo = i$1`span{font-style:normal;font-family:var(--w3m-font-family);font-feature-settings:'tnum' on,'lnum' on,'case' on}.w3m-xsmall-bold{font-family:var(--w3m-text-xsmall-bold-font-family);font-weight:var(--w3m-text-xsmall-bold-weight);font-size:var(--w3m-text-xsmall-bold-size);line-height:var(--w3m-text-xsmall-bold-line-height);letter-spacing:var(--w3m-text-xsmall-bold-letter-spacing);text-transform:var(--w3m-text-xsmall-bold-text-transform)}.w3m-xsmall-regular{font-family:var(--w3m-text-xsmall-regular-font-family);font-weight:var(--w3m-text-xsmall-regular-weight);font-size:var(--w3m-text-xsmall-regular-size);line-height:var(--w3m-text-xsmall-regular-line-height);letter-spacing:var(--w3m-text-xsmall-regular-letter-spacing);text-transform:var(--w3m-text-xsmall-regular-text-transform)}.w3m-small-thin{font-family:var(--w3m-text-small-thin-font-family);font-weight:var(--w3m-text-small-thin-weight);font-size:var(--w3m-text-small-thin-size);line-height:var(--w3m-text-small-thin-line-height);letter-spacing:var(--w3m-text-small-thin-letter-spacing);text-transform:var(--w3m-text-small-thin-text-transform)}.w3m-small-regular{font-family:var(--w3m-text-small-regular-font-family);font-weight:var(--w3m-text-small-regular-weight);font-size:var(--w3m-text-small-regular-size);line-height:var(--w3m-text-small-regular-line-height);letter-spacing:var(--w3m-text-small-regular-letter-spacing);text-transform:var(--w3m-text-small-regular-text-transform)}.w3m-medium-regular{font-family:var(--w3m-text-medium-regular-font-family);font-weight:var(--w3m-text-medium-regular-weight);font-size:var(--w3m-text-medium-regular-size);line-height:var(--w3m-text-medium-regular-line-height);letter-spacing:var(--w3m-text-medium-regular-letter-spacing);text-transform:var(--w3m-text-medium-regular-text-transform)}.w3m-big-bold{font-family:var(--w3m-text-big-bold-font-family);font-weight:var(--w3m-text-big-bold-weight);font-size:var(--w3m-text-big-bold-size);line-height:var(--w3m-text-big-bold-line-height);letter-spacing:var(--w3m-text-big-bold-letter-spacing);text-transform:var(--w3m-text-big-bold-text-transform)}:host(*){color:var(--w3m-color-fg-1)}.w3m-color-primary{color:var(--w3m-color-fg-1)}.w3m-color-secondary{color:var(--w3m-color-fg-2)}.w3m-color-tertiary{color:var(--w3m-color-fg-3)}.w3m-color-inverse{color:var(--w3m-accent-fill-color)}.w3m-color-accnt{color:var(--w3m-accent-color)}.w3m-color-error{color:var(--w3m-error-color)}`;
var ta = Object.defineProperty, ea = Object.getOwnPropertyDescriptor, ee = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ea(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ta(e2, a, o2), o2;
};
let yt = class extends s$1 {
  constructor() {
    super(...arguments), this.variant = "medium-regular", this.color = "primary";
  }
  render() {
    const t2 = { "w3m-big-bold": this.variant === "big-bold", "w3m-medium-regular": this.variant === "medium-regular", "w3m-small-regular": this.variant === "small-regular", "w3m-small-thin": this.variant === "small-thin", "w3m-xsmall-regular": this.variant === "xsmall-regular", "w3m-xsmall-bold": this.variant === "xsmall-bold", "w3m-color-primary": this.color === "primary", "w3m-color-secondary": this.color === "secondary", "w3m-color-tertiary": this.color === "tertiary", "w3m-color-inverse": this.color === "inverse", "w3m-color-accnt": this.color === "accent", "w3m-color-error": this.color === "error" };
    return x`<span><slot class="${o(t2)}"></slot></span>`;
  }
};
yt.styles = [w.globalCss, Jo], ee([n()], yt.prototype, "variant", 2), ee([n()], yt.prototype, "color", 2), yt = ee([e$1("w3m-text")], yt);
const oa = i$1`div{overflow:hidden;position:relative;border-radius:50%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:50%;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}svg{width:100%;height:100%}#token-placeholder-fill{fill:var(--w3m-color-bg-3)}#token-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var aa = Object.defineProperty, ra = Object.getOwnPropertyDescriptor, Me = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ra(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && aa(e2, a, o2), o2;
};
let Nt = class extends s$1 {
  constructor() {
    super(...arguments), this.symbol = void 0;
  }
  render() {
    var t2;
    const e2 = s.getTokenIcon((t2 = this.symbol) != null ? t2 : "");
    return e2 ? x`<div><img src="${e2}" alt="${this.id}"></div>` : h.TOKEN_PLACEHOLDER;
  }
};
Nt.styles = [w.globalCss, oa], Me([n()], Nt.prototype, "symbol", 2), Nt = Me([e$1("w3m-token-image")], Nt);
const la = i$1`button{width:100%;height:100%;border-radius:var(--w3m-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}w3m-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}w3m-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--w3m-wallet-icon-border-radius);margin-bottom:5px}.w3m-sublabel{margin-top:2px}`;
var ia = Object.defineProperty, na = Object.getOwnPropertyDescriptor, F = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? na(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ia(e2, a, o2), o2;
};
let B = class extends s$1 {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.walletId = "", this.label = void 0, this.imageId = void 0, this.installed = false, this.recent = false;
  }
  sublabelTemplate() {
    return this.recent ? x`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">RECENT</w3m-text>` : this.installed ? x`<w3m-text class="w3m-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</w3m-text>` : null;
  }
  handleClick() {
    H.click({ name: "WALLET_BUTTON", walletId: this.walletId }), this.onClick();
  }
  render() {
    var t2;
    return x`<button @click="${this.handleClick.bind(this)}"><div><w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image><w3m-text variant="xsmall-regular">${(t2 = this.label) != null ? t2 : s.getWalletName(this.name, true)}</w3m-text>${this.sublabelTemplate()}</div></button>`;
  }
};
B.styles = [w.globalCss, la], F([n()], B.prototype, "onClick", 2), F([n()], B.prototype, "name", 2), F([n()], B.prototype, "walletId", 2), F([n()], B.prototype, "label", 2), F([n()], B.prototype, "imageId", 2), F([n()], B.prototype, "installed", 2), F([n()], B.prototype, "recent", 2), B = F([e$1("w3m-wallet-button")], B);
const sa = i$1`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--w3m-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--w3m-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var ca = Object.defineProperty, da = Object.getOwnPropertyDescriptor, Rt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? da(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ca(e2, a, o2), o2;
};
let ct = class extends s$1 {
  constructor() {
    super(...arguments), this.walletId = "", this.imageId = void 0, this.imageUrl = void 0;
  }
  render() {
    var t2;
    const e2 = (t2 = this.imageUrl) != null && t2.length ? this.imageUrl : s.getWalletIcon({ id: this.walletId, image_id: this.imageId });
    return x`${e2.length ? x`<div><img src="${e2}" alt="${this.id}"></div>` : h.WALLET_PLACEHOLDER}`;
  }
};
ct.styles = [w.globalCss, sa], Rt([n()], ct.prototype, "walletId", 2), Rt([n()], ct.prototype, "imageId", 2), Rt([n()], ct.prototype, "imageUrl", 2), ct = Rt([e$1("w3m-wallet-image")], ct);
var ma = Object.defineProperty, ha = Object.getOwnPropertyDescriptor, pa = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ha(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ma(e2, a, o2), o2;
};
let Pe = class extends s$1 {
  constructor() {
    super(), this.unwatchAccount = void 0, K.getAccount(), this.fetchProfile(), this.fetchBalance(), this.unwatchAccount = C.client().watchAccount((t2) => {
      const { address: e2, isConnected: a } = K.state;
      t2.isConnected && t2.address !== e2 && (this.fetchProfile(t2.address), this.fetchBalance(t2.address), K.setAddress(t2.address)), t2.isConnected || K.resetAccount(), a !== t2.isConnected && se$1.close(), !a && t2.isConnected ? H.track({ name: "ACCOUNT_CONNECTED" }) : a && !t2.isConnected && H.track({ name: "ACCOUNT_DISCONNECTED" }), K.setIsConnected(t2.isConnected);
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchAccount) == null || t2.call(this);
  }
  async fetchProfile(t2) {
    var e2;
    const a = (e2 = d.state.chains) == null ? void 0 : e2.find((r) => r.id === 1);
    if (y.state.enableAccountView && a)
      try {
        await K.fetchProfile(s.preloadImage, t2);
      } catch (r) {
        console.error(r), oe$1.openToast(s.getErrorMessage(r), "error");
      }
  }
  async fetchBalance(t2) {
    if (y.state.enableAccountView)
      try {
        await K.fetchBalance(t2);
      } catch (e2) {
        console.error(e2), oe$1.openToast(s.getErrorMessage(e2), "error");
      }
  }
};
Pe = pa([e$1("w3m-account-context")], Pe);
var wa = Object.defineProperty, ga = Object.getOwnPropertyDescriptor, Te = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ga(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && wa(e2, a, o2), o2;
};
let oe = class extends s$1 {
  constructor() {
    super(), this.preload = true, this.preloadData();
  }
  async loadImages(t2) {
    try {
      t2 != null && t2.length && await Promise.all(t2.map(async (e2) => s.preloadImage(e2)));
    } catch {
      console.info("Unsuccessful attempt at preloading some images", t2);
    }
  }
  async preloadListings() {
    var t2;
    if (y.state.enableExplorer) {
      const { chains: e2 } = d.state;
      await Promise.all([ne$1.getRecomendedWallets(), ne$1.getInjectedWallets()]), d.setIsDataLoaded(true);
      const { recomendedWallets: a } = ne$1.state, r = Z.installedInjectedWallets(), o2 = (t2 = e2?.map((p) => s.getChainIcon(p.id))) != null ? t2 : [], l = a.map((p) => s.getWalletIcon(p)), i2 = r.map((p) => s.getWalletIcon(p));
      await this.loadImages([...o2, ...l, ...i2]);
    } else
      d.setIsDataLoaded(true);
  }
  async preloadCustomImages() {
    const t2 = s.getCustomImageUrls();
    await this.loadImages(t2);
  }
  async preloadData() {
    try {
      this.preload && (this.preload = false, await Promise.all([this.preloadListings(), this.preloadCustomImages()]));
    } catch (t2) {
      console.error(t2), oe$1.openToast("Failed preloading", "error");
    }
  }
};
Te([t$1()], oe.prototype, "preload", 2), oe = Te([e$1("w3m-explorer-context")], oe);
var ua = Object.defineProperty, va = Object.getOwnPropertyDescriptor, Le = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? va(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ua(e2, a, o2), o2;
};
let ae = class extends s$1 {
  constructor() {
    super(), this.activeChainId = void 0, this.unwatchNetwork = void 0;
    const t2 = d.getSelectedChain();
    this.activeChainId = t2?.id, this.unwatchNetwork = C.client().watchNetwork((e2) => {
      const a = e2.chain;
      a && this.activeChainId !== a.id && (d.setSelectedChain(a), this.activeChainId = a.id, K.resetBalance(), this.fetchBalance());
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchNetwork) == null || t2.call(this);
  }
  async fetchBalance() {
    if (y.state.enableAccountView)
      try {
        await K.fetchBalance();
      } catch (t2) {
        console.error(t2), oe$1.openToast(s.getErrorMessage(t2), "error");
      }
  }
};
Le([t$1()], ae.prototype, "activeChainId", 2), ae = Le([e$1("w3m-network-context")], ae);
var ba = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, xa = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? fa(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ba(e2, a, o2), o2;
};
let _e = class extends s$1 {
  constructor() {
    super(), this.unsubscribeTheme = void 0, w.setTheme(), this.unsubscribeTheme = ae$1.subscribe(w.setTheme), this.preloadThemeImages();
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeTheme) == null || t2.call(this);
  }
  async preloadThemeImages() {
    try {
      const { themeVariables: t2 } = ae$1.state, e2 = [t2?.["--w3m-background-image-url"], t2?.["--w3m-logo-image-url"]].filter(Boolean);
      e2.length && await Promise.all(e2.map(async (a) => s.preloadImage(a)));
    } catch {
      console.info("Unsuccessful attempt at preloading some images");
    }
  }
};
_e = xa([e$1("w3m-theme-context")], _e);
var ya = Object.defineProperty, Ca = Object.getOwnPropertyDescriptor, $a = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Ca(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ya(e2, a, o2), o2;
};
const ka = 24e4, Oa = 1e3;
var Ne;
let Re = class extends s$1 {
  constructor() {
    super(), this.unwatchOptions = void 0, this.unwatchAccount = void 0, this.timeout = void 0, this.isGenerated = false, this.selectedChainId = (Ne = d.state.selectedChain) == null ? void 0 : Ne.id, this.isAccountConnected = K.state.isConnected, this.lastRetry = Date.now(), this.unwatchOptions = d.subscribe((t2) => {
      var e2, a;
      ((e2 = t2.selectedChain) == null ? void 0 : e2.id) !== this.selectedChainId && (this.selectedChainId = (a = t2.selectedChain) == null ? void 0 : a.id, this.connectAndWait());
    }), this.unwatchAccount = K.subscribe((t2) => {
      (this.isAccountConnected !== t2.isConnected || !this.isGenerated) && (this.isAccountConnected = t2.isConnected, setTimeout(this.connectAndWait.bind(this), 0));
    });
  }
  disconnectedCallback() {
    var t2, e2;
    (t2 = this.unwatchOptions) == null || t2.call(this), (e2 = this.unwatchAccount) == null || e2.call(this);
  }
  async connectAndWait() {
    if (clearTimeout(this.timeout), !this.isAccountConnected) {
      this.isGenerated = true, this.timeout = setTimeout(this.connectAndWait.bind(this), ka);
      try {
        const { standaloneUri: t2, selectedChain: e2 } = d.state;
        t2 ? _.setPairingUri(t2) : await C.client().connectWalletConnect((a) => _.setPairingUri(a), e2?.id);
      } catch (t2) {
        console.error(t2), _.setPairingError(true), oe$1.openToast("Connection request declined", "error"), Date.now() - this.lastRetry >= Oa && (this.lastRetry = Date.now(), this.connectAndWait());
      }
    }
  }
};
Re = $a([e$1("w3m-wc-connection-context")], Re);
const Ia = i$1`:host{all:initial}div{display:flex;align-items:center;background-color:var(--w3m-color-overlay);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);border-radius:var(--w3m-button-border-radius);padding:4px 4px 4px 8px}div button{border-radius:var(--w3m-secondary-button-border-radius);padding:4px 8px;padding-left:4px;height:auto;margin-left:10px;color:var(--w3m-accent-fill-color);background-color:var(--w3m-accent-color)}.w3m-no-avatar{padding-left:8px}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--w3m-color-overlay)}button:hover::after{background-color:var(--w3m-color-overlay)}w3m-avatar{margin-right:6px}w3m-button-big w3m-avatar{margin-left:-5px}`;
var Ea = Object.defineProperty, Wa = Object.getOwnPropertyDescriptor, re = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Wa(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ea(e2, a, o2), o2;
};
let Ct = class extends s$1 {
  constructor() {
    super(), this.balance = "hide", this.avatar = "show", s.rejectStandaloneButtonComponent();
  }
  onOpen() {
    const { isStandalone: t2 } = d.state;
    t2 || (H.click({ name: "ACCOUNT_BUTTON" }), se$1.open({ route: "Account" }));
  }
  accountTemplate() {
    const t2 = this.avatar === "show";
    return x`${t2 ? x`<w3m-avatar></w3m-avatar>` : null}<w3m-address-text></w3m-address-text>`;
  }
  render() {
    const t2 = this.balance === "show", e2 = { "w3m-no-avatar": this.avatar === "hide" };
    return t2 ? x`<div><w3m-balance></w3m-balance><button @click="${this.onOpen}" class="${o(e2)}">${this.accountTemplate()}</button></div>` : x`<w3m-button-big @click="${this.onOpen}">${this.accountTemplate()}</w3m-button-big>`;
  }
};
Ct.styles = [w.globalCss, Ia], re([n()], Ct.prototype, "balance", 2), re([n()], Ct.prototype, "avatar", 2), Ct = re([e$1("w3m-account-button")], Ct);
const Aa = i$1`button{display:flex;border-radius:var(--w3m-button-hover-highlight-border-radius);flex-direction:column;justify-content:center;padding:5px;width:100px}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}button:disabled{pointer-events:none}w3m-network-image{width:32px;height:32px}w3m-text{margin-top:4px}`;
var ja = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, le = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Ma(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ja(e2, a, o2), o2;
};
let $t = class extends s$1 {
  constructor() {
    super(), this.chainId = 0, this.label = "", this.unsubscribeNetwork = void 0;
    const { selectedChain: t2 } = d.state;
    this.chainId = t2?.id, this.label = t2?.name, this.unsubscribeNetwork = d.subscribe(({ selectedChain: e2 }) => {
      this.chainId = e2?.id, this.label = e2?.name;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeNetwork) == null || t2.call(this);
  }
  onClick() {
    b$1.push("SelectNetwork");
  }
  render() {
    const { chains: t2, selectedChain: e2 } = d.state, a = t2?.map((l) => l.id), r = e2 && a?.includes(e2.id), o2 = t2 && t2.length <= 1 && r;
    return x`<button @click="${this.onClick}" ?disabled="${o2}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="xsmall-regular" color="accent">${this.label}</w3m-text></button>`;
  }
};
$t.styles = [w.globalCss, Aa], le([t$1()], $t.prototype, "chainId", 2), le([t$1()], $t.prototype, "label", 2), $t = le([e$1("w3m-account-network-button")], $t);
const Pa = i$1`@keyframes slide{0%{background-position:0 0}100%{background-position:200px 0}}w3m-text{padding:1px 0}.w3m-loading{background:linear-gradient(270deg,var(--w3m-color-fg-1) 36.33%,var(--w3m-color-fg-3) 42.07%,var(--w3m-color-fg-1) 83.3%);background-size:200px 100%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation-name:slide;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear}`;
var Ta = Object.defineProperty, La = Object.getOwnPropertyDescriptor, kt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? La(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ta(e2, a, o2), o2;
};
let X = class extends s$1 {
  constructor() {
    super(), this.address = void 0, this.name = void 0, this.loading = true, this.variant = "button", this.unsubscribeAccount = void 0, this.address = K.state.address, this.name = K.state.profileName, this.loading = !!K.state.profileLoading, this.unsubscribeAccount = K.subscribe(({ address: t2, profileName: e2, profileLoading: a }) => {
      this.address = t2, this.name = e2, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeAccount) == null || t2.call(this);
  }
  render() {
    var t2;
    const e2 = this.variant === "button", a = { "w3m-loading": this.loading };
    return x`<w3m-text class="${o(a)}" variant="${e2 ? "medium-regular" : "big-bold"}" color="${e2 ? "inverse" : "primary"}">${this.name ? this.name : s.truncate((t2 = this.address) != null ? t2 : "")}</w3m-text>`;
  }
};
X.styles = [w.globalCss, Pa], kt([t$1()], X.prototype, "address", 2), kt([t$1()], X.prototype, "name", 2), kt([t$1()], X.prototype, "loading", 2), kt([n()], X.prototype, "variant", 2), X = kt([e$1("w3m-address-text")], X);
const P = { onConnecting(t2) {
  s.goToConnectingView(t2);
}, onExternal(t2) {
  s.handleConnectorConnection(t2);
}, manualWalletsTemplate() {
  return Z.manualWallets().map((t2) => x`<w3m-wallet-button walletId="${t2.id}" name="${t2.name}" .onClick="${() => this.onConnecting(t2)}"></w3m-wallet-button>`);
}, recomendedWalletsTemplate(t2 = false) {
  return Z.recomendedWallets(t2).map((e2) => x`<w3m-wallet-button walletId="${e2.id}" imageId="${e2.image_id}" name="${e2.name}" .onClick="${() => this.onConnecting(e2)}"></w3m-wallet-button>`);
}, externalWalletsTemplate() {
  return Z.externalWallets().map((t2) => x`<w3m-wallet-button name="${t2.name}" walletId="${t2.id}" .onClick="${() => this.onExternal(t2.id)}"></w3m-wallet-button>`);
}, recentWalletTemplate() {
  const t2 = Z.recentWallet();
  if (t2)
    return x`<w3m-wallet-button name="${t2.name}" walletId="${t2.id}" imageId="${t2.image_id}" .recent="${true}" .onClick="${() => this.onConnecting(t2)}"></w3m-wallet-button>`;
}, installedInjectedWalletsTemplate() {
  return Z.installedInjectedWallets().map((t2) => x`<w3m-wallet-button .installed="${true}" name="${t2.name}" walletId="${t2.id}" imageId="${t2.image_id}" .onClick="${() => this.onConnecting(t2)}"></w3m-wallet-button>`);
}, injectedWalletsTemplate() {
  return Z.injectedWallets().map((t2) => x`<w3m-wallet-button name="${t2.name}" walletId="${t2.id}" imageId="${t2.image_id}" .onClick="${() => this.onConnecting(t2)}"></w3m-wallet-button>`);
} }, _a = i$1`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.w3m-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.w3m-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.w3m-track svg{margin:0 5px}w3m-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--w3m-wallet-icon-border-radius)}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-title{display:flex;align-items:center;margin-bottom:10px}.w3m-title svg{margin-right:6px}.w3m-title path{fill:var(--w3m-accent-color)}w3m-modal-footer .w3m-title{padding:0 10px}w3m-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--w3m-color-bg-1))}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var Na = Object.defineProperty, Ra = Object.getOwnPropertyDescriptor, Da = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Ra(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Na(e2, a, o2), o2;
};
let ie = class extends s$1 {
  onGoToQrcode() {
    b$1.push("Qrcode");
  }
  onGetWallet() {
    b$1.push("GetWallet");
  }
  render() {
    const { recomendedWallets: t2 } = ne$1.state, e2 = [...t2, ...t2], a = P.externalWalletsTemplate(), r = P.installedInjectedWalletsTemplate(), o2 = [...r, ...a].length > 0, l = c.RECOMMENDED_WALLET_AMOUNT * 2;
    return x`<w3m-modal-header title="Connect your wallet" .onAction="${this.onGoToQrcode}" .actionIcon="${h.QRCODE_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-title">${h.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">WalletConnect</w3m-text></div><div class="w3m-slider"><div class="w3m-track">${[...Array(l)].map((i2, p) => {
      const g = e2[p % e2.length];
      return g ? x`<w3m-wallet-image walletId="${g.id}" imageId="${g.image_id}"></w3m-wallet-image>` : h.WALLET_PLACEHOLDER;
    })}</div><w3m-button-big @click="${s.handleAndroidLinking}"><w3m-text variant="medium-regular" color="inverse">Select Wallet</w3m-text></w3m-button-big></div></w3m-modal-content>${o2 ? x`<w3m-modal-footer><div class="w3m-title">${h.WALLET_ICON}<w3m-text variant="small-regular" color="accent">Other</w3m-text></div><div class="w3m-grid">${r} ${a}</div></w3m-modal-footer>` : null}<w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Choose WalletConnect to see supported apps on your device${o2 ? ", or select from other options" : ""}`}</w3m-text><w3m-button variant="outline" .iconRight="${h.ARROW_UP_RIGHT_ICON}" .onClick="${() => this.onGetWallet()}">I don't have a wallet</w3m-button></w3m-info-footer>`;
  }
};
ie.styles = [w.globalCss, _a], ie = Da([e$1("w3m-android-wallet-selection")], ie);
const Za = i$1`@keyframes slide{0%{transform:translateX(-50px)}100%{transform:translateX(200px)}}.w3m-placeholder,img{border-radius:50%;box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);display:block;position:relative;overflow:hidden!important;background-color:var(--w3m-color-av-1);background-image:radial-gradient(at 66% 77%,var(--w3m-color-av-2) 0,transparent 50%),radial-gradient(at 29% 97%,var(--w3m-color-av-3) 0,transparent 50%),radial-gradient(at 99% 86%,var(--w3m-color-av-4) 0,transparent 50%),radial-gradient(at 29% 88%,var(--w3m-color-av-5) 0,transparent 50%);transform:translateZ(0)}.w3m-loader{width:50px;height:100%;background:linear-gradient(270deg,transparent 0,rgba(255,255,255,.4) 30%,transparent 100%);animation-name:slide;animation-duration:1.5s;transform:translateX(-50px);animation-iteration-count:infinite;animation-timing-function:linear;animation-delay:.55s}.w3m-small{width:24px;height:24px}.w3m-medium{width:60px;height:60px}`;
var Ha = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, Ot = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Sa(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ha(e2, a, o2), o2;
};
let J = class extends s$1 {
  constructor() {
    super(), this.address = void 0, this.avatar = void 0, this.loading = true, this.size = "small", this.unsubscribeAccount = void 0, this.address = K.state.address, this.avatar = K.state.profileAvatar, this.loading = !!K.state.profileLoading, this.unsubscribeAccount = K.subscribe(({ address: t2, profileAvatar: e2, profileLoading: a }) => {
      this.address = t2, this.avatar = e2, this.loading = !!a;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeAccount) == null || t2.call(this);
  }
  render() {
    const t2 = { "w3m-placeholder": true, "w3m-small": this.size === "small", "w3m-medium": this.size === "medium" };
    return this.avatar ? x`<img class="${o(t2)}" src="${this.avatar}">` : this.address ? (s.generateAvatarColors(this.address), x`<div class="${o(t2)}">${this.loading ? x`<div class="w3m-loader"></div>` : null}</div>`) : null;
  }
};
J.styles = [w.globalCss, Za], Ot([t$1()], J.prototype, "address", 2), Ot([t$1()], J.prototype, "avatar", 2), Ot([t$1()], J.prototype, "loading", 2), Ot([n()], J.prototype, "size", 2), J = Ot([e$1("w3m-avatar")], J);
const Ba = i$1`div{display:flex;align-items:center}w3m-token-image{width:28px;height:28px;margin-right:6px}`;
var Ua = Object.defineProperty, Va = Object.getOwnPropertyDescriptor, ne = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Va(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ua(e2, a, o2), o2;
};
let It = class extends s$1 {
  constructor() {
    var t2, e2;
    super(), this.symbol = void 0, this.amount = void 0, this.unsubscribeAccount = void 0, this.symbol = (t2 = K.state.balance) == null ? void 0 : t2.symbol, this.amount = (e2 = K.state.balance) == null ? void 0 : e2.amount, this.unsubscribeAccount = K.subscribe(({ balance: a }) => {
      this.symbol = a?.symbol, this.amount = a?.amount;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeAccount) == null || t2.call(this);
  }
  render() {
    let t2 = "_._";
    return this.amount === "0.0" ? t2 = "0" : typeof this.amount == "string" && this.amount.length > 6 ? t2 = this.amount.substring(0, 6) : typeof this.amount == "string" && (t2 = this.amount), x`<div><w3m-token-image symbol="${this.symbol}"></w3m-token-image><w3m-text variant="medium-regular" color="primary">${t2} ${this.symbol}</w3m-text></div>`;
  }
};
It.styles = [w.globalCss, Ba], ne([t$1()], It.prototype, "symbol", 2), ne([t$1()], It.prototype, "amount", 2), It = ne([e$1("w3m-balance")], It);
const za = i$1`:host{all:initial}svg{width:28px;height:20px;margin:-1px 3px 0 -5px}svg path{fill:var(--w3m-accent-fill-color)}button:disabled svg path{fill:var(--w3m-color-fg-3)}w3m-spinner{margin:0 10px 0 0}`;
var Ga = Object.defineProperty, Fa = Object.getOwnPropertyDescriptor, Dt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Fa(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ga(e2, a, o2), o2;
};
let dt = class extends s$1 {
  constructor() {
    super(), this.loading = false, this.label = "Connect Wallet", this.icon = "show", this.modalUnsub = void 0, s.rejectStandaloneButtonComponent(), this.modalUnsub = se$1.subscribe((t2) => {
      t2.open && (this.loading = true), t2.open || (this.loading = false);
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.modalUnsub) == null || t2.call(this);
  }
  iconTemplate() {
    return this.icon === "show" ? h.WALLET_CONNECT_ICON : null;
  }
  onClick() {
    K.state.isConnected ? this.onDisconnect() : this.onConnect();
  }
  async onConnect() {
    this.loading = true, H.click({ name: "CONNECT_BUTTON" }), await se$1.open(), se$1.state.open || (this.loading = false);
  }
  async onDisconnect() {
    H.click({ name: "DISCONNECT_BUTTON" }), await C.client().disconnect();
  }
  render() {
    return x`<w3m-button-big .disabled="${this.loading}" @click="${this.onClick}">${this.loading ? x`<w3m-spinner></w3m-spinner><w3m-text variant="medium-regular" color="accent">Connecting...</w3m-text>` : x`${this.iconTemplate()}<w3m-text variant="medium-regular" color="inverse">${this.label}</w3m-text>`}</w3m-button-big>`;
  }
};
dt.styles = [w.globalCss, za], Dt([t$1()], dt.prototype, "loading", 2), Dt([n()], dt.prototype, "label", 2), Dt([n()], dt.prototype, "icon", 2), dt = Dt([e$1("w3m-connect-button")], dt);
const qa = i$1`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:90px;height:90px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.w3m-stale svg,.w3m-stale use{display:none}`;
var Ka = Object.defineProperty, Ya = Object.getOwnPropertyDescriptor, mt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Ya(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Ka(e2, a, o2), o2;
};
let q = class extends s$1 {
  constructor() {
    super(...arguments), this.walletId = void 0, this.imageId = void 0, this.isError = false, this.isStale = false, this.label = "";
  }
  svgLoaderTemplate() {
    var t2, e2;
    const a = (e2 = (t2 = ae$1.state.themeVariables) == null ? void 0 : t2["--w3m-wallet-icon-large-border-radius"]) != null ? e2 : w.getPreset("--w3m-wallet-icon-large-border-radius");
    let r = 0;
    a.includes("%") ? r = 88 / 100 * parseInt(a, 10) : r = parseInt(a, 10), r *= 1.17;
    const o2 = 317 - r * 1.57, l = 425 - r * 1.8;
    return x`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="w3m-loader" x="2" y="2" width="106" height="106" rx="${r}"/><use xlink:href="#w3m-loader" stroke-dasharray="106 ${o2}" stroke-dashoffset="${l}"></use></svg>`;
  }
  render() {
    const t2 = { "w3m-error": this.isError, "w3m-stale": this.isStale };
    return x`<div class="${o(t2)}">${this.svgLoaderTemplate()}<w3m-wallet-image walletId="${this.walletId}" imageId="${this.imageId}"></w3m-wallet-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Connection declined" : this.label}</w3m-text>`;
  }
};
q.styles = [w.globalCss, qa], mt([n()], q.prototype, "walletId", 2), mt([n()], q.prototype, "imageId", 2), mt([n()], q.prototype, "isError", 2), mt([n()], q.prototype, "isStale", 2), mt([n()], q.prototype, "label", 2), q = mt([e$1("w3m-connector-waiting")], q);
var Qa = Object.defineProperty, Xa = Object.getOwnPropertyDescriptor, ht = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Xa(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Qa(e2, a, o2), o2;
};
let tt = class extends s$1 {
  constructor() {
    super(), this.isConnected = false, this.label = "Connect Wallet", this.icon = "show", this.avatar = "show", this.balance = "hide", this.unsubscribeAccount = void 0, s.rejectStandaloneButtonComponent(), this.isConnected = K.state.isConnected, this.unsubscribeAccount = K.subscribe(({ isConnected: t2 }) => {
      this.isConnected = t2;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeAccount) == null || t2.call(this);
  }
  render() {
    const { enableAccountView: t2 } = y.state, e2 = this.balance, a = this.label, r = this.icon, o2 = this.avatar;
    return this.isConnected && t2 ? x`<w3m-account-button balance="${e2}" avatar="${o2}"></w3m-account-button>` : x`<w3m-connect-button label="${this.isConnected ? "Disconnect" : a}" icon="${r}"></w3m-connect-button>`;
  }
};
ht([t$1()], tt.prototype, "isConnected", 2), ht([n()], tt.prototype, "label", 2), ht([n()], tt.prototype, "icon", 2), ht([n()], tt.prototype, "avatar", 2), ht([n()], tt.prototype, "balance", 2), tt = ht([e$1("w3m-core-button")], tt);
const Ja = i$1`.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.w3m-desktop-title,.w3m-mobile-title{display:flex;align-items:center}.w3m-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.w3m-desktop-title{margin-bottom:10px;padding:0 10px}.w3m-subtitle{display:flex;align-items:center}.w3m-subtitle:last-child path{fill:var(--w3m-color-fg-3)}.w3m-desktop-title svg,.w3m-mobile-title svg{margin-right:6px}.w3m-desktop-title path,.w3m-mobile-title path{fill:var(--w3m-accent-color)}`;
var tr = Object.defineProperty, er = Object.getOwnPropertyDescriptor, or = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? er(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && tr(e2, a, o2), o2;
};
let se = class extends s$1 {
  render() {
    const { isStandalone: t2 } = d.state, { explorerExcludedWalletIds: e2, enableExplorer: a } = y.state, r = e2 !== "ALL" && a, o2 = P.manualWalletsTemplate(), l = P.recomendedWalletsTemplate(), i2 = P.externalWalletsTemplate(), p = P.recentWalletTemplate(), g = P.installedInjectedWalletsTemplate();
    let f = [p, ...o2, ...l];
    t2 || (f = [...g, p, ...i2, ...o2, ...l]), f = f.filter(Boolean);
    const j = f.length > 4 || r;
    let $ = [];
    j ? $ = f.slice(0, 3) : $ = f;
    const _2 = !!$.length;
    return x`<w3m-modal-header .border="${true}" title="Connect your wallet" .onAction="${s.handleUriCopy}" .actionIcon="${h.COPY_ICON}"></w3m-modal-header><w3m-modal-content><div class="w3m-mobile-title"><div class="w3m-subtitle">${h.MOBILE_ICON}<w3m-text variant="small-regular" color="accent">Mobile</w3m-text></div><div class="w3m-subtitle">${h.SCAN_ICON}<w3m-text variant="small-regular" color="secondary">Scan with your wallet</w3m-text></div></div><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>${_2 ? x`<w3m-modal-footer><div class="w3m-desktop-title">${h.DESKTOP_ICON}<w3m-text variant="small-regular" color="accent">Desktop</w3m-text></div><div class="w3m-grid">${$} ${j ? x`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-footer>` : null}`;
  }
};
se.styles = [w.globalCss, Ja], se = or([e$1("w3m-desktop-wallet-selection")], se);
const ar = i$1`div{background-color:var(--w3m-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--w3m-color-bg-3);text-align:center}a{color:var(--w3m-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
var rr = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, ir = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? lr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && rr(e2, a, o2), o2;
};
let ce = class extends s$1 {
  render() {
    const { termsOfServiceUrl: t2, privacyPolicyUrl: e2 } = y.state;
    return t2 ?? e2 ? x`<div><w3m-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${t2 ? x`<a href="${t2}" target="_blank" rel="noopener noreferrer">Terms of Service</a>` : null} ${t2 && e2 ? "and" : null} ${e2 ? x`<a href="${e2}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>` : null}</w3m-text></div>` : null;
  }
};
ce.styles = [w.globalCss, ar], ce = ir([e$1("w3m-legal-notice")], ce);
const nr = i$1`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
var sr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, dr = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? cr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && sr(e2, a, o2), o2;
};
let de = class extends s$1 {
  onQrcode() {
    b$1.push("Qrcode");
  }
  render() {
    const { isStandalone: t2 } = d.state, { explorerExcludedWalletIds: e2, enableExplorer: a } = y.state, r = e2 !== "ALL" && a, o2 = P.manualWalletsTemplate(), l = P.recomendedWalletsTemplate(), i2 = P.externalWalletsTemplate(), p = P.recentWalletTemplate(), g = P.installedInjectedWalletsTemplate();
    let f = [p, ...o2, ...l];
    t2 || (f = [...g, p, ...i2, ...o2, ...l]), f = f.filter(Boolean);
    const j = f.length > 8 || r;
    let $ = [];
    j ? $ = f.slice(0, 7) : $ = f;
    const _2 = !!$.length;
    return x`<w3m-modal-header title="Connect your wallet" .onAction="${this.onQrcode}" .actionIcon="${h.QRCODE_ICON}"></w3m-modal-header>${_2 ? x`<w3m-modal-content><div>${$} ${j ? x`<w3m-view-all-wallets-button></w3m-view-all-wallets-button>` : null}</div></w3m-modal-content>` : null}`;
  }
};
de.styles = [w.globalCss, nr], de = dr([e$1("w3m-mobile-wallet-selection")], de);
const mr = i$1`:host{all:initial}.w3m-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--w3m-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;background-color:rgba(0,0,0,.3);opacity:0;pointer-events:none}@media(max-height:720px) and (orientation:landscape){.w3m-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.w3m-active{pointer-events:auto}.w3m-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) var(--w3m-container-border-radius) var(--w3m-container-border-radius);border:1px solid var(--w3m-color-overlay);overflow:hidden}.w3m-card{width:100%;position:relative;border-radius:var(--w3m-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--w3m-color-overlay);background-color:var(--w3m-color-bg-1);color:var(--w3m-color-fg-1)}@media(max-width:600px){.w3m-container{max-width:440px;border-radius:var(--w3m-background-border-radius) var(--w3m-background-border-radius) 0 0}.w3m-card{border-radius:var(--w3m-container-border-radius) var(--w3m-container-border-radius) 0 0}.w3m-overlay{align-items:flex-end}}@media(max-width:440px){.w3m-container{border:0}}`;
var hr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, me = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? pr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && hr(e2, a, o2), o2;
};
let Et = class extends s$1 {
  constructor() {
    super(), this.open = false, this.active = false, this.unsubscribeModal = void 0, this.abortController = void 0, this.unsubscribeModal = se$1.subscribe((t2) => {
      t2.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeModal) == null || t2.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-overlay");
  }
  get containerEl() {
    return s.getShadowRootElement(this, ".w3m-container");
  }
  toggleBodyScroll(t2) {
    if (document.querySelector("body"))
      if (t2) {
        const e2 = document.getElementById("w3m-styles");
        e2?.remove();
      } else
        document.head.insertAdjacentHTML("beforeend", '<style id="w3m-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
  }
  onCloseModal(t2) {
    t2.target === t2.currentTarget && se$1.close();
  }
  onOpenModalEvent() {
    this.toggleBodyScroll(false), this.addKeyboardEvents(), this.open = true, setTimeout(async () => {
      const t2 = s.isMobileAnimation() ? { y: ["50vh", "0vh"] } : { scale: [0.98, 1] }, e2 = 0.1, a = 0.2;
      await Promise.all([animate(this.overlayEl, { opacity: [0, 1] }, { delay: e2, duration: a }).finished, animate(this.containerEl, t2, { delay: e2, duration: a }).finished]), this.active = true;
    }, 0);
  }
  async onCloseModalEvent() {
    this.toggleBodyScroll(true), this.removeKeyboardEvents();
    const t2 = s.isMobileAnimation() ? { y: ["0vh", "50vh"] } : { scale: [1, 0.98] }, e2 = 0.2;
    await Promise.all([animate(this.overlayEl, { opacity: [1, 0] }, { duration: e2 }).finished, animate(this.containerEl, t2, { duration: e2 }).finished]), this.containerEl.removeAttribute("style"), this.active = false, this.open = false;
  }
  addKeyboardEvents() {
    this.abortController = new AbortController(), window.addEventListener("keydown", (t2) => {
      var e2;
      t2.key === "Escape" ? se$1.close() : t2.key === "Tab" && ((e2 = t2.target) != null && e2.tagName.includes("W3M-") || this.containerEl.focus());
    }, this.abortController), this.containerEl.focus();
  }
  removeKeyboardEvents() {
    var t2;
    (t2 = this.abortController) == null || t2.abort(), this.abortController = void 0;
  }
  managedModalContextTemplate() {
    const { isStandalone: t2 } = d.state;
    return t2 ? null : x`<w3m-wc-connection-context></w3m-wc-connection-context><w3m-account-context></w3m-account-context><w3m-network-context></w3m-network-context>`;
  }
  render() {
    const t2 = { "w3m-overlay": true, "w3m-active": this.active };
    return x`<w3m-explorer-context></w3m-explorer-context><w3m-theme-context></w3m-theme-context>${this.managedModalContextTemplate()}<div id="w3m-modal" class="${o(t2)}" @click="${this.onCloseModal}" role="alertdialog" aria-modal="true"><div class="w3m-container" tabindex="0">${this.open ? x`<w3m-modal-backcard></w3m-modal-backcard><div class="w3m-card"><w3m-modal-router></w3m-modal-router><w3m-modal-toast></w3m-modal-toast></div>` : null}</div></div>`;
  }
};
Et.styles = [w.globalCss, mr], me([t$1()], Et.prototype, "open", 2), me([t$1()], Et.prototype, "active", 2), Et = me([e$1("w3m-modal")], Et);
const wr = i$1`:host{all:initial}w3m-network-image{margin-left:-6px;margin-right:6px;width:28px;height:28px}`;
var gr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, Zt = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? ur(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && gr(e2, a, o2), o2;
};
let pt = class extends s$1 {
  constructor() {
    super(), this.chainId = "", this.label = "", this.wrongNetwork = false, this.unsubscribeNetwork = void 0, s.rejectStandaloneButtonComponent();
    const { selectedChain: t2 } = d.state;
    this.onSetChainData(t2), this.unsubscribeNetwork = d.subscribe(({ selectedChain: e2 }) => {
      this.onSetChainData(e2);
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unsubscribeNetwork) == null || t2.call(this);
  }
  onSetChainData(t2) {
    if (t2) {
      const { chains: e2 } = d.state, a = e2?.map((r) => r.id);
      this.chainId = t2.id.toString(), this.wrongNetwork = !(a != null && a.includes(t2.id)), this.label = this.wrongNetwork ? "Wrong Network" : t2.name;
    }
  }
  onClick() {
    H.click({ name: "NETWORK_BUTTON" }), se$1.open({ route: "SelectNetwork" });
  }
  render() {
    var t2;
    const { chains: e2 } = d.state, a = e2 && e2.length > 1;
    return x`<w3m-button-big @click="${this.onClick}" ?disabled="${!a}"><w3m-network-image chainId="${this.chainId}"></w3m-network-image><w3m-text variant="medium-regular" color="inverse">${(t2 = this.label) != null && t2.length ? this.label : "Select Network"}</w3m-text></w3m-button-big>`;
  }
};
pt.styles = [w.globalCss, wr], Zt([t$1()], pt.prototype, "chainId", 2), Zt([t$1()], pt.prototype, "label", 2), Zt([t$1()], pt.prototype, "wrongNetwork", 2), pt = Zt([e$1("w3m-network-switch")], pt);
const vr = i$1`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:1px;top:0;left:0}use{stroke:var(--w3m-accent-color);animation:loading 1s linear infinite}w3m-network-image{width:92px;height:92px}w3m-text{margin-bottom:40px}.w3m-error svg{stroke:var(--w3m-error-color)}.w3m-error use{display:none}.w3m-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}`;
var br = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, Ht = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? fr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && br(e2, a, o2), o2;
};
let wt = class extends s$1 {
  constructor() {
    super(...arguments), this.chainId = void 0, this.isError = false, this.label = "";
  }
  svgLoaderTemplate() {
    return x`<svg width="54" height="59" viewBox="0 0 54 59" fill="none" class="w3m-loader"><path id="w3m-loader-path" d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"/><use xlink:href="#w3m-loader-path" stroke-dasharray="54 118" stroke-dashoffset="172"></use></svg>`;
  }
  render() {
    const t2 = { "w3m-error": this.isError };
    return x`<div class="${o(t2)}">${this.svgLoaderTemplate()}<w3m-network-image chainId="${this.chainId}"></w3m-network-image></div><w3m-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Switch declined" : this.label}</w3m-text>`;
  }
};
wt.styles = [w.globalCss, vr], Ht([n()], wt.prototype, "chainId", 2), Ht([n()], wt.prototype, "isError", 2), Ht([n()], wt.prototype, "label", 2), wt = Ht([e$1("w3m-network-waiting")], wt);
const xr = i$1`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}w3m-button{margin:0 5px}`;
var yr = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, et = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Cr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && yr(e2, a, o2), o2;
};
let V = class extends s$1 {
  constructor() {
    super(...arguments), this.isMobile = false, this.isInjected = false, this.isInjectedInstalled = false, this.isDesktop = false, this.isWeb = false, this.isRetry = false;
  }
  onMobile() {
    c.isMobile() ? b$1.replace("MobileConnecting") : b$1.replace("MobileQrcodeConnecting");
  }
  onInjected() {
    this.isInjectedInstalled ? b$1.replace("InjectedConnecting") : b$1.replace("InstallWallet");
  }
  onDesktop() {
    b$1.replace("DesktopConnecting");
  }
  onWeb() {
    b$1.replace("WebConnecting");
  }
  render() {
    const { isStandalone: t2 } = d.state;
    return x`<div>${this.isRetry ? x`<slot></slot>` : null} ${this.isMobile ? x`<w3m-button .onClick="${this.onMobile}" .iconLeft="${h.MOBILE_ICON}" variant="outline">Mobile</w3m-button>` : null} ${this.isInjected && !t2 ? x`<w3m-button .onClick="${this.onInjected}" .iconLeft="${h.WALLET_ICON}" variant="outline">Browser</w3m-button>` : null} ${this.isDesktop ? x`<w3m-button .onClick="${this.onDesktop}" .iconLeft="${h.DESKTOP_ICON}" variant="outline">Desktop</w3m-button>` : null} ${this.isWeb ? x`<w3m-button .onClick="${this.onWeb}" .iconLeft="${h.GLOBE_ICON}" variant="outline">Web</w3m-button>` : null}</div>`;
  }
};
V.styles = [w.globalCss, xr], et([n()], V.prototype, "isMobile", 2), et([n()], V.prototype, "isInjected", 2), et([n()], V.prototype, "isInjectedInstalled", 2), et([n()], V.prototype, "isDesktop", 2), et([n()], V.prototype, "isWeb", 2), et([n()], V.prototype, "isRetry", 2), V = et([e$1("w3m-platform-selection")], V);
const $r = i$1`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--w3m-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.w3m-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--w3m-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay)}button:active{background-color:var(--w3m-color-overlay)}@media(hover:hover){button:hover{background-color:var(--w3m-color-overlay)}}.w3m-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--w3m-wallet-icon-border-radius)/ 2);border:1px solid var(--w3m-color-overlay)}.w3m-icons svg{width:21px;height:21px}.w3m-icons img:nth-child(1),.w3m-icons img:nth-child(2),.w3m-icons svg:nth-child(1),.w3m-icons svg:nth-child(2){margin-bottom:4px}w3m-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--w3m-color-bg-3)}#wallet-placeholder-dash{stroke:var(--w3m-color-overlay)}`;
var kr = Object.defineProperty, Or = Object.getOwnPropertyDescriptor, Ir = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Or(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && kr(e2, a, o2), o2;
};
let he = class extends s$1 {
  onClick() {
    b$1.push("WalletExplorer");
  }
  render() {
    const { recomendedWallets: t2 } = ne$1.state, e2 = Z.manualWallets(), a = [...t2, ...e2].reverse().slice(0, 4);
    return x`<button @click="${this.onClick}"><div class="w3m-icons">${a.map((r) => {
      const o2 = s.getWalletIcon(r);
      if (o2)
        return x`<img src="${o2}">`;
      const l = s.getWalletIcon({ id: r.id });
      return l ? x`<img src="${l}">` : h.WALLET_PLACEHOLDER;
    })} ${[...Array(4 - a.length)].map(() => h.WALLET_PLACEHOLDER)}</div><w3m-text variant="xsmall-regular">View All</w3m-text></button>`;
  }
};
he.styles = [w.globalCss, $r], he = Ir([e$1("w3m-view-all-wallets-button")], he);
const Er = i$1`.w3m-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
var Wr = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, St = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Ar(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Wr(e2, a, o2), o2;
};
let gt = class extends s$1 {
  constructor() {
    super(), this.walletId = "", this.imageId = "", this.uri = "", this.unwatchWcConnection = void 0, setTimeout(() => {
      const { pairingUri: t2 } = _.state, { standaloneUri: e2 } = d.state;
      this.uri = e2 ?? t2;
    }, 0), this.unwatchWcConnection = _.subscribe((t2) => {
      t2.pairingUri && (this.uri = t2.pairingUri);
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchWcConnection) == null || t2.call(this);
  }
  get overlayEl() {
    return s.getShadowRootElement(this, ".w3m-qr-container");
  }
  render() {
    return x`<div class="w3m-qr-container">${this.uri ? x`<w3m-qrcode size="${this.overlayEl.offsetWidth}" uri="${this.uri}" walletId="${this.walletId}" imageId="${this.imageId}"></w3m-qrcode>` : x`<w3m-spinner></w3m-spinner>`}</div>`;
  }
};
gt.styles = [w.globalCss, Er], St([n()], gt.prototype, "walletId", 2), St([n()], gt.prototype, "imageId", 2), St([t$1()], gt.prototype, "uri", 2), gt = St([e$1("w3m-walletconnect-qr")], gt);
const jr = i$1`.w3m-profile{display:flex;justify-content:space-between;align-items:flex-start;padding-top:20px}.w3m-connection-badge{background-color:var(--w3m-color-bg-2);box-shadow:inset 0 0 0 1px var(--w3m-color-overlay);padding:6px 10px 6px 26px;position:relative;border-radius:28px}.w3m-connection-badge::before{content:'';position:absolute;width:10px;height:10px;left:10px;background-color:var(--w3m-success-color);border-radius:50%;top:50%;margin-top:-5px;box-shadow:0 1px 4px 1px var(--w3m-success-color),inset 0 0 0 1px var(--w3m-color-overlay)}.w3m-footer{display:flex;justify-content:space-between}w3m-address-text{margin-top:10px;display:block}.w3m-balance{border-top:1px solid var(--w3m-color-bg-2);padding:11px 20px}`;
var Mr = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, Tr = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Pr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Mr(e2, a, o2), o2;
};
let pe = class extends s$1 {
  async onDisconnect() {
    await C.client().disconnect();
  }
  async onCopyAddress() {
    var t2;
    await navigator.clipboard.writeText((t2 = K.state.address) != null ? t2 : ""), oe$1.openToast("Address copied", "success");
  }
  render() {
    return x`<w3m-modal-content><div class="w3m-profile"><div class="w3m-info"><w3m-avatar size="medium"></w3m-avatar><w3m-address-text variant="modal"></w3m-address-text></div><div class="w3m-connection-badge"><w3m-text variant="small-regular" color="secondary">Connected</w3m-text></div></div></w3m-modal-content><div class="w3m-balance"><w3m-balance></w3m-balance></div><w3m-modal-footer><div class="w3m-footer"><w3m-account-network-button></w3m-account-network-button><w3m-box-button label="Copy Address" .onClick="${this.onCopyAddress}" .icon="${h.ACCOUNT_COPY}"></w3m-box-button><w3m-box-button label="Disconnect" .onClick="${this.onDisconnect}" .icon="${h.ACCOUNT_DISCONNECT}"></w3m-box-button></div></w3m-modal-footer>`;
  }
};
pe.styles = [w.globalCss, jr], pe = Tr([e$1("w3m-account-view")], pe);
var Lr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, Nr = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? _r(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Lr(e2, a, o2), o2;
};
let we = class extends s$1 {
  viewTemplate() {
    return c.isAndroid() ? x`<w3m-android-wallet-selection></w3m-android-wallet-selection>` : c.isMobile() ? x`<w3m-mobile-wallet-selection></w3m-mobile-wallet-selection>` : x`<w3m-desktop-wallet-selection></w3m-desktop-wallet-selection>`;
  }
  render() {
    return x`${this.viewTemplate()}<w3m-legal-notice></w3m-legal-notice>`;
  }
};
we.styles = [w.globalCss], we = Nr([e$1("w3m-connect-wallet-view")], we);
const Rr = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Dr = Object.defineProperty, Zr = Object.getOwnPropertyDescriptor, De = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Zr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Dr(e2, a, o2), o2;
};
let Bt = class extends s$1 {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openDesktopApp(), this.unwatchConnection = _.subscribe((t2) => {
      this.isError = t2.pairingError;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchConnection) == null || t2.call(this);
  }
  onFormatAndRedirect(t2) {
    const { desktop: e2, name: a } = c.getWalletRouterData(), r = e2?.native;
    if (r) {
      const o2 = c.formatNativeUrl(r, t2, a);
      c.openHref(o2, "_self");
    }
  }
  openDesktopApp() {
    _.setPairingError(false);
    const { standaloneUri: t2 } = d.state, { pairingUri: e2 } = _.state, a = c.getWalletRouterData();
    s.setRecentWallet(a), t2 ? this.onFormatAndRedirect(t2) : this.onFormatAndRedirect(e2);
  }
  render() {
    const { name: t2, id: e2, image_id: a } = c.getWalletRouterData(), { isMobile: r, isInjected: o2, isWeb: l } = s.getCachedRouterWalletPlatforms();
    return x`<w3m-modal-header title="${t2}" .onAction="${s.handleUriCopy}" .actionIcon="${h.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e2}" imageId="${a}" label="${`Continue in ${t2}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Connection can continue loading if ${t2} is not installed on your device`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${o2}" .isWeb="${l}" .isRetry="${true}"><w3m-button .onClick="${this.openDesktopApp.bind(this)}" .iconRight="${h.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Bt.styles = [w.globalCss, Rr], De([t$1()], Bt.prototype, "isError", 2), Bt = De([e$1("w3m-desktop-connecting-view")], Bt);
const Hr = i$1`.w3m-info-text{margin:5px 0 15px;max-width:320px;text-align:center}.w3m-wallet-item{margin:0 -20px 0 0;padding-right:20px;display:flex;align-items:center;border-bottom:1px solid var(--w3m-color-bg-2)}.w3m-wallet-item:last-child{margin-bottom:-20px;border-bottom:0}.w3m-wallet-content{margin-left:20px;height:60px;display:flex;flex:1;align-items:center;justify-content:space-between}.w3m-footer-actions{display:flex;flex-direction:column;align-items:center;padding:20px 0;border-top:1px solid var(--w3m-color-bg-2)}w3m-wallet-image{display:block;width:40px;height:40px;border-radius:10px}`;
var Sr = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, Ur = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Br(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Sr(e2, a, o2), o2;
};
let ge = class extends s$1 {
  onGet(t2) {
    c.openHref(t2, "_blank");
  }
  render() {
    const t2 = ne$1.state.recomendedWallets.slice(0, 5), e2 = Z.manualWallets().slice(0, 5), a = t2.length, r = e2.length;
    return x`<w3m-modal-header title="Get a wallet"></w3m-modal-header><w3m-modal-content>${a ? t2.map((o2) => x`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o2.id}" imageId="${o2.image_id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o2.name}</w3m-text><w3m-button .iconRight="${h.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o2.homepage)}">Get</w3m-button></div></div>`) : null} ${r ? e2.map((o2) => x`<div class="w3m-wallet-item"><w3m-wallet-image walletId="${o2.id}"></w3m-wallet-image><div class="w3m-wallet-content"><w3m-text variant="medium-regular">${o2.name}</w3m-text><w3m-button .iconRight="${h.ARROW_RIGHT_ICON}" .onClick="${() => this.onGet(o2.links.universal)}">Get</w3m-button></div></div>`) : null}</w3m-modal-content><div class="w3m-footer-actions"><w3m-text variant="medium-regular">Not what you're looking for?</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With hundreds of wallets out there, there's something for everyone</w3m-text><w3m-button .onClick="${s.openWalletExplorerUrl}" .iconRight="${h.ARROW_UP_RIGHT_ICON}">Explore Wallets</w3m-button></div>`;
  }
};
ge.styles = [w.globalCss, Hr], ge = Ur([e$1("w3m-get-wallet-view")], ge);
const Vr = i$1`.w3m-footer-actions{display:flex;justify-content:center}.w3m-footer-actions w3m-button{margin:0 5px}.w3m-info-container{display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20px}.w3m-info-container:last-child{margin-bottom:0}.w3m-info-text{margin-top:5px;text-align:center}.w3m-images svg{margin:0 2px 5px;width:55px;height:55px}.help-img-highlight{stroke:var(--w3m-color-overlay)}`;
var zr = Object.defineProperty, Gr = Object.getOwnPropertyDescriptor, Fr = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Gr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && zr(e2, a, o2), o2;
};
let ue = class extends s$1 {
  constructor() {
    super(...arguments), this.learnUrl = "https://ethereum.org/en/wallets/";
  }
  onGet() {
    y.state.enableExplorer ? b$1.push("GetWallet") : s.openWalletExplorerUrl();
  }
  onLearnMore() {
    c.openHref(this.learnUrl, "_blank");
  }
  render() {
    return x`<w3m-modal-header title="What is a wallet?"></w3m-modal-header><w3m-modal-content><div class="w3m-info-container"><div class="w3m-images">${h.HELP_CHART_IMG} ${h.HELP_PAINTING_IMG} ${h.HELP_ETH_IMG}</div><w3m-text variant="medium-regular">A home for your digital assets</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs.</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${h.HELP_KEY_IMG} ${h.HELP_USER_IMG} ${h.HELP_LOCK_IMG}</div><w3m-text variant="medium-regular">One login for all of web3</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">Log in to any app by connecting your wallet. Say goodbye to countless passwords!</w3m-text></div><div class="w3m-info-container"><div class="w3m-images">${h.HELP_COMPAS_IMG} ${h.HELP_NOUN_IMG} ${h.HELP_DAO_IMG}</div><w3m-text variant="medium-regular">Your gateway to a new web</w3m-text><w3m-text variant="small-thin" color="secondary" class="w3m-info-text">With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more.</w3m-text></div><div class="w3m-footer-actions"><w3m-button .onClick="${this.onGet.bind(this)}" .iconLeft="${h.WALLET_ICON}">Get a Wallet</w3m-button><w3m-button .onClick="${this.onLearnMore.bind(this)}" .iconRight="${h.ARROW_UP_RIGHT_ICON}">Learn More</w3m-button></div></w3m-modal-content>`;
  }
};
ue.styles = [w.globalCss, Vr], ue = Fr([e$1("w3m-help-view")], ue);
const qr = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Kr = Object.defineProperty, Yr = Object.getOwnPropertyDescriptor, Ze = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Yr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Kr(e2, a, o2), o2;
};
let Ut = class extends s$1 {
  constructor() {
    super(), this.isError = false, this.connector = C.client().getConnectorById("injected"), this.openInjectedApp();
  }
  async openInjectedApp() {
    const { ready: t2 } = this.connector;
    t2 && (this.isError = false, await s.handleConnectorConnection("injected", () => {
      this.isError = true;
    }));
  }
  render() {
    const { name: t2, id: e2, image_id: a } = c.getWalletRouterData(), { isMobile: r, isDesktop: o2, isWeb: l } = s.getCachedRouterWalletPlatforms();
    return x`<w3m-modal-header title="${t2}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e2}" imageId="${a}" label="${`Continue in ${t2}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Connection can be declined if multiple wallets are installed or previous request is still active</w3m-text><w3m-platform-selection .isMobile="${r}" .isDesktop="${o2}" .isWeb="${l}" .isRetry="${true}"><w3m-button .onClick="${this.openInjectedApp.bind(this)}" .disabled="${!this.isError}" .iconRight="${h.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Ut.styles = [w.globalCss, qr], Ze([t$1()], Ut.prototype, "isError", 2), Ut = Ze([e$1("w3m-injected-connecting-view")], Ut);
const Qr = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var Xr = Object.defineProperty, Jr = Object.getOwnPropertyDescriptor, tl = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? Jr(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Xr(e2, a, o2), o2;
};
let ve = class extends s$1 {
  onInstall(t2) {
    t2 && c.openHref(t2, "_blank");
  }
  render() {
    const { name: t2, id: e2, image_id: a, homepage: r } = c.getWalletRouterData();
    return x`<w3m-modal-header title="${t2}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e2}" imageId="${a}" label="Not Detected" .isStale="${true}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Download ${t2} to continue. If multiple browser extensions are installed, disable non ${t2} ones and try again`}</w3m-text><w3m-button .onClick="${() => this.onInstall(r)}" .iconLeft="${h.ARROW_DOWN_ICON}">Download</w3m-button></w3m-info-footer>`;
  }
};
ve.styles = [w.globalCss, Qr], ve = tl([e$1("w3m-install-wallet-view")], ve);
const el = i$1`w3m-wallet-image{border-radius:var(--w3m-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}w3m-info-footer{display:flex;width:100%}.w3m-app-store{justify-content:space-between}.w3m-app-store w3m-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--w3m-wallet-icon-small-border-radius)}.w3m-app-store div{display:flex;align-items:center}.w3m-app-store w3m-button{margin-right:-10px}.w3m-note{flex-direction:column;align-items:center;padding:5px 0}.w3m-note w3m-text{text-align:center}w3m-platform-selection{margin-top:-15px}.w3m-note w3m-text{margin-top:15px}.w3m-note w3m-text span{color:var(--w3m-accent-color)}`;
var ol = Object.defineProperty, al = Object.getOwnPropertyDescriptor, He = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? al(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ol(e2, a, o2), o2;
};
let Vt = class extends s$1 {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openMobileApp(), this.unwatchConnection = _.subscribe((t2) => {
      this.isError = t2.pairingError;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchConnection) == null || t2.call(this);
  }
  onFormatAndRedirect(t2, e2 = false) {
    const { mobile: a, name: r } = c.getWalletRouterData(), o2 = a?.native, l = a?.universal;
    if (o2 && !e2) {
      const i2 = c.formatNativeUrl(o2, t2, r);
      c.openHref(i2, "_self");
    } else if (l) {
      const i2 = c.formatUniversalUrl(l, t2, r);
      c.openHref(i2, "_self");
    }
  }
  openMobileApp(t2 = false) {
    _.setPairingError(false);
    const { standaloneUri: e2 } = d.state, { pairingUri: a } = _.state, r = c.getWalletRouterData();
    s.setRecentWallet(r), e2 ? this.onFormatAndRedirect(e2, t2) : this.onFormatAndRedirect(a, t2);
  }
  onGoToAppStore(t2) {
    t2 && c.openHref(t2, "_blank");
  }
  render() {
    const { name: t2, id: e2, image_id: a, app: r, mobile: o2 } = c.getWalletRouterData(), { isWeb: l } = s.getCachedRouterWalletPlatforms(), i2 = r?.ios, p = o2?.universal;
    return x`<w3m-modal-header title="${t2}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e2}" imageId="${a}" label="Tap 'Open' to continue…" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer class="w3m-note"><w3m-platform-selection .isWeb="${l}" .isRetry="${true}"><w3m-button .onClick="${() => this.openMobileApp(false)}" .iconRight="${h.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection>${p ? x`<w3m-text color="secondary" variant="small-thin">Still doesn't work? <span tabindex="0" @click="${() => this.openMobileApp(true)}">Try this alternate link</span></w3m-text>` : null}</w3m-info-footer><w3m-info-footer class="w3m-app-store"><div><w3m-wallet-image walletId="${e2}" imageId="${a}"></w3m-wallet-image><w3m-text>${`Get ${t2}`}</w3m-text></div><w3m-button .iconRight="${h.ARROW_RIGHT_ICON}" .onClick="${() => this.onGoToAppStore(i2)}" variant="ghost">App Store</w3m-button></w3m-info-footer>`;
  }
};
Vt.styles = [w.globalCss, el], He([t$1()], Vt.prototype, "isError", 2), Vt = He([e$1("w3m-mobile-connecting-view")], Vt);
const rl = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var ll = Object.defineProperty, il = Object.getOwnPropertyDescriptor, nl = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? il(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ll(e2, a, o2), o2;
};
let be = class extends s$1 {
  render() {
    const { name: t2, id: e2, image_id: a } = c.getWalletRouterData(), { isInjected: r, isDesktop: o2, isWeb: l } = s.getCachedRouterWalletPlatforms();
    return x`<w3m-modal-header title="${t2}" .onAction="${s.handleUriCopy}" .actionIcon="${h.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr walletId="${e2}" imageId="${a}"></w3m-walletconnect-qr></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`Scan this QR Code with your phone's camera or inside ${t2} app`}</w3m-text><w3m-platform-selection .isDesktop="${o2}" .isInjected="${r}" .isWeb="${l}"></w3m-platform-selection></w3m-info-footer>`;
  }
};
be.styles = [w.globalCss, rl], be = nl([e$1("w3m-mobile-qr-connecting-view")], be);
var sl = Object.defineProperty, cl = Object.getOwnPropertyDescriptor, dl = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? cl(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && sl(e2, a, o2), o2;
};
let fe = class extends s$1 {
  render() {
    return x`<w3m-modal-header title="Scan the code" .onAction="${s.handleUriCopy}" .actionIcon="${h.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-walletconnect-qr></w3m-walletconnect-qr></w3m-modal-content>`;
  }
};
fe.styles = [w.globalCss], fe = dl([e$1("w3m-qrcode-view")], fe);
const ml = i$1`div{display:grid;grid-template-columns:repeat(4,80px);margin:-5px -10px;justify-content:space-between}w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-info-footer w3m-text{text-align:center}`;
var ze = Object.defineProperty, hl = Object.defineProperties, pl = Object.getOwnPropertyDescriptor, wl = Object.getOwnPropertyDescriptors, Se = Object.getOwnPropertySymbols, gl = Object.prototype.hasOwnProperty, ul = Object.prototype.propertyIsEnumerable, Be = (t2, e2, a) => e2 in t2 ? ze(t2, e2, { enumerable: true, configurable: true, writable: true, value: a }) : t2[e2] = a, vl = (t2, e2) => {
  for (var a in e2 || (e2 = {}))
    gl.call(e2, a) && Be(t2, a, e2[a]);
  if (Se)
    for (var a of Se(e2))
      ul.call(e2, a) && Be(t2, a, e2[a]);
  return t2;
}, bl = (t2, e2) => hl(t2, wl(e2)), xe = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? pl(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && ze(e2, a, o2), o2;
};
let Wt = class extends s$1 {
  constructor() {
    super(), this.connectedChains = "ALL", this.isUnsupportedChains = false, this.getConnectedChainIds();
  }
  async getConnectedChainIds() {
    this.connectedChains = await C.client().getConnectedChainIds();
  }
  async onSelectChain(t2) {
    try {
      const { selectedChain: e2, walletConnectVersion: a, isPreferInjected: r } = d.state, { isConnected: o2 } = K.state;
      o2 ? e2?.id === t2.id ? b$1.reset("Account") : a === 2 ? (await C.client().switchNetwork({ chainId: t2.id }), b$1.reset("Account")) : b$1.push("SwitchNetwork", { SwitchNetwork: t2 }) : r ? (d.setSelectedChain(t2), se$1.close()) : (d.setSelectedChain(t2), b$1.push("ConnectWallet"));
    } catch (e2) {
      console.error(e2), oe$1.openToast("Unsupported chain", "error");
    }
  }
  isUnsuportedChainId(t2) {
    return typeof this.connectedChains == "string" && this.connectedChains !== "ALL" ? (this.isUnsupportedChains = true, true) : Array.isArray(this.connectedChains) && !this.connectedChains.includes(String(t2)) ? (this.isUnsupportedChains = true, true) : false;
  }
  render() {
    const { chains: t2 } = d.state, e2 = t2?.map((r) => bl(vl({}, r), { unsupported: this.isUnsuportedChainId(r.id) })), a = e2?.sort((r, o2) => Number(r.unsupported) - Number(o2.unsupported));
    return x`<w3m-modal-header title="Select network"></w3m-modal-header><w3m-modal-content><div>${a?.map((r) => x`<w3m-network-button name="${r.name}" chainId="${r.id}" .unsupported="${r.unsupported}" .onClick="${async () => this.onSelectChain(r)}">${r.name}</w3m-network-button>`)}</div></w3m-modal-content>${this.isUnsupportedChains ? x`<w3m-info-footer><w3m-text color="secondary" variant="small-thin">Your connected wallet may not support some of the networks available for this dapp</w3m-text></w3m-info-footer>` : null}`;
  }
};
Wt.styles = [w.globalCss, ml], xe([t$1()], Wt.prototype, "connectedChains", 2), xe([t$1()], Wt.prototype, "isUnsupportedChains", 2), Wt = xe([e$1("w3m-select-network-view")], Wt);
const fl = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}w3m-button{margin-top:15px}`;
var xl = Object.defineProperty, yl = Object.getOwnPropertyDescriptor, Ue = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? yl(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && xl(e2, a, o2), o2;
};
let zt = class extends s$1 {
  constructor() {
    super(), this.isError = false, this.onSwitchNetwork();
  }
  async onSwitchNetwork() {
    try {
      this.isError = false;
      const t2 = c.getSwitchNetworkRouterData();
      await C.client().switchNetwork({ chainId: t2.id }), d.setSelectedChain(t2), b$1.reset("Account");
    } catch {
      this.isError = true;
    }
  }
  render() {
    const { id: t2, name: e2 } = c.getSwitchNetworkRouterData();
    return x`<w3m-modal-header title="${`Connect to ${e2}`}"></w3m-modal-header><w3m-modal-content><w3m-network-waiting chainId="${t2}" label="Approve in your wallet" .isError="${this.isError}"></w3m-network-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">Switch can be declined if chain is not supported by a wallet or previous request is still active</w3m-text><w3m-button .onClick="${this.onSwitchNetwork.bind(this)}" .disabled="${!this.isError}" .iconRight="${h.RETRY_ICON}">Try Again</w3m-button></w3m-info-footer>`;
  }
};
zt.styles = [w.globalCss, fl], Ue([t$1()], zt.prototype, "isError", 2), zt = Ue([e$1("w3m-switch-network-view")], zt);
const Cl = i$1`w3m-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.w3m-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}w3m-modal-content::after,w3m-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}w3m-modal-content::before{box-shadow:0 -1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(var(--w3m-color-bg-1),rgba(255,255,255,0))}w3m-modal-content::after{box-shadow:0 1px 0 0 var(--w3m-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--w3m-color-bg-1));top:calc(100% - 20px)}w3m-modal-content::-webkit-scrollbar{display:none}.w3m-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.w3m-empty,.w3m-loading{display:flex}.w3m-loading .w3m-placeholder-block{height:100%}.w3m-end-reached .w3m-placeholder-block{height:0;opacity:0}.w3m-empty .w3m-placeholder-block{opacity:1;height:100%}w3m-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
var $l = Object.defineProperty, kl = Object.getOwnPropertyDescriptor, At = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? kl(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && $l(e2, a, o2), o2;
};
const ye = 40;
let ot = class extends s$1 {
  constructor() {
    super(...arguments), this.loading = !ne$1.state.wallets.listings.length, this.firstFetch = !ne$1.state.wallets.listings.length, this.search = "", this.endReached = false, this.intersectionObserver = void 0, this.searchDebounce = s.debounce((t2) => {
      t2.length >= 3 ? (this.firstFetch = true, this.endReached = false, this.search = t2, ne$1.resetSearch(), this.fetchWallets()) : this.search && (this.search = "", this.endReached = this.isLastPage(), ne$1.resetSearch());
    });
  }
  firstUpdated() {
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.intersectionObserver) == null || t2.disconnect();
  }
  get placeholderEl() {
    return s.getShadowRootElement(this, ".w3m-placeholder-block");
  }
  createPaginationObserver() {
    this.intersectionObserver = new IntersectionObserver(([t2]) => {
      t2.isIntersecting && !(this.search && this.firstFetch) && this.fetchWallets();
    }), this.intersectionObserver.observe(this.placeholderEl);
  }
  isLastPage() {
    const { wallets: t2, search: e2 } = ne$1.state, { listings: a, total: r } = this.search ? e2 : t2;
    return r <= ye || a.length >= r;
  }
  async fetchWallets() {
    var t2;
    const { wallets: e2, search: a, injectedWallets: r } = ne$1.state, { listings: o2, total: l, page: i2 } = this.search ? a : e2;
    if (!this.endReached && (this.firstFetch || l > ye && o2.length < l))
      try {
        this.loading = true;
        const p = (t2 = d.state.standaloneChains) == null ? void 0 : t2.join(","), { listings: g } = await ne$1.getWallets({ page: this.firstFetch ? 1 : i2 + 1, entries: ye, search: this.search, version: d.state.walletConnectVersion, chains: p }), f = g.map(($) => s.getWalletIcon($)), j = r.map(($) => s.getWalletIcon($));
        await Promise.all([...f.map(async ($) => s.preloadImage($)), ...j.map(async ($) => s.preloadImage($)), c.wait(300)]), this.endReached = this.isLastPage();
      } catch (p) {
        console.error(p), oe$1.openToast(s.getErrorMessage(p), "error");
      } finally {
        this.loading = false, this.firstFetch = false;
      }
  }
  onConnect(t2) {
    c.isAndroid() ? s.handleMobileLinking(t2) : s.goToConnectingView(t2);
  }
  onSearchChange(t2) {
    const { value: e2 } = t2.target;
    this.searchDebounce(e2);
  }
  render() {
    const { wallets: t2, search: e2 } = ne$1.state, { listings: a } = this.search ? e2 : t2, r = this.loading && !a.length, o$1 = this.search.length >= 3;
    let l = P.injectedWalletsTemplate(), i2 = P.manualWalletsTemplate(), p = P.recomendedWalletsTemplate(true);
    o$1 && (l = l.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)), i2 = i2.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)), p = p.filter(({ values: $ }) => s.caseSafeIncludes($[0], this.search)));
    const g = !this.loading && !a.length && !l.length && !p.length, f = Math.max(l.length, a.length), j = { "w3m-loading": r, "w3m-end-reached": this.endReached || !this.loading, "w3m-empty": g };
    return x`<w3m-modal-header><w3m-search-input .onChange="${this.onSearchChange.bind(this)}"></w3m-search-input></w3m-modal-header><w3m-modal-content class="${o(j)}"><div class="w3m-grid">${r ? null : p} ${r ? null : [...Array(f)].map(($, _2) => x`${i2[_2]} ${l[_2]} ${a[_2] ? x`<w3m-wallet-button imageId="${a[_2].image_id}" name="${a[_2].name}" walletId="${a[_2].id}" .onClick="${() => this.onConnect(a[_2])}"></w3m-wallet-button>` : null}`)}</div><div class="w3m-placeholder-block">${g ? x`<w3m-text variant="big-bold" color="secondary">No results found</w3m-text>` : null} ${!g && this.loading ? x`<w3m-spinner></w3m-spinner>` : null}</div></w3m-modal-content>`;
  }
};
ot.styles = [w.globalCss, Cl], At([t$1()], ot.prototype, "loading", 2), At([t$1()], ot.prototype, "firstFetch", 2), At([t$1()], ot.prototype, "search", 2), At([t$1()], ot.prototype, "endReached", 2), ot = At([e$1("w3m-wallet-explorer-view")], ot);
const Ol = i$1`w3m-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}w3m-text{text-align:center}`;
var Il = Object.defineProperty, El = Object.getOwnPropertyDescriptor, Ve = (t2, e2, a, r) => {
  for (var o2 = r > 1 ? void 0 : r ? El(e2, a) : e2, l = t2.length - 1, i2; l >= 0; l--)
    (i2 = t2[l]) && (o2 = (r ? i2(e2, a, o2) : i2(o2)) || o2);
  return r && o2 && Il(e2, a, o2), o2;
};
let Gt = class extends s$1 {
  constructor() {
    super(), this.isError = false, this.unwatchConnection = void 0, this.openWebWallet(), this.unwatchConnection = _.subscribe((t2) => {
      this.isError = t2.pairingError;
    });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this.unwatchConnection) == null || t2.call(this);
  }
  onFormatAndRedirect(t2) {
    const { desktop: e2, name: a } = c.getWalletRouterData(), r = e2?.universal;
    if (r) {
      const o2 = c.formatUniversalUrl(r, t2, a);
      c.openHref(o2, "_blank");
    }
  }
  openWebWallet() {
    _.setPairingError(false);
    const { standaloneUri: t2 } = d.state, { pairingUri: e2 } = _.state, a = c.getWalletRouterData();
    s.setRecentWallet(a), t2 ? this.onFormatAndRedirect(t2) : this.onFormatAndRedirect(e2);
  }
  render() {
    const { name: t2, id: e2, image_id: a } = c.getWalletRouterData(), { isMobile: r, isInjected: o2, isDesktop: l } = s.getCachedRouterWalletPlatforms(), i2 = c.isMobile();
    return x`<w3m-modal-header title="${t2}" .onAction="${s.handleUriCopy}" .actionIcon="${h.COPY_ICON}"></w3m-modal-header><w3m-modal-content><w3m-connector-waiting walletId="${e2}" imageId="${a}" label="${`Continue in ${t2}...`}" .isError="${this.isError}"></w3m-connector-waiting></w3m-modal-content><w3m-info-footer><w3m-text color="secondary" variant="small-thin">${`${t2} web app has opened in a new tab. Go there, accept the connection, and come back`}</w3m-text><w3m-platform-selection .isMobile="${r}" .isInjected="${i2 ? false : o2}" .isDesktop="${i2 ? false : l}" .isRetry="${true}"><w3m-button .onClick="${this.openWebWallet.bind(this)}" .iconRight="${h.RETRY_ICON}">Retry</w3m-button></w3m-platform-selection></w3m-info-footer>`;
  }
};
Gt.styles = [w.globalCss, Ol], Ve([t$1()], Gt.prototype, "isError", 2), Gt = Ve([e$1("w3m-web-connecting-view")], Gt);
export {
  Ct as W3mAccountButton,
  dt as W3mConnectButton,
  tt as W3mCoreButton,
  Et as W3mModal,
  pt as W3mNetworkSwitch,
  G as W3mQrCode
};
