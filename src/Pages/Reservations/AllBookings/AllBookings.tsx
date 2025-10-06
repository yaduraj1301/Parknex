import "./AllBookings.css";
// import { SlotHeader } from "../../Components/SlotHeader/SlotHeader";
// import { AddSlotModal } from "../../Components/AddSlot/AddSlot";
import { ReservationHeader } from "../../../Components/ReservationHeader/ReservationHeader";
import Tabs from "../../../Components/Tabs/Tabs";
import React, { useState } from 'react';
// import './App.css';

import { type TabItem } from "../../../Components/Tabs/Tabs";

const myTabs: TabItem[] = [
  { id: 'reserve_slots', label: 'Reserve Slots' },
  { id: 'all_bookings', label: 'All Bookings' }
];

export function AllBookings() {

    const [activeTab, setActiveTab] = useState<string>(myTabs[0].id);

    const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

    return (
        <div className="rightContainer">
            <ReservationHeader />
            <div className="mainContainer">
                Still under Construction
            </div>
        </div>
    );
}
