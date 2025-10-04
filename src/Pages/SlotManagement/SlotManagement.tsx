import "./SlotManagement.css";
import { SlotHeader } from "../../Components/SlotHeader/SlotHeader";
import { AddSlotModal } from "../../Components/AddSlot/AddSlot";
import { useState } from "react";

export function Slots() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSlot = (data: any) => {
    console.log("Slot Added:", data);
  };
  return (
    <div className="rightContainer">
      <SlotHeader />
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
