import React, { useState } from 'react';
import { addBox } from '../../../api/box/addBox.js';


export default function AddFruit({ onUpdate }) {
  const [boxName, setBoxName] = useState('');
  const [weight, setWeight] = useState('');

  const handleInputChangeName = (event) => {
    setBoxName(event.target.value);
  };

  const handleInputChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleAddBox = async (e) => {
    if (boxName.trim() === '') {
      alert('Please enter the name of the fruit');
      return;
    }

    return addBox(boxName, parseFloat(weight))
      .then(res => {
        setBoxName('')
        setWeight('')
        onUpdate();
      })
      .catch(errors => alert(errors))
  };
  return (
    <div className='methodPlace'>
      <div className='titleMethod'>Add box</div>
      <div>
        <input
          type="text"
          id="nameBoxInput"
          name="boxName"
          value={boxName}
          onChange={handleInputChangeName}
          placeholder="Name of the box"
        />
        <input
          type="text"
          id="nameBoxInput"
          name="weight"
          value={weight}
          onChange={handleInputChangeWeight}
          placeholder="Weight of the box"
        />
      </div>
      <button className='buttonMethod' onClick={handleAddBox}>Add</button>
    </div>
  );
}