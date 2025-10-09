import React from "react";
import { Check, X } from "lucide-react";
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
        <div className="image-placeholder">
          <img src="src/assets/react.svg" alt="ID Card Photo" />
        </div>
      </div>
      <div className="card-center">
        <p className="name">{employee.name}</p>
        <p className="employee-details">
          <span className="label">Email:</span> {employee.email}
        </p>
        <p className="employee-details">
          <span className="label">Emp ID:</span> {employee.empId}
        </p>
        <p className="employee-details">
          <span className="label">Phone:</span> {employee.phone}
        </p>
        <p className="employee-details">
          <span className="label">Slot:</span> {employee.slot} –{" "}
          <span className="label">Submitted:</span> {employee.submittedAt}
        </p>
      </div>
      <div className="card-right">
        <button className="verification-btn approve" onClick={onApprove}>
          <Check width={16} height={16} />
          Approve
        </button>
        <button className="verification-btn reject" onClick={onReject}>
          <X width={16} height={16} />
          Reject
        </button>
      </div>
    </div>
  );
};
