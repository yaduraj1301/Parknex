import React from "react";
import { Calendar } from "lucide-react";
import { ReservationCard } from "../ReservationCard/ReservationCard";
import "./upcomingReservation.css";

interface Reservation {
  id: string;
  name: string;
  slotNumber: string;
  time: string;
  reservationId: string;
  status: "today" | "tomorrow" | "upcoming";
}

interface UpcomingReservationsProps {
  reservations: Reservation[];
  onViewAll: () => void;
}

export const UpcomingReservations: React.FC<UpcomingReservationsProps> = ({
  reservations,
  onViewAll,
}) => {
  return (
    <div className="upcoming-reservations-container">
      {/* Header */}
      <div className="reservations-header">
        <div className="header-title">
          <Calendar className="header-icon" />
          <h3>Upcoming Reservations</h3>
        </div>
      </div>

      {/* Scrollable Reservations List */}
      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              name={reservation.name}
              slotNumber={reservation.slotNumber}
              time={reservation.time}
              reservationId={reservation.reservationId}
              status={reservation.status}
            />
          ))
        ) : (
          <div className="no-reservations">
            <p>No upcoming reservations</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      {reservations.length > 0 && (
        <div className="reservations-footer">
          <button onClick={onViewAll} className="view-all-button">
            View All
          </button>
        </div>
      )}
    </div>
  );
};
