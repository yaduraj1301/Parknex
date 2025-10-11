import { useState, useMemo } from "react";
import { SlCalender } from "react-icons/sl";
import "./AllReservations.css";
import { Table, type Column } from "../../../Components/Table/table";
import { UpcomingBookingCard, type Booking } from "./UpcomingBookingCard/UpcomingBookingCard"; // Import card
import { Modal } from "../../../Components/Modal/Modal"; // Import modal

export function AllReservations() {
    // State for modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // ... your existing filter state and logic
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('today');
    const bookingColumns: Column[] = [
        { key: 'bookingId', label: 'Booking Id' }, { key: 'vehicleNo', label: 'Vehicle No.' },
        { key: 'client', label: 'Client/Employee' }, { key: 'slotNo', label: 'Slot No.' },
        { key: 'status', label: 'Status' }, { key: 'dateTime', label: 'Date & Time', sortable: true }
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


    const upcomingBookingsData: Booking[] = [
        { id: '#BK124', date: '2024-01-15', startTime: '09:00 AM', vehicleNo: 'ABC-789', slotNo: 'C-305', duration: '09:00 AM - 05:00 PM', client: 'Emily Davis' },
        { id: '#BK125', date: '2024-01-15', startTime: '10:00 AM', vehicleNo: 'XYZ-123', slotNo: 'A-112', duration: '10:00 AM - 01:00 PM', client: 'John Smith' },
        { id: '#BK126', date: '2024-01-16', startTime: '09:30 AM', vehicleNo: 'MUM-456', slotNo: 'B-201', duration: '09:30 AM - 06:00 PM', client: 'Alex Hales' },
        { id: '#BK127', date: '2024-01-16', startTime: '11:00 AM', vehicleNo: 'PRQ-789', slotNo: 'C-310', duration: '11:00 AM - 02:00 PM', client: 'Ben Stokes' },
        { id: '#BK128', date: '2024-01-17', startTime: '01:00 PM', vehicleNo: 'COC-321', slotNo: 'A-104', duration: '01:00 PM - 05:00 PM', client: 'Ross Taylor' },
    ];
    
    // Handlers for modal
    const handleEditClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedBooking(null);
    };

    const handleDelete = (bookingId: string) => {
        alert(`Delete functionality for booking ${bookingId} will be added later.`);
    };

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
                        {upcomingBookingsData.map(booking => (
                            <UpcomingBookingCard
                                key={booking.id}
                                booking={booking}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Render the Modal conditionally */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                title={`Edit Booking ${selectedBooking?.id || ''}`}
            >
                <div>
                    <p>Here you can add form fields to edit details for <strong>{selectedBooking?.client}</strong>.</p>
                    <br />
                    <p>And below, the <strong>Slot Overview</strong> component will be rendered.</p>
                    {/* <SlotVisualizer bookingDate={selectedBooking?.date} selectedSlot={selectedBooking?.slotNo} /> */}
                </div>
            </Modal>
        </div>
    );
}