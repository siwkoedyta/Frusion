import React, { useState, useRef, useEffect } from 'react';
import { addTransaction } from '../../../api/transaction/addTransaction';

const Modal = ({ onUpdate, isOpen, onClose, fruits, boxes }) => {
  const [clientId, setClientId] = useState('');
  const [fruitId, setFruitId] = useState('');
  const [weightGross, setWeightGross] = useState('');
  const [boxId, setBoxId] = useState('');
  const [numberOfBoxes, setNumberOfBoxes] = useState('');
  const [dropdownTop, setDropdownTop] = useState(0);
  const secondInputRef = useRef(null);

  const filteredFruits = fruits.filter(fruit => !fruit.archived);
  const filteredBoxes = boxes.filter(box => !box.archived);

useEffect(() => {
  if (secondInputRef.current) {
    const rect = secondInputRef.current.getBoundingClientRect();
    setDropdownTop(rect.bottom);
  }

  const dropdownFruit = filteredFruits.filter(fruit => {
    const searchFruit = fruitId.toLowerCase();
    const name = fruit.name.toLowerCase();
    return searchFruit && name.startsWith(searchFruit) && name !== searchFruit;
  });

  if (dropdownFruit.length === 1) {
    setFruitId(dropdownFruit[0].name);
  }
}, [fruitId, filteredFruits]);

  if (!isOpen) return null;

  const onChange = (event) => {
    setFruitId(event.target.value);
  };

  const handleAddTransaction = async () => {
    try {
      await addTransaction(clientId, fruitId, weightGross, boxId, numberOfBoxes);
      onClose();
      onUpdate();
    } catch (error) {
      alert(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.length === 1 && fruitId.length === filteredFruits[0].name.length) {
      event.preventDefault();
    }
  };

  return (
    <div className="modal">
      <div className='titleModal'>Buy fruit</div>

      <input type="text" placeholder="First and last name" value={clientId} onChange={e => setClientId(e.target.value)} />

      <input ref={secondInputRef} type="text" value={fruitId} onChange={onChange} onKeyPress={handleKeyPress} placeholder='Fruit' />

      <div className='dropdown' style={{ top: dropdownTop }}>
        {filteredFruits
          .filter(fruit => {
            const searchFruit = fruitId.toLowerCase();
            const name = fruit.name.toLowerCase();
            return searchFruit && name.startsWith(searchFruit) && name !== searchFruit;
          })
          .slice(0, 10)
          .map(fruit => (
            <div key={fruit.id} className='dropdown-row' onClick={() => setFruitId(fruit.id)}>
              {fruit.name}
            </div>
          ))}
      </div>

      <input type="text" placeholder="Gross weight" value={weightGross} onChange={e => setWeightGross(e.target.value)} />


      <select value={boxId} onChange={e => setBoxId(e.target.value)}>
        <option key="" value="">Select a box</option>
        {filteredBoxes.map(box => (
          <option key={box.id} value={box.id}>{box.name}</option>
        ))}
      </select>


      <input type="text" placeholder="Number of boxes" value={numberOfBoxes} onChange={e => setNumberOfBoxes(e.target.value)} />

      <div className='buttonsModal'>
        <button onClick={handleAddTransaction}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;