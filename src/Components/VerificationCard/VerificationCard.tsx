import React from "react";
import "./verificationcard.css";

interface Employee {
  name: string;
  email: string;
  empId: string;
  phone: string;
  slot: string;
  submittedAt: string;
  image?: string;
}

interface VerificationCardProps {
  employee: Employee;
  onApprove: () => void;
  onReject: () => void;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  employee,
  onApprove,
  onReject,
}) => {
  return (
    <div className="verification-card">
      <div className="card-left">
        <div className="image-placeholder">ID Card Photo</div>
      </div>
      <div className="card-center">
        <p className="name">{employee.name}</p>
        <p>Email: {employee.email}</p>
        <p>Emp ID: {employee.empId}</p>
        <p>Phone: {employee.phone}</p>
        <p>
          Slot: {employee.slot} – Submitted: {employee.submittedAt}
        </p>
      </div>
      <div className="card-right">
        <button className="approve" onClick={onApprove}>
          Approve
        </button>
        <button className="reject" onClick={onReject}>
          Reject
        </button>
      </div>
    </div>
  );
};
