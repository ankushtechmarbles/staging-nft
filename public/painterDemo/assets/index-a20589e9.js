import { E as buffer, s as commonjsGlobal, cr as process, cu as inherits_browserExports } from "./index-0d430626.js";
import { e as eventsExports } from "./tslib-f3df98f6.js";
var safeBuffer = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer)
    return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module, exports2) {
    var buffer$1 = buffer;
    var Buffer2 = buffer$1.Buffer;
    function copyProps(src2, dst) {
      for (var key in src2) {
        dst[key] = src2[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer$1;
    } else {
      copyProps(buffer$1, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer$1.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var readableBrowser = { exports: {} };
var streamBrowser;
var hasRequiredStreamBrowser;
function requireStreamBrowser() {
  if (hasRequiredStreamBrowser)
    return streamBrowser;
  hasRequiredStreamBrowser = 1;
  streamBrowser = eventsExports.EventEmitter;
  return streamBrowser;
}
var util = {};
var types = {};
var shams$1 = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var hasSymbols$2 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$2() && !!Symbol.toStringTag;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var test = {
  foo: {}
};
var $Object = Object;
var hasProto$1 = function hasProto() {
  return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation;
  hasRequiredImplementation = 1;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var slice = Array.prototype.slice;
  var toStr2 = Object.prototype.toString;
  var funcType = "[object Function]";
  implementation = function bind2(that) {
    var target = this;
    if (typeof target !== "function" || toStr2.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          args.concat(slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(
          that,
          args.concat(slice.call(arguments))
        );
      }
    };
    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs.push("$" + i);
    }
    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return implementation;
}
var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind)
    return functionBind;
  hasRequiredFunctionBind = 1;
  var implementation2 = requireImplementation();
  functionBind = Function.prototype.bind || implementation2;
  return functionBind;
}
var bind$1 = requireFunctionBind();
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
  try {
    $gOPD$1({}, "");
  } catch (e) {
    $gOPD$1 = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError();
};
var ThrowTypeError = $gOPD$1 ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD$1(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var hasProto2 = hasProto$1();
var getProto$1 = Object.getPrototypeOf || (hasProto2 ? function(x) {
  return x.__proto__;
} : null);
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 && getProto$1 ? getProto$1(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
if (getProto$1) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto$1(getProto$1(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto$1) {
      value = getProto$1(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind = requireFunctionBind();
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string, rePropName, function(match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD$1 && i + 1 >= parts.length) {
        var desc = $gOPD$1(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$1 = { exports: {} };
var hasRequiredCallBind;
function requireCallBind() {
  if (hasRequiredCallBind)
    return callBind$1.exports;
  hasRequiredCallBind = 1;
  (function(module) {
    var bind2 = requireFunctionBind();
    var GetIntrinsic3 = getIntrinsic;
    var $apply = GetIntrinsic3("%Function.prototype.apply%");
    var $call = GetIntrinsic3("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind2.call($call, $apply);
    var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
    var $max = GetIntrinsic3("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind2(originalFunction) {
      var func = $reflectApply(bind2, $call, arguments);
      if ($gOPD2 && $defineProperty) {
        var desc = $gOPD2(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind2, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  })(callBind$1);
  return callBind$1.exports;
}
var GetIntrinsic$1 = getIntrinsic;
var callBind = requireCallBind();
var $indexOf$1 = callBind(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$3 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf$1(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};
var hasToStringTag$4 = shams();
var callBound$2 = callBound$3;
var $toString$2 = callBound$2("Object.prototype.toString");
var isStandardArguments = function isArguments(value) {
  if (hasToStringTag$4 && value && typeof value === "object" && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$2(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments2(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$2(value) !== "[object Array]" && $toString$2(value.callee) === "[object Function]";
};
var supportsStandardArguments = function() {
  return isStandardArguments(arguments);
}();
isStandardArguments.isLegacyArguments = isLegacyArguments;
var isArguments3 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
var toStr$2 = Object.prototype.toString;
var fnToStr$1 = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag$3 = shams();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function() {
  if (!hasToStringTag$3) {
    return false;
  }
  try {
    return Function("return function*() {}")();
  } catch (e) {
  }
};
var GeneratorFunction;
var isGeneratorFunction = function isGeneratorFunction2(fn) {
  if (typeof fn !== "function") {
    return false;
  }
  if (isFnRegex.test(fnToStr$1.call(fn))) {
    return true;
  }
  if (!hasToStringTag$3) {
    var str = toStr$2.call(fn);
    return str === "[object GeneratorFunction]";
  }
  if (!getProto) {
    return false;
  }
  if (typeof GeneratorFunction === "undefined") {
    var generatorFunc = getGeneratorFunc();
    GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
  }
  return getProto(fn) === GeneratorFunction;
};
var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
  try {
    badArrayLike = Object.defineProperty({}, "length", {
      get: function() {
        throw isCallableMarker;
      }
    });
    isCallableMarker = {};
    reflectApply(function() {
      throw 42;
    }, null, badArrayLike);
  } catch (_) {
    if (_ !== isCallableMarker) {
      reflectApply = null;
    }
  }
} else {
  reflectApply = null;
}
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
  try {
    var fnStr = fnToStr.call(value);
    return constructorRegex.test(fnStr);
  } catch (e) {
    return false;
  }
};
var tryFunctionObject = function tryFunctionToStr(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }
    fnToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$1 = Object.prototype.toString;
var objectClass = "[object Object]";
var fnClass = "[object Function]";
var genClass = "[object GeneratorFunction]";
var ddaClass = "[object HTMLAllCollection]";
var ddaClass2 = "[object HTML document.all class]";
var ddaClass3 = "[object HTMLCollection]";
var hasToStringTag$2 = typeof Symbol === "function" && !!Symbol.toStringTag;
var isIE68 = !(0 in [,]);
var isDDA = function isDocumentDotAll() {
  return false;
};
if (typeof document === "object") {
  var all = document.all;
  if (toStr$1.call(all) === toStr$1.call(document.all)) {
    isDDA = function isDocumentDotAll2(value) {
      if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
        try {
          var str = toStr$1.call(value);
          return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
        } catch (e) {
        }
      }
      return false;
    };
  }
}
var isCallable$1 = reflectApply ? function isCallable(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  try {
    reflectApply(value, null, badArrayLike);
  } catch (e) {
    if (e !== isCallableMarker) {
      return false;
    }
  }
  return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable2(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  if (hasToStringTag$2) {
    return tryFunctionObject(value);
  }
  if (isES6ClassFn(value)) {
    return false;
  }
  var strClass = toStr$1.call(value);
  if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
    return false;
  }
  return tryFunctionObject(value);
};
var isCallable3 = isCallable$1;
var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var forEachArray = function forEachArray2(array, iterator, receiver) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (hasOwnProperty.call(array, i)) {
      if (receiver == null) {
        iterator(array[i], i, array);
      } else {
        iterator.call(receiver, array[i], i, array);
      }
    }
  }
};
var forEachString = function forEachString2(string, iterator, receiver) {
  for (var i = 0, len = string.length; i < len; i++) {
    if (receiver == null) {
      iterator(string.charAt(i), i, string);
    } else {
      iterator.call(receiver, string.charAt(i), i, string);
    }
  }
};
var forEachObject = function forEachObject2(object, iterator, receiver) {
  for (var k in object) {
    if (hasOwnProperty.call(object, k)) {
      if (receiver == null) {
        iterator(object[k], k, object);
      } else {
        iterator.call(receiver, object[k], k, object);
      }
    }
  }
};
var forEach$2 = function forEach(list, iterator, thisArg) {
  if (!isCallable3(iterator)) {
    throw new TypeError("iterator must be a function");
  }
  var receiver;
  if (arguments.length >= 3) {
    receiver = thisArg;
  }
  if (toStr.call(list) === "[object Array]") {
    forEachArray(list, iterator, receiver);
  } else if (typeof list === "string") {
    forEachString(list, iterator, receiver);
  } else {
    forEachObject(list, iterator, receiver);
  }
};
var forEach_1 = forEach$2;
var possibleNames = [
  "BigInt64Array",
  "BigUint64Array",
  "Float32Array",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray"
];
var g$2 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var availableTypedArrays$2 = function availableTypedArrays() {
  var out = [];
  for (var i = 0; i < possibleNames.length; i++) {
    if (typeof g$2[possibleNames[i]] === "function") {
      out[out.length] = possibleNames[i];
    }
  }
  return out;
};
var GetIntrinsic2 = getIntrinsic;
var $gOPD = GetIntrinsic2("%Object.getOwnPropertyDescriptor%", true);
if ($gOPD) {
  try {
    $gOPD([], "length");
  } catch (e) {
    $gOPD = null;
  }
}
var gopd = $gOPD;
var forEach$1 = forEach_1;
var availableTypedArrays$1 = availableTypedArrays$2;
var callBound$1 = callBound$3;
var $toString$1 = callBound$1("Object.prototype.toString");
var hasToStringTag$1 = shams();
var gOPD$1 = gopd;
var g$1 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var typedArrays$1 = availableTypedArrays$1();
var $indexOf = callBound$1("Array.prototype.indexOf", true) || function indexOf(array, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
};
var $slice$1 = callBound$1("String.prototype.slice");
var toStrTags$1 = {};
var getPrototypeOf$1 = Object.getPrototypeOf;
if (hasToStringTag$1 && gOPD$1 && getPrototypeOf$1) {
  forEach$1(typedArrays$1, function(typedArray) {
    var arr = new g$1[typedArray]();
    if (Symbol.toStringTag in arr) {
      var proto = getPrototypeOf$1(arr);
      var descriptor = gOPD$1(proto, Symbol.toStringTag);
      if (!descriptor) {
        var superProto = getPrototypeOf$1(proto);
        descriptor = gOPD$1(superProto, Symbol.toStringTag);
      }
      toStrTags$1[typedArray] = descriptor.get;
    }
  });
}
var tryTypedArrays$1 = function tryAllTypedArrays(value) {
  var anyTrue = false;
  forEach$1(toStrTags$1, function(getter, typedArray) {
    if (!anyTrue) {
      try {
        anyTrue = getter.call(value) === typedArray;
      } catch (e) {
      }
    }
  });
  return anyTrue;
};
var isTypedArray$1 = function isTypedArray(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (!hasToStringTag$1 || !(Symbol.toStringTag in value)) {
    var tag = $slice$1($toString$1(value), 8, -1);
    return $indexOf(typedArrays$1, tag) > -1;
  }
  if (!gOPD$1) {
    return false;
  }
  return tryTypedArrays$1(value);
};
var forEach2 = forEach_1;
var availableTypedArrays2 = availableTypedArrays$2;
var callBound = callBound$3;
var gOPD = gopd;
var $toString = callBound("Object.prototype.toString");
var hasToStringTag = shams();
var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays2();
var $slice = callBound("String.prototype.slice");
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf;
if (hasToStringTag && gOPD && getPrototypeOf) {
  forEach2(typedArrays, function(typedArray) {
    if (typeof g[typedArray] === "function") {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        toStrTags[typedArray] = descriptor.get;
      }
    }
  });
}
var tryTypedArrays = function tryAllTypedArrays2(value) {
  var foundName = false;
  forEach2(toStrTags, function(getter, typedArray) {
    if (!foundName) {
      try {
        var name = getter.call(value);
        if (name === typedArray) {
          foundName = name;
        }
      } catch (e) {
      }
    }
  });
  return foundName;
};
var isTypedArray2 = isTypedArray$1;
var whichTypedArray = function whichTypedArray2(value) {
  if (!isTypedArray2(value)) {
    return false;
  }
  if (!hasToStringTag || !(Symbol.toStringTag in value)) {
    return $slice($toString(value), 8, -1);
  }
  return tryTypedArrays(value);
};
(function(exports2) {
  var isArgumentsObject = isArguments3;
  var isGeneratorFunction$1 = isGeneratorFunction;
  var whichTypedArray$1 = whichTypedArray;
  var isTypedArray3 = isTypedArray$1;
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var BigIntSupported = typeof BigInt !== "undefined";
  var SymbolSupported = typeof Symbol !== "undefined";
  var ObjectToString = uncurryThis(Object.prototype.toString);
  var numberValue = uncurryThis(Number.prototype.valueOf);
  var stringValue = uncurryThis(String.prototype.valueOf);
  var booleanValue = uncurryThis(Boolean.prototype.valueOf);
  if (BigIntSupported) {
    var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
  }
  if (SymbolSupported) {
    var symbolValue = uncurryThis(Symbol.prototype.valueOf);
  }
  function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") {
      return false;
    }
    try {
      prototypeValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  exports2.isArgumentsObject = isArgumentsObject;
  exports2.isGeneratorFunction = isGeneratorFunction$1;
  exports2.isTypedArray = isTypedArray3;
  function isPromise(input) {
    return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
  }
  exports2.isPromise = isPromise;
  function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      return ArrayBuffer.isView(value);
    }
    return isTypedArray3(value) || isDataView(value);
  }
  exports2.isArrayBufferView = isArrayBufferView;
  function isUint8Array(value) {
    return whichTypedArray$1(value) === "Uint8Array";
  }
  exports2.isUint8Array = isUint8Array;
  function isUint8ClampedArray(value) {
    return whichTypedArray$1(value) === "Uint8ClampedArray";
  }
  exports2.isUint8ClampedArray = isUint8ClampedArray;
  function isUint16Array(value) {
    return whichTypedArray$1(value) === "Uint16Array";
  }
  exports2.isUint16Array = isUint16Array;
  function isUint32Array(value) {
    return whichTypedArray$1(value) === "Uint32Array";
  }
  exports2.isUint32Array = isUint32Array;
  function isInt8Array(value) {
    return whichTypedArray$1(value) === "Int8Array";
  }
  exports2.isInt8Array = isInt8Array;
  function isInt16Array(value) {
    return whichTypedArray$1(value) === "Int16Array";
  }
  exports2.isInt16Array = isInt16Array;
  function isInt32Array(value) {
    return whichTypedArray$1(value) === "Int32Array";
  }
  exports2.isInt32Array = isInt32Array;
  function isFloat32Array(value) {
    return whichTypedArray$1(value) === "Float32Array";
  }
  exports2.isFloat32Array = isFloat32Array;
  function isFloat64Array(value) {
    return whichTypedArray$1(value) === "Float64Array";
  }
  exports2.isFloat64Array = isFloat64Array;
  function isBigInt64Array(value) {
    return whichTypedArray$1(value) === "BigInt64Array";
  }
  exports2.isBigInt64Array = isBigInt64Array;
  function isBigUint64Array(value) {
    return whichTypedArray$1(value) === "BigUint64Array";
  }
  exports2.isBigUint64Array = isBigUint64Array;
  function isMapToString(value) {
    return ObjectToString(value) === "[object Map]";
  }
  isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
  function isMap(value) {
    if (typeof Map === "undefined") {
      return false;
    }
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
  }
  exports2.isMap = isMap;
  function isSetToString(value) {
    return ObjectToString(value) === "[object Set]";
  }
  isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
  function isSet(value) {
    if (typeof Set === "undefined") {
      return false;
    }
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
  }
  exports2.isSet = isSet;
  function isWeakMapToString(value) {
    return ObjectToString(value) === "[object WeakMap]";
  }
  isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
  function isWeakMap(value) {
    if (typeof WeakMap === "undefined") {
      return false;
    }
    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
  }
  exports2.isWeakMap = isWeakMap;
  function isWeakSetToString(value) {
    return ObjectToString(value) === "[object WeakSet]";
  }
  isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
  function isWeakSet(value) {
    return isWeakSetToString(value);
  }
  exports2.isWeakSet = isWeakSet;
  function isArrayBufferToString(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
  }
  isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
  function isArrayBuffer(value) {
    if (typeof ArrayBuffer === "undefined") {
      return false;
    }
    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
  }
  exports2.isArrayBuffer = isArrayBuffer;
  function isDataViewToString(value) {
    return ObjectToString(value) === "[object DataView]";
  }
  isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
  function isDataView(value) {
    if (typeof DataView === "undefined") {
      return false;
    }
    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
  }
  exports2.isDataView = isDataView;
  var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
  function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
  }
  function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBufferCopy === "undefined") {
      return false;
    }
    if (typeof isSharedArrayBufferToString.working === "undefined") {
      isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
    }
    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
  }
  exports2.isSharedArrayBuffer = isSharedArrayBuffer;
  function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
  }
  exports2.isAsyncFunction = isAsyncFunction;
  function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
  }
  exports2.isMapIterator = isMapIterator;
  function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
  }
  exports2.isSetIterator = isSetIterator;
  function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
  }
  exports2.isGeneratorObject = isGeneratorObject;
  function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
  }
  exports2.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
  function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
  }
  exports2.isNumberObject = isNumberObject;
  function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
  }
  exports2.isStringObject = isStringObject;
  function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
  }
  exports2.isBooleanObject = isBooleanObject;
  function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
  }
  exports2.isBigIntObject = isBigIntObject;
  function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
  }
  exports2.isSymbolObject = isSymbolObject;
  function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
  }
  exports2.isBoxedPrimitive = isBoxedPrimitive;
  function isAnyArrayBuffer(value) {
    return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
  }
  exports2.isAnyArrayBuffer = isAnyArrayBuffer;
  ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
    Object.defineProperty(exports2, method, {
      enumerable: false,
      value: function() {
        throw new Error(method + " is not supported in userland");
      }
    });
  });
})(types);
var isBufferBrowser = function isBuffer(arg) {
  return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
};
(function(exports2) {
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };
  var formatRegExp = /%[sdj%]/g;
  exports2.format = function(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x2) {
      if (x2 === "%%")
        return "%";
      if (i >= len)
        return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += " " + x;
      } else {
        str += " " + inspect(x);
      }
    }
    return str;
  };
  exports2.deprecate = function(fn, msg) {
    if (typeof process !== "undefined" && process.noDeprecation === true) {
      return fn;
    }
    if (typeof process === "undefined") {
      return function() {
        return exports2.deprecate(fn, msg).apply(this, arguments);
      };
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  };
  var debugs = {};
  var debugEnvRegex = /^$/;
  if ({ "TERM_SESSION_ID": "bc90c290-89cf-42cd-b7b3-9effdd1cd641", "GJS_DEBUG_TOPICS": "JS ERROR;JS LOG", "LESSOPEN": "| /usr/bin/lesspipe %s", "LANGUAGE": "en_CA:en", "SNAP_INSTANCE_KEY": "", "J2SDKDIR": "/usr/lib/jvm/java-14-oracle", "USER": "brandon", "SNAP_COMMON": "/var/snap/intellij-idea-ultimate/common", "npm_config_user_agent": "npm/8.12.1 node/v18.4.0 linux x64 workspaces/false", "XDG_SESSION_TYPE": "wayland", "npm_node_execpath": "/home/brandon/.nvm/versions/node/v18.4.0/bin/node", "J2REDIR": "/usr/lib/jvm/java-14-oracle", "SHLVL": "1", "npm_config_noproxy": "", "HOME": "/home/brandon", "SNAP_LIBRARY_PATH": "/var/lib/snapd/lib/gl:/var/lib/snapd/lib/gl32:/var/lib/snapd/void", "DESKTOP_SESSION": "ubuntu", "SNAP_USER_DATA": "/home/brandon/snap/intellij-idea-ultimate/430", "NVM_BIN": "/home/brandon/.nvm/versions/node/v18.4.0/bin", "npm_package_json": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/package.json", "NVM_INC": "/home/brandon/.nvm/versions/node/v18.4.0/include/node", "TERMINAL_EMULATOR": "JetBrains-JediTerm", "rvm_stored_umask": "0002", "GIO_LAUNCHED_DESKTOP_FILE": "/var/lib/snapd/desktop/applications/intellij-idea-ultimate_intellij-idea-ultimate.desktop", "GNOME_SHELL_SESSION_MODE": "ubuntu", "GTK_MODULES": "gail:atk-bridge", "rvm_user_install_flag": "1", "MANAGERPID": "4527", "npm_config_userconfig": "/home/brandon/.npmrc", "npm_config_local_prefix": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "SYSTEMD_EXEC_PID": "4844", "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/1000/bus", "SNAP_REVISION": "430", "GIO_LAUNCHED_DESKTOP_FILE_PID": "80774", "COLOR": "1", "NVM_DIR": "/home/brandon/.nvm", "npm_config_metrics_registry": "https://registry.npmjs.org/", "IM_CONFIG_PHASE": "1", "WAYLAND_DISPLAY": "wayland-0", "LOGNAME": "brandon", "SNAP_CONTEXT": "BJh9fMWr-vwscpCn3aHjUPLFrSXawDJ3gQh4I3XDh_9qFgFBBH6V", "rvm_bin_path": "/home/brandon/.rvm/bin", "JOURNAL_STREAM": "8:66838", "_": "/home/brandon/.nvm/versions/node/v18.4.0/bin/npm", "npm_config_prefix": "/home/brandon/.nvm/versions/node/v18.4.0", "RUBY_VERSION": "ruby-3.0.0", "XDG_SESSION_CLASS": "user", "SNAP_VERSION": "2023.1.2", "IRBRC": "/home/brandon/.rvm/rubies/ruby-3.0.0/.irbrc", "USERNAME": "brandon", "TERM": "xterm-256color", "npm_config_cache": "/home/brandon/.npm", "GNOME_DESKTOP_SESSION_ID": "this-is-deprecated", "DOTNET_ROOT": "/usr/lib/dotnet", "RBENV_SHELL": "bash", "SNAP_INSTANCE_NAME": "intellij-idea-ultimate", "npm_config_node_gyp": "/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", "PATH": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/node_modules/.bin:/Data/Work/blockchain/ideadao/configurator/Idea-nfts/node_modules/.bin:/Data/Work/blockchain/ideadao/configurator/node_modules/.bin:/Data/Work/blockchain/ideadao/node_modules/.bin:/Data/Work/blockchain/node_modules/.bin:/Data/Work/node_modules/.bin:/Data/node_modules/.bin:/node_modules/.bin:/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/brandon/.nvm/versions/node/v18.4.0/bin:/bin:/home/brandon/.nvm/versions/node/v18.4.0/bin:/home/brandon/.rbenv/shims:/home/brandon/.rbenv/bin:/home/brandon/.local/share/solana/install/active_release/bin:/home/brandon/.cargo/bin:/home/brandon/.local/share/solana/install/active_release/bin:/home/brandon/.rvm/gems/ruby-3.0.0/bin:/home/brandon/.rvm/gems/ruby-3.0.0@global/bin:/home/brandon/.rvm/rubies/ruby-3.0.0/bin:/home/brandon/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/brandon/.dotnet/tools:/usr/lib/jvm/java-14-oracle/bin:/usr/lib/jvm/java-14-oracle/db/bin:/home/brandon/.rvm/bin:/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/node_modules/.bin:/home/brandon/.rvm/bin", "SESSION_MANAGER": "local/brandon-MS-7B85:@/tmp/.ICE-unix/4822,unix/brandon-MS-7B85:/tmp/.ICE-unix/4822", "DERBY_HOME": "/usr/lib/jvm/java-14-oracle/db", "INVOCATION_ID": "f89c52985a254dd1a1bc1c183b2419d9", "NODE": "/home/brandon/.nvm/versions/node/v18.4.0/bin/node", "npm_package_name": "idea-create", "XDG_MENU_PREFIX": "gnome-", "BAMF_DESKTOP_FILE_HINT": "/var/lib/snapd/desktop/applications/intellij-idea-ultimate_intellij-idea-ultimate.desktop", "GNOME_SETUP_DISPLAY": ":1", "SNAP_DATA": "/var/snap/intellij-idea-ultimate/430", "XDG_RUNTIME_DIR": "/run/user/1000", "MY_RUBY_HOME": "/home/brandon/.rvm/rubies/ruby-3.0.0", "DISPLAY": ":0", "DESKTOP_STARTUP_ID": "IDEA-restart_TIME55719025", "LANG": "en_CA.UTF-8", "XDG_CURRENT_DESKTOP": "ubuntu:GNOME", "DOTNET_BUNDLE_EXTRACT_BASE_DIR": "/home/brandon/.cache/dotnet_bundle_extract", "XMODIFIERS": "@im=ibus", "XDG_SESSION_DESKTOP": "ubuntu", "XAUTHORITY": "/run/user/1000/.mutter-Xwaylandauth.9JLX61", "LS_COLORS": "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", "npm_lifecycle_script": "vite build", "SSH_AGENT_LAUNCHER": "gnome-keyring", "SNAP_USER_COMMON": "/home/brandon/snap/intellij-idea-ultimate/common", "SSH_AUTH_SOCK": "/run/user/1000/keyring/ssh", "SNAP_ARCH": "amd64", "SNAP_COOKIE": "BJh9fMWr-vwscpCn3aHjUPLFrSXawDJ3gQh4I3XDh_9qFgFBBH6V", "SHELL": "/bin/bash", "npm_package_version": "2.0.0", "npm_lifecycle_event": "build", "QT_ACCESSIBILITY": "1", "rvm_prefix": "/home/brandon", "SNAP_REEXEC": "", "rvm_loaded_flag": "1", "GDMSESSION": "ubuntu", "GEM_HOME": "/home/brandon/.rvm/gems/ruby-3.0.0", "LESSCLOSE": "/usr/bin/lesspipe %s %s", "SNAP_NAME": "intellij-idea-ultimate", "rvm_version": "1.29.12 (latest)", "_INTELLIJ_FORCE_PREPEND_PATH": "/bin:", "GJS_DEBUG_OUTPUT": "stderr", "QT_IM_MODULE": "ibus", "npm_config_globalconfig": "/home/brandon/.nvm/versions/node/v18.4.0/etc/npmrc", "npm_config_init_module": "/home/brandon/.npm-init.js", "JAVA_HOME": "/usr/lib/jvm/java-14-oracle", "PWD": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "GEM_PATH": "/home/brandon/.rvm/gems/ruby-3.0.0:/home/brandon/.rvm/gems/ruby-3.0.0@global", "npm_execpath": "/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/bin/npm-cli.js", "XDG_CONFIG_DIRS": "/etc/xdg/xdg-ubuntu:/etc/xdg", "SNAP_REAL_HOME": "/home/brandon", "NVM_CD_FLAGS": "", "FIG_JETBRAINS_SHELL_INTEGRATION": "1", "XDG_DATA_DIRS": "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", "npm_config_global_prefix": "/home/brandon/.nvm/versions/node/v18.4.0", "SNAP": "/snap/intellij-idea-ultimate/430", "npm_command": "run-script", "rvm_path": "/home/brandon/.rvm", "INIT_CWD": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "EDITOR": "vi", "NODE_ENV": "production" }.NODE_DEBUG) {
    var debugEnv = { "TERM_SESSION_ID": "bc90c290-89cf-42cd-b7b3-9effdd1cd641", "GJS_DEBUG_TOPICS": "JS ERROR;JS LOG", "LESSOPEN": "| /usr/bin/lesspipe %s", "LANGUAGE": "en_CA:en", "SNAP_INSTANCE_KEY": "", "J2SDKDIR": "/usr/lib/jvm/java-14-oracle", "USER": "brandon", "SNAP_COMMON": "/var/snap/intellij-idea-ultimate/common", "npm_config_user_agent": "npm/8.12.1 node/v18.4.0 linux x64 workspaces/false", "XDG_SESSION_TYPE": "wayland", "npm_node_execpath": "/home/brandon/.nvm/versions/node/v18.4.0/bin/node", "J2REDIR": "/usr/lib/jvm/java-14-oracle", "SHLVL": "1", "npm_config_noproxy": "", "HOME": "/home/brandon", "SNAP_LIBRARY_PATH": "/var/lib/snapd/lib/gl:/var/lib/snapd/lib/gl32:/var/lib/snapd/void", "DESKTOP_SESSION": "ubuntu", "SNAP_USER_DATA": "/home/brandon/snap/intellij-idea-ultimate/430", "NVM_BIN": "/home/brandon/.nvm/versions/node/v18.4.0/bin", "npm_package_json": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/package.json", "NVM_INC": "/home/brandon/.nvm/versions/node/v18.4.0/include/node", "TERMINAL_EMULATOR": "JetBrains-JediTerm", "rvm_stored_umask": "0002", "GIO_LAUNCHED_DESKTOP_FILE": "/var/lib/snapd/desktop/applications/intellij-idea-ultimate_intellij-idea-ultimate.desktop", "GNOME_SHELL_SESSION_MODE": "ubuntu", "GTK_MODULES": "gail:atk-bridge", "rvm_user_install_flag": "1", "MANAGERPID": "4527", "npm_config_userconfig": "/home/brandon/.npmrc", "npm_config_local_prefix": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "SYSTEMD_EXEC_PID": "4844", "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/1000/bus", "SNAP_REVISION": "430", "GIO_LAUNCHED_DESKTOP_FILE_PID": "80774", "COLOR": "1", "NVM_DIR": "/home/brandon/.nvm", "npm_config_metrics_registry": "https://registry.npmjs.org/", "IM_CONFIG_PHASE": "1", "WAYLAND_DISPLAY": "wayland-0", "LOGNAME": "brandon", "SNAP_CONTEXT": "BJh9fMWr-vwscpCn3aHjUPLFrSXawDJ3gQh4I3XDh_9qFgFBBH6V", "rvm_bin_path": "/home/brandon/.rvm/bin", "JOURNAL_STREAM": "8:66838", "_": "/home/brandon/.nvm/versions/node/v18.4.0/bin/npm", "npm_config_prefix": "/home/brandon/.nvm/versions/node/v18.4.0", "RUBY_VERSION": "ruby-3.0.0", "XDG_SESSION_CLASS": "user", "SNAP_VERSION": "2023.1.2", "IRBRC": "/home/brandon/.rvm/rubies/ruby-3.0.0/.irbrc", "USERNAME": "brandon", "TERM": "xterm-256color", "npm_config_cache": "/home/brandon/.npm", "GNOME_DESKTOP_SESSION_ID": "this-is-deprecated", "DOTNET_ROOT": "/usr/lib/dotnet", "RBENV_SHELL": "bash", "SNAP_INSTANCE_NAME": "intellij-idea-ultimate", "npm_config_node_gyp": "/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", "PATH": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/node_modules/.bin:/Data/Work/blockchain/ideadao/configurator/Idea-nfts/node_modules/.bin:/Data/Work/blockchain/ideadao/configurator/node_modules/.bin:/Data/Work/blockchain/ideadao/node_modules/.bin:/Data/Work/blockchain/node_modules/.bin:/Data/Work/node_modules/.bin:/Data/node_modules/.bin:/node_modules/.bin:/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/home/brandon/.nvm/versions/node/v18.4.0/bin:/bin:/home/brandon/.nvm/versions/node/v18.4.0/bin:/home/brandon/.rbenv/shims:/home/brandon/.rbenv/bin:/home/brandon/.local/share/solana/install/active_release/bin:/home/brandon/.cargo/bin:/home/brandon/.local/share/solana/install/active_release/bin:/home/brandon/.rvm/gems/ruby-3.0.0/bin:/home/brandon/.rvm/gems/ruby-3.0.0@global/bin:/home/brandon/.rvm/rubies/ruby-3.0.0/bin:/home/brandon/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/brandon/.dotnet/tools:/usr/lib/jvm/java-14-oracle/bin:/usr/lib/jvm/java-14-oracle/db/bin:/home/brandon/.rvm/bin:/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend/node_modules/.bin:/home/brandon/.rvm/bin", "SESSION_MANAGER": "local/brandon-MS-7B85:@/tmp/.ICE-unix/4822,unix/brandon-MS-7B85:/tmp/.ICE-unix/4822", "DERBY_HOME": "/usr/lib/jvm/java-14-oracle/db", "INVOCATION_ID": "f89c52985a254dd1a1bc1c183b2419d9", "NODE": "/home/brandon/.nvm/versions/node/v18.4.0/bin/node", "npm_package_name": "idea-create", "XDG_MENU_PREFIX": "gnome-", "BAMF_DESKTOP_FILE_HINT": "/var/lib/snapd/desktop/applications/intellij-idea-ultimate_intellij-idea-ultimate.desktop", "GNOME_SETUP_DISPLAY": ":1", "SNAP_DATA": "/var/snap/intellij-idea-ultimate/430", "XDG_RUNTIME_DIR": "/run/user/1000", "MY_RUBY_HOME": "/home/brandon/.rvm/rubies/ruby-3.0.0", "DISPLAY": ":0", "DESKTOP_STARTUP_ID": "IDEA-restart_TIME55719025", "LANG": "en_CA.UTF-8", "XDG_CURRENT_DESKTOP": "ubuntu:GNOME", "DOTNET_BUNDLE_EXTRACT_BASE_DIR": "/home/brandon/.cache/dotnet_bundle_extract", "XMODIFIERS": "@im=ibus", "XDG_SESSION_DESKTOP": "ubuntu", "XAUTHORITY": "/run/user/1000/.mutter-Xwaylandauth.9JLX61", "LS_COLORS": "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", "npm_lifecycle_script": "vite build", "SSH_AGENT_LAUNCHER": "gnome-keyring", "SNAP_USER_COMMON": "/home/brandon/snap/intellij-idea-ultimate/common", "SSH_AUTH_SOCK": "/run/user/1000/keyring/ssh", "SNAP_ARCH": "amd64", "SNAP_COOKIE": "BJh9fMWr-vwscpCn3aHjUPLFrSXawDJ3gQh4I3XDh_9qFgFBBH6V", "SHELL": "/bin/bash", "npm_package_version": "2.0.0", "npm_lifecycle_event": "build", "QT_ACCESSIBILITY": "1", "rvm_prefix": "/home/brandon", "SNAP_REEXEC": "", "rvm_loaded_flag": "1", "GDMSESSION": "ubuntu", "GEM_HOME": "/home/brandon/.rvm/gems/ruby-3.0.0", "LESSCLOSE": "/usr/bin/lesspipe %s %s", "SNAP_NAME": "intellij-idea-ultimate", "rvm_version": "1.29.12 (latest)", "_INTELLIJ_FORCE_PREPEND_PATH": "/bin:", "GJS_DEBUG_OUTPUT": "stderr", "QT_IM_MODULE": "ibus", "npm_config_globalconfig": "/home/brandon/.nvm/versions/node/v18.4.0/etc/npmrc", "npm_config_init_module": "/home/brandon/.npm-init.js", "JAVA_HOME": "/usr/lib/jvm/java-14-oracle", "PWD": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "GEM_PATH": "/home/brandon/.rvm/gems/ruby-3.0.0:/home/brandon/.rvm/gems/ruby-3.0.0@global", "npm_execpath": "/home/brandon/.nvm/versions/node/v18.4.0/lib/node_modules/npm/bin/npm-cli.js", "XDG_CONFIG_DIRS": "/etc/xdg/xdg-ubuntu:/etc/xdg", "SNAP_REAL_HOME": "/home/brandon", "NVM_CD_FLAGS": "", "FIG_JETBRAINS_SHELL_INTEGRATION": "1", "XDG_DATA_DIRS": "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", "npm_config_global_prefix": "/home/brandon/.nvm/versions/node/v18.4.0", "SNAP": "/snap/intellij-idea-ultimate/430", "npm_command": "run-script", "rvm_path": "/home/brandon/.rvm", "INIT_CWD": "/Data/Work/blockchain/ideadao/configurator/Idea-nfts/Painter-Frontend", "EDITOR": "vi", "NODE_ENV": "production" }.NODE_DEBUG;
    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
    debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
  }
  exports2.debuglog = function(set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (debugEnvRegex.test(set)) {
        var pid = process.pid;
        debugs[set] = function() {
          var msg = exports2.format.apply(exports2, arguments);
          console.error("%s %d: %s", set, pid, msg);
        };
      } else {
        debugs[set] = function() {
        };
      }
    }
    return debugs[set];
  };
  function inspect(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3)
      ctx.depth = arguments[2];
    if (arguments.length >= 4)
      ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      exports2._extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden))
      ctx.showHidden = false;
    if (isUndefined(ctx.depth))
      ctx.depth = 2;
    if (isUndefined(ctx.colors))
      ctx.colors = false;
    if (isUndefined(ctx.customInspect))
      ctx.customInspect = true;
    if (ctx.colors)
      ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports2.inspect = inspect;
  inspect.colors = {
    "bold": [1, 22],
    "italic": [3, 23],
    "underline": [4, 24],
    "inverse": [7, 27],
    "white": [37, 39],
    "grey": [90, 39],
    "black": [30, 39],
    "blue": [34, 39],
    "cyan": [36, 39],
    "green": [32, 39],
    "magenta": [35, 39],
    "red": [31, 39],
    "yellow": [33, 39]
  };
  inspect.styles = {
    "special": "cyan",
    "number": "yellow",
    "boolean": "yellow",
    "undefined": "grey",
    "null": "bold",
    "string": "green",
    "date": "magenta",
    // "name": intentionally not styling
    "regexp": "red"
  };
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) {
      return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash2 = {};
    array.forEach(function(val, idx) {
      hash2[val] = true;
    });
    return hash2;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== exports2.inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError(value);
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    var base = "", array = false, braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : "";
      base = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value))
      return ctx.stylize("" + value, "number");
    if (isBoolean(value))
      return ctx.stylize("" + value, "boolean");
    if (isNull(value))
      return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty2(value, String(i))) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          String(i),
          true
        ));
      } else {
        output.push("");
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          key,
          true
        ));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty2(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").slice(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.slice(1, -1);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf("\n") >= 0)
        ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  exports2.types = types;
  function isArray(ar) {
    return Array.isArray(ar);
  }
  exports2.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  exports2.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  exports2.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports2.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  exports2.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  exports2.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  exports2.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  exports2.isUndefined = isUndefined;
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  exports2.isRegExp = isRegExp;
  exports2.types.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports2.isObject = isObject;
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  exports2.isDate = isDate;
  exports2.types.isDate = isDate;
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  exports2.isError = isError;
  exports2.types.isNativeError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  exports2.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
  }
  exports2.isPrimitive = isPrimitive;
  exports2.isBuffer = isBufferBrowser;
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function timestamp() {
    var d = /* @__PURE__ */ new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  exports2.log = function() {
    console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
  };
  exports2.inherits = inherits_browserExports;
  exports2._extend = function(origin, add) {
    if (!add || !isObject(add))
      return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  };
  function hasOwnProperty2(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
  exports2.promisify = function promisify(original) {
    if (typeof original !== "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      var fn = original[kCustomPromisifiedSymbol];
      if (typeof fn !== "function") {
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      }
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn;
    }
    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function(resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
      });
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      args.push(function(err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });
      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol)
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
    return Object.defineProperties(
      fn,
      getOwnPropertyDescriptors(original)
    );
  };
  exports2.promisify.custom = kCustomPromisifiedSymbol;
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      var newReason = new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify(original) {
    if (typeof original !== "function") {
      throw new TypeError('The "original" argument must be of type Function');
    }
    function callbackified() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      var maybeCb = args.pop();
      if (typeof maybeCb !== "function") {
        throw new TypeError("The last argument must be of type Function");
      }
      var self2 = this;
      var cb = function() {
        return maybeCb.apply(self2, arguments);
      };
      original.apply(this, args).then(
        function(ret) {
          process.nextTick(cb.bind(null, null, ret));
        },
        function(rej) {
          process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
        }
      );
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(
      callbackified,
      getOwnPropertyDescriptors(original)
    );
    return callbackified;
  }
  exports2.callbackify = callbackify;
})(util);
var buffer_list;
var hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list)
    return buffer_list;
  hasRequiredBuffer_list = 1;
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var _require = buffer, Buffer2 = _require.Buffer;
  var _require2 = util, inspect = _require2.inspect;
  var custom = inspect && inspect.custom || "inspect";
  function copyBuffer(src2, target, offset) {
    Buffer2.prototype.copy.call(src2, target, offset);
  }
  buffer_list = /* @__PURE__ */ function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass(BufferList, [{
      key: "push",
      value: function push(v) {
        var entry = {
          data: v,
          next: null
        };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      }
    }, {
      key: "unshift",
      value: function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
    }, {
      key: "join",
      value: function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next)
          ret += s + p.data;
        return ret;
      }
    }, {
      key: "concat",
      value: function concat(n) {
        if (this.length === 0)
          return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function consume(n, hasStrings) {
        var ret;
        if (n < this.head.data.length) {
          ret = this.head.data.slice(0, n);
          this.head.data = this.head.data.slice(n);
        } else if (n === this.head.data.length) {
          ret = this.shift();
        } else {
          ret = hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        return ret;
      }
    }, {
      key: "first",
      value: function first() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function _getString(n) {
        var p = this.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length)
            ret += str;
          else
            ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function _getBuffer(n) {
        var ret = Buffer2.allocUnsafe(n);
        var p = this.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: custom,
      value: function value(_, options) {
        return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: false
        }));
      }
    }]);
    return BufferList;
  }();
  return buffer_list;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy)
    return destroy_1;
  hasRequiredDestroy = 1;
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          process.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          process.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      } else if (cb) {
        process.nextTick(emitCloseNT, _this);
        cb(err2);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    });
    return this;
  }
  function emitErrorAndCloseNT(self2, err) {
    emitErrorNT(self2, err);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    if (self2._writableState && !self2._writableState.emitClose)
      return;
    if (self2._readableState && !self2._readableState.emitClose)
      return;
    self2.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  function errorOrDestroy(stream, err) {
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy)
      stream.destroy(err);
    else
      stream.emit("error", err);
  }
  destroy_1 = {
    destroy,
    undestroy,
    errorOrDestroy
  };
  return destroy_1;
}
var errorsBrowser = {};
var hasRequiredErrorsBrowser;
function requireErrorsBrowser() {
  if (hasRequiredErrorsBrowser)
    return errorsBrowser;
  hasRequiredErrorsBrowser = 1;
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var codes = {};
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }
    var NodeError = /* @__PURE__ */ function(_Base) {
      _inheritsLoose(NodeError2, _Base);
      function NodeError2(arg1, arg2, arg3) {
        return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
      }
      return NodeError2;
    }(Base);
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      var len = expected.length;
      expected = expected.map(function(i) {
        return String(i);
      });
      if (len > 2) {
        return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
      } else if (len === 2) {
        return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
      } else {
        return "of ".concat(thing, " ").concat(expected[0]);
      }
    } else {
      return "of ".concat(thing, " ").concat(String(expected));
    }
  }
  function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  }
  function endsWith(str, search, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
  }
  function includes(str, search, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search.length > str.length) {
      return false;
    } else {
      return str.indexOf(search, start) !== -1;
    }
  }
  createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    var determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else {
      determiner = "must be";
    }
    var msg;
    if (endsWith(name, " argument")) {
      msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    } else {
      var type = includes(name, ".") ? "property" : "argument";
      msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    }
    msg += ". Received type ".concat(typeof actual);
    return msg;
  }, TypeError);
  createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
  });
  createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
  });
  createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
  }, TypeError);
  createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  errorsBrowser.codes = codes;
  return errorsBrowser;
}
var state;
var hasRequiredState;
function requireState() {
  if (hasRequiredState)
    return state;
  hasRequiredState = 1;
  var ERR_INVALID_OPT_VALUE = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getHighWaterMark(state2, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
        var name = isDuplex ? duplexKey : "highWaterMark";
        throw new ERR_INVALID_OPT_VALUE(name, hwm);
      }
      return Math.floor(hwm);
    }
    return state2.objectMode ? 16 : 16 * 1024;
  }
  state = {
    getHighWaterMark
  };
  return state;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  browser = deprecate;
  function deprecate(fn, msg) {
    if (config("noDeprecation")) {
      return fn;
    }
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (config("throwDeprecation")) {
          throw new Error(msg);
        } else if (config("traceDeprecation")) {
          console.trace(msg);
        } else {
          console.warn(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function config(name) {
    try {
      if (!commonjsGlobal.localStorage)
        return false;
    } catch (_) {
      return false;
    }
    var val = commonjsGlobal.localStorage[name];
    if (null == val)
      return false;
    return String(val).toLowerCase() === "true";
  }
  return browser;
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  _stream_writable = Writable;
  function CorkedRequest(state2) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state2);
    };
  }
  var Duplex;
  Writable.WritableState = WritableState;
  var internalUtil = {
    deprecate: requireBrowser()
  };
  var Stream = requireStreamBrowser();
  var Buffer2 = buffer.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = requireErrorsBrowser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  inherits_browserExports(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function writableStateBufferGetter() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function value(object) {
        if (realHasInstance.call(this, object))
          return true;
        if (this !== Writable)
          return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function realHasInstance2(object) {
      return object instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require_stream_duplex();
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
      return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
  }
  function validChunk(stream, state2, chunk, cb) {
    var er;
    if (chunk === null) {
      er = new ERR_STREAM_NULL_VALUES();
    } else if (typeof chunk !== "string" && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    }
    if (er) {
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    var ret = false;
    var isBuf = !state2.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state2.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state2.ending)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state2, chunk, cb)) {
      state2.pendingcb++;
      ret = writeOrBuffer(this, state2, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    var state2 = this._writableState;
    if (state2.corked) {
      state2.corked--;
      if (!state2.writing && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest)
        clearBuffer(this, state2);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk(state2, chunk, encoding) {
    if (!state2.objectMode && state2.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream, state2, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state2, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state2.objectMode ? 1 : chunk.length;
    state2.length += len;
    var ret = state2.length < state2.highWaterMark;
    if (!ret)
      state2.needDrain = true;
    if (state2.writing || state2.corked) {
      var last = state2.lastBufferedRequest;
      state2.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state2.lastBufferedRequest;
      } else {
        state2.bufferedRequest = state2.lastBufferedRequest;
      }
      state2.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state2, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream, state2, writev, len, chunk, encoding, cb) {
    state2.writelen = len;
    state2.writecb = cb;
    state2.writing = true;
    state2.sync = true;
    if (state2.destroyed)
      state2.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev)
      stream._writev(chunk, state2.onwrite);
    else
      stream._write(chunk, encoding, state2.onwrite);
    state2.sync = false;
  }
  function onwriteError(stream, state2, sync, er, cb) {
    --state2.pendingcb;
    if (sync) {
      process.nextTick(cb, er);
      process.nextTick(finishMaybe, stream, state2);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
      finishMaybe(stream, state2);
    }
  }
  function onwriteStateUpdate(state2) {
    state2.writing = false;
    state2.writecb = null;
    state2.length -= state2.writelen;
    state2.writelen = 0;
  }
  function onwrite(stream, er) {
    var state2 = stream._writableState;
    var sync = state2.sync;
    var cb = state2.writecb;
    if (typeof cb !== "function")
      throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state2);
    if (er)
      onwriteError(stream, state2, sync, er, cb);
    else {
      var finished = needFinish(state2) || stream.destroyed;
      if (!finished && !state2.corked && !state2.bufferProcessing && state2.bufferedRequest) {
        clearBuffer(stream, state2);
      }
      if (sync) {
        process.nextTick(afterWrite, stream, state2, finished, cb);
      } else {
        afterWrite(stream, state2, finished, cb);
      }
    }
  }
  function afterWrite(stream, state2, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state2);
    state2.pendingcb--;
    cb();
    finishMaybe(stream, state2);
  }
  function onwriteDrain(stream, state2) {
    if (state2.length === 0 && state2.needDrain) {
      state2.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state2) {
    state2.bufferProcessing = true;
    var entry = state2.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state2.bufferedRequestCount;
      var buffer2 = new Array(l);
      var holder = state2.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer2[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer2.allBuffers = allBuffers;
      doWrite(stream, state2, true, state2.length, buffer2, "", holder.finish);
      state2.pendingcb++;
      state2.lastBufferedRequest = null;
      if (holder.next) {
        state2.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state2.corkedRequestsFree = new CorkedRequest(state2);
      }
      state2.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state2.objectMode ? 1 : chunk.length;
        doWrite(stream, state2, false, len, chunk, encoding, cb);
        entry = entry.next;
        state2.bufferedRequestCount--;
        if (state2.writing) {
          break;
        }
      }
      if (entry === null)
        state2.lastBufferedRequest = null;
    }
    state2.bufferedRequest = entry;
    state2.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state2 = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0)
      this.write(chunk, encoding);
    if (state2.corked) {
      state2.corked = 1;
      this.uncork();
    }
    if (!state2.ending)
      endWritable(this, state2, cb);
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish(state2) {
    return state2.ending && state2.length === 0 && state2.bufferedRequest === null && !state2.finished && !state2.writing;
  }
  function callFinal(stream, state2) {
    stream._final(function(err) {
      state2.pendingcb--;
      if (err) {
        errorOrDestroy(stream, err);
      }
      state2.prefinished = true;
      stream.emit("prefinish");
      finishMaybe(stream, state2);
    });
  }
  function prefinish(stream, state2) {
    if (!state2.prefinished && !state2.finalCalled) {
      if (typeof stream._final === "function" && !state2.destroyed) {
        state2.pendingcb++;
        state2.finalCalled = true;
        process.nextTick(callFinal, stream, state2);
      } else {
        state2.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream, state2) {
    var need = needFinish(state2);
    if (need) {
      prefinish(stream, state2);
      if (state2.pendingcb === 0) {
        state2.finished = true;
        stream.emit("finish");
        if (state2.autoDestroy) {
          var rState = stream._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) {
            stream.destroy();
          }
        }
      }
    }
    return need;
  }
  function endWritable(stream, state2, cb) {
    state2.ending = true;
    finishMaybe(stream, state2);
    if (cb) {
      if (state2.finished)
        process.nextTick(cb);
      else
        stream.once("finish", cb);
    }
    state2.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state2, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state2.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state2.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function set(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj)
      keys2.push(key);
    return keys2;
  };
  _stream_duplex = Duplex;
  var Readable = require_stream_readable();
  var Writable = require_stream_writable();
  inherits_browserExports(Duplex, Readable);
  {
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
      if (options.readable === false)
        this.readable = false;
      if (options.writable === false)
        this.writable = false;
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend);
      }
    }
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend() {
    if (this._writableState.ended)
      return;
    process.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  return _stream_duplex;
}
var string_decoder = {};
var Buffer$7 = requireSafeBuffer().Buffer;
var isEncoding = Buffer$7.isEncoding || function(encoding) {
  encoding = "" + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
    case "raw":
      return true;
    default:
      return false;
  }
};
function _normalizeEncoding(enc) {
  if (!enc)
    return "utf8";
  var retried;
  while (true) {
    switch (enc) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return enc;
      default:
        if (retried)
          return;
        enc = ("" + enc).toLowerCase();
        retried = true;
    }
  }
}
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== "string" && (Buffer$7.isEncoding === isEncoding || !isEncoding(enc)))
    throw new Error("Unknown encoding: " + enc);
  return nenc || enc;
}
string_decoder.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case "utf16le":
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case "utf8":
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case "base64":
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$7.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
  if (buf.length === 0)
    return "";
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === void 0)
      return "";
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length)
    return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || "";
};
StringDecoder.prototype.end = utf8End;
StringDecoder.prototype.text = utf8Text;
StringDecoder.prototype.fillLast = function(buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};
function utf8CheckByte(byte) {
  if (byte <= 127)
    return 0;
  else if (byte >> 5 === 6)
    return 2;
  else if (byte >> 4 === 14)
    return 3;
  else if (byte >> 3 === 30)
    return 4;
  return byte >> 6 === 2 ? -1 : -2;
}
function utf8CheckIncomplete(self2, buf, i) {
  var j = buf.length - 1;
  if (j < i)
    return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0)
      self2.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0)
      self2.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2)
    return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2)
        nb = 0;
      else
        self2.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}
