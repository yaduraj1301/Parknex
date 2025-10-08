import React, { useState } from "react";
import { EditSlots} from "../Components/AddSlot/EditSlots";

import type { ParkingSlot } from "../Types/ParkingTypes";

export const sampleSlot: ParkingSlot = {
  id: "A1-101",
  status: "named", // Try changing to 'free' | 'booked' | 'reserved' | 'unavailable' for testing
  building: "Athulya, Kochi",
  block: "Block A",
  level: "1",
  prefix: "A1",
  isSpecial: false,
  notes: "Near main entrance",
  namedFor: "John Doe" // only applicable if status === 'named'
};


export function TestEditModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [slot, setSlot] = useState(sampleSlot);

  const handleSave = (updatedSlot: typeof sampleSlot) => {
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
