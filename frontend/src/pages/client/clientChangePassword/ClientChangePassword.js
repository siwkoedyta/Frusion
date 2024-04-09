import Sidebar from '../../../components/sidebar/Sidebar'

export default function ClientChangePassword() {
  return (
    <div className='page'>
      <Sidebar menuType="client"/>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='methodPlace'>
                <div className='titleMethod'>Change password</div>
                <input placeholder="Current password"/>
                <input placeholder="New passoword"/>
                <input placeholder="Repeat new password"/>
                <button className='buttonMethod' >Change</button>
            </div>
        </div>
      </div>
    </div>
  );
}