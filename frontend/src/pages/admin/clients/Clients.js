import './Clients.css'
import ClientsList from './ClientsList';
import AddClients from './AddClients';
import RemoveClients from './RemoveClients';


export default function Clients({ clients, onUpdate}) {

  return (
    <div className='mainContentInsideContainer' id='mainContentFruitBoxes'>
      <div className='mainContentInside'>
        <div>
          <div className='featuredField featuredFieldTitleList'>Clients</div>
          <ClientsList clients={clients} onUpdate={onUpdate} />
        </div>
        <div>
          <AddClients onUpdate={onUpdate} />
          <RemoveClients clients={clients} onUpdate={onUpdate}/>
        </div>
      </div>
    </div>
  );
}

