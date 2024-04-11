import React, { useState } from 'react';
import {removeClient} from '../../../api/client/removeClient';

export default function RemoveClients({ clients, onUpdate }) {
  const [selectedClient, setSelectedClient] = useState('');

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleRemoveClient = async () => {
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }

    removeClient(selectedClient)
    .then(() => {
      setSelectedClient('');
      onUpdate()
    })
    .catch(error => {
      alert('Error removing fruit: ' + error);
    });
  };

    return (
      <div className='methodPlace'>
      <div className='titleMethod'>Remove client</div>
        <div>
          <select name="client" value={selectedClient} onChange={handleClientChange}>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.firstName} {client.lastName}: {client.email}</option>
            ))}
          </select>
        </div>
        <button className='buttonMethod' onClick={handleRemoveClient}>Remove</button>
      </div>
    );
  }