import { useState } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isSaturday,
    isSunday,
    isBefore,
    startOfDay,
    isToday,
} from 'date-fns';
import './DateRangePicker.css';

// Define the props the component will accept
interface DateRangePickerProps {
    selectedDates: Date[];
    onDateSelect: (date: Date) => void;
}

export function DateRangePicker({ selectedDates, onDateSelect }: DateRangePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get the start of today once, for comparison
    const today = startOfDay(new Date());

    const nextMonth = addMonths(currentMonth, 1);

    const isPrevDisabled = isSameMonth(currentMonth, today);

    const handlePrevMonth = () => {
        if (isPrevDisabled) return; // Extra safety
        setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => addMonths(prev, 1));
    };

    const renderCalendar = (monthToRender: Date) => {
        const monthStart = startOfMonth(monthToRender);
        const monthEnd = endOfMonth(monthStart);
        // Adjust startOfWeek to use Monday as the first day
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="calendar">
                <div className="calendar-header">
                    <h3>{format(monthToRender, 'MMMM yyyy')}</h3>
                </div>
                <div className="days-of-week">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="days-grid">
                    {days.map((day) => {
                        const isSelected = selectedDates.some(selectedDate => isSameDay(day, selectedDate));
                        const isInCurrentMonth = isSameMonth(day, monthToRender);
                        const isWeekend = isSaturday(day) || isSunday(day);

                        const isPastDay = isBefore(day, today);
                        const isTodayDate = isToday(day);

                        const dayClasses = `
              day
              ${!isInCurrentMonth ? 'other-month' : ''}
              ${isWeekend && isInCurrentMonth ? 'weekend' : ''}
              ${/* BUG FIX: Only apply 'selected' class if the day is in the current month */ ''}
              ${isSelected && isInCurrentMonth ? 'selected' : ''}
              ${isPastDay ? 'past-day' : ''}
              ${isTodayDate ? 'today' : ''}
            `;

                        const handleDayClick = () => {
                            // Allow clicks only on future days within the current month view
                            if (!isPastDay && isInCurrentMonth) {
                                onDateSelect(day);
                            }
                        };

                        return (
                            <div
                                key={day.toString()}
                                className={dayClasses}
                                onClick={handleDayClick}
                            >
                                {isInCurrentMonth && format(day, 'd')}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="date-picker-container">
            <h4>Select date</h4>
            <div className="date-picker-navigation">
                <button
                    onClick={handlePrevMonth}
                    className="nav-button"
                    disabled={isPrevDisabled}
                >
                    &lt;
                </button>
                <div className="calendars-wrapper">
                    {renderCalendar(currentMonth)}
                    {renderCalendar(nextMonth)}
                </div>
                <button onClick={handleNextMonth} className="nav-button">
                    &gt;
                </button>
            </div>
        </div>
    );
}