import React, { useState } from 'react';
import { MainHeader } from '../../Components/main-header/main-header';
import { Slots } from '../SlotManagement/SlotManagement';
import BuildingManagement from './BuildingManagement';
import './ManagementPage.css';

const ManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buildings');

  return (
    <div className="management-page-container">
      {/* FIX: Add the missing isDropdownRequired prop and set it to false */}
      <MainHeader
        title="Management"
        subtitle="Manage parking slots, monitor Buildings and Vehicles"
        isDropdownRequired={false}
      />

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'slots' ? 'active' : ''}`}
          onClick={() => setActiveTab('slots')}
        >
          Slots
        </button>
        <button
          className={`tab-button ${activeTab === 'buildings' ? 'active' : ''}`}
          onClick={() => setActiveTab('buildings')}
        >
          Buildings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'slots' && <Slots />}
        {activeTab === 'buildings' && <BuildingManagement />}
      </div>
    </div>
  );
};

export default ManagementPage;