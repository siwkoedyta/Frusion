import './Sidebar.css';
import Logo from './../logo/Logo.js'
import AdminMenu from './AdminMenu.js'
import ClientMenu from './ClientMenu.js'

export default function Sidebar({ menuType }) {
  return (
    <aside className="sidebar-container">
      <Logo />
      {menuType === 'admin' ? <AdminMenu /> : <ClientMenu />}
    </aside>
  );
}