import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import "./Layout.css"; 

export function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />

      {/* Main content area */}
      <div className="main-content">
        <div className="main-container">
          <div className="padded-container">
            <Outlet /> {/* Nested routes render here */}
          </div>
        </div>
      </div>
    </div>
  );
}
