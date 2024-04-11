import './Clients.css'
import ClientsAdd from './AddClients';
import ClientsList from './ClientsList';
import ClientsRemove from './RemoveClients';
import { getAllClients } from '../../../api/client/getAllClients';
import React, { useState, useEffect } from 'react';
import AddClients from './AddClients';
import RemoveClients from './RemoveClients';


export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => refreshClients(), []);

  const refreshClients = () => {
    getAllClients()
        .then(data => setClients(data.filter(client => !client.archived)))
        .catch(errors => alert(errors));
  }

  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='featuredField' id='featuredFieldTitleList'>Clients</div>
            <ClientsList clients={clients} onUpdate={refreshClients} />
        </div>
        <div>
            <AddClients onUpdate={refreshClients} />
            <RemoveClients clients={clients} onUpdate={refreshClients}/>
        </div>
      </div>
    </div>
  );
}