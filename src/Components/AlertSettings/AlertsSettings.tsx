import React, { useState } from "react";
import "./alertsSettings.css";

export const AlertsSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState("5");
  const [escalateThreshold, setEscalateThreshold] = useState("30");
  const [escalationType, setEscalationType] = useState("minutes");

  const handleSave = () => {
    const settingsData = {
      emailNotifications,
      whatsappNotifications,
      alertThreshold,
      escalationType,
    };
    console.log("Saved alert settings:", settingsData);
    alert("Alert settings saved successfully!");
  };

  return (
    <div className="alerts-container">
      <h3>Notifications & Alerts</h3>
      <p className="subtitle">
        Configure notification channels and alert thresholds
      </p>

      {/* Notification Channels */}
      <div className="alert-section">
        <h4>Notification Channels</h4>
        <div className="toggle-row">
          <label>
            <div className="toggle-label">Email Notifications</div>
            <div className="toggle-subtext">Receive alerts via Email </div>
          </label>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="toggle-row">
          <label>
            <div className="toggle-label">WhatsApp Notifications</div>
            <div className="toggle-subtext">Receive alerts via WhatsApp </div>
          </label>
          <label className="switch">
            <input
              type="checkbox"
              checked={whatsappNotifications}
              onChange={(e) => setWhatsappNotifications(e.target.checked)}
            />
            <span className="slider" />
          </label>
        </div>
      </div>

      {/* Alert Timing */}
      <div className="alert-section">
        <h4>Alert Timing Threshold</h4>

        <div className="alert-threshold">
          <div className="alert-threshold-item">
            <h3>Unauthorised Access Alert</h3>
            <div className="input-row">
              <input
                type="number"
                min="1"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
              />
              <span id="minute">minutes</span>
            </div>
            <p className="hint">Trigger alert to users after unauthorized parking attempt</p>
          </div>
          <div className="alert-threshold-item">
            <h3>Escalation Alert</h3>
            <div className="input-row">
              <input
                type="number"
                min="1"
                value={escalateThreshold}
                onChange={(e) => setEscalateThreshold(e.target.value)}
              />
              <span id="minute">minutes</span>
            </div>
            <p className="hint">Escalate unresolved issues to admin</p>
          </div>
        </div>
        
      </div>

      <div className="actions">
        <button className="save-btn" onClick={handleSave}>
          Confirm Changes
        </button>
      </div>
    </div>
  );
};
