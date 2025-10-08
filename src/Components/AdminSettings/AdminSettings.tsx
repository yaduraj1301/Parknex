import React, { useState } from "react";
import { Table } from "../Table/table";
import "./adminSettings.css";
import { Pencil, Trash2 } from "lucide-react";
import { AdminPopup } from "../AdminPopup/AdminPopup"; // 👈 create this file (shown below)

export function AdminSettings() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "empId", label: "Emp Id" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    { key: "building", label: "Assigned Building/Floor" },
    { key: "action", label: "Action" },
  ];

  const [admins, setAdmins] = useState([
    {
      empId: "E001",
      name: "Manish Das",
      email: "manish.admin@company.com",
      phone: "+91 9876543210",
      role: "Super Admin",
      building: "All Buildings",
    },
    {
      empId: "E005",
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+91 9998877766",
      role: "Admin",
      building: "Thejaswini, Trivandrum",
    },
    {
      empId: "E010",
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+91 9998877766",
      role: "Admin",
      building: "Thejaswini, Trivandrum",
    },
    {
      empId: "E015",
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+91 9998877766",
      role: "Admin",
      building: "Thejaswini, Trivandrum",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleAdd = () => {
    setEditData(null);
    setShowPopup(true);
  };

  const handleEdit = (admin: any) => {
    setEditData(admin);
    setShowPopup(true);
  };

  const handleSave = (data: any) => {
    if (editData) {
      // Update existing admin
      setAdmins((prev) =>
        prev.map((a) => (a.empId === editData.empId ? { ...a, ...data } : a))
      );
    } else {
      // Add new admin
      const newAdmin = { ...data }; // Remove id generation since empId comes from form
      setAdmins((prev) => [...prev, newAdmin]);
    }
    setShowPopup(false);
  };

  const handleDelete = (empId: string) => {
    setAdmins(admins.filter((a) => a.empId !== empId));
  };

  // Inject custom Action buttons per row
  const dataWithActions = admins.map((admin) => ({
    ...admin,
    action: (
      <div className="admin-action-buttons">
        <button
          className="edit-btn"
          onClick={() => handleEdit(admin)}
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDelete(admin.empId)}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="admin-settings">

      <Table
        title="Admin Management"
        description="Manage administrative accounts and permissions"
        columns={columns}
        data={dataWithActions}
        searchPlaceholder="Search Admins..."
        showAddButton = {true}
        addButtonLabel="+ Add Admin"
        onAddClick={handleAdd}
        rowsPerPage={5}
      />

      {/* Popup Overlay */}
      {showPopup && (
        <AdminPopup
          mode={editData ? "edit" : "add"}
          existingData={editData || {}}
          onClose={() => setShowPopup(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
