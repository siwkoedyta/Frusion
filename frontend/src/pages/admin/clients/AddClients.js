import React, { useState } from 'react';
import { addClient
 } from '../../../api/client/addClient';
export default function AddClients({ onUpdate }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleInputChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleInputChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAddClient = async (e) => {
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert('Please enter all data');
      return;
    }

    return addClient(firstName, lastName, email, password)
      .then(res => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        onUpdate();
      })
      .catch(errors => alert(errors))
  };


  return (
    <div className='methodPlace'>
      <div>Add client</div>
      <div>
      <div className='inputGap'>
        <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleInputChangeFirstName}
            placeholder="First name"
          />        
          <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleInputChangeLastName}
          placeholder="Last name"
        />        
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChangeEmail}
          placeholder="Email"
        />        
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleInputChangePassword}
          placeholder="Password"
        />
        </div>
      </div>
      <button className='buttonMethod' onClick={handleAddClient}>Add</button>
    </div>
  );
}