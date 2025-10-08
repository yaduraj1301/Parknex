import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { EmployeeManagement } from "./EmployeeManagement";
import { BookingHistory } from "./BookingHistory";
import "./Records.css";

export function Records() {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabItems: TabItem[] = [
    { label: "Employees", content: <EmployeeManagement /> },
    { label: "Pending Verification", content: <EmployeeManagement /> },
    { label: "Booking History", content: <BookingHistory /> },
  ];

  useEffect(() => {
    if (location.state?.activeTab) {
      const tabIndex = tabItems.findIndex(
        (tab) =>
          tab.label.toLowerCase().replace(/\s+/g, "-") ===
          location.state.activeTab
      );
      if (tabIndex !== -1) {
        setActiveTabIndex(tabIndex);
      }
    }
  }, [location.state]);

  return (
    <div className="records-page">
      <MainHeader
        title="Records"
        subtitle="Manage employees, verify entries, and view booking history."
        isDropdownRequired={true}
      />
      <Tabs tabs={tabItems} activeIndex={activeTabIndex} />
    </div>
  );
}
