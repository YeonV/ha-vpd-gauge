// src/vpd-gauge.js - STARTING FROM YOUR COMBINED FILE BASE

import { LitElement, html, css } from "lit"; // Use direct import now

// --- Import HA UI Elements Needed by EDITOR ---
// Keep these commented out for now unless build fails or elements don't render
// import "home-assistant-frontend/src/components/ha-formfield.js";
// import "home-assistant-frontend/src/components/ha-switch.js";
// import "home-assistant-frontend/src/components/ha-textfield.js";
// import "home-assistant-frontend/src/components/entity/ha-entity-picker.js";
// import "home-assistant-frontend/src/components/ha-color-picker.js";
// ---------------------------------------------

// --- Constants ---
const CONF_ENTITY = "entity";
const CONF_NAME = "name";
// const CONF_NEEDLE = "needle"; // REMOVED per request
const CONF_GAUGE_MIN = "gauge_min";
const CONF_GAUGE_MAX = "gauge_max";
const CONF_MIN_ENTITY = "min_entity";
const CONF_MAX_ENTITY = "max_entity";
const CONF_COLOR_EXTREME_LOW = "color_extreme_low";
const CONF_COLOR_LOW = "color_low";
const CONF_COLOR_GOOD = "color_good";
const CONF_COLOR_HIGH = "color_high";
const CONF_COLOR_EXTREME_HIGH = "color_extreme_high";
const CONF_STATIC_LOW_THRESHOLD = "static_low_threshold";
const CONF_STATIC_HIGH_THRESHOLD = "static_high_threshold";

const DEFAULT_COLOR_EXTREME_LOW = '#1c2814';
const DEFAULT_COLOR_LOW = '#406f1e';
const DEFAULT_COLOR_GOOD = '#689a46';
const DEFAULT_COLOR_HIGH = '#406f1e';
const DEFAULT_COLOR_EXTREME_HIGH = '#1c2814';
const DEFAULT_STATIC_LOW_THRESHOLD = 1.0;
const DEFAULT_STATIC_HIGH_THRESHOLD = 1.2;
const DEFAULT_GAUGE_MIN = 0.8;
const DEFAULT_GAUGE_MAX = 1.3;
// ------------------------------------

// ======================================================================
// == VPD Gauge Card Editor Element (Defined BEFORE main card)         ==
// ======================================================================
class VpdGaugeCardEditor extends LitElement {
    static get properties() {
      return {
        hass: { type: Object },
        _config: { type: Object },
      };
    }

    _initialized = false;
    _elements = { inputs: {}, pickers: {}, colors: {} };

    setConfig(config) {
      console.log("[Editor] setConfig called with:", config);
      this._config = { ...config };
      if (this._initialized) {
        this.loadEditorValues();
      } else {
        // Use updateComplete which is standard LitElement lifecycle
        this.updateComplete.then(() => {
            if (!this._initialized) { // Check again in case of race conditions
                 this.firstUpdated(); // Call manually if needed
            } else {
                 this.loadEditorValues();
            }
        });
      }
    }

    set hass(hass) {
      this._hass = hass;
      if (this._initialized && this._elements?.pickers) {
        Object.values(this._elements.pickers).forEach(picker => {
          if (picker) picker.hass = this._hass;
        });
      }
    }

