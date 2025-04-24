var pt = Object.defineProperty, mt = Object.defineProperties;
var $t = Object.getOwnPropertyDescriptors;
var Se = Object.getOwnPropertySymbols;
var vt = Object.prototype.hasOwnProperty, yt = Object.prototype.propertyIsEnumerable;
var ee = (a, e, t) => e in a ? pt(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t, x = (a, e) => {
  for (var t in e || (e = {}))
    vt.call(e, t) && ee(a, t, e[t]);
  if (Se)
    for (var t of Se(e))
      yt.call(e, t) && ee(a, t, e[t]);
  return a;
}, Te = (a, e) => mt(a, $t(e));
var j = (a, e, t) => ee(a, typeof e != "symbol" ? e + "" : e, t);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, ye = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ee = Symbol(), Le = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ye && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Le.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Le.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (a) => new ct(typeof a == "string" ? a : a + "", void 0, Ee), Ce = (a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[n + 1], a[0]);
  return new ct(t, a, Ee);
}, Ct = (a, e) => {
  if (ye) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = B.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, a.appendChild(i);
  }
}, He = ye ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Et(t);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: At, defineProperty: bt, getOwnPropertyDescriptor: wt, getOwnPropertyNames: xt, getOwnPropertySymbols: Ot, getPrototypeOf: St } = Object, w = globalThis, Ne = w.trustedTypes, Tt = Ne ? Ne.emptyScript : "", te = w.reactiveElementPolyfillSupport, U = (a, e) => a, ce = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? Tt : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, e) {
  let t = a;
  switch (e) {
    case Boolean:
      t = a !== null;
      break;
    case Number:
      t = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(a);
      } catch (i) {
        t = null;
      }
  }
  return t;
} }, dt = (a, e) => !At(a, e), ke = { attribute: !0, type: String, converter: ce, reflect: !1, useDefault: !1, hasChanged: dt };
var nt, ot;
(nt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (ot = w.litPropertyMetadata) != null || (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let N = class extends HTMLElement {
  static addInitializer(e) {
    var t;
    this._$Ei(), ((t = this.l) != null ? t : this.l = []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ke) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && bt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    var o;
    const { get: s, set: n } = (o = wt(this.prototype, e)) != null ? o : { get() {
      return this[t];
    }, set(l) {
      this[t] = l;
    } };
    return { get: s, set(l) {
      const r = s == null ? void 0 : s.call(this);
      n == null || n.call(this, l), this.requestUpdate(e, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    var t;
    return (t = this.elementProperties.get(e)) != null ? t : ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = St(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...xt(t), ...Ot(t)];
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
      for (const s of i) t.unshift(He(s));
    } else e !== void 0 && t.push(He(e));
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
    return Ct(e, this.constructor.elementStyles), e;
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
    var n;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : ce).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o, l, r;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const c = i.getPropertyOptions(s), d = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : ce;
      this._$Em = s, this[s] = (r = (l = d.fromAttribute(t, c.type)) != null ? l : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? r : null, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s, n;
    if (e !== void 0) {
      const o = this.constructor, l = this[e];
      if (i != null || (i = o.getPropertyOptions(e)), !(((s = i.hasChanged) != null ? s : dt)(l, t) || i.useDefault && i.reflect && l === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: n }, o) {
    var l, r, c;
    i && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, (r = o != null ? o : t) != null ? r : this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && ((c = this._$Eq) != null ? c : this._$Eq = /* @__PURE__ */ new Set()).add(e));
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
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, l] of n) {
        const { wrapped: r } = l, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, l, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
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
var at;
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[U("elementProperties")] = /* @__PURE__ */ new Map(), N[U("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: N }), ((at = w.reactiveElementVersions) != null ? at : w.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, K = M.trustedTypes, Re = K ? K.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, ut = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + b, Lt = `<${gt}>`, H = document, G = () => H.createComment(""), V = (a) => a === null || typeof a != "object" && typeof a != "function", Ae = Array.isArray, Ht = (a) => Ae(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, Ue = />/g, O = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Me = /'/g, Pe = /"/g, _t = /^(?:script|style|textarea|title)$/i, Nt = (a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), E = Nt(1), k = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ge = /* @__PURE__ */ new WeakMap(), S = H.createTreeWalker(H, 129);
function ft(a, e) {
  if (!Ae(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Re !== void 0 ? Re.createHTML(e) : e;
}
const kt = (a, e) => {
  const t = a.length - 1, i = [];
  let s, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = D;
  for (let l = 0; l < t; l++) {
    const r = a[l];
    let c, d, h = -1, u = 0;
    for (; u < r.length && (o.lastIndex = u, d = o.exec(r), d !== null); ) u = o.lastIndex, o === D ? d[1] === "!--" ? o = De : d[1] !== void 0 ? o = Ue : d[2] !== void 0 ? (_t.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = O) : d[3] !== void 0 && (o = O) : o === O ? d[0] === ">" ? (o = s != null ? s : D, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? O : d[3] === '"' ? Pe : Me) : o === Pe || o === Me ? o = O : o === De || o === Ue ? o = D : (o = O, s = void 0);
    const _ = o === O && a[l + 1].startsWith("/>") ? " " : "";
    n += o === D ? r + Lt : h >= 0 ? (i.push(c), r.slice(0, h) + ut + r.slice(h) + b + _) : r + b + (h === -2 ? l : _);
  }
  return [ft(a, n + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, r = this.parts, [c, d] = kt(e, t);
    if (this.el = I.createElement(c, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = S.nextNode()) !== null && r.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(ut)) {
          const u = d[o++], _ = s.getAttribute(h).split(b), f = /([.?@])?(.*)/.exec(u);
          r.push({ type: 1, index: n, name: f[2], strings: _, ctor: f[1] === "." ? Dt : f[1] === "?" ? Ut : f[1] === "@" ? Mt : Q }), s.removeAttribute(h);
        } else h.startsWith(b) && (r.push({ type: 6, index: n }), s.removeAttribute(h));
        if (_t.test(s.tagName)) {
          const h = s.textContent.split(b), u = h.length - 1;
          if (u > 0) {
            s.textContent = K ? K.emptyScript : "";
            for (let _ = 0; _ < u; _++) s.append(h[_], G()), S.nextNode(), r.push({ type: 2, index: ++n });
            s.append(h[u], G());
          }
        }
      } else if (s.nodeType === 8) if (s.data === gt) r.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(b, h + 1)) !== -1; ) r.push({ type: 7, index: n }), h += b.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function R(a, e, t = a, i) {
  var o, l, r;
  if (e === k) return e;
  let s = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const n = V(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), n === void 0 ? s = void 0 : (s = new n(a), s._$AT(a, t, i)), i !== void 0 ? ((r = t._$Co) != null ? r : t._$Co = [])[i] = s : t._$Cl = s), s !== void 0 && (e = R(a, s._$AS(a, e.values), s, i)), e;
}
class Rt {
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
    var c;
    const { el: { content: t }, parts: i } = this._$AD, s = ((c = e == null ? void 0 : e.creationScope) != null ? c : H).importNode(t, !0);
    S.currentNode = s;
    let n = S.nextNode(), o = 0, l = 0, r = i[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let d;
        r.type === 2 ? d = new F(n, n.nextSibling, this, e) : r.type === 1 ? d = new r.ctor(n, r.name, r.strings, this, e) : r.type === 6 && (d = new Pt(n, this, e)), this._$AV.push(d), r = i[++l];
      }
      o !== (r == null ? void 0 : r.index) && (n = S.nextNode(), o++);
    }
    return S.currentNode = H, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) == null ? void 0 : e._$AU) != null ? t : this._$Cv;
  }
  constructor(e, t, i, s) {
    var n;
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (n = s == null ? void 0 : s.isConnected) != null ? n : !0;
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
    e = R(this, e, t), V(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== k && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ht(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(ft(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(t);
    else {
      const o = new Rt(s, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ge.get(e.strings);
    return t === void 0 && Ge.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const n of e) s === t.length ? t.push(i = new F(this.O(G()), this.O(G()), this, this.options)) : i = t[s], i._$AI(n), s++;
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
  constructor(e, t, i, s, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(e, t = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = R(this, e, t, 0), o = !V(e) || e !== this._$AH && e !== k, o && (this._$AH = e);
    else {
      const l = e;
      let r, c;
      for (e = n[0], r = 0; r < n.length - 1; r++) c = R(this, l[i + r], t, r), c === k && (c = this._$AH[r]), o || (o = !V(c) || c !== this._$AH[r]), c === g ? e = g : e !== g && (e += (c != null ? c : "") + n[r + 1]), this._$AH[r] = c;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Dt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Ut extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Mt extends Q {
  constructor(e, t, i, s, n) {
    super(e, t, i, s, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var o;
    if ((e = (o = R(this, e, t, 0)) != null ? o : g) === k) return;
    const i = this._$AH, s = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== g && (i === g || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
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
    R(this, e);
  }
}
const se = M.litHtmlPolyfillSupport;
var rt;
se == null || se(I, F), ((rt = M.litHtmlVersions) != null ? rt : M.litHtmlVersions = []).push("3.3.0");
const Gt = (a, e, t) => {
  var n, o;
  const i = (n = t == null ? void 0 : t.renderBefore) != null ? n : e;
  let s = i._$litPart$;
  if (s === void 0) {
    const l = (o = t == null ? void 0 : t.renderBefore) != null ? o : null;
    i._$litPart$ = s = new F(e.insertBefore(G(), l), l, void 0, t != null ? t : {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
class L extends N {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Gt(t, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var lt;
L._$litElement$ = !0, L.finalized = !0, (lt = T.litElementHydrateSupport) == null || lt.call(T, { LitElement: L });
const ne = T.litElementPolyfillSupport;
ne == null || ne({ LitElement: L });
var ht;
((ht = T.litElementVersions) != null ? ht : T.litElementVersions = []).push("4.2.0");
const q = "entity", oe = "name", ae = "gauge_min", re = "gauge_max", z = "min_entity", X = "max_entity", Ve = "color_extreme_low", Ie = "color_low", Fe = "color_good", We = "color_high", je = "color_extreme_high", le = "static_low_threshold", he = "static_high_threshold", Vt = "#1c2814", It = "#406f1e", Ft = "#689a46", Wt = "#406f1e", jt = "#1c2814", qe = 1, ze = 1.2, Xe = 0.8, Be = 1.3;
let qt = class extends L {
  constructor() {
    super(...arguments);
    j(this, "_initialized", !1);
    j(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
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
    var t, i, s, n, o, l, r, c, d;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (t = this._elements.pickers.entity) == null || t.addEventListener("value-changed", (h) => this._valueChanged(h)), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", (h) => this._valueChanged(h)), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", (h) => this._valueChanged(h)), (n = this._elements.inputs.name) == null || n.addEventListener("input", (h) => this._valueChanged(h)), (o = this._elements.inputs.gauge_min) == null || o.addEventListener("input", (h) => this._valueChanged(h)), (l = this._elements.inputs.gauge_max) == null || l.addEventListener("input", (h) => this._valueChanged(h)), (r = this._elements.inputs.static_low_threshold) == null || r.addEventListener("input", (h) => this._valueChanged(h)), (c = this._elements.inputs.static_high_threshold) == null || c.addEventListener("input", (h) => this._valueChanged(h));
      for (const h in this._elements.colors)
        (d = this._elements.colors[h].picker) == null || d.addEventListener("color-changed", (u) => this._colorChanged(u));
    }
  }
  loadEditorValues() {
    var i, s;
    if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) {
      console.warn("[Editor] Cannot load values - editor not fully ready.");
      return;
    }
    console.log("[Editor] Loading editor values from:", this._config);
    const t = (n, o, l = "") => {
      n && (n.value = o != null ? o : l);
    };
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((n) => {
      n && (n.hass = this._hass);
    }), t(this._elements.pickers.entity, this._config[q]), t(this._elements.pickers.min_entity, this._config[z]), t(this._elements.pickers.max_entity, this._config[X]), t(this._elements.inputs.name, this._config[oe]), t(this._elements.inputs.gauge_min, this._config[ae], Xe), t(this._elements.inputs.gauge_max, this._config[re], Be), t(this._elements.inputs.static_low_threshold, this._config[le], qe), t(this._elements.inputs.static_high_threshold, this._config[he], ze);
    for (const n in this._elements.colors) {
      const o = (i = this._elements.colors[n]) == null ? void 0 : i.picker;
      if (o) {
        const l = `color_${n}`, r = `DEFAULT_COLOR_${n.toUpperCase()}`, c = window[r] !== void 0 ? window[r] : "#000000";
        o.value = (s = this._config[l]) != null ? s : c;
      }
    }
  }
  // --- Event Handlers ---
  _valueChanged(t) {
    var l;
    if (!this._config) return;
    const i = t.target, s = i.dataset.configValue;
    let n = i.value;
    if (!s) {
      console.warn("No configValue dataset found for target:", i);
      return;
    }
    i.type === "number" ? n = n === "" ? void 0 : parseFloat(n) : i.tagName === "HA-ENTITY-PICKER" && ((l = t.detail) == null ? void 0 : l.value) !== void 0 && (n = t.detail.value);
    const o = x({}, this._config);
    n === void 0 || n === "" || typeof n == "number" && isNaN(n) ? s !== q && s !== z && s !== X ? delete o[s] : o[s] = "" : o[s] = n, this._config = o, this.fireConfigChanged();
  }
  _colorChanged(t) {
    if (!this._config) return;
    const i = t.target, s = i.dataset.configValue, n = t.detail.value;
    if (!s) {
      console.warn("No configValue dataset found for color picker:", i);
      return;
    }
    console.log(`[Editor] Color Changed: Key=${s}, Value=${n}`);
    const o = x({}, this._config);
    n ? o[s] = n.toUpperCase() : delete o[s], this._config = o, this.fireConfigChanged();
  }
  // Use HA's fireEvent helper for consistency
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config), fireEvent(this, "config-changed", { config: this._config });
  }
  render() {
    var v, p, m, C;
    if (!this._hass) return E`Waiting for hass...`;
    if (!this._config) return E`Waiting for config...`;
    const t = this._config[oe] || "", i = this._config[q] || "", s = this._config[z] || "", n = this._config[X] || "", o = (v = this._config[ae]) != null ? v : Xe, l = (p = this._config[re]) != null ? p : Be, r = (m = this._config[le]) != null ? m : qe, c = (C = this._config[he]) != null ? C : ze, d = this._config[Ve] || Vt, h = this._config[Ie] || It, u = this._config[Fe] || Ft, _ = this._config[We] || Wt, f = this._config[je] || jt;
    return E`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} data-config-value=${q} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} data-config-value=${z} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${n} data-config-value=${X} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${t} data-config-value=${oe} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${o} data-config-value=${ae} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${l} data-config-value=${re} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${r} data-config-value=${le} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${c} data-config-value=${he} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${d} data-config-value=${Ve} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${h} data-config-value=${Ie} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${u} data-config-value=${Fe} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${_} data-config-value=${We} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${f} data-config-value=${je} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return Ce`...`;
  }
};
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", qt), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
console.log("VPD Gauge Card Editor Script Loaded Successfully");
const zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), A = "entity", P = "name", de = "needle", Ye = "gauge_min", Ke = "gauge_max", J = "min_entity", Z = "max_entity", Je = "color_extreme_low", Ze = "color_low", Qe = "color_good", et = "color_high", tt = "color_extreme_high", it = "static_low_threshold", st = "static_high_threshold", ue = "#1c2814", ge = "#406f1e", _e = "#689a46", fe = "#406f1e", pe = "#1c2814", me = 1, $e = 1.2, Y = 0.8, ve = 1.3;
class Xt extends L {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    j(this, "_calculateSegments", () => {
      var be, we, xe;
      const t = this.config, i = this.hass;
      if (!i || !t || !t[J] || !t[Z])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const s = (be = t.gauge_min) != null ? be : Y, n = t.min_entity, o = t.max_entity, l = (we = t.static_low_threshold) != null ? we : me, r = (xe = t.static_high_threshold) != null ? xe : $e, c = t.color_extreme_low || ue, d = t.color_low || ge, h = t.color_good || _e, u = t.color_high || fe, _ = t.color_extreme_high || pe, f = i.states[n], v = i.states[o];
      let p = l;
      f && !isNaN(parseFloat(f.state)) ? p = parseFloat(f.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${n}), using static fallback ${p}`
      );
      let m = r;
      v && !isNaN(parseFloat(v.state)) ? m = parseFloat(v.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${o}), using static fallback ${m}`
      );
      const C = [
        { from: s, color: c },
        { from: l, color: d },
        { from: p, color: h },
        { from: m, color: u },
        { from: r, color: _ }
      ];
      C.sort(($, W) => $.from - W.from);
      const y = C.filter(($, W, Oe) => !($.from < s || W < Oe.length - 1 && Oe[W + 1].from === $.from));
      if (y.length === 0 || y[0].from > s) {
        let $ = c;
        s >= r ? $ = _ : s >= m ? $ = u : s >= p ? $ = h : s >= l && ($ = d), y.unshift({ from: s, color: $ }), y.length > 1 && y[1].from === y[0].from && y.shift();
      }
      return console.log(
        `VPD Gauge (${t.entity}): MinT=${p}, MaxT=${m}, Segments=`,
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
    if (!t[A])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!t[J])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!t[Z])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    this.config = x({
      needle: !0,
      // Default needle to true
      gauge_min: Y,
      gauge_max: ve,
      static_low_threshold: me,
      static_high_threshold: $e,
      color_extreme_low: ue,
      color_low: ge,
      color_good: _e,
      color_high: fe,
      color_extreme_high: pe
    }, t), console.log("VPD Gauge Card Config Set:", this.config);
  }
  // --- Rendering ---
  render() {
    var n, o;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[A])
      return E`<ha-card header="VPD Gauge"
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
      return E`
        <ha-card header="${this.config[P] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[A]}
          </div>
        </ha-card>
      `;
    if (i === void 0 || isNaN(i))
      return E`
        <ha-card header="${this.config[P] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[A]}: ${t.state}
          </div>
        </ha-card>
      `;
    const s = this._calculateSegments();
    return E`
      <ha-card header="${this.config[P] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(n = this.config.gauge_min) != null ? n : Y}
            .max=${(o = this.config.gauge_max) != null ? o : ve}
            .segments=${s}
            ?needle=${this.config[de] !== !1}
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
    return Promise.resolve().then(() => zt).then(() => {
      console.log("VPD Gauge Card Editor loaded.");
    }).catch((t) => {
      console.error("Failed to load VPD Gauge Card Editor:", t);
    }), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(t, i, s) {
    const n = i.find((r) => r.startsWith("sensor.") && r.includes("vpd")) || s.find((r) => r.startsWith("sensor.")), o = i.find((r) => r.startsWith("number.") && r.includes("min")) || s.find((r) => r.startsWith("number.")), l = i.find((r) => r.startsWith("number.") && r.includes("max")) || s.find((r) => r.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: n || "",
      min_entity: o || "",
      max_entity: l || "",
      name: "VPD Gauge"
      // Default visual settings will be applied from setConfig
    };
  }
  // --- Styling ---
  static get styles() {
    return Ce`
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
window.customCards && !window.customCards.some((a) => a.type === "vpd-gauge-card") && (window.customCards = window.customCards || [], window.customCards.push({
  type: "vpd-gauge-card",
  // Matches customElements.define
  name: "VPD Gauge Card",
  description: "A gauge card with dynamic segments based on min/max threshold entities.",
  preview: !0
  // Enable preview in card picker
  // documentationURL: "URL_TO_YOUR_REPO_OR_DOCS" // Optional
}));
class Bt extends L {
  static get properties() {
    return {
      hass: {},
      // Home Assistant object
      _config: {}
      // Internal copy of the configuration
    };
  }
  setConfig(e) {
    console.log("Editor setConfig called with:", e), this._config = x({}, e), this._initialized && this.loadEditorValues();
  }
  // Helper function to handle changes in form elements
  _valueChanged(e) {
    if (!this._config || !this.hass)
      return;
    const t = e.target;
    let i = t.value;
    t.type === "checkbox" && t.checked !== void 0 && (i = t.checked), t.type === "number" && (i = parseFloat(i));
    const s = Te(x({}, this._config), {
      [t.configValue]: i
      // Use configValue attribute to link element to config key
    }), n = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    n.detail = { config: s }, this.dispatchEvent(n);
  }
  render() {
    var v, p, m, C;
    if (!this.hass || !this._config)
      return E``;
    const e = this._config[P] || "", t = this._config[A] || "", i = this._config[J] || "", s = this._config[Z] || "", n = this._config[de] !== !1, o = (v = this._config[Ye]) != null ? v : Y, l = (p = this._config[Ke]) != null ? p : ve, r = (m = this._config[it]) != null ? m : me, c = (C = this._config[st]) != null ? C : $e, d = this._config[Je] || ue, h = this._config[Ze] || ge, u = this._config[Qe] || _e, _ = this._config[et] || fe, f = this._config[tt] || pe;
    return E`
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
          .configValue=${J}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${s}
          .configValue=${Z}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield
          label="Name (Optional)"
          .value=${e}
          .configValue=${P}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-formfield label="Show Needle">
          <ha-switch
            .checked=${n}
            .configValue=${de}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${o}
            .configValue=${Ye}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
          <ha-textfield
            label="Gauge Max Value"
            type="number"
            .value=${l}
            .configValue=${Ke}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
        </div>
        <div class="side-by-side">
          <ha-textfield
            label="Static Low Threshold"
            type="number"
            .value=${r}
            .configValue=${it}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from Extreme Low to Low at this value"
          ></ha-textfield>
          <ha-textfield
            label="Static High Threshold"
            type="number"
            .value=${c}
            .configValue=${st}
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
            .configValue=${Je}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Low:</label>
          <ha-textfield
            .value=${h}
            .configValue=${Ze}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Good:</label>
          <ha-textfield
            .value=${u}
            .configValue=${Qe}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>High:</label>
          <ha-textfield
            .value=${_}
            .configValue=${et}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Extreme High:</label>
          <ha-textfield
            .value=${f}
            .configValue=${tt}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
        <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
      </div>
    `;
  }
  static get styles() {
    return Ce`
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
