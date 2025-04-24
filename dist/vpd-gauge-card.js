var gt = Object.defineProperty, ft = Object.defineProperties;
var _t = Object.getOwnPropertyDescriptors;
var Ee = Object.getOwnPropertySymbols;
var pt = Object.prototype.hasOwnProperty, $t = Object.prototype.propertyIsEnumerable;
var J = (n, e, t) => e in n ? gt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, H = (n, e) => {
  for (var t in e || (e = {}))
    pt.call(e, t) && J(n, t, e[t]);
  if (Ee)
    for (var t of Ee(e))
      $t.call(e, t) && J(n, t, e[t]);
  return n;
}, K = (n, e) => ft(n, _t(e));
var ye = (n, e, t) => J(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, ue = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ge = Symbol(), Ae = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ue && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ae.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ae.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (n) => new rt(typeof n == "string" ? n : n + "", void 0, ge), fe = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[a + 1], n[0]);
  return new rt(t, n, ge);
}, vt = (n, e) => {
  if (ue) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = j.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, be = ue ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return mt(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: yt, getOwnPropertyDescriptor: At, getOwnPropertyNames: bt, getOwnPropertySymbols: Ct, getPrototypeOf: xt } = Object, x = globalThis, Ce = x.trustedTypes, wt = Ce ? Ce.emptyScript : "", Z = x.reactiveElementPolyfillSupport, P = (n, e) => n, ie = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? wt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch (i) {
        t = null;
      }
  }
  return t;
} }, lt = (n, e) => !Et(n, e), xe = { attribute: !0, type: String, converter: ie, reflect: !1, useDefault: !1, hasChanged: lt };
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
      s !== void 0 && yt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: s, set: a } = (o = At(this.prototype, e)) != null ? o : { get() {
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
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const e = xt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const t = this.properties, i = [...bt(t), ...Ct(t)];
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
      for (const s of i) t.unshift(be(s));
    } else e !== void 0 && t.push(be(e));
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
    return vt(e, this.constructor.elementStyles), e;
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
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : ie).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, o, l, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), d = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((a = h.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? h.converter : ie;
      this._$Em = s, this[s] = (r = (l = d.fromAttribute(t, h.type)) != null ? l : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? r : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, a;
    if (e !== void 0) {
      const o = this.constructor, l = this[e];
      if (i != null || (i = o.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : lt)(l, t) || i.useDefault && i.reflect && l === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: a }, o) {
    var l, r, h;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = o != null ? o : t) != null ? r : this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, l] of a) {
        const { wrapped: r } = l, h = this[o];
        r !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, l, h);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[P("elementProperties")] = /* @__PURE__ */ new Map(), N[P("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: N }), ((st = x.reactiveElementVersions) != null ? st : x.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, q = U.trustedTypes, we = q ? q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ht = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + b, Ot = `<${ct}>`, L = document, G = () => L.createComment(""), k = (n) => n === null || typeof n != "object" && typeof n != "function", _e = Array.isArray, St = (n) => _e(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Se = />/g, w = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Le = /"/g, dt = /^(?:script|style|textarea|title)$/i, Tt = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), C = Tt(1), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), O = L.createTreeWalker(L, 129);
function ut(n, e) {
  if (!_e(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const Lt = (n, e) => {
  const t = n.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = D;
  for (let l = 0; l < t; l++) {
    const r = n[l];
    let h, d, c = -1, g = 0;
    for (; g < r.length && (o.lastIndex = g, d = o.exec(r), d !== null); ) g = o.lastIndex, o === D ? d[1] === "!--" ? o = Oe : d[1] !== void 0 ? o = Se : d[2] !== void 0 ? (dt.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = w) : d[3] !== void 0 && (o = w) : o === w ? d[0] === ">" ? (o = s != null ? s : D, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? w : d[3] === '"' ? Le : Te) : o === Le || o === Te ? o = w : o === Oe || o === Se ? o = D : (o = w, s = void 0);
    const f = o === w && n[l + 1].startsWith("/>") ? " " : "";
    a += o === D ? r + Ot : c >= 0 ? (i.push(h), r.slice(0, c) + ht + r.slice(c) + b + f) : r + b + (c === -2 ? l : f);
  }
  return [ut(n, a + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class F {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const l = e.length - 1, r = this.parts, [h, d] = Lt(e, t);
    if (this.el = F.createElement(h, i), O.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = O.nextNode()) !== null && r.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ht)) {
          const g = d[o++], f = s.getAttribute(c).split(b), _ = /([.?@])?(.*)/.exec(g);
          r.push({ type: 1, index: a, name: _[2], strings: f, ctor: _[1] === "." ? Nt : _[1] === "?" ? Rt : _[1] === "@" ? Mt : Y }), s.removeAttribute(c);
        } else c.startsWith(b) && (r.push({ type: 6, index: a }), s.removeAttribute(c));
        if (dt.test(s.tagName)) {
          const c = s.textContent.split(b), g = c.length - 1;
          if (g > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let f = 0; f < g; f++) s.append(c[f], G()), O.nextNode(), r.push({ type: 2, index: ++a });
            s.append(c[g], G());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ct) r.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(b, c + 1)) !== -1; ) r.push({ type: 7, index: a }), c += b.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = L.createElement("template");
    return i.innerHTML = e, i;
  }
}
function M(n, e, t = n, i) {
  var o, l, r;
  if (e === R) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const a = k(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), a === void 0 ? s = void 0 : (s = new a(n), s._$AT(n, t, i)), i !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = M(n, s._$AS(n, e.values), s, i)), e;
}
class Ht {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((h = e == null ? void 0 : e.creationScope) != null ? h : L).importNode(t, !0);
    O.currentNode = s;
    let a = O.nextNode(), o = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let d;
        r.type === 2 ? d = new I(a, a.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(a, r.name, r.strings, this, e) : r.type === 6 && (d = new Dt(a, this, e)), this._$AV.push(d), r = i[++l];
      }
      o !== (r == null ? void 0 : r.index) && (a = O.nextNode(), o++);
    }
    return O.currentNode = L, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class I {
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
    e = M(this, e, t), k(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : St(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(L.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = F.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(t);
    else {
      const o = new Ht(s, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = He.get(e.strings);
    return t === void 0 && He.set(e.strings, t = new F(e)), t;
  }
  k(e) {
    _e(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new I(this.O(G()), this.O(G()), this, this.options)) : i = t[s], i._$AI(a), s++;
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
    let o = !1;
    if (a === void 0) e = M(this, e, t, 0), o = !k(e) || e !== this._$AH && e !== R, o && (this._$AH = e);
    else {
      const l = e;
      let r, h;
      for (e = a[0], r = 0; r < a.length - 1; r++) h = M(this, l[i + r], t, r), h === R && (h = this._$AH[r]), o || (o = !k(h) || h !== this._$AH[r]), h === u ? e = u : e !== u && (e += (h != null ? h : "") + a[r + 1]), this._$AH[r] = h;
    }
    o && !s && this.j(e);
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
    var o;
    if ((e = (o = M(this, e, t, 0)) != null ? o : u) === R) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Dt {
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
const ee = U.litHtmlPolyfillSupport;
var nt;
ee == null || ee(F, I), ((nt = U.litHtmlVersions) != null ? nt : U.litHtmlVersions = []).push("3.3.0");
const Pt = (n, e, t) => {
  var a, o;
  const i = (a = t == null ? void 0 : t.renderBefore) != null ? a : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = s = new I(e.insertBefore(G(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(n), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pt(t, this.renderRoot, this.renderOptions);
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
var ot;
T._$litElement$ = !0, T.finalized = !0, (ot = S.litElementHydrateSupport) == null || ot.call(S, { LitElement: T });
const te = S.litElementPolyfillSupport;
te == null || te({ LitElement: T });
var at;
((at = S.litElementVersions) != null ? at : S.litElementVersions = []).push("4.2.0");
const Ne = "entity", Re = "name", Me = "needle", De = "gauge_min", Pe = "gauge_max", Ue = "min_entity", Ve = "max_entity", Ge = "color_extreme_low", ke = "color_low", Fe = "color_good", Ie = "color_high", We = "color_extreme_high", je = "static_low_threshold", ze = "static_high_threshold", Ut = "#1c2814", Vt = "#406f1e", Gt = "#689a46", kt = "#406f1e", Ft = "#1c2814", It = 1, Wt = 1.2, jt = 0.8, zt = 1.3;
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
    console.log("Editor setConfig called with:", e), this._config = H({}, e), this._initialized && this.loadEditorValues();
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    let i = t.value;
    t.type === "checkbox" && t.checked !== void 0 && (i = t.checked), t.type === "number" && (i = parseFloat(i));
    const s = K(H({}, this._config), {
      [t.configValue]: i
      // Use configValue attribute to link element to config key
    }), a = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    a.detail = { config: s }, this.dispatchEvent(a);
  }
  render() {
    var v, p, $, y;
    if (!this.hass || !this._config)
      return C``;
    const e = this._config[Re] || "", t = this._config[Ne] || "", i = this._config[Ue] || "", s = this._config[Ve] || "", a = this._config[Me] !== !1, o = (v = this._config[De]) != null ? v : jt, l = (p = this._config[Pe]) != null ? p : zt, r = ($ = this._config[je]) != null ? $ : It, h = (y = this._config[ze]) != null ? y : Wt, d = this._config[Ge] || Ut, c = this._config[ke] || Vt, g = this._config[Fe] || Gt, f = this._config[Ie] || kt, _ = this._config[We] || Ft;
    return C`
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
            .configValue=${Ue}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
          ></ha-entity-picker>
          <ha-entity-picker
            label="Max Threshold Entity (Number)"
            .hass=${this.hass}
            .value=${s}
            .configValue=${Ve}
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
              .value=${o}
              .configValue=${De}
              @input=${this._valueChanged}
              step="0.01"
            ></ha-textfield>
            <ha-textfield
              label="Gauge Max Value"
              type="number"
              .value=${l}
              .configValue=${Pe}
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
            <ha-textfield
              .value=${d}
              .configValue=${Ge}
              @input=${this._valueChanged}
            ></ha-textfield>
            <label>Low:</label>
            <ha-textfield
              .value=${c}
              .configValue=${ke}
              @input=${this._valueChanged}
            ></ha-textfield>
            <label>Good:</label>
            <ha-textfield
              .value=${g}
              .configValue=${Fe}
              @input=${this._valueChanged}
            ></ha-textfield>
            <label>High:</label>
            <ha-textfield
              .value=${f}
              .configValue=${Ie}
              @input=${this._valueChanged}
            ></ha-textfield>
            <label>Extreme High:</label>
            <ha-textfield
              .value=${_}
              .configValue=${We}
              @input=${this._valueChanged}
            ></ha-textfield>
          </div>
          <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
        </div>
      `;
  }
  static get styles() {
    return fe`
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
}, Symbol.toStringTag, { value: "Module" })), A = "entity", V = "name", se = "needle", qe = "gauge_min", Xe = "gauge_max", X = "min_entity", B = "max_entity", Be = "color_extreme_low", Ye = "color_low", Je = "color_good", Ke = "color_high", Ze = "color_extreme_high", Qe = "static_low_threshold", et = "static_high_threshold", ne = "#1c2814", oe = "#406f1e", ae = "#689a46", re = "#406f1e", le = "#1c2814", he = 1, ce = 1.2, z = 0.8, de = 1.3;
class Bt extends T {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    ye(this, "_calculateSegments", () => {
      var pe, $e, me;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[X] || !t[B])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const s = (pe = t.gauge_min) != null ? pe : z, a = t.min_entity, o = t.max_entity, l = ($e = t.static_low_threshold) != null ? $e : he, r = (me = t.static_high_threshold) != null ? me : ce, h = t.color_extreme_low || ne, d = t.color_low || oe, c = t.color_good || ae, g = t.color_high || re, f = t.color_extreme_high || le, _ = i.states[a], v = i.states[o];
      let p = l;
      _ && !isNaN(parseFloat(_.state)) ? p = parseFloat(_.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${a}), using static fallback ${p}`
      );
      let $ = r;
      v && !isNaN(parseFloat(v.state)) ? $ = parseFloat(v.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${o}), using static fallback ${$}`
      );
      const y = [
        { from: s, color: h },
        { from: l, color: d },
        { from: p, color: c },
        { from: $, color: g },
        { from: r, color: f }
      ];
      y.sort((m, W) => m.from - W.from);
      const E = y.filter((m, W, ve) => !(m.from < s || W < ve.length - 1 && ve[W + 1].from === m.from));
      if (E.length === 0 || E[0].from > s) {
        let m = h;
        s >= r ? m = f : s >= $ ? m = g : s >= p ? m = c : s >= l && (m = d), E.unshift({ from: s, color: m }), E.length > 1 && E[1].from === E[0].from && E.shift();
      }
      return console.log(
        `VPD Gauge (${t.entity}): MinT=${p}, MaxT=${$}, Segments=`,
        E
      ), E;
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
    if (!t[A])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!t[X])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!t[B])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    this.config = H({
      needle: !0,
      // Default needle to true
      gauge_min: z,
      gauge_max: de,
      static_low_threshold: he,
      static_high_threshold: ce,
      color_extreme_low: ne,
      color_low: oe,
      color_good: ae,
      color_high: re,
      color_extreme_high: le
    }, t), console.log("VPD Gauge Card Config Set:", this.config);
  }
  // --- Rendering ---
  render() {
    var a, o;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[A])
      return C`<ha-card header="VPD Gauge"
        ><div class="warning">
          Please configure the required entities.
        </div></ha-card
      >`;
    const t = this.hass.states[this.config[A]], i = t ? parseFloat(t.state) : void 0;
    if (console.log(
      `Rendering VPD Gauge: Entity=${this.config[A]}, StateObj=`,
      t,
      `Value=${i}`
    ), t === void 0)
      return C`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[A]}
          </div>
        </ha-card>
      `;
    if (i === void 0 || isNaN(i))
      return C`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[A]}: ${t.state}
          </div>
        </ha-card>
      `;
    const s = this._calculateSegments();
    return C`
      <ha-card header="${this.config[V] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(a = this.config.gauge_min) != null ? a : z}
            .max=${(o = this.config.gauge_max) != null ? o : de}
            .segments=${s}
            ?needle=${this.config[se] !== !1}
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
    const a = i.find((r) => r.startsWith("sensor.") && r.includes("vpd")) || s.find((r) => r.startsWith("sensor.")), o = i.find((r) => r.startsWith("number.") && r.includes("min")) || s.find((r) => r.startsWith("number.")), l = i.find((r) => r.startsWith("number.") && r.includes("max")) || s.find((r) => r.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: a || "",
      min_entity: o || "",
      max_entity: l || "",
      name: "VPD Gauge"
      // Default visual settings will be applied from setConfig
    };
  }
  // --- Styling ---
  static get styles() {
    return fe`
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
window.customCards && !window.customCards.some((n) => n.type === "vpd-gauge-card") && (window.customCards = window.customCards || [], window.customCards.push({
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
    console.log("Editor setConfig called with:", e), this._config = H({}, e), this._initialized && this.loadEditorValues();
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    let i = t.value;
    t.type === "checkbox" && t.checked !== void 0 && (i = t.checked), t.type === "number" && (i = parseFloat(i));
    const s = K(H({}, this._config), {
      [t.configValue]: i
      // Use configValue attribute to link element to config key
    }), a = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    a.detail = { config: s }, this.dispatchEvent(a);
  }
  render() {
    var v, p, $, y;
    if (!this.hass || !this._config)
      return C``;
    const e = this._config[V] || "", t = this._config[A] || "", i = this._config[X] || "", s = this._config[B] || "", a = this._config[se] !== !1, o = (v = this._config[qe]) != null ? v : z, l = (p = this._config[Xe]) != null ? p : de, r = ($ = this._config[Qe]) != null ? $ : he, h = (y = this._config[et]) != null ? y : ce, d = this._config[Be] || ne, c = this._config[Ye] || oe, g = this._config[Je] || ae, f = this._config[Ke] || re, _ = this._config[Ze] || le;
    return C`
      <div class="card-config">
        <h3>Required Entities</h3>
        <ha-entity-picker
          label="VPD Sensor Entity"
          .hass=${this.hass}
          .value=${t}
          .configValue=${A}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Min Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${i}
          .configValue=${X}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${s}
          .configValue=${B}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield
          label="Name (Optional)"
          .value=${e}
          .configValue=${V}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-formfield label="Show Needle">
          <ha-switch
            .checked=${a}
            .configValue=${se}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${o}
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
          <ha-textfield
            .value=${d}
            .configValue=${Be}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Low:</label>
          <ha-textfield
            .value=${c}
            .configValue=${Ye}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Good:</label>
          <ha-textfield
            .value=${g}
            .configValue=${Je}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>High:</label>
          <ha-textfield
            .value=${f}
            .configValue=${Ke}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Extreme High:</label>
          <ha-textfield
            .value=${_}
            .configValue=${Ze}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
        <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
      </div>
    `;
  }
  static get styles() {
    return fe`
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
