import React, { useState, useEffect } from 'react';
import './Status.css';
import SummaryList from '../home/SummaryList';
import StatusAmmountList from './StatusAmmountList';
import StatusBoxesList from './StatusBoxesList';
import StatusCalendar from './StatusCalendar';
import { getAllSummaryTransactions } from '../../../api/transaction/getAllSummaryTransactions';


export default function Status() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [summaryTransactions, setSummaryTransactions] = useState([]);

  useEffect(() => {
    refreshData();
  }, [selectedStartDate, selectedEndDate]);

  const refreshData = () => {
    Promise.all([
      getAllSummaryTransactions(selectedStartDate, selectedEndDate) 
    ])
      .then(([summaryTransactionsData]) => {
        setSummaryTransactions(summaryTransactionsData);
      })
      .catch(errors => {
        console.error('Error refreshing data:', errors);
        alert('Error refreshing data. Please try again later.');
      });
  };

  const calculateTotalBoxes = () => {
    return summaryTransactions.reduce((total, transaction) => {
      return total + transaction.boxes.reduce((sum, box) => sum + box.quantity, 0);
    }, 0);
  };

  const calculateTotalAmount = () => {
    return summaryTransactions.reduce((total, transaction) => total + transaction.sumAmount, 0).toFixed(2);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <div className='page'>
      <div className='contentInterior'>
        <StatusCalendar
          selectedStartDate={selectedStartDate}
          setSelectedStartDate={handleStartDateChange}
          selectedEndDate={selectedEndDate}
          setSelectedEndDate={handleEndDateChange}
        />
        <div className='mainContent'>
          <div className='mainContentInsideHomeStatus'>
            <div>
                <div className='nameSection' id='weightStatus'>Weight</div>
                <SummaryList  id='nameFruitStatus' summaryTransactions={summaryTransactions} />
            </div>
            <div className='flexWrapContainer'>
              <div>
                    <div className='nameSection'>Boxes</div>
                    <div className='featuredField' id='featuredFieldStatusBoxes'>
                      <div>ALL</div>
                      <div>{calculateTotalBoxes()}</div>
                    </div>
                    <StatusBoxesList summaryTransactions={summaryTransactions} />
                </div>
                <div>
                    <div className='nameSection'>Amount</div>
                    <div className='featuredField' id='featuredFieldStatusAmount'>
                        <div>ALL</div>
                        <div id='statusPriceFieldALL'>
                            <div id='statusPriceALL'>{calculateTotalAmount()}</div>zł
                        </div>
                    </div>
                    <StatusAmmountList summaryTransactions={summaryTransactions} />
                </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}