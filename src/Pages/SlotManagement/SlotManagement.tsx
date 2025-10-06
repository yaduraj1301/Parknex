import "./SlotManagement.css";
import { AddSlotModal } from "../../Components/AddSlot/AddSlot";
import { useState } from "react";
import { MainHeader } from "../../Components/main-header/main-header";

export function Slots() {
  const [isOpen, setIsOpen] = useState(false);

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
        <button onClick={() => setIsOpen(true)}>+ Add Slot</button>
        <AddSlotModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleAddSlot}
        />{" "}
      </div>
    </div>
  );
}
