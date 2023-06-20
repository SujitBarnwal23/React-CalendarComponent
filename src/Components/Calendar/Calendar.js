import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDateClick = (day) => {
    if (selectedMonth && selectedYear) {
      const formattedDate = new Date(`${selectedYear}-${selectedMonth}-${day}`);
      setSelectedDate(formattedDate);
      console.log('Selected Date:', formattedDate);
    }
  };

  const getDaysInMonth = () => {
    if (selectedMonth && selectedYear) {
      const days = new Date(selectedYear, selectedMonth, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    }
    return [];
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayIndex = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const startOffset = (firstDayIndex + 6) % 7; // Offset to handle starting day of the week

    const grid = [];
    let row = [];

    for (let i = 0; i < startOffset; i++) {
      row.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    daysInMonth.forEach((day) => {
      row.push(
        <div
          key={day}
          className={`calendar-day`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );

      if (row.length === 7) {
        grid.push(<div key={`row-${grid.length}`} className="calendar-row">{row}</div>);
        row = [];
      }
    });

    if (row.length > 0) {
      grid.push(<div key={`row-${grid.length}`} className="calendar-row">{row}</div>);
    }

    return grid;
  };

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <div className="calendar-header">
        <div className="calendar-select">
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="calendar-input">
          <input type="number" placeholder="Enter Year" value={selectedYear} onChange={handleYearChange} />
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-header-week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

export default Calendar;
