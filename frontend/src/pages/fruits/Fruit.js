import Sidebar from '../../components/sidebar/Sidebar'
import Content from '../../pages/fruits/Content'
import './Fruit.css'

export default function Fruit() {
  return (
    <div className='page'>
      <Sidebar />
      <Content />
    </div>
  );

}