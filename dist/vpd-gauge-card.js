var yt = Object.defineProperty;
var q = Object.getOwnPropertySymbols;
var Et = Object.prototype.hasOwnProperty, vt = Object.prototype.propertyIsEnumerable;
var Y = (n, t, e) => t in n ? yt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, X = (n, t) => {
  for (var e in t || (t = {}))
    Et.call(t, e) && Y(n, e, t[e]);
  if (q)
    for (var e of q(t))
      vt.call(t, e) && Y(n, e, t[e]);
  return n;
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, V = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), J = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const St = (n) => new _t(typeof n == "string" ? n : n + "", void 0, G), wt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new _t(e, n, G);
}, bt = (n, t) => {
  if (V) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, K = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return St(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: xt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Ot, getOwnPropertySymbols: Pt, getPrototypeOf: Ut } = Object, f = globalThis, Z = f.trustedTypes, Nt = Z ? Z.emptyScript : "", D = f.reactiveElementPolyfillSupport, b = (n, t) => n, W = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Nt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch (s) {
        e = null;
      }
  }
  return e;
} }, $t = (n, t) => !Ct(n, t), Q = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: $t };
var at, ct;
(at = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ct = f.litPropertyMetadata) != null || (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && xt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    var o;
    const { get: i, set: r } = (o = Tt(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(h) {
      this[e] = h;
    } };
    return { get: i, set(h) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, h), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(b("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(b("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(b("properties"))) {
      const e = this.properties, s = [...Ot(e), ...Pt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(K(i));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return bt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o, h, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const c = s.getPropertyOptions(i), l = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((r = c.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? c.converter : W;
      this._$Em = i, this[i] = (a = (h = l.fromAttribute(e, c.type)) != null ? h : (o = this._$Ej) == null ? void 0 : o.get(i)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i, r;
    if (t !== void 0) {
      const o = this.constructor, h = this[t];
      if (s != null || (s = o.getPropertyOptions(t)), !(((i = s.hasChanged) != null ? i : $t)(h, e) || s.useDefault && s.reflect && h === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    var h, a, c;
    s && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : e) != null ? a : this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, h] of this._$Ep) this[o] = h;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, h] of r) {
        const { wrapped: a } = h, c = this[o];
        a !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, h, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
var lt;
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[b("elementProperties")] = /* @__PURE__ */ new Map(), E[b("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: E }), ((lt = f.reactiveElementVersions) != null ? lt : f.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, R = C.trustedTypes, tt = R ? R.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ft = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + $, Ht = `<${gt}>`, y = document, T = () => y.createComment(""), O = (n) => n === null || typeof n != "object" && typeof n != "function", B = Array.isArray, Mt = (n) => B(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, st = />/g, g = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, nt = /"/g, mt = /^(?:script|style|textarea|title)$/i, Rt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), H = Rt(1), v = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), m = y.createTreeWalker(y, 129);
function At(n, t) {
  if (!B(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tt !== void 0 ? tt.createHTML(t) : t;
}
const Lt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let c, l, d = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, l = o.exec(a), l !== null); ) p = o.lastIndex, o === w ? l[1] === "!--" ? o = et : l[1] !== void 0 ? o = st : l[2] !== void 0 ? (mt.test(l[2]) && (i = RegExp("</" + l[2], "g")), o = g) : l[3] !== void 0 && (o = g) : o === g ? l[0] === ">" ? (o = i != null ? i : w, d = -1) : l[1] === void 0 ? d = -2 : (d = o.lastIndex - l[2].length, c = l[1], o = l[3] === void 0 ? g : l[3] === '"' ? nt : it) : o === nt || o === it ? o = g : o === et || o === st ? o = w : (o = g, i = void 0);
    const _ = o === g && n[h + 1].startsWith("/>") ? " " : "";
    r += o === w ? a + Ht : d >= 0 ? (s.push(c), a.slice(0, d) + ft + a.slice(d) + $ + _) : a + $ + (d === -2 ? h : _);
  }
  return [At(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, l] = Lt(t, e);
    if (this.el = P.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ft)) {
          const p = l[o++], _ = i.getAttribute(d).split($), N = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: N[2], strings: _, ctor: N[1] === "." ? It : N[1] === "?" ? kt : N[1] === "@" ? Ft : L }), i.removeAttribute(d);
        } else d.startsWith($) && (a.push({ type: 6, index: r }), i.removeAttribute(d));
        if (mt.test(i.tagName)) {
          const d = i.textContent.split($), p = d.length - 1;
          if (p > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let _ = 0; _ < p; _++) i.append(d[_], T()), m.nextNode(), a.push({ type: 2, index: ++r });
            i.append(d[p], T());
          }
        }
      } else if (i.nodeType === 8) if (i.data === gt) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = i.data.indexOf($, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(n, t, e = n, s) {
  var o, h, a;
  if (t === v) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = O(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[s] = i : e._$Cl = i), i !== void 0 && (t = S(n, i._$AS(n, t.values), i, s)), t;
}
class Dt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var c;
    const { el: { content: e }, parts: s } = this._$AD, i = ((c = t == null ? void 0 : t.creationScope) != null ? c : y).importNode(e, !0);
    m.currentNode = i;
    let r = m.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new U(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new jt(r, this, t)), this._$AV.push(l), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (r = m.nextNode(), o++);
    }
    return m.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class U {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, s, i) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (r = i == null ? void 0 : i.isConnected) != null ? r : !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), O(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== v && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(At(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new Dt(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new U(this.O(T()), this.O(T()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== v, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = S(this, h[s + a], e, a), c === v && (c = this._$AH[a]), o || (o = !O(c) || c !== this._$AH[a]), c === u ? t = u : t !== u && (t += (c != null ? c : "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class It extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class kt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ft extends L {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = S(this, t, e, 0)) != null ? o : u) === v) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) == null ? void 0 : e.host) != null ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const k = C.litHtmlPolyfillSupport;
var dt;
k == null || k(P, U), ((dt = C.litHtmlVersions) != null ? dt : C.litHtmlVersions = []).push("3.3.0");
const zt = (n, t, e) => {
  var r, o;
  const s = (r = e == null ? void 0 : e.renderBefore) != null ? r : t;
  let i = s._$litPart$;
  if (i === void 0) {
    const h = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    s._$litPart$ = i = new U(t.insertBefore(T(), h), h, void 0, e != null ? e : {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class x extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, s;
    const t = super.createRenderRoot();
    return (s = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return v;
  }
}
var ut;
x._$litElement$ = !0, x.finalized = !0, (ut = A.litElementHydrateSupport) == null || ut.call(A, { LitElement: x });
const F = A.litElementPolyfillSupport;
F == null || F({ LitElement: x });
var pt;
((pt = A.litElementVersions) != null ? pt : A.litElementVersions = []).push("4.2.0");
const j = "entity", z = "name", Wt = "needle", rt = "min_entity", ht = "max_entity", Vt = "#1c2814", Gt = "#406f1e", Bt = "#689a46", qt = "#406f1e", Yt = "#1c2814", Xt = 1, Jt = 1.2, Kt = 0.8, Zt = 1.3;
class Qt extends x {
  // Properties recognized by LitElement. Changes trigger re-render.
  static get properties() {
    return {
      hass: {},
      // Home Assistant object passed down
      config: {}
      // Card configuration object
    };
  }
  // --- Lifecycle Methods ---
  setConfig(t) {
    if (!t[j])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!t[rt])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!t[ht])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    this.config = X({
      needle: !0,
      // Default needle to true
      gauge_min: Kt,
      gauge_max: Zt,
      static_low_threshold: Xt,
      static_high_threshold: Jt,
      color_extreme_low: Vt,
      color_low: Gt,
      color_good: Bt,
      color_high: qt,
      color_extreme_high: Yt
    }, t);
  }
  // --- Helper Methods ---
  _calculateSegments() {
    const t = this.hass.states[this.config[rt]], e = this.hass.states[this.config[ht]], s = !t || isNaN(parseFloat(t.state)) ? this.config.static_low_threshold : parseFloat(t.state), i = !e || isNaN(parseFloat(e.state)) ? this.config.static_high_threshold : parseFloat(e.state), r = [
      { from: this.config.gauge_min, color: this.config.color_extreme_low },
      { from: this.config.static_low_threshold, color: this.config.color_low },
      { from: s, color: this.config.color_good },
      { from: i, color: this.config.color_high },
      { from: this.config.static_high_threshold, color: this.config.color_extreme_high }
    ];
    return r.sort((h, a) => h.from - a.from), r.reduce((h, a, c, l) => (c > 0 && a.from === l[c - 1].from && h.pop(), h.push(a), h), []);
  }
  // --- Rendering ---
  render() {
    if (!this.hass || !this.config)
      return H``;
    const t = this.hass.states[this.config[j]], e = t ? parseFloat(t.state) : void 0;
    return t === void 0 ? H`
              <ha-card header="${this.config[z] || "VPD Gauge"}">
                  <div class="warning">Entity not found: ${this.config[j]}</div>
              </ha-card>
          ` : e === void 0 || isNaN(e) ? H`
              <ha-card header="${this.config[z] || "VPD Gauge"}">
                  <div class="warning">Invalid state: ${t.state}</div>
              </ha-card>
          ` : H`
        <ha-card header="${this.config[z] || "VPD Gauge"}">
          <div class="card-content">
            <ha-gauge
              .value=${e}
              .min=${this.config.gauge_min}
              .max=${this.config.gauge_max}
              .segments=${this._calculateSegments()}
              ?needle=${this.config[Wt]}
              style="--gauge-color: var(--primary-text-color);" /* Optional: Style needle/text */
            ></ha-gauge>
          </div>
        </ha-card>
      `;
  }
  // --- Lovelace Card API ---
  getCardSize() {
    return 3;
  }
  static getConfigElement() {
    return document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(t, e, s) {
    const i = e.find((h) => h.startsWith("sensor.") && h.includes("vpd")) || s.find((h) => h.startsWith("sensor.")), r = e.find((h) => h.startsWith("number.") && h.includes("min")) || s.find((h) => h.startsWith("number.")), o = e.find((h) => h.startsWith("number.") && h.includes("max")) || s.find((h) => h.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: i || "",
      min_entity: r || "",
      max_entity: o || "",
      name: "VPD Gauge"
    };
  }
  // --- Styling ---
  static get styles() {
    return wt`
        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden; /* Prevents gauge overflowing card bounds */
        }
        .card-content {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          flex-grow: 1; /* Allows gauge to take available space */
        }
        ha-gauge {
          width: 100%;
          max-width: 250px; /* Adjust max size as desired */
          --gauge-color: var(--primary-text-color); /* Color for text/needle */
        }
         .warning {
          padding: 16px;
          text-align: center;
          color: var(--error-color);
        }
      `;
  }
}
customElements.define("vpd-gauge-card", Qt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "vpd-gauge-card",
  name: "VPD Gauge Card",
  description: "A gauge card with dynamic segments based on min/max threshold entities.",
  preview: !0
  // Enable preview in card picker
});
