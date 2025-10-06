import { NavLink } from "react-router-dom";
import "./sidebar.css";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.5 9V4H20v5zM4 12V4h6.5v8zm9.5 8v-8H20v8zM4 20v-5h6.5v5z"
                />
              </svg>
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
            <button onClick={() => alert("Logging out!")}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
