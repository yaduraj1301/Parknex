import React from 'react';
import { MainHeader } from '../../Components/main-header/main-header';
import { Tabs, type TabItem } from '../../Components/Tabs/Tabs';
import { Slots } from '../SlotManagement/SlotManagement';
import BuildingManagement from './BuildingManagement';
// 👇 1. Import the new CSS file
import './ManagementPage.css';

const ManagementPage: React.FC = () => {
  const tabItems: TabItem[] = [
    { label: "Slots", content: <Slots /> },
    { label: "Buildings", content: <BuildingManagement /> },
  ];

  return (
    // 👇 2. Add the container div with the new class
    <div className="management-page">
      <MainHeader
        title="Management"
        subtitle="Manage parking slots, monitor Buildings and Vehicles"
        isDropdownRequired={false}
      />
      <Tabs tabs={tabItems} defaultActive={1} />
    </div>
  );
};

export default ManagementPage;