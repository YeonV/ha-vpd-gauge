var oe = Object.defineProperty;
var ft = Object.getOwnPropertySymbols;
var re = Object.prototype.hasOwnProperty, ae = Object.prototype.propertyIsEnumerable;
var Y = (r, t, e) => t in r ? oe(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, x = (r, t) => {
  for (var e in t || (t = {}))
    re.call(t, e) && Y(r, e, t[e]);
  if (ft)
    for (var e of ft(t))
      ae.call(t, e) && Y(r, e, t[e]);
  return r;
};
var T = (r, t, e) => Y(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, lt = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), mt = /* @__PURE__ */ new WeakMap();
let Zt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (lt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = mt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && mt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const he = (r) => new Zt(typeof r == "string" ? r : r + "", void 0, ct), Qt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Zt(e, r, ct);
}, le = (r, t) => {
  if (lt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = B.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, $t = lt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return he(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ce, defineProperty: de, getOwnPropertyDescriptor: ue, getOwnPropertyNames: _e, getOwnPropertySymbols: ge, getPrototypeOf: pe } = Object, y = globalThis, yt = y.trustedTypes, fe = yt ? yt.emptyScript : "", J = y.reactiveElementPolyfillSupport, P = (r, t) => r, ht = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? fe : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch (i) {
        e = null;
      }
  }
  return e;
} }, te = (r, t) => !ce(r, t), Et = { attribute: !0, type: String, converter: ht, reflect: !1, useDefault: !1, hasChanged: te };
var jt, Bt;
(jt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Bt = y.litPropertyMetadata) != null || (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && de(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var n;
    const { get: s, set: o } = (n = ue(this.prototype, t)) != null ? n : { get() {
      return this[e];
    }, set(l) {
      this[e] = l;
    } };
    return { get: s, set(l) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, l), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : Et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = pe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [..._e(e), ...ge(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift($t(s));
    } else t !== void 0 && e.push($t(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return le(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ht).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n, l, a;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : ht;
      this._$Em = s, this[s] = (a = (l = c.fromAttribute(e, h.type)) != null ? l : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var s, o;
    if (t !== void 0) {
      const n = this.constructor, l = this[t];
      if (i != null || (i = n.getPropertyOptions(t)), !(((s = i.hasChanged) != null ? s : te)(l, e) || i.useDefault && i.reflect && l === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    var l, a, h;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = n != null ? n : e) != null ? a : this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
    var i, s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((i = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, l] of this._$Ep) this[n] = l;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, l] of o) {
        const { wrapped: a } = l, h = this[n];
        a !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, l, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
var Xt;
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[P("elementProperties")] = /* @__PURE__ */ new Map(), L[P("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: L }), ((Xt = y.reactiveElementVersions) != null ? Xt : y.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, X = k.trustedTypes, vt = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ee = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + $, me = `<${ie}>`, S = document, M = () => S.createComment(""), I = (r) => r === null || typeof r != "object" && typeof r != "function", dt = Array.isArray, $e = (r) => dt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, At = /-->/g, Ct = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, wt = /"/g, se = /^(?:script|style|textarea|title)$/i, ye = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), C = ye(1), H = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), St = /* @__PURE__ */ new WeakMap(), b = S.createTreeWalker(S, 129);
function ne(r, t) {
  if (!dt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vt !== void 0 ? vt.createHTML(t) : t;
}
const Ee = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = D;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, c, d = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, c = n.exec(a), c !== null); ) _ = n.lastIndex, n === D ? c[1] === "!--" ? n = At : c[1] !== void 0 ? n = Ct : c[2] !== void 0 ? (se.test(c[2]) && (s = RegExp("</" + c[2], "g")), n = A) : c[3] !== void 0 && (n = A) : n === A ? c[0] === ">" ? (n = s != null ? s : D, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? A : c[3] === '"' ? wt : bt) : n === wt || n === bt ? n = A : n === At || n === Ct ? n = D : (n = A, s = void 0);
    const g = n === A && r[l + 1].startsWith("/>") ? " " : "";
    o += n === D ? a + me : d >= 0 ? (i.push(h), a.slice(0, d) + ee + a.slice(d) + $ + g) : a + $ + (d === -2 ? l : g);
  }
  return [ne(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class G {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, c] = Ee(t, e);
    if (this.el = G.createElement(h, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = b.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(ee)) {
          const _ = c[n++], g = s.getAttribute(d).split($), p = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: p[2], strings: g, ctor: p[1] === "." ? Ae : p[1] === "?" ? Ce : p[1] === "@" ? be : K }), s.removeAttribute(d);
        } else d.startsWith($) && (a.push({ type: 6, index: o }), s.removeAttribute(d));
        if (se.test(s.tagName)) {
          const d = s.textContent.split($), _ = d.length - 1;
          if (_ > 0) {
            s.textContent = X ? X.emptyScript : "";
            for (let g = 0; g < _; g++) s.append(d[g], M()), b.nextNode(), a.push({ type: 2, index: ++o });
            s.append(d[_], M());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ie) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf($, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function U(r, t, e = r, i) {
  var n, l, a;
  if (t === H) return t;
  let s = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = I(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[i] = s : e._$Cl = s), s !== void 0 && (t = U(r, s._$AS(r, t.values), s, i)), t;
}
class ve {
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
    var h;
    const { el: { content: e }, parts: i } = this._$AD, s = ((h = t == null ? void 0 : t.creationScope) != null ? h : S).importNode(e, !0);
    b.currentNode = s;
    let o = b.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new F(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new we(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = b.nextNode(), n++);
    }
    return b.currentNode = S, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class F {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (o = s == null ? void 0 : s.isConnected) != null ? o : !0;
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
    t = U(this, t, e), I(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== H && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $e(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = G.createElement(ne(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const n = new ve(s, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = St.get(t.strings);
    return e === void 0 && St.set(t.strings, e = new G(t)), e;
  }
  k(t) {
    dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new F(this.O(M()), this.O(M()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = U(this, t, e, 0), n = !I(t) || t !== this._$AH && t !== H, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = U(this, l[i + a], e, a), h === H && (h = this._$AH[a]), n || (n = !I(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h != null ? h : "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Ae extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ce extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class be extends K {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var n;
    if ((t = (n = U(this, t, e, 0)) != null ? n : u) === H) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class we {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const Q = k.litHtmlPolyfillSupport;
var Kt;
Q == null || Q(G, F), ((Kt = k.litHtmlVersions) != null ? Kt : k.litHtmlVersions = []).push("3.3.0");
const Se = (r, t, e) => {
  var o, n;
  const i = (o = e == null ? void 0 : e.renderBefore) != null ? o : t;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (n = e == null ? void 0 : e.renderBefore) != null ? n : null;
    i._$litPart$ = s = new F(t.insertBefore(M(), l), l, void 0, e != null ? e : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class N extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, i;
    const t = super.createRenderRoot();
    return (i = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Se(e, this.renderRoot, this.renderOptions);
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
    return H;
  }
}
var Yt;
N._$litElement$ = !0, N.finalized = !0, (Yt = w.litElementHydrateSupport) == null || Yt.call(w, { LitElement: N });
const tt = w.litElementPolyfillSupport;
tt == null || tt({ LitElement: N });
var Jt;
((Jt = w.litElementVersions) != null ? Jt : w.litElementVersions = []).push("4.2.0");
const q = "entity", et = "name", it = "gauge_min", st = "gauge_max", W = "min_entity", z = "max_entity", Ot = "color_extreme_low", xt = "color_low", Tt = "color_good", Lt = "color_high", Nt = "color_extreme_high", nt = "static_low_threshold", ot = "static_high_threshold", Oe = "#1c2814", xe = "#406f1e", Te = "#689a46", Le = "#406f1e", Ne = "#1c2814", Ht = 1, Ut = 1.2, Rt = 0.8, Dt = 1.3;
class He extends N {
  constructor() {
    super(...arguments);
    T(this, "_initialized", !1);
    T(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers (Use Arrow Functions) ---
    T(this, "_valueChanged", (e) => {
      var l;
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue;
      let o = i.value;
      if (!s) {
        console.warn("No configValue dataset found for target:", i);
        return;
      }
      i.type === "number" ? o = o === "" ? void 0 : parseFloat(o) : i.tagName === "HA-ENTITY-PICKER" && ((l = e.detail) == null ? void 0 : l.value) !== void 0 && (o = e.detail.value);
      const n = x({}, this._config);
      o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? s !== q && s !== W && s !== z ? delete n[s] : n[s] = "" : n[s] = o, this._config = n, this.fireConfigChanged();
    });
    T(this, "_colorChanged", (e) => {
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue, o = e.detail.value;
      if (!s) {
        console.warn("No configValue dataset found for color picker:", i);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${s}, Value=${o}`);
      const n = x({}, this._config);
      o ? n[s] = o.toUpperCase() : delete n[s], this._config = n, this.fireConfigChanged();
    });
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object, state: !0 } };
  }
  setConfig(e) {
    console.log("[Editor] setConfig called with:", e), this._config = x({}, e), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => {
      this._initialized || this.firstUpdated(), this.loadEditorValues();
    });
  }
  set hass(e) {
    var i;
    this._hass = e, this._initialized && ((i = this._elements) != null && i.pickers) && Object.values(this._elements.pickers).forEach((s) => {
      s && (s.hass = this._hass);
    });
  }
  firstUpdated() {
    this._initialized || (this._storeElementReferences(), this._attachInputListeners(), this.loadEditorValues(), this._initialized = !0, console.log("[Editor] Initialized via firstUpdated."));
  }
  _storeElementReferences() {
    const e = this.shadowRoot;
    if (!e) return;
    this._elements.pickers.entity = e.querySelector("#entity"), this._elements.pickers.min_entity = e.querySelector("#min_entity"), this._elements.pickers.max_entity = e.querySelector("#max_entity"), this._elements.inputs.name = e.querySelector("#name"), this._elements.inputs.gauge_min = e.querySelector("#gauge_min"), this._elements.inputs.gauge_max = e.querySelector("#gauge_max"), this._elements.inputs.static_low_threshold = e.querySelector("#static_low_threshold"), this._elements.inputs.static_high_threshold = e.querySelector("#static_high_threshold");
    const i = ["extreme_low", "low", "good", "high", "extreme_high"];
    this._elements.colors = {}, i.forEach((s) => {
      this._elements.colors[s] = { picker: e.querySelector(`#${s}_picker`) };
    }), console.log("[Editor] Elements stored:", this._elements);
  }
  _attachInputListeners() {
    var e, i, s, o, n, l, a, h, c;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (e = this._elements.pickers.entity) == null || e.addEventListener("value-changed", this._valueChanged), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", this._valueChanged), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", this._valueChanged), (o = this._elements.inputs.name) == null || o.addEventListener("input", this._valueChanged), (n = this._elements.inputs.gauge_min) == null || n.addEventListener("input", this._valueChanged), (l = this._elements.inputs.gauge_max) == null || l.addEventListener("input", this._valueChanged), (a = this._elements.inputs.static_low_threshold) == null || a.addEventListener("input", this._valueChanged), (h = this._elements.inputs.static_high_threshold) == null || h.addEventListener("input", this._valueChanged);
      for (const d in this._elements.colors)
        (c = this._elements.colors[d].picker) == null || c.addEventListener("color-changed", this._colorChanged);
    }
  }
  loadEditorValues() {
    var i, s;
    if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) {
      console.warn("[Editor] Cannot load values yet.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const e = (o, n, l = "") => {
      o && (o.value = n != null ? n : l);
    };
    e(this._elements.pickers.entity, this._config[q]), e(this._elements.pickers.min_entity, this._config[W]), e(this._elements.pickers.max_entity, this._config[z]), e(this._elements.inputs.name, this._config[et]), e(this._elements.inputs.gauge_min, this._config[it], Rt), e(this._elements.inputs.gauge_max, this._config[st], Dt), e(this._elements.inputs.static_low_threshold, this._config[nt], Ht), e(this._elements.inputs.static_high_threshold, this._config[ot], Ut);
    for (const o in this._elements.colors) {
      const n = (i = this._elements.colors[o]) == null ? void 0 : i.picker;
      if (n) {
        const l = `color_${o}`, a = `DEFAULT_COLOR_${o.toUpperCase()}`, h = window[a] !== void 0 ? window[a] : "#000000";
        n.value = (s = this._config[l]) != null ? s : h;
      }
    }
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((o) => {
      o && (o.hass = this._hass);
    });
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const e = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 });
    this.dispatchEvent(e);
  }
  render() {
    var O, E, v, R;
    if (!this._hass) return C`Waiting for hass...`;
    if (!this._config) return C`Waiting for config...`;
    const e = this._config[et] || "", i = this._config[q] || "", s = this._config[W] || "", o = this._config[z] || "", n = (O = this._config[it]) != null ? O : Rt, l = (E = this._config[st]) != null ? E : Dt, a = (v = this._config[nt]) != null ? v : Ht, h = (R = this._config[ot]) != null ? R : Ut, c = this._config[Ot] || Oe, d = this._config[xt] || xe, _ = this._config[Tt] || Te, g = this._config[Lt] || Le, p = this._config[Nt] || Ne;
    return C`
          <div class="card-config">
            <h3>Required Entities</h3>
            <ha-entity-picker
              label="VPD Sensor Entity"
              .hass=${this._hass}
              .value=${i}
              data-config-value=${q} <!-- Set data- attribute -->
              @value-changed=${this._valueChanged}
              allow-custom-entity
              required
              id="entity"
            ></ha-entity-picker>
            <ha-entity-picker
              label="Min Threshold Entity (Number)"
              .hass=${this._hass}
              .value=${s}
              data-config-value=${W} <!-- Set data- attribute -->
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
              data-config-value=${z} <!-- Set data- attribute -->
              @value-changed=${this._valueChanged}
              .includeDomains=${["number"]}
              allow-custom-entity
              required
              id="max_entity"
            ></ha-entity-picker>
    
            <h3>Appearance</h3>
            <ha-textfield
              label="Name (Optional)"
              .value=${e}
              data-config-value=${et} <!-- Set data- attribute -->
              @input=${this._valueChanged}
              id="name"
            ></ha-textfield>
            <!-- Needle Removed -->
    
            <h3>Gauge Range & Static Thresholds</h3>
            <div class="side-by-side">
                <ha-textfield
                    label="Gauge Min Value" type="number" .value=${n}
                    data-config-value=${it} <!-- Set data- attribute -->
                    @input=${this._valueChanged} step="0.01" id="gauge_min"
                ></ha-textfield>
                <ha-textfield
                    label="Gauge Max Value" type="number" .value=${l}
                    data-config-value=${st} <!-- Set data- attribute -->
                    @input=${this._valueChanged} step="0.01" id="gauge_max"
                ></ha-textfield>
            </div>
             <div class="side-by-side">
                <ha-textfield
                    label="Static Low Threshold" type="number" .value=${a}
                    data-config-value=${nt} <!-- Set data- attribute -->
                    @input=${this._valueChanged} step="0.01"
                    title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"
                ></ha-textfield>
                <ha-textfield
                    label="Static High Threshold" type="number" .value=${h}
                    data-config-value=${ot} <!-- Set data- attribute -->
                    @input=${this._valueChanged} step="0.01"
                    title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"
                ></ha-textfield>
            </div>
    
             <h3>Segment Colors</h3>
             <div class="color-grid">
                <label>Extreme Low:</label>
                <ha-color-picker .value=${c}
                  data-config-value=${Ot} <!-- Set data- attribute -->
                  @color-changed=${this._colorChanged} id="extreme_low_picker"
                ></ha-color-picker>
                <label>Low:</label>
                <ha-color-picker .value=${d}
                  data-config-value=${xt} <!-- Set data- attribute -->
                  @color-changed=${this._colorChanged} id="low_picker"
                ></ha-color-picker>
                <label>Good:</label>
                <ha-color-picker .value=${_}
                  data-config-value=${Tt} <!-- Set data- attribute -->
                  @color-changed=${this._colorChanged} id="good_picker"
                ></ha-color-picker>
                <label>High:</label>
                <ha-color-picker .value=${g}
                  data-config-value=${Lt} <!-- Set data- attribute -->
                  @color-changed=${this._colorChanged} id="high_picker"
                ></ha-color-picker>
                <label>Extreme High:</label>
                <ha-color-picker .value=${p}
                  data-config-value=${Nt} <!-- Set data- attribute -->
                  @color-changed=${this._colorChanged} id="extreme_high_picker"
                ></ha-color-picker>
             </div>
          </div>
        `;
  }
  static get styles() {
    return Qt`...`;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", He), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
const j = "entity", rt = "name", Pt = "min_entity", kt = "max_entity", Mt = "#1c2814", It = "#406f1e", Gt = "#689a46", Ft = "#406f1e", Vt = "#1c2814", qt = 1, Wt = 1.2, at = 0.8, zt = 1.3;
class Ue extends N {
  constructor() {
    super(...arguments);
    T(this, "_calculateSegments", () => {
      var ut, _t, gt;
      const e = this.config, i = this.hass;
      if (!i || !e || !e[Pt] || !e[kt])
        return console.warn("VPD Gauge: Data missing for segment calc."), [];
      const s = (ut = e.gauge_min) != null ? ut : at, o = e.min_entity, n = e.max_entity, l = (_t = e.static_low_threshold) != null ? _t : qt, a = (gt = e.static_high_threshold) != null ? gt : Wt, h = e.color_extreme_low || Mt, c = e.color_low || It, d = e.color_good || Gt, _ = e.color_high || Ft, g = e.color_extreme_high || Vt, p = i.states[o], O = i.states[n];
      let E = l;
      p && !isNaN(parseFloat(p.state)) ? E = parseFloat(p.state) : console.warn(`VPD Gauge: Invalid min_entity state (${o}), using static fallback ${E}`);
      let v = a;
      O && !isNaN(parseFloat(O.state)) ? v = parseFloat(O.state) : console.warn(`VPD Gauge: Invalid max_entity state (${n}), using static fallback ${v}`);
      const R = [{ from: s, color: h }, { from: l, color: c }, { from: E, color: d }, { from: v, color: _ }, { from: a, color: g }];
      R.sort((f, V) => f.from - V.from);
      const m = R.filter((f, V, pt) => !(f.from < s || V < pt.length - 1 && pt[V + 1].from === f.from));
      if (m.length === 0 || m[0].from > s) {
        let f = h;
        s >= a ? f = g : s >= v ? f = _ : s >= E ? f = d : s >= l && (f = c), m.unshift({ from: s, color: f }), m.length > 1 && m[1].from === m[0].from && m.shift();
      }
      return m;
    });
  }
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }
  setConfig(e) {
    if (!e || !e[j]) throw new Error("Entity is required");
    if (!e[Pt]) throw new Error("Min entity is required");
    if (!e[kt]) throw new Error("Max entity is required");
    const i = { gauge_min: at, gauge_max: zt, static_low_threshold: qt, static_high_threshold: Wt, color_extreme_low: Mt, color_low: It, color_good: Gt, color_high: Ft, color_extreme_high: Vt, name: "" };
    this.config = x(x({}, i), e), console.log("VPD Gauge Card Config Set:", this.config), this.hass && this.requestUpdate();
  }
  render() {
    var o, n;
    if (!this.hass || !this.config || !this.config[j]) return C`<ha-card><div class="warning">Config required</div></ha-card>`;
    const e = this.hass.states[this.config[j]], i = e ? parseFloat(e.state) : void 0;
    if (e === void 0) return C`<ha-card header="${this.config[rt] || "VPD"}"><div class="warning">Entity not found: ${this.config[j]}</div></ha-card>`;
    if (i === void 0 || isNaN(i)) return C`<ha-card header="${this.config[rt] || "VPD"}"><div class="warning">Invalid state: ${e.state}</div></ha-card>`;
    const s = this._calculateSegments();
    return C`
      <ha-card header="${this.config[rt] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(o = this.config.gauge_min) != null ? o : at}
            .max=${(n = this.config.gauge_max) != null ? n : zt}
            .segments=${s}
            needle /* Needle always on */
            style="--gauge-color: var(--primary-text-color);"
          ></ha-gauge>
        </div>
      </ha-card>
    `;
  }
  getCardSize() {
    return 3;
  }
  // --- Use whenDefined for Editor ---
  static async getConfigElement() {
    return await customElements.whenDefined("vpd-gauge-card-editor"), console.log("getConfigElement: vpd-gauge-card-editor is defined, creating element."), document.createElement("vpd-gauge-card-editor");
  }
  // ---------------------------------
  static getStubConfig(e, i, s) {
    const o = i.find((h) => h.startsWith("sensor.") && h.includes("vpd")) || s.find((h) => h.startsWith("sensor.") && h.includes("vpd")), n = o ? o.split(".").pop().replace("_vpd_mqtt", "").replace("_vpd", "") : null, l = i.find((h) => h.startsWith("number.") && h.includes("min") && (n ? h.includes(n) : !0)) || s.find((h) => h.startsWith("number.") && h.includes("min")), a = i.find((h) => h.startsWith("number.") && h.includes("max") && (n ? h.includes(n) : !0)) || s.find((h) => h.startsWith("number.") && h.includes("max"));
    return console.log("StubConfig Found: VPD=", o, "Min=", l, "Max=", a), { type: "custom:vpd-gauge-card", entity: o || "", min_entity: l || "", max_entity: a || "", name: n ? `${n.replace(/_/g, " ")} VPD Gauge` : "VPD Gauge" };
  }
  static get styles() {
    return Qt`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`;
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", Ue), console.info("%c VPD-GAUGE-CARD %c Loaded ", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({ type: "vpd-gauge-card", name: "VPD Gauge Card", description: "A gauge card with dynamic segments based on min/max threshold entities.", preview: !0 });
console.log("VPD Gauge Card Script Loaded Successfully");
