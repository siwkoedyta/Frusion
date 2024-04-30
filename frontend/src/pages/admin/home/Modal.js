import React, { useState, useRef, useEffect } from 'react';
import { addTransaction } from '../../../api/transaction/addTransaction';

const Modal = ({ onUpdate, isOpen, onClose, fruits, boxes, clients }) => {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [fruitId, setFruitId] = useState('');
  const [fruitName, setFruitName] = useState('');
  const [weightGross, setWeightGross] = useState('');
  const [boxId, setBoxId] = useState('');
  const [boxName, setBoxName] = useState('');
  const [numberOfBoxes, setNumberOfBoxes] = useState('');
  const [error, setError] =  useState('');


  const [fruitDropdownTop, setFruitDropdownTop] = useState(0);
  const [boxDropdownTop, setBoxDropdownTop] = useState(0);
  const [clientDropdownTop, setClientDropdownTop] = useState(0);

  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const filteredFruits = fruits.filter(fruit => !fruit.archived);
  const filteredBoxes = boxes.filter(box => !box.archived);
  const filteredClients = clients.filter(client => !client.archived);

  const clientIds = filteredClients.map(client => client.id);
  const fruitIds = filteredFruits.map(fruit => fruit.id);
  const boxIds = filteredBoxes.map(box => box.id);

  const refsAndSetters = [
    { ref: secondInputRef, setter: setFruitDropdownTop },
    { ref: thirdInputRef, setter: setBoxDropdownTop },
    { ref: fourthInputRef, setter: setClientDropdownTop }
  ];

  const setDropdownValues = (dropdown, setId, setName) => {
    if (dropdown.length === 1) {
      setId(dropdown[0].id);
      setName(dropdown[0].name);
    }
  };

  const generateDropdown = (items, itemName, inputValue) => {
    return items.filter(item => {
      const searchItem = inputValue.toLowerCase();
      const name = item[itemName].toLowerCase();
      return searchItem && name.startsWith(searchItem) && name !== searchItem;
    });
  };

  useEffect(() => {
    refsAndSetters.forEach(({ ref, setter }) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setter(rect.bottom);
      }
    });
  
    const dropdownFruit = generateDropdown(filteredFruits, 'name', fruitName);
    const dropdownBox = generateDropdown(filteredBoxes, 'name', boxName);
  
    const dropdownClient = filteredClients.filter(client => {
      const searchClient = clientName.toLowerCase();
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return searchClient && fullName.startsWith(searchClient) && fullName !== searchClient;
    });

    setDropdownValues(dropdownFruit, setFruitId, setFruitName);
    setDropdownValues(dropdownBox, setBoxId, setBoxName);

    if (dropdownClient.length === 1) {
      setClientId(dropdownClient[0].id);
      setClientName(`${dropdownClient[0].firstName} ${dropdownClient[0].lastName}`);
    }

  }, [fruitName, boxName, clientName, filteredFruits, filteredBoxes, filteredClients]);

  if (!isOpen) return null;

  const onChangeFruit = (event) => {
    const selectedFruitName = event.target.value;
    setFruitName(selectedFruitName);
    const selectedFruit = filteredFruits.find(fruit => fruit.name.toLowerCase() === selectedFruitName.toLowerCase());
    if (selectedFruit) {
      setFruitId(selectedFruit.id);
    }
  };

  const onChangeBox = (event) => {
    const selectedBoxName = event.target.value;
    setBoxName(selectedBoxName);
    const selectedBox = filteredBoxes.find(box => box.name.toLowerCase() === selectedBoxName.toLowerCase());
    if (selectedBox) {
      setBoxId(selectedBox.id);
    }
  };

  const onChangeClient = (event) => {
    const selectedClientName = event.target.value;
    setClientName(selectedClientName);
    const selectedClient = filteredClients.find(client => {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName === selectedClientName.toLowerCase();
    });
    if (selectedClient) {
      setClientId(selectedClient.id);
    }
  };

  const onChangeNumberOfBoxes = (event) => {
    const newValue = event.target.value;
    if (!Number.isInteger(parseFloat(newValue))) {
      setError('Number of boxes must be an integer.');
      return;
    }
    setError('');
    setNumberOfBoxes(newValue);
  }; 

  const handleAddTransaction = async () => {
    try {
      if (clientName.trim() === '' || fruitName.trim() === '' || weightGross.trim() === '' || boxName.trim() === '' || numberOfBoxes.trim() === '') {
        setError('All fields are required.');
        return;
      }

      if (!clientIds.includes(clientId)) {
        setError('Selected client does not exist.');
        return;
      }

      if (!fruitIds.includes(fruitId)) {
        setError('Selected fruit does not exist.');
        return;
      }

      if (!boxIds.includes(boxId)) {
        setError('Selected box does not exist.');
        return;
      }

      await addTransaction(clientId, fruitId, weightGross, boxId, numberOfBoxes);
      onClose();
      setError('');
      onUpdate();
    } catch (error) {
      alert(error);
    }
  };

  const handleKeyPress = (event, items) => {
    const selectedItem = items.find(item => item && item.name && item.name.toLowerCase() === event.target.value.toLowerCase());
    if (selectedItem && event.key.length === 1 && event.target.value.length === selectedItem.name.length) {
      event.preventDefault();
    }
  };

  const handleKeyPressClient = (event, items) => {
    const selectedItem = items.find(item => {
      const fullNameLength = item.firstName.length + item.lastName.length + 1;
      return item && item.firstName && item.lastName && event.target.value.toLowerCase() === `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}` && event.target.value.length === fullNameLength;
    });
  
    if (selectedItem && event.key.length === 1 && event.target.value.length === selectedItem.firstName.length + selectedItem.lastName.length + 1) {
      event.preventDefault();
    }
  };

  return (
    <div className="modal">
      <div className='titleModal'>Buy fruit</div>

      <input ref={fourthInputRef} type="text" value={clientName} onChange={onChangeClient} onKeyPress={(e) => handleKeyPressClient(e, filteredClients)} placeholder="First and last name" />

      <div className='dropdown' style={{ top: clientDropdownTop }}>
        {filteredClients
          .filter(client => {
            const searchClient = clientName.toLowerCase();
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            return searchClient && fullName.startsWith(searchClient) && fullName !== searchClient;
          })
          .slice(0, 10)
          .map(client => (
            <div key={client.id} className='dropdown-row' onClick={() => {setClientId(client.id); setClientName(`${client.firstName} ${client.lastName}`);}}>
              {`${client.firstName} ${client.lastName}`}
            </div>
          ))}
      </div>

      <input ref={secondInputRef} type="text" value={fruitName} onChange={onChangeFruit} onKeyPress={(e) => handleKeyPress(e, filteredFruits)} placeholder='Fruit' />

      <div className='dropdown' style={{ top: fruitDropdownTop }}>
        {filteredFruits
          .filter(fruit => {
            const searchFruit = fruitName.toLowerCase();
            const name = fruit.name.toLowerCase();
            return searchFruit && name.startsWith(searchFruit) && name !== searchFruit;
          })
          .slice(0, 10)
          .map(fruit => (
            <div key={fruit.id} className='dropdown-row' onClick={() => {setFruitId(fruit.id); setFruitName(fruit.name);}}>
              {fruit.name}
            </div>
          ))}
      </div>

      <input type="text" placeholder="Gross weight" value={weightGross} onChange={e => setWeightGross(e.target.value)} />

      <input ref={thirdInputRef} type="text" value={boxName} onChange={onChangeBox} onKeyPress={(e) => handleKeyPress(e, filteredBoxes)} placeholder='Box' />

      <div className='dropdown' style={{ top: boxDropdownTop }}>
        {filteredBoxes
          .filter(box => {
            const searchBox = boxName.toLowerCase();
            const name = box.name.toLowerCase();
            return searchBox && name.startsWith(searchBox) && name !== searchBox;
          })
          .slice(0, 10)
          .map(box => (
            <div key={box.id} className='dropdown-row' onClick={() => {setBoxId(box.id); setBoxName(box.name);}}>
              {box.name}
            </div>
          ))}
      </div>

      <input type="number" placeholder="Number of boxes" value={numberOfBoxes} onChange={onChangeNumberOfBoxes} />
      
      {error && <div className="errorMessageMethod">{error}</div>}
      <div className='buttonsModal'>
        <button onClick={handleAddTransaction}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;