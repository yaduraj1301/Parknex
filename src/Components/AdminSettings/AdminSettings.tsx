import React, { useState } from "react";
import { Table } from "../Table/table";
import "./adminSettings.css";
import { Pencil, Trash2 } from "lucide-react";

export function AdminSettings() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    { key: "building", label: "Assigned Building/Floor" },
    { key: "action", label: "Action" },
  ];

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Manish Das",
      email: "john.admin@company.com",
      phone: "+1234-567",
      role: "Super Admin",
      building: "All Buildings",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+1234-567",
      role: "Super Admin",
      building: "All Buildings",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+1234-567",
      role: "Super Admin",
      building: "All Buildings",
    },
    {
      id: 4,
      name: "John Smith",
      email: "john.admin@company.com",
      phone: "+1234-567",
      role: "Super Admin",
      building: "All Buildings",
    },
  ]);

  const handleDelete = (id: number) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  // Inject custom Action buttons per row
  const dataWithActions = admins.map((admin) => ({
    ...admin,
    action: (
      <div className="admin-action-buttons">
        <button className="edit-btn">
          <Pencil size={16} />
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDelete(admin.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="admin-settings">
      <div className="admin-settings-header">
        <div>
          <h3>Admin Management</h3>
          <p>Manage administrative accounts and permissions</p>
        </div>
        <button className="add-admin-btn">+ Add Admin</button>
      </div>

      <Table
        title=""
        columns={columns}
        data={dataWithActions}
        description=""
        searchPlaceholder="Search Admins..."
        rowsPerPage={5}
      />
    </div>
  );
}
