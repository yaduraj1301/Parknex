import React from "react";
import "./ReservationCard.css";

interface ReservationCardProps {
  name: string;
  slotNumber: string;
  time: string;
  reservationId: string;
  status: "today" | "tomorrow" | "upcoming";
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  name,
  slotNumber,
  time,
  reservationId,
  status,
}) => {
  const getStatusLabel = () => {
    switch (status) {
      case "today":
        return "Today";
      case "tomorrow":
        return "Tomorrow";
      default:
        return "Upcoming";
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "today":
        return "status-today";
      case "tomorrow":
        return "status-tomorrow";
      default:
        return "status-upcoming";
    }
  };

  return (
    <div className="reservation-card">
      <div className="reservation-main">
        <div className="reservation-info">
          <div className="name-status">
            <span className="reservation-name">{name}</span>
            <span className={`reservation-status ${getStatusClass()}`}>
              {getStatusLabel()}
            </span>
          </div>
          <div className="reservation-details">
            <span className="slot-number">Slot {slotNumber}</span>
            <span className="time">{time}</span>
          </div>
        </div>
        <div className="reservation-id">{reservationId}</div>
      </div>
    </div>
  );
};
