import { getAllTransactions, getAllSummaryTransactions } from './imports';
import './Home.css'
import SummaryList from './SummaryList';
import TransactionList from './TransactionList';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './Modal'; 
import Overlay from './Overlay';

export default function Home({ fruits, boxes, clients, frusionName }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [summaryTransactions, setSummaryTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refreshData();
  }, [selectedDate]);

  const refreshData = () => {
    Promise.all([
      getAllTransactions(),
      getAllSummaryTransactions(selectedDate, selectedDate)
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='page'>
      <div className='contentInterior'>
        <div id='frusionName'>{frusionName}</div>
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
              <button id='buttonHome' onClick={openModal}>Buy fruit</button>
              <Overlay isOpen={isModalOpen} onClose={closeModal}>
                <Modal onUpdate={refreshData} isOpen={isModalOpen} onClose={closeModal} fruits={fruits} boxes={boxes} clients={clients}/>
              </Overlay>
              
              <div className='methodPlace' id='methodPlaceHome'>
                <div className='titleSummary'>Summary</div>
                <SummaryList summaryTransactions={summaryTransactions} onUpdate={refreshData}/>
              </div>
            </div>
            <div>
              <TransactionList clients={clients} fruits={fruits} boxes={boxes} transactions={transactions} onUpdate={refreshData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}