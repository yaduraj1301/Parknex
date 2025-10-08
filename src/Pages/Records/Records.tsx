import React from "react";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { EmployeeManagement } from "./EmployeeManagement";
import { BookingHistory } from "./BookingHistory";
import "./Records.css";

export function Records() {
  const tabItems = [
    { label: "Employees", content: <EmployeeManagement /> },
    { label: "Pending Verification", content: <EmployeeManagement /> },
    { label: "Booking History", content: <BookingHistory /> },
  ];

  return (
    <div className="records-page">
      <MainHeader
        title="Records"
        subtitle="Manage employees, verify entries, and view booking history."
        isDropdownRequired={true}
      />
      <Tabs tabs={tabItems} />
    </div>
  );
}
