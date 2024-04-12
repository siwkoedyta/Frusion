
import { getAllTransactions } from '../../../api/transaction/getAllTransaction';
import './Home.css'
import SummaryList from './SummaryList';
import TransactionList from './TransactionList';
import React, { useState, useEffect } from 'react';


export default function Home() {

  return (
    <div className='page'>
      <div className='contentInterior'>
        <div id='frusionName'>Your Frusion</div>
        <div className='calendar'>
          12.04.2023
        </div>
        <div className='mainContent'>
          <div id='buttonSummaryHome'>
              <button id='buttonHome'>Buy fruit</button>
              <div className='methodPlace' id='methodPlaceHome'>
                <div className='titleSummary'>Summary</div>
                <SummaryList/>
                <SummaryList/>
                <SummaryList/>
                <SummaryList/>
              </div>


          </div>
          <div>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
              <TransactionList/>
          </div>
        </div>
      </div>
    </div>
  );
}