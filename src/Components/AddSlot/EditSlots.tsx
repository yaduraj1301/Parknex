import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { ParkingSlot, SlotStatus } from "../../Types/ParkingTypes";
import "./editslots.css";

interface EditModalProps {
  slot: ParkingSlot;
  onClose: () => void;
  onSave: (updatedSlot: ParkingSlot) => void;
}

export const EditSlots: React.FC<EditModalProps> = ({
  slot,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ParkingSlot>(slot);

  useEffect(() => {
    setFormData(slot);
  }, [slot]);

  const handleChange = (field: keyof ParkingSlot, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Mark this slot as unavailable?")) {
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
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>Edit Parking Slot</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Prefix & Slot ID */}
            <div className="form-row">
              <div className="form-group">
                <label>Prefix</label>
                <input
                  type="text"
                  value={formData.prefix || ""}
                  onChange={(e) => handleChange("prefix", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Slot ID</label>
                <input type="text" value={formData.id} disabled />
              </div>
            </div>

            {/* Building */}
            <div className="form-group">
              <label>Building</label>
              <select
                value={formData.building || ""}
                onChange={(e) => handleChange("building", e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Athulya, Kochi">Athulya, Kochi</option>
                <option value="Gayatri, Trivandrum">Gayatri, Trivandrum</option>
                <option value="Thejaswini, Trivandrum">
                  Thejaswini, Trivandrum
                </option>
              </select>
            </div>

            {/* Block & Level */}
            <div className="form-row">
              <div className="form-group">
                <label>Block</label>
                <input
                  type="text"
                  value={formData.block || ""}
                  onChange={(e) => handleChange("block", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Level</label>
                <input
                  type="text"
                  value={formData.level || ""}
                  onChange={(e) => handleChange("level", e.target.value)}
                />
              </div>
            </div>

            {/* Status & Is Special */}
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select
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
              <div className="form-group">
                <label>Is Special</label>
                <select
                  value={formData.isSpecial ? "Yes" : "No"}
                  onChange={(e) =>
                    handleChange("isSpecial", e.target.value === "Yes")
                  }
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes (EV / Handicapped)</option>
                </select>
              </div>
            </div>

            {/* Employee Name */}
            {formData.status === "named" && (
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  value={formData.namedFor || ""}
                  onChange={(e) => handleChange("namedFor", e.target.value)}
                  placeholder="Enter employee name"
                />
              </div>
            )}

            {/* Notes */}
            {formData.isSpecial && (
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
            )}
          </form>
        </div>

        {/* Footer */}

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={handleDelete}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-submit"
            onClick={() => {
              // Call the parent handler with the updated slot
              onSave(formData);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
