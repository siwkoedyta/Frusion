
import ClientSummaryList from './ClientSummaryList';
import ClientTransactionList from './ClientTrasactionList';

export default function ClientHome() {
  return (
    <div className='page'>
      <div className='contentInterior'>

        <div className='calendar'>
          12.04.2023
        </div>

        <div className='mainContent'>
          <div id='buttonSummaryHome'>
              <div className='methodPlace' id='methodPlaceHome'>
                <div className='titleSummary'>Summary</div>
                <ClientSummaryList/>
                <ClientSummaryList/>
                <ClientSummaryList/>
                <ClientSummaryList/>
                <ClientSummaryList/>
              </div>
          </div>
          <div>
                <ClientTransactionList/>
                <ClientTransactionList/>
                <ClientTransactionList/>
                <ClientTransactionList/>
                <ClientTransactionList/>
                <ClientTransactionList/>
                <ClientTransactionList/>
          </div>
        </div>
      </div>
    </div>
  );
}