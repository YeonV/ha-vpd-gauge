// src/vpd-gauge.js

import { LitElement, html, css } from 'lit';

// --- Import HA UI Elements Needed by EDITOR ---
// It's generally better to import these, even if HA loads them globally,
// as it makes dependencies explicit and helps bundlers.
// If these cause build errors with Vite/Rollup, you might need specific plugins
// or remove them and rely on global availability.
// import "home-assistant-frontend/src/components/ha-formfield.js";
// import "home-assistant-frontend/src/components/ha-switch.js";
// import "home-assistant-frontend/src/components/ha-textfield.js";
// import "home-assistant-frontend/src/components/entity/ha-entity-picker.js";
// import "home-assistant-frontend/src/components/ha-color-picker.js"; // Import color picker
// ---------------------------------------------

// --- Import HA Gauge (Attempt - May need path adjustment or removal) ---
// import "home-assistant-frontend/src/components/ha-gauge.js";
// --------------------------------------------------------------------

// --- Constants (Keep as before) ---
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
// == VPD Gauge Card Editor Element (Define BEFORE main card)          ==
// ======================================================================
class VpdGaugeCardEditor extends LitElement {
    static get properties() {
      return {
        hass: {},
        _config: {},
      };
    }

    setConfig(config) {
      console.log("Editor setConfig called with:", config);
      this._config = { ...config };
      // Load values *after* config is set and element is potentially rendered
      if (this.shadowRoot) { // Check if shadowRoot is available
        this.loadEditorValues();
      } else {
        // If shadowRoot isn't ready yet, wait for the element to update
        this.updateComplete.then(() => this.loadEditorValues());
      }
    }

    set hass(hass) {
        this._hass = hass;
        // Update hass in pickers if editor is already initialized
        if (this.shadowRoot && this._elements?.pickers) {
            Object.values(this._elements.pickers).forEach(picker => {
                if (picker) picker.hass = this._hass;
            });
        }
    }

    // Store references only once after first update
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._storeElementReferences();
        this._attachInputListeners();
        this.loadEditorValues(); // Load initial values after elements exist
    }


    // --- Element References ---
    _elements = {
        inputs: {},
        pickers: {},
        colors: {}
    };

     _storeElementReferences() {
        const root = this.shadowRoot;
        if (!root) return;
        this._elements.pickers.entity = root.querySelector('#entity');
        this._elements.pickers.min_entity = root.querySelector('#min_entity');
        this._elements.pickers.max_entity = root.querySelector('#max_entity');
        this._elements.inputs.name = root.querySelector('#name');
        this._elements.inputs.needle = root.querySelector('#needle');
        this._elements.inputs.gauge_min = root.querySelector('#gauge_min');
        this._elements.inputs.gauge_max = root.querySelector('#gauge_max');
        this._elements.inputs.static_low_threshold = root.querySelector('#static_low_threshold');
        this._elements.inputs.static_high_threshold = root.querySelector('#static_high_threshold');

        const colorGroups = ['extreme_low', 'low', 'good', 'high', 'extreme_high'];
        this._elements.colors = {};
        colorGroups.forEach(group => {
            this._elements.colors[group] = {
                // text: root.querySelector(`#${group}_text`), // Text field removed
                picker: root.querySelector(`#${group}_picker`)
            };
        });
    }

     _attachInputListeners() {
        if (!this._elements) return;
        // Pickers
        this._elements.pickers.entity?.addEventListener('value-changed', this._valueChanged.bind(this));
        this._elements.pickers.min_entity?.addEventListener('value-changed', this._valueChanged.bind(this));
        this._elements.pickers.max_entity?.addEventListener('value-changed', this._valueChanged.bind(this));
        // Inputs
        this._elements.inputs.name?.addEventListener('input', this._valueChanged.bind(this));
        this._elements.inputs.needle?.addEventListener('change', this._valueChanged.bind(this));
        this._elements.inputs.gauge_min?.addEventListener('input', this._valueChanged.bind(this));
        this._elements.inputs.gauge_max?.addEventListener('input', this._valueChanged.bind(this));
        this._elements.inputs.static_low_threshold?.addEventListener('input', this._valueChanged.bind(this));
        this._elements.inputs.static_high_threshold?.addEventListener('input', this._valueChanged.bind(this));
        // Color Pickers
        for (const group in this._elements.colors) {
            this._elements.colors[group].picker?.addEventListener('color-changed', this._colorChanged.bind(this));
        }
    }

     loadEditorValues() {
        if (!this._config || !this.shadowRoot || !this._elements) return;
        console.log("Loading editor values from:", this._config);

        // --- Pickers & Inputs ---
        if(this._elements.pickers.entity) this._elements.pickers.entity.value = this._config[CONF_ENTITY] || '';
        if(this._elements.pickers.min_entity) this._elements.pickers.min_entity.value = this._config[CONF_MIN_ENTITY] || '';
        if(this._elements.pickers.max_entity) this._elements.pickers.max_entity.value = this._config[CONF_MAX_ENTITY] || '';
        if(this._elements.inputs.name) this._elements.inputs.name.value = this._config[CONF_NAME] || '';
        if(this._elements.inputs.needle) this._elements.inputs.needle.checked = this._config[CONF_NEEDLE] !== false;
        if(this._elements.inputs.gauge_min) this._elements.inputs.gauge_min.value = this._config[CONF_GAUGE_MIN] ?? DEFAULT_GAUGE_MIN;
        if(this._elements.inputs.gauge_max) this._elements.inputs.gauge_max.value = this._config[CONF_GAUGE_MAX] ?? DEFAULT_GAUGE_MAX;
        if(this._elements.inputs.static_low_threshold) this._elements.inputs.static_low_threshold.value = this._config[CONF_STATIC_LOW_THRESHOLD] ?? DEFAULT_STATIC_LOW_THRESHOLD;
        if(this._elements.inputs.static_high_threshold) this._elements.inputs.static_high_threshold.value = this._config[CONF_STATIC_HIGH_THRESHOLD] ?? DEFAULT_STATIC_HIGH_THRESHOLD;

        // --- Colors ---
        for (const group in this._elements.colors) {
            const groupData = this._elements.colors[group];
            const configColor = this._config[`color_${group}`]; // Get value from config using const
            const defaultColor = this[`DEFAULT_COLOR_${group.toUpperCase()}`]; // Get default using const

            if (groupData.picker) {
                groupData.picker.value = configColor || defaultColor; // Set picker value
            }
        }
     }

    _valueChanged(ev) {
        if (!this._config || !this.hass) return;
        const target = ev.target;
        // Use dataset.configValue now for better clarity
        const configKey = target.dataset.configValue;
        let value = target.value;

        if (!configKey) {
            console.warn("No configValue dataset found for target:", target);
            return;
        }

        if (target.type === "checkbox") {
            value = target.checked;
        }
        if (target.type === "number") {
            // Allow empty string to clear optional number fields
            value = value === "" ? undefined : parseFloat(value);
        }
         // For entity pickers, the value is in ev.detail.value
        if (target.tagName === 'HA-ENTITY-PICKER' && ev.detail?.value !== undefined) {
            value = ev.detail.value;
        }


        if (value === undefined || value === "" || (typeof value === 'number' && isNaN(value))) {
            // Remove key if value is cleared/invalid, unless it's required
            if (configKey !== CONF_ENTITY && configKey !== CONF_MIN_ENTITY && configKey !== CONF_MAX_ENTITY) {
                 delete this._config[configKey];
            } else {
                 this._config[configKey] = ""; // Keep required keys but empty
            }
        } else {
            this._config[configKey] = value;
        }

        this.fireConfigChanged();
    }

     _colorChanged(ev) {
        if (!this._config || !this.hass) return;
        const target = ev.target;
        const configKey = target.dataset.configValue; // e.g., color_low
        const value = ev.detail.value; // ha-color-picker uses event.detail.value

        if (!configKey) return;

        if (value) {
            this._config[configKey] = value;
        } else {
            // If color is cleared, remove it from config to use default
            delete this._config[configKey];
        }
        this.fireConfigChanged();
    }


    fireConfigChanged() {
        const newConfig = { ...this._config }; // Shallow copy is enough here
        console.log("Firing config-changed with:", newConfig);
        const event = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    render() {
      if (!this._hass) { // Check hass presence early
        return html`<div>Waiting for Home Assistant connection...</div>`;
      }
      if (!this._config) {
         return html`<div>Waiting for configuration...</div>`;
      }

      // Pre-populate values for the form fields from the internal config copy
      // Needed if render happens before firstUpdated/loadEditorValues in some cases
      const name = this._config[CONF_NAME] || "";
      const entity = this._config[CONF_ENTITY] || "";
      const minEntity = this._config[CONF_MIN_ENTITY] || "";
      const maxEntity = this._config[CONF_MAX_ENTITY] || "";
      const needle = this._config[CONF_NEEDLE] !== false;
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
          <ha-entity-picker
            label="VPD Sensor Entity"
            .hass=${this._hass}
            .value=${entity}
            .configValue=${CONF_ENTITY} /* Use dataset for valueChanged */
            .dataset=${{ configValue: CONF_ENTITY }}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            required
            id="entity"
          ></ha-entity-picker>
          <ha-entity-picker
            label="Min Threshold Entity (Number)"
            .hass=${this._hass}
            .value=${minEntity}
            .dataset=${{ configValue: CONF_MIN_ENTITY }}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
            id="min_entity"
          ></ha-entity-picker>
          <ha-entity-picker
            label="Max Threshold Entity (Number)"
            .hass=${this._hass}
            .value=${maxEntity}
            .dataset=${{ configValue: CONF_MAX_ENTITY }}
            @value-changed=${this._valueChanged}
            .includeDomains=${["number"]}
            allow-custom-entity
            required
            id="max_entity"
          ></ha-entity-picker>

          <h3>Appearance</h3>
          <ha-textfield
            label="Name (Optional)"
            .value=${name}
            .dataset=${{ configValue: CONF_NAME }}
            @input=${this._valueChanged}
            id="name"
          ></ha-textfield>
          <ha-formfield .label=${`Show Needle: ${needle ? 'On' : 'Off'}`}>
              <ha-switch
              .checked=${needle}
              .dataset=${{ configValue: CONF_NEEDLE }}
              @change=${this._valueChanged}
              id="needle"
              ></ha-switch>
          </ha-formfield>

          <h3>Gauge Range & Static Thresholds</h3>
          <div class="side-by-side">
              <ha-textfield
                  label="Gauge Min Value"
                  type="number"
                  .value=${gaugeMin}
                  .dataset=${{ configValue: CONF_GAUGE_MIN }}
                  @input=${this._valueChanged}
                  step="0.01"
                  id="gauge_min"
              ></ha-textfield>
              <ha-textfield
                  label="Gauge Max Value"
                  type="number"
                  .value=${gaugeMax}
                  .dataset=${{ configValue: CONF_GAUGE_MAX }}
                  @input=${this._valueChanged}
                  step="0.01"
                  id="gauge_max"
              ></ha-textfield>
          </div>
           <div class="side-by-side">
              <ha-textfield
                  label="Static Low Threshold"
                  type="number"
                  .value=${staticLow}
                  .dataset=${{ configValue: CONF_STATIC_LOW_THRESHOLD }}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from Extreme Low to Low at this value"
                  id="static_low_threshold"
              ></ha-textfield>
              <ha-textfield
                  label="Static High Threshold"
                  type="number"
                  .value=${staticHigh}
                  .dataset=${{ configValue: CONF_STATIC_HIGH_THRESHOLD }}
                  @input=${this._valueChanged}
                  step="0.01"
                  title="Segment color changes from High to Extreme High at this value"
                  id="static_high_threshold"
              ></ha-textfield>
          </div>

           <h3>Segment Colors</h3>
           <div class="color-grid">
              <label>Extreme Low:</label>
              <ha-color-picker
                .value=${colorExtremeLow}
                .dataset=${{ configValue: CONF_COLOR_EXTREME_LOW }}
                @color-changed=${this._colorChanged}
                id="extreme_low_picker"
              ></ha-color-picker>

              <label>Low:</label>
              <ha-color-picker
                .value=${colorLow}
                .dataset=${{ configValue: CONF_COLOR_LOW }}
                @color-changed=${this._colorChanged}
                id="low_picker"
              ></ha-color-picker>

              <label>Good:</label>
              <ha-color-picker
                .value=${colorGood}
                .dataset=${{ configValue: CONF_COLOR_GOOD }}
                @color-changed=${this._colorChanged}
                id="good_picker"
              ></ha-color-picker>

              <label>High:</label>
              <ha-color-picker
                .value=${colorHigh}
                .dataset=${{ configValue: CONF_COLOR_HIGH }}
                @color-changed=${this._colorChanged}
                id="high_picker"
              ></ha-color-picker>

              <label>Extreme High:</label>
              <ha-color-picker
                .value=${colorExtremeHigh}
                .dataset=${{ configValue: CONF_COLOR_EXTREME_HIGH }}
                @color-changed=${this._colorChanged}
                id="extreme_high_picker"
              ></ha-color-picker>
           </div>
        </div>
      `;
    }

    static get styles() {
      return css`
        /* ... Keep styles as before ... */
        .card-config { display: flex; flex-direction: column; gap: 12px; }
        ha-entity-picker, ha-textfield, ha-formfield { display: block; }
        ha-switch { padding-top: 10px; }
        .side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; align-items: center; }
        h3 { margin-bottom: 0; margin-top: 8px; border-bottom: 1px solid var(--divider-color); padding-bottom: 4px;}
        label { text-align: right; padding-right: 8px; }
        ha-color-picker { width: 100%; /* Make picker take full width of cell */ }
      `;
    }
  }

// --- Editor Definition & Registration (Keep the check) ---
if (!customElements.get('vpd-gauge-card-editor')) {
    customElements.define('vpd-gauge-card-editor', VpdGaugeCardEditor);
    console.info('%c VPD-GAUGE-CARD-EDITOR %c Defined in main file ',
        'color: white; background: #039be5; font-weight: 700;',
        'color: #039be5; background: white; font-weight: 700;'
    );
} else { /* ... */ }


// --- Card Picker Registration (Keep the check) ---
if (window.customCards && !window.customCards.some(card => card.type === 'vpd-gauge-card')) {
     window.customCards.push({ /* ... */ });
}

// Log to confirm script loaded
console.log("VPD Gauge Card + Editor Script Loaded Successfully");