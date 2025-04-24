var ft = Object.defineProperty;
var ke = Object.getOwnPropertySymbols;
var pt = Object.prototype.hasOwnProperty, mt = Object.prototype.propertyIsEnumerable;
var se = (a, t, e) => t in a ? ft(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e, w = (a, t) => {
  for (var e in t || (t = {}))
    pt.call(t, e) && se(a, e, t[e]);
  if (ke)
    for (var e of ke(t))
      mt.call(t, e) && se(a, e, t[e]);
  return a;
};
var E = (a, t, e) => se(a, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, Ae = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, we = Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== we) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ae && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ne.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ne.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (a) => new ht(typeof a == "string" ? a : a + "", void 0, we), be = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[n + 1], a[0]);
  return new ht(e, a, we);
}, Et = (a, t) => {
  if (Ae) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, a.appendChild(i);
  }
}, He = Ae ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return $t(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: vt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: At, getOwnPropertySymbols: wt, getPrototypeOf: bt } = Object, x = globalThis, Re = x.trustedTypes, Ot = Re ? Re.emptyScript : "", ne = x.reactiveElementPolyfillSupport, G = (a, t) => a, me = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Ot : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch (i) {
        e = null;
      }
  }
  return e;
} }, lt = (a, t) => !yt(a, t), Ue = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: lt };
var it, st;
(it = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (st = x.litPropertyMetadata) != null || (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ue) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && vt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    var o;
    const { get: s, set: n } = (o = Ct(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(h) {
      this[e] = h;
    } };
    return { get: s, set(h) {
      const r = s == null ? void 0 : s.call(this);
      n == null || n.call(this, h), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const e = this.properties, i = [...At(e), ...wt(e)];
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
      for (const s of i) e.unshift(He(s));
    } else t !== void 0 && e.push(He(t));
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
    return Et(t, this.constructor.elementStyles), t;
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
    var n;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : me).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o, h, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), c = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : me;
      this._$Em = s, this[s] = (r = (h = c.fromAttribute(e, l.type)) != null ? h : (o = this._$Ej) == null ? void 0 : o.get(s)) != null ? r : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var s, n;
    if (t !== void 0) {
      const o = this.constructor, h = this[t];
      if (i != null || (i = o.getPropertyOptions(t)), !(((s = i.hasChanged) != null ? s : lt)(h, e) || i.useDefault && i.reflect && h === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    var h, r, l;
    i && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (r = o != null ? o : e) != null ? r : this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, h] of this._$Ep) this[o] = h;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, h] of n) {
        const { wrapped: r } = h, l = this[o];
        r !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, h, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
var nt;
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[G("elementProperties")] = /* @__PURE__ */ new Map(), H[G("finalized")] = /* @__PURE__ */ new Map(), ne == null || ne({ ReactiveElement: H }), ((nt = x.reactiveElementVersions) != null ? nt : x.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Z = I.trustedTypes, Ve = Z ? Z.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, ct = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + O, xt = `<${dt}>`, N = document, q = () => N.createComment(""), z = (a) => a === null || typeof a != "object" && typeof a != "function", Oe = Array.isArray, St = (a) => Oe(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", oe = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, Pe = />/g, S = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Me = /'/g, Ge = /"/g, ut = /^(?:script|style|textarea|title)$/i, Tt = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), v = Tt(1), D = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ie = /* @__PURE__ */ new WeakMap(), T = N.createTreeWalker(N, 129);
function _t(a, t) {
  if (!Oe(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ve !== void 0 ? Ve.createHTML(t) : t;
}
const Lt = (a, t) => {
  const e = a.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
  for (let h = 0; h < e; h++) {
    const r = a[h];
    let l, c, d = -1, _ = 0;
    for (; _ < r.length && (o.lastIndex = _, c = o.exec(r), c !== null); ) _ = o.lastIndex, o === M ? c[1] === "!--" ? o = De : c[1] !== void 0 ? o = Pe : c[2] !== void 0 ? (ut.test(c[2]) && (s = RegExp("</" + c[2], "g")), o = S) : c[3] !== void 0 && (o = S) : o === S ? c[0] === ">" ? (o = s != null ? s : M, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? S : c[3] === '"' ? Ge : Me) : o === Ge || o === Me ? o = S : o === De || o === Pe ? o = M : (o = S, s = void 0);
    const g = o === S && a[h + 1].startsWith("/>") ? " " : "";
    n += o === M ? r + xt : d >= 0 ? (i.push(l), r.slice(0, d) + ct + r.slice(d) + O + g) : r + O + (d === -2 ? h : g);
  }
  return [_t(a, n + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, r = this.parts, [l, c] = Lt(t, e);
    if (this.el = W.createElement(l, i), T.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = T.nextNode()) !== null && r.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(ct)) {
          const _ = c[o++], g = s.getAttribute(d).split(O), f = /([.?@])?(.*)/.exec(_);
          r.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? Nt : f[1] === "?" ? Ht : f[1] === "@" ? Rt : ie }), s.removeAttribute(d);
        } else d.startsWith(O) && (r.push({ type: 6, index: n }), s.removeAttribute(d));
        if (ut.test(s.tagName)) {
          const d = s.textContent.split(O), _ = d.length - 1;
          if (_ > 0) {
            s.textContent = Z ? Z.emptyScript : "";
            for (let g = 0; g < _; g++) s.append(d[g], q()), T.nextNode(), r.push({ type: 2, index: ++n });
            s.append(d[_], q());
          }
        }
      } else if (s.nodeType === 8) if (s.data === dt) r.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(O, d + 1)) !== -1; ) r.push({ type: 7, index: n }), d += O.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = N.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(a, t, e = a, i) {
  var o, h, r;
  if (t === D) return t;
  let s = i !== void 0 ? (o = e._$Co) == null ? void 0 : o[i] : e._$Cl;
  const n = z(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), n === void 0 ? s = void 0 : (s = new n(a), s._$AT(a, e, i)), i !== void 0 ? ((r = e._$Co) != null ? r : e._$Co = [])[i] = s : e._$Cl = s), s !== void 0 && (t = P(a, s._$AS(a, t.values), s, i)), t;
}
class kt {
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
    var l;
    const { el: { content: e }, parts: i } = this._$AD, s = ((l = t == null ? void 0 : t.creationScope) != null ? l : N).importNode(e, !0);
    T.currentNode = s;
    let n = T.nextNode(), o = 0, h = 0, r = i[0];
    for (; r !== void 0; ) {
      if (o === r.index) {
        let c;
        r.type === 2 ? c = new j(n, n.nextSibling, this, t) : r.type === 1 ? c = new r.ctor(n, r.name, r.strings, this, t) : r.type === 6 && (c = new Ut(n, this, t)), this._$AV.push(c), r = i[++h];
      }
      o !== (r == null ? void 0 : r.index) && (n = T.nextNode(), o++);
    }
    return T.currentNode = N, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, i, s) {
    var n;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (n = s == null ? void 0 : s.isConnected) != null ? n : !0;
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
    t = P(this, t, e), z(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && z(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = W.createElement(_t(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const o = new kt(s, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ie.get(t.strings);
    return e === void 0 && Ie.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    Oe(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new j(this.O(q()), this.O(q()), this, this.options)) : i = e[s], i._$AI(n), s++;
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
class ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = P(this, t, e, 0), o = !z(t) || t !== this._$AH && t !== D, o && (this._$AH = t);
    else {
      const h = t;
      let r, l;
      for (t = n[0], r = 0; r < n.length - 1; r++) l = P(this, h[i + r], e, r), l === D && (l = this._$AH[r]), o || (o = !z(l) || l !== this._$AH[r]), l === u ? t = u : t !== u && (t += (l != null ? l : "") + n[r + 1]), this._$AH[r] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Nt extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ht extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Rt extends ie {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = P(this, t, e, 0)) != null ? o : u) === D) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) == null ? void 0 : e.host) != null ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ut {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const ae = I.litHtmlPolyfillSupport;
var ot;
ae == null || ae(W, j), ((ot = I.litHtmlVersions) != null ? ot : I.litHtmlVersions = []).push("3.3.0");
const Vt = (a, t, e) => {
  var n, o;
  const i = (n = e == null ? void 0 : e.renderBefore) != null ? n : t;
  let s = i._$litPart$;
  if (s === void 0) {
    const h = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    i._$litPart$ = s = new j(t.insertBefore(q(), h), h, void 0, e != null ? e : {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
class k extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vt(e, this.renderRoot, this.renderOptions);
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
    return D;
  }
}
var at;
k._$litElement$ = !0, k.finalized = !0, (at = L.litElementHydrateSupport) == null || at.call(L, { LitElement: k });
const re = L.litElementPolyfillSupport;
re == null || re({ LitElement: k });
var rt;
((rt = L.litElementVersions) != null ? rt : L.litElementVersions = []).push("4.2.0");
const B = "entity", he = "name", le = "gauge_min", ce = "gauge_max", K = "min_entity", Y = "max_entity", Fe = "color_extreme_low", qe = "color_low", ze = "color_good", We = "color_high", je = "color_extreme_high", de = "static_low_threshold", ue = "static_high_threshold", Dt = "#1c2814", Pt = "#406f1e", Mt = "#689a46", Gt = "#406f1e", It = "#1c2814", Xe = 1, Be = 1.2, Ke = 0.8, Ye = 1.3;
let Ft = class extends k {
  constructor() {
    super(...arguments);
    E(this, "_initialized", !1);
    E(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers (Use Arrow Functions) ---
    E(this, "_valueChanged", (e) => {
      var h;
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue;
      let n = i.value;
      if (!s) {
        console.warn("No configValue dataset found for target:", i);
        return;
      }
      i.type === "number" ? n = n === "" ? void 0 : parseFloat(n) : i.tagName === "HA-ENTITY-PICKER" && ((h = e.detail) == null ? void 0 : h.value) !== void 0 && (n = e.detail.value);
      const o = w({}, this._config);
      n === void 0 || n === "" || typeof n == "number" && isNaN(n) ? s !== B && s !== K && s !== Y ? delete o[s] : o[s] = "" : o[s] = n, this._config = o, this.fireConfigChanged();
    });
    E(this, "_colorChanged", (e) => {
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue, n = e.detail.value;
      if (!s) {
        console.warn("No configValue dataset found for color picker:", i);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${s}, Value=${n}`);
      const o = w({}, this._config);
      n ? o[s] = n.toUpperCase() : delete o[s], this._config = o, this.fireConfigChanged();
    });
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object, state: !0 } };
  }
  setConfig(e) {
    console.log("[Editor] setConfig called with:", e), this._config = w({}, e), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => {
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
    var e, i, s, n, o, h, r, l, c;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (e = this._elements.pickers.entity) == null || e.addEventListener("value-changed", this._valueChanged), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", this._valueChanged), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", this._valueChanged), (n = this._elements.inputs.name) == null || n.addEventListener("input", this._valueChanged), (o = this._elements.inputs.gauge_min) == null || o.addEventListener("input", this._valueChanged), (h = this._elements.inputs.gauge_max) == null || h.addEventListener("input", this._valueChanged), (r = this._elements.inputs.static_low_threshold) == null || r.addEventListener("input", this._valueChanged), (l = this._elements.inputs.static_high_threshold) == null || l.addEventListener("input", this._valueChanged);
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
    const e = (n, o, h = "") => {
      n && (n.value = o != null ? o : h);
    };
    e(this._elements.pickers.entity, this._config[B]), e(this._elements.pickers.min_entity, this._config[K]), e(this._elements.pickers.max_entity, this._config[Y]), e(this._elements.inputs.name, this._config[he]), e(this._elements.inputs.gauge_min, this._config[le], Ke), e(this._elements.inputs.gauge_max, this._config[ce], Ye), e(this._elements.inputs.static_low_threshold, this._config[de], Xe), e(this._elements.inputs.static_high_threshold, this._config[ue], Be);
    for (const n in this._elements.colors) {
      const o = (i = this._elements.colors[n]) == null ? void 0 : i.picker;
      if (o) {
        const h = `color_${n}`, r = `DEFAULT_COLOR_${n.toUpperCase()}`, l = window[r] !== void 0 ? window[r] : "#000000";
        o.value = (s = this._config[h]) != null ? s : l;
      }
    }
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((n) => {
      n && (n.hass = this._hass);
    });
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const e = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 });
    this.dispatchEvent(e);
  }
  render() {
    var C, p, m, b;
    if (!this._hass) return v`Waiting for hass...`;
    if (!this._config) return v`Waiting for config...`;
    const e = this._config[he] || "", i = this._config[B] || "", s = this._config[K] || "", n = this._config[Y] || "", o = (C = this._config[le]) != null ? C : Ke, h = (p = this._config[ce]) != null ? p : Ye, r = (m = this._config[de]) != null ? m : Xe, l = (b = this._config[ue]) != null ? b : Be, c = this._config[Fe] || Dt, d = this._config[qe] || Pt, _ = this._config[ze] || Mt, g = this._config[We] || Gt, f = this._config[je] || It;
    return v`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} .dataset=${{ configValue: B }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} .dataset=${{ configValue: K }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${n} .dataset=${{ configValue: Y }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${e} .dataset=${{ configValue: he }} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Switch Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${o} .dataset=${{ configValue: le }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${h} .dataset=${{ configValue: ce }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${r} .dataset=${{ configValue: de }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${l} .dataset=${{ configValue: ue }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${c} .dataset=${{ configValue: Fe }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${d} .dataset=${{ configValue: qe }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${_} .dataset=${{ configValue: ze }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${g} .dataset=${{ configValue: We }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${f} .dataset=${{ configValue: je }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return be`...`;
  }
};
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", Ft), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
const qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), y = "entity", V = "name", zt = "needle", _e = "gauge_min", ge = "gauge_max", R = "min_entity", U = "max_entity", Je = "color_extreme_low", Ze = "color_low", Qe = "color_good", et = "color_high", tt = "color_extreme_high", fe = "static_low_threshold", pe = "static_high_threshold", $e = "#1c2814", Ee = "#406f1e", ye = "#689a46", ve = "#406f1e", Ce = "#1c2814", Q = 1, ee = 1.2, F = 0.8, te = 1.3;
class Wt extends k {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    E(this, "_calculateSegments", () => {
      var xe, Se, Te;
      const e = this.config, i = this.hass;
      if (!i || !e || !e[R] || !e[U])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const s = (xe = e.gauge_min) != null ? xe : F, n = e.min_entity, o = e.max_entity, h = (Se = e.static_low_threshold) != null ? Se : Q, r = (Te = e.static_high_threshold) != null ? Te : ee, l = e.color_extreme_low || $e, c = e.color_low || Ee, d = e.color_good || ye, _ = e.color_high || ve, g = e.color_extreme_high || Ce, f = i.states[n], C = i.states[o];
      let p = h;
      f && !isNaN(parseFloat(f.state)) ? p = parseFloat(f.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${n}), using static fallback ${p}`
      );
      let m = r;
      C && !isNaN(parseFloat(C.state)) ? m = parseFloat(C.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${o}), using static fallback ${m}`
      );
      const b = [
        { from: s, color: l },
        { from: h, color: c },
        { from: p, color: d },
        { from: m, color: _ },
        { from: r, color: g }
      ];
      b.sort(($, X) => $.from - X.from);
      const A = b.filter(($, X, Le) => !($.from < s || X < Le.length - 1 && Le[X + 1].from === $.from));
      if (A.length === 0 || A[0].from > s) {
        let $ = l;
        s >= r ? $ = g : s >= m ? $ = _ : s >= p ? $ = d : s >= h && ($ = c), A.unshift({ from: s, color: $ }), A.length > 1 && A[1].from === A[0].from && A.shift();
      }
      return console.log(
        `VPD Gauge (${e.entity}): MinT=${p}, MaxT=${m}, Segments=`,
        A
      ), A;
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
  setConfig(e) {
    if (!e[y])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!e[R])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!e[U])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    const i = {
      needle: !0,
      gauge_min: F,
      gauge_max: te,
      static_low_threshold: Q,
      static_high_threshold: ee,
      color_extreme_low: $e,
      color_low: Ee,
      color_good: ye,
      color_high: ve,
      color_extreme_high: Ce,
      name: ""
      // Default name is empty
    };
    this.config = w(w({}, i), e), console.log("VPD Gauge Card Config Set (with defaults applied):", this.config), this.hass && this.requestUpdate();
  }
  // --- Rendering ---
  render() {
    var n, o;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[y])
      return v`<ha-card header="VPD Gauge"
        ><div class="warning">
          Please configure the required entities.
        </div></ha-card
      >`;
    const e = this.hass.states[this.config[y]], i = e ? parseFloat(e.state) : void 0;
    if (console.log(
      `Rendering VPD Gauge: Entity=${this.config[y]}, StateObj=`,
      e,
      `Value=${i}`
    ), e === void 0)
      return v`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[y]}
          </div>
        </ha-card>
      `;
    if (i === void 0 || isNaN(i))
      return v`
        <ha-card header="${this.config[V] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[y]}: ${e.state}
          </div>
        </ha-card>
      `;
    const s = this._calculateSegments();
    return v`
      <ha-card header="${this.config[V] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${i}
            .min=${(n = this.config.gauge_min) != null ? n : F}
            .max=${(o = this.config.gauge_max) != null ? o : te}
            .segments=${s}
            ?needle=${this.config[zt] !== !1}
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
    }).catch((e) => {
      console.error("Failed to load VPD Gauge Card Editor:", e);
    }), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(e, i, s) {
    const n = i.find((r) => r.startsWith("sensor.") && r.includes("vpd")) || s.find((r) => r.startsWith("sensor.")), o = i.find((r) => r.startsWith("number.") && r.includes("min")) || s.find((r) => r.startsWith("number.")), h = i.find((r) => r.startsWith("number.") && r.includes("max")) || s.find((r) => r.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: n || "",
      min_entity: o || "",
      max_entity: h || "",
      name: "VPD Gauge"
      // Default visual settings will be applied from setConfig
    };
  }
  // --- Styling ---
  static get styles() {
    return be`
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
customElements.get("vpd-gauge-card") ? console.warn("Attempted to redefine vpd-gauge-card. Skipping.") : (customElements.define("vpd-gauge-card", Wt), console.info(
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
class gt extends k {
  constructor() {
    super(...arguments);
    E(this, "_initialized", !1);
    E(this, "_elements", { inputs: {}, pickers: {}, colors: {} });
    // --- Event Handlers (Use Arrow Functions) ---
    E(this, "_valueChanged", (e) => {
      var h;
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue;
      let n = i.value;
      if (!s) {
        console.warn("No configValue dataset found for target:", i);
        return;
      }
      i.type === "number" ? n = n === "" ? void 0 : parseFloat(n) : i.tagName === "HA-ENTITY-PICKER" && ((h = e.detail) == null ? void 0 : h.value) !== void 0 && (n = e.detail.value);
      const o = w({}, this._config);
      n === void 0 || n === "" || typeof n == "number" && isNaN(n) ? s !== y && s !== R && s !== U ? delete o[s] : o[s] = "" : o[s] = n, this._config = o, this.fireConfigChanged();
    });
    E(this, "_colorChanged", (e) => {
      if (!this._config) return;
      const i = e.target, s = i.dataset.configValue, n = e.detail.value;
      if (!s) {
        console.warn("No configValue dataset found for color picker:", i);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${s}, Value=${n}`);
      const o = w({}, this._config);
      n ? o[s] = n.toUpperCase() : delete o[s], this._config = o, this.fireConfigChanged();
    });
  }
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object, state: !0 } };
  }
  setConfig(e) {
    console.log("[Editor] setConfig called with:", e), this._config = w({}, e), this._initialized ? this.loadEditorValues() : this.updateComplete.then(() => {
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
    var e, i, s, n, o, h, r, l, c;
    if (this._elements) {
      console.log("[Editor] Attaching listeners"), (e = this._elements.pickers.entity) == null || e.addEventListener("value-changed", this._valueChanged), (i = this._elements.pickers.min_entity) == null || i.addEventListener("value-changed", this._valueChanged), (s = this._elements.pickers.max_entity) == null || s.addEventListener("value-changed", this._valueChanged), (n = this._elements.inputs.name) == null || n.addEventListener("input", this._valueChanged), (o = this._elements.inputs.gauge_min) == null || o.addEventListener("input", this._valueChanged), (h = this._elements.inputs.gauge_max) == null || h.addEventListener("input", this._valueChanged), (r = this._elements.inputs.static_low_threshold) == null || r.addEventListener("input", this._valueChanged), (l = this._elements.inputs.static_high_threshold) == null || l.addEventListener("input", this._valueChanged);
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
    const e = (n, o, h = "") => {
      n && (n.value = o != null ? o : h);
    };
    e(this._elements.pickers.entity, this._config[y]), e(this._elements.pickers.min_entity, this._config[R]), e(this._elements.pickers.max_entity, this._config[U]), e(this._elements.inputs.name, this._config[V]), e(this._elements.inputs.gauge_min, this._config[_e], F), e(this._elements.inputs.gauge_max, this._config[ge], te), e(this._elements.inputs.static_low_threshold, this._config[fe], Q), e(this._elements.inputs.static_high_threshold, this._config[pe], ee);
    for (const n in this._elements.colors) {
      const o = (i = this._elements.colors[n]) == null ? void 0 : i.picker;
      if (o) {
        const h = `color_${n}`, r = `DEFAULT_COLOR_${n.toUpperCase()}`, l = window[r] !== void 0 ? window[r] : "#000000";
        o.value = (s = this._config[h]) != null ? s : l;
      }
    }
    this._hass && this._elements.pickers && Object.values(this._elements.pickers).forEach((n) => {
      n && (n.hass = this._hass);
    });
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const e = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 });
    this.dispatchEvent(e);
  }
  render() {
    var C, p, m, b;
    if (!this._hass) return v`Waiting for hass...`;
    if (!this._config) return v`Waiting for config...`;
    const e = this._config[V] || "", i = this._config[y] || "", s = this._config[R] || "", n = this._config[U] || "", o = (C = this._config[_e]) != null ? C : F, h = (p = this._config[ge]) != null ? p : te, r = (m = this._config[fe]) != null ? m : Q, l = (b = this._config[pe]) != null ? b : ee, c = this._config[Je] || $e, d = this._config[Ze] || Ee, _ = this._config[Qe] || ye, g = this._config[et] || ve, f = this._config[tt] || Ce;
    return v`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${i} .dataset=${{ configValue: y }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${s} .dataset=${{ configValue: R }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${n} .dataset=${{ configValue: U }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${e} .dataset=${{ configValue: V }} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Switch Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${o} .dataset=${{ configValue: _e }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${h} .dataset=${{ configValue: ge }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${r} .dataset=${{ configValue: fe }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${l} .dataset=${{ configValue: pe }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${c} .dataset=${{ configValue: Je }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${d} .dataset=${{ configValue: Ze }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${_} .dataset=${{ configValue: Qe }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${g} .dataset=${{ configValue: et }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${f} .dataset=${{ configValue: tt }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
  }
  static get styles() {
    return be`...`;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", gt), console.info("%c VPD-GAUGE-CARD-EDITOR %c Defined", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", gt);
