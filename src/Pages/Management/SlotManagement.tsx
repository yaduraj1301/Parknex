import "./SlotManagement.css";
import { AddSlotModal } from "../../Components/AddSlot/AddSlot";
import { AddMultipleSlots } from "../../Components/AddSlot/AddMultipleSlots";
import { useState } from "react";
import { MainHeader } from "../../Components/main-header/main-header";

export function Slots() {
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const buildingName = "Athulya, Kochi";

  const handleAddSlot = (data: any) => {
    console.log("Slot Added:", data);
  };
  return (
    <div className="leftContainer">
      <MainHeader
                title="Management"
                subtitle="Welcome to ParkNeX Dashboard"
                isDropdownRequired={false}
              />
      <div className="mainContainer">
        Still under Construction
        <button onClick={() => setIsSingleOpen(true)}>+ Add Slot</button>
        <AddSlotModal
          isOpen={isSingleOpen}
          onClose={() => setIsSingleOpen(false)}
          onSubmit={handleAddSlot}
        />
        <button onClick={() => setIsBulkOpen(true)}>+ Add Bulk Slot</button>
        <AddMultipleSlots
          isOpen={isBulkOpen}
          onClose={() => setIsBulkOpen(false)}
          building={buildingName}
        />
      </div>
    </div>
  );
}
