import React, { useState } from "react";
import { VerificationCard } from "../../Components/VerificationCard/VerificationCard";
import "./pendingverifications.css";

interface Employee {
  id: number;
  name: string;
  email: string;
  empId: string;
  phone: string;
  slot: string;
  submittedAt: string;
  image?: string;
}

const sampleEmployees: Employee[] = [
  {
    id: 1,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    empId: "10023",
    phone: "+1 (555) 987-6543",
    slot: "A-42",
    submittedAt: "2024-07-17 10:30 AM",
  },
  {
    id: 2,
    name: "Emma Williams",
    email: "emma.williams@company.com",
    empId: "10025",
    phone: "+1 (555) 876-5432",
    slot: "B-15",
    submittedAt: "2024-07-17 11:45 AM",
  },
  {
    id: 3,
    name: "John Davis",
    email: "john.davis@company.com",
    empId: "10028",
    phone: "+1 (555) 765-2345",
    slot: "C-10",
    submittedAt: "2024-07-18 09:20 AM",
  },
];

export const PendingVerifications: React.FC = () => {
  const [verifiedEmployees, setVerifiedEmployees] = useState<Employee[]>([]);
  const [rejectedEmployees, setRejectedEmployees] = useState<Employee[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Employee[]>(sampleEmployees);

  const handleApprove = (emp: Employee) => {
    setVerifiedEmployees((prev) => [...prev, emp]);
    setPendingRequests((prev) => prev.filter((e) => e.id !== emp.id));
  };

  const handleReject = (emp: Employee) => {
    setRejectedEmployees((prev) => [...prev, emp]);
    setPendingRequests((prev) => prev.filter((e) => e.id !== emp.id));
  };

  const handleVerifyAll = () => {
    setVerifiedEmployees((prev) => [...prev, ...pendingRequests]);
    setPendingRequests([]);
  };

  const handleRejectAll = () => {
    setRejectedEmployees((prev) => [...prev, ...pendingRequests]);
    setPendingRequests([]);
  };

  return (
    <div className="verification-container">
      <div className="header">
        <h3>Pending Verifications</h3>
        <div className="actions">
          <button className="verify-all" onClick={handleVerifyAll}>
            ✅ Verify All
          </button>
          <button className="reject-all" onClick={handleRejectAll}>
            ❌ Reject All
          </button>
        </div>
      </div>

      {/* Scrollable pending section */}
      <div className="cards-scroll">
        {pendingRequests.length === 0 ? (
          <p className="empty-state">No pending requests.</p>
        ) : (
          pendingRequests.map((emp) => (
            <VerificationCard
              key={emp.id}
              employee={emp}
              onApprove={() => handleApprove(emp)}
              onReject={() => handleReject(emp)}
            />
          ))
        )}
      </div>

      {/* Summary Section */}
      <div className="summary">
        <p>✅ Verified: {verifiedEmployees.length}</p>
        <p>❌ Rejected: {rejectedEmployees.length}</p>
        <p>🕓 Pending: {pendingRequests.length}</p>
      </div>
    </div>
  );
};
