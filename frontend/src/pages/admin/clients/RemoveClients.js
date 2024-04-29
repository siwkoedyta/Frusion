import React, { useState } from 'react';
import {removeClient} from '../../../api/client/removeClient';

export default function RemoveClients({ clients, onUpdate }) {
  const [selectedClient, setSelectedClient] = useState('');
  const [error, setError] = useState('');

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleRemoveClient = async () => {
    if (!selectedClient) {
      setError('Please select a client');
      return;
    }

    removeClient(selectedClient)
    .then(() => {
      setSelectedClient('');
      setError('');
      onUpdate()
    })
    .catch(error => {
      setError('Error removing fruit: ' + error);
    });
  };

    return (
      <div className='methodPlace'>
      <div>Remove client</div>
        <div>
          <select name="client" value={selectedClient} onChange={handleClientChange}>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.firstName} {client.lastName}: {client.email}</option>
            ))}
          </select>
        </div>
        {error && <div className="errorMessageMethod">{error}</div>}
        <button className='buttonMethod' onClick={handleRemoveClient}>Remove</button>
      </div>
    );
  }