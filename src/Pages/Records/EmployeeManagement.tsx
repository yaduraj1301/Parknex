import { useState } from "react";
import {
  Users,
  Car,
  Phone,
  ShieldCheck,
  Building2,
  CalendarCheck,
} from "lucide-react";
import { Table } from "../../Components/Table/table";
import { EmployeePopup } from "../../Components/EmployeePopUP/EmployeePopup";
import "./EmployeeManagement.css";

export function EmployeeManagement() {
  const columns = [
    { key: "employeeId", label: "EMPLOYEE ID", sortable: true },
    { key: "name", label: "NAME", sortable: true },
    { key: "email", label: "EMAIL" },
    { key: "building", label: "BUILDING" },
    { key: "phone", label: "PHONE" },
    { key: "vehicle_no", label: "VEHICLE NO" },
  ];

  const data = Array.from({ length: 20 }, (_, i) => ({
    employeeId: 10020 + i,
    name: "John Doe",
    email: "john@example.com",
    building: "Thejaswini, Trivandrum",
    phone: "+1234567890",
    vehicle_no: "KL 08 Q 3738",
    vehicles: [
      "KL 08 Q 3738 Maruti 800 White",
      "KL 08 Q 4738 Honda City Black",
    ],
    authorized: "18/03/2019",
    department: "DES",
  }));

  const [file, setFile] = useState<File | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const handleAddEmployeeClick = () => {
    setShowAddEmployeeModal(true);
  };

  const handleAddEmployeeSave = (newEmployee: any) => {
    // Normally, you'd update API or state here
    console.log("New Employee Added:", newEmployee);
    setShowAddEmployeeModal(false);
  };

  const handleRowClick = (rowData: any) => {
    setSelectedEmployee(rowData);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-management">
      <div className="employee-table-section">
        <Table
          title="Employee Details"
          description="View and manage"
          columns={columns}
          data={data}
          searchPlaceholder="Search by name, email, or ID"
          rowsPerPage={10}
          showAddButton={true}
          addButtonLabel="+ Add Employee"
          onAddClick={handleAddEmployeeClick}
          onRowClick={handleRowClick}
          showFilter
        />
      </div>

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
                <strong>Drop file</strong> or{" "}
                <label htmlFor="file-upload" className="browse-text">
                  Browse
                </label>
                <br />
                Format: .csv, .xlsx (max 25 MB)
              </p>
            )}

            <input
              id="file-upload"
              type="file"
              accept=".csv, .xlsx"
              style={{ display: "none" }}
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

        {/* Stats Section */}
        <div className="records-stats-card">
          <div className="records-stats-header">
            <div className="records-stats-title">
              <Users size={28} className="icon" />
              <div>
                <h3>Employee Statistics</h3>
                <p>Overview of registered employees</p>
              </div>
            </div>
          </div>

          <div className="records-stats-section">
            <div className="records-stat-row">
              <div>
                <h4>Total Employees</h4>
                <p>All registered users</p>
              </div>
              <div className="records-stat-value-circle">1650</div>
            </div>

            <hr className="light-divider" />

            <div className="records-stat-row">
              <div>
                <h4>Latest Upload</h4>
                <p>Most recent data entry</p>
              </div>
              <span className="records-stat-date">2024-01-16</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="profile-section">
                <img
                  src="https://alchetron.com/cdn/john-doe-musician-8ffff17f-5d57-4345-bda0-090736fdb6f-resize-750.jpeg"
                  alt="profile"
                  className="profile-pic"
                />
                <div>
                  <h2>{selectedEmployee.name}</h2>
                  <p>ID: {selectedEmployee.employeeId}</p>
                </div>
              </div>
              <span className="status-badge">
                <ShieldCheck size={16} /> Authorized
              </span>
            </div>

            <div className="modal-section">
              <div className="pop-h">
                <Car size={18} /> VEHICLE INFORMATION
              </div>
              <ul>
                {selectedEmployee.vehicles.map((v: string, idx: number) => (
                  <li key={idx}>{v}</li>
                ))}
              </ul>
            </div>

            <hr className="light-divider" />

            <div className="modal-section">
              <div className="pop-h">
                <Phone size={18} /> CONTACT INFORMATION
              </div>
              <p>
                <span className="medium">Phone:</span> {selectedEmployee.phone}
              </p>
              <p>
                <span className="medium">Email:</span> {selectedEmployee.email}
              </p>
            </div>

            <hr className="light-divider" />

            <div className="modal-section">
              <div className="pop-h">
                <CalendarCheck size={18} /> AUTHORIZATION DETAILS
              </div>
              <p>
                <span className="medium">Authorized On:</span>{" "}
                {selectedEmployee.authorized}
              </p>
            </div>

            <hr className="light-divider" />

            <div className="modal-section">
              <div className="pop-h">
                <Building2 size={18} /> LOCATION INFORMATION
              </div>
              <p>{selectedEmployee.building}</p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add Employee Popup */}
      {showAddEmployeeModal && (
        <EmployeePopup
          onClose={() => setShowAddEmployeeModal(false)}
          onSave={handleAddEmployeeSave}
        />
      )}
    </div>
  );
}