    // Use firstUpdated for setup that depends on shadow DOM
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties); // Call super
        if (!this._initialized) {
            this._storeElementReferences();
            this._attachInputListeners();
            this.loadEditorValues(); // Load values after elements exist
            this._initialized = true;
            console.log("[Editor] Initialized via firstUpdated.");
        }
    }

    _storeElementReferences() {
        const root = this.shadowRoot;
        if (!root) return;
        this._elements.pickers.entity = root.querySelector('#entity');
        this._elements.pickers.min_entity = root.querySelector('#min_entity');
        this._elements.pickers.max_entity = root.querySelector('#max_entity');
        this._elements.inputs.name = root.querySelector('#name');
        // this._elements.inputs.needle = root.querySelector('#needle'); // REMOVED
        this._elements.inputs.gauge_min = root.querySelector('#gauge_min');
        this._elements.inputs.gauge_max = root.querySelector('#gauge_max');
        this._elements.inputs.static_low_threshold = root.querySelector('#static_low_threshold');
        this._elements.inputs.static_high_threshold = root.querySelector('#static_high_threshold');

        // Store references for color pickers
        const colorGroups = ['extreme_low', 'low', 'good', 'high', 'extreme_high'];
        this._elements.colors = {};
        colorGroups.forEach(group => {
            this._elements.colors[group] = {
                picker: root.querySelector(`#${group}_picker`) // Reference the picker
            };
        });
        console.log("[Editor] Elements stored:", this._elements);
    }

    _attachInputListeners() {
        if (!this._elements) return;
        console.log("[Editor] Attaching listeners");
        // Pickers
        this._elements.pickers.entity?.addEventListener('value-changed', this._valueChanged);
        this._elements.pickers.min_entity?.addEventListener('value-changed', this._valueChanged);
        this._elements.pickers.max_entity?.addEventListener('value-changed', this._valueChanged);
        // Text Inputs
        this._elements.inputs.name?.addEventListener('input', this._valueChanged);
        this._elements.inputs.gauge_min?.addEventListener('input', this._valueChanged);
        this._elements.inputs.gauge_max?.addEventListener('input', this._valueChanged);
        this._elements.inputs.static_low_threshold?.addEventListener('input', this._valueChanged);
        this._elements.inputs.static_high_threshold?.addEventListener('input', this._valueChanged);
        // Color Pickers - listen for 'color-changed'
        for (const group in this._elements.colors) {
            this._elements.colors[group].picker?.addEventListener('color-changed', this._colorChanged);
        }
    }

    loadEditorValues() {
        if (!this._config || !this.shadowRoot || !this._elements) { console.warn("[Editor] Cannot load values yet."); return; }
        console.log("[Editor] Loading editor values from:", this._config);

        const setValue = (el, value, defaultValue = '') => { if (el) el.value = value ?? defaultValue; };
        // const setChecked = (el, value) => { if (el) el.checked = value; }; // REMOVED

        // Set values for text and picker inputs
        setValue(this._elements.pickers.entity, this._config[CONF_ENTITY]);
        setValue(this._elements.pickers.min_entity, this._config[CONF_MIN_ENTITY]);
        setValue(this._elements.pickers.max_entity, this._config[CONF_MAX_ENTITY]);
        setValue(this._elements.inputs.name, this._config[CONF_NAME]);
        // setChecked(this._elements.inputs.needle, this._config[CONF_NEEDLE] !== false); // REMOVED
        setValue(this._elements.inputs.gauge_min, this._config[CONF_GAUGE_MIN], DEFAULT_GAUGE_MIN);
        setValue(this._elements.inputs.gauge_max, this._config[CONF_GAUGE_MAX], DEFAULT_GAUGE_MAX);
        setValue(this._elements.inputs.static_low_threshold, this._config[CONF_STATIC_LOW_THRESHOLD], DEFAULT_STATIC_LOW_THRESHOLD);
        setValue(this._elements.inputs.static_high_threshold, this._config[CONF_STATIC_HIGH_THRESHOLD], DEFAULT_STATIC_HIGH_THRESHOLD);

        // Set values for color pickers
        for (const group in this._elements.colors) {
             const picker = this._elements.colors[group]?.picker;
             if (picker) {
                 const configKey = `color_${group}`;
                 const defaultColorConst = `DEFAULT_COLOR_${group.toUpperCase()}`;
                 // Access global default constants correctly
                 const defaultColor = window[defaultColorConst] !== undefined ? window[defaultColorConst] : '#000000';
                 picker.value = this._config[configKey] ?? defaultColor;
                 // console.log(`[Editor] Loading color for ${group}: Config=${this._config[configKey]}, Default=${defaultColor}, Final=${picker.value}`);
             }
        }
        // Ensure hass is set for pickers
        if (this._hass && this._elements.pickers) { Object.values(this._elements.pickers).forEach(p => { if(p) p.hass = this._hass; }); }
    }

    // --- Event Handlers (Use Arrow Functions) ---
    _valueChanged = (ev) => {
        if (!this._config) return;
        const target = ev.target;
        const configKey = target.dataset.configValue;
        let value = target.value; // Default for textfield

        if (!configKey) { console.warn("No configValue dataset found for target:", target); return; }

        // Handle specific types
        // if (target.tagName === "HA-SWITCH") { value = target.checked; } // REMOVED NEEDLE
        if (target.type === "number") { value = value === "" ? undefined : parseFloat(value); }
        else if (target.tagName === 'HA-ENTITY-PICKER' && ev.detail?.value !== undefined) { value = ev.detail.value; }

        const newConfig = { ...this._config };

        if (value === undefined || value === "" || (typeof value === 'number' && isNaN(value))) {
            if (configKey !== CONF_ENTITY && configKey !== CONF_MIN_ENTITY && configKey !== CONF_MAX_ENTITY) { delete newConfig[configKey]; }
            else { newConfig[configKey] = ""; }
        } else { newConfig[configKey] = value; }

        this._config = newConfig;
        this.fireConfigChanged();
    }

    _colorChanged = (ev) => {
        if (!this._config) return;
        const target = ev.target;
        const configKey = target.dataset.configValue;
        const value = ev.detail.value; // ha-color-picker uses event.detail.value

        if (!configKey) { console.warn("No configValue dataset found for color picker:", target); return; }
        console.log(`[Editor] Color Changed: Key=${configKey}, Value=${value}`);

        const newConfig = { ...this._config };

        if (value) { newConfig[configKey] = value.toUpperCase(); }
        else { delete newConfig[configKey]; }

        this._config = newConfig;
        this.fireConfigChanged();
    }

    fireConfigChanged() {
        console.log("[Editor] Firing config-changed with:", this._config);
        const event = new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: true, composed: true, });
        this.dispatchEvent(event);
    }

    render() {
      if (!this._hass) return html`Waiting for hass...`;
      if (!this._config) return html`Waiting for config...`;

      // Define values for binding, remove needle
      const name = this._config[CONF_NAME] || "";
      const entity = this._config[CONF_ENTITY] || "";
      const minEntity = this._config[CONF_MIN_ENTITY] || "";
      const maxEntity = this._config[CONF_MAX_ENTITY] || "";
      const gaugeMin = this._config[CONF_GAUGE_MIN] ?? DEFAULT_GAUGE_MIN;
      const gaugeMax = this._config[CONF_GAUGE_MAX] ?? DEFAULT_GAUGE_MAX;
      const staticLow = this._config[CONF_STATIC_LOW_THRESHOLD] ?? DEFAULT_STATIC_LOW_THRESHOLD;
      const staticHigh = this._config[CONF_STATIC_HIGH_THRESHOLD] ?? DEFAULT_STATIC_HIGH_THRESHOLD;
      const colorExtremeLow = this._config[CONF_COLOR_EXTREME_LOW] || DEFAULT_COLOR_EXTREME_LOW;
      const colorLow = this._config[CONF_COLOR_LOW] || DEFAULT_COLOR_LOW;
      const colorGood = this._config[CONF_COLOR_GOOD] || DEFAULT_COLOR_GOOD;
      const colorHigh = this._config[CONF_COLOR_HIGH] || DEFAULT_COLOR_HIGH;
      const colorExtremeHigh = this._config[CONF_COLOR_EXTREME_HIGH] || DEFAULT_COLOR_EXTREME_HIGH;

      return html`
        <div class="card-config">
          <h3>Required Entities</h3>
          <ha-entity-picker label="VPD Sensor Entity" .hass=${this._hass} .value=${entity} .dataset=${{ configValue: CONF_ENTITY }} @value-changed=${this._valueChanged} allow-custom-entity required id="entity"></ha-entity-picker>
          <ha-entity-picker label="Min Threshold Entity (Number)" .hass=${this._hass} .value=${minEntity} .dataset=${{ configValue: CONF_MIN_ENTITY }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="min_entity"></ha-entity-picker>
          <ha-entity-picker label="Max Threshold Entity (Number)" .hass=${this._hass} .value=${maxEntity} .dataset=${{ configValue: CONF_MAX_ENTITY }} @value-changed=${this._valueChanged} .includeDomains=${["number"]} allow-custom-entity required id="max_entity"></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield label="Name (Optional)" .value=${name} .dataset=${{ configValue: CONF_NAME }} @input=${this._valueChanged} id="name"></ha-textfield>
          <!-- Needle Switch Removed -->

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield label="Gauge Min Value" type="number" .value=${gaugeMin} .dataset=${{ configValue: CONF_GAUGE_MIN }} @input=${this._valueChanged} step="0.01" id="gauge_min"></ha-textfield>
              <ha-textfield label="Gauge Max Value" type="number" .value=${gaugeMax} .dataset=${{ configValue: CONF_GAUGE_MAX }} @input=${this._valueChanged} step="0.01" id="gauge_max"></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield label="Static Low Threshold" type="number" .value=${staticLow} .dataset=${{ configValue: CONF_STATIC_LOW_THRESHOLD }} @input=${this._valueChanged} step="0.01" title="Segment color changes from Extreme Low to Low at this value" id="static_low_threshold"></ha-textfield>
              <ha-textfield label="Static High Threshold" type="number" .value=${staticHigh} .dataset=${{ configValue: CONF_STATIC_HIGH_THRESHOLD }} @input=${this._valueChanged} step="0.01" title="Segment color changes from High to Extreme High at this value" id="static_high_threshold"></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label> <ha-color-picker .value=${colorExtremeLow} .dataset=${{ configValue: CONF_COLOR_EXTREME_LOW }} @color-changed=${this._colorChanged} id="extreme_low_picker"></ha-color-picker>
              <label>Low:</label> <ha-color-picker .value=${colorLow} .dataset=${{ configValue: CONF_COLOR_LOW }} @color-changed=${this._colorChanged} id="low_picker"></ha-color-picker>
              <label>Good:</label> <ha-color-picker .value=${colorGood} .dataset=${{ configValue: CONF_COLOR_GOOD }} @color-changed=${this._colorChanged} id="good_picker"></ha-color-picker>
              <label>High:</label> <ha-color-picker .value=${colorHigh} .dataset=${{ configValue: CONF_COLOR_HIGH }} @color-changed=${this._colorChanged} id="high_picker"></ha-color-picker>
              <label>Extreme High:</label> <ha-color-picker .value=${colorExtremeHigh} .dataset=${{ configValue: CONF_COLOR_EXTREME_HIGH }} @color-changed=${this._colorChanged} id="extreme_high_picker"></ha-color-picker>
           </div>
        </div>
      `;
    }

    static get styles() {
      return css`
        /* ... Keep styles as before ... */
        .card-config { display: flex; flex-direction: column; gap: 12px; }
        ha-entity-picker, ha-textfield, ha-formfield { display: block; }
        /* ha-switch removed */
        .side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; align-items: center; }
        h3 { margin-bottom: 0; margin-top: 8px; border-bottom: 1px solid var(--divider-color); padding-bottom: 4px;}
        label { text-align: right; padding-right: 8px; }
        ha-color-picker { width: 100%; }
      `;
    }
}

