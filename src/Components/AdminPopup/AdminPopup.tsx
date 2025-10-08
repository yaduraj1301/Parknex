import React, { useState, useEffect } from "react";
import "./AdminPopup.css";

interface AdminPopupProps {
  mode: "add" | "edit";
  onClose: () => void;
  onSave: (adminData: any) => void;
  existingData?: any;
}

export const AdminPopup: React.FC<AdminPopupProps> = ({
  mode,
  onClose,
  onSave,
  existingData = {},
}) => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    email: "",
    phone: "",
    role: "Admin",
    building: "",
  });

  useEffect(() => {
    if (mode === "edit") {
      setFormData({
        name: existingData.name || "",
        empId: existingData.empId || "",
        email: existingData.email || "",
        phone: existingData.phone || "",
        role: existingData.role || "Admin",
        building: existingData.building || "",
      });
    }
  }, [existingData, mode]);

  // Handle form updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "role") {
      // If user changes role to "Super Admin", auto-assign all buildings
      if (value === "Super Admin") {
        setFormData((prev) => ({ ...prev, role: value, building: "All Buildings" }));
      } else {
        setFormData((prev) => ({ ...prev, role: value, building: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>{mode === "add" ? "➕ Add New Admin" : "✎ Edit Admin"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Admin Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Employee Id</label>
          <input
            type="text"
            name="empId"
            placeholder="Enter Employee Id"
            value={formData.empId}
            onChange={handleChange}
            required
          />

          <label>Email id</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Id"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone No</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          {/* Show Assigned Building only for Admins */}
          {formData.role === "Admin" && (
            <>
              <label>Assigned Building</label>
              <select
                name="building"
                value={formData.building}
                onChange={handleChange}
                required
              >
                <option value="">Select Building</option>
                <option value="Thejaswini, Trivandrum">Thejaswini, Trivandrum</option>
                <option value="Bhavani, Trivandrum">Bhavani, Trivandrum</option>
                <option value="Nila, Trivandrum">Nila, Trivandrum</option>
              </select>
            </>
          )}

          <div className="popup-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
