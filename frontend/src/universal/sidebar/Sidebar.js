import './Sidebar.css';
import Logo from './../logo/Logo.js'
import Menu from './Menu.js'

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
        <Logo/>
        <Menu/>
    </aside>
  );
}