// --- Editor Definition & Registration ---
if (!customElements.get('vpd-gauge-card-editor')) {
    customElements.define('vpd-gauge-card-editor', VpdGaugeCardEditor);
    console.info('%c VPD-GAUGE-CARD-EDITOR %c Defined', 'color: white; background: #039be5; font-weight: 700;', 'color: #039be5; background: white; font-weight: 700;');
}

// ======================================================================
// == VPD Gauge Card Element                                           ==
// ======================================================================
class VpdGaugeCard extends LitElement {
  // --- PASTE THE ENTIRE VpdGaugeCard CLASS CODE HERE ---
  // Including: static get properties, setConfig (without needle),
  // _calculateSegments (final correct version), render (without needle),
  // getCardSize, static getConfigElement, static getStubConfig, static get styles
  // ------------------------------------------------------
    static get properties() { return { hass: { type: Object }, config: { type: Object }, }; }
    setConfig(config) { if (!config || !config[CONF_ENTITY]) throw new Error("Entity is required"); if (!config[CONF_MIN_ENTITY]) throw new Error("Min entity is required"); if (!config[CONF_MAX_ENTITY]) throw new Error("Max entity is required"); const defaults = { gauge_min: DEFAULT_GAUGE_MIN, gauge_max: DEFAULT_GAUGE_MAX, static_low_threshold: DEFAULT_STATIC_LOW_THRESHOLD, static_high_threshold: DEFAULT_STATIC_HIGH_THRESHOLD, color_extreme_low: DEFAULT_COLOR_EXTREME_LOW, color_low: DEFAULT_COLOR_LOW, color_good: DEFAULT_COLOR_GOOD, color_high: DEFAULT_COLOR_HIGH, color_extreme_high: DEFAULT_COLOR_EXTREME_HIGH, name: "", }; this.config = { ...defaults, ...config, }; delete this.config[CONF_NEEDLE]; console.log("VPD Gauge Card Config Set:", this.config); if (this.hass) this.requestUpdate(); }
    _calculateSegments = () => { const config = this.config; const hass = this.hass; if (!hass || !config || !config[CONF_MIN_ENTITY] || !config[CONF_MAX_ENTITY]) { console.warn("VPD Gauge: Data missing for segment calc."); return []; } const gaugeMin = config.gauge_min ?? DEFAULT_GAUGE_MIN; const minEntityId = config.min_entity; const maxEntityId = config.max_entity; const staticLowThreshold = config.static_low_threshold ?? DEFAULT_STATIC_LOW_THRESHOLD; const staticHighThreshold = config.static_high_threshold ?? DEFAULT_STATIC_HIGH_THRESHOLD; const colorExtremeLow = config.color_extreme_low || DEFAULT_COLOR_EXTREME_LOW; const colorLow = config.color_low || DEFAULT_COLOR_LOW; const colorGood = config.color_good || DEFAULT_COLOR_GOOD; const colorHigh = config.color_high || DEFAULT_COLOR_HIGH; const colorExtremeHigh = config.color_extreme_high || DEFAULT_COLOR_EXTREME_HIGH; const minThresholdState = hass.states[minEntityId]; const maxThresholdState = hass.states[maxEntityId]; let minThreshold = staticLowThreshold; if (minThresholdState && !isNaN(parseFloat(minThresholdState.state))) { minThreshold = parseFloat(minThresholdState.state); } else { console.warn(`VPD Gauge: Invalid min_entity state (${minEntityId}), using static fallback ${minThreshold}`); } let maxThreshold = staticHighThreshold; if (maxThresholdState && !isNaN(parseFloat(maxThresholdState.state))) { maxThreshold = parseFloat(maxThresholdState.state); } else { console.warn(`VPD Gauge: Invalid max_entity state (${maxEntityId}), using static fallback ${maxThreshold}`); } const segments = [ { from: gaugeMin, color: colorExtremeLow }, { from: staticLowThreshold, color: colorLow }, { from: minThreshold, color: colorGood }, { from: maxThreshold, color: colorHigh }, { from: staticHighThreshold, color: colorExtremeHigh }, ]; segments.sort((a, b) => a.from - b.from); const finalSegments = segments.filter((segment, index, arr) => { if (segment.from < gaugeMin) return false; if (index < arr.length - 1 && arr[index + 1].from === segment.from) { return false; } return true; }); if (finalSegments.length === 0 || finalSegments[0].from > gaugeMin) { let startingColor = colorExtremeLow; if (gaugeMin >= staticHighThreshold) startingColor = colorExtremeHigh; else if (gaugeMin >= maxThreshold) startingColor = colorHigh; else if (gaugeMin >= minThreshold) startingColor = colorGood; else if (gaugeMin >= staticLowThreshold) startingColor = colorLow; finalSegments.unshift({ from: gaugeMin, color: startingColor }); if ( finalSegments.length > 1 && finalSegments[1].from === finalSegments[0].from ) { finalSegments.shift(); } } console.log(`VPD Gauge (${config.entity}): MinT=${minThreshold}, MaxT=${maxThreshold}, Segments=`, finalSegments); return finalSegments; };
    render() { console.log("Render method called. Hass:", !!this.hass, "Config:", !!this.config); if (!this.hass || !this.config || !this.config[CONF_ENTITY]) return html`<ha-card><div class="warning">Config required</div></ha-card>`; const stateObj = this.hass.states[this.config[CONF_ENTITY]]; const value = stateObj ? parseFloat(stateObj.state) : undefined; console.log(`Rendering: Entity=${this.config[CONF_ENTITY]}, StateObj=`, stateObj, `Value=${value}`); if (stateObj === undefined) return html`<ha-card header="${this.config[CONF_NAME] || 'VPD'}"><div class="warning">Entity not found: ${this.config[CONF_ENTITY]}</div></ha-card>`; if (value === undefined || isNaN(value)) return html`<ha-card header="${this.config[CONF_NAME] || 'VPD'}"><div class="warning">Invalid state: ${stateObj.state}</div></ha-card>`; const calculatedSegments = this._calculateSegments(); return html` <ha-card header="${this.config[CONF_NAME] || "VPD Gauge"}"> <div class="card-content"> <ha-gauge .value=${value} .min=${this.config.gauge_min ?? DEFAULT_GAUGE_MIN} .max=${this.config.gauge_max ?? DEFAULT_GAUGE_MAX} .segments=${calculatedSegments} needle style="--gauge-color: var(--primary-text-color);"></ha-gauge> </div> </ha-card> `; }
    getCardSize() { return 3; }
    static getConfigElement() { console.log("getConfigElement: Creating vpd-gauge-card-editor element."); return document.createElement("vpd-gauge-card-editor"); }
    static getStubConfig(hass, entities, entitiesFallback) { const vpdSensor = entities.find(e => e.startsWith("sensor.") && e.includes("vpd")) || entitiesFallback.find(e => e.startsWith("sensor.") && e.includes("vpd")); const baseNameGuess = vpdSensor ? vpdSensor.split('.').pop().replace('_vpd_mqtt', '').replace('_vpd', '') : null; const minEntity = entities.find(e => e.startsWith("number.") && e.includes("min") && (baseNameGuess ? e.includes(baseNameGuess) : true)) || entitiesFallback.find(e => e.startsWith("number.") && e.includes("min")); const maxEntity = entities.find(e => e.startsWith("number.") && e.includes("max") && (baseNameGuess ? e.includes(baseNameGuess) : true)) || entitiesFallback.find(e => e.startsWith("number.") && e.includes("max")); console.log("StubConfig Found: VPD=", vpdSensor, "Min=", minEntity, "Max=", maxEntity); return { type: "custom:vpd-gauge-card", entity: vpdSensor || "", min_entity: minEntity || "", max_entity: maxEntity || "", name: baseNameGuess ? `${baseNameGuess.replace(/_/g, ' ')} VPD Gauge` : "VPD Gauge" }; }
    static get styles() { return css`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`; }
}


// --- Card Definition & Registration ---
if (!customElements.get('vpd-gauge-card')) {
    customElements.define('vpd-gauge-card', VpdGaugeCard);
    console.info('%c VPD-GAUGE-CARD %c Loaded ', 'color: white; background: #039be5; font-weight: 700;', 'color: #039be5; background: white; font-weight: 700;');
}

// --- Card Picker Registration ---
if (window.customCards && !window.customCards.some(card => card.type === 'vpd-gauge-card')) {
     window.customCards.push({ type: "vpd-gauge-card", name: "VPD Gauge Card", description: "A gauge card with dynamic segments based on min/max threshold entities.", preview: true, });
}

// --- Final Load Confirmation ---
console.log("VPD Gauge Card + Editor Script Loaded Successfully");