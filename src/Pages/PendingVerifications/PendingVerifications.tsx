import React, { useState } from "react";
import { VerificationCard } from "../../Components/VerificationCard/VerificationCard";
import "./pendingverifications.css";

interface Employee {
  id: string;
  name: string;
  email: string;
  empId: string;
  phone: string;
  slot: string;
  submittedAt: string;
}

export const PendingVerifications: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      empId: "10023",
      phone: "+1 (555) 987-6543",
      slot: "A-42",
      submittedAt: "2024-07-17 10:30 AM",
    },
    {
      id: "2",
      name: "Emma Williams",
      email: "emma.williams@company.com",
      empId: "10025",
      phone: "+1 (555) 876-5432",
      slot: "B-15",
      submittedAt: "2024-07-17 11:45 AM",
    },
  ]);

  const [verifiedEmployees, setVerifiedEmployees] = useState<Employee[]>([]);

  const handleApprove = (id: string) => {
    const approvedEmp = employees.find((emp) => emp.id === id);
    if (approvedEmp) {
      setVerifiedEmployees((prev) => [...prev, approvedEmp]);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleReject = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleVerifyAll = () => {
    setVerifiedEmployees((prev) => [...prev, ...employees]);
    setEmployees([]);
  };

  const handleRejectAll = () => {
    setEmployees([]);
  };

  return (
    <div className="pending-verifications">
      <div className="header">
        <h3>Pending Verifications</h3>
        <div className="header-buttons">
          <button className="verify-all-btn" onClick={handleVerifyAll}>
            ✅ Verify All
          </button>
          <button className="reject-all-btn" onClick={handleRejectAll}>
            ❌ Reject All
          </button>
        </div>
      </div>

      <div className="verification-list">
        {employees.length > 0 ? (
          employees.map((emp) => (
            <VerificationCard
              key={emp.id}
              {...emp}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        ) : (
          <p className="no-pending">No pending verifications.</p>
        )}
      </div>

      <div className="verified-list">
        {verifiedEmployees.length > 0 && (
          <>
            <h4>✅ Verified Employees:</h4>
            <ul>
              {verifiedEmployees.map((emp) => (
                <li key={emp.id}>{emp.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
