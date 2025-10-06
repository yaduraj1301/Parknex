import { useEffect, useState } from "react";
import "./ReservationHeader.css";

export function ReservationHeader() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-GB"); // DD/MM/YYYY
  const formattedTime = dateTime.toLocaleTimeString("en-GB"); // HH:MM:SS

  return (
    <div className="reservationHeader">
      <div className="leftSection">
        <h3>Reservations</h3>
        <p>Manage your bookings efficiently</p>
      </div>
      <div className="rightSection">
        <div className="headerDateTime">
          <p className="headerDate">{formattedDate}</p>
          <span className="headerTime">{formattedTime}</span>
        </div>
        <div className="notificationIcon">
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    </div>
  );
}
