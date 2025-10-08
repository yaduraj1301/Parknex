import { SlCalender } from "react-icons/sl";
// Import the Table component and its Column type
import { Table, type Column } from "../../../Components/Table/table";
import "./AllBookings.css";

export function AllBookings() {
    // Define the columns for the table. The `key` must match the property name in your future data objects.
    const bookingColumns: Column[] = [
        { key: 'bookingId', label: 'Booking Id' },
        { key: 'vehicleNo', label: 'Vehicle No.' },
        { key: 'client', label: 'Client/Employee' },
        { key: 'slotNo', label: 'Slot No.' },
        { key: 'status', label: 'Status' },
        { key: 'dateTime', label: 'Date & Time' }
    ];

    // For now, the data is an empty array as per your instructions.
    // Later, this will be fetched from your .NET backend.
    const bookingsData: any[] = [];

    return (
        <div className='all-bookings-page'>
            {/* The title and filters are now handled by the Table component */}

            <div className="bookings-layout">
                {/* Left Panel for the main table */}
                <div className="main-bookings-panel">
                    {/* Render the Table component here, replacing the placeholder */}
                    <Table
                        title="All bookings"
                        columns={bookingColumns}
                        data={bookingsData}
                    />
                </div>

                {/* Right Panel for Upcoming Bookings */}
                <div className="upcoming-bookings-panel">
                    <div className="upcoming-bookings-header">
                        <div className="header-icon-container">
                            <SlCalender />
                        </div>
                        <div className="header-text-container">
                            <h5>Upcoming Bookings</h5>
                            {/* <p>5 bookings scheduled</p> */}
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