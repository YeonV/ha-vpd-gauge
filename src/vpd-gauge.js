// src/vpd-gauge.js

import { LitElement, html, css } from "lit";

// Keep this import to trigger loading of the editor file
import "./vpd-gauge-card-editor.js";

// Constants (Keep all CONF_ and DEFAULT_ constants as defined before)
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

const DEFAULT_COLOR_EXTREME_LOW = "#1c2814";
const DEFAULT_COLOR_LOW = "#406f1e";
const DEFAULT_COLOR_GOOD = "#689a46";
const DEFAULT_COLOR_HIGH = "#406f1e";
const DEFAULT_COLOR_EXTREME_HIGH = "#1c2814";
const DEFAULT_STATIC_LOW_THRESHOLD = 1.0;
const DEFAULT_STATIC_HIGH_THRESHOLD = 1.2;
const DEFAULT_GAUGE_MIN = 0.8;
const DEFAULT_GAUGE_MAX = 1.3;
// ------------------------------------

class VpdGaugeCard extends LitElement {
  static get properties() { return { hass: { type: Object }, config: { type: Object }, }; }

  setConfig(config) {
    if (!config || !config[CONF_ENTITY]) throw new Error("Entity is required");
    if (!config[CONF_MIN_ENTITY]) throw new Error("Min entity is required");
    if (!config[CONF_MAX_ENTITY]) throw new Error("Max entity is required");
    const defaults = { // Defaults excluding needle
        gauge_min: DEFAULT_GAUGE_MIN, gauge_max: DEFAULT_GAUGE_MAX,
        static_low_threshold: DEFAULT_STATIC_LOW_THRESHOLD, static_high_threshold: DEFAULT_STATIC_HIGH_THRESHOLD,
        color_extreme_low: DEFAULT_COLOR_EXTREME_LOW, color_low: DEFAULT_COLOR_LOW,
        color_good: DEFAULT_COLOR_GOOD, color_high: DEFAULT_COLOR_HIGH,
        color_extreme_high: DEFAULT_COLOR_EXTREME_HIGH, name: "",
    };
    this.config = { ...defaults, ...config, };
    if (this.config['needle']) delete this.config['needle']; // Ensure needle is removed if present from old config
    console.log("VPD Gauge Card Config Set:", this.config);
    if (this.hass) this.requestUpdate();
  }

  _calculateSegments = () => { /* Keep your working segment logic exactly as is */
    const config = this.config; const hass = this.hass; if (!hass || !config || !config[CONF_MIN_ENTITY] || !config[CONF_MAX_ENTITY]) { console.warn("VPD Gauge: Data missing for segment calc."); return []; } const gaugeMin = config.gauge_min ?? DEFAULT_GAUGE_MIN; const minEntityId = config.min_entity; const maxEntityId = config.max_entity; const staticLowThreshold = config.static_low_threshold ?? DEFAULT_STATIC_LOW_THRESHOLD; const staticHighThreshold = config.static_high_threshold ?? DEFAULT_STATIC_HIGH_THRESHOLD; const colorExtremeLow = config.color_extreme_low || DEFAULT_COLOR_EXTREME_LOW; const colorLow = config.color_low || DEFAULT_COLOR_LOW; const colorGood = config.color_good || DEFAULT_COLOR_GOOD; const colorHigh = config.color_high || DEFAULT_COLOR_HIGH; const colorExtremeHigh = config.color_extreme_high || DEFAULT_COLOR_EXTREME_HIGH; const minThresholdState = hass.states[minEntityId]; const maxThresholdState = hass.states[maxEntityId]; let minThreshold = staticLowThreshold; if (minThresholdState && !isNaN(parseFloat(minThresholdState.state))) { minThreshold = parseFloat(minThresholdState.state); } else { console.warn(`VPD Gauge: Invalid min_entity state (${minEntityId}), using static fallback ${minThreshold}`); } let maxThreshold = staticHighThreshold; if (maxThresholdState && !isNaN(parseFloat(maxThresholdState.state))) { maxThreshold = parseFloat(maxThresholdState.state); } else { console.warn(`VPD Gauge: Invalid max_entity state (${maxEntityId}), using static fallback ${maxThreshold}`); } const segments = [ { from: gaugeMin, color: colorExtremeLow }, { from: staticLowThreshold, color: colorLow }, { from: minThreshold, color: colorGood }, { from: maxThreshold, color: colorHigh }, { from: staticHighThreshold, color: colorExtremeHigh }, ]; segments.sort((a, b) => a.from - b.from); const finalSegments = segments.filter((segment, index, arr) => { if (segment.from < gaugeMin) return false; if (index < arr.length - 1 && arr[index + 1].from === segment.from) { return false; } return true; }); if (finalSegments.length === 0 || finalSegments[0].from > gaugeMin) { let startingColor = colorExtremeLow; if (gaugeMin >= staticHighThreshold) startingColor = colorExtremeHigh; else if (gaugeMin >= maxThreshold) startingColor = colorHigh; else if (gaugeMin >= minThreshold) startingColor = colorGood; else if (gaugeMin >= staticLowThreshold) startingColor = colorLow; finalSegments.unshift({ from: gaugeMin, color: startingColor }); if ( finalSegments.length > 1 && finalSegments[1].from === finalSegments[0].from ) { finalSegments.shift(); } } /*console.log(`VPD Gauge (${config.entity}): MinT=${minThreshold}, MaxT=${maxThreshold}, Segments=`, finalSegments);*/ return finalSegments;
  };

