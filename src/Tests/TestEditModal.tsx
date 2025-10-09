import React, { useState } from "react";
import { EditSlots } from "../Components/AddSlot/EditSlots";
import type { ParkingSlot } from "../Types/ParkingTypes";

export function TestEditModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [slot, setSlot] = useState<ParkingSlot>({
    id: "1",
    status: "free",
    building: "Athulya, Kochi",
    block: "A",
    level: "1",
    prefix: "KAT",
    isSpecial: false,
    notes: "",
    namedFor: "",
  });

  const handleSave = (updatedSlot: ParkingSlot) => {
    console.log("✅ Updated Slot:", updatedSlot);
    setSlot(updatedSlot);
  };

  return (
    <>
      {isOpen && (
        <EditSlots
          slot={slot}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
      <button onClick={() => setIsOpen(true)}>Edit Slot</button>
    </>
  );
}
