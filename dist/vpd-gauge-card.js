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
var T = (r, e, t) => Y(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, le = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (le && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ht = (r) => new Ze(typeof r == "string" ? r : r + "", void 0, ce), Qe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new Ze(t, r, ce);
}, lt = (r, e) => {
  if (le) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = B.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, $e = le ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return ht(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ct, defineProperty: dt, getOwnPropertyDescriptor: ut, getOwnPropertyNames: _t, getOwnPropertySymbols: gt, getPrototypeOf: pt } = Object, y = globalThis, ye = y.trustedTypes, ft = ye ? ye.emptyScript : "", J = y.reactiveElementPolyfillSupport, P = (r, e) => r, he = { toAttribute(r, e) {
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
      } catch (s) {
        t = null;
      }
  }
  return t;
} }, et = (r, e) => !ct(r, e), Ee = { attribute: !0, type: String, converter: he, reflect: !1, useDefault: !1, hasChanged: et };
var je, Be;
(je = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Be = y.litPropertyMetadata) != null || (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ee) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && dt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    var n;
    const { get: i, set: o } = (n = ut(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: i, set(l) {
      const a = i == null ? void 0 : i.call(this);
      o == null || o.call(this, l), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : Ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const t = this.properties, s = [..._t(t), ...gt(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift($e(i));
    } else e !== void 0 && t.push($e(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, s;
    ((t = this._$EO) != null ? t : this._$EO = /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) != null ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return lt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e, t;
    (e = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var o;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : he).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n, l, a;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : he;
      this._$Em = i, this[i] = (a = (l = c.fromAttribute(t, h.type)) != null ? l : (n = this._$Ej) == null ? void 0 : n.get(i)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    var i, o;
    if (e !== void 0) {
      const n = this.constructor, l = this[e];
      if (s != null || (s = n.getPropertyOptions(e)), !(((i = s.hasChanged) != null ? i : et)(l, t) || s.useDefault && s.reflect && l === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: o }, n) {
    var l, a, h;
    s && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (a = n != null ? n : t) != null ? a : this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
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
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((o) => {
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
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[P("elementProperties")] = /* @__PURE__ */ new Map(), L[P("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: L }), ((Xe = y.reactiveElementVersions) != null ? Xe : y.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, X = k.trustedTypes, ve = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, tt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, st = "?" + $, mt = `<${st}>`, S = document, M = () => S.createComment(""), I = (r) => r === null || typeof r != "object" && typeof r != "function", de = Array.isArray, $t = (r) => de(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ae = /-->/g, Ce = />/g, A = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, be = /"/g, it = /^(?:script|style|textarea|title)$/i, yt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), C = yt(1), H = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), w = S.createTreeWalker(S, 129);
function nt(r, e) {
  if (!de(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const Et = (r, e) => {
  const t = r.length - 1, s = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = D;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let h, c, d = -1, _ = 0;
    for (; _ < a.length && (n.lastIndex = _, c = n.exec(a), c !== null); ) _ = n.lastIndex, n === D ? c[1] === "!--" ? n = Ae : c[1] !== void 0 ? n = Ce : c[2] !== void 0 ? (it.test(c[2]) && (i = RegExp("</" + c[2], "g")), n = A) : c[3] !== void 0 && (n = A) : n === A ? c[0] === ">" ? (n = i != null ? i : D, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? A : c[3] === '"' ? be : we) : n === be || n === we ? n = A : n === Ae || n === Ce ? n = D : (n = A, i = void 0);
    const g = n === A && r[l + 1].startsWith("/>") ? " " : "";
    o += n === D ? a + mt : d >= 0 ? (s.push(h), a.slice(0, d) + tt + a.slice(d) + $ + g) : a + $ + (d === -2 ? l : g);
  }
  return [nt(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class V {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [h, c] = Et(e, t);
    if (this.el = V.createElement(h, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = w.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(tt)) {
          const _ = c[n++], g = i.getAttribute(d).split($), p = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: p[2], strings: g, ctor: p[1] === "." ? At : p[1] === "?" ? Ct : p[1] === "@" ? wt : K }), i.removeAttribute(d);
        } else d.startsWith($) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (it.test(i.tagName)) {
          const d = i.textContent.split($), _ = d.length - 1;
          if (_ > 0) {
            i.textContent = X ? X.emptyScript : "";
            for (let g = 0; g < _; g++) i.append(d[g], M()), w.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[_], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === st) a.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf($, d + 1)) !== -1; ) a.push({ type: 7, index: o }), d += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = S.createElement("template");
    return s.innerHTML = e, s;
  }
}
function U(r, e, t = r, s) {
  var n, l, a;
  if (e === H) return e;
  let i = s !== void 0 ? (n = t._$Co) == null ? void 0 : n[s] : t._$Cl;
  const o = I(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, t, s)), s !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[s] = i : t._$Cl = i), i !== void 0 && (e = U(r, i._$AS(r, e.values), i, s)), e;
}
class vt {
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
    const { el: { content: t }, parts: s } = this._$AD, i = ((h = e == null ? void 0 : e.creationScope) != null ? h : S).importNode(t, !0);
    w.currentNode = i;
    let o = w.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new G(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new bt(o, this, e)), this._$AV.push(c), a = s[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = w.nextNode(), n++);
    }
    return w.currentNode = S, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class G {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, s, i) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (o = i == null ? void 0 : i.isConnected) != null ? o : !0;
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
    e = U(this, e, t), I(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $t(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = V.createElement(nt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(t);
    else {
      const n = new vt(i, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Se.get(e.strings);
    return t === void 0 && Se.set(e.strings, t = new V(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const o of e) i === t.length ? t.push(s = new G(this.O(M()), this.O(M()), this, this.options)) : s = t[i], s._$AI(o), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
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
  constructor(e, t, s, i, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, t = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = U(this, e, t, 0), n = !I(e) || e !== this._$AH && e !== H, n && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = o[0], a = 0; a < o.length - 1; a++) h = U(this, l[s + a], t, a), h === H && (h = this._$AH[a]), n || (n = !I(h) || h !== this._$AH[a]), h === u ? e = u : e !== u && (e += (h != null ? h : "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !i && this.j(e);
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
  constructor(e, t, s, i, o) {
    super(e, t, s, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = U(this, e, t, 0)) != null ? n : u) === H) return;
    const s = this._$AH, i = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (t = this.options) == null ? void 0 : t.host) != null ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class bt {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const Q = k.litHtmlPolyfillSupport;
var Ke;
Q == null || Q(V, G), ((Ke = k.litHtmlVersions) != null ? Ke : k.litHtmlVersions = []).push("3.3.0");
const St = (r, e, t) => {
  var o, n;
  const s = (o = t == null ? void 0 : t.renderBefore) != null ? o : e;
  let i = s._$litPart$;
  if (i === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    s._$litPart$ = i = new G(e.insertBefore(M(), l), l, void 0, t != null ? t : {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class N extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, s;
    const e = super.createRenderRoot();
    return (s = (t = this.renderOptions).renderBefore) != null || (t.renderBefore = e.firstChild), e;
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
    return H;
  }
}
var Ye;
N._$litElement$ = !0, N.finalized = !0, (Ye = b.litElementHydrateSupport) == null || Ye.call(b, { LitElement: N });
const ee = b.litElementPolyfillSupport;
ee == null || ee({ LitElement: N });
var Je;
((Je = b.litElementVersions) != null ? Je : b.litElementVersions = []).push("4.2.0");
const q = "entity", te = "name", se = "gauge_min", ie = "gauge_max", W = "min_entity", z = "max_entity", Oe = "color_extreme_low", xe = "color_low", Te = "color_good", Le = "color_high", Ne = "color_extreme_high", ne = "static_low_threshold", oe = "static_high_threshold", Ot = "#1c2814", xt = "#406f1e", Tt = "#689a46", Lt = "#406f1e", Nt = "#1c2814", He = 1, Ue = 1.2, Re = 0.8, De = 1.3;
class Ht extends N {
  constructor() {
    super(...arguments);
    T(this, "_initialized", !1);
    T(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers (Use Arrow Functions) ---
    T(this, "_valueChanged", (t) => {
      var l;
      if (!this._config) return;
      const s = t.target, i = s.dataset.configValue;
      let o = s.value;
      if (!i) {
        console.warn("No configValue dataset found for target:", s);
        return;
      }
      s.type === "number" ? o = o === "" ? void 0 : parseFloat(o) : s.tagName === "HA-ENTITY-PICKER" && ((l = t.detail) == null ? void 0 : l.value) !== void 0 && (o = t.detail.value);
      const n = x({}, this._config);
      o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? i !== q && i !== W && i !== z ? delete n[i] : n[i] = "" : n[i] = o, this._config = n, this.fireConfigChanged();
    });
    T(this, "_colorChanged", (t) => {
      if (!this._config) return;
      const s = t.target, i = s.dataset.configValue, o = t.detail.value;
      if (!i) {
        console.warn("No configValue dataset found for color picker:", s);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${i}, Value=${o}`);
      const n = x({}, this._config);
      o ? n[i] = o.toUpperCase() : delete n[i], this._config = n, this.fireConfigChanged();
    });
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object, state: !0 } };
  }
  setConfig(t) {
    console.log("[Editor] setConfig called with:", t), this._config = x({}, t), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => {
      this._initialized || this.firstUpdated(), this.loadEditorValues();
    });
  }
  set hass(t) {
    var s;
    this._hass = t, this._initialized && ((s = this._elements) != null && s.pickers) && Object.values(this._elements.pickers).forEach((i) => {
      i && (i.hass = this._hass);
    });
  }
  firstUpdated() {
    this._initialized || (this._storeElementReferences(), this._attachInputListeners(), this.loadEditorValues(), this._initialized = !0, console.log("[Editor] Initialized via firstUpdated."));
  }
  _storeElementReferences() {
    const t = this.shadowRoot;
    if (!t) return;
    this._elements.pickers.entity = t.querySelector("#entity"), this._elements.pickers.min_entity = t.querySelector("#min_entity"), this._elements.pickers.max_entity = t.querySelector("#max_entity"), this._elements.inputs.name = t.querySelector("#name"), this._elements.inputs.gauge_min = t.querySelector("#gauge_min"), this._elements.inputs.gauge_max = t.querySelector("#gauge_max"), this._elements.inputs.static_low_threshold = t.querySelector("#static_low_threshold"), this._elements.inputs.static_high_threshold = t.querySelector("#static_high_threshold");
    const s = ["extreme_low", "low", "good", "high", "extreme_high"];
    this._elements.colors = {}, s.forEach((i) => {
      this._elements.colors[i] = { picker: t.querySelector(`#${i}_picker`) };
    }), console.log("[Editor] Elements stored:", this._elements);
  }
  _attachInputListeners() {
    var t, s, i, o, n, l, a, h, c;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", this._valueChanged), (s = this._elements.pickers.min_entity) == null || s.addEventListener("value-changed", this._valueChanged), (i = this._elements.pickers.max_entity) == null || i.addEventListener("value-changed", this._valueChanged), (o = this._elements.inputs.name) == null || o.addEventListener("input", this._valueChanged), (n = this._elements.inputs.gauge_min) == null || n.addEventListener("input", this._valueChanged), (l = this._elements.inputs.gauge_max) == null || l.addEventListener("input", this._valueChanged), (a = this._elements.inputs.static_low_threshold) == null || a.addEventListener("input", this._valueChanged), (h = this._elements.inputs.static_high_threshold) == null || h.addEventListener("input", this._valueChanged);
      for (const d in this._elements.colors)
        (c = this._elements.colors[d].picker) == null || c.addEventListener("color-changed", this._colorChanged);
    }
  }
  loadEditorValues() {
    var s, i;
    if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) {
      console.warn("[Editor] Cannot load values yet.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const t = (o, n, l = "") => {
      o && (o.value = n != null ? n : l);
    };
    t(this._elements.pickers.entity, this._config[q]), t(this._elements.pickers.min_entity, this._config[W]), t(this._elements.pickers.max_entity, this._config[z]), t(this._elements.inputs.name, this._config[te]), t(this._elements.inputs.gauge_min, this._config[se], Re), t(this._elements.inputs.gauge_max, this._config[ie], De), t(this._elements.inputs.static_low_threshold, this._config[ne], He), t(this._elements.inputs.static_high_threshold, this._config[oe], Ue);
    for (const o in this._elements.colors) {
      const n = (s = this._elements.colors[o]) == null ? void 0 : s.picker;
      if (n) {
        const l = `color_${o}`, a = `DEFAULT_COLOR_${o.toUpperCase()}`, h = window[a] !== void 0 ? window[a] : "#000000";
        n.value = (i = this._config[l]) != null ? i : h;
      }
    }
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((o) => {
      o && (o.hass = this._hass);
    });
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const t = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 });
    this.dispatchEvent(t);
  }
  render() {
    var O, E, v, R;
    if (!this._hass) return C`Waiting for hass...`;
    if (!this._config) return C`Waiting for config...`;
    const t = this._config[te] || "", s = this._config[q] || "", i = this._config[W] || "", o = this._config[z] || "", n = (O = this._config[se]) != null ? O : Re, l = (E = this._config[ie]) != null ? E : De, a = (v = this._config[ne]) != null ? v : He, h = (R = this._config[oe]) != null ? R : Ue, c = this._config[Oe] || Ot, d = this._config[xe] || xt, _ = this._config[Te] || Tt, g = this._config[Le] || Lt, p = this._config[Ne] || Nt;
    return C`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${s} .dataset=${{ configValue: q }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${i} .dataset=${{ configValue: W }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${o} .dataset=${{ configValue: z }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${t} .dataset=${{ configValue: te }} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Switch Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${n} .dataset=${{ configValue: se }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${l} .dataset=${{ configValue: ie }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${a} .dataset=${{ configValue: ne }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${h} .dataset=${{ configValue: oe }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${c} .dataset=${{ configValue: Oe }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${d} .dataset=${{ configValue: xe }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${_} .dataset=${{ configValue: Te }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${g} .dataset=${{ configValue: Le }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${p} .dataset=${{ configValue: Ne }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return Qe`...`;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", Ht), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
const j = "entity", re = "name", Pe = "min_entity", ke = "max_entity", Me = "#1c2814", Ie = "#406f1e", Ve = "#689a46", Ge = "#406f1e", Fe = "#1c2814", qe = 1, We = 1.2, ae = 0.8, ze = 1.3;
class Ut extends N {
  constructor() {
    super(...arguments);
    T(this, "_calculateSegments", () => {
      var ue, _e, ge;
      const t = this.config, s = this.hass;
      if (!s || !t || !t[Pe] || !t[ke])
        return console.warn("VPD Gauge: Data missing for segment calc."), [];
      const i = (ue = t.gauge_min) != null ? ue : ae, o = t.min_entity, n = t.max_entity, l = (_e = t.static_low_threshold) != null ? _e : qe, a = (ge = t.static_high_threshold) != null ? ge : We, h = t.color_extreme_low || Me, c = t.color_low || Ie, d = t.color_good || Ve, _ = t.color_high || Ge, g = t.color_extreme_high || Fe, p = s.states[o], O = s.states[n];
      let E = l;
      p && !isNaN(parseFloat(p.state)) ? E = parseFloat(p.state) : console.warn(`VPD Gauge: Invalid min_entity state (${o}), using static fallback ${E}`);
      let v = a;
      O && !isNaN(parseFloat(O.state)) ? v = parseFloat(O.state) : console.warn(`VPD Gauge: Invalid max_entity state (${n}), using static fallback ${v}`);
      const R = [{ from: i, color: h }, { from: l, color: c }, { from: E, color: d }, { from: v, color: _ }, { from: a, color: g }];
      R.sort((f, F) => f.from - F.from);
      const m = R.filter((f, F, pe) => !(f.from < i || F < pe.length - 1 && pe[F + 1].from === f.from));
      if (m.length === 0 || m[0].from > i) {
        let f = h;
        i >= a ? f = g : i >= v ? f = _ : i >= E ? f = d : i >= l && (f = c), m.unshift({ from: i, color: f }), m.length > 1 && m[1].from === m[0].from && m.shift();
      }
      return m;
    });
  }
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }
  setConfig(t) {
    if (!t || !t[j]) throw new Error("Entity is required");
    if (!t[Pe]) throw new Error("Min entity is required");
    if (!t[ke]) throw new Error("Max entity is required");
    const s = { gauge_min: ae, gauge_max: ze, static_low_threshold: qe, static_high_threshold: We, color_extreme_low: Me, color_low: Ie, color_good: Ve, color_high: Ge, color_extreme_high: Fe, name: "" };
    this.config = x(x({}, s), t), console.log("VPD Gauge Card Config Set:", this.config), this.hass && this.requestUpdate();
  }
  render() {
    var o, n;
    if (!this.hass || !this.config || !this.config[j]) return C`<ha-card><div class="warning">Config required</div></ha-card>`;
    const t = this.hass.states[this.config[j]], s = t ? parseFloat(t.state) : void 0;
    if (t === void 0) return C`<ha-card header="${this.config[re] || "VPD"}"><div class="warning">Entity not found: ${this.config[j]}</div></ha-card>`;
    if (s === void 0 || isNaN(s)) return C`<ha-card header="${this.config[re] || "VPD"}"><div class="warning">Invalid state: ${t.state}</div></ha-card>`;
    const i = this._calculateSegments();
    return C`
      <ha-card header="${this.config[re] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${s}
            .min=${(o = this.config.gauge_min) != null ? o : ae}
            .max=${(n = this.config.gauge_max) != null ? n : ze}
            .segments=${i}
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
  static getStubConfig(t, s, i) {
    const o = s.find((h) => h.startsWith("sensor.") && h.includes("vpd")) || i.find((h) => h.startsWith("sensor.") && h.includes("vpd")), n = o ? o.split(".").pop().replace("_vpd_mqtt", "").replace("_vpd", "") : null, l = s.find((h) => h.startsWith("number.") && h.includes("min") && (n ? h.includes(n) : !0)) || i.find((h) => h.startsWith("number.") && h.includes("min")), a = s.find((h) => h.startsWith("number.") && h.includes("max") && (n ? h.includes(n) : !0)) || i.find((h) => h.startsWith("number.") && h.includes("max"));
    return console.log("StubConfig Found: VPD=", o, "Min=", l, "Max=", a), { type: "custom:vpd-gauge-card", entity: o || "", min_entity: l || "", max_entity: a || "", name: n ? `${n.replace(/_/g, " ")} VPD Gauge` : "VPD Gauge" };
  }
  static get styles() {
    return Qe`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`;
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", Ut), console.info("%c VPD-GAUGE-CARD %c Loaded ", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({ type: "vpd-gauge-card", name: "VPD Gauge Card", description: "A gauge card with dynamic segments based on min/max threshold entities.", preview: !0 });
console.log("VPD Gauge Card Script Loaded Successfully");
