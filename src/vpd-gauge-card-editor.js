// src/vpd-gauge-card-editor.js
import { LitElement, html, css } from 'lit';

// Keep HA element imports commented out unless needed
// import "home-assistant-frontend/src/components/ha-formfield.js";
// import "home-assistant-frontend/src/components/ha-switch.js";
// import "home-assistant-frontend/src/components/ha-textfield.js";
// import "home-assistant-frontend/src/components/entity/ha-entity-picker.js";
// import "home-assistant-frontend/src/components/ha-color-picker.js";

// Constants (Keep all CONF_ and DEFAULT_ constants)
const CONF_ENTITY = "entity";
const CONF_NAME = "name";
// const CONF_NEEDLE = "needle"; // REMOVED
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

class VpdGaugeCardEditor extends LitElement {
    static get properties() { return { hass: { type: Object }, _config: { type: Object, state: true }, }; }
    _initialized = false;
    _elements = { inputs: {}, pickers: {}, colors: {} };

    setConfig(config) {
      console.log("[Editor] setConfig called with:", config);
      this._config = { ...config };
      if (this._initialized) { this.loadEditorValues(); }
      else { this.updateComplete.then(() => { if (!this._initialized) this.firstUpdated(); this.loadEditorValues(); }); }
    }

    set hass(hass) {
      this._hass = hass;
      if (this._initialized && this._elements?.pickers) { Object.values(this._elements.pickers).forEach(p => { if(p) p.hass = this._hass; }); }
    }

    firstUpdated() {
        if (!this._initialized) {
            this._storeElementReferences();
            this._attachInputListeners();
            this.loadEditorValues();
            this._initialized = true;
            console.log("[Editor] Initialized via firstUpdated.");
        }
    }

    _storeElementReferences() {
        const root = this.shadowRoot; if (!root) return;
        this._elements.pickers.entity = root.querySelector('#entity');
        this._elements.pickers.min_entity = root.querySelector('#min_entity');
        this._elements.pickers.max_entity = root.querySelector('#max_entity');
        this._elements.inputs.name = root.querySelector('#name');
        // Needle removed
        this._elements.inputs.gauge_min = root.querySelector('#gauge_min');
        this._elements.inputs.gauge_max = root.querySelector('#gauge_max');
        this._elements.inputs.static_low_threshold = root.querySelector('#static_low_threshold');
        this._elements.inputs.static_high_threshold = root.querySelector('#static_high_threshold');
        const colorGroups = ['extreme_low', 'low', 'good', 'high', 'extreme_high'];
        this._elements.colors = {};
        colorGroups.forEach(group => { this._elements.colors[group] = { picker: root.querySelector(`#${group}_picker`) }; });
        console.log("[Editor] Elements stored:", this._elements);
    }

    _attachInputListeners() {
        if (!this._elements) return;
        console.log("[Editor] Attaching listeners");
        this._elements.pickers.entity?.addEventListener('value-changed', this._valueChanged);
        this._elements.pickers.min_entity?.addEventListener('value-changed', this._valueChanged);
        this._elements.pickers.max_entity?.addEventListener('value-changed', this._valueChanged);
        this._elements.inputs.name?.addEventListener('input', this._valueChanged);
        // Needle removed
        this._elements.inputs.gauge_min?.addEventListener('input', this._valueChanged);
        this._elements.inputs.gauge_max?.addEventListener('input', this._valueChanged);
        this._elements.inputs.static_low_threshold?.addEventListener('input', this._valueChanged);
        this._elements.inputs.static_high_threshold?.addEventListener('input', this._valueChanged);
        for (const group in this._elements.colors) { this._elements.colors[group].picker?.addEventListener('color-changed', this._colorChanged); }
    }

    loadEditorValues() {
        if (!this._config || !this.shadowRoot || !this._elements || !this._initialized) { console.warn("[Editor] Cannot load values yet."); return; }
        console.log("[Editor] Loading editor values from:", this._config);
        const setValue = (el, value, defaultValue = '') => { if (el) el.value = value ?? defaultValue; };

        setValue(this._elements.pickers.entity, this._config[CONF_ENTITY]);
        setValue(this._elements.pickers.min_entity, this._config[CONF_MIN_ENTITY]);
        setValue(this._elements.pickers.max_entity, this._config[CONF_MAX_ENTITY]);
        setValue(this._elements.inputs.name, this._config[CONF_NAME]);
        setValue(this._elements.inputs.gauge_min, this._config[CONF_GAUGE_MIN], DEFAULT_GAUGE_MIN);
        setValue(this._elements.inputs.gauge_max, this._config[CONF_GAUGE_MAX], DEFAULT_GAUGE_MAX);
        setValue(this._elements.inputs.static_low_threshold, this._config[CONF_STATIC_LOW_THRESHOLD], DEFAULT_STATIC_LOW_THRESHOLD);
        setValue(this._elements.inputs.static_high_threshold, this._config[CONF_STATIC_HIGH_THRESHOLD], DEFAULT_STATIC_HIGH_THRESHOLD);

        for (const group in this._elements.colors) {
             const picker = this._elements.colors[group]?.picker;
             if (picker) {
                 const configKey = `color_${group}`;
                 const defaultColorConst = `DEFAULT_COLOR_${group.toUpperCase()}`;
                 const defaultColor = window[defaultColorConst] !== undefined ? window[defaultColorConst] : '#000000';
                 picker.value = this._config[configKey] ?? defaultColor;
             }
        }
        if (this._hass && this._elements.pickers) { Object.values(this._elements.pickers).forEach(p => { if(p) p.hass = this._hass; }); }
    }

    // --- Event Handlers (Use Arrow Functions) ---
    _valueChanged = (ev) => {
        if (!this._config) return;
        const target = ev.target;
        const configKey = target.dataset.configValue;
        let value = target.value;
        if (!configKey) { console.warn("No configValue dataset found for target:", target); return; }

        // Handle specific types
        if (target.type === "number") { value = value === "" ? undefined : parseFloat(value); }
        else if (target.tagName === 'HA-ENTITY-PICKER' && ev.detail?.value !== undefined) { value = ev.detail.value; }
        // No switch handling needed

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

      // Render using Color Pickers
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

    static get styles() { /* Keep styles as before */ return css`...`; }
}

// --- Editor Definition & Registration ---
if (!customElements.get('vpd-gauge-card-editor')) {
    customElements.define('vpd-gauge-card-editor', VpdGaugeCardEditor);
    console.info('%c VPD-GAUGE-CARD-EDITOR %c Defined', 'color: white; background: #039be5; font-weight: 700;', 'color: #039be5; background: white; font-weight: 700;');
}

// --- Final Load Confirmation ---
// console.log("VPD Gauge Card Editor Script Loaded Successfully"); // Already logged by main card script