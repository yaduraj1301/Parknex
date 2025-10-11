import React from 'react';
import { IoCarSportOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './UpcomingBookingCard.css';

export interface Booking {
  id: string; date: string; startTime: string; vehicleNo: string;
  slotNo: string; duration: string; client: string;
}

interface UpcomingBookingCardProps {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
}

export const UpcomingBookingCard: React.FC<UpcomingBookingCardProps> = ({ booking, onEdit, onDelete }) => {
  return (
    <div className="upcoming-card">
      <div className="card-header">
        <span className="booking-id">{booking.id}</span>
        <div className="date-time">
          <span className="date">{booking.date}</span>
          <span className="time">{booking.startTime}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="info-item"><IoCarSportOutline className="info-icon" /> {booking.vehicleNo}</div>
        <div className="info-item"><IoLocationOutline className="info-icon" /> Slot {booking.slotNo}</div>
        <div className="info-item"><IoTimeOutline className="info-icon" /> {booking.duration}</div>
      </div>
      <div className="card-footer">
        <span className="booked-for">Booked for <strong>{booking.client}</strong></span>
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={() => onEdit(booking)}>
            <FiEdit2 />
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(booking.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};