import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function StatusCalendar({ selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
  const handleStartDateChange = (date) => {
    if (date > selectedEndDate) {
      alert('Starting date cannot be later than end date');
      return;
    }
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date < selectedStartDate) {
      alert('End date cannot be earlier than starting date');
      return;
    }
    setSelectedEndDate(date);
  };

  return (
    <div className='calendar-container' id='statusCalendar'>
      <div id='calendars' className='calendar-flex-container'>
        <div id='startCalendar' className='calendar-item'>
          <div className='titleCalendar' id='startingDate'>Starting date:</div>
          <DatePicker
            className='calendar'
            selected={selectedStartDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div id='endCalendar' className='calendar-item'>
          <div className='titleCalendar' id='endDate'>End date:</div>
          <DatePicker
            className='calendar'
            selected={selectedEndDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
    </div>
  );
}