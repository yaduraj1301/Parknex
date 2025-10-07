import { useState } from "react";
import "./Reservations.css";
import { Tabs, type TabItem } from "../../Components/Tabs/Tabs";
import { ReserveSlot } from "./ReserveSlot/ReserveSlot";
import { AllBookings } from "./AllBookings/AllBookings";
import { MainHeader } from "../../Components/main-header/main-header";

export function Reservations() {

    const tabItems: TabItem[] = [
        { label: "Reservations", content: <ReserveSlot/> },
        { label: "All Bookings", content: <AllBookings /> },
    ];

    // Entire reservation page depends on this(For both the tabs)
    const [selectedBuilding, setSelectedBuilding] = useState("Athulya, Kochi");

    return(<>
        <MainHeader
            title="Reservations"
            subtitle="Manage your bookings efficiently"
            isDropdownRequired={true}
            setSelectedBuilding={setSelectedBuilding}
        />
        <br></br>
        <div className="reservations-content">
            <Tabs tabs={tabItems} />
        </div>
    </>)
}