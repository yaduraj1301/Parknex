import { useState } from 'react';
import { DateRangePicker } from '../../../Components/DateRangePicker/DateRangePicker';
import "./ReserveSlot.css";

export function ReserveSlot() {
    // This state holds the array of selected dates
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    // This function handles selecting and de-selecting dates
    const handleDateSelect = (date: Date) => {
        // Check if the date is already selected
        const isAlreadySelected = selectedDates.some(
            selectedDate => selectedDate.getTime() === date.getTime()
        );

        if (isAlreadySelected) {
            // If it is, remove it (de-select)
            setSelectedDates(prevDates =>
                prevDates.filter(d => d.getTime() !== date.getTime())
            );
        } else {
            // If it's not, add it to the array (select)
            setSelectedDates(prevDates => [...prevDates, date]);
        }
    };

    return (
        <div className="reserve-slot-container">
            <DateRangePicker 
                selectedDates={selectedDates}
                onDateSelect={handleDateSelect}
            />

            {/* We will add the slot selection UI here next */}
            <div className="slot-selection-placeholder">
                <p>Slot selection will go here.</p>
                {selectedDates.length > 0 && (
                    <div>
                        <p><strong>Dates Selected:</strong></p>
                        <ul>
                            {selectedDates
                                .sort((a, b) => a.getTime() - b.getTime())
                                .map(d => <li key={d.toISOString()}>{d.toLocaleDateString()}</li>)
                            }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}