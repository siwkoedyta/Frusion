
import './Status.css'
import StatusSummaryList from './StatusSummaryList';
import StatusAmmountList from './StatusAmmountList';
import StatusBoxesList from './StatusBoxesList';
import StatusCalendar from './StatusCalendar';


export default function Status() {
  return (
    <div className='page'>
      <div className='contentInterior'>
        <StatusCalendar/>
        <div className='mainContent' id='statusMainContent'>
            <div>
                <div className='nameSection'>Weight</div>
                <StatusSummaryList/>
            </div>
            <div>
                <div className='nameSection'>Boxes</div>
                <div className='featuredField' id='featuredFieldStatusBoxes'>
                    <div>ALL</div>
                    <div>2</div>
                </div>
                <StatusBoxesList/>
            </div>
            <div>
                <div className='nameSection'>Amount</div>
                <div className='featuredField' id='featuredFieldStatusAmount'>
                    <div>ALL</div>
                    <div id='statusPriceFieldALL'>
                        <div id='statusPriceALL'>2456,80</div>zł
                    </div>
                </div>
                <StatusAmmountList/>
            </div>
        </div>
      </div>
    </div>
  );
}