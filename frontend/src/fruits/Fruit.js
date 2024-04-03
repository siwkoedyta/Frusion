import Sidebar from './../universal/sidebar/Sidebar.js'
import Content from './Content.js'
import './Fruit.css'

export default function Fruit() {
  return (
    <div className='page'>
      <Sidebar />
      <Content />
    </div>
  );

}