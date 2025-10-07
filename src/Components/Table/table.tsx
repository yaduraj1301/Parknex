// // import React, { useState, useMemo } from "react";
// // import "./table.css";

// // export interface Column {
// //   key: string;
// //   label: string;
// // }

// // interface ReusableTableProps {
// //   title: string;
// //   description?: string;
// //   columns: Column[];
// //   data: Record<string, any>[];
// //   searchPlaceholder?: string;
// //   rowsPerPage?: number;
// // }

// // export const Table: React.FC<ReusableTableProps> = ({
// //   title,
// //   description,
// //   columns,
// //   data,
// //   searchPlaceholder = "Search...",
// //   rowsPerPage = 8,
// // }) => {
// //   const [search, setSearch] = useState("");
// //   const [sortKey, setSortKey] = useState<string>("");
// //   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Filter + sort logic
// //   const filteredData = useMemo(() => {
// //     let filtered = data.filter((row) =>
// //       Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
// //     );

// //     if (sortKey) {
// //       filtered = filtered.sort((a, b) => {
// //         const valA = a[sortKey];
// //         const valB = b[sortKey];
// //         if (valA < valB) return sortOrder === "asc" ? -1 : 1;
// //         if (valA > valB) return sortOrder === "asc" ? 1 : -1;
// //         return 0;
// //       });
// //     }
// //     return filtered;
// //   }, [data, search, sortKey, sortOrder]);

// //   // Pagination logic
// //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// //   const paginatedData = filteredData.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   const handleSort = (key: string) => {
// //     if (sortKey === key) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortKey(key);
// //       setSortOrder("asc");
// //     }
// //   };

// //   const handlePageChange = (page: number) => {
// //     if (page >= 1 && page <= totalPages) {
// //       setCurrentPage(page);
// //     }
// //   };

// //   return (
// //     <div className="table-container">
// //       <div className="table-header">
// //         <div>
// //           <h2>{title}</h2>
// //           {description && <p>{description}</p>}
// //         </div>
// //         <div className="table-controls">
// //           <input
// //             type="text"
// //             placeholder={searchPlaceholder}
// //             value={search}
// //             onChange={(e) => {
// //               setSearch(e.target.value);
// //               setCurrentPage(1);
// //             }}
// //           />
// //           <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
// //             <option value="">Sort By</option>
// //             {columns.map((col) => (
// //               <option key={col.key} value={col.key}>
// //                 {col.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>

// //       <div className="table-wrapper">
// //         <table className="custom-table">
// //           <thead>
// //             <tr>
// //               {columns.map((col) => (
// //                 <th
// //                   key={col.key}
// //                   onClick={() => handleSort(col.key)}
// //                   className={sortKey === col.key ? "active-sort" : ""}
// //                 >
// //                   {col.label}
// //                   {sortKey === col.key && (
// //                     <span className="sort-arrow">
// //                       {sortOrder === "asc" ? " ▲" : " ▼"}
// //                     </span>
// //                   )}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {paginatedData.length ? (
// //               paginatedData.map((row, index) => (
// //                 <tr key={index}>
// //                   {columns.map((col) => (
// //                     <td className="td" key={col.key}>
// //                       {row[col.key]}
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan={columns.length} className="no-data">
// //                   No records found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination controls */}
// //       <div className="pagination">
// //         <button
// //           onClick={() => handlePageChange(currentPage - 1)}
// //           disabled={currentPage === 1}
// //         >
// //           ‹
// //         </button>
// //         <span>
// //           Page <strong>{currentPage}</strong> of {totalPages || 1}
// //         </span>
// //         <button
// //           onClick={() => handlePageChange(currentPage + 1)}
// //           disabled={currentPage === totalPages || totalPages === 0}
// //         >
// //           ›
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useMemo } from "react";
// import "./table.css";

// export interface Column {
//   key: string;
//   label: string;
// }

// interface ReusableTableProps {
//   title: string;
//   description?: string;
//   columns: Column[];
//   data: Record<string, any>[];
//   searchPlaceholder?: string;
//   rowsPerPage?: number;
// }

// export const Table: React.FC<ReusableTableProps> = ({
//   title,
//   description,
//   columns,
//   data,
//   searchPlaceholder = "Search...",
//   rowsPerPage = 8,
// }) => {
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [filterKey, setFilterKey] = useState<string>("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Compute unique filter values (using first column that makes sense)
//   const filterOptions = ["All", ...new Set(data.map((item) => item.building))];

//   // Filter + sort logic
//   const filteredData = useMemo(() => {
//     let filtered = data;

//     // Filter logic
//     if (filterKey !== "All") {
//       filtered = filtered.filter((row) => row.building === filterKey);
//     }

//     // Search logic
//     filtered = filtered.filter((row) =>
//       Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
//     );

//     // Sort logic
//     if (sortKey) {
//       filtered = filtered.sort((a, b) => {
//         const valA = a[sortKey];
//         const valB = b[sortKey];
//         if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//         if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     return filtered;
//   }, [data, search, sortKey, sortOrder, filterKey]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handleSort = (key: string) => {
//     if (sortKey === key) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortKey(key);
//       setSortOrder("asc");
//     }
//   };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="table-container">
//       <div className="table-header">
//         <div>
//           <h2>{title}</h2>
//           {description && <p>{description}</p>}
//         </div>

//         <div className="table-controls">
//           <input
//             type="text"
//             placeholder={searchPlaceholder}
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//           />

//           {/* Sort dropdown */}
//           <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
//             <option value="">Sort By</option>
//             {columns.map((col) => (
//               <option key={col.key} value={col.key}>
//                 {col.label}
//               </option>
//             ))}
//           </select>

//           {/* Filter dropdown */}
//           <select
//             onChange={(e) => {
//               setFilterKey(e.target.value);
//               setCurrentPage(1);
//             }}
//             value={filterKey}
//           >
//             {filterOptions.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="table-wrapper">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   className={sortKey === col.key ? "active-sort" : ""}
//                 >
//                   {col.label}
//                   {sortKey === col.key && (
//                     <span className="sort-arrow">
//                       {sortOrder === "asc" ? " ▲" : " ▼"}
//                     </span>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length ? (
//               paginatedData.map((row, index) => (
//                 <tr key={index}>
//                   {columns.map((col) => (
//                     <td key={col.key}>{row[col.key]}</td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="no-data">
//                   No records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagination">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           ‹
//         </button>
//         <span>
//           Page <strong>{currentPage}</strong> of {totalPages || 1}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || totalPages === 0}
//         >
//           ›
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useState, useMemo } from "react";
import "./table.css";

export interface Column {
  key: string;
  label: string;
}

interface ReusableTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: Record<string, any>[];
  searchPlaceholder?: string;
  rowsPerPage?: number;
  showAddButton?: boolean; // ✅ new
  addButtonLabel?: string; // ✅ new
  onAddClick?: () => void; // ✅ new
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
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterKey, setFilterKey] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Compute unique filter values (using first column that makes sense)
  const filterOptions = ["All", ...new Set(data.map((item) => item.building))];

  // Filter + sort logic
  const filteredData = useMemo(() => {
    let filtered = data;

    if (filterKey !== "All") {
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
  }, [data, search, sortKey, sortOrder, filterKey]);

  // Pagination logic
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
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>

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
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>

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

          {/* ✅ Add button */}
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
                  onClick={() => handleSort(col.key)}
                  className={sortKey === col.key ? "active-sort" : ""}
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
                <tr key={index}>
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
