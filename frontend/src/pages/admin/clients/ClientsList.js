import React from 'react';

export default function ClientsList({ clients }) {
  return (
    <div>
      {clients.map(client => (
        <div key={client.id} className='field' id={`field-${client.id}`}>
          <div className='field-content'>{client.firstName} {client.lastName}</div>
          <div id='clientsListEmail'>{client.email}</div>
        </div>
      ))}
    </div>
  );
}
