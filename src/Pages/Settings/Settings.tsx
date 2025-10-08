import "./settings.css";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { DashboardSlotLayout } from "../../Components/DashboardSlotLayout/DashbaordSlotLayout";
import { AdminSettings } from "../../Components/AdminSettings/AdminSettings";

export function Settings() {
  const tabItems: TabItem[] = [
    { label: "Admins", content: <AdminSettings /> },
    { label: "Alerts", content: <DashboardSlotLayout /> },
    { label: "Security", content: <DashboardSlotLayout /> },
  ];

  return (
    <div className="leftContainer">
      <MainHeader
        title="Settings"
        subtitle="Manage system preferences and admin controls"
        isDropdownRequired={false}
      />
      <div className="dashboard-content">
        <Tabs tabs={tabItems}/>

      </div>
    </div>
  );
}
