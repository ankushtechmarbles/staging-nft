var n, l$1, u$1, i$1, t$1, o$1, r$1, f$1, e$1, c$1 = {}, s$1 = [], a$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v$1 = Array.isArray;
function h$1(n2, l2) {
  for (var u2 in l2)
    n2[u2] = l2[u2];
  return n2;
}
function p$1(n2) {
  var l2 = n2.parentNode;
  l2 && l2.removeChild(n2);
}
function y$1(l2, u2, i2) {
  var t2, o2, r2, f2 = {};
  for (r2 in u2)
    "key" == r2 ? t2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : f2[r2] = u2[r2];
  if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), "function" == typeof l2 && null != l2.defaultProps)
    for (r2 in l2.defaultProps)
      void 0 === f2[r2] && (f2[r2] = l2.defaultProps[r2]);
  return d$1(l2, f2, t2, o2, null);
}
function d$1(n2, i2, t2, o2, r2) {
  var f2 = { type: n2, props: i2, key: t2, ref: o2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r2 ? ++u$1 : r2 };
  return null == r2 && null != l$1.vnode && l$1.vnode(f2), f2;
}
function _$1() {
  return { current: null };
}
function k$1(n2) {
  return n2.children;
}
function b$1(n2, l2) {
  this.props = n2, this.context = l2;
}
function g$1(n2, l2) {
  if (null == l2)
    return n2.__ ? g$1(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++)
    if (null != (u2 = n2.__k[l2]) && null != u2.__e)
      return u2.__e;
  return "function" == typeof n2.type ? g$1(n2) : null;
}
function m$1(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
      if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
        n2.__e = n2.__c.base = u2.__e;
        break;
      }
    return m$1(n2);
  }
}
function w$1(n2) {
  (!n2.__d && (n2.__d = true) && t$1.push(n2) && !x$1.__r++ || o$1 !== l$1.debounceRendering) && ((o$1 = l$1.debounceRendering) || r$1)(x$1);
}
function x$1() {
  var n2, l2, u2, i2, o2, r2, e2, c2;
  for (t$1.sort(f$1); n2 = t$1.shift(); )
    n2.__d && (l2 = t$1.length, i2 = void 0, o2 = void 0, e2 = (r2 = (u2 = n2).__v).__e, (c2 = u2.__P) && (i2 = [], (o2 = h$1({}, r2)).__v = r2.__v + 1, L(c2, r2, o2, u2.__n, void 0 !== c2.ownerSVGElement, null != r2.__h ? [e2] : null, i2, null == e2 ? g$1(r2) : e2, r2.__h), M(i2, r2), r2.__e != e2 && m$1(r2)), t$1.length > l2 && t$1.sort(f$1));
  x$1.__r = 0;
}
function P$1(n2, l2, u2, i2, t2, o2, r2, f2, e2, a2) {
  var h2, p2, y2, _2, b2, m2, w2, x2 = i2 && i2.__k || s$1, P2 = x2.length;
  for (u2.__k = [], h2 = 0; h2 < l2.length; h2++)
    if (null != (_2 = u2.__k[h2] = null == (_2 = l2[h2]) || "boolean" == typeof _2 || "function" == typeof _2 ? null : "string" == typeof _2 || "number" == typeof _2 || "bigint" == typeof _2 ? d$1(null, _2, null, null, _2) : v$1(_2) ? d$1(k$1, { children: _2 }, null, null, null) : _2.__b > 0 ? d$1(_2.type, _2.props, _2.key, _2.ref ? _2.ref : null, _2.__v) : _2)) {
      if (_2.__ = u2, _2.__b = u2.__b + 1, null === (y2 = x2[h2]) || y2 && _2.key == y2.key && _2.type === y2.type)
        x2[h2] = void 0;
      else
        for (p2 = 0; p2 < P2; p2++) {
          if ((y2 = x2[p2]) && _2.key == y2.key && _2.type === y2.type) {
            x2[p2] = void 0;
            break;
          }
          y2 = null;
        }
      L(n2, _2, y2 = y2 || c$1, t2, o2, r2, f2, e2, a2), b2 = _2.__e, (p2 = _2.ref) && y2.ref != p2 && (w2 || (w2 = []), y2.ref && w2.push(y2.ref, null, _2), w2.push(p2, _2.__c || b2, _2)), null != b2 ? (null == m2 && (m2 = b2), "function" == typeof _2.type && _2.__k === y2.__k ? _2.__d = e2 = C(_2, e2, n2) : e2 = $(n2, _2, y2, x2, b2, e2), "function" == typeof u2.type && (u2.__d = e2)) : e2 && y2.__e == e2 && e2.parentNode != n2 && (e2 = g$1(y2));
    }
  for (u2.__e = m2, h2 = P2; h2--; )
    null != x2[h2] && ("function" == typeof u2.type && null != x2[h2].__e && x2[h2].__e == u2.__d && (u2.__d = A$1(i2).nextSibling), q$1(x2[h2], x2[h2]));
  if (w2)
    for (h2 = 0; h2 < w2.length; h2++)
      O(w2[h2], w2[++h2], w2[++h2]);
}
function C(n2, l2, u2) {
  for (var i2, t2 = n2.__k, o2 = 0; t2 && o2 < t2.length; o2++)
    (i2 = t2[o2]) && (i2.__ = n2, l2 = "function" == typeof i2.type ? C(i2, l2, u2) : $(u2, i2, i2, t2, i2.__e, l2));
  return l2;
}
function S(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (v$1(n2) ? n2.some(function(n3) {
    S(n3, l2);
  }) : l2.push(n2)), l2;
}
function $(n2, l2, u2, i2, t2, o2) {
  var r2, f2, e2;
  if (void 0 !== l2.__d)
    r2 = l2.__d, l2.__d = void 0;
  else if (null == u2 || t2 != o2 || null == t2.parentNode)
    n:
      if (null == o2 || o2.parentNode !== n2)
        n2.appendChild(t2), r2 = null;
      else {
        for (f2 = o2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 1)
          if (f2 == t2)
            break n;
        n2.insertBefore(t2, o2), r2 = o2;
      }
  return void 0 !== r2 ? r2 : t2.nextSibling;
}
function A$1(n2) {
  var l2, u2, i2;
  if (null == n2.type || "string" == typeof n2.type)
    return n2.__e;
  if (n2.__k) {
    for (l2 = n2.__k.length - 1; l2 >= 0; l2--)
      if ((u2 = n2.__k[l2]) && (i2 = A$1(u2)))
        return i2;
  }
  return null;
}
function H(n2, l2, u2, i2, t2) {
  var o2;
  for (o2 in u2)
    "children" === o2 || "key" === o2 || o2 in l2 || T$1(n2, o2, null, u2[o2], i2);
  for (o2 in l2)
    t2 && "function" != typeof l2[o2] || "children" === o2 || "key" === o2 || "value" === o2 || "checked" === o2 || u2[o2] === l2[o2] || T$1(n2, o2, l2[o2], u2[o2], i2);
}
function I(n2, l2, u2) {
  "-" === l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || a$1.test(l2) ? u2 : u2 + "px";
}
function T$1(n2, l2, u2, i2, t2) {
  var o2;
  n:
    if ("style" === l2)
      if ("string" == typeof u2)
        n2.style.cssText = u2;
      else {
        if ("string" == typeof i2 && (n2.style.cssText = i2 = ""), i2)
          for (l2 in i2)
            u2 && l2 in u2 || I(n2.style, l2, "");
        if (u2)
          for (l2 in u2)
            i2 && u2[l2] === i2[l2] || I(n2.style, l2, u2[l2]);
      }
    else if ("o" === l2[0] && "n" === l2[1])
      o2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? i2 || n2.addEventListener(l2, o2 ? z$1 : j$1, o2) : n2.removeEventListener(l2, o2 ? z$1 : j$1, o2);
    else if ("dangerouslySetInnerHTML" !== l2) {
      if (t2)
        l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" !== l2 && "height" !== l2 && "href" !== l2 && "list" !== l2 && "form" !== l2 && "tabIndex" !== l2 && "download" !== l2 && "rowSpan" !== l2 && "colSpan" !== l2 && l2 in n2)
        try {
          n2[l2] = null == u2 ? "" : u2;
          break n;
        } catch (n3) {
        }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" !== l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, u2));
    }
}
function j$1(n2) {
  return this.l[n2.type + false](l$1.event ? l$1.event(n2) : n2);
}
function z$1(n2) {
  return this.l[n2.type + true](l$1.event ? l$1.event(n2) : n2);
}
function L(n2, u2, i2, t2, o2, r2, f2, e2, c2) {
  var s2, a2, p2, y2, d2, _2, g2, m2, w2, x2, C2, S2, $2, A2, H2, I2 = u2.type;
  if (void 0 !== u2.constructor)
    return null;
  null != i2.__h && (c2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, r2 = [e2]), (s2 = l$1.__b) && s2(u2);
  try {
    n:
      if ("function" == typeof I2) {
        if (m2 = u2.props, w2 = (s2 = I2.contextType) && t2[s2.__c], x2 = s2 ? w2 ? w2.props.value : s2.__ : t2, i2.__c ? g2 = (a2 = u2.__c = i2.__c).__ = a2.__E : ("prototype" in I2 && I2.prototype.render ? u2.__c = a2 = new I2(m2, x2) : (u2.__c = a2 = new b$1(m2, x2), a2.constructor = I2, a2.render = B$1), w2 && w2.sub(a2), a2.props = m2, a2.state || (a2.state = {}), a2.context = x2, a2.__n = t2, p2 = a2.__d = true, a2.__h = [], a2._sb = []), null == a2.__s && (a2.__s = a2.state), null != I2.getDerivedStateFromProps && (a2.__s == a2.state && (a2.__s = h$1({}, a2.__s)), h$1(a2.__s, I2.getDerivedStateFromProps(m2, a2.__s))), y2 = a2.props, d2 = a2.state, a2.__v = u2, p2)
          null == I2.getDerivedStateFromProps && null != a2.componentWillMount && a2.componentWillMount(), null != a2.componentDidMount && a2.__h.push(a2.componentDidMount);
        else {
          if (null == I2.getDerivedStateFromProps && m2 !== y2 && null != a2.componentWillReceiveProps && a2.componentWillReceiveProps(m2, x2), !a2.__e && null != a2.shouldComponentUpdate && false === a2.shouldComponentUpdate(m2, a2.__s, x2) || u2.__v === i2.__v) {
            for (u2.__v !== i2.__v && (a2.props = m2, a2.state = a2.__s, a2.__d = false), a2.__e = false, u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n3) {
              n3 && (n3.__ = u2);
            }), C2 = 0; C2 < a2._sb.length; C2++)
              a2.__h.push(a2._sb[C2]);
            a2._sb = [], a2.__h.length && f2.push(a2);
            break n;
          }
          null != a2.componentWillUpdate && a2.componentWillUpdate(m2, a2.__s, x2), null != a2.componentDidUpdate && a2.__h.push(function() {
            a2.componentDidUpdate(y2, d2, _2);
          });
        }
        if (a2.context = x2, a2.props = m2, a2.__P = n2, S2 = l$1.__r, $2 = 0, "prototype" in I2 && I2.prototype.render) {
          for (a2.state = a2.__s, a2.__d = false, S2 && S2(u2), s2 = a2.render(a2.props, a2.state, a2.context), A2 = 0; A2 < a2._sb.length; A2++)
            a2.__h.push(a2._sb[A2]);
          a2._sb = [];
        } else
          do {
            a2.__d = false, S2 && S2(u2), s2 = a2.render(a2.props, a2.state, a2.context), a2.state = a2.__s;
          } while (a2.__d && ++$2 < 25);
        a2.state = a2.__s, null != a2.getChildContext && (t2 = h$1(h$1({}, t2), a2.getChildContext())), p2 || null == a2.getSnapshotBeforeUpdate || (_2 = a2.getSnapshotBeforeUpdate(y2, d2)), P$1(n2, v$1(H2 = null != s2 && s2.type === k$1 && null == s2.key ? s2.props.children : s2) ? H2 : [H2], u2, i2, t2, o2, r2, f2, e2, c2), a2.base = u2.__e, u2.__h = null, a2.__h.length && f2.push(a2), g2 && (a2.__E = a2.__ = null), a2.__e = false;
      } else
        null == r2 && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = N(i2.__e, u2, i2, t2, o2, r2, f2, c2);
    (s2 = l$1.diffed) && s2(u2);
  } catch (n3) {
    u2.__v = null, (c2 || null != r2) && (u2.__e = e2, u2.__h = !!c2, r2[r2.indexOf(e2)] = null), l$1.__e(n3, u2, i2);
  }
}
function M(n2, u2) {
  l$1.__c && l$1.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$1.__e(n3, u3.__v);
    }
  });
}
function N(l2, u2, i2, t2, o2, r2, f2, e2) {
  var s2, a2, h2, y2 = i2.props, d2 = u2.props, _2 = u2.type, k2 = 0;
  if ("svg" === _2 && (o2 = true), null != r2) {
    for (; k2 < r2.length; k2++)
      if ((s2 = r2[k2]) && "setAttribute" in s2 == !!_2 && (_2 ? s2.localName === _2 : 3 === s2.nodeType)) {
        l2 = s2, r2[k2] = null;
        break;
      }
  }
  if (null == l2) {
    if (null === _2)
      return document.createTextNode(d2);
    l2 = o2 ? document.createElementNS("http://www.w3.org/2000/svg", _2) : document.createElement(_2, d2.is && d2), r2 = null, e2 = false;
  }
  if (null === _2)
    y2 === d2 || e2 && l2.data === d2 || (l2.data = d2);
  else {
    if (r2 = r2 && n.call(l2.childNodes), a2 = (y2 = i2.props || c$1).dangerouslySetInnerHTML, h2 = d2.dangerouslySetInnerHTML, !e2) {
      if (null != r2)
        for (y2 = {}, k2 = 0; k2 < l2.attributes.length; k2++)
          y2[l2.attributes[k2].name] = l2.attributes[k2].value;
      (h2 || a2) && (h2 && (a2 && h2.__html == a2.__html || h2.__html === l2.innerHTML) || (l2.innerHTML = h2 && h2.__html || ""));
    }
    if (H(l2, d2, y2, o2, e2), h2)
      u2.__k = [];
    else if (P$1(l2, v$1(k2 = u2.props.children) ? k2 : [k2], u2, i2, t2, o2 && "foreignObject" !== _2, r2, f2, r2 ? r2[0] : i2.__k && g$1(i2, 0), e2), null != r2)
      for (k2 = r2.length; k2--; )
        null != r2[k2] && p$1(r2[k2]);
    e2 || ("value" in d2 && void 0 !== (k2 = d2.value) && (k2 !== l2.value || "progress" === _2 && !k2 || "option" === _2 && k2 !== y2.value) && T$1(l2, "value", k2, y2.value, false), "checked" in d2 && void 0 !== (k2 = d2.checked) && k2 !== l2.checked && T$1(l2, "checked", k2, y2.checked, false));
  }
  return l2;
}
function O(n2, u2, i2) {
  try {
    "function" == typeof n2 ? n2(u2) : n2.current = u2;
  } catch (n3) {
    l$1.__e(n3, i2);
  }
}
function q$1(n2, u2, i2) {
  var t2, o2;
  if (l$1.unmount && l$1.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || O(t2, null, u2)), null != (t2 = n2.__c)) {
    if (t2.componentWillUnmount)
      try {
        t2.componentWillUnmount();
      } catch (n3) {
        l$1.__e(n3, u2);
      }
    t2.base = t2.__P = null, n2.__c = void 0;
  }
  if (t2 = n2.__k)
    for (o2 = 0; o2 < t2.length; o2++)
      t2[o2] && q$1(t2[o2], u2, i2 || "function" != typeof n2.type);
  i2 || null == n2.__e || p$1(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
}
function B$1(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function D(u2, i2, t2) {
  var o2, r2, f2;
  l$1.__ && l$1.__(u2, i2), r2 = (o2 = "function" == typeof t2) ? null : t2 && t2.__k || i2.__k, f2 = [], L(i2, u2 = (!o2 && t2 || i2).__k = y$1(k$1, null, [u2]), r2 || c$1, c$1, void 0 !== i2.ownerSVGElement, !o2 && t2 ? [t2] : r2 ? null : i2.firstChild ? n.call(i2.childNodes) : null, f2, !o2 && t2 ? t2 : r2 ? r2.__e : i2.firstChild, o2), M(f2, u2);
}
function E(n2, l2) {
  D(n2, l2, E);
}
function F$1(l2, u2, i2) {
  var t2, o2, r2, f2, e2 = h$1({}, l2.props);
  for (r2 in l2.type && l2.type.defaultProps && (f2 = l2.type.defaultProps), u2)
    "key" == r2 ? t2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : e2[r2] = void 0 === u2[r2] && void 0 !== f2 ? f2[r2] : u2[r2];
  return arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), d$1(l2.type, e2, t2 || l2.key, o2 || l2.ref, null);
}
function G(n2, l2) {
  var u2 = { __c: l2 = "__cC" + e$1++, __: n2, Consumer: function(n3, l3) {
    return n3.children(l3);
  }, Provider: function(n3) {
    var u3, i2;
    return this.getChildContext || (u3 = [], (i2 = {})[l2] = this, this.getChildContext = function() {
      return i2;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value !== n4.value && u3.some(function(n5) {
        n5.__e = true, w$1(n5);
      });
    }, this.sub = function(n4) {
      u3.push(n4);
      var l3 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u3.splice(u3.indexOf(n4), 1), l3 && l3.call(n4);
      };
    }), n3.children;
  } };
  return u2.Provider.__ = u2.Consumer.contextType = u2;
}
n = s$1.slice, l$1 = { __e: function(n2, l2, u2, i2) {
  for (var t2, o2, r2; l2 = l2.__; )
    if ((t2 = l2.__c) && !t2.__)
      try {
        if ((o2 = t2.constructor) && null != o2.getDerivedStateFromError && (t2.setState(o2.getDerivedStateFromError(n2)), r2 = t2.__d), null != t2.componentDidCatch && (t2.componentDidCatch(n2, i2 || {}), r2 = t2.__d), r2)
          return t2.__E = t2;
      } catch (l3) {
        n2 = l3;
      }
  throw n2;
} }, u$1 = 0, i$1 = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, b$1.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h$1({}, this.state), "function" == typeof n2 && (n2 = n2(h$1({}, u2), this.props)), n2 && h$1(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), w$1(this));
}, b$1.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), w$1(this));
}, b$1.prototype.render = k$1, t$1 = [], r$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f$1 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, x$1.__r = 0, e$1 = 0;
const preact_module = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: b$1,
  Fragment: k$1,
  cloneElement: F$1,
  createContext: G,
  createElement: y$1,
  createRef: _$1,
  h: y$1,
  hydrate: E,
  get isValidElement() {
    return i$1;
  },
  get options() {
    return l$1;
  },
  render: D,
  toChildArray: S
}, Symbol.toStringTag, { value: "Module" }));
var t, r, u, i, o = 0, f = [], c = [], e = l$1.__b, a = l$1.__r, v = l$1.diffed, l = l$1.__c, m = l$1.unmount;
function d(t2, u2) {
  l$1.__h && l$1.__h(r, t2, o || u2), o = 0;
  var i2 = r.__H || (r.__H = { __: [], __h: [] });
  return t2 >= i2.__.length && i2.__.push({ __V: c }), i2.__[t2];
}
function h(n2) {
  return o = 1, s(B, n2);
}
function s(n2, u2, i2) {
  var o2 = d(t++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : B(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r, !r.u)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H)
        return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      }))
        return !c2 || c2.call(this, n3, t2, r2);
      var i3 = false;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), !(!i3 && o2.__c.props === n3) && (!c2 || c2.call(this, n3, t2, r2));
    };
    r.u = true;
    var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
    r.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function p(u2, i2) {
  var o2 = d(t++, 3);
  !l$1.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__H.__h.push(o2));
}
function y(u2, i2) {
  var o2 = d(t++, 4);
  !l$1.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__h.push(o2));
}
function _(n2) {
  return o = 5, F(function() {
    return { current: n2 };
  }, []);
}
function A(n2, t2, r2) {
  o = 6, y(function() {
    return "function" == typeof n2 ? (n2(t2()), function() {
      return n2(null);
    }) : n2 ? (n2.current = t2(), function() {
      return n2.current = null;
    }) : void 0;
  }, null == r2 ? r2 : r2.concat(n2));
}
function F(n2, r2) {
  var u2 = d(t++, 7);
  return z(u2.__H, r2) ? (u2.__V = n2(), u2.i = r2, u2.__h = n2, u2.__V) : u2.__;
}
function T(n2, t2) {
  return o = 8, F(function() {
    return n2;
  }, t2);
}
function q(n2) {
  var u2 = r.context[n2.__c], i2 = d(t++, 9);
  return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r)), u2.props.value) : n2.__;
}
function x(t2, r2) {
  l$1.useDebugValue && l$1.useDebugValue(r2 ? r2(t2) : t2);
}
function P(n2) {
  var u2 = d(t++, 10), i2 = h();
  return u2.__ = n2, r.componentDidCatch || (r.componentDidCatch = function(n3, t2) {
    u2.__ && u2.__(n3, t2), i2[1](n3);
  }), [i2[0], function() {
    i2[1](void 0);
  }];
}
function V() {
  var n2 = d(t++, 11);
  if (!n2.__) {
    for (var u2 = r.__v; null !== u2 && !u2.__m && null !== u2.__; )
      u2 = u2.__;
    var i2 = u2.__m || (u2.__m = [0, 0]);
    n2.__ = "P" + i2[0] + "-" + i2[1]++;
  }
  return n2.__;
}
function b() {
  for (var t2; t2 = f.shift(); )
    if (t2.__P && t2.__H)
      try {
        t2.__H.__h.forEach(k), t2.__H.__h.forEach(w), t2.__H.__h = [];
      } catch (r2) {
        t2.__H.__h = [], l$1.__e(r2, t2.__v);
      }
}
l$1.__b = function(n2) {
  r = null, e && e(n2);
}, l$1.__r = function(n2) {
  a && a(n2), t = 0;
  var i2 = (r = n2.__c).__H;
  i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.__V = c, n3.__N = n3.i = void 0;
  })) : (i2.__h.forEach(k), i2.__h.forEach(w), i2.__h = [], t = 0)), u = r;
}, l$1.diffed = function(t2) {
  v && v(t2);
  var o2 = t2.__c;
  o2 && o2.__H && (o2.__H.__h.length && (1 !== f.push(o2) && i === l$1.requestAnimationFrame || ((i = l$1.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n2) {
    n2.i && (n2.__H = n2.i), n2.__V !== c && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c;
  })), u = r = null;
}, l$1.__c = function(t2, r2) {
  r2.some(function(t3) {
    try {
      t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n2) {
        return !n2.__ || w(n2);
      });
    } catch (u2) {
      r2.some(function(n2) {
        n2.__h && (n2.__h = []);
      }), r2 = [], l$1.__e(u2, t3.__v);
    }
  }), l && l(t2, r2);
}, l$1.unmount = function(t2) {
  m && m(t2);
  var r2, u2 = t2.__c;
  u2 && u2.__H && (u2.__H.__.forEach(function(n2) {
    try {
      k(n2);
    } catch (n3) {
      r2 = n3;
    }
  }), u2.__H = void 0, r2 && l$1.__e(r2, u2.__v));
};
var g = "function" == typeof requestAnimationFrame;
function j(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), g && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 100);
  g && (t2 = requestAnimationFrame(r2));
}
function k(n2) {
  var t2 = r, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
}
function w(n2) {
  var t2 = r;
  n2.__c = n2.__(), r = t2;
}
function z(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function B(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
const hooks_module = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCallback: T,
  useContext: q,
  useDebugValue: x,
  useEffect: p,
  useErrorBoundary: P,
  useId: V,
  useImperativeHandle: A,
  useLayoutEffect: y,
  useMemo: F,
  useReducer: s,
  useRef: _,
  useState: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  A,
  D,
  E,
  F$1 as F,
  G,
  P,
  S,
  T,
  V,
  _,
  y as a,
  b$1 as b,
  h as c,
  p as d,
  F as e,
  _$1 as f,
  hooks_module as h,
  k$1 as k,
  l$1 as l,
  preact_module as p,
  q,
  s,
  x,
  y$1 as y
};
