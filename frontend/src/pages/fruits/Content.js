import './Content.css';
import Information from './Information.js'
import Methods from './Methods.js'

export default function Content() {
  return (
    <aside className='contentInterior'>
        <Information/>
        <Methods/>
    </aside>
  );
}