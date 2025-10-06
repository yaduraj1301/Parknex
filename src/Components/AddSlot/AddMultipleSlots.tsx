import React, { useState } from "react";
import "./addmultipleslots.css";

interface BlockData {
  id: number;
  blockName: string;
  start: number;
  end: number;
}

interface BulkAddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: string; // preset building value
}

export const AddMultipleSlots: React.FC<BulkAddSlotModalProps> = ({
  isOpen,
  onClose,
  building,
}) => {
  const [level, setLevel] = useState("");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [totalSlots, setTotalSlots] = useState(0);

  const addBlock = () => {
    setBlocks([
      ...blocks,
      { id: Date.now(), blockName: "", start: 0, end: 0 },
    ]);
  };

  const updateBlock = (id: number, key: keyof BlockData, value: any) => {
    const updated = blocks.map((block) =>
      block.id === id ? { ...block, [key]: value } : block
    );
    setBlocks(updated);
    const total = updated.reduce(
      (sum, b) => sum + (b.end > b.start ? b.end - b.start + 1 : 0),
      0
    );
    setTotalSlots(total);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>+ Bulk Add Slots</h3>
        <p className="warning-text">
          ⚠️ All parking slots will be initially available
        </p>

        <div className="modal-content">
          {/* Left Section */}
          <div className="left-section">
            <label>Building</label>
            <input
              type="text"
              value={building}
              onChange={(e) => console.log("Building changed", e.target.value)} // editable if needed
            />

            <label>Level</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="e.g. G1, L2"
            />

            <button className="add-block-btn" onClick={addBlock}>
              + Add Block
            </button>

            {blocks.map((block) => (
              <div key={block.id} className="block-section">
                <div className="block-header">
                  <strong>Block</strong>
                  <button onClick={() => removeBlock(block.id)}>❌</button>
                </div>
                <div className="block-fields">
                  <label>Block Name</label>
                  <input
                    type="text"
                    value={block.blockName}
                    onChange={(e) =>
                      updateBlock(block.id, "blockName", e.target.value)
                    }
                    placeholder="e.g. Block A"
                  />

                  <div className="slot-range">
                    <label>Start</label>
                    <input
                      type="number"
                      value={block.start}
                      onChange={(e) =>
                        updateBlock(block.id, "start", Number(e.target.value))
                      }
                    />

                    <label>End</label>
                    <input
                      type="number"
                      value={block.end}
                      onChange={(e) =>
                        updateBlock(block.id, "end", Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="button-group">
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="confirm">Add Slots</button>
            </div>
          </div>

          {/* Right Section (Preview) */}
          <div className="preview-section">
            <h4>Total Slots: {totalSlots}</h4>
            <div className="slots-preview">
              {blocks.flatMap((b) =>
                Array.from(
                  { length: b.end - b.start + 1 },
                  (_, i) => `${b.blockName}-${b.start + i}`
                )
              ).map((slot) => (
                <span key={slot} className="slot-chip">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
