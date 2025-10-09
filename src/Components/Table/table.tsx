import React, { useState, useMemo } from "react";
import "./table.css";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface ReusableTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: Record<string, any>[];
  searchPlaceholder?: string;
  rowsPerPage?: number;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
  onRowClick?: (row: Record<string, any>) => void;
  showFilter?: boolean; // 👈 Added prop
}

export const Table: React.FC<ReusableTableProps> = ({
  title,
  description,
  columns,
  data,
  searchPlaceholder = "Search...",
  rowsPerPage = 8,
  showAddButton = false,
  addButtonLabel = "+ Add",
  onAddClick,
  onRowClick,
  showFilter = false, // 👈 Default false
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterKey, setFilterKey] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filterOptions = ["All", ...new Set(data.map((item) => item.building))];

  const filteredData = useMemo(() => {
    let filtered = data;

    if (showFilter && filterKey !== "All") {
      filtered = filtered.filter((row) => row.building === filterKey);
    }

    filtered = filtered.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey) {
      filtered = filtered.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortKey, sortOrder, filterKey, showFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-title-section">
          <h2>{title}</h2>
        </div>

        {description && (
          <div className="table-description">
            <p>{description}</p>
          </div>
        )}

        <div className="table-controls">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="">Sort By</option>
            {columns
              .filter((col) => col.sortable)
              .map((col) => (
                <option key={col.key} value={col.key}>
                  {col.label}
                </option>
              ))}
          </select>

          {showFilter && (
            <select
              onChange={(e) => {
                setFilterKey(e.target.value);
                setCurrentPage(1);
              }}
              value={filterKey}
            >
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {showAddButton && (
            <button className="add-btn" onClick={onAddClick}>
              {addButtonLabel}
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={col.sortable ? "sortable" : ""}
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="sort-arrow">
                      {sortOrder === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        <span>
          Page <strong>{currentPage}</strong> of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ›
        </button>
      </div>
    </div>
  );
};
