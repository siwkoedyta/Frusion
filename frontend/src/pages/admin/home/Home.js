
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
import { getAllSummaryTrasactions } from '../../../api/transaction/getAllSummaryTrasactions';

export default function Home() {
  const { currentAdmin, setCurrentAdmin } = useCurrentAdmin();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [summaryTransactions, setSummaryTransactions] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!currentAdmin) {
      authCurrentAdmin()
        .then(admin => setCurrentAdmin(admin))
        .catch(error => console.error('Error fetching current admin:', error));
    }
  }, [currentAdmin, setCurrentAdmin]);

  useEffect(() => {
    refreshTransactions();
    refreshSummaryTransactions();
  }, [selectedDate]);
  
  const refreshTransactions = () => {
    Promise.all([getAllClients(), getAllFruits(), getAllBoxes(), getAllTransactions()])
      .then(([clientsData, fruitsData, boxesData, transactionsData]) => {
        const filteredTransactions = transactionsData.filter(transaction => {
          const transactionDate = new Date(transaction.transactionDate);
          return transactionDate.toDateString() === selectedDate.toDateString();
        });
        setClients(clientsData);
        setFruits(fruitsData);
        setBoxes(boxesData);
        setTransactions(filteredTransactions);
      })
      .catch(errors => {alert(errors);});
  };

  const refreshSummaryTransactions = () => {
    getAllSummaryTrasactions(selectedDate)
      .then(data => setSummaryTransactions(data))
      .catch(errors => alert(errors))
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
          <div id='buttonSummaryHome'>
              <button id='buttonHome'>Buy fruit</button>
              <div className='methodPlace' id='methodPlaceHome'>
                <div className='titleSummary'>Summary</div>
                <SummaryList summaryTransactions={summaryTransactions} onUpdate={refreshSummaryTransactions}/>
              </div>
          </div>
          <div>
              <TransactionList clients={clients} fruits={fruits} boxes={boxes} transactions={transactions} onUpdate={refreshTransactions}/>
          </div>
        </div>
      </div>
    </div>
  );
}