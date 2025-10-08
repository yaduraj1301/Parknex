import React, { useState } from "react";
import "./addmultipleslots.css";

interface Range {
  id: number;
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
  const [level, setLevel] = useState("");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [totalSlots, setTotalSlots] = useState(0);

  const addBlock = () => {
    setBlocks([
      ...blocks,
      {
        id: Date.now(),
        blockName: "",
        ranges: [{ id: Date.now(), start: 0, end: 0 }],
      },
    ]);
  };

  const addRange = (blockId: number) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              ranges: [...b.ranges, { id: Date.now(), start: 0, end: 0 }],
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

  const updateBlockName = (id: number, name: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, blockName: name } : b))
    );
  };

  const updateRange = (
    blockId: number,
    rangeId: number,
    key: keyof Range,
    value: number
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

  const removeBlock = (id: number) => {
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    recalcTotal(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="multiple-modal-overlay">
      <div className="multiple-modal-container">
        <div className="multiple-header">
          <h3>+ Bulk Add Slots</h3>
          <p className="warning-text">
            ⚠️ All parking slots will be initially available
          </p>
        </div>
        <div className="multiple-modal-content">
          {/* Left Section */}
          <div className="multiple-left-section">
            <label>Building</label>
            <input type="text" value={building} readOnly />

            <label>Level</label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="e.g. G1, L2"
            />

            <button className="multiple-add-block-btn" onClick={addBlock}>
              + Add Block
            </button>

            {blocks.map((block) => (
              <div key={block.id} className="multiple-block-section">
                <div className="multiple-block-header">
                  <strong>{block.blockName || "New Block"}</strong>
                  <button onClick={() => removeBlock(block.id)}><i className="fa-solid fa-xmark"></i></button>
                </div>

                <label>Block Name</label>
                <input
                  type="text"
                  value={block.blockName}
                  onChange={(e) => updateBlockName(block.id, e.target.value)}
                  placeholder="e.g. Block A"
                />

                {block.ranges.map((range) => (
                  <div key={range.id} className="multiple-slot-range">
                    <label>Start</label>
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

                    <label>End</label>
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

            <div className="multiple-button-group">
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="confirm">Add Slots</button>
            </div>
          </div>

          <div className="preview-section">
            <h4>Total Slots: {totalSlots}</h4>
            <div className="slots-preview">
              {blocks
                .flatMap((b) =>
                  b.ranges.flatMap((r) =>
                    Array.from(
                      { length: r.end - r.start + 1 },
                      (_, i) => `${b.blockName}-${r.start + i}`
                    )
                  )
                )
                .map((slot) => (
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
