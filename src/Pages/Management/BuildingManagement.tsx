import React from 'react';
// Import IconContext to solve the className issue
import { MdAdd, MdBusiness, MdPerson, MdEdit, MdDelete } from 'react-icons/md';
import { IconContext } from 'react-icons'; 
import BuildingStatsCard from '../../Components/BuildingStatsCard/BuildingStatsCard';
import './BuildingManagement.css';

// Define the type for a single building
interface Building {
  id: number;
  name: string;
  location: string;
  levels: number;
  capacity: number;
  occupancy: number;
  admin: string;
  adminPhone: string;
}

const BuildingManagement: React.FC = () => {
  const buildingData: Building[] = [
    { id: 1, name: 'Thejaswani', location: 'Trivandrum', levels: 1, capacity: 28, occupancy: 78, admin: 'Mehtab', adminPhone: '9120122011' },
    { id: 2, name: 'Gayatri', location: 'Trivandrum', levels: 1, capacity: 28, occupancy: 78, admin: 'Mehtab', adminPhone: '9120122011' },
    { id: 3, name: 'Athulya', location: 'Kochi', levels: 1, capacity: 28, occupancy: 78, admin: 'Aswin', adminPhone: '984452541' },
  ];

  return (
    <div className="building-management-container">
      <div className="stats-grid">
        <BuildingStatsCard title="Total Buildings" value="3" unit="Buildings" />
        <BuildingStatsCard title="Available Slots" value="20" unit="Ready for use" />
        <BuildingStatsCard title="Total Slots" value="62" unit="Across all buildings" />
        <BuildingStatsCard title="Occupancy Rate" value="78%" unit="Current Utilization" type="percentage" />
      </div>

      <div className="building-management-section">
        <div className="section-header">
            <div className="section-header-text">
                <h3>Building Management</h3>
                <p>Manage all parking buildings & their configurations</p>
            </div>
          <button className="add-building-button">
            <MdAdd /> Add new building
          </button>
        </div>

        {/* Building Table */}
        <div className="building-table-container">
          <table className="building-table">
            <thead>
              <tr>
                <th>Building</th>
                <th>Location</th>
                <th>Levels</th>
                <th>Capacity</th>
                <th>Occupancy</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildingData.map((building) => (
                <tr key={building.id}>
                  <td>
                    <div className="building-name-cell">
                      {/* FIX: Wrap the icon with IconContext.Provider to apply className */}
                      <IconContext.Provider value={{ className: "building-icon" }}>
                        <MdBusiness />
                      </IconContext.Provider>
                      <span>{building.name}</span>
                    </div>
                  </td>
                  <td>{building.location}</td>
                  <td>{building.levels}</td>
                  <td>{building.capacity}</td>
                  <td>
                    <div className="occupancy-progress">
                      <div className="occupancy-bar">
                        <div className="occupancy-fill" style={{ width: `${building.occupancy}%` }}></div>
                      </div>
                      <span className="occupancy-text">{building.occupancy}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="admin-cell">
                       {/* FIX: Wrap the icon with IconContext.Provider to apply className */}
                       <IconContext.Provider value={{ className: "admin-icon" }}>
                        <MdPerson />
                      </IconContext.Provider>
                      <div>
                        <div className="admin-name">{building.admin}</div>
                        <div className="admin-phone">{building.adminPhone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button edit-button"><MdEdit /></button>
                      <button className="action-button delete-button"><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuildingManagement;