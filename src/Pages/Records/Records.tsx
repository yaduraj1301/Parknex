import React from "react";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { EmployeeManagement } from "./EmployeeManagement";
import { BookingHistory } from "./BookingHistory";
import "./Records.css";
import { PendingVerifications } from "../PendingVerifications/PendingVerifications";

export function Records() {
  const tabItems = [
    { label: "Employees", content: <EmployeeManagement /> },
    { label: "Pending Verification", content: <PendingVerifications /> },
    { label: "Booking History", content: <BookingHistory /> },
  ];

  return (
    <div className="records-page">
      <MainHeader
        title="Records"
        subtitle="Manage employees, verify entries, and view booking history."
        isDropdownRequired={true}
      />

      <div className="records-content">
        <Tabs tabs={tabItems} />
      </div>
    </div>
  );
}