function utf8CheckExtraBytes(self2, buf, p) {
  if ((buf[0] & 192) !== 128) {
    self2.lastNeed = 0;
    return "�";
  }
  if (self2.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 192) !== 128) {
      self2.lastNeed = 1;
      return "�";
    }
    if (self2.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 192) !== 128) {
        self2.lastNeed = 2;
        return "�";
      }
    }
  }
}
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf);
  if (r !== void 0)
    return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed)
    return buf.toString("utf8", i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString("utf8", i, end);
}
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed)
    return r + "�";
  return r;
}
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString("utf16le", i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 55296 && c <= 56319) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString("utf16le", i, buf.length - 1);
}
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString("utf16le", 0, end);
  }
  return r;
}
function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0)
    return buf.toString("base64", i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString("base64", i, buf.length - n);
}
function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : "";
  if (this.lastNeed)
    return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
  return r;
}
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}
function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : "";
}
var endOfStream;
var hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream)
    return endOfStream;
  hasRequiredEndOfStream = 1;
  var ERR_STREAM_PREMATURE_CLOSE = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function once(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      callback.apply(this, args);
    };
  }
  function noop() {
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function eos(stream, opts, callback) {
    if (typeof opts === "function")
      return eos(stream, null, opts);
    if (!opts)
      opts = {};
    callback = once(callback || noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish2() {
      if (!stream.writable)
        onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish2() {
      writable = false;
      writableEnded = true;
      if (!readable)
        callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend2() {
      readable = false;
      readableEnded = true;
      if (!writable)
        callback.call(stream);
    };
    var onerror = function onerror2(err) {
      callback.call(stream, err);
    };
    var onclose = function onclose2() {
      var err;
      if (readable && !readableEnded) {
        if (!stream._readableState || !stream._readableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
      if (writable && !writableEnded) {
        if (!stream._writableState || !stream._writableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
    };
    var onrequest = function onrequest2() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  }
  endOfStream = eos;
  return endOfStream;
}
var async_iterator;
var hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator)
    return async_iterator;
  hasRequiredAsync_iterator = 1;
  var _Object$setPrototypeO;
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var finished = requireEndOfStream();
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value, done) {
    return {
      value,
      done
    };
  }
  function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    process.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve(createIterResult(void 0, true));
          return;
        }
        iter[kHandlePromise](resolve, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error = this[kError];
      if (error !== null) {
        return Promise.reject(error);
      }
      if (this[kEnded]) {
        return Promise.resolve(createIterResult(void 0, true));
      }
      if (this[kStream].destroyed) {
        return new Promise(function(resolve, reject) {
          process.nextTick(function() {
            if (_this[kError]) {
              reject(_this[kError]);
            } else {
              resolve(createIterResult(void 0, true));
            }
          });
        });
      }
      var lastPromise = this[kLastPromise];
      var promise;
      if (lastPromise) {
        promise = new Promise(wrapForNext(lastPromise, this));
      } else {
        var data = this[kStream].read();
        if (data !== null) {
          return Promise.resolve(createIterResult(data, false));
        }
        promise = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise;
      return promise;
    }
  }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(createIterResult(void 0, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
      value: stream,
      writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kEnded, {
      value: stream._readableState.endEmitted,
      writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
      value: function value(resolve, reject) {
        var data = iterator[kStream].read();
        if (data) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(data, false));
        } else {
          iterator[kLastResolve] = resolve;
          iterator[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator[kLastReject];
        if (reject !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          reject(err);
        }
        iterator[kError] = err;
        return;
      }
      var resolve = iterator[kLastResolve];
      if (resolve !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(void 0, true));
      }
      iterator[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator));
    return iterator;
  };
  async_iterator = createReadableStreamAsyncIterator;
  return async_iterator;
}
var fromBrowser;
var hasRequiredFromBrowser;
function requireFromBrowser() {
  if (hasRequiredFromBrowser)
    return fromBrowser;
  hasRequiredFromBrowser = 1;
  fromBrowser = function() {
    throw new Error("Readable.from is not available in the browser");
  };
  return fromBrowser;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  _stream_readable = Readable;
  var Duplex;
  Readable.ReadableState = ReadableState;
  eventsExports.EventEmitter;
  var EElistenerCount = function EElistenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = requireStreamBrowser();
  var Buffer2 = buffer.Buffer;
  var OurUint8Array = (typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = util;
  var debug;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function debug2() {
    };
  }
  var BufferList = requireBuffer_list();
  var destroyImpl = requireDestroy();
  var _require = requireState(), getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = requireErrorsBrowser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder2;
  var createReadableStreamAsyncIterator;
  var from;
  inherits_browserExports(Readable, Stream);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream, isDuplex) {
    Duplex = Duplex || require_stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder2)
        StringDecoder2 = string_decoder.StringDecoder;
      this.decoder = new StringDecoder2(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require_stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function set(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state2 = this._readableState;
    var skipChunkCheck;
    if (!state2.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state2.defaultEncoding;
        if (encoding !== state2.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state2 = stream._readableState;
    if (chunk === null) {
      state2.reading = false;
      onEofChunk(stream, state2);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state2, chunk);
      if (er) {
        errorOrDestroy(stream, er);
      } else if (state2.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state2.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state2.endEmitted)
            errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else
            addChunk(stream, state2, chunk, true);
        } else if (state2.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state2.destroyed) {
          return false;
        } else {
          state2.reading = false;
          if (state2.decoder && !encoding) {
            chunk = state2.decoder.write(chunk);
            if (state2.objectMode || chunk.length !== 0)
              addChunk(stream, state2, chunk, false);
            else
              maybeReadMore(stream, state2);
          } else {
            addChunk(stream, state2, chunk, false);
          }
        }
      } else if (!addToFront) {
        state2.reading = false;
        maybeReadMore(stream, state2);
      }
    }
    return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
  }
  function addChunk(stream, state2, chunk, addToFront) {
    if (state2.flowing && state2.length === 0 && !state2.sync) {
      state2.awaitDrain = 0;
      stream.emit("data", chunk);
    } else {
      state2.length += state2.objectMode ? 1 : chunk.length;
      if (addToFront)
        state2.buffer.unshift(chunk);
      else
        state2.buffer.push(chunk);
      if (state2.needReadable)
        emitReadable(stream);
    }
    maybeReadMore(stream, state2);
  }
  function chunkInvalid(state2, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state2.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
    }
    return er;
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder2)
      StringDecoder2 = string_decoder.StringDecoder;
    var decoder = new StringDecoder2(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "")
      this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state2) {
    if (n <= 0 || state2.length === 0 && state2.ended)
      return 0;
    if (state2.objectMode)
      return 1;
    if (n !== n) {
      if (state2.flowing && state2.length)
        return state2.buffer.head.data.length;
      else
        return state2.length;
    }
    if (n > state2.highWaterMark)
      state2.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state2.length)
      return n;
    if (!state2.ended) {
      state2.needReadable = true;
      return 0;
    }
    return state2.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state2 = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state2.emittedReadable = false;
    if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
      debug("read: emitReadable", state2.length, state2.ended);
      if (state2.length === 0 && state2.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state2);
    if (n === 0 && state2.ended) {
      if (state2.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state2.needReadable;
    debug("need readable", doRead);
    if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state2.ended || state2.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state2.reading = true;
      state2.sync = true;
      if (state2.length === 0)
        state2.needReadable = true;
      this._read(state2.highWaterMark);
      state2.sync = false;
      if (!state2.reading)
        n = howMuchToRead(nOrig, state2);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state2);
    else
      ret = null;
    if (ret === null) {
      state2.needReadable = state2.length <= state2.highWaterMark;
      n = 0;
    } else {
      state2.length -= n;
      state2.awaitDrain = 0;
    }
    if (state2.length === 0) {
      if (!state2.ended)
        state2.needReadable = true;
      if (nOrig !== n && state2.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream, state2) {
    debug("onEofChunk");
    if (state2.ended)
      return;
    if (state2.decoder) {
      var chunk = state2.decoder.end();
      if (chunk && chunk.length) {
        state2.buffer.push(chunk);
        state2.length += state2.objectMode ? 1 : chunk.length;
      }
    }
    state2.ended = true;
    if (state2.sync) {
      emitReadable(stream);
    } else {
      state2.needReadable = false;
      if (!state2.emittedReadable) {
        state2.emittedReadable = true;
        emitReadable_(stream);
      }
    }
  }
  function emitReadable(stream) {
    var state2 = stream._readableState;
    debug("emitReadable", state2.needReadable, state2.emittedReadable);
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      debug("emitReadable", state2.flowing);
      state2.emittedReadable = true;
      process.nextTick(emitReadable_, stream);
    }
  }
  function emitReadable_(stream) {
    var state2 = stream._readableState;
    debug("emitReadable_", state2.destroyed, state2.length, state2.ended);
    if (!state2.destroyed && (state2.length || state2.ended)) {
      stream.emit("readable");
      state2.emittedReadable = false;
    }
    state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
    flow(stream);
  }
  function maybeReadMore(stream, state2) {
    if (!state2.readingMore) {
      state2.readingMore = true;
      process.nextTick(maybeReadMore_, stream, state2);
    }
  }
  function maybeReadMore_(stream, state2) {
    while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
      var len = state2.length;
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state2.length)
        break;
    }
    state2.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src2 = this;
    var state2 = this._readableState;
    switch (state2.pipesCount) {
      case 0:
        state2.pipes = dest;
        break;
      case 1:
        state2.pipes = [state2.pipes, dest];
        break;
      default:
        state2.pipes.push(dest);
        break;
    }
    state2.pipesCount += 1;
    debug("pipe count=%d opts=%j", state2.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state2.endEmitted)
      process.nextTick(endFn);
    else
      src2.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug("onunpipe");
      if (readable === src2) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src2);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src2.removeListener("end", onend);
      src2.removeListener("end", unpipe);
      src2.removeListener("data", ondata);
      cleanedUp = true;
      if (state2.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    src2.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        if ((state2.pipesCount === 1 && state2.pipes === dest || state2.pipesCount > 1 && indexOf2(state2.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state2.awaitDrain);
          state2.awaitDrain++;
        }
        src2.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        errorOrDestroy(dest, er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src2.unpipe(dest);
    }
    dest.emit("pipe", src2);
    if (!state2.flowing) {
      debug("pipe resume");
      src2.resume();
    }
    return dest;
  };
  function pipeOnDrain(src2) {
    return function pipeOnDrainFunctionResult() {
      var state2 = src2._readableState;
      debug("pipeOnDrain", state2.awaitDrain);
      if (state2.awaitDrain)
        state2.awaitDrain--;
      if (state2.awaitDrain === 0 && EElistenerCount(src2, "data")) {
        state2.flowing = true;
        flow(src2);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state2 = this._readableState;
    var unpipeInfo = {
      hasUnpiped: false
    };
    if (state2.pipesCount === 0)
      return this;
    if (state2.pipesCount === 1) {
      if (dest && dest !== state2.pipes)
        return this;
      if (!dest)
        dest = state2.pipes;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state2.pipes;
      var len = state2.pipesCount;
      state2.pipes = null;
      state2.pipesCount = 0;
      state2.flowing = false;
      for (var i = 0; i < len; i++)
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    var index = indexOf2(state2.pipes, dest);
    if (index === -1)
      return this;
    state2.pipes.splice(index, 1);
    state2.pipesCount -= 1;
    if (state2.pipesCount === 1)
      state2.pipes = state2.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state2 = this._readableState;
    if (ev === "data") {
      state2.readableListening = this.listenerCount("readable") > 0;
      if (state2.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      if (!state2.endEmitted && !state2.readableListening) {
        state2.readableListening = state2.needReadable = true;
        state2.flowing = false;
        state2.emittedReadable = false;
        debug("on readable", state2.length, state2.reading);
        if (state2.length) {
          emitReadable(this);
        } else if (!state2.reading) {
          process.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self2) {
    var state2 = self2._readableState;
    state2.readableListening = self2.listenerCount("readable") > 0;
    if (state2.resumeScheduled && !state2.paused) {
      state2.flowing = true;
    } else if (self2.listenerCount("data") > 0) {
      self2.resume();
    }
  }
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state2 = this._readableState;
    if (!state2.flowing) {
      debug("resume");
      state2.flowing = !state2.readableListening;
      resume(this, state2);
    }
    state2.paused = false;
    return this;
  };
  function resume(stream, state2) {
    if (!state2.resumeScheduled) {
      state2.resumeScheduled = true;
      process.nextTick(resume_, stream, state2);
    }
  }
  function resume_(stream, state2) {
    debug("resume", state2.reading);
    if (!state2.reading) {
      stream.read(0);
    }
    state2.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state2.flowing && !state2.reading)
      stream.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow(stream) {
    var state2 = stream._readableState;
    debug("flow", state2.flowing);
    while (state2.flowing && stream.read() !== null)
      ;
  }
  Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state2 = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug("wrapped end");
      if (state2.decoder && !state2.ended) {
        var chunk = state2.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state2.decoder)
        chunk = state2.decoder.write(chunk);
      if (state2.objectMode && (chunk === null || chunk === void 0))
        return;
      else if (!state2.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (this[i] === void 0 && typeof stream[i] === "function") {
        this[i] = function methodWrap(method) {
          return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") {
    Readable.prototype[Symbol.asyncIterator] = function() {
      if (createReadableStreamAsyncIterator === void 0) {
        createReadableStreamAsyncIterator = requireAsync_iterator();
      }
      return createReadableStreamAsyncIterator(this);
    };
  }
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state2) {
      if (this._readableState) {
        this._readableState.flowing = state2;
      }
    }
  });
  Readable._fromList = fromList;
  Object.defineProperty(Readable.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList(n, state2) {
    if (state2.length === 0)
      return null;
    var ret;
    if (state2.objectMode)
      ret = state2.buffer.shift();
    else if (!n || n >= state2.length) {
      if (state2.decoder)
        ret = state2.buffer.join("");
      else if (state2.buffer.length === 1)
        ret = state2.buffer.first();
      else
        ret = state2.buffer.concat(state2.length);
      state2.buffer.clear();
    } else {
      ret = state2.buffer.consume(n, state2.decoder);
    }
    return ret;
  }
  function endReadable(stream) {
    var state2 = stream._readableState;
    debug("endReadable", state2.endEmitted);
    if (!state2.endEmitted) {
      state2.ended = true;
      process.nextTick(endReadableNT, state2, stream);
    }
  }
  function endReadableNT(state2, stream) {
    debug("endReadableNT", state2.endEmitted, state2.length);
    if (!state2.endEmitted && state2.length === 0) {
      state2.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
      if (state2.autoDestroy) {
        var wState = stream._writableState;
        if (!wState || wState.autoDestroy && wState.finished) {
          stream.destroy();
        }
      }
    }
  }
  if (typeof Symbol === "function") {
    Readable.from = function(iterable, opts) {
      if (from === void 0) {
        from = requireFromBrowser();
      }
      return from(Readable, iterable, opts);
    };
  }
  function indexOf2(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
  return _stream_readable;
}
var _stream_transform;
var hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform)
    return _stream_transform;
  hasRequired_stream_transform = 1;
  _stream_transform = Transform;
  var _require$codes = requireErrorsBrowser().codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
  var Duplex = require_stream_duplex();
  inherits_browserExports(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) {
      return this.emit("error", new ERR_MULTIPLE_CALLBACK());
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
    });
  };
  function done(stream, er, data) {
    if (er)
      return stream.emit("error", er);
    if (data != null)
      stream.push(data);
    if (stream._writableState.length)
      throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming)
      throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough;
var hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough)
    return _stream_passthrough;
  hasRequired_stream_passthrough = 1;
  _stream_passthrough = PassThrough;
  var Transform = require_stream_transform();
  inherits_browserExports(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return _stream_passthrough;
}
var pipeline_1;
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline)
    return pipeline_1;
  hasRequiredPipeline = 1;
  var eos;
  function once(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      callback.apply(void 0, arguments);
    };
  }
  var _require$codes = requireErrorsBrowser().codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  function noop(err) {
    if (err)
      throw err;
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function destroyer(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    if (eos === void 0)
      eos = requireEndOfStream();
    eos(stream, {
      readable: reading,
      writable: writing
    }, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isRequest(stream))
        return stream.abort();
      if (typeof stream.destroy === "function")
        return stream.destroy();
      callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
  }
  function call(fn) {
    fn();
  }
  function pipe(from, to) {
    return from.pipe(to);
  }
  function popCallback(streams) {
    if (!streams.length)
      return noop;
    if (typeof streams[streams.length - 1] !== "function")
      return noop;
    return streams.pop();
  }
  function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
      streams[_key] = arguments[_key];
    }
    var callback = popCallback(streams);
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    var error;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream, reading, writing, function(err) {
        if (!error)
          error = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error);
      });
    });
    return streams.reduce(pipe);
  }
  pipeline_1 = pipeline;
  return pipeline_1;
}
var hasRequiredReadableBrowser;
function requireReadableBrowser() {
  if (hasRequiredReadableBrowser)
    return readableBrowser.exports;
  hasRequiredReadableBrowser = 1;
  (function(module, exports2) {
    exports2 = module.exports = require_stream_readable();
    exports2.Stream = exports2;
    exports2.Readable = exports2;
    exports2.Writable = require_stream_writable();
    exports2.Duplex = require_stream_duplex();
    exports2.Transform = require_stream_transform();
    exports2.PassThrough = require_stream_passthrough();
    exports2.finished = requireEndOfStream();
    exports2.pipeline = requirePipeline();
  })(readableBrowser, readableBrowser.exports);
  return readableBrowser.exports;
}
var sha_js = { exports: {} };
var Buffer$6 = requireSafeBuffer().Buffer;
function Hash$6(blockSize, finalSize) {
  this._block = Buffer$6.alloc(blockSize);
  this._finalSize = finalSize;
  this._blockSize = blockSize;
  this._len = 0;
}
Hash$6.prototype.update = function(data, enc) {
  if (typeof data === "string") {
    enc = enc || "utf8";
    data = Buffer$6.from(data, enc);
  }
  var block = this._block;
  var blockSize = this._blockSize;
  var length = data.length;
  var accum = this._len;
  for (var offset = 0; offset < length; ) {
    var assigned = accum % blockSize;
    var remainder = Math.min(length - offset, blockSize - assigned);
    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i];
    }
    accum += remainder;
    offset += remainder;
    if (accum % blockSize === 0) {
      this._update(block);
    }
  }
  this._len += length;
  return this;
};
Hash$6.prototype.digest = function(enc) {
  var rem = this._len % this._blockSize;
  this._block[rem] = 128;
  this._block.fill(0, rem + 1);
  if (rem >= this._finalSize) {
    this._update(this._block);
    this._block.fill(0);
  }
  var bits = this._len * 8;
  if (bits <= 4294967295) {
    this._block.writeUInt32BE(bits, this._blockSize - 4);
  } else {
    var lowBits = (bits & 4294967295) >>> 0;
    var highBits = (bits - lowBits) / 4294967296;
    this._block.writeUInt32BE(highBits, this._blockSize - 8);
    this._block.writeUInt32BE(lowBits, this._blockSize - 4);
  }
  this._update(this._block);
  var hash2 = this._hash();
  return enc ? hash2.toString(enc) : hash2;
};
Hash$6.prototype._update = function() {
  throw new Error("_update must be implemented by subclass");
};
var hash = Hash$6;
var inherits$5 = inherits_browserExports;
var Hash$5 = hash;
var Buffer$5 = requireSafeBuffer().Buffer;
var K$3 = [
  1518500249,
  1859775393,
  2400959708 | 0,
  3395469782 | 0
];
var W$5 = new Array(80);
function Sha() {
  this.init();
  this._w = W$5;
  Hash$5.call(this, 64, 56);
}
inherits$5(Sha, Hash$5);
Sha.prototype.init = function() {
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
  this._e = 3285377520;
  return this;
};
function rotl5$1(num) {
  return num << 5 | num >>> 27;
}
function rotl30$1(num) {
  return num << 30 | num >>> 2;
}
function ft$1(s, b, c, d) {
  if (s === 0)
    return b & c | ~b & d;
  if (s === 2)
    return b & c | b & d | c & d;
  return b ^ c ^ d;
}
Sha.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  for (var i = 0; i < 16; ++i)
    W2[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i)
    W2[i] = W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16];
  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = rotl5$1(a) + ft$1(s, b, c, d) + e + W2[j] + K$3[s] | 0;
    e = d;
    d = c;
    c = rotl30$1(b);
    b = a;
    a = t;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
};
Sha.prototype._hash = function() {
  var H = Buffer$5.allocUnsafe(20);
  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);
  return H;
};
var sha = Sha;
var inherits$4 = inherits_browserExports;
var Hash$4 = hash;
var Buffer$4 = requireSafeBuffer().Buffer;
var K$2 = [
  1518500249,
  1859775393,
  2400959708 | 0,
  3395469782 | 0
];
var W$4 = new Array(80);
function Sha1() {
  this.init();
  this._w = W$4;
  Hash$4.call(this, 64, 56);
}
inherits$4(Sha1, Hash$4);
Sha1.prototype.init = function() {
  this._a = 1732584193;
  this._b = 4023233417;
  this._c = 2562383102;
  this._d = 271733878;
  this._e = 3285377520;
  return this;
};
function rotl1(num) {
  return num << 1 | num >>> 31;
}
function rotl5(num) {
  return num << 5 | num >>> 27;
}
function rotl30(num) {
  return num << 30 | num >>> 2;
}
function ft(s, b, c, d) {
  if (s === 0)
    return b & c | ~b & d;
  if (s === 2)
    return b & c | b & d | c & d;
  return b ^ c ^ d;
}
Sha1.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  for (var i = 0; i < 16; ++i)
    W2[i] = M.readInt32BE(i * 4);
  for (; i < 80; ++i)
    W2[i] = rotl1(W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16]);
  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20);
    var t = rotl5(a) + ft(s, b, c, d) + e + W2[j] + K$2[s] | 0;
    e = d;
    d = c;
    c = rotl30(b);
    b = a;
    a = t;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
};
Sha1.prototype._hash = function() {
  var H = Buffer$4.allocUnsafe(20);
  H.writeInt32BE(this._a | 0, 0);
  H.writeInt32BE(this._b | 0, 4);
  H.writeInt32BE(this._c | 0, 8);
  H.writeInt32BE(this._d | 0, 12);
  H.writeInt32BE(this._e | 0, 16);
  return H;
};
var sha1 = Sha1;
var inherits$3 = inherits_browserExports;
var Hash$3 = hash;
var Buffer$3 = requireSafeBuffer().Buffer;
var K$1 = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
var W$3 = new Array(64);
function Sha256$1() {
  this.init();
  this._w = W$3;
  Hash$3.call(this, 64, 56);
}
inherits$3(Sha256$1, Hash$3);
Sha256$1.prototype.init = function() {
  this._a = 1779033703;
  this._b = 3144134277;
  this._c = 1013904242;
  this._d = 2773480762;
  this._e = 1359893119;
  this._f = 2600822924;
  this._g = 528734635;
  this._h = 1541459225;
  return this;
};
function ch(x, y, z) {
  return z ^ x & (y ^ z);
}
function maj$1(x, y, z) {
  return x & y | z & (x | y);
}
function sigma0$1(x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
}
function sigma1$1(x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
}
function gamma0(x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
}
function gamma1(x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
}
Sha256$1.prototype._update = function(M) {
  var W2 = this._w;
  var a = this._a | 0;
  var b = this._b | 0;
  var c = this._c | 0;
  var d = this._d | 0;
  var e = this._e | 0;
  var f = this._f | 0;
  var g2 = this._g | 0;
  var h = this._h | 0;
  for (var i = 0; i < 16; ++i)
    W2[i] = M.readInt32BE(i * 4);
  for (; i < 64; ++i)
    W2[i] = gamma1(W2[i - 2]) + W2[i - 7] + gamma0(W2[i - 15]) + W2[i - 16] | 0;
  for (var j = 0; j < 64; ++j) {
    var T1 = h + sigma1$1(e) + ch(e, f, g2) + K$1[j] + W2[j] | 0;
    var T2 = sigma0$1(a) + maj$1(a, b, c) | 0;
    h = g2;
    g2 = f;
    f = e;
    e = d + T1 | 0;
    d = c;
    c = b;
    b = a;
    a = T1 + T2 | 0;
  }
  this._a = a + this._a | 0;
  this._b = b + this._b | 0;
  this._c = c + this._c | 0;
  this._d = d + this._d | 0;
  this._e = e + this._e | 0;
  this._f = f + this._f | 0;
  this._g = g2 + this._g | 0;
  this._h = h + this._h | 0;
};
Sha256$1.prototype._hash = function() {
  var H = Buffer$3.allocUnsafe(32);
  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);
  H.writeInt32BE(this._h, 28);
  return H;
};
var sha256 = Sha256$1;
var inherits$2 = inherits_browserExports;
var Sha256 = sha256;
var Hash$2 = hash;
var Buffer$2 = requireSafeBuffer().Buffer;
var W$2 = new Array(64);
function Sha224() {
  this.init();
  this._w = W$2;
  Hash$2.call(this, 64, 56);
}
inherits$2(Sha224, Sha256);
Sha224.prototype.init = function() {
  this._a = 3238371032;
  this._b = 914150663;
  this._c = 812702999;
  this._d = 4144912697;
  this._e = 4290775857;
  this._f = 1750603025;
  this._g = 1694076839;
  this._h = 3204075428;
  return this;
};
Sha224.prototype._hash = function() {
  var H = Buffer$2.allocUnsafe(28);
  H.writeInt32BE(this._a, 0);
  H.writeInt32BE(this._b, 4);
  H.writeInt32BE(this._c, 8);
  H.writeInt32BE(this._d, 12);
  H.writeInt32BE(this._e, 16);
  H.writeInt32BE(this._f, 20);
  H.writeInt32BE(this._g, 24);
  return H;
};
var sha224 = Sha224;
var inherits$1 = inherits_browserExports;
var Hash$1 = hash;
var Buffer$1 = requireSafeBuffer().Buffer;
var K = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
var W$1 = new Array(160);
function Sha512() {
  this.init();
  this._w = W$1;
  Hash$1.call(this, 128, 112);
}
inherits$1(Sha512, Hash$1);
Sha512.prototype.init = function() {
  this._ah = 1779033703;
  this._bh = 3144134277;
  this._ch = 1013904242;
  this._dh = 2773480762;
  this._eh = 1359893119;
  this._fh = 2600822924;
  this._gh = 528734635;
  this._hh = 1541459225;
  this._al = 4089235720;
  this._bl = 2227873595;
  this._cl = 4271175723;
  this._dl = 1595750129;
  this._el = 2917565137;
  this._fl = 725511199;
  this._gl = 4215389547;
  this._hl = 327033209;
  return this;
};
function Ch(x, y, z) {
  return z ^ x & (y ^ z);
}
function maj(x, y, z) {
  return x & y | z & (x | y);
}
function sigma0(x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25);
}
function sigma1(x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23);
}
function Gamma0(x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ x >>> 7;
}
function Gamma0l(x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25);
}
function Gamma1(x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ x >>> 6;
}
function Gamma1l(x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26);
}
function getCarry(a, b) {
  return a >>> 0 < b >>> 0 ? 1 : 0;
}
Sha512.prototype._update = function(M) {
  var W2 = this._w;
  var ah = this._ah | 0;
  var bh = this._bh | 0;
  var ch2 = this._ch | 0;
  var dh = this._dh | 0;
  var eh = this._eh | 0;
  var fh = this._fh | 0;
  var gh = this._gh | 0;
  var hh = this._hh | 0;
  var al = this._al | 0;
  var bl = this._bl | 0;
  var cl = this._cl | 0;
  var dl = this._dl | 0;
  var el = this._el | 0;
  var fl = this._fl | 0;
  var gl = this._gl | 0;
  var hl = this._hl | 0;
  for (var i = 0; i < 32; i += 2) {
    W2[i] = M.readInt32BE(i * 4);
    W2[i + 1] = M.readInt32BE(i * 4 + 4);
  }
  for (; i < 160; i += 2) {
    var xh = W2[i - 15 * 2];
    var xl = W2[i - 15 * 2 + 1];
    var gamma02 = Gamma0(xh, xl);
    var gamma0l = Gamma0l(xl, xh);
    xh = W2[i - 2 * 2];
    xl = W2[i - 2 * 2 + 1];
    var gamma12 = Gamma1(xh, xl);
    var gamma1l = Gamma1l(xl, xh);
    var Wi7h = W2[i - 7 * 2];
    var Wi7l = W2[i - 7 * 2 + 1];
    var Wi16h = W2[i - 16 * 2];
    var Wi16l = W2[i - 16 * 2 + 1];
    var Wil = gamma0l + Wi7l | 0;
    var Wih = gamma02 + Wi7h + getCarry(Wil, gamma0l) | 0;
    Wil = Wil + gamma1l | 0;
    Wih = Wih + gamma12 + getCarry(Wil, gamma1l) | 0;
    Wil = Wil + Wi16l | 0;
    Wih = Wih + Wi16h + getCarry(Wil, Wi16l) | 0;
    W2[i] = Wih;
    W2[i + 1] = Wil;
  }
  for (var j = 0; j < 160; j += 2) {
    Wih = W2[j];
    Wil = W2[j + 1];
    var majh = maj(ah, bh, ch2);
    var majl = maj(al, bl, cl);
    var sigma0h = sigma0(ah, al);
    var sigma0l = sigma0(al, ah);
    var sigma1h = sigma1(eh, el);
    var sigma1l = sigma1(el, eh);
    var Kih = K[j];
    var Kil = K[j + 1];
    var chh = Ch(eh, fh, gh);
    var chl = Ch(el, fl, gl);
    var t1l = hl + sigma1l | 0;
    var t1h = hh + sigma1h + getCarry(t1l, hl) | 0;
    t1l = t1l + chl | 0;
    t1h = t1h + chh + getCarry(t1l, chl) | 0;
    t1l = t1l + Kil | 0;
    t1h = t1h + Kih + getCarry(t1l, Kil) | 0;
    t1l = t1l + Wil | 0;
    t1h = t1h + Wih + getCarry(t1l, Wil) | 0;
    var t2l = sigma0l + majl | 0;
    var t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
    hh = gh;
    hl = gl;
    gh = fh;
    gl = fl;
    fh = eh;
    fl = el;
    el = dl + t1l | 0;
    eh = dh + t1h + getCarry(el, dl) | 0;
    dh = ch2;
    dl = cl;
    ch2 = bh;
    cl = bl;
    bh = ah;
    bl = al;
    al = t1l + t2l | 0;
    ah = t1h + t2h + getCarry(al, t1l) | 0;
  }
  this._al = this._al + al | 0;
  this._bl = this._bl + bl | 0;
  this._cl = this._cl + cl | 0;
  this._dl = this._dl + dl | 0;
  this._el = this._el + el | 0;
  this._fl = this._fl + fl | 0;
  this._gl = this._gl + gl | 0;
  this._hl = this._hl + hl | 0;
  this._ah = this._ah + ah + getCarry(this._al, al) | 0;
  this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
  this._ch = this._ch + ch2 + getCarry(this._cl, cl) | 0;
  this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
  this._eh = this._eh + eh + getCarry(this._el, el) | 0;
  this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
  this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
  this._hh = this._hh + hh + getCarry(this._hl, hl) | 0;
};
Sha512.prototype._hash = function() {
  var H = Buffer$1.allocUnsafe(64);
  function writeInt64BE(h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }
  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);
  writeInt64BE(this._gh, this._gl, 48);
  writeInt64BE(this._hh, this._hl, 56);
  return H;
};
var sha512 = Sha512;
var inherits = inherits_browserExports;
var SHA512 = sha512;
var Hash = hash;
var Buffer = requireSafeBuffer().Buffer;
var W = new Array(160);
function Sha384() {
  this.init();
  this._w = W;
  Hash.call(this, 128, 112);
}
inherits(Sha384, SHA512);
Sha384.prototype.init = function() {
  this._ah = 3418070365;
  this._bh = 1654270250;
  this._ch = 2438529370;
  this._dh = 355462360;
  this._eh = 1731405415;
  this._fh = 2394180231;
  this._gh = 3675008525;
  this._hh = 1203062813;
  this._al = 3238371032;
  this._bl = 914150663;
  this._cl = 812702999;
  this._dl = 4144912697;
  this._el = 4290775857;
  this._fl = 1750603025;
  this._gl = 1694076839;
  this._hl = 3204075428;
  return this;
};
Sha384.prototype._hash = function() {
  var H = Buffer.allocUnsafe(48);
  function writeInt64BE(h, l, offset) {
    H.writeInt32BE(h, offset);
    H.writeInt32BE(l, offset + 4);
  }
  writeInt64BE(this._ah, this._al, 0);
  writeInt64BE(this._bh, this._bl, 8);
  writeInt64BE(this._ch, this._cl, 16);
  writeInt64BE(this._dh, this._dl, 24);
  writeInt64BE(this._eh, this._el, 32);
  writeInt64BE(this._fh, this._fl, 40);
  return H;
};
var sha384 = Sha384;
var exports = sha_js.exports = function SHA(algorithm) {
  algorithm = algorithm.toLowerCase();
  var Algorithm = exports[algorithm];
  if (!Algorithm)
    throw new Error(algorithm + " is not supported (we accept pull requests)");
  return new Algorithm();
};
exports.sha = sha;
exports.sha1 = sha1;
exports.sha224 = sha224;
exports.sha256 = sha256;
exports.sha384 = sha384;
exports.sha512 = sha512;
var sha_jsExports = sha_js.exports;
export {
  requireSafeBuffer as a,
  require_stream_readable as b,
  callBound$3 as c,
  require_stream_writable as d,
  require_stream_duplex as e,
  require_stream_transform as f,
  getIntrinsic as g,
  require_stream_passthrough as h,
  requireEndOfStream as i,
  requirePipeline as j,
  string_decoder as k,
  requireReadableBrowser as r,
  sha_jsExports as s
};
