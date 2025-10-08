import "./Management.css";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { SlotManagement } from "../../Components/ManagementSlots/ManagementSlot";
import { ManagementBuilding } from "../../Components/ManagementBuildings/ManagementBuildings";

export function Slots() {
  const tabItems: TabItem[] = [
    { label: "Slots", content: <SlotManagement /> },
    { label: "Buildings", content: <ManagementBuilding /> },
  ];

  return (
    <>
      <MainHeader
        title="Management"
        subtitle="Welcome to ParkNeX Dashboard"
        isDropdownRequired={false}
      />
      <div className="management-content">
        <Tabs tabs={tabItems} />
      </div>
    </>
  );
}
