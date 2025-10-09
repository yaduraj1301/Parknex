import React, { useState, useEffect } from "react";
import "./AddSlotModal.css";

interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SlotFormData) => void;
  selectedBuilding: string;
}

interface SlotFormData {
  building: string;
  level: string;
  block: string;
  prefix: string;
  slotNumber: string;
  status: string;
  isSpecial: boolean;
  notes: string;
  employeeName: string;
  employeePhoneNumber: string;
}

export const AddSlotModal: React.FC<AddSlotModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedBuilding,
}) => {
  const [formData, setFormData] = useState<SlotFormData>({
    building: "",
    level: "Level 0",
    block: "",
    prefix: "Kat-A",
    slotNumber: "",
    status: "Available",
    isSpecial: false,
    notes: "",
    employeeName: "",
    employeePhoneNumber: "",
  });

  useEffect(() => {
    // Prevent background scroll
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedBuilding) {
      setFormData((prev) => ({
        ...prev,
        building: selectedBuilding,
      }));
    }
  }, [isOpen, selectedBuilding]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "isSpecial") {
      setFormData({ ...formData, isSpecial: value === "Yes" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <h2>+ Add New Slot</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <form className="modal-form" onSubmit={handleSubmit}>
            {/* Building */}
            <div className="form-group">
              <label>Building</label>
              <select
                name="building"
                value={formData.building}
                onChange={handleChange}
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

            {/* Level & Block */}
            <div className="form-row">
              <div className="form-group">
                <label>Select Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="Level 0">Level 0</option>
                  <option value="Level 1">Level 1</option>
                </select>
              </div>
              <div className="form-group">
                <label>Block name</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                >
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                </select>
              </div>
            </div>

            {/* Prefix & Slot Number */}
            <div className="form-row">
              <div className="form-group">
                <label>Prefix</label>
                <input
                  type="text"
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Slot Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="slotNumber"
                  value={formData.slotNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Status & Special */}
            <div className="form-row">
              <div className="form-group">
                <label>Initial Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Reserved</option>
                  <option>Named</option>
                </select>
              </div>
              <div className="form-group">
                <label>Is Special</label>
                <select
                  name="isSpecial"
                  value={formData.isSpecial ? "Yes" : "No"}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Named Slot — Employee Details */}
            {formData.status === "Named" && (
              <>
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Employee Phone Number</label>
                  <input
                    type="tel"
                    name="employeePhoneNumber"
                    value={formData.employeePhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
                    required
                  />
                </div>
              </>
            )}

            {/* Notes — only visible if isSpecial = true */}
            {formData.isSpecial && (
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Pillar, Corner, EV Slot, Handicapped Slot"
                />
              </div>
            )}
          </form>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            form="slotForm"
            className="btn-submit"
            onClick={handleSubmit}
          >
            Add Slot
          </button>
        </div>
      </div>
    </div>
  );
};
