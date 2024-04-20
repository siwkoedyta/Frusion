import React from 'react';

export default function ClientsList({ clients }) {
  return (
    <div>
      {clients.map(client => (
        <div key={client.id} className='field fieldClient' id={`field-${client.id}`}>
          <div>{client.firstName} {client.lastName}</div>
          <div className='dataSmallerField'>
            <div id='clientsListEmail'>{client.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
