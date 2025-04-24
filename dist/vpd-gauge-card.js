var Ie = Object.defineProperty;
var re = Object.getOwnPropertySymbols;
var Fe = Object.prototype.hasOwnProperty, Ge = Object.prototype.propertyIsEnumerable;
var V = (r, e, t) => e in r ? Ie(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, I = (r, e) => {
  for (var t in e || (e = {}))
    Fe.call(e, t) && V(r, t, e[t]);
  if (re)
    for (var t of re(e))
      Ge.call(e, t) && V(r, t, e[t]);
  return r;
};
var he = (r, e, t) => V(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, Q = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Q && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (r) => new Ne(typeof r == "string" ? r : r + "", void 0, ee), We = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Ne(t, r, ee);
}, ze = (r, e) => {
  if (Q) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = P.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, le = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return qe(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Be, getOwnPropertyDescriptor: Xe, getOwnPropertyNames: Ke, getOwnPropertySymbols: Ye, getPrototypeOf: Je } = Object, f = globalThis, ce = f.trustedTypes, Ze = ce ? ce.emptyScript : "", F = f.reactiveElementPolyfillSupport, x = (r, e) => r, Z = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ze : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch (i) {
        t = null;
      }
  }
  return t;
} }, Ue = (r, e) => !je(r, e), de = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: Ue };
var xe, Oe;
(xe = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Oe = f.litPropertyMetadata) != null || (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Be(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: s, set: o } = (n = Xe(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const h = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const e = Je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const t = this.properties, i = [...Ke(t), ...Ye(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(le(s));
    } else e !== void 0 && t.push(le(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Z).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n, a, h;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Z;
      this._$Em = s, this[s] = (h = (a = d.fromAttribute(t, l.type)) != null ? a : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? h : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (i != null || (i = n.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : Ue)(a, t) || i.useDefault && i.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, n) {
    var a, h, l;
    i && !((a = this._$Ej) != null ? a : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (h = n != null ? n : t) != null ? h : this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i, s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: h } = a, l = this[n];
        h !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
var Te;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[x("elementProperties")] = /* @__PURE__ */ new Map(), A[x("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: A }), ((Te = f.reactiveElementVersions) != null ? Te : f.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, M = O.trustedTypes, ue = M ? M.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Re = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, Pe = "?" + g, Qe = `<${Pe}>`, v = document, k = () => v.createComment(""), L = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, et = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, pe = />/g, $ = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, fe = /"/g, Me = /^(?:script|style|textarea|title)$/i, tt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), q = tt(1), C = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), m = v.createTreeWalker(v, 129);
function De(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const it = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = S;
  for (let a = 0; a < t; a++) {
    const h = r[a];
    let l, d, c = -1, _ = 0;
    for (; _ < h.length && (n.lastIndex = _, d = n.exec(h), d !== null); ) _ = n.lastIndex, n === S ? d[1] === "!--" ? n = _e : d[1] !== void 0 ? n = pe : d[2] !== void 0 ? (Me.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = $) : d[3] !== void 0 && (n = $) : n === $ ? d[0] === ">" ? (n = s != null ? s : S, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, l = d[1], n = d[3] === void 0 ? $ : d[3] === '"' ? fe : ge) : n === fe || n === ge ? n = $ : n === _e || n === pe ? n = S : (n = $, s = void 0);
    const p = n === $ && r[a + 1].startsWith("/>") ? " " : "";
    o += n === S ? h + Qe : c >= 0 ? (i.push(l), h.slice(0, c) + Re + h.slice(c) + g + p) : h + g + (c === -2 ? a : p);
  }
  return [De(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const a = e.length - 1, h = this.parts, [l, d] = it(e, t);
    if (this.el = H.createElement(l, i), m.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = m.nextNode()) !== null && h.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Re)) {
          const _ = d[n++], p = s.getAttribute(c).split(g), E = /([.?@])?(.*)/.exec(_);
          h.push({ type: 1, index: o, name: E[2], strings: p, ctor: E[1] === "." ? nt : E[1] === "?" ? ot : E[1] === "@" ? rt : D }), s.removeAttribute(c);
        } else c.startsWith(g) && (h.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Me.test(s.tagName)) {
          const c = s.textContent.split(g), _ = c.length - 1;
          if (_ > 0) {
            s.textContent = M ? M.emptyScript : "";
            for (let p = 0; p < _; p++) s.append(c[p], k()), m.nextNode(), h.push({ type: 2, index: ++o });
            s.append(c[_], k());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Pe) h.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(g, c + 1)) !== -1; ) h.push({ type: 7, index: o }), c += g.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = v.createElement("template");
    return i.innerHTML = e, i;
  }
}
function b(r, e, t = r, i) {
  var n, a, h;
  if (e === C) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = L(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? ((h = t._$Co) != null ? h : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = b(r, s._$AS(r, e.values), s, i)), e;
}
class st {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var l;
    const { el: { content: t }, parts: i } = this._$AD, s = ((l = e == null ? void 0 : e.creationScope) != null ? l : v).importNode(t, !0);
    m.currentNode = s;
    let o = m.nextNode(), n = 0, a = 0, h = i[0];
    for (; h !== void 0; ) {
      if (n === h.index) {
        let d;
        h.type === 2 ? d = new N(o, o.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (d = new ht(o, this, e)), this._$AV.push(d), h = i[++a];
      }
      n !== (h == null ? void 0 : h.index) && (o = m.nextNode(), n++);
    }
    return m.currentNode = v, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class N {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, s) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (o = s == null ? void 0 : s.isConnected) != null ? o : !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = b(this, e, t), L(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : et(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && L(this._$AH) ? this._$AA.nextSibling.data = e : this.T(v.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = H.createElement(De(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new st(s, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = $e.get(e.strings);
    return t === void 0 && $e.set(e.strings, t = new H(e)), t;
  }
  k(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new N(this.O(k()), this.O(k()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = b(this, e, t, 0), n = !L(e) || e !== this._$AH && e !== C, n && (this._$AH = e);
    else {
      const a = e;
      let h, l;
      for (e = o[0], h = 0; h < o.length - 1; h++) l = b(this, a[i + h], t, h), l === C && (l = this._$AH[h]), n || (n = !L(l) || l !== this._$AH[h]), l === u ? e = u : e !== u && (e += (l != null ? l : "") + o[h + 1]), this._$AH[h] = l;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class nt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class ot extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class rt extends D {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = b(this, e, t, 0)) != null ? n : u) === C) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class ht {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    b(this, e);
  }
}
const W = O.litHtmlPolyfillSupport;
var ke;
W == null || W(H, N), ((ke = O.litHtmlVersions) != null ? ke : O.litHtmlVersions = []).push("3.3.0");
const at = (r, e, t) => {
  var o, n;
  const i = (o = t == null ? void 0 : t.renderBefore) != null ? o : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = s = new N(e.insertBefore(k(), a), a, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class T extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, i;
    const e = super.createRenderRoot();
    return (i = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = at(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return C;
  }
}
var Le;
T._$litElement$ = !0, T.finalized = !0, (Le = y.litElementHydrateSupport) == null || Le.call(y, { LitElement: T });
const z = y.litElementPolyfillSupport;
z == null || z({ LitElement: T });
var He;
((He = y.litElementVersions) != null ? He : y.litElementVersions = []).push("4.2.0");
const w = "entity", j = "name", B = "needle", X = "gauge_min", K = "gauge_max", U = "min_entity", R = "max_entity", me = "color_extreme_low", ye = "color_low", ve = "color_good", Ee = "color_high", Ae = "color_extreme_high", Y = "static_low_threshold", J = "static_high_threshold", lt = "#1c2814", ct = "#406f1e", dt = "#689a46", ut = "#406f1e", _t = "#1c2814", Ce = 1, be = 1.2, Se = 0.8, we = 1.3;
class pt extends T {
  constructor() {
    super(...arguments);
    // --- Element References ---
    he(this, "_elements", {
      inputs: {},
      pickers: {},
      colors: {}
    });
  }
  static get properties() {
    return {
      hass: {},
      _config: {}
    };
  }
  setConfig(t) {
    console.log("Editor setConfig called with:", t), this._config = I({}, t), this.shadowRoot ? this.loadEditorValues() : this.updateComplete.then(() => this.loadEditorValues());
  }
  set hass(t) {
    var i;
    this._hass = t, this.shadowRoot && ((i = this._elements) != null && i.pickers) && Object.values(this._elements.pickers).forEach((s) => {
      s && (s.hass = this._hass);
    });
  }
  // Store references only once after first update
  firstUpdated(t) {
    super.firstUpdated(t), this._storeElementReferences(), this._attachInputListeners(), this.loadEditorValues();
  }
  _storeElementReferences() {
    const t = this.shadowRoot;
    if (!t) return;
    this._elements.pickers.entity = t.querySelector("#entity"), this._elements.pickers.min_entity = t.querySelector("#min_entity"), this._elements.pickers.max_entity = t.querySelector("#max_entity"), this._elements.inputs.name = t.querySelector("#name"), this._elements.inputs.needle = t.querySelector("#needle"), this._elements.inputs.gauge_min = t.querySelector("#gauge_min"), this._elements.inputs.gauge_max = t.querySelector("#gauge_max"), this._elements.inputs.static_low_threshold = t.querySelector("#static_low_threshold"), this._elements.inputs.static_high_threshold = t.querySelector("#static_high_threshold");
    const i = ["extreme_low", "low", "good", "high", "extreme_high"];
    this._elements.colors = {}, i.forEach((s) => {
      this._elements.colors[s] = {
        // text: root.querySelector(`#${group}_text`), // Text field removed
        picker: t.querySelector(`#${s}_picker`)
      };
    });
  }
  _attachInputListeners() {
    var t, i, s, o, n, a, h, l, d, c;
    if (this._elements) {
      (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", this._valueChanged.bind(this)), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", this._valueChanged.bind(this)), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", this._valueChanged.bind(this)), (o = this._elements.inputs.name) == null || o.addEventListener("input", this._valueChanged.bind(this)), (n = this._elements.inputs.needle) == null || n.addEventListener("change", this._valueChanged.bind(this)), (a = this._elements.inputs.gauge_min) == null || a.addEventListener("input", this._valueChanged.bind(this)), (h = this._elements.inputs.gauge_max) == null || h.addEventListener("input", this._valueChanged.bind(this)), (l = this._elements.inputs.static_low_threshold) == null || l.addEventListener("input", this._valueChanged.bind(this)), (d = this._elements.inputs.static_high_threshold) == null || d.addEventListener("input", this._valueChanged.bind(this));
      for (const _ in this._elements.colors)
        (c = this._elements.colors[_].picker) == null || c.addEventListener("color-changed", this._colorChanged.bind(this));
    }
  }
  loadEditorValues() {
    var t, i, s, o;
    if (!(!this._config || !this.shadowRoot || !this._elements)) {
      console.log("Loading editor values from:", this._config), this._elements.pickers.entity && (this._elements.pickers.entity.value = this._config[w] || ""), this._elements.pickers.min_entity && (this._elements.pickers.min_entity.value = this._config[U] || ""), this._elements.pickers.max_entity && (this._elements.pickers.max_entity.value = this._config[R] || ""), this._elements.inputs.name && (this._elements.inputs.name.value = this._config[j] || ""), this._elements.inputs.needle && (this._elements.inputs.needle.checked = this._config[B] !== !1), this._elements.inputs.gauge_min && (this._elements.inputs.gauge_min.value = (t = this._config[X]) != null ? t : Se), this._elements.inputs.gauge_max && (this._elements.inputs.gauge_max.value = (i = this._config[K]) != null ? i : we), this._elements.inputs.static_low_threshold && (this._elements.inputs.static_low_threshold.value = (s = this._config[Y]) != null ? s : Ce), this._elements.inputs.static_high_threshold && (this._elements.inputs.static_high_threshold.value = (o = this._config[J]) != null ? o : be);
      for (const n in this._elements.colors) {
        const a = this._elements.colors[n], h = this._config[`color_${n}`], l = this[`DEFAULT_COLOR_${n.toUpperCase()}`];
        a.picker && (a.picker.value = h || l);
      }
    }
  }
  _valueChanged(t) {
    var n;
    if (!this._config || !this.hass) return;
    const i = t.target, s = i.dataset.configValue;
    let o = i.value;
    if (!s) {
      console.warn("No configValue dataset found for target:", i);
      return;
    }
    i.type === "checkbox" && (o = i.checked), i.type === "number" && (o = o === "" ? void 0 : parseFloat(o)), i.tagName === "HA-ENTITY-PICKER" && ((n = t.detail) == null ? void 0 : n.value) !== void 0 && (o = t.detail.value), o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? s !== w && s !== U && s !== R ? delete this._config[s] : this._config[s] = "" : this._config[s] = o, this.fireConfigChanged();
  }
  _colorChanged(t) {
    if (!this._config || !this.hass) return;
    const s = t.target.dataset.configValue, o = t.detail.value;
    s && (o ? this._config[s] = o : delete this._config[s], this.fireConfigChanged());
  }
  fireConfigChanged() {
    const t = I({}, this._config);
    console.log("Firing config-changed with:", t);
    const i = new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(i);
  }
  render() {
    var ie, se, ne, oe;
    if (!this._hass)
      return q`<div>Waiting for Home Assistant connection...</div>`;
    if (!this._config)
      return q`<div>Waiting for configuration...</div>`;
    const t = this._config[j] || "", i = this._config[w] || "", s = this._config[U] || "", o = this._config[R] || "", n = this._config[B] !== !1, a = (ie = this._config[X]) != null ? ie : Se, h = (se = this._config[K]) != null ? se : we, l = (ne = this._config[Y]) != null ? ne : Ce, d = (oe = this._config[J]) != null ? oe : be, c = this._config[me] || lt, _ = this._config[ye] || ct, p = this._config[ve] || dt, E = this._config[Ee] || ut, Ve = this._config[Ae] || _t;
    return q`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker
            label="VPD Sensor Entity"
            .hass=${this._hass}
            .value=${i}
            .configValue=${w} /* Use dataset for valueChanged */
            .dataset=${{ configValue: w }}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            required
            id="entity"
          ></ha-entity-picker>
          <ha-entity-picker
            label="Min Threshold Entity (Number)"
            .hass=${this._hass}
            .value=${s}
            .dataset=${{ configValue: U }}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
            id="min_entity"
          ></ha-entity-picker>
          <ha-entity-picker
            label="Max Threshold Entity (Number)"
            .hass=${this._hass}
            .value=${o}
            .dataset=${{ configValue: R }}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
            id="max_entity"
          ></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield
            label="Name (Optional)"
            .value=${t}
            .dataset=${{ configValue: j }}
            @input=${this._valueChanged}
            id="name"
          ></ha-textfield>
          <ha-formfield .label=${`Show Needle: ${n ? "On" : "Off"}`}>
              <ha-switch
              .checked=${n}
              .dataset=${{ configValue: B }}
              @change=${this._valueChanged}
              id="needle"
              ></ha-switch>
          </ha-formfield>

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield
                  label="Gauge Min Value"
                  type="number"
                  .value=${a}
                  .dataset=${{ configValue: X }}
                  @input=${this._valueChanged}
                  step="0.01"
                  id="gauge_min"
              ></ha-textfield>
              <ha-textfield
                  label="Gauge Max Value"
                  type="number"
                  .value=${h}
                  .dataset=${{ configValue: K }}
                  @input=${this._valueChanged}
                  step="0.01"
                  id="gauge_max"
              ></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield
                  label="Static Low Threshold"
                  type="number"
                  .value=${l}
                  .dataset=${{ configValue: Y }}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from Extreme Low to Low at this value"
                  id="static_low_threshold"
              ></ha-textfield>
              <ha-textfield
                  label="Static High Threshold"
                  type="number"
                  .value=${d}
                  .dataset=${{ configValue: J }}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from High to Extreme High at this value"
                  id="static_high_threshold"
              ></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label>
              <ha-color-picker
                .value=${c}
                .dataset=${{ configValue: me }}
                @color-changed=${this._colorChanged}
                id="extreme_low_picker"
              ></ha-color-picker>

              <label>Low:</label>
              <ha-color-picker
                .value=${_}
                .dataset=${{ configValue: ye }}
                @color-changed=${this._colorChanged}
                id="low_picker"
              ></ha-color-picker>

              <label>Good:</label>
              <ha-color-picker
                .value=${p}
                .dataset=${{ configValue: ve }}
                @color-changed=${this._colorChanged}
                id="good_picker"
              ></ha-color-picker>

              <label>High:</label>
              <ha-color-picker
                .value=${E}
                .dataset=${{ configValue: Ee }}
                @color-changed=${this._colorChanged}
                id="high_picker"
              ></ha-color-picker>

              <label>Extreme High:</label>
              <ha-color-picker
                .value=${Ve}
                .dataset=${{ configValue: Ae }}
                @color-changed=${this._colorChanged}
                id="extreme_high_picker"
              ></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return We`
        /* ... Keep styles as before ... */
        .card-config { display: flex; flex-direction: column; gap: 12px; }
        ha-entity-picker, ha-textfield, ha-formfield { display: block; }
        ha-switch { padding-top: 10px; }
        .side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; align-items: center; }
        h3 { margin-bottom: 0; margin-top: 8px; border-bottom: 1px solid var(--divider-color); padding-bottom: 4px;}
        label { text-align: right; padding-right: 8px; }
        ha-color-picker { width: 100%; /* Make picker take full width of cell */ }
      `;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", pt), console.info(
  "%c VPD-GAUGE-CARD-EDITOR %c Defined in main file ",
  "color: white; background: #039be5; font-weight: 700;",
  "color: #039be5; background: white; font-weight: 700;"
));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({
  /* ... */
});
console.log("VPD Gauge Card + Editor Script Loaded Successfully");
