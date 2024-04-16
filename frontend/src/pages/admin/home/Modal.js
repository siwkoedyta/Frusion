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

  useEffect(() => {
    if (secondInputRef.current) {
      const rect = secondInputRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom); // Ustawienie górnej pozycji dropdowna na dnie drugiego inputa
    }
  }, []);

  if (!isOpen) return null;

  const onChange = (event) => {
    setFruitId(event.target.value);
  };

  const handleAddTransaction = async (e) => {
    return addTransaction(clientId, fruitId, weightGross, boxId, numberOfBoxes)
      .then(res => {
        onClose();
        onUpdate();
      })
      .catch(errors => alert(errors));
  };

  const onSearch = (searchFruit) => {
    setFruitId(searchFruit);
  };

  const filteredFruits = fruits.filter(fruit => !fruit.archived);
  const filteredBoxes = boxes.filter(box => !box.archived);

  return (
    <div className="modal">
      <div className='titleModal'>Buy fruit</div>

        <input type="text" placeholder="First and last name" value={clientId} onChange={e => setClientId(e.target.value)} />


        <input ref={secondInputRef} type="text" value={fruitId} onChange={onChange} placeholder='Fruit' />
        <div className='dropdown' style={{ top: dropdownTop }}>
          {filteredFruits.filter(fruit => {
            const searchFruit = fruitId.toLowerCase();
            const name = fruit.name.toLowerCase();
            return searchFruit && name.startsWith(searchFruit) && name !== searchFruit;
          }).slice(0,10)
            .map(fruit => (
              <div  key={fruit.name} className='dropdown-row' onClick={()=>onSearch(fruit.name)}>
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