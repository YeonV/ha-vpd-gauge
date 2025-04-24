var Je = Object.defineProperty;
var Ae = Object.getOwnPropertySymbols;
var Ze = Object.prototype.hasOwnProperty, Qe = Object.prototype.propertyIsEnumerable;
var ee = (r, e, t) => e in r ? Je(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, T = (r, e) => {
  for (var t in e || (e = {}))
    Ze.call(e, t) && ee(r, t, e[t]);
  if (Ae)
    for (var t of Ae(e))
      Qe.call(e, t) && ee(r, t, e[t]);
  return r;
};
var L = (r, e, t) => ee(r, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, pe = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fe = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
let ze = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== fe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (pe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ce.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ce.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const et = (r) => new ze(typeof r == "string" ? r : r + "", void 0, fe), je = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new ze(t, r, fe);
}, tt = (r, e) => {
  if (pe) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = K.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, be = pe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return et(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: it, defineProperty: st, getOwnPropertyDescriptor: nt, getOwnPropertyNames: ot, getOwnPropertySymbols: rt, getPrototypeOf: at } = Object, A = globalThis, we = A.trustedTypes, lt = we ? we.emptyScript : "", te = A.reactiveElementPolyfillSupport, I = (r, e) => r, he = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? lt : null;
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
} }, We = (r, e) => !it(r, e), xe = { attribute: !0, type: String, converter: he, reflect: !1, useDefault: !1, hasChanged: We };
var De, Ge;
(De = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (Ge = A.litPropertyMetadata) != null || (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
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
      s !== void 0 && st(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var n;
    const { get: s, set: o } = (n = nt(this.prototype, e)) != null ? n : { get() {
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
    return (t = this.elementProperties.get(e)) != null ? t : xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = at(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const t = this.properties, i = [...ot(t), ...rt(t)];
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
    return tt(e, this.constructor.elementStyles), e;
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
    var o, n, h, a;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : he;
      this._$Em = s, this[s] = (a = (h = d.fromAttribute(t, l.type)) != null ? h : (n = this._$Ej) == null ? void 0 : n.get(s)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, o;
    if (e !== void 0) {
      const n = this.constructor, h = this[e];
      if (i != null || (i = n.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : We)(h, t) || i.useDefault && i.reflect && h === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
var Ie;
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[I("elementProperties")] = /* @__PURE__ */ new Map(), k[I("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: k }), ((Ie = A.reactiveElementVersions) != null ? Ie : A.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, X = V.trustedTypes, Se = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Be = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Ke = "?" + E, ht = `<${Ke}>`, S = document, q = () => S.createComment(""), z = (r) => r === null || typeof r != "object" && typeof r != "function", me = Array.isArray, ct = (r) => me(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Te = />/g, C = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Le = /'/g, ke = /"/g, Xe = /^(?:script|style|textarea|title)$/i, dt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), b = dt(1), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), w = S.createTreeWalker(S, 129);
function Ye(r, e) {
  if (!me(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Se !== void 0 ? Se.createHTML(e) : e;
}
const ut = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = G;
  for (let h = 0; h < t; h++) {
    const a = r[h];
    let l, d, c = -1, g = 0;
    for (; g < a.length && (n.lastIndex = g, d = n.exec(a), d !== null); ) g = n.lastIndex, n === G ? d[1] === "!--" ? n = Oe : d[1] !== void 0 ? n = Te : d[2] !== void 0 ? (Xe.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = C) : d[3] !== void 0 && (n = C) : n === C ? d[0] === ">" ? (n = s != null ? s : G, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, l = d[1], n = d[3] === void 0 ? C : d[3] === '"' ? ke : Le) : n === ke || n === Le ? n = C : n === Oe || n === Te ? n = G : (n = C, s = void 0);
    const _ = n === C && r[h + 1].startsWith("/>") ? " " : "";
    o += n === G ? a + ht : c >= 0 ? (i.push(l), a.slice(0, c) + Be + a.slice(c) + E + _) : a + E + (c === -2 ? h : _);
  }
  return [Ye(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const h = e.length - 1, a = this.parts, [l, d] = ut(e, t);
    if (this.el = j.createElement(l, i), w.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Be)) {
          const g = d[n++], _ = s.getAttribute(c).split(E), p = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: p[2], strings: _, ctor: p[1] === "." ? _t : p[1] === "?" ? pt : p[1] === "@" ? ft : Q }), s.removeAttribute(c);
        } else c.startsWith(E) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Xe.test(s.tagName)) {
          const c = s.textContent.split(E), g = c.length - 1;
          if (g > 0) {
            s.textContent = X ? X.emptyScript : "";
            for (let _ = 0; _ < g; _++) s.append(c[_], q()), w.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[g], q());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ke) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(E, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += E.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = S.createElement("template");
    return i.innerHTML = e, i;
  }
}
function M(r, e, t = r, i) {
  var n, h, a;
  if (e === R) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = z(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? ((a = t._$Co) != null ? a : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = M(r, s._$AS(r, e.values), s, i)), e;
}
class gt {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((l = e == null ? void 0 : e.creationScope) != null ? l : S).importNode(t, !0);
    w.currentNode = s;
    let o = w.nextNode(), n = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new W(o, o.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (d = new mt(o, this, e)), this._$AV.push(d), a = i[++h];
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
class W {
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
    e = M(this, e, t), z(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ct(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(Ye(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new gt(s, this), h = n.u(this.options);
      n.p(t), this.T(h), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = He.get(e.strings);
    return t === void 0 && He.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new W(this.O(q()), this.O(q()), this, this.options)) : i = t[s], i._$AI(o), s++;
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
class Q {
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
    if (o === void 0) e = M(this, e, t, 0), n = !z(e) || e !== this._$AH && e !== R, n && (this._$AH = e);
    else {
      const h = e;
      let a, l;
      for (e = o[0], a = 0; a < o.length - 1; a++) l = M(this, h[i + a], t, a), l === R && (l = this._$AH[a]), n || (n = !z(l) || l !== this._$AH[a]), l === u ? e = u : e !== u && (e += (l != null ? l : "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class _t extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class pt extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class ft extends Q {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    var n;
    if ((e = (n = M(this, e, t, 0)) != null ? n : u) === R) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) == null ? void 0 : t.host) != null ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class mt {
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
const se = V.litHtmlPolyfillSupport;
var Ve;
se == null || se(j, W), ((Ve = V.litHtmlVersions) != null ? Ve : V.litHtmlVersions = []).push("3.3.0");
const $t = (r, e, t) => {
  var o, n;
  const i = (o = t == null ? void 0 : t.renderBefore) != null ? o : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const h = (n = t == null ? void 0 : t.renderBefore) != null ? n : null;
    i._$litPart$ = s = new W(e.insertBefore(q(), h), h, void 0, t != null ? t : {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
class P extends k {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $t(t, this.renderRoot, this.renderOptions);
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
var Fe;
P._$litElement$ = !0, P.finalized = !0, (Fe = x.litElementHydrateSupport) == null || Fe.call(x, { LitElement: P });
const ne = x.litElementPolyfillSupport;
ne == null || ne({ LitElement: P });
var qe;
((qe = x.litElementVersions) != null ? qe : x.litElementVersions = []).push("4.2.0");
const $ = "entity", U = "name", oe = "gauge_min", re = "gauge_max", H = "min_entity", N = "max_entity", Ne = "color_extreme_low", Pe = "color_low", Ue = "color_good", Re = "color_high", Me = "color_extreme_high", ae = "static_low_threshold", le = "static_high_threshold", ce = "#1c2814", de = "#406f1e", ue = "#689a46", ge = "#406f1e", _e = "#1c2814", Y = 1, J = 1.2, F = 0.8, Z = 1.3, yt = (r, e, t = {}, i = {}) => {
  const s = new CustomEvent(e, {
    bubbles: i.bubbles === void 0 ? !0 : i.bubbles,
    cancelable: !!i.cancelable,
    composed: i.composed === void 0 ? !0 : i.composed
  });
  return s.detail = t, r.dispatchEvent(s), s;
};
class vt extends P {
  constructor() {
    super(...arguments);
    L(this, "_initialized", !1);
    L(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers ---
    L(this, "_valueChanged", (t) => {
      var h;
      if (!this._config) return;
      const i = t.target, s = i.dataset.configValue;
      let o = i.value;
      if (!s) {
        console.warn("No configValue dataset found for target:", i);
        return;
      }
      i.type === "number" ? o = o === "" ? void 0 : parseFloat(o) : i.tagName === "HA-ENTITY-PICKER" && ((h = t.detail) == null ? void 0 : h.value) !== void 0 && (o = t.detail.value);
      const n = T({}, this._config);
      o === void 0 || o === "" || typeof o == "number" && isNaN(o) ? s !== $ && s !== H && s !== N ? delete n[s] : n[s] = "" : n[s] = o, this._config = n, this.fireConfigChanged();
    });
    L(this, "_colorChanged", (t) => {
      if (!this._config) return;
      const i = t.target, s = i.dataset.configValue, o = t.detail.value;
      if (!s) {
        console.warn("No configValue dataset found for color picker:", i);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${s}, Value=${o}`);
      const n = T({}, this._config);
      o ? n[s] = o.toUpperCase() : delete n[s], this._config = n, this.fireConfigChanged();
    });
  }
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: !0 }
    };
  }
  setConfig(t) {
    console.log("[Editor] setConfig received:", t), this._config = T({}, t), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => {
      this._initialized || this.firstUpdated(), this.loadEditorValues();
    });
  }
  set hass(t) {
    var i;
    this._hass = t, this._initialized && ((i = this._elements) != null && i.pickers) && Object.values(this._elements.pickers).forEach((s) => {
      s && (s.hass = this._hass);
    });
  }
  // Use firstUpdated for setup that depends on shadow DOM
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
    var t, i, s, o, n, h, a, l, d;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", (c) => this._valueChanged(c)), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", (c) => this._valueChanged(c)), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", (c) => this._valueChanged(c)), (o = this._elements.inputs.name) == null || o.addEventListener("input", (c) => this._valueChanged(c)), (n = this._elements.inputs.gauge_min) == null || n.addEventListener("input", (c) => this._valueChanged(c)), (h = this._elements.inputs.gauge_max) == null || h.addEventListener("input", (c) => this._valueChanged(c)), (a = this._elements.inputs.static_low_threshold) == null || a.addEventListener("input", (c) => this._valueChanged(c)), (l = this._elements.inputs.static_high_threshold) == null || l.addEventListener("input", (c) => this._valueChanged(c));
      for (const c in this._elements.colors)
        (d = this._elements.colors[c].picker) == null || d.addEventListener("color-changed", (g) => this._colorChanged(g));
    }
  }
  loadEditorValues() {
    var i, s;
    if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) {
      console.warn("[Editor] Cannot load values - editor not fully ready.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const t = (o, n, h = "") => {
      o && (o.value = n != null ? n : h);
    };
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((o) => {
      o && (o.hass = this._hass);
    }), t(this._elements.pickers.entity, this._config[$]), t(this._elements.pickers.min_entity, this._config[H]), t(this._elements.pickers.max_entity, this._config[N]), t(this._elements.inputs.name, this._config[U]), t(this._elements.inputs.gauge_min, this._config[oe], F), t(this._elements.inputs.gauge_max, this._config[re], Z), t(this._elements.inputs.static_low_threshold, this._config[ae], Y), t(this._elements.inputs.static_high_threshold, this._config[le], J);
    for (const o in this._elements.colors) {
      const n = (i = this._elements.colors[o]) == null ? void 0 : i.picker;
      if (n) {
        const h = `color_${o}`, a = `DEFAULT_COLOR_${o.toUpperCase()}`, l = window[a] !== void 0 ? window[a] : "#000000";
        n.value = (s = this._config[h]) != null ? s : l;
      }
    }
  }
  // Use HA's fireEvent helper for consistency
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config), yt(this, "config-changed", { config: this._config });
  }
  render() {
    var O, y, v, D;
    if (!this._hass) return b`Waiting for hass...`;
    if (!this._config) return b`Waiting for config...`;
    const t = this._config[U] || "", i = this._config[$] || "", s = this._config[H] || "", o = this._config[N] || "", n = (O = this._config[oe]) != null ? O : F, h = (y = this._config[re]) != null ? y : Z, a = (v = this._config[ae]) != null ? v : Y, l = (D = this._config[le]) != null ? D : J, d = this._config[Ne] || ce, c = this._config[Pe] || de, g = this._config[Ue] || ue, _ = this._config[Re] || ge, p = this._config[Me] || _e;
    return b`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} data-config-value=${$} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} data-config-value=${H} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${o} data-config-value=${N} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${t} data-config-value=${U} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${n} data-config-value=${oe} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${h} data-config-value=${re} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${a} data-config-value=${ae} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${l} data-config-value=${le} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${d} data-config-value=${Ne} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${c} data-config-value=${Pe} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${g} data-config-value=${Ue} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${_} data-config-value=${Re} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${p} data-config-value=${Me} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return je`
        /* Full styles */
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
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", vt), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
class Et extends P {
  constructor() {
    super(...arguments);
    L(this, "_calculateSegments", () => {
      var $e, ye, ve;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[H] || !t[N])
        return console.warn("VPD Gauge: Data missing for segment calc."), [];
      const s = ($e = t.gauge_min) != null ? $e : F, o = t.min_entity, n = t.max_entity, h = (ye = t.static_low_threshold) != null ? ye : Y, a = (ve = t.static_high_threshold) != null ? ve : J, l = t.color_extreme_low || ce, d = t.color_low || de, c = t.color_good || ue, g = t.color_high || ge, _ = t.color_extreme_high || _e, p = i.states[o], O = i.states[n];
      let y = h;
      p && !isNaN(parseFloat(p.state)) ? y = parseFloat(p.state) : console.warn(`VPD Gauge: Invalid min_entity state (${o}), using static fallback ${y}`);
      let v = a;
      O && !isNaN(parseFloat(O.state)) ? v = parseFloat(O.state) : console.warn(`VPD Gauge: Invalid max_entity state (${n}), using static fallback ${v}`);
      const D = [{ from: s, color: l }, { from: h, color: d }, { from: y, color: c }, { from: v, color: g }, { from: a, color: _ }];
      D.sort((f, B) => f.from - B.from);
      const m = D.filter((f, B, Ee) => !(f.from < s || B < Ee.length - 1 && Ee[B + 1].from === f.from));
      if (m.length === 0 || m[0].from > s) {
        let f = l;
        s >= a ? f = _ : s >= v ? f = g : s >= y ? f = c : s >= h && (f = d), m.unshift({ from: s, color: f }), m.length > 1 && m[1].from === m[0].from && m.shift();
      }
      return console.log(`VPD Gauge (${t.entity}): MinT=${y}, MaxT=${v}, Segments=`, m), m;
    });
  }
  // --- Paste the ENTIRE VpdGaugeCard CLASS CODE HERE ---
  // Including: static get properties, setConfig (without needle default),
  // _calculateSegments (final correct version), render (without needle),
  // getCardSize, static getConfigElement (simple version), static getStubConfig, static get styles
  // ------------------------------------------------------
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }
  setConfig(t) {
    if (!t || !t[$]) throw new Error("Entity is required");
    if (!t[H]) throw new Error("Min entity is required");
    if (!t[N]) throw new Error("Max entity is required");
    const i = { gauge_min: F, gauge_max: Z, static_low_threshold: Y, static_high_threshold: J, color_extreme_low: ce, color_low: de, color_good: ue, color_high: ge, color_extreme_high: _e, name: "" };
    this.config = T(T({}, i), t), delete this.config.needle, console.log("VPD Gauge Card Config Set:", this.config), this.hass && this.requestUpdate();
  }
  render() {
    var o, n;
    if (console.log("Render method called. Hass:", !!this.hass, "Config:", !!this.config), !this.hass || !this.config || !this.config[$]) return b`<ha-card><div class="warning">Config required</div></ha-card>`;
    const t = this.hass.states[this.config[$]], i = t ? parseFloat(t.state) : void 0;
    if (console.log(`Rendering: Entity=${this.config[$]}, StateObj=`, t, `Value=${i}`), t === void 0) return b`<ha-card header="${this.config[U] || "VPD"}"><div class="warning">Entity not found: ${this.config[$]}</div></ha-card>`;
    if (i === void 0 || isNaN(i)) return b`<ha-card header="${this.config[U] || "VPD"}"><div class="warning">Invalid state: ${t.state}</div></ha-card>`;
    const s = this._calculateSegments();
    return b` <ha-card header="${this.config[U] || "VPD Gauge"}"> <div class="card-content"> <ha-gauge .value=${i} .min=${(o = this.config.gauge_min) != null ? o : F} .max=${(n = this.config.gauge_max) != null ? n : Z} .segments=${s} needle style="--gauge-color: var(--primary-text-color);"></ha-gauge> </div> </ha-card> `;
  }
  getCardSize() {
    return 3;
  }
  static getConfigElement() {
    return console.log("getConfigElement: Creating vpd-gauge-card-editor element."), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(t, i, s) {
    const o = i.find((l) => l.startsWith("sensor.") && l.includes("vpd")) || s.find((l) => l.startsWith("sensor.") && l.includes("vpd")), n = o ? o.split(".").pop().replace("_vpd_mqtt", "").replace("_vpd", "") : null, h = i.find((l) => l.startsWith("number.") && l.includes("min") && (n ? l.includes(n) : !0)) || s.find((l) => l.startsWith("number.") && l.includes("min")), a = i.find((l) => l.startsWith("number.") && l.includes("max") && (n ? l.includes(n) : !0)) || s.find((l) => l.startsWith("number.") && l.includes("max"));
    return console.log("StubConfig Found: VPD=", o, "Min=", h, "Max=", a), { type: "custom:vpd-gauge-card", entity: o || "", min_entity: h || "", max_entity: a || "", name: n ? `${n.replace(/_/g, " ")} VPD Gauge` : "VPD Gauge" };
  }
  static get styles() {
    return je`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`;
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", Et), console.info("%c VPD-GAUGE-CARD %c Loaded ", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({
  type: "vpd-gauge-card",
  name: "VPD Gauge Card",
  description: "A gauge card with dynamic segments based on min/max threshold entities.",
  preview: !0
});
console.log("VPD Gauge Card + Editor Script Loaded Successfully");
