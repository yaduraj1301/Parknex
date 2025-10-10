import { useState, useMemo } from "react"; // Import useMemo
import { SlCalender } from "react-icons/sl";
import "./AllBookings.css";
import { Table, type Column } from "../../../Components/Table/table";

export function AllBookings() {
    // State for our NEW custom filters
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('today');

    const bookingColumns: Column[] = [
        { key: 'bookingId', label: 'Booking Id' },
        { key: 'vehicleNo', label: 'Vehicle No.' },
        { key: 'client', label: 'Client/Employee' },
        { key: 'slotNo', label: 'Slot No.' },
        { key: 'status', label: 'Status' },
        { key: 'dateTime', label: 'Date & Time', sortable: true }
    ];

    // This is the MASTER data list. It should not be modified.
    const masterBookingsData = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
        bookingId: `#BK${10020 + i}`,
        vehicleNo: `KL-0${i % 9}-A-${1000 + i}`,
        client: i % 3 === 0 ? "John Doe" : i % 3 === 1 ? "Emily Davis" : "Mark Stokes",
        slotNo: `A-${10 + i}`,
        // Add different statuses for filtering
        status: i % 4 === 0 ? "Cancelled" : "Booked",
        dateTime: "08-10-2025 9:00 - 17:00"
    })), []);

    // Perform filtering BEFORE passing data to the Table component
    const filteredBookings = useMemo(() => {
        let data = masterBookingsData;

        // 1. Filter by status
        if (statusFilter !== 'all') {
            data = data.filter(booking => booking.status.toLowerCase() === statusFilter);
        }

        // 2. Filter by day (logic to be implemented later when date data is real)
        if (dateFilter === 'today') {
            // Placeholder for 'Today' logic
        } else if (dateFilter === 'yesterday') {
            // Placeholder for 'Yesterday' logic
        }

        return data;
    }, [masterBookingsData, statusFilter, dateFilter]);


    return (
        <div className='all-bookings-page'>
            <div className="bookings-layout">
                <div className="main-bookings-panel">
                    <div className="table-component-wrapper">
                        
                        {/* OUR NEW CUSTOM FILTERS - Rendered on top via CSS */}
                        <div className="custom-filters-overlay">
                            <select
                                className="custom-filter-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="booked">Booked</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <select
                                className="custom-filter-select"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                <option value="all">All Days</option>
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                            </select>
                        </div>

                        <Table
                            title="All bookings"
                            columns={bookingColumns}
                            // Pass the PRE-FILTERED data to the table
                            data={filteredBookings} 
                        />
                    </div>
                </div>

                <div className="upcoming-bookings-panel">
                    {/* ... upcoming bookings content ... */}
                    <div className="upcoming-bookings-header">
                        <div className="header-icon-container">
                            <SlCalender />
                        </div>
                        <div className="header-text-container">
                            <h5>Upcoming Bookings</h5>
                            <p>5 bookings scheduled</p>
                        </div>
                    </div>
                    <div className="upcoming-bookings-content">
                        <p>Scrollable list of upcoming booking cards...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}