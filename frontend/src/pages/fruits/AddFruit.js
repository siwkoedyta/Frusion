import './Methods.css';
import React, { useState } from 'react';
import '../../api/addFruit.js'
import { addFruit } from '../../api/addFruit.js';

export default function AddFruit() {
  const [fruitName, setFruitName] = useState('');

  const handleInputChange = (event) => {
    setFruitName(event.target.value);
  };

  const handleAddFruit = async (e) => {
    if (fruitName.trim() === '') {
      alert('Please enter the name of the fruit');
      return;
    }

    return addFruit(fruitName)
      .then(res => {
        alert('dodano')
        setFruitName('')
      })
      .catch(errors => alert(errors))
  };

  return (
    <div className='methodPlace'>
      Add Fruit
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
      <button onClick={handleAddFruit}>Add</button>
    </div>
  );
}