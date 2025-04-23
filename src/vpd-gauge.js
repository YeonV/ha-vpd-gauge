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

    // Store configuration
    this.config = {
      needle: true, // Default needle to true
      gauge_min: DEFAULT_GAUGE_MIN,
      gauge_max: DEFAULT_GAUGE_MAX,
      static_low_threshold: DEFAULT_STATIC_LOW_THRESHOLD,
      static_high_threshold: DEFAULT_STATIC_HIGH_THRESHOLD,
      color_extreme_low: DEFAULT_COLOR_EXTREME_LOW,
      color_low: DEFAULT_COLOR_LOW,
      color_good: DEFAULT_COLOR_GOOD,
      color_high: DEFAULT_COLOR_HIGH,
      color_extreme_high: DEFAULT_COLOR_EXTREME_HIGH,
      ...config, // Merge user config, overriding defaults
    };
    console.log("VPD Gauge Card Config Set:", this.config);
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
if (!customElements.get('vpd-gauge-card')) {
  customElements.define('vpd-gauge-card', VpdGaugeCard);
  // Log registration only if it actually happens
  console.info('%c VPD-GAUGE-CARD %c Loaded ',
      'color: white; background: #039be5; font-weight: 700;',
      'color: #039be5; background: white; font-weight: 700;'
  );
} else {
  console.warn("Attempted to redefine vpd-gauge-card. Skipping.");
}


// Add card to Lovelace custom card picker (if not already present)
// This should ideally only run once as well, though less critical than define
if (window.customCards && !window.customCards.some(card => card.type === 'vpd-gauge-card')) {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "vpd-gauge-card", // Matches customElements.define
    name: "VPD Gauge Card",
    description: "A gauge card with dynamic segments based on min/max threshold entities.",
    preview: true, // Enable preview in card picker
    // documentationURL: "URL_TO_YOUR_REPO_OR_DOCS" // Optional
  });
}
