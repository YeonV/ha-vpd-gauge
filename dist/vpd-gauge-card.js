var De = Object.defineProperty;
var re = Object.getOwnPropertySymbols;
var Ve = Object.prototype.hasOwnProperty, Ie = Object.prototype.propertyIsEnumerable;
var G = (r, e, t) => e in r ? De(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, N = (r, e) => {
  for (var t in e || (e = {}))
    Ve.call(e, t) && G(r, t, e[t]);
  if (re)
    for (var t of re(e))
      Ie.call(e, t) && G(r, t, e[t]);
  return r;
};
var w = (r, e, t) => G(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, Q = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let ke = class {
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
const Ge = (r) => new ke(typeof r == "string" ? r : r + "", void 0, ee), Fe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new ke(t, r, ee);
}, ze = (r, e) => {
  if (Q) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, he = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ge(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qe, defineProperty: je, getOwnPropertyDescriptor: We, getOwnPropertyNames: Be, getOwnPropertySymbols: Ke, getPrototypeOf: Xe } = Object, f = globalThis, le = f.trustedTypes, Ye = le ? le.emptyScript : "", F = f.reactiveElementPolyfillSupport, O = (r, e) => r, Z = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ye : null;
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
} }, Ue = (r, e) => !qe(r, e), ce = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: Ue };
var we, xe;
(we = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (xe = f.litPropertyMetadata) != null || (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ce) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && je(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: s, set: o } = (n = We(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(h) {
      this[t] = h;
    } };
    return { get: s, set(h) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, h), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const e = Xe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const t = this.properties, i = [...Be(t), ...Ke(t)];
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
      for (const s of i) t.unshift(he(s));
    } else e !== void 0 && t.push(he(e));
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
    var o, n, h, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : Z;
      this._$Em = s, this[s] = (a = (h = c.fromAttribute(t, l.type)) != null ? h : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, o;
    if (e !== void 0) {
      const n = this.constructor, h = this[e];
      if (i != null || (i = n.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : Ue)(h, t) || i.useDefault && i.reflect && h === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, n) {
    var h, a, l;
    i && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = n != null ? n : t) != null ? a : this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, h] of this._$Ep) this[n] = h;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, h] of o) {
        const { wrapped: a } = h, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, h, l);
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
var Oe;
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[O("elementProperties")] = /* @__PURE__ */ new Map(), A[O("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: A }), ((Oe = f.reactiveElementVersions) != null ? Oe : f.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, V = T.trustedTypes, de = V ? V.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ne = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, Re = "?" + g, Je = `<${Re}>`, E = document, L = () => E.createComment(""), H = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, Ze = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", z = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ue = /-->/g, _e = />/g, $ = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ge = /"/g, Pe = /^(?:script|style|textarea|title)$/i, Qe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), q = Qe(1), b = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), m = E.createTreeWalker(E, 129);
function Me(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const et = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = x;
  for (let h = 0; h < t; h++) {
    const a = r[h];
    let l, c, d = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, c = n.exec(a), c !== null); ) _ = n.lastIndex, n === x ? c[1] === "!--" ? n = ue : c[1] !== void 0 ? n = _e : c[2] !== void 0 ? (Pe.test(c[2]) && (s = RegExp("</" + c[2], "g")), n = $) : c[3] !== void 0 && (n = $) : n === $ ? c[0] === ">" ? (n = s != null ? s : x, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, l = c[1], n = c[3] === void 0 ? $ : c[3] === '"' ? ge : pe) : n === ge || n === pe ? n = $ : n === ue || n === _e ? n = x : (n = $, s = void 0);
    const p = n === $ && r[h + 1].startsWith("/>") ? " " : "";
    o += n === x ? a + Je : d >= 0 ? (i.push(l), a.slice(0, d) + Ne + a.slice(d) + g + p) : a + g + (d === -2 ? h : p);
  }
  return [Me(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class k {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const h = e.length - 1, a = this.parts, [l, c] = et(e, t);
    if (this.el = k.createElement(l, i), m.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = m.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Ne)) {
          const _ = c[n++], p = s.getAttribute(d).split(g), v = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: v[2], strings: p, ctor: v[1] === "." ? it : v[1] === "?" ? st : v[1] === "@" ? nt : I }), s.removeAttribute(d);
        } else d.startsWith(g) && (a.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Pe.test(s.tagName)) {
          const d = s.textContent.split(g), _ = d.length - 1;
          if (_ > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < _; p++) s.append(d[p], L()), m.nextNode(), a.push({ type: 2, index: ++o });
            s.append(d[_], L());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Re) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(g, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += g.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function S(r, e, t = r, i) {
  var n, h, a;
  if (e === b) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = H(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = S(r, s._$AS(r, e.values), s, i)), e;
}
class tt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((l = e == null ? void 0 : e.creationScope) != null ? l : E).importNode(t, !0);
    m.currentNode = s;
    let o = m.nextNode(), n = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new U(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new ot(o, this, e)), this._$AV.push(c), a = i[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = m.nextNode(), n++);
    }
    return m.currentNode = E, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class U {
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
    e = S(this, e, t), H(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== b && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = k.createElement(Me(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new tt(s, this), h = n.u(this.options);
      n.p(t), this.T(h), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new k(e)), t;
  }
  k(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new U(this.O(L()), this.O(L()), this, this.options)) : i = t[s], i._$AI(o), s++;
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
class I {
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
    if (o === void 0) e = S(this, e, t, 0), n = !H(e) || e !== this._$AH && e !== b, n && (this._$AH = e);
    else {
      const h = e;
      let a, l;
      for (e = o[0], a = 0; a < o.length - 1; a++) l = S(this, h[i + a], t, a), l === b && (l = this._$AH[a]), n || (n = !H(l) || l !== this._$AH[a]), l === u ? e = u : e !== u && (e += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class it extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class st extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class nt extends I {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = S(this, e, t, 0)) != null ? n : u) === b) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class ot {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const j = T.litHtmlPolyfillSupport;
var Te;
j == null || j(k, U), ((Te = T.litHtmlVersions) != null ? Te : T.litHtmlVersions = []).push("3.3.0");
const rt = (r, e, t) => {
  var o, n;
  const i = (o = t == null ? void 0 : t.renderBefore) != null ? o : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const h = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = s = new U(e.insertBefore(L(), h), h, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class C extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(t, this.renderRoot, this.renderOptions);
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
    return b;
  }
}
var Le;
C._$litElement$ = !0, C.finalized = !0, (Le = y.litElementHydrateSupport) == null || Le.call(y, { LitElement: C });
const W = y.litElementPolyfillSupport;
W == null || W({ LitElement: C });
var He;
((He = y.litElementVersions) != null ? He : y.litElementVersions = []).push("4.2.0");
const R = "entity", B = "name", K = "gauge_min", X = "gauge_max", P = "min_entity", M = "max_entity", $e = "color_extreme_low", me = "color_low", ye = "color_good", Ee = "color_high", ve = "color_extreme_high", Y = "static_low_threshold", J = "static_high_threshold", at = "#1c2814", ht = "#406f1e", lt = "#689a46", ct = "#406f1e", dt = "#1c2814", Ae = 1, Ce = 1.2, be = 0.8, Se = 1.3;
class ut extends C {
  constructor() {
    super(...arguments);
    w(this, "_initialized", !1);
    w(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers (Use Arrow Functions for 'this' context) ---
    w(this, "_valueChanged", (t) => {
      var h;
      if (!this._config) return;
      const i = t.target, s = i.dataset.configValue;
      let o = i.value;
      if (!s) return;
      i.type === "number" ? o = o === "" ? void 0 : parseFloat(o) : i.tagName === "HA-ENTITY-PICKER" && ((h = t.detail) == null ? void 0 : h.value) !== void 0 && (o = t.detail.value);
      const n = N({}, this._config);
      o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? s !== R && s !== P && s !== M ? delete n[s] : n[s] = "" : n[s] = o, this._config = n, this.fireConfigChanged();
    });
    w(this, "_colorChanged", (t) => {
      if (!this._config) return;
      const s = t.target.dataset.configValue, o = t.detail.value;
      if (!s) return;
      console.log(`[Editor] Color Changed: Key=${s}, Value=${o}`);
      const n = N({}, this._config);
      o ? n[s] = o.toUpperCase() : delete n[s], this._config = n, this.fireConfigChanged();
    });
  }
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
    };
  }
  setConfig(t) {
    console.log("[Editor] setConfig called with:", t), this._config = N({}, t), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => this.loadEditorValues());
  }
  set hass(t) {
    var i;
    this._hass = t, this._initialized && ((i = this._elements) != null && i.pickers) && Object.values(this._elements.pickers).forEach((s) => {
      s && (s.hass = this._hass);
    });
  }
  firstUpdated(t) {
    super.firstUpdated(t), this._initialized || (this._storeElementReferences(), this._attachInputListeners(), this.loadEditorValues(), this._initialized = !0, console.log("[Editor] Initialized and values loaded."));
  }
  _storeElementReferences() {
    const t = this.shadowRoot;
    if (!t) return;
    this._elements.pickers.entity = t.querySelector("#entity"), this._elements.pickers.min_entity = t.querySelector("#min_entity"), this._elements.pickers.max_entity = t.querySelector("#max_entity"), this._elements.inputs.name = t.querySelector("#name"), this._elements.inputs.gauge_min = t.querySelector("#gauge_min"), this._elements.inputs.gauge_max = t.querySelector("#gauge_max"), this._elements.inputs.static_low_threshold = t.querySelector("#static_low_threshold"), this._elements.inputs.static_high_threshold = t.querySelector("#static_high_threshold");
    const i = ["extreme_low", "low", "good", "high", "extreme_high"];
    this._elements.colors = {}, i.forEach((s) => {
      this._elements.colors[s] = {
        picker: t.querySelector(`#${s}_picker`)
      };
    }), console.log("[Editor] Elements stored:", this._elements);
  }
  _attachInputListeners() {
    var t, i, s, o, n, h, a, l, c;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", this._valueChanged), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", this._valueChanged), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", this._valueChanged), (o = this._elements.inputs.name) == null || o.addEventListener("input", this._valueChanged), (n = this._elements.inputs.gauge_min) == null || n.addEventListener("input", this._valueChanged), (h = this._elements.inputs.gauge_max) == null || h.addEventListener("input", this._valueChanged), (a = this._elements.inputs.static_low_threshold) == null || a.addEventListener("input", this._valueChanged), (l = this._elements.inputs.static_high_threshold) == null || l.addEventListener("input", this._valueChanged);
      for (const d in this._elements.colors)
        (c = this._elements.colors[d].picker) == null || c.addEventListener("color-changed", this._colorChanged);
    }
  }
  loadEditorValues() {
    var i, s;
    if (!this._config || !this.shadowRoot || !this._elements) {
      console.warn("[Editor] Cannot load values yet.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const t = (o, n, h = "") => {
      o && (o.value = n != null ? n : h);
    };
    t(this._elements.pickers.entity, this._config[R]), t(this._elements.pickers.min_entity, this._config[P]), t(this._elements.pickers.max_entity, this._config[M]), t(this._elements.inputs.name, this._config[B]), t(this._elements.inputs.gauge_min, this._config[K], be), t(this._elements.inputs.gauge_max, this._config[X], Se), t(this._elements.inputs.static_low_threshold, this._config[Y], Ae), t(this._elements.inputs.static_high_threshold, this._config[J], Ce);
    for (const o in this._elements.colors) {
      const n = (i = this._elements.colors[o]) == null ? void 0 : i.picker;
      if (n) {
        const h = `color_${o}`, a = `DEFAULT_COLOR_${o.toUpperCase()}`, l = window[a] !== void 0 ? window[a] : "#000000";
        n.value = (s = this._config[h]) != null ? s : l;
      }
    }
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((o) => {
      o && (o.hass = this._hass);
    });
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const t = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  render() {
    var ie, se, ne, oe;
    if (!this._hass) return q`Waiting for hass...`;
    if (!this._config) return q`Waiting for config...`;
    const t = this._config[B] || "", i = this._config[R] || "", s = this._config[P] || "", o = this._config[M] || "", n = (ie = this._config[K]) != null ? ie : be, h = (se = this._config[X]) != null ? se : Se, a = (ne = this._config[Y]) != null ? ne : Ae, l = (oe = this._config[J]) != null ? oe : Ce, c = this._config[$e] || at, d = this._config[me] || ht, _ = this._config[ye] || lt, p = this._config[Ee] || ct, v = this._config[ve] || dt;
    return q`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} .dataset=${{ configValue: R }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} .dataset=${{ configValue: P }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${o} .dataset=${{ configValue: M }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${t} .dataset=${{ configValue: B }} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Switch Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${n} .dataset=${{ configValue: K }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${h} .dataset=${{ configValue: X }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${a} .dataset=${{ configValue: Y }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${l} .dataset=${{ configValue: J }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${c} .dataset=${{ configValue: $e }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${d} .dataset=${{ configValue: me }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${_} .dataset=${{ configValue: ye }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${p} .dataset=${{ configValue: Ee }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${v} .dataset=${{ configValue: ve }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return Fe`
        /* ... Keep styles as before ... */
        .card-config { display: flex; flex-direction: column; gap: 12px; }
        ha-entity-picker, ha-textfield, ha-formfield { display: block; }
        /* ha-switch removed */
        .side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; align-items: center; }
        h3 { margin-bottom: 0; margin-top: 8px; border-bottom: 1px solid var(--divider-color); padding-bottom: 4px;}
        label { text-align: right; padding-right: 8px; }
        ha-color-picker { width: 100%; /* Make picker take full width of cell */ }
      `;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", ut), console.info(
  "%c VPD-GAUGE-CARD-EDITOR %c Defined"
  /* ... */
));
class _t extends C {
  // --- PASTE THE ENTIRE VpdGaugeCard CLASS CODE HERE ---
  // Including: static get properties, setConfig, _calculateSegments, render,
  // getCardSize, static getConfigElement, static getStubConfig, static get styles
  // MAKE SURE setConfig DOES NOT include needle default
  // MAKE SURE render DOES NOT reference needle config
  // MAKE SURE _calculateSegments IS THE FINAL CORRECTED VERSION
  // ------------------------------------------------------
  // --- Modify getConfigElement ---
  static getConfigElement() {
    return console.log("getConfigElement: Creating vpd-gauge-card-editor element."), document.createElement("vpd-gauge-card-editor");
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", _t), console.info(
  "%c VPD-GAUGE-CARD %c Loaded "
  /* ... */
));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({
  /* ... */
});
console.log("VPD Gauge Card + Editor Script Loaded Successfully");
