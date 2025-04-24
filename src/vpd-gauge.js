// src/vpd-gauge-card.js

import { LitElement, html, css } from "lit"; // Use direct import now

import "./vpd-gauge-card-editor.js";
// Import the gauge element definition if needed (often loaded globally by HA)
// If you encounter issues rendering the gauge, uncommenting or finding the correct
// import path for ha-gauge might be necessary. Maybe try this path:
// import "../node_modules/home-assistant-frontend/src/components/ha-gauge.js";

// Define constants for configuration keys (good practice)
const CONF_ENTITY = "entity";
const CONF_NAME = "name";
const CONF_NEEDLE = "needle";
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

// Default values matching your example logic
const DEFAULT_COLOR_EXTREME_LOW = "#1c2814";
const DEFAULT_COLOR_LOW = "#406f1e";
const DEFAULT_COLOR_GOOD = "#689a46";
const DEFAULT_COLOR_HIGH = "#406f1e"; // Same as low in example
const DEFAULT_COLOR_EXTREME_HIGH = "#1c2814";
const DEFAULT_STATIC_LOW_THRESHOLD = 1.0;
const DEFAULT_STATIC_HIGH_THRESHOLD = 1.2;
const DEFAULT_GAUGE_MIN = 0.8;
const DEFAULT_GAUGE_MAX = 1.3;

class VpdGaugeCard extends LitElement {
  // Properties recognized by LitElement. Changes trigger re-render.
  static get properties() {
    return {
      hass: { type: Object }, // Home Assistant object passed down
      config: { type: Object }, // Card configuration object
    };
  }

  // --- Lifecycle Methods ---

  setConfig(config) {
    // Validate configuration
    if (!config[CONF_ENTITY]) {
      throw new Error("You need to define an entity (VPD Sensor)");
    }
    if (!config[CONF_MIN_ENTITY]) {
      throw new Error("You need to define min_entity (Min Threshold Number)");
    }
    if (!config[CONF_MAX_ENTITY]) {
      throw new Error("You need to define max_entity (Max Threshold Number)");
    }

       // --- Explicitly define ALL defaults first ---
       const defaults = {
        needle: true,
        gauge_min: DEFAULT_GAUGE_MIN,
        gauge_max: DEFAULT_GAUGE_MAX,
        static_low_threshold: DEFAULT_STATIC_LOW_THRESHOLD,
        static_high_threshold: DEFAULT_STATIC_HIGH_THRESHOLD,
        color_extreme_low: DEFAULT_COLOR_EXTREME_LOW,
        color_low: DEFAULT_COLOR_LOW,
        color_good: DEFAULT_COLOR_GOOD,
        color_high: DEFAULT_COLOR_HIGH,
        color_extreme_high: DEFAULT_COLOR_EXTREME_HIGH,
        name: "", // Default name is empty
      };
      // -------------------------------------------
  
      // Merge user config onto defaults
      this.config = {
        ...defaults,
        ...config, // User config overrides defaults
      };
  
      console.log("VPD Gauge Card Config Set (with defaults applied):", this.config);
      if (this.hass) {
        this.requestUpdate();
    }
  }

  // --- Helper Method (as Arrow Function Property) ---

