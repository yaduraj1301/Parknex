import "./ReserveSlot.css";
// import { SlotHeader } from "../../Components/SlotHeader/SlotHeader";
// import { AddSlotModal } from "../../Components/AddSlot/AddSlot";
import { ReservationHeader } from "../../../Components/ReservationHeader/ReservationHeader";
import React, { useState } from 'react';
import { AllBookings } from "../AllBookings/AllBookings";

import Tabs from "../../../Components/Tabs/Tabs";
import { type TabItem } from "../../../Components/Tabs/Tabs";

const myTabs: TabItem[] = [
    { id: 'reserve_slots', label: 'Reserve Slots' },
    { id: 'all_bookings', label: 'All Bookings' }
];

export function ReserveSlot() {

    const [activeTab, setActiveTab] = useState<string>(myTabs[0].id);

    const handleTabClick = (id: string) => {
        setActiveTab(id);
    };

    const renderContent = () => {
        // --- 2. UPDATE THE SWITCH STATEMENT ---
        // Render the appropriate component based on the active tab
        switch (activeTab) {
            case 'reserve_slots':
                return <ReserveSlot />;
            case 'all_bookings':
                return <AllBookings />;
            default:
                // You could return a default component or null
                return <div>Please select a tab.</div>;
        }
    };

    return (
        <div className="rightContainer">
            <ReservationHeader />
            <Tabs
                tabs={myTabs}
                activeTabId={activeTab}
                onTabClick={handleTabClick}
            />
            {/* <div className="mainContainer">
                Still under Construction
            </div> */}

            <main className="mainContainer">
                {renderContent()}
            </main>
        </div>
    );
}