  render() {
    // console.log("Render method called. Hass:", !!this.hass, "Config:", !!this.config);
    if (!this.hass || !this.config || !this.config[CONF_ENTITY]) return html`<ha-card><div class="warning">Config required</div></ha-card>`;
    const stateObj = this.hass.states[this.config[CONF_ENTITY]];
    const value = stateObj ? parseFloat(stateObj.state) : undefined;
    // console.log(`Rendering: Entity=${this.config[CONF_ENTITY]}, StateObj=`, stateObj, `Value=${value}`);
    if (stateObj === undefined) return html`<ha-card header="${this.config[CONF_NAME] || 'VPD'}"><div class="warning">Entity not found: ${this.config[CONF_ENTITY]}</div></ha-card>`;
    if (value === undefined || isNaN(value)) return html`<ha-card header="${this.config[CONF_NAME] || 'VPD'}"><div class="warning">Invalid state: ${stateObj.state}</div></ha-card>`;
    const calculatedSegments = this._calculateSegments();
    return html`
      <ha-card header="${this.config[CONF_NAME] || "VPD Gauge"}">
        <div class="card-content">
          <ha-gauge
            .value=${value}
            .min=${this.config.gauge_min ?? DEFAULT_GAUGE_MIN}
            .max=${this.config.gauge_max ?? DEFAULT_GAUGE_MAX}
            .segments=${calculatedSegments}
            needle /* Needle always on */
            style="--gauge-color: var(--primary-text-color);"
          ></ha-gauge>
        </div>
      </ha-card>
    `;
  }

  getCardSize() { return 3; }

  // Use whenDefined for Editor robustness
  static async getConfigElement() {
    // Ensure the editor element is defined before creating it
    await customElements.whenDefined('vpd-gauge-card-editor');
    console.log("getConfigElement: vpd-gauge-card-editor is defined, creating element.");
    return document.createElement('vpd-gauge-card-editor');
  }

  static getStubConfig(hass, entities, entitiesFallback) { /* Keep improved version */
    const vpdSensor = entities.find(e => e.startsWith("sensor.") && e.includes("vpd")) || entitiesFallback.find(e => e.startsWith("sensor.") && e.includes("vpd")); const baseNameGuess = vpdSensor ? vpdSensor.split('.').pop().replace('_vpd_mqtt', '').replace('_vpd', '') : null; const minEntity = entities.find(e => e.startsWith("number.") && e.includes("min") && (baseNameGuess ? e.includes(baseNameGuess) : true)) || entitiesFallback.find(e => e.startsWith("number.") && e.includes("min")); const maxEntity = entities.find(e => e.startsWith("number.") && e.includes("max") && (baseNameGuess ? e.includes(baseNameGuess) : true)) || entitiesFallback.find(e => e.startsWith("number.") && e.includes("max")); console.log("StubConfig Found: VPD=", vpdSensor, "Min=", minEntity, "Max=", maxEntity); return { type: "custom:vpd-gauge-card", entity: vpdSensor || "", min_entity: minEntity || "", max_entity: maxEntity || "", name: baseNameGuess ? `${baseNameGuess.replace(/_/g, ' ')} VPD Gauge` : "VPD Gauge" };
   }

  static get styles() { return css`ha-card{height:100%;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.card-content{display:flex;justify-content:center;align-items:center;padding:16px;flex-grow:1}ha-gauge{width:100%;max-width:250px;--gauge-color:var(--primary-text-color)}.warning{padding:16px;text-align:center;color:var(--error-color)}`; }
}

// Card Definition & Registration (Keep the check)
if (!customElements.get('vpd-gauge-card')) { customElements.define('vpd-gauge-card', VpdGaugeCard); console.info('%c VPD-GAUGE-CARD %c Loaded ', 'color: white; background: #039be5; font-weight: 700;', 'color: #039be5; background: white; font-weight: 700;'); }
// Card Picker Registration (Keep the check)
if (window.customCards && !window.customCards.some(card => card.type === 'vpd-gauge-card')) { window.customCards.push({ type: "vpd-gauge-card", name: "VPD Gauge Card", description: "A gauge card with dynamic segments based on min/max threshold entities.", preview: true, }); }

console.log("VPD Gauge Card Script Loaded Successfully");