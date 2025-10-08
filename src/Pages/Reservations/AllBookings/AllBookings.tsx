import { SlCalender } from "react-icons/sl";
import "./AllBookings.css";
import { Table, type Column } from "../../../Components/Table/table";

export function AllBookings() {
    const bookingColumns: Column[] = [
        { key: 'bookingId', label: 'Booking Id' },
        { key: 'vehicleNo', label: 'Vehicle No.' },
        { key: 'client', label: 'Client/Employee' },
        { key: 'slotNo', label: 'Slot No.' },
        { key: 'status', label: 'Status' },
        { key: 'dateTime', label: 'Date & Time' }
    ];

    // const bookingsData: any[] = [];
    const bookingsData = Array.from({ length: 20 }, (_, i) => ({
        bookingId: 10020 + i,
        vehicleNo: "KL0973A123",
        client: "John Doe",
        slotNo: "78",
        status: "Booked",
        dateTime: "08-10-2025 9:00 - 17:00"
    }));

    return (
        <div className='all-bookings-page'>
            <div className="bookings-layout">
                <div className="main-bookings-panel">
                    {/* Add a wrapper div here for CSS overrides */}
                    <div className="table-component-wrapper">
                        <Table
                            title="All bookings"
                            columns={bookingColumns}
                            data={bookingsData}
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