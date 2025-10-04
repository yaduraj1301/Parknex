import { useEffect, useState } from "react";
import "./slotHeader.css";

export function SlotHeader() {
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
    <div className="slotHeader">
      <div className="leftSection">
        <h3>Management</h3>
        <p>Manage parking slots and monitor Buildings</p>
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
