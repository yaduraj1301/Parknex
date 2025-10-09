import { useState } from "react";
import { AddMultipleSlots } from "../AddSlot/AddMultipleSlots";
import { AddSlotModal } from "../AddSlot/AddSlot";
import "./managementslots.css";
import { QuickActions } from "../QuickActions/QuickActions";

export function SlotManagement() {
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("Athulya, Kochi");
  const [searchTerm, setSearchTerm] = useState("");
  const [blockFilter, setBlockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddSlot = (data: unknown) => {
    console.log("Slot Added:", data);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setBlockFilter("all");
    setStatusFilter("all");
  };

  const handleBuildingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBuilding(event.target.value);
  };

  return (
    <div className="mainContainer">
      <div className="ButtonSection">
        <div className="FunctionButtons">
          <button className="FunctionButton" onClick={() => setIsSingleOpen(true)}>
            <i className="fa-solid fa-plus"></i> Add Slot
          </button>
          <AddSlotModal
            isOpen={isSingleOpen}
            onClose={() => setIsSingleOpen(false)}
            onSubmit={handleAddSlot}
            selectedBuilding={selectedBuilding}
          />
          <button className="FunctionButton" onClick={() => setIsBulkOpen(true)}>
            <i className="fa-solid fa-plus"></i> Add Bulk Slot
          </button>
          <AddMultipleSlots
            isOpen={isBulkOpen}
            onClose={() => setIsBulkOpen(false)}
            building={selectedBuilding}
          />
        </div>
        <div className="building-dropdown-container">
          <label htmlFor="building-select" className="building-label">
            Select Building:
          </label>
          <select
            id="building-select"
            className="building-dropdown"
            value={selectedBuilding}
            onChange={handleBuildingChange}
          >
            <option value="Athulya, Kochi">Athulya, Kochi</option>
            <option value="Thejaswini, Trivandrum">
              Thejaswini, Trivandrum
            </option>
            <option value="Gayatri, Trivandrum">Gayatri, Trivandrum</option>
          </select>
        </div>
      </div>

      <QuickActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        blockFilter={blockFilter}
        setBlockFilter={setBlockFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

    </div>
  );
}
