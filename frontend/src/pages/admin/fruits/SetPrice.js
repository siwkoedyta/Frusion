import React, { useState } from 'react';
import { setFruitPrice } from '../../../api/fruit/setFruitPrice';

export default function SetPrice({ fruits, onUpdate }) {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [error, setError] = useState('');

  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleSetPrice = async () => {
    if (!selectedFruit) {
      setError('Select a fruit');
      return;
    }
    if (!newPrice) {
      setError('Enter a new price');
      return;
    }

    if (parseFloat(newPrice) < 0) {
      setError('Price cannot be negative');
      return;
    }

    try {
      await setFruitPrice(selectedFruit, parseFloat(newPrice));
      setSelectedFruit('');
      setNewPrice('');
      setError('');
      onUpdate();
    } catch (errors) {
      setError(errors.message || 'An error occurred while setting the price');
    }
  };

  return (
    <div className='methodPlace'>
      <div>Set the price</div>
      <div className='inputGap'>
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
            type="number"
            id="price"
            name="price"
            value={newPrice}
            onChange={handlePriceChange}
            placeholder="Price"
          />
        </div>
      </div>
      {error && <div className="errorMessageMethod">{error}</div>}
      <button className='buttonMethod' onClick={handleSetPrice}>Set</button>
    </div>
  );
}