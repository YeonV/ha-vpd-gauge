var Qt = Object.defineProperty, te = Object.defineProperties;
var ee = Object.getOwnPropertyDescriptors;
var mt = Object.getOwnPropertySymbols;
var se = Object.prototype.hasOwnProperty, ie = Object.prototype.propertyIsEnumerable;
var J = (n, t, e) => t in n ? Qt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, W = (n, t) => {
  for (var e in t || (t = {}))
    se.call(t, e) && J(n, e, t[e]);
  if (mt)
    for (var e of mt(t))
      ie.call(t, e) && J(n, e, t[e]);
  return n;
}, yt = (n, t) => te(n, ee(t));
var vt = (n, t, e) => J(n, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, dt = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (dt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ne = (n) => new Bt(typeof n == "string" ? n : n + "", void 0, ut), qt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Bt(e, n, ut);
}, oe = (n, t) => {
  if (dt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = j.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, Et = dt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ne(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: re, defineProperty: ae, getOwnPropertyDescriptor: he, getOwnPropertyNames: le, getOwnPropertySymbols: ce, getPrototypeOf: de } = Object, E = globalThis, bt = E.trustedTypes, ue = bt ? bt.emptyScript : "", K = E.reactiveElementPolyfillSupport, M = (n, t) => n, et = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ue : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch (s) {
        e = null;
      }
  }
  return e;
} }, Xt = (n, t) => !re(n, t), wt = { attribute: !0, type: String, converter: et, reflect: !1, useDefault: !1, hasChanged: Xt };
var Gt, It;
(Gt = Symbol.metadata) != null || (Symbol.metadata = Symbol("metadata")), (It = E.litPropertyMetadata) != null || (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(t) {
    var e;
    this._$Ei(), ((e = this.l) != null ? e : this.l = []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    var o;
    const { get: i, set: r } = (o = he(this.prototype, t)) != null ? o : { get() {
      return this[e];
    }, set(h) {
      this[e] = h;
    } };
    return { get: i, set(h) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, h), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    var e;
    return (e = this.elementProperties.get(t)) != null ? e : wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(M("elementProperties"))) return;
    const t = de(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(M("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(M("properties"))) {
      const e = this.properties, s = [...le(e), ...ce(e)];
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
      for (const i of s) e.unshift(Et(i));
    } else t !== void 0 && e.push(Et(t));
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
    return oe(t, this.constructor.elementStyles), t;
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
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : et).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, o, h, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), d = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : et;
      this._$Em = i, this[i] = (a = (h = d.fromAttribute(e, l.type)) != null ? h : (o = this._$Ej) == null ? void 0 : o.get(i)) != null ? a : null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i, r;
    if (t !== void 0) {
      const o = this.constructor, h = this[t];
      if (s != null || (s = o.getPropertyOptions(t)), !(((i = s.hasChanged) != null ? i : Xt)(h, e) || s.useDefault && s.reflect && h === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    var h, a, l;
    s && !((h = this._$Ej) != null ? h : this._$Ej = /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, (a = o != null ? o : e) != null ? a : this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && ((l = this._$Eq) != null ? l : this._$Eq = /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, h] of this._$Ep) this[o] = h;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, h] of r) {
        const { wrapped: a } = h, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, h, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
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
var Ft;
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[M("elementProperties")] = /* @__PURE__ */ new Map(), O[M("finalized")] = /* @__PURE__ */ new Map(), K == null || K({ ReactiveElement: O }), ((Ft = E.reactiveElementVersions) != null ? Ft : E.reactiveElementVersions = []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, B = R.trustedTypes, xt = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Yt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Jt = "?" + A, ge = `<${Jt}>`, C = document, V = () => C.createComment(""), k = (n) => n === null || typeof n != "object" && typeof n != "function", gt = Array.isArray, pe = (n) => gt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ct = /-->/g, St = />/g, b = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Tt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, fe = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), T = fe(1), N = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), w = C.createTreeWalker(C, 129);
function Zt(n, t) {
  if (!gt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xt !== void 0 ? xt.createHTML(t) : t;
}
const _e = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = U;
  for (let h = 0; h < e; h++) {
    const a = n[h];
    let l, d, c = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, d = o.exec(a), d !== null); ) g = o.lastIndex, o === U ? d[1] === "!--" ? o = Ct : d[1] !== void 0 ? o = St : d[2] !== void 0 ? (Kt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = b) : d[3] !== void 0 && (o = b) : o === b ? d[0] === ">" ? (o = i != null ? i : U, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? b : d[3] === '"' ? Tt : Ot) : o === Tt || o === Ot ? o = b : o === Ct || o === St ? o = U : (o = b, i = void 0);
    const p = o === b && n[h + 1].startsWith("/>") ? " " : "";
    r += o === U ? a + ge : c >= 0 ? (s.push(l), a.slice(0, c) + Yt + a.slice(c) + A + p) : a + A + (c === -2 ? h : p);
  }
  return [Zt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class G {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [l, d] = _e(t, e);
    if (this.el = G.createElement(l, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = w.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Yt)) {
          const g = d[o++], p = i.getAttribute(c).split(A), f = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: r, name: f[2], strings: p, ctor: f[1] === "." ? me : f[1] === "?" ? ye : f[1] === "@" ? ve : Y }), i.removeAttribute(c);
        } else c.startsWith(A) && (a.push({ type: 6, index: r }), i.removeAttribute(c));
        if (Kt.test(i.tagName)) {
          const c = i.textContent.split(A), g = c.length - 1;
          if (g > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let p = 0; p < g; p++) i.append(c[p], V()), w.nextNode(), a.push({ type: 2, index: ++r });
            i.append(c[g], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Jt) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(A, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += A.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = C.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(n, t, e = n, s) {
  var o, h, a;
  if (t === N) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = k(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? ((a = e._$Co) != null ? a : e._$Co = [])[s] = i : e._$Cl = i), i !== void 0 && (t = P(n, i._$AS(n, t.values), i, s)), t;
}
class $e {
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
    const { el: { content: e }, parts: s } = this._$AD, i = ((l = t == null ? void 0 : t.creationScope) != null ? l : C).importNode(e, !0);
    w.currentNode = i;
    let r = w.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new I(r, r.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (d = new Ae(r, this, t)), this._$AV.push(d), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (r = w.nextNode(), o++);
    }
    return w.currentNode = C, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) == null ? void 0 : t._$AU) != null ? e : this._$Cv;
  }
  constructor(t, e, s, i) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (r = i == null ? void 0 : i.isConnected) != null ? r : !0;
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
    t = P(this, t, e), k(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = G.createElement(Zt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(e);
    else {
      const o = new $e(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new G(t)), e;
  }
  k(t) {
    gt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new I(this.O(V()), this.O(V()), this, this.options)) : s = e[i], s._$AI(r), i++;
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
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = P(this, t, e, 0), o = !k(t) || t !== this._$AH && t !== N, o && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++) l = P(this, h[s + a], e, a), l === N && (l = this._$AH[a]), o || (o = !k(l) || l !== this._$AH[a]), l === u ? t = u : t !== u && (t += (l != null ? l : "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class me extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ye extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class ve extends Y {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var o;
    if ((t = (o = P(this, t, e, 0)) != null ? o : u) === N) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) == null ? void 0 : e.host) != null ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ae {
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
const Q = R.litHtmlPolyfillSupport;
var Wt;
Q == null || Q(G, I), ((Wt = R.litHtmlVersions) != null ? Wt : R.litHtmlVersions = []).push("3.3.0");
const Ee = (n, t, e) => {
  var r, o;
  const s = (r = e == null ? void 0 : e.renderBefore) != null ? r : t;
  let i = s._$litPart$;
  if (i === void 0) {
    const h = (o = e == null ? void 0 : e.renderBefore) != null ? o : null;
    s._$litPart$ = i = new I(t.insertBefore(V(), h), h, void 0, e != null ? e : {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ee(e, this.renderRoot, this.renderOptions);
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
var jt;
H._$litElement$ = !0, H.finalized = !0, (jt = x.litElementHydrateSupport) == null || jt.call(x, { LitElement: H });
const tt = x.litElementPolyfillSupport;
tt == null || tt({ LitElement: H });
var zt;
((zt = x.litElementVersions) != null ? zt : x.litElementVersions = []).push("4.2.0");
const v = "entity", D = "name", st = "needle", Nt = "gauge_min", Pt = "gauge_max", q = "min_entity", X = "max_entity", Lt = "color_extreme_low", Ut = "color_low", Mt = "color_good", Rt = "color_high", Dt = "color_extreme_high", Vt = "static_low_threshold", kt = "static_high_threshold", it = "#1c2814", nt = "#406f1e", ot = "#689a46", rt = "#406f1e", at = "#1c2814", ht = 1, lt = 1.2, z = 0.8, ct = 1.3;
class be extends H {
  constructor() {
    super(...arguments);
    // --- Helper Method (as Arrow Function Property) ---
    vt(this, "_calculateSegments", () => {
      var pt, ft, _t;
      const e = this.config, s = this.hass;
      if (!s || !e || !e[q] || !e[X])
        return console.warn(
          "VPD Gauge: Hass or required config missing for segment calculation."
        ), [];
      const i = (pt = e.gauge_min) != null ? pt : z, r = e.min_entity, o = e.max_entity, h = (ft = e.static_low_threshold) != null ? ft : ht, a = (_t = e.static_high_threshold) != null ? _t : lt, l = e.color_extreme_low || it, d = e.color_low || nt, c = e.color_good || ot, g = e.color_high || rt, p = e.color_extreme_high || at, f = s.states[r], S = s.states[o];
      let m = h;
      f && !isNaN(parseFloat(f.state)) ? m = parseFloat(f.state) : console.warn(
        `VPD Gauge: Invalid state for min_entity (${r}), using static fallback ${m}`
      );
      let y = a;
      S && !isNaN(parseFloat(S.state)) ? y = parseFloat(S.state) : console.warn(
        `VPD Gauge: Invalid state for max_entity (${o}), using static fallback ${y}`
      );
      const L = [
        { from: i, color: l },
        { from: h, color: d },
        { from: m, color: c },
        { from: y, color: g },
        { from: a, color: p }
      ];
      L.sort((_, F) => _.from - F.from);
      const $ = L.filter((_, F, $t) => !(_.from < i || F < $t.length - 1 && $t[F + 1].from === _.from));
      if ($.length === 0 || $[0].from > i) {
        let _ = l;
        i >= a ? _ = p : i >= y ? _ = g : i >= m ? _ = c : i >= h && (_ = d), $.unshift({ from: i, color: _ }), $.length > 1 && $[1].from === $[0].from && $.shift();
      }
      return console.log(
        `VPD Gauge (${e.entity}): MinT=${m}, MaxT=${y}, Segments=`,
        $
      ), $;
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
    if (!e[v])
      throw new Error("You need to define an entity (VPD Sensor)");
    if (!e[q])
      throw new Error("You need to define min_entity (Min Threshold Number)");
    if (!e[X])
      throw new Error("You need to define max_entity (Max Threshold Number)");
    this.config = W({
      needle: !0,
      // Default needle to true
      gauge_min: z,
      gauge_max: ct,
      static_low_threshold: ht,
      static_high_threshold: lt,
      color_extreme_low: it,
      color_low: nt,
      color_good: ot,
      color_high: rt,
      color_extreme_high: at
    }, e), console.log("VPD Gauge Card Config Set:", this.config);
  }
  // --- Rendering ---
  render() {
    var r, o;
    if (console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    ), !this.hass || !this.config || !this.config[v])
      return T`<ha-card header="VPD Gauge"
        ><div class="warning">
          Please configure the required entities.
        </div></ha-card
      >`;
    const e = this.hass.states[this.config[v]], s = e ? parseFloat(e.state) : void 0;
    if (console.log(
      `Rendering VPD Gauge: Entity=${this.config[v]}, StateObj=`,
      e,
      `Value=${s}`
    ), e === void 0)
      return T`
        <ha-card header="${this.config[D] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[v]}
          </div>
        </ha-card>
      `;
    if (s === void 0 || isNaN(s))
      return T`
        <ha-card header="${this.config[D] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[v]}: ${e.state}
          </div>
        </ha-card>
      `;
    const i = this._calculateSegments();
    return T`
      <ha-card header="${this.config[D] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${s}
            .min=${(r = this.config.gauge_min) != null ? r : z}
            .max=${(o = this.config.gauge_max) != null ? o : ct}
            .segments=${i}
            ?needle=${this.config[st] !== !1}
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
    return document.createElement("vpd-gauge-card-editor");
  }
  static getStubConfig(e, s, i) {
    const r = s.find((a) => a.startsWith("sensor.") && a.includes("vpd")) || i.find((a) => a.startsWith("sensor.")), o = s.find((a) => a.startsWith("number.") && a.includes("min")) || i.find((a) => a.startsWith("number.")), h = s.find((a) => a.startsWith("number.") && a.includes("max")) || i.find((a) => a.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card",
      // IMPORTANT: Use your card's custom type
      entity: r || "",
      min_entity: o || "",
      max_entity: h || "",
      name: "VPD Gauge"
      // Default visual settings will be applied from setConfig
    };
  }
  // --- Styling ---
  static get styles() {
    return qt`
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
customElements.get("vpd-gauge-card") ? console.warn("Attempted to redefine vpd-gauge-card. Skipping.") : (customElements.define("vpd-gauge-card", be), console.info(
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
class we extends H {
  static get properties() {
    return {
      hass: {},
      // Home Assistant object
      _config: {}
      // Internal copy of the configuration
    };
  }
  setConfig(t) {
    this._config = W({}, t), this._initialized && this.loadEditorValues();
  }
  // Helper function to handle changes in form elements
  _valueChanged(t) {
    if (!this._config || !this.hass)
      return;
    const e = t.target;
    let s = e.value;
    e.type === "checkbox" && e.checked !== void 0 && (s = e.checked), e.type === "number" && (s = parseFloat(s));
    const i = yt(W({}, this._config), {
      [e.configValue]: s
      // Use configValue attribute to link element to config key
    }), r = new Event("config-changed", {
      bubbles: !0,
      composed: !0
    });
    r.detail = { config: i }, this.dispatchEvent(r);
  }
  render() {
    var S, m, y, L;
    if (!this.hass || !this._config)
      return T``;
    const t = this._config[D] || "", e = this._config[v] || "", s = this._config[q] || "", i = this._config[X] || "", r = this._config[st] !== !1, o = (S = this._config[Nt]) != null ? S : z, h = (m = this._config[Pt]) != null ? m : ct, a = (y = this._config[Vt]) != null ? y : ht, l = (L = this._config[kt]) != null ? L : lt, d = this._config[Lt] || it, c = this._config[Ut] || nt, g = this._config[Mt] || ot, p = this._config[Rt] || rt, f = this._config[Dt] || at;
    return T`
      <div class="card-config">
        <h3>Required Entities</h3>
        <ha-entity-picker
          label="VPD Sensor Entity"
          .hass=${this.hass}
          .value=${e}
          .configValue=${v}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Min Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${s}
          .configValue=${q}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${i}
          .configValue=${X}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield
          label="Name (Optional)"
          .value=${t}
          .configValue=${D}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-formfield label="Show Needle">
          <ha-switch
            .checked=${r}
            .configValue=${st}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${o}
            .configValue=${Nt}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
          <ha-textfield
            label="Gauge Max Value"
            type="number"
            .value=${h}
            .configValue=${Pt}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
        </div>
        <div class="side-by-side">
          <ha-textfield
            label="Static Low Threshold"
            type="number"
            .value=${a}
            .configValue=${Vt}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from Extreme Low to Low at this value"
          ></ha-textfield>
          <ha-textfield
            label="Static High Threshold"
            type="number"
            .value=${l}
            .configValue=${kt}
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
            .configValue=${Lt}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Low:</label>
          <ha-textfield
            .value=${c}
            .configValue=${Ut}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Good:</label>
          <ha-textfield
            .value=${g}
            .configValue=${Mt}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>High:</label>
          <ha-textfield
            .value=${p}
            .configValue=${Rt}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Extreme High:</label>
          <ha-textfield
            .value=${f}
            .configValue=${Dt}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
        <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
      </div>
    `;
  }
  static get styles() {
    return qt`
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
customElements.get("vpd-gauge-card-editor") ? console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.") : customElements.define("vpd-gauge-card-editor", we);
