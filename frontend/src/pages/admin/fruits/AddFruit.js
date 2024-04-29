import React, { useState } from 'react';
import { addFruit } from '../../../api/fruit/addFruit.js';

export default function AddFruit({ onUpdate }) {
  const [fruitName, setFruitName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setFruitName(event.target.value);
  };

  const handleAddFruit = async () => {
    if (fruitName.trim() === '') {
      setError('Select the name of the fruit');
      return;
    }

    try {
      await addFruit(fruitName);
      setFruitName('');
      setError('');
      onUpdate();
    } catch (errors) {
      setError(errors);
    }
  };

  return (
    <div className='methodPlace'>
      <div>Add fruit</div>
      <div>
        <input
          type="text"
          id="fruitName"
          name="fruitName"
          value={fruitName}
          onChange={handleInputChange}
          placeholder="Name of the fruit"
        />
      </div>
      {error && <div className="errorMessageMethod">{error}</div>}
      <button className='buttonMethod' onClick={handleAddFruit}>Add</button>
    </div>
  );
}