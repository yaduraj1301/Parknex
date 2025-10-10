import React, { useState } from "react";
import "./EmployeePopup.css";

interface EmployeePopupProps {
  onClose: () => void;
  onSave: (employeeData: any) => void;
}

export const EmployeePopup: React.FC<EmployeePopupProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    phone: "",
    building: "",
    vehicleNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h3>➕ Add New Employee</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          <label>Employee ID</label>
          <input
            type="text"
            name="empId"
            placeholder="Enter Employee ID"
            value={formData.empId}
            onChange={handleChange}
            required
          />

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Building</label>
          <select
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
          >
            <option value="">Select Building</option>
            <option value="Thejaswini, Trivandrum">
              Thejaswini, Trivandrum
            </option>
            <option value="Bhavani, Trivandrum">Bhavani, Trivandrum</option>
            <option value="Nila, Trivandrum">Nila, Trivandrum</option>
          </select>

          <label>Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Enter Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
          />

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