  _calculateSegments = () => {
    // 'this' here will always refer to the VpdGaugeCard instance
    const config = this.config;
    const hass = this.hass;

    // Check if hass or config are available before proceeding
    if (
      !hass ||
      !config ||
      !config[CONF_MIN_ENTITY] ||
      !config[CONF_MAX_ENTITY]
    ) {
      console.warn(
        "VPD Gauge: Hass or required config missing for segment calculation."
      );
      return []; // Return empty array if data is missing
    }

    const gaugeMin = config.gauge_min ?? DEFAULT_GAUGE_MIN;
    const minEntityId = config.min_entity;
    const maxEntityId = config.max_entity;
    const staticLowThreshold =
      config.static_low_threshold ?? DEFAULT_STATIC_LOW_THRESHOLD;
    const staticHighThreshold =
      config.static_high_threshold ?? DEFAULT_STATIC_HIGH_THRESHOLD;

    const colorExtremeLow =
      config.color_extreme_low || DEFAULT_COLOR_EXTREME_LOW;
    const colorLow = config.color_low || DEFAULT_COLOR_LOW;
    const colorGood = config.color_good || DEFAULT_COLOR_GOOD;
    const colorHigh = config.color_high || DEFAULT_COLOR_HIGH;
    const colorExtremeHigh =
      config.color_extreme_high || DEFAULT_COLOR_EXTREME_HIGH;

    const minThresholdState = hass.states[minEntityId];
    const maxThresholdState = hass.states[maxEntityId];

    let minThreshold = staticLowThreshold; // Default fallback
    if (minThresholdState && !isNaN(parseFloat(minThresholdState.state))) {
      minThreshold = parseFloat(minThresholdState.state);
    } else {
      console.warn(
        `VPD Gauge: Invalid state for min_entity (${minEntityId}), using static fallback ${minThreshold}`
      );
    }

    let maxThreshold = staticHighThreshold; // Default fallback
    if (maxThresholdState && !isNaN(parseFloat(maxThresholdState.state))) {
      maxThreshold = parseFloat(maxThresholdState.state);
    } else {
      console.warn(
        `VPD Gauge: Invalid state for max_entity (${maxEntityId}), using static fallback ${maxThreshold}`
      );
    }

    // Build segments based on the *exact* ranges from the template visual
    const segments = [
      { from: gaugeMin, color: colorExtremeLow },
      { from: staticLowThreshold, color: colorLow },
      { from: minThreshold, color: colorGood },
      { from: maxThreshold, color: colorHigh },
      { from: staticHighThreshold, color: colorExtremeHigh },
    ];

    // Sort and deduplicate, keeping the LATER definition for ties
    segments.sort((a, b) => a.from - b.from);
    const finalSegments = segments.filter((segment, index, arr) => {
      if (segment.from < gaugeMin) return false;
      if (index < arr.length - 1 && arr[index + 1].from === segment.from) {
        return false;
      }
      return true;
    });

    // Ensure first segment starts at gaugeMin if needed
    if (finalSegments.length === 0 || finalSegments[0].from > gaugeMin) {
      let startingColor = colorExtremeLow;
      if (gaugeMin >= staticHighThreshold) startingColor = colorExtremeHigh;
      else if (gaugeMin >= maxThreshold) startingColor = colorHigh;
      else if (gaugeMin >= minThreshold) startingColor = colorGood;
      else if (gaugeMin >= staticLowThreshold) startingColor = colorLow;

      finalSegments.unshift({ from: gaugeMin, color: startingColor });
      if (
        finalSegments.length > 1 &&
        finalSegments[1].from === finalSegments[0].from
      ) {
        finalSegments.shift();
      }
    }

    console.log(
      `VPD Gauge (${config.entity}): MinT=${minThreshold}, MaxT=${maxThreshold}, Segments=`,
      finalSegments
    );
    return finalSegments;
  };

  // --- Rendering ---

