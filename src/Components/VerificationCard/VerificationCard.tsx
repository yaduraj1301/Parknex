import React from "react";
import "./verificationcard.css";

interface VerificationCardProps {
  id: string;
  name: string;
  email: string;
  empId: string;
  phone: string;
  slot: string;
  submittedAt: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  id,
  name,
  email,
  empId,
  phone,
  slot,
  submittedAt,
  onApprove,
  onReject,
}) => {
  return (
    <div className="verification-card">
      <div className="id-preview">ID Card Photo</div>

      <div className="verification-details">
        <p className="name">{name}</p>
        <p className="email">Email: <span>{email}</span></p>
        <p className="empId">Emp ID: <span>{empId}</span></p>
        <p className="phone">Phone: <span>{phone}</span></p>
        <p className="slot">Slot: <span>{slot}</span></p>
        <p className="submitted">Submitted: {submittedAt}</p>
      </div>

      <div className="action-buttons">
        <button className="approve-btn" onClick={() => onApprove(id)}>Approve</button>
        <button className="reject-btn" onClick={() => onReject(id)}>Reject</button>
      </div>
    </div>
  );
};
