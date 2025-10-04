import { NavLink } from "react-router-dom";
import "./css/sidebar.css";

export function Sidebar() {
  const adminMail = "admin@gmail.com";
  return (
    <>
      <div className="sidebar">
        <div className="sidebarTopContainer">
          <div className="sidebarHeader">
            <h4 className="sidebarHeaderTitle">ParkNeX</h4>
            <p>Parking Management</p>
          </div>
          <nav className="navBar">
            <NavLink to="/" className="links">
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </NavLink>
            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
            >
              <i className="fas fa-calendar-check"></i>
              Reservations
            </NavLink>
            <NavLink
              to="/records"
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
            >
              <i className="fas fa-file-alt"></i>
              Records
            </NavLink>
            <NavLink
              to="/management"
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
            >
              <i className="fas fa-cogs"></i>
              Management
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
            >
              <i className="fas fa-chart-line"></i>
              Analysis
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "links active" : "links"
              }
            >
              <i className="fas fa-sliders-h"></i>
              Settings
            </NavLink>
          </nav>
        </div>
        <div className="footer">
          <i className="fa-regular fa-user"></i>
          <div className="footerText">
            <p className="footerAdminText">Admin User</p>
            <p className="footerAdminMail">{adminMail}</p>
          </div>
          <div>
            <button onClick={() => alert("Logging out!")}><i className="fa-solid fa-right-from-bracket"></i></button>
          </div>
        </div>
      </div>
    </>
  );
}