  render() {
    // Add console log to see when render is called and what hass/config are
    console.log(
      "Render method called. Hass state available:",
      !!this.hass,
      "Config available:",
      !!this.config
    );

    if (!this.hass || !this.config || !this.config[CONF_ENTITY]) {
      // Don't render card content if essential config/data is missing
      // Optionally render a config warning
      return html`<ha-card header="VPD Gauge"
        ><div class="warning">
          Please configure the required entities.
        </div></ha-card
      >`;
    }

    const stateObj = this.hass.states[this.config[CONF_ENTITY]];
    const value = stateObj ? parseFloat(stateObj.state) : undefined;

    // Log state for debugging
    console.log(
      `Rendering VPD Gauge: Entity=${this.config[CONF_ENTITY]}, StateObj=`,
      stateObj,
      `Value=${value}`
    );

    if (stateObj === undefined) {
      return html`
        <ha-card header="${this.config[CONF_NAME] || "VPD Gauge"}">
          <div class="warning">
            Entity not found: ${this.config[CONF_ENTITY]}
          </div>
        </ha-card>
      `;
    }

    if (value === undefined || isNaN(value)) {
      // Don't calculate segments if value is invalid, show warning
      return html`
        <ha-card header="${this.config[CONF_NAME] || "VPD Gauge"}">
          <div class="warning">
            Invalid state for ${this.config[CONF_ENTITY]}: ${stateObj.state}
          </div>
        </ha-card>
      `;
    }

    // Calculate segments inside render or ensure it's called correctly
    const calculatedSegments = this._calculateSegments();

    return html`
      <ha-card header="${this.config[CONF_NAME] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${value}
            .min=${this.config.gauge_min ?? DEFAULT_GAUGE_MIN}
            .max=${this.config.gauge_max ?? DEFAULT_GAUGE_MAX}
            .segments=${calculatedSegments}
            ?needle=${this.config[CONF_NEEDLE] !== false}
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
    // Ensure the editor component is loaded before creating it
    // This dynamic import helps with code splitting
    import("./vpd-gauge-card-editor.js")
      .then(() => {
        console.log("VPD Gauge Card Editor loaded.");
      })
      .catch((e) => {
        console.error("Failed to load VPD Gauge Card Editor:", e);
      });
    return document.createElement("vpd-gauge-card-editor");
  }

  static getStubConfig(hass, entities, entitiesFallback) {
    // Provide a default config when user adds card initially
    const sensorEntity =
      entities.find((e) => e.startsWith("sensor.") && e.includes("vpd")) ||
      entitiesFallback.find((e) => e.startsWith("sensor."));
    const minEntity =
      entities.find((e) => e.startsWith("number.") && e.includes("min")) ||
      entitiesFallback.find((e) => e.startsWith("number."));
    const maxEntity =
      entities.find((e) => e.startsWith("number.") && e.includes("max")) ||
      entitiesFallback.find((e) => e.startsWith("number."));
    return {
      type: "custom:vpd-gauge-card", // IMPORTANT: Use your card's custom type
      entity: sensorEntity || "",
      min_entity: minEntity || "",
      max_entity: maxEntity || "",
      name: "VPD Gauge",
      // Default visual settings will be applied from setConfig
    };
  }

  // --- Styling ---
  static get styles() {
    return css`
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

// ======================================================================
// == Card Definition & Registration                                   ==
// ======================================================================

// Define the custom element, ensuring it's only defined once
if (!customElements.get("vpd-gauge-card")) {
  customElements.define("vpd-gauge-card", VpdGaugeCard);
  // Log registration only if it actually happens
  console.info(
    "%c VPD-GAUGE-CARD %c Loaded ",
    "color: white; background: #039be5; font-weight: 700;",
    "color: #039be5; background: white; font-weight: 700;"
  );
} else {
  console.warn("Attempted to redefine vpd-gauge-card. Skipping.");
}

// Add card to Lovelace custom card picker (if not already present)
// This should ideally only run once as well, though less critical than define
if (
  window.customCards &&
  !window.customCards.some((card) => card.type === "vpd-gauge-card")
) {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "vpd-gauge-card", // Matches customElements.define
    name: "VPD Gauge Card",
    description:
      "A gauge card with dynamic segments based on min/max threshold entities.",
    preview: true, // Enable preview in card picker
    // documentationURL: "URL_TO_YOUR_REPO_OR_DOCS" // Optional
  });
}

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

// ======================================================================
// == Editor Definition & Registration                                 ==
// ======================================================================

// Define the custom element for the editor, ensuring it's only defined once
if (!customElements.get("vpd-gauge-card-editor")) {
  customElements.define("vpd-gauge-card-editor", VpdGaugeCardEditor);
  // Optional: Add a console log for editor registration if needed for debugging
  // console.info('VPD Gauge Card Editor defined.');
} else {
  console.warn("Attempted to redefine vpd-gauge-card-editor. Skipping.");
}
