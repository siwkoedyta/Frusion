import React, { useState } from 'react';
import { removeFruit } from '../../../api/removeFruit';

export default function RemoveFruit({fruits, onUpdate}) {
  const [selectedFruit, setSelectedFruit] = useState('');

  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const handleRemoveFruit = async () => {
    if (!selectedFruit) {
      alert('Please select a fruit');
      return;
    }

    removeFruit(selectedFruit)
    .then(() => {
      setSelectedFruit('');
      onUpdate()
    })
    .catch(error => {
      alert('Error removing fruit: ' + error);
    });
  };

  return (
    <div className='methodPlace'>
      <div className='titleMethod'>Remove fruit</div>
      <div>
        <select id="fruit" name="fruit" value={selectedFruit} onChange={handleFruitChange}>
          <option value="">Select a fruit</option>
          {fruits.map(fruit => (
            <option key={fruit.id} value={fruit.id}>{fruit.name}</option>
          ))}
        </select>
      </div>
      <button className='buttonMethod' onClick={handleRemoveFruit}>Remove</button>
    </div>
  );
}