import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

export default function StatusCalendar() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

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