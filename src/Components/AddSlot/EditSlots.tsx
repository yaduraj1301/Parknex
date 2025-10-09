import React, { useState } from "react";
import { X } from "lucide-react";
import type { ParkingSlot, SlotStatus } from "../../Types/ParkingTypes";
import "./editslots.css";

interface EditModalProps {
  slot: ParkingSlot;
  onClose: () => void;
  onSave: (updatedSlot: ParkingSlot) => void;
}

export const EditSlots: React.FC<EditModalProps> = ({ slot, onClose, onSave }) => {
  const [formData, setFormData] = useState<ParkingSlot>(slot);

  const handleChange = (field: keyof ParkingSlot, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to mark this spot as unavailable?")) {
      onSave({
        ...formData,
        status: "unavailable",
        namedFor: undefined,
        notes: "",
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Edit Parking Slot</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* ID (read-only) */}
          <div className="modal-form-group">
            <label className="modal-form-label">Spot ID</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.id}
              disabled
            />
          </div>

          {/* Status */}
          <div className="modal-form-group">
            <label className="modal-form-label">Status</label>
            <select
              className="modal-form-select"
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value as SlotStatus)
              }
            >
              <option value="free">Free</option>
              <option value="booked">Booked</option>
              <option value="reserved">Reserved</option>
              <option value="unavailable">Unavailable</option>
              <option value="named">Named</option>
            </select>
          </div>

          {/* Named For (only when status = named) */}
          {formData.status === "named" && (
            <div className="modal-form-group">
              <label className="modal-form-label">Employee Name</label>
              <input
                type="text"
                className="modal-form-input"
                value={formData.namedFor || ""}
                onChange={(e) => handleChange("namedFor", e.target.value)}
                placeholder="Enter employee name"
              />
            </div>
          )}

          {/* Building */}
          <div className="modal-form-group">
            <label className="modal-form-label">Building</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.building || ""}
              onChange={(e) => handleChange("building", e.target.value)}
              placeholder="e.g., Athulya, Kochi"
            />
          </div>

          {/* Block */}
          <div className="modal-form-group">
            <label className="modal-form-label">Block</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.block || ""}
              onChange={(e) => handleChange("block", e.target.value)}
              placeholder="e.g., Block A"
            />
          </div>

          {/* Level */}
          <div className="modal-form-group">
            <label className="modal-form-label">Level</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.level || ""}
              onChange={(e) => handleChange("level", e.target.value)}
              placeholder="e.g., L1"
            />
          </div>

          {/* Prefix */}
          <div className="modal-form-group">
            <label className="modal-form-label">Prefix</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.prefix || ""}
              onChange={(e) => handleChange("prefix", e.target.value)}
              placeholder="e.g., AT-A"
            />
          </div>

          {/* Notes */}
          <div className="modal-form-group">
            <label className="modal-form-label">Notes</label>
            <textarea
              className="modal-form-input"
              value={formData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any extra notes..."
            />
          </div>

          {/* Is Special */}
          <div className="modal-form-group checkbox">
            <label className="modal-form-label">
              <input
                type="checkbox"
                checked={formData.isSpecial || false}
                onChange={(e) => handleChange("isSpecial", e.target.checked)}
              />
              Special Slot (EV / Handicapped)
            </label>
          </div>

          {/* Buttons */}
          <div className="modal-actions">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Mark Unavailable
            </button>
            <button type="submit" className="btn btn-secondary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
