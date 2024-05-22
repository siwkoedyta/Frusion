import React, { useEffect } from 'react';

const Notification = ({ message, fruits, onRemove }) => {
  const fruit = fruits.find(fruit => fruit.id === message.fruitId);
  const fruitName = fruit ? fruit.name : 'Unknown';

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(message.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message.id, onRemove]);

  return (
    <div className="notification">
      <p>Fruit price of: {fruitName} was updated to PLN {message.newPrice}</p>
    </div>
  );
};

export default Notification;