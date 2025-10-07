import React from "react";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { BookingHistory } from "./BookingHistory";
import { DashboardOverview } from "../../Components/DashboardOverview/DashboardOverview";

// import { PendingVerification } from "./PendingVerification";
// import { EmployeeManagement } from "./EmployeeManagement";
import "./Records.css";

export function Records() {
  const tabItems: TabItem[] = [
    { label: "Employee Management", content: <DashboardOverview /> },
    { label: "Pending Verification", content: <DashboardOverview /> },
    { label: "Booking History", content: <BookingHistory /> },
  ];

  return (
    <div className="records-page">
      <MainHeader
        title="Records"
        subtitle="Add and verify employees, manage their parking access, and view complete booking history."
        isDropdownRequired={true}
      />
      <Tabs tabs={tabItems} />
    </div>
  );
}
