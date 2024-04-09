export default function StatusCalendar() {
  return (
    <div id='statusCalendar'>
        <div id='startCalendar'>
            <div className='titleCalendar' id='startingDate'>Starting date:</div>
            <div className='calendar'>12.03.2024</div>
        </div>

        <div id='endCalendar'>
            <div className='titleCalendar' id='endDate'>End date:</div>
            <div className='calendar'>12.03.2024</div> 
        </div>
    </div>
  );
}