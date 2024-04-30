 import React, { useState, useEffect } from 'react';
import { getAllTransactionsClient } from '../../../api/transaction/getAllTransactionsClient';
import { authCurrent } from '../../../api/auth/authCurrent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClientSummaryList from './ClientSummaryList';
import ClientTransactionList from './ClientTrasactionList';
import { getAllSummaryTransactionsClient } from '../../../api/transaction/getAllSummaryTransactionsClient';

export default function ClientHome({ fruits, boxes }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [summaryTransactions, setSummaryTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    refreshData();
  }, [selectedDate]);

  const refreshData = () => {
    Promise.all([
      getAllTransactionsClient(),
      getAllSummaryTransactionsClient(selectedDate, selectedDate)
    ])
      .then(([transactionsData, summaryTransactionsData]) => {
        const filteredTransactions = transactionsData.filter(transaction => {
          const transactionDate = new Date(transaction.transactionDate);
          return transactionDate.toDateString() === selectedDate.toDateString();
        });
        setTransactions(filteredTransactions);
        setSummaryTransactions(summaryTransactionsData);
      })
      .catch(errors => {
        console.error('Error refreshing data:', errors);
        alert('Error refreshing data. Please try again later.');
      });
  };

  return (
    <div className='page'>
      <div className='contentInterior'>
        <div className='calendar-container'>
          <DatePicker
            className='calendar'
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        </div>
        <div className='mainContent'>
          <div className='mainContentInsideHomeStatus'>
            <div id='buttonSummaryHome'>
              <div className='methodPlace' id='methodPlaceHome'>
                <div className='titleSummary'>Summary</div>
                <ClientSummaryList summaryTransactions={summaryTransactions} onUpdate={refreshData}/>
              </div>
            </div>
            <div>
              <ClientTransactionList fruits={fruits} boxes={boxes} transactions={transactions} onUpdate={refreshData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}