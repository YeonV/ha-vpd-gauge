import { LitElement, html, css } from 'lit';
  
  // Import HA frontend elements used in the editor
  // Adjust paths if necessary based on HA version or if using a local dev env
//   import "home-assistant-frontend/src/components/ha-formfield.js";
//   import "home-assistant-frontend/src/components/ha-switch.js";
//   import "home-assistant-frontend/src/components/ha-textfield.js";
//   import "home-assistant-frontend/src/components/entity/ha-entity-picker.js";
//   import "home-assistant-frontend/src/components/ha-color-picker.js"; // For color inputs
//   import "home-assistant-frontend/src/components/ha-select.js"; // If needed for dropdowns
  
  // Define constants for configuration keys (match vpd-gauge-card.js)
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
  
  // Default values (match vpd-gauge-card.js)
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
  static get properties() {
    return {
      hass: {}, // Home Assistant object
      _config: {}, // Internal copy of the configuration
    };
  }

  setConfig(config) { // <<< IS THIS METHOD PRESENT AND SPELLED CORRECTLY?
    console.log("Editor setConfig called with:", config); // Add log here
    this._config = { ...config };
    // Maybe call loadEditorValues explicitly if needed after first set?
    if (this._initialized) {
        this.loadEditorValues();
    }
  }

  // Helper function to handle changes in form elements
  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configKey = target.dataset.configValue; // Use dataset
    let value = target.value; // Default for textfield

    if (!configKey) {
      console.warn("No configValue dataset found for target:", target);
      return;
    }

    // --- Specific Handling for Switch ---
    if (target.tagName === "HA-SWITCH") { // Check tag name
        value = target.checked;
        console.log(`Switch Changed: Key=${configKey}, Checked State=${value}`); // Log switch state
    }
    // ------------------------------------
    else if (target.type === "number") { // Handle number fields
        value = value === "" ? undefined : parseFloat(value);
    }
    // For entity pickers, the value is in ev.detail.value
    else if (target.tagName === 'HA-ENTITY-PICKER' && ev.detail?.value !== undefined) {
        value = ev.detail.value;
    }
    // For regular text inputs (like name, colors for now) target.value is fine

    // Update config logic (handle undefined/empty to remove optional keys)
    if (value === undefined || value === "" || (typeof value === 'number' && isNaN(value))) {
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

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    // Pre-populate values for the form fields from the internal config copy
    const name = this._config[CONF_NAME] || "";
    const entity = this._config[CONF_ENTITY] || "";
    const minEntity = this._config[CONF_MIN_ENTITY] || "";
    const maxEntity = this._config[CONF_MAX_ENTITY] || "";
    // const needle = this._config[CONF_NEEDLE] !== false; // Default true if undefined
    const gaugeMin = this._config[CONF_GAUGE_MIN] ?? DEFAULT_GAUGE_MIN;
    const gaugeMax = this._config[CONF_GAUGE_MAX] ?? DEFAULT_GAUGE_MAX;
    const staticLow =
      this._config[CONF_STATIC_LOW_THRESHOLD] ?? DEFAULT_STATIC_LOW_THRESHOLD;
    const staticHigh =
      this._config[CONF_STATIC_HIGH_THRESHOLD] ?? DEFAULT_STATIC_HIGH_THRESHOLD;
    const colorExtremeLow =
      this._config[CONF_COLOR_EXTREME_LOW] || DEFAULT_COLOR_EXTREME_LOW;
    const colorLow = this._config[CONF_COLOR_LOW] || DEFAULT_COLOR_LOW;
    const colorGood = this._config[CONF_COLOR_GOOD] || DEFAULT_COLOR_GOOD;
    const colorHigh = this._config[CONF_COLOR_HIGH] || DEFAULT_COLOR_HIGH;
    const colorExtremeHigh =
      this._config[CONF_COLOR_EXTREME_HIGH] || DEFAULT_COLOR_EXTREME_HIGH;

    return html`
      <div class="card-config">
        <h3>Required Entities</h3>
        <ha-entity-picker
          label="VPD Sensor Entity"
          .hass=${this.hass}
          .value=${entity}
          .configValue=${CONF_ENTITY}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Min Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${minEntity}
          .configValue=${CONF_MIN_ENTITY}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>
        <ha-entity-picker
          label="Max Threshold Entity (Number)"
          .hass=${this.hass}
          .value=${maxEntity}
          .configValue=${CONF_MAX_ENTITY}
          @value-changed=${this._valueChanged}
          .includeDomains=${["number"]}
          allow-custom-entity
          required
        ></ha-entity-picker>

        <h3>Appearance</h3>
        <ha-textfield
          label="Name (Optional)"
          .value=${name}
          .configValue=${CONF_NAME}
          @input=${this._valueChanged}
        ></ha-textfield>

        <h3>Gauge Range & Static Thresholds</h3>
        <div class="side-by-side">
          <ha-textfield
            label="Gauge Min Value"
            type="number"
            .value=${gaugeMin}
            .configValue=${CONF_GAUGE_MIN}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
          <ha-textfield
            label="Gauge Max Value"
            type="number"
            .value=${gaugeMax}
            .configValue=${CONF_GAUGE_MAX}
            @input=${this._valueChanged}
            step="0.01"
          ></ha-textfield>
        </div>
        <div class="side-by-side">
          <ha-textfield
            label="Static Low Threshold"
            type="number"
            .value=${staticLow}
            .configValue=${CONF_STATIC_LOW_THRESHOLD}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from Extreme Low to Low at this value"
          ></ha-textfield>
          <ha-textfield
            label="Static High Threshold"
            type="number"
            .value=${staticHigh}
            .configValue=${CONF_STATIC_HIGH_THRESHOLD}
            @input=${this._valueChanged}
            step="0.01"
            title="Segment color changes from High to Extreme High at this value"
          ></ha-textfield>
        </div>

        <h3>Segment Colors</h3>
        <div class="color-grid">
          <label>Extreme Low:</label>
          <ha-textfield
            .value=${colorExtremeLow}
            .configValue=${CONF_COLOR_EXTREME_LOW}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Low:</label>
          <ha-textfield
            .value=${colorLow}
            .configValue=${CONF_COLOR_LOW}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Good:</label>
          <ha-textfield
            .value=${colorGood}
            .configValue=${CONF_COLOR_GOOD}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>High:</label>
          <ha-textfield
            .value=${colorHigh}
            .configValue=${CONF_COLOR_HIGH}
            @input=${this._valueChanged}
          ></ha-textfield>
          <label>Extreme High:</label>
          <ha-textfield
            .value=${colorExtremeHigh}
            .configValue=${CONF_COLOR_EXTREME_HIGH}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>
        <!-- Consider using ha-color-picker for a better UX, but textfield is simpler -->
      </div>
    `;
  }

  static get styles() {
    return css`
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