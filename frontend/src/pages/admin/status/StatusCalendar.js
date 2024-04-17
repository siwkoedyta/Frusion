import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function StatusCalendar({ selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
  return (
    <div className='calendar-container' id='statusCalendar'>
        <div id='startCalendar'>
          <div className='titleCalendar' id='startingDate'>Starting date:</div>
          <DatePicker
            className='calendar'
            selected={selectedStartDate}
            onChange={date => setSelectedStartDate(date)}
          />
        </div>
        <div id='endCalendar' >
          <div className='titleCalendar' id='endDate'>End date:</div>
          <DatePicker
            className='calendar'
            selected={selectedEndDate}
            onChange={date => setSelectedEndDate(date)}
          />
        </div>
    </div>
  );
}