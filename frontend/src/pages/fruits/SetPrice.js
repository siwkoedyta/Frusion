import './Fruits.css'

import React, { useState } from 'react';
import { setFruitPrice } from '../../api/setFruitPrice';

export default function SetPrice({ fruits, onUpdate }) {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleSetPrice = async (e) => {
    if (!selectedFruit) {
      alert('Please select a fruit');
      return;
    }
    if (!newPrice) {
      alert('Please enter a new price');
      return;
    }

    return setFruitPrice(selectedFruit, parseFloat(newPrice))
    .then(() => {
      setSelectedFruit('');
      setNewPrice('');
      onUpdate();
    })
    .catch(errors => alert(errors));
  };

  return (
    <div className='methodPlace'>
      Set the price
      <div>
        <select id="fruit" name="fruit" value={selectedFruit} onChange={handleFruitChange}>
          <option value="">Select a fruit</option>
          {fruits.map(fruit => (
            <option key={fruit.id} value={fruit.id}>{fruit.name}</option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="text"
          id="price"
          name="price"
          value={newPrice}
          onChange={handlePriceChange}
          placeholder="Price"
        />
      </div>

      <button onClick={handleSetPrice}>Set</button>
    </div>
  );
}