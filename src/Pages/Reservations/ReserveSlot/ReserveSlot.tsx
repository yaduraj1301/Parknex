import { useState } from 'react';
import { DateRangePicker } from '../../../Components/DateRangePicker/DateRangePicker';
// BUG FIX: Correct icon name from TbPillar to TbPill
import { TbPill, TbCornerUpRight } from "react-icons/tb"; 
import "./ReserveSlot.css";

export function ReserveSlot() {
    // This state holds the array of selected dates
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const handleDateSelect = (date: Date) => {
        const isAlreadySelected = selectedDates.some(
            selectedDate => selectedDate.getTime() === date.getTime()
        );

        if (isAlreadySelected) {
            setSelectedDates(prevDates =>
                prevDates.filter(d => d.getTime() !== date.getTime())
            );
        } else {
            setSelectedDates(prevDates => [...prevDates, date]);
        }
    };

    return (
        <div className='reserve-slot-container'>
            <DateRangePicker
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
            />

            <br></br>
            
            <div className="slot-selection-container">
                <div className="slot-selection-header">
                    <h4>Select slots to book</h4>
                    <div className="slot-legend">
                        <div className="legend-item">
                            {/* BUG FIX: Use the correct component name */}
                            <TbPill className="legend-icon" /> Pillar
                        </div>
                        <div className="legend-item">
                            <TbCornerUpRight className="legend-icon" /> Corner
                        </div>
                        <div className="legend-item">
                            <span className="legend-color-dot" style={{ backgroundColor: '#a3e635' }}></span> Available
                        </div>
                        <div className="legend-item">
                            <span className="legend-color-dot" style={{ backgroundColor: '#d1d5db' }}></span> Unavailable
                        </div>
                        <div className="legend-item">
                            <span className="legend-color-dot" style={{ backgroundColor: '#3b82f6' }}></span> Selected
                        </div>
                    </div>
                </div>

                {/* This is where the actual slot visualizer component will go later */}
                <div className="slot-grid-placeholder">
                    {/* Slot component will be imported here */}
                </div>
            </div>
        </div>
    );
}