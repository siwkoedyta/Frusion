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
  const [isModalOpen, setModalOpen] = useState(false);

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
              <ClientSummaryList  />
            </div>
          </div>
          <div>
            {/* <ClientTransactionList /> */}
          </div>
        </div>
      </div>
    </div>
  );
}