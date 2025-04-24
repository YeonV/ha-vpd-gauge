var Jt = Object.defineProperty;
var mt = Object.getOwnPropertySymbols;
var Zt = Object.prototype.hasOwnProperty, Qt = Object.prototype.propertyIsEnumerable;
var Y = (r, t, e) => t in r ? Jt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, U = (r, t) => {
  for (var e in t || (t = {}))
    Zt.call(t, e) && Y(r, e, t[e]);
  if (mt)
    for (var e of mt(t))
      Qt.call(t, e) && Y(r, e, t[e]);
  return r;
};
var J = (r, t, e) => Y(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, dt = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), yt = /* @__PURE__ */ new WeakMap();
let jt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (dt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = yt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && yt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const te = (r) => new jt(typeof r == "string" ? r : r + "", void 0, ut), qt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new jt(e, r, ut);
}, ee = (r, t) => {
  if (dt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, vt = dt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return te(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: se, defineProperty: ie, getOwnPropertyDescriptor: oe, getOwnPropertyNames: ne, getOwnPropertySymbols: re, getPrototypeOf: ae } = Object, A = globalThis, Et = A.trustedTypes, he = Et ? Et.emptyScript : "", Z = A.reactiveElementPolyfillSupport, M = (r, t) => r, st = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? he : null;
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
      } catch (s) {
        e = null;
      }
  }
  return e;
} }, zt = (r, t) => !se(r, t), At = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: zt };
var Vt, kt;
(Vt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (kt = A.litPropertyMetadata) != null || (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = At) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ie(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    var o;
    const { get: i, set: n } = (o = oe(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(l) {
      this[e] = l;
    } };
    return { get: i, set(l) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, l), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : At;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = ae(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...ne(e), ...re(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(vt(i));
    } else t !== void 0 && e.push(vt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, s;
    ((e = this._$EO) != null ? e : this._$EO = /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) != null ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return ee(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t, e;
    (t = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostConnected) == null ? void 0 : i.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : st).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o, l, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), d = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : st;
      this._$Em = i, this[i] = (a = (l = d.fromAttribute(e, h.type)) != null ? l : (o = this._$Ej) == null ? void 0 : o.get(i)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i, n;
    if (t !== void 0) {
      const o = this.constructor, l = this[t];
      if (s != null || (s = o.getPropertyOptions(t)), !(((i = s.hasChanged) != null ? i : zt)(l, e) || s.useDefault && s.reflect && l === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    var l, a, h;
    s && !((l = this._$Ej) != null ? l : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : e) != null ? a : this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && ((h = this._$Eq) != null ? h : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
    var s, i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((s = this.renderRoot) != null || (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, l] of this._$Ep) this[o] = l;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, l] of n) {
        const { wrapped: a } = l, h = this[o];
        a !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, l, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
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
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
var Gt;
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[M("elementProperties")] = /* @__PURE__ */ new Map(), O[M("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: O }), ((Gt = A.reactiveElementVersions) != null ? Gt : A.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, X = D.trustedTypes, Ct = X ? X.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Bt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + v, le = `<${Xt}>`, S = document, I = () => S.createComment(""), F = (r) => r === null || typeof r != "object" && typeof r != "function", gt = Array.isArray, ce = (r) => gt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, wt = />/g, C = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), St = /'/g, xt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, de = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), T = de(1), N = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), b = S.createTreeWalker(S, 129);
function Yt(r, t) {
  if (!gt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const ue = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = L;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, d, c = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, d = o.exec(a), d !== null); ) g = o.lastIndex, o === L ? d[1] === "!--" ? o = bt : d[1] !== void 0 ? o = wt : d[2] !== void 0 ? (Kt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = C) : d[3] !== void 0 && (o = C) : o === C ? d[0] === ">" ? (o = i != null ? i : L, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? C : d[3] === '"' ? xt : St) : o === xt || o === St ? o = C : o === bt || o === wt ? o = L : (o = C, i = void 0);
    const f = o === C && r[l + 1].startsWith("/>") ? " " : "";
    n += o === L ? a + le : c >= 0 ? (s.push(h), a.slice(0, c) + Bt + a.slice(c) + v + f) : a + v + (c === -2 ? l : f);
  }
  return [Yt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class W {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, d] = ue(t, e);
    if (this.el = W.createElement(h, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = b.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Bt)) {
          const g = d[o++], f = i.getAttribute(c).split(v), p = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: p[2], strings: f, ctor: p[1] === "." ? fe : p[1] === "?" ? pe : p[1] === "@" ? _e : K }), i.removeAttribute(c);
        } else c.startsWith(v) && (a.push({ type: 6, index: n }), i.removeAttribute(c));
        if (Kt.test(i.tagName)) {
          const c = i.textContent.split(v), g = c.length - 1;
          if (g > 0) {
            i.textContent = X ? X.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(c[f], I()), b.nextNode(), a.push({ type: 2, index: ++n });
            i.append(c[g], I());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Xt) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(v, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += v.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(r, t, e = r, s) {
  var o, l, a;
  if (t === N) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = F(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[s] = i : e._$Cl = i), i !== void 0 && (t = P(r, i._$AS(r, t.values), i, s)), t;
}
class ge {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((h = t == null ? void 0 : t.creationScope) != null ? h : S).importNode(e, !0);
    b.currentNode = i;
    let n = b.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new j(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new $e(n, this, t)), this._$AV.push(d), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = b.nextNode(), o++);
    }
    return b.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, s, i) {
    var n;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (n = i == null ? void 0 : i.isConnected) != null ? n : !0;
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
    t = P(this, t, e), F(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = W.createElement(Yt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new ge(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ot.get(t.strings);
    return e === void 0 && Ot.set(t.strings, e = new W(t)), e;
  }
  k(t) {
    gt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new j(this.O(I()), this.O(I()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
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
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = P(this, t, e, 0), o = !F(t) || t !== this._$AH && t !== N, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = P(this, l[s + a], e, a), h === N && (h = this._$AH[a]), o || (o = !F(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h != null ? h : "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class fe extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class pe extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class _e extends K {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = P(this, t, e, 0)) != null ? o : u) === N) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) == null ? void 0 : e.host) != null ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class $e {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const tt = D.litHtmlPolyfillSupport;
var It;
tt == null || tt(W, j), ((It = D.litHtmlVersions) != null ? It : D.litHtmlVersions = []).push("3.3.0");
const me = (r, t, e) => {
  var n, o;
  const s = (n = e == null ? void 0 : e.renderBefore) != null ? n : t;
  let i = s._$litPart$;
  if (i === void 0) {
    const l = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    s._$litPart$ = i = new j(t.insertBefore(I(), l), l, void 0, e != null ? e : {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class H extends O {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, s;
    const t = super.createRenderRoot();
    return (s = (e = this.renderOptions).renderBefore) != null || (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = me(e, this.renderRoot, this.renderOptions);
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
    return N;
  }
}
var Ft;
H._$litElement$ = !0, H.finalized = !0, (Ft = w.litElementHydrateSupport) == null || Ft.call(w, { LitElement: H });
const et = w.litElementPolyfillSupport;
et == null || et({ LitElement: H });
var Wt;
((Wt = w.litElementVersions) != null ? Wt : w.litElementVersions = []).push("4.2.0");
const E = "entity", V = "name", Tt = "gauge_min", Ht = "gauge_max", k = "min_entity", G = "max_entity", Nt = "color_extreme_low", Pt = "color_low", Rt = "color_good", Ut = "color_high", Lt = "color_extreme_high", Mt = "static_low_threshold", Dt = "static_high_threshold", it = "#1c2814", ot = "#406f1e", nt = "#689a46", rt = "#406f1e", at = "#1c2814", ht = 1, lt = 1.2, B = 0.8, ct = 1.3;
class ye extends H {
  constructor() {
    super(...arguments);
    J(this, "_colorChanged", (e) => {
      if (!this._config) return;
      const s = e.target, i = s.dataset.configValue, n = e.detail.value;
      if (!i) {
        console.warn("No configValue dataset found for color picker:", s);
        return;
      }
      console.log(`[Editor] Color Changed: Key=${i}, Value=${n}`);
      const o = U({}, this._config);
      n ? o[i] = n.toUpperCase() : delete o[i], this._config = o, this.fireConfigChanged();
    });
  }
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object, state: !0 }
      // Mark _config as internal state
    };
  }
  // No _initialized flag needed if using Lit lifecycle correctly
  // No _elements needed as property, query them when needed or in firstUpdated
  setConfig(e) {
    console.log("[Editor] setConfig received:", e), this._config = e;
  }
  set hass(e) {
    this._hass = e;
  }
  // Use standard LitElement property reflection for event handlers
  _valueChanged(e) {
    var l;
    if (!this._config) return;
    const s = e.target, i = s.dataset.configValue;
    let n = s.value;
    if (!i) {
      console.warn("No configValue dataset found for target:", s);
      return;
    }
    s.tagName === "HA-SWITCH" ? n = s.checked : s.type === "number" ? n = n === "" ? void 0 : parseFloat(n) : s.tagName === "HA-ENTITY-PICKER" && ((l = e.detail) == null ? void 0 : l.value) !== void 0 && (n = e.detail.value);
    const o = U({}, this._config);
    n === void 0 || n === "" || typeof n == "number" && isNaN(n) ? i !== E && i !== k && i !== G ? delete o[i] : o[i] = "" : o[i] = n, this._config = o, this.fireConfigChanged();
  }
  fireConfigChanged() {
    console.log("[Editor] Firing config-changed with:", this._config);
    const e = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 });
    this.dispatchEvent(e);
  }
  render() {
    var x, m, y, R;
    if (!this._hass || !this._config)
      return console.log("[Editor] Render waiting for hass or config"), T`Waiting for configuration...`;
    console.log("[Editor] Rendering form with config:", this._config);
    const e = this._config[V] || "", s = this._config[E] || "", i = this._config[k] || "", n = this._config[G] || "", o = (x = this._config[Tt]) != null ? x : B, l = (m = this._config[Ht]) != null ? m : ct, a = (y = this._config[Mt]) != null ? y : ht, h = (R = this._config[Dt]) != null ? R : lt, d = this._config[Nt] || it, c = this._config[Pt] || ot, g = this._config[Rt] || nt, f = this._config[Ut] || rt, p = this._config[Lt] || at;
    return T`
      <div class="card-config">
        <h3>Required Entities</h3>
        <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${s} .dataset=${{ configValue: E }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
        <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${i} .dataset=${{ configValue: k }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
        <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${n} .dataset=${{ configValue: G }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield label="Name (Optional)" .value=${e} .dataset=${{ configValue: V }} @input=${this._valueChanged} id="name"></ha-textfield>
        <!-- Needle Removed -->

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
            <ha-textfield label="Gauge Min Value" type="number" .value=${o} .dataset=${{ configValue: Tt }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
            <ha-textfield label="Gauge Max Value" type="number" .value=${l} .dataset=${{ configValue: Ht }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
        </div>
         <div class="side-by-side">
            <ha-textfield label="Static Low Threshold" type="number" .value=${a} .dataset=${{ configValue: Mt }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
            <ha-textfield label="Static High Threshold" type="number" .value=${h} .dataset=${{ configValue: Dt }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
        </div>

         <h3>Segment Colors</h3>
         <div class="color-grid">
            <label>Extreme Low:</label> <ha-color-picker .value=${d} .dataset=${{ configValue: Nt }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
            <label>Low:</label> <ha-color-picker .value=${c} .dataset=${{ configValue: Pt }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
            <label>Good:</label> <ha-color-picker .value=${g} .dataset=${{ configValue: Rt }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
            <label>High:</label> <ha-color-picker .value=${f} .dataset=${{ configValue: Ut }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
            <label>Extreme High:</label> <ha-color-picker .value=${p} .dataset=${{ configValue: Lt }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
         </div>
      </div>
    `;
  }
  static get styles() {
    return qt`...`;
  }
}
customElements.get("vpd-gauge-card-editor") || (customElements.define("vpd-gauge-card-editor", ye), console.info(
  "%c VPD-GAUGE-CARD-EDITOR %c Defined"
  /* ... */
));
class ve extends H {
  constructor() {
    super(...arguments);
    J(this, "_calculateSegments", () => {
      var ft, pt, _t;
      const e = this.config, s = this.hass;
      if (!s || !e || !e[k] || !e[G])
        return console.warn("VPD Gauge: Data missing for segment calc."), [];
      const i = (ft = e.gauge_min) != null ? ft : B, n = e.min_entity, o = e.max_entity, l = (pt = e.static_low_threshold) != null ? pt : ht, a = (_t = e.static_high_threshold) != null ? _t : lt, h = e.color_extreme_low || it, d = e.color_low || ot, c = e.color_good || nt, g = e.color_high || rt, f = e.color_extreme_high || at, p = s.states[n], x = s.states[o];
      let m = l;
      p && !isNaN(parseFloat(p.state)) ? m = parseFloat(p.state) : console.warn(`VPD Gauge: Invalid min_entity state (${n}), using static fallback ${m}`);
      let y = a;
      x && !isNaN(parseFloat(x.state)) ? y = parseFloat(x.state) : console.warn(`VPD Gauge: Invalid max_entity state (${o}), using static fallback ${y}`);
      const R = [{ from: i, color: h }, { from: l, color: d }, { from: m, color: c }, { from: y, color: g }, { from: a, color: f }];
      R.sort((_, q) => _.from - q.from);
      const $ = R.filter((_, q, $t) => !(_.from < i || q < $t.length - 1 && $t[q + 1].from === _.from));
      if ($.length === 0 || $[0].from > i) {
        let _ = h;
        i >= a ? _ = f : i >= y ? _ = g : i >= m ? _ = c : i >= l && (_ = d), $.unshift({ from: i, color: _ }), $.length > 1 && $[1].from === $[0].from && $.shift();
      }
      return console.log(`VPD Gauge (${e.entity}): MinT=${m}, MaxT=${y}, Segments=`, $), $;
    });
  }
  // --- PASTE THE ENTIRE VpdGaugeCard CLASS CODE HERE ---
  // Including: static get properties, setConfig (without needle default),
  // _calculateSegments (final correct version), render (without needle),
  // getCardSize, static getConfigElement (simple version), static getStubConfig, static get styles
  // ------------------------------------------------------
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }
  setConfig(e) {
    if (!e || !e[E]) throw new Error("Entity is required");
    if (!e[k]) throw new Error("Min entity is required");
    if (!e[G]) throw new Error("Max entity is required");
    const s = { gauge_min: B, gauge_max: ct, static_low_threshold: ht, static_high_threshold: lt, color_extreme_low: it, color_low: ot, color_good: nt, color_high: rt, color_extreme_high: at, name: "" };
    this.config = U(U({}, s), e), console.log("VPD Gauge Card Config Set:", this.config), this.hass && this.requestUpdate();
  }
  render() {
    var n, o;
    if (console.log("Render method called. Hass:", !!this.hass, "Config:", !!this.config), !this.hass || !this.config || !this.config[E]) return T`<ha-card><div class="warning">Config required</div></ha-card>`;
    const e = this.hass.states[this.config[E]], s = e ? parseFloat(e.state) : void 0;
    if (console.log(`Rendering: Entity=${this.config[E]}, StateObj=`, e, `Value=${s}`), e === void 0) return T`<ha-card header="${this.config[V] || "VPD"}"><div class="warning">Entity not found: ${this.config[E]}</div></ha-card>`;
    if (s === void 0 || isNaN(s)) return T`<ha-card header="${this.config[V] || "VPD"}"><div class="warning">Invalid state: ${e.state}</div></ha-card>`;
    const i = this._calculateSegments();
    return T` <ha-card header="${this.config[V] || "VPD Gauge"}"> <div class="card-content"> <ha-gauge .value=${s} .min=${(n = this.config.gauge_min) != null ? n : B} .max=${(o = this.config.gauge_max) != null ? o : ct} .segments=${i} needle style="--gauge-color: var(--primary-text-color);"></ha-gauge> </div> </ha-card> `;
  }
  getCardSize() {
    return 3;
  }
  static getConfigElement() {
    return console.log("getConfigElement: Creating vpd-gauge-card-editor element."), document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(e, s, i) {
    const n = s.find((h) => h.startsWith("sensor.") && h.includes("vpd")) || i.find((h) => h.startsWith("sensor.") && h.includes("vpd")), o = n ? n.split(".").pop().replace("_vpd_mqtt", "").replace("_vpd", "") : null, l = s.find((h) => h.startsWith("number.") && h.includes("min") && (o ? h.includes(o) : !0)) || i.find((h) => h.startsWith("number.") && h.includes("min")), a = s.find((h) => h.startsWith("number.") && h.includes("max") && (o ? h.includes(o) : !0)) || i.find((h) => h.startsWith("number.") && h.includes("max"));
    return console.log("StubConfig Found: VPD=", n, "Min=", l, "Max=", a), { type: "custom:vpd-gauge-card", entity: n || "", min_entity: l || "", max_entity: a || "", name: o ? `${o.replace(/_/g, " ")} VPD Gauge` : "VPD Gauge" };
  }
  static get styles() {
    return qt`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`;
  }
}
customElements.get("vpd-gauge-card") || (customElements.define("vpd-gauge-card", ve), console.info("%c VPD-GAUGE-CARD %c Loaded ", "color: white; background: #039be5; font-weight: 700;", "color: #039be5; background: white; font-weight: 700;"));
window.customCards && !window.customCards.some((r) => r.type === "vpd-gauge-card") && window.customCards.push({
  type: "vpd-gauge-card",
  name: "VPD Gauge Card",
  description: "A gauge card with dynamic segments based on min/max threshold entities.",
  preview: !0
});
console.log("VPD Gauge Card + Editor Script Loaded Successfully");
