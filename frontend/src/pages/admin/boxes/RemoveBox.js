import React, { useState } from 'react';
import { removeBox } from '../../../api/box/removeBox';

export default function RemoveBox({ boxes, onUpdate }) {
  const [error, setError] = useState('');
  const [selectedBox, setSelectedBox] = useState('');

  const handleBoxChange = (event) => {
    setSelectedBox(event.target.value);
  };

  const handleRemoveBox = async () => {
    if (!selectedBox) {
      setError('Please select a box');
      return;
    }

    removeBox(selectedBox)
    .then(() => {
      setSelectedBox('');
      setError('');
      onUpdate()
    })
    .catch(error => {
      setError('Error removing box: ' + error);
    });
  };

  return (
    <div className='methodPlace'>
      <div>Remove box</div>
      <div>
        <select id="box" name="box" value={selectedBox} onChange={handleBoxChange}>
          <option key="" value="">Select a box</option>
          {boxes.map(box => (
            <option key={box.id} value={box.id}>{box.name}</option>
          ))}
        </select>
      </div>
      {error && <div className="errorMessageMethod">{error}</div>}
      <button className='buttonMethod' onClick={handleRemoveBox}>Remove</button>
    </div>
  );
}