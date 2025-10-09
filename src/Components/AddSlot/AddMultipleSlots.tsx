import React, { useEffect, useState } from "react";
import "./addmultipleslots.css";
import { EditSlots } from "./EditSlots";
import type { ParkingSlot, SlotStatus } from "../../Types/ParkingTypes";

interface Range {
  id: number;
  prefix: string;
  start: number;
  end: number;
}

interface BlockData {
  id: number;
  blockName: string;
  ranges: Range[];
}

interface BulkAddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: string;
}

export const AddMultipleSlots: React.FC<BulkAddSlotModalProps> = ({
  isOpen,
  onClose,
  building,
}) => {
  const buildingOptions = [
    { name: "Athulya, Kochi", prefix: "KAT" },
    { name: "Gayatri, Trivandrum", prefix: "TGA" },
    { name: "Thejaswini, Trivandrum", prefix: "TTH" },
  ];

  const [selectedBuilding, setSelectedBuilding] = useState(building);
  const [buildingPrefix, setBuildingPrefix] = useState("");
  const [level, setLevel] = useState("");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [totalSlots, setTotalSlots] = useState(0);

  // Slot editing state
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [slotsMap, setSlotsMap] = useState<Record<string, ParkingSlot>>({});

  useEffect(() => {
    if (isOpen && building) {
      setSelectedBuilding(building);
      const found = buildingOptions.find((b) => b.name === building);
      setBuildingPrefix(found ? found.prefix : "");
    }
  }, [isOpen, building]);

  // Recalculate total slots
  const recalcTotal = (data: BlockData[]) => {
    const total = data.reduce(
      (sum, b) =>
        sum +
        b.ranges.reduce(
          (rSum, r) => rSum + (r.end > r.start ? r.end - r.start + 1 : 0),
          0
        ),
      0
    );
    setTotalSlots(total);
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedBuilding(selected);
    const found = buildingOptions.find((b) => b.name === selected);
    const prefix = found ? found.prefix : "";
    setBuildingPrefix(prefix);

    // Update ranges prefix
    setBlocks((prev) =>
      prev.map((b) => ({
        ...b,
        ranges: b.ranges.map((r) => ({ ...r, prefix })),
      }))
    );
  };

  const addBlock = () => {
    if (!selectedBuilding) return alert("Please select a building first!");
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        blockName: "",
        ranges: [{ id: Date.now(), prefix: buildingPrefix, start: 0, end: 0 }],
      },
    ]);
  };

  const removeBlock = (id: number) => {
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    recalcTotal(updated);
  };

  const updateBlockName = (id: number, name: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, blockName: name } : b))
    );
  };

  const addRange = (blockId: number) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              ranges: [
                ...b.ranges,
                { id: Date.now(), prefix: buildingPrefix, start: 0, end: 0 },
              ],
            }
          : b
      )
    );
  };

  const removeRange = (blockId: number, rangeId: number) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, ranges: b.ranges.filter((r) => r.id !== rangeId) }
          : b
      )
    );
  };

  const updateRange = (
    blockId: number,
    rangeId: number,
    key: keyof Range,
    value: number | string
  ) => {
    const updated = blocks.map((block) =>
      block.id === blockId
        ? {
            ...block,
            ranges: block.ranges.map((r) =>
              r.id === rangeId ? { ...r, [key]: value } : r
            ),
          }
        : block
    );
    setBlocks(updated);
    recalcTotal(updated);
  };

  const resetModal = () => {
    setBlocks([]);
    setLevel("");
    setSelectedBuilding("");
    setBuildingPrefix("");
    setTotalSlots(0);
    setSlotsMap({});
  };

  // Save updated slot from EditSlots modal
  const handleSlotSave = (updatedSlot: ParkingSlot) => {
    setSlotsMap((prev) => {
      const updated = { ...prev, [updatedSlot.id]: updatedSlot };
      return updated;
    });
    setSelectedSlot(null); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="multiple-modal-overlay">
        <div className="multiple-modal-container">
          {/* HEADER */}
          <div className="multiple-header">
            <h3>+ Bulk Add Slots</h3>
            <p className="warning-text">
              ⚠️ All parking slots will be initially available
            </p>
          </div>

          {/* BODY */}
          <div className="multiple-modal-content">
            <div className="multiple-left-section">
              <div className="detail-input">
                <div className="building-input">
                  <label>Building</label>
                  <select
                    value={selectedBuilding}
                    onChange={handleBuildingChange}
                  >
                    <option value="">Select Building</option>
                    {buildingOptions.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="building-input">
                  <label>Level</label>
                  <input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="e.g. G1, L2"
                  />
                </div>
              </div>

              <button className="multiple-add-block-btn" onClick={addBlock}>
                + Add Block
              </button>

              <div className="blocks-container">
                {blocks.map((block) => (
                  <div key={block.id} className="multiple-block-section">
                    <div className="multiple-block-header">
                      <strong>{block.blockName || "New Block"}</strong>
                      <button onClick={() => removeBlock(block.id)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <label>Block Name</label>
                    <input
                      type="text"
                      value={block.blockName}
                      onChange={(e) =>
                        updateBlockName(block.id, e.target.value)
                      }
                      placeholder="e.g. Block A"
                    />

                    <div className="multiple-slot-range labels">
                      <label className="prefix-label">Prefix</label>
                      <label className="start-label">Start</label>
                      <label className="end-label">End</label>
                    </div>

                    {block.ranges.map((range) => (
                      <div key={range.id} className="multiple-slot-range">
                        <input type="text" value={range.prefix} readOnly />
                        <input
                          type="number"
                          value={range.start}
                          onChange={(e) =>
                            updateRange(
                              block.id,
                              range.id,
                              "start",
                              Number(e.target.value)
                            )
                          }
                        />
                        <input
                          type="number"
                          value={range.end}
                          onChange={(e) =>
                            updateRange(
                              block.id,
                              range.id,
                              "end",
                              Number(e.target.value)
                            )
                          }
                        />
                        <button
                          className="multiple-range-btn add"
                          onClick={() => addRange(block.id)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        {block.ranges.length > 1 && (
                          <button
                            className="multiple-range-btn delete"
                            onClick={() => removeRange(block.id, range.id)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="multiple-button-group">
                <button
                  className="cancel"
                  onClick={() => {
                    resetModal();
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button className="confirm">Add Slots</button>
              </div>
            </div>

            {/* PREVIEW SECTION */}
            <div className="preview-section">
              <div className="preview-header">
                <h3>Preview</h3>
                <p style={{ fontSize: "12px" }}>Total Slots: {totalSlots}</p>
              </div>

              <div className="slots-preview">
                {blocks
                  .flatMap((b) =>
                    b.ranges.flatMap((r) =>
                      Array.from({ length: r.end - r.start + 1 }, (_, i) => {
                        const id = `${r.prefix}${b.blockName}-${r.start + i}`;
                        return {
                          id,
                          building: selectedBuilding,
                          prefix: r.prefix,
                          block: b.blockName,
                          level: level,
                          status: "free" as SlotStatus,
                          isSpecial: false,
                          notes: "",
                        };
                      })
                    )
                  )
                  .map((slot) => {
                    const updatedSlot = slotsMap[slot.id] || slot;
                    const colorClass =
                      updatedSlot.status === "free"
                        ? "slot-free"
                        : updatedSlot.status === "booked"
                        ? "slot-booked"
                        : updatedSlot.status === "reserved"
                        ? "slot-reserved"
                        : "slot-named"; // named/grey

                    return (
                      <span
                        key={updatedSlot.id}
                        className={`slot-chip ${colorClass}`}
                        onClick={() => setSelectedSlot(updatedSlot)}
                      >
                        {updatedSlot.id}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedSlot && (
        <EditSlots
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onSave={handleSlotSave}
        />
      )}
    </>
  );
};
