import React, { useState } from 'react';
import { addBox } from '../../../api/box/addBox.js';


export default function AddFruit({ onUpdate }) {
  const [boxName, setBoxName] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  const handleInputChangeName = (event) => {
    setBoxName(event.target.value);
  };

  const handleInputChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleAddBox = async (e) => {
    if (boxName.trim() === '') {
      setError('Select the name of the box');
      return;
    }

    if (weight.trim() === '') {
      setError('Enter the weight of the box');
      return;
    }

    return addBox(boxName, parseFloat(weight))
      .then(res => {
        setBoxName('')
        setWeight('')
        setError('');
        onUpdate();
      })
      .catch(errors => setError(errors))
  };
  return (
    <div className='methodPlace'>
      <div>Add box</div>
      <div className='inputGap'>
        <input
          type="text"
          id="nameBoxInput"
          name="boxName"
          value={boxName}
          onChange={handleInputChangeName}
          placeholder="Name of the box"
        />
        <input
          type="number"
          id="nameBoxInput"
          name="weight"
          value={weight}
          onChange={handleInputChangeWeight}
          placeholder="Weight of the box"
        />
      </div>
      {error && <div className="errorMessageMethod">{error}</div>}
      <button className='buttonMethod' onClick={handleAddBox}>Add</button>
    </div>
  );
}