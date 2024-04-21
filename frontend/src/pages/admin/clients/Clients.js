import './Clients.css'
import ClientsList from './ClientsList';
import AddClients from './AddClients';
import RemoveClients from './RemoveClients';
import WaveSmall from '../../../components/waveSmall/WaveSmall.js';


export default function Clients({ clients, onUpdate}) {

  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <WaveSmall/>
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
    </div>
  );
}