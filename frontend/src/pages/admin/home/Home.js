
import { getAllFruits } from '../../../api/fruit/getAllFruits';
import { getAllBoxes } from '../../../api/box/getAllBoxes';
import { getAllClients } from '../../../api/client/getAllClients';
import { getAllTransactions } from '../../../api/transaction/getAllTransaction';
import { authCurrentAdmin } from '../../../api/auth/authCurrentAdmin';
import './Home.css'
import SummaryList from './SummaryList';
import TransactionList from './TransactionList';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCurrentAdmin } from '../../../CurrentAdminProvider';
import { getAllSummaryTransactions } from '../../../api/transaction/getAllSummaryTransactions';
import Modal from './Modal'; 
import Overlay from './Overlay';

export default function Home() {
  const { currentAdmin, setCurrentAdmin } = useCurrentAdmin();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [summaryTransactions, setSummaryTransactions] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!currentAdmin) {
      authCurrentAdmin()
        .then(admin => setCurrentAdmin(admin))
        .catch(error => console.error('Error fetching current admin:', error));
    }
  }, [currentAdmin, setCurrentAdmin]);

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
        <div id='frusionName'>{currentAdmin && currentAdmin.frusionName}</div>
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
                <Modal onUpdate={refreshData} isOpen={isModalOpen} onClose={closeModal} fruits={fruits} boxes={boxes}/>
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