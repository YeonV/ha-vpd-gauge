var gt = Object.defineProperty, ft = Object.defineProperties;
var _t = Object.getOwnPropertyDescriptors;
var ye = Object.getOwnPropertySymbols;
var pt = Object.prototype.hasOwnProperty, $t = Object.prototype.propertyIsEnumerable;
var K = (o, e, t) => e in o ? gt(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, L = (o, e) => {
  for (var t in e || (e = {}))
    pt.call(e, t) && K(o, t, e[t]);
  if (ye)
    for (var t of ye(e))
      $t.call(e, t) && K(o, t, e[t]);
  return o;
}, ve = (o, e) => ft(o, _t(e));
var Ee = (o, e, t) => K(o, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, de = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ue = Symbol(), Ae = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (de && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (o) => new rt(typeof o == "string" ? o : o + "", void 0, ue), ge = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((i, s, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[a + 1], o[0]);
  return new rt(t, o, ue);
}, yt = (o, e) => {
  if (de) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, o.appendChild(i);
  }
}, Ce = de ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return mt(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: Et, getOwnPropertyDescriptor: At, getOwnPropertyNames: Ct, getOwnPropertySymbols: bt, getPrototypeOf: xt } = Object, x = globalThis, be = x.trustedTypes, wt = be ? be.emptyScript : "", J = x.reactiveElementPolyfillSupport, U = (o, e) => o, te = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? wt : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch (i) {
        t = null;
      }
  }
  return t;
} }, lt = (o, e) => !vt(o, e), xe = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: lt };
var tt, it;
(tt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (it = x.litPropertyMetadata) != null || (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let N = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = xe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Et(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: s, set: a } = (n = At(this.prototype, e)) != null ? n : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: s, set(l) {
      const r = s == null ? void 0 : s.call(this);
      a == null || a.call(this, l), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = xt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...Ct(t), ...bt(t)];
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
      for (const s of i) t.unshift(Ce(s));
    } else e !== void 0 && t.push(Ce(e));
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
    return yt(e, this.constructor.elementStyles), e;
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
    var a;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : te).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, n, l, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), d = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((a = h.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? h.converter : te;
      this._$Em = s, this[s] = (r = (l = d.fromAttribute(t, h.type)) != null ? l : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? r : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, a;
    if (e !== void 0) {
      const n = this.constructor, l = this[e];
      if (i != null || (i = n.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : lt)(l, t) || i.useDefault && i.reflect && l === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: a }, n) {
    var l, r, h;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = n != null ? n : t) != null ? r : this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [n, l] of a) {
        const { wrapped: r } = l, h = this[n];
        r !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, l, h);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((a) => {
        var n;
        return (n = a.hostUpdate) == null ? void 0 : n.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
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
var st;
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[U("elementProperties")] = /* @__PURE__ */ new Map(), N[U("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: N }), ((st = x.reactiveElementVersions) != null ? st : x.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, B = D.trustedTypes, we = B ? B.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, ht = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + C, Ot = `<${ct}>`, H = document, F = () => H.createComment(""), I = (o) => o === null || typeof o != "object" && typeof o != "function", fe = Array.isArray, St = (o) => fe(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Se = />/g, w = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, He = /"/g, dt = /^(?:script|style|textarea|title)$/i, Tt = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), b = Tt(1), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Le = /* @__PURE__ */ new WeakMap(), O = H.createTreeWalker(H, 129);
function ut(o, e) {
  if (!fe(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const Ht = (o, e) => {
  const t = o.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = P;
  for (let l = 0; l < t; l++) {
    const r = o[l];
    let h, d, c = -1, g = 0;
    for (; g < r.length && (n.lastIndex = g, d = n.exec(r), d !== null); ) g = n.lastIndex, n === P ? d[1] === "!--" ? n = Oe : d[1] !== void 0 ? n = Se : d[2] !== void 0 ? (dt.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = w) : d[3] !== void 0 && (n = w) : n === w ? d[0] === ">" ? (n = s != null ? s : P, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? w : d[3] === '"' ? He : Te) : n === He || n === Te ? n = w : n === Oe || n === Se ? n = P : (n = w, s = void 0);
    const f = n === w && o[l + 1].startsWith("/>") ? " " : "";
    a += n === P ? r + Ot : c >= 0 ? (i.push(h), r.slice(0, c) + ht + r.slice(c) + C + f) : r + C + (c === -2 ? l : f);
  }
  return [ut(o, a + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, r = this.parts, [h, d] = Ht(e, t);
    if (this.el = W.createElement(h, i), O.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = O.nextNode()) !== null && r.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ht)) {
          const g = d[n++], f = s.getAttribute(c).split(C), _ = /([.?@])?(.*)/.exec(g);
          r.push({ type: 1, index: a, name: _[2], strings: f, ctor: _[1] === "." ? Nt : _[1] === "?" ? Rt : _[1] === "@" ? Mt : Y }), s.removeAttribute(c);
        } else c.startsWith(C) && (r.push({ type: 6, index: a }), s.removeAttribute(c));
        if (dt.test(s.tagName)) {
          const c = s.textContent.split(C), g = c.length - 1;
          if (g > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let f = 0; f < g; f++) s.append(c[f], F()), O.nextNode(), r.push({ type: 2, index: ++a });
            s.append(c[g], F());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ct) r.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(C, c + 1)) !== -1; ) r.push({ type: 7, index: a }), c += C.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function M(o, e, t = o, i) {
  var n, l, r;
  if (e === R) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const a = I(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), a === void 0 ? s = void 0 : (s = new a(o), s._$AT(o, t, i)), i !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = M(o, s._$AS(o, e.values), s, i)), e;
}
class Lt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((h = e == null ? void 0 : e.creationScope) != null ? h : H).importNode(t, !0);
    O.currentNode = s;
    let a = O.nextNode(), n = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (n === r.index) {
        let d;
        r.type === 2 ? d = new j(a, a.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(a, r.name, r.strings, this, e) : r.type === 6 && (d = new Pt(a, this, e)), this._$AV.push(d), r = i[++l];
      }
      n !== (r == null ? void 0 : r.index) && (a = O.nextNode(), n++);
    }
    return O.currentNode = H, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class j {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, s) {
    var a;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (a = s == null ? void 0 : s.isConnected) != null ? a : !0;
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
    e = M(this, e, t), I(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : St(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = W.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(t);
    else {
      const n = new Lt(s, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Le.get(e.strings);
    return t === void 0 && Le.set(e.strings, t = new W(e)), t;
  }
  k(e) {
    fe(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new j(this.O(F()), this.O(F()), this, this.options)) : i = t[s], i._$AI(a), s++;
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
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, a) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = M(this, e, t, 0), n = !I(e) || e !== this._$AH && e !== R, n && (this._$AH = e);
    else {
      const l = e;
      let r, h;
      for (e = a[0], r = 0; r < a.length - 1; r++) h = M(this, l[i + r], t, r), h === R && (h = this._$AH[r]), n || (n = !I(h) || h !== this._$AH[r]), h === u ? e = u : e !== u && (e += (h != null ? h : "") + a[r + 1]), this._$AH[r] = h;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Nt extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Rt extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Mt extends Y {
  constructor(e, t, i, s, a) {
    super(e, t, i, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = M(this, e, t, 0)) != null ? n : u) === R) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Pt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const Q = D.litHtmlPolyfillSupport;
var ot;
Q == null || Q(W, j), ((ot = D.litHtmlVersions) != null ? ot : D.litHtmlVersions = []).push("3.3.0");
const Ut = (o, e, t) => {
  var a, n;
  const i = (a = t == null ? void 0 : t.renderBefore) != null ? a : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = s = new j(e.insertBefore(F(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis;
class T extends N {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ut(t, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var nt;
T._$litElement$ = !0, T.finalized = !0, (nt = S.litElementHydrateSupport) == null || nt.call(S, { LitElement: T });
const ee = S.litElementPolyfillSupport;
ee == null || ee({ LitElement: T });
var at;
((at = S.litElementVersions) != null ? at : S.litElementVersions = []).push("4.2.0");
const Ne = "entity", Re = "name", Me = "needle", Pe = "gauge_min", Ue = "gauge_max", De = "min_entity", ke = "max_entity", Ve = "color_extreme_low", Ge = "color_low", Fe = "color_good", Ie = "color_high", We = "color_extreme_high", je = "static_low_threshold", ze = "static_high_threshold", Dt = "#1c2814", kt = "#406f1e", Vt = "#689a46", Gt = "#406f1e", Ft = "#1c2814", It = 1, Wt = 1.2, jt = 0.8, zt = 1.3;
let qt = class extends T {
  static get properties() {
    return {
      hass: {},
      // Home Assistant object
      _config: {}
      // Internal copy of the configuration
    };
  }
  setConfig(e) {
    this._config = L({}, e);
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    let i = t.value;
    t.type === "checkbox" && t.checked !== void 0 && (i = t.checked), t.type === "number" && (i = parseFloat(i));
    const s = ve(L({}, this._config), {
      [t.configValue]: i
      // Use configValue attribute to link element to config key
    }), a = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    a.detail = { config: s }, this.dispatchEvent(a);
  }
  render() {
    var y, p, $, A;
    if (!this.hass || !this._config)
      return b``;
    const e = this._config[Re] || "", t = this._config[Ne] || "", i = this._config[De] || "", s = this._config[ke] || "", a = this._config[Me] !== !1, n = (y = this._config[Pe]) != null ? y : jt, l = (p = this._config[Ue]) != null ? p : zt, r = ($ = this._config[je]) != null ? $ : It, h = (A = this._config[ze]) != null ? A : Wt, d = this._config[Ve] || Dt, c = this._config[Ge] || kt, g = this._config[Fe] || Vt, f = this._config[Ie] || Gt, _ = this._config[We] || Ft;
    return b`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker
            label="VPD Sensor Entity"
            .hass=${this.hass}
            .value=${t}
            .configValue=${Ne}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            required
          ></ha-entity-picker>
          <ha-entity-picker
            label="Min Threshold Entity (Number)"
            .hass=${this.hass}
            .value=${i}
            .configValue=${De}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
          ></ha-entity-picker>
          <ha-entity-picker
            label="Max Threshold Entity (Number)"
            .hass=${this.hass}
            .value=${s}
            .configValue=${ke}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
          ></ha-entity-picker>
  
          <h3>Appearance</h3>
          <ha-textfield
            label="Name (Optional)"
            .value=${e}
            .configValue=${Re}
            @input=${this._valueChanged}
          ></ha-textfield>
          <ha-formfield label="Show Needle">
              <ha-switch
              .checked=${a}
              .configValue=${Me}
              @change=${this._valueChanged}
              ></ha-switch>
          </ha-formfield>
  
          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield
                  label="Gauge Min Value"
                  type="number"
                  .value=${n}
                  .configValue=${Pe}
                  @input=${this._valueChanged}
                  step="0.01"
              ></ha-textfield>
              <ha-textfield
                  label="Gauge Max Value"
                  type="number"
                  .value=${l}
                  .configValue=${Ue}
                  @input=${this._valueChanged}
                  step="0.01"
              ></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield
                  label="Static Low Threshold"
                  type="number"
                  .value=${r}
                  .configValue=${je}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from Extreme Low to Low at this value"
              ></ha-textfield>
              <ha-textfield
                  label="Static High Threshold"
                  type="number"
                  .value=${h}
                  .configValue=${ze}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from High to Extreme High at this value"
              ></ha-textfield>
          </div>
  
           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label>
              <ha-textfield .value=${d} .configValue=${Ve} @input=${this._valueChanged}></ha-textfield>
              <label>Low:</label>
              <ha-textfield .value=${c} .configValue=${Ge} @input=${this._valueChanged}></ha-textfield>
              <label>Good:</label>
              <ha-textfield .value=${g} .configValue=${Fe} @input=${this._valueChanged}></ha-textfield>
              <label>High:</label>
              <ha-textfield .value=${f} .configValue=${Ie} @input=${this._valueChanged}></ha-textfield>
              <label>Extreme High:</label>
              <ha-textfield .value=${_} .configValue=${We} @input=${this._valueChanged}></ha-textfield>
           </div>
           <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
  
        </div>
      `;
  }
  static get styles() {
    return ge`
        .card-config {
          display: flex;
          flex-direction: column;
          gap: 12px; /* Add some spacing between elements */
        }
        ha-entity-picker,
        ha-textfield,
        ha-formfield {
          display: block; /* Ensure they take full width */
        }
         ha-switch {
          padding-top: 10px; /* Align switch better */
        }
        .side-by-side {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .color-grid {
           display: grid;
           grid-template-columns: auto 1fr; /* Label takes auto width, input takes rest */
           gap: 8px 12px; /* Row gap, Column gap */
           align-items: center;
        }
        h3 {
            margin-bottom: 0;
            margin-top: 8px;
        }
        label {
            text-align: right;
        }
      `;
  }
};
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", qt);
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), E = "entity", k = "name", ie = "needle", qe = "gauge_min", Xe = "gauge_max", V = "min_entity", G = "max_entity", Be = "color_extreme_low", Ye = "color_low", Ke = "color_good", Je = "color_high", Ze = "color_extreme_high", Qe = "static_low_threshold", et = "static_high_threshold", se = "#1c2814", oe = "#406f1e", ne = "#689a46", ae = "#406f1e", re = "#1c2814", le = 1, he = 1.2, X = 0.8, ce = 1.3;
class Bt extends T {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    Ee(this, "_calculateSegments", () => {
      var _e, pe, $e;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[V] || !t[G])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const s = (_e = t.gauge_min) != null ? _e : X, a = t.min_entity, n = t.max_entity, l = (pe = t.static_low_threshold) != null ? pe : le, r = ($e = t.static_high_threshold) != null ? $e : he, h = t.color_extreme_low || se, d = t.color_low || oe, c = t.color_good || ne, g = t.color_high || ae, f = t.color_extreme_high || re, _ = i.states[a], y = i.states[n];
      let p = l;
      _ && !isNaN(parseFloat(_.state)) ? p = parseFloat(_.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${a}), using static fallback ${p}`
      );
      let $ = r;
      y && !isNaN(parseFloat(y.state)) ? $ = parseFloat(y.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${n}), using static fallback ${$}`
      );
      const A = [
        { from: s, color: h },
        { from: l, color: d },
        { from: p, color: c },
        { from: $, color: g },
        { from: r, color: f }
      ];
      A.sort((m, z) => m.from - z.from);
      const v = A.filter((m, z, me) => !(m.from < s || z < me.length - 1 && me[z + 1].from === m.from));
      if (v.length === 0 || v[0].from > s) {
        let m = h;
        s >= r ? m = f : s >= $ ? m = g : s >= p ? m = c : s >= l && (m = d), v.unshift({ from: s, color: m }), v.length > 1 && v[1].from === v[0].from && v.shift();
      }
      return console.log(
        `VPD Gauge (${t.entity}): MinT=${p}, MaxT=${$}, Segments=`,
        v
      ), v;
    });
  }
  // Properties recognized by LitElement. Changes trigger re-render.
  static get properties() {
    return {
      hass: { type: Object },
      // Home Assistant object passed down
      config: { type: Object }
      // Card configuration object
    };
  }
  // --- Lifecycle Methods ---
  setConfig(t) {
    if (!t[E])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!t[V])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!t[G])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    const i = {
      needle: !0,
      gauge_min: X,
      gauge_max: ce,
      static_low_threshold: le,
      static_high_threshold: he,
      color_extreme_low: se,
      color_low: oe,
      color_good: ne,
      color_high: ae,
      color_extreme_high: re,
      name: ""
      // Default name is empty
    };
    this.config = L(L({}, i), t), console.log("VPD Gauge Card Config Set (with defaults applied):", this.config), this.hass && this.requestUpdate();
  }
  // --- Rendering ---
  render() {
    var a, n;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[E])
      return b`<ha-card header="VPD Gauge"
        ><div class="warning">
          Please configure the required entities.
        </div></ha-card
      >`;
    const t = this.hass.states[this.config[E]], i = t ? parseFloat(t.state) : void 0;
    if (console.log(
      `Rendering VPD Gauge: Entity=${this.config[E]}, StateObj=`,
      t,
      `Value=${i}`
    ), t === void 0)
      return b`
        <ha-card header="${this.config[k] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[E]}
          </div>
        </ha-card>
      `;
    if (i === void 0 || isNaN(i))
      return b`
        <ha-card header="${this.config[k] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[E]}: ${t.state}
          </div>
        </ha-card>
      `;
    const s = this._calculateSegments();
    return b`
      <ha-card header="${this.config[k] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(a = this.config.gauge_min) != null ? a : X}
            .max=${(n = this.config.gauge_max) != null ? n : ce}
            .segments=${s}
            ?needle=${this.config[ie] !== !1}
            style="--gauge-color: var(--primary-text-color);"
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
    return Promise.resolve().then(() => Xt).then(() => {
      console.log("VPD Gauge Card Editor loaded.");
    }).catch((t) => {
      console.error("Failed to load VPD Gauge Card Editor:", t);
    }), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(t, i, s) {
    const a = i.find((r) => r.startsWith("sensor.") && r.includes("vpd")) || s.find((r) => r.startsWith("sensor.")), n = i.find((r) => r.startsWith("number.") && r.includes("min")) || s.find((r) => r.startsWith("number.")), l = i.find((r) => r.startsWith("number.") && r.includes("max")) || s.find((r) => r.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: a || "",
      min_entity: n || "",
      max_entity: l || "",
      name: "VPD Gauge"
      // Default visual settings will be applied from setConfig
    };
  }
  // --- Styling ---
  static get styles() {
    return ge`
      ha-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }
      .card-content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        flex-grow: 1;
      }
      ha-gauge {
        width: 100%;
        max-width: 250px;
        --gauge-color: var(--primary-text-color);
      }
      .warning {
        padding: 16px;
        text-align: center;
        color: var(--error-color);
      }
    `;
  }
}
customElements.get("vpd-gauge-card") ? console.warn("Attempted to redefine vpd-gauge-card. Skipping.") : (customElements.define("vpd-gauge-card", Bt), console.info(
  "%c VPD-GAUGE-CARD %c Loaded ",
  "color: white; background: #039be5; font-weight: 700;",
  "color: #039be5; background: white; font-weight: 700;"
));
window.customCards && !window.customCards.some((o) => o.type === "vpd-gauge-card") && (window.customCards = window.customCards || [], window.customCards.push({
  type: "vpd-gauge-card",
  // Matches customElements.define
  name: "VPD Gauge Card",
  description: "A gauge card with dynamic segments based on min/max threshold entities.",
  preview: !0
  // Enable preview in card picker
  // documentationURL: "URL_TO_YOUR_REPO_OR_DOCS" // Optional
}));
class Yt extends T {
  static get properties() {
    return {
      hass: {},
      // Home Assistant object
      _config: {}
      // Internal copy of the configuration
    };
  }
  setConfig(e) {
    console.log("Editor setConfig called with:", e), this._config = L({}, e), this._initialized && this.loadEditorValues();
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    var a;
    if (!this._config || !this.hass)
      return;
    const t = e.target, i = t.dataset.configValue;
    let s = t.value;
    if (!i) {
      console.warn("No configValue dataset found for target:", t);
      return;
    }
    t.tagName === "HA-SWITCH" ? (s = t.checked, console.log(`Switch Changed: Key=${i}, Checked State=${s}`)) : t.type === "number" ? s = s === "" ? void 0 : parseFloat(s) : t.tagName === "HA-ENTITY-PICKER" && ((a = e.detail) == null ? void 0 : a.value) !== void 0 && (s = e.detail.value), s === void 0 || s === "" || typeof s == "number" && isNaN(s) ? i !== E && i !== V && i !== G ? delete this._config[i] : this._config[i] = "" : this._config[i] = s, this.fireConfigChanged();
  }
  render() {
    var y, p, $, A;
    if (!this.hass || !this._config)
      return b``;
    const e = this._config[k] || "", t = this._config[E] || "", i = this._config[V] || "", s = this._config[G] || "", a = this._config[ie] !== !1, n = (y = this._config[qe]) != null ? y : X, l = (p = this._config[Xe]) != null ? p : ce, r = ($ = this._config[Qe]) != null ? $ : le, h = (A = this._config[et]) != null ? A : he, d = this._config[Be] || se, c = this._config[Ye] || oe, g = this._config[Ke] || ne, f = this._config[Je] || ae, _ = this._config[Ze] || re;
    return b`
      <div class="card-config">
        <h3>Required Entities</h3>
        <ha-entity-picker
          label="VPD Sensor Entity"
          .hass=${this.hass}
          .value=${t}
          .configValue=${E}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Min Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${i}
          .configValue=${V}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${s}
          .configValue=${G}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield
          label="Name (Optional)"
          .value=${e}
          .configValue=${k}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-formfield label="Show Needle">
          <ha-switch
            .checked=${a}
            .dataset=${{ configValue: ie }}
            @change=${this._valueChanged}
            id="needle"
          ></ha-switch>
        </ha-formfield>

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${n}
            .configValue=${qe}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
          <ha-textfield
            label="Gauge Max Value"
            type="number"
            .value=${l}
            .configValue=${Xe}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
        </div>
        <div class="side-by-side">
          <ha-textfield
            label="Static Low Threshold"
            type="number"
            .value=${r}
            .configValue=${Qe}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from Extreme Low to Low at this value"
          ></ha-textfield>
          <ha-textfield
            label="Static High Threshold"
            type="number"
            .value=${h}
            .configValue=${et}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from High to Extreme High at this value"
          ></ha-textfield>
        </div>

         <h3>Segment Colors</h3>
         <div class="color-grid">
            <label>Extreme Low:</label>
            <ha-color-picker
              .value=${d}
              .dataset=${{ configValue: Be }}
              @color-changed=${this._colorChanged} <!-- Use color-changed event -->
              id="extreme_low_picker"
            ></ha-color-picker>

            <label>Low:</label>
            <ha-color-picker
              .value=${c}
              .dataset=${{ configValue: Ye }}
              @color-changed=${this._colorChanged}
              id="low_picker"
            ></ha-color-picker>

            <label>Good:</label>
            <ha-color-picker
              .value=${g}
              .dataset=${{ configValue: Ke }}
              @color-changed=${this._colorChanged}
              id="good_picker"
            ></ha-color-picker>

            <label>High:</label>
            <ha-color-picker
              .value=${f}
              .dataset=${{ configValue: Je }}
              @color-changed=${this._colorChanged}
              id="high_picker"
            ></ha-color-picker>

            <label>Extreme High:</label>
            <ha-color-picker
              .value=${_}
              .dataset=${{ configValue: Ze }}
              @color-changed=${this._colorChanged}
              id="extreme_high_picker"
            ></ha-color-picker>
         </div>
      </div>
    `;
  }
  static get styles() {
    return ge`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px; /* Add some spacing between elements */
      }
      ha-entity-picker,
      ha-textfield,
      ha-formfield {
        display: block; /* Ensure they take full width */
      }
      ha-switch {
        padding-top: 10px; /* Align switch better */
      }
      .side-by-side {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .color-grid {
        display: grid;
        grid-template-columns: auto 1fr; /* Label takes auto width, input takes rest */
        gap: 8px 12px; /* Row gap, Column gap */
        align-items: center;
      }
      h3 {
        margin-bottom: 0;
        margin-top: 8px;
      }
      label {
        text-align: right;
      }
    `;
  }
}
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", Yt);
