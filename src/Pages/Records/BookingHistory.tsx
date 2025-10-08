import React from "react";
import { Table } from "../../Components/Table/table";
import { MainHeader } from "../../Components/main-header/main-header";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";

import "./BookingHistory.css";

export function BookingHistory() {
  const columns = [
    { key: "bookingId", label: "BOOKING ID" },
    { key: "name", label: "NAME" },
    { key: "vehicleNo", label: "VEHICLE NO" },
    { key: "slotName", label: "SLOT NAME" },
    { key: "building", label: "BUILDING" },
    { key: "bookingTime", label: "BOOKING TIME" },
    { key: "checkout", label: "CHECKOUT" },
    { key: "date", label: "DATE" },
  ];

  const data = Array.from({ length: 30 }, (_, i) => ({
    bookingId: 10020 + i,
    name: "John Doe",
    vehicleNo: "KL08FC" + (120 + i),
    slotName: "Level 1 KAT-02",
    building: "Thejaswini, Trivandrum",
    bookingTime: "8:2" + (i % 10) + " am",
    checkout: "4:0" + (i % 10) + " pm",
    date: "12.05.25",
  }));

  return (
    <div className="records-page">
      {/* <MainHeader
        title="Records"
        subtitle="Manage employees, verify new entries, and track booking history."
        isDropdownRequired={true}
      /> */}

      <Table
        title="Booking History"
        description="View past bookings by employees"
        columns={columns}
        data={data}
        searchPlaceholder="Enter vehicle no / employee name"
        rowsPerPage={10}
      />
    </div>
  );
}
