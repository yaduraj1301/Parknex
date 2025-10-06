import { useEffect, useState } from "react";
import "./main-header.css";

type HeaderProps = {
  title: string;
  subtitle: string;
  isDropdownRequired: boolean;
  setSelectedBuilding?: React.Dispatch<React.SetStateAction<string>>;
};
export function MainHeader({title, subtitle, isDropdownRequired,setSelectedBuilding}: HeaderProps) {

  function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedBuilding?.(event.target.value);
  }
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
    <div className="mainHeader">
      <div className="leftSection">
        <span className="pageTitle">{title}</span>
        <p className="pageTagline">{subtitle}</p>
      </div>
      <div className="rightSection">
        {isDropdownRequired && (
          <div className="headerDropdown">
            {/* Minimal dropdown placeholder - replace with real component if needed */}
            <select aria-label="header-dropdown" onChange={handleDropdownChange}>
              <option value="Athulya, Kochi">Athulya, Kochi</option>
              <option value="Thejaswini, Trivandrum">Thejaswini, Trivandrum</option>
              <option value="Gayatri, Trivandrum">Gayatri, Trivandrum</option>
            </select>
          </div>
        )}
        <div className="headerDateTime">
          <span className="headerDate">{formattedDate}</span>
          <span className="headerTime">{formattedTime}</span>
        </div>
        <div className="notificationIcon">
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    </div>
  );
}
