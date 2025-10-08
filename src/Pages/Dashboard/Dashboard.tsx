import { useState } from "react";
import { MainHeader } from "../../Components/main-header/main-header";
import "./dashboard.css";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { DashboardOverview } from "../../Components/DashboardComponents/DashboardOverview/DashboardOverview";
import { DashboardSlotLayout } from "../../Components/DashboardComponents/DashboardSlotLayout/DashbaordSlotLayout";

export function Dashboard() {
  const tabItems: TabItem[] = [
    { label: "Overview", content: <DashboardOverview /> },
    { label: "Slot Layout", content: <DashboardSlotLayout /> },
  ];

  const [selectedBuilding, setSelectedBuilding] = useState("Athulya, Kochi");
  return (
    <>
      <MainHeader
        title="Dashboard"
        subtitle="Welcome to ParkNeX Dashboard"
        isDropdownRequired={true}
        setSelectedBuilding={setSelectedBuilding}
      />
      <div className="dashboard-content">
        <div className="building-name">{selectedBuilding}</div>
        <Tabs tabs={tabItems} />
      </div>
    </>
  );
}
