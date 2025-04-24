var ut = Object.defineProperty, gt = Object.defineProperties;
var ft = Object.getOwnPropertyDescriptors;
var me = Object.getOwnPropertySymbols;
var _t = Object.prototype.hasOwnProperty, pt = Object.prototype.propertyIsEnumerable;
var K = (n, e, t) => e in n ? ut(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, H = (n, e) => {
  for (var t in e || (e = {}))
    _t.call(e, t) && K(n, t, e[t]);
  if (me)
    for (var t of me(e))
      pt.call(e, t) && K(n, t, e[t]);
  return n;
}, ve = (n, e) => gt(n, ft(e));
var ye = (n, e, t) => K(n, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, ce = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), Ee = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ce && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ee.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ee.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (n) => new at(typeof n == "string" ? n : n + "", void 0, de), ue = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[a + 1], n[0]);
  return new at(t, n, de);
}, mt = (n, e) => {
  if (ce) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, Ae = ce ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return $t(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: yt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: At, getOwnPropertySymbols: Ct, getPrototypeOf: bt } = Object, b = globalThis, Ce = b.trustedTypes, xt = Ce ? Ce.emptyScript : "", J = b.reactiveElementPolyfillSupport, U = (n, e) => n, te = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? xt : null;
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
} }, rt = (n, e) => !vt(n, e), be = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: rt };
var et, tt;
(et = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (tt = b.litPropertyMetadata) != null || (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = be) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && yt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: s, set: a } = (o = Et(this.prototype, e)) != null ? o : { get() {
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
    return (t = this.elementProperties.get(e)) != null ? t : be;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = bt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...At(t), ...Ct(t)];
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
      for (const s of i) t.unshift(Ae(s));
    } else e !== void 0 && t.push(Ae(e));
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
    return mt(e, this.constructor.elementStyles), e;
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
      const o = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : te).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, o, l, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const h = i.getPropertyOptions(s), d = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((a = h.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? h.converter : te;
      this._$Em = s, this[s] = (r = (l = d.fromAttribute(t, h.type)) != null ? l : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? r : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, a;
    if (e !== void 0) {
      const o = this.constructor, l = this[e];
      if (i != null || (i = o.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : rt)(l, t) || i.useDefault && i.reflect && l === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
var it;
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[U("elementProperties")] = /* @__PURE__ */ new Map(), L[U("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: L }), ((it = b.reactiveElementVersions) != null ? it : b.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, B = D.trustedTypes, xe = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, lt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + A, wt = `<${ht}>`, T = document, I = () => T.createComment(""), F = (n) => n === null || typeof n != "object" && typeof n != "function", ge = Array.isArray, Ot = (n) => ge(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, Oe = />/g, x = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Te = /"/g, ct = /^(?:script|style|textarea|title)$/i, St = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), C = St(1), N = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), w = T.createTreeWalker(T, 129);
function dt(n, e) {
  if (!ge(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xe !== void 0 ? xe.createHTML(e) : e;
}
const Tt = (n, e) => {
  const t = n.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = P;
  for (let l = 0; l < t; l++) {
    const r = n[l];
    let h, d, c = -1, g = 0;
    for (; g < r.length && (o.lastIndex = g, d = o.exec(r), d !== null); ) g = o.lastIndex, o === P ? d[1] === "!--" ? o = we : d[1] !== void 0 ? o = Oe : d[2] !== void 0 ? (ct.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = x) : d[3] !== void 0 && (o = x) : o === x ? d[0] === ">" ? (o = s != null ? s : P, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? x : d[3] === '"' ? Te : Se) : o === Te || o === Se ? o = x : o === we || o === Oe ? o = P : (o = x, s = void 0);
    const f = o === x && n[l + 1].startsWith("/>") ? " " : "";
    a += o === P ? r + wt : c >= 0 ? (i.push(h), r.slice(0, c) + lt + r.slice(c) + A + f) : r + A + (c === -2 ? l : f);
  }
  return [dt(n, a + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, o = 0;
    const l = e.length - 1, r = this.parts, [h, d] = Tt(e, t);
    if (this.el = W.createElement(h, i), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = w.nextNode()) !== null && r.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(lt)) {
          const g = d[o++], f = s.getAttribute(c).split(A), _ = /([.?@])?(.*)/.exec(g);
          r.push({ type: 1, index: a, name: _[2], strings: f, ctor: _[1] === "." ? Lt : _[1] === "?" ? Nt : _[1] === "@" ? Rt : Y }), s.removeAttribute(c);
        } else c.startsWith(A) && (r.push({ type: 6, index: a }), s.removeAttribute(c));
        if (ct.test(s.tagName)) {
          const c = s.textContent.split(A), g = c.length - 1;
          if (g > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let f = 0; f < g; f++) s.append(c[f], I()), w.nextNode(), r.push({ type: 2, index: ++a });
            s.append(c[g], I());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ht) r.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(A, c + 1)) !== -1; ) r.push({ type: 7, index: a }), c += A.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = T.createElement("template");
    return i.innerHTML = e, i;
  }
}
function R(n, e, t = n, i) {
  var o, l, r;
  if (e === N) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const a = F(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== a && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), a === void 0 ? s = void 0 : (s = new a(n), s._$AT(n, t, i)), i !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = R(n, s._$AS(n, e.values), s, i)), e;
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((h = e == null ? void 0 : e.creationScope) != null ? h : T).importNode(t, !0);
    w.currentNode = s;
    let a = w.nextNode(), o = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let d;
        r.type === 2 ? d = new j(a, a.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(a, r.name, r.strings, this, e) : r.type === 6 && (d = new Mt(a, this, e)), this._$AV.push(d), r = i[++l];
      }
      o !== (r == null ? void 0 : r.index) && (a = w.nextNode(), o++);
    }
    return w.currentNode = T, s;
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
    e = R(this, e, t), F(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== N && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ot(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = W.createElement(dt(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === s) this._$AH.p(t);
    else {
      const o = new Ht(s, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = He.get(e.strings);
    return t === void 0 && He.set(e.strings, t = new W(e)), t;
  }
  k(e) {
    ge(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new j(this.O(I()), this.O(I()), this, this.options)) : i = t[s], i._$AI(a), s++;
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
    if (a === void 0) e = R(this, e, t, 0), o = !F(e) || e !== this._$AH && e !== N, o && (this._$AH = e);
    else {
      const l = e;
      let r, h;
      for (e = a[0], r = 0; r < a.length - 1; r++) h = R(this, l[i + r], t, r), h === N && (h = this._$AH[r]), o || (o = !F(h) || h !== this._$AH[r]), h === u ? e = u : e !== u && (e += (h != null ? h : "") + a[r + 1]), this._$AH[r] = h;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Lt extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Nt extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Rt extends Y {
  constructor(e, t, i, s, a) {
    super(e, t, i, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = R(this, e, t, 0)) != null ? o : u) === N) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Mt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const Q = D.litHtmlPolyfillSupport;
var st;
Q == null || Q(W, j), ((st = D.litHtmlVersions) != null ? st : D.litHtmlVersions = []).push("3.3.0");
const Pt = (n, e, t) => {
  var a, o;
  const i = (a = t == null ? void 0 : t.renderBefore) != null ? a : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = s = new j(e.insertBefore(I(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class S extends L {
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
    return N;
  }
}
var nt;
S._$litElement$ = !0, S.finalized = !0, (nt = O.litElementHydrateSupport) == null || nt.call(O, { LitElement: S });
const ee = O.litElementPolyfillSupport;
ee == null || ee({ LitElement: S });
var ot;
((ot = O.litElementVersions) != null ? ot : O.litElementVersions = []).push("4.2.0");
const Le = "entity", Ne = "name", Re = "needle", Me = "gauge_min", Pe = "gauge_max", Ue = "min_entity", De = "max_entity", Ve = "color_extreme_low", Ge = "color_low", ke = "color_good", Ie = "color_high", Fe = "color_extreme_high", We = "static_low_threshold", je = "static_high_threshold", Ut = "#1c2814", Dt = "#406f1e", Vt = "#689a46", Gt = "#406f1e", kt = "#1c2814", It = 1, Ft = 1.2, Wt = 0.8, jt = 1.3;
let zt = class extends S {
  static get properties() {
    return {
      hass: {},
      // Home Assistant object
      _config: {}
      // Internal copy of the configuration
    };
  }
  setConfig(e) {
    this._config = H({}, e);
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    let i = t.value;
    t.type === "checkbox" && t.checked !== void 0 && (i = t.checked), t.type === "number" && (i = parseFloat(i));
    const s = ve(H({}, this._config), {
      [t.configValue]: i
      // Use configValue attribute to link element to config key
    }), a = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    a.detail = { config: s }, this.dispatchEvent(a);
  }
  render() {
    var v, p, $, M;
    if (!this.hass || !this._config)
      return C``;
    const e = this._config[Ne] || "", t = this._config[Le] || "", i = this._config[Ue] || "", s = this._config[De] || "", a = this._config[Re] !== !1, o = (v = this._config[Me]) != null ? v : Wt, l = (p = this._config[Pe]) != null ? p : jt, r = ($ = this._config[We]) != null ? $ : It, h = (M = this._config[je]) != null ? M : Ft, d = this._config[Ve] || Ut, c = this._config[Ge] || Dt, g = this._config[ke] || Vt, f = this._config[Ie] || Gt, _ = this._config[Fe] || kt;
    return C`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker
            label="VPD Sensor Entity"
            .hass=${this.hass}
            .value=${t}
            .configValue=${Le}
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
            .configValue=${De}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
          ></ha-entity-picker>
  
          <h3>Appearance</h3>
          <ha-textfield
            label="Name (Optional)"
            .value=${e}
            .configValue=${Ne}
            @input=${this._valueChanged}
          ></ha-textfield>
          <ha-formfield label="Show Needle">
              <ha-switch
              .checked=${a}
              .configValue=${Re}
              @change=${this._valueChanged}
              ></ha-switch>
          </ha-formfield>
  
          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield
                  label="Gauge Min Value"
                  type="number"
                  .value=${o}
                  .configValue=${Me}
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
                  .configValue=${We}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from Extreme Low to Low at this value"
              ></ha-textfield>
              <ha-textfield
                  label="Static High Threshold"
                  type="number"
                  .value=${h}
                  .configValue=${je}
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
              <ha-textfield .value=${g} .configValue=${ke} @input=${this._valueChanged}></ha-textfield>
              <label>High:</label>
              <ha-textfield .value=${f} .configValue=${Ie} @input=${this._valueChanged}></ha-textfield>
              <label>Extreme High:</label>
              <ha-textfield .value=${_} .configValue=${Fe} @input=${this._valueChanged}></ha-textfield>
           </div>
           <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
  
        </div>
      `;
  }
  static get styles() {
    return ue`
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
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", zt);
const qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), E = "entity", V = "name", ze = "gauge_min", qe = "gauge_max", G = "min_entity", k = "max_entity", Xe = "color_extreme_low", Be = "color_low", Ye = "color_good", Ke = "color_high", Je = "color_extreme_high", Ze = "static_low_threshold", Qe = "static_high_threshold", ie = "#1c2814", se = "#406f1e", ne = "#689a46", oe = "#406f1e", ae = "#1c2814", re = 1, le = 1.2, X = 0.8, he = 1.3;
class Xt extends S {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    ye(this, "_calculateSegments", () => {
      var fe, _e, pe;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[G] || !t[k])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const s = (fe = t.gauge_min) != null ? fe : X, a = t.min_entity, o = t.max_entity, l = (_e = t.static_low_threshold) != null ? _e : re, r = (pe = t.static_high_threshold) != null ? pe : le, h = t.color_extreme_low || ie, d = t.color_low || se, c = t.color_good || ne, g = t.color_high || oe, f = t.color_extreme_high || ae, _ = i.states[a], v = i.states[o];
      let p = l;
      _ && !isNaN(parseFloat(_.state)) ? p = parseFloat(_.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${a}), using static fallback ${p}`
      );
      let $ = r;
      v && !isNaN(parseFloat(v.state)) ? $ = parseFloat(v.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${o}), using static fallback ${$}`
      );
      const M = [
        { from: s, color: h },
        { from: l, color: d },
        { from: p, color: c },
        { from: $, color: g },
        { from: r, color: f }
      ];
      M.sort((m, z) => m.from - z.from);
      const y = M.filter((m, z, $e) => !(m.from < s || z < $e.length - 1 && $e[z + 1].from === m.from));
      if (y.length === 0 || y[0].from > s) {
        let m = h;
        s >= r ? m = f : s >= $ ? m = g : s >= p ? m = c : s >= l && (m = d), y.unshift({ from: s, color: m }), y.length > 1 && y[1].from === y[0].from && y.shift();
      }
      return console.log(
        `VPD Gauge (${t.entity}): MinT=${p}, MaxT=${$}, Segments=`,
        y
      ), y;
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
    if (!t[G])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!t[k])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    const i = {
      needle: !0,
      gauge_min: X,
      gauge_max: he,
      static_low_threshold: re,
      static_high_threshold: le,
      color_extreme_low: ie,
      color_low: se,
      color_good: ne,
      color_high: oe,
      color_extreme_high: ae,
      name: ""
      // Default name is empty
    };
    this.config = H(H({}, i), t), console.log("VPD Gauge Card Config Set (with defaults applied):", this.config), this.hass && this.requestUpdate();
  }
  // --- Rendering ---
  render() {
    var a, o;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[E])
      return C`<ha-card header="VPD Gauge"
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
      return C`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[E]}
          </div>
        </ha-card>
      `;
    if (i === void 0 || isNaN(i))
      return C`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[E]}: ${t.state}
          </div>
        </ha-card>
      `;
    const s = this._calculateSegments();
    return C`
      <ha-card header="${this.config[V] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(a = this.config.gauge_min) != null ? a : X}
            .max=${(o = this.config.gauge_max) != null ? o : he}
            .segments=${s}
            ?needle=true
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
    return Promise.resolve().then(() => qt).then(() => {
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
    return ue`
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
customElements.get("vpd-gauge-card") ? console.warn("Attempted to redefine vpd-gauge-card. Skipping.") : (customElements.define("vpd-gauge-card", Xt), console.info(
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
class Bt extends S {
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
    var a;
    if (!this._config || !this.hass)
      return;
    const t = e.target, i = t.dataset.configValue;
    let s = t.value;
    if (!i) {
      console.warn("No configValue dataset found for target:", t);
      return;
    }
    t.tagName === "HA-SWITCH" ? (s = t.checked, console.log(`Switch Changed: Key=${i}, Checked State=${s}`)) : t.type === "number" ? s = s === "" ? void 0 : parseFloat(s) : t.tagName === "HA-ENTITY-PICKER" && ((a = e.detail) == null ? void 0 : a.value) !== void 0 && (s = e.detail.value), s === void 0 || s === "" || typeof s == "number" && isNaN(s) ? i !== E && i !== G && i !== k ? delete this._config[i] : this._config[i] = "" : this._config[i] = s, this.fireConfigChanged();
  }
  render() {
    var _, v, p, $;
    if (!this.hass || !this._config)
      return C``;
    const e = this._config[V] || "", t = this._config[E] || "", i = this._config[G] || "", s = this._config[k] || "", a = (_ = this._config[ze]) != null ? _ : X, o = (v = this._config[qe]) != null ? v : he, l = (p = this._config[Ze]) != null ? p : re, r = ($ = this._config[Qe]) != null ? $ : le, h = this._config[Xe] || ie, d = this._config[Be] || se, c = this._config[Ye] || ne, g = this._config[Ke] || oe, f = this._config[Je] || ae;
    return C`
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
          .configValue=${G}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${s}
          .configValue=${k}
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

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${a}
            .configValue=${ze}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
          <ha-textfield
            label="Gauge Max Value"
            type="number"
            .value=${o}
            .configValue=${qe}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
        </div>
        <div class="side-by-side">
          <ha-textfield
            label="Static Low Threshold"
            type="number"
            .value=${l}
            .configValue=${Ze}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from Extreme Low to Low at this value"
          ></ha-textfield>
          <ha-textfield
            label="Static High Threshold"
            type="number"
            .value=${r}
            .configValue=${Qe}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from High to Extreme High at this value"
          ></ha-textfield>
        </div>

        <h3>Segment Colors</h3>
        <div class="color-grid">
          <label>Extreme Low:</label>
          <ha-textfield
            .value=${h}
            .configValue=${Xe}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Low:</label>
          <ha-textfield
            .value=${d}
            .configValue=${Be}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Good:</label>
          <ha-textfield
            .value=${c}
            .configValue=${Ye}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>High:</label>
          <ha-textfield
            .value=${g}
            .configValue=${Ke}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Extreme High:</label>
          <ha-textfield
            .value=${f}
            .configValue=${Je}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
        <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
      </div>
    `;
  }
  static get styles() {
    return ue`
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
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", Bt);
