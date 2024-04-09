import Sidebar from '../../../components/sidebar/Sidebar'
import './Clients.css'
import ClientsAdd from './ClientsAdd';
import ClientsList from './ClientsList';
import ClientsRemove from './ClientsRemove';

export default function Clients() {
  return (
    <div className='page'>
      <Sidebar menuType="admin"/>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='featuredField' id='featuredFieldTitleList'>Clients</div>
            <ClientsList/>
        </div>
        <div>
            <ClientsAdd/>
            <ClientsRemove/>
        </div>
      </div>
    </div>
  );
}