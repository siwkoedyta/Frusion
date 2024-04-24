import React, { useState, useEffect } from 'react';
import { getAllFruits } from '../../../api/fruit/getAllFruits';
import { getAllBoxes } from '../../../api/box/getAllBoxes';
import { getAllClients } from '../../../api/client/getAllClients';
import { getAllTransactions } from '../../../api/transaction/getAllTransaction';
import { authCurrent } from '../../../api/auth/authCurrent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClientSummaryList from './ClientSummaryList';
import ClientTransactionList from './ClientTrasactionList';
import { getAllSummaryTransactions } from '../../../api/transaction/getAllSummaryTransactions';

export default function ClientHome() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [summaryTransactions, setSummaryTransactions] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refreshData();
  }, [selectedDate]);


  const refreshData = () => {
    Promise.all([
      getAllClients(),
      getAllFruits(),
      getAllBoxes(),
      getAllTransactions(),
      getAllSummaryTransactions(selectedDate, selectedDate)
    ])
      .then(([clientsData, fruitsData, boxesData, transactionsData, summaryTransactionsData]) => {
        const filteredTransactions = transactionsData.filter(transaction => {
          const transactionDate = new Date(transaction.transactionDate);
          return transactionDate.toDateString() === selectedDate.toDateString();
        });
        setClients(clientsData);
        setFruits(fruitsData);
        setBoxes(boxesData);
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

        <div className='calendar'>
          <DatePicker
            className='calendar'
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        </div>

        <div className='mainContent'>
          <div id='buttonSummaryHome'>
            <div className='methodPlace' id='methodPlaceHome'>
              <div className='titleSummary'>Summary</div>
              <ClientSummaryList summaryTransactions={summaryTransactions} onUpdate={refreshData} />
            </div>
          </div>
          <div>
            <ClientTransactionList transactions={transactions} fruits={fruits} boxes={boxes}/>
          </div>
        </div>
      </div>
    </div>
  );
}