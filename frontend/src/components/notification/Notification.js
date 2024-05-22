import React, { useEffect } from 'react';

const Notification = ({ message, fruits, onRemove }) => {
  const fruit = fruits.find(fruit => fruit.id === message.fruitId);
  const fruitName = fruit ? fruit.name : 'Unknown';


  return (
    <div className="notification">
      <p>Fruit price of: {fruitName} was updated to PLN {message.newPrice}</p>
    </div>
  );
};

export default Notification;