import "./quickactions.css"

export function QuickActions  ({ 
  searchTerm, 
  setSearchTerm, 
  blockFilter, 
  setBlockFilter, 
  statusFilter, 
  setStatusFilter,
  onClearFilters 
}: { 
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  blockFilter: string;
  setBlockFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onClearFilters: () => void;
})  {
  return (
    <div className="quick-actions">
      <h3 className="section-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        <div className="form-group">
          {/* <label className="form-label">Search</label> */}
          <input 
            type="text" 
            placeholder="Search by spot, vehicle, owner..." 
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <label className="form-label">View EV Slots</label> */}
          <select 
            className="form-select"
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
          >
            <option value="all">All Blocks</option>
            <option value="A">A-Block</option>
            <option value="B">B-Block</option>
            <option value="C">C-Block</option>
          </select>
        </div>
        <div className="form-group">
          {/* <label className="form-label">View Handicapped Slots</label> */}
          <select 
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="empty">Empty</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="form-group">
          {/* <label className="form-label">Clear Filters</label> */}
          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={onClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

