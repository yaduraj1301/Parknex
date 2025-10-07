import React, { useState } from "react";
import { Table } from "../../Components/Table/table";
import "./EmployeeManagement.css";

export function EmployeeManagement() {
  const columns = [
    { key: "employeeId", label: "EMPLOYEE ID" },
    { key: "name", label: "NAME" },
    { key: "email", label: "EMAIL" },
    { key: "department", label: "DEPARTMENT" },
    { key: "building", label: "BUILDING" },
    { key: "phone", label: "PHONE" },
    { key: "status", label: "STATUS" },
  ];

  const data = Array.from({ length: 20 }, (_, i) => ({
    employeeId: 10020 + i,
    name: "John Doe",
    email: "john@example.com",
    department: i % 2 === 0 ? "DTS" : "DES",
    building: "Thejaswini, Trivandrum",
    phone: "+1234567890",
    status: "Active",
  }));

  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="employee-management">
      {/* Top Grid: Upload + Stats */}
      <div>
        <div className="employee-table-section">
          <Table
            title="Employee Details"
            description="View and manage all registered employees"
            columns={columns}
            data={data}
            searchPlaceholder="Search by name, email, or ID"
            rowsPerPage={10}
            showAddButton={true}
            addButtonLabel="+ Add Employee"
            onAddClick={() => console.log("Add employee clicked")}
          />
        </div>
      </div>
      <div>
        <div className="employee-top-section">
          {/* Upload Section */}
          <div className="upload-card">
            <div className="upload-header">
              <h3>Upload Employee Details</h3>
              <button className="download-btn">Download Template</button>
            </div>

            <div
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const uploadedFile = e.dataTransfer.files[0];
                if (uploadedFile) setFile(uploadedFile);
              }}
            >
              {file ? (
                <p className="uploaded-file">{file.name}</p>
              ) : (
                <p>
                  <strong>Drop file</strong> or <span>Browse</span>
                  <br />
                  Format: .csv, .xlsx (max 25 MB)
                </p>
              )}
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={(e) =>
                  e.target.files?.[0] && setFile(e.target.files[0])
                }
              />
            </div>

            <div className="upload-actions">
              <button className="cancel-btn">Cancel</button>
              <button className="done-btn">Done</button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="stats-card">
            <h3>Employee Statistics</h3>
            <p>Overview of registered employees in the system</p>
            <div className="stats-content">
              <div>
                <h4>Total Employees</h4>
                <span className="big-number">1650</span>
              </div>
              <div>
                <h4>Last Upload</h4>
                <p>2024-01-16</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
      </div>
    </div>
  );
}
