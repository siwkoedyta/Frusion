import React from 'react';

export default function StatusAmmountList({ summaryTransactions }) {
  return (
    <div>
      {summaryTransactions && summaryTransactions.map(transaction => (
        <div key={transaction.fruitId} id={`${transaction.fruitId}`}>
          <div className='field statusField' id={`${transaction.fruitId}`}>
            <div>{transaction.fruitName}</div>
            <div id='statusPriceField'>
              <div id='price'>{transaction.sumAmount.toFixed(2)}</div>
              <div>zł</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}