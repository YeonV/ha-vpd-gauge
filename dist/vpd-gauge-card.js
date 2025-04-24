var ot = Object.defineProperty;
var fe = Object.getOwnPropertySymbols;
var rt = Object.prototype.hasOwnProperty, at = Object.prototype.propertyIsEnumerable;
var Y = (r, e, t) => e in r ? ot(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, x = (r, e) => {
  for (var t in e || (e = {}))
    rt.call(e, t) && Y(r, t, e[t]);
  if (fe)
    for (var t of fe(e))
      at.call(e, t) && Y(r, t, e[t]);
  return r;
};
var V = (r, e, t) => Y(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, le = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (r) => new Ze(typeof r == "string" ? r : r + "", void 0, ce), Qe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Ze(t, r, ce);
}, lt = (r, e) => {
  if (le) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = B.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, $e = le ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ht(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: ut, getOwnPropertyNames: _t, getOwnPropertySymbols: gt, getPrototypeOf: pt } = Object, y = globalThis, ye = y.trustedTypes, ft = ye ? ye.emptyScript : "", J = y.reactiveElementPolyfillSupport, D = (r, e) => r, he = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? ft : null;
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
} }, et = (r, e) => !ct(r, e), ve = { attribute: !0, type: String, converter: he, reflect: !1, useDefault: !1, hasChanged: et };
var ze, Be;
(ze = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Be = y.litPropertyMetadata) != null || (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let T = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ve) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && dt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: s, set: o } = (n = ut(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: s, set(l) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, l), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const t = this.properties, i = [..._t(t), ...gt(t)];
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
      for (const s of i) t.unshift($e(s));
    } else e !== void 0 && t.push($e(e));
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
    return lt(e, this.constructor.elementStyles), e;
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
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : he).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n, l, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), d = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : he;
      this._$Em = s, this[s] = (a = (l = d.fromAttribute(t, h.type)) != null ? l : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, o;
    if (e !== void 0) {
      const n = this.constructor, l = this[e];
      if (i != null || (i = n.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : et)(l, t) || i.useDefault && i.reflect && l === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, n) {
    var l, a, h;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = n != null ? n : t) != null ? a : this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, l] of this._$Ep) this[n] = l;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, l] of o) {
        const { wrapped: a } = l, h = this[n];
        a !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, l, h);
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
var Xe;
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[D("elementProperties")] = /* @__PURE__ */ new Map(), T[D("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: T }), ((Xe = y.reactiveElementVersions) != null ? Xe : y.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, X = P.trustedTypes, Ee = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, tt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, it = "?" + $, mt = `<${it}>`, S = document, k = () => S.createComment(""), M = (r) => r === null || typeof r != "object" && typeof r != "function", de = Array.isArray, $t = (r) => de(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ae = /-->/g, Ce = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, be = /"/g, st = /^(?:script|style|textarea|title)$/i, yt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), C = yt(1), N = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), w = S.createTreeWalker(S, 129);
function nt(r, e) {
  if (!de(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ee !== void 0 ? Ee.createHTML(e) : e;
}
const vt = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = R;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let h, d, c = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, d = n.exec(a), d !== null); ) _ = n.lastIndex, n === R ? d[1] === "!--" ? n = Ae : d[1] !== void 0 ? n = Ce : d[2] !== void 0 ? (st.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = A) : d[3] !== void 0 && (n = A) : n === A ? d[0] === ">" ? (n = s != null ? s : R, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? A : d[3] === '"' ? be : we) : n === be || n === we ? n = A : n === Ae || n === Ce ? n = R : (n = A, s = void 0);
    const g = n === A && r[l + 1].startsWith("/>") ? " " : "";
    o += n === R ? a + mt : c >= 0 ? (i.push(h), a.slice(0, c) + tt + a.slice(c) + $ + g) : a + $ + (c === -2 ? l : g);
  }
  return [nt(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [h, d] = vt(e, t);
    if (this.el = I.createElement(h, i), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(tt)) {
          const _ = d[n++], g = s.getAttribute(c).split($), p = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: p[2], strings: g, ctor: p[1] === "." ? At : p[1] === "?" ? Ct : p[1] === "@" ? wt : K }), s.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (st.test(s.tagName)) {
          const c = s.textContent.split($), _ = c.length - 1;
          if (_ > 0) {
            s.textContent = X ? X.emptyScript : "";
            for (let g = 0; g < _; g++) s.append(c[g], k()), w.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[_], k());
          }
        }
      } else if (s.nodeType === 8) if (s.data === it) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function H(r, e, t = r, i) {
  var n, l, a;
  if (e === N) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = M(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = H(r, s._$AS(r, e.values), s, i)), e;
}
class Et {
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
    var h;
    const { el: { content: t }, parts: i } = this._$AD, s = ((h = e == null ? void 0 : e.creationScope) != null ? h : S).importNode(t, !0);
    w.currentNode = s;
    let o = w.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new G(o, o.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (d = new bt(o, this, e)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = w.nextNode(), n++);
    }
    return w.currentNode = S, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class G {
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
    e = H(this, e, t), M(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== N && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $t(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && M(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(nt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new Et(s, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Se.get(e.strings);
    return t === void 0 && Se.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new G(this.O(k()), this.O(k()), this, this.options)) : i = t[s], i._$AI(o), s++;
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
class K {
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
    if (o === void 0) e = H(this, e, t, 0), n = !M(e) || e !== this._$AH && e !== N, n && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = o[0], a = 0; a < o.length - 1; a++) h = H(this, l[i + a], t, a), h === N && (h = this._$AH[a]), n || (n = !M(h) || h !== this._$AH[a]), h === u ? e = u : e !== u && (e += (h != null ? h : "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class At extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Ct extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class wt extends K {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = H(this, e, t, 0)) != null ? n : u) === N) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class bt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    H(this, e);
  }
}
const Q = P.litHtmlPolyfillSupport;
var Ke;
Q == null || Q(I, G), ((Ke = P.litHtmlVersions) != null ? Ke : P.litHtmlVersions = []).push("3.3.0");
const St = (r, e, t) => {
  var o, n;
  const i = (o = t == null ? void 0 : t.renderBefore) != null ? o : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = s = new G(e.insertBefore(k(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class L extends T {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = St(t, this.renderRoot, this.renderOptions);
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
    return N;
  }
}
var Ye;
L._$litElement$ = !0, L.finalized = !0, (Ye = b.litElementHydrateSupport) == null || Ye.call(b, { LitElement: L });
const ee = b.litElementPolyfillSupport;
ee == null || ee({ LitElement: L });
var Je;
((Je = b.litElementVersions) != null ? Je : b.litElementVersions = []).push("4.2.0");
const q = "entity", te = "name", ie = "gauge_min", se = "gauge_max", W = "min_entity", j = "max_entity", Oe = "color_extreme_low", xe = "color_low", Te = "color_good", Le = "color_high", Ne = "color_extreme_high", ne = "static_low_threshold", oe = "static_high_threshold", Ot = "#1c2814", xt = "#406f1e", Tt = "#689a46", Lt = "#406f1e", Nt = "#1c2814", He = 1, Ue = 1.2, Re = 0.8, De = 1.3;
class Ht extends L {
  constructor() {
    super(...arguments);
    V(this, "_initialized", !1);
    V(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object, state: !0 } };
  }
  // Keep structure
  setConfig(t) {
    console.log("[Editor] setConfig received:", t), this._config = x({}, t);
  }
  set hass(t) {
    var i;
    this._hass = t, this._initialized && ((i = this._elements) != null && i.pickers) && Object.values(this._elements.pickers).forEach((s) => {
      s && (s.hass = this._hass);
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this._initialized || (this._storeElementReferences(), this._attachInputListeners(), this.loadEditorValues(), this._initialized = !0, console.log("[Editor] Initialized via firstUpdated."));
  }
  _storeElementReferences() {
    const t = this.shadowRoot;
    if (!t) return;
    this._elements.pickers.entity = t.querySelector("#entity"), this._elements.pickers.min_entity = t.querySelector("#min_entity"), this._elements.pickers.max_entity = t.querySelector("#max_entity"), this._elements.inputs.name = t.querySelector("#name"), this._elements.inputs.gauge_min = t.querySelector("#gauge_min"), this._elements.inputs.gauge_max = t.querySelector("#gauge_max"), this._elements.inputs.static_low_threshold = t.querySelector("#static_low_threshold"), this._elements.inputs.static_high_threshold = t.querySelector("#static_high_threshold");
    const i = ["extreme_low", "low", "good", "high", "extreme_high"];
    this._elements.colors = {}, i.forEach((s) => {
      this._elements.colors[s] = { picker: t.querySelector(`#${s}_picker`) };
    }), console.log("[Editor] Elements stored:", this._elements);
  }
  _attachInputListeners() {
    var t, i, s, o, n, l, a, h, d;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", (c) => this._valueChanged(c)), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", (c) => this._valueChanged(c)), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", (c) => this._valueChanged(c)), (o = this._elements.inputs.name) == null || o.addEventListener("input", (c) => this._valueChanged(c)), (n = this._elements.inputs.gauge_min) == null || n.addEventListener("input", (c) => this._valueChanged(c)), (l = this._elements.inputs.gauge_max) == null || l.addEventListener("input", (c) => this._valueChanged(c)), (a = this._elements.inputs.static_low_threshold) == null || a.addEventListener("input", (c) => this._valueChanged(c)), (h = this._elements.inputs.static_high_threshold) == null || h.addEventListener("input", (c) => this._valueChanged(c));
      for (const c in this._elements.colors)
        (d = this._elements.colors[c].picker) == null || d.addEventListener("color-changed", (_) => this._colorChanged(_));
    }
  }
  loadEditorValues() {
    var i, s;
    if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) {
      console.warn("[Editor] Cannot load values - editor not fully ready.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const t = (o, n, l = "") => {
      o && (o.value = n != null ? n : l);
    };
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((o) => {
      o && (o.hass = this._hass);
    }), t(this._elements.pickers.entity, this._config[q]), t(this._elements.pickers.min_entity, this._config[W]), t(this._elements.pickers.max_entity, this._config[j]), t(this._elements.inputs.name, this._config[te]), t(this._elements.inputs.gauge_min, this._config[ie], Re), t(this._elements.inputs.gauge_max, this._config[se], De), t(this._elements.inputs.static_low_threshold, this._config[ne], He), t(this._elements.inputs.static_high_threshold, this._config[oe], Ue);
    for (const o in this._elements.colors) {
      const n = (i = this._elements.colors[o]) == null ? void 0 : i.picker;
      if (n) {
        const l = `color_${o}`, a = `DEFAULT_COLOR_${o.toUpperCase()}`, h = window[a] !== void 0 ? window[a] : "#000000";
        n.value = (s = this._config[l]) != null ? s : h;
      }
    }
  }
  // --- Event Handlers ---
  _valueChanged(t) {
    var l;
    if (!this._config) return;
    const i = t.target, s = i.dataset.configValue;
    let o = i.value;
    if (!s) {
      console.warn("No configValue dataset found for target:", i);
      return;
    }
    i.type === "number" ? o = o === "" ? void 0 : parseFloat(o) : i.tagName === "HA-ENTITY-PICKER" && ((l = t.detail) == null ? void 0 : l.value) !== void 0 && (o = t.detail.value);
    const n = x({}, this._config);
    o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? s !== q && s !== W && s !== j ? delete n[s] : n[s] = "" : n[s] = o, this._config = n, this.fireConfigChanged();
  }
  _colorChanged(t) {
    if (!this._config) return;
    const i = t.target, s = i.dataset.configValue, o = t.detail.value;
    if (!s) {
      console.warn("No configValue dataset found for color picker:", i);
      return;
    }
    console.log(`[Editor] Color Changed: Key=${s}, Value=${o}`);
    const n = x({}, this._config);
    o ? n[s] = o.toUpperCase() : delete n[s], this._config = n, this.fireConfigChanged();
  }
  // Use HA's fireEvent helper for consistency
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config), fireEvent(this, "config-changed", { config: this._config });
  }
  render() {
    var O, v, E, U;
    if (!this._hass) return C`Waiting for hass...`;
    if (!this._config) return C`Waiting for config...`;
    const t = this._config[te] || "", i = this._config[q] || "", s = this._config[W] || "", o = this._config[j] || "", n = (O = this._config[ie]) != null ? O : Re, l = (v = this._config[se]) != null ? v : De, a = (E = this._config[ne]) != null ? E : He, h = (U = this._config[oe]) != null ? U : Ue, d = this._config[Oe] || Ot, c = this._config[xe] || xt, _ = this._config[Te] || Tt, g = this._config[Le] || Lt, p = this._config[Ne] || Nt;
    return C`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} data-config-value=${q} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} data-config-value=${W} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${o} data-config-value=${j} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${t} data-config-value=${te} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${n} data-config-value=${ie} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${l} data-config-value=${se} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${a} data-config-value=${ne} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${h} data-config-value=${oe} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${d} data-config-value=${Oe} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${c} data-config-value=${xe} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${_} data-config-value=${Te} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${g} data-config-value=${Le} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${p} data-config-value=${Ne} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return Qe`...`;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", Ht), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
console.log("VPD Gauge Card Editor Script Loaded Successfully");
const z = "entity", re = "name", Pe = "min_entity", ke = "max_entity", Me = "#1c2814", Ie = "#406f1e", Ge = "#689a46", Fe = "#406f1e", Ve = "#1c2814", qe = 1, We = 1.2, ae = 0.8, je = 1.3;
class Ut extends L {
  constructor() {
    super(...arguments);
    V(this, "_calculateSegments", () => {
      var ue, _e, ge;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[Pe] || !t[ke])
        return console.warn("VPD Gauge: Data missing for segment calc."), [];
      const s = (ue = t.gauge_min) != null ? ue : ae, o = t.min_entity, n = t.max_entity, l = (_e = t.static_low_threshold) != null ? _e : qe, a = (ge = t.static_high_threshold) != null ? ge : We, h = t.color_extreme_low || Me, d = t.color_low || Ie, c = t.color_good || Ge, _ = t.color_high || Fe, g = t.color_extreme_high || Ve, p = i.states[o], O = i.states[n];
      let v = l;
      p && !isNaN(parseFloat(p.state)) ? v = parseFloat(p.state) : console.warn(`VPD Gauge: Invalid min_entity state (${o}), using static fallback ${v}`);
      let E = a;
      O && !isNaN(parseFloat(O.state)) ? E = parseFloat(O.state) : console.warn(`VPD Gauge: Invalid max_entity state (${n}), using static fallback ${E}`);
      const U = [{ from: s, color: h }, { from: l, color: d }, { from: v, color: c }, { from: E, color: _ }, { from: a, color: g }];
      U.sort((f, F) => f.from - F.from);
      const m = U.filter((f, F, pe) => !(f.from < s || F < pe.length - 1 && pe[F + 1].from === f.from));
      if (m.length === 0 || m[0].from > s) {
        let f = h;
        s >= a ? f = g : s >= E ? f = _ : s >= v ? f = c : s >= l && (f = d), m.unshift({ from: s, color: f }), m.length > 1 && m[1].from === m[0].from && m.shift();
      }
      return m;
    });
  }
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }
  setConfig(t) {
    if (!t || !t[z]) throw new Error("Entity is required");
    if (!t[Pe]) throw new Error("Min entity is required");
    if (!t[ke]) throw new Error("Max entity is required");
    const i = {
      // Defaults excluding needle
      gauge_min: ae,
      gauge_max: je,
      static_low_threshold: qe,
      static_high_threshold: We,
      color_extreme_low: Me,
      color_low: Ie,
      color_good: Ge,
      color_high: Fe,
      color_extreme_high: Ve,
      name: ""
    };
    this.config = x(x({}, i), t), this.config.needle && delete this.config.needle, console.log("VPD Gauge Card Config Set:", this.config), this.hass && this.requestUpdate();
  }
  render() {
    var o, n;
    if (!this.hass || !this.config || !this.config[z]) return C`<ha-card><div class="warning">Config required</div></ha-card>`;
    const t = this.hass.states[this.config[z]], i = t ? parseFloat(t.state) : void 0;
    if (t === void 0) return C`<ha-card header="${this.config[re] || "VPD"}"><div class="warning">Entity not found: ${this.config[z]}</div></ha-card>`;
    if (i === void 0 || isNaN(i)) return C`<ha-card header="${this.config[re] || "VPD"}"><div class="warning">Invalid state: ${t.state}</div></ha-card>`;
    const s = this._calculateSegments();
    return C`
      <ha-card header="${this.config[re] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(o = this.config.gauge_min) != null ? o : ae}
            .max=${(n = this.config.gauge_max) != null ? n : je}
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
  // Use whenDefined for Editor robustness
  static async getConfigElement() {
    return await customElements.whenDefined("vpd-gauge-card-editor"), console.log("getConfigElement: vpd-gauge-card-editor is defined, creating element."), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(t, i, s) {
    const o = i.find((h) => h.startsWith("sensor.") && h.includes("vpd")) || s.find((h) => h.startsWith("sensor.") && h.includes("vpd")), n = o ? o.split(".").pop().replace("_vpd_mqtt", "").replace("_vpd", "") : null, l = i.find((h) => h.startsWith("number.") && h.includes("min") && (n ? h.includes(n) : !0)) || s.find((h) => h.startsWith("number.") && h.includes("min")), a = i.find((h) => h.startsWith("number.") && h.includes("max") && (n ? h.includes(n) : !0)) || s.find((h) => h.startsWith("number.") && h.includes("max"));
    return console.log("StubConfig Found: VPD=", o, "Min=", l, "Max=", a), { type: "custom:vpd-gauge-card", entity: o || "", min_entity: l || "", max_entity: a || "", name: n ? `${n.replace(/_/g, " ")} VPD Gauge` : "VPD Gauge" };
  }
  static get styles() {
    return Qe`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`;
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", Ut), console.info("%c VPD-GAUGE-CARD %c Loaded ", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({ type: "vpd-gauge-card", name: "VPD Gauge Card", description: "A gauge card with dynamic segments based on min/max threshold entities.", preview: !0 });
console.log("VPD Gauge Card Script Loaded Successfully");